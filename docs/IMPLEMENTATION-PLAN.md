# Implementation plan (Stage C)

_Written 2026-10-23 from the approved [SITE-PLAN.md](SITE-PLAN.md) (draft 3, 60 pages). Work one phase per session,
in order, unless the user reorders. Tick a phase here and in [STATUS.md](STATUS.md) when its "Done when" holds._

## How to use this plan

- **One phase per session.** Read CLAUDE.md, STATUS.md, this file's current phase and DECISIONS.md first. At the
  end of the phase: build, update docs, tick the phase, and suggest clearing the session (see WORKFLOW.md).
- **Never cut a phase short to save effort.** If a phase is too big for one session, split it here (for example
  "Phase 9a / 9b") and finish each part properly. A smaller finished phase beats a larger thin one.
- **Every phase meets the baseline below** in addition to its own "Done when".

### Baseline "Done when" (every phase)

1. `npx tsc --noEmit` and `npm run build` pass; no console errors.
2. Every page touched is checked at 1440×900, 1366×768 and a phone (390×844), plus the nine sizes in
   `qa/measure.html` (from Phase 1 it measures any route): no overflow, desktop sections about 0.75–1.2 screens.
3. The quality bar in SITE-PLAN.md section 5 holds for every section touched: deck-sourced copy, a designed
   visual, states and motion, accessibility, SEO (title, description, one H1, structured data, in the sitemap).
4. The design rules hold: tokens and rem only, tier colours, backgrounds alternate, headline treatments vary
   between neighbours, no eyebrow labels, no "Coming soon", no "Premium" tags on modules (DECISIONS.md).
5. STATUS.md updated (what changed, next phase, open items); DECISIONS.md updated with any preference the user
   gave; this file ticked.

### Recipe for a module phase (phases 6–20)

For each module in the phase:

1. **Content.** Extract the module's appendix slide (product deck slides 29–111) and any detailed deck (HRMS,
   TMS, WMS) into its entry in `src/data/modules/` (tagline, four capability tiles, what it does, six "why it
   matters" points, where it sits (inputs and outputs), industries and roles, three to five FAQs, SEO title and
   description). No invented facts; FAQ answers written for search like the homepage FAQ.
2. **Scenario.** Decide the module's one scenario (records, figures, people) and write it at the top of its first
   screen file, so all its screens agree. Tie it to Northfield Precision / SO-24817 where the module touches the
   order story.
3. **Screens.** Design and build 3–4 bespoke screens in `prototype/modules/<slug>/` (the views a user of this
   module works in; the deck's text guides what they must show). Check each at 1440×960 for fit and
   consistency, capture with `npm run shots`, and write alt text. Reuse an existing screen only where it is
   genuinely this module's view.
4. **Page.** The module page renders from the data with all ten template sections; review it at the three sizes
   and with `qa/measure.html`; read the copy once more against the deck.
5. **Links.** Related modules and industries link correctly; the module appears in the menu, footer (if
   popular), sitemap and its package page data.

### Existing screens to reuse

| Screen | Module page |
|---|---|
| `o2c`, `sales-order`, `finance` | Order to Cash (orders list, order detail, receivables) |
| `accounting` | Accounting |
| `payroll` | HRMS and Payroll |
| `purchase-order`, `procurement` (RFQ) | Procure to Pay |
| `work-order`, `production` (shop floor), `quality` | Production Management / Shop Floor Control |
| `stock-item`, `inventory` | Inventory Management |
| `project` | Project Management |
| `access` | Security and compliance page |
| `overview` | Platform overview |

---

## Phase overview

| # | Phase | Pages / output | Status |
|---|---|---|---|
| 1 | Routing, prerender and per-page SEO | route table, multi-page prerender, sitemap, 404 | **Done 2026-10-23** |
| 2 | Section library | shared blocks + a QA gallery | **Done 2026-10-23** |
| 3 | Header, mega menu, mobile menu, footer | new navigation | **Done 2026-10-23** |
| 4 | Module content model and screen kit | data schema, prototype structure, phone shell | **Done 2026-10-23** |
| 5 | Module page template, piloted on Order to Cash | `/modules/order-to-cash` | **Done 2026-10-23** (two review rounds) |
| 6 | Modules: Accounting, Vendor Invoice Management, Travel and Expense | 3 pages | **Done 2026-10-23** |
| 7 | Modules: CRM, Sales Force Automation, Customer Service | 3 pages | **Done 2026-10-23** |
| 8 | Modules: Procure to Pay, Inventory Management, Gate Entry | 3 pages | **Done 2026-10-23** |
| 9 | Modules: Production Management, mVLens Vendor Audit, Asset Management | 3 pages | **Done 2026-10-24** |
| 10 | Modules: HRMS and Payroll, Roster Ledger, Rest Hours Log | 3 pages | **Done 2026-10-24** |
| 11 | Modules: Project Management, Data Analytics | 2 pages | **Done 2026-10-24** |
| 12 | Portals: Vendor Portal, Distributor / B2B Portal | 2 pages | **Done 2026-10-24** |
| 13 | Portals: Dealer Portal, Retailer Portal | 2 pages | **Done 2026-10-24** |
| 14 | Premium: Transportation Management, Fleet Management, Warehouse Management | 3 pages | **Done 2026-10-24** |
| 15 | Premium: Scheme and Rebate, Ecommerce Integration, Subscription Management | 3 pages | **Done 2026-10-26** |
| 16 | Premium: PPDS, Shop Floor Control, FSC Portal | 3 pages | **Done 2026-10-26** |
| 17 | Premium: Cost Forecasting, Audit Management, Insurance Management | 3 pages | **Done 2026-10-26** |
| 18 | Premium: Auction and Bidding, Real Estate Management, Learning Management | 3 pages | **Done 2026-10-30** |
| 19 | Premium: Contract Labour Supply, Contract Labour Purchase | 2 pages | **Done 2026-10-30** |
| 20 | Premium: Business Analyst App, Master Data Management, Document Management | 3 pages | **Done 2026-10-30** |
| 21 | Package pages and Platform overview | 4 pages + mobile screens | **Done 2026-10-30** |
| 22 | ERP Connect page | 1 page + 2 screens | Done (2026-10-30) |
| 23 | Industry pages: Manufacturing, Pharma | 2 pages + 2 screens | Done (2026-10-31) |
| 24 | Industry pages: Distribution, Service providers | 2 pages + 2 screens | Done (2026-10-31) |
| 25 | Implementation and Security and compliance pages | 2 pages | To do |
| 26 | Customers, Company, Contact, Legal, blog and careers scaffolds | 5 pages + 2 hidden | To do |
| 27 | Homepage integration and cross-linking | homepage links to pages | To do |
| 28 | Launch QA | full-site audit | To do |

Module pages: 1 + 17 base + 4 portals + 20 premium = 42. Pages in total: 60 (SITE-PLAN.md section 2).

---

## Phases in detail

### Phase 1: Routing, prerender and per-page SEO

- **Goal:** the site can have many prerendered pages at clean URLs, each with its own SEO, without changing the
  homepage.
- **Scope:** `src/routes.ts` (path, page, title, description, breadcrumbs, structured data, `inSitemap`);
  `src/Layout.tsx` (Nav, main, Footer); `entry-server.tsx` renders a route; `entry-client.tsx` hydrates the page
  for `location.pathname` (page chunks split so module pages never load three.js); `scripts/prerender.mjs`
  writes `dist/<path>/index.html` for every route and `sitemap.xml` from the same table; `src/seo/head.ts` takes
  per-route data (title, description, canonical, Open Graph, JSON-LD: Organization site-wide, BreadcrumbList,
  plus page-specific); a designed 404 page; `qa/measure.html` and `qa/shot.html` accept a `path`; dev server
  serves routes; a hidden test route proves the pipeline. Snapshot the touched files into `legacy/` first.
- **Depends on:** nothing.
- **Done when:** `dist/index.html` is unchanged in content (homepage measure identical to before), a test route
  and `/404` prerender with their own title/description/canonical, `sitemap.xml` lists routes, the test route
  hydrates without errors, three.js is not in the test route's bundle.

### Phase 2: Section library

- **Goal:** every block in SITE-PLAN.md section 4 exists once, reusable and documented.
- **Scope:** `src/blocks/`: Breadcrumbs (with schema), PageHero (module, package, industry, solution, simple
  variants), ScreenFrame (bleed / contained), ScreenTour, CapabilityTiles, WhatWhy, FlowStrip, ModuleCards,
  PlatformStrip, ChainDiagram, ArchitectureDiagram, Timeline, StoryCards, TrustPanel, ComparisonTable, FaqBlock,
  CtaBand, InlineCta. Homepage sections that already have these (FAQ, Explore screen frame, PortalChain,
  Implementation timeline, story cards, trust card, ERP Connect board) are refactored to use the shared blocks.
  A dev-only gallery route (`/_library`, not in the sitemap, not built for production) shows every block with
  sample data. A short `docs/LIBRARY.md`: each block, its props, where it is used.
- **Depends on:** 1.
- **Done when:** every block renders in the gallery at the nine sizes with no overflow; the homepage looks and
  measures the same after the refactor; LIBRARY.md lists every block.

### Phase 3: Header, mega menu, mobile menu, footer

- **Goal:** the navigation from SITE-PLAN.md section 8, linking to real routes.
- **Scope:** header (Platform ▾, Solutions ▾, Customers, Resources ▾, Company ▾, Request a demo); Platform mega
  menu with the branch rail (overview, three packages, ERP Connect), modules by business area with icon and
  summary, featured ERP Connect card; Solutions (by industry, by need, featured story); Resources; Company; mobile
  drawer with three-level accordions and a module search; footer columns and contact block. A link renders only
  if its route exists (the `href: null` rule, now driven by the route table), so the menu grows as pages land.
  Data in `src/data/site.ts` / a new `src/data/nav.ts`.
- **Depends on:** 1, 2.
- **Done when:** keyboard (Tab, arrows within the branch rail, Escape returns focus), hover intent, touch, focus
  trap in the drawer, `aria-expanded` states all work; checked at all sizes; homepage anchors still work.

### Phase 4: Module content model and screen kit

- **Goal:** the data and prototype structure that all 42 module pages and ~150 screens use.
- **Scope:** `src/data/modules/` with a typed schema (slug, tagline, tiles, what, why, relations, industries,
  roles, faq, seo, screens[] with name, caption, alt); package metadata; slugs for all 42. Prototype: folder per
  module (`prototype/modules/<slug>/`), the sidebar in `shell.js` extended to every module and grouped by area,
  a phone shell (`prototype/phone.css`) for mobile screens; `scripts/shots.mjs` captures nested paths and writes
  `src/assets/screens/<slug>/<n>.webp`. A screen checklist in `docs/VERIFY.md` (fit at 1440×960, figures agree,
  scenario note, alt text). Content gap check: Accounting and Document Management in Mavro Modules v1 / AMR decks.
- **Depends on:** 1.
- **Done when:** the schema type-checks with all 42 slugs; a sample nested screen captures correctly; the phone
  shell renders a test screen; the content gap is resolved or listed as an open item.

### Phase 5: Module page template, piloted on Order to Cash

- **Goal:** the module page template from SITE-PLAN.md section 3.1, complete and approved on one module.
- **Scope:** `src/pages/ModulePage.tsx` with all ten sections; Order to Cash content from slide 34; its screens:
  reuse `o2c` (orders list), `sales-order` (order detail) and `finance` (receivables) or replace them where a
  bespoke O2C view is better, plus one new screen (collections and dunning); demo form pre-ticks the module;
  SoftwareApplication + FAQPage + BreadcrumbList JSON-LD.
- **Depends on:** 2, 3, 4.
- **Done when:** `/modules/order-to-cash` passes the baseline; **the user reviews and approves the template**
  before Phase 6 (their feedback goes into DECISIONS.md and the template).

### Phases 6–20: module pages

Each follows the module recipe above. Depends on 5. Done when every module in the phase passes the baseline,
has its 3–4 bespoke screens, and its links (menu, related modules, package data, sitemap) are live.

| Phase | Modules | Deck slides | Notes |
|---|---|---|---|
| 6 | Accounting, Vendor Invoice Management, Travel and Expense | VIM 42, T&E 40; Accounting: v1 / AMR decks | Reuse `accounting`; resolve the Accounting content gap first |
| 7 | CRM, Sales Force Automation, Customer Service | 46, 52, 48 | SFA needs a phone screen (beat plan on mobile) |
| 8 | Procure to Pay, Inventory Management, Gate Entry | 38, 56, 54 | Reuse `purchase-order`, `procurement`, `stock-item`, `inventory` |
| 9 | Production Management, mVLens Vendor Audit, Asset Management | 36, 30, 44 | Reuse `work-order`, `quality` |
| 10 | HRMS and Payroll, Roster Ledger, Rest Hours Log | 32 (+ HRMS deck), 62, 60 | Reuse `payroll` |
| 11 | Project Management, Data Analytics | 50, 58 | Reuse `project` |
| 12 | Vendor Portal, Distributor / B2B Portal | 65, 67 | Portal pages use the chain section |
| 13 | Dealer Portal, Retailer Portal | 69, 71 | Retailer has a phone screen |
| 14 | Transportation Management, Fleet Management, Warehouse Management | 76 (+ TMS deck), 94, 96 (+ WMS deck) | The TMS customer story links here |
| 15 | Scheme and Rebate, Ecommerce Integration, Subscription Management | 86, 82, 102 | |
| 16 | PPDS, Shop Floor Control, FSC Portal | 110, 98; FSC: 10 and 23 (not 84, user's choice) | Reuse `production` for Shop Floor Control; FSC story links here |
| 17 | Cost Forecasting, Audit Management, Insurance Management | 74, 80, 100 | |
| 18 | Auction and Bidding, Real Estate Management, Learning Management | 78, 104, 92 | Each in its own scenario (property portfolio, e-sourcing event, courses) |
| 19 | Contract Labour Supply, Contract Labour Purchase | 106, 108 | CLRA, PF, ESIC compliance |
| 20 | Business Analyst App, Master Data Management, Document Management | 88, 90; DMS: v1 / AMR decks | Resolve the DMS content gap first |

### Phase 21: Package pages and Platform overview

- **Goal:** `/platform`, `/platform/base`, `/platform/portals`, `/platform/premium`.
- **Scope:** sections per SITE-PLAN.md 3.2 and 3.3; module cards with screen thumbnails; the Premium spotlight
  (from `legacy/module-sections-2026-10-22/`) on the Premium page; the layered architecture diagram; 3–4 new
  mobile screens in the phone shell for the platform page.
- **Depends on:** 6–20 (cards need every module's screens).
- **Done when:** baseline; every module card links to its page; the platform diagram tiers on the homepage can
  now point to the package pages.

### Phase 22: ERP Connect page

- **Goal:** `/erp-connect` per SITE-PLAN.md 3.4.
- **Scope:** dark hero, who it is for, gaps, the architecture board with a two-way sync step-through, five
  benefits, before/after table, the SAP Business One flow (B1 flow deck), the 25–30 day roadmap, FAQ, CTA; two new
  screens (the MAVRO App's boutique screen for an ERP user, a mobile approval).
- **Depends on:** 2, 4.
- **Done when:** baseline; the homepage ERP Connect CTA and menu link here.

### Phase 23: Industry pages, Manufacturing and Pharma

- **Goal:** `/industries/manufacturing`, `/industries/pharma` per SITE-PLAN.md 3.5.
- **Scope:** an industry hero screen each (Manufacturing: shop floor or multi-plant view; Pharma: batch record
  and QC release, from the Healthcare Manufacturing deck), gaps, configured flow with stages linked to modules,
  module cards, compliance, matching story, FAQ, CTA.
- **Depends on:** module phases for their modules (6–20).
- **Done when:** baseline; homepage Industries cards link to these pages.

### Phase 24: Industry pages, Distribution and Service providers

- **Goal:** `/industries/distribution`, `/industries/service-providers`.
- **Scope:** as Phase 23; hero screens (Distribution: scheme slab builder or channel view; Service providers: a
  client project with milestones, people and costs).
- **Depends on:** 23.
- **Done when:** baseline; all four industry pages linked from the menu and homepage.

### Phase 25: Implementation and Security and compliance

- **Goal:** `/implementation` and `/security-and-compliance` per SITE-PLAN.md 3.6 and 3.7.
- **Scope:** timeline (larger), migration map, risks and mitigation table, 90 days after, support model; the
  security page with architecture, access and audit (reuse the `access` screen), India compliance in depth,
  data protection figures, FAQ, CTA.
- **Depends on:** 2.
- **Done when:** baseline; FAQ answers on the homepage that point to `#implementation` / `#why` can point here.

### Phase 26: Customers, Company, Contact, Legal, blog and careers scaffolds

- **Goal:** the remaining pages.
- **Scope:** `/customers` (three stories in full + the 20-logo wall), `/company` (structure ready; copy from the
  user), `/contact` (full demo form, office, what happens next), `/privacy` and `/terms` (user's text), blog and
  careers routes and templates hidden from menus and the sitemap until content exists.
- **Depends on:** 2, 3.
- **Done when:** baseline for every page that has content; pages awaiting the user's text are listed in
  STATUS.md and not linked until filled.

### Phase 27: Homepage integration and cross-linking

- **Goal:** the homepage leads into the new pages.
- **Scope:** Explore "All N modules" → package pages and "See <module>" links → module pages; Industries cards →
  industry pages; stories → `/customers`; the platform diagram tiers → package pages; FAQ links → the new pages;
  header and footer complete. A full internal-link check (no dead links, no orphan pages).
- **Depends on:** 21–26.
- **Done when:** every page is reachable within three clicks from the homepage; the link check passes; the
  homepage still measures the same.

### Phase 28: Launch QA

- **Goal:** the whole site is ready to publish.
- **Scope:** `qa/measure.html` across every route at nine sizes; accessibility pass (keyboard, headings, contrast,
  alt text); structured data validated for each template; titles and descriptions unique; Open Graph images per
  template; performance pass (image sizes, chunking, Lighthouse); `robots.txt`, `sitemap.xml`, canonical URLs on
  the production domain (once decided); docs final (README, STATUS, a short "how to add a module page" guide).
- **Depends on:** 27.
- **Done when:** every check above passes or is listed with the user's sign-off; Stage C closed in STATUS.md.

---

## Open items carried into Stage C

| Item | Needed by | From |
|---|---|---|
| Accounting content (Document Management resolved in Phase 4: AMR L1 deck slide 78) | Phase 6 | Resolved: standard accounting-module information plus the deck's summary points (user, 2026-10-23) |
| Company copy, photos | Phase 26 | The user |
| Privacy policy and terms | Phase 26 | The user |
| Production domain | Phase 28 | The user |
| MAVRO AI (parked homepage item 7) | Whenever the user un-parks it | The user |
