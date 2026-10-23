import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

/**
 * Arms the two page-wide viewport behaviours declared in markup:
 *   [data-reveal]  gets [data-in] the first time it enters the viewport
 *   [data-live]    gets [data-live-on] while it is on screen, so looping animation pauses off screen
 */
export function useViewportFlags() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-in', '');
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    const live = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute('data-live-on', entry.isIntersecting);
    });

    document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));
    document.querySelectorAll('[data-live]').forEach((el) => live.observe(el));
    return () => {
      reveal.disconnect();
      live.disconnect();
    };
  }, []);
}

/** Roving-tabindex tablist: arrows, Home and End move and select. */
export function useTabs(count: number, base: string, initial = 0) {
  const [active, setActive] = useState(initial);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (active + 1) % count;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (active - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const tabProps = (index: number) => ({
    role: 'tab' as const,
    id: `${base}-tab-${index}`,
    'aria-selected': index === active,
    'aria-controls': `${base}-panel`,
    tabIndex: index === active ? 0 : -1,
    onClick: () => setActive(index),
    onKeyDown,
    ref: (el: HTMLButtonElement | null) => {
      tabs.current[index] = el;
    },
  });

  const panelProps = {
    role: 'tabpanel' as const,
    id: `${base}-panel`,
    'aria-labelledby': `${base}-tab-${active}`,
    tabIndex: 0,
  };

  return { active, select: setActive, tabProps, panelProps };
}

/** Typed helper for passing CSS custom properties through `style`. */
export function vars(values: Record<`--${string}`, string | number>): CSSProperties {
  return values as CSSProperties;
}
