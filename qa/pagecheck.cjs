// Page check (Playwright, dev server running): for each path at 1440x900, 1366x768 and 390x844, reports one H1,
// horizontal overflow, broken images and console errors, then each section's height in screens at 1440x900.
//
//   node qa/pagecheck.cjs / /platform /modules/order-to-cash
//
// Needs Playwright: preinstalled in cloud sessions (docs/CLOUD.md); elsewhere `npm i -g playwright` and
// `npx playwright install chromium`. Sections between 0.75 and 1.2 screens on desktop are the target (VERIFY.md).
const { chromium } = require('playwright');
const base = process.env.BASE ?? 'http://localhost:5180';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];

(async () => {
  const browser = await chromium.launch();
  let failed = 0;
  for (const path of paths) {
    for (const [w, h] of [[1440, 900], [1366, 768], [390, 844]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      await page.goto(base + path, { waitUntil: 'networkidle' });
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += h / 1.5) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(80); }
      await page.waitForTimeout(400);
      const r = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
      }));
      const bad = r.h1 !== 1 || r.overflow > 0 || r.broken.length || errors.length;
      if (bad) failed++;
      console.log(`${bad ? 'FAIL' : 'ok  '} ${path} ${w}x${h}  h1:${r.h1} overflow:${r.overflow} broken:${r.broken.length} errors:${errors.length ? errors.join(' | ') : 0}`);
      if (w === 1440) {
        const sections = await page.evaluate(() =>
          [...document.querySelectorAll('main section[id]')].map((s) => `${s.id}:${(s.getBoundingClientRect().height / window.innerHeight).toFixed(2)}`),
        );
        console.log(`       sections (screens at 1440x900): ${sections.join('  ')}`);
      }
      await page.close();
    }
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
