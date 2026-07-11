/**
 * Parse a *public* OpenEvidence conversation page (https://www.openevidence.com/ask/<id>)
 * into Q&A turns — no login, no relay, no cookies required. Once the author has
 * pressed "make public", OE serves the full conversation as SSR HTML to any
 * anonymous fetch; private conversations redirect to /login instead.
 *
 * The stable anchors we rely on (verified against a saved conversation in
 * test/fixtures/openevidence-public-page.html, and battle-tested in the
 * mcq-bank importer which parses the same pages in production):
 *
 *   • Each answer is wrapped in its own `<article>`.
 *   • The user's question for a turn sits in the nearest preceding
 *     `[data-testid="ask--query-bar"]` (the last, empty one is the composer).
 *   • The answer prose ends at a `<div data-answer-end="true">` sentinel; the
 *     citation list follows in `[class*="references_container"]`.
 *   • Figure thumbnails are `<button aria-label="Open figure…">` wrapping a
 *     content `<img>`; reference-source favicons are `/_next/image?...favicons`.
 *
 * Everything is defensive: if the anchors move in a future OE redesign we fall
 * back to coarser extraction (whole article, or whole body) rather than
 * returning nothing.
 */
import { parse, HTMLElement, NodeType, type Node } from "node-html-parser";

export interface PublicTurn {
  question: string;
  answerMarkdown: string;
  referencesMarkdown: string;
}

export interface PublicConversation {
  title: string;
  turns: PublicTurn[];
}

const OE_ORIGIN = "https://www.openevidence.com";
const OE_HOSTS = new Set(["www.openevidence.com", "openevidence.com"]);
const MAX_HTML = 3 * 1024 * 1024; // a conversation page is ~450KB
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/** Accept a bare article UUID or any openevidence.com URL containing one. */
export function extractArticleId(input: string): string | null {
  const trimmed = input.trim();
  const direct = trimmed.match(new RegExp(`^${UUID_RE.source}$`, "i"));
  if (direct) return direct[0].toLowerCase();
  try {
    const url = new URL(trimmed);
    if (!OE_HOSTS.has(url.hostname.toLowerCase())) return null;
    return url.pathname.match(UUID_RE)?.[0].toLowerCase() ?? null;
  } catch {
    return null;
  }
}

/**
 * Journal citation marks pasted alongside text — [1], [12], [1-2], [1,3],
 * [1–3] and immediate runs like [1][2]. Digits-only inside the brackets, so
 * prose like "[note]" survives. In API answers the marker often carries a
 * markdown link target (`[1](https://…)`) — the optional group eats it too,
 * along with the whitespace before the bracket.
 */
const CITATION_MARK_RE = /\s*\[\d+(?:\s*[-–,]\s*\d+)*\](?:\([^)\s]*\))?/g;

export function stripCitationMarkers(text: string): string {
  return text.replace(CITATION_MARK_RE, "");
}

export class PublicPageError extends Error {}

/** The anonymous fetch was redirected to login: the conversation is private. */
export class NotPublicError extends PublicPageError {}

export interface RelayLike {
  isConnected(): boolean;
  request(req: { method: string; path: string }): Promise<{ status: number; body: string }>;
}

export interface CookieAuth {
  /** Session cookie source, e.g. cookies.json — returns null when unavailable. */
  fetchHtml(path: string): Promise<string | null>;
}

/**
 * Fetch the SSR HTML of a conversation page, escalating auth as needed:
 *
 *   1. relay — runs inside your logged-in browser tab (`credentials:"include"`),
 *      so it reads private conversations too and always passes DataDome;
 *   2. anonymous fetch — zero setup, works for conversations made public;
 *   3. cookies — legacy cookies.json session, for headless setups without the
 *      extension (only tried when the anonymous fetch hits the login redirect).
 */
export async function fetchConversationHtml(
  articleId: string,
  opts?: { relay?: RelayLike | null; cookieAuth?: CookieAuth | null },
): Promise<string> {
  const path = `/ask/${articleId}`;

  if (opts?.relay?.isConnected()) {
    const { status, body } = await opts.relay.request({ method: "GET", path });
    if (status !== 200) {
      throw new PublicPageError(
        `GET ${path} via relay returned ${status} — the conversation may not exist.`,
      );
    }
    return body;
  }

  try {
    return await fetchAnonymously(path);
  } catch (err) {
    if (!(err instanceof NotPublicError)) throw err;
    const viaCookies = await opts?.cookieAuth?.fetchHtml(path);
    if (viaCookies != null) return viaCookies;
    throw err;
  }
}

async function fetchAnonymously(path: string): Promise<string> {
  let res: Response;
  try {
    res = await fetch(`${OE_ORIGIN}${path}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        accept: "text/html",
      },
      redirect: "follow",
    });
  } catch (err) {
    throw new PublicPageError(`fetch of ${path} failed: ${String(err)}`);
  }
  if (!res.ok) {
    throw new PublicPageError(`GET ${path} returned ${res.status}.`);
  }
  // A redirect away from /ask/ (to /login) means the conversation isn't public.
  const finalPath = res.url ? new URL(res.url).pathname : path;
  if (!finalPath.startsWith("/ask/")) {
    throw new NotPublicError(
      "The conversation is private (OpenEvidence redirected the anonymous fetch to login). " +
        "Connect the relay extension with a logged-in openevidence.com tab, or provide cookies.json.",
    );
  }
  const html = await res.text();
  if (html.length > MAX_HTML) {
    throw new PublicPageError("Page too large to parse safely.");
  }
  return html;
}

export function parsePublicConversation(html: string): PublicConversation {
  const doc = parse(html);

  let title = (doc.querySelector("title")?.text ?? "")
    .replace(/\s*\|\s*OpenEvidence\s*$/i, "")
    .trim();

  const articles = doc.querySelectorAll("article");
  if (articles.length === 0) {
    // No <article> wrappers. Only fall back to whole-body extraction if the
    // page still carries an answer-end sentinel (a real answer page whose
    // wrapper changed in a redesign). A not-found / not-public page has no
    // sentinel — return no turns so the caller can show a friendly message.
    if (!doc.querySelector("[data-answer-end]")) return { title, turns: [] };
    const body = reparse(doc.querySelector("body") ?? doc);
    stripChrome(body);
    const answerMarkdown = toMarkdown(body);
    return {
      title,
      turns: answerMarkdown
        ? [{ question: title || "(entire page)", answerMarkdown, referencesMarkdown: "" }]
        : [],
    };
  }

  // One pre-order walk gives document order for free: each query bar updates
  // the "current question"; each article closes a turn with it. The trailing
  // empty query bar (the composer) never precedes an article, so it is inert.
  const turns: PublicTurn[] = [];
  let currentQuestion = "";
  walkDocumentOrder(doc, (el) => {
    if (el.getAttribute("data-testid") === "ask--query-bar") {
      const text = normalize(el.text);
      if (text) currentQuestion = text;
      return false; // don't descend into the query bar
    }
    if (el.rawTagName?.toLowerCase() === "article") {
      turns.push({
        question: currentQuestion || "(question not found)",
        ...extractAnswer(el),
      });
      return false; // an article never nests another turn
    }
    return true;
  });

  // The anonymous SSR page title is a generic "OpenEvidence" (the specific
  // title is set client-side after hydration), so fall back to the first
  // question for a meaningful header.
  if (!title || title.toLowerCase() === "openevidence") {
    title = turns[0]?.question ?? "";
  }

  return { title, turns };
}

// ---------------------------------------------------------------------------
// Answer extraction
// ---------------------------------------------------------------------------

const REFS_SELECTOR = '[class*="references_container"], .brandable--references';

// The progress stepper OE renders above each answer ("Analyzed query…" → "Done").
// Text-anchored because the wrapper classes are hashed. The middle line is
// version-specific, so we also drop anything that merely *starts* with
// "Analyzed query".
const STATUS_TEXTS = new Set([
  "Analyzed query, searched for evidence",
  "Analyzed query",
  "Searched published medical literature, guidelines, FDA, CDC, and more",
  "Done",
]);

function extractAnswer(article: HTMLElement): {
  answerMarkdown: string;
  referencesMarkdown: string;
} {
  const clone = reparse(article);

  // Grab the citation list before the body cut — it sits *after* the
  // answer-end sentinel, together with feedback/follow-up chrome we drop.
  const refs = clone.querySelector(REFS_SELECTOR);
  const referencesMarkdown = refs ? extractReferences(refs) : "";

  const sentinel = clone.querySelector("[data-answer-end]");
  if (sentinel) {
    truncateAfter(clone, sentinel);
  } else {
    dropFollowUps(clone);
  }
  clone.querySelectorAll(REFS_SELECTOR).forEach((n) => n.remove());
  stripChrome(clone);

  return { answerMarkdown: toMarkdown(clone), referencesMarkdown };
}

// Rebuild the citation block under a clean "References" heading. OE renders it
// as a MUI Accordion whose label lives *inside the summary <button>* — so a
// blind chrome-strip would lose the label. Capture it first, drop the
// accordion heading, then strip the remaining chrome.
function extractReferences(refs: HTMLElement): string {
  const clone = reparse(refs);
  const headingEl = clone.querySelector("h1, h2, h3, h4, h5, h6");
  const label =
    normalize(headingEl?.text ?? "").replace(/\s*\d+\s*$/, "") || "References";
  headingEl?.remove();
  stripChrome(clone);
  const body = toMarkdown(clone);
  if (!body) return "";
  return `### ${label}\n\n${body}`;
}

function stripChrome(root: HTMLElement) {
  // 1) Unwrap figure buttons/links so their content <img> survives the
  //    interactive-element removal in the next step. The button's aria-label
  //    ("Open figure: <caption>, <journal>") is the only place the caption
  //    lives — carry it over as the image alt.
  for (const el of root.querySelectorAll('button, a[role="button"], [role="button"]')) {
    const imgs = el
      .querySelectorAll("img")
      .filter((im) => isContentImgSrc(im.getAttribute("src") ?? ""));
    if (!imgs.length) continue;
    const caption = (el.getAttribute("aria-label") ?? "").replace(/^Open figure:\s*/i, "");
    for (const im of imgs) {
      if (caption && !im.getAttribute("alt")) im.setAttribute("alt", caption);
    }
    el.replaceWith(...imgs);
  }

  // 1b) Inline citations render as a journal-name chip followed by an "[n]"
  //     span. Drop the chip and keep the number: the answer then carries
  //     standard numbered markers that match the references list (and that
  //     stripCitationMarkers can remove cleanly).
  root.querySelectorAll('[class*="MuiChip-root"]').forEach((n) => n.remove());

  // 2) Remove interactive controls, status widgets, and icon glyphs.
  root
    .querySelectorAll(
      'button, svg, textarea, input, form, [role="button"], [role="progressbar"], ' +
        '.MuiStepper-root, .MuiStep-root, .MuiStepButton-root, .MuiStepLabel-root, ' +
        '[data-testid$="Icon"], [data-testid^="ask--query-bar"], script, style, noscript',
    )
    .forEach((n) => n.remove());

  // 3) Remove the leftover status text ("Analyzed query…", "Done").
  for (const el of root.querySelectorAll("p, span, div, li")) {
    const t = normalize(el.text);
    if (STATUS_TEXTS.has(t) || (t.startsWith("Analyzed query") && t.length < 80)) {
      el.remove();
    }
  }

  // 4) Images: drop decorative favicons, resolve the Next.js proxy URL to the
  //    real source so the markdown link points at the actual figure.
  for (const im of root.querySelectorAll("img")) {
    const src = im.getAttribute("src") ?? "";
    if (!isContentImgSrc(src)) {
      im.remove();
      continue;
    }
    const real = resolveNextImage(src);
    if (real !== src) im.setAttribute("src", real);
  }
}

// A "content" image is a real figure, not a reference-source favicon.
function isContentImgSrc(src: string): boolean {
  if (!src) return false;
  if (src.includes("favicons")) return false;
  if (/^https?:\/\//i.test(src)) return true;
  return src.startsWith("/_next/image");
}

// `/_next/image?url=<encoded>&w=…&q=…` → the underlying absolute URL.
function resolveNextImage(src: string): string {
  if (!src.startsWith("/_next/image")) return src;
  try {
    return new URL(src, OE_ORIGIN).searchParams.get("url") ?? src;
  } catch {
    return src;
  }
}

// Remove a trailing "Follow-Up Questions" section, used only in the
// no-sentinel fallback path.
function dropFollowUps(root: HTMLElement) {
  for (const el of root.querySelectorAll("*")) {
    if (normalize(el.text) === "Follow-Up Questions") {
      let target: HTMLElement | null = el;
      while (target && !/follow-up/i.test(target.getAttribute("class") ?? "")) {
        target = target.parentNode as HTMLElement | null;
        if (!target || target === root) break;
      }
      (target && target !== root ? target : (el.parentNode as HTMLElement | null) ?? el).remove();
      return;
    }
  }
}

// ---------------------------------------------------------------------------
// DOM utilities (node-html-parser has no Range / compareDocumentPosition)
// ---------------------------------------------------------------------------

/** Deep-clone an element as an independent tree we may mutate freely. */
function reparse(el: HTMLElement): HTMLElement {
  return parse(el.outerHTML ?? el.toString());
}

/** Pre-order walk; the visitor returns false to skip a subtree. */
function walkDocumentOrder(root: HTMLElement, visit: (el: HTMLElement) => boolean) {
  for (const child of root.childNodes) {
    if (child.nodeType !== NodeType.ELEMENT_NODE) continue;
    const el = child as HTMLElement;
    if (visit(el)) walkDocumentOrder(el, visit);
  }
}

/** Remove `node` and everything after it (in document order) within `root`. */
function truncateAfter(root: HTMLElement, node: HTMLElement) {
  let cur: Node = node;
  while (cur && cur !== root) {
    const parent = cur.parentNode;
    if (!parent) break;
    const siblings = parent.childNodes;
    const i = siblings.indexOf(cur);
    for (let k = siblings.length - 1; k > i; k--) {
      parent.removeChild(siblings[k]);
    }
    cur = parent;
  }
  node.remove();
}

// ---------------------------------------------------------------------------
// Markdown serialization — covers the tags OE actually emits (MUI wraps prose
// in <div>/<span>; content itself is p/strong/em/a/ol/ul/li/h*/img/table).
// ---------------------------------------------------------------------------

const BLOCK_TAGS = new Set([
  "p", "div", "section", "main", "header", "footer", "figure", "figcaption",
  "blockquote", "pre",
]);
const SKIP_TAGS = new Set(["script", "style", "noscript", "svg", "template", "head"]);

export function toMarkdown(root: HTMLElement): string {
  const out = renderChildren(root, { listStack: [] });
  return out
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

interface RenderCtx {
  listStack: ("ul" | "ol")[];
}

function renderChildren(el: HTMLElement, ctx: RenderCtx): string {
  let out = "";
  for (const child of el.childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      out += child.text.replace(/\s+/g, " ");
    } else if (child.nodeType === NodeType.ELEMENT_NODE) {
      out += renderElement(child as HTMLElement, ctx);
    }
  }
  return out;
}

function renderElement(el: HTMLElement, ctx: RenderCtx): string {
  const tag = el.rawTagName?.toLowerCase() ?? "";
  if (SKIP_TAGS.has(tag)) return "";

  switch (tag) {
    case "br":
      return "\n";
    case "strong":
    case "b": {
      const inner = renderChildren(el, ctx).trim();
      return inner ? `**${inner}**` : "";
    }
    case "em":
    case "i": {
      const inner = renderChildren(el, ctx).trim();
      return inner ? `*${inner}*` : "";
    }
    case "a": {
      const href = el.getAttribute("href") ?? "";
      const inner = renderChildren(el, ctx).trim();
      if (!/^https?:\/\//i.test(href)) return inner;
      return inner ? `[${inner}](${href})` : "";
    }
    case "img": {
      const src = el.getAttribute("src") ?? "";
      if (!src) return "";
      const alt = (el.getAttribute("alt") ?? "figure").replace(/[\[\]]/g, "");
      return `\n\n![${alt}](${src})\n\n`;
    }
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const level = Number(tag[1]);
      const inner = renderChildren(el, ctx).trim();
      return inner ? `\n\n${"#".repeat(level)} ${inner}\n\n` : "";
    }
    case "ul":
    case "ol": {
      ctx.listStack.push(tag);
      const inner = renderChildren(el, ctx);
      ctx.listStack.pop();
      return `\n\n${inner.replace(/\n{2,}/g, "\n").trim()}\n\n`;
    }
    case "li": {
      const kind = ctx.listStack[ctx.listStack.length - 1] ?? "ul";
      const indent = "  ".repeat(Math.max(0, ctx.listStack.length - 1));
      const marker = kind === "ol" ? "1." : "-";
      const inner = renderChildren(el, ctx).trim().replace(/\n{2,}/g, "\n");
      return `\n${indent}${marker} ${inner}`;
    }
    case "table":
      return renderTable(el, ctx);
    case "tr":
    case "td":
    case "th":
    case "thead":
    case "tbody":
      return renderChildren(el, ctx); // reached only outside a <table>
    default: {
      const inner = renderChildren(el, ctx);
      if (BLOCK_TAGS.has(tag)) {
        const trimmed = inner.trim();
        return trimmed ? `\n\n${trimmed}\n\n` : "";
      }
      return inner; // spans and other inline wrappers
    }
  }
}

function renderTable(table: HTMLElement, ctx: RenderCtx): string {
  const rows = table.querySelectorAll("tr");
  if (rows.length === 0) return "";
  const lines: string[] = [];
  rows.forEach((row, index) => {
    const cells = row
      .querySelectorAll("td, th")
      .map((cell) => renderChildren(cell, ctx).replace(/\s+/g, " ").trim().replace(/\|/g, "\\|"));
    if (cells.length === 0) return;
    lines.push(`| ${cells.join(" | ")} |`);
    if (index === 0) lines.push(`|${cells.map(() => " --- ").join("|")}|`);
  });
  return lines.length ? `\n\n${lines.join("\n")}\n\n` : "";
}

function normalize(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}
