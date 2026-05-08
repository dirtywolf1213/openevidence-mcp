#!/usr/bin/env python3
"""Refresh ./dotflows from the OpenEvidence library API using cookies.json.

Writes one markdown file per dotflow under ./dotflows/community/<category>/dotflow.<slug>.md
with YAML frontmatter (metadata) and the explanation_prompt as the plain-text body.
Reruns are idempotent: the community subtree is fully rewritten each time.
"""
from __future__ import annotations

import argparse
import base64
import json
import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _oe_session import OESession  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_COOKIES = ROOT / "cookies.json"
DEFAULT_HAR = ROOT / "www.openevidence.com_dotflow.har"
DOTFLOWS_DIR = ROOT / "dotflows"
OUT_DIR = DOTFLOWS_DIR / "community"
API_BASE = "https://www.openevidence.com/api/dotflows/dot-flows/library"

META_KEYS = [
    "id",
    "name",
    "description",
    "category",
    "author_name",
    "specialty",
    "is_anonymous",
    "is_featured",
    "invocation_count",
    "clone_count",
    "published_at",
    "gcs_url",
    "output_schemas",
    "curated",
]

# `curated` is derived from the source endpoint, not part of the API payload.
KNOWN_API_KEYS = (set(META_KEYS) - {"curated"}) | {"explanation_prompt"}


def fetch_page(session: OESession, curated: bool, offset: int, limit: int) -> dict:
    url = (
        f"{API_BASE}?curated_only={'true' if curated else 'false'}"
        f"&exclude_curated=false&limit={limit}&offset={offset}"
    )
    status, payload = session.request("GET", url)
    if status != 200 or payload is None:
        raise RuntimeError(f"library page failed: HTTP {status} {payload}")
    return payload


def fetch_all_from_api(session: OESession) -> tuple[list[tuple[dict, bool]], int | None]:
    flows: dict[str, tuple[dict, bool]] = {}
    curated = fetch_page(session, True, 0, 30)
    for r in curated.get("results", []):
        flows[r["id"]] = (r, True)
    offset, limit = 0, 20
    expected: int | None = None
    while True:
        page = fetch_page(session, False, offset, limit)
        if expected is None:
            expected = page.get("count")
        results = page.get("results", [])
        for r in results:
            if r["id"] not in flows:
                flows[r["id"]] = (r, False)
        if not page.get("next") or not results:
            break
        offset += limit
    return list(flows.values()), expected


def fetch_all_from_har(har_path: Path) -> tuple[list[tuple[dict, bool]], int | None]:
    har = json.loads(har_path.read_text())
    flows: dict[str, tuple[dict, bool]] = {}
    expected: int | None = None
    for entry in har["log"]["entries"]:
        url = entry["request"]["url"]
        if "dotflows/dot-flows/library" not in url:
            continue
        content = entry["response"]["content"]
        text = content.get("text") or ""
        if content.get("encoding") == "base64":
            text = base64.b64decode(text).decode("utf-8")
        payload = json.loads(text)
        is_curated = "curated_only=true" in url
        if not is_curated and expected is None:
            expected = payload.get("count")
        for r in payload.get("results", []):
            if r["id"] not in flows:
                flows[r["id"]] = (r, is_curated)
    return list(flows.values()), expected


def slugify(name: str) -> str:
    s = re.sub(r"^\.+", "", name.strip())
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


def render_markdown(item: dict, curated: bool) -> str:
    meta = {k: item.get(k) for k in META_KEYS if k != "curated"}
    meta["curated"] = curated
    lines = ["---"]
    for k in META_KEYS:
        lines.append(f"{k}: {yaml_value(meta.get(k))}")
    lines.append("---")
    lines.append("")
    lines.append((item.get("explanation_prompt") or "").rstrip())
    lines.append("")
    return "\n".join(lines)


def write_dotflows(flows: list[tuple[dict, bool]]) -> None:
    unknown_keys: set[str] = set()
    for item, _ in flows:
        unknown_keys |= set(item) - KNOWN_API_KEYS
    if unknown_keys:
        print(
            f"warn: unknown API fields detected (schema drift?): {sorted(unknown_keys)}",
            file=sys.stderr,
        )

    DOTFLOWS_DIR.mkdir(exist_ok=True)
    if OUT_DIR.exists():
        shutil.rmtree(OUT_DIR)
    OUT_DIR.mkdir(parents=True)

    by_group: dict[tuple[str, str], list[tuple[dict, bool]]] = defaultdict(list)
    for item, curated in flows:
        category = (item.get("category") or "uncategorized").strip() or "uncategorized"
        slug = slugify(item.get("name", "unnamed"))
        by_group[(category, slug)].append((item, curated))

    counts: dict[str, int] = defaultdict(int)
    written: list[tuple[dict, bool, Path]] = []
    for (category, slug), entries in sorted(by_group.items()):
        entries.sort(
            key=lambda e: (
                -(e[0].get("invocation_count") or 0),
                -(e[0].get("clone_count") or 0),
                e[0].get("id") or "",
            )
        )
        cat_dir = OUT_DIR / category
        cat_dir.mkdir(exist_ok=True)
        for idx, (item, curated) in enumerate(entries, start=1):
            fname = f"dotflow.{slug}.md" if idx == 1 else f"dotflow.{slug}.{idx}.md"
            path = cat_dir / fname
            path.write_text(render_markdown(item, curated), encoding="utf-8")
            counts[category] += 1
            written.append((item, curated, path))

    write_top_ten(written)

    total = sum(counts.values())
    print(f"Wrote {total} dotflows under {OUT_DIR}")
    for category, n in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {category}: {n}")


def write_top_ten(written: list[tuple[dict, bool, Path]]) -> None:
    ranked = sorted(
        written,
        key=lambda w: (
            -(w[0].get("invocation_count") or 0),
            -(w[0].get("clone_count") or 0),
            w[0].get("id") or "",
        ),
    )[:10]

    lines = [
        "# Top 10 dotflows",
        "",
        "Auto-generated by `scripts/update_dotflows.py`. Ranked by `invocation_count` "
        "(ties broken by `clone_count`, then `id`).",
        "",
        "| # | Name | Category | Author | Invocations | Clones | File |",
        "| ---: | --- | --- | --- | ---: | ---: | --- |",
    ]
    for rank, (item, curated, path) in enumerate(ranked, start=1):
        rel = path.relative_to(DOTFLOWS_DIR).as_posix()
        name = (item.get("name") or "").replace("|", r"\|")
        category = item.get("category") or "—"
        author = (item.get("author_name") or "—").replace("|", r"\|")
        inv = f"{(item.get('invocation_count') or 0):,}"
        clones = f"{(item.get('clone_count') or 0):,}"
        marker = " ⭐" if curated else ""
        lines.append(
            f"| {rank} | `{name}`{marker} | {category} | {author} | {inv} | {clones} | [{rel}]({rel}) |"
        )
    lines.append("")
    lines.append("⭐ marks curated/featured flows from OpenEvidence.")
    lines.append("")
    (DOTFLOWS_DIR / "top_ten_dotflows.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--cookies", type=Path, default=DEFAULT_COOKIES,
                    help=f"Path to cookies.json (default: {DEFAULT_COOKIES})")
    ap.add_argument("--har", type=Path, default=None,
                    help="Use a captured HAR instead of hitting the API")
    ap.add_argument("--from-har-fallback", action="store_true",
                    help=f"If API fails, fall back to {DEFAULT_HAR}")
    ap.add_argument("--rate", type=float, default=1.0,
                    help="Minimum seconds between requests (default: 1.0)")
    ap.add_argument("--retries", type=int, default=4,
                    help="Max retries on connection reset / 5xx / 429 (default: 4)")
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    if args.har:
        flows, expected = fetch_all_from_har(args.har)
    else:
        if not args.cookies.exists():
            print(f"cookies file not found: {args.cookies}", file=sys.stderr)
            return 1
        try:
            session = OESession(args.cookies, min_interval=args.rate,
                                max_retries=args.retries, verbose=args.verbose)
            flows, expected = fetch_all_from_api(session)
        except (RuntimeError, TimeoutError) as e:
            if args.from_har_fallback and DEFAULT_HAR.exists():
                print(f"API failed ({e}); falling back to {DEFAULT_HAR}", file=sys.stderr)
                flows, expected = fetch_all_from_har(DEFAULT_HAR)
            else:
                print(f"API request failed: {e}", file=sys.stderr)
                return 2

    if not flows:
        print("no flows fetched", file=sys.stderr)
        return 3

    if expected is not None and len(flows) < expected:
        print(
            f"error: API reported count={expected} but collected {len(flows)} unique flows; "
            "pagination may have dropped pages — refusing to overwrite ./dotflows",
            file=sys.stderr,
        )
        return 4

    write_dotflows(flows)
    if expected is not None and len(flows) > expected:
        print(
            f"note: collected {len(flows)} flows, more than API count={expected} "
            "(curated set may overlap differently than expected)",
            file=sys.stderr,
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
