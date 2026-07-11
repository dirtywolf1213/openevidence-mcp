import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  extractArticleId,
  fetchConversationHtml,
  NotPublicError,
  parsePublicConversation,
  PublicPageError,
  stripCitationMarkers,
} from "../src/public-page.js";

const FIXTURE = path.join(import.meta.dirname, "fixtures", "openevidence-public-page.html");

test("extractArticleId accepts bare UUIDs and /ask/ URLs", () => {
  const id = "0198c2fe-32a1-7bc0-a648-f3f421356a2b";
  assert.equal(extractArticleId(id), id);
  assert.equal(extractArticleId(id.toUpperCase()), id);
  assert.equal(extractArticleId(`https://www.openevidence.com/ask/${id}`), id);
  assert.equal(extractArticleId(`https://openevidence.com/ask/${id}?utm=x`), id);
  assert.equal(extractArticleId("https://evil.example.com/ask/" + id), null);
  assert.equal(extractArticleId("not-a-uuid"), null);
});

test("stripCitationMarkers removes digits-only brackets and their link targets", () => {
  assert.equal(
    stripCitationMarkers("Efficacy was shown.[1] Safety too.[2,3] Range.[1-3] Dash.[1–3]"),
    "Efficacy was shown. Safety too. Range. Dash.",
  );
  // Markdown citation links from API answers: the target is eaten with the marker.
  assert.equal(
    stripCitationMarkers("Improved OS.[1](https://www.openevidence.com/citation/x) Next."),
    "Improved OS. Next.",
  );
  // Runs like [1][2] and whitespace before the bracket are eaten.
  assert.equal(stripCitationMarkers("Shown [1][2] here."), "Shown here.");
  // Non-numeric brackets survive.
  assert.equal(stripCitationMarkers("See [note] and [Fig 1]."), "See [note] and [Fig 1].");
});

test("parses a saved public conversation into turns", async () => {
  const html = await readFile(FIXTURE, "utf8");
  const conversation = parsePublicConversation(html);

  // The fixture holds 2 answers (plus a trailing empty composer query bar).
  assert.equal(conversation.turns.length, 2);
  for (const turn of conversation.turns) {
    assert.ok(turn.question.length > 0, "question extracted");
    assert.notEqual(turn.question, "(question not found)");
    assert.ok(turn.answerMarkdown.length > 100, "answer has substance");

    // Status stepper chrome must not leak into the answer.
    assert.ok(!turn.answerMarkdown.includes("Analyzed query"), "no stepper text");
    assert.ok(!/^Done$/m.test(turn.answerMarkdown), "no stepper 'Done'");
    // Follow-up chrome sits after the answer-end sentinel.
    assert.ok(!turn.answerMarkdown.includes("Follow-Up Questions"), "no follow-ups");
    // No raw HTML tags survive markdown serialization.
    assert.ok(!/<\/?(div|span|button|svg)\b/i.test(turn.answerMarkdown), "no html tags");
    // Inline citation chips collapse to bare numbered markers: the journal-name
    // chip is dropped, the [n] stays and matches the references list.
    assert.ok(/\[\d+\]/.test(turn.answerMarkdown), "numbered citation markers kept");
    assert.ok(!/Blood Advances\[\d/.test(turn.answerMarkdown), "journal chip dropped");
  }

  // The generic SSR <title> falls back to the first question.
  assert.equal(conversation.title, conversation.turns[0].question);

  // References: extracted separately, under a clean heading, favicons dropped.
  const refs = conversation.turns.map((t) => t.referencesMarkdown).join("\n");
  assert.ok(/^### References/m.test(refs), "references heading rebuilt");
  assert.ok(!refs.includes("favicons"), "reference favicons dropped");
});

test("figure images survive with resolved sources", async () => {
  const html = await readFile(FIXTURE, "utf8");
  const conversation = parsePublicConversation(html);
  const all = conversation.turns.map((t) => t.answerMarkdown).join("\n");
  const images = [...all.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
  assert.ok(images.length > 0, "at least one figure kept");
  for (const [, , src] of images) {
    assert.ok(!src.startsWith("/_next/image"), `next/image proxy resolved: ${src}`);
    assert.ok(/^https?:\/\//.test(src), `absolute figure url: ${src}`);
    assert.ok(!src.includes("favicons"), "no favicon images");
  }
  // Figure captions live only in the wrapping button's aria-label — the parser
  // carries them over as the image alt text.
  assert.ok(
    images.some(([, alt]) => alt.length > 10),
    "figure caption carried into alt text",
  );
});

test("a page without answers yields no turns instead of junk", () => {
  const conversation = parsePublicConversation(
    "<html><head><title>OpenEvidence</title></head><body><main>Log in</main></body></html>",
  );
  assert.equal(conversation.turns.length, 0);
});

// --- edge cases: id extraction & marker stripping ----------------------------

test("extractArticleId edge cases", () => {
  const id = "0198c2fe-32a1-7bc0-a648-f3f421356a2b";
  // Surrounding whitespace is tolerated.
  assert.equal(extractArticleId(`  ${id}  `), id);
  // Extra path segments after the UUID still resolve.
  assert.equal(extractArticleId(`https://www.openevidence.com/ask/${id}/share`), id);
  // A UUID only in the query string is NOT an /ask/ path — reject.
  assert.equal(extractArticleId(`https://www.openevidence.com/search?id=${id}`), null);
  // Junk around a bare UUID is not a UUID.
  assert.equal(extractArticleId(`x${id}`), null);
  assert.equal(extractArticleId(""), null);
});

test("stripCitationMarkers edge cases", () => {
  assert.equal(stripCitationMarkers(""), "");
  // Marker at the very start, multi-digit ranges.
  assert.equal(stripCitationMarkers("[1] Start. Mid.[10-12] End."), " Start. Mid. End.");
  // Non-citation markdown links (non-digit text) survive untouched.
  assert.equal(
    stripCitationMarkers("See [2023 Guidelines](https://x.example) for details.[4]"),
    "See [2023 Guidelines](https://x.example) for details.",
  );
  // A parenthesized group with spaces is prose, not a link target — keep it.
  assert.equal(stripCitationMarkers("Shown.[1] (see figure 2)"), "Shown. (see figure 2)");
});

// --- edge cases: parser fallbacks and block rendering -------------------------

const SYNTHETIC_PAGE = `<html><head><title>OpenEvidence</title></head><body>
<div data-testid="ask--query-bar">First question?</div>
<article>
  <p>Answer <strong>one</strong>.</p>
  <table><tr><th>Drug</th><th>Dose</th></tr><tr><td>A</td><td>10 mg</td></tr></table>
  <ul><li>alpha</li><li>beta</li></ul>
  <div data-answer-end="true"></div>
  <div class="xx_references_container"><h3>References 2</h3><ol><li><a href="https://x.example/ref">Ref</a></li></ol></div>
  <div class="follow-up">Follow-Up Questions</div>
</article>
<div data-testid="ask--query-bar">Second question?</div>
<article><p>Answer two.</p><div data-answer-end="true"></div></article>
<div data-testid="ask--query-bar"></div>
</body></html>`;

test("questions pair with their articles in document order", () => {
  const { turns } = parsePublicConversation(SYNTHETIC_PAGE);
  assert.equal(turns.length, 2);
  assert.equal(turns[0].question, "First question?");
  assert.equal(turns[1].question, "Second question?");
  assert.ok(turns[0].answerMarkdown.includes("**one**"));
  assert.ok(turns[1].answerMarkdown.includes("Answer two."));
});

test("tables and lists render as markdown; refs and follow-ups stay out of the answer", () => {
  const { turns } = parsePublicConversation(SYNTHETIC_PAGE);
  const answer = turns[0].answerMarkdown;
  assert.ok(answer.includes("| Drug | Dose |"), "table header row");
  assert.ok(answer.includes("| A | 10 mg |"), "table data row");
  assert.ok(/^- alpha$/m.test(answer), "list item alpha");
  assert.ok(!answer.includes("Follow-Up Questions"));
  assert.ok(!answer.includes("Ref"), "references not inlined in the answer");
  // The trailing count on the accordion label is stripped.
  assert.ok(turns[0].referencesMarkdown.startsWith("### References\n"));
  assert.ok(turns[0].referencesMarkdown.includes("[Ref](https://x.example/ref)"));
  // Second article has no references container at all.
  assert.equal(turns[1].referencesMarkdown, "");
});

test("no-sentinel article falls back to whole-article extraction minus follow-ups", () => {
  const html = `<html><body>
    <div data-testid="ask--query-bar">Q?</div>
    <article><p>Body text here.</p>
      <div class="follow-up-section"><h4>Follow-Up Questions</h4><p>More?</p></div>
    </article></body></html>`;
  const { turns } = parsePublicConversation(html);
  assert.equal(turns.length, 1);
  assert.ok(turns[0].answerMarkdown.includes("Body text here."));
  assert.ok(!turns[0].answerMarkdown.includes("Follow-Up Questions"));
  assert.ok(!turns[0].answerMarkdown.includes("More?"));
});

test("sentinel without <article> wrappers falls back to whole-body extraction", () => {
  const html = `<html><head><title>My Topic | OpenEvidence</title></head><body>
    <main><p>Hello world content.</p><div data-answer-end="true"></div></main></body></html>`;
  const conversation = parsePublicConversation(html);
  assert.equal(conversation.title, "My Topic");
  assert.equal(conversation.turns.length, 1);
  assert.ok(conversation.turns[0].answerMarkdown.includes("Hello world content."));
});

test("empty and junk input never throw", () => {
  assert.equal(parsePublicConversation("").turns.length, 0);
  assert.equal(parsePublicConversation("not html at all <<<>>>").turns.length, 0);
});

// --- auth escalation: relay → anonymous → cookies ---------------------------

const ID = "0198c2fe-32a1-7bc0-a648-f3f421356a2b";

function stubFetch(response: () => Response): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = (async () => response()) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

function responseAt(urlPath: string, body: string): Response {
  const res = new Response(body, { status: 200 });
  Object.defineProperty(res, "url", {
    value: `https://www.openevidence.com${urlPath}`,
  });
  return res;
}

test("fetchConversationHtml prefers a connected relay (private pages work)", async () => {
  const restore = stubFetch(() => {
    throw new Error("anonymous fetch must not run when the relay is connected");
  });
  try {
    const html = await fetchConversationHtml(ID, {
      relay: {
        isConnected: () => true,
        request: async ({ method, path }) => {
          assert.equal(method, "GET");
          assert.equal(path, `/ask/${ID}`);
          return { status: 200, body: "<html>relay page</html>" };
        },
      },
    });
    assert.equal(html, "<html>relay page</html>");
  } finally {
    restore();
  }
});

test("fetchConversationHtml falls back to anonymous fetch for public pages", async () => {
  const restore = stubFetch(() => responseAt(`/ask/${ID}`, "<html>public page</html>"));
  try {
    const html = await fetchConversationHtml(ID, { relay: null });
    assert.equal(html, "<html>public page</html>");
  } finally {
    restore();
  }
});

test("a login redirect escalates to the cookie session when available", async () => {
  const restore = stubFetch(() => responseAt("/login", "<html>sign in</html>"));
  try {
    const html = await fetchConversationHtml(ID, {
      relay: { isConnected: () => false, request: async () => ({ status: 0, body: "" }) },
      cookieAuth: { fetchHtml: async (path) => `<html>via cookies ${path}</html>` },
    });
    assert.equal(html, `<html>via cookies /ask/${ID}</html>`);
  } finally {
    restore();
  }
});

test("a private page without any credentials raises NotPublicError", async () => {
  const restore = stubFetch(() => responseAt("/login", "<html>sign in</html>"));
  try {
    await assert.rejects(
      fetchConversationHtml(ID, { cookieAuth: { fetchHtml: async () => null } }),
      NotPublicError,
    );
  } finally {
    restore();
  }
});

test("a relay error status raises PublicPageError without trying other paths", async () => {
  const restore = stubFetch(() => {
    throw new Error("anonymous fetch must not run when the relay answered");
  });
  try {
    await assert.rejects(
      fetchConversationHtml(ID, {
        relay: { isConnected: () => true, request: async () => ({ status: 404, body: "" }) },
      }),
      PublicPageError,
    );
  } finally {
    restore();
  }
});

test("an upstream 5xx does NOT escalate to cookies (only login redirects do)", async () => {
  let cookieTried = false;
  const restore = stubFetch(() => new Response("boom", { status: 503 }));
  try {
    await assert.rejects(
      fetchConversationHtml(ID, {
        cookieAuth: {
          fetchHtml: async () => {
            cookieTried = true;
            return "<html>should not be used</html>";
          },
        },
      }),
      (err: unknown) => err instanceof PublicPageError && !(err instanceof NotPublicError),
    );
    assert.equal(cookieTried, false, "cookie fallback reserved for login redirects");
  } finally {
    restore();
  }
});

test("a network failure surfaces as PublicPageError", async () => {
  const restore = stubFetch(() => {
    throw new TypeError("fetch failed");
  });
  try {
    await assert.rejects(fetchConversationHtml(ID, {}), PublicPageError);
  } finally {
    restore();
  }
});

test("an oversized page is rejected instead of parsed", async () => {
  const restore = stubFetch(() =>
    responseAt(`/ask/${ID}`, "x".repeat(3 * 1024 * 1024 + 1)),
  );
  try {
    await assert.rejects(fetchConversationHtml(ID, {}), /too large/);
  } finally {
    restore();
  }
});
