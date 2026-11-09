/*
 * The share image (Open Graph / Twitter card): public/og.png, 1200 × 630, the default for every page.
 * Made from the hero art (user, 2026-11-09: "Make one from the hero art"): the anidoodle plant's poster frame
 * (src/assets/hero/plant.webp), the official logo (src/assets/brand/logo-960.webp, on a light background as the
 * brand rule requires) and the homepage headline, read from src/data/home.ts so the two never drift.
 *
 *   npm run og        (Playwright's Chromium; no dev server needed)
 *
 * PNG, not WebP: many share previews (WhatsApp, LinkedIn, Slack) do not show WebP.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// Playwright is installed globally (docs/CLOUD.md), not as a dependency, so it is required, not imported.
const { chromium } = createRequire(import.meta.url)('playwright');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const b64 = async (file) => (await readFile(path.join(root, file))).toString('base64');

const home = await readFile(path.join(root, 'src/data/home.ts'), 'utf8');
const match = home.match(/title: \['([^']+)', '([^']+)'\]/);
if (!match) throw new Error('og: hero title not found in src/data/home.ts');
const [, line1, line2] = match;

const [plant, logo, font] = await Promise.all([
  b64('src/assets/hero/plant.webp'),
  b64('src/assets/brand/logo-960.webp'),
  b64('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'),
]);

// Colours are the site's tokens (src/styles/tokens.css).
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Manrope; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 200 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: Manrope, sans-serif; color: #090e34;
  background: radial-gradient(60rem 30rem at 85% 10%, #f1f4ff, transparent 70%), #ffffff; }
.grid { position: absolute; inset: 0; opacity: .5;
  background-image: linear-gradient(#e4e6f0 1px, transparent 1px), linear-gradient(90deg, #e4e6f0 1px, transparent 1px);
  background-size: 48px 48px; mask-image: radial-gradient(closest-side at 75% 50%, #000, transparent); }
.text { position: absolute; left: 72px; top: 72px; width: 560px; }
.logo { height: 44px; display: block; }
h1 { margin-top: 64px; font-size: 68px; line-height: 1.04; font-weight: 800; letter-spacing: -0.035em; }
h1 span { display: block; background: linear-gradient(100deg, #3f2af5 0%, #0a48fd 48%, #0aa6f0 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
p { margin-top: 28px; font-size: 24px; line-height: 1.4; color: #3d4366; font-weight: 500; }
.art { position: absolute; right: -24px; top: 40px; width: 620px; }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 8px;
  background: linear-gradient(90deg, #7a36fb, #0a48fd 50%, #03c8fd); }
</style></head><body>
<div class="grid"></div>
<img class="art" src="data:image/webp;base64,${plant}" alt="">
<div class="text">
  <img class="logo" src="data:image/webp;base64,${logo}" alt="MAVRO.AI">
  <h1>${line1}<span>${line2}</span></h1>
  <p>Core ERP, HR and payroll, portals and specialised modules on one platform.</p>
</div>
<div class="bar"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const out = path.join(root, 'public/og.png');
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log(`og: wrote ${path.relative(root, out)}`);
