/*
 * One scroll loop for the whole page.
 *
 * Each tracked element gets its scroll progress written to the CSS custom property `--p` (0..1), and CSS turns
 * that into transforms and opacity. Nothing here touches layout: one passive listener, one rAF, one rect read
 * per on-screen element per frame.
 *
 *   pin   progress through a tall track whose child is position: sticky (0 when it pins, 1 when it releases)
 *   exit  progress of the element leaving through the top of the viewport
 */
export type ScrollMode = 'pin' | 'exit';

interface Tracked {
  el: HTMLElement;
  mode: ScrollMode;
  onProgress?: (p: number) => void;
  visible: boolean;
  last: number;
}

const tracked = new Set<Tracked>();
let frame = 0;
let observer: IntersectionObserver | null = null;

function measure(t: Tracked) {
  const rect = t.el.getBoundingClientRect();
  const span = t.mode === 'pin' ? rect.height - window.innerHeight : rect.height;
  const raw = span > 0 ? -rect.top / span : 0;
  const p = Math.round(Math.min(1, Math.max(0, raw)) * 1000) / 1000;
  if (p === t.last) return;
  t.last = p;
  t.el.style.setProperty('--p', String(p));
  t.onProgress?.(p);
}

function tick() {
  frame = 0;
  tracked.forEach((t) => {
    if (t.visible) measure(t);
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function getObserver() {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      tracked.forEach((t) => {
        if (t.el !== entry.target) return;
        t.visible = entry.isIntersecting;
        // One last read on the way out, so progress settles at exactly 0 or 1.
        measure(t);
      });
    }
  });
  return observer;
}

export function track(el: HTMLElement, mode: ScrollMode, onProgress?: (p: number) => void) {
  const t: Tracked = { el, mode, onProgress, visible: false, last: -1 };
  if (tracked.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }
  tracked.add(t);
  getObserver().observe(el);
  measure(t);

  return () => {
    tracked.delete(t);
    observer?.unobserve(el);
    if (tracked.size === 0) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    }
  };
}
