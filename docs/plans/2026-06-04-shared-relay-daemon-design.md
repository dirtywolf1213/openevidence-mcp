# Shared Relay Daemon + Fire-and-Forget Ask

Date: 2026-06-04
Status: accepted

## Problem

The relay HTTP server (port 8787) is started **in-process** by each MCP server
(`server.ts:getRelay()` → `startRelayServer()`). Every Claude Code session spawns
its own MCP server, but only one process can bind 8787. The losers reject with
`EADDRINUSE`, cache the failure as `null`, and **every** tool call from those
sessions returns the generic "relay not connected" error — even though the
extension is polling fine. The failure is silent and easy to misdiagnose as a
login/extension problem.

The relay itself already multiplexes (per-`reqId` outbox, concurrent in-tab
fetches), so one tab can serve many concurrent requests. The only true blocker is
the single-bind-per-process coupling.

## Decision

1. **Standalone auto-spawned relay daemon** owns 8787 and outlives all sessions.
   MCP servers never bind; they connect to the daemon as HTTP clients. The first
   server to need the relay spawns the daemon detached + `unref()`. Idempotent: a
   second daemon that loses the bind race exits 0. Self-healing: if the daemon
   dies, the next call respawns it.

2. **Fire-and-forget ask by default.** `oe_ask` returns `{article_id,
   status:"pending"}` immediately; `oe_article_get(id)` fetches the finished
   answer later (optionally blocking with `wait_for_completion:true`). One-shot
   blocking remains available via `oe_ask(..., wait_for_completion:true)`.

## Architecture

```
[session A] MCP server A ─┐
[session B] MCP server B ─┼─ POST /relay ─▶ relay daemon :8787 ─/poll,/result─▶ extension ─▶ OE tab
[session C] MCP server C ─┘                  (singleton, detached, pidfile+log)
```

### Components

- **`relay-server.ts`** (edit): add `POST /relay` (client→daemon bridge: body
  `{method,path,body,timeoutMs}` → internal `request()` → `{status,body}`); add
  `version` + `pid` to `/health`. Export `RELAY_VERSION`.
- **`relay-daemon.ts`** (new): entrypoint — `startRelayServer`, write
  `~/.openevidence-mcp/relay.pid`, log to `relay.log`, exit 0 on `EADDRINUSE`,
  clean up pidfile on SIGTERM.
- **`relay-client.ts`** (new): `RelayClient implements RelayTransport`
  (`isConnected()` = cached `/health`, refreshed on a 2 s unref'd interval;
  `request()` = `POST /relay`). Plus `connectSharedRelay(config)` orchestrator and
  `spawnDaemon`/`probeHealth` helpers.
- **`server.ts`** (edit): `getRelay()` → `connectSharedRelay()`; flip `oe_ask`
  default to non-blocking; surface `status` (+ optional wait) on `oe_article_get`.

### Guardrails (the robustness)

1. **Retry-on-failure, not just health-caching.** `isConnected()` is a cached
   read, so it can be stale for ~2 s after a daemon death. `RelayClient.request()`
   therefore treats `ECONNREFUSED` as "daemon gone" → re-ensure daemon + retry
   once, so a crash is invisible instead of throwing one spurious error.

2. **Version check on `/health`.** Prevents a stale daemon from a previous build
   serving without the new `/relay` route after an upgrade. On version mismatch
   for a daemon we own (pidfile pid matches `/health.pid`), kill it and respawn the
   current build. A foreign/legacy occupant on 8787 (no `version`/`pid`) yields a
   clear actionable error rather than a dangerous blind kill.

### Out of scope (acknowledged)

- **Local trust**: any localhost process can `POST /relay` and ride the authed
  tab — unchanged posture from the existing localhost relay. Token later if
  wanted; YAGNI now.
- **Idle daemon lingers** forever (tiny). Optional idle-shutdown later.

## Test plan

- Integration test on a non-default port with a simulated extension (poll/result
  loop): proves daemon boot, `/relay` bridge, `/health` version, client request,
  respawn-on-death, version-mismatch respawn — without touching 8787.
- Real smoke: free 8787, run a real ask through `connectSharedRelay` + the live
  extension/tab.
