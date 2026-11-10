// Blog post check (after `npm run build`, no server): every article in dist/blog/ meets the user's brief
// (DECISIONS.md, "Blog"), or the check fails.
//
//   node qa/postcheck.cjs              # all articles;   node qa/postcheck.cjs pf-and-esi-contributions   # one
//
// What counts as the body's words: the key takeaways, the sections (paragraphs, lists, tables, chart and figure
// captions) and the visible FAQ. Not counted: the hero, sources, contents, sidebar, related module, CTA.
// Per article:
//   - 1,500–2,000 body words; the "N minute read" shown agrees with them (200 words a minute, ±1)
//   - every paragraph at most 60 words and 3 sentences; at most 300 words in any one section
//   - 3–5 key takeaways; at least one figure, table or chart; at least two internal links in the body
//   - a visible FAQ of 3+ questions, and Article + FAQPage JSON-LD; the post type shown
//   - title tag at most 60 characters, meta description at most 160
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'dist', 'blog');
const only = process.argv.slice(2);
const slugs = fs
  .readdirSync(dir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((slug) => !only.length || only.includes(slug));

const decode = (s) =>
  s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = (s) => (s.match(/[\p{L}\p{N}₹][\p{L}\p{N}₹'’.,%-]*/gu) ?? []).length;
const sentences = (s) => s.split(/(?<=[.!?])\s+(?=[A-Z₹0-9"“])/).filter(Boolean).length;
/** The inner HTML of each element opened by `open` (a regex for the opening tag), balanced by tag name. */
function elements(html, open, tag) {
  const out = [];
  const re = new RegExp(open, 'g');
  let m;
  while ((m = re.exec(html))) {
    let depth = 1;
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g');
    tagRe.lastIndex = m.index + m[0].length;
    let t;
    while ((t = tagRe.exec(html))) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) {
        out.push(html.slice(m.index + m[0].length, t.index));
        break;
      }
    }
  }
  return out;
}

let failed = 0;
const rows = [];
for (const slug of slugs) {
  const html = fs.readFileSync(path.join(dir, slug, 'index.html'), 'utf8');
  const errors = [];
  const sections = elements(html, '<section[^>]*data-words[^>]*>', 'section');
  const faq = elements(html, '<section id="faq"[^>]*>', 'section')[0] ?? '';
  const faqItems = (faq.match(/<details/g) ?? []).length;
  const faqText = faq ? text(faq.replace(/<h2[\s\S]*?<\/h2>/, '').replace(/<p class="lead[\s\S]*?<\/p>/, '')) : '';
  const bodyWords = sections.reduce((n, s) => n + words(text(s.replace(/<details class="bchart__data">[\s\S]*?<\/details>/g, ''))), 0) + words(faqText);

  if (bodyWords < 1500 || bodyWords > 2000) errors.push(`${bodyWords} body words (1,500–2,000)`);
  const minutes = Number(html.match(/(\d+) minute read/)?.[1] ?? 0);
  if (Math.abs(minutes - Math.round(bodyWords / 200)) > 1) errors.push(`shows ${minutes} minute read for ${bodyWords} words`);

  for (const section of sections) {
    const heading = text(section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? '');
    const n = words(text(section.replace(/<details class="bchart__data">[\s\S]*?<\/details>/g, '')));
    if (n > 300) errors.push(`section "${heading}" has ${n} words (300 max)`);
    for (const p of section.match(/<p(?![^>]*class="(?:abody__note|bchart__title)")[^>]*>[\s\S]*?<\/p>/g) ?? []) {
      const t = text(p);
      if (words(t) > 60) errors.push(`paragraph of ${words(t)} words: "${t.slice(0, 50)}…"`);
      else if (sentences(t) > 3) errors.push(`paragraph of ${sentences(t)} sentences: "${t.slice(0, 50)}…"`);
    }
  }

  const takeaways = elements(html, '<section[^>]*class="abody__takeaways"[^>]*>', 'section')[0] ?? '';
  const nTake = (takeaways.match(/<li/g) ?? []).length;
  if (nTake < 3 || nTake > 5) errors.push(`${nTake} takeaways (3–5)`);
  const visuals = (html.match(/class="(abody__figure|abody__table|bchart)"/g) ?? []).length;
  if (!visuals) errors.push('no figure, table or chart');
  const body = sections.join('');
  const internal = (body.match(/<a href="\/[^"]*"/g) ?? []).length;
  if (internal < 2) errors.push(`${internal} internal links in the body (2+)`);
  if (faqItems < 3) errors.push(`${faqItems} FAQ questions (3+)`);
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? '{}';
  const types = (JSON.parse(ld)['@graph'] ?? []).map((n) => n['@type']);
  if (!types.includes('Article')) errors.push('no Article JSON-LD');
  if (!types.includes('FAQPage')) errors.push('no FAQPage JSON-LD');
  if (!/class="ph__chip"/.test(html)) errors.push('post type not shown');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (title.length > 60) errors.push(`title ${title.length} characters (60 max)`);
  if (desc.length > 160) errors.push(`description ${desc.length} characters (160 max)`);

  if (errors.length) failed++;
  rows.push(`${errors.length ? 'FAIL' : 'ok  '} ${slug}  ${bodyWords} words, ${sections.length - 1} sections, ${visuals} visuals, ${internal} links, ${faqItems} FAQ${errors.length ? `\n       ${errors.join('\n       ')}` : ''}`);
}
console.log(rows.join('\n'));
console.log(`\npostcheck: ${slugs.length} articles, ${failed} failing`);
process.exit(failed ? 1 : 0);
