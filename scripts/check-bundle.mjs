// Post-build: fail the build if the entry bundle grows past its budget.
//
// The entry chunk (assets/app-*.js) ships with every page, so a stray
// eager import (all blog articles, a video player…) lands on the home and
// sales pages too. The budget sits just above the current size; lower it
// as the bundle shrinks (plan target: < 150KB gzip on the home page).

import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = resolve(ROOT, "dist/assets");

const BUDGET_GZIP_KB = 220;

const entries = readdirSync(ASSETS).filter((f) => /^app-[\w-]+\.js$/.test(f));
let failed = false;
for (const file of entries) {
  const buf = readFileSync(resolve(ASSETS, file));
  const gz = gzipSync(buf, { level: 9 }).length / 1024;
  const line = `${file}: ${(buf.length / 1024).toFixed(0)}KB raw, ${gz.toFixed(0)}KB gzip (budget ${BUDGET_GZIP_KB}KB)`;
  if (gz > BUDGET_GZIP_KB) {
    failed = true;
    console.error(`[check-bundle] OVER BUDGET — ${line}`);
  } else {
    console.log(`[check-bundle] ${line}`);
  }
}
if (failed) process.exit(1);
