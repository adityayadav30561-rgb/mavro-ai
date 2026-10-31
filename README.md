# MAVRO website

The public MAVRO website: the homepage for the MAVRO Super ERP. Vite 5, React 18, TypeScript, npm; the hero art is drawn in code with the anidoodle skill.

Working on this project? Start with [CLAUDE.md](CLAUDE.md) and [docs/STATUS.md](docs/STATUS.md). This README
is the technical reference.

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # type-check, bundle, prerender to static HTML in dist/
npm run preview    # serve dist/ on http://localhost:5181 (clean URLs and the 404 page, as a static host would)
npm run shots      # re-capture the product screenshots (needs the dev server running)
npm run linkcheck  # after a build: crawl dist/ for dead links, missing anchors, orphans and click depth
npm run brand      # regenerate the web logo and icons from brand/mavro-logo.jpg
npm run clients    # regenerate the client logos from brand/clientele-slide.webp
node scripts/capture.mjs 1366 768 shots/x.png "id=explore"   # screenshot at an exact size (docs/VERIFY.md)
```

## Before this goes live

| What | Where | Now |
|---|---|---|
| Production domain | `site.url` in [src/data/site.ts](src/data/site.ts) | `https://mavro.example` (feeds canonical, Open Graph, JSON-LD, sitemap, robots) |
| Demo form endpoint | `site.demoEndpoint` | `null`: the form opens the visitor's email app with the request pre-filled to `site.contactEmail`. Set a URL that accepts a JSON POST (Formspree, Basin, HubSpot, own API) to receive requests directly |
| Pages not built yet (About, Careers, Blog, Privacy, Terms, and every page in SITE-PLAN.md) | [src/data/nav.ts](src/data/nav.ts) | each link names its page and a homepage fallback; it switches to the page when the route exists, and links with no fallback stay hidden until then (src/links.ts) |
| Client logos | `clients` in [src/data/home.ts](src/data/home.ts) | 20 logos from the clientele slide, shown in the hero band |
| Testimonials / case studies | `proof` in [src/data/home.ts](src/data/home.ts) | three anonymised stories from deck slide 23 (approved by the user). Add only verified, approved material |
| Module catalogue | [src/data/modules/catalogue.ts](src/data/modules/catalogue.ts) | from the product deck (Mavro Modules v2); all modules live. Premium spotlight content and its sample screens are in `premiumFeatures` |
| Industry list | `industries` in home.ts | Manufacturing, Distribution, Pharma, Service providers (user, 2026-10-23); confirm before launch |
| Social share image | [src/seo/head.ts](src/seo/head.ts) | none; add `og:image` / `twitter:image` once artwork exists |

Copy is based on the user's product decks ([docs/PRODUCT.md](docs/PRODUCT.md)) and makes no numeric,
certification or customer-result claims beyond what the decks state.

## Brand

The official logo is [brand/mavro-logo.jpg](brand/mavro-logo.jpg). `npm run brand` turns its white background into
transparency (without redrawing or recolouring anything), crops it, and writes `src/assets/brand/logo-*.webp`, plus
the favicon and touch icon from the M mark. The logo is drawn for light backgrounds and is only placed on light
surfaces.

Every brand colour in [src/styles/tokens.css](src/styles/tokens.css) is sampled from the logo:

| Token | Value | From |
|---|---|---|
| `--violet` (secondary) | `#7a36fb` | the M's upper-left stroke, the I of .AI |
| `--blue` (primary) | `#0a48fd` | the fold at the centre of the M |
| `--cyan` (accent) | `#03c8fd` | the M's upper-right stroke |
| `--navy` (ink) | `#090e34` | the MAVRO wordmark |

`--grad-brand` is the M's violet to blue to cyan sweep, kept for the platform core and moments of emphasis. The
three packages keep one colour each everywhere: Base modules blue, Portals cyan, Premium modules violet.

Type is Manrope throughout (`@fontsource-variable/manrope`). Its geometric construction sits close to the
wordmark and it holds up from 74px headlines down to 11px interface labels.

## The page

[src/pages/Home.tsx](src/pages/Home.tsx) lists the sections in order. Every heading, paragraph and label lives in
[src/data/home.ts](src/data/home.ts); CTAs in [src/data/site.ts](src/data/site.ts); header, menus and footer links in [src/data/nav.ts](src/data/nav.ts); modules in
[src/data/modules/catalogue.ts](src/data/modules/catalogue.ts). Copy changes never touch layout or animation code.

| Section | Anchor | What it does |
|---|---|---|
| Hero | `#top` | Audience headline, three proof points, CTAs, the anidoodle plant (an isometric cutaway: one order tote looping through order desk, press, racks, truck and ledger, every station wired to a data core), and the client logo band |
| PlatformIntro | `#platform` | Base modules, portals and premium modules on one shared platform (isometric SVG). Each tier label links to its package in Explore (`packs[*].href`); hover or focus lifts the matching plate, and clicking a plate clicks its label |
| Showcase | `#product` | The real interface (prototype screenshots) as five teams see it |
| Connect | `#connect` | ERP Connect: SAP, Oracle, Tally and legacy ERPs sync two ways with the MAVRO Database, the sole integration broker (from the connectivity deck's architecture page) A dark band (`section--night`) with a glow behind the board, the broker hub as its one bright object, and the deck's five benefits (`connect.benefits`, slide 5) before a dark CTA |
| Explore | `#explore` | The three packages as tabs (Base, Portals, Premium; counts from data/modules/catalogue.ts). Each shows its featured modules (`explore.packages.*.featured` in home.ts) in a rail beside a panel: the module's story and points, plus an illustrative screen: a full product screenshot for Base (one prototype page per module, larger, running off the panel's right and bottom edges), the portal's place in the chain for Portals (blocks/ChainDiagram), bespoke drawings for Premium (SpecialVisual). "All N modules" opens the Platform menu (components/catalogue.ts). `#modules`, `#portals` and `#premium` land here and select the tab. Ends with the "Plan my modules" CTA |
| Workflow | `#workflow` | Order to cash across seven modules, all writing to one record |
| Implementation | `#implementation` | Live in 25–30 days: a 30-day timeline with go-live milestones, four phase cards, and the support model (deck slides 25, 28) |
| Industries | `#industries` | Four audiences from the deck as cards; each panel has a headline, three points, the order flow (shared ends, configured middle, working record and trace) and module chips. A chip is a link with `data-module`: Explore selects that package and module (only modules in `explore.packages.*.featured` may be used) |
| WhyMavro | `#why` | Six principles, with a "Trust, built in" card as evidence (blocks/TrustPanel.tsx): India compliance (GST, ITC, e-way bill, statutory payroll, contract labour) and Security (AES-256, 7-year audit logs, RPO/RTO, access controls) tabs, all from the product deck |
| CustomerProof | `#stories` | Three anonymised customer stories (deck slide 23) as cards on a dark band: sector tags, the headline result (before → after), starting point and what was built, three deliverables, links to related modules (`data-module` opens them in Explore). Renders nothing if `proof` is emptied |
| Faq | `#faq` | 15 questions (`faq` in home.ts) as native `<details>` in two columns; every answer is in the prerendered HTML and each question has an anchor id. The same items generate the FAQPage JSON-LD, so edit the text in one place only |
| Demo | `#demo` | The close: navy panel with what the demo covers, direct email and phone, and the request form (blocks/DemoPanel.tsx, blocks/demo/DemoForm.tsx; also on /contact). Two mid-page CTAs (blocks/InlineCta.tsx, after ERP Connect and Premium) scroll here and tick the matching interest; from other pages, links to `/?interest=…#demo` tick it on arrival |

## Pages and routing

The site is a multi-page static site. [src/routes.ts](src/routes.ts) lists every page: its clean URL, its page
module in `src/pages/`, title, description, breadcrumb trail, page-specific structured data and whether it goes
in the sitemap. One table drives everything:

- `npm run build` prerenders each route (scripts/prerender.mjs): `/` to `dist/index.html`, `/404` to
  `dist/404.html` (hosts serve it for unknown URLs), any other path to `dist/<path>/index.html`.
- Each page's head (src/seo/head.ts): title, description, canonical, `robots` (pages outside the sitemap are
  noindex), Open Graph, JSON-LD. The 404 page has no canonical or `og:url`, since it answers at any missing address.
- `sitemap.xml` lists the routes with `inSitemap`.
- In the browser, src/entry-client.tsx finds the route for `location.pathname` (unknown paths get the 404 page),
  loads its page chunk and hydrates. Each page module is its own chunk and the prerendered HTML preloads it, so
  a page only loads its own code.
- Links are plain `<a>` to real URLs. Header, footer and CTA links written as `#section` are homepage sections;
  off the homepage `useHref` (src/routing.tsx) points them at `/#section`.
- Navigation links (src/data/nav.ts) name the page they belong to (`page: '/erp-connect'`) and a fallback
  (`fallback: '#connect'`). `target()` in src/links.ts returns the page once its route is in the table, else the
  fallback, else null (the link is not rendered). So the header, menus, drawer and footer switch to real pages as
  routes are added, with no edits to the navigation. Module links fall back to their package in Explore and
  carry `data-module`, so Explore opens that module; industry links fall back to `#industry-<slug>`, which picks
  that industry in the Industries section.

**Module pages** are generated: every module registered in `src/data/modules/content/index.ts` gets a route
`/modules/<slug>` on the template `src/pages/ModulePage.tsx` (which reads the slug from the path), with its SEO
title and description, the trail Home / package / module (the package crumb falls back to its homepage section),
and SoftwareApplication + FAQPage structured data. Adding a module page: write its content file and screens
(IMPLEMENTATION-PLAN.md, module recipe) and register it; the menus, footer and sitemap pick it up by themselves.

Adding a page: write `src/pages/<Name>.tsx` exporting `Page`, add a route. `/pipeline-check` is a hidden test page
(noindex, not linked, not in the sitemap) to be removed at launch QA.

## The hero art

The hero is an isometric plant drawn in code with the anidoodle skill (`.claude/skills/anidoodle`). Its source is
[art/src/canvas-core/heroPlant.ts](art/src/canvas-core/heroPlant.ts) (the brief: [art/brief.md](art/brief.md)):
one pure `drawPlant(frame)` over a seamless 300-frame (10 s) loop. `npm run hero:art` compiles it into
`src/sections/hero/plant.gen.js` (about 13 kB), which [HeroPlant.tsx](src/sections/hero/HeroPlant.tsx) draws on a
transparent canvas over the hero's own background, at the device's pixel ratio (capped at 2).

- Frame 0 is also a prerendered image (`src/assets/hero/plant.webp`): the first paint, the no-JavaScript view and
  the whole picture for `prefers-reduced-motion`. The canvas covers it once its first frame lands.
- Drawing stops while the hero is off screen or the tab is hidden.
- The stage keeps its 1.12 aspect ratio (1344 x 1200 art), so nothing shifts when the canvas takes over.
- Changing the art: [art/README.md](art/README.md) (restore the engine with the scaffold, render, gate, rebuild).

## The product screenshots

The screens in the Showcase and in Explore's Base tab are real screenshots of a prototype of the MAVRO interface
in [prototype/](prototype/) (fifteen static HTML screens, one stylesheet, one script that draws the sidebar, top
bar and charts). Showcase uses overview, sales-order, production, inventory and finance; Explore's Base tab uses
o2c, accounting, payroll, purchase-order, work-order, stock-item and project (one per featured module, mapped in
`explore.packages.base.screens`); procurement, quality and access are spare. The prototype uses the official
logo and the logo-derived blue and navy. `npm run shots` renders each at 1440 × 960 (2x) in headless Edge or
Chrome and writes WebP files to `src/assets/screens/`. All data in them is invented (Northfield Precision, Kestrel
Pumps, SO-24817 and so on), kept consistent with the sample order used across the page, and the page says so.
Figures agree across screens (SO-24817 → WO-5521 → PO-7714 → lot L-0932; the payroll posting balances; stock
movements reconcile), so keep them consistent when editing. Capture one screen with `npm run shots <name>`.

**Module screens** (Phase 4 onwards) live in `prototype/modules/<slug>/`, 3–4 per module, each designed for that
module. They load `../../app.css` and `<script type="module" src="../../module-shell.js">`, which builds the
sidebar from the site's own catalogue (`src/data/modules/catalogue.ts`: every module, grouped by business area,
the active module showing its views) and then runs `shell.js` for the charts. Body attributes: `data-module`
(the slug), `data-view` (one of the module's views in `src/data/modules/views.ts`, which lists the module's whole menu
for the sidebar), `data-crumb`, `data-who`, optionally
`data-org`. Phone screens add `prototype/phone.css`, `class="phone" data-device="phone"`, and `data-title`,
`data-subtitle`, `data-tab`, `data-tabs`; the shell adds the status bar, app bar and tab bar. Each module's first
screen opens with a comment holding the module's scenario, which all its screens follow.
`npm run shots order-to-cash` captures every screen of a module (`npm run shots order-to-cash/collections` one)
into `src/assets/screens/<slug>/`; phone screens are captured at 390 × 844 (3x). The site shows them with
`<Screen name="<slug>/<file>" />` (`device="phone"` draws the phone frame). The prototype pins its canvas (1440 ×
960, phone 390 × 844) and the script crops to it, so captures are exact in any browser. Checklist: docs/VERIFY.md.

## Responsive sizing

Every length in the stylesheets is in `rem`, so one value scales the whole layout (see the top of
[src/styles/base.css](src/styles/base.css)):

- **Desktops and laptops (1024px and wider):** the page is drawn for a 1440 × 900 window and the root size
  follows the window by whichever of width or height is tighter (14px minimum, 26px maximum). A 1366 × 768
  laptop and a 2560 × 1440 monitor show the same composition, each section taking about the same share of the
  screen. The hero is exactly one screen tall.
- **Phones and tablets:** the root stays at 16px and layouts reflow (stacked columns, swipeable rows).
- Space between sections follows the window height (`--section`), and wide headings split into headline and
  intro side by side (`.head--split`).

Measured section heights are 0.75 to 1.2 screen heights on every desktop size from 1280 × 720 to 2560 × 1440,
and nothing runs past the right edge at any width from 320px up. Write new lengths in rem (16px = 1rem); keep
pixels only for hairline borders and in media queries.

## Motion

No animation library. `data-reveal` (content enters once), `data-live` (looping CSS animation runs only while on
screen), CSS transitions on `transform` and `opacity`, and the hero scene's own render loop. Everything respects
`prefers-reduced-motion`.

## Structure

```
CLAUDE.md              start here (loaded automatically by Claude Code)
docs/                  STATUS, WORKFLOW, DECISIONS, PRODUCT, VERIFY
brand/                 source artwork: official logo, clientele slide
legacy/                snapshot of the previous site (2026-10-06), not built
qa/                    dev-only QA pages (measure.html, shot.html), not built
prototype/             the product screens that get screenshotted
src/
  routes.ts            the route table: every page, its SEO and its page module
  routing.tsx          the current path for shared parts; useHref turns '#section' into '/#section' off the homepage
  Layout.tsx           skip link, Nav, <main>, Footer
  pages/               one module per page (Home.tsx: the homepage, in order; NotFound.tsx; PipelineCheck.tsx)
  data/pages.ts        copy for the utility pages (404, pipeline check)
  assets/brand/        web logo (generated by npm run brand)
  assets/clients/      client logos (generated by npm run clients)
  assets/screens/      product screenshots (generated by npm run shots)
  blocks/              the section library, shared by every page (docs/LIBRARY.md; gallery at /_library in dev)
  library/             the dev-only gallery page and its sample data
  links.ts             navigation links: page once its route exists, homepage fallback until then
  components/          Nav (header), PlatformMenu (branched mega menu), NavMenus (Solutions, Resources,
                       Company), Drawer (mobile), NavLink, Footer, Logo, Icon, Screen
  data/                site.ts (facts, CTAs), nav.ts (header, menus, footer), home.ts (copy),
  data/modules/        catalogue.ts (modules, portals, slugs per entry), slugs.ts (the 42 page slugs), sources.ts
                       (deck slides per module), schema.ts (ModuleContent), content/ (one file per module page)
                       platform.ts (platform features and architecture, deck slides 11–12)
  motion/hooks.ts      viewport flags, accessible tabs, CSS variable helper
  sections/            the homepage sections, built on the blocks; hero/ holds the 3D scene; explore/ the
                       premium drawings; demo/ the form
  seo/schema.ts        shared schema.org nodes (FAQPage from an FAQ block's items)
  seo/head.ts          per-route title, meta, canonical, Open Graph, JSON-LD (Organization and WebSite on every
                       page, BreadcrumbList below the homepage, plus the route's own nodes)
  styles/              tokens.css (design tokens), base.css (type, buttons, primitives)
scripts/
  brand.mjs            derives the logo assets
  clients.mjs          cuts the client logos out of the clientele slide
  shots.mjs            captures the prototype
  capture.mjs          screenshots the site at an exact size (QA)
  prerender.mjs        renders every route to its own HTML file with its head, preloads the font and the page
                       chunk, writes robots.txt and sitemap.xml from the route table
```
