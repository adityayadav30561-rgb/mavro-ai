import type { ModuleCard } from '../blocks/ModuleCards';
import { explore } from '../data/home';
import {
  contentFor,
  entryBySlug,
  leadScreens,
  modulePage,
  type CatalogueEntry,
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
