import { spawn } from "node:child_process";
import { openSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { AppConfig } from "./config.js";
import { RELAY_VERSION } from "./relay-server.js";

/**
 * Out-of-process client for the shared relay daemon.
 *
 * Every Claude session spawns its own MCP server, but only one process can bind
 * the relay port (8787). Instead of binding in-process, each MCP server connects
 * to a single standalone daemon (`relay-daemon.ts`) that owns the port and
 * outlives all sessions. This client speaks the daemon-facing surface
 * (`POST /relay`, `GET /health`) and, crucially, is self-healing:
 *
 *  - `isConnected()` is a *cached* read of `/health`, refreshed on a background
 *    interval. It can be stale for a couple of seconds after the daemon dies.
 *  - `request()` therefore treats a connection-refused as "daemon gone" and
 *    respawns + retries once, so a crash is invisible rather than a thrown error.
 *  - On a version mismatch (a stale daemon from an older build still squatting
 *    the port) it evicts the daemon *we own* and respawns the current build.
 */

const HEALTH_TIMEOUT_MS = 1_500;
const HEALTH_REFRESH_MS = 2_000;
const SPAWN_WAIT_MS = 5_000;
const REQUEST_SLACK_MS = 15_000; // client waits this much past the relay's own timeout

interface HealthInfo {
  connected: boolean;
  version: number | null;
  pid: number | null;
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function isConnRefused(err: unknown): boolean {
  const cause = (err as { cause?: { code?: string } } | undefined)?.cause;
  if (cause?.code === "ECONNREFUSED") return true;
  const msg = err instanceof Error ? err.message : String(err);
  return /ECONNREFUSED|fetch failed|other side closed/i.test(msg);
}

async function probeHealth(port: number, timeoutMs = HEALTH_TIMEOUT_MS): Promise<HealthInfo | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`http://127.0.0.1:${port}/health`, { signal: ctrl.signal });
    if (!res.ok) return null;
    const body = (await res.json()) as { connected?: boolean; version?: number; pid?: number };
    return {
      connected: body.connected === true,
      version: typeof body.version === "number" ? body.version : null,
      pid: typeof body.pid === "number" ? body.pid : null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function daemonEntrypoint(): string {
  // Sits next to this module in dist/. Production runs the compiled .js via node.
  return path.join(path.dirname(fileURLToPath(import.meta.url)), "relay-daemon.js");
}

function spawnDaemon(config: AppConfig): void {
  const out = openSync(config.relayLogPath, "a");
  try {
    const child = spawn(process.execPath, [daemonEntrypoint()], {
      detached: true,
      stdio: ["ignore", out, out],
      env: process.env,
    });
    child.unref();
  } catch (err) {
    process.stderr.write(`[relay] could not spawn daemon: ${String(err)}\n`);
  }
}

async function waitForHealth(port: number, timeoutMs = SPAWN_WAIT_MS): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const h = await probeHealth(port, 500);
    if (h && h.version === RELAY_VERSION) return true;
    if (Date.now() > deadline) return false;
    await sleep(150);
  }
}

/**
 * Evict a daemon that answers `/health` with the wrong version — but only if it
 * is unmistakably one we own (its pid matches our pidfile). Never blind-kill an
 * unknown process holding the port.
 */
async function replaceStaleDaemon(config: AppConfig, health: HealthInfo): Promise<boolean> {
  const pid = health.pid;
  if (pid == null) {
    process.stderr.write(
      `[relay] port ${config.relayPort} held by a relay without a version/pid — ` +
        `not ours, refusing to evict. Stop it manually if it is stale.\n`,
    );
    return false;
  }
  let filePid: number | null = null;
  try {
    filePid = parseInt((await readFile(config.relayPidPath, "utf8")).trim(), 10);
  } catch {
    filePid = null;
  }
  if (filePid !== pid) {
    process.stderr.write(
      `[relay] port ${config.relayPort} held by pid ${pid} but pidfile has ` +
        `${filePid ?? "none"} — not evicting an unrecognised process.\n`,
    );
    return false;
  }
  process.stderr.write(`[relay] evicting stale daemon pid ${pid} (version mismatch)\n`);
  try {
    process.kill(pid, "SIGTERM");
  } catch {
    /* already gone */
  }
  for (let i = 0; i < 20; i += 1) {
    if (!(await probeHealth(config.relayPort, 400))) break;
    await sleep(150);
  }
  spawnDaemon(config);
  return true;
}

export class RelayClient {
  private healthy = false;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly port: number,
    private readonly ensureDaemon: () => Promise<boolean>,
  ) {}

  /** Prime the cached health flag and start the background refresh loop. */
  async start(): Promise<void> {
    await this.refresh();
    if (!this.timer) {
      this.timer = setInterval(() => void this.refresh(), HEALTH_REFRESH_MS);
      this.timer.unref?.();
    }
  }

  private async refresh(): Promise<void> {
    const h = await probeHealth(this.port);
    this.healthy = h !== null && h.connected && h.version === RELAY_VERSION;
  }

  isConnected(): boolean {
    return this.healthy;
  }

  async request(
    req: { method: string; path: string; body?: string },
    opts?: { timeoutMs?: number },
  ): Promise<{ status: number; body: string }> {
    try {
      return await this.postRelay(req, opts?.timeoutMs);
    } catch (err) {
      if (!isConnRefused(err)) throw err;
      // Cached health was stale: the daemon died between probes. Respawn + retry once.
      this.healthy = false;
      const up = await this.ensureDaemon();
      if (!up) throw err;
      const out = await this.postRelay(req, opts?.timeoutMs);
      void this.refresh();
      return out;
    }
  }

  private async postRelay(
    req: { method: string; path: string; body?: string },
    timeoutMs?: number,
  ): Promise<{ status: number; body: string }> {
    const ctrl = new AbortController();
    const limit = (timeoutMs ?? 90_000) + REQUEST_SLACK_MS;
    const timer = setTimeout(() => ctrl.abort(), limit);
    try {
      const res = await fetch(`http://127.0.0.1:${this.port}/relay`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...req, timeoutMs }),
        signal: ctrl.signal,
      });
      const data = (await res.json()) as {
        ok?: boolean;
        status?: number;
        body?: string;
        error?: string;
      };
      if (!res.ok || data.ok === false) {
        throw new Error(data.error ?? `relay daemon returned HTTP ${res.status}`);
      }
      return { status: data.status ?? 0, body: data.body ?? "" };
    } finally {
      clearTimeout(timer);
    }
  }

  close(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}

/**
 * Connect to the shared relay daemon, spawning it if absent and replacing a
 * stale-version daemon we own. Always returns a started client (so `isConnected()`
 * reflects live state and a later call can self-heal); returns null only when the
 * relay is disabled.
 */
export async function connectSharedRelay(config: AppConfig): Promise<RelayClient | null> {
  if (!config.relayEnabled) return null;
  const port = config.relayPort;

  const ensureDaemon = async (): Promise<boolean> => {
    const h = await probeHealth(port);
    if (h) {
      if (h.version === RELAY_VERSION) return true;
      const replaced = await replaceStaleDaemon(config, h);
      return replaced ? await waitForHealth(port) : false;
    }
    spawnDaemon(config);
    return await waitForHealth(port);
  };

  await ensureDaemon();
  const client = new RelayClient(port, ensureDaemon);
  await client.start();
  return client;
}
