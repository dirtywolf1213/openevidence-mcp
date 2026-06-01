#!/usr/bin/env python3
"""Extract cookies for a domain from Safari's Cookies.binarycookies into a
browser-cookies JSON array compatible with openevidence-mcp's cookies.json.

Usage:
  python scripts/safari_cookies.py [--domain openevidence.com] [--out cookies.safari.json]
"""
from __future__ import annotations

import argparse
import json
import os
import struct
import sys

MAC_EPOCH_OFFSET = 978307200  # seconds between 1970-01-01 and 2001-01-01

DEFAULT_PATH = os.path.expanduser(
    "~/Library/Containers/com.apple.Safari/Data/Library/Cookies/Cookies.binarycookies"
)


def parse_binarycookies(raw: bytes) -> list[dict]:
    if raw[:4] != b"cook":
        raise ValueError("not a binarycookies file (bad magic)")
    num_pages = struct.unpack(">I", raw[4:8])[0]
    page_sizes = [struct.unpack(">I", raw[8 + 4 * i : 12 + 4 * i])[0] for i in range(num_pages)]

    offset = 8 + 4 * num_pages
    cookies: list[dict] = []
    for size in page_sizes:
        page = raw[offset : offset + size]
        offset += size
        cookies.extend(_parse_page(page))
    return cookies


def _parse_page(page: bytes) -> list[dict]:
    # page header: 0x00000100, then uint32 LE cookie count, then offsets
    num = struct.unpack("<I", page[4:8])[0]
    cookie_offsets = [struct.unpack("<I", page[8 + 4 * i : 12 + 4 * i])[0] for i in range(num)]
    out = []
    for co in cookie_offsets:
        out.append(_parse_cookie(page[co:]))
    return out


def _parse_cookie(buf: bytes) -> dict:
    size = struct.unpack("<I", buf[0:4])[0]
    cookie = buf[:size]
    flags = struct.unpack("<I", cookie[8:12])[0]
    url_off, name_off, path_off, value_off = struct.unpack("<IIII", cookie[16:32])
    expiry = struct.unpack("<d", cookie[40:48])[0]

    def cstr(start: int) -> str:
        end = cookie.index(b"\x00", start)
        return cookie[start:end].decode("utf-8", "replace")

    domain = cstr(url_off)
    name = cstr(name_off)
    path = cstr(path_off)
    value = cstr(value_off)
    return {
        "name": name,
        "value": value,
        "domain": domain,
        "path": path or "/",
        "secure": bool(flags & 1),
        "httpOnly": bool(flags & 4),
        "expirationDate": expiry + MAC_EPOCH_OFFSET if expiry else None,
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--domain", default="openevidence.com")
    ap.add_argument("--path", default=DEFAULT_PATH, help="Safari Cookies.binarycookies path")
    ap.add_argument("--out", default="-", help="output file or - for stdout")
    args = ap.parse_args()

    with open(args.path, "rb") as fh:
        raw = fh.read()

    cookies = [c for c in parse_binarycookies(raw) if args.domain in c["domain"]]
    if not cookies:
        sys.stderr.write(f"No cookies matching {args.domain!r} in {args.path}\n")
        return 1

    payload = json.dumps(cookies, indent=2) + "\n"
    if args.out == "-":
        sys.stdout.write(payload)
    else:
        with open(args.out, "w") as fh:
            fh.write(payload)
        names = ", ".join(sorted(c["name"] for c in cookies))
        sys.stderr.write(f"wrote {len(cookies)} cookies to {args.out}\n  names: {names}\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
