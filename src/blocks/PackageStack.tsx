import { useState } from 'react';
import { Icon, type IconName } from '../components/Icon';
import type { Pack } from '../data/modules';
import { CX, H, VIEW_H, W, face, left, plates, right, tiles } from './plates';
import './package-stack.css';
import '../sections/platform-intro.css';

export interface StackTier {
  tier: Pack;
  name: string;
  blurb: string;
  count: string;
  icon: IconName;
  /** How many module tiles the plate prints (up to five). */
  tiles: number;
  href: string | null;
}

interface PackageStackProps {
  tiers: readonly StackTier[];
  /** The shared foundation under the three packages. */
  foundation: { name: string; body: string };
  /** On a package page: its tier, lifted and marked. */
  current?: Pack;
  here?: string;
  /** Link text before the package name, e.g. "See". */
  go: string;
}

/**
 * How the packages combine, as one drawing: the platform plates on the left (blocks/plates.ts, the homepage
 * geometry) and each package's card level with its own plate, joined by a leader line, the shared foundation under
 * them. Pointing at a card lifts its plate; on a package page that package is lifted from the start and marked.
 * Below 1024px the drawing sits above the cards.
 */
export function PackageStack({ tiers, foundation, current, here, go }: PackageStackProps) {
  const [hot, setHot] = useState<Pack | null>(null);
  const lifted = hot ?? current ?? null;
  const byTier = Object.fromEntries(tiers.map((t) => [t.tier, t])) as Record<Pack, StackTier>;

  return (
    <div className="pstack" data-reveal>
      <svg className="pstack__svg" viewBox={`0 0 400 ${VIEW_H}`} aria-hidden="true">
        <defs>
          <linearGradient id="pstack-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7a36fb" />
            <stop offset="0.5" stopColor="#0a48fd" />
            <stop offset="1" stopColor="#03c8fd" />
          </linearGradient>
          <linearGradient id="pstack-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#edf0fb" />
          </linearGradient>
          <radialGradient id="pstack-glow">
            <stop offset="0" stopColor="#0a48fd" stopOpacity="0.28" />
            <stop offset="1" stopColor="#0a48fd" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={CX} cy={plates[3].y + 40} rx={W + 30} ry={H + 10} fill="url(#pstack-glow)" />
        {[...plates].reverse().map((plate) => {
          const isData = plate.key === 'data';
          const count = isData ? 0 : Math.min(5, byTier[plate.key as Pack]?.tiles ?? 0);
          return (
            <g
              key={plate.key}
              className="intro__plate pstack__plate"
              data-tier={plate.key}
              data-hot={(!isData && lifted === plate.key) || undefined}
            >
              <polygon points={left(plate.y)} className="intro__side intro__side--l" />
              <polygon points={right(plate.y)} className="intro__side intro__side--r" />
              <polygon points={face(plate.y)} fill={isData ? 'url(#pstack-brand)' : 'url(#pstack-top)'} className="intro__face" />
              {tiles(plate.y, count).map((points, i) => (
                <polygon key={i} points={points} className="intro__tile" />
              ))}
            </g>
          );
        })}
        {plates.map((plate) => (
          <line
            key={plate.key}
            className="pstack__leader"
            data-hot={(plate.key !== 'data' && lifted === plate.key) || undefined}
            x1={CX + W + 8}
            y1={plate.y + 6}
            x2={400}
            y2={plate.y + 6}
          />
        ))}
      </svg>

      <ol className="pstack__cards">
        {plates.map((plate) => {
          const style = { '--y': `${((plate.y + 6) / VIEW_H) * 100}%` } as React.CSSProperties;
          if (plate.key === 'data') {
            return (
              <li key="data" className="pstack__card pstack__card--data" style={style}>
                <div>
                  <span className="pstack__icon">
                    <Icon name="database" size={20} />
                  </span>
                  <b className="pstack__name">{foundation.name}</b>
                  <span className="pstack__blurb">{foundation.body}</span>
                </div>
              </li>
            );
          }
          const item = byTier[plate.key];
          const isHere = item.tier === current;
          const body = (
            <>
              <span className="pstack__icon">
                <Icon name={item.icon} size={20} />
              </span>
              <b className="pstack__name">
                {item.name}
                <span className="pstack__count num">{item.count}</span>
              </b>
              <span className="pstack__blurb">{item.blurb}</span>
              {isHere ? (
                <span className="pstack__go">{here}</span>
              ) : (
                item.href && (
                  <span className="pstack__go">
                    {go} {item.name}
                    <Icon name="arrow" size={14} />
                  </span>
                )
              )}
            </>
          );
          return (
            <li
              key={item.tier}
              className="pstack__card"
              data-tier={item.tier}
              data-here={isHere || undefined}
              data-hot={lifted === item.tier || undefined}
              style={style}
              onPointerEnter={() => setHot(item.tier)}
              onPointerLeave={() => setHot(null)}
            >
              {item.href && !isHere ? (
                <a href={item.href} onFocus={() => setHot(item.tier)} onBlur={() => setHot(null)}>
                  {body}
                </a>
              ) : (
                <div>{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
