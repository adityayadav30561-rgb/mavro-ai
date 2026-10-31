// HERO PLANT · MAVRO homepage hero. An isometric cutaway of a small works on one slab: a conveyor loop
// carries ONE order tote (the brand blue, the only accent) through the order desk, the production press,
// the warehouse racks, the dispatch truck and the ledger desk, and every station is wired to one data
// core in the middle. The idea: one order, carried through every department on one shared record.
//
// MEDIUM: flat vector planes on a true 2:1 isometric grid (isometricKit): every plane one flat colour,
// three tones per material by the cube rule (top lightest, +y face middle, +x face darkest), no contour
// line, no gradient. Cast shadows are single flat shapes thrown lower right (daylight from upper left).
// MOTION: only what the plant does. The belt runs while the tote travels and stops while it dwells; each
// station acts once per visit (slip printed, press strikes, carton lowered, carton loaded, ledger
// stamped) and sends one data pulse down its cable to the core, whose lamp answers. One circuit is the
// loop (300 frames, 10 s), so the last frame meets frame 0. Frame 0 is the reduced-motion still: the
// tote has just left the press with its part, the ram is rising, a pulse is on its way to the core.
// BACKGROUND: none. The page has its own; the art brings only its slab and the slab's shadow.
// REALISM (from knowledge): a roller-bed belt conveyor on legs with side rails; a C-frame press with its
// ram over the belt; selective pallet racking (uprights, beams, cartons); a box truck at a short chute;
// a counter with a ledger and a hand stamp; an order kiosk with a slip printer.
import type { Ctx, Env } from "./core";
import type { Film } from "./film";
import { Iso, Mat, P3 } from "./isometricKit";

export const W = 1344, H = 1200, FPS = 30, N = 300;

// ---------- palette (light day, cool neutrals so the blue tote carries the eye)
const mat = (top: string, left: string, right: string): Mat => ({ top, left, right });
const C = {
  slab: mat("#f2f4fa", "#dde1ec", "#c9cfdf"),
  steel: mat("#c3c9d8", "#a3aac0", "#8890a8"),
  rail: mat("#dfe3ee", "#b8bfd1", "#9ea6bd"),
  rubber: mat("#41485f", "#353b4f", "#2b3042"),
  shell: mat("#fbfcff", "#e7eaf3", "#d2d7e5"),
  wall: mat("#cfd5e3", "#eef1f7", "#e1e5ef"),
  navy: mat("#2b3561", "#20284c", "#18203e"),
  glass: mat("#9fe9ff", "#6fd5f5", "#4fbfe3"),
  tote: mat("#3d6cff", "#0a48fd", "#0838d6"),
  kraft: mat("#e3bf8a", "#c99f66", "#ad8550"),
  metal: mat("#cfd5e2", "#aab2c6", "#8e97ae"),
  wood: mat("#d9b98f", "#bf9b6e", "#a5835a"),
  paper: mat("#ffffff", "#eef0f6", "#dfe2ec"),
  tierB: mat("#7f9cff", "#5a7cf2", "#4a69d8"),
  tierC: mat("#9fe9ff", "#5fd3f3", "#3fb8dc"),
  tierV: mat("#c3a6ff", "#a07cf0", "#8862db"),
};
const SHADOW = "#1b2350", PULSE = "#03c8fd", LAMP = "#03c8fd";

// ---------- one model drives everything: the tote's place on the loop and every station's action
// the loop's centreline: P4 (3,11) -> P1 (3,3) -> P2 (13,3) -> P3 (13,11) -> back to P4; s in [0, 36)
const loopAt = (s: number): [number, number] => {
  s = ((s % 36) + 36) % 36;
  if (s < 8) return [3, 11 - s];
  if (s < 18) return [3 + (s - 8), 3];
  if (s < 26) return [13, 3 + (s - 18)];
  return [13 - (s - 26), 11];
};
// stops along the loop, in visiting order; each dwell is DWELL frames, travel shares the rest by distance
const STOPS = [
  { id: "order", s: 0 },
  { id: "press", s: 4 },
  { id: "rack", s: 13 },
  { id: "truck", s: 22 },
  { id: "ledger", s: 31 },
] as const;
type StopId = (typeof STOPS)[number]["id"];
const DWELL = 27, TRAVEL = N - DWELL * STOPS.length, PER_UNIT = TRAVEL / 36;
const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
// frame 0 sits just after the press: the loop starts there so the still is the strongest moment
const OFFSET = DWELL * 2 + 4 * PER_UNIT - 6;

type State = { s: number; moving: boolean; at: StopId | null; d: number; carry: "none" | "slip" | "part" | "carton"; belt: number };
const stateAt = (frame: number): State => {
  let t = (((frame + OFFSET) % N) + N) % N;
  for (let i = 0; i < STOPS.length; i++) {
    const a = STOPS[i], b = STOPS[(i + 1) % STOPS.length], dist = (((b.s - a.s) % 36) + 36) % 36, travel = dist * PER_UNIT;
    // what the tote holds after each station's act
    const after: Record<StopId, State["carry"]> = { order: "slip", press: "part", rack: "carton", truck: "none", ledger: "none" };
    const before: Record<StopId, State["carry"]> = { order: "none", press: "slip", rack: "part", truck: "carton", ledger: "none" };
    if (t < DWELL) {
      const d = t / DWELL;
      return { s: a.s, moving: false, at: a.id, d, carry: d < 0.5 ? before[a.id] : after[a.id], belt: beltAt(i, 0) };
    }
    t -= DWELL;
    if (t < travel) {
      const k = smooth(t / travel);
      return { s: a.s + dist * k, moving: true, at: null, d: 0, carry: after[a.id], belt: beltAt(i, dist * k) };
    }
    t -= travel;
  }
  return { s: 0, moving: false, at: "order", d: 0, carry: "none", belt: 0 };
};
// the belt's travel so far this circuit (slats move only while the tote rides)
const beltAt = (i: number, extra: number) => {
  let s = 0;
  for (let k = 0; k < i; k++) { const a = STOPS[k], b = STOPS[(k + 1) % STOPS.length]; s += (((b.s - a.s) % 36) + 36) % 36; }
  return s + extra;
};
// the frame (in loop time) at which each station's act lands: its dwell midpoint
const actFrame = (() => {
  const out: Record<string, number> = {};
  let t = 0;
  STOPS.forEach((a, i) => {
    const b = STOPS[(i + 1) % STOPS.length];
    out[a.id] = t + DWELL / 2;
    t += DWELL + ((((b.s - a.s) % 36) + 36) % 36) * PER_UNIT;
  });
  return out;
})();
const loopTime = (frame: number) => (((frame + OFFSET) % N) + N) % N;
// how far a pulse launched at the act has travelled along its cable (0..1), or -1 when none is out
const PULSE_LEN = 34, IDLE_LEN = 48;
const pulseAt = (frame: number, id: StopId) => {
  let dt = loopTime(frame) - actFrame[id];
  if (dt < 0) dt += N;
  return dt <= PULSE_LEN ? dt / PULSE_LEN : -1;
};

// ---------- drawing helpers
type Box = [number, number, number, number, number, number];
const drawBox = (iso: Iso, [x0, y0, z0, x1, y1, z1]: Box, m: Mat) => iso.boxFaces(x0, y0, z0, x1, y1, z1, m).forEach((f) => iso.poly(f.pts, f.fill));
// a flat cast shadow on the plane z = zf: the footprint and its copy thrown lower right, as one hull
const hull = (pts: [number, number][]) => {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = [], up: [number, number][] = [];
  for (const q of p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of [...p].reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
};
const shadow = (iso: Iso, [x0, y0, z0, x1, y1, z1]: Box, zf = 0, alpha = 0.1) => {
  const h = z1 - zf, dx = h * 0.62, dy = h * 0.12;
  const foot: [number, number][] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const pts = hull([...foot, ...foot.map(([x, y]) => [x + dx, y + dy] as [number, number])]);
  void z0;
  iso.face(pts.map(([x, y]) => [x, y, zf] as P3), SHADOW, alpha);
};
const strip = (iso: Iso, a: [number, number], b: [number, number], w: number, z: number, fill: string, alpha = 1) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = (-dy / L) * w / 2, ny = (dx / L) * w / 2;
  iso.face([[a[0] + nx, a[1] + ny, z], [b[0] + nx, b[1] + ny, z], [b[0] - nx, b[1] - ny, z], [a[0] - nx, a[1] - ny, z]], fill, alpha);
};

// ---------- the parts
const BELT_Z = 0.8, TOTE = 0.9, TOTE_H = 0.46;
const belts: { box: Box; dir: "x" | "y" }[] = [
  { box: [2.4, 2.4, 0.5, 3.6, 11.6, BELT_Z], dir: "y" },     // left
  { box: [3.6, 2.4, 0.5, 13.6, 3.6, BELT_Z], dir: "x" },     // back
  { box: [12.4, 3.6, 0.5, 13.6, 11.6, BELT_Z], dir: "y" },   // right
  { box: [3.6, 10.4, 0.5, 12.4, 11.6, BELT_Z], dir: "x" },   // front
];
const drawBelt = (iso: Iso, b: { box: Box; dir: "x" | "y" }, travel: number) => {
  const [x0, y0, z0, x1, y1, z1] = b.box;
  // legs every two units, then the frame, the rubber top, slats, the two side lips
  const len = b.dir === "y" ? y1 - y0 : x1 - x0;
  for (let k = 0.6; k < len; k += 2) {
    const lx = b.dir === "y" ? x0 + 0.15 : x0 + k, ly = b.dir === "y" ? y0 + k : y0 + 0.15;
    const lx2 = b.dir === "y" ? x1 - 0.3 : x0 + k, ly2 = b.dir === "y" ? y0 + k : y1 - 0.3;
    drawBox(iso, [lx, ly, 0, lx + 0.15, ly + 0.15, z0], C.navy);
    drawBox(iso, [lx2, ly2, 0, lx2 + 0.15, ly2 + 0.15, z0], C.navy);
  }
  iso.boxFaces(x0, y0, z0, x1, y1, z1, C.rail).forEach((f, i) => i < 2 && iso.poly(f.pts, f.fill));
  iso.face([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], C.rubber.top);
  // slats move with the belt: one every 0.5 units along the run
  const off = (travel * (b.dir === "y" ? -1 : 1)) % 0.5;
  for (let k = (off + 0.5) % 0.5; k < len; k += 0.5) {
    if (b.dir === "y") iso.line(iso.p(x0 + 0.18, y0 + k, z1), iso.p(x1 - 0.18, y0 + k, z1), C.rubber.right, 1.2);
    else iso.line(iso.p(x0 + k, y0 + 0.18, z1), iso.p(x0 + k, y1 - 0.18, z1), C.rubber.right, 1.2);
  }
  // side lips: thin steel strips along both long edges
  if (b.dir === "y") { drawBox(iso, [x0, y0, z1, x0 + 0.12, y1, z1 + 0.08], C.rail); drawBox(iso, [x1 - 0.12, y0, z1, x1, y1, z1 + 0.08], C.rail); }
  else { drawBox(iso, [x0, y0, z1, x1, y0 + 0.12, z1 + 0.08], C.rail); drawBox(iso, [x0, y1 - 0.12, z1, x1, y1, z1 + 0.08], C.rail); }
};

const drawTote = (iso: Iso, st: State) => {
  const [cx, cy] = loopAt(st.s), h = TOTE / 2, z0 = BELT_Z + 0.08;
  shadow(iso, [cx - h, cy - h, z0, cx + h, cy + h, z0 + TOTE_H], z0, 0.16);
  drawBox(iso, [cx - h, cy - h, z0, cx + h, cy + h, z0 + TOTE_H], C.tote);
  // the open top: a darker well inside the rim
  const r = 0.09;
  iso.face([[cx - h + r, cy - h + r, z0 + TOTE_H], [cx + h - r, cy - h + r, z0 + TOTE_H], [cx + h - r, cy + h - r, z0 + TOTE_H], [cx - h + r, cy + h - r, z0 + TOTE_H]], "#0a2fa8");
  const top = z0 + TOTE_H;
  if (st.carry === "slip") iso.face([[cx - 0.22, cy - 0.28, top + 0.01], [cx + 0.22, cy - 0.28, top + 0.01], [cx + 0.22, cy + 0.28, top + 0.01], [cx - 0.22, cy + 0.28, top + 0.01]], "#ffffff");
  if (st.carry === "part") { drawBox(iso, [cx - 0.24, cy - 0.24, top - 0.2, cx + 0.24, cy + 0.24, top + 0.14], C.metal); drawBox(iso, [cx - 0.08, cy - 0.08, top + 0.14, cx + 0.08, cy + 0.08, top + 0.24], C.steel); }
  if (st.carry === "carton") drawCarton(iso, cx, cy, top - 0.25);
};
const drawCarton = (iso: Iso, cx: number, cy: number, z: number) => {
  drawBox(iso, [cx - 0.36, cy - 0.36, z, cx + 0.36, cy + 0.36, z + 0.62], C.kraft);
  // the tape seam across the lid, a single darker band
  iso.face([[cx - 0.36, cy - 0.06, z + 0.62], [cx + 0.36, cy - 0.06, z + 0.62], [cx + 0.36, cy + 0.06, z + 0.62], [cx - 0.36, cy + 0.06, z + 0.62]], C.kraft.right);
};

// the press: a C-frame on the left of the left belt, its ram over the belt at y 7
const drawPressBody = (iso: Iso) => {
  shadow(iso, [0.6, 6.0, 0, 2.3, 8.0, 2.9]);
  drawBox(iso, [0.6, 6.0, 0, 2.3, 8.0, 1.2], C.shell);          // base cabinet
  drawBox(iso, [0.9, 6.3, 1.2, 1.9, 7.7, 2.9], C.shell);        // column
  drawBox(iso, [1.0, 7.7, 0.35, 1.9, 7.72, 0.95], C.navy);      // control panel on the +y face
  iso.face([[1.12, 7.72, 0.78], [1.32, 7.72, 0.78], [1.32, 7.72, 0.88], [1.12, 7.72, 0.88]], LAMP);
};
const drawPressHead = (iso: Iso, frame: number, st: State) => {
  // the ram falls and rises once per visit: down by mid-dwell, back up after
  let drop = 0;
  if (st.at === "press") drop = Math.sin(Math.PI * Math.min(1, st.d / 0.9)) ** 2;
  const lift = 1 - drop;
  drawBox(iso, [0.9, 6.5, 2.6, 3.7, 7.5, 3.05], C.shell);       // arm over the belt
  drawBox(iso, [2.85, 6.75, 1.45 + lift * 0.95, 3.15, 7.25, 2.6], C.steel); // ram rod
  drawBox(iso, [2.6, 6.6, 1.3 + lift * 0.95, 3.4, 7.4, 1.45 + lift * 0.95], C.navy); // die
  void frame;
};

// the racks behind the back belt, a picker lowering one carton onto the tote at x 8
const drawRacks = (iso: Iso, st: State) => {
  shadow(iso, [5.4, 0.4, 0, 10.6, 1.8, 3.6], 0, 0.08);
  const ups = [5.4, 7.1, 8.9, 10.6];
  const beams = [0.25, 1.45, 2.65];
  // back uprights, beams with cartons, front uprights
  for (const x of ups) drawBox(iso, [x - 0.12, 0.4, 0, x, 0.52, 3.6], C.navy);
  beams.forEach((z, bi) => {
    drawBox(iso, [5.4, 0.4, z, 10.6, 1.8, z + 0.12], C.steel);
    for (let i = 0; i < 6; i++) {
      const x = 5.6 + i * 0.84;
      if (bi === 1 && i === 3) continue; // the slot the picker took this carton from
      if ((i + bi) % 4 === 3) continue;  // a few gaps: a working rack, not a wall
      drawBox(iso, [x, 0.7, z + 0.12, x + 0.62, 1.5, z + 0.12 + (0.5 + ((i * 7 + bi * 3) % 3) * 0.08)], C.kraft);
    }
  });
  for (const x of ups) drawBox(iso, [x - 0.12, 1.68, 0, x, 1.8, 3.6], C.navy);
  void st;
};
// the picker: a gantry from the rack to above the back belt, its carriage carrying the carton down
const drawPicker = (iso: Iso, st: State) => {
  drawBox(iso, [7.5, 0.5, 3.6, 8.5, 4.1, 3.8], C.navy);           // gantry beam over the belt
  drawBox(iso, [7.92, 3.85, 0, 8.08, 4.05, 3.6], C.navy);         // its post inside the loop
  let k = 0;                                                       // 0: carton up at the rack, 1: on the tote
  if (st.at === "rack") k = smooth(Math.min(1, st.d / 0.5));
  else if (st.carry === "carton" || st.carry === "none") k = 1;    // after this visit the carton has gone down
  const y = 1.1 + (3 - 1.1) * smooth(Math.min(1, k * 1.6));
  const zc = 2.0 + (BELT_Z + 0.08 + TOTE_H - 0.25 - 2.0) * smooth(Math.max(0, k * 1.6 - 0.6));
  // after the carton is down the carriage rises back empty; before it, it carries the carton
  const holding = st.at === "rack" && st.d < 0.5;
  // down with the carton in the first half, back up empty to its rest over the second
  const back = st.at === "rack" ? smooth(Math.max(0, (st.d - 0.55) / 0.45)) : 1;
  const carY = st.at === "rack" ? y + (1.1 - y) * back : 1.1, carZ = st.at === "rack" ? zc + 0.7 + (2.7 - zc - 0.7) * back : 2.7;
  drawBox(iso, [7.75, carY - 0.25, carZ + 0.1, 8.25, carY + 0.25, 3.6], C.steel); // carriage drop
  drawBox(iso, [7.6, carY - 0.4, carZ, 8.4, carY + 0.4, carZ + 0.1], C.navy);      // claw plate
  if (holding) drawCarton(iso, 8, carY, carZ - 0.62);
};

// the truck right of the right belt, a chute between; the carton slides in during the dwell
const drawChute = (iso: Iso) => {
  drawBox(iso, [13.6, 6.5, 0.6, 14.4, 7.5, 0.72], C.rail);
  drawBox(iso, [13.75, 6.6, 0, 13.9, 6.75, 0.6], C.navy);
  drawBox(iso, [14.1, 7.25, 0, 14.25, 7.4, 0.6], C.navy);
};
const drawLoadingCarton = (iso: Iso, st: State) => {
  if (st.at !== "truck" || st.d < 0.5) return;
  const k = smooth((st.d - 0.5) / 0.45), x = 13 + 1.6 * k, z = BELT_Z + 0.08 + TOTE_H - 0.25 - 0.1 * k;
  if (k < 1) drawCarton(iso, x, 7, z);
};
const drawTruck = (iso: Iso) => {
  shadow(iso, [14.4, 5.6, 0, 16.8, 10.0, 2.3], 0, 0.07);
  // wheels first (they sit under the body), then the cargo box, the cab and its glass
  for (const y of [6.3, 8.0, 9.4]) { drawBox(iso, [14.5, y - 0.3, 0, 14.7, y + 0.3, 0.55], C.rubber); drawBox(iso, [16.5, y - 0.3, 0, 16.7, y + 0.3, 0.55], C.rubber); }
  drawBox(iso, [14.4, 5.6, 0.42, 16.8, 8.6, 2.3], C.shell);       // cargo box
  drawBox(iso, [14.4, 8.6, 0.42, 16.8, 10.0, 1.75], C.shell);     // cab, the same white as the box
  drawBox(iso, [14.4, 8.6, 0.42, 16.8, 10.0, 0.62], C.navy);      // bumper and sills
  iso.face([[14.65, 10.0, 1.15], [16.55, 10.0, 1.15], [16.55, 10.0, 1.62], [14.65, 10.0, 1.62]], C.navy.left);   // windscreen (+y face)
  iso.face([[16.8, 8.8, 1.15], [16.8, 9.8, 1.15], [16.8, 9.8, 1.62], [16.8, 8.8, 1.62]], C.navy.right);          // side window
  // a blue band along the cargo side, kept thin
  iso.face([[16.8, 5.8, 0.95], [16.8, 8.4, 0.95], [16.8, 8.4, 1.06], [16.8, 5.8, 1.06]], C.tierB.right);
};

// the ledger counter in front of the front belt, a stamp that strikes the open book
const drawLedger = (iso: Iso, st: State) => {
  shadow(iso, [6.8, 11.9, 0, 9.6, 13.3, 1.0], 0, 0.07);
  for (const [x, y] of [[6.9, 12.0], [9.35, 12.0], [6.9, 13.05], [9.35, 13.05]] as [number, number][]) drawBox(iso, [x, y, 0, x + 0.15, y + 0.15, 0.86], C.navy);
  drawBox(iso, [6.95, 12.05, 0.3, 9.45, 12.12, 0.86], C.shell);  // modesty panel at the back
  drawBox(iso, [6.8, 11.9, 0.86, 9.6, 13.3, 1.0], C.wood);       // the top
  // the open ledger: two pages, ruled
  drawBox(iso, [7.1, 12.1, 1.0, 8.6, 13.0, 1.06], C.paper);
  iso.line(iso.p(7.85, 12.1, 1.07), iso.p(7.85, 13.0, 1.07), C.paper.right, 1.4);
  for (let r = 0; r < 5; r++) { const y = 12.25 + r * 0.15; iso.line(iso.p(7.2, y, 1.065), iso.p(7.75, y, 1.065), "#c9cfdf", 1); iso.line(iso.p(7.95, y, 1.065), iso.p(8.5, y, 1.065), "#c9cfdf", 1); }
  // the stamp's mark, laid when it strikes and kept until the next circuit's page
  const struck = st.at === "ledger" ? st.d > 0.5 : st.at === null && st.s > 31;
  if (struck) iso.face([[8.05, 12.6, 1.066], [8.4, 12.6, 1.066], [8.4, 12.85, 1.066], [8.05, 12.85, 1.066]], C.tote.left, 0.85);
  // the stamp: a handle on a block, raised, falling to the page at mid-dwell
  let drop = 0;
  if (st.at === "ledger") drop = Math.sin(Math.PI * Math.min(1, st.d / 0.9)) ** 2;
  const z = 1.06 + (1 - drop) * 0.55;
  drawBox(iso, [8.05, 12.6, z, 8.4, 12.85, z + 0.14], C.navy);
  drawBox(iso, [8.17, 12.67, z + 0.14, 8.28, 12.78, z + 0.42], C.wood);
  // the terminal beside the book, its screen on the +y face
  drawBox(iso, [8.9, 12.2, 1.0, 9.4, 12.5, 1.08], C.navy);
  drawBox(iso, [8.95, 12.3, 1.08, 9.35, 12.38, 1.7], C.navy);
  iso.face([[9.0, 12.381, 1.16], [9.3, 12.381, 1.16], [9.3, 12.381, 1.62], [9.0, 12.381, 1.62]], st.at === "ledger" && st.d > 0.5 ? C.glass.top : "#3b4a80");
};

// the order kiosk at the front-left corner, its printer dropping a slip into the tote
const drawKiosk = (iso: Iso, st: State) => {
  shadow(iso, [0.8, 11.8, 0, 2.0, 13.0, 1.9]);
  drawBox(iso, [0.8, 11.8, 0, 2.0, 13.0, 1.2], C.shell);
  drawBox(iso, [0.95, 12.0, 1.2, 1.85, 12.85, 1.9], C.navy);
  iso.face([[1.0, 12.851, 1.28], [1.8, 12.851, 1.28], [1.8, 12.851, 1.82], [1.0, 12.851, 1.82]], C.glass.left); // screen (+y face)
  // order lines on the screen: three rows, the newest lit while the order prints
  for (let r = 0; r < 3; r++) iso.line(iso.p(1.08, 12.852, 1.68 - r * 0.13), iso.p(1.08 + 0.5 - r * 0.1, 12.852, 1.68 - r * 0.13), r === 0 && st.at === "order" ? "#ffffff" : "#2b6fb0", 2);
  drawBox(iso, [2.0, 12.1, 0.95, 2.35, 12.7, 1.1], C.navy);       // printer mouth on the +x face
  if (st.at === "order" && st.d < 0.5) {
    // the slip arcs from the printer to the tote at (3, 11)
    const k = smooth(st.d / 0.5), x = 2.35 + (3 - 2.35) * k, y = 12.4 + (11 - 12.4) * k, z = 1.05 + Math.sin(Math.PI * k) * 0.5 + (BELT_Z + 0.55 - 1.05) * k;
    iso.face([[x - 0.2, y - 0.25, z], [x + 0.2, y - 0.25, z], [x + 0.2, y + 0.25, z], [x - 0.2, y + 0.25, z]], "#ffffff");
  }
};

// the data core in the middle of the loop: a navy base, three tier plates on posts, a lamp
const drawCore = (iso: Iso, frame: number) => {
  shadow(iso, [6.6, 5.6, 0, 9.4, 8.4, 2.6], 0, 0.1);
  drawBox(iso, [6.6, 5.6, 0, 9.4, 8.4, 0.45], C.navy);
  for (const [x, y] of [[6.85, 5.85], [9.0, 5.85], [6.85, 8.0], [9.0, 8.0]] as [number, number][]) drawBox(iso, [x, y, 0.45, x + 0.15, y + 0.15, 2.35], C.steel);
  [[0.85, C.tierB], [1.45, C.tierC], [2.05, C.tierV]].forEach(([z, m]) => {
    const z0 = z as number, band = m as Mat;
    drawBox(iso, [6.8, 5.8, z0, 9.2, 8.2, z0 + 0.22], C.shell);
    // the tier's colour as one thin band on the two faces we see
    iso.face([[6.8, 8.2, z0 + 0.06], [9.2, 8.2, z0 + 0.06], [9.2, 8.2, z0 + 0.13], [6.8, 8.2, z0 + 0.13]], band.left);
    iso.face([[9.2, 5.8, z0 + 0.06], [9.2, 8.2, z0 + 0.06], [9.2, 8.2, z0 + 0.13], [9.2, 5.8, z0 + 0.13]], band.right);
  });
  // the lamp answers each pulse as it arrives: lit for the last part of the pulse's run
  const lit = STOPS.some((s) => { const p = pulseAt(frame, s.id); return p > 0.8; });
  drawBox(iso, [7.75, 6.75, 2.27, 8.25, 7.25, 2.5], lit ? C.glass : C.navy);
};

// cables on the floor from each station to the core, with the pulses
const CABLES: Record<StopId, [number, number][]> = {
  order: [[2.0, 12.4], [4.4, 12.4], [4.4, 9.2], [6.6, 8.0]],
  press: [[2.3, 6.8], [6.6, 6.8]],
  rack: [[8.0, 1.8], [8.0, 5.6]],
  truck: [[14.4, 7.6], [9.4, 7.6]],
  ledger: [[8.4, 11.9], [8.4, 8.4]],
};
const along = (pts: [number, number][], t: number): [number, number] => {
  const L = pts.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0);
  let left = t * L;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (left <= l) return [a[0] + ((b[0] - a[0]) * left) / l, a[1] + ((b[1] - a[1]) * left) / l];
    left -= l;
  }
  return pts[pts.length - 1];
};
const drawCables = (iso: Iso, frame: number) => {
  for (const id of Object.keys(CABLES) as StopId[]) {
    const pts = CABLES[id];
    for (let i = 1; i < pts.length; i++) strip(iso, pts[i - 1], pts[i], 0.14, 0.005, "#b7bfd3");
    // steady traffic: every cable carries a small pulse each 60 frames (staggered per station), so data
    // is always moving to the core; the station's act sends one large pulse on top
    const j = (Object.keys(CABLES) as StopId[]).indexOf(id);
    for (let k = 0; k < N / 60; k++) {
      let dt = (((frame - j * 12 - k * 60) % N) + N) % N;
      if (dt <= IDLE_LEN) { const [x, y] = along(pts, dt / IDLE_LEN); iso.face([[x - 0.09, y - 0.09, 0.01], [x + 0.09, y - 0.09, 0.01], [x + 0.09, y + 0.09, 0.01], [x - 0.09, y + 0.09, 0.01]], PULSE, 0.75); }
    }
    const p = pulseAt(frame, id);
    if (p >= 0) { const [x, y] = along(pts, p); iso.face([[x - 0.16, y - 0.16, 0.01], [x + 0.16, y - 0.16, 0.01], [x + 0.16, y + 0.16, 0.01], [x - 0.16, y + 0.16, 0.01]], PULSE); }
  }
};

// the two back walls of the cutaway, cut at the top so their thickness shows, with strip windows
const WALL_Z = 5.2;
const drawWalls = (iso: Iso) => {
  drawBox(iso, [-0.2, -0.6, 0, 17.6, -0.2, WALL_Z], { top: C.wall.top, left: C.wall.left, right: C.wall.right }); // along y = -0.2, its +y face to us
  drawBox(iso, [-0.6, -0.6, 0, -0.2, 14.0, WALL_Z], { top: C.wall.top, left: C.wall.left, right: C.wall.right }); // along x = -0.2, its +x face to us
  // strip windows high on both walls: a reveal, then the glass, mullions every two units
  for (let x = 1.2; x + 1.8 <= 17.2; x += 2.2) {
    iso.face([[x, -0.2, 3.7], [x + 1.8, -0.2, 3.7], [x + 1.8, -0.2, 4.6], [x, -0.2, 4.6]], C.glass.left, 0.55);
    iso.face([[x, -0.2, 3.7], [x + 1.8, -0.2, 3.7], [x + 1.8, -0.2, 3.78], [x, -0.2, 3.78]], C.wall.right);
  }
  for (let y = 1.0; y + 1.8 <= 13.6; y += 2.2) {
    iso.face([[-0.2, y, 3.7], [-0.2, y + 1.8, 3.7], [-0.2, y + 1.8, 4.6], [-0.2, y, 4.6]], C.glass.right, 0.5);
    iso.face([[-0.2, y, 3.7], [-0.2, y + 1.8, 3.7], [-0.2, y + 1.8, 3.78], [-0.2, y, 3.78]], C.wall.right);
  }
  // a skirting band where each wall meets the floor
  iso.face([[-0.2, -0.2, 0], [17.6, -0.2, 0], [17.6, -0.2, 0.25], [-0.2, -0.2, 0.25]], C.wall.right);
  iso.face([[-0.2, -0.2, 0], [-0.2, 14.0, 0], [-0.2, 14.0, 0.25], [-0.2, -0.2, 0.25]], C.wall.left);
};

// ---------- the frame
export const SLAB: Box = [-0.2, -0.2, -0.5, 17.6, 14.0, 0];
const U = 39, OX = 602, OY = 418;

export const drawPlant = (ctx: Ctx, frame: number, env: Env) => {
  ctx.setTransform(env.scale, 0, 0, env.scale, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const iso = new Iso(ctx, U, OX, OY), st = stateAt(frame);
  // slab, its shadow on the page (a soft offset, one flat shape), floor markings
  iso.face([[SLAB[0] + 0.9, SLAB[1] + 0.4, -0.5], [SLAB[3] + 0.9, SLAB[1] + 0.4, -0.5], [SLAB[3] + 0.9, SLAB[4] + 0.4, -0.5], [SLAB[0] + 0.9, SLAB[4] + 0.4, -0.5]], SHADOW, 0.07);
  drawBox(iso, SLAB, C.slab);
  drawWalls(iso);
  strip(iso, [1.4, 1.4], [16.2, 1.4], 0.06, 0.003, "#d4d9e6");
  strip(iso, [1.4, 13.2], [5.6, 13.2], 0.06, 0.003, "#d4d9e6");
  // a painted walkway round the core inside the loop
  for (const [a, b] of [[[4.6, 4.6], [11.4, 4.6]], [[11.4, 4.6], [11.4, 9.4]], [[11.4, 9.4], [4.6, 9.4]], [[4.6, 9.4], [4.6, 4.6]]] as [number, number][][]) strip(iso, a as [number, number], b as [number, number], 0.08, 0.003, "#cdd3e2");
  drawCables(iso, frame);
  // back of the plant to the front (painter's order, planned by hand: see the header)
  drawRacks(iso, st);
  drawPressBody(iso);
  drawBelt(iso, belts[1], st.belt);
  drawBelt(iso, belts[0], st.belt);
  if (st.s % 36 < 18) drawTote(iso, st);
  drawPicker(iso, st);
  drawPressHead(iso, frame, st);
  drawCore(iso, frame);
  drawBelt(iso, belts[2], st.belt);
  drawBelt(iso, belts[3], st.belt);
  if (st.s % 36 >= 18) drawTote(iso, st);
  drawChute(iso);
  drawLoadingCarton(iso, st);
  drawTruck(iso);
  drawLedger(iso, st);
  drawKiosk(iso, st);
};

export const heroPlant: Film = {
  // calm by design: site art beside a headline must not pull the eye off it. Between the tote's moves the
  // plant works in small parts (a ram, a stamp, a carriage, data pulses), under the film floor: declared, not padded
  meta: { title: "MAVRO hero · one order through the plant", W, H, fps: FPS, bpm: 60, durationFrames: N, kind: "loop", poster: 0, holds: [[1, N, "site hero: calm by design, the plant working is the only motion"]] },
  assets: { images: {} },
  shots: [{ id: "plant", start: 0, end: N, draw: drawPlant }],
};
