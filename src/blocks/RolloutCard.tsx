import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './rollout-card.css';

interface RolloutCardProps {
  title: string;
  /** e.g. "Day 1 → Day 30". */
  span: string;
  phases: readonly { when: string; icon: IconName; title: string }[];
  foot: string;
}

/**
 * The rollout at a glance, as a hero visual (Implementation page): the phases from the homepage plan on a rail,
 * each with its weeks, under the plan's span, and the support promise underneath.
 */
export function RolloutCard({ title, span, phases, foot }: RolloutCardProps) {
  return (
    <figure className="roll" data-reveal>
      <figcaption className="roll__head">
        <b>{title}</b>
        <span className="num">{span}</span>
      </figcaption>
      <ol className="roll__steps">
        {phases.map((phase, index) => (
          <li key={phase.title} style={vars({ '--i': index })}>
            <span className="roll__icon">
              <Icon name={phase.icon} size={18} />
            </span>
            <span className="roll__when">{phase.when}</span>
            <b>{phase.title}</b>
          </li>
        ))}
      </ol>
      <p className="roll__foot">
        <Icon name="people" size={16} />
        {foot}
      </p>
    </figure>
  );
}
