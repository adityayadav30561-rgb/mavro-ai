import type { Pack } from '../data/modules';

/**
 * Opens the full module catalogue (the Platform mega-menu on wide screens, the drawer's Platform list on
 * small ones) from anywhere on the page, e.g. the "See all modules" buttons in Explore the platform. With a
 * package, the menu opens on that package's branch.
 */
export const CATALOGUE_EVENT = 'mavro:open-catalogue';

export function openCatalogue(pack?: Pack) {
  window.dispatchEvent(new CustomEvent<Pack | undefined>(CATALOGUE_EVENT, { detail: pack }));
}
