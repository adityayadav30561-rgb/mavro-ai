// Accessibility check (Phase 28): axe-core (WCAG 2.0/2.1 A and AA rules, plus best practices) on built pages,
// against the production build, at desktop (1440×900) and phone (390×844) with every reveal applied, plus a
// keyboard pass on each page: Tab through the first 40 stops and require a visible focus indicator on each.
//
//   npm run build && npx vite preview --port 5181 &
//   node qa/a11ycheck.cjs                  # one page per template;  node qa/a11ycheck.cjs /contact   # some pages
//
// Exits 1 on any serious or critical violation, or a focus stop with no visible indicator.
const fs = require('fs');
const { chromium } = require('playwright');

const base = process.env.BASE ?? 'http://localhost:5181';
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

// One page per template (and the pages with their own layout).
const templates = [
  '/', '/platform', '/platform/base', '/platform/portals', '/platform/premium', '/erp-connect', '/industries',
  '/industries/manufacturing', '/industries/printing-packaging', '/modules/order-to-cash', '/modules/vendor-portal',
  '/implementation', '/security-and-compliance', '/customers', '/contact', '/404',
];
const paths = process.argv.slice(2).length ? process.argv.slice(2) : templates;

(async () => {
  const browser = await chromium.launch();
  let failed = 0;
  for (const p of paths) {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
      await page.goto(base + p, { waitUntil: 'networkidle' });
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += h) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(40);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.addScriptTag({ content: axe });
      const result = await page.evaluate(async () =>
        window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } }),
      );
      const issues = result.violations.map((v) => ({
        impact: v.impact,
        id: v.id,
        help: v.help,
        count: v.nodes.length,
        where: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
      }));
      const serious = issues.filter((i) => i.impact === 'serious' || i.impact === 'critical');

      // Keyboard: every Tab stop shows a focus indicator (outline, box-shadow or a changed border).
      const unfocused = [];
      if (w === 1440) {
        await page.evaluate(() => window.scrollTo(0, 0));
        for (let i = 0; i < 40; i++) {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(150); // let focus transitions finish before reading the style
          const stop = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            const s = getComputedStyle(el);
            const visible = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
            return { visible, name: `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"` };
          });
          if (stop && !stop.visible) unfocused.push(stop.name);
        }
      }

      const bad = serious.length || unfocused.length;
      if (bad) failed++;
      console.log(`${bad ? 'FAIL' : 'ok  '} ${p} ${w}x${h}  violations: ${issues.length} (serious/critical ${serious.length})${unfocused.length ? `, no focus ring: ${[...new Set(unfocused)].join('; ')}` : ''}`);
      for (const i of issues) console.log(`       ${i.impact.padEnd(8)} ${i.id} ×${i.count}: ${i.help}\n                ${i.where.join(' | ')}`);
      await page.close();
    }
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
