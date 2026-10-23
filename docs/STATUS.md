# Status

_Last updated: 2026-10-23. Update this file at the end of every task and before clearing context._

## Where we are

**Stage C (phased implementation). Phases 1–4 done; Phase 5 built (2026-10-23): the module page template on
`/modules/order-to-cash`, waiting for the user's review before Phase 6.** The
homepage is done (Stage A). The site plan ([SITE-PLAN.md](SITE-PLAN.md), 60 pages) was approved on 2026-10-23,
and the phased plan is [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md): 28 phases (foundations 1–5, module
pages 6–20, other pages 21–26, homepage integration 27, launch QA 28). One phase per session; the user approves
the module template after Phase 5. See [WORKFLOW.md](WORKFLOW.md).

Everything builds (`npm run build` passes) and has been checked in the browser at phone, tablet, laptop and
large-monitor sizes. The project is on GitHub (public, by the user's choice): https://github.com/adityayadav30561-rgb/mavro-ai. See docs/CLOUD.md.

## The homepage, in order (`src/pages/Home.tsx`)

| # | Section | Anchor | State |
|---|---|---|---|
| 1 | Hero: audience headline, proof points, CTAs, 3D platform scene (three.js), two floating panels (sales order top left, work order bottom right), client logo band | `#top` | Done |
| 2 | PlatformIntro: base modules, portals, premium on one platform (isometric diagram); tier labels link to their package in Explore, hovering lifts the plate, clicking a plate follows the link | `#platform` | Done |
| 3 | Showcase: product screenshots as five teams see them (tabs left, screen right) | `#product` | Done |
| 4 | Connect: ERP Connect as a dark focus band: SAP/Oracle/Tally/legacy sync via the MAVRO Database, "no direct ERP access", five benefits from the connectivity deck, dark CTA | `#connect` | Done (2026-10-22) |
| 5 | Explore: Base / Portals / Premium as package tabs; featured modules in a rail beside a panel (story + illustrative screen); "All N modules" opens the catalogue menu. `#modules`, `#portals`, `#premium` land here and pick the tab | `#explore` | Done (2026-10-22) |
| 8 | Workflow: order to cash across seven modules | `#workflow` | Done |
| 8b | Implementation: live in 25–30 days, plan + phases + support | `#implementation` | Done (2026-10-22) |
| 9 | Industries: Manufacturing, Distribution, Pharma, Service providers (IT companies; replaced Exporters 2026-10-23) as cards; panel with headline, three deck-backed points, the order flow (shared ends, configured middle) and module chips that open that module in Explore | `#industries` | Done (2026-10-22) |
| 10 | WhyMavro: six principles + "Trust, built in" card (India compliance / Security tabs) | `#why` | Done (2026-10-22) |
| 11 | CustomerProof: three anonymised customer stories from deck slide 23 (FSC/EUDR portal, TMS alongside SAP S/4HANA, vendor invoice management), dark band, each led by its result | `#stories` | Done (2026-10-23) |
| 11b | FAQ: 15 questions in two columns of native `<details>`, written for SEO/AEO/GEO, mirrored in FAQPage structured data | `#faq` | Done (2026-10-23) |
| 12 | Demo: navy panel with pitch, direct email and phone, and the demo request form | `#demo` | Done (2026-10-22) |

Header (Phase 3): logo, Platform ▾ (branched mega menu), Solutions ▾, Customers, Resources ▾, Company ▾, Request a
demo. Links come from `src/data/nav.ts` and go to real pages as routes are added (`src/links.ts`); until then they
land on the homepage section that covers them. Mobile: full-screen drawer with module search and accordions.

## Most recent work (newest first)

- 2026-10-23, **Phase 5 (module page template, piloted on Order to Cash) built; waiting for the user's review.**
  - **FAQ:** "exporters" removed from the three homepage FAQ answers (user).
  - **Page:** `src/pages/ModulePage.tsx`, ten sections from the library (table in docs/LIBRARY.md); copy shared
    across modules in `src/data/modules/template.ts`; O2C content in `src/data/modules/content/order-to-cash.ts`
    from v2 slides 34–35 (tagline, four tiles with screen figures, what, six why points, flow from/to with what
    passes, four industries with a line each, five roles, four related modules, five FAQs, SEO).
  - **Routes:** generated from the content registry (`routes.ts`, `moduleRoutes`): title, description, trail Home
    / Base modules (falls back to `/#modules`) / Order to Cash, SoftwareApplication (part of MAVRO) + FAQPage. In
    the sitemap. The menus and footer now link Order to Cash to its page by themselves.
  - **Screens:** `order-to-cash/order-book` and `order-workflow` (the approved `o2c` and `sales-order` moved onto
    the module shell), `collections` (Phase 4), the new `order-register` (186 orders, ₹11.40 Cr booked, ₹4.86 Cr
    open, 42 of 61 allocated, e-invoice IRNs), and the phone `credit-release` in the hero.
  - **Blocks:** new `Audience` (who uses it; in the gallery and LIBRARY.md); FlowStrip nodes take a `note`;
    ModuleCards with exactly four cards use one row of four; PageHero module variant: plate and screen hang from
    the hero's bottom edge; Screen phone frame; DemoLink / PageHero / CtaBand take `module`, and the demo form
    starts its message with the module (`?module=`, only catalogue names accepted). Breadcrumbs and the
    BreadcrumbList use a crumb's fallback until its page exists (`crumbTarget` in links.ts).
  - Verified: tsc and build; `/modules/order-to-cash` at 1440×900, 1366×768, 1024×768, 1920×1080 and 390×844;
    `qa/measure.html` no overflow at nine sizes on the module page, `/_library` and `/`; one H1; prerendered head
    (title, description, canonical, JSON-LD); production hydration with no console errors and no three.js;
    tour keyboard; demo prefill from the CTA (Base modules ticked, message set).
  - **Section heights** (1440×900): hero 0.88, capabilities 0.58, screens 1.04, what 0.75, flow 0.74, audience 0.89,
    platform 0.80, related 0.61, FAQ 0.75, CTA 0.40. Capabilities and related are lighter than the 0.75 guide; left
    as they are for the review.

- 2026-10-23, after Phase 4 (user feedback):
  - **Platform menu:** the "Platform overview" branch is gone (user: the packages already cover every module, and
    it looked cluttered). The rail is Base modules, Portals, Premium modules, ERP Connect and opens on Base (also
    from the 404's "Browse all modules"); the stage keeps one height (43rem, Base's). Removed: the overview list,
    its package filter and their styles. Platform overview stays in the footer (`overviewLink` in nav.ts); the
    drawer no longer lists it. Checked at 1440 × 900, 1024 × 768 and 390 × 844.
  - **Missing deck content rule:** where the decks say nothing, use standard information for that kind of module
    (DECISIONS.md, standing preferences). The Accounting gap is closed on that basis (sources.ts).

- 2026-10-23, **Phase 4 (module content model and screen kit) done.** On `main`.
  - **Site title** now "MAVRO | Enterprise ERP for manufacturers, distributors and service providers" (user asked;
    `site.title` and `index.html`). The FAQ answers still mention exporters (see open items).
  - **`src/data/modules/`** replaces `src/data/modules.ts` (moved to `catalogue.ts`, imports unchanged):
    `slugs.ts` (the 42 page slugs, `ModuleSlug`; every catalogue entry has an explicit `slug`, checked once each at
    load), `sources.ts` (deck and slides per module, a `Record` over all 42 slugs), `schema.ts` (`ModuleContent`:
    tagline, four tiles, what, six why points, flow from/to, industries, roles, related, 3–4 screens, scenario,
    3–5 FAQ, SEO; tuples enforce the counts), `content/index.ts` (empty registry; one file per module as module
    phases land), `catalogue` / `entryBySlug` (modules and portals as one list). `IndustrySlug` in home.ts.
    Distributor portal slug: `distributor-portal`.
  - **Content gap:** Document Management is resolved (AMR L1 deck slide 78 has the full appendix slide). Accounting
    has no detail slide in any deck; only summary points (v2 slides 2, 7, 21, 24). Open item for the user.
  - **Prototype:** `prototype/modules/<slug>/`; `module-shell.js` (ES module) builds the sidebar from the site's
    catalogue: every module grouped by business area (short labels), active area open, the active module's views
    listed; then loads `shell.js` for charts (which now skips its own chrome on module screens; homepage screens
    unchanged). `phone.css` + phone chrome (status bar, app bar, tab bar with badges). `app.css` pins the canvas
    to 960px high so captures are exact.
  - **Sample screens (both real Order to Cash views for Phase 5):** `order-to-cash/collections` (deck screen 03,
    Collections and Dunning Queue: ₹1.37 Cr receivables, ageing, ten-account dunning queue, the dunning ladder)
    and `order-to-cash/credit-release` (phone: release SO-24861, over its limit by ₹2.10 L). Figures agree with
    the homepage `o2c` and `sales-order` screens; scenario in the comment at the top of collections.html.
  - **`scripts/shots.mjs`:** captures `prototype/modules/<slug>/*.html` (`npm run shots order-to-cash` or
    `order-to-cash/collections`) into `src/assets/screens/<slug>/`; phone screens at 390 × 844, 3x (1170 and 780
    wide). Renders in a larger window and crops to the canvas, because this Chromium's viewport is ~87px shorter
    than its window. Re-capturing `o2c` this way matched the committed image's layout (0.67% of pixels differ,
    font rendering); the committed homepage screens were left as they were.
  - **`Screen`** takes `<slug>/<file>` names and `device="phone"` (navy phone frame drawn in CSS). A "ScreenKit"
    entry in `/_library` shows both samples.
  - **docs/VERIFY.md:** a product-screen checklist (fit, scenario note, figures, deck view, sidebar, alt text,
    capture without touching homepage screens).
  - Verified: tsc, build; both screens fit (`main` has no overflow) and captured exactly; `/_library` checked at
    1440 × 900 and 390 × 844; `qa/measure.html` no overflow at nine sizes on `/` and `/_library`.

- 2026-10-23, **Phase 3 (header, mega menu, mobile menu, footer) done.** On `main`.
  - **Data:** `src/data/nav.ts` holds the header, every menu and the footer. Each link names its page (SITE-PLAN.md
    URL) and a homepage fallback; `src/links.ts` `target()` picks the page once its route exists, the fallback until
    then, and hides links with neither (About, Careers, Blog, Privacy, Terms today). `site.ts` lost `nav`, `footer`,
    `legal`, `live`. `modules.ts` gained `packs.*.page`, `slugify`, `modulePage` (`/modules/<slug>`), portal
    `summary` and `portals`; industries gained `slug`. New icon: `search`.
  - **Header:** Platform ▾, Solutions ▾, Customers, Resources ▾, Company ▾, Request a demo ("Explore the platform"
    link removed, as in the plan). One menu at a time; hover intent; Escape returns focus; current page gets
    `aria-current`.
  - **Platform menu** (`PlatformMenu.tsx`): rail of five branches with counts (42 / 18 / 4 / 20); overview by area
    with an All / Base / Portals / Premium filter; package branches with icon + summary per module; Portals with
    cards, points and the supply-to-retail chain; ERP Connect with systems, benefits and the rule; featured card
    with a miniature Connect board (Connect branch: the TMS story). Up/Down/Home/End on the rail. Constant height.
    Explore's "All N modules" opens the menu on that package's branch (drawer on phones, package expanded).
  - **Solutions / Resources / Company** (`NavMenus.tsx`), **drawer** (`Drawer.tsx`: search, three-level accordions,
    pinned demo button), **footer** (five columns + contact block).
  - **Homepage:** Industries answers `#industry-<slug>` (picks the tab), the fallback for the Solutions links.
  - Verified: keyboard (Tab, Enter, rail arrows, Escape focus return), hover intent and diagonal crossing, touch
    taps, outside tap, drawer focus trap and Escape, catalogue button on desktop and phone, industry deep links,
    `/#…` links off the homepage; screenshots at 1440×900, 1366×768, 1280×720, 1024×768, 2560×1440, 390×844;
    `qa/measure.html` no overflow at nine sizes on `/`, `/pipeline-check`, `/404`, `/_library`; production build
    hydrates with no console errors.

- 2026-10-23, **Phase 2 (section library) done**, in two parts. All work is on `main` (user's rule).
  - **2a, blocks taken from the homepage** into `src/blocks/`: FaqBlock (full section; FAQPage via
    `seo/schema.ts` `faqPage`), StoryCards, TrustPanel (was why/TrustCard), ChainDiagram (was explore/PortalChain;
    icons and badge now in data), Timeline (from Implementation; data now `implementation.plan`), ConnectBoard
    (from Connect), ScreenFrame (Explore's bleeding screenshot), InlineCta (moved from components/). Stylesheets
    split into block and section parts; class names kept, so the homepage HTML is unchanged except the screen frame
    wrapper (`sframe`, two renamed classes). Verified: the computed style and box of every homepage element at
    1440×900, 390×844 and 1024×768 are identical to before.
  - **2b, new blocks:** Section (+ SectionHead/Headline with the treatments), PageHero (module, industry, package,
    solution, simple; light or dark; the header stays solid white over a dark hero so the logo is never on navy),
    Breadcrumbs (from the route's crumbs), ScreenTour, CapabilityTiles, WhatWhy, FlowStrip (columns or chain;
    shared / configured / current nodes), ModuleCards, PlatformStrip (deck slide 12, `data/platform.ts`),
    LayeredArchitecture (slide 11), BeforeAfter and DataTable, CtaBand, DemoLink, TrustPanel `expanded` variant.
    New icons: bell, rules, cross. New tokens: `--cyan-600`, `--bad`, `--bad-50`.
  - **Demo prefill across pages:** links from other pages go to `/?interest=…#demo`; the form ticks that interest.
  - **Gallery** at `/_library` (dev only, not in production builds): every block with deck-sourced sample data and a
    PageHero variant switcher; no overflow at the nine sizes; checked at 1440×900 and 390×844.
  - **docs/LIBRARY.md**: each block, its props, where it is used, the page rhythm rules.

- 2026-10-23, **Phase 1 (routing, prerender, per-page SEO) done.** The site is now multi-page (README "Pages and
  routing"): `src/routes.ts` (route table), `src/Layout.tsx` (skip link, Nav, main, Footer), `src/pages/` (Home,
  NotFound, PipelineCheck; `src/App.tsx` became `src/pages/Home.tsx`), `src/routing.tsx` (`useHref`: header,
  footer and CTA `#section` links become `/#section` off the homepage). The prerender writes one HTML file per
  route with its own head and a modulepreload of its page chunk, plus `sitemap.xml` from the table; `head.ts`
  takes the route (BreadcrumbList below the homepage, noindex outside the sitemap). A designed 404 page
  (`dist/404.html`: headline, record-lookup card showing the missing address, four closest destinations, "Browse
  all modules" opens the catalogue). Hidden `/pipeline-check` proves the pipeline. `qa/measure.html` and
  `qa/shot.html` take `path=`; `vite preview` now serves clean URLs and the 404 like a static host. Files touched
  are snapshotted in `legacy/routing-2026-10-23/`.
  Verified: `dist/index.html` identical to before apart from one added modulepreload line; homepage
  `qa/measure.html` output identical at all nine sizes; new pages no overflow at nine sizes; checked at 1440×900,
  1366×768, 390×844; the check page and the 404 hydrate with no console errors and load no three.js (homepage
  loads Home + scene as before); unknown URLs return 404 in preview.

- 2026-10-23: the project was put under git and pushed to GitHub (public repo, by the user's choice) so work can continue from
  another Claude account or a cloud session. Added `docs/CLOUD.md` (setup), `docs/source/` (text of the decks),
  `CHROME_PATH` and Linux browser paths in the capture scripts.

- 2026-10-23: site plan approved; `docs/IMPLEMENTATION-PLAN.md` written (28 phases, baseline "Done when" for
  every phase, a recipe for module phases, existing screens to reuse, open items).

- 2026-10-23, Stage B review round 1: the user changed the plan. **Service providers (IT companies and
  professional services) replace Exporters** among the industries, on the homepage too; **no separate FAQ page**.
  Project Management joined Explore's Base tab (7 modules) with a new bespoke screen (`prototype/project.html`,
  PRJ-0217 milestone plan) so the Service providers chips land on a real panel. SITE-PLAN.md is draft 3 (60
  pages); waiting for the user's approval.

- Item 10 done (2026-10-23): customer stories (`#stories`) from deck slide 23, rewritten as short cases: client
  type and sector, the headline result (the deck's: due diligence 4 weeks → 2 hours, 85% fewer freight billing
  disputes, vendor onboarding 5 weeks → 48 hours), starting point, what was built, three deliverables, links to
  the related modules in Explore. Dark band between Why (white) and FAQ (paper). Footer "Customer stories".
  **The improvement plan is complete except item 7 (MAVRO AI, parked).** Next: the Stage A exit checklist
  (docs/WORKFLOW.md) with the user, then Stage B.

- Item 9 done (2026-10-23): FAQ section before the demo (paper background, gradient headline), 15 questions
  from the decks, each answer opening with a direct statement that names MAVRO (32–67 words). The same text
  produces the FAQPage JSON-LD in `src/seo/head.ts`; the footer's Resources column now shows "FAQ".

- Item 8 done (2026-10-23): hero down to two panels on a diagonal (the inspection panel is gone); the light
  pulse along the Workflow line removed; headline treatments now alternate so no neighbours match (rule in
  DECISIONS.md): Hero grad, Intro soft, Showcase mark, Connect grad (dark), Explore soft, Workflow centred one
  colour, Implementation grad, Industries mark, Why soft, Demo plain on navy.

- Item 6 done (2026-10-22): Industries rebuilt from the deck's audiences. Module chips carry `data-module`;
  Explore's link handler opens that package with that module selected (FSC Portal was added to Premium's
  featured list so exporters have a module to land on). Chips only use modules Explore features.

- Explore's Base tab now shows a full product screen per featured module instead of the mini snippets (user
  request): six new prototype pages (`prototype/o2c.html`, `accounting`, `payroll`, `purchase-order`,
  `work-order`, `stock-item`) in the Showcase design, captured by `npm run shots`. The prototype sidebar gained
  People (Employees, Attendance, Payroll) and General ledger; the Showcase screenshots were not recaptured, so
  their sidebars still show the old list (recapture all with `npm run shots` if that matters). `scripts/shots.mjs`
  now waits for Edge to finish writing each file.

- Improvement plan items 2–4 done (2026-10-22): demo form + mid-page CTAs; "Trust, built in" card in Why
  MAVRO and footer contact details; the three module sections condensed into Explore the platform (about 9.3
  screens down to 1.2 on desktop). The old sections are snapshotted in `legacy/module-sections-2026-10-22/`.
- Item 5 done (2026-10-22): ERP Connect is a dark band (Showcase paper → Connect navy → Explore white →
  Workflow paper) with the deck's five benefits; the platform diagram's tiers are links. `qa/shot.html` gained
  `hover=`; `qa/measure.html` ignores elements clipped by an ancestor (the Explore screenshot bleed).

- Improvement plan item 1 done: sharper hero (audience headline, proof points) and the new Implementation
  section. Section backgrounds now run Workflow (paper), Implementation (white), Industries (paper), Why (white).

- Hero band under the headline now shows **20 client logos** (cut from the deck's clientele slide by
  `npm run clients`), muted grey, colour on hover, labelled "Trusted by". Replaces the module-name marquee.
- Removed all eyebrow labels (small caps text above headings) site-wide.
- Premium section restored to list-left / panel-right after the user rejected a chip layout.
- Site-wide responsive rework: rem everywhere, desktop root size scales with the window, sections fit about one
  screen on every desktop size; phones and tablets reflow.
- Base modules became a pinned horizontal carousel with mini module screens (user rejected 3D figurines).
- Section order changed so Product and ERP Connect come right after the platform intro.
- Catalogue rebuilt from the product deck: every module live (no "Coming soon"), no "Premium" tags on modules.
- Added Portals and ERP Connect sections from the two decks.

## Improvement plan (agreed 2026-10-22, do one at a time, most important first)

The user approved all of these after a design review, to be built one by one with full design effort (no
shortcuts). Tick each when built, verified and documented; checkpoint (and suggest clearing context) between
items when context is heavy.

| # | Item | Notes | State |
|---|---|---|---|
| 1 | **Sharper hero + "Live in 25–30 days" Implementation section** | Hero: "One ERP for manufacturers & distributors." + three proof points (live in 25–30 days, GST and India payroll, works with SAP/Oracle/Tally). New `#implementation` section after Workflow (deck slides 25 + 28): 30-day timeline with growing bars and go-live milestones, four phase cards, support model strip. ~1.25 screens on desktop. | **Done 2026-10-22** |
| 2 | **Real demo form + mid-page CTAs** | Form: name, company, email, phone, current ERP, modules of interest. Static site: submit to a configurable endpoint (`site.demoEndpoint`), fall back to a pre-filled email. CTA after ERP Connect ("Running SAP or Tally?") and after the modules. | **Done 2026-10-22** |
| 3 | **Security, compliance, contact details** | Why MAVRO: replace the duplicate document trail with India compliance (GST e-invoicing, GSTR-1/3B, PF/ESI/TDS) and security facts (deck slides 11–12). Footer: head office address, phone, email (from the deck). | **Done 2026-10-22** |
| 4 | **Condense the three module sections into one "Explore the platform"** | Tabs Base / Portals / Premium, the strongest modules of each with full treatment; the complete catalogue stays in the mega-menu and later on module pages (Stage B). Supersedes "every module gets its own space" on the homepage (user approved 2026-10-22). | **Done 2026-10-22** |
| 5 | **ERP Connect as a dark focus section; clickable platform diagram** | The tiers in the platform diagram link to their packages. | **Done 2026-10-22** |
| 6 | **Industries rebuilt from the deck's audiences** | Manufacturing/OEM, Distribution/FMCG (schemes, portals), Pharma, Exporters; each links to its relevant modules. | **Done 2026-10-22** |
| 7 | **MAVRO AI section** | From deck slides 13–18 (predict, extract, recommend, detect; data stays yours; human in the loop; on by module). Ask the user which AI capabilities are live before publishing. | **Parked** (user, 2026-10-22: "park ai capabilities for later"); skip until the user raises it |
| 8 | **Visual refinements** | Two hero panels instead of three; remove packet animations in Workflow (the Portals section is gone); vary the "dark + grey second line" headline pattern. (The carousel was removed in item 4.) | **Done 2026-10-23** |
| 9 | **FAQ** | Migration from Tally/SAP, hosting, data ownership, implementation, pricing model. Needs the user's answers. | **Done 2026-10-23** (written from the decks for SEO/AEO/GEO at the user's request; pricing left out) |
| 10 | **Customer stories** | Deck slide 23 has three anonymised implementations (FSC/EUDR portal, multi-plant TMS on SAP S/4HANA, procurement VIM); confirm with the user before using. | **Done 2026-10-23** (user: use them, \"in a way it suits on the site, not as it is\") |

## Next steps

1. **The user reviews `/modules/order-to-cash`** (the template). Apply the feedback to the template and
   DECISIONS.md, then mark Phase 5 done.
2. Phase 6: Accounting, Vendor Invoice Management, Travel and Expense (Accounting from standard accounting-module
   information plus the deck's summary points).

## Open items (need the user or real assets)

| Item | Where | Now |
|---|---|---|
| Production domain | `site.url` in `src/data/site.ts` | `https://mavro.example` placeholder |
| Demo form endpoint | `site.demoEndpoint` in `src/data/site.ts` | `null`, so the form opens a pre-filled email to contact@saisatwik.com. Set a form service URL (Formspree, Basin, HubSpot or MAVRO's own API) that accepts a JSON POST to receive requests directly |
| Industry list | `industries` in `src/data/home.ts` | Manufacturing, Distribution, Pharma, Service providers (Service providers replaced Exporters at the user's request, 2026-10-23). Confirm with the user before launch |
| Testimonials / case studies | `proof` in `src/data/home.ts` | three anonymised stories from deck slide 23 (approved 2026-10-23). Named stories, quotes or logos per story only with the client's approval |
| Social share image | `src/seo/head.ts` | none |
| FAQ: pricing and hosting | `faq.items` in home.ts | not answered: the decks do not state a pricing model, deployment options beyond "cloud-native" or data ownership terms. Add those questions once the user supplies the answers |
| About, Careers, Blog, Privacy, Terms | `src/data/nav.ts` (page, no fallback) | planned pages; links stay hidden until their routes exist |
| Hidden test page | `/pipeline-check` in `src/routes.ts` | noindex, not linked, not in the sitemap; remove at launch QA (Phase 28) |
| One stylesheet for all pages | `cssCodeSplit: false` in vite.config.ts | every page loads the full CSS (96 kB, about 19 kB gzip, after Phase 2's blocks); revisit in the Phase 28 performance pass as pages grow |
| 404 has no canonical | `src/seo/head.ts` | deliberate (the plan said "own canonical"): the 404 answers at any missing URL, so it names none and is noindex |

## Known quirks

- Headless Edge keeps its window at least ~500px wide, so phone-width captures from `scripts/capture.mjs` are
  cropped and look cut off on the right. Check phones in the browser pane (mobile preset) and measure with
  JavaScript or `qa/measure.html` instead.
- The browser pane sometimes stops rendering frames (IntersectionObserver never fires, so nothing reveals).
  It is the pane, not the site: reload, or use `scripts/capture.mjs` with `reveal=1&still=1`.

- Right after a CSS edit, a fresh headless capture from the dev server can show stale styles. Trust the live
  page, or capture the production build (docs/VERIFY.md).
- The in-app browser pane's screenshots are down-scaled and sometimes lag; read values with JavaScript or use
  `scripts/capture.mjs` for full-resolution images.
