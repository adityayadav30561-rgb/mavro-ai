import { industries, industryCore } from '../data/platform';
import { useTabs, vars } from '../motion/hooks';
import './industries.css';

/**
 * The commercial ends of the flow never change; the middle is replaced per industry. Switching industry swaps
 * only the configurable stages, which is the whole argument.
 */
export function Industries() {
  const { active, tabProps, panelProps } = useTabs(industries.length, 'industry');
  const industry = industries[active];

  const stages = [
    ...industryCore.start.map((label) => ({ label, core: true })),
    ...industry.middle.map((label) => ({ label, core: false })),
    { label: industry.fulfil, core: false },
    ...industryCore.end.map((label) => ({ label, core: true })),
  ];

  return (
    <section id="industries" className="section ind" aria-labelledby="ind-title">
      <div className="page">
        <header className="section__head" data-reveal>
          <h2 id="ind-title" className="h2">
            One platform. <span className="soft">Your workflow.</span>
          </h2>
          <p className="lead">
            Every business takes an order and gets paid. What happens in between is where industries differ, and
            MAVRO is built so that part is configured rather than rewritten.
          </p>
        </header>

        <div data-reveal>
          <div className="ind__tabs" role="tablist" aria-label="Industry">
            {industries.map((item, index) => (
              <button key={item.name} type="button" className="ind__tab" {...tabProps(index)}>
                {item.name}
              </button>
            ))}
          </div>

          <div className="ind__panel" {...panelProps}>
            <ol className="ind__flow" style={vars({ '--n': stages.length })}>
              {stages.map((stage, index) => (
                <li
                  key={stage.core ? stage.label : `${industry.name}-${index}`}
                  data-core={stage.core || undefined}
                  style={vars({ '--i': index })}
                >
                  <span className="ind__dot" aria-hidden="true" />
                  <span className="ind__label">{stage.label}</span>
                </li>
              ))}
            </ol>

            <dl className="ind__facts">
              <div>
                <dt>Shared by every industry</dt>
                <dd>Customers, items, pricing, tax, inventory, ledgers, roles and audit</dd>
              </div>
              <div key={`${industry.name}-record`} className="ind__swap">
                <dt>The working record</dt>
                <dd>{industry.record}</dd>
              </div>
              <div key={`${industry.name}-trace`} className="ind__swap">
                <dt>Traced by</dt>
                <dd>{industry.trace}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
