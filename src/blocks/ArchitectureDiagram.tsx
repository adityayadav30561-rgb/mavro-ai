import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './architecture.css';

export interface ConnectBoardData {
  /** Column headings: external systems, the MAVRO platform, end users. */
  columns: readonly [string, string, string];
  systems: readonly { name: string; detail: string }[];
  external: { label: string; note: string };
  broker: { name: string; role: string; points: readonly string[] };
  internal: { label: string; note: string };
  app: { name: string; role: string; points: readonly string[] };
  users: { name: string; groups: readonly string[] };
  rule: string;
  ruleBody: string;
}

/** The parts of the board a step-through can light (ConnectBoard `focus`). */
export type BoardPart = 'systems' | 'external' | 'db' | 'internal' | 'app' | 'users';

function Link({ label, note, both, ...part }: { label: string; note: string; both?: boolean; 'data-part'?: BoardPart; 'data-on'?: true }) {
  return (
    <div className="cx__link" data-both={both || undefined} aria-hidden="true" {...part}>
      <span className="cx__link-label">{label}</span>
      <span className="cx__wire">
        <span className="cx__packet" />
        {both && <span className="cx__packet cx__packet--back" />}
      </span>
      <span className="cx__link-note">{note}</span>
    </div>
  );
}

/**
 * The ERP Connect architecture (connectivity deck, integration page): every ERP syncs two ways with the MAVRO
 * Database, the only integration broker; the MAVRO App reads and writes that database; users never touch the
 * ERP directly. Packets travel the wires while the board is on screen. Drawn for a dark band (section--night or a
 * .night-panel). Optional `focus`: the parts lit by a step-through (blocks/SyncSteps); the rest dims.
 */
export function ConnectBoard({ data, focus }: { data: ConnectBoardData; focus?: readonly BoardPart[] }) {
  const part = (name: BoardPart) =>
    focus ? { 'data-part': name, 'data-on': focus.includes(name) || undefined } : {};
  return (
    <figure className="cx__board" data-reveal data-live data-focus={focus ? '' : undefined}>
      <div className="cx__map">
        <div className="cx__col cx__col--systems" {...part('systems')}>
          <p className="cx__heading">{data.columns[0]}</p>
          <ul className="cx__systems">
            {data.systems.map((system) => (
              <li key={system.name}>
                <b>{system.name}</b>
                <span>{system.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link label={data.external.label} note={data.external.note} both {...part('external')} />

        <div className="cx__platform">
          <p className="cx__heading">{data.columns[1]}</p>
          <div className="cx__platform-row">
            <div className="cx__hub cx__hub--db" {...part('db')}>
              <span className="cx__hub-icon">
                <Icon name="database" />
              </span>
              <b>{data.broker.name}</b>
              <span className="cx__role">{data.broker.role}</span>
              <ul>
                {data.broker.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <Link label={data.internal.label} note={data.internal.note} both {...part('internal')} />

            <div className="cx__hub cx__hub--app" {...part('app')}>
              <span className="cx__hub-icon">
                <Icon name="phone" />
              </span>
              <b>{data.app.name}</b>
              <span className="cx__role">{data.app.role}</span>
              <ul>
                {data.app.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Link label="" note="" {...part('users')} />

        <div className="cx__col cx__col--users" {...part('users')}>
          <p className="cx__heading">{data.columns[2]}</p>
          <div className="cx__users">
            <span className="cx__hub-icon">
              <Icon name="people" />
            </span>
            <b>{data.users.name}</b>
            <ul>
              {data.users.groups.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <figcaption className="cx__rule">
        <span className="cx__rule-mark" aria-hidden="true">
          ✕
        </span>
        <p>
          <b>{data.rule}.</b> {data.ruleBody}
        </p>
      </figcaption>
    </figure>
  );
}

export interface ArchitectureData {
  layers: readonly { icon: IconName; name: string; note?: string; items: readonly string[]; packages?: boolean }[];
  security: { name: string; items: readonly string[] };
}

export interface ArchitecturePackage {
  label: string;
  count: string;
  tier: 'base' | 'portal' | 'premium';
  href: string | null;
}

/**
 * The platform's technical architecture (product deck slide 11): five layers from the interfaces people use down
 * to the data layer, numbered, with what each one holds. Security and compliance is drawn as the frame around all
 * five, its controls along the foot: it runs through every layer rather than beside them. Given `packages`, the
 * layer marked `packages` shows the three packages (with their counts and pages) instead of its item list.
 */
export function LayeredArchitecture({ data, packages }: { data: ArchitectureData; packages?: readonly ArchitecturePackage[] }) {
  return (
    <figure className="arch" data-reveal>
      <figcaption className="arch__tab">
        <Icon name="shield" size={16} />
        {data.security.name}
        <span>at every layer</span>
      </figcaption>
      <ol className="arch__layers">
        {data.layers.map((layer, index) => (
          <li key={layer.name} className="arch__layer" style={vars({ '--i': index })}>
            <span className="arch__step num">{String(index + 1).padStart(2, '0')}</span>
            <span className="arch__icon">
              <Icon name={layer.icon} size={20} />
            </span>
            <span className="arch__head">
              <b>{layer.name}</b>
              {layer.note && <span>{layer.note}</span>}
            </span>
            {layer.packages && packages ? (
              <ul className="arch__packs">
                {packages.map((pack) => (
                  <li key={pack.label} data-tier={pack.tier}>
                    {pack.href ? (
                      <a href={pack.href}>
                        {pack.label} <b className="num">{pack.count}</b>
                      </a>
                    ) : (
                      <span>
                        {pack.label} <b className="num">{pack.count}</b>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="arch__items">
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      <ul className="arch__controls">
        {data.security.items.map((item) => (
          <li key={item}>
            <Icon name="check" size={14} />
            {item}
          </li>
        ))}
      </ul>
    </figure>
  );
}
