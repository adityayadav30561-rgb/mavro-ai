import { Icon } from '../components/Icon';
import { InlineCta } from '../components/InlineCta';
import { inlineCtas, specialized } from '../data/home';
import { moduleById, premiumById, premiumGroups } from '../data/modules';
import { useTabs, vars } from '../motion/hooks';
import { SpecialVisual } from './specialized/SpecialVisual';
import './specialized.css';

/* Tab order follows the groups, so arrow keys walk the list as it reads. */
const ordered = premiumGroups.flatMap((group) => group.ids.map(premiumById));
const starts = premiumGroups.map((_, g) => premiumGroups.slice(0, g).reduce((n, group) => n + group.ids.length, 0));

/*
 * The Premium package. The one immersive section: every premium module gets the same space, a tab in the
 * grouped list and a full panel with its own illustrative interface. On wide screens the list scrolls within
 * its own column beside the panel, so the section stays about one screen tall.
 */
export function Specialized() {
  const { active, tabProps, panelProps } = useTabs(ordered.length, 'premium');
  const feature = ordered[active];

  return (
    <section id="premium" className="section section--night special" aria-labelledby="special-title">
      <div className="special__glow" aria-hidden="true" />
      <div className="page">
        <header className="head head--split special__head" data-reveal>
          <h2 id="special-title" className="h2">
            {specialized.title} <span className="grad-text">{specialized.titleSoft}</span>
          </h2>
          <p className="lead">{specialized.lead}</p>
        </header>

        <div className="special__spot" data-reveal>
          <div className="special__tabs" role="tablist" aria-label="Premium modules" aria-orientation="vertical">
            {premiumGroups.map((group, g) => (
              <div key={group.name} className="special__group" role="presentation">
                <p className="special__group-name" aria-hidden="true">
                  {group.name}
                </p>
                {group.ids.map((id, i) => {
                  const module = moduleById(id);
                  const tabIndex = starts[g] + i;
                  return (
                    <button key={id} type="button" className="special__tab" {...tabProps(tabIndex)}>
                      <span className="special__tab-icon">
                        <Icon name={module.icon} size={20} />
                      </span>
                      <span className="special__tab-name">{module.name}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="special__panel" {...panelProps}>
            <div className="special__text" key={`${feature.id}-text`}>
              <p className="special__kicker">{feature.kicker}</p>
              <h3 className="special__title">{feature.title}</h3>
              <p>{feature.body}</p>
              <ul className="special__points">
                {feature.points.map((point, i) => (
                  <li key={point} style={vars({ '--i': i })}>
                    <Icon name="check" size={16} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="special__visual" key={`${feature.id}-visual`}>
              <SpecialVisual kind={feature.visual} />
            </div>
          </div>
        </div>

        <InlineCta {...inlineCtas.modules} tone="dark" />
      </div>
    </section>
  );
}
