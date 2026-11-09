// Launch sweep (Phase 28): every built page at the nine screen sizes of qa/measure.html, against the production
// build. Per page and size: exactly one H1, no horizontal overflow (and which elements cause it), no broken images,
// no console errors or failed requests. Pages are found in dist/, so new routes are swept without editing this.
//
//   npm run build && npx vite preview --port 5181 &
//   node qa/sweep.cjs                 # all pages;  node qa/sweep.cjs /contact /industries   # some
//
// Exits 1 on a failure. Takes a few minutes for every page (four pages in parallel).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const base = process.env.BASE ?? 'http://localhost:5181';
const dist = path.resolve(__dirname, '..', 'dist');
const sizes = [[360, 740], [390, 844], [768, 1024], [1024, 768], [1280, 720], [1366, 768], [1440, 900], [1920, 1080], [2560, 1440]];

function builtPaths() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && e.name !== 'assets') walk(full);
      else if (e.name === 'index.html') {
        const rel = path.relative(dist, path.dirname(full));
        out.push(rel ? `/${rel}` : '/');
      }
    }
  })(dist);
  return out.sort();
}

const paths = process.argv.slice(2).length ? process.argv.slice(2) : builtPaths();

(async () => {
  const browser = await chromium.launch();
  const failures = [];
  let done = 0;

  async function check(p) {
    const lines = [];
    for (const [w, h] of sizes) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
      await page.goto(base + p, { waitUntil: 'networkidle' });
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += h) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(30);
      }
      await page.waitForTimeout(300);
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const wide = [...document.querySelectorAll('body *')]
          .filter((el) => {
            const b = el.getBoundingClientRect();
            if (!b.width || b.right <= vw + 1) return false;
            // Elements inside a clipping or scrolling ancestor do not widen the page.
            for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
              const o = getComputedStyle(a).overflowX;
              if (o !== 'visible') return false;
            }
            return true;
          })
          .slice(0, 3)
          .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`);
        return {
          h1: document.querySelectorAll('h1').length,
          overflow: document.documentElement.scrollWidth - vw,
          wide,
          broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
        };
      });
      const bad = r.h1 !== 1 || r.overflow > 0 || r.broken || errors.length;
      if (bad) {
        const msg = `${p} ${w}x${h}: h1 ${r.h1}, overflow ${r.overflow}${r.wide.length ? ` (${r.wide.join(', ')})` : ''}, broken ${r.broken}${errors.length ? `, errors: ${errors.join(' | ')}` : ''}`;
        failures.push(msg);
        lines.push(`  FAIL ${msg}`);
      }
      await page.close();
    }
    done++;
    console.log(`${String(done).padStart(3)}/${paths.length} ${lines.length ? 'FAIL' : 'ok  '} ${p}${lines.length ? `\n${lines.join('\n')}` : ''}`);
  }

  const queue = [...paths];
  await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await check(queue.shift()); }));
  await browser.close();
  console.log(`\nsweep: ${paths.length} pages × ${sizes.length} sizes, ${failures.length} failures`);
  process.exit(failures.length ? 1 : 0);
})();
