"""Shared HTTP session for OpenEvidence API scripts.

Designed for bulk-safe operation against DataDome:
  1. Absorbs `Set-Cookie` from every response so the rotating `datadome` token
     stays fresh (the main reason naive scripts get reset after a few calls).
  2. Paces requests with a configurable minimum interval (default 1s).
  3. Retries connection resets and 5xx with exponential backoff + jitter.
  4. Sends the full browser-fingerprint header set DataDome scores on.

Caller-facing surface:
    sess = OESession(Path("cookies.json"))
    status, payload = sess.request("GET",  "https://.../api/dotflows/dot-flows")
    status, payload = sess.request("PATCH", url, body={"name": ".x"})

A 0 status means the connection never produced an HTTP response (URLError after
exhausting retries) — payload["error"] explains why.
"""
from __future__ import annotations

import json
import random
import time
import urllib.error
import urllib.request
from pathlib import Path

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36"
)

DEFAULT_HEADERS = {
    "Accept": "*/*",
    "Accept-Encoding": "identity",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent": USER_AGENT,
    "Origin": "https://www.openevidence.com",
    "Referer": "https://www.openevidence.com/dotflows",
    "sec-ch-ua": '"Chromium";v="147", "Not.A/Brand";v="8"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
}


class OESession:
    def __init__(
        self,
        cookies_path: Path,
        *,
        min_interval: float = 1.0,
        max_retries: int = 4,
        timeout: float = 30.0,
        verbose: bool = False,
    ) -> None:
        raw = json.loads(cookies_path.read_text())
        # Order is preserved; later Set-Cookie absorptions update by name.
        self.cookies: dict[str, str] = {c["name"]: c["value"] for c in raw}
        self.min_interval = min_interval
        self.max_retries = max_retries
        self.timeout = timeout
        self.verbose = verbose
        self._last = 0.0

    # ----- cookies -----

    def cookie_header(self) -> str:
        return "; ".join(f"{k}={v}" for k, v in self.cookies.items())

    def _absorb_set_cookie(self, headers) -> None:
        # Each raw header looks like: "name=value; Path=/; Secure; ..."
        for raw in headers.get_all("Set-Cookie") or []:
            kv = raw.split(";", 1)[0].strip()
            if "=" in kv:
                k, v = kv.split("=", 1)
                k = k.strip()
                v = v.strip()
                if k:
                    self.cookies[k] = v

    # ----- pacing & backoff -----

    def _pace(self) -> None:
        elapsed = time.monotonic() - self._last
        if elapsed < self.min_interval:
            time.sleep(self.min_interval - elapsed)

    def _backoff(self, attempt: int) -> float:
        # 1s, 2s, 4s, 8s, 16s + 0–0.5s jitter
        wait = (2 ** attempt) + random.uniform(0.0, 0.5)
        time.sleep(wait)
        return wait

    # ----- request -----

    def request(
        self,
        method: str,
        url: str,
        *,
        body: dict | None = None,
        extra_headers: dict[str, str] | None = None,
    ) -> tuple[int, dict | None]:
        data = json.dumps(body).encode("utf-8") if body is not None else None

        last_err: str | None = None
        for attempt in range(self.max_retries + 1):
            self._pace()
            headers = dict(DEFAULT_HEADERS)
            headers["Cookie"] = self.cookie_header()
            if data is not None:
                headers["Content-Type"] = "application/json"
            if extra_headers:
                headers.update(extra_headers)

            req = urllib.request.Request(url, method=method, headers=headers, data=data)
            try:
                with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                    self._absorb_set_cookie(resp.headers)
                    self._last = time.monotonic()
                    raw = resp.read().decode("utf-8")
                    payload = json.loads(raw) if raw else None
                    if self.verbose:
                        print(f"[oe] {method} {url} -> {resp.status}")
                    return resp.status, payload
            except urllib.error.HTTPError as e:
                self._absorb_set_cookie(e.headers)
                self._last = time.monotonic()
                raw = e.read().decode("utf-8", errors="replace")
                try:
                    payload = json.loads(raw)
                except ValueError:
                    payload = {"error": raw}
                # Retry on transient 5xx and 429; let 4xx fall through.
                if (500 <= e.code < 600 or e.code == 429) and attempt < self.max_retries:
                    waited = self._backoff(attempt)
                    if self.verbose:
                        print(f"[oe] {method} {url} -> {e.code}; retry in {waited:.1f}s")
                    continue
                if self.verbose:
                    print(f"[oe] {method} {url} -> {e.code}")
                return e.code, payload
            except urllib.error.URLError as e:
                self._last = time.monotonic()
                last_err = str(e.reason)
                if attempt < self.max_retries:
                    waited = self._backoff(attempt)
                    if self.verbose:
                        print(f"[oe] {method} {url} -> URLError {last_err}; retry in {waited:.1f}s")
                    continue
                return 0, {"error": f"connection failed after {self.max_retries + 1} tries: {last_err}"}

        return 0, {"error": f"exhausted retries: {last_err}"}
