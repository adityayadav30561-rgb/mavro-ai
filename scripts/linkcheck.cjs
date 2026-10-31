// npm run linkcheck (after npm run build): crawl dist/ from the homepage and report dead links, missing anchors,
// orphan pages, click depth and links back to homepage anchors. Phase 27; rerun in launch QA.
// Crawl dist/ from the homepage: dead links, orphans, click depth, in-page anchor targets that are missing.
const fs = require('fs'), path = require('path');
const dist = process.argv[2];
const pages = new Map(); // path -> html
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') pages.set('/' + path.relative(dist, dir).replace(/\\/g, '/'), fs.readFileSync(p, 'utf8'));
  }
})(dist);
const norm = (p) => (p === '/' ? '/' : p.replace(/\/$/, ''));
const all = new Map([...pages].map(([k, v]) => [norm(k === '/.' ? '/' : k.replace(/^\/$/, '/')), v]));
if (all.has('/')) {} else if (pages.has('/')) all.set('/', pages.get('/'));
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const hrefs = (html) => [...html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
const dead = [], badAnchors = [], homeAnchors = new Map();
const depth = new Map([['/', 0]]); const queue = ['/'];
while (queue.length) {
  const cur = queue.shift(); const html = all.get(cur); if (!html) continue;
  for (const h of hrefs(html)) {
    if (/^(mailto:|tel:|https?:)/.test(h)) continue;
    let [pathPart, hash] = h.split('#'); pathPart = pathPart.split('?')[0];
    const target = pathPart === '' ? cur : norm(pathPart);
    if (!all.has(target)) { dead.push(`${cur} -> ${h}`); continue; }
    if (hash && !ids(all.get(target)).has(hash)) badAnchors.push(`${cur} -> ${h}`);
    if (target === '/' && hash && cur !== '/') homeAnchors.set(h, (homeAnchors.get(h) || 0) + 1);
    if (!depth.has(target)) { depth.set(target, depth.get(cur) + 1); queue.push(target); }
  }
}
// dead links from every page (not only reachable ones)
for (const [p, html] of all) for (const h of hrefs(html)) {
  if (/^(mailto:|tel:|https?:|#)/.test(h)) continue;
  const t = norm(h.split('#')[0].split('?')[0]); if (t && !all.has(t)) dead.push(`${p} -> ${h}`);
}
const orphans = [...all.keys()].filter((p) => !depth.has(p));
const deep = [...depth].filter(([, d]) => d > 3);
const hist = {}; for (const [, d] of depth) hist[d] = (hist[d] || 0) + 1;
console.log('pages', all.size, 'reached', depth.size, 'depth histogram', JSON.stringify(hist));
console.log('dead', [...new Set(dead)].slice(0, 40));
console.log('bad anchors', [...new Set(badAnchors)].slice(0, 40));
console.log('orphans', orphans);
console.log('deeper than 3', deep);
console.log('links from other pages to homepage anchors', [...homeAnchors].sort((a, b) => b[1] - a[1]));
// homepage: its own in-page anchor links
const home = all.get('/'); const own = {}; for (const h of hrefs(home)) if (h.startsWith('#')) own[h] = (own[h] || 0) + 1;
console.log('homepage in-page links', JSON.stringify(own));
