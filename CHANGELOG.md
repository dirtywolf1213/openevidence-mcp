# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
