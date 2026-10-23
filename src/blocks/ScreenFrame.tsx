import { Screen, type ScreenName } from '../components/Screen';
import './screen-frame.css';

interface ScreenFrameProps {
  screen: ScreenName;
  alt: string;
  /** Rendered width hint for the browser's choice of 1x / 2x file. */
  sizes?: string;
  eager?: boolean;
  /**
   * 'contained': the whole screen, framed with rounded corners and a soft shadow, sized by its container.
   * 'bleed': the screen runs off the right and bottom edges of its container, which must be position: relative,
   * clip its overflow and have a height; the frame itself takes no box (display: contents). Set --sframe-w on
   * the container to change the screen's width (default 47.5rem).
   */
  variant?: 'contained' | 'bleed';
  /** The "illustrative data" note pinned to the bottom right; null for none. */
  note?: string | null;
}

/**
 * A product screenshot (captured from prototype/ by `npm run shots`) in a frame, with the note that its data is
 * illustrative. The alt text describes what the screen shows.
 */
export function ScreenFrame({ screen, alt, sizes, eager, variant = 'contained', note = null }: ScreenFrameProps) {
  return (
    <div className="sframe" data-variant={variant}>
      <Screen name={screen} alt={alt} sizes={sizes} eager={eager} className="sframe__shot" />
      {note && (
        <p className="sframe__note" aria-hidden="true">
          {note}
        </p>
      )}
    </div>
  );
}
