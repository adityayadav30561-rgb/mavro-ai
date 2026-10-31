import type { ReactNode } from 'react';
import { formPages, usePath } from '../routing';
import { demoHref, prefillDemo } from './demo/prefill';

interface DemoLinkProps {
  /** The demo-form interest to tick ('Base modules', 'Portals', 'Premium modules', 'ERP Connect'), or null. */
  interest: string | null;
  /** On a module page: the module, which the form puts in its message. */
  module?: string | null;
  className?: string;
  children: ReactNode;
}

/**
 * A link to the demo request form that ticks an interest. On the homepage it scrolls to #demo and tells the form
 * by event; on any other page it opens the homepage form with the interest in the URL.
 */
export function DemoLink({ interest, module, className, children }: DemoLinkProps) {
  // A page with the form (#demo, routing.tsx formPages): scroll to it and tick the interest by event.
  const home = formPages.includes(usePath());
  return (
    <a
      className={className}
      href={home ? '#demo' : demoHref(interest, module)}
      onClick={home ? () => prefillDemo({ interest, module }) : undefined}
    >
      {children}
    </a>
  );
}
