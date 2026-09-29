// Pre-build patch for the SSG's HTML output (vite-react-ssg 0.9.x on React 18).
//
// The bug: React 18's renderToPipeableStream (Node) encodes into fixed
// 2048-byte blocks. When a multi-byte character doesn't fit at the end of a
// block it moves to the next one — but the whole block is still written,
// so the unused tail goes out as 0x00 bytes. Hebrew letters are 2 bytes, so
// long pages get stray NULs, which the HTML parser (JSDOM, next step in
// vite-react-ssg) turns into "�" — broken letters in headings, alt
// text and anchor ids. Verified: dropping the NUL bytes gives output
// identical to renderToString. (vite-react-ssg also decoded each chunk on
// its own; buffers are now joined and decoded once.)
//
// Idempotent; warns if the code moved. The postbuild check (check-utf8.mjs)
// fails the build if a "�" or NUL still reaches dist/.

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = resolve(ROOT, "node_modules/vite-react-ssg/dist/shared");
const MARK = "karnaf utf8 patch v2";

const WRITE_OLD = "this._output += chunk.toString();";
const WRITE_NEW = `(this._chunks ??= []).push(typeof chunk === "string" ? Buffer.from(chunk, "utf8") : Buffer.from(chunk)); /* ${MARK} */`;
const END_OLD = "this._deferred.resolve(this._output);";
const END_NEW = `{ const all = this._chunks ? Buffer.concat(this._chunks) : Buffer.alloc(0); this._deferred.resolve(this._output + Buffer.from(all.filter((b) => b !== 0)).toString("utf8")); } /* ${MARK} */`;

if (!existsSync(DIR)) {
  console.warn("[patch-ssg-utf8] vite-react-ssg not found — skipped");
  process.exit(0);
}

let patched = 0;
let already = 0;
for (const f of readdirSync(DIR).filter((n) => n.endsWith(".mjs"))) {
  const p = resolve(DIR, f);
  let src = readFileSync(p, "utf8");
  if (src.includes(MARK)) {
    already++;
    continue;
  }
  // Undo an earlier (v1) version of this patch, if present.
  src = src
    .replace(/\(this\._chunks \?\?= \[\]\)\.push\([^\n]*\/\* karnaf utf8 patch \*\//, WRITE_OLD)
    .replace(/this\._deferred\.resolve\(this\._output \+[^\n]*\/\* karnaf utf8 patch \*\//, END_OLD);
  if (src.includes(WRITE_OLD) && src.includes(END_OLD)) {
    writeFileSync(p, src.replace(WRITE_OLD, WRITE_NEW).replace(END_OLD, END_NEW));
    patched++;
  }
}

if (patched) console.log(`[patch-ssg-utf8] patched ${patched} file(s)`);
else if (already) console.log("[patch-ssg-utf8] already patched");
else console.warn("[patch-ssg-utf8] pattern not found — check vite-react-ssg's SSR writable");
