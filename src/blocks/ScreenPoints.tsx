import type { ScreenName } from '../components/Screen';
import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import { ScreenFrame } from './ScreenFrame';
import './screen-points.css';

interface ScreenPointsProps {
  screen: ScreenName;
  alt: string;
  note?: string;
  points: readonly { icon: IconName; title: string; body: string }[];
}

/**
 * A product screen beside the controls it shows (Security page: roles and audit beside access control and the audit
 * trail). The screen takes the wider column; below 1024px the points follow it.
 */
export function ScreenPoints({ screen, alt, note, points }: ScreenPointsProps) {
  return (
    <div className="spts">
      <div className="spts__screen" data-reveal>
        <ScreenFrame screen={screen} alt={alt} note={note} sizes="(min-width: 1024px) 60vw, 100vw" />
      </div>
      <ul className="spts__points">
        {points.map((point, index) => (
          <li key={point.title} data-reveal style={vars({ '--i': index })}>
            <span className="spts__icon">
              <Icon name={point.icon} size={18} />
            </span>
            <div>
              <b>{point.title}</b>
              <p>{point.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
