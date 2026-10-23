import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { areaOrder, areas, byArea, channelPortals, packHref, packs, vendorPortal } from '../data/modules';
import { cta, live, nav } from '../data/site';
import { useHref } from '../routing';
import { CATALOGUE_EVENT } from './catalogue';
import { Icon } from './Icon';
import { Logo } from './Logo';
import { PlatformMenu } from './PlatformMenu';
import './nav.css';

const links = live(nav);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [drawerPlatform, setDrawerPlatform] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const megaTrigger = useRef<HTMLButtonElement>(null);
  const drawerToggle = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef(0);
  const href = useHref();

  // Solid surface once the top of the page has scrolled away. An observer, not a scroll handler.
  useEffect(() => {
    if (!sentinel.current) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  // "See all modules" buttons elsewhere on the page open the catalogue: the mega-menu where its trigger is
  // shown, otherwise the drawer with its Platform list expanded. Focus moves to the first module link.
  useEffect(() => {
    const onOpen = () => {
      const wide = megaTrigger.current?.offsetParent != null;
      if (wide) setMega(true);
      else {
        setDrawer(true);
        setDrawerPlatform(true);
      }
      window.setTimeout(() => {
        const scope = wide ? header.current?.querySelector('#platform-menu') : header.current?.querySelector('.drawer');
        scope?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
      }, 60);
    };
    window.addEventListener(CATALOGUE_EVENT, onOpen);
    return () => window.removeEventListener(CATALOGUE_EVENT, onOpen);
  }, []);

  // Mega-menu: Escape returns focus to its trigger; a click or focus outside the header closes it.
  useEffect(() => {
    if (!mega) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMega(false);
      megaTrigger.current?.focus();
    };
    const onOutside = (event: Event) => {
      if (!header.current?.contains(event.target as Node)) setMega(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [mega]);

  // Mobile drawer: modal. Locks page scroll, keeps Tab inside the header, Escape closes and restores focus.
  useEffect(() => {
    if (!drawer) return;
    document.body.setAttribute('data-lock', '');
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawer(false);
        drawerToggle.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !header.current) return;
      const focusable = [
        ...header.current.querySelectorAll<HTMLElement>('.nav__row a, .nav__row button, .drawer a, .drawer button'),
      ].filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.removeAttribute('data-lock');
      window.removeEventListener('keydown', onKey);
    };
  }, [drawer]);

  // Close the drawer if the window grows past the mobile layout.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = () => query.matches && setDrawer(false);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Hover intent for fine pointers only; touch and keyboard use the button.
  const hover = (next: boolean) => (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMega(next), next ? 90 : 220);
  };

  const closeAll = () => {
    setMega(false);
    setDrawer(false);
  };

  return (
    <>
      <div ref={sentinel} className="nav-sentinel" aria-hidden="true" />
      <header
        ref={header}
        className="nav"
        data-scrolled={scrolled || undefined}
        data-mega={mega || undefined}
        data-drawer={drawer || undefined}
      >
        <div className="page nav__row">
          <a href={href('#top')} className="nav__logo" aria-label="MAVRO home" onClick={closeAll}>
            <Logo height={26} />
          </a>

          <nav className="nav__links" aria-label="Primary">
            <ul>
              {links.map((item) =>
                item.menu === 'platform' ? (
                  <li key={item.label} onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
                    <button
                      ref={megaTrigger}
                      type="button"
                      className="nav__link nav__trigger"
                      aria-expanded={mega}
                      aria-controls="platform-menu"
                      onClick={() => setMega((value) => !value)}
                    >
                      {item.label}
                      <Icon name="chevron" size={16} className="nav__chev" />
                    </button>
                    <PlatformMenu id="platform-menu" open={mega} onNavigate={closeAll} />
                  </li>
                ) : (
                  <li key={item.label}>
                    <a className="nav__link" href={href(item.href)}>
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="nav__actions">
            <a className="nav__explore" href={href(cta.secondary.href)}>
              {cta.secondary.label}
            </a>
            <a className="btn btn--primary btn--sm" href={href(cta.primary.href)}>
              {cta.primary.label}
            </a>
          </div>

          <button
            ref={drawerToggle}
            type="button"
            className="nav__toggle"
            aria-expanded={drawer}
            aria-controls="nav-drawer"
            onClick={() => setDrawer((value) => !value)}
          >
            <span className="sr-only">{drawer ? 'Close menu' : 'Open menu'}</span>
            <span className="nav__bars" aria-hidden="true" />
          </button>
        </div>

        <div id="nav-drawer" className="drawer" hidden={!drawer}>
          <nav className="page drawer__inner" aria-label="Primary, mobile">
            <ul className="drawer__list">
              {links.map((item) =>
                item.menu === 'platform' ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="drawer__link"
                      aria-expanded={drawerPlatform}
                      aria-controls="drawer-platform"
                      onClick={() => setDrawerPlatform((value) => !value)}
                    >
                      {item.label}
                      <Icon name="chevron" size={18} className="nav__chev" />
                    </button>
                    <div id="drawer-platform" className="drawer__sub" hidden={!drawerPlatform}>
                      {areaOrder.map((area) => (
                        <div key={area}>
                          <p className="drawer__tier">{areas[area]}</p>
                          <ul>
                            {byArea(area).map((module) => (
                              <li key={module.id}>
                                <a href={href(packHref(module))} onClick={closeAll}>
                                  <Icon name={module.icon} size={18} />
                                  {module.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div>
                        <p className="drawer__tier">{packs.portal.name}</p>
                        <ul>
                          {[vendorPortal, ...channelPortals].map((portal) => (
                            <li key={portal.id}>
                              <a href={href(packs.portal.href)} onClick={closeAll}>
                                <Icon name="distribution" size={18} />
                                {portal.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a className="drawer__link" href={href(item.href)} onClick={closeAll}>
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
            <div className="drawer__actions">
              <a className="btn btn--primary" href={href(cta.primary.href)} onClick={closeAll}>
                {cta.primary.label}
              </a>
              <a className="btn btn--ghost" href={href(cta.secondary.href)} onClick={closeAll}>
                {cta.secondary.label}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
