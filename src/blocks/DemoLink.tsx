import type { ReactNode } from 'react';
import { usePath } from '../routing';
import { demoHref, prefillDemo } from '../sections/demo/prefill';

interface DemoLinkProps {
  /** The demo-form interest to tick ('Base modules', 'Portals', 'Premium modules', 'ERP Connect'), or null. */
  interest: string | null;
  className?: string;
  children: ReactNode;
}

/**
 * A link to the demo request form that ticks an interest. On the homepage it scrolls to #demo and tells the form
 * by event; on any other page it opens the homepage form with the interest in the URL.
 */
export function DemoLink({ interest, className, children }: DemoLinkProps) {
  const home = usePath() === '/';
  return (
    <a
      className={className}
      href={home ? '#demo' : demoHref(interest)}
      onClick={home ? () => prefillDemo({ interest }) : undefined}
    >
      {children}
    </a>
  );
}
