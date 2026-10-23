import { useEffect, useRef } from 'react';
import { core } from '../data/home';
import { baseCapabilities, baseFeatured, moduleById, platformFoundation } from '../data/modules';
import { ModuleScreen } from './core/ModuleScreen';
import './core-modules.css';

interface Card {
  id: string;
  name: string;
  body: string;
  tags: string[];
  foundation?: boolean;
}

const cards: Card[] = [
  { id: baseFeatured.id, name: moduleById(baseFeatured.id).name, body: baseFeatured.body, tags: baseFeatured.tags },
  ...baseCapabilities.map((item) => ({ id: item.id, name: moduleById(item.id).name, body: item.body, tags: item.tags })),
  { id: 'foundation', name: platformFoundation.name, body: platformFoundation.body, tags: platformFoundation.points, foundation: true },
];

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The Base package as a horizontal carousel driven by vertical scroll.
 *
 * On wide screens the section pins while the visitor scrolls, and the scroll distance moves the row of
 * modules sideways; each card's miniature module screen assembles as the card slides in (its progress is
 * written to the card as `--c`). On touch-sized screens, short windows and with reduced motion, it is an
 * ordinary row the visitor can swipe or scroll, with the screens assembling as each card comes into view.
 */
export function CoreModules() {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trackEl = track.current;
    const viewportEl = viewport.current;
    const rowEl = row.current;
    if (!trackEl || !viewportEl || !rowEl) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 900px) and (min-height: 700px)');
    const items = [...rowEl.children] as HTMLElement[];
    let pinned = false;
    let distance = 0;
    let frame = 0;
    let lastIndex = -1;

    const measure = () => {
      pinned = wide.matches && !reduced.matches;
      trackEl.dataset.mode = pinned ? 'pin' : 'swipe';
      rowEl.style.transform = '';
      distance = Math.max(0, rowEl.scrollWidth - viewportEl.clientWidth);
      // The pinned track is exactly as tall as the sideways distance plus one screen.
      trackEl.style.height = pinned ? `${window.innerHeight + distance}px` : '';
    };

    const update = () => {
      frame = 0;
      let offset: number;
      let progress: number;
      if (pinned) {
        const rect = trackEl.getBoundingClientRect();
        const span = rect.height - window.innerHeight;
        progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
        offset = progress * distance;
        rowEl.style.transform = `translate3d(${(-offset).toFixed(1)}px, 0, 0)`;
      } else {
        offset = viewportEl.scrollLeft;
        progress = distance > 0 ? offset / distance : 0;
      }

      // Each card builds from the moment it enters on the right until it is well inside the view.
      const width = viewportEl.clientWidth;
      let index = 0;
      items.forEach((item, i) => {
        const left = item.offsetLeft - offset;
        const c = reduced.matches ? 1 : Math.min(1, Math.max(0, (width - left) / (width * 0.55)));
        item.style.setProperty('--c', c.toFixed(3));
        if (left < width * 0.5) index = i;
      });

      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.04, progress)})`;
      if (count.current && index !== lastIndex) {
        lastIndex = index;
        count.current.textContent = pad(index + 1);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      update();
    };

    remeasure();
    window.addEventListener('scroll', schedule, { passive: true });
    viewportEl.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', remeasure);
    wide.addEventListener('change', remeasure);
    reduced.addEventListener('change', remeasure);
    // Fonts settling can change card widths after the first measure.
    document.fonts?.ready.then(remeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      viewportEl.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', remeasure);
      wide.removeEventListener('change', remeasure);
      reduced.removeEventListener('change', remeasure);
    };
  }, []);

  return (
    <section id="modules" className="core" aria-labelledby="core-title">
      <div ref={track} className="core__track" data-mode="swipe">
        <div className="core__pin">
          <div className="page core__head">
            <div className="core__intro">
              <h2 id="core-title" className="h2">
                {core.title}
              </h2>
              <p className="lead">{core.lead}</p>
            </div>
            <div className="core__progress" aria-hidden="true">
              <span className="core__count num">
                <span ref={count}>01</span> / {pad(cards.length)}
              </span>
              <span className="core__bar">
                <span ref={bar} />
              </span>
              <span className="core__hint">Scroll to move through the modules</span>
            </div>
          </div>

          <div ref={viewport} className="core__viewport" tabIndex={0} role="region" aria-label="Base modules">
            <ol ref={row} className="core__row" aria-label={`${cards.length} base modules`}>
              {cards.map((card, index) => (
                <li key={card.id} className="core__card" data-foundation={card.foundation || undefined}>
                  <div className="core__figure">
                    <ModuleScreen id={card.id} />
                  </div>
                  <p className="core__num num" aria-hidden="true">
                    {pad(index + 1)}
                  </p>
                  <h3 className="h3">{card.name}</h3>
                  <p>{card.body}</p>
                  <ul className="core__tags">
                    {card.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
