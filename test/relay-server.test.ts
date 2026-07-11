import test from "node:test";
import assert from "node:assert/strict";

import { startRelayServer } from "../src/relay-server.js";

const post = (url: string, body: unknown) =>
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

test("relay: delivers a request to a polling client and resolves with status+body", async () => {
  const relay = await startRelayServer({ port: 0 });
  try {
    assert.equal(relay.isConnected(), false);

    const pollP = fetch(`http://127.0.0.1:${relay.port}/poll`).then((r) => r.json());
    const reqP = relay.request(
      { method: "POST", path: "/api/article", body: '{"q":1}' },
      { timeoutMs: 5000 },
    );

    const delivered = (await pollP) as {
      reqId: string;
      req: { method: string; path: string; body?: string };
    };
    assert.equal(delivered.req.method, "POST");
    assert.equal(delivered.req.path, "/api/article");
    assert.equal(delivered.req.body, '{"q":1}');
    assert.equal(relay.isConnected(), true);

    const r = await post(`http://127.0.0.1:${relay.port}/result`, {
      reqId: delivered.reqId,
      status: 200,
      body: '{"id":"abc-123"}',
    });
    assert.equal(r.status, 200);

    const out = await reqP;
    assert.equal(out.status, 200);
    assert.equal(out.body, '{"id":"abc-123"}');
  } finally {
    relay.close();
  }
});

test("relay: surfaces an extension-reported error", async () => {
  const relay = await startRelayServer({ port: 0 });
  try {
    const pollP = fetch(`http://127.0.0.1:${relay.port}/poll`).then((r) => r.json());
    const reqP = relay.request({ method: "GET", path: "/api/x" }, { timeoutMs: 5000 });
    const delivered = (await pollP) as { reqId: string };
    const rejection = assert.rejects(reqP, /DataDome 403 even from the tab/);
    await post(`http://127.0.0.1:${relay.port}/result`, {
      reqId: delivered.reqId,
      error: "DataDome 403 even from the tab",
    });
    await rejection;
  } finally {
    relay.close();
  }
});

test("relay: request times out when no extension responds", async () => {
  const relay = await startRelayServer({ port: 0 });
  try {
    await assert.rejects(
      relay.request({ method: "GET", path: "/api/x" }, { timeoutMs: 150 }),
      /did not respond/,
    );
  } finally {
    relay.close();
  }
});

test("relay: /health reports connection state", async () => {
  const relay = await startRelayServer({ port: 0 });
  try {
    const h = await fetch(`http://127.0.0.1:${relay.port}/health`).then((r) => r.json());
    assert.equal(h.ok, true);
    assert.equal(h.connected, false);
  } finally {
    relay.close();
  }
});

test("relay: /health carries live stats (uptime, served, errored, last activity)", async () => {
  const relay = await startRelayServer({ port: 0 });
  const health = () =>
    fetch(`http://127.0.0.1:${relay.port}/health`).then((r) => r.json()) as Promise<{
      startedAt: number;
      served: number;
      errored: number;
      lastActivityAt: number;
      pending: number;
    }>;
  try {
    const before = await health();
    assert.ok(typeof before.startedAt === "number" && before.startedAt > 0);
    assert.equal(before.served, 0);
    assert.equal(before.errored, 0);
    assert.equal(before.lastActivityAt, 0);

    // One served round-trip…
    const pollP = fetch(`http://127.0.0.1:${relay.port}/poll`).then((r) => r.json());
    const reqP = relay.request({ method: "GET", path: "/api/x" }, { timeoutMs: 5000 });
    const delivered = (await pollP) as { reqId: string };
    await post(`http://127.0.0.1:${relay.port}/result`, {
      reqId: delivered.reqId,
      status: 200,
      body: "{}",
    });
    await reqP;

    // …and one extension-reported failure.
    const pollP2 = fetch(`http://127.0.0.1:${relay.port}/poll`).then((r) => r.json());
    const reqP2 = relay.request({ method: "GET", path: "/api/y" }, { timeoutMs: 5000 });
    // Attach the rejection handler before the result lands, or the runner sees
    // a momentarily-unhandled rejection.
    const rejected = assert.rejects(reqP2, /extension: boom/);
    const delivered2 = (await pollP2) as { reqId: string };
    await post(`http://127.0.0.1:${relay.port}/result`, {
      reqId: delivered2.reqId,
      error: "boom",
    });
    await rejected;

    const after = await health();
    assert.equal(after.served, 1);
    assert.equal(after.errored, 1);
    assert.ok(after.lastActivityAt >= before.startedAt);
    assert.equal(after.pending, 0);
  } finally {
    relay.close();
  }
});
