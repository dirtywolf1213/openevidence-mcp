import test from "node:test";
import assert from "node:assert/strict";

import {
  analyzeDatadomeStatic,
  analyzeExtensionPortSync,
  parseRawCookies,
  summarize,
  type DoctorCheck,
  type RawCookie,
} from "../src/doctor.js";
import { DEFAULT_BROWSER_FINGERPRINT, type BrowserFingerprint } from "../src/fingerprint.js";

const NOW = Date.UTC(2026, 5, 1); // 2026-06-01
const YEAR_SEC = 365 * 86_400;

function fingerprintFor(platform: string, arch: string, ua?: string): BrowserFingerprint {
  return {
    version: 1,
    headers: [
      ["sec-ch-ua-platform", `"${platform}"`],
      ["sec-ch-ua-arch", `"${arch}"`],
      ["user-agent", ua ?? "Mozilla/5.0"],
    ],
  };
}

function datadome(overrides: Partial<RawCookie> = {}): RawCookie {
  return {
    name: "datadome",
    value: "yuZSKAuSbPFpL8eILYyIkfoi_iGduyNz_BImW65g",
    domain: "openevidence.com",
    expires: NOW / 1000 + YEAR_SEC,
    ...overrides,
  };
}

function find(checks: DoctorCheck[], code: string): DoctorCheck | undefined {
  return checks.find((c) => c.code === code);
}

test("healthy cookie + matching macOS/arm fingerprint passes", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [datadome()],
    fingerprint: fingerprintFor("macOS", "arm"),
    fingerprintIsDefault: false,
    host: { platform: "darwin", arch: "arm64" },
    nowMs: NOW,
  });
  assert.equal(summarize(checks).fail, 0);
  assert.equal(find(checks, "datadome-present")?.level, "pass");
  assert.equal(find(checks, "fingerprint-host-match")?.level, "pass");
});

test("missing datadome cookie fails", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [{ name: "auth0", value: "x", domain: "openevidence.com", expires: null }],
    fingerprint: fingerprintFor("macOS", "arm"),
    fingerprintIsDefault: false,
    host: { platform: "darwin", arch: "arm64" },
    nowMs: NOW,
  });
  assert.equal(find(checks, "datadome-missing")?.level, "fail");
});

test("expired datadome cookie fails", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [datadome({ expires: NOW / 1000 - 10 })],
    fingerprint: fingerprintFor("macOS", "arm"),
    fingerprintIsDefault: false,
    host: { platform: "darwin", arch: "arm64" },
    nowMs: NOW,
  });
  assert.equal(find(checks, "datadome-expired")?.level, "fail");
});

test("datadome cookie expiring within 14 days warns", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [datadome({ expires: NOW / 1000 + 5 * 86_400 })],
    fingerprint: fingerprintFor("macOS", "arm"),
    fingerprintIsDefault: false,
    host: { platform: "darwin", arch: "arm64" },
    nowMs: NOW,
  });
  assert.equal(find(checks, "datadome-expiring")?.level, "warn");
});

test("session-scoped datadome cookie warns", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [datadome({ expires: null })],
    fingerprint: fingerprintFor("macOS", "arm"),
    fingerprintIsDefault: false,
    host: { platform: "darwin", arch: "arm64" },
    nowMs: NOW,
  });
  assert.equal(find(checks, "datadome-session")?.level, "warn");
});

test("OS mismatch (macOS fingerprint on linux host) fails — the switched-computer case", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [datadome()],
    fingerprint: fingerprintFor("macOS", "arm"),
    fingerprintIsDefault: false,
    host: { platform: "linux", arch: "x64" },
    nowMs: NOW,
  });
  const mismatch = find(checks, "fingerprint-platform-mismatch");
  assert.equal(mismatch?.level, "fail");
  assert.match(mismatch?.hint ?? "", /different machine/i);
  assert.equal(find(checks, "fingerprint-arch-mismatch"), undefined, "arch check is skipped once OS already fails");
});

test("arch mismatch on same OS warns (arm fingerprint, x64 mac host)", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [datadome()],
    fingerprint: fingerprintFor("macOS", "arm"),
    fingerprintIsDefault: false,
    host: { platform: "darwin", arch: "x64" },
    nowMs: NOW,
  });
  assert.equal(find(checks, "fingerprint-arch-mismatch")?.level, "warn");
});

test("default built-in fingerprint warns to re-mint on this machine", () => {
  const checks = analyzeDatadomeStatic({
    cookies: [datadome()],
    fingerprint: DEFAULT_BROWSER_FINGERPRINT,
    fingerprintIsDefault: true,
    host: { platform: "darwin", arch: "arm64" },
    nowMs: NOW,
  });
  assert.equal(find(checks, "fingerprint-default")?.level, "warn");
});

test("falls back to user-agent when sec-ch-ua-platform is absent", () => {
  const fp: BrowserFingerprint = {
    version: 1,
    headers: [["user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/148"]],
  };
  const checks = analyzeDatadomeStatic({
    cookies: [datadome()],
    fingerprint: fp,
    fingerprintIsDefault: false,
    host: { platform: "darwin", arch: "arm64" },
    nowMs: NOW,
  });
  assert.equal(find(checks, "fingerprint-platform-mismatch")?.level, "fail");
});

test("parseRawCookies reads both array and storage-state shapes with expiry", () => {
  const arr = parseRawCookies([
    { name: "datadome", value: "abc", domain: ".openevidence.com", expirationDate: 1795781738.5 },
  ]);
  assert.equal(arr[0].domain, "openevidence.com");
  assert.equal(arr[0].expires, 1795781738.5);

  const state = parseRawCookies({ cookies: [{ name: "datadome", value: "abc", domain: "x" }] });
  assert.equal(state[0].expires, null);

  assert.throws(() => parseRawCookies({ nope: true }), /Unsupported cookie file/);
});

test("extension port sync: matching baked port passes", () => {
  const checks = analyzeExtensionPortSync({
    configuredPort: 8780,
    extensionSource: 'const RELAY_BASE = `http://127.0.0.1:${8780}`;',
  });
  assert.equal(checks[0].level, "pass");
  assert.match(checks[0].message, /8780/);
});

test("extension port sync: drifted port fails with a rebuild hint", () => {
  const checks = analyzeExtensionPortSync({
    configuredPort: 8780,
    extensionSource: 'const RELAY_BASE = `http://127.0.0.1:${8787}`;',
  });
  assert.equal(checks[0].level, "fail");
  assert.match(checks[0].message, /8787/);
  assert.match(checks[0].message, /8780/);
  assert.match(checks[0].hint ?? "", /OE_MCP_RELAY_PORT=8780 npm run build/);
});

test("extension port sync: plain literal port form is also recognized", () => {
  const checks = analyzeExtensionPortSync({
    configuredPort: 9000,
    extensionSource: 'fetch("http://127.0.0.1:9000/poll")',
  });
  assert.equal(checks[0].level, "pass");
});

test("extension port sync: missing dist skips, unparseable source warns", () => {
  assert.equal(
    analyzeExtensionPortSync({ configuredPort: 8787, extensionSource: null })[0].level,
    "pass",
  );
  assert.equal(
    analyzeExtensionPortSync({ configuredPort: 8787, extensionSource: "no port here" })[0].level,
    "warn",
  );
});
