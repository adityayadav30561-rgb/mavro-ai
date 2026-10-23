import type { ComponentType } from 'react';
import { faq } from './data/home';
import { entryBySlug, moduleContent, modulePage, packs } from './data/modules';
import { notFound, pipelineCheck } from './data/pages';
import { site } from './data/site';
import type { Crumb } from './routing';
import { faqPage, moduleSoftware } from './seo/schema';

/*
 * Every page of the site, in one table. The same entries drive:
 *
 *   - the server render and the prerender (scripts/prerender.mjs writes one HTML file per route)
 *   - the head of each page (src/seo/head.ts: title, description, canonical, Open Graph, JSON-LD)
 *   - sitemap.xml (routes with `inSitemap`)
 *   - the browser, which hydrates the route for location.pathname (src/entry-client.tsx)
 *
 * A route names its page module in src/pages/ (`page: 'Home'` is src/pages/Home.tsx, exporting `Page`). Each page
 * module is its own chunk, so a page only loads the code it uses (the homepage's three.js scene stays on the
 * homepage). Adding a page: write src/pages/<Name>.tsx, add a route here.
 */

export interface Route {
  /** Clean URL: lowercase, hyphenated, no trailing slash ('/' for the homepage). */
  path: string;
  /** Page module in src/pages/, without the extension. */
  page: string;
  title: string;
  description: string;
  /** Breadcrumb trail below Home, ending with this page (BreadcrumbList JSON-LD). Empty on the homepage. */
  crumbs: Crumb[];
  /** Page-specific schema.org nodes, added to the site-wide graph (Organization, WebSite). */
  schema?: () => Record<string, unknown>[];
  /** Listed in sitemap.xml and open to indexing. Hidden and utility pages set false (noindex). */
  inSitemap: boolean;
  /** Sitemap priority (default 0.8). */
  priority?: number;
}

const home: Route = {
  path: '/',
  page: 'Home',
  title: site.title,
  description: site.description,
  crumbs: [],
  inSitemap: true,
  priority: 1,
  // The product and the FAQ section (the same text as the visible questions, as search engines require).
  // No ratings or prices are claimed.
  schema: () => [
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.url}/#software`,
      name: site.name,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Enterprise resource planning',
      operatingSystem: 'Web',
      description: site.description,
      url: site.url,
      publisher: { '@id': `${site.url}/#organization` },
    },
    faqPage(`${site.url}/#faq`, faq.items),
  ],
};

/** Served for any URL that has no route; written to dist/404.html. */
export const notFoundRoute: Route = {
  path: '/404',
  page: 'NotFound',
  title: notFound.seo.title,
  description: notFound.seo.description,
  crumbs: [],
  inSitemap: false,
};

/**
 * One page per module with content (src/data/modules/content/), all on the module template (src/pages/ModulePage.tsx).
 * The trail runs Home / package / module; the package crumb links to its homepage section until the package page
 * exists. Each page carries the module as a SoftwareApplication (part of MAVRO) and its FAQ.
 */
const moduleRoutes: Route[] = Object.values(moduleContent).map((content) => {
  const entry = entryBySlug(content.slug);
  const pack = packs[entry.pack];
  const path = modulePage(entry);
  return {
    path,
    page: 'ModulePage',
    title: content.seo.title,
    description: content.seo.description,
    crumbs: [
      { name: pack.name, path: pack.page, fallback: `/${pack.href}` },
      { name: entry.name, path },
    ],
    inSitemap: true,
    schema: () => [
      moduleSoftware(site.url, path, entry.name, pack.name, content.seo.description),
      faqPage(`${site.url}${path}#faq`, content.faq),
    ],
  };
});

const libraryRoute: Route = {
  path: '/_library',
  page: 'Library',
  title: 'Section library | MAVRO',
  description: 'Every shared block with sample data (development only).',
  crumbs: [{ name: 'Section library', path: '/_library' }],
  inSitemap: false,
};

export const routes: Route[] = [
  home,
  // Hidden: proves the multi-page pipeline (prerender, own head, hydration, no three.js). Not linked, not in the
  // sitemap, noindex. Remove at launch QA (Phase 28).
  {
    path: '/pipeline-check',
    page: 'PipelineCheck',
    title: pipelineCheck.seo.title,
    description: pipelineCheck.seo.description,
    crumbs: [{ name: pipelineCheck.seo.crumb, path: '/pipeline-check' }],
    inSitemap: false,
  },
  ...moduleRoutes,
  // Dev only: the section library (src/library/). Absent from production builds, so never prerendered or served.
  ...(import.meta.env.DEV ? [libraryRoute] : []),
  notFoundRoute,
];

/** The route for a browser path ('/x/', '/x/index.html' and '/x' are the same page); unknown paths get the 404. */
export function findRoute(pathname: string): Route {
  const path = pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
  return routes.find((route) => route.path === path) ?? notFoundRoute;
}

type PageModule = { Page: ComponentType };
const pages = import.meta.glob<PageModule>('./pages/*.tsx');

/** Loads a route's page module (its own chunk). */
export function loadPage(route: Route): Promise<PageModule> {
  if (import.meta.env.DEV && route.page === 'Library') return import('./library/Library');
  const load = pages[`./pages/${route.page}.tsx`];
  if (!load) throw new Error(`routes: no page module src/pages/${route.page}.tsx for ${route.path}`);
  return load();
}
