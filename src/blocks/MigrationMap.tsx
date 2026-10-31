import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './migration-map.css';

export interface MigrationTarget {
  name: string;
  note?: string;
  /** The module's page; none for a plain capability. */
  href?: string | null;
  icon?: IconName;
}

interface MigrationMapProps {
  from: string;
  to: string;
  rows: readonly { icon: IconName; area: string; today: string; to: readonly MigrationTarget[] }[];
}

/**
 * Today's tools, each mapped to the MAVRO modules that replace them (Implementation page, product deck slide 24):
 * a row per business area, the current workaround on the left, the modules on the right, linked to their pages.
 */
export function MigrationMap({ from, to, rows }: MigrationMapProps) {
  return (
    <div className="mig" data-reveal>
      <div className="mig__heads" aria-hidden="true">
        <span>{from}</span>
        <span>{to}</span>
      </div>
      <ol className="mig__rows">
        {rows.map((row, index) => (
          <li key={row.area} className="mig__row" style={vars({ '--i': index })}>
            <div className="mig__from">
              <span className="mig__icon">
                <Icon name={row.icon} size={20} />
              </span>
              <div>
                <b>{row.area}</b>
                <p>
                  <span className="sr-only">{from}: </span>
                  {row.today}
                </p>
              </div>
            </div>
            <span className="mig__arrow" aria-hidden="true">
              <Icon name="arrow" size={20} />
            </span>
            <ul className="mig__to" aria-label={`${to}: ${row.area}`}>
              {row.to.map((target) => {
                const body = (
                  <>
                    {target.icon && <Icon name={target.icon} size={16} />}
                    <span>
                      <b>{target.name}</b>
                      {target.note && <small>{target.note}</small>}
                    </span>
                  </>
                );
                return (
                  <li key={target.name}>
                    {target.href ? (
                      <a href={target.href}>
                        {body}
                        <Icon name="arrow" size={14} className="mig__go" />
                      </a>
                    ) : (
                      <div data-plain>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
