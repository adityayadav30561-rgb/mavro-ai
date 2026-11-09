import type { ModuleCard } from '../blocks/ModuleCards';
import type { StackTier } from '../blocks/PackageStack';
import { packageContent } from '../data/packages';
import {
  catalogue,
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

/** A module's card thumbnail: its lead screen (modules/leads.ts, the first screen of its page). */
export const thumbnail = (slug: ModuleSlug): Pick<ModuleCard, 'screen' | 'alt'> => leadScreens[slug];

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
