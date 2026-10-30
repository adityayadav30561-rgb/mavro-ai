import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './gap-columns.css';

export interface Gap {
  icon: IconName;
  title: string;
  /** The gap in one line, e.g. "A paid seat for every named user". */
  tag: string;
  points: readonly string[];
}

/**
 * What goes wrong today, in columns (ERP Connect: the gaps of working directly in a native ERP, connectivity deck
 * slide 3): icon and title, the gap in one line, then what it causes, each marked with a cross.
 */
export function GapColumns({ gaps }: { gaps: readonly Gap[] }) {
  return (
    <ul className="gaps">
      {gaps.map((gap, index) => (
        <li key={gap.title} className="gaps__col" data-reveal style={vars({ '--i': index })}>
          <div className="gaps__head">
            <span className="gaps__icon">
              <Icon name={gap.icon} size={22} />
            </span>
            <h3>{gap.title}</h3>
          </div>
          <p className="gaps__tag">{gap.tag}</p>
          <ul className="gaps__points">
            {gap.points.map((point) => (
              <li key={point}>
                <span aria-hidden="true">
                  <Icon name="cross" size={12} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
