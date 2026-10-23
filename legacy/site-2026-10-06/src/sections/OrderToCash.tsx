import { FlowRail } from '../components/FlowRail';
import { Screen, type ScreenName } from '../components/Screen';
import { o2c } from '../data/story';
import { useScrollSteps, vars } from '../motion/hooks';
import './order-to-cash.css';

const railItems = o2c.map((stage) => ({ label: stage.label }));

/* Which product screen is on show at each of the nine stages. */
const shots: { name: ScreenName; alt: string; stages: number[] }[] = [
  { name: 'sales-order', stages: [0, 1, 2, 6], alt: 'The sales order, with its document flow from enquiry to payment.' },
  { name: 'production', stages: [3], alt: 'The shop floor schedule, with the work order for this sales order running.' },
  { name: 'quality', stages: [4], alt: 'The inspection lot for this work order: checks, results and held pieces.' },
  { name: 'inventory', stages: [5], alt: 'Inventory, showing finished stock held for this sales order.' },
  { name: 'finance', stages: [7, 8], alt: 'Receivables, with the invoice raised from this dispatch.' },
];

/**
 * One order followed through nine documents. The scene pins; scroll position selects the stage, fills the
 * rail, swaps the text and brings up the screen where that stage happens. Every stage is always in the DOM, so
 * the static presentation (small screens, reduced motion) is the same list read top to bottom.
 */
export function OrderToCash() {
  const [ref, step] = useScrollSteps<HTMLDivElement>(o2c.length);

  return (
    <section id="order-to-cash" className="o2c" aria-labelledby="o2c-title">
      <div ref={ref} className="o2c__track" style={vars({ '--steps': o2c.length })}>
        <div className="o2c__pin">
          <div className="page o2c__inner">
            <header className="o2c__head">
              <h2 id="o2c-title" className="h2">
                One order. <span className="soft">Nine connected events.</span>
              </h2>
              <p className="lead">
                Nothing is entered twice. Each document is created from the one before it, and updates every part
                of the business it touches.
              </p>
            </header>

            <div className="o2c__rail" aria-hidden="true">
              <FlowRail items={railItems} active={step} fill="var(--rail-fill)" />
            </div>

            <div className="o2c__body">
              <ol className="o2c__stages">
                {o2c.map((stage, index) => (
                  <li
                    key={stage.doc}
                    className="o2c__stage"
                    data-state={index < step ? 'past' : index === step ? 'active' : 'next'}
                  >
                    <p className="o2c__doc">
                      <span className="code">{stage.doc}</span>
                      {stage.from ? (
                        <>
                          created from <span className="code">{stage.from}</span>
                        </>
                      ) : (
                        'where it starts'
                      )}
                    </p>
                    <h3 className="o2c__title">{stage.title}</h3>
                    <ul className="o2c__effects">
                      {stage.effects.map((effect, i) => (
                        <li key={effect.module} style={vars({ '--i': i })}>
                          <b>{effect.module}</b>
                          {effect.text}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              <div className="o2c__shots">
                {shots.map((shot) => (
                  <Screen
                    key={shot.name}
                    name={shot.name}
                    alt={shot.alt}
                    sizes="(max-width: 960px) 94vw, 720px"
                    className={shot.stages.includes(step) ? 'o2c__shot is-on' : 'o2c__shot'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
