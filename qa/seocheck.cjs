// SEO check over the built site (run after `npm run build`; no server needed):
//
//   node qa/seocheck.cjs            # errors fail (exit 1); length warnings are listed
//
// Per page: one <title> and description, unique across indexable pages, with length warnings (title ≤ 60
// characters, description 70–160); canonical absolute and equal to the page's own URL; robots meta matches the
// sitemap (indexable ⇔ listed); og:image and lang="en-IN"; images have alt, links have an href and say where they go; JSON-LD parses, every `@id` reference resolves inside
// the page's graph, every FAQPage question appears in the page's visible text. Site-wide: no noindex page in
// sitemap.xml or llms.txt, every sitemap URL has a page. Used by D2, Phase 28, and the city and GCC pages (D3, D4).
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'assets') walk(full);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
})(dist);

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const one = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : null;
};
const text = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ');

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const llms = fs.existsSync(path.join(dist, 'llms.txt')) ? fs.readFileSync(path.join(dist, 'llms.txt'), 'utf8') : '';
if (!llms) errors.push('llms.txt missing');
const origin = new URL(sitemapUrls[0]).origin;

const seen = { title: new Map(), description: new Map() };
const pages = new Set();

for (const file of files) {
  const rel = path.relative(dist, file);
  const route = rel === 'index.html' ? '/' : rel === '404.html' ? '/404' : `/${rel.replace(/\/index\.html$/, '')}`;
  const html = fs.readFileSync(file, 'utf8');
  const title = one(html, /<title>([^<]*)<\/title>/);
  const description = one(html, /<meta name="description" content="([^"]*)"/);
  const robots = one(html, /<meta name="robots" content="([^"]*)"/);
  const canonical = one(html, /<link rel="canonical" href="([^"]*)"/);
  const indexable = robots === 'index, follow';
  const url = `${origin}${route === '/' ? '/' : route}`;
  pages.add(url);

  if (!/<html lang="en-IN">/.test(html)) err(route, 'html lang is not en-IN');
  if (!title) err(route, 'no title');
  if (!description) err(route, 'no meta description');
  if (!/<meta property="og:image" content="https?:\/\//.test(html)) err(route, 'no absolute og:image');
  if (route !== '/404') {
    if (canonical !== url) err(route, `canonical ${canonical} is not ${url}`);
    if (indexable !== sitemapUrls.includes(url)) err(route, `robots "${robots}" but ${sitemapUrls.includes(url) ? 'in' : 'not in'} the sitemap`);
  }
  if (!indexable && llms.includes(`(${url})`)) err(route, 'noindex page listed in llms.txt');

  if (indexable) {
    for (const [key, value] of [['title', title], ['description', description]]) {
      if (!value) continue;
      if (seen[key].has(value)) err(route, `duplicate ${key} (also ${seen[key].get(value)})`);
      seen[key].set(value, route);
    }
    if (title && title.length > 60) warn(route, `title ${title.length} chars: ${title}`);
    if (description && (description.length < 70 || description.length > 160)) warn(route, `description ${description.length} chars`);
  }

  // What Lighthouse's SEO audit also checks: every image has an alt attribute (empty for decoration), link text
  // says where it goes, and links are crawlable (a real href).
  const body = html.replace(/<script[\s\S]*?<\/script>/g, '');
  const noAlt = [...body.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)].length;
  if (noAlt) err(route, `${noAlt} image(s) without an alt attribute`);
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const label = text(m[2]).trim().toLowerCase();
    if (/^(click here|here|read more|more|learn more|link)$/.test(label)) warn(route, `vague link text "${label}"`);
    if (!/\bhref="[^"]+"/.test(m[1])) err(route, `link without an href: "${label.slice(0, 40)}"`);
    else if (/\bhref="javascript:/.test(m[1])) err(route, `javascript: link "${label.slice(0, 40)}"`);
  }

  // Structured data
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) err(route, 'no JSON-LD');
  for (const block of blocks) {
    let data;
    try {
      data = JSON.parse(block);
    } catch (e) {
      err(route, `JSON-LD does not parse: ${e.message}`);
      continue;
    }
    const graph = data['@graph'] ?? [data];
    const ids = new Set(graph.map((node) => node['@id']).filter(Boolean));
    const refs = [];
    (function collect(node, top) {
      if (Array.isArray(node)) return node.forEach((n) => collect(n, false));
      if (node && typeof node === 'object') {
        const keys = Object.keys(node);
        if (!top && keys.length === 1 && keys[0] === '@id') refs.push(node['@id']);
        for (const k of keys) if (k !== '@id') collect(node[k], false);
      }
    })(graph, true);
    for (const ref of refs) if (!ids.has(ref)) err(route, `JSON-LD reference ${ref} has no node in the page`);
    const visible = text(html);
    for (const node of graph.filter((n) => n['@type'] === 'FAQPage')) {
      for (const q of node.mainEntity ?? []) if (!visible.includes(q.name)) err(route, `FAQPage question not visible: ${q.name}`);
    }
  }
}

for (const url of sitemapUrls) if (!pages.has(url)) err('sitemap.xml', `${url} has no page`);

console.log(`seocheck: ${files.length} pages, ${sitemapUrls.length} in the sitemap`);
if (warnings.length) console.log(`\n${warnings.length} warnings:\n  ${warnings.join('\n  ')}`);
if (errors.length) {
  console.log(`\n${errors.length} errors:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log('\nno errors');
