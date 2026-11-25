// Renders the default share image (public/og-image.jpg, 1200×630) from the
// site's own type and palette: cream page, navy ink, one amber accent, the
// serif headline. Run by hand after changing it, then commit the JPEG:
//
//   node scripts/og-image.mjs
//
// Needs Playwright with a Chromium (`npx playwright install chromium`, or set
// PLAYWRIGHT_MODULE / CHROMIUM_PATH to an existing install).

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");

const font = (pkg, file) =>
  readFileSync(resolve(ROOT, "node_modules/@fontsource-variable", pkg, "files", file)).toString("base64");
const logo = readFileSync(resolve(ROOT, "src/assets/mascot/karnaf-logo.png")).toString("base64");

const html = `<!doctype html>
<html lang="he" dir="rtl"><head><meta charset="utf-8"><style>
@font-face { font-family: Serif; font-weight: 300 900; src: url(data:font/woff2;base64,${font("frank-ruhl-libre", "frank-ruhl-libre-hebrew-wght-normal.woff2")}) format("woff2"); }
@font-face { font-family: Sans; font-weight: 300 900; src: url(data:font/woff2;base64,${font("rubik", "rubik-hebrew-wght-normal.woff2")}) format("woff2"); unicode-range: U+0590-05FF, U+FB1D-FB4F; }
@font-face { font-family: Sans; font-weight: 300 900; src: url(data:font/woff2;base64,${font("rubik", "rubik-latin-wght-normal.woff2")}) format("woff2"); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: hsl(36 33% 95%); color: hsl(215 26% 23%); font-family: Sans; padding: 72px 88px; display: flex; flex-direction: column; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 16px; font-weight: 800; font-size: 30px; }
.brand img { width: 64px; height: 64px; object-fit: contain; }
h1 { font-family: Serif; font-weight: 700; font-size: 104px; line-height: 1.02; letter-spacing: -0.01em; }
h1 em { font-style: normal; color: hsl(24 90% 42%); }
.foot { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid hsl(36 22% 82%); padding-top: 24px; font-size: 26px; color: hsl(215 26% 23% / 0.8); }
.foot b { color: hsl(215 26% 23%); }
.url { direction: ltr; font-weight: 600; }
</style></head><body>
<div class="brand"><img src="data:image/png;base64,${logo}" alt="">קרנף נדל״ן</div>
<h1>לקנות דירה בלי לשלם <em>יותר מדי.</em></h1>
<div class="foot"><span>המדריך המעשי לרכישת דירה · <b>מחשבונים חינם</b></span><span class="url">www.karnafnadlan.com</span></div>
</body></html>`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: resolve(ROOT, "public/og-image.jpg"), type: "jpeg", quality: 88 });
await browser.close();
console.log("[og-image] wrote public/og-image.jpg");
