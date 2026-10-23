/*
 * Captures the product prototype as the screenshots the website shows.
 *
 *   npm run dev      (in another terminal: the prototype is served by the dev server)
 *   npm run shots    [name ...]   capture every screen, or only the named ones
 *
 * Names: 'o2c' is prototype/o2c.html (a homepage screen); 'order-to-cash/collections' is
 * prototype/modules/order-to-cash/collections.html; 'order-to-cash' captures every screen of that module.
 *
 * Desktop screens are rendered at 1440 × 960, 2x, and written as WebP at 2880 (name@2x.webp) and 1440 (name.webp).
 * Phone screens (body data-device="phone", prototype/phone.css) are rendered at 390 × 844, 3x, and written at 1170
 * (name@2x.webp) and 780 (name.webp). Module screens go to src/assets/screens/<slug>/, homepage screens to
 * src/assets/screens/.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const proto = path.join(root, 'prototype');
const out = path.join(root, 'src/assets/screens');
const base = process.env.PROTOTYPE_URL ?? 'http://localhost:5180/prototype';

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
if (!browser) throw new Error('shots: no Edge, Chrome or Chromium found (set CHROME_PATH)');

const html = (dir) => readdirSync(dir).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5));
const modulesDir = path.join(proto, 'modules');
const moduleSlugs = existsSync(modulesDir) ? readdirSync(modulesDir).filter((d) => !d.includes('.')) : [];
const all = [...html(proto), ...moduleSlugs.flatMap((slug) => html(path.join(modulesDir, slug)).map((f) => `${slug}/${f}`))];

// 'order-to-cash' expands to every screen of the module.
const asked = process.argv.length > 2 ? process.argv.slice(2) : all;
const names = asked.flatMap((name) => (moduleSlugs.includes(name) ? all.filter((n) => n.startsWith(`${name}/`)) : [name]));

const work = mkdtempSync(path.join(tmpdir(), 'mavro-shots-'));

for (const name of names) {
  const nested = name.includes('/');
  const file = nested ? path.join(modulesDir, `${name}.html`) : path.join(proto, `${name}.html`);
  if (!existsSync(file)) {
    console.log(`no such screen: ${name}`);
    continue;
  }
  const phone = /data-device="phone"/.test(readFileSync(file, 'utf8'));
  const url = `${base}/${nested ? `modules/${name}` : name}.html`;
  const png = path.join(work, `${name.replace('/', '__')}.png`);
  // The prototype pins its canvas to the top left (1440 × 960 in app.css, 390 × 844 in phone.css). The window is
  // larger, because headless windows have a minimum width (~500px) and some browsers take part of the window's
  // height for their own chrome, and the capture is cropped to the canvas.
  const [cw, ch, scale] = phone ? [390, 844, 3] : [1440, 960, 2];
  const [w, h] = [Math.max(cw, 520), ch + 200];
  execFileSync(browser, [
    ...(process.platform === 'linux' ? ['--no-sandbox'] : []), '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    `--user-data-dir=${path.join(work, 'profile')}`,
    `--window-size=${w},${h}`, `--force-device-scale-factor=${scale}`, '--virtual-time-budget=5000',
    `--screenshot=${png}`, url,
  ], { stdio: 'ignore' });
  // Edge can return before the screenshot is on disk; wait for it (up to ~8 s).
  for (let i = 0; i < 80 && !existsSync(png); i++) await new Promise((r) => setTimeout(r, 100));
  if (!existsSync(png)) {
    console.log(`capture failed: ${name}`);
    continue;
  }

  const target = path.join(out, `${name}`);
  mkdirSync(path.dirname(target), { recursive: true });
  const full = await sharp(png).extract({ left: 0, top: 0, width: cw * scale, height: ch * scale }).toBuffer();
  const [large, small] = phone ? [1170, 780] : [2880, 1440];
  await sharp(full).resize(large).webp({ quality: 82 }).toFile(`${target}@2x.webp`);
  await sharp(full).resize(small).webp({ quality: 84 }).toFile(`${target}.webp`);
  await sharp(full).resize(small).png().toFile(path.join(work, `${name.replace('/', '__')}-preview.png`));
  console.log(`captured ${name}${phone ? ' (phone)' : ''}`);
}

if (process.env.KEEP_PREVIEW) console.log(`previews in ${work}`);
else rmSync(work, { recursive: true, force: true });
