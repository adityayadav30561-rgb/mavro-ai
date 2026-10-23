/*
 * Captures the product prototype (prototype/*.html) as the screenshots the website shows.
 *
 *   npm run dev      (in another terminal: the prototype is served by the dev server)
 *   npm run shots    [name ...]   capture all screens, or only the named ones
 *
 * Each screen is rendered by headless Edge or Chrome at 1440 × 960, 2x, and written to src/assets/screens as
 * WebP at two widths (2880 for sharp displays, 1440 for everything else).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'src/assets/screens');
const base = process.env.PROTOTYPE_URL ?? 'http://localhost:5180/prototype';

const browser = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find(existsSync);
if (!browser) throw new Error('shots: no Edge or Chrome found');

const all = readdirSync(path.join(root, 'prototype')).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5));
const names = process.argv.length > 2 ? process.argv.slice(2) : all;
const work = mkdtempSync(path.join(tmpdir(), 'mavro-shots-'));
mkdirSync(out, { recursive: true });

for (const name of names) {
  const png = path.join(work, `${name}.png`);
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    `--user-data-dir=${path.join(work, 'profile')}`,
    '--window-size=1440,960', '--force-device-scale-factor=2', '--virtual-time-budget=5000',
    `--screenshot=${png}`, `${base}/${name}.html`,
  ], { stdio: 'ignore' });
  await sharp(png).webp({ quality: 82 }).toFile(path.join(out, `${name}@2x.webp`));
  await sharp(png).resize(1440).webp({ quality: 84 }).toFile(path.join(out, `${name}.webp`));
  await sharp(png).resize(1440).png().toFile(path.join(work, `${name}-preview.png`));
  console.log(`captured ${name}`);
}

if (process.env.KEEP_PREVIEW) console.log(`previews in ${work}`);
else rmSync(work, { recursive: true, force: true });
