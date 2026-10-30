import { useRef, type KeyboardEvent } from 'react';
import { connect, explore, proof } from '../data/home';
import { areaOrder, areas, byPack, modules, type Pack } from '../data/modules';
import { branches, connectLink, moduleLink, overviewLink, portalLinks, type Branch } from '../data/nav';
import { Icon } from './Icon';
import { NavLink } from './NavLink';

interface PlatformMenuProps {
  id: string;
  open: boolean;
  branch: Branch;
  onBranch: (branch: Branch) => void;
  onNavigate: () => void;
}

const counts: Record<Branch, number | null> = {
  base: byPack('base').length,
  portal: portalLinks.length,
  premium: byPack('premium').length,
  connect: null,
};

/** The TMS-alongside-SAP story: the one that shows MAVRO working next to an existing ERP. */
const sapStory = proof.stories.find((story) => 'stack' in story) ?? proof.stories[0];

/**
 * The Platform mega-menu (SITE-PLAN.md section 8). A rail of branches on the left (the three packages,
 * ERP Connect); hovering or focusing one shows its modules on the right, grouped by business area, each linking
 * to its page. A disclosure, not an ARIA menu: everything is an ordinary link, read and tabbed as such. Up and
 * Down arrows move along the rail.
 */
export function PlatformMenu({ id, open, branch, onBranch, onNavigate }: PlatformMenuProps) {
  const rail = useRef<HTMLUListElement>(null);
  const intent = useRef(0);
  const current = branches.find((b) => b.id === branch)!;

  // Hover intent: a branch takes over only when the pointer rests on it, so crossing the rail diagonally on the
  // way to a module does not switch the panel under it. It listens for movement, not entry, so a panel that opens
  // under a still cursor keeps the branch it opened on.
  const pending = useRef<Branch | null>(null);
  const move = (next: Branch) => () => {
    if (next === branch || next === pending.current) return;
    window.clearTimeout(intent.current);
    pending.current = next;
    intent.current = window.setTimeout(() => {
      pending.current = null;
      onBranch(next);
    }, 110);
  };
  const leave = () => {
    window.clearTimeout(intent.current);
    pending.current = null;
  };

  const onRailKey = (event: KeyboardEvent<HTMLUListElement>) => {
    const links = [...(rail.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])];
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index < 0) return;
    let next = index;
    if (event.key === 'ArrowDown') next = (index + 1) % links.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + links.length) % links.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = links.length - 1;
    else return;
    event.preventDefault();
    links[next].focus();
  };

  return (
    <div id={id} className="mega" data-open={open || undefined} hidden={!open}>
      <div className="mega__panel">
        <ul ref={rail} className="mega__rail" aria-label="Platform" onKeyDown={onRailKey}>
          {branches.map((item) => (
            <li key={item.id}>
              <NavLink
                link={item.link}
                className="mega__branch"
                data-tier={item.id}
                data-active={item.id === branch || undefined}
                onPointerMove={move(item.id)}
                onPointerLeave={leave}
                onFocus={() => onBranch(item.id)}
                onClick={onNavigate}
              >
                <span className="mega__branch-icon">
                  <Icon name={item.link.icon!} size={18} />
                </span>
                <span className="mega__branch-text">
                  <b>
                    {item.link.label}
                    {counts[item.id] !== null && <span className="mega__count num">{counts[item.id]}</span>}
                  </b>
                  <span>{item.link.note}</span>
                </span>
                <Icon name="chevron" size={16} className="mega__branch-chev" />
              </NavLink>
            </li>
          ))}
          <li className="mega__overview">
            <NavLink link={overviewLink} className="mega__overview-link" onClick={onNavigate}>
              <Icon name="layers" size={16} />
              <span>
                <b>{overviewLink.label}</b>
                <span>Architecture, mobile app, integrations</span>
              </span>
              <Icon name="arrow" size={16} />
            </NavLink>
          </li>
        </ul>

        <div className="mega__stage" data-branch={branch} key={branch}>
          <div className="mega__head">
            <div>
              <p className="mega__title">{current.title}</p>
              <p className="mega__lead">{current.lead}</p>
            </div>
          </div>

          {(branch === 'base' || branch === 'premium') && <Package pack={branch} onNavigate={onNavigate} />}
          {branch === 'portal' && <Portals onNavigate={onNavigate} />}
          {branch === 'connect' && <Connect />}

          <div className="mega__foot">
            <NavLink link={current.link} className="link" onClick={onNavigate}>
              {current.all}
              <Icon name="arrow" size={16} />
            </NavLink>
            {branch === 'connect' ? (
              <NavLink
                link={{ label: sapStory.project, page: '/customers', fallback: '#stories' }}
                className="mega__feature"
                onClick={onNavigate}
              >
                <span className="mega__feature-figure num grad-text">{sapStory.result.after}</span>
                <span className="mega__feature-text">
                  <b>{sapStory.result.label}</b>
                  <span>{sapStory.project}</span>
                </span>
              </NavLink>
            ) : (
              <NavLink link={connectLink} className="mega__feature" onClick={onNavigate}>
                <ConnectThumb />
                <span className="mega__feature-text">
                  <b>Already on SAP, Oracle or Tally?</b>
                  <span>MAVRO works alongside your ERP.</span>
                </span>
                <Icon name="arrow" size={16} className="mega__feature-arrow" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** One package: its modules by business area, each with its one-line summary. */
function Package({ pack, onNavigate }: { pack: Pack; onNavigate: () => void }) {
  const groups = areaOrder
    .map((area) => ({ area, items: modules.filter((m) => m.area === area && m.pack === pack) }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="mega__groups">
      {groups.map(({ area, items }) => (
        <div key={area} className="mega__group">
          <p className="mega__tier">{areas[area]}</p>
          <ul>
            {items.map((module) => (
              <li key={module.id}>
                <NavLink link={moduleLink(module, pack)} className="mega__item" data-tier={pack} onClick={onNavigate}>
                  <span className="mega__item-icon">
                    <Icon name={module.icon} size={16} />
                  </span>
                  <span className="mega__item-text">
                    <b>{module.name}</b>
                    <span>{module.summary}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The four portals in the order goods move: supply side, then the three layers of the channel. */
function Portals({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <ol className="mega__portals">
        {portalLinks.map(({ portal, link }) => (
          <li key={portal.id}>
            <NavLink link={link} className="mega__portal" onClick={onNavigate}>
              <span className="mega__portal-layer">{portal.layer}</span>
              <b>{portal.name}</b>
              <span className="mega__portal-who">{portal.who}</span>
              <span className="mega__portal-body">{portal.summary}</span>
              <ul className="mega__portal-points">
                {portal.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={14} />
                    {point}
                  </li>
                ))}
              </ul>
            </NavLink>
          </li>
        ))}
      </ol>
      <div className="mega__chain">
        <p className="mega__tier">{explore.chainTitle}</p>
        <ol>
          {explore.chain.map((node) => (
            <li key={node.id} data-self={node.id === 'company' || undefined}>
              <span className="mega__chain-node">
                <Icon name={node.icon} size={16} />
                {node.name}
              </span>
              {node.link && <span className="mega__chain-link">{node.link}</span>}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

/** ERP Connect: the systems it syncs with and the five benefits, from the connectivity deck. */
function Connect() {
  return (
    <div className="mega__connect">
      <ul className="mega__systems">
        {connect.systems.map((system) => (
          <li key={system.name}>
            <b>{system.name}</b>
            <span>{system.detail}</span>
          </li>
        ))}
      </ul>
      <ul className="mega__benefits">
        {connect.benefits.map((benefit) => (
          <li key={benefit.title}>
            <span className="mega__item-icon">
              <Icon name={benefit.icon} size={16} />
            </span>
            <span className="mega__item-text">
              <b>{benefit.title}</b>
              <span>{benefit.body}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mega__rule">
        <Icon name="lock" size={16} />
        <span>
          <b>{connect.rule}.</b> {connect.ruleBody}
        </span>
      </p>
    </div>
  );
}

/** A miniature of the ERP Connect board: ERPs on the left, the MAVRO Database in the middle, the app on the right. */
export function ConnectThumb() {
  return (
    <span className="cthumb" aria-hidden="true">
      <span className="cthumb__erps">
        <span>SAP</span>
        <span>Oracle</span>
        <span>Tally</span>
      </span>
      <span className="cthumb__wire" />
      <span className="cthumb__hub">
        <Icon name="database" size={14} />
      </span>
      <span className="cthumb__wire" />
      <span className="cthumb__app">
        <Icon name="phone" size={12} />
      </span>
    </span>
  );
}
