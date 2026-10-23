import { Icon, type IconName } from '../components/Icon';
import { Screen } from '../components/Screen';
import { showcase } from '../data/home';
import { useTabs } from '../motion/hooks';
import './showcase.css';

/* The module rail beside the screen: the product's own navigation, abstracted. */
const rail: IconName[] = ['orders', 'production', 'quality', 'inventory', 'procurement', 'finance', 'transport'];
const railFor: Record<string, IconName> = {
  Leadership: 'eye',
  Sales: 'orders',
  Production: 'production',
  Stores: 'inventory',
  Finance: 'finance',
};

/**
 * A closer look at the product: the real interface (captured from the prototype in /prototype), as five teams
 * see it: the heading and team tabs on the left, the screen on the right, so the whole tour fits one screen.
 * The screen sits in a tilted stage that settles flat as it comes into view.
 */
export function Showcase() {
  const { active, tabProps, panelProps } = useTabs(showcase.views.length, 'view');
  const view = showcase.views[active];

  return (
    <section id="product" className="section section--paper show" aria-labelledby="show-title">
      <div className="page show__grid">
        <div className="show__side">
          <header className="head" data-reveal>
            <h2 id="show-title" className="h2">
              {showcase.title} <span className="mark">{showcase.titleSoft}</span>
            </h2>
            <p className="lead">{showcase.lead}</p>
          </header>

          <div className="show__tabs" role="tablist" aria-label="Team" aria-orientation="vertical" data-reveal>
            {showcase.views.map((item, index) => (
              <button key={item.name} type="button" className="show__tab" {...tabProps(index)}>
                {item.name}
              </button>
            ))}
          </div>

          <div className="show__note" key={`${view.name}-note`}>
            <b>{view.title}</b>
            <span>{view.body}</span>
          </div>
        </div>

        <div className="show__stage" data-reveal>
          <div className="show__rail" aria-hidden="true">
            {rail.map((icon) => (
              <span key={icon} data-on={icon === railFor[view.name] || undefined}>
                <Icon name={icon} size={20} />
              </span>
            ))}
          </div>

          <div className="show__panel" {...panelProps}>
            <Screen
              key={view.screen}
              name={view.screen}
              alt={view.alt}
              className="show__screen"
              sizes="(max-width: 1023px) 92vw, 60vw"
            />
          </div>
          <p className="show__disclaimer">{showcase.note}</p>
        </div>
      </div>
    </section>
  );
}
