import { useRef, useState, type KeyboardEvent } from 'react';
import { Icon } from '../components/Icon';
import { vars } from '../motion/hooks';
import './swimlane-flow.css';

export interface SwimLane {
  id: string;
  name: string;
  note: string;
}

export interface SwimStep {
  name: string;
  /** A lane id, or 'both' for a step shared by the two systems (drawn across both lanes). */
  lane: string;
  note?: string;
  /** A control point (e.g. a mandatory scan), marked. */
  scan?: boolean;
}

export interface SwimZone {
  name: string;
  summary: string;
  steps: readonly SwimStep[];
}

interface SwimlaneFlowProps {
  lanes: readonly [SwimLane, SwimLane];
  zones: readonly SwimZone[];
  legend: { scan: string; both: string };
  /** The closing line under the board. */
  close?: string;
  link?: { label: string; href: string } | null;
}

/**
 * Who does what across two systems, zone by zone (ERP Connect: SAP Business One and MAVRO, from the B1 flow deck).
 * Tabs pick a zone; its steps run left to right, each in its system's lane, joined by one line that steps between
 * the lanes where the work changes hands. Below 768px the steps stack, each tagged with its system.
 */
export function SwimlaneFlow({ lanes, zones, legend, close, link }: SwimlaneFlowProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const zone = zones[active];
  const n = zone.steps.length;

  const go = (index: number) => {
    const target = (index + zones.length) % zones.length;
    setActive(target);
    tabs.current[target]?.focus();
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') go(active + 1);
    else if (event.key === 'ArrowLeft') go(active - 1);
    else return;
    event.preventDefault();
  };

  // The line through the steps: lane A sits at y 50, lane B at 150, a shared step at 100 (viewBox n*100 × 200).
  const y = (lane: string) => (lane === lanes[0].id ? 50 : lane === lanes[1].id ? 150 : 100);
  const points = zone.steps.flatMap((step, i) => {
    const x = i * 100 + 50;
    if (i === 0) return [`M ${x} ${y(step.lane)}`];
    const prev = y(zone.steps[i - 1].lane);
    const cur = y(step.lane);
    return prev === cur ? [`H ${x}`] : [`H ${x - 50}`, `V ${cur}`, `H ${x}`];
  });

  const laneName = (id: string) => (id === 'both' ? legend.both : lanes.find((lane) => lane.id === id)?.name ?? id);

  return (
    <div className="swim" data-reveal>
      <div className="swim__tabs" role="tablist" aria-label="Flow zones" onKeyDown={onKey}>
        {zones.map((z, index) => (
          <button
            key={z.name}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`swim-tab-${index}`}
            aria-selected={index === active}
            aria-controls="swim-panel"
            tabIndex={index === active ? 0 : -1}
            className="swim__tab"
            onClick={() => setActive(index)}
          >
            <span className="swim__tab-num num">{String(index + 1).padStart(2, '0')}</span>
            <b>{z.name}</b>
            <span className="swim__tab-sum">{z.summary}</span>
          </button>
        ))}
      </div>

      <div className="swim__board" id="swim-panel" role="tabpanel" aria-labelledby={`swim-tab-${active}`}>
        <div className="swim__lanes" aria-hidden="true">
          {lanes.map((lane, index) => (
            <div key={lane.id} className="swim__lane" data-lane={index === 0 ? 'a' : 'b'}>
              <b>{lane.name}</b>
              <span>{lane.note}</span>
            </div>
          ))}
        </div>

        <div className="swim__track" style={vars({ '--n': n })}>
          <svg className="swim__line" viewBox={`0 0 ${n * 100} 200`} preserveAspectRatio="none" aria-hidden="true">
            <path key={active} d={points.join(' ')} />
          </svg>
          <ol className="swim__steps" key={active}>
            {zone.steps.map((step, index) => (
              <li
                key={step.name}
                className="swim__step"
                data-lane={step.lane === lanes[0].id ? 'a' : step.lane === lanes[1].id ? 'b' : 'both'}
                data-scan={step.scan || undefined}
                style={vars({ '--col': index + 1, '--i': index })}
              >
                <span className="swim__sys">{laneName(step.lane)}</span>
                {step.scan && (
                  <span className="swim__scan">
                    <Icon name="check" size={12} />
                    {legend.scan}
                  </span>
                )}
                <b>{step.name}</b>
                {step.note && <span className="swim__note">{step.note}</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {(close || link) && (
        <div className="swim__close">
          {close && <p>{close}</p>}
          {link && (
            <a href={link.href}>
              {link.label}
              <Icon name="arrow" size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
