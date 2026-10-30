import { Screen, type ScreenName } from '../components/Screen';
import { vars } from '../motion/hooks';
import './phone-row.css';

export interface PhoneShot {
  screen: ScreenName;
  alt: string;
  title: string;
  caption: string;
}

/**
 * Phone screens of the mobile app in a row, each in a drawn device with a title and a line under it. Wraps to two
 * columns, then one, on narrower screens.
 */
export function PhoneRow({ shots, note }: { shots: readonly PhoneShot[]; note?: string }) {
  return (
    <div className="prow">
      <ul className="prow__list">
        {shots.map((shot, index) => (
          <li key={shot.screen} data-reveal style={vars({ '--i': index })}>
            <div className="prow__phone">
              <Screen device="phone" name={shot.screen} alt={shot.alt} sizes="(max-width: 600px) 60vw, 16rem" />
            </div>
            <h3>{shot.title}</h3>
            <p>{shot.caption}</p>
          </li>
        ))}
      </ul>
      {note && <p className="prow__note">{note}</p>}
    </div>
  );
}
