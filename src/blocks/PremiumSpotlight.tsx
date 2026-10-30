import { Icon, type IconName } from '../components/Icon';
import type { PremiumFeature } from '../data/modules';
import { useTabs, vars } from '../motion/hooks';
import { SpecialVisual } from '../sections/explore/SpecialVisual';
import './premium-spotlight.css';

export interface SpotlightGroup {
  name: string;
  modules: readonly {
    id: string;
    name: string;
    icon: IconName;
    /** The module's page; without one the panel shows no link. */
    href: string | null;
  }[];
}

/**
 * The Premium package as a list and a panel (user, 2026-10-22: "one side ... other side changing when clicked"):
 * modules grouped by business area on the left, each with the same space on the right, an illustrative interface
 * beside its story and points. Arrow keys walk the list. Drawn for a dark (section--night) band. The panel
 * carries no "Premium" tag and no kicker above its heading.
 */
export function PremiumSpotlight({
  groups,
  features,
  seeLabel,
}: {
  groups: readonly SpotlightGroup[];
  features: Record<string, PremiumFeature>;
  /** Link text after the module name, e.g. "See the screens". */
  seeLabel: string;
}) {
  const ordered = groups.flatMap((group) => group.modules);
  const starts = groups.map((_, g) => groups.slice(0, g).reduce((n, group) => n + group.modules.length, 0));
  const { active, tabProps, panelProps } = useTabs(ordered.length, 'pspot');
  const module = ordered[active];
  const feature = features[module.id];

  return (
    <div className="pspot" data-reveal>
      <div className="pspot__tabs" role="tablist" aria-label="Premium modules" aria-orientation="vertical">
        {groups.map((group, g) => (
          <div key={group.name} className="pspot__group" role="presentation">
            <p className="pspot__group-name" aria-hidden="true">
              {group.name}
            </p>
            {group.modules.map((item, i) => (
              <button key={item.id} type="button" className="pspot__tab" {...tabProps(starts[g] + i)}>
                <span className="pspot__tab-icon">
                  <Icon name={item.icon} size={20} />
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="pspot__panel" {...panelProps}>
        <div className="pspot__text" key={`${module.id}-text`}>
          <h3 className="pspot__title">{feature.title}</h3>
          <p>{feature.body}</p>
          <ul className="pspot__points">
            {feature.points.map((point, i) => (
              <li key={point} style={vars({ '--i': i })}>
                <Icon name="check" size={16} />
                {point}
              </li>
            ))}
          </ul>
          {module.href && (
            <a className="pspot__link" href={module.href}>
              {module.name}: {seeLabel}
              <Icon name="arrow" size={14} />
            </a>
          )}
        </div>
        <div className="pspot__visual" key={`${module.id}-visual`}>
          <SpecialVisual kind={feature.visual} />
        </div>
      </div>
    </div>
  );
}
