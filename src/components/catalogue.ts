/**
 * Opens the full module catalogue (the Platform mega-menu on wide screens, the drawer's Platform list on
 * small ones) from anywhere on the page, e.g. the "See all modules" buttons in Explore the platform.
 */
export const CATALOGUE_EVENT = 'mavro:open-catalogue';

export function openCatalogue() {
  window.dispatchEvent(new Event(CATALOGUE_EVENT));
}
