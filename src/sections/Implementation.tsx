import { SectionHead } from '../blocks/SectionHead';
import { Timeline } from '../blocks/Timeline';
import { Icon } from '../components/Icon';
import { implementation } from '../data/home';
import { hasPage } from '../links';
import './implementation.css';

/*
 * Live in 25 to 30 days: the phased rollout as a one-month plan with the four phases in detail
 * (blocks/Timeline), then who the customer works with.
 */
export function Implementation() {
  return (
    <section id="implementation" className="section impl" aria-labelledby="impl-title">
      <div className="page">
        <SectionHead
          id="impl-title"
          title={implementation.title}
          rest={implementation.titleSoft}
          treatment="grad"
          lead={implementation.lead}
        />

        <Timeline data={implementation.plan} />

        <div className="impl__support" data-reveal>
          <div className="impl__support-head">
            <p className="impl__support-title">{implementation.supportTitle}</p>
            <p className="impl__support-note">{implementation.supportNote}</p>
            {hasPage(implementation.more.page) && (
              <a className="more-link" href={implementation.more.page}>
                {implementation.more.label}
                <Icon name="arrow" size={14} />
              </a>
            )}
          </div>
          <ul>
            {implementation.support.map((item) => (
              <li key={item.title}>
                <span className="impl__support-icon">
                  <Icon name={item.icon} size={20} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
