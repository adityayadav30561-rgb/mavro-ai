/*
 * The hero scene's layout, shared by the WebGL scene (scene.ts) and the HTML labels (HeroScene.tsx). Kept free
 * of three.js so the page can render the labels before the 3D code has loaded.
 *
 * Six module nodes stand on an ellipse around the platform core. `angle` is measured in degrees around the
 * vertical axis from the front (0, toward the viewer); negative is left. Accents follow the sweep of the logo's
 * M: violet on the left, blue across the middle, cyan on the right.
 *
 * `at` is where the label is anchored (in % of the stage; its bottom edge, or its top edge for labels below a
 * module) when the scene is at rest. It is only used before the scene starts, or if WebGL is unavailable; once
 * running, the scene positions labels from the 3D nodes themselves. The stage keeps a fixed aspect ratio
 * (1.12, in hero.css) so these stay true at every width.
 */
export type NodeKind = 'inventory' | 'procurement' | 'production' | 'quality' | 'logistics' | 'finance';
export type Accent = 'violet' | 'blue' | 'cyan';

export interface SceneNode {
  kind: NodeKind;
  label: string;
  angle: number;
  accent: Accent;
  at: [number, number];
}

export const sceneNodes: SceneNode[] = [
  { kind: 'finance', label: 'Accounting', angle: -42, accent: 'violet', at: [15, 73] },
  { kind: 'inventory', label: 'Inventory', angle: -98, accent: 'violet', at: [8.5, 37.5] },
  { kind: 'procurement', label: 'Procure to Pay', angle: -152, accent: 'blue', at: [33, 28.5] },
  { kind: 'production', label: 'Production', angle: 152, accent: 'blue', at: [68.3, 28.8] },
  { kind: 'quality', label: 'Audit', angle: 98, accent: 'cyan', at: [92.4, 37] },
  { kind: 'logistics', label: 'Transport', angle: 42, accent: 'cyan', at: [83, 74] },
];

/** Modules toward the front carry their label beneath them, so it never covers a module behind. */
export const labelBelow = (node: SceneNode) => Math.abs(node.angle) < 60;
