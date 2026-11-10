/*
 * Last step of `npm run build`. Turns the client build into static, crawlable pages, one per route in
 * src/routes.ts:
 *
 *   1. renders each route to HTML with the server bundle and writes it from the dist/index.html template:
 *      '/' to dist/index.html, '/404' to dist/404.html, any other path to dist/<path>/index.html
 *   2. replaces the head block with that route's metadata and structured data
 *   3. preloads the one font file the first viewport needs, and the route's page chunk (so hydration does not
 *      wait for it)
 *   4. writes robots.txt (every crawler allowed, AI crawlers named: user, 2026-11-09), sitemap.xml and llms.txt
 *      from the routes marked `inSitemap` (no lastmod: Google only trusts an accurate one, and the build date is not)
 *
 * Each page then hydrates in the browser (src/entry-client.tsx).
 */
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssr = path.join(root, 'dist-ssr');

const { llmsTxt, loadAllContent, render, renderHead, routes, site } = await import(
  pathToFileURL(path.join(ssr, 'entry-server.js')).href
);
// Module content loads per page in the browser; here every page, title and structured data needs it, so load it all.
await loadAllContent();

const assets = await readdir(path.join(dist, 'assets'));
const displayFont = assets.find((file) => /^manrope-latin-wght-normal-.+\.woff2$/.test(file));
const fontPreload = displayFont
  ? `\n    <link rel="preload" href="/assets/${displayFont}" as="font" type="font/woff2" crossorigin />`
  : '';

// The client manifest maps each page module to its chunk and the shared chunks it imports.
const manifestPath = path.join(dist, '.vite', 'manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const entryChunks = new Set();
for (const chunk of Object.values(manifest)) if (chunk.isEntry) collect(chunk, entryChunks);

/** A chunk's file and everything it statically imports. */
function collect(chunk, files = new Set()) {
  if (files.has(chunk.file)) return files;
  files.add(chunk.file);
  for (const key of chunk.imports ?? []) collect(manifest[key], files);
  return files;
}

function pagePreloads(route) {
  // A page chunk is keyed by its source, unless another chunk imports from it (the homepage's lazy scene shares
  // code with it), in which case Rollup keys it as a shared chunk under the page's name.
  const chunk =
    manifest[`src/pages/${route.page}.tsx`] ??
    Object.values(manifest).find((entry) => entry.isDynamicEntry && entry.name === route.page);
  if (!chunk) throw new Error(`prerender: no chunk for src/pages/${route.page}.tsx in the client manifest`);
  // And the content chunk of every module the page reads (route.content), so hydration does not wait on it either.
  const files = collect(chunk);
  for (const slug of route.content ?? []) {
    const content = manifest[`src/data/modules/content/${slug}.ts`];
    if (!content) throw new Error(`prerender: no chunk for module content "${slug}" in the client manifest`);
    collect(content, files);
  }
  return [...files]
    .filter((file) => !entryChunks.has(file))
    .map((file) => `\n    <link rel="modulepreload" crossorigin href="/${file}" />`)
    .join('');
}

const outFile = (route) =>
  route.path === '/' ? 'index.html' : route.page === 'NotFound' ? '404.html' : `${route.path.slice(1)}/index.html`;

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const written = [];

for (const route of routes) {
  const body = await render(route);
  const lang = (route.locale ?? site.locale).lang;
  const html = template
    .replace('<html lang="en-IN">', () => `<html lang="${lang}">`)
    .replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, () => renderHead(route) + fontPreload + pagePreloads(route))
    .replace('<!--app-html-->', () => body);
  if (html === template) throw new Error('prerender: markers not found in dist/index.html');

  const file = path.join(dist, outFile(route));
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  written.push(`${path.relative(root, file)} (${(html.length / 1024).toFixed(1)} kB)`);
}

const sitemap = routes
  .filter((route) => route.inSitemap)
  .map(
    (route) =>
      `  <url>\n    <loc>${site.url}${route.path === '/' ? '/' : route.path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${(route.priority ?? 0.8).toFixed(1)}</priority>\n  </url>\n`,
  )
  .join('');

// Noindex pages (drafts, utility pages) are NOT disallowed: crawlers must fetch them to read their noindex.
const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot'];
await writeFile(
  path.join(dist, 'robots.txt'),
  `# Every crawler, search and AI alike, may read the whole site (user, 2026-11-09).\nUser-agent: *\nAllow: /\n\n${aiCrawlers.map((bot) => `User-agent: ${bot}`).join('\n')}\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
);
await writeFile(path.join(dist, 'llms.txt'), llmsTxt(routes));
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}</urlset>\n`,
);

await rm(ssr, { recursive: true, force: true });
await rm(path.join(dist, '.vite'), { recursive: true, force: true });
console.log(`prerendered ${written.length} pages for ${site.url}:\n  ${written.join('\n  ')}`);

// Draft pages (content written before launch, noindex, out of the sitemap): launch QA needs this list empty.
const drafts = routes.filter((route) => route.draft).map((route) => route.path);
if (drafts.length) console.log(`\n${drafts.length} draft pages (noindex, not in the sitemap; replace them and their cards in home.ts industries.list before launch):\n  ${drafts.join('\n  ')}`);
