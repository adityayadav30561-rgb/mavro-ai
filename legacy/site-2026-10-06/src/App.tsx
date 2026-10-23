import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { useViewportFlags } from './motion/hooks';
import { Control } from './sections/Control';
import { FinalCta } from './sections/FinalCta';
import { Hero } from './sections/Hero';
import { Industries } from './sections/Industries';
import { OneSystem } from './sections/OneSystem';
import { OrderToCash } from './sections/OrderToCash';
import { ProcureToPay } from './sections/ProcureToPay';
import { Production } from './sections/Production';
import { Views } from './sections/Views';

/*
 * The homepage, in the order the story is told:
 *
 *   Hero            one order, seen by every department at once
 *   OneSystem       seven tools and seven versions of that order collapse into one record
 *   OrderToCash     the order followed through nine connected documents
 *   ProcureToPay    the shortage it caused, followed to the vendor payment
 *   Production      how making it stays tied to selling it and buying for it
 *   Views           the same system as five teams see it
 *   Industries      the same platform with a different middle
 *   Control         who can do what, and the record of who did
 *   FinalCta        the flow, complete
 */
export function App() {
  useViewportFlags();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <OneSystem />
        <OrderToCash />
        <ProcureToPay />
        <Production />
        <Views />
        <Industries />
        <Control />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
