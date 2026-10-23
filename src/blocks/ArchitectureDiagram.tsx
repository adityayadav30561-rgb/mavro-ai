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

function Link({ label, note, both }: { label: string; note: string; both?: boolean }) {
  return (
    <div className="cx__link" data-both={both || undefined} aria-hidden="true">
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
 * ERP directly. Packets travel the wires while the board is on screen. Drawn for a dark (section--night) band.
 */
export function ConnectBoard({ data }: { data: ConnectBoardData }) {
  return (
    <figure className="cx__board" data-reveal data-live>
      <div className="cx__map">
        <div className="cx__col cx__col--systems">
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

        <Link label={data.external.label} note={data.external.note} both />

        <div className="cx__platform">
          <p className="cx__heading">{data.columns[1]}</p>
          <div className="cx__platform-row">
            <div className="cx__hub cx__hub--db">
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

            <Link label={data.internal.label} note={data.internal.note} both />

            <div className="cx__hub cx__hub--app">
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

        <Link label="" note="" />

        <div className="cx__col cx__col--users">
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
  layers: readonly { icon: IconName; name: string; items: readonly string[] }[];
  security: { name: string; items: readonly string[] };
}

/**
 * The platform's technical architecture (product deck slide 11) as stacked layers, from the interfaces people use
 * down to the data layer, with security and compliance running alongside all of them. Hovering a layer lifts it.
 */
export function LayeredArchitecture({ data }: { data: ArchitectureData }) {
  return (
    <figure className="arch" data-reveal>
      <ol className="arch__layers">
        {data.layers.map((layer, index) => (
          <li key={layer.name} className="arch__layer" style={vars({ '--i': index })}>
            <span className="arch__icon">
              <Icon name={layer.icon} size={20} />
            </span>
            <span className="arch__name">{layer.name}</span>
            <ul className="arch__items">
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <aside className="arch__security">
        <span className="arch__icon">
          <Icon name="shield" size={20} />
        </span>
        <b>{data.security.name}</b>
        <ul>
          {data.security.items.map((item) => (
            <li key={item}>
              <Icon name="check" size={14} />
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </figure>
  );
}
