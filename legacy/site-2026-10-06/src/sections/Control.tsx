import { Screen } from '../components/Screen';
import { principles } from '../data/platform';
import { vars } from '../motion/hooks';
import './control.css';

/** Enterprise trust, shown as the product does it: the real roles and audit screen, then what it guarantees. */
export function Control() {
  return (
    <section id="control" className="section section--mist ctl" aria-labelledby="ctl-title">
      <div className="page">
        <header className="section__head" data-reveal>
          <h2 id="ctl-title" className="h2">
            Built to be audited. <span className="soft">Not just to be used.</span>
          </h2>
          <p className="lead">
            Who can do what is set in one place, and everything anyone does is written down by the system itself.
          </p>
        </header>

        <div data-reveal>
          <Screen
            name="access"
            alt="The MAVRO roles and audit screen: a permission matrix for purchase orders by role, with approval limits, beside an audit trail showing who approved, changed or was refused what, with before and after values."
          />
        </div>

        <ol className="ctl__principles">
          {principles.map((item, index) => (
            <li key={item.title} data-reveal style={vars({ '--i': index })}>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
