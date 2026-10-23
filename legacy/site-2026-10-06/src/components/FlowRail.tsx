import { vars } from '../motion/hooks';
import './flow-rail.css';

interface RailItem {
  label: string;
  sub?: string;
}

interface FlowRailProps {
  items: RailItem[];
  /** Index of the stage the flow has reached. Earlier stages are done, later ones are pending. */
  active: number;
  /** Override for the blue fill, 0..1 or a CSS expression. Defaults to the position of `active`. */
  fill?: number | string;
  className?: string;
}

/** The signature MAVRO element: stages on one line, with the blue thread filled as far as the flow has got. */
export function FlowRail({ items, active, fill, className }: FlowRailProps) {
  const last = Math.max(1, items.length - 1);
  return (
    <ol
      className={className ? `rail ${className}` : 'rail'}
      style={vars({ '--n': items.length, '--fill': fill ?? active / last })}
    >
      {items.map((item, index) => (
        <li
          key={item.label}
          data-state={index < active ? 'done' : index === active ? 'live' : 'next'}
          aria-current={index === active ? 'step' : undefined}
        >
          <span className="rail__dot" />
          <span className="rail__label">{item.label}</span>
          {item.sub && <span className="rail__sub">{item.sub}</span>}
        </li>
      ))}
    </ol>
  );
}
