// Section screenshots (Playwright, dev server running): saves each `main section[id]` of a page as its own PNG,
// scrolled into view first so reveal animations have run. Look at every one before calling a page done.
//
//   node qa/sections.cjs /platform out-dir [width=1440]
//
// Files: <out-dir>/<id>.png. Use a scratch folder, not the repository.
const { chromium } = require('playwright');
const fs = require('fs');
const [, , path = '/', out = 'qa-shots', width = '1440'] = process.argv;
const base = process.env.BASE ?? 'http://localhost:5180';

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
  await page.goto(base + path, { waitUntil: 'networkidle' });
  const ids = await page.$$eval('main section[id]', (s) => s.map((x) => x.id));
  for (const id of ids) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await section.screenshot({ path: `${out}/${id}.png` });
  }
  console.log(`${ids.length} sections -> ${out}/: ${ids.join(' ')}`);
  await browser.close();
})();
