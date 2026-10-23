import { useRef, useState } from 'react';
import { Icon } from '../components/Icon';
import { byPack, packs, type Pack } from '../data/modules';
import { intro } from '../data/home';
import { vars } from '../motion/hooks';
import './platform-intro.css';

/*
 * What a Super ERP is, as a structure rather than a scene: three tiers of modules, exploded upward from one
 * foundation of shared business data. Drawn as an isometric SVG; the labels are HTML beside it. Each tier's
 * label is a link to its package in Explore the platform; hovering or focusing it lifts the matching plate,
 * and clicking a plate follows the same link.
 */
const CX = 196; // centre of the plates
const W = 172; // half-width of a plate's top face
const H = 86; // half-height (2:1 isometric)
const T = 14; // plate thickness
const GAP = 104; // vertical distance between plates
const TOP_Y = 110;

const plates: { key: Pack | 'data'; y: number }[] = [
  { key: 'premium', y: TOP_Y },
  { key: 'portal', y: TOP_Y + GAP },
  { key: 'base', y: TOP_Y + GAP * 2 },
  { key: 'data', y: TOP_Y + GAP * 3 },
];
const VIEW_H = TOP_Y + GAP * 3 + H + T + 30;

const face = (y: number) => `${CX},${y - H} ${CX + W},${y} ${CX},${y + H} ${CX - W},${y}`;
const left = (y: number) => `${CX - W},${y} ${CX},${y + H} ${CX},${y + H + T} ${CX - W},${y + T}`;
const right = (y: number) => `${CX},${y + H} ${CX + W},${y} ${CX + W},${y + T} ${CX},${y + H + T}`;

/** Small module tiles printed on the front half of a plate: one per module, up to the five that fit. */
function tiles(y: number, count: number) {
  const tw = 17;
  const th = 8.5;
  const step = 37;
  const row = y + 40;
  const x0 = CX - ((count - 1) * step) / 2;
  return Array.from({ length: count }, (_, i) => {
    const x = x0 + i * step;
    return `${x},${row - th} ${x + tw},${row} ${x},${row + th} ${x - tw},${row}`;
  });
}

const isPack = (tier: string): tier is Pack => tier in packs;

export function PlatformIntro() {
  const layers = [...intro.layers, { tier: 'data', ...intro.foundation }];
  const [hot, setHot] = useState<string | null>(null);
  const links = useRef<Partial<Record<Pack, HTMLAnchorElement | null>>>({});

  return (
    <section id="platform" className="section intro" aria-labelledby="intro-title">
      <div className="page intro__grid">
        <header className="intro__copy" data-reveal>
          <h2 id="intro-title" className="h2">
            {intro.title} <span className="soft">{intro.titleSoft}</span>
          </h2>
          <p className="lead">{intro.lead}</p>
        </header>

        <figure className="intro__figure" data-reveal style={vars({ '--i': 1 })}>
          <svg className="intro__svg" viewBox={`0 0 400 ${VIEW_H}`} aria-hidden="true">
            <defs>
              <linearGradient id="intro-brand" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7a36fb" />
                <stop offset="0.5" stopColor="#0a48fd" />
                <stop offset="1" stopColor="#03c8fd" />
              </linearGradient>
              <linearGradient id="intro-top" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#edf0fb" />
              </linearGradient>
              <radialGradient id="intro-glow">
                <stop offset="0" stopColor="#0a48fd" stopOpacity="0.28" />
                <stop offset="1" stopColor="#0a48fd" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse cx={CX} cy={plates[3].y + 40} rx={W + 30} ry={H + 10} fill="url(#intro-glow)" />

            {/* Bottom to top, so each plate overlaps the one beneath it. */}
            {[...plates].reverse().map((plate) => {
              const isData = plate.key === 'data';
              const count = isData ? 0 : Math.min(5, plate.key === 'portal' ? 4 : byPack(plate.key as Pack).length);
              return (
                <g
                  key={plate.key}
                  className="intro__plate"
                  data-tier={plate.key}
                  data-hot={hot === plate.key || undefined}
                  onPointerEnter={isData ? undefined : () => setHot(plate.key)}
                  onPointerLeave={isData ? undefined : () => setHot(null)}
                  onClick={isData ? undefined : () => links.current[plate.key as Pack]?.click()}
                >
                  <polygon points={left(plate.y)} className="intro__side intro__side--l" />
                  <polygon points={right(plate.y)} className="intro__side intro__side--r" />
                  <polygon points={face(plate.y)} fill={isData ? 'url(#intro-brand)' : 'url(#intro-top)'} className="intro__face" />
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

            {/* Data rising between the tiers: connectors from each plate's front edge to the plate beneath. */}
            <g className="intro__flow" data-live>
              {plates.slice(0, -1).map((plate, g) =>
                [-0.55, 0, 0.55].map((k, i) => {
                  const x = CX + k * W;
                  const top = plate.y + H * (1 - Math.abs(k)) + T;
                  const bottom = plates[g + 1].y + H * (1 - Math.abs(k));
                  return (
                    <g key={`${g}${k}`}>
                      <line x1={x} y1={top} x2={x} y2={bottom} />
                      <circle
                        cx={x}
                        cy={bottom}
                        r="3"
                        style={vars({ '--len': bottom - top, '--d': `${-(g * 0.9 + i * 0.6)}s` })}
                      />
                    </g>
                  );
                }),
              )}
            </g>

            {plates.map((plate) => (
              <line key={plate.key} className="intro__leader" x1={CX + W + 8} y1={plate.y + 6} x2={392} y2={plate.y + 6} />
            ))}
          </svg>

          <ol className="intro__labels">
            {layers.map((layer, i) => (
              <li
                key={layer.tier}
                data-tier={layer.tier}
                data-hot={hot === layer.tier || undefined}
                style={vars({ '--y': `${((plates[i].y + 6) / VIEW_H) * 100}%` })}
              >
                {isPack(layer.tier) ? (
                  <a
                    href={packs[layer.tier].href}
                    ref={(el) => {
                      links.current[layer.tier as Pack] = el;
                    }}
                    onPointerEnter={() => setHot(layer.tier)}
                    onPointerLeave={() => setHot(null)}
                    onFocus={() => setHot(layer.tier)}
                    onBlur={() => setHot(null)}
                  >
                    <b>
                      {layer.name}
                      <Icon name="arrow" size={14} className="intro__arrow" />
                    </b>
                    <span>{layer.body}</span>
                  </a>
                ) : (
                  <>
                    <b>{layer.name}</b>
                    <span>{layer.body}</span>
                  </>
                )}
              </li>
            ))}
          </ol>
          <figcaption className="sr-only">
            The MAVRO platform in layers: premium modules, portals and base modules, all built on one shared platform.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
