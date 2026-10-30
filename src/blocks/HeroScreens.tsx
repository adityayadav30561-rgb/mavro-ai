import { Screen, type ScreenName } from '../components/Screen';
import { ScreenFrame } from './ScreenFrame';
import './hero-screens.css';

interface Shot {
  screen: ScreenName;
  alt: string;
}

/**
 * The visual of a package or platform hero: the lead product screen bleeding off the right edge (as on module
 * pages), a second module's screen standing behind it so it reads as many modules on one system, and a phone
 * screen in front at the lower left. Use as PageHero's `visual` with variant "module".
 */
export function HeroScreens({ lead, behind, phone, note }: { lead: Shot; behind?: Shot; phone?: Shot; note?: string }) {
  return (
    <>
      {behind && (
        <div className="hs__behind" aria-hidden={behind.alt ? undefined : true}>
          <Screen name={behind.screen} alt={behind.alt} sizes="50vw" className="hs__shot" />
        </div>
      )}
      <ScreenFrame variant="bleed" screen={lead.screen} alt={lead.alt} note={note} eager />
      {phone && (
        <div className="hs__phone">
          <Screen device="phone" name={phone.screen} alt={phone.alt} sizes="12rem" eager />
        </div>
      )}
    </>
  );
}
