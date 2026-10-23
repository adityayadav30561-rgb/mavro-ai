import { Icon } from '../components/Icon';
import { demo } from '../data/home';
import { site } from '../data/site';
import { DemoForm } from './demo/DemoForm';
import './demo.css';

/**
 * The close: the demo request. One navy panel (the wordmark's colour) with the pitch and direct contact on the
 * left and the form on the right. Every "Request a demo" button on the page lands here.
 */
export function Demo() {
  return (
    <section id="demo" className="section demo" aria-labelledby="demo-title">
      <div className="page">
        <div className="demo__panel" data-reveal>
          <div className="demo__pitch">
            <div className="demo__emblem" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h2 id="demo-title" className="h2 demo__title">
              {demo.title}
            </h2>
            <p className="lead demo__lead">{demo.lead}</p>

            <ul className="demo__expect">
              {demo.expect.map((item) => (
                <li key={item.title}>
                  <span className="demo__expect-icon">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <div>
                    <b>{item.title}</b>
                    <span>{item.body}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="demo__direct">
              <p>{demo.direct}</p>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              <a href={`tel:${site.contactPhone.replace(/\s/g, '')}`} className="num">
                {site.contactPhone}
              </a>
            </div>
          </div>

          <DemoForm />
        </div>
      </div>
    </section>
  );
}
