import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './industry-grid.css';

export interface IndustryCard {
  name: string;
  icon: IconName;
  /** Who it is for, e.g. "Commercial printers and packaging converters". */
  who: string;
  /** The industry's headline from its homepage card. */
  title: string;
  /** Up to three module names it runs on, shown as plain chips (optional: the hub leaves them out to fit). */
  modules?: readonly string[];
  /** The industry page; null while it does not exist (the card shows, without a link). */
  href: string | null;
}

/**
 * Industries as cards: an icon tile, the name, who it is for, the industry's headline, the modules it runs on and a
 * link to its page. Three across on desktops (four from 1200px when the count divides by four), two on tablets, one on phones. Used on the /industries hub.
 */
export function IndustryGrid({ cards, more }: { cards: readonly IndustryCard[]; more: string }) {
  return (
    <ul className="ig">
      {cards.map((card, index) => {
        const body = (
          <>
            <span className="ig__head">
              <span className="ig__icon">
                <Icon name={card.icon} size={22} />
              </span>
              <span className="ig__name">
                <b>{card.name}</b>
                <span>{card.who}</span>
              </span>
            </span>
            <span className="ig__title">{card.title}</span>
            {card.modules?.length ? (
              <span className="ig__mods">
                {card.modules.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </span>
            ) : null}
            {card.href && (
              <span className="ig__more">
                {more} {card.name.toLowerCase()}
                <Icon name="arrow" size={14} />
              </span>
            )}
          </>
        );
        return (
          <li key={card.name} className="ig__item" data-reveal style={vars({ '--i': index % 3 })}>
            {card.href ? (
              <a className="ig__card" href={card.href}>
                {body}
              </a>
            ) : (
              <div className="ig__card">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
