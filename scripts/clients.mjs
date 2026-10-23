/*
 * Cuts the client logos out of the clientele slide (brand/clientele-slide.webp, from the product deck).
 *
 *   npm run clients
 *
 * The slide is a 4 x 5 grid of logo tiles. Each tile is cropped inside its border and coloured edge bar, its
 * white background is turned into transparency (the logos themselves are not redrawn or recoloured), and the
 * result is trimmed and written to src/assets/clients/<slug>.webp at 2x the size it is shown on the page.
 * The names and order are in the list below; src/data/home.ts lists them for the page.
 */
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'brand/clientele-slide.webp');
const out = path.join(root, 'src/assets/clients');
mkdirSync(out, { recursive: true });

export const clients = [
  'pathkind', 'mankind', 'inteliwaves', 'intellismart',
  'research-ranking', 'rentomojo', 'techlabs', 'ontra-labs',
  'kpmg', 'aptech', 'aldahra', 'flsmidth',
  'rajnish', 'aramex', 'yogiji-digi', 'merino',
  'siddhidhata', 'maharishi-ayurveda', 'virtuoso', 'gemini',
];

// Tile grid on the 2000 x 1125 slide, measured from the image.
const COLS = [97, 557, 1017, 1477];
const ROWS = [228, 398, 569, 740, 910];
const TILE_W = 433;
const TILE_H = 155;
const INSET = { left: 16, top: 5, right: 6, bottom: 8 }; // skips the edge bar, border and shadow
const PAPER = 252;
const HEIGHT = 96; // output height in px (shown at up to 48px)

const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });

let n = 0;
for (const [r, top] of ROWS.entries()) {
  for (const [c, left] of COLS.entries()) {
    const slug = clients[r * COLS.length + c];
    const x0 = left + INSET.left;
    const y0 = top + INSET.top;
    const w = TILE_W - INSET.left - INSET.right;
    const h = TILE_H - INSET.top - INSET.bottom;
    const rgba = Buffer.alloc(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = ((y + y0) * info.width + (x + x0)) * 3;
        const o = (y * w + x) * 4;
        const px = [data[i], data[i + 1], data[i + 2]];
        let a = Math.max(...px.map((v) => (PAPER - v) / PAPER));
        if (a < 0.04) a = 0;
        a = Math.min(1, a);
        for (let k = 0; k < 3; k++) rgba[o + k] = a ? Math.round(Math.min(255, Math.max(0, (px[k] - (1 - a) * PAPER) / a))) : 255;
        rgba[o + 3] = Math.round(a * 255);
      }
    }
    const trimmed = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
      .png()
      .toBuffer()
      .then((buf) => sharp(buf).trim({ threshold: 1 }).toBuffer());
    await sharp(trimmed)
      .resize({ height: HEIGHT, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(path.join(out, `${slug}.webp`));
    n++;
  }
}
console.log(`wrote ${n} client logos to ${path.relative(root, out)}`);
