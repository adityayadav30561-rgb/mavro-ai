import { Icon, type IconName } from '../components/Icon';
import { platformFeatures } from '../data/platform';
import { vars } from '../motion/hooks';
import type { Tier } from './PageHero';
import './platform-strip.css';

interface PlatformStripProps {
  /** On a module page: the module, drawn standing on the platform and wired into its features. */
  module?: { name: string; icon: IconName; tier: Tier; label: string };
}

/**
 * The eight platform features every module is built on (product deck slide 12), identical on every page that
 * shows it: a board of eight cells on a shared base, the platform drawn as the plate they stand on. Given a module,
 * the module sits above the board with a rail feeding each column: it inherits all eight. Reads on white or on a
 * night band (module pages use night).
 */
export function PlatformStrip({ module }: PlatformStripProps) {
  const board = (
    <div className="pstrip" data-reveal>
      <ul className="pstrip__grid">
        {platformFeatures.items.map((item, index) => (
          <li key={item.title} style={vars({ '--i': index })}>
            <span className="pstrip__icon">
              <Icon name={item.icon} size={20} />
            </span>
            <b>{item.title}</b>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      <p className="pstrip__base">
        <Icon name="layers" size={16} />
        {platformFeatures.base}
      </p>
    </div>
  );

  if (!module) return board;

  return (
    <div className="pstrip-stack">
      <div className="pstrip__top" data-reveal aria-hidden="true">
        <span className="pstrip__module" data-tier={module.tier}>
          <span className="pstrip__module-icon">
            <Icon name={module.icon} size={22} />
          </span>
          <span>
            <b>{module.name}</b>
            <small>{module.label}</small>
          </span>
        </span>
        <span className="pstrip__rail">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      {board}
    </div>
  );
}
