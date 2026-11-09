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
| 25 | Implementation and Security and compliance pages | 2 pages | Done (2026-10-31) |
| 26 | Customers, Company, Contact, Legal, blog and careers scaffolds | 5 pages + 2 hidden | Done (2026-10-31; Company, Legal, blog, careers wait for content) |
| 27 | Homepage integration and cross-linking | homepage links to pages | Done (2026-10-31) |
| — | Homepage hero redrawn with anidoodle (user's request, outside the plan) | the isometric plant loop | Done (2026-10-31) |
| D1 | Content optimisation (user's request, one session) | copy across every page | To do: next |
| D2 | SEO, AEO and GEO for India (its own session, after D1) | metadata, structured data, answer and AI-engine readiness | To do |
| 28 | Launch QA | full-site audit | To do: after D2 (recommended), before D3 |
| D3 | Indian city pages (user's request) | a template + a page per target city | To do |
| D4 | UAE and GCC pages (user's request) | country pages, hreflang | To do |
| D5 | High-volume module queries: payroll, HRMS and the like (user's request) | module pages aimed at their queries + supporting articles | To do |

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

- **Goal:** `/industries/distribution`, `/industries/it-services`.
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

**Checks done 2026-11-09** (STATUS.md, "Most recent work" and "Launch checklist"); closes when the user signs
off the checklist's open rows.

- **Goal:** the whole site is ready to publish.
- **Scope:** `qa/measure.html` across every route at nine sizes; accessibility pass (keyboard, headings, contrast,
  alt text); structured data validated for each template; titles and descriptions unique; Open Graph images per
  template; performance pass (image sizes, chunking, Lighthouse); `robots.txt`, `sitemap.xml`, canonical URLs on
  the production domain (once decided); docs final (README, STATUS, a short "how to add a module page" guide).
- **Depends on:** 27.
- **Done when:** every check above passes or is listed with the user's sign-off; **no draft pages left** (`npm run
  build` lists none: every industry page's `draft` and its card in home.ts `industries.list` replaced with real material, DECISIONS.md "No invented claims");
  Stage C closed in STATUS.md.

---

## Stage D: refinement workstreams (user, 2026-11-09)

The user's order (2026-11-09), each in its own session, one after the other, never together:

1. **D1 content optimisation**, repositioned for **every industry**, not only manufacturing and distribution;
2. **D2 SEO, AEO and GEO** for India, aiming at search results, answer boxes and **Google's AI answers**;
3. **D3 Indian city pages**, a page per target city for local queries;
4. **D4 UAE and GCC pages**, the next market;
5. **D5 high-volume module queries** (payroll, HRMS and the like): hold and grow rankings for the general
   modules people search for most.

**Phase 28 launch QA** sits after D2 (my recommendation, the user can move it): the site can go live once its copy
and SEO are final, and D3–D5 then grow it. Each workstream starts from a clean `main`, reads the files below first,
and ends with STATUS.md updated, a commit and a push, like a phase.

**The user's market and audience (all workstreams):** MAVRO serves **all types of industries** (the user names IT,
printing and pharma alongside manufacturing and distribution). **India first**, then **Indian cities** with their
own pages, then **the UAE and the GCC countries**.

### D1: Content optimisation

**Done 2026-11-09** (STATUS.md, "Most recent work"): repositioned for every industry, `/industries` hub, eight
draft industry pages. Left for an optional D1b: a copy polish of the module, platform and package pages.

- **Goal:** every page's copy is clear, consistent and persuasive for a business buyer in **any industry** in India
  (the user: "we serve all type of industries"), without adding a single product fact the decks do not state.
- **Read first:** CLAUDE.md (rules, especially "No invented claims"), DECISIONS.md (what the user liked and
  rejected, including the "Left out on purpose" list), PRODUCT.md (the facts), docs/source/ (the decks, slide by
  slide), LIBRARY.md (which block shows which text, so length changes do not break a layout).
- **Where the copy lives** (never in components): `src/data/home.ts` (homepage, FAQ, stories, industries cards),
  `site.ts`, `nav.ts` (menu notes), `modules/catalogue.ts` (module names and one-line summaries, used everywhere),
  `modules/content/<slug>.ts` (42 module pages; schema in `schema.ts`), `modules/template.ts` (shared module page
  headings), `platform.ts`, `packages.ts`, `erp-connect.ts`, `industries.ts`, `implementation.ts`, `security.ts`,
  `company.ts`, `pages.ts` (404). Product screen copy is in `prototype/` (illustrative data; changing it means
  recapturing with `npm run shots`).
- **Approach:**
  1. Inventory: list every page and its data file; read each page in the browser, not only the data.
  2. Consistency: the same names everywhere (Base modules / Portals / Premium modules; module names exactly as
     in the catalogue; "25–30 days"; "SAP, Oracle, Tally"); one spelling convention (the site uses British
     spelling: organisation, specialised); counts stay computed from the catalogue, never typed.
  3. Clarity: lead with the buyer's outcome, short sentences, no jargon a plant head would not use; headlines
     and leads that fit their blocks (check at 1366 and 390).
  4. Repetition: the homepage, package pages, industry pages and module pages describe the same modules; vary
     the angle per page instead of repeating sentences.
  5. Calls to action: one clear ask per section. (Settled 2026-11-09: inner-page "Request a demo" opens the form
     on `/contact`.)
  6. **Reposition for every industry.** Today the copy speaks to manufacturers and distributors: the hero
     headline ("One ERP for manufacturers & distributors."), the site title and description (`site.ts`), the
     homepage lead and FAQ, `why`, the Industries section (four industries) and the footer note. Broaden them to
     businesses of every industry while keeping manufacturing, distribution, pharma and services as worked
     examples. **Ask the user at the start:** the industries to name (the user mentioned IT, printing and pharma),
     the new headline (offer three options), and whether more industry pages are wanted (each needs real
     industry facts: what MAVRO does there, from the decks or the user). DECISIONS.md lists "Printing and packaging
     dropped" and "Exporters replaced by Service providers" (2026-10-22/23): the user's new statement supersedes
     the first; confirm before re-adding either.
  7. Ask the user before changing anything listed in DECISIONS.md, and record every preference they give.
- **Not in D1:** titles, meta descriptions, structured data, FAQ-for-search rewriting (that is D2); new pages.
- **Done when:** every page re-read in the browser at 1440 and 390; `node qa/pagecheck.cjs <paths>` passes (one
  H1, no overflow, no console errors, sections about 0.75–1.2 screens); `npm run build` and `npm run linkcheck`
  pass; STATUS.md lists what changed per page; DECISIONS.md has any new preferences.

### D2: SEO, AEO and GEO

**Done 2026-11-09** (STATUS.md, "Most recent work"), except what waits on the user: the domain, `sameAs` profiles,
the Company text (Open items). Lighthouse could not be downloaded in the cloud session; `qa/seocheck.cjs` covers its
SEO audits (title, description, canonical, robots, hreflang, lang, image alt, link text, crawlable links) and adds
JSON-LD checks. Run Lighthouse locally in Phase 28.

**URL scheme for D4 (decided now so nothing moves later):** India stays at the root (`/`, `/modules/…`, hreflang
`en-IN`). The GCC pages go under a country prefix, `/ae/…` for the UAE and `/sa/`, `/qa/`, `/om/`, `/kw/`, `/bh/`
for the rest as they are added, each page listing its alternates (`en-IN` ↔ `en-AE` …) and the root as
`x-default`. `site.locale` and the hreflang lines in `src/seo/head.ts` are where D4 adds them.

- **Goal:** each page is found and understood by search engines (SEO), answers questions directly enough to be
  quoted by answer engines and featured snippets (AEO), and gives AI assistants consistent, citable facts about
  MAVRO and SaiSatwik Technologies (GEO).
- **Read first:** the same as D1, plus `src/seo/head.ts`, `src/seo/schema.ts`, `src/routes.ts`,
  `scripts/prerender.mjs` and README.md (Pages and routes).
- **What exists today** (built in Phases 1–27):
  - Per route in `src/routes.ts`: title and meta description (from each page's `seo` block in its data file),
    breadcrumbs (BreadcrumbList), `inSitemap`, priority, JSON-LD.
  - `head.ts`: canonical, robots (`index, follow` for sitemap routes, `noindex` otherwise; the 404 has no
    canonical), Open Graph and Twitter tags (no image yet: `og:image` deliberately absent until artwork exists).
  - `schema.ts` + head: Organization (with PostalAddress) and WebSite on every page; SoftwareApplication on the
    homepage and every module page; FAQPage on the homepage and on every page with its own FAQ (modules, packages,
    platform, ERP Connect, industries, implementation, security).
  - `prerender.mjs`: one static HTML per route, `sitemap.xml` (routes with `inSitemap`), `robots.txt` (allow all).
  - The homepage FAQ was already written for SEO/AEO/GEO (questions phrased as buyers search; see the comment above
    `faq` in home.ts).
- **Blocked on the user (ask at the start of D2):**
  - the production domain: `site.url` in `site.ts` is `https://mavro.example`, and canonical URLs, Open Graph,
    JSON-LD and the sitemap all read it;
  - a social share image (or approval to make one from the hero art);
  - official profiles for Organization `sameAs` (LinkedIn and so on): never guess them;
  - whether AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) may crawl the site (robots.txt);
  - answers the decks do not give: pricing model, hosting and deployment options, data ownership (open FAQ items);
  - the Company page text (who SaiSatwik is, team, office): it is the site's main trust signal for search and AI
    answers, and it is still empty (STATUS.md, Open items).
- **Approach:**
  1. SEO: one search intent per page; unique titles (about 60 characters) and descriptions (about 155); heading
     order; internal links with descriptive text; image alt text; `og:image` per template once approved; sitemap
     priorities and `lastmod`.
  2. AEO: an answer-first sentence at the top of each section that answers a question; FAQ answers that stand
     alone (40–60 words, the question's words in the first sentence); FAQPage only for questions visible on the
     page; definitions ("What is MAVRO ERP Connect?") phrased the way people ask.
  3. GEO: the same facts stated the same way on every page (what MAVRO is, who makes it, the packages, the
     25–30 day rollout, the ERPs it connects to); an `llms.txt` at the site root summarising the site with links to
     the key pages (generated by `prerender.mjs` from the route table); Organization and Product entities linked by
     `@id`; quotable, specific sentences with no invented figures.
  4. India targeting: `en-IN` language, INR and Indian compliance terms (GST, GSTR, e-invoice, e-way bill, PF,
     ESI, TDS, PT) where people search them; Organization `areaServed` India; a `hreflang` scheme planned now so
     D4's GCC pages slot in without reworking URLs.
  5. **Google's AI answers (AI Overviews / AI Mode)** use the same index as search: there is no special markup
     and no way to guarantee a place in them. What helps: pages Google can crawl and index, a direct answer in
     the first sentences under a question-shaped heading, specific facts stated consistently across pages,
     accurate structured data, a real Company page (who stands behind the product), and authority earned off the
     site (reviews, listings, mentions, links: the user's marketing, list it as advice). Say this plainly to the
     user; never promise inclusion.
  6. Validate: every template's JSON-LD (a schema validator), `npm run build`, `npm run linkcheck`, Lighthouse SEO
     on the main templates.
- **Done when:** the checks above pass or list what waits on the user; STATUS.md records every change and the
  remaining user inputs; DECISIONS.md records the user's choices (crawler policy, domain, share image).


### D3: Indian city pages

- **Goal:** rank for "ERP software in <city>" style queries in the user's target cities, without the pages being
  near-copies (Google treats near-identical location pages as doorway pages and can demote the whole site).
- **Ask the user first:** the city list and its order; for each city whether SaiSatwik has an office, staff or
  on-site implementation there (the implementation model offers on-site work "if agreed"); clients there that
  may be named (only with their approval); the industries that matter most there.
- **Each page must earn its place** with content true for that city: the industries strong there (public facts,
  stated carefully), the state's own compliance (professional tax slabs, e-way bill rules), how implementation
  and support reach that city, the modules that fit its industries, a city-specific FAQ. Facts about MAVRO stay
  the decks'; facts about the city must be checkable.
- **Build:** a new template (`src/pages/CityPage.tsx`, data `src/data/cities.ts`, routes generated from the data like
  the industry pages), a URL scheme agreed in D2 (for example `/erp-software/<city>`), breadcrumbs, FAQPage,
  `areaServed`; LocalBusiness markup only where a real office exists. Link the pages from a cities index and the
  footer, not from every page.
- **Done when:** each city page passes `qa/pagecheck.cjs`, differs substantially from its siblings (compare
  their text), and the build, link check and sitemap include them; STATUS.md lists the cities and what each needs.

### D4: UAE and GCC pages

- **Goal:** pages for the UAE first, then the other GCC countries, for searches in those markets.
- **Ask the user first (none of this is in the decks):** which countries; what MAVRO supports there today, for
  example UAE VAT, Saudi ZATCA e-invoicing, WPS payroll, Arabic, AED and other currencies (the decks state
  multi-currency, nothing country-specific); local presence, partners or clients; pricing or contact differences.
  **Never claim a country's compliance without the user's confirmation.**
- **Build:** country (and later city) pages from a template, `hreflang` (`en-AE`, `en-SA` and so on) on the scheme
  planned in D2, country-specific FAQ and structured data (`areaServed`), contact details for the region if any.
- **Done when:** as D3, plus `hreflang` validated across the India and GCC pages.

### D5: High-volume module queries (payroll, HRMS and the like)

- **Goal:** keep and grow rankings for the general modules with the most searches (payroll software, HRMS,
  accounting, inventory management, CRM, procurement, warehouse management and similar), where MAVRO competes
  with single-purpose products.
- **Approach:**
  1. Research which module queries have the most searches in India (a keyword tool; the user's Search Console data
     once the site is live) and pick the modules to lead with.
  2. Make each chosen module page the main page for its query ("payroll software in India" → the HRMS and Payroll
     page): title, H1 and lead aimed at that query, answer-first sections, a fuller FAQ from the decks (the HRMS
     deck's statutory slide for payroll), and internal links from the homepage, package, industry and city pages.
  3. Supporting articles for the questions around each query ("how to calculate PF", "payroll compliance in
     India") on the blog (`posts` in `company.ts`), each linking to the module page; one page per query, so pages
     never compete with each other (no cannibalisation between module, industry, city and article pages).
  4. Comparison or "alternative to" pages only with the user's approval (DECISIONS.md left out the competitor
     table) and with facts that can be backed up.
- **Done when:** the chosen module pages and articles are live and linked, each query maps to one page (written
  down in STATUS.md as a query → page table), and the build and link check pass.

---

## Open items carried into Stage C

| Item | Needed by | From |
|---|---|---|
| Accounting content (Document Management resolved in Phase 4: AMR L1 deck slide 78) | Phase 6 | Resolved: standard accounting-module information plus the deck's summary points (user, 2026-10-23) |
| Company copy, photos | Phase 26 | The user |
| Privacy policy and terms | Phase 26 | The user |
| Production domain | Phase 28 | The user |
| MAVRO AI (parked homepage item 7) | Whenever the user un-parks it | The user |
