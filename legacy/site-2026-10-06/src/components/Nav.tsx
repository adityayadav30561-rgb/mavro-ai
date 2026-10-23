import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import { Logo } from './Logo';
import './nav.css';

export function Nav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // Compact once the top of the page has scrolled away. An observer, not a scroll handler.
  useEffect(() => {
    if (!sentinel.current) return;
    const io = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div ref={sentinel} className="nav-sentinel" aria-hidden="true" />
      <header className="nav" data-compact={compact || undefined} data-open={open || undefined}>
        <div className="page nav__row">
          <a href="#top" className="nav__logo" aria-label="MAVRO, back to top">
            <Logo />
          </a>
          <nav className="nav__links" aria-label="Primary">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="btn btn--primary btn--sm nav__cta" href={site.demoHref}>
            Book a demo
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="nav__bars" aria-hidden="true" />
          </button>
        </div>
        <nav id="nav-menu" className="nav__menu" aria-label="Primary, mobile" hidden={!open}>
          <div className="page">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="btn btn--primary" href={site.demoHref} onClick={() => setOpen(false)}>
              Book a demo
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
