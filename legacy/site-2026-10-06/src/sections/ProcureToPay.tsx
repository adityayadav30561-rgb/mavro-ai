import { Screen } from '../components/Screen';
import { p2p, p2pLedger } from '../data/story';
import { useTabs, vars } from '../motion/hooks';
import './procure-to-pay.css';

/**
 * Procure to pay is explored by hand rather than by scroll: ten stages as a tablist, one document at a time,
 * and a ledger underneath that fills in as the purchase progresses. It picks up the shortage that the
 * order-to-cash story left open, and ends on the real sourcing screen.
 */
export function ProcureToPay() {
  const { active, tabProps, panelProps } = useTabs(p2p.length, 'p2p');
  const stage = p2p[active];

  return (
    <section id="procure-to-pay" className="section section--mist p2p" aria-labelledby="p2p-title">
      <div className="page">
        <header className="section__head" data-reveal>
          <h2 id="p2p-title" className="h2">
            A shortage on the shop floor <span className="soft">becomes a purchase on its own.</span>
          </h2>
          <p className="lead">
            The work order for that sales order was 400 kg short of castings. Follow that one line from the
            requisition to the vendor payment.
          </p>
        </header>

        <div className="p2p__grid" data-reveal>
          <div
            className="p2p__tabs"
            role="tablist"
            aria-label="Procure to pay stages"
            style={vars({ '--at': active, '--n': p2p.length })}
          >
            {p2p.map((item, index) => (
              <button
                key={item.doc}
                type="button"
                className="p2p__tab"
                data-state={index < active ? 'done' : index === active ? 'live' : 'next'}
                {...tabProps(index)}
              >
                <span className="p2p__dot" aria-hidden="true" />
                <span className="p2p__name">{item.label}</span>
                <span className="p2p__docno">{item.doc}</span>
              </button>
            ))}
          </div>

          <div className="p2p__panel" {...panelProps}>
            <div className="p2p__doc" key={stage.doc}>
              <p className="p2p__step">
                <span className="code">{stage.doc}</span>
                Step {active + 1} of {p2p.length}
              </p>
              <h3 className="p2p__summary">{stage.summary}</h3>
              <dl className="p2p__facts">
                {stage.facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <dl className="p2p__ledger" aria-label="Quantities carried through the purchase">
              {p2pLedger.map((cell) => (
                <div key={cell.label} data-known={active >= cell.at || undefined}>
                  <dt>{cell.label}</dt>
                  <dd>{active >= cell.at ? cell.value : 'Pending'}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <figure className="p2p__figure" data-reveal>
          <Screen
            name="procurement"
            alt="The MAVRO sourcing screen for RFQ-0311: three vendor quotes compared on rate, landed cost, delivery date and quality history, with the customer order and work order the purchase traces back to."
          />
          <figcaption className="caption">
            <b>The buyer sees why, not just what.</b> Three quotes compared on landed cost and on meeting the date,
            with the customer order that depends on them at the top of the screen.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
