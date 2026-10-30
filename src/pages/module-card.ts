import type { ModuleCard } from '../blocks/ModuleCards';
import type { StackTier } from '../blocks/PackageStack';
import { explore } from '../data/home';
import { packageContent } from '../data/packages';
import {
  catalogue,
  contentFor,
  entryBySlug,
  leadScreens,
  modulePage,
  type CatalogueEntry,
  packs,
  type ModuleSlug,
} from '../data/modules';
import { hasPage } from '../links';

/** A module's page, or null while it has none (a plain label or card instead of a link). */
export const pageOf = (entry: CatalogueEntry) => (hasPage(modulePage(entry)) ? modulePage(entry) : null);

export const iconOf = (entry: CatalogueEntry) => (entry.kind === 'module' ? entry.item.icon : 'distribution');

/** The lead screen of a module for its card: its own first screen once it has content, else its lead screen
 *  (leads.ts), else its homepage Explore screen. */
export function thumbnail(slug: ModuleSlug): Pick<ModuleCard, 'screen' | 'alt'> {
  const own = contentFor(slug)?.screens[0];
  if (own) return { screen: own.screen, alt: own.alt };
  if (leadScreens[slug]) return leadScreens[slug];
  const entry = entryBySlug(slug);
  const base = explore.packages.base.screens as Record<string, { screen: ModuleCard['screen']; alt: string }>;
  return entry.kind === 'module' && base[entry.item.id] ? base[entry.item.id] : {};
}

/** A module as a card: name, summary, tier, thumbnail and its page. */
export function cardFor(slug: ModuleSlug): ModuleCard {
  const entry = entryBySlug(slug);
  return {
    name: entry.name,
    summary: entry.summary,
    icon: iconOf(entry),
    tier: entry.pack,
    href: pageOf(entry),
    ...thumbnail(slug),
  };
}

/** The three packages for the package stack (blocks/PackageStack) and the architecture's Core modules row. */
export function packageTiers(): StackTier[] {
  return (['base', 'portal', 'premium'] as const).map((key) => {
    const count = catalogue.filter((entry) => entry.pack === key).length;
    return {
      tier: key,
      name: packs[key].name,
      blurb: packs[key].blurb,
      count: `${count} ${key === 'portal' ? 'portals' : 'modules'}`,
      icon: packageContent[key].icon,
      tiles: Math.min(5, count),
      href: hasPage(packs[key].page) ? packs[key].page : null,
    };
  });
}
