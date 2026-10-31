import { Connect } from '../sections/Connect';
import { CustomerProof } from '../sections/CustomerProof';
import { DemoPanel } from '../blocks/DemoPanel';
import { Explore } from '../sections/Explore';
import { Faq } from '../sections/Faq';
import { Hero } from '../sections/Hero';
import { Implementation } from '../sections/Implementation';
import { Industries } from '../sections/Industries';
import { PlatformIntro } from '../sections/PlatformIntro';
import { Showcase } from '../sections/Showcase';
import { WhyMavro } from '../sections/WhyMavro';
import { Workflow } from '../sections/Workflow';

/*
 * The homepage (route '/'), in the order the story is told. Reorder freely; each section is self-contained.
 * The header, footer and <main> come from Layout.tsx.
 *
 *   What it is      Hero            the platform core and its modules, in 3D                   #top
 *                   PlatformIntro   base modules, portals and premium modules on one platform   #platform
 *   What it looks   Showcase        the real interface, as five teams see it                    #product
 *   How it fits     Connect         ERP Connect: works alongside SAP, Oracle, Tally             #connect
 *   What it covers  Explore         Base, Portals, Premium as tabs; featured modules in full    #explore
 *                                   (#modules, #portals and #premium land here and pick the tab)
 *   How it connects Workflow        one order to cash, across seven modules                     #workflow
 *   How you get it  Implementation  live in 25 to 30 days: the plan, the phases, the support    #implementation
 *   Who and why     Industries      shared ends, a middle configured per industry               #industries
 *                   WhyMavro        the principles, with evidence                               #why
 *                   CustomerProof   customer stories from the deck's slide 23, anonymised            #stories
 *                   Faq             questions buyers search for, with FAQPage structured data      #faq
 *                   Demo            the close: demo request form                                #demo
 *
 * Backgrounds alternate white and paper down the page; moving a section may mean swapping its
 * `section--paper` class with a neighbour's.
 *
 * Module names and packages come from the product deck (data/modules/catalogue.ts); ERP Connect from the connectivity deck.
 */
export function Page() {
  return (
    <>
      <Hero />
      <PlatformIntro />
      <Showcase />
      <Connect />
      <Explore />
      <Workflow />
      <Implementation />
      <Industries />
      <WhyMavro />
      <CustomerProof />
      <Faq />
      <DemoPanel />
    </>
  );
}
