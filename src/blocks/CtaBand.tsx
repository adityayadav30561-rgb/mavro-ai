import { Icon } from '../components/Icon';
import { site } from '../data/site';
import { DemoLink } from './DemoLink';
import { Headline, type Treatment } from './SectionHead';
import './cta-band.css';

interface CtaBandProps {
  id?: string;
  title: string;
  rest?: string;
  treatment?: Treatment;
  body: string;
  /** The primary button, and the demo-form interest it ticks. */
  label: string;
  interest: string | null;
  /** On a module page: the module the form names in its message. */
  module?: string | null;
}

/**
 * The close of every page below the homepage: a navy band with one ask (the demo, with the page's interest
 * ticked) and the direct contact details for people who prefer to write or call.
 */
export function CtaBand({ id = 'cta', title, rest, treatment = 'grad', body, label, interest, module }: CtaBandProps) {
  return (
    <section id={id} className="section section--night cta" aria-labelledby={`${id}-title`}>
      <div className="cta__glow" aria-hidden="true" />
      <div className="page cta__grid" data-reveal>
        <div className="cta__text">
          <Headline id={`${id}-title`} title={title} rest={rest} treatment={treatment} />
          <p className="lead">{body}</p>
        </div>
        <div className="cta__actions">
          <DemoLink interest={interest} module={module} className="btn btn--primary cta__btn">
            {label}
            <Icon name="arrow" size={16} className="btn__arrow" />
          </DemoLink>
          <p className="cta__direct">
            <a href={`mailto:${site.contactEmail}`}>
              <Icon name="mail" size={16} />
              {site.contactEmail}
            </a>
            <a href={`tel:${site.contactPhone.replace(/\s/g, '')}`} className="num">
              <Icon name="phone" size={16} />
              {site.contactPhone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
