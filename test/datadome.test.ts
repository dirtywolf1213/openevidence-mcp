import test from "node:test";
import assert from "node:assert/strict";

import {
  buildOpenEvidenceHeaders,
  DataDomeChallengeError,
  isDataDomeChallenge,
} from "../src/openevidence-client.js";

function headers(init: Record<string, string> = {}): Pick<Response, "headers"> {
  return { headers: new Headers(init) };
}

test("isDataDomeChallenge: detects captcha-delivery interstitial body", () => {
  const body = '{"url":"https://geo.captcha-delivery.com/interstitial/?initialCid=AHrl"}';
  assert.equal(isDataDomeChallenge(headers(), body), true);
});

test("isDataDomeChallenge: detects x-datadome header", () => {
  assert.equal(isDataDomeChallenge(headers({ "x-datadome": "protected" }), ""), true);
});

test("isDataDomeChallenge: detects datadome set-cookie", () => {
  assert.equal(
    isDataDomeChallenge(headers({ "set-cookie": "datadome=abc; Path=/" }), ""),
    true,
  );
});

test("isDataDomeChallenge: ignores an ordinary 403 body", () => {
  assert.equal(isDataDomeChallenge(headers(), '{"error":"forbidden: insufficient scope"}'), false);
});

test("DataDomeChallengeError: is a non-retryable 403 with actionable message", () => {
  const err = new DataDomeChallengeError("POST /api/article");
  assert.equal(err.status, 403);
  assert.equal(err.name, "DataDomeChallengeError");
  assert.match(err.message, /POST \/api\/article/);
  assert.match(err.message, /browser/i);
  assert.match(err.message, /cookies\.json/);
});

test("buildOpenEvidenceHeaders: mirrors HAR browser signature for ask POST", () => {
  const headerTuples = buildOpenEvidenceHeaders(
    new URL("https://www.openevidence.com/api/article"),
    { method: "POST", headers: { "content-type": "application/json" }, body: "{}" },
    "session=redacted",
  );

  assert.deepEqual(
    headerTuples.map(([name]) => name),
    [
      "accept",
      "accept-language",
      "content-type",
      "origin",
      "priority",
      "referer",
      "sec-ch-ua",
      "sec-ch-ua-arch",
      "sec-ch-ua-full-version-list",
      "sec-ch-ua-mobile",
      "sec-ch-ua-model",
      "sec-ch-ua-platform",
      "sec-fetch-dest",
      "sec-fetch-mode",
      "sec-fetch-site",
      "sec-gpc",
      "user-agent",
      "cookie",
    ],
  );

  const h = new Map(headerTuples);
  assert.equal(h.get("accept"), "*/*");
  assert.equal(h.get("accept-language"), "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7");
  assert.equal(h.get("origin"), "https://www.openevidence.com");
  assert.equal(h.get("referer"), "https://www.openevidence.com/ask");
  assert.equal(
    h.get("sec-ch-ua"),
    '"Chromium";v="148", "Brave";v="148", "Not/A)Brand";v="99"',
  );
  assert.equal(h.get("sec-ch-ua-arch"), '"arm"');
  assert.equal(h.get("sec-ch-ua-mobile"), "?0");
  assert.equal(h.get("sec-ch-ua-platform"), '"macOS"');
  assert.equal(h.get("sec-fetch-dest"), "empty");
  assert.equal(h.get("sec-fetch-mode"), "cors");
  assert.equal(h.get("sec-fetch-site"), "same-origin");
  assert.match(h.get("user-agent") ?? "", /Chrome\/148\.0\.0\.0 Safari\/537\.36/);
});

test("buildOpenEvidenceHeaders: profile-faithful — a Safari fingerprint emits no Chrome client hints", () => {
  const safariFingerprint = {
    version: 1 as const,
    headers: [
      ["content-type", "application/json"],
      ["accept", "*/*"],
      ["accept-language", "zh-TW,zh-Hant;q=0.9"],
      ["sec-fetch-dest", "empty"],
      ["sec-fetch-mode", "cors"],
      ["sec-fetch-site", "same-origin"],
      ["origin", "https://www.openevidence.com"],
      ["referer", "https://www.openevidence.com/ask"],
      ["priority", "u=3, i"],
      [
        "user-agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15",
      ],
    ] as [string, string][],
  };

  const tuples = buildOpenEvidenceHeaders(
    new URL("https://www.openevidence.com/api/article"),
    { method: "POST", headers: { "content-type": "application/json" }, body: "{}" },
    "session=redacted",
    safariFingerprint,
  );
  const names = tuples.map(([name]) => name);
  const h = new Map(tuples);

  // No Chromium-only hints backfilled from the built-in default.
  assert.ok(!names.some((n) => n.startsWith("sec-ch-ua")), "must not emit sec-ch-ua*");
  assert.ok(!names.includes("sec-gpc"), "must not emit sec-gpc (Safari omits it)");
  // Carries Safari's own values, not Chrome's.
  assert.match(h.get("user-agent") ?? "", /Version\/26\.0 Safari\/605\.1\.15/);
  assert.equal(h.get("accept-language"), "zh-TW,zh-Hant;q=0.9");
  assert.equal(h.get("priority"), "u=3, i");
  // Dynamic + auth headers still present and last.
  assert.equal(h.get("origin"), "https://www.openevidence.com");
  assert.equal(names[names.length - 1], "cookie");
});
