/*
 * Everything about modules and portals:
 *
 *   catalogue.ts   the module catalogue (names, summaries, packages, business areas, slugs), the portals, and the
 *                  homepage's module copy; read by the menus, Explore, Industries and the hero
 *   slugs.ts       the 42 page slugs (`ModuleSlug`)
 *   sources.ts     where each page's content comes from in docs/source/ (every slug, enforced by the type)
 *   schema.ts      the shape of a module page's content (`ModuleContent`)
 *   content/       one content file per module page, registered in content/index.ts as module phases land
 */
export * from './catalogue';
export * from './content';
export * from './schema';
export * from './slugs';
export * from './sources';
