import type { ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './integration-hub.css';

export interface HubItem {
  icon: IconName;
  title: string;
  body: string;
}

export interface IntegrationHubData {
  /** The two sides: the interfaces other systems call, and the connectors MAVRO ships. */
  sides: readonly [{ label: string; items: readonly HubItem[] }, { label: string; items: readonly HubItem[] }];
  /** The platform in the middle: name, one line, and the gateway facts every call passes through. */
  hub: { name: string; note: string; points: readonly string[] };
}

/**
 * How MAVRO connects (Platform overview): the interfaces on the left and the connectors on the right, each wired
 * into the platform in the middle, packets running along the wires while it is on screen. An optional callout below
 * (e.g. ERP Connect). Below 1024px the three columns stack and the wires turn vertical.
 */
export function IntegrationHub({ data, callout }: { data: IntegrationHubData; callout?: ReactNode }) {
  const column = (side: (typeof data.sides)[number], dir: 'in' | 'out', offset: number) => (
    <div className="ihub__side" data-side={dir}>
      <p className="ihub__label">{side.label}</p>
      <ul>
        {side.items.map((item, index) => (
          <li key={item.title} className="ihub__item" data-reveal style={vars({ '--i': index + offset })}>
            <span className="ihub__icon">
              <Icon name={item.icon} size={20} />
            </span>
            <span>
              <b>{item.title}</b>
              <span>{item.body}</span>
            </span>
            <span className="ihub__wire" aria-hidden="true">
              <span className="ihub__packet" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="ihub" data-live>
      <div className="ihub__map">
        {column(data.sides[0], 'in', 0)}
        <div className="ihub__hub" data-reveal>
          <span className="ihub__hub-icon">
            <Icon name="layers" size={24} />
          </span>
          <b className="ihub__hub-name">{data.hub.name}</b>
          <span className="ihub__hub-note">{data.hub.note}</span>
          <ul className="ihub__hub-points">
            {data.hub.points.map((point) => (
              <li key={point}>
                <Icon name="check" size={14} />
                {point}
              </li>
            ))}
          </ul>
        </div>
        {column(data.sides[1], 'out', 3)}
      </div>
      {callout && <div className="ihub__callout">{callout}</div>}
    </div>
  );
}
