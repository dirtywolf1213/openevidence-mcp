NODE ?= node
NPM ?= npm
PYTHON ?= python3
CLAUDE ?= claude
CODEX ?= codex
GEMINI ?= gemini
MCP_NAME ?= openevidence
COOKIES ?= $(CURDIR)/cookies.json
HAR ?= $(CURDIR)/www.openevidence.com_dotflow.har
HAR_MINE ?= $(CURDIR)/www.openevidence.com_dotflow_mine.har
SERVER := $(CURDIR)/dist/server.js

.PHONY: deps build check test smoke import-cookies update-dotflows update-dotflows-from-har sync-mine sync-mine-from-har install-claude-global install-codex-global install-gemini-global install-all remove-claude-global remove-codex-global remove-gemini-global reinstall-claude-global reinstall-codex-global reinstall-gemini-global clean

deps:
	$(NPM) install

build:
	$(NPM) run build

check:
	$(NPM) run check

test:
	$(NPM) test

smoke:
	OE_MCP_COOKIES_PATH="$(COOKIES)" $(NPM) run smoke

import-cookies:
	OE_MCP_COOKIES_PATH="$(COOKIES)" $(NPM) run import-cookies -- --import "$(COOKIES)"

update-dotflows:
	$(PYTHON) $(CURDIR)/scripts/update_dotflows.py --cookies "$(COOKIES)" --from-har-fallback

update-dotflows-from-har:
	$(PYTHON) $(CURDIR)/scripts/update_dotflows.py --har "$(HAR)"

sync-mine:
	$(PYTHON) $(CURDIR)/scripts/dotflow_mine.py --cookies "$(COOKIES)" sync --from-har-fallback

sync-mine-from-har:
	$(PYTHON) $(CURDIR)/scripts/dotflow_mine.py sync --har "$(HAR_MINE)"

install-claude-global: build
	$(CLAUDE) mcp remove --scope user $(MCP_NAME) >/dev/null 2>&1 || true
	$(CLAUDE) mcp add-json --scope user $(MCP_NAME) "$$(node -e 'const [command, server, cookies] = process.argv.slice(1); process.stdout.write(JSON.stringify({ type: "stdio", command, args: [server], env: { OE_MCP_COOKIES_PATH: cookies } }));' "$(NODE)" "$(SERVER)" "$(COOKIES)")"

install-codex-global: build
	$(CODEX) mcp remove $(MCP_NAME) >/dev/null 2>&1 || true
	$(CODEX) mcp add $(MCP_NAME) --env OE_MCP_COOKIES_PATH="$(COOKIES)" -- $(NODE) "$(SERVER)"

install-gemini-global: build
	$(GEMINI) mcp remove --scope user $(MCP_NAME) >/dev/null 2>&1 || true
	$(GEMINI) mcp add --scope user -e OE_MCP_COOKIES_PATH="$(COOKIES)" $(MCP_NAME) $(NODE) "$(SERVER)"

install-all: install-claude-global install-codex-global install-gemini-global

remove-claude-global:
	$(CLAUDE) mcp remove --scope user $(MCP_NAME)

remove-codex-global:
	$(CODEX) mcp remove $(MCP_NAME)

remove-gemini-global:
	$(GEMINI) mcp remove --scope user $(MCP_NAME)

reinstall-claude-global: install-claude-global

reinstall-codex-global: install-codex-global

reinstall-gemini-global: install-gemini-global

clean:
	rm -rf dist
