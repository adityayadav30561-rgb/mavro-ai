import { Icon } from '../components/Icon';
import { Screen, type ScreenName } from '../components/Screen';
import { vars } from '../motion/hooks';
import './portal-layers.css';

export interface PortalLayer {
  name: string;
  /** Where it sits in the chain: Supply side, Primary, Secondary, Tertiary. */
  layer: string;
  who: string;
  body: string;
  points: readonly string[];
  href: string | null;
  screen?: ScreenName;
  alt?: string;
}

/**
 * The four portals as rich cards along the supply-to-retail chain: the layer and who uses it, the portal's own
 * lead screen, what it does and three points, with a link to its page. Sits beside the ChainDiagram on the
 * Portals package page.
 */
export function PortalLayers({ portals, more }: { portals: readonly PortalLayer[]; more: string }) {
  return (
    <ol className="pl">
      {portals.map((portal, index) => (
        <li key={portal.name} className="pl__item" data-reveal style={vars({ '--i': index })}>
          <div className="pl__shot" aria-hidden={portal.screen ? undefined : true}>
            {portal.screen && <Screen name={portal.screen} alt={portal.alt ?? ''} sizes="(max-width: 700px) 120vw, 26rem" className="pl__screen" />}
          </div>
          <div className="pl__text">
            <p className="pl__layer">
              <b>{portal.layer}</b> · {portal.who}
            </p>
            <h3 className="pl__name">{portal.name}</h3>
            <p className="pl__body">{portal.body}</p>
            <ul className="pl__points">
              {portal.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={14} />
                  {point}
                </li>
              ))}
            </ul>
            {portal.href && (
              <a className="pl__link" href={portal.href}>
                {more}
                <Icon name="arrow" size={14} />
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
