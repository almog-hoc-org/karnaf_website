// Post-build: prune wasteful auto-generated <link rel="preload"> tags.
//
// vite-react-ssg preloads every asset a page's modules reference. Two of
// those preloads actively hurt performance:
//   1. Font subsets the site never renders (arabic/cyrillic/latin-ext…) —
//      unicode-range would skip them, but a preload forces the download.
//   2. The hero JPEG fallback — AVIF-capable browsers would otherwise
//      download the hero twice (preloaded JPEG + <picture> AVIF).
//   3. Lazy or desktop-only images (mascots, About photo): a preload
//      downloads them on every phone for nothing.
// Image preloads that stay lose their crossorigin attribute: the <img>
// that uses them fetches without CORS, and a mismatched preload is not
// reused — the browser downloads the image twice.
// The hand-authored AVIF preload (from <Head>) is kept.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(p));
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function shouldDrop(tag) {
  if (!tag.includes('rel="preload"')) return false;
  if (tag.includes('as="font"')) {
    if (tag.includes("-italic")) return true;
    // Keep only the subsets the site actually renders: hebrew + latin.
    return !/rubik-hebrew-wght-normal|rubik-latin-wght-normal/.test(tag);
  }
  if (tag.includes('as="image"')) {
    // JPEG fallback of the AVIF hero — preloading it doubles the hero download.
    if (/hero-city-[^"]*\.jpg/.test(tag)) return true;
    // Below-the-fold, lazy or desktop-only images (mascots, About photo).
    if (/mascot-[^"]*\.(webp|png)|itamar-almog-about|itamar-[^"]*\.webp|almog-[^"]*\.webp/.test(tag)) return true;
  }
  return false;
}

const files = htmlFiles(resolve(ROOT, "dist"));
let total = 0;
let totalFixed = 0;
for (const file of files) {
  const html = readFileSync(file, "utf8");
  let removed = 0;
  let fixed = 0;
  const out = html.replace(/<link rel="preload"[^>]*>/g, (tag) => {
    if (shouldDrop(tag)) {
      removed++;
      return "";
    }
    if (tag.includes('as="image"') && tag.includes("crossorigin")) {
      fixed++;
      return tag.replace(/\s+crossorigin(="[^"]*")?/, "");
    }
    return tag;
  });
  if (removed || fixed) {
    writeFileSync(file, out, "utf8");
    total += removed;
    totalFixed += fixed;
  }
}
console.log(
  `[cleanup-preloads] removed ${total} wasteful preload tags, fixed crossorigin on ${totalFixed}, across ${files.length} pages`
);
