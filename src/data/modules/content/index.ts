import type { ModuleContent } from '../schema';
import type { ModuleSlug } from '../slugs';

/*
 * Module page content, one file per module (./<slug>.ts, exporting `content`), registered here as each module
 * phase lands (IMPLEMENTATION-PLAN.md phases 5–20). The type ties each key to its file's slug. A module gets a
 * route (src/routes.ts) once it is listed here, so the navigation switches from its homepage fallback to the page
 * by itself (src/links.ts).
 *
 * Adding a module: write ./<slug>.ts (`export const content: ModuleContent = { slug: '<slug>', ... }`), import it
 * below and add it to the map.
 */
type Registry = { [S in ModuleSlug]?: ModuleContent & { slug: S } };

export const moduleContent: Registry = {};

export const contentFor = (slug: ModuleSlug): ModuleContent | undefined => moduleContent[slug];
