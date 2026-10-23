import { Icon, type IconName } from '../components/Icon';
import { Screen, type ScreenName } from '../components/Screen';
import { vars } from '../motion/hooks';
import type { Tier } from './PageHero';
import './module-cards.css';

export interface ModuleCard {
  name: string;
  summary: string;
  icon: IconName;
  tier: Tier;
  /** The module page; null while it does not exist (the card shows, without a link). */
  href: string | null;
  /** The module's lead screen, shown as a cropped thumbnail; without one the card shows its icon. */
  screen?: ScreenName;
  /** Alt text for the thumbnail. */
  alt?: string;
}

/**
 * Modules as cards: a thumbnail of the module's lead screen (or its icon on a tinted plate), the name in the
 * tier colour's chip, a one-line summary and, when the page exists, a link to it. Used on package, industry and
 * module pages (related modules).
 */
export function ModuleCards({ cards, more }: { cards: readonly ModuleCard[]; more?: string }) {
  return (
    <ul className="mc">
      {cards.map((card, index) => {
        const body = (
          <>
            <span className="mc__thumb" aria-hidden={card.screen ? undefined : true}>
              {card.screen ? (
                <Screen
                  name={card.screen}
                  alt={card.alt ?? ''}
                  sizes="(max-width: 600px) 160vw, 36rem"
                  className="mc__screen"
                />
              ) : (
                <Icon name={card.icon} size={56} className="mc__glyph" />
              )}
            </span>
            <span className="mc__body">
              <span className="mc__name">
                <span className="mc__icon">
                  <Icon name={card.icon} size={18} />
                </span>
                {card.name}
              </span>
              <span className="mc__summary">{card.summary}</span>
              {card.href && more && (
                <span className="mc__more">
                  {more}
                  <Icon name="arrow" size={14} />
                </span>
              )}
            </span>
          </>
        );
        return (
          <li key={card.name} className="mc__item" data-tier={card.tier} data-reveal style={vars({ '--i': index % 3 })}>
            {card.href ? (
              <a className="mc__card" href={card.href}>
                {body}
              </a>
            ) : (
              <div className="mc__card">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
