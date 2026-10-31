# Status

_Last updated: 2026-10-30. Update this file at the end of every task and before clearing context._

## Where we are

**Stage C (phased implementation). Phases 1–27 done (2026-10-31); next: Phase 28, launch QA. Every planned page with content exists; Company, Privacy, Terms, the blog and careers wait for the
user's text (Open items).** The
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

- 2026-10-31, **anidoodle skill installed** (user: "install anidoodle skill from github, we will make our hero section of
  homepage with it"). `.claude/skills/anidoodle` = the repo's `skills/anidoodle` folder, unmodified, v0.10.1
  (github.com/alexgreensh/anidoodle, Apache-2.0; LICENSE, NOTICE and SOURCE.txt alongside). Reviewed before install:
  no hooks, no install scripts, no telemetry; its engine (three.js, esbuild; Remotion optional, only for films)
  downloads npm packages and a Playwright Chromium on its first render. Committed to `main` at the user's choice so
  every session has it; the engine's node_modules and render output are git-ignored. **Next:** the homepage hero with
  it (start with the skill's intake, `references/workflows/site-art.md`), then Phase 28 launch QA.

- 2026-10-31, **Phase 27 done: homepage integration and cross-linking.** On `main`.
  - **Homepage → pages:** Explore's "All 18 base modules" / "All 20 premium modules" and a new "The 4 portals" open
    the package pages (the catalogue overlay remains the fallback); each featured module's panel ends with "See
    <module>" to its page; the platform diagram's tiers open the package pages; the Industries module chips open the
    module pages (DECISIONS.md updated); the FAQ's "Explore the platform" and "See the portals" go to `/platform` and
    `/platform/portals`; new "more" links under the stories (`/customers`), the support model (`/implementation`) and
    the trust card (`/security-and-compliance`), shown only once the page exists (shared `.more-link` in base.css).
    Kept as in-page anchors on purpose: the hero's "Explore the platform" (#platform), FAQ "See industries"
    (#industries; there is no industries hub page) and every "Request a demo" (#demo).
  - **Link check:** new `npm run linkcheck` (scripts/linkcheck.cjs, after a build): crawls dist/ from the homepage.
    Result: 57 pages, no dead links, no missing anchors, every page one click from the homepage (header menus and
    footer), the only orphan is `/pipeline-check` (hidden test page, removed in Phase 28).
  - **Homepage still measures the same:** sections unchanged except Why (+42px) and Stories (+54px) at 1440, both still
    under 1.2 screens; no overflow at 390.
  - **Open question carried to Phase 28:** "Request a demo" on inner pages still opens the homepage form
    (`/?interest=…#demo`, ticking the interest); `/contact` has the same form. Ask the user which they prefer.

- 2026-10-31, **Phase 26 done: Customers and Contact live; Company, Legal, blog and careers scaffolded.** On `main`.
  - **Customers** (`/customers`, src/pages/Customers.tsx): hero with a `ResultCard` (the three verified results) →
    the three stories in full (`StoryFeature`: result on navy beside the challenge, what was built, what it
    delivered and the module links) → the clientele wall (`LogoWall`, all 20 logos) → CTA. Stories are `proof` in
    home.ts, shared with the homepage.
  - **Contact** (`/contact`, src/pages/Contact.tsx): hero with a `ContactCard` (email, phone, head office from
    site.ts) → the full demo form (the homepage `Demo` section, reused) → what happens after you ask (three steps
    from the demo copy; no response-time promise, none is stated).
  - **Waiting for the user:** Company, Privacy policy, Terms of use (`TextPage` + `Prose`), the blog (`Blog`: list and
    post) and careers (`Careers`). Their slots are in src/data/company.ts; routes, links and sitemap entries appear only
    once content exists (src/routes.ts), so nothing links to an empty page. Listed under Open items.
  - **New blocks:** `StoryFeature`, `ResultCard`, `LogoWall`, `ContactCard`, `Prose` (in `/_library`).
  - **Links:** "Customer stories" (menu, footer) and "Contact" now open the pages (they fell back to `#stories` and
    the email address); Company, Blog, Careers, Privacy and Terms remain hidden. On `/contact` every "Request a demo"
    (header, drawer, page buttons) stays on the page's form (`formPages`/`useDemoHref` in routing.tsx); elsewhere they
    still open the homepage form (`/?interest=…#demo`). Pointing them all at `/contact` is a Phase 27 question.
  - **Demo form moved to the library:** `sections/Demo.tsx` → `blocks/DemoPanel.tsx` (form in `blocks/demo/`), same
    markup and class names, used by the homepage and Contact.
  - **Templates smoke-tested** with temporary sample content (Company, blog list and post, careers at 1440 and 390: no
    errors, links appeared in the menus and footer), then the sample was removed. Empty hero leads no longer render.
  - **Checks:** 1440, 1366, 390 and the nine measure sizes: no overflow, no console errors. The full stories section
    is 1.8 screens on desktop (three complete case studies, the page's content); Contact's "what happens next" is 0.6.

- 2026-10-31, **Phase 25 done: Implementation and Security and compliance** (`/implementation`,
  `/security-and-compliance`). On `main`.
  - **Implementation** (src/pages/Implementation.tsx, src/data/implementation.ts): hero with a `RolloutCard` (the
    homepage plan's phases) → the homepage `Timeline` → who you work with (homepage support model plus slide 28's
    points) → migration map (slide 24, each target linked to its module page; "GST filings" and "payroll posted on
    approval" as plain capabilities) → risks and mitigation (all seven rows of slide 26; status column, "Month 1/2"
    timings dropped; "Both" shown as "Joint"; moved out of the dev library, which now imports it) → ninety days after
    go-live (slide 27) → FAQ → CTA. **Left out:** slide 27's "month-end close in 1–2 days" and "zero disputes before
    payment", slide 24's "zero double-entry" (unverifiable outcomes).
  - **Security and compliance** (src/pages/Security.tsx, src/data/security.ts): hero with the GST returns screen
    (roles and audit behind) → security at every layer (`LayeredArchitecture`) → access and audit (`ScreenPoints`: the
    `access` screen beside RBAC, MFA/SSO, the API gateway, IP and device control, the audit trail) → India compliance
    by rule (GST returns, e-invoicing, e-way bills, statutory payroll, contract labour, vendor compliance), each with
    its returns or registers and a link to the module that makes the record → data protection (`FigureBand`, the
    page's night band: AES-256, 7 years, RPO < 4 hr, RTO < 8 hr, the six controls) → FAQ → CTA. No certification,
    hosting location, residency or testing claim (none in the decks).
  - **New blocks:** `RolloutCard`, `MigrationMap`, `ScreenPoints`, `FigureBand`; `CapabilityTiles` takes `link`.
  - **Links:** the homepage FAQ's rollout links go to `/implementation`, its compliance and security links to
    `/security-and-compliance`; the Platform integrations callout's Security link (it named `/security`, so never
    showed) now appears; menus, drawer and footer switched through their `page`. No `/#implementation` or `/#why`
    links remain on other pages.
  - **Checks:** 1440, 1366, 390 and the nine measure sizes: no overflow, no console errors. Short sections: support
    model and FAQ about 0.68 screens, data protection about 0.65.

- 2026-10-31, **Phase 24 done: Distribution and Service providers industry pages** (`/industries/distribution`,
  `/industries/service-providers`). On `main`. Data only on the Phase 23 template (src/data/industries.ts) plus screens.
  - **Distribution:** gaps from the product deck (slide 3's channel gap, slide 4's missing modules and cost/upgrade
    reasons); flow linked scheme check → Scheme and Rebate, allocation → Order to Cash, picking and ship confirm →
    Warehouse Management, delivery → Transportation Management; eight modules (the card's five plus Sales Force
    Automation, Dealer Portal, Transportation Management); compliance: GST e-invoicing with place-of-supply checks,
    e-way bills, schemes at order entry, claims and credit notes, credit exposure, batch and shelf life.
  - **Service providers:** gaps from the HRMS deck (slide 3: attendance and payroll, leave and policy, self-service);
    flow linked to Project Management and HRMS ("Handover" left unlinked); modules: the card's four plus Travel and
    Expense, CRM, Document Management, Learning Management; compliance from HRMS deck slide 7 (PF, ESI, TDS with Form
    16 and 24Q, PT, gratuity, GST) and Travel and Expense (policy).
  - **Stories:** none of the deck's three stories is a distribution or services project, so neither page has the section.
  - **Screens (illustrative):** `industries/distribution-channel` (Northfield's channel in the festive season: distributor
    purchases, secondary orders, tiers, slab progress per distributor, scheme budgets; agrees with Scheme and Rebate and
    the Distributor Portal), with scheme-and-rebate/slab-builder behind and sales-force-automation/call-report on the
    phone; `industries/services-project` (a new tenant, Corvane Technologies: client project PRJ-0342 with milestones
    billed on sign-off, people, costs from time cards and claims) and `industries/services-time-card` (phone).
  - **Fix:** the Manufacturing multi-plant screen's user was renamed (Ritu Malhotra is Northfield's trade marketing
    manager on the Scheme and Rebate screens) and recaptured.
  - **Links:** all four industry pages now reached from the menu, drawer, footer, homepage panel and module pages; no
    `#industry-` fallbacks remain in the build.
  - **Checks:** 1440, 1366, 390 and the nine measure sizes: no overflow, no console errors, sections in range.

- 2026-10-31, **Phase 23 done: Manufacturing and Pharma industry pages** (`/industries/manufacturing`, `/industries/pharma`). On `main`.
  - **Template:** src/pages/IndustryPage.tsx, one page for every industry. The homepage card (`industries.list` in
    home.ts) supplies the headline, points, flow stage labels and first module chips, so card and page cannot drift;
    src/data/industries.ts holds hero lead and facts, screens, the three gaps, which module each flow stage opens,
    extra modules (to eight cards), compliance tiles, which customer stories match, FAQ (FAQPage) and SEO. Phase 24
    needs only data and screens. The build stops if a module card has no page.
  - **Sections:** hero (industry chip, screens, client band) → gaps (`GapColumns`; Manufacturing: product deck slide 3,
    Pharma: Healthcare Manufacturing deck slide 3, tags in the decks' "GAP:" wording) → the order flow in four groups
    (take the order, in between configured, deliver, get paid), stages linked to modules ("Dispensing" left unlinked:
    no deck names its module) → eight module cards in rows of four → compliance (six tiles from the decks; Pharma: batch
    records against the GMP master, QC release, hold times and deviations, batch and expiry, quarantine and cold rooms
    "in support of GDP compliance", vendor vault, audits and CAPA) → stories (Manufacturing: the TMS-alongside-SAP and
    vendor stories, night band; Pharma: none match, so no section) → FAQ → CTA. Left out: the decks' customer and reach
    claims, before/after figures, outcome slides and any certification they do not state.
  - **Screens (illustrative):** `industries/manufacturing-plants` (Northfield Precision, three plants, OEM and
    aftermarket lines; Plant 1 agrees with production-management/plant-output), `industries/pharma-batch-record` (a new
    tenant, Arvanta Lifesciences: BMR with sequence lock, QA verification, yields, in-process checks, hold-time clock,
    a deviation attached) and `industries/pharma-qc-release` (phone: CoA, assay, dissolution, release from quarantine).
    Manufacturing's hero also shows shop-floor-control/live-board behind and platform/approvals on the phone.
  - **Links:** the homepage Industries panel shows "MAVRO for <industry>" once the page exists; menus, drawer, footer
    and module pages' audience cards switched through `industryLinks`/`target`. Distribution and Service providers keep
    their `#industry-` anchors until Phase 24.
  - **Blocks:** `StoryCards` lays out two stories two-up (one at a card's width); `ModuleCards` runs exactly eight cards
    four across. No new blocks.
  - **Checks:** 1440, 1366, 390 and the nine measure sizes: no overflow, no console errors; sections 0.7–1.13 screens
    on desktop (gaps 0.68, as on ERP Connect).

- 2026-10-30, **Phase 22 done: the ERP Connect page (`/erp-connect`).** On `main`.
  - **Page:** src/pages/ErpConnect.tsx, content src/data/erp-connect.ts (connectivity deck slides 1–6 and 8, not the
    competitor table; B1 MAVRO flow deck). The board and the five benefits are the homepage's (`connect` in home.ts).
    Sections: dark module hero (the page's one night band) with two new screens; who it is for (four ERPs bracketed
    into one MAVRO app); the three gaps; the board with a five-step sync step-through in a dark panel; five benefits
    with the deck's three points each; before and after (six rows); SAP Business One as swimlanes by zone (inbound,
    warehouse and production, outbound, billing and dispatch; inward and outbound scans marked; e-invoice and e-way
    bill as "MAVRO, integrated"; closes with "B1 records the transactions. MAVRO executes the warehouse." and a link to
    Warehouse Management); the 25–30 day roadmap (Timeline); FAQ (FAQPage JSON-LD); CTA. In the sitemap.
  - **Screens (illustrative, Sahyadri Forgings on SAP S/4HANA):** `erp-connect/approvals` (a boutique approvals app:
    SAP PRs and POs with their SAP numbers and sync state, one PO's trail SAP → MAVRO → SAP) and
    `erp-connect/phone-approval` (the same PO approved on the phone, being written back to SAP). The partner chrome
    gained `data-hostline` (module-shell.js) for the "Runs beside SAP S/4HANA" footer.
  - **New blocks:** `SyncSteps`, `ErpSystems`, `GapColumns`, `SwimlaneFlow`; `ConnectBoard` takes an optional
    `focus`; `CapabilityTiles` takes `points` and `columns={5}`; shared `.night-panel` (base.css) replaces the
    library's `lib__night`.
  - **Links:** the menu rail, drawer, footer, customer story, Platform callout and 404 all reach the page through
    `connectLink`/`target`; the homepage Connect section gained "See how ERP Connect works, step by step" under the
    benefits, and the homepage FAQ answer links to the page. No `#connect` links remain in the build.
  - **Checks:** 1440, 1366, 390 and the nine measure sizes: no overflow, no console errors; architecture section 1.21
    screens at 1440 (the board plus the steps), gaps 0.67. Keyboard: arrow keys move the sync steps and the zone tabs.

- 2026-10-30, **Phase 21 second follow-up (user feedback with screenshots): architecture, packages and integrations redrawn; jump bar removed.** On `main`.
  - **Architecture (`LayeredArchitecture`):** security drawn as a perimeter around the five layers (a tab on the frame, its six controls on a navy foot); numbered layers with a one-line note each; the Core modules row shows the three packages as tier pills with their counts (optional `packages` prop).
  - **"Three packages" (new `PackageStack`, replaces `PackagePlate` + `PackageLinks` on the pages):** each package card sits level with its own plate, joined by a leader line, the Shared platform card on the gradient foundation; pointing at a card lifts its plate; on a package page that package is lifted and marked "You are here". Below 1024px the drawing sits above the cards. `PackageLinks` deleted; `PackagePlate` stays for the `package` hero variant. Tiers built by `packageTiers()` in `pages/module-card.ts`.
  - **Integrations (new `IntegrationHub`):** interfaces your systems use (REST, webhooks, batch) on the left and connectors MAVRO ships (SAP BAPI, SAP Business One, e-commerce) on the right, wired into a gradient MAVRO platform card with its gateway facts; packets run the wires while on screen. Under it an ERP Connect callout (SAP, Oracle, Tally, any legacy ERP, from the homepage `connect` data) with the ERP Connect link (Security link appears once that page exists).
  - **Jump bar removed** from the Base and Premium module lists (user asked); the area header rows stay.

- 2026-10-30, **Phase 21 follow-up (user feedback): `/platform` reachable, package and platform heroes and sections raised to module-page level.** On `main`.
  - **Reachability:** the URL already loaded (dev, preview, build) but nothing in the header led there. The Platform mega-menu now has a "Platform overview" link under its rail and the mobile drawer one at the top of its Platform accordion (checked by Playwright: header menu and drawer both land on the page; the rail's Base, Portals and Premium links go to `/platform/*`).
  - **Heroes:** package pages and the Platform overview use the module hero (`variant="module"`): the package's lead screen bleeding off the edge, a second module's screen behind it, a phone in front, the client band below (new `HeroScreens` block; screens chosen in `packages.ts`). Headlines are two lines.
  - **Sections:** a jump bar and a header row (icon, one line, count) per business area over the module cards; headings computed from counts ("18 modules, one set of records."); Portals: the chain beside four rich portal rows (`PortalLayers`), then a strip of the records they share with the Base modules; "How packages combine" is now the plate (current tier lifted) beside the three cards with a "See Portals" link; integration tiles 3 x 2; flow notes use each module's catalogue summary.

- 2026-10-30, **Phase 21 done: Platform overview and the three package pages.** On `main`.
  - **Pages:** `/platform` (src/pages/Platform.tsx) and `/platform/base`, `/platform/portals`, `/platform/premium` (one
    template, src/pages/PackagePage.tsx); copy in `src/data/packages.ts` (counts computed from the catalogue, not typed).
    Module-page breadcrumbs now link to the package pages; the footer's Platform overview and the package links switch
    to the real pages by themselves (`src/links.ts`). Four routes in the sitemap with FAQPage JSON-LD.
  - **New blocks** (in `/_library` and docs/LIBRARY.md): `PackagePlate` (the homepage plate diagram with one tier lifted;
    geometry now shared in `blocks/plates.ts`, `PlatformIntro` imports it), `PackageLinks`, `PremiumSpotlight` (list left,
    panel right, fed by the current `premiumFeatures`; no kicker, no "Premium" tag), `PhoneRow`. `ChainDiagram` `active` is
    optional (omit to light every portal). The module card helper moved to `src/pages/module-card.ts` (`cardFor`), shared by
    the module and package pages; a package page stops the build if a module card has no page.
  - **Mobile app screens (4 new phone screens, `prototype/modules/platform/`, captured to `src/assets/screens/platform/`):**
    `approvals` (plant head's inbox from four modules), `manager-dashboard`, `alerts`, `offline` (field rep, no signal). They reuse
    the Northfield scenario; the module shell needs a real module slug on the body, which the phone does not show.
  - **Not done on purpose:** the homepage platform-diagram tier labels still go to the Explore tabs (DECISIONS.md locks
    that behaviour); pointing them at the package pages is Phase 27 (homepage integration). The Security link on the Platform
    page stays hidden until Phase 25 (`target()` returns null without a fallback); ERP Connect falls back to `#connect`.

- 2026-10-30, **Phase 20 done: Business Analyst App, Master Data Management and Document Management pages (the last module pages: 42 of 42).** On `main`.
  - **Screens (12 new, no phone):** Business Analyst App `coverage-trust` (lead), `report-builder`, `data-quality`,
    `report-register`; Master Data `quality-dashboard` (lead), `golden-record`, `change-approvals`, `master-records`;
    Documents `repository-dashboard` (lead), `upload-batch`, `version-history`, `zip-requests`. Content from deck v2 slides
    88 and 90; **Document Management has no v2 detail slide, so it follows the AMR L1 deck slides 78-79** (resolved the
    plan's "DMS content gap"); that deck's artwork/plate-destruction/customer-code numbering belongs to a printing
    customer and is not used (see the note in `document-management.ts`). Crumbs under "Data".
  - **BAA scenario:** 128 reports, 88% on certified metrics, 46 certified metrics; "net sales" conflict resolved as M-009;
    RPT-0161 secondary sales by territory blocked by a region/territory grain mismatch and PL-087 stale data (ties to Data
    Analytics AN-0418); 5 DQ exceptions routed to source owners. Platform lead Farah Siddiqui, analyst Rashmi Desai.
  - **MDM scenario:** 12,480 records (customer 2,140, material 7,640, vendor 612, employee 491, account 1,246, territory
    96, location 255), 37 duplicate clusters; Kestrel Pumps cluster CL-0412 merged to a golden record; 6 change approvals
    (IH-220 price, HSN codes, Ahmedabad remap of 38 outlets, Kestrel credit limit, Mehta Alloys bank change, Aravali
    terms). Steward lead Aarti Kulkarni.
  - **DMS scenario:** 8,960 documents; SOP-0063 v4 (after CAPA-0088 / IA-0219) awaits the plant head, effective 10 Oct, trained
    through CRS-0071; upload batch UB-0218 (new IH-220 Rev D, 2 duplicates blocked); zip ZR-0041 Kestrel audit pack needs
    QA-head approval. Document controller Leena Dsouza.

- 2026-10-30, **Phase 19 done: Contract Labour Supply and Contract Labour Purchase pages.** On `main`.
  - **Split between the two:** Supply is the principal employer's compliance view (CLRA, PF, ESIC, wage register,
    induction; bills certified only with evidence); Purchase is the plant's operating view (biometric deployment,
    requisitions, scorecards, attendance-reconciled billing). They share one scenario and the same contract workers.
  - **Screens (8 new, no phone):** Supply `compliance-dashboard` (lead), `deployment-pack`, `bill-approval`,
    `labour-register`; Purchase `factory-dashboard` (lead), `workforce-register`, `raise-requisition`,
    `attendance-billing`. Content files from deck v2 slides 106 and 108; the two spotlight mocks now match the screens.
  - **Scenario (Northfield, 8 Oct, principal employer):** 9 fictional contractors, 472 contract workers (Plant 1 402,
    Chennai 70; separate from the 491 employees); September bills ₹1.18 Cr (6 certified ₹67.2 L, 3 pending ₹50.5 L).
    Bhairav Industrial BI/0932 ₹23.52 L held for the September PF challan (due 15 Oct) and 38 man-days muster over
    biometric (payable ₹23.15 L); Tirupati rate check; Shree Om induction gaps and pass CLP-2281 expired 6 Oct (matches
    Gate Entry SEC-0416). Shift B Plant 1: 206 of 220 present; REQ-0231 12 packers 14-31 Oct ₹2.2 L. Compliance officer
    Pooja Nair (from Gate Entry), plant HR officer Mahesh Kulkarni.

- 2026-10-30, **Phase 18 done: Auction and Bidding, Real Estate Management and Learning Management pages.** On `main`.
  - **Screens (12 new, no phone):** Auction `esourcing-dashboard` (lead), `live-auction`, `create-event`,
    `events-register`; Real Estate `portfolio-dashboard` (lead), `lease-renewal`, `property-360`, `property-register`;
    Learning `lms-dashboard` (lead), `certification-approvals`, `course-register`, `curriculum-builder`. Content files from
    deck v2 slides 78, 104, 92; the Real Estate and LMS spotlight mocks in catalogue.ts now match the screens (the
    auction spotlight visual stays the generic one). Also fixed names: Kavita Iyer is the HR lead (not Kavita Joshi).
  - **Auction scenario:** 41 events, ₹63.0 L saved (7.8% below ceiling) on 31 awards; live AUC-0088 export cartons
    (ceiling ₹48.00, L1 ₹44.10, two auto-extensions to 14:06); AUC-0086 seal rings 70/30 and AUC-0085 await award;
    AUC-0091 LM6 castings 1,800 kg is the draft raised by the PPDS MRP run, Konkan Foundry held out until audit AUD-0424
    (21-22 Oct). Buyer Rohan Menon, purchase head S. Iyer.
  - **Real estate scenario:** 14 properties (5 owned, 9 leased, 3,32,300 sq ft), rent ₹3.52 Cr a year; LR-0014
    Ahmedabad depot (ends 31 Dec; ask ₹27.60, market avg ₹25.40, recommend ₹25.80, ₹33.4 L below the ask over 5 years);
    Chennai fire NOC 15 Nov; Talegaon 4.2-acre idle plot; Pune depot is the WMS warehouse. Estates manager Sunil Pawar.
  - **Learning scenario:** 491 employees, 94.2% current, 4 overdue (Yogesh Dhumal 5-axis, two forklift operators, a
    crane operator); CERT-0412 held until the on-job evaluation on 10 Oct; CRS-0071 raised from CAPA-0088; CUR-0019
    revision 4 adds a first-off inspection module (IA-0198). Training manager Snehal Deshpande.

- 2026-10-26, **Phase 17 done: Cost Forecasting, Audit Management and Insurance Management pages.** On `main`.
  - **Screens (12 new, no phone):** Cost Forecasting `budget-dashboard` (lead), `budget-lines`, `forecast-wizard`,
    `variance-review`; Audit Management `coverage-capa` (lead), `audit-execution`, `capa-closure`, `audit-register`;
    Insurance `risk-dashboard` (lead), `policy-register`, `file-claim`, `claim-tracking`. Crumbs under "Finance".
    Content files from deck v2 slides 74, 80, 100; the three premium spotlight mocks in catalogue.ts now match.
  - **Scenario, cost (Northfield, FY 2026-27, 8 Oct, 52% of the year):** budget ₹43.74 Cr, spent ₹22.93 Cr; Plant 1
    repairs and maintenance (P1-MNT, owner Prakash Nair) at 91% of ₹140 L, alert 6 Oct, variance review VR-0031:
    phased ₹70 L → ₹127 L (breakdowns +31.2, PM catch-up +14.6, spares price +6.8, outsourced +4.4); full year ₹184 L,
    ₹172 L with the PM fix. H2 reforecast FC-2026-H2: drivers +89 (volume, USD/INR, power, wage DA, freight) plus
    the repairs run-rate +44 = base ₹45.07 Cr; optimistic ₹44.88 Cr, stress ₹45.26 Cr. FP&A Meenakshi Bhat, CFO Ashok
    Rathi. Insurance premiums line ADM-INS ₹38 L, ₹36.2 L paid upfront, alert suppressed.
  - **Scenario, audit:** plan 64 audits (31 of 34 due done); 27 open findings (1 critical AUD-0413, 7 major, 19
    minor); 21 CAPAs, 3 overdue (CAPA-0079 Deccan Tooling, CAPA-0081 stores 5S, CAPA-0076 Kestrel packing). IA-0219
    (machining, Plant 1, auditor Rekha Iyengar from Chennai QA): blocked TW-14 found in use at ASM-02 (major), which
    reopens CAPA-0088 (calibration recall from IA-0198); repeats: Yogesh Dhumal's lapsed certification, uncoded minor
    stops. Shares the CAPA-00xx series with mVLens. Internal audit head Rajesh Gokhale; QA head Anil Bhosale.
    Coming up: IA-0216 stores 14 Oct, Kestrel CA-0013 17 Oct, Aster ~20 Oct, factory inspection reply RG-0024 24 Oct,
    ISO 9001 surveillance 18 Nov.
  - **Scenario, insurance (fictional insurers Saptarishi General and Meghdoot General, broker Kavach; risk manager
    Gopal Shenoy):** 10 policies, ₹84.8 Cr property and machinery; machinery breakdown ₹24.8 Cr on 1,142 assets
    (₹38 L of 4 Oct additions to endorse); renewals: V-09 motor 19 Oct, both fire policies 30 Nov, marine 15 Dec.
    New claim CLM-INS-0072 drafted from MO-0418 (CNC-03 spindle, ~₹3.4 L after the ₹50,000 excess, intimate by 10 Oct
    11:36, PM-2207 overdue warning). CLM-INS-0068 Chennai water ingress: ₹6.40 L claimed, ₹5.10 L offered, day 51.
    NPO-3306 transit damage below excess, recovered from the transporter.

- 2026-10-26, **Phase 16 done: PPDS, Shop Floor Control and FSC Portal pages.** On `main`.
  - **FSC Portal decided by the user:** the deck uses the name twice (slide 10 and the slide 23 story: forest
    certification, GPS plot mapping, chain of custody, EUDR; slide 84 appendix: a forwarding and stocking centre
    portal). The user chose **forest certification** (DECISIONS.md, "FSC Portal"). The catalogue summary, the
    homepage Explore panel (now an EUDR statement mock, in the "Sourcing, finance and risk" group) and `sources.ts`
    changed to match; the FSC customer story now links to /modules/fsc-portal.
  - **Screens (12 new, 1 moved, 1 phone):** Shop Floor Control `live-board` (the homepage `production` screen on the
    module shell, as the plan asked; one cramped table loosened), `scheduling-board`, `downtime-rework`,
    `job-card-register`; PPDS `planning-dashboard` (lead), `line-schedule`, `production-orders`, `mrp-run`; FSC
    `plot-registry` (lead, plot map), `chain-of-custody`, `eudr-statement`, `lot-register` and the phone `harvest-log`
    (offline harvest logging).
  - **Scenario, shop floor and planning (Northfield, Plant 1, shift B, 8 Oct):** the Production Management figures
    (OEE 78.4%, CNC-03 spindle alarm 2 h 10 m, downtime 4 h 24 m). Shift B machining team and overtime OT-0311 from
    Roster Ledger; CNC-03 at 123% tonight, WO-5533 moved; Yogesh Dhumal's lapsed 5-axis certification blocks him
    from tonight's setting. PPDS: week 41, MPS frozen to 19 Oct; IH-220 at 0.3 weeks of stock (all Plant 1 stock for
    SO-24817; WO-5532 refills the depot, matching the 11–12 Oct depot refill in the portals); export order EXP-0388
    (Halvorsen Pumps AS, 400 GB-310) asks into the frozen week; CNC-03 resequence saves 50 min; MRP: 6 shortages, 4
    proposals ₹10.94 L incl. a reverse auction AUC-0091 for 1,800 kg of castings (ties to Auction and Bidding,
    Phase 18). New WOs: WO-5523, 5527, 5529 (IM-180 for online sales), 5530, 5532–5540.
  - **Scenario, FSC: its own company**, Malabar Woodcraft Exports, Kochi (rubberwood and plantation-teak furniture
    components for EU buyers): 1,426 plots, 7 flagged against the 31 Dec 2020 cut-off; container MWE-0412 for
    Lindqvist Interiors BV traced to 212 plots, 87% certified input, FSC Mix; the due-diligence package waits for one
    felling permit. The customer story's results (4 weeks → 2 hours) are not used in the screens.
  - **New names:** Kishor Mhatre (shift supervisor), Rakesh Bhoir, Meena Gaikwad, Arjun Kadam, Lalita Kshirsagar
    (operators); at Malabar: Anjana Varghese, Biju Thomas, Joseph Kurian.
  - **Content:** `content/ppds.ts` (v2 slides 110–111, pharma terms kept for pharma), `shop-floor-control.ts` (98–99),
    `fsc-portal.ts` (slide 10 and 23, standard practice for the rest); views for all three in `views.ts`.
  - Verified: every screen fits its canvas; each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no
    broken images, no console errors); `qa/measure.html` overflow=none at nine sizes on all three; homepage clean
    after the catalogue change; build passes, titles, canonical and FAQPage in the built files, all in the sitemap.
  - **Module pages live (31):** all 18 Base modules, all 4 portals and 9 Premium modules.

- 2026-10-26, **Phase 15 done: Scheme and Rebate, Ecommerce Integration and Subscription Management pages.** On `main`.
  - **Screens (11 new, 1 updated):** Scheme and Rebate `schemes` (the existing lead, its festive-slab row now matches
    the Distributor Portal: 1 Sep – 31 Oct, 3% from ₹40 L, 4% from ₹60 L), `scheme-register`, `slab-builder`,
    `claims-queue`; Ecommerce `channel-dashboard` (lead), `order-feed`, `listings-sync`, `connector-detail`;
    Subscription `arr-churn` (lead), `plan-builder`, `billing-dunning`, `subscription-register`. No phone screens.
  - **Scenario, schemes (Northfield):** seven schemes SCH-0401–0412, ₹42.6 L of ₹60 L used, ₹11.8 L accrued, ₹30.8 L
    settled. The 23 claims (₹6.4 L) are the dealer and distributor claims of Phases 12–13 plus others: 14 verified
    ₹3.9 L (Navrangpura ₹1,10,260, Ahmedabad dealers ₹1,06,640, 7 more ₹1,73,100), 5 waiting for an audit, 4
    duplicates (DCL-0419's bills were paid in DCL-0408). Draft SCH-0419 rabi season dealer slab: ₹7.50 L projected
    against an ₹8 L cap; the simulation shows slab 3 paying for sales that happen anyway and suggests ₹6.66 L.
  - **Scenario, ecommerce (Northfield Spares online):** 312 orders today on Marketplace A, Marketplace B, a B2B
    marketplace and the D2C store, routed to Plant 1, the Ahmedabad depot and Chennai (the Phase 14 warehouses);
    run-rate buffers (3 / 2 / 1 days) pause 7 listings; Marketplace B's API fails from 12:40 and 23 acknowledgements
    wait in the retry queue; a ₹6,982 payout shortfall; three sellers under the SK-22 MAP of ₹549. Quick commerce is
    named in the copy (deck) but not used by this seller.
  - **Scenario, subscriptions: its own company** (the module serves businesses that sell subscriptions, which
    Northfield does not): Arcwise Software, Bengaluru, an IT company selling the Arcwise FieldOps app. Figures match
    the homepage Explore panel (2,140 subscribers, MRR ₹38.6 L, churn 1.8%). Coastal Lift Services' renewal asks 15%
    off, above the 10% delegation: routed to the commercial head, 10% suggested. Basic run of 1 Oct: 38 failed, 21
    recovered, 17 in dunning on one policy (retry D1/D3/D7, final notice D10, read-only D14, cancel D30).
  - **New names:** Nikhil Oberoi (ecommerce manager); at Arcwise: Divya Krishnan (revenue operations), Ananya Bose
    (commercial head), Vikas Hegde and Meghna Pai (account managers); customers Coastal Lift Services, Apex
    Elevator Care, Polar Air HVAC, Zenith Medical Equipment Service and others.
  - **Homepage Explore mock** for Ecommerce now matches the screens (four channels, buffers in days, one channel
    queued). `leads.ts` no longer lists Scheme and Rebate (its content file supplies the lead screen).
  - **Content:** `content/scheme-and-rebate.ts` (v2 slides 86–87), `ecommerce-integration.ts` (82–83),
    `subscription-management.ts` (102–103); views for Ecommerce and Subscription in `views.ts`.
  - Verified: every screen fits its canvas; each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no
    broken images, no console errors); `qa/measure.html` overflow=none at nine sizes on all three; build passes,
    titles, canonical and FAQPage in the built files, all three in the sitemap.
  - **Module pages live (28):** all 18 Base modules, all 4 portals, and 6 Premium modules (transportation, fleet,
    warehouse, scheme and rebate, ecommerce integration, subscription management).

- 2026-10-24, **Phase 14 done: Transportation Management, Fleet Management and Warehouse Management pages.** The
  first Premium modules. On `main`.
  - **Screens (12 new, 2 phones):** Transportation `control-tower` (lead, a lane map of shipments in motion),
    `shipment-register`, `load-builder`, `shipment-tracking` and the phone `epod` (the driver's proof of delivery);
    Fleet `fleet-dashboard` (lead), `vehicle-register`, `maintenance-planner`, `vehicle-360`; Warehouse
    `wms-dashboard` (lead, a zone floor plan), `stock-register` (bin level), `inbound-putaway`, `pick-dispatch` and
    the phone `rf-pick` (handheld pick by scan, FEFO).
  - **Scenario, transport (8 Oct, 14:02, all sites):** 31 shipments in motion, 22 dispatched today, OTIF 93.6%,
    3 at risk; October freight ₹13.1 L of ₹48.0 L. Transporters Om Sai Transport (already in Gate Entry, VIM and GST
    returns), Shivneri Roadlines, Gujarat Freight Carriers, Southern Cargo Movers, Coromandel Roadways, plus the own
    fleet. SHP-6127 carries SO-24781 (640 GH-280, out through Gate Entry's GP-3171 at 09:05) to Meridian Compressors,
    Coimbatore (1,180 km): a 52 m halt near Satara moves the ETA past the receiving cut-off, the consignee is told.
    SHP-6114 (Orion Agro, Indore) has an e-way bill lapsing tonight, extension queued for when the window opens.
    SHP-6128 at Kestrel Pumps: 1 CV-110 damaged on the ePOD, claim TCL-0118. The Pune → Ahmedabad lane is 18% dearer
    since Om Sai's rate card of 3 Oct (Data Analytics alert AN-0414), so load LD-0927 for 9 Oct (three drops:
    Vishwamitri Pumps Vadodara, Patel Irrigation, STO-0396 to the Ahmedabad depot; 8,948 kg, 89%; ₹33,600 against
    ₹50,200 separately) ranks Gujarat Freight Carriers first; SO-24873 (Anand Engineering, credit hold) stays out.
  - **Scenario, fleet:** 32 own vehicles (Plant 1 V-01–V-18, Ahmedabad V-19–V-24, Chennai V-25–V-32), 21 on trip,
    3 in the Plant 1 workshop, V-29 blocked on a lapsed PUC; ₹27.4 a km in October (41,860 km, ₹11.47 L). V-12 (32
    ft, 2017) carries STO-0393 to the depot and costs ₹47.9 a km against ₹42.5 for its class: replacement review.
  - **Scenario, warehouse:** Plant 1 finished-goods warehouse, ₹61.0 L (Inventory Management's FG figure), 1,010
    bins at 80% (zone A 93%). Wave W-0318 (86 lines, cut-off 16:30) picks SO-24832 and the 9 Oct loads; the short
    pick at A-09 is filled from overflow F-03. SK-22 seal kits in three batches (B0644 Mar 27, B0731 Dec 27, B0819
    Aug 28; B0731 and B0819 agree with the Distributor Portal's 18-month rule): FEFO picks B0644, the depot transfer
    takes B0819. GRN-5516 (Nova Seals, 1,200 SK-22) in QC sampling; IH-220 for SO-24817 in A-14 and A-15 (lot L-0932).
  - **New names:** Tushar Joglekar (logistics manager), Lata Kamath (transport planner), Yusuf Khatri (fleet
    manager), Raju Gavade (workshop supervisor), Sunita Ghorpade (warehouse manager), Amit Waghmare (picker), drivers
    K. Murthy, Vitthal Mane, Harpreet Singh and others; customers Vishwamitri Pumps (Vadodara) and Aquaflow
    Engineering (Thane).
  - **Homepage Explore mocks** (catalogue.ts) now match the screens: the WMS pick list shows the SK-22 batches, the
    fleet register V-12's fitness date (1 Nov, 24 days) and running costs.
  - **Customer story links** (`StoryCards`): a link may name its `page`; it goes there once the page exists, else to
    its homepage fallback. The TMS story now links to /modules/transportation-management, the VIM story to the Vendor
    Portal and Procure to Pay pages; FSC Portal and ERP Connect switch over when their pages land.
  - **Prototype:** `shell.js` area charts take an optional `data-min` (used for V-12's cost per km); other charts
    unchanged.
  - **Content:** `content/transportation-management.ts` (v2 slides 76–77 + TMS deck), `fleet-management.ts` (slides
    94–95), `warehouse-management.ts` (slides 96–97 + WMS deck); views for all three in `views.ts`. Industries:
    manufacturing, distribution, pharma (cold chain and GDP kept from the decks for pharma).
  - Verified: every screen fits its canvas; each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no
    broken images, no console errors); `qa/measure.html` overflow=none at nine sizes on all three; build passes,
    titles, canonical and FAQPage in the built files, all three in the sitemap.
  - **Module pages live (25):** all 18 Base modules, all 4 portals, transportation-, fleet- and
    warehouse-management.

- 2026-10-24, **Phase 13 done: Dealer Portal and Retailer Portal pages.** On `main`. All four portals now have pages.
  - **Screens (7 new, 1 phone):** Dealer Portal `offtake` (lead) and `claims` (Northfield's channel views) with
    `replenishment` and `secondary-sales` (what the dealer sees, partner chrome with a dealer menu); Retailer Portal
    `home` (lead), `loyalty-returns`, `orders` (partner chrome, what the retailer sees) and the phone `basket`
    (basket builder) in the hero. The retailer tour has three desktop screens; the basket builder is the phone.
  - **Chain:** Navrangpura Distributors (Phase 12) → Ambica Pumps, Vatva (dealer, B-class; dealer prices IH-180
    ₹1,980, IH-220 ₹2,640 as on the SFA call report; sells IH-180 ₹2,180, IH-220 ₹2,890) and Ahmedabad Pump Mart,
    Kankaria (retailer, buys from Navrangpura and Changodar; SO-S-2281 ₹1,18,000 is the order Meera Kapoor took,
    approved on the SFA approvals screen). The IH-220 shortage (depot 90, Navrangpura's NPO-3318 takes 120, refill
    12 Oct) shows as five dealers out of IH-220, Ambica's order in two lots and the retailer's basket in two lots;
    SK-22 batch B0602 is near expiry at two dealers (reorders held) and returned by the retailer.
  - **Figures:** Ahmedabad territory 18 dealers, September offtake ₹1.12 Cr, October ₹29.6 L, 271 of 312 retailers
    billed; Ambica's October bills ₹2.60 L (31 bills); Ambica's suggested order ₹4,43,942 (target = sales a day ×
    23); dealer claims 8, ₹1,76,640, ₹1,06,640 verified for 9 Oct, 2 duplicates; retailer: ₹8.36 L delivered since
    April, 1 point per ₹200, 4,820 points (Gold), basket ₹64,251 with the 2% early-payment offer (from Scheme and
    Rebate's schemes) picked over the festive slab. New names: Mahesh Prajapati (Ambica Pumps), Harsh Mehta
    (Ahmedabad Pump Mart).
  - **Content:** `content/dealer-portal.ts` (v2 slides 69–70), `retailer-portal.ts` (slides 71–72); views for both
    (`Secondary sales` rather than "Secondary sales register", which wrapped in the sidebar).
  - Verified: every screen fits its canvas; each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no
    broken images, no console errors); `qa/measure.html` overflow=none at nine sizes on both; build passes, titles,
    canonical and FAQPage in the built files, both in the sitemap; production build hydrates with no errors and no
    three.js.
  - **Module pages live (22):** all 18 Base modules and all 4 portals.

- 2026-10-24, **Phase 12 done: Vendor Portal and Distributor / B2B Portal pages; portal page variant.** On `main`.
  - **Portal page variant:** on portal pages the "where it sits" section shows the supply-to-retail chain
    (`ChainDiagram`, the portal lit) beside the FlowStrip (`.mp__portal` in module-page.css; stacked below 1024px),
    as SITE-PLAN.md 3.1 planned; lead copy `flow.portalLead` in template.ts. 0.84 screens at 1440×900.
  - **Partner chrome** (`data-chrome="partner"` in `prototype/module-shell.js`, styles in app.css): what a
    distributor or vendor sees: their company, only the portal's menu (the module's views, or `data-menu`) under
    "Northfield Precision · <portal>", and a "Portal of Northfield Precision on MAVRO" card. VERIFY.md has the check.
  - **Screens (8 new):** Vendor Portal `dashboard` (lead), `register`, `vendor-360` (buyer's views) and `onboarding`
    (the applying vendor's view, partner chrome); Distributor Portal `home` (lead), `order-builder`, `claims`,
    `orders`, all as Navrangpura Distributors sees them.
  - **Scenario, vendors:** 412 active vendors (Plant 1 268, Chennai 121, Pune depot 23; category splits add up),
    396 fully compliant, 17 documents expiring in 90 days, 3 blocked from new POs, 9 onboarding at 4.2 days.
    Existing vendors keep their figures (Aravali Castings 94% on time, ₹14.8 L in October, PO-7714 / VIM-2207,
    VIM-2196 paid by PR-0187; Kaveri Steel; Mehta Alloys' held invoice; Sharda Bearings' audit; Konkan Foundry in
    trial; Vertex Conveyors' late PO-7688). New: Deccan Forge Works (VR-0188, Kolhapur, forgings for IH-260),
    applicant Sunil Patwardhan; Shree Ganga Packers, Om Sai Facility Services, Bharat Chem Supplies (blocked).
  - **Scenario, distributor:** Navrangpura Distributors (DST-0412, A-class, Ahmedabad; on Ravi Patel's beat, Sat
    18 Oct), owner Jignesh Patel. Credit ₹40 L, outstanding ₹28.6 L, available ₹11.4 L; festive slab ₹51.8 L of
    ₹60 L (= Sep–Oct orders ₹61.1 L with GST); draft NPO-3318 ₹9,72,169 crosses into 4%; prices IH-180 ₹1,720,
    IH-220 ₹2,290, CV-110 ₹1,940, SK-22 ₹410; claims ₹1,16,000, three verified for Scheme and Rebate's 9 Oct run.
  - **Fix:** the third Ahmedabad rep in the Data Analytics PL-087 screen is Farhan Ali (already in SFA), not a new
    name; screen recaptured.
  - **Content:** `content/vendor-portal.ts` (v2 slides 65–66), `distributor-portal.ts` (slides 67–68); views for
    both in `views.ts` (the distributor's list is the distributor's own menu).
  - Verified: every screen fits its canvas; each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no
    broken images, no console errors); `qa/measure.html` overflow=none at nine sizes on both and on Order to Cash
    (template change); build passes, titles, canonical and FAQPage in the built files, both in the sitemap;
    production build hydrates with no errors and no three.js.
  - **Module pages live (20):** all 18 Base modules, vendor-portal, distributor-portal.

- 2026-10-24, **Phase 11 done: Project Management and Data Analytics pages.** On `main`.
  - **Screens (7 new, 1 moved):** Project Management `portfolio` (lead), `milestone-plan` (the homepage `project`
    screen on the module shell, unchanged), `change-requests`, `project-register`; Data Analytics `pipeline-health`
    (lead, with a timeline of last night's window), `pipeline-detail` (PL-087 lineage and eight quality rules),
    `alerts`, `pipeline-register` (with forecast models). Homepage screens untouched. No phone screens.
  - **Scenario, projects:** 9 active capex projects, ₹7.16 Cr sanctioned, ₹6.12 Cr committed, ₹4.40 Cr spent
    against ₹4.71 Cr planned; PRJ-0217 as on the homepage (₹1.46 Cr of ₹2.40 Cr, 64% vs 70%, go-live 14 → 20 Nov,
    waiting on PO-7688, CR-031 and CR-029 = ₹18.5 L); PRJ-0226 red with a 24-day-old risk log (governance breach);
    CR-031 and CR-034 go to steering on 15 Oct; delegation plant head ₹5 L / 5 days, CFO ₹10 L / 7 days.
    PRJ-0215 (compressed air ring main) answers AC-2's dryer trips in Asset Management; PRJ-0176 brought VMC-11 to
    Chennai; PRJ-0190 built the gate booths. New names: Neeraj Bansal (PMO lead), Arvind Rao (IT head).
  - **Scenario, data:** nightly window 00:30–05:30, dashboards by 06:00; last night 45 of 46 pipelines (PL-131
    GSTR-2B import retried after a GST portal timeout; PL-087 field app orders held at its gate on 38 duplicate
    order IDs from three Ahmedabad reps' phones, ₹3.9 L, +2.1% on the app's ₹1.86 Cr); window ended 05:52; 41 of 43
    dashboards fresh. Alerts tie to HRMS (Chennai attrition), Production (CNC-03 downtime, MO-0418) and O2C
    (MD-07 demand forecast drift after SO-24817). New names: Farah Siddiqui (data platform lead), Farhan Ali (rep, already in SFA).
  - **AI kept parked:** the deck's "model health" is shown as monitoring of three forecast models; no AI
    capabilities are claimed (DECISIONS.md, item 7 parked).
  - **Content:** `content/project-management.ts` (v2 slides 50–51; service providers' client projects as the
    standard case), `data-analytics.ts` (slides 58–59); views for both in `views.ts`.
  - Verified: every screen fits its canvas; each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no
    broken images, no console errors); `qa/measure.html` overflow=none at nine sizes on both; build passes, titles,
    canonical and FAQPage in the built files, both in the sitemap; production build hydrates with no errors and no
    three.js.
  - **Module pages live (18):** order-to-cash, accounting, vendor-invoice-management, travel-and-expense, crm,
    sales-force-automation, customer-service, procure-to-pay, inventory-management, gate-entry,
    production-management, mvlens-vendor-audit, asset-management, hrms-and-payroll, roster-ledger, rest-hours-log,
    project-management, data-analytics. Every Base module now has its page.

- 2026-10-24, **Phase 10 done: HRMS and Payroll, Roster Ledger, Rest Hours Log pages.** On `main`.
  - **Screens (12 new, 1 moved, 1 phone):** HRMS `workforce` (lead), `leave-attendance`, `onboarding`, `payroll`
    (the homepage `payroll` screen on the module shell, unchanged) and the phone `punch` (a field rep's geo-fenced
    punch); Roster Ledger `coverage` (lead), `builder`, `swaps-overtime`, `roster-register`; Rest Hours Log
    `compliance` (lead), `work-rest`, `violations`, `duty-log`. Homepage screens untouched. The employee register is
    a listed view, not a screen (the tour keeps four screens).
  - **Scenario:** 489 employees on 8 Oct (486 paid in September, +5 −2): Plant 1 264, Chennai plant 129, Pune office
    and field sales 96; 24 field reps punched in by mobile (SFA's 24 of 26). Shifts A 00:00, B 08:00 (as on the
    production screens), C 16:00, teams rotating forward weekly. 8 Oct was a Wednesday and 2 Oct a holiday with the
    plants closed; dates were chosen to fit. The roster builder's grid was generated by a script that checks rest
    gaps, setters and counts (77 of 78 slots; the one gap is Ganesh More's pending leave LV-3321).
  - **Cross-module threads:** CNC-03 breakdown (Production, Asset) → overtime OT-0311 for 3 operators (Roster
    Ledger) → spread-over violation VIO-0152 for Prakash Nair (Rest Hours Log); Rajesh Kamble's weekly-off cover
    (VIO-0146, rest day 15 Oct, shown as "Comp" in next week's roster) and his prevented 7th day (VIO-0150, the
    cause of tonight's shortfall on the coverage screen); Sneha Patil (onboarding, joins 13 Oct) covers Asha Khan's
    leave; P. Shinde's missed punch matched to the gate log; Meera Kapoor's claim ER-2285 paid with October salary
    (T&E); CNC-03 down on 19 Oct for its bearing change (Asset) sets Sunday's lower demand. New names: Mahesh Jagtap
    (roster planner), Sachin Wagh (machining supervisor), R. Venkatesh (Chennai plant head), Ritika Sen, Manoj
    Pillai, the CNC cell operators.
  - **Content:** `content/hrms-and-payroll.ts` (v2 slides 32–33 plus the HRMS deck's live scope; payroll added as
    the fourth tile; roadmap items not used), `roster-ledger.ts` (slides 62–63), `rest-hours-log.ts` (slides 60–61;
    working-hour limits used as configured rules, no Act cited, since limits vary by state); views for all three in
    `views.ts`.
  - Verified: every screen fits its canvas; each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no
    broken images, no console errors); `qa/measure.html` overflow=none at nine sizes on all three; build passes,
    titles, canonical and FAQPage in the built files, all three in the sitemap; the production build hydrates with
    no errors and no three.js.
  - **Module pages live:** order-to-cash, accounting, vendor-invoice-management, travel-and-expense, crm,
    sales-force-automation, customer-service, procure-to-pay, inventory-management, gate-entry,
    production-management, mvlens-vendor-audit, asset-management, hrms-and-payroll, roster-ledger, rest-hours-log.

- 2026-10-24, **Phase 9 done: Production Management, mVLens Vendor Audit, Asset Management pages.** On `main`.
  - **Screens (12 new, 1 moved, 1 phone):** Production `plant-output` (lead: OEE by work centre, A × P × Q, downtime
    by cause), `work-order` (the homepage `work-order` screen on the module shell; work centres renamed CNC-01/CNC-02/
    PT-01 to agree with the homepage shop-floor screen, its fixed-height chart now fills its card), `qc-release`,
    `work-order-register`; mVLens `auditor-dashboard`, `audit-plan`, `quality-agreements`, `approvals` (the deck's
    four role portals) and the phone `record-finding`; Asset `uptime-value`, `asset-detail` (CNC-03),
    `depreciation-run`, `asset-register`. Homepage screens untouched. The homepage `quality` screen was not reused:
    the deck's view is a QC release queue, which is new (lot L-0932 from `quality` is in it, with the same figures).
  - **Figures made to agree:** plant OEE 78.4% (mean of seven work centres, each A × P × Q), output 1,148 of 1,171,
    both as on the homepage `production` screen; CNC-03's spindle alarm 11:36–13:46 is MO-0418 in Asset Management
    and the first-off L-0935 in the QC queue; L-0927 (BR-045, WO-5514, SO-24798) is OOS-0112; L-0897 / QI-0217 as in
    Customer Service; AUD-0418 at Sharda Bearings is the for-cause audit after the PO-7709 seal mismatch at the gate;
    Konkan Foundry is the CV-110 alternate in trial on the P2P dashboard; October depreciation ₹18.7 L against
    September's ₹18.6 L in Accounting (class and entity splits add up); PRJ-0217's conveyor (PO-7688) sits in capital
    work in progress. New names: QA head Anil Bhosale, supplier quality manager Neha Kulkarni, auditor Rahul
    Deshmukh, agreement coordinator Pooja Nambiar, maintenance head Deepak Rane, finance controller Ritu Kapoor.
  - **Content:** `content/production-management.ts` (v2 slides 36–37; batch records and CoA/assay/dissolution kept
    for pharma), `mvlens-vendor-audit.ts` (slides 30–31), `asset-management.ts` (slides 44–45 plus the AMR L1
    variant and standard fixed-asset accounting); views for all three in `views.ts`.
  - Verified: every screen fits its canvas (no `main` overflow, no clipped table); each page at 1440×900, 1366×768
    and 390×844 (one H1, no overflow, no broken images, no console errors); `qa/measure.html` overflow=none at nine
    sizes on all three; build passes (16 pages), titles, canonical and JSON-LD (with FAQPage) in the built files, all
    three in the sitemap; production build hydrates with no errors and no three.js.
  - **Module pages live:** order-to-cash, accounting, vendor-invoice-management, travel-and-expense, crm,
    sales-force-automation, customer-service, procure-to-pay, inventory-management, gate-entry,
    production-management, mvlens-vendor-audit, asset-management.

- 2026-10-23, **Phase 8 done: Procure to Pay, Inventory Management, Gate Entry pages.** On `main`.
  - **Screens (9 new, 4 moved):** P2P `spend-suppliers` (new, lead), `rfq` and `purchase-order` (the homepage
    `procurement` and `purchase-order` screens on the module shell), `po-register` (new); Inventory `stock-position`
    and `item-stock` (homepage `inventory` and `stock-item` on the shell), `cycle-count`, `adjustments` (new); Gate
    Entry `gate-dock`, `vehicle-clearance`, `security-exceptions`, `gate-register` and the phone `gate-check` (all
    new). Homepage screens untouched. Scenarios in each module's first screen.
  - **Figures made to agree** (in the module copies only; the homepage originals keep their approved figures):
    RFQ-0311 now quotes Aravali Castings at ₹256/kg (₹1,02,400, as on PO-7714), Faridabad, Net 45, 94% on time;
    the RFQ is dated 1 Oct (`data-live`), PO-7714 2 Oct and VIM-2207 3 Oct, matching Vendor Invoice Management;
    LM6 castings on the stock position show 1,120 kg after today's 620 kg issue. PO register values equal VIM's
    invoices less GST; VIM's 6 price and 4 quantity exceptions are the register's 10 blocked POs; PO-7719 (Kaveri
    Steel, 40 kg short) is GP-3184 at the gate; the BS-07 count variance raises PR-0461, which waits on the P2P
    dashboard; Sharda Bearings' short delivery (PO-7709) is the open seal-breach exception; GP-3171 is the
    SO-24781 dispatch from the homepage inventory screen.
  - **Content:** `content/procure-to-pay.ts` (v2 slides 38–39; the match and invoice-approval views stay with VIM,
    so the tour shows sourcing and the PO), `inventory-management.ts` (slides 56–57), `gate-entry.ts` (slides
    54–55, cold-chain kept for pharma); views for all three in `views.ts`. New names: plant head Prakash Nair,
    security supervisor Ganesh Patil, gate officer Ramesh Jadhav.
  - Verified: every screen fits its canvas (no `main` overflow, no clipped table); each page at 1440×900, 1366×768
    and 390×844 (one H1, no overflow, no broken images, no console errors); `qa/measure.html` overflow=none at nine
    sizes on all three; build passes (13 pages), titles and JSON-LD in the built files, all three in the sitemap.
  - **Module pages live:** order-to-cash, accounting, vendor-invoice-management, travel-and-expense, crm,
    sales-force-automation, customer-service, procure-to-pay, inventory-management, gate-entry.

- 2026-10-23, **Phase 7 done: CRM, Sales Force Automation, Customer Service pages.** On `main`.
  - **Screens (10 new):** CRM `lead-detail`, `assignment-queue`, `lead-register` (with `pipeline`); SFA
    `rep-activity`, `beat-plan`, `approvals` (with `field-force`) and the phone `call-report`; Customer Service
    `resolution-workbench`, `escalations`, `ticket-register` (with `ticket-load`). Scenarios in each module's
    first screen. Figures tie together: SFA rep calls add up to the territory totals (field-force norm total fixed
    to 1,456); the approval queue matches the dashboard (12 claims ₹38,400, 7 orders ₹4.9 L, 2 beat changes);
    Ravi Patel's missed A-class outlets are the overdue visits in his beat plan; lot L-0897's 414 dispatched
    pieces split across six customers, three of whom complained; SO-S-2276 (SFA approvals) is disputed in
    TKT-4429 (CS escalations). The service head is Suresh Pillai (Imran Shaikh is a CRM rep; ticket-load fixed).
  - **Content:** `content/crm.ts` (v2 slides 46–47), `sales-force-automation.ts` (slides 52–53, written for trade
    markets with pharma as one industry), `customer-service.ts` (slides 48–49; pharmacovigilance stated as the
    pharma case of a safety screen that applies to every industry).
  - Verified: each page at 1440×900, 1366×768 and 390×844 (one H1, no overflow, no broken images, related
    thumbnails load); every screen fits its canvas; `qa/measure.html` at nine sizes; build passes (10 pages).
  - **Module pages live:** order-to-cash, accounting, vendor-invoice-management, travel-and-expense, crm,
    sales-force-automation, customer-service.

- 2026-10-23, **Phase 6 done: Accounting, Vendor Invoice Management, Travel and Expense pages.** On `main`.
  - **Screens (13 new):** Accounting `general-ledger` (the approved `accounting` screen on the module shell),
    `bank-reconciliation`, `gst-returns`, `financial-statements`; VIM `ap-dashboard`, `invoice-register`,
    `three-way-match`, `payment-run`; T&E `spend-compliance`, `trip-request`, `reimbursements`, `expense-register`
    and the phone `receipt-claim`. Scenarios in each module's first screen; figures cross-checked (3B computation,
    bank reconciliation, payment run, settlement totals and ITC held all add up) and tied across modules: the 7
    GSTR-2B holds (₹1.92 L) appear in Accounting and VIM; VIM-2207 is Aravali Castings' invoice waiting for the
    goods on PO-7714 (as on the homepage screen); PR-0187 and cheque 004412 match the bank reconciliation;
    T&E travellers are the SFA field force; reimbursements settle in the payroll run.
  - **Content:** `content/accounting.ts` (deck summary points plus standard accounting capabilities, per the
    user's rule), `vendor-invoice-management.ts` (slides 42–43), `travel-and-expense.ts` (slides 40–41); views
    for all three in `views.ts`. Related modules chosen so every card has a real screen.
  - **Template tweak:** industry card links read "Explore <industry>" (long module names wrapped badly).
  - **Prototype:** `.seg span` no longer wraps (app.css); `plan` icon in the phone tab bar. VERIFY.md lists the
    prototype's reserved class names (two screens broke by reusing `.side` and `.rule`).
  - Verified: each page at 1440×900 and 390×844 (one H1, no overflow, no broken images); every screen fits its
    canvas; `qa/measure.html` at nine sizes; build passes.
  - **Module pages live:** order-to-cash, accounting, vendor-invoice-management, travel-and-expense.

- 2026-10-23, **Phase 5 review round 2 applied; template approved for the module phases** (the user asked for
  these fixes and then Phase 6). Client band at the foot of the module hero (`ClientBand` block, moved out of the
  homepage hero, same markup); all decorative colour removed (industry bands, coloured avatars, brand-sweep plate,
  gradient accents); Audience columns aligned; design pass on section rhythm (DECISIONS.md). Verified at nine
  sizes; build passes.

- 2026-10-23, **Phase 5 review round 1 applied** (user feedback on `/modules/order-to-cash`); waiting for the next
  review.
  - **Hero:** the screen runs off the right edge at every desktop width and is cut by the hero's bottom edge; the
    plate and its border lines are gone. **Phone:** a proper device frame (rim, bezel, Dynamic Island, buttons,
    sheen) in `Screen`, used everywhere phone screens appear.
  - **Who uses it** redesigned (industry cards with coloured bands; people with avatars, tasks and "Works in"
    chips; roles gained `works` in the schema). **Built on the platform** is now the night band, with the module
    plate wired into the eight features (`PlatformStrip module`).
  - **Related modules** show real lead screens: four new prototype screens, deck screen 01 each:
    `crm/pipeline`, `sales-force-automation/field-force`, `customer-service/ticket-load`,
    `scheme-and-rebate/schemes` (scenarios in their comments, tied to Northfield Precision and the O2C figures,
    e.g. Meridian's 40-piece short supply). Mapped in `src/data/modules/leads.ts`; ModuleCards crop past the
    sidebar.
  - **Full views per module:** `src/data/modules/views.ts` (O2C 11 views, and the four modules above). The
    prototype sidebar reads it (the `data-views` attribute is gone; the shell checks `data-view`), and the tour
    lists the views it does not show. ModuleScreen gained `view`. All O2C screens recaptured with the new sidebar.
  - Verified: the module page at 2000×880, 1440×900, 1366×768, 1024×768 and 390×844; `qa/measure.html` no overflow
    at nine sizes on the module page, `/_library` and `/`; build passes; production hydrates without errors.

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

1. **Phase 28: Launch QA** (IMPLEMENTATION-PLAN.md Phase 28): read its scope first. Includes removing
   `/pipeline-check`, rerunning `npm run linkcheck`, and asking the user whether inner-page "Request a demo" should
   open `/contact`.

## Open items (need the user or real assets)

| Item | Where | Now |
|---|---|---|
| Production domain | `site.url` in `src/data/site.ts` | `https://mavro.example` placeholder |
| Demo form endpoint | `site.demoEndpoint` in `src/data/site.ts` | `null`, so the form opens a pre-filled email to contact@saisatwik.com. Set a form service URL (Formspree, Basin, HubSpot or MAVRO's own API) that accepts a JSON POST to receive requests directly |
| Industry list | `industries` in `src/data/home.ts` | Manufacturing, Distribution, Pharma, Service providers (Service providers replaced Exporters at the user's request, 2026-10-23). Confirm with the user before launch |
| Testimonials / case studies | `proof` in `src/data/home.ts` | three anonymised stories from deck slide 23 (approved 2026-10-23). Named stories, quotes or logos per story only with the client's approval |
| Social share image | `src/seo/head.ts` | none |
| FAQ: pricing and hosting | `faq.items` in home.ts | not answered: the decks do not state a pricing model, deployment options beyond "cloud-native" or data ownership terms. Add those questions once the user supplies the answers |
| **Company (About), Privacy policy, Terms of use** | `companyText`, `privacyText`, `termsText` in `src/data/company.ts` (`TextContent`: SEO, title, lead, updated, sections) | **waiting for the user's text.** Template ready (`src/pages/TextPage.tsx`); the route, the menu/footer link and the sitemap entry appear once the text is filled in. Never fill with invented copy |
| **Blog posts** | `posts` in `src/data/company.ts` | **none yet.** Templates ready (`src/pages/Blog.tsx`: `/blog` list and `/blog/<slug>`); the Resources menu shows Blog once there is a post |
| **Careers openings** | `openings` in `src/data/company.ts` | **none yet.** Template ready (`src/pages/Careers.tsx`, apply by email); the Company menu and footer show Careers once there is an opening |
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
