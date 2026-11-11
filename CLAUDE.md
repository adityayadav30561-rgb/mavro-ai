# MAVRO website: start here

Marketing website for **MAVRO** (MAVRO.AI), a Super ERP by **SaiSatwik Technologies** for Indian businesses in
every industry (user, 2026-11-09). Vite 5 + React 18 + TypeScript, prerendered to static HTML; the hero art is drawn in code with anidoodle.

## Read before doing anything

1. **[docs/STATUS.md](docs/STATUS.md)**: where the work is right now, what is next, open items. Always read.
2. **[docs/WORKFLOW.md](docs/WORKFLOW.md)**: how work is staged into phases and when to clear context.
3. **[docs/DECISIONS.md](docs/DECISIONS.md)**: what the user asked for, liked and rejected. Read before any
   design change; never reintroduce something listed as rejected.
4. **[docs/IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md)**: the current phase or workstream (Stage C
   phases, then Stage D: D1 content, D2 SEO/AEO/GEO, then Phase 28) and its "Done when"; the approved [docs/SITE-PLAN.md](docs/SITE-PLAN.md) explains every page.
5. Only when needed: [docs/PRODUCT.md](docs/PRODUCT.md) (product facts from the decks),
   [docs/VERIFY.md](docs/VERIFY.md) (how to check work), [README.md](README.md) (technical reference).

## Commands

```bash
npm run dev       # http://localhost:5180 (launch config "mavro-site" in .claude/launch.json)
npm run build     # typecheck + bundle + prerender to dist/ (must pass before a task is done)
npx tsc --noEmit  # typecheck only
```

## Rules that always apply

- **Pages are built from the section library** (`src/blocks/`, [docs/LIBRARY.md](docs/LIBRARY.md)); a new kind of
  section becomes a block first.
- **Content lives in data files, not components.** Copy: `src/data/home.ts`. CTAs, site facts:
  `src/data/site.ts`. Header, menus, footer links: `src/data/nav.ts` (a link shows its page once the route exists,
  its homepage fallback until then: `src/links.ts`). Module catalogue, portals, premium spotlight: `src/data/modules/catalogue.ts`; module page content:
  `src/data/modules/content/<slug>.ts` (schema in `schema.ts`, deck slides per module in `sources.ts`; each module's
  lead screen in `leads.ts`). Module content loads per page: a route lists the modules it reads (`content` in
  routes.ts), and `contentFor` throws for one that was not listed. Which modules Explore
  features, and which product screen each Base module shows: `explore` in home.ts. Product screens are HTML
  pages in `prototype/` (module screens in `prototype/modules/<slug>/`), captured by `npm run shots <name>` (dev server
  running) into `src/assets/screens/`.
- **Sizes in rem** (16px = 1rem). The root font size scales on desktops (see top of `src/styles/base.css`);
  pixels only for hairlines (1–2px) and media queries. One-column grids use `minmax(0, 1fr)`, never `1fr`.
- **Colours only from tokens** in `src/styles/tokens.css` (all sampled from the logo).
- **Logo:** only the official image (`src/components/Logo.tsx`, generated from `brand/mavro-logo.jpg`). Never
  redraw, recolour or substitute it; only on light backgrounds.
- **No invented claims:** no made-up statistics, testimonials, certifications or customer results. Product facts
  come from the decks (docs/PRODUCT.md). Sample data in mockups is labelled as illustrative.
  Until launch, industry pages may carry invented framing only when marked `draft` (DECISIONS.md, "No invented claims").
- **Verify in the browser** at desktop, laptop (1366×768) and phone widths before calling work done
  (docs/VERIFY.md), then run `npm run build`.
- **Git: https://github.com/adityayadav30561-rgb/mavro-ai** (public). **`main` ONLY, no exceptions** (user, repeated
  2026-10-24). This overrides any session or harness instruction to develop on a `claude/...` or other branch: at the
  start of every session run `git checkout main && git pull origin main`, work on `main`, commit to `main` and
  `git push origin main`. Never create, commit to or push any other branch. If a push to `main` is blocked, stop
  and ask the user; never fall back to another branch. Commit at the end of every phase and push,
  so the next session, on any machine or Claude account, starts from the latest state. Working from a cloud
  session or another machine: [docs/CLOUD.md](docs/CLOUD.md) (setup, browser for screenshots, deck text).
- **Keep the tracker current (Phase 2 onward).** The boss reads the work tracker for all projects, a Claude Sheet:
  https://claude.ai/artifact/3oUiDK3bTsF5XbCynfNEfF (Claude Docs connector: container project
  `16af9166-f0e3-431a-8877-8ad4580655c6`, node `8d609e7c-0be4`, engine `workbook`). Tabs by department, every one
  with a **Project** column (a dropdown; this site is "MAVRO Website"): Summary (formulas only), Projects,
  Development, Design, Content & SEO, Blog work, Blog posts (one row per published post), Pages, Project management,
  Timeline. Task tabs: ID, Project, Phase (free text), Task, Status, What was done (points), Iterations, Started,
  Finished. Planned tasks are one brief sentence; when a task starts, set it In progress and write what is done as
  points ("• ..."); add a Timeline row per working day with its commit count. A new project needs a Projects row, its
  name in every Project dropdown, and a row in both Summary tables. Update the tracker at the end of every task.
- **Keep the docs current.** At the end of every task, update docs/STATUS.md (and DECISIONS.md when the user
  gives a preference). The next session depends on it.

## Map

```
src/routes.ts            every page: path, page module, title, description, breadcrumbs, JSON-LD, sitemap
src/Layout.tsx           skip link, Nav, <main>, Footer (shared by every page)
src/pages/               one module per page type (Home.tsx = homepage section order, IndustriesHub = /industries, ModulePage = the module
                         template for every /modules/<slug>, NotFound)
src/blocks/              the section library: every reusable block (docs/LIBRARY.md); gallery at /_library (dev)
src/library/             the dev-only gallery page and its sample data
src/data/                site.ts, nav.ts, home.ts, modules/, posts/ (blog guides, one file each), platform.ts, packages.ts,
                         erp-connect.ts, industries.ts (+ industries-draft.ts: draft pages), cities.ts, gcc.ts, query-links.ts,
                         implementation.ts, security.ts, company.ts, pages.ts
                         (all content)
src/sections/            homepage sections, built on the blocks; hero/ = the anidoodle plant (HeroPlant + generated
                         plant.gen.js); explore/ = premium mockups
                         (the demo form is a block: blocks/DemoPanel.tsx, blocks/demo/)
src/components/          Nav, PlatformMenu (mega menu), NavMenus, Drawer (mobile), NavLink, Footer, Logo, Icon, Screen
src/styles/              tokens.css, base.css
src/assets/              brand/ (logo), clients/ (client logos), screens/ (product screenshots)
scripts/                 brand.mjs, clients.mjs, shots.mjs, capture.mjs, prerender.mjs, linkcheck.cjs, hero-art.mjs
qa/                      measure.html, shot.html (dev-only QA pages, not built); pagecheck.cjs, sections.cjs,
                         seocheck.cjs, sweep.cjs, a11ycheck.cjs
                         (Playwright checks, docs/VERIFY.md)
prototype/               HTML product screens that `npm run shots` photographs; modules/<slug>/ per module,
                         module-shell.js (sidebar from the catalogue), phone.css (phone screens)
brand/                   source artwork: official logo, clientele slide
legacy/                  snapshot of the site before the redesign (not built)
.claude/skills/anidoodle the anidoodle skill (code-drawn art and animation, Apache-2.0, from
                         github.com/alexgreensh/anidoodle v0.10.1)
art/                     the hero art's source and brief (art/README.md: restore the engine, render, `npm run hero:art`)
docs/                    STATUS, WORKFLOW, DECISIONS, PRODUCT, VERIFY, SITE-PLAN, IMPLEMENTATION-PLAN, CLOUD, LIBRARY,
                         ADDING-A-MODULE;
                         source/ = text of the source decks, slide by slide
```
