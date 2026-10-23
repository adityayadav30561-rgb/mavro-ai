import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { NavLink as Item } from '../data/nav';
import { isPage, target } from '../links';
import { useHref, usePath } from '../routing';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { link: Item; children?: ReactNode };

/**
 * One navigation link: its page once that route exists, its homepage fallback until then, nothing if it has
 * neither (src/links.ts). Marks the current page, and carries the module to open when it lands in Explore.
 */
export function NavLink({ link, children, ...rest }: Props) {
  const href = useHref();
  const path = usePath();
  const to = target(link);
  if (to === null) return null;
  const page = isPage(link);
  return (
    <a
      {...rest}
      href={href(to)}
      aria-current={page && link.page === path ? 'page' : undefined}
      data-module={!page && link.module ? link.module : undefined}
    >
      {children ?? link.label}
    </a>
  );
}
