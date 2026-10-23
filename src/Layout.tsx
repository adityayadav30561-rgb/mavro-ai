import type { ReactNode } from 'react';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { useViewportFlags } from './motion/hooks';
import { RouteContext, type Crumb } from './routing';

/**
 * The frame every page shares: skip link, header, the page's sections in <main>, footer. `route` is the page
 * being rendered (its path and breadcrumb trail), read by the header, footer and breadcrumbs (routing.tsx).
 */
export function Layout({
  route,
  children,
}: {
  route: { path: string; crumbs: readonly Crumb[] };
  children: ReactNode;
}) {
  useViewportFlags();

  return (
    <RouteContext.Provider value={{ path: route.path, crumbs: route.crumbs }}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </RouteContext.Provider>
  );
}
