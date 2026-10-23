import { routes } from './routes';

/**
 * A link in the navigation (header, menus, drawer, footer). It names the page it belongs to (`page`, a route
 * path from SITE-PLAN.md) and, until that page is built, where to send people instead (`fallback`, usually the
 * homepage section that covers it). Neither: the link is planned and hidden.
 *
 * So the menus grow by themselves: adding a route to src/routes.ts switches every link that names it from its
 * fallback to the real page, site-wide, with no edits to the navigation data.
 */
export interface Link {
  label: string;
  page?: string;
  fallback?: string | null;
}

const paths = new Set(routes.map((route) => route.path));

/** True once the site has a page at this path. */
export const hasPage = (path: string) => paths.has(path);

/** Where a link goes today: its page if built, else its fallback, else null (not rendered). */
export function target(link: Link): string | null {
  if (link.page && hasPage(link.page)) return link.page;
  return link.fallback ?? null;
}

/** True when the link has reached its own page (rather than a homepage fallback). */
export const isPage = (link: Link) => !!link.page && hasPage(link.page);

/** The links that have somewhere to go. */
export const shown = <T extends Link>(links: readonly T[]) => links.filter((link) => target(link) !== null);
