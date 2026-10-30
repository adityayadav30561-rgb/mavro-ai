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

### The module page template

`src/pages/ModulePage.tsx` renders every module page from its content file (`src/data/modules/content/<slug>.ts`)
and the shared headings in `src/data/modules/template.ts`. Ten sections, tones and treatments fixed:

| # | Section (id) | Block | Tone | Treatment |
|---|---|---|---|---|
| 1 | Hero (`top`) | PageHero `module`: package chip, H1, tagline, demo (package ticked, module in the message) + "See the screens"; the lead screen runs off the window's right edge and is cut by the hero's bottom edge (no plate, no border lines), the phone screen in a drawn device in front | hero | none (H1 is the name) |
| 2 | Capabilities | CapabilityTiles in the tier colour, figures from the screens | white | soft |
| 3 | Screens | ScreenTour, the module's 3–4 screens, then "Also in <module>": its other views (views.ts) | paper | mark |
| 4 | What it does / why it matters | WhatWhy | white | grad |
| 5 | Where it sits (`flow`) | FlowStrip: feeds it / module / it feeds, each node with what passes. Portal pages: the ChainDiagram (portal lit) beside the FlowStrip (`.mp__portal`), stacked under 1024px | paper | soft |
| 6 | Who uses it (`audience`) | Audience: industry cards with a coloured band, who it is and what the module does there; the people who work in it with an avatar, their task and the view they work in | white | mark |
| 7 | Built on the platform | PlatformStrip with `module`: the module stands on the platform, a hairline rail into all eight features | paper | grad |
| 8 | Related modules | ModuleCards (four: one row on desktops), each with that module's lead screen (its content's first screen, else `leads.ts`), cropped past the sidebar | white | soft |
| 9 | FAQ | FaqBlock + FAQPage JSON-LD (routes.ts) | paper | mark |
| 10 | CTA | CtaBand | night | grad |

Links to modules, industries and packages without a page yet render as plain labels or fall back to their homepage
section (src/links.ts), so a module page never links to a missing page.

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
| `ScreenTour` | ScreenTour.tsx | `screens` [{screen, title, caption, alt}], `note`, `id`, `more` {label, views} (the module's other views) | Module, industry, platform |
| `CapabilityTiles` | CapabilityTiles.tsx | `tiles` [{icon, title, body, figure?}], `tier` | Module, package |
| `WhatWhy` | WhatWhy.tsx | `what` {title, body}, `why` {title, points} | Module |
| `Audience` | Audience.tsx | `industries` [{name, icon, who, note, href or null}], `roles` [{name, task, works?}], `labels` {industries, roles, works, see}, `screensHref` | Module (who uses it) |
| `FlowStrip` | FlowStrip.tsx | `stages` [{label?, nodes [{name, href?, icon?, note?, kind?}]}] (`note`: what passes along the link), `layout` (columns/chain), `legend`, `note`. Kinds: shared, configured, current | Module (where it sits), industry (order flow), package |
| `ModuleCards` | ModuleCards.tsx | `cards` [{name, summary, icon, tier, href or null, screen?, alt?}], `more` (link label) | Package, industry, related modules |
| `PlatformStrip` | PlatformStrip.tsx | the eight features of deck slide 12 (`data/platform.ts`), identical everywhere; optional `module` {name, icon, tier, label} draws the module on top, wired into the features. Light or night band | Every module page, platform |
| `ChainDiagram` | ChainDiagram.tsx | `title`, `nodes` [{id, name, icon, link}], `core`, `active` (omit to light every portal), `badge` | Homepage Explore (Portals), portal pages, Portals package page |
| `HeroScreens` | HeroScreens.tsx | `lead` {screen, alt}, `behind?`, `phone?`, `note`. A package or platform hero's visual for PageHero `variant="module"`: the lead screen bleeding off the edge, a second module's screen standing behind it (hidden under 1024px), a phone in front | Package pages, platform |
| `PortalLayers` | PortalLayers.tsx | `portals` [{name, layer, who, body, points, href, screen?, alt?}], `more`. One row per portal beside the ChainDiagram | Portals package page |
| `PackagePlate` | PackagePlate.tsx | optional `tier` (base, portal, premium): the platform diagram's isometric plates (geometry in `blocks/plates.ts`, shared with the homepage `PlatformIntro`) with that tier lifted and the rest faded; none lifts nothing. Decorative | Package hero, platform hero |
| `PackageLinks` | PackageLinks.tsx | `packages` [{tier, name, blurb, count, icon, href or null}], `current` (marked, not linked), `here` (its label) | Package pages (how packages combine), platform |
| `PremiumSpotlight` | PremiumSpotlight.tsx | `groups` [{name, modules [{id, name, icon, href}]}], `features` (by module id, from `premiumFeatures`), `seeLabel`. Grouped list left, panel right, arrow keys; no kicker, no "Premium" tag. Night band | Premium package page |
| `PhoneRow` | PhoneRow.tsx | `shots` [{screen, alt, title, caption}] (phone screens, `platform/<name>`), `note` | Platform (mobile app) |
| `ConnectBoard` | ArchitectureDiagram.tsx | `data` (the ERP Connect board: systems, broker, app, users, rule). Dark band only | Homepage, ERP Connect |
| `LayeredArchitecture` | ArchitectureDiagram.tsx | `data` {layers, security} (deck slide 11, `data/platform.ts`) | Platform, security |
| `Timeline` | Timeline.tsx | `data` {label, span, milestones, phases, after, ongoing} | Homepage, implementation, ERP Connect |
| `StoryCards` | StoryCards.tsx | `stories` (type `Story`). Dark band only | Homepage, customers, industry |
| `TrustPanel` | TrustPanel.tsx | `data` (compliance + security), `variant` (card with tabs / expanded), `id` | Homepage Why MAVRO (card); security, platform (expanded) |
| `BeforeAfter` | ComparisonTable.tsx | `before`, `after`, `rows` [{before, after}] | ERP Connect |
| `DataTable` | ComparisonTable.tsx | `caption`, `columns` [{key, label}], `rows` (cells: text or {level, text}) | Implementation (risks) |
| `FaqBlock` | FaqBlock.tsx | a full section: `id`, `tone`, title parts, `lead`, `items` [{q, a, link?}], `more`. Give the route `faqPage(url, items)` (seo/schema.ts) | Homepage and every page's own FAQ |
| `CtaBand` | CtaBand.tsx | a full dark section: title parts, `body`, `label`, `interest`, `module` (module pages: named in the form's message) | The close of every page below the homepage |
| `ClientBand` | ClientBand.tsx | none: the clientele logos (`clients` in home.ts) | Homepage hero, module heroes (PageHero `band`) |
| `InlineCta` | InlineCta.tsx | `title`, `body`, `label`, `interest`, `tone` | Homepage, long pages |
| `DemoLink` | DemoLink.tsx | `interest`, children. Homepage: scrolls to `#demo` and ticks by event; elsewhere links to `/?interest=…#demo` (the form reads it) | PageHero, CtaBand, InlineCta |

Class prefixes of blocks taken from the homepage keep their old names (`faq__`, `proof__` for story cards,
`impl__` for the timeline, `cx__` for the board, `pc__` for the chain, `trust__`) so the homepage markup did not
change. New blocks: `ph` (page hero), `crumbs`, `sframe`, `tour`, `cap`, `ww`, `aud`, `fs`, `mc`, `pstrip`, `arch`, `ba`,
`dt`, `cta`.

## Adding a block

1. `src/blocks/<Name>.tsx` + `<name>.css`; props typed, content passed in (or read from `src/data/`).
2. Add it to the gallery (`src/library/Library.tsx`, sample data in `src/library/samples.ts` from the decks).
3. Check the gallery at the nine sizes (`qa/measure.html?path=/_library`) and at 1440×900, 1366×768, 390×844.
4. Add a row above.

### The package pages and the Platform overview

`src/pages/PackagePage.tsx` renders `/platform/base`, `/platform/portals` and `/platform/premium` from
`src/data/packages.ts`; `src/pages/Platform.tsx` renders `/platform`. Sections and tones:

| Page | Sections (tone / treatment) |
|---|---|
| Package | Hero `module` with `HeroScreens` and the client band → jump bar and every module as `ModuleCards` under a header row per business area (Portals: `ChainDiagram` beside `PortalLayers`) (white / soft) → package-specific: Base `FlowStrip` one record, Portals `ChainDiagram` with every portal lit, Premium `PremiumSpotlight` (paper, paper, night / mark, mark, grad) → `PackagePlate` beside `PackageLinks`, current tier lifted (white / grad) → FAQ (paper / mark) → CTA |
| Platform | Hero `module` with `HeroScreens` → `LayeredArchitecture` (paper / soft) → `PlatformStrip` (white / mark) → `PackagePlate` beside `PackageLinks` (paper / grad) → `PhoneRow` (white / soft) → integrations `CapabilityTiles` (`columns={3}`) + links to ERP Connect and Security (paper / mark) → FAQ (white / grad) → CTA |

Module cards come from `pages/module-card.ts` (`cardFor`), shared with the module page's related modules; a package
page stops the build if a card has no page.
