import { useRef, useState } from 'react';
import { Icon } from '../components/Icon';
import { byPack, packs, type Pack } from '../data/modules';
import { intro } from '../data/home';
import { hasPage } from '../links';
import { vars } from '../motion/hooks';
import { CX, H, T, VIEW_H, W, face, left, plates, right, tiles } from '../blocks/plates';
import './platform-intro.css';

/*
 * What a Super ERP is, as a structure rather than a scene: three tiers of modules, exploded upward from one
 * foundation of shared business data. Drawn as an isometric SVG; the labels are HTML beside it. Each tier's
 * label is a link to its package in Explore the platform; hovering or focusing it lifts the matching plate,
 * and clicking a plate follows the same link.
 */
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
                    href={hasPage(packs[layer.tier].page) ? packs[layer.tier].page : packs[layer.tier].href}
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
