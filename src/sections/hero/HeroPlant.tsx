import { useEffect, useRef } from 'react';
import { drawPlant, FPS, H, N, W } from './plant.gen.js';
import poster from '../../assets/hero/plant.webp';
import { hero } from '../../data/home';

/**
 * The hero art: an isometric plant drawn by anidoodle (source art/src/canvas-core/heroPlant.ts, brief in
 * art/brief.md, compiled to plant.gen.js by `npm run hero:art`).
 * One order tote rides the conveyor through every station, each wired to the data core. The same pure
 * drawPlant(frame) runs here on a transparent canvas over the hero's own background, sized to the device's
 * pixels. Frame 0 is also a prerendered image: it shows before the script runs, without JavaScript, and on its
 * own for visitors who ask for reduced motion. The loop pauses while the hero is off screen or the tab hidden.
 */
export function HeroPlant() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0, visible = true, start = 0, frame = -1;
    const env = { W, H, scale: 1 };

    const size = () => {
      const r = el.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      el.width = Math.max(1, Math.round(r.width * dpr));
      el.height = Math.max(1, Math.round(r.height * dpr));
      env.scale = el.width / W;
      frame = -1;
    };
    const tick = (now: number) => {
      if (!start) start = now;
      const f = Math.floor(((now - start) / 1000) * FPS) % N;
      if (f !== frame) {
        frame = f;
        drawPlant(ctx, f, env);
        el.dataset.live = '';
      }
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(tick);
    };

    size();
    const resize = new ResizeObserver(() => size());
    resize.observe(el);
    const seen = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; run(); });
    seen.observe(el);
    document.addEventListener('visibilitychange', run);
    run();
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      seen.disconnect();
      document.removeEventListener('visibilitychange', run);
    };
  }, []);

  return (
    <div className="plant">
      {/* lowercase: React 18 passes fetchpriority through only as a plain attribute */}
      <img className="plant__poster" src={poster} alt={hero.art} width={W} height={H} {...{ fetchpriority: 'high' }} />
      <canvas ref={canvas} className="plant__canvas" aria-hidden="true" />
    </div>
  );
}
