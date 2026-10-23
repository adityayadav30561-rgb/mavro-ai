import { Screen } from '../components/Screen';
import { graph } from '../data/platform';
import { vars } from '../motion/hooks';
import './production.css';

/*
 * Wires for the production graph, drawn on a 900 × 300 box that is stretched over the 9 × 3 node grid, so a
 * node in column c, row r is centred at ((c - 0.5) * 100, (r - 0.5) * 100).
 */
const wires = [
  { d: 'M50 150H350', flowing: true },
  { d: 'M350 150C400 150 400 50 450 50', flowing: true },
  { d: 'M350 150C400 150 400 250 450 250', flowing: true },
  { d: 'M450 50C500 50 500 150 550 150', flowing: true },
  { d: 'M450 250C500 250 500 150 550 150', flowing: true },
  { d: 'M550 150H850', flowing: false },
];

export function Production() {
  return (
    <section id="production" className="section prod" aria-labelledby="prod-title">
      <div className="page">
        <header className="section__head" data-reveal>
          <h2 id="prod-title" className="h2">
            Production that knows what was sold, <span className="soft">what is in stock and what is on its way.</span>
          </h2>
          <p className="lead">
            A work order is not a separate plan. It is the sales order, broken into materials and operations, and
            it stays tied to both.
          </p>
        </header>

        <div className="graph" data-reveal data-live>
          <svg className="graph__wires" viewBox="0 0 900 300" preserveAspectRatio="none" aria-hidden="true">
            {wires.map((wire) => (
              <g key={wire.d}>
                <path className="graph__wire" d={wire.d} />
                {wire.flowing && <path className="graph__flow" d={wire.d} />}
              </g>
            ))}
          </svg>
          <ol className="graph__nodes" aria-label="How a sales order becomes a dispatched product">
            {graph.map((node) => (
              <li
                key={node.id}
                className="graph__node"
                data-state={node.state}
                data-branch={node.row !== 2 || undefined}
                style={vars({ '--col': node.col, '--row': node.row })}
              >
                <span className="graph__label">{node.label}</span>
                <span className="graph__meta">{node.meta}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="prod__panels">
          <figure data-reveal>
            <Screen
              name="production"
              sizes="(max-width: 1000px) 94vw, 600px"
              alt="The MAVRO shop floor screen: output, equipment effectiveness and yield for the shift, the machine schedule, and the routing and materials of the work order for sales order SO-24817."
            />
            <figcaption className="caption">
              <b>Every operation is booked against the order.</b> Sales sees progress, finance sees cost, and
              neither has to ask the shop floor.
            </figcaption>
          </figure>

          <figure data-reveal style={vars({ '--i': 1 })}>
            <Screen
              name="quality"
              sizes="(max-width: 1000px) 94vw, 600px"
              alt="A MAVRO inspection lot: four checks against the specification, a piece-by-piece chart of bore diameter, the disposition of accepted and held pieces, and traceability from metal to customer."
            />
            <figcaption className="caption">
              <b>Quality is a gate, not a report.</b> Stock that has not passed inspection cannot be shipped, issued
              or invoiced.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
