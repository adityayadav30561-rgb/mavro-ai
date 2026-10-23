import { Icon } from '../components/Icon';
import { site } from '../data/site';
import { vars } from '../motion/hooks';
import { useHref } from '../routing';
import { SectionHead, sectionClass, type Tone, type Treatment } from './SectionHead';
import './faq.css';

export interface FaqItem {
  q: string;
  a: string;
  /** Optional follow-up link under the answer ('#section' links resolve to the homepage elsewhere). */
  link?: { label: string; href: string };
}

/** A stable anchor per question (e.g. #faq-does-mavro-work-with-sap-oracle-or-tally), for deep links. */
export const faqSlug = (text: string) =>
  `faq-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

interface FaqBlockProps {
  /** Section id; the headline is `${id}-title`. */
  id?: string;
  tone?: Tone;
  title: string;
  rest?: string;
  treatment?: Treatment;
  lead?: string;
  items: readonly FaqItem[];
  /** The contact card closing the second column. */
  more?: { title: string; body: string };
}

/**
 * Frequently asked questions as a full section. Native <details> elements: every answer is in the prerendered
 * HTML for search and answer engines, works without JavaScript, and is keyboard accessible. Two independent
 * columns, so opening a question never stretches the other column. Give the page's route the matching FAQPage
 * structured data from the same items (seo/schema.ts, faqPage).
 */
export function FaqBlock({
  id = 'faq',
  tone = 'paper',
  title,
  rest,
  treatment = 'grad',
  lead,
  items,
  more,
}: FaqBlockProps) {
  const href = useHref();
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section id={id} className={sectionClass(tone, 'faq')} aria-labelledby={`${id}-title`}>
      <div className="page">
        <SectionHead id={`${id}-title`} title={title} rest={rest} treatment={treatment} lead={lead} />

        <div className="faq__grid">
          {columns.map((list, c) => (
            <div key={c} className="faq__col">
              {list.map((item, i) => {
                const index = c * half + i;
                return (
                  <details
                    key={item.q}
                    id={faqSlug(item.q)}
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
                      {item.link && (
                        <a href={href(item.link.href)} className="faq__link">
                          {item.link.label}
                          <Icon name="arrow" size={14} />
                        </a>
                      )}
                    </div>
                  </details>
                );
              })}
              {c === 1 && more && (
                <div className="faq__more" data-reveal>
                  <span className="faq__more-icon" aria-hidden="true">
                    <Icon name="mail" size={18} />
                  </span>
                  <div>
                    <b>{more.title}</b>
                    <p>
                      {more.body} <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
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
