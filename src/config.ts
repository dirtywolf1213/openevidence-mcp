import { existsSync, mkdirSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DEFAULT_RATE_LIMIT_CONFIG, type RateLimitConfig } from "./rate-limit.js";

export interface AppConfig {
  baseUrl: string;
  cookiesPath: string;
  fingerprintPath?: string;
  artifactDir: string;
  crossrefMailto?: string;
  crossrefValidate: boolean;
  pollIntervalMs: number;
  pollTimeoutMs: number;
  /**
   * Run a localhost relay that lets the Brave/Chrome extension submit the ask
   * POST from inside a real OpenEvidence tab (page-context TLS/cookies ⇒ DataDome
   * passes). When the extension is connected it is preferred over the open-url
   * browser fallback. On by default; set OE_MCP_RELAY=0 to disable.
   */
  relayEnabled: boolean;
  /** Port the relay HTTP server listens on (must match the extension). */
  relayPort: number;
  /** Pidfile written by the standalone relay daemon (for upgrade-time respawn). */
  relayPidPath: string;
  /** Log file the detached relay daemon appends to. */
  relayLogPath: string;
  /**
   * "all" (default): route EVERY OpenEvidence request through the extension; the
   * browser session is the sole auth (no cookies.json) and the MCP server refuses
   * to fall back to the cookie path. "off": legacy escape hatch — reads go over
   * cookies.json and the relay is used only as the DataDome fallback for the ask
   * POST. Set OE_MCP_RELAY_TRANSPORT=off to opt out.
   */
  relayTransport: "off" | "all";
  /**
   * SQLite file shared with the Python collection-sort CLI ($OE_MCP_DB_PATH,
   * default ~/.openevidence-mcp/db/oe.sqlite). The Node server adds the
   * `answers` table (full answer bodies + FTS index) alongside Python's
   * chats/collections mirror.
   */
  dbPath: string;
  /**
   * Minimum spacing between question submissions (oe_ask → POST /api/article),
   * enforced by waiting, not erroring, and coordinated across sessions via the
   * shared SQLite ask_log. Respects OpenEvidence's per-account question rate
   * (default ~1 question/second). Set OE_MCP_ASK_MIN_INTERVAL_MS=0 to disable.
   */
  askMinIntervalMs: number;
  rateLimit: RateLimitConfig;
}

const DEFAULT_BASE_URL = "https://www.openevidence.com";
const DEFAULT_ROOT = path.join(homedir(), ".openevidence-mcp");
const DEFAULT_ARTIFACT_DIR = path.join(tmpdir(), "openevidence-mcp");

export function resolveConfig(): AppConfig {
  const rootDir = process.env.OE_MCP_ROOT_DIR ?? DEFAULT_ROOT;
  const relayPort = parseInt(process.env.OE_MCP_RELAY_PORT ?? "8787", 10);
  const localCookiesPath = path.resolve(process.cwd(), "cookies.json");
  const cookiesPath =
    process.env.OE_MCP_COOKIES_PATH ??
    process.env.OE_MCP_AUTH_STATE_PATH ??
    (existsSync(localCookiesPath) ? localCookiesPath : path.join(rootDir, "auth", "cookies.json"));
  const localFingerprintPath = path.resolve(process.cwd(), "openevidence-fingerprint.json");
  const moduleFingerprintPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "openevidence-fingerprint.json",
  );
  const fingerprintPath =
    process.env.OE_MCP_FINGERPRINT_PATH ??
    firstExistingPath(localFingerprintPath, moduleFingerprintPath);

  return {
    baseUrl: process.env.OE_MCP_BASE_URL ?? DEFAULT_BASE_URL,
    cookiesPath,
    fingerprintPath,
    artifactDir: process.env.OE_MCP_ARTIFACT_DIR ?? DEFAULT_ARTIFACT_DIR,
    crossrefMailto: process.env.OE_MCP_CROSSREF_MAILTO,
    crossrefValidate: process.env.OE_MCP_CROSSREF_VALIDATE !== "0",
    pollIntervalMs: parseInt(process.env.OE_MCP_POLL_INTERVAL_MS ?? "1200", 10),
    pollTimeoutMs: parseInt(process.env.OE_MCP_POLL_TIMEOUT_MS ?? "180000", 10),
    relayEnabled: process.env.OE_MCP_RELAY !== "0",
    relayPort,
    // Port-scoped by default: a daemon's pidfile is its supersede/reap identity,
    // so daemons on DIFFERENT ports must never share one — otherwise each sees
    // the other's live pid as "I've been superseded" and they kill each other.
    relayPidPath:
      process.env.OE_MCP_RELAY_PID_PATH ?? path.join(rootDir, `relay-${relayPort}.pid`),
    relayLogPath:
      process.env.OE_MCP_RELAY_LOG_PATH ?? path.join(rootDir, `relay-${relayPort}.log`),
    relayTransport: process.env.OE_MCP_RELAY_TRANSPORT === "off" ? "off" : "all",
    dbPath: process.env.OE_MCP_DB_PATH ?? path.join(rootDir, "db", "oe.sqlite"),
    askMinIntervalMs: (() => {
      const raw = process.env.OE_MCP_ASK_MIN_INTERVAL_MS;
      if (raw === undefined) return 1000;
      const n = parseInt(raw, 10);
      return Number.isFinite(n) && n >= 0 ? n : 1000;
    })(),
    rateLimit: resolveRateLimitConfig(),
  };
}

function firstExistingPath(...paths: string[]): string | undefined {
  return paths.find((candidate) => existsSync(candidate));
}

function resolveRateLimitConfig(): RateLimitConfig {
  const def = DEFAULT_RATE_LIMIT_CONFIG;
  const num = (key: string, fallback: number): number => {
    const raw = process.env[key];
    if (raw === undefined) return fallback;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  };
  return {
    windowMs: num("OE_MCP_RATE_WINDOW_MS", def.windowMs),
    maxRequestsPerWindow: num("OE_MCP_RPM", def.maxRequestsPerWindow),
    burstCap: num("OE_MCP_BURST", def.burstCap),
    targetUsagePercent: num("OE_MCP_RATE_TARGET", def.targetUsagePercent),
    maxConcurrent: num("OE_MCP_MAX_CONCURRENT", def.maxConcurrent),
    retry: {
      maxRetries: num("OE_MCP_MAX_RETRIES", def.retry.maxRetries),
      baseDelayMs: num("OE_MCP_RETRY_BASE_MS", def.retry.baseDelayMs),
      maxDelayMs: num("OE_MCP_RETRY_MAX_MS", def.retry.maxDelayMs),
      jitterMs: num("OE_MCP_RETRY_JITTER_MS", def.retry.jitterMs),
    },
  };
}

export function ensureConfigDirs(config: AppConfig): void {
  mkdirSync(path.dirname(config.cookiesPath), { recursive: true });
  mkdirSync(config.artifactDir, { recursive: true });
  mkdirSync(path.dirname(config.relayPidPath), { recursive: true });
}
