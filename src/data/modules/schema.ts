import type { CapabilityTile } from '../../blocks/CapabilityTiles';
import type { FaqItem } from '../../blocks/FaqBlock';
import type { ScreenName } from '../../components/Screen';
import type { IndustrySlug } from '../home';
import type { ModuleSlug } from './slugs';

/*
 * The content of one module page (SITE-PLAN.md section 3.1), one file per module in ./content/. Written from the
 * module's appendix slide (sources.ts) in its module phase; the shape follows the slide, which is the same for
 * every module: a tagline, four capability tiles, what it does, six "why it matters" points, four named screens.
 * Tuples fix the counts the template is designed for, so a thin page does not type-check.
 */

/** One product screen of the module: a prototype page in prototype/modules/<slug>/, captured by `npm run shots`. */
export interface ModuleScreen {
  /** `<slug>/<file>`: the capture in src/assets/screens/, or an existing homepage screen reused where it is
   *  genuinely this module's view (IMPLEMENTATION-PLAN.md, "Existing screens to reuse"). */
  screen: ScreenName;
  /** The deck's name for the view (e.g. "Collections & Dunning Queue"), shown as the tour tab. */
  title: string;
  /** What the user does there, in two lines at most. */
  caption: string;
  /** Alt text: what the screen shows, with its key figures. */
  alt: string;
  /** Phone screens render in the phone frame (prototype/phone.css). */
  device?: 'desktop' | 'phone';
}

/** Another module (or portal) that feeds this one or that this one feeds, and what passes between them. */
export interface ModuleLink {
  slug: ModuleSlug;
  /** What flows along the link, e.g. "Confirmed orders" or "Invoices to post". */
  passes: string;
}

export type Four<T> = readonly [T, T, T, T];
export type Six<T> = readonly [T, T, T, T, T, T];

export interface ModuleContent<S extends ModuleSlug = ModuleSlug> {
  slug: S;
  /** The deck's one-line tagline, e.g. "Order capture to collection: credit-safe, batch-accurate revenue
   *  operations." It is the hero lead. */
  tagline: string;
  /** The deck's four capability tiles; a tile's figure comes from the module's screens, so the two agree. */
  tiles: Four<CapabilityTile>;
  /** "What this module does": the deck's paragraph, rewritten for the page without adding facts. */
  what: string;
  /** "Why it matters": the deck's six points. */
  why: Six<string>;
  /** Where it sits: what feeds it, what it feeds (section 5 of the page). Portals show the chain instead. */
  flow: { from: readonly ModuleLink[]; to: readonly ModuleLink[] };
  /** Who uses it: the industries it serves, each with one line on what the module does there. */
  industries: readonly { slug: IndustrySlug; note: string }[];
  /** The roles that work in it, each with what they do there. */
  roles: readonly { name: string; task: string }[];
  /** Three or four other modules for the related cards; defaults to the same business area. */
  related?: readonly ModuleSlug[];
  /** The module's screens, 3–4, in tour order; the first is the hero screen. */
  screens: readonly [ModuleScreen, ModuleScreen, ModuleScreen, ...ModuleScreen[]];
  /** A phone screen of the module, shown in the hero in front of the lead screen. */
  phone?: ModuleScreen;
  /** The one scenario every screen shares (records, figures, people), as written at the top of the first screen
   *  file. Kept here so captions and tile figures can be checked against it. */
  scenario: string;
  /** Three to five questions written for search, as on the homepage (FAQPage structured data). */
  faq: readonly [FaqItem, FaqItem, FaqItem, ...FaqItem[]];
  seo: { title: string; description: string };
}
