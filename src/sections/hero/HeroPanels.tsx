import { Icon } from '../../components/Icon';
import { vars } from '../../motion/hooks';

/*
 * Two floating interface panels around the hero scene, on a diagonal: the order top left, the work order
 * making it bottom right. Their figures are illustrative sample data, consistent with
 * the sample order used across the page (SO-24817 for Kestrel Pumps), not real customer operations.
 */
const orderSteps = [
  { label: 'Order', state: 'done' },
  { label: 'Stock', state: 'done' },
  { label: 'Make', state: 'live' },
  { label: 'Ship', state: 'next' },
] as const;

export function HeroPanels() {
  return (
    <div className="panels" aria-hidden="true">
      <div className="panel panel--order" style={vars({ '--i': 0 })}>
        <div className="panel__head">
          <span className="panel__kicker">Sales order</span>
          <span className="chip chip--live num">SO-24817</span>
        </div>
        <p className="panel__title">Kestrel Pumps · 1,200 pcs</p>
        <ol className="panel__steps">
          {orderSteps.map((step) => (
            <li key={step.label} data-state={step.state}>
              <span className="panel__node">{step.state === 'done' && <Icon name="check" size={10} />}</span>
              {step.label}
            </li>
          ))}
        </ol>
      </div>

      <div className="panel panel--production" style={vars({ '--i': 1 })}>
        <div className="panel__head">
          <span className="panel__kicker">WO-5521 · machining</span>
          <span className="chip chip--ok">
            <span className="chip__dot" />
            Running
          </span>
        </div>
        <div className="panel__figure">
          <b className="num">64%</b>
          <span className="num">570 of 890 pcs</span>
        </div>
        <span className="panel__bar">
          <span style={vars({ '--v': 0.64 })} />
        </span>
      </div>
    </div>
  );
}
