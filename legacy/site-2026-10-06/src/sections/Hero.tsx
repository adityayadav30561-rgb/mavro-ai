import { Screen } from '../components/Screen';
import { site } from '../data/site';
import { useScrollProgress, vars } from '../motion/hooks';
import './hero.css';

const modules = ['Sales', 'Planning', 'Production', 'Quality', 'Procurement', 'Inventory', 'Dispatch', 'Finance'];

export function Hero() {
  const ref = useScrollProgress<HTMLElement>('exit');

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />

      <div className="page hero__head">
        <h1 id="hero-title" className="display hero__in" style={vars({ '--i': 0 })}>
          Run the whole business. <span className="hero__accent">As one system.</span>
        </h1>
        <p className="lead hero__in" style={vars({ '--i': 1 })}>
          MAVRO connects sales, planning, purchase, production, quality, inventory and finance in a single flow, so
          every order is traceable from the first enquiry to the final payment.
        </p>
        <div className="hero__cta hero__in" style={vars({ '--i': 2 })}>
          <a className="btn btn--primary" href={site.demoHref}>
            Book a demo
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn--ghost" href="#platform">
            See how it works
          </a>
        </div>
      </div>

      {/* Three real screens, layered: the overview in front, an order and the shop floor behind it. */}
      <div className="hero__stage hero__in" style={vars({ '--i': 3 })}>
        <Screen
          name="sales-order"
          className="hero__side hero__side--left"
          sizes="50vw"
          eager
          alt="A MAVRO sales order showing its document flow from enquiry to payment."
        />
        <Screen
          name="production"
          className="hero__side hero__side--right"
          sizes="50vw"
          eager
          alt="The MAVRO shop floor screen with the machine schedule for the shift."
        />
        <Screen
          name="overview"
          className="hero__front"
          eager
          alt="The MAVRO operations overview: open order book, revenue, on-time delivery, the order pipeline and the orders that need attention."
        />
      </div>

      <ul className="page hero__modules" aria-label="What MAVRO covers">
        {modules.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
