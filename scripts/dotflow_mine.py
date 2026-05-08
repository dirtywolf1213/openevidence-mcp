#!/usr/bin/env python3
"""CRUD for the user's own dotflows (the `/api/dotflows/dot-flows` endpoint).

Subcommands
-----------
  sync     List my dotflows and rewrite ./dotflows/mine/dotflow.<slug>.md.
           --har <file> reads from a captured HAR instead of hitting the API.
           --from-har-fallback uses the default HAR if the API call fails.

  create   POST /dot-flows.            (verified)
  get      GET /dot-flows/{id}.         (verified)
  update   PATCH /dot-flows/{id}.       (verified — server validates that the
           prompt is medically related and rejects with 400 otherwise)
  delete   DELETE /dot-flows/{id}.      (verified — returns 204 No Content)

All commands authenticate via a cookies.json exported from the browser
(default: ./cookies.json). Anti-bot (DataDome) may reject non-browser TLS.
"""
from __future__ import annotations

import argparse
import base64
import json
import re
import shutil
import sys
import urllib.parse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _oe_session import OESession  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_COOKIES = ROOT / "cookies.json"
DEFAULT_HAR = ROOT / "www.openevidence.com_dotflow_mine.har"
DOTFLOWS_DIR = ROOT / "dotflows"
MINE_DIR = DOTFLOWS_DIR / "mine"
API_BASE = "https://www.openevidence.com/api/dotflows/dot-flows"

# Frontmatter order for mine markdown files.
META_KEYS = [
    "id",
    "name",
    "quick_description",
    "is_default",
    "is_user_default",
    "in_public_library",
    "library_is_anonymous",
    "has_unpublished_changes",
    "access_level",
    "creator",
    "creator_auth0_id",
    "shared_with_emails",
    "shared_emails",
    "invocation_count",
    "output_schemas",
    "created_at",
    "updated_at",
]
KNOWN_API_KEYS = set(META_KEYS) | {"explanation_prompt"}


# ---------- shared helpers ----------

def make_session(args: argparse.Namespace) -> OESession:
    if not args.cookies.exists():
        raise SystemExit(f"cookies file not found: {args.cookies}")
    return OESession(
        args.cookies,
        min_interval=args.rate,
        max_retries=args.retries,
        verbose=args.verbose,
    )


def api_request(session: OESession, method: str, path: str, body: dict | None = None) -> tuple[int, dict | None]:
    url = path if path.startswith("http") else f"{API_BASE}{path}"
    return session.request(method, url, body=body)


def slugify(name: str) -> str:
    s = re.sub(r"^\.+", "", (name or "").strip())
    s = re.sub(r"[^A-Za-z0-9_.-]+", "_", s)
    return (s.strip("._-") or "unnamed").lower()


def yaml_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def yaml_value(v) -> str:
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, str):
        return yaml_str(v)
    if isinstance(v, dict):
        if not v:
            return "{}"
        return "{ " + ", ".join(f"{yaml_str(str(k))}: {yaml_value(val)}" for k, val in v.items()) + " }"
    if isinstance(v, list):
        return "[" + ", ".join(yaml_value(x) for x in v) + "]"
    return yaml_str(str(v))


def render_markdown(item: dict) -> str:
    lines = ["---"]
    for k in META_KEYS:
        lines.append(f"{k}: {yaml_value(item.get(k))}")
    lines.append("---")
    lines.append("")
    lines.append((item.get("explanation_prompt") or "").rstrip())
    lines.append("")
    return "\n".join(lines)


# ---------- sync ----------

def list_mine_via_api(session: OESession) -> tuple[list[dict], int | None]:
    flows: list[dict] = []
    expected: int | None = None
    offset, limit = 0, 20
    while True:
        status, page = api_request(session, "GET", f"?limit={limit}&offset={offset}")
        if status != 200 or page is None:
            raise RuntimeError(f"list failed: HTTP {status} {page}")
        if expected is None:
            expected = page.get("count")
        results = page.get("results") or []
        flows.extend(results)
        if not page.get("next") or not results:
            break
        offset += limit
    return flows, expected


def list_mine_from_har(har_path: Path) -> tuple[list[dict], int | None]:
    har = json.loads(har_path.read_text())
    flows: list[dict] = []
    expected: int | None = None
    seen_ids: set[str] = set()
    for entry in har["log"]["entries"]:
        url = entry["request"]["url"]
        if entry["request"]["method"] != "GET":
            continue
        # Match `/dot-flows` list (NOT `/dot-flows/library`, NOT a single-id GET)
        parsed = urllib.parse.urlparse(url)
        if parsed.path != "/api/dotflows/dot-flows":
            continue
        content = entry["response"]["content"]
        text = content.get("text") or ""
        if content.get("encoding") == "base64":
            text = base64.b64decode(text).decode("utf-8")
        payload = json.loads(text)
        if expected is None:
            expected = payload.get("count")
        for r in payload.get("results", []):
            if r["id"] not in seen_ids:
                seen_ids.add(r["id"])
                flows.append(r)
    return flows, expected


def write_mine(flows: list[dict]) -> None:
    unknown = set()
    for item in flows:
        unknown |= set(item) - KNOWN_API_KEYS
    if unknown:
        print(f"warn: unknown API fields (schema drift?): {sorted(unknown)}", file=sys.stderr)

    DOTFLOWS_DIR.mkdir(exist_ok=True)
    if MINE_DIR.exists():
        shutil.rmtree(MINE_DIR)
    MINE_DIR.mkdir(parents=True)

    by_slug: dict[str, list[dict]] = {}
    for item in flows:
        by_slug.setdefault(slugify(item.get("name", "unnamed")), []).append(item)

    for slug, entries in sorted(by_slug.items()):
        entries.sort(
            key=lambda e: (
                -(e.get("invocation_count") or 0),
                e.get("id") or "",
            )
        )
        for idx, item in enumerate(entries, start=1):
            fname = f"dotflow.{slug}.md" if idx == 1 else f"dotflow.{slug}.{idx}.md"
            (MINE_DIR / fname).write_text(render_markdown(item), encoding="utf-8")

    print(f"Wrote {len(flows)} mine dotflows under {MINE_DIR}")


def cmd_sync(args: argparse.Namespace) -> int:
    if args.har:
        flows, expected = list_mine_from_har(args.har)
    else:
        try:
            session = make_session(args)
            flows, expected = list_mine_via_api(session)
        except (RuntimeError, TimeoutError) as e:
            if args.from_har_fallback and DEFAULT_HAR.exists():
                print(f"API failed ({e}); falling back to {DEFAULT_HAR}", file=sys.stderr)
                flows, expected = list_mine_from_har(DEFAULT_HAR)
            else:
                print(f"API request failed: {e}", file=sys.stderr)
                return 2

    if expected is not None and len(flows) < expected:
        print(
            f"error: API count={expected} but collected {len(flows)} — refusing to overwrite",
            file=sys.stderr,
        )
        return 4
    write_mine(flows)
    return 0


# ---------- CRUD ----------

def parse_schemas(pairs: list[str]) -> dict[str, str]:
    out: dict[str, str] = {}
    for p in pairs or []:
        if "=" not in p:
            raise SystemExit(f"--schema expects key=value, got {p!r}")
        k, v = p.split("=", 1)
        out[k.strip()] = v.strip()
    return out


def cmd_create(args: argparse.Namespace) -> int:
    session = make_session(args)
    body = {
        "name": args.name,
        "explanation_prompt": args.prompt,
        "output_schemas": parse_schemas(args.schema),
    }
    status, payload = api_request(session, "POST", "", body=body)
    print(json.dumps(payload, indent=2, ensure_ascii=False))
    return 0 if status in (200, 201) else 5


def cmd_update(args: argparse.Namespace) -> int:
    session = make_session(args)
    body: dict = {}
    if args.name is not None:
        body["name"] = args.name
    if args.prompt is not None:
        body["explanation_prompt"] = args.prompt
    if args.schema is not None:
        body["output_schemas"] = parse_schemas(args.schema)
    if not body:
        print("nothing to update", file=sys.stderr)
        return 1
    status, payload = api_request(session, "PATCH", f"/{args.id}", body=body)
    print(json.dumps(payload, indent=2, ensure_ascii=False))
    return 0 if status in (200,) else 5


def cmd_delete(args: argparse.Namespace) -> int:
    session = make_session(args)
    status, payload = api_request(session, "DELETE", f"/{args.id}")
    print(json.dumps({"status": status, "body": payload}, indent=2, ensure_ascii=False))
    return 0 if status in (200, 204) else 5


def cmd_get(args: argparse.Namespace) -> int:
    session = make_session(args)
    status, payload = api_request(session, "GET", f"/{args.id}")
    print(json.dumps(payload, indent=2, ensure_ascii=False))
    return 0 if status == 200 else 5


# ---------- entrypoint ----------

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--cookies", type=Path, default=DEFAULT_COOKIES)
    ap.add_argument("--rate", type=float, default=1.0,
                    help="Minimum seconds between requests (default: 1.0). Bump up for bulk ops.")
    ap.add_argument("--retries", type=int, default=4,
                    help="Max retries on connection reset / 5xx / 429 (default: 4).")
    ap.add_argument("--verbose", action="store_true",
                    help="Log every request and retry decision to stderr.")
    sub = ap.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("sync", help="List my dotflows and rewrite ./dotflows/mine/")
    s.add_argument("--har", type=Path, default=None)
    s.add_argument("--from-har-fallback", action="store_true")
    s.set_defaults(func=cmd_sync)

    s = sub.add_parser("create", help="POST a new dotflow")
    s.add_argument("--name", required=True, help='e.g. ".myflow"')
    s.add_argument("--prompt", required=True, help="explanation_prompt body")
    s.add_argument("--schema", action="append", default=[], help="output_schemas, key=value (repeatable)")
    s.set_defaults(func=cmd_create)

    s = sub.add_parser("update", help="PATCH an existing dotflow")
    s.add_argument("id")
    s.add_argument("--name", default=None)
    s.add_argument("--prompt", default=None)
    s.add_argument("--schema", action="append", default=None)
    s.set_defaults(func=cmd_update)

    s = sub.add_parser("delete", help="DELETE a dotflow by id")
    s.add_argument("id")
    s.set_defaults(func=cmd_delete)

    s = sub.add_parser("get", help="GET a single dotflow by id")
    s.add_argument("id")
    s.set_defaults(func=cmd_get)

    args = ap.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
