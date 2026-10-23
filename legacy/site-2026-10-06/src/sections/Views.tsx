import { Screen } from '../components/Screen';
import { views } from '../data/platform';
import { useTabs, vars } from '../motion/hooks';
import './views.css';

/** One system, seen by five teams. The tabs swap the real screen each team works in. */
export function Views() {
  const { active, tabProps, panelProps } = useTabs(views.length, 'view');
  const view = views[active];

  return (
    <section id="visibility" className="section section--mist views" aria-labelledby="views-title">
      <div className="page">
        <header className="section__head section__head--center" data-reveal>
          <h2 id="views-title" className="h2">
            Every team sees its own work. <span className="soft">All of them see the same truth.</span>
          </h2>
          <p className="lead">
            Reports are not exported, merged and emailed. Each screen reads straight from the transactions, so the
            figure in front of you is the business as it stands right now.
          </p>
        </header>

        <div data-reveal>
          <div className="views__tabs" role="tablist" aria-label="Team">
            {views.map((item, index) => (
              <button key={item.name} type="button" className="views__tab" {...tabProps(index)}>
                {item.name}
              </button>
            ))}
            <span className="views__marker" aria-hidden="true" style={vars({ '--at': active, '--n': views.length })} />
          </div>

          <div className="views__panel" {...panelProps}>
            <p className="views__text" key={`${view.name}-text`}>
              <b>{view.title}</b> {view.body}
            </p>
            <Screen key={view.screen} name={view.screen} alt={view.alt} className="views__screen" />
          </div>
        </div>
      </div>
    </section>
  );
}
