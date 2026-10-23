import { Icon } from '../components/Icon';
import { platformFeatures } from '../data/platform';
import { vars } from '../motion/hooks';
import './platform-strip.css';

/**
 * The eight platform features every module is built on (product deck slide 12), identical on every page that
 * shows it: a board of eight cells on a shared base, the platform drawn as the plate they stand on.
 */
export function PlatformStrip() {
  return (
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
}
