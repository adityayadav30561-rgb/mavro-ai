# Site plan (Stage B)

_Draft 3, 2026-10-23 (the user's answers on extra products, pricing, screens and blog/careers, and their
changes: Service providers replace Exporters among the industries; no separate FAQ page).
Status: **approved by the user on 2026-10-23.** Once approved, it becomes the input for
`docs/IMPLEMENTATION-PLAN.md` (Stage C). Decisions still open are listed at the end; nothing here is built yet._

The homepage is done (Stage A). This plan covers every other page: which pages exist, what sections each has,
how all of them stay in one design system, where real product screens are used, and what the header, menu and
footer contain.

---

## 1. Principles for every page

1. **One section library, many pages.** Pages are assembled from a shared set of section components (section 4).
   A new kind of section is added to the library, documented, and then reusable. No one-off page layouts.
2. **Content from the decks, never invented.** Each page lists its sources (section 7). Sample data in screens
   is labelled as illustrative. Anything the decks do not say is asked of the user.
3. **Every section earns its place visually.** No text-only sections: each has a designed visual (a real product
   screen, a diagram, a data visual, cards or a flow). See the quality bar (section 5).
4. **Real pages, real links, prerendered.** Every page is its own prerendered HTML file at a clean URL, so
   search and answer engines read full content without JavaScript.
5. **Same rules as the homepage:** tokens and rem only, logo-derived colours, Manrope, no eyebrow labels, tier
   colours (Base blue, Portals cyan, Premium violet), sections about 0.75–1.2 screens on desktop, fully
   responsive, all modules live (no "Coming soon"), no "Premium" tags on modules.

---

## 2. Sitemap

**60 pages** in the first release (counts from `src/data/modules.ts`: 18 base modules, 4 portals,
20 premium modules), plus pages that depend on open decisions.

| # | Page | URL | Template | Count |
|---|---|---|---|---|
| 1 | Home | `/` | Home (done) | 1 |
| 2 | Platform overview | `/platform` | Overview | 1 |
| 3 | Package pages: Base modules, Portals, Premium modules | `/platform/base`, `/platform/portals`, `/platform/premium` | Package | 3 |
| 4 | Module pages: every module and portal | `/modules/<slug>` (e.g. `/modules/order-to-cash`, `/modules/vendor-portal`) | Module | 42 |
| 5 | ERP Connect | `/erp-connect` | Solution | 1 |
| 6 | Industry pages: Manufacturing, Distribution, Pharma, Service providers (IT companies and professional services) | `/industries/<slug>` | Industry | 4 |
| 7 | Implementation and support | `/implementation` | Solution | 1 |
| 8 | Security and compliance | `/security-and-compliance` | Solution | 1 |
| 9 | Customers (stories and clients) | `/customers` | Customers | 1 |
| 10 | About SaiSatwik Technologies | `/company` | Company | 1 |
| 11 | Contact and demo | `/contact` | Contact | 1 |
| 12 | Privacy policy, Terms of use | `/privacy`, `/terms` | Legal | 2 |
| 13 | Not found | `/404` | Utility | 1 |
| | | | **Total** | **60** |

**Decided (2026-10-23):** no pages for the other MAVRO products in the detailed decks (CRM for real estate,
ATS, LOS + LMS) or the off-roll workforce service for now; **no pricing page** (demo and quote only); **blog and
careers** are planned (route, template, menu entries) but hidden until there is content, as `href: null` links
are today. **No separate FAQ page:** questions live on the homepage (`#faq`) and in each page's own FAQ block.

### URL and navigation rules

- Lowercase, hyphenated, no file extensions, trailing slash handled by the host.
- Breadcrumbs on every page below the homepage (`Home / Platform / Base modules / Order to Cash`), with
  BreadcrumbList structured data.
- The homepage's anchor links change to real pages where a page exists (for example the Explore "All 18 base
  modules" button goes to `/platform/base`, and each module in Explore gets a "See Order to Cash" link).

---

## 3. Page by page: sections

Section names refer to the library in section 4. Each page alternates backgrounds (white / paper), has at most
one dark band plus the closing CTA, and follows the headline-variation rule from the homepage.

### 3.1 Module page template (42 pages, the core of the site)

Driven entirely by data: one entry per module in `src/data/modules.ts` (extended) plus its four product screens.
Built from the deck's appendix, which has the same structure for every module: a tagline, four capability tiles,
"What this module does", "Why it matters", and four named screens.

| # | Section | Content | Visual |
|---|---|---|---|
| 1 | **Module hero** | Breadcrumb, package chip in the tier colour, H1 module name, the deck's one-line tagline (e.g. Order to Cash: "Order capture to collection: credit-safe, batch-accurate revenue operations"), two CTAs (Request a demo with this module pre-ticked; See the screens) | The module's lead screen, large, in the Explore-style bleed frame |
| 2 | **Capability tiles** | The deck's four capability tiles (O2C: Order Book Health, Credit and Exposure, Batch Allocation, Dunning Engine) | Icon tiles with a small live figure from the screen data |
| 3 | **Screen tour** | Three or four screens designed for this module (for O2C, for example: the sales-orders list, an order with its credit check and allocation, collections and dunning), as tabs, each with a two-line caption of what the user does there | Real HTML product screens, built by us for this module, one per tab |
| 4 | **What it does / Why it matters** | The deck's paragraph and its six "why it matters" points | Split layout; points as a checklist with highlighted outcomes |
| 5 | **Where it sits** | Which modules feed it and which it feeds (O2C: CRM and SFA in; Inventory, Dispatch, Accounting out), each linked | A small flow diagram in the Workflow style |
| 6 | **Who uses it** | Industry chips (from the Industries data) and the roles that use it | Chips linking to industry pages |
| 7 | **Built on the platform** | The shared platform features (deck slide 12): audit trail, workflow engine, notifications, mobile, RBAC, APIs | The same strip on every module page |
| 8 | **Related modules** | Three to four modules from the same business area | Cards with screen thumbnails |
| 9 | **Module FAQ** | Three to five questions written for search (as on the homepage), FAQPage structured data | FAQ block |
| 10 | **CTA band** | "See Order to Cash on your data" with the demo form's interest pre-ticked | Dark CTA band |

Portal pages use the same template; section 5 becomes the supply-to-retail chain with the portal lit (the
`ChainDiagram` block, as in Explore).

### 3.2 Package pages (3)

| # | Section | Content | Visual |
|---|---|---|---|
| 1 | Package hero | What the package is, module count, who it is for | The package's plate from the platform diagram, lifted |
| 2 | Modules by business area | Every module in the package as a card (name, summary, link) grouped by area | Cards with screen thumbnails |
| 3 | Package-specific section | Base: one record across finance, people and operations (Workflow strip). Portals: the supply-to-retail chain. Premium: the Premium list/panel spotlight from the old homepage (snapshot in `legacy/`) | Diagram / spotlight |
| 4 | How packages combine | Base + Portals + Premium on one platform, linking the other two packages | Platform diagram |
| 5 | FAQ + CTA band | | |

### 3.3 Platform overview (`/platform`)

Architecture (deck slide 11: interfaces, API gateway and auth, workflow and rules engine, core modules, data
layer), shared platform features (slide 12), the three packages, mobile app (web + Android/iOS), integrations
(REST, webhooks, batch, SAP BAPI, SAP B1, e-commerce), a link band to Security and to ERP Connect, FAQ, CTA.
Visuals: an interactive layered architecture diagram, a phone-frame mobile screen, the platform diagram.

### 3.4 ERP Connect (`/erp-connect`)

From the connectivity deck plus the B1 flow deck:
1. Hero (dark): "Run MAVRO alongside SAP, Oracle, Tally or any legacy ERP".
2. Who it is for (slide 2: SAP, Oracle, Tally and legacy ERP businesses).
3. Common gaps in native ERPs (slide 3: licence cost, complex screens, rigid processes, desk-bound access).
4. Architecture (the homepage board, larger, with a step-through of a two-way sync).
5. Five benefits (slide 5).
6. Before and after (slide 6: six problems mapped to MAVRO capabilities).
7. With SAP Business One (B1 flow deck: inbound to finished goods, sales order to dispatch as one flow).
8. Roadmap: 25–30 days (slide 8: connectors and mapping, pilot, full go-live, AMS).
9. FAQ + CTA.
Real screens: the MAVRO App's boutique screen for an ERP user, and a mobile approval screen.

### 3.5 Industry pages (4)

| # | Section | Content |
|---|---|---|
| 1 | Industry hero | Headline and who it is for, with an industry-specific product screen (Pharma: batch record / QC release; Distribution: scheme slab builder; Manufacturing: shop floor; Service providers: a client project with milestones, people and costs) |
| 2 | Gaps in this industry | From the deck (Pharma uses the Healthcare Manufacturing deck; Service providers use the Project Management, HRMS and Travel and Expense module pages and the HRMS deck; others slides 2–4 of the product deck) |
| 3 | The order flow, configured | The homepage Industries flow for this industry, larger, each stage linked to its module |
| 4 | Modules for this industry | Module cards with screens (from `industries.list[*].modules`, extended) |
| 5 | Compliance for this industry | Pharma: GMP, BMR, QC release; Service providers: payroll statutory (PF, ESI, TDS, PT), GST e-invoicing for services, travel policy; Distribution: GST e-invoicing, schemes |
| 6 | Story | The matching customer story where one exists (Distribution and Manufacturing: TMS and VIM stories) |
| 7 | FAQ + CTA | |

### 3.6 Implementation and support (`/implementation`)

The homepage timeline (larger), migration plan (deck slide 24: each current tool mapped to a MAVRO module),
risks and mitigation (slide 26, as a designed table), the first 90 days after go-live (slide 27), the support
model (slide 28), FAQ, CTA.

### 3.7 Security and compliance (`/security-and-compliance`)

Architecture and security (slide 11), access control and audit trail (slide 12), India compliance in depth (GST
returns, e-invoicing, e-way bills, PF/ESI/TDS/PT, contract labour, CLRA), data protection figures (AES-256,
7-year audit logs, RPO/RTO), FAQ, CTA. Visual: the trust card expanded into a full page with diagrams.

### 3.8 Customers (`/customers`)

The three stories in full (challenge, what was built, deliverables, result, modules), the client logo wall (20
logos from the clientele slide), a CTA. Story detail pages later, if the user supplies more stories.

### 3.9 FAQs (no separate page)

No `/faq` page (user, 2026-10-23). The homepage FAQ stays as it is; every other page has its own FAQ block with
questions about that page's subject (module, industry, ERP Connect, implementation, security), each with FAQPage
structured data. Menu and footer "FAQ" links go to the homepage FAQ (`/#faq`).

### 3.10 Company, Contact, Legal, 404

- **Company:** about SaiSatwik Technologies, what it builds, delivery approach, office. Needs the user's copy.
- **Contact:** the demo form (full width), direct email and phone, head office, what happens after you submit.
- **Legal:** privacy policy and terms, from the user's legal text.
- **404:** a designed page with links to Platform, modules search and contact.

---

## 4. Section library (keeps every page in sync)

Every section is a component in `src/sections/` (or `src/blocks/` for the reusable ones), configured by data.
The homepage sections are refactored into this library where they are reused.

| Block | Used on | Notes |
|---|---|---|
| `PageHero` (variants: module, package, industry, solution, simple) | All pages | Breadcrumb, H1, lead, CTAs, a visual slot (screen, diagram or plate) |
| `ScreenFrame` | Everywhere screens appear | The product screenshot in a frame; bleed and contained variants; labelled illustrative |
| `ScreenTour` | Module, industry, platform | Tabs of real screens with captions (the Showcase pattern) |
| `CapabilityTiles` | Module, package | Four tiles, icon + title + one line |
| `WhatWhy` | Module | Paragraph + "why it matters" checklist |
| `FlowStrip` | Module, industry, package | Stages with links; shared vs configured styling (Industries) |
| `ModuleCards` | Package, industry, related | Card with name, summary, tier colour, screen thumbnail |
| `PlatformStrip` | Module, platform | The shared platform features, identical everywhere |
| `ChainDiagram` | Portals, portal pages | Supply-to-retail chain with a lit node |
| `ArchitectureDiagram` | ERP Connect, platform, security | The ERP Connect board and the layered architecture |
| `Timeline` | Implementation, ERP Connect | The homepage Gantt |
| `StoryCards` | Customers, industry | The homepage story cards |
| `TrustPanel` | Security, platform | The trust card, expanded variant |
| `ComparisonTable` | ERP Connect (before/after), implementation (risks) | A designed table, not a plain one |
| `FaqBlock` | Most pages | Native details, two columns, FAQPage schema from the same data; questions specific to the page |
| `CtaBand` | Every page | Dark band; ticks the right interest in the demo form |
| `InlineCta` | Long pages | As on the homepage |
| `Breadcrumbs` | All but home | With BreadcrumbList schema |

**Rhythm rules (checked on every page):** backgrounds alternate; at most one dark band plus the CTA band;
neighbouring headlines never share a treatment (soft / grad / mark / centred); one H1 per page; section heights
about 0.75–1.2 screens on desktop; the same spacing scale and card radius everywhere.

---

## 5. Quality bar: "no laziness for any section"

A section is done only when all of these hold. They become the "Done when" of every phase in Stage C.

- **Content:** real copy from the decks (source noted in the data file), no placeholder text, no invented
  figures; sample data is consistent with the story used across the site (Northfield Precision, Kestrel Pumps,
  SO-24817) or with the module's own scenario.
- **Visual:** a designed visual element; hover, focus and active states; motion that respects reduced motion.
- **Responsive:** checked at the nine sizes of `qa/measure.html`, no overflow, phone layout designed (not just
  stacked), tablet checked.
- **Accessibility:** heading order, keyboard operation, visible focus, alt text for screens, contrast.
- **SEO/AEO:** unique title and description, one H1, internal links in and out, structured data where it
  applies, the page in `sitemap.xml`.
- **Verified:** screenshots at 1440×900, 1366×768 and phone reviewed before calling it done; `npm run build`
  passes; STATUS.md updated.
- **Same template, same finish:** the 42 module pages are not allowed to be thinner than the flagship ones;
  every module gets all ten sections and its full set of 3–4 bespoke screens.

---

## 6. Real product screens: where and how

**Decided (2026-10-23):** we design and build every screen ourselves as HTML prototype pages, exactly as for the
homepage (`prototype/*.html`, captured by `npm run shots`). The screen images in the deck's appendix are not used.
**Each module gets 3–4 screens designed for that module**: its own layout, its own records and figures, the
views a user of that module actually works in. No generic templates filled with data; the shared parts are only
the product's design language (`prototype/app.css`: sidebar, top bar, cards, chips, tables, charts).

**How many**

| Place | Screens |
|---|---|
| Module pages | 3–4 per module, 42 modules: about 140–170 new prototype pages |
| Package pages | Thumbnails of each module's lead screen (reused) |
| Industry pages | One industry-specific hero screen each (4), plus module screens (reused) |
| Platform overview | Mobile app screens in a phone frame (3–4, new; a phone shell is added to the prototype) |
| ERP Connect | The MAVRO App's boutique screen for an ERP user and a mobile approval screen (2, new) |
| Homepage | Unchanged (Showcase 5, Explore Base 6); the existing screens are reused on their module pages where they fit |

**How each module's screens are chosen and kept credible**

- **Chosen per module:** the 3–4 views that tell that module's story (for Gate Entry: the gate register, a vehicle
  with weighbridge readings and documents, the security exceptions; for Scheme and Rebate: the slab builder, a
  scheme's performance, the claims settlement queue). The deck's "what it does" and "why it matters" guide what
  the screens must show.
- **One scenario per module:** each module's screens share one consistent scenario (same records, same figures
  across its screens), tied to Northfield Precision and the SO-24817 story where the module touches it, and to
  the module's own world where it does not (for example a property portfolio for Real Estate Management).
- **Built like the homepage screens:** written as HTML pages in the prototype, checked at 1440 × 960 for fit,
  figures cross-checked, captured at two widths, alt text written per screen.
- **Sidebar:** the prototype's navigation grows to cover every module so each screen highlights its own place.

Screens are shown on the site as images (fast, crisp, no layout cost), not live iframes.

## 7. Content sources

| Page | Source |
|---|---|
| Module pages | Product deck appendix (slides 29–111: tagline, four tiles, what it does, why it matters, four screens); detailed decks for HRMS, TMS and WMS (walkthroughs, India compliance) |
| Package pages | Product deck slides 7–8 (live modules), 12; `modules.ts` |
| Platform | Product deck slides 11–12 |
| ERP Connect | Connectivity deck (all 9 slides, except the competitor table); B1 MAVRO flow deck |
| Industries | Product deck slide 2; Healthcare Manufacturing deck (Pharma); module pages |
| Implementation | Product deck slides 24–28 |
| Security | Product deck slides 11–12; Why MAVRO trust card |
| Customers | Product deck slides 19 and 23 |
| FAQs | Homepage FAQ; per-page FAQs written from the same sources as the page |
| Company, Legal | **The user** |

**Gap:** the product deck's appendix covers 40 of the 42 modules. **Accounting** and **Document Management** have
no appendix slide; their pages need content from Mavro Modules v1 / AMR decks (to be checked) or from the user.

Not used (as on the homepage): ROI figures, "400+ AI capabilities", "60+ countries", competitor comparison
tables, client-specific proposals (Super Circle deck) and their pricing.

---

## 8. Header, menu and footer

### Header (desktop)

`Logo` · **Platform ▾** · **Solutions ▾** · **Customers** · **Resources ▾** · **Company ▾** ·
`Request a demo` (primary button)

Five items instead of today's six section anchors, each opening real pages.

### Platform ▾ (mega menu, branched)

- **Left rail (branches):** Platform overview · Base modules (18) · Portals (4) · Premium modules (20) ·
  ERP Connect. Hovering or focusing a branch changes the right side.
- **Right side:** the branch's modules grouped by business area (Finance and control, Sales and channel, Supply
  and logistics, Make, People, Data and governance), each a link to its module page with its icon and one-line
  summary. "Platform overview" shows all modules by area (today's menu) with a package filter.
- **Featured card (bottom right):** "Already on SAP, Oracle or Tally?" → ERP Connect, with a screen thumbnail.

### Solutions ▾

- **By industry:** Manufacturing · Distribution · Pharma · Service providers
- **By need:** Work alongside SAP, Oracle or Tally (ERP Connect) · Replace a legacy ERP or Tally
  (Implementation, migration) · India compliance (Security and compliance)
- Featured: a customer story card.

### Resources ▾

Implementation and support · Security and compliance · Customer stories · FAQ (homepage section) · (Blog, when it exists)

### Company ▾

About SaiSatwik Technologies · Contact · (Careers, when it exists)

### Mobile

A full-screen drawer with the same branches as accordions; Platform → package → business area → module (three
levels), a search field for modules, and the demo button pinned at the bottom.

### Footer

Columns: Platform (overview, three packages, ERP Connect) · Popular modules (8) · Solutions (4 industries) ·
Resources · Company. Below: the contact block (office, phone, email), legal links, copyright.

---

## 9. Technical approach

- **Routing:** a route table in `src/routes.ts` (path, page component, SEO data). The prerender script renders
  every route to `dist/<path>/index.html` and writes `sitemap.xml` from the same table. Links are plain `<a>` to
  real URLs (a multi-page site), so every page loads as prerendered HTML and works without JavaScript.
- **Hydration:** one client entry hydrates the page for the current path; each page type is a separate chunk,
  so module pages never load the homepage's three.js scene.
- **Data:** `modules.ts` gains per-module page content (tagline, tiles, what/why, screens, relations, FAQ),
  written from the deck appendix; industries, packages and solutions get their own data files.
- **SEO per page:** title, description, canonical, Open Graph; JSON-LD per template (Organization site-wide;
  SoftwareApplication per module; BreadcrumbList everywhere; FAQPage where there is an FAQ); Open Graph images
  generated per template.
- **Production domain:** still `https://mavro.example` until the user decides.

---

## 10. Decisions

**Made (2026-10-23)**

| Question | Decision |
|---|---|
| Other products (CRM for real estate, ATS, LOS + LMS) and the off-roll workforce service | Not on this site for now |
| Pricing | No pricing page; demo and quote only |
| Product screens | 3–4 per module, each designed by us for that module as HTML prototype pages (as on the homepage); no templates, no appendix images |
| Blog and careers | Planned, hidden until content exists |
| Industries | Manufacturing, Distribution, Pharma, **Service providers** (IT companies and professional services) instead of Exporters; the homepage Industries section changes too |
| FAQ page | None; FAQs on the homepage and per page |

**Still open**

1. **Company and legal content:** who supplies the About copy, any team or office photos, the privacy policy and
   the terms of use? (Pages are built with the structure ready; text goes in when supplied.)
2. **Accounting and Document Management content:** check the Modules v1 / AMR decks, or the user supplies it.
3. **Domain:** the production URL, when known.
4. **Approval of this plan:** sitemap (section 2), page sections (section 3), menu (section 8). After approval,
   Stage C: the phased implementation plan.
