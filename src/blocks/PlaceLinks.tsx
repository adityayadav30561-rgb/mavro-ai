import { Icon } from '../components/Icon';
import './place-links.css';

/**
 * Links to places as a row of pills with a pin: the nearby city pages at the foot of a city page. Only places that
 * have a page are passed in.
 */
export function PlaceLinks({ places, label }: { places: readonly { name: string; href: string }[]; label: string }) {
  return (
    <ul className="places">
      {places.map((place) => (
        <li key={place.href}>
          <a href={place.href}>
            <Icon name="pin" size={16} />
            {label} {place.name}
            <Icon name="arrow" size={14} className="places__arrow" />
          </a>
        </li>
      ))}
    </ul>
  );
}
