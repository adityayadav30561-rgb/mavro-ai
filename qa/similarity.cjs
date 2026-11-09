// Similarity check for location pages (D3, D4): near-identical city pages read as doorway pages to search engines.
// Compares the main text of every pair of built pages under a path (default /erp-software/), as sets of five-word
// shingles (Jaccard), ignoring the header and footer. Run after `npm run build`, no server needed:
//
//   node qa/similarity.cjs                 # city pages;  node qa/similarity.cjs /ae/erp-software/   # another set
//
// Lists the most similar pairs and exits 1 if any pair is above the limit (MAX, default 0.35).
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const prefix = process.argv[2] ?? '/erp-software/';
const MAX = Number(process.env.MAX ?? 0.35);

const dir = path.join(dist, prefix);
const pages = fs
  .readdirSync(dir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(dir, e.name, 'index.html')))
  .map((e) => e.name);

const decode = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ');
function shingles(name) {
  const html = fs.readFileSync(path.join(dir, name, 'index.html'), 'utf8');
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  const words = decode(main.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' '))
    .toLowerCase()
    .replace(/[^a-z0-9ऀ-ॿ]+/g, ' ')
    .split(' ')
    .filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 5 <= words.length; i++) set.add(words.slice(i, i + 5).join(' '));
  return set;
}

const sets = Object.fromEntries(pages.map((p) => [p, shingles(p)]));
const pairs = [];
for (let i = 0; i < pages.length; i++)
  for (let j = i + 1; j < pages.length; j++) {
    const a = sets[pages[i]];
    const b = sets[pages[j]];
    let shared = 0;
    for (const s of a) if (b.has(s)) shared++;
    pairs.push({ pair: `${pages[i]} ~ ${pages[j]}`, score: shared / (a.size + b.size - shared) });
  }
pairs.sort((x, y) => y.score - x.score);
const over = pairs.filter((p) => p.score > MAX);
console.log(`similarity: ${pages.length} pages under ${prefix}, ${pairs.length} pairs, limit ${MAX}`);
for (const p of pairs.slice(0, 8)) console.log(`  ${p.score.toFixed(3)}  ${p.pair}${p.score > MAX ? '  OVER' : ''}`);
process.exit(over.length ? 1 : 0);
