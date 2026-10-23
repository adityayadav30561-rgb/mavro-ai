import { createContext, useContext } from 'react';

/**
 * The path of the page being rendered (a route's `path`, e.g. '/' or '/404'), set once by Layout. Shared parts
 * such as the header and footer read it to point their links correctly on every page.
 */
export const PathContext = createContext('/');

export const usePath = () => useContext(PathContext);

/**
 * In-page anchors ('#demo', '#platform') are sections of the homepage. On any other page they point back to it
 * ('/#demo'), and '#top' (the logo) becomes '/'. Every other link is returned as it is.
 */
export function useHref() {
  const path = usePath();
  return (href: string) => {
    if (path === '/' || !href.startsWith('#')) return href;
    return href === '#top' ? '/' : `/${href}`;
  };
}
