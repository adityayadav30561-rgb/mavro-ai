# Section library

Every page is assembled from the blocks in `src/blocks/`. A new kind of section is added here, documented below,
and then reused; no one-off page layouts (SITE-PLAN.md section 4). See them all with sample data at
**http://localhost:5180/_library** (dev server only; never built). Check it like any page:
`qa/measure.html?path=/_library`.

## Assembling a page

```tsx
<PageHero variant="module" chip={{ label: 'Base modules', tier: 'base' }} title="Order to Cash" lead="…"
  actions={[{ label: 'Request a demo', interest: 'Base modules' }, { label: 'See the screens', href: '#screens' }]}
  visual={<ScreenFrame variant="bleed" screen="o2c" alt="…" note="Illustrative data" eager />} />
<Section id="capabilities" title="…" rest="…" treatment="soft" lead="…">
  <CapabilityTiles tiles={…} />
</Section>
…
<FaqBlock id="faq" title="…" items={…} />
<CtaBand title="See Order to Cash" rest="on your own data." body="…" label="Request a demo" interest="Base modules" />
```

Content comes from data files (`src/data/`), never from the page component.

### Rhythm rules (every page)

- **Backgrounds alternate** white / paper (`tone`). At most one `night` band per page, plus the closing `CtaBand`.
- **Headline treatments vary** between neighbours: `soft` (grey), `grad` (brand sweep), `mark` (marker), `plain`
  (one colour, centred sections). Neighbouring sections never share one.
- **One H1 per page**: `PageHero` renders it; every `Section` heading is an H2.
- Sections about 0.75–1.2 screens on desktop (`CtaBand` is a band, about 0.4).
- No eyebrow labels; tier colours (Base blue, Portals cyan, Premium violet); tokens and rem only.
- A dark `PageHero` keeps the header solid white, so the logo stays on a light surface.

## Blocks

| Block | File | Props (main) | Used on |
|---|---|---|---|
| `Section` | Section.tsx | `id`, `tone`, `title`, `rest`, `treatment`, `lead`, `layout` (split/stack/center), children | Every section that is not a full block itself |
| `SectionHead`, `Headline` | SectionHead.tsx | heading parts; `level` 1 or 2. Also exports `Tone`, `Treatment`, `sectionClass` | Inside the blocks |
| `PageHero` | PageHero.tsx | `variant` (module, industry, package, solution, simple), `tone` (light/dark), `chip` {label, tier, icon}, title parts, `lead`, `actions` (first primary; `href` or a demo `interest`), `facts`, `visual` | Every page below the homepage |
| `Breadcrumbs` | Breadcrumbs.tsx | none: reads the route's `crumbs` (routes.ts), so it matches the BreadcrumbList JSON-LD | Inside PageHero |
| `ScreenFrame` | ScreenFrame.tsx | `screen` (a homepage screen or `<slug>/<file>`), `alt`, `sizes`, `variant` (contained/bleed), `note`. Bleed: the container must be relative, clip and have a height; `--sframe-w` sets the width | Everywhere screens appear; Explore (bleed) |
| `ScreenTour` | ScreenTour.tsx | `screens` [{screen, title, caption, alt}], `note`, `id` | Module, industry, platform |
| `CapabilityTiles` | CapabilityTiles.tsx | `tiles` [{icon, title, body, figure?}], `tier` | Module, package |
| `WhatWhy` | WhatWhy.tsx | `what` {title, body}, `why` {title, points} | Module |
| `FlowStrip` | FlowStrip.tsx | `stages` [{label?, nodes [{name, href?, icon?, kind?}]}], `layout` (columns/chain), `legend`, `note`. Kinds: shared, configured, current | Module (where it sits), industry (order flow), package |
| `ModuleCards` | ModuleCards.tsx | `cards` [{name, summary, icon, tier, href or null, screen?, alt?}], `more` (link label) | Package, industry, related modules |
| `PlatformStrip` | PlatformStrip.tsx | none: the eight features of deck slide 12 (`data/platform.ts`), identical everywhere | Every module page, platform |
| `ChainDiagram` | ChainDiagram.tsx | `title`, `nodes` [{id, name, icon, link}], `core`, `active`, `badge` | Homepage Explore (Portals), portal pages |
| `ConnectBoard` | ArchitectureDiagram.tsx | `data` (the ERP Connect board: systems, broker, app, users, rule). Dark band only | Homepage, ERP Connect |
| `LayeredArchitecture` | ArchitectureDiagram.tsx | `data` {layers, security} (deck slide 11, `data/platform.ts`) | Platform, security |
| `Timeline` | Timeline.tsx | `data` {label, span, milestones, phases, after, ongoing} | Homepage, implementation, ERP Connect |
| `StoryCards` | StoryCards.tsx | `stories` (type `Story`). Dark band only | Homepage, customers, industry |
| `TrustPanel` | TrustPanel.tsx | `data` (compliance + security), `variant` (card with tabs / expanded), `id` | Homepage Why MAVRO (card); security, platform (expanded) |
| `BeforeAfter` | ComparisonTable.tsx | `before`, `after`, `rows` [{before, after}] | ERP Connect |
| `DataTable` | ComparisonTable.tsx | `caption`, `columns` [{key, label}], `rows` (cells: text or {level, text}) | Implementation (risks) |
| `FaqBlock` | FaqBlock.tsx | a full section: `id`, `tone`, title parts, `lead`, `items` [{q, a, link?}], `more`. Give the route `faqPage(url, items)` (seo/schema.ts) | Homepage and every page's own FAQ |
| `CtaBand` | CtaBand.tsx | a full dark section: title parts, `body`, `label`, `interest` | The close of every page below the homepage |
| `InlineCta` | InlineCta.tsx | `title`, `body`, `label`, `interest`, `tone` | Homepage, long pages |
| `DemoLink` | DemoLink.tsx | `interest`, children. Homepage: scrolls to `#demo` and ticks by event; elsewhere links to `/?interest=…#demo` (the form reads it) | PageHero, CtaBand, InlineCta |

Class prefixes of blocks taken from the homepage keep their old names (`faq__`, `proof__` for story cards,
`impl__` for the timeline, `cx__` for the board, `pc__` for the chain, `trust__`) so the homepage markup did not
change. New blocks: `ph` (page hero), `crumbs`, `sframe`, `tour`, `cap`, `ww`, `fs`, `mc`, `pstrip`, `arch`, `ba`,
`dt`, `cta`.

## Adding a block

1. `src/blocks/<Name>.tsx` + `<name>.css`; props typed, content passed in (or read from `src/data/`).
2. Add it to the gallery (`src/library/Library.tsx`, sample data in `src/library/samples.ts` from the decks).
3. Check the gallery at the nine sizes (`qa/measure.html?path=/_library`) and at 1440×900, 1366×768, 390×844.
4. Add a row above.
