import type { ScreenName } from '../components/Screen';
import { useTabs } from '../motion/hooks';
import { ScreenFrame } from './ScreenFrame';
import './screen-tour.css';

export interface TourScreen {
  screen: ScreenName;
  /** The tab: the view's name, e.g. "Sales orders". */
  title: string;
  /** Two lines on what the user does there. */
  caption: string;
  alt: string;
}

/**
 * A module's 3–4 product screens as tabs (the homepage Showcase pattern): the views on the left with the active
 * one's caption, the screen on the right. Arrow keys move between views. `id` names the tabs (one tour per page).
 */
export function ScreenTour({
  id = 'tour',
  screens,
  note,
  more,
}: {
  id?: string;
  screens: readonly TourScreen[];
  note: string;
  /** The module's other views, which the tour does not show: the screens are a sample of the module. */
  more?: { label: string; views: readonly string[] };
}) {
  const { active, tabProps, panelProps } = useTabs(screens.length, id);
  const view = screens[active];

  return (
    <div className="tour" data-reveal>
      <div className="tour__side">
        <div className="tour__tabs" role="tablist" aria-label="Screens" aria-orientation="vertical">
          {screens.map((item, index) => (
            <button key={item.title} type="button" className="tour__tab" {...tabProps(index)}>
              <span className="tour__num num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.title}
            </button>
          ))}
        </div>
        <p className="tour__caption" key={`${view.title}-caption`}>
          <b>{view.title}</b>
          {view.caption}
        </p>
        {more && more.views.length > 0 && (
          <div className="tour__more">
            <p>{more.label}</p>
            <ul>
              {more.views.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="tour__stage" {...panelProps}>
        <ScreenFrame
          key={view.screen}
          screen={view.screen}
          alt={view.alt}
          note={note}
          sizes="(max-width: 1023px) 92vw, 54rem"
        />
      </div>
    </div>
  );
}
