import { byPack, type Pack } from '../data/modules';
import { CX, H, VIEW_H, W, face, left, plates, right, tiles } from './plates';
import './package-plate.css';
import '../sections/platform-intro.css';

/**
 * The platform diagram with one package lifted: the same isometric plates as the homepage (blocks/plates.ts), the
 * chosen tier in its colour and the others faded back, so a package page shows where it sits. With no tier all
 * three show, as on the platform overview. Decorative: the page's text carries the meaning.
 */
export function PackagePlate({ tier }: { tier?: Pack }) {
  return (
    <figure className="pplate" aria-hidden="true">
      <svg className="intro__svg pplate__svg" viewBox={`0 0 400 ${VIEW_H}`}>
        <defs>
          <linearGradient id="pplate-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7a36fb" />
            <stop offset="0.5" stopColor="#0a48fd" />
            <stop offset="1" stopColor="#03c8fd" />
          </linearGradient>
          <linearGradient id="pplate-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#edf0fb" />
          </linearGradient>
          <radialGradient id="pplate-glow">
            <stop offset="0" stopColor="#0a48fd" stopOpacity="0.28" />
            <stop offset="1" stopColor="#0a48fd" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={CX} cy={plates[3].y + 40} rx={W + 30} ry={H + 10} fill="url(#pplate-glow)" />
        {[...plates].reverse().map((plate) => {
          const isData = plate.key === 'data';
          const count = isData ? 0 : Math.min(5, plate.key === 'portal' ? 4 : byPack(plate.key as Pack).length);
          const lift = tier && plate.key === tier;
          return (
            <g
              key={plate.key}
              className="intro__plate pplate__plate"
              data-tier={plate.key}
              data-hot={lift || undefined}
              data-dim={tier && !lift ? '' : undefined}
            >
              <polygon points={left(plate.y)} className="intro__side intro__side--l" />
              <polygon points={right(plate.y)} className="intro__side intro__side--r" />
              <polygon points={face(plate.y)} fill={isData ? 'url(#pplate-brand)' : 'url(#pplate-top)'} className="intro__face" />
              {tiles(plate.y, count).map((points, i) => (
                <polygon key={i} points={points} className="intro__tile" />
              ))}
              {isData && (
                <g className="intro__grid-lines">
                  {[-0.5, 0, 0.5].map((k) => (
                    <line key={`a${k}`} x1={CX - W / 2 + k * W} y1={plate.y - H / 2 + k * H} x2={CX + W / 2 + k * W} y2={plate.y + H / 2 + k * H} />
                  ))}
                  {[-0.5, 0, 0.5].map((k) => (
                    <line key={`b${k}`} x1={CX + W / 2 + k * W} y1={plate.y - H / 2 - k * H} x2={CX - W / 2 + k * W} y2={plate.y + H / 2 - k * H} />
                  ))}
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
