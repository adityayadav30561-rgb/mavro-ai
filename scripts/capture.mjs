/*
 * Full-resolution screenshot of the site in headless Edge or Chrome, for visual checks.
 *
 *   node scripts/capture.mjs <width> <height> <out.png> [query]
 *   node scripts/capture.mjs 1366 768 shots/premium.png "id=premium&reveal=1"
 *
 * Needs the dev server (npm run dev). The query goes to qa/shot.html (see that file). Use an absolute or
 * project-relative output path. Note: the dev server can serve stale CSS to a fresh headless browser just after
 * an edit; if a capture disagrees with the live page, capture the production build instead
 * (npm run build, then npx vite preview, and pass BASE=http://localhost:5181).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const [w, h, out, query = ''] = process.argv.slice(2);
if (!w || !h || !out) throw new Error('usage: node scripts/capture.mjs <width> <height> <out.png> [query]');
const base = process.env.BASE ?? 'http://localhost:5180';
// CHROME_PATH overrides the search (useful on cloud machines with Chromium in a non-standard place).
const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
].find((candidate) => candidate && existsSync(candidate));
if (!browser) throw new Error('capture: no Edge, Chrome or Chromium found (set CHROME_PATH)');

const file = path.resolve(out);
mkdirSync(path.dirname(file), { recursive: true });

// Headless Edge occasionally exits on first launch without writing the file, so try twice.
for (let attempt = 0; attempt < 2 && !existsSync(file); attempt++) {
  if (attempt) await new Promise((r) => setTimeout(r, 1500));
  const profile = mkdtempSync(path.join(tmpdir(), 'mavro-capture-'));
  try {
    execFileSync(browser, [
      ...(process.platform === 'linux' ? ['--no-sandbox'] : []), '--headless=new', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${profile}`,
      '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
      `--window-size=${w},${h}`, '--virtual-time-budget=9000', `--screenshot=${file}`,
      `${base}/qa/shot.html?${query}`,
    ], { stdio: process.env.DEBUG ? 'inherit' : 'ignore', timeout: 120_000 });
  } catch {}
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch {}
}
// The browser can finish writing the file just after it exits.
for (let i = 0; i < 80 && !existsSync(file); i++) await new Promise((r) => setTimeout(r, 100));
console.log(existsSync(file) ? `captured ${path.relative(process.cwd(), file)}` : 'capture failed');
