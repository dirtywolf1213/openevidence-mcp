# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- **`oe_public_get` — read conversation pages by `/ask/` link.** Fetches an
  `https://www.openevidence.com/ask/<id>` page and parses it into Q&A turns:
  question, answer as clean markdown, references under a rebuilt
  `### References` heading. Auth escalates automatically: relay tab when
  connected (so **your own private conversations work**, DataDome-free) →
  anonymous fetch (public/shared conversations are fully server-rendered and
  need zero setup) → `cookies.json` (headless fallback for private pages).
  Page fetches run through the same rate limiter as API reads (60 clinical
  queries/min budget, self-throttled at 80%, burst-capped). Figure images
  survive with their captions (carried from the `Open figure` button's
  aria-label) and real URLs (the `/_next/image` proxy is resolved);
  status-stepper chrome, follow-up suggestions, and reference favicons are
  stripped; inline journal-name citation chips collapse to bare `[n]` markers
  that match the references list. Parsing anchors (`<article>`,
  `data-answer-end`, `ask--query-bar`) are ported from the battle-tested
  mcq-bank importer and verified against a saved-page fixture.
- **`strip_citation_markers` option** on `oe_ask`, `oe_article_get`, and
  `oe_public_get` — removes `[1]`, `[1-2]`, `[2,3]`, `[1–3]` reference marks
  (including markdown link targets like `[1](https://…)`) and the whitespace
  before them; non-numeric brackets like `[note]` survive. API tools return the
  cleaned text as `extracted_answer_clean` alongside the untouched raw answer.
- **`/ask/` URLs accepted everywhere an article id is.** `oe_article_get.article_id`
  and `oe_ask.original_article_id` now take a full conversation URL and extract
  the UUID themselves.
- **Shared relay daemon — many sessions, one tab.** The relay no longer runs
  in-process inside each MCP server (where only one session could bind port 8787;
  the rest silently failed with "relay not connected"). A standalone daemon
  (`src/relay-daemon.ts`, `npm run relay`) now owns the port and outlives every
  session; each MCP server connects as a client (`src/relay-client.ts`) via a new
  `POST /relay` bridge. The daemon is auto-spawned detached on first need,
  idempotent (a second daemon that loses the bind race exits 0), and self-healing
  (a crashed daemon is respawned + the in-flight request retried). `/health` now
  reports `version` + `pid`; a stale daemon from an older build is detected and
  replaced on upgrade. New env: `OE_MCP_RELAY_PID_PATH`, `OE_MCP_RELAY_LOG_PATH`
  (default `~/.openevidence-mcp/relay.pid` / `relay.log`).

### Changed
- **`oe_ask` is fire-and-forget by default.** It now returns
  `{article_id, status:"pending"}` immediately and frees the browser tab for other
  sessions; fetch the finished answer with `oe_article_get(article_id)` (which gained
  `wait_for_completion`/`timeout_sec`/`poll_interval_ms` and now reports `status`).
  Pass `oe_ask(..., wait_for_completion:true)` to keep the old one-shot blocking
  behavior. Concurrency works either way now that the relay is shared.
- **BREAKING:** `OE_MCP_RELAY_TRANSPORT=all` is now the **default**. The MCP server
  routes every request — `oe_ask` and all reads (`oe_history_list`,
  `oe_article_get`, `oe_collections_*`) — through the browser-extension relay and
  no longer falls back to `cookies.json`; when the extension isn't connected, tools
  fail fast with install guidance. Headless reads now require the extension — set
  `OE_MCP_RELAY_TRANSPORT=off` to restore the cookie read path. `cookies.json`
  remains the auth for the Python collections tooling and `npm run doctor` / `login`.
- `oe_ask` now submits via the shared client (`client.ask()`) over the relay rather
  than a bespoke relay call, so the POST and its follow-up reads share one browser
  session — a freshly-created article is always visible to the poller (no
  creator/account mismatch between a browser tab and `cookies.json`).

### Fixed
- `waitForArticle` polls through the transient `404` a just-created article returns
  until OpenEvidence finishes provisioning it, instead of aborting the ask on the
  first poll.

## [0.3.0] - 2026-06-04

### Added
- Browser-extension relay (Brave/Chrome): `oe_ask` submits the `POST /api/article`
  inside your own real logged-in OpenEvidence tab over a localhost relay, so the
  request carries your genuine browser session. Standalone `extension/` sub-project,
  released as `extension-v0.1.0` (unpacked zip + signed `.crx`; CI builds + signs on
  `extension-v*` tags).
- `OE_MCP_RELAY_TRANSPORT=all` routes every request through the extension session
  (`cookies.json` becomes optional when the extension is connected).
- `npm run doctor` stale-DataDome-cookie diagnostics; per-account SQLite mirror
  (schema v2) with collections auto-sort tools and routine.

### Changed
- **BREAKING:** `oe_ask` is now extension-relay-only. The direct Node `POST
  /api/article` is deprecated and no longer attempted; without a connected relay,
  `oe_ask` fails fast with install guidance. Reads (`oe_history_list`,
  `oe_article_get`, collections) are unchanged.

### Removed
- **BREAKING:** the open-url `via_browser` ask path (`src/ask-browser.ts`,
  `via_browser*` flags), `OE_MCP_BROWSER_FALLBACK`, and `OE_MCP_BROWSER_APP`.

## [0.2.0] - 2026-05-09

### Changed
- Replaced Playwright-backed browser login with browser-exported `cookies.json` auth.
- Added Makefile targets for build, smoke testing, and user-scope Claude Code MCP install.
- Saved completed article artifacts to disk with citation extraction, BibTeX export, and Crossref validation.

## [0.1.0] - 2026-02-21

### Added
- MCP server with stdio transport (MCP SDK 1.26.0)
- `oe_auth_status` tool - validate session via `/api/auth/me`
- `oe_history_list` tool - read conversation history via `/api/article/list`
- `oe_article_get` tool - fetch full article payload by ID
- `oe_ask` tool - ask a question with optional completion polling
- Browser-session authentication via local storage state (no API key required)
- `npm run login` - interactive login flow with state persistence
- `npm run smoke` - smoke test for auth and connectivity
- Cross-platform support: macOS, Windows, Ubuntu/Linux
- Setup scripts for all three platforms
- MCP client config examples: Codex CLI, Claude Desktop
- GitHub Pages landing with i18n (EN, RU, ES, ZH, HI)
- `llms.txt` and `llms-full.txt` for AI parser discovery
- `SEMANTIC_CORE.md` for structured metadata
- Apache-2.0 license with NOTICE attribution
