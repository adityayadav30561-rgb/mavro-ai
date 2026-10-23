import { useId, useState, type ReactNode } from 'react';
import { areaOrder, areas, modules, packs, type Pack } from '../data/modules';
import {
  branches,
  companyLinks,
  connectLink,
  header,
  industryLinks,
  moduleLink,
  needLinks,
  portalLinks,
  resourceLinks,
} from '../data/nav';
import type { NavLink as Item } from '../data/nav';
import { cta } from '../data/site';
import { shown } from '../links';
import { useHref } from '../routing';
import { Icon } from './Icon';
import { NavLink } from './NavLink';

interface DrawerProps {
  id: string;
  open: boolean;
  /** Keys of the expanded accordions ('platform', 'pack:base', 'area:base:finance', ...). */
  expanded: ReadonlySet<string>;
  onToggle: (key: string) => void;
  onNavigate: () => void;
}

/** One accordion: a full-width button that shows or hides the region under it. */
function Fold({
  label,
  level,
  open,
  onToggle,
  children,
}: {
  label: ReactNode;
  level: 1 | 2 | 3;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const region = useId();
  return (
    <div className="fold" data-level={level}>
      <button type="button" className="fold__button" aria-expanded={open} aria-controls={region} onClick={onToggle}>
        {label}
        <Icon name="chevron" size={level === 1 ? 18 : 16} className="nav__chev" />
      </button>
      <div id={region} className="fold__region" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

const packOrder: Pack[] = ['base', 'portal', 'premium'];
const searchable = [
  ...modules.map((module) => ({
    id: module.id,
    name: module.name,
    summary: module.summary,
    icon: module.icon,
    link: moduleLink(module, module.pack),
  })),
  ...portalLinks.map(({ portal, link }) => ({
    id: portal.id,
    name: portal.name,
    summary: portal.summary,
    icon: 'distribution' as const,
    link,
  })),
];

/**
 * The mobile menu: a full-screen drawer with the header's branches as accordions. Platform opens to the three
 * packages, each package to its business areas, each area to its modules (three levels); a search field above
 * finds any module by name or summary. The demo button stays pinned at the bottom.
 */
export function Drawer({ id, open, expanded, onToggle, onNavigate }: DrawerProps) {
  const [query, setQuery] = useState('');
  const href = useHref();
  const q = query.trim().toLowerCase();
  const results = q ? searchable.filter((item) => `${item.name} ${item.summary}`.toLowerCase().includes(q)) : [];
  const is = (key: string) => expanded.has(key);
  const list = (links: Item[]) => (
    <ul className="drawer__links">
      {shown(links).map((link) => (
        <li key={link.label}>
          <NavLink link={link} onClick={onNavigate}>
            {link.icon && <Icon name={link.icon} size={18} />}
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <div id={id} className="drawer" hidden={!open}>
      <nav className="page drawer__inner" aria-label="Primary, mobile">
        <div className="drawer__search">
          <label htmlFor={`${id}-search`} className="sr-only">
            Find a module
          </label>
          <Icon name="search" size={18} />
          <input
            id={`${id}-search`}
            type="search"
            placeholder="Find a module"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {q ? (
          <div className="drawer__results" aria-live="polite">
            <p className="drawer__tier">
              {results.length === 0
                ? `No module matches “${query.trim()}”`
                : `${results.length} ${results.length === 1 ? 'module' : 'modules'}`}
            </p>
            <ul className="drawer__links drawer__links--rich">
              {results.map((item) => (
                <li key={item.id}>
                  <NavLink link={item.link} onClick={onNavigate}>
                    <Icon name={item.icon} size={18} />
                    <span>
                      <b>{item.name}</b>
                      <span>{item.summary}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="drawer__list">
            {header.map((item) => {
              if (item.link) {
                return (
                  <NavLink key={item.label} link={item.link} className="drawer__link" onClick={onNavigate}>
                    {item.label}
                  </NavLink>
                );
              }
              if (item.menu === 'platform') {
                return (
                  <Fold
                    key={item.label}
                    label={item.label}
                    level={1}
                    open={is('platform')}
                    onToggle={() => onToggle('platform')}
                  >
                    {packOrder.map((pack) => (
                      <Fold
                        key={pack}
                        label={
                          <span className="fold__label" data-tier={pack}>
                            {packs[pack].name}
                          </span>
                        }
                        level={2}
                        open={is(`pack:${pack}`)}
                        onToggle={() => onToggle(`pack:${pack}`)}
                      >
                        {pack === 'portal'
                          ? list(portalLinks.map(({ link }) => ({ ...link, icon: 'distribution' })))
                          : areaOrder
                              .filter((area) => modules.some((m) => m.area === area && m.pack === pack))
                              .map((area) => (
                                <Fold
                                  key={area}
                                  label={areas[area]}
                                  level={3}
                                  open={is(`area:${pack}:${area}`)}
                                  onToggle={() => onToggle(`area:${pack}:${area}`)}
                                >
                                  {list(
                                    modules
                                      .filter((m) => m.area === area && m.pack === pack)
                                      .map((m) => ({ ...moduleLink(m, pack), icon: m.icon })),
                                  )}
                                </Fold>
                              ))}
                        <NavLink
                          link={branches.find((b) => b.id === pack)!.link}
                          className="drawer__all"
                          onClick={onNavigate}
                        >
                          {branches.find((b) => b.id === pack)!.all}
                          <Icon name="arrow" size={16} />
                        </NavLink>
                      </Fold>
                    ))}
                    {list([connectLink])}
                  </Fold>
                );
              }
              const groups =
                item.menu === 'solutions'
                  ? [
                      { title: 'By industry', links: industryLinks },
                      { title: 'By need', links: needLinks },
                    ]
                  : [{ title: '', links: item.menu === 'resources' ? resourceLinks : companyLinks }];
              return (
                <Fold
                  key={item.label}
                  label={item.label}
                  level={1}
                  open={is(item.menu!)}
                  onToggle={() => onToggle(item.menu!)}
                >
                  {groups.map((group) => (
                    <div key={group.title} className="drawer__group">
                      {group.title && <p className="drawer__tier">{group.title}</p>}
                      {list(group.links)}
                    </div>
                  ))}
                </Fold>
              );
            })}
          </div>
        )}

        <div className="drawer__actions">
          <a className="btn btn--primary" href={href(cta.primary.href)} onClick={onNavigate}>
            {cta.primary.label}
          </a>
        </div>
      </nav>
    </div>
  );
}
