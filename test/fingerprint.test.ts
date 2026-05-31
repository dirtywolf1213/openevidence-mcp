import test from "node:test";
import assert from "node:assert/strict";

import { extractBrowserFingerprintFromHar } from "../src/fingerprint.js";

test("extractBrowserFingerprintFromHar: keeps ordered browser signature headers only", () => {
  const fingerprint = extractBrowserFingerprintFromHar(
    {
      log: {
        entries: [
          {
            request: {
              method: "POST",
              url: "https://www.openevidence.com/api/article",
              headers: [
                { name: ":authority", value: "www.openevidence.com" },
                { name: "accept", value: "*/*" },
                { name: "accept-encoding", value: "gzip, deflate, br, zstd" },
                { name: "accept-language", value: "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7" },
                { name: "authorization", value: "Bearer secret" },
                { name: "baggage", value: "dynamic-sentry-data" },
                { name: "content-length", value: "207" },
                { name: "content-type", value: "application/json" },
                { name: "cookie", value: "session=secret" },
                { name: "origin", value: "https://www.openevidence.com" },
                { name: "priority", value: "u=1, i" },
                { name: "referer", value: "https://www.openevidence.com/ask" },
                {
                  name: "sec-ch-ua",
                  value: '"Chromium";v="148", "Brave";v="148", "Not/A)Brand";v="99"',
                },
                { name: "sec-ch-ua-arch", value: '"arm"' },
                { name: "sec-ch-ua-mobile", value: "?0" },
                { name: "sec-ch-ua-platform", value: '"macOS"' },
                { name: "sec-fetch-dest", value: "empty" },
                { name: "sec-fetch-mode", value: "cors" },
                { name: "sec-fetch-site", value: "same-origin" },
                { name: "sec-gpc", value: "1" },
                { name: "sentry-trace", value: "dynamic-sentry-trace" },
                {
                  name: "user-agent",
                  value:
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
                },
              ],
            },
            response: { status: 201 },
          },
        ],
      },
    },
    { harPath: "/tmp/www.openevidence.com.har" },
  );

  assert.equal(fingerprint.source?.status, 201);
  assert.deepEqual(
    fingerprint.headers.map(([name]) => name),
    [
      "accept",
      "accept-language",
      "content-type",
      "origin",
      "priority",
      "referer",
      "sec-ch-ua",
      "sec-ch-ua-arch",
      "sec-ch-ua-mobile",
      "sec-ch-ua-platform",
      "sec-fetch-dest",
      "sec-fetch-mode",
      "sec-fetch-site",
      "sec-gpc",
      "user-agent",
    ],
  );

  const headerMap = new Map(fingerprint.headers);
  assert.equal(headerMap.has("cookie"), false);
  assert.equal(headerMap.has("authorization"), false);
  assert.equal(headerMap.has("baggage"), false);
  assert.equal(headerMap.get("sec-fetch-site"), "same-origin");
  assert.match(headerMap.get("user-agent") ?? "", /Chrome\/148\.0\.0\.0/);
});
