/*
 * The hero's 3D scene: the MAVRO platform core with six business modules around it, joined by connections
 * that carry data in both directions.
 *
 *   Core         three stacked plates (foundation, core ERP, operations) separated by seams of light, topped
 *                with a gradient plate and a floating glass "record": one record, shared by everything around it
 *   Modules      porcelain plinths, each carrying a small sculpted object for its function
 *   Connections  thin tubes from each module to the core, with packets moving along them both ways
 *
 * Materials are porcelain white, navy from the wordmark, and the logo's violet, blue and cyan. No shadows are
 * computed: soft contact shadows are painted textures. Rendering stops while the canvas is off screen or the
 * tab is hidden, and with reduced motion the scene is drawn once and left still.
 *
 * Loaded on demand by HeroScene.tsx, so none of this is in the initial bundle.
 */
import {
  AmbientLight,
  CanvasTexture,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  QuadraticBezierCurve3,
  Scene,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
  type Material,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { labelBelow, sceneNodes, type Accent, type NodeKind } from './nodes';

export interface SceneOptions {
  canvas: HTMLCanvasElement;
  /** One label element per node, in the order of sceneNodes. */
  labels: HTMLElement[];
  /** Draw once and stay still. */
  still: boolean;
  /** Fewer moving parts and a lower pixel ratio, for small or modest devices. */
  lite: boolean;
  /** Called after the first frame has been drawn. */
  onReady: () => void;
}

export interface SceneHandle {
  dispose: () => void;
}

const BRAND = {
  violet: '#7a36fb',
  indigo: '#3f2af5',
  blue: '#0a48fd',
  cyan: '#03c8fd',
  navy: '#090e34',
} as const;

/* Layout */
const RX = 4.2; // ellipse the modules stand on
const RZ = 3.2;
const TARGET = new Vector3(0, 0.55, 0);
const ELEVATION = (25 * Math.PI) / 180;
const FOV = 30;

/* ---------- Textures, painted once ---------- */

function gradientTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, BRAND.violet);
  grad.addColorStop(0.5, BRAND.blue);
  grad.addColorStop(1, BRAND.cyan);
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** A soft radial falloff: contact shadows under objects, and the halo around moving packets. */
function blobTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.45, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

/* ---------- Geometry helpers ---------- */

function gearShape(teeth: number, outer: number, inner: number, hole: number) {
  const shape = new Shape();
  const steps = teeth * 4;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = i % 4 < 2 ? outer : inner;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const h = new Shape();
  h.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(h);
  return shape;
}

export function createScene({ canvas, labels, still, lite, onReady }: SceneOptions): SceneHandle {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'default' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.55;

  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);

  /* Light: a soft sky, one key from the upper left, and two rims tinted with the logo's violet and cyan. */
  scene.add(new HemisphereLight('#ffffff', '#cfd6ff', 1.15));
  scene.add(new AmbientLight('#ffffff', 0.2));
  const key = new DirectionalLight('#ffffff', 1.55);
  key.position.set(-4, 9, 6);
  scene.add(key);
  const rimL = new PointLight(BRAND.violet, 18, 14, 1.6);
  rimL.position.set(-6.5, 2.2, 1.5);
  scene.add(rimL);
  const rimR = new PointLight(BRAND.cyan, 16, 14, 1.6);
  rimR.position.set(6.5, 2.2, 2);
  scene.add(rimR);

  /* Materials */
  const gradTex = gradientTexture();
  const blobTex = blobTexture();
  const porcelain = new MeshPhysicalMaterial({
    color: '#f4f6fd',
    roughness: 0.38,
    clearcoat: 0.7,
    clearcoatRoughness: 0.3,
  });
  const porcelainShade = new MeshPhysicalMaterial({
    color: '#e6eaf8',
    roughness: 0.45,
    clearcoat: 0.5,
    clearcoatRoughness: 0.35,
  });
  const navy = new MeshStandardMaterial({ color: '#1b2157', roughness: 0.45, metalness: 0.1 });
  const accents: Record<Accent, MeshPhysicalMaterial> = {
    violet: new MeshPhysicalMaterial({ color: BRAND.violet, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15, emissive: BRAND.violet, emissiveIntensity: 0.14 }),
    blue: new MeshPhysicalMaterial({ color: BRAND.blue, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15, emissive: BRAND.blue, emissiveIntensity: 0.14 }),
    cyan: new MeshPhysicalMaterial({ color: BRAND.cyan, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15, emissive: BRAND.cyan, emissiveIntensity: 0.12 }),
  };
  const gradient = new MeshPhysicalMaterial({
    map: gradTex,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    emissive: '#ffffff',
    emissiveMap: gradTex,
    emissiveIntensity: 0.3,
  });
  const seam = new MeshBasicMaterial({ map: gradTex, toneMapped: false });
  const glass = new MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.04,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.32,
    envMapIntensity: 1.6,
    depthWrite: false,
  });
  const connection = new MeshBasicMaterial({ color: '#4f6dff', transparent: true, opacity: 0.32, depthWrite: false });
  const shadowMat = (opacity: number) =>
    new MeshBasicMaterial({ map: blobTex, color: '#1a2366', transparent: true, opacity, depthWrite: false });

  const world = new Group();
  scene.add(world);

  const contactShadow = (w: number, d: number, opacity: number) => {
    const m = new Mesh(new PlaneGeometry(w, d), shadowMat(opacity));
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.002;
    m.renderOrder = -1;
    return m;
  };

  /* ---------- The core ---------- */

  const core = new Group();
  world.add(core);
  core.add(contactShadow(5.2, 5.2, 0.32));

  const plates = [
    { size: 2.9, h: 0.24, mat: porcelainShade },
    { size: 2.25, h: 0.24, mat: porcelain },
  ];
  const TOP = 1.55;
  let y = 0;
  plates.forEach((plate, i) => {
    const mesh = new Mesh(new RoundedBoxGeometry(plate.size, plate.h, plate.size, 4, 0.09), plate.mat);
    mesh.position.y = y + plate.h / 2;
    core.add(mesh);
    y += plate.h;
    // A seam of light between plates: a thin slab of pure brand gradient, just inside the plate above it, so
    // only its edge shows.
    const above = plates[i + 1]?.size ?? TOP;
    const glow = new Mesh(new RoundedBoxGeometry(above - 0.1, 0.08, above - 0.1, 2, 0.03), seam);
    glow.position.y = y + 0.04;
    core.add(glow);
    y += 0.08;
  });
  const top = new Mesh(new RoundedBoxGeometry(TOP, 0.36, TOP, 5, 0.12), gradient);
  top.position.y = y + 0.18;
  core.add(top);
  const coreTop = y + 0.36;
  core.rotation.y = Math.PI / 4;

  // The shared record: a glass cube floating above the core, holding a small gradient block.
  const record = new Group();
  record.position.y = coreTop + 0.78;
  const recordShell = new Mesh(new RoundedBoxGeometry(0.74, 0.74, 0.74, 5, 0.14), glass);
  recordShell.renderOrder = 2;
  const recordCore = new Mesh(new RoundedBoxGeometry(0.34, 0.34, 0.34, 4, 0.08), gradient);
  record.add(recordCore, recordShell);
  record.rotation.set(0.5, 0.6, 0);
  world.add(record);
  const recordShadow = contactShadow(1.3, 1.3, 0.22);
  recordShadow.position.y = coreTop + 0.004;
  world.add(recordShadow);

  // A thin orbit around the core, with two beads travelling it.
  const orbit = new Mesh(new TorusGeometry(2.25, 0.012, 8, 160), connection);
  orbit.rotation.x = Math.PI / 2;
  orbit.position.y = 0.36;
  world.add(orbit);
  const beads = [0, Math.PI].map((phase, i) => {
    const bead = new Mesh(new SphereGeometry(0.055, 16, 12), accents[i ? 'cyan' : 'violet']);
    bead.userData.phase = phase;
    world.add(bead);
    return bead;
  });

  /* ---------- Module objects ---------- */

  const box = (w: number, h: number, d: number, r: number, mat: Material) =>
    new Mesh(new RoundedBoxGeometry(w, h, d, 3, r), mat);

  function moduleObject(kind: NodeKind, accent: MeshPhysicalMaterial): Object3D {
    const g = new Group();
    switch (kind) {
      case 'inventory': {
        // Stacked inventory units.
        const a = box(0.36, 0.36, 0.36, 0.06, porcelain);
        a.position.set(-0.2, 0.18, 0.04);
        const b = box(0.36, 0.36, 0.36, 0.06, porcelain);
        b.position.set(0.2, 0.18, -0.04);
        const c = box(0.36, 0.36, 0.36, 0.06, accent);
        c.position.set(0, 0.55, 0);
        c.rotation.y = 0.25;
        g.add(a, b, c);
        break;
      }
      case 'procurement': {
        // Documents standing in a tray: a purchase order in front.
        const back = box(0.5, 0.66, 0.035, 0.03, porcelainShade);
        back.position.set(0.1, 0.36, -0.12);
        back.rotation.z = -0.1;
        const front = box(0.5, 0.66, 0.035, 0.03, porcelain);
        front.position.set(-0.04, 0.34, 0.04);
        g.add(back, front);
        const head = box(0.22, 0.07, 0.02, 0.02, accent);
        head.position.set(-0.13, 0.57, 0.065);
        g.add(head);
        for (let i = 0; i < 3; i++) {
          const line = box(i === 2 ? 0.22 : 0.34, 0.035, 0.02, 0.012, navy);
          line.position.set(i === 2 ? -0.1 : -0.04, 0.43 - i * 0.1, 0.065);
          g.add(line);
        }
        break;
      }
      case 'production': {
        // Two meshing gears; they turn.
        const big = new Mesh(
          new ExtrudeGeometry(gearShape(10, 0.34, 0.28, 0.1), { depth: 0.1, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2, curveSegments: 6 }),
          porcelain,
        );
        big.position.set(-0.1, 0.42, 0);
        const hub = new Mesh(new CylinderGeometry(0.1, 0.1, 0.16, 24), accent);
        hub.rotation.x = Math.PI / 2;
        hub.position.set(-0.1, 0.42, 0.05);
        const small = new Mesh(
          new ExtrudeGeometry(gearShape(7, 0.2, 0.155, 0.06), { depth: 0.1, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 2, curveSegments: 6 }),
          accent,
        );
        small.position.set(0.37, 0.2, 0.02);
        g.add(big, hub, small);
        g.userData.spin = [big, small];
        break;
      }
      case 'quality': {
        // An inspection ring with a check mark.
        const ring = new Mesh(new TorusGeometry(0.3, 0.06, 16, 48), porcelain);
        ring.position.y = 0.42;
        const shortArm = box(0.07, 0.2, 0.07, 0.03, accent);
        shortArm.position.set(-0.08, 0.38, 0);
        shortArm.rotation.z = 0.8;
        const longArm = box(0.07, 0.36, 0.07, 0.03, accent);
        longArm.position.set(0.06, 0.44, 0);
        longArm.rotation.z = -0.62;
        const stand = new Mesh(new CylinderGeometry(0.04, 0.07, 0.12, 16), porcelainShade);
        stand.position.y = 0.06;
        g.add(ring, shortArm, longArm, stand);
        break;
      }
      case 'logistics': {
        // A delivery vehicle: body, cab, wheels.
        const body = box(0.62, 0.36, 0.38, 0.05, porcelain);
        body.position.set(-0.1, 0.28, 0);
        const cab = box(0.24, 0.27, 0.36, 0.06, accent);
        cab.position.set(0.34, 0.235, 0);
        const wheelGeo = new CylinderGeometry(0.085, 0.085, 0.06, 20);
        for (const [x, z] of [[-0.26, 0.19], [0.06, 0.19], [0.34, 0.19], [-0.26, -0.19], [0.06, -0.19], [0.34, -0.19]]) {
          const w = new Mesh(wheelGeo, navy);
          w.rotation.x = Math.PI / 2;
          w.position.set(x, 0.085, z);
          g.add(w);
        }
        g.add(body, cab);
        g.rotation.y = -0.5;
        break;
      }
      case 'finance': {
        // Figures rising: three bars, the last in accent.
        const heights = [0.3, 0.5, 0.78];
        heights.forEach((h, i) => {
          const bar = box(0.2, h, 0.2, 0.04, i === 2 ? accent : porcelain);
          bar.position.set(-0.26 + i * 0.26, h / 2, -0.08 + i * 0.08);
          g.add(bar);
        });
        g.rotation.y = 0.35;
        break;
      }
    }
    return g;
  }

  /* ---------- Modules, connections and packets ---------- */

  interface NodeRuntime {
    group: Group;
    base: Vector3;
    bobPeriod: number;
    bobPhase: number;
    labelAnchor: Vector3;
    /** Front modules carry their label beneath, so it never covers a module behind. */
    labelBelow: boolean;
    spin: Object3D[];
    delay: number;
  }

  interface Packet {
    curve: QuadraticBezierCurve3;
    mesh: Mesh;
    halo: Mesh;
    speed: number;
    offset: number;
    inbound: boolean;
  }

  const nodes: NodeRuntime[] = [];
  const packets: Packet[] = [];
  const packetGeo = new SphereGeometry(0.05, 14, 10);
  const haloGeo = new PlaneGeometry(0.42, 0.42);

  sceneNodes.forEach((def, index) => {
    const a = (def.angle * Math.PI) / 180;
    const base = new Vector3(Math.sin(a) * RX, 0, Math.cos(a) * RZ);
    const group = new Group();
    group.position.copy(base);
    world.add(group);

    const shadow = contactShadow(1.9, 1.9, 0.26);
    world.add(shadow);
    shadow.position.set(base.x, 0.002, base.z);

    const plinth = box(1.25, 0.18, 1.25, 0.07, porcelainShade);
    plinth.position.y = 0.09;
    plinth.rotation.y = Math.PI / 4 + a;
    const ring = new Mesh(new TorusGeometry(0.56, 0.012, 6, 64), accents[def.accent]);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.185;
    group.add(plinth, ring);

    const object = moduleObject(def.kind, accents[def.accent]);
    object.position.y = 0.18;
    object.scale.setScalar(1.3);
    group.add(object);

    nodes.push({
      group,
      base,
      bobPeriod: 4.2 + ((index * 0.73) % 2.1),
      bobPhase: index * 1.7,
      labelAnchor: labelBelow(def) ? new Vector3(0, 0, 0.82) : new Vector3(0, 1.55, 0),
      labelBelow: labelBelow(def),
      spin: (object.userData.spin as Object3D[] | undefined) ?? [],
      delay: 0.15 + index * 0.09,
    });

    // The connection: from the module's plinth, arcing up and into the edge of the core.
    const start = new Vector3(base.x, 0.12, base.z);
    const toCore = new Vector3(-base.x, 0, -base.z).normalize();
    const end = new Vector3(base.x, 0, base.z).normalize().multiplyScalar(1.5).setY(0.36);
    const mid = start.clone().lerp(end, 0.5).setY(1.05);
    const startEdge = start.clone().addScaledVector(toCore, 0.58);
    const curve = new QuadraticBezierCurve3(startEdge, mid, end);
    world.add(new Mesh(new TubeGeometry(curve, 48, 0.012, 6, false), connection));

    const lanes = lite ? [true] : [true, false];
    lanes.forEach((inbound, lane) => {
      const color = accents[def.accent];
      const mesh = new Mesh(packetGeo, new MeshBasicMaterial({ color: color.color, toneMapped: false }));
      const halo = new Mesh(
        haloGeo,
        new MeshBasicMaterial({ map: blobTex, color: color.color, transparent: true, opacity: 0.5, depthWrite: false }),
      );
      world.add(mesh, halo);
      packets.push({
        curve,
        mesh,
        halo,
        speed: 0.16 + ((index * 37 + lane * 11) % 10) / 100,
        offset: (index * 0.37 + lane * 0.5) % 1,
        inbound,
      });
    });
  });

  // The floor ellipse the modules stand on, drawn as a fine line.
  const floorRing = new Mesh(new TorusGeometry(1, 0.0035, 4, 200), connection);
  floorRing.rotation.x = Math.PI / 2;
  floorRing.scale.set(RX, RZ, 1);
  floorRing.position.y = 0.004;
  world.add(floorRing);

  // A soft brand halo on the floor beneath the core.
  const floorGlow = new Mesh(
    new CircleGeometry(3.2, 48),
    new MeshBasicMaterial({ map: blobTex, color: new Color(BRAND.blue), transparent: true, opacity: 0.12, depthWrite: false }),
  );
  floorGlow.rotation.x = -Math.PI / 2;
  floorGlow.position.y = 0.001;
  world.add(floorGlow);

  /* ---------- Framing ---------- */

  let width = 0;
  let height = 0;

  function frame() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit the ellipse of modules horizontally and the full height of the composition vertically.
    const vHalf = (FOV * Math.PI) / 360;
    const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
    const distance = Math.max(4.95 / Math.tan(hHalf), 2.6 / Math.tan(vHalf));
    camera.position.set(0, TARGET.y + Math.sin(ELEVATION) * distance, Math.cos(ELEVATION) * distance);
    camera.lookAt(TARGET);
    camera.updateProjectionMatrix();
  }

  /* ---------- Animation ---------- */

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const projected = new Vector3();
  let raf = 0;
  let running = false;
  let visible = true;
  let start = performance.now();
  let last = start;
  let ready = false;

  const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

  function update(time: number) {
    const t = (time - start) / 1000;
    const dt = Math.min(0.05, (time - last) / 1000);
    last = time;
    const motion = still ? 0 : 1;

    core.rotation.y = Math.PI / 4 + t * 0.07 * motion;
    record.position.y = coreTop + 0.78 + Math.sin(t * 1.15) * 0.06 * motion;
    record.rotation.y = 0.6 + t * 0.22 * motion;
    record.rotation.x = 0.5 + Math.sin(t * 0.4) * 0.12 * motion;
    recordShadow.scale.setScalar(1 - Math.sin(t * 1.15) * 0.06 * motion);

    beads.forEach((bead, i) => {
      const a = bead.userData.phase + t * (0.35 + i * 0.08) * motion;
      bead.position.set(Math.cos(a) * 2.25, 0.36, Math.sin(a) * 2.25);
    });

    nodes.forEach((node) => {
      const intro = still ? 1 : ease((t - node.delay) / 1.1);
      const bob = Math.sin((t / node.bobPeriod) * Math.PI * 2 + node.bobPhase) * 0.07 * motion;
      node.group.position.y = bob - (1 - intro) * 0.45;
      node.group.scale.setScalar(0.85 + intro * 0.15);
      node.spin.forEach((part, i) => {
        part.rotation.z = (i ? -1.43 : 1) * t * 0.45 * motion + (i ? 0.2 : 0);
      });
    });

    packets.forEach((p) => {
      let u = (p.offset + t * p.speed * motion) % 1;
      if (!p.inbound) u = 1 - u;
      p.curve.getPoint(u, p.mesh.position);
      p.halo.position.copy(p.mesh.position);
      p.halo.quaternion.copy(camera.quaternion);
      // Fade in and out at the ends so packets appear to leave and arrive, not pop.
      const fade = Math.min(1, u * 8, (1 - u) * 8);
      p.mesh.scale.setScalar(Math.max(0.001, fade));
      (p.halo.material as MeshBasicMaterial).opacity = 0.45 * fade;
    });

    // Pointer: a gentle tilt of the whole composition toward the cursor.
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3);
    world.rotation.y = pointer.x * 0.12;
    world.rotation.x = pointer.y * 0.045;
  }

  function placeLabels() {
    world.updateMatrixWorld();
    nodes.forEach((node, i) => {
      const el = labels[i];
      if (!el) return;
      projected.copy(node.labelAnchor);
      node.group.localToWorld(projected);
      projected.project(camera);
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      // From here on the label is placed by transform alone, not by its resting position.
      if (el.style.left !== '0px') el.style.left = el.style.top = '0px';
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, ${node.labelBelow ? '0%' : '-100%'})`;
    });
  }

  function render(time: number) {
    update(time);
    renderer.render(scene, camera);
    placeLabels();
    if (!ready) {
      ready = true;
      onReady();
    }
  }

  function loop(time: number) {
    raf = 0;
    if (!running) return;
    render(time);
    raf = requestAnimationFrame(loop);
  }

  function setRunning(next: boolean) {
    const should = next && !still && visible && !document.hidden;
    if (should === running) return;
    running = should;
    if (running) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    setRunning(true);
  });
  io.observe(canvas);

  const onVisibility = () => setRunning(true);
  document.addEventListener('visibilitychange', onVisibility);

  const ro = new ResizeObserver(() => {
    frame();
    if (!running) render(performance.now());
  });
  ro.observe(canvas);

  const finePointer = !still && !lite && window.matchMedia('(pointer: fine)').matches;
  const onPointer = (event: PointerEvent) => {
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
  };
  if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });

  frame();
  if (still) start = performance.now() - 60_000; // settled state: intro complete
  render(performance.now());
  setRunning(true);

  return {
    dispose() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      scene.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => m.dispose());
      });
      gradTex.dispose();
      blobTex.dispose();
      envTarget.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
