# Hero art (anidoodle)

The homepage hero is drawn in code with the anidoodle skill (`.claude/skills/anidoodle`). Only our files are
committed here:

- `brief.md`: what was agreed with the user and what was decided.
- `src/canvas-core/heroPlant.ts`: the art, one pure `drawPlant(frame)` (isometric cutaway, 300-frame loop).
- `src/hosts/page-heroPlant.ts`: the page the engine's tools render it in.

The site does not import this folder: `npm run hero:art` (scripts/hero-art.mjs) compiles `heroPlant.ts` into
`src/sections/hero/plant.gen.js`, which `src/sections/hero/HeroPlant.tsx` draws on a canvas. Frame 0 is also
`src/assets/hero/plant.webp` (the first paint and the reduced-motion still).

## Changing the art

```bash
node .claude/skills/anidoodle/engine/tools/scaffold.mjs art     # copies the engine in; keeps our files
cd art && npm install --omit=optional --ignore-scripts && npm install @esbuild/linux-x64@0.25.12 --no-save
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers                  # cloud sessions: the preinstalled Chromium
node tools/still.mjs heroPlant --frame 0 --out out/frame0.png --scale 2
node tools/render.mjs heroPlant && node tools/gate.mjs heroPlant  # the loop as MP4, then the gate (must PASS)
cd .. && npm run hero:art                                         # rebuild the site module
node -e "require('sharp')('art/out/frame0.png').resize(1344,1200).webp({quality:88,alphaQuality:90}).toFile('src/assets/hero/plant.webp')"
```

(`--omit=optional` skips Remotion, which only films need; the esbuild binary then has to be added by hand. On a
Mac use `@esbuild/darwin-arm64` instead.)
