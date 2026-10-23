import type { ReactNode } from 'react';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { useViewportFlags } from './motion/hooks';
import { PathContext } from './routing';

/**
 * The frame every page shares: skip link, header, the page's sections in <main>, footer. `path` is the route
 * being rendered, so the header and footer can point their links correctly (see routing.tsx).
 */
export function Layout({ path, children }: { path: string; children: ReactNode }) {
  useViewportFlags();

  return (
    <PathContext.Provider value={path}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </PathContext.Provider>
  );
}
