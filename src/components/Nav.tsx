import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { Pack } from '../data/modules';
import { header as items, type Branch, type MenuId } from '../data/nav';
import { cta } from '../data/site';
import { useHref } from '../routing';
import { CATALOGUE_EVENT } from './catalogue';
import { Drawer } from './Drawer';
import { Icon } from './Icon';
import { Logo } from './Logo';
import { CompanyMenu, ResourcesMenu, SolutionsMenu } from './NavMenus';
import { NavLink } from './NavLink';
import { PlatformMenu } from './PlatformMenu';
import './nav.css';

const panels = { solutions: SolutionsMenu, resources: ResourcesMenu, company: CompanyMenu };

/**
 * The header (SITE-PLAN.md section 8): logo, Platform ▾, Solutions ▾, Customers, Resources ▾, Company ▾ and the
 * demo button; below 1024px a full-screen drawer instead. Links come from data/nav.ts and go to real pages as
 * they are added to the route table (src/links.ts). One menu is open at a time; hover intent for mice, the
 * button for touch and keyboard; Escape closes and returns focus to the trigger.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [branch, setBranch] = useState<Branch>('base');
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  const sentinel = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const drawerToggle = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef(0);
  // The open menu as of now, for timers and handlers that outlive the render they were created in.
  const current = useRef(menu);
  current.current = menu;
  const href = useHref();

  // Solid surface once the top of the page has scrolled away. An observer, not a scroll handler.
  useEffect(() => {
    if (!sentinel.current) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  // "See all modules" buttons elsewhere on the page open the catalogue: the mega-menu (on the package's branch)
  // where its trigger is shown, otherwise the drawer with Platform and that package expanded. Focus moves to the
  // first module link.
  useEffect(() => {
    const onOpen = (event: Event) => {
      const pack = (event as CustomEvent<Pack | undefined>).detail;
      const wide = triggers.current.platform?.offsetParent != null;
      if (wide) {
        setBranch(pack ?? 'base');
        setMenu('platform');
      } else {
        setDrawer(true);
        setExpanded(new Set(['platform', ...(pack ? [`pack:${pack}`] : [])]));
      }
      window.setTimeout(() => {
        const scope = wide
          ? header.current?.querySelector('.mega__stage')
          : header.current?.querySelector(
              pack ? '.fold[data-level="2"] .fold__region:not([hidden])' : '.drawer .fold__region',
            );
        scope?.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true });
      }, 60);
    };
    window.addEventListener(CATALOGUE_EVENT, onOpen);
    return () => window.removeEventListener(CATALOGUE_EVENT, onOpen);
  }, []);

  // An open menu: Escape returns focus to its trigger; a click or focus outside the header closes it.
  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      triggers.current[menu]?.focus();
      setMenu(null);
    };
    const onOutside = (event: Event) => {
      if (!header.current?.contains(event.target as Node)) setMenu(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [menu]);

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
        ...header.current.querySelectorAll<HTMLElement>(
          '.nav__row a, .nav__row button, .drawer a, .drawer button, .drawer input',
        ),
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

  // Close the drawer if the window grows past the mobile layout, and the menus if it shrinks below it.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = () => (query.matches ? setDrawer(false) : setMenu(null));
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Hover intent for fine pointers only; touch and keyboard use the button. Moving to another trigger switches
  // straight over once a menu is open.
  const hover = (id: MenuId | null) => (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(hoverTimer.current);
    const delay = id === null ? 220 : current.current ? 60 : 90;
    hoverTimer.current = window.setTimeout(() => show(id), delay);
  };

  // Opening the Platform menu fresh starts on Base modules; one that is already open keeps its branch.
  const show = (id: MenuId | null) => {
    if (id === current.current) return;
    if (id === 'platform') setBranch('base');
    setMenu(id);
  };

  const toggle = (id: MenuId) => {
    window.clearTimeout(hoverTimer.current);
    show(menu === id ? null : id);
  };

  const fold = (key: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const closeAll = () => {
    window.clearTimeout(hoverTimer.current);
    setMenu(null);
    setDrawer(false);
  };

  return (
    <>
      <div ref={sentinel} className="nav-sentinel" aria-hidden="true" />
      <header
        ref={header}
        className="nav"
        data-scrolled={scrolled || undefined}
        data-mega={menu || undefined}
        data-drawer={drawer || undefined}
      >
        <div className="page nav__row">
          <a href={href('#top')} className="nav__logo" aria-label="MAVRO home" onClick={closeAll}>
            <Logo height={26} />
          </a>

          <nav className="nav__links" aria-label="Primary">
            <ul>
              {items.map((item) => {
                if (item.link) {
                  return (
                    <li key={item.label} onPointerEnter={hover(null)}>
                      <NavLink link={item.link} className="nav__link" onClick={closeAll} />
                    </li>
                  );
                }
                const id = item.menu!;
                const Panel = id === 'platform' ? null : panels[id];
                return (
                  <li
                    key={item.label}
                    className={Panel ? 'nav__item' : undefined}
                    onPointerEnter={hover(id)}
                    onPointerLeave={hover(null)}
                  >
                    <button
                      ref={(el) => {
                        triggers.current[id] = el;
                      }}
                      type="button"
                      className="nav__link nav__trigger"
                      aria-expanded={menu === id}
                      aria-controls={`menu-${id}`}
                      onClick={() => toggle(id)}
                    >
                      {item.label}
                      <Icon name="chevron" size={16} className="nav__chev" />
                    </button>
                    {Panel ? (
                      <Panel id={`menu-${id}`} open={menu === id} onNavigate={closeAll} />
                    ) : (
                      <PlatformMenu
                        id="menu-platform"
                        open={menu === id}
                        branch={branch}
                        onBranch={setBranch}
                        onNavigate={closeAll}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="nav__actions">
            <a className="btn btn--primary btn--sm" href={href(cta.primary.href)} onClick={closeAll}>
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

        <Drawer id="nav-drawer" open={drawer} expanded={expanded} onToggle={fold} onNavigate={closeAll} />
      </header>
    </>
  );
}
