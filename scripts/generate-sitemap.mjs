// Post-build: sitemap.xml and llms.txt, generated from the pre-rendered
// pages themselves (dist/**/*.html), so neither can drift from the site.
//
// A page is listed only if it is indexable: no `noindex`, and its
// canonical points at itself (redirect stubs like /program and /services
// carry a foreign canonical or noindex and drop out on their own).
// lastmod is written only where it is true — an article's
// article:modified_time. Static pages get none rather than a fake
// "today" on every deploy, which teaches Google to ignore lastmod.
//
// llms.txt = the curated scripts/llms-intro.md + page and article lists
// read from the built HTML (title, meta description, dates).

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://www.karnafnadlan.com";

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(p));
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const attr = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : undefined;
};

function readPage(file) {
  const rel = relative(DIST, file).replace(/\\/g, "/").replace(/\.html$/, "");
  const path = rel === "index" ? "/" : `/${rel}`;
  const html = readFileSync(file, "utf8");
  return {
    path,
    title: attr(html, /<title[^>]*>([^<]*)<\/title>/),
    description: attr(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/),
    canonical: attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/),
    noindex: /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html),
    modified: attr(html, /<meta[^>]*property="article:modified_time"[^>]*content="([^"]*)"/),
  };
}

const noSlash = (u) => (u ?? "").replace(/\/$/, "");
const isSelfCanonical = (p) => noSlash(p.canonical) === noSlash(SITE + p.path);

const pages = htmlFiles(DIST)
  .map(readPage)
  .filter((p) => !p.noindex && isSelfCanonical(p))
  .sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));

const articles = pages
  .filter((p) => p.path.startsWith("/blog/"))
  .sort((a, b) => (b.modified ?? "").localeCompare(a.modified ?? ""));
const mainPages = pages.filter((p) => !p.path.startsWith("/blog/"));

// ── sitemap.xml ─────────────────────────────────────────────────────────
const xmlEscape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sitemap = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...pages.map((p) =>
    [
      "  <url>",
      `    <loc>${xmlEscape(SITE + (p.path === "/" ? "/" : p.path))}</loc>`,
      ...(p.modified ? [`    <lastmod>${p.modified}</lastmod>`] : []),
      "  </url>",
    ].join("\n")
  ),
  `</urlset>`,
  ``,
].join("\n");
writeFileSync(resolve(DIST, "sitemap.xml"), sitemap, "utf8");

// ── llms.txt ────────────────────────────────────────────────────────────
const line = (p) => {
  const title = (p.title ?? p.path).replace(/\s*\|\s*קרנף נדל״ן\s*$/, "");
  return `- [${title}](${SITE}${p.path === "/" ? "/" : p.path})${p.description ? `: ${p.description}` : ""}`;
};
const intro = readFileSync(resolve(ROOT, "scripts/llms-intro.md"), "utf8").trimEnd();
const llms = [
  intro,
  "",
  "## עמודי האתר",
  "",
  ...mainPages.map(line),
  "",
  "## מאמרים (ידע ותובנות)",
  "",
  ...articles.map((a) => `${line(a)}${a.modified ? ` (עודכן ${a.modified})` : ""}`),
  "",
].join("\n");
writeFileSync(resolve(DIST, "llms.txt"), llms, "utf8");

console.log(
  `[sitemap] ${pages.length} indexable pages (${articles.length} articles) → dist/sitemap.xml, dist/llms.txt`
);
