# MAVRO website: start here

Marketing website for **MAVRO** (MAVRO.AI), a Super ERP by **SaiSatwik Technologies** for manufacturers,
distributors and exporters. Vite 5 + React 18 + TypeScript + three.js, prerendered to static HTML.

## Read before doing anything

1. **[docs/STATUS.md](docs/STATUS.md)**: where the work is right now, what is next, open items. Always read.
2. **[docs/WORKFLOW.md](docs/WORKFLOW.md)**: how work is staged into phases and when to clear context.
3. **[docs/DECISIONS.md](docs/DECISIONS.md)**: what the user asked for, liked and rejected. Read before any
   design change; never reintroduce something listed as rejected.
4. **[docs/IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md)**: the current phase (Stage C) and its
   "Done when"; the approved [docs/SITE-PLAN.md](docs/SITE-PLAN.md) explains every page.
5. Only when needed: [docs/PRODUCT.md](docs/PRODUCT.md) (product facts from the decks),
   [docs/VERIFY.md](docs/VERIFY.md) (how to check work), [README.md](README.md) (technical reference).

## Commands

```bash
npm run dev       # http://localhost:5180 (launch config "mavro-site" in .claude/launch.json)
npm run build     # typecheck + bundle + prerender to dist/ (must pass before a task is done)
npx tsc --noEmit  # typecheck only
```

## Rules that always apply

- **Content lives in data files, not components.** Copy: `src/data/home.ts`. Nav, CTAs, footer, site facts:
  `src/data/site.ts`. Module catalogue, portals, premium spotlight: `src/data/modules.ts`. Which modules Explore
  features, and which product screen each Base module shows: `explore` in home.ts. Product screens are HTML
  pages in `prototype/`, captured by `npm run shots <name>` (dev server running) into `src/assets/screens/`.
- **Sizes in rem** (16px = 1rem). The root font size scales on desktops (see top of `src/styles/base.css`);
  pixels only for hairlines (1–2px) and media queries. One-column grids use `minmax(0, 1fr)`, never `1fr`.
- **Colours only from tokens** in `src/styles/tokens.css` (all sampled from the logo).
- **Logo:** only the official image (`src/components/Logo.tsx`, generated from `brand/mavro-logo.jpg`). Never
  redraw, recolour or substitute it; only on light backgrounds.
- **No invented claims:** no made-up statistics, testimonials, certifications or customer results. Product facts
  come from the decks (docs/PRODUCT.md). Sample data in mockups is labelled as illustrative.
- **Verify in the browser** at desktop, laptop (1366×768) and phone widths before calling work done
  (docs/VERIFY.md), then run `npm run build`.
- **Git: https://github.com/adityayadav30561-rgb/mavro-ai** (public). Commit at the end of every phase and push,
  so the next session, on any machine or Claude account, starts from the latest state. Working from a cloud
  session or another machine: [docs/CLOUD.md](docs/CLOUD.md) (setup, browser for screenshots, deck text).
- **Keep the docs current.** At the end of every task, update docs/STATUS.md (and DECISIONS.md when the user
  gives a preference). The next session depends on it.

## Map

```
src/routes.ts            every page: path, page module, title, description, breadcrumbs, JSON-LD, sitemap
src/Layout.tsx           skip link, Nav, <main>, Footer (shared by every page)
src/pages/               one module per page type (Home.tsx = homepage section order, NotFound, PipelineCheck)
src/data/                site.ts, home.ts, modules.ts  (all content)
src/sections/            one component + stylesheet per section; hero/ = 3D scene; explore/ = module screens,
                         premium mockups, portal chain; why/ = trust card; demo/ = demo form
src/components/          Nav, PlatformMenu (mega-menu), Footer, Logo, Icon, Screen
src/styles/              tokens.css, base.css
src/assets/              brand/ (logo), clients/ (client logos), screens/ (product screenshots)
scripts/                 brand.mjs, clients.mjs, shots.mjs, capture.mjs, prerender.mjs
qa/                      measure.html, shot.html (dev-only QA pages, not built)
prototype/               HTML product screens that `npm run shots` photographs
brand/                   source artwork: official logo, clientele slide
legacy/                  snapshot of the site before the redesign (not built)
docs/                    STATUS, WORKFLOW, DECISIONS, PRODUCT, VERIFY, SITE-PLAN, IMPLEMENTATION-PLAN, CLOUD;
                         source/ = text of the source decks, slide by slide
```
