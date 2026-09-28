// Build-time sitemap generator.
// Reads the blog post files (src/data/blog/posts) for blog dates, emits `dist/sitemap.xml`
// (and copies `public/sitemap.xml` so dev still has one).
//
// Run automatically as a postbuild step.

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SITE = "https://www.karnafnadlan.com";

const today = new Date().toISOString().slice(0, 10);

/**
 * Read slug + dates out of each post file (src/data/blog/posts/*.ts)
 * without compiling. `updated` (last fact-check) wins over `date` for
 * lastmod when present.
 */
function readArticles() {
  const dir = resolve(ROOT, "src/data/blog/posts");
  const out = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
    const src = readFileSync(resolve(dir, file), "utf8");
    const field = (name) => src.match(new RegExp(`"?${name}"?:\\s*"([^"]+)"`))?.[1];
    const slug = field("slug");
    const date = field("updated") ?? field("date");
    if (slug && date) out.push({ slug, date });
  }
  return out;
}

/**
 * Static routes get `lastmod` = today (rebuilt on every deploy).
 * Articles get their `date` field as `lastmod`.
 */
const STATIC_ROUTES = [
  { loc: "/",             priority: "1.0", changefreq: "weekly"  },
  { loc: "/course",       priority: "0.9", changefreq: "weekly"  },
  { loc: "/premium",      priority: "0.9", changefreq: "weekly"  },
  { loc: "/mortgage",     priority: "0.9", changefreq: "weekly"  },
  { loc: "/about",        priority: "0.7", changefreq: "monthly" },
  { loc: "/testimonials", priority: "0.8", changefreq: "weekly"  },
  { loc: "/contact",      priority: "0.6", changefreq: "monthly" },
  { loc: "/blog",         priority: "0.7", changefreq: "weekly"  },
  { loc: "/privacy",      priority: "0.3", changefreq: "yearly"  },
];

function urlEntry(loc, lastmod, priority, changefreq) {
  return [
    "  <url>",
    `    <loc>${SITE}${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function buildSitemap() {
  const articles = readArticles();
  const entries = [];

  // Static routes
  for (const r of STATIC_ROUTES) {
    entries.push(urlEntry(r.loc, today, r.priority, r.changefreq));
  }

  // Article routes — last update (or publish) date as lastmod
  for (const a of articles) {
    entries.push(
      urlEntry(`/blog/${a.slug}`, a.date, "0.6", "monthly")
    );
  }

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    entries.join("\n"),
    `</urlset>`,
    ``,
  ].join("\n");
}

function writeTo(targetPath, xml) {
  const dir = dirname(targetPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(targetPath, xml, "utf8");
  return targetPath;
}

const xml = buildSitemap();
const distPath = writeTo(resolve(ROOT, "dist/sitemap.xml"), xml);
const publicPath = writeTo(resolve(ROOT, "public/sitemap.xml"), xml);

const articleCount = (xml.match(/<loc>/g) || []).length;
console.log(
  `[sitemap] generated ${articleCount} URLs · today=${today}\n` +
    `          → ${distPath}\n` +
    `          → ${publicPath}`
);
