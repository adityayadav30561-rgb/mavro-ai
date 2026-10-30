import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import type { Tier } from './PageHero';
import './capability-tiles.css';

export interface CapabilityTile {
  icon: IconName;
  title: string;
  body: string;
  /** A small figure from the module's screens (illustrative, like the screens themselves). */
  figure?: { value: string; label: string };
}

/**
 * The deck's four capability tiles for a module (e.g. Order to Cash: Order Book Health, Credit and Exposure,
 * Batch Allocation, Dunning Engine): icon, title, one line, and optionally a figure from the module's screens.
 */
export function CapabilityTiles({
  tiles,
  tier = 'base',
  columns,
}: {
  tiles: readonly CapabilityTile[];
  tier?: Tier;
  /** Three across (six tiles as 3 × 2) instead of four. */
  columns?: 3;
}) {
  return (
    <ul className="cap" data-tier={tier} data-cols={columns}>
      {tiles.map((tile, index) => (
        <li key={tile.title} className="cap__tile" data-reveal style={vars({ '--i': index })}>
          <div className="cap__top">
            <span className="cap__icon">
              <Icon name={tile.icon} size={22} />
            </span>
            {tile.figure && (
              <span className="cap__figure">
                <b className="num">{tile.figure.value}</b>
                <span>{tile.figure.label}</span>
              </span>
            )}
          </div>
          <h3 className="cap__title">{tile.title}</h3>
          <p className="cap__body">{tile.body}</p>
        </li>
      ))}
    </ul>
  );
}
