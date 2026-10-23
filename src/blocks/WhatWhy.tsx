import { Icon } from '../components/Icon';
import { vars } from '../motion/hooks';
import './what-why.css';

interface WhatWhyProps {
  /** The deck's "What this module does" paragraph. */
  what: { title: string; body: string };
  /** The deck's six "Why it matters" points. */
  why: { title: string; points: readonly string[] };
}

/**
 * What the module does (the deck's paragraph) beside why it matters (its six points as a checklist).
 */
export function WhatWhy({ what, why }: WhatWhyProps) {
  return (
    <div className="ww">
      <div className="ww__what" data-reveal>
        <h3 className="ww__title">{what.title}</h3>
        <p className="ww__body">{what.body}</p>
      </div>
      <div className="ww__why" data-reveal style={vars({ '--i': 1 })}>
        <h3 className="ww__title">{why.title}</h3>
        <ul className="ww__points">
          {why.points.map((point, index) => (
            <li key={point} style={vars({ '--i': index })}>
              <span className="ww__check" aria-hidden="true">
                <Icon name="check" size={14} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
