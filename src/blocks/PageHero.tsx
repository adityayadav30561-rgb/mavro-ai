import type { ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { Breadcrumbs } from './Breadcrumbs';
import { DemoLink } from './DemoLink';
import { Headline, type Treatment } from './SectionHead';
import './page-hero.css';

export type Tier = 'base' | 'portal' | 'premium';

export interface HeroAction {
  label: string;
  /** A link; omit it (and give `interest`) for the demo form. */
  href?: string;
  /** For the demo form: the interest to tick. */
  interest?: string | null;
}

interface PageHeroProps {
  /**
   * module: a product screen bleeding off the right edge (module and portal pages)
   * industry: a contained product screen, tilted back until it comes into view
   * package / solution: a visual (plate, diagram) centred in the right column
   * simple: text only (company, contact, legal)
   */
  variant: 'module' | 'industry' | 'package' | 'solution' | 'simple';
  /** Dark puts the hero on navy (ERP Connect); the logo never sits on it, the header stays light. */
  tone?: 'light' | 'dark';
  /** Package chip above the headline, in the tier colour. */
  chip?: { label: string; tier?: Tier; icon?: IconName };
  title: string;
  rest?: string;
  treatment?: Treatment;
  lead: string;
  /** The first is the primary button, the second a ghost button. */
  actions?: readonly HeroAction[];
  /** Short facts under the actions (value + label), only from the decks. */
  facts?: readonly { value: string; label: string }[];
  visual?: ReactNode;
}

/**
 * The top of every page below the homepage: breadcrumbs, the page's one H1 (with its treatment), the lead, up to
 * two calls to action, optional facts, and a visual slot. One screen tall on desktops (a little less, so the next
 * section shows), stacked on phones.
 */
export function PageHero({
  variant,
  tone = 'light',
  chip,
  title,
  rest,
  treatment = 'grad',
  lead,
  actions = [],
  facts,
  visual,
}: PageHeroProps) {
  const simple = variant === 'simple' || !visual;

  return (
    <section
      id="top"
      className={tone === 'dark' ? 'section section--night ph' : 'section ph'}
      data-variant={variant}
      data-simple={simple || undefined}
      aria-labelledby="page-title"
    >
      <div className="ph__bg" aria-hidden="true" />
      <div className="page ph__grid">
        <div className="ph__copy" data-reveal>
          <Breadcrumbs />
          {chip && (
            <span className="ph__chip" data-tier={chip.tier}>
              {chip.icon ? <Icon name={chip.icon} size={16} /> : <span className="ph__dot" />}
              {chip.label}
            </span>
          )}
          <Headline
            id="page-title"
            title={title}
            rest={rest}
            treatment={treatment}
            level={1}
            className="display ph__title"
          />
          <p className="lead ph__lead">{lead}</p>

          {actions.length > 0 && (
            <div className="ph__actions">
              {actions.map((action, index) => {
                const className = index === 0 ? 'btn btn--primary' : 'btn btn--ghost';
                const content = (
                  <>
                    {action.label}
                    {index === 0 && <Icon name="arrow" size={16} className="btn__arrow" />}
                  </>
                );
                return action.href ? (
                  <a key={action.label} className={className} href={action.href}>
                    {content}
                  </a>
                ) : (
                  <DemoLink key={action.label} interest={action.interest ?? null} className={className}>
                    {content}
                  </DemoLink>
                );
              })}
            </div>
          )}

          {facts && facts.length > 0 && (
            <dl className="ph__facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd className="num">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {!simple && (
          <div className="ph__visual" data-reveal>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
