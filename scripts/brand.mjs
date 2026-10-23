/*
 * Derives the web logo assets from the official artwork in brand/mavro-logo.jpg (supplied as a JPEG on white).
 *
 *   npm run brand
 *
 * The artwork itself is not redrawn or recoloured. The white background is turned into transparency
 * ("colour to alpha" against the measured paper white), so the logo composites back to exactly the supplied
 * pixels on white and stays clean on the site's tinted light surfaces. Outputs:
 *
 *   src/assets/brand/logo-{480,960,full}.webp   the full lockup, cropped to its artwork
 *   public/favicon.png, public/apple-touch-icon.png   the M mark alone, on white
 */
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'brand/mavro-logo.jpg');
const out = path.join(root, 'src/assets/brand');
mkdirSync(out, { recursive: true });

const PAPER = 254; // the JPEG's background measures #fdfdfd to #fefefe
const INK = 236; // anything darker than this on any channel is artwork, for the crop

const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

let x0 = width, y0 = height, x1 = 0, y1 = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 3;
    if (Math.min(data[i], data[i + 1], data[i + 2]) < INK) {
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
  }
}
const pad = 6;
x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
x1 = Math.min(width - 1, x1 + pad); y1 = Math.min(height - 1, y1 + pad);
const w = x1 - x0 + 1;
const h = y1 - y0 + 1;

const rgba = Buffer.alloc(w * h * 4);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = ((y + y0) * width + (x + x0)) * 3;
    const o = (y * w + x) * 4;
    const c = [data[i], data[i + 1], data[i + 2]];
    let a = Math.max(...c.map((v) => (PAPER - v) / PAPER));
    if (a < 0.035) a = 0;
    for (let k = 0; k < 3; k++) rgba[o + k] = a ? Math.round(Math.min(255, Math.max(0, (c[k] - (1 - a) * PAPER) / a))) : 255;
    rgba[o + 3] = Math.round(Math.min(1, a) * 255);
  }
}

const lockup = sharp(rgba, { raw: { width: w, height: h, channels: 4 } });
for (const size of [480, 960]) {
  await lockup.clone().resize({ width: size }).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(out, `logo-${size}.webp`));
}
await lockup.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(out, 'logo-full.webp'));

// The mark is the artwork left of the first gap in the lockup.
let markEnd = 0;
for (let x = 0; x < w; x++) {
  let ink = false;
  for (let y = 0; y < h && !ink; y++) ink = rgba[(y * w + x) * 4 + 3] > 40;
  if (ink) markEnd = x;
  else if (markEnd > 0) break;
}
const side = Math.max(markEnd + pad, h);
const mark = sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left: 0, top: 0, width: markEnd + pad, height: h })
  .png();
const markBuf = await mark.toBuffer();
const square = (size, inset) =>
  sharp({ create: { width: side, height: side, channels: 4, background: '#ffffff' } })
    .composite([{ input: markBuf, gravity: 'center' }])
    .png()
    .toBuffer()
    .then((buf) => sharp(buf).resize(size - inset * 2).extend({ top: inset, bottom: inset, left: inset, right: inset, background: '#ffffff' }));
await (await square(64, 4)).png().toFile(path.join(root, 'public/favicon.png'));
await (await square(180, 22)).png().toFile(path.join(root, 'public/apple-touch-icon.png'));

console.log(`logo ${w}×${h} (aspect ${(w / h).toFixed(4)}), mark ${markEnd + pad}px wide`);
