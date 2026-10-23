/*
 * The heading of a section: headline (with its second part in one of the site's treatments) and lead.
 *
 * Treatments (base.css): 'soft' grey, 'grad' the brand sweep, 'mark' ink with a drawn-in marker, 'plain' one
 * colour. Neighbouring sections never share a treatment (DECISIONS.md); pages pick them in order.
 * Layouts: 'split' puts the lead beside the headline on desktops, 'stack' below it, 'center' centres both.
 */
export type Treatment = 'soft' | 'grad' | 'mark' | 'plain';

/** Background of a section; neighbours alternate white and paper, with at most one night band per page. */
export type Tone = 'white' | 'paper' | 'night';

export const toneClass: Record<Tone, string | null> = { white: null, paper: 'section--paper', night: 'section--night' };

const treatmentClass: Record<Exclude<Treatment, 'plain'>, string> = { soft: 'soft', grad: 'grad-text', mark: 'mark' };

/** `section`, the tone class and the block's own class, in that order. */
export const sectionClass = (tone: Tone, own: string) => ['section', toneClass[tone], own].filter(Boolean).join(' ');

export interface HeadingProps {
  /** id of the headline, for the section's aria-labelledby. */
  id: string;
  title: string;
  /** The second part of the headline, styled by `treatment`. */
  rest?: string;
  treatment?: Treatment;
  lead?: string;
  layout?: 'split' | 'stack' | 'center';
  /** The page's H1 (page heroes) or a section H2 (default). */
  level?: 1 | 2;
  className?: string;
}

export function Headline({ id, title, rest, treatment = 'soft', level = 2, className }: HeadingProps) {
  const Tag = level === 1 ? 'h1' : 'h2';
  return (
    <Tag id={id} className={className ?? (level === 1 ? 'display' : 'h2')}>
      {title}
      {rest && treatment === 'plain' && ` ${rest}`}
      {rest && treatment !== 'plain' && ' '}
      {rest && treatment !== 'plain' && <span className={treatmentClass[treatment]}>{rest}</span>}
    </Tag>
  );
}

export function SectionHead(props: HeadingProps) {
  const { lead, layout = 'split' } = props;
  const layoutClass = layout === 'split' ? 'head head--split' : layout === 'center' ? 'head head--center' : 'head';
  return (
    <header className={layoutClass} data-reveal>
      <Headline {...props} />
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
