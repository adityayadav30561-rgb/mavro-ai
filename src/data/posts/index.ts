import type { ModuleSlug } from '../modules/slugs';

/*
 * Blog articles (D5): guides that answer the questions around a module's search ("how to calculate PF"), each linked
 * to the module page that owns the commercial query ("payroll software"). One query, one page: STATUS.md keeps the
 * query → page table.
 *
 * Like module content, an article's body is its own file (./<slug>.ts, exporting `post: PostBody`) and loads only
 * on its page: the index below is all that the routes, the /blog list, module pages and llms.txt need. Statutory
 * facts in a body are stated only where an official source or two reputable sources agree, dated, with the sources
 * shown on the page; "How MAVRO handles this" says only what the decks say.
 */
export interface PostMeta {
  slug: string;
  title: string;
  /** The meta description and the lead under the title. */
  description: string;
  /** ISO dates: first published, and when its facts were last checked. */
  published: string;
  checked: string;
  /** The module page it supports and links to. */
  module: ModuleSlug;
  /** How the related-module link reads: the commercial query the module page owns, e.g. "payroll software". */
  moduleLink: string;
}

export interface PostBody {
  slug: string;
  /** Question-shaped headings, each section opening with a sentence that answers it. */
  sections: { heading: string; paragraphs: string[] }[];
  /** What MAVRO does about it: deck facts only, never a claim about a rule the decks predate. */
  mavro: string[];
  sources: { label: string; url: string }[];
}

export const postIndex: PostMeta[] = [
  {
    slug: 'pf-and-esi-contributions',
    title: 'How PF and ESI contributions are calculated in 2026',
    description: 'PF and ESI rates for employer and employee, the new ₹25,000 EPF wage ceiling, the ESI limit, a worked example and what the labour codes changed.',
    published: '2026-11-10',
    checked: '2026-11-10',
    module: 'hrms-and-payroll',
    moduleLink: 'payroll software.',
  },
  {
    slug: 'form-16-to-form-130',
    title: 'Form 16 is now Form 130: salary TDS after April 2026',
    description: 'What the Income-tax Act, 2025 changed for salary TDS: Form 16 becomes Form 130, which form applies to which year, the tax year, and the quarterly return.',
    published: '2026-11-10',
    checked: '2026-11-10',
    module: 'hrms-and-payroll',
    moduleLink: 'payroll software.',
  },
  {
    slug: 'gst-e-invoicing-rules',
    title: 'GST e-invoicing rules: the ₹5 crore and 30-day limits',
    description: 'Who must e-invoice under GST (the ₹5 crore turnover threshold and exemptions), what the IRN and QR code are, and the 30-day reporting rule from ₹10 crore.',
    published: '2026-11-10',
    checked: '2026-11-10',
    module: 'accounting',
    moduleLink: 'accounting and GST software.',
  },
  {
    slug: 'gstr-2b-and-ims',
    title: 'GSTR-2B and IMS: how to claim input tax credit',
    description: 'How the GST Invoice Management System works with GSTR-2B and GSTR-3B: accept, reject or keep pending, what happens if you do nothing, and a monthly routine.',
    published: '2026-11-10',
    checked: '2026-11-10',
    module: 'accounting',
    moduleLink: 'accounting and GST software.',
  },
  {
    slug: 'fifo-vs-fefo',
    title: 'FIFO vs FEFO: which stock should leave first?',
    description: 'The difference between FIFO and FEFO, when they give different answers, which goods need FEFO, minimum shelf life rules, and why FEFO fails in practice.',
    published: '2026-11-10',
    checked: '2026-11-10',
    module: 'warehouse-management',
    moduleLink: 'warehouse management software.',
  },
  {
    slug: 'cycle-counting',
    title: 'Cycle counting vs the annual stock-take',
    description: 'What cycle counting is, why it beats a once-a-year count, how ABC analysis sets the frequency, how to run a count, and if it replaces the stock-take.',
    published: '2026-11-10',
    checked: '2026-11-10',
    module: 'inventory-management',
    moduleLink: 'inventory management software.',
  },
];

const loaders = import.meta.glob<{ post: PostBody }>(['./*.ts', '!./index.ts']);
const fileOf = (slug: string) => `./${slug}.ts`;
const cache: Record<string, PostBody> = {};

const stray = postIndex.filter((meta) => !(fileOf(meta.slug) in loaders)).map((meta) => meta.slug);
if (stray.length) throw new Error(`posts: no body file for ${stray.join(', ')}`);

/** Loads the named articles' bodies (each once). */
export async function loadPosts(slugs: readonly string[] = []) {
  await Promise.all(
    slugs
      .filter((slug) => !cache[slug])
      .map(async (slug) => {
        const load = loaders[fileOf(slug)];
        if (!load) throw new Error(`posts: no article "${slug}"`);
        const { post } = await load();
        if (post.slug !== slug) throw new Error(`posts: ${fileOf(slug)} has slug "${post.slug}"`);
        cache[slug] = post;
      }),
  );
}

export const loadAllPosts = () => loadPosts(postIndex.map((meta) => meta.slug));

/** An article's body; throws if it was not loaded (its route names it in `posts`). */
export function postFor(slug: string): PostBody {
  const post = cache[slug];
  if (!post) throw new Error(`posts: "${slug}" was read before it was loaded; add it to its route's \`posts\``);
  return post;
}

export const postMeta = (slug: string) => postIndex.find((meta) => meta.slug === slug);
/** The articles that support a module page, newest first. */
export const postsFor = (module: ModuleSlug) =>
  postIndex.filter((meta) => meta.module === module).sort((a, b) => b.published.localeCompare(a.published));
export const postPath = (meta: { slug: string }) => `/blog/${meta.slug}`;

/** "10 November 2026". */
export const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
