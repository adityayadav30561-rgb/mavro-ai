import { Icon } from '../components/Icon';
import { faq } from '../data/home';
import { site } from '../data/site';
import { vars } from '../motion/hooks';
import './faq.css';

/** A stable anchor per question (e.g. #faq-does-mavro-work-with-sap-oracle-or-tally), for deep links. */
const slug = (text: string) =>
  `faq-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

const half = Math.ceil(faq.items.length / 2);
const columns = [faq.items.slice(0, half), faq.items.slice(half)];

/**
 * Frequently asked questions. Native <details> elements: every answer is in the prerendered HTML for search
 * and answer engines, works without JavaScript, and is keyboard accessible. Two independent columns, so
 * opening a question never stretches the other column. The same items feed the FAQPage structured data.
 */
export function Faq() {
  return (
    <section id="faq" className="section section--paper faq" aria-labelledby="faq-title">
      <div className="page">
        <header className="head head--split" data-reveal>
          <h2 id="faq-title" className="h2">
            {faq.title} <span className="grad-text">{faq.titleGrad}</span>
          </h2>
          <p className="lead">{faq.lead}</p>
        </header>

        <div className="faq__grid">
          {columns.map((items, c) => (
            <div key={c} className="faq__col">
              {items.map((item, i) => {
                const index = c * half + i;
                return (
                  <details
                    key={item.q}
                    id={slug(item.q)}
                    className="faq__item"
                    open={index === 0}
                    data-reveal
                    style={vars({ '--i': i % 4 })}
                  >
                    <summary>
                      <h3 className="faq__q">{item.q}</h3>
                      <span className="faq__toggle" aria-hidden="true" />
                    </summary>
                    <div className="faq__a">
                      <p>{item.a}</p>
                      {'link' in item && item.link && (
                        <a href={item.link.href} className="faq__link">
                          {item.link.label}
                          <Icon name="arrow" size={14} />
                        </a>
                      )}
                    </div>
                  </details>
                );
              })}
              {c === 1 && (
                <div className="faq__more" data-reveal>
                  <span className="faq__more-icon" aria-hidden="true">
                    <Icon name="mail" size={18} />
                  </span>
                  <div>
                    <b>{faq.more}</b>
                    <p>
                      {faq.moreBody}{' '}
                      <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
