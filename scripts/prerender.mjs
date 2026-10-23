/*
 * Last step of `npm run build`. Turns the client build into a static, crawlable page:
 *
 *   1. renders the app to HTML with the server bundle and injects it into dist/index.html
 *   2. replaces the head block with the full metadata and structured data
 *   3. preloads the one font file the first viewport needs
 *   4. writes robots.txt and sitemap.xml from the configured site URL
 *
 * The page then hydrates in the browser (src/entry-client.tsx).
 */
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssr = path.join(root, 'dist-ssr');

const { render, renderHead, site } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href);

const assets = await readdir(path.join(dist, 'assets'));
const displayFont = assets.find((file) => /^manrope-latin-wght-normal-.+\.woff2$/.test(file));
const preload = displayFont
  ? `\n    <link rel="preload" href="/assets/${displayFont}" as="font" type="font/woff2" crossorigin />`
  : '';

const indexPath = path.join(dist, 'index.html');
const template = await readFile(indexPath, 'utf8');
const html = template
  .replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, () => renderHead() + preload)
  .replace('<!--app-html-->', () => render());

if (html === template) throw new Error('prerender: markers not found in dist/index.html');
await writeFile(indexPath, html);

await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${site.url}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
);

await rm(ssr, { recursive: true, force: true });
console.log(`prerendered ${path.relative(root, indexPath)} (${(html.length / 1024).toFixed(1)} kB) for ${site.url}`);
