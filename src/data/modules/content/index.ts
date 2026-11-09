import type { ModuleContent } from '../schema';
import { moduleSlugs, type ModuleSlug } from '../slugs';

/*
 * Module page content, one file per module (./<slug>.ts, exporting `content: ModuleContent<'<slug>'>`), loaded per
 * page (Phase 28 performance: all 42 used to ship in the main script on every page).
 *
 * - Each file is its own chunk. `contentSlugs` lists the modules that have one, without loading any: a module gets a
 *   route (src/routes.ts) as soon as its file exists, and the navigation switches to its page (src/links.ts).
 * - A route names the modules its page reads (`content` in routes.ts); the browser loads them before hydrating
 *   (entry-client.tsx), the prerender loads all of them first (`loadAllContent`, entry-server.tsx).
 * - `contentFor` is synchronous and throws if a module with content was not loaded, so a page that reads a module
 *   it did not name fails loudly instead of rendering differently from its prerendered HTML.
 * - Card thumbnails do not need any of this: every module's lead screen is in ../leads.ts.
 *
 * Adding a module: write ./<slug>.ts; nothing to register here (docs/ADDING-A-MODULE.md).
 */
const loaders = import.meta.glob<{ content: ModuleContent }>(['./*.ts', '!./index.ts']);

const slugOf = (file: string) => file.slice(2, -3) as ModuleSlug;
const fileOf = (slug: ModuleSlug) => `./${slug}.ts`;

/** The modules with a content file (and so a page), in catalogue order. */
export const contentSlugs: readonly ModuleSlug[] = moduleSlugs.filter((slug) => fileOf(slug) in loaders);

const stray = Object.keys(loaders).map(slugOf).filter((slug) => !moduleSlugs.includes(slug));
if (stray.length) throw new Error(`modules/content: files with no slug in slugs.ts: ${stray.join(', ')}`);

const cache: Partial<Record<ModuleSlug, ModuleContent>> = {};

/** Loads the named modules' content (each once); modules without a content file are skipped. */
export async function loadContent(slugs: readonly ModuleSlug[] = []) {
  await Promise.all(
    slugs
      .filter((slug) => !cache[slug] && fileOf(slug) in loaders)
      .map(async (slug) => {
        const { content } = await loaders[fileOf(slug)]();
        if (content.slug !== slug) throw new Error(`modules/content: ${fileOf(slug)} has slug "${content.slug}"`);
        cache[slug] = content;
      }),
  );
}

/** Every module's content: the prerender (titles, descriptions, structured data and every page). */
export const loadAllContent = () => loadContent(contentSlugs);

/** A module's content: undefined if it has no content file; throws if it has one that was not loaded. */
export function contentFor(slug: ModuleSlug): ModuleContent | undefined {
  const content = cache[slug];
  if (!content && fileOf(slug) in loaders) {
    throw new Error(`modules/content: "${slug}" was read before it was loaded; add it to its route's \`content\` (src/routes.ts)`);
  }
  return content;
}
