import type { ReactNode } from 'react';
import { SectionHead, sectionClass, type HeadingProps, type Tone } from './SectionHead';

interface SectionProps extends Omit<HeadingProps, 'id' | 'level' | 'className'> {
  /** Section id (an anchor); the headline is `${id}-title`. */
  id: string;
  tone?: Tone;
  /** Extra class on the section, for page-specific layout. */
  className?: string;
  children: ReactNode;
}

/**
 * A page section: background tone, the page width, the heading (headline, treatment, lead) and its content
 * (one or more blocks). Pages are assembled from these; see docs/LIBRARY.md for the rhythm rules.
 */
export function Section({ id, tone = 'white', className, children, ...head }: SectionProps) {
  return (
    <section id={id} className={sectionClass(tone, className ?? '')} aria-labelledby={`${id}-title`}>
      <div className="page">
        <SectionHead id={`${id}-title`} {...head} />
        {children}
      </div>
    </section>
  );
}
