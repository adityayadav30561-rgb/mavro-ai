import { useHref } from '../routing';
import { prefillDemo } from '../sections/demo/prefill';
import { Icon } from './Icon';
import './inline-cta.css';

interface InlineCtaProps {
  title: string;
  body: string;
  label: string;
  /** The demo-form interest to tick when clicked, or null. */
  interest: string | null;
  /** Light for white and paper sections, dark for the navy ones. */
  tone?: 'light' | 'dark';
}

/**
 * A call to action placed inside a section: a short question, one line of answer, and a button that scrolls to
 * the demo form with the relevant interest already ticked.
 */
export function InlineCta({ title, body, label, interest, tone = 'light' }: InlineCtaProps) {
  const href = useHref();
  return (
    <aside className="icta" data-tone={tone} data-reveal>
      <span className="icta__mark" aria-hidden="true" />
      <div className="icta__text">
        <p className="icta__title">{title}</p>
        <p className="icta__body">{body}</p>
      </div>
      <a className="btn btn--primary icta__btn" href={href('#demo')} onClick={() => prefillDemo({ interest })}>
        {label}
        <Icon name="arrow" size={16} className="btn__arrow" />
      </a>
    </aside>
  );
}
