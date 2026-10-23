/*
 * Everything about modules and portals:
 *
 *   catalogue.ts   the module catalogue (names, summaries, packages, business areas, slugs), the portals, and the
 *                  homepage's module copy; read by the menus, Explore, Industries and the hero
 *   slugs.ts       the 42 page slugs (`ModuleSlug`)
 *   sources.ts     where each page's content comes from in docs/source/ (every slug, enforced by the type)
 *   schema.ts      the shape of a module page's content (`ModuleContent`)
 *   content/       one content file per module page, registered in content/index.ts as module phases land
 *   template.ts    the module page template's shared headings, with {name} for the module
 *   views.ts       every view of a module (its full menu); the page's screens are a sample of these
 *   leads.ts       the lead screen of modules without a page yet, for related-module cards
 */
export * from './catalogue';
export * from './content';
export * from './schema';
export * from './slugs';
export * from './sources';
export * from './template';
export * from './views';
export * from './leads';
