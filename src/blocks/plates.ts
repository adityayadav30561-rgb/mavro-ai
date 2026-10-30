import type { Pack } from '../data/modules';

/*
 * The platform diagram's geometry: three tiers of modules (Premium, Portals, Base) exploded upward from one
 * foundation of shared data, drawn as isometric plates (2:1). Shared by the homepage diagram (sections/PlatformIntro)
 * and the package plate (blocks/PackagePlate), so both stay the same drawing.
 */
export const CX = 196; // centre of the plates
export const W = 172; // half-width of a plate's top face
export const H = 86; // half-height (2:1 isometric)
export const T = 14; // plate thickness
export const GAP = 104; // vertical distance between plates
export const TOP_Y = 110;

export const plates: { key: Pack | 'data'; y: number }[] = [
  { key: 'premium', y: TOP_Y },
  { key: 'portal', y: TOP_Y + GAP },
  { key: 'base', y: TOP_Y + GAP * 2 },
  { key: 'data', y: TOP_Y + GAP * 3 },
];
export const VIEW_H = TOP_Y + GAP * 3 + H + T + 30;

export const face = (y: number) => `${CX},${y - H} ${CX + W},${y} ${CX},${y + H} ${CX - W},${y}`;
export const left = (y: number) => `${CX - W},${y} ${CX},${y + H} ${CX},${y + H + T} ${CX - W},${y + T}`;
export const right = (y: number) => `${CX},${y + H} ${CX + W},${y} ${CX + W},${y + T} ${CX},${y + H + T}`;

/** Small module tiles printed on the front half of a plate: one per module, up to the five that fit. */
export function tiles(y: number, count: number) {
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
