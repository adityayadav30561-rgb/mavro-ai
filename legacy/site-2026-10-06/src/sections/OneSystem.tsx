import { Screen } from '../components/Screen';
import { fragments } from '../data/story';
import { useScrollProgress } from '../motion/hooks';
import './one-system.css';

/**
 * The problem and the answer in one pinned scene. Seven tools each hold a different version of the same
 * order; as the visitor scrolls they draw together and resolve into the one real record in MAVRO.
 *
 * All motion is CSS driven by --p. On small screens and with reduced motion the scene unpins and the same
 * markup reads as a plain before / after.
 */
export function OneSystem() {
  const ref = useScrollProgress<HTMLDivElement>('pin');

  return (
    <section id="platform" className="one" aria-labelledby="one-title">
      <div ref={ref} className="one__track">
        <div className="one__pin">
          <div className="page one__inner">
            <header className="one__head">
              <h2 id="one-title" className="h2">
                Your business is one flow. <span className="soft">Your software is seven.</span>
              </h2>
              <p className="lead one__lead-before">
                The same order lives in seven places, and no two of them agree on the quantity or the date.
              </p>
              <p className="lead one__lead-after">
                In MAVRO it is one record. Every team reads it, every team writes to it, and nobody reconciles
                anything.
              </p>
            </header>

            <div className="one__stage">
              <ul className="one__fragments" aria-label="The same order in seven disconnected tools">
                {fragments.map((fragment) => (
                  <li key={fragment.tool} className="one__fragment">
                    <span className="one__tool">{fragment.tool}</span>
                    <span className="one__line">{fragment.line}</span>
                    <span className="one__note">{fragment.note}</span>
                  </li>
                ))}
              </ul>

              <div className="one__record">
                <p className="one__answer">
                  In MAVRO it is one record. Every team reads it, every team writes to it, and nobody reconciles
                  anything.
                </p>
                <Screen
                  name="sales-order"
                  sizes="(max-width: 960px) 94vw, 880px"
                  alt="Sales order SO-24817 in MAVRO: one record showing its document flow, fulfilment, order lines, commercials and every linked document."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
