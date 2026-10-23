import { useEffect, useRef, useState } from 'react';
import { vars } from '../../motion/hooks';
import { labelBelow, sceneNodes } from './nodes';
import { HeroPanels } from './HeroPanels';
import type { SceneHandle } from './scene';

type State = 'waiting' | 'live' | 'fallback';

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * The hero stage: the 3D platform scene, its HTML labels and the floating interface panels.
 *
 * The page renders without it: until the scene has drawn its first frame (and permanently if WebGL is missing)
 * a lightweight CSS rendition of the same composition stands in, with the labels at their resting positions.
 * The three.js code is fetched after the page is idle, so it never competes with the headline.
 */
export function HeroScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<(HTMLLIElement | null)[]>([]);
  const [state, setState] = useState<State>('waiting');

  useEffect(() => {
    if (!canvas.current) return;
    if (!webglAvailable()) {
      setState('fallback');
      return;
    }

    let handle: SceneHandle | undefined;
    let cancelled = false;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lite = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;

    const load = () =>
      import('./scene')
        .then(({ createScene }) => {
          if (cancelled || !canvas.current) return;
          handle = createScene({
            canvas: canvas.current,
            labels: labels.current.filter((el): el is HTMLLIElement => el !== null),
            still,
            lite,
            onReady: () => setState('live'),
          });
        })
        .catch(() => setState('fallback'));

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 900 })
      : window.setTimeout(load, 200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      handle?.dispose();
    };
  }, []);

  return (
    <div
      className="scene"
      data-state={state}
      role="img"
      aria-label="Illustration of the MAVRO platform: a central platform core connected to accounting, inventory, procure to pay, production, audit and transport modules, with sample order, production and inspection panels."
    >
      <div className="scene__fallback" aria-hidden="true">
        <span className="scene__floor" />
        <span className="scene__core">
          <span />
          <span />
          <span />
        </span>
        {sceneNodes.map((node) => (
          <span
            key={node.kind}
            className="scene__dot"
            data-below={labelBelow(node) || undefined}
            data-accent={node.accent}
            style={vars({ '--x': `${node.at[0]}%`, '--y': `${node.at[1]}%` })}
          />
        ))}
      </div>

      <canvas ref={canvas} className="scene__canvas" aria-hidden="true" />

      <ul className="scene__labels" aria-hidden="true">
        {sceneNodes.map((node, index) => (
          <li
            key={node.kind}
            ref={(el) => {
              labels.current[index] = el;
            }}
            data-accent={node.accent}
            data-below={labelBelow(node) || undefined}
            style={vars({ '--x': `${node.at[0]}%`, '--y': `${node.at[1]}%` })}
          >
            {node.label}
          </li>
        ))}
      </ul>

      <HeroPanels />
    </div>
  );
}
