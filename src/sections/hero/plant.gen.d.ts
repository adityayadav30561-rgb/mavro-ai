// Types for the generated hero art module (scripts/hero-art.mjs). drawPlant paints frame `frame` of the loop
// (0 <= frame < N) at env.scale device pixels per logical pixel; the art is W x H logical pixels.
export const W: number;
export const H: number;
export const FPS: number;
export const N: number;
export function drawPlant(ctx: CanvasRenderingContext2D, frame: number, env: { W: number; H: number; scale: number }): void;
