import { useRef, useState, type KeyboardEvent } from 'react';
import { Icon } from '../components/Icon';
import { ConnectBoard, type BoardPart, type ConnectBoardData } from './ArchitectureDiagram';
import './sync-steps.css';

export interface SyncStep {
  /** 'out': from a user to the ERP; 'back': from the ERP to the users. */
  dir: 'out' | 'back';
  title: string;
  body: string;
  /** The board parts this step lights. */
  parts: readonly BoardPart[];
}

interface SyncStepsProps {
  board: ConnectBoardData;
  steps: readonly SyncStep[];
  label: string;
  directions: { out: string; back: string };
  prev: string;
  next: string;
}

/**
 * The ERP Connect board with a step-through of one record each way (ERP Connect page): pick a step, or move with
 * the arrows or the arrow keys, and the board lights the parts it passes through while the rest dims. In a dark
 * panel (.night-panel), so it can sit in a light section.
 */
export function SyncSteps({ board, steps, label, directions, prev, next }: SyncStepsProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active];

  const go = (index: number, focus = false) => {
    const target = (index + steps.length) % steps.length;
    setActive(target);
    if (focus) tabs.current[target]?.focus();
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') go(active + 1, true);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') go(active - 1, true);
    else if (event.key === 'Home') go(0, true);
    else if (event.key === 'End') go(steps.length - 1, true);
    else return;
    event.preventDefault();
  };

  const groups = (['out', 'back'] as const).map((dir) => ({
    dir,
    items: steps.map((s, index) => ({ ...s, index })).filter((s) => s.dir === dir),
  }));

  return (
    <div className="night-panel sync" data-dir={step.dir}>
      <ConnectBoard data={board} focus={step.parts} />

      <div className="sync__steps">
        <p className="sync__label">
          <Icon name="route" size={16} />
          {label}
        </p>
        <div className="sync__tabs" role="tablist" aria-label={label} onKeyDown={onKey}>
          {groups.map((group) => (
            <div key={group.dir} className="sync__group" data-dir={group.dir}>
              <span className="sync__dir">
                <Icon name="arrow" size={14} />
                {directions[group.dir]}
              </span>
              <div className="sync__row">
                {group.items.map((item) => (
                  <button
                    key={item.index}
                    ref={(el) => {
                      tabs.current[item.index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`sync-tab-${item.index}`}
                    aria-selected={item.index === active}
                    aria-controls="sync-panel"
                    tabIndex={item.index === active ? 0 : -1}
                    className="sync__tab"
                    onClick={() => go(item.index)}
                  >
                    <span className="sync__num num">{String(item.index + 1).padStart(2, '0')}</span>
                    <span className="sync__title">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sync__panel" id="sync-panel" role="tabpanel" aria-labelledby={`sync-tab-${active}`} aria-live="polite">
          <p>
            <b>{step.title}.</b> {step.body}
          </p>
          <div className="sync__nav">
            <button type="button" className="sync__arrow" aria-label={prev} onClick={() => go(active - 1)}>
              <Icon name="arrow" size={16} />
            </button>
            <span className="num">
              {active + 1} / {steps.length}
            </span>
            <button type="button" className="sync__arrow" aria-label={next} onClick={() => go(active + 1)}>
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
