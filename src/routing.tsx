import { createContext, useContext } from 'react';

export interface Crumb {
  name: string;
  /** The page this crumb names (its route path). */
  path: string;
  /** Until that page exists: where the crumb links instead, usually a homepage section ('/#modules'). */
  fallback?: string;
}

/**
 * The page being rendered: its route path (e.g. '/' or '/404') and its breadcrumb trail below Home, set once by
 * Layout. Shared parts such as the header, footer and breadcrumbs read it.
 */
export const RouteContext = createContext<{ path: string; crumbs: readonly Crumb[] }>({ path: '/', crumbs: [] });

export const usePath = () => useContext(RouteContext).path;
export const useCrumbs = () => useContext(RouteContext).crumbs;

/**
 * In-page anchors ('#demo', '#platform') are sections of the homepage. On any other page they point back to it
 * ('/#demo'), and '#top' (the logo) becomes '/'. Every other link is returned as it is.
 */
/** Pages that carry the demo form (#demo): the homepage and Contact. Demo buttons there stay on the page. */
export const formPages = ['/', '/contact'];

/** Where "Request a demo" goes from this page: the form on this page if it has one, else the homepage's. */
export function useDemoHref() {
  return formPages.includes(usePath()) ? '#demo' : '/#demo';
}

export function useHref() {
  const path = usePath();
  return (href: string) => {
    if (path === '/' || !href.startsWith('#')) return href;
    return href === '#top' ? '/' : `/${href}`;
  };
}
