#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { stderr, stdout } from "node:process";
import { pathToFileURL } from "node:url";

export type HeaderTuple = [string, string];

export interface BrowserFingerprint {
  version: 1;
  source?: {
    har?: string;
    method?: string;
    url?: string;
    status?: number;
  };
  headers: HeaderTuple[];
  warnings?: string[];
}

interface HarHeaderInput {
  name?: unknown;
  value?: unknown;
}

interface HarRequestInput {
  method?: unknown;
  url?: unknown;
  headers?: unknown;
}

interface HarEntryInput {
  request?: HarRequestInput;
  response?: {
    status?: unknown;
  };
}

const DEFAULT_CHROME_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36";

export const DEFAULT_BROWSER_FINGERPRINT: BrowserFingerprint = {
  version: 1,
  headers: [
    ["accept", "*/*"],
    ["accept-language", "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7"],
    ["content-type", "application/json"],
    ["origin", "https://www.openevidence.com"],
    ["priority", "u=1, i"],
    ["referer", "https://www.openevidence.com/ask"],
    ["sec-ch-ua", '"Chromium";v="148", "Brave";v="148", "Not/A)Brand";v="99"'],
    ["sec-ch-ua-arch", '"arm"'],
    [
      "sec-ch-ua-full-version-list",
      '"Chromium";v="148.0.0.0", "Brave";v="148.0.0.0", "Not/A)Brand";v="99.0.0.0"',
    ],
    ["sec-ch-ua-mobile", "?0"],
    ["sec-ch-ua-model", '""'],
    ["sec-ch-ua-platform", '"macOS"'],
    ["sec-fetch-dest", "empty"],
    ["sec-fetch-mode", "cors"],
    ["sec-fetch-site", "same-origin"],
    ["sec-gpc", "1"],
    ["user-agent", DEFAULT_CHROME_USER_AGENT],
  ],
};

export const BROWSER_FINGERPRINT_HEADER_NAMES = new Set(
  DEFAULT_BROWSER_FINGERPRINT.headers.map(([name]) => name),
);

const SENSITIVE_HEADER_NAMES = new Set(["authorization", "cookie", "proxy-authorization"]);
const TRANSPORT_HEADER_NAMES = new Set([
  "accept-encoding",
  "connection",
  "content-length",
  "host",
]);
const DYNAMIC_HEADER_NAMES = new Set(["baggage", "sentry-trace", "traceparent"]);
const REQUIRED_HINT_HEADERS = [
  "user-agent",
  "sec-ch-ua",
  "sec-ch-ua-platform",
  "sec-fetch-dest",
  "sec-fetch-mode",
  "sec-fetch-site",
] as const;

export async function loadBrowserFingerprint(
  fingerprintPath: string | undefined,
): Promise<BrowserFingerprint> {
  if (!fingerprintPath) {
    return DEFAULT_BROWSER_FINGERPRINT;
  }

  const raw = await readFile(fingerprintPath, "utf8");
  return normalizeBrowserFingerprint(JSON.parse(raw) as unknown, fingerprintPath);
}

export function normalizeBrowserFingerprint(input: unknown, source?: string): BrowserFingerprint {
  if (!input || typeof input !== "object") {
    throw new Error(`Invalid browser fingerprint${source ? ` in ${source}` : ""}: expected object.`);
  }

  const candidate = input as { headers?: unknown; source?: unknown; version?: unknown };
  const headers = normalizeFingerprintHeaders(candidate.headers);
  if (headers.length === 0) {
    throw new Error(
      `Invalid browser fingerprint${source ? ` in ${source}` : ""}: no usable headers.`,
    );
  }

  return {
    version: 1,
    source: normalizeFingerprintSource(candidate.source),
    headers,
  };
}

export function extractBrowserFingerprintFromHar(
  har: unknown,
  options: { harPath?: string; method?: string; path?: string } = {},
): BrowserFingerprint {
  const method = (options.method ?? "POST").toUpperCase();
  const targetPath = options.path ?? "/api/article";
  const entry = chooseHarEntry(har, method, targetPath);
  const request = entry.request;
  const headers = normalizeFingerprintHeaders(request?.headers);
  const warnings = missingHintWarnings(headers);

  if (headers.length === 0) {
    throw new Error("HAR request did not contain any usable browser fingerprint headers.");
  }

  return {
    version: 1,
    source: {
      ...(options.harPath ? { har: options.harPath } : {}),
      method: typeof request?.method === "string" ? request.method.toUpperCase() : method,
      url: typeof request?.url === "string" ? request.url : undefined,
      status: typeof entry.response?.status === "number" ? entry.response.status : undefined,
    },
    headers,
    ...(warnings.length > 0 ? { warnings } : {}),
  };
}

function chooseHarEntry(har: unknown, method: string, targetPath: string): HarEntryInput {
  const entries = getHarEntries(har);
  const scored = entries
    .map((entry) => ({ entry, score: scoreHarEntry(entry, method, targetPath) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const best = scored[0]?.entry;
  if (!best) {
    throw new Error(`No HAR request matched ${method} ${targetPath}.`);
  }
  return best;
}

function getHarEntries(har: unknown): HarEntryInput[] {
  const maybeHar = har as { log?: { entries?: unknown } };
  const entries = maybeHar?.log?.entries;
  if (!Array.isArray(entries)) {
    throw new Error("Invalid HAR: expected log.entries array.");
  }
  return entries as HarEntryInput[];
}

function scoreHarEntry(entry: HarEntryInput, method: string, targetPath: string): number {
  const request = entry.request;
  if (!request || typeof request.method !== "string" || typeof request.url !== "string") {
    return 0;
  }

  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return 0;
  }

  if (request.method.toUpperCase() !== method || url.pathname !== targetPath) {
    return 0;
  }

  let score = 200;
  if (url.hostname.endsWith("openevidence.com")) score += 20;

  const status = typeof entry.response?.status === "number" ? entry.response.status : 0;
  if (status >= 200 && status < 300) score += 50;
  if (status === 201) score += 20;

  const headers = normalizeFingerprintHeaders(request.headers);
  const headerMap = new Map(headers);
  if (headerMap.has("user-agent")) score += 10;
  if (headerMap.has("sec-ch-ua")) score += 10;
  if (headerMap.has("sec-fetch-site")) score += 10;

  return score;
}

function normalizeFingerprintHeaders(input: unknown): HeaderTuple[] {
  const tuples = headersInputToTuples(input);
  const normalized: HeaderTuple[] = [];
  const seen = new Set<string>();

  for (const [rawName, rawValue] of tuples) {
    const name = rawName.toLowerCase();
    if (seen.has(name) || !shouldKeepHeader(name)) {
      continue;
    }
    normalized.push([name, rawValue]);
    seen.add(name);
  }

  return normalized;
}

function headersInputToTuples(input: unknown): HeaderTuple[] {
  if (input instanceof Headers) {
    const tuples: HeaderTuple[] = [];
    input.forEach((value, name) => tuples.push([name, value]));
    return tuples;
  }

  if (Array.isArray(input)) {
    return input.flatMap((item): HeaderTuple[] => {
      if (Array.isArray(item) && item.length >= 2) {
        return [[String(item[0]), String(item[1])]];
      }
      const header = item as HarHeaderInput;
      if (typeof header.name === "string" && header.value !== undefined) {
        return [[header.name, String(header.value)]];
      }
      return [];
    });
  }

  if (input && typeof input === "object") {
    return Object.entries(input as Record<string, unknown>).map(([name, value]) => [
      name,
      String(value),
    ]);
  }

  return [];
}

function shouldKeepHeader(name: string): boolean {
  if (name.startsWith(":")) return false;
  if (SENSITIVE_HEADER_NAMES.has(name)) return false;
  if (TRANSPORT_HEADER_NAMES.has(name)) return false;
  if (DYNAMIC_HEADER_NAMES.has(name)) return false;
  return BROWSER_FINGERPRINT_HEADER_NAMES.has(name);
}

function normalizeFingerprintSource(input: unknown): BrowserFingerprint["source"] | undefined {
  if (!input || typeof input !== "object") {
    return undefined;
  }

  const source = input as Record<string, unknown>;
  return {
    har: typeof source.har === "string" ? source.har : undefined,
    method: typeof source.method === "string" ? source.method : undefined,
    url: typeof source.url === "string" ? source.url : undefined,
    status: typeof source.status === "number" ? source.status : undefined,
  };
}

function missingHintWarnings(headers: HeaderTuple[]): string[] {
  const headerMap = new Map(headers);
  return REQUIRED_HINT_HEADERS.flatMap((name) =>
    headerMap.has(name) ? [] : [`HAR fingerprint is missing ${name}.`],
  );
}

async function main(): Promise<void> {
  const harPath = getArgValue("--har");
  if (!harPath) {
    throw new Error("Usage: npm run fingerprint -- --har HARfile.har [--out openevidence-fingerprint.json]");
  }

  const outPath = getArgValue("--out");
  const method = getArgValue("--method") ?? "POST";
  const targetPath = getArgValue("--path") ?? "/api/article";
  const resolvedHarPath = path.resolve(harPath);
  const raw = await readFile(resolvedHarPath, "utf8");
  const fingerprint = extractBrowserFingerprintFromHar(JSON.parse(raw) as unknown, {
    harPath: resolvedHarPath,
    method,
    path: targetPath,
  });
  const payload = `${JSON.stringify(fingerprint, null, 2)}\n`;

  for (const warning of fingerprint.warnings ?? []) {
    stderr.write(`[fingerprint] warning: ${warning}\n`);
  }

  if (!outPath) {
    stdout.write(payload);
    return;
  }

  const resolvedOutPath = path.resolve(outPath);
  await mkdir(path.dirname(resolvedOutPath), { recursive: true });
  await writeFile(resolvedOutPath, payload, "utf8");
  stdout.write(
    `[fingerprint] wrote ${resolvedOutPath} from ${fingerprint.source?.method ?? method} ${fingerprint.source?.url ?? targetPath}\n`,
  );
}

function getArgValue(flag: string): string | undefined {
  const idx = process.argv.findIndex((value) => value === flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    stderr.write(`[fingerprint] failed: ${message}\n`);
    process.exit(1);
  });
}
