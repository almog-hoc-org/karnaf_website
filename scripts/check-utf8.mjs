// Post-build guard: no pre-rendered page may contain U+FFFD or NUL (a
// character broken during SSR — see patch-ssg-utf8.mjs). Fails the build.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");

const walk = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = resolve(d, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

const bad = [];
for (const f of walk(DIST)) {
  const html = readFileSync(f, "utf8");
  let i = html.indexOf("\uFFFD");
  if (i === -1) i = html.indexOf("\u0000");
  if (i !== -1) bad.push(`${relative(ROOT, f)}: …${html.slice(Math.max(0, i - 40), i + 20)}…`);
}

if (bad.length) {
  console.error(`[check-utf8] ${bad.length} page(s) contain broken characters (U+FFFD / NUL):\n  ${bad.join("\n  ")}`);
  process.exit(1);
}
console.log("[check-utf8] no broken characters in pre-rendered HTML");
