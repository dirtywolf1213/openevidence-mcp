import { unlinkSync, writeFileSync } from "node:fs";

import { ensureConfigDirs, resolveConfig } from "./config.js";
import { RELAY_VERSION, startRelayServer, type RelayServer } from "./relay-server.js";

/**
 * Standalone relay daemon. Owns the relay port and outlives every Claude session
 * so any number of MCP servers can funnel requests through the one browser tab
 * (see relay-client.ts). Idempotent: if the port is already held (another daemon
 * won the race) it logs and exits 0. Cleans up its pidfile on shutdown.
 */
async function main(): Promise<void> {
  const config = resolveConfig();
  ensureConfigDirs(config);

  let server: RelayServer;
  try {
    server = await startRelayServer({
      port: config.relayPort,
      logger: (m) => console.error(`[relay-daemon] ${m}`),
    });
  } catch (err) {
    // Lost the bind race (EADDRINUSE) — another daemon already owns the port.
    console.error(`[relay-daemon] not starting: ${String(err)}`);
    process.exit(0);
  }

  try {
    writeFileSync(config.relayPidPath, String(process.pid));
  } catch (err) {
    console.error(`[relay-daemon] could not write pidfile: ${String(err)}`);
  }
  console.error(
    `[relay-daemon] listening on :${config.relayPort} v${RELAY_VERSION} pid ${process.pid}`,
  );

  let shuttingDown = false;
  const shutdown = (signal: string): void => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.error(`[relay-daemon] ${signal} — shutting down`);
    try {
      unlinkSync(config.relayPidPath);
    } catch {
      /* nothing to clean up */
    }
    server.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

void main();
