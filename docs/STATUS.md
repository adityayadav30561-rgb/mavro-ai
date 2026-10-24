# Status

_Last updated: 2026-10-24. Update this file at the end of every task and before clearing context._

## Where we are

**Stage C (phased implementation). Phases 1–11 done (2026-10-24); next: Phase 12, Vendor Portal and Distributor /
B2B Portal (deck slides 65, 67; portal pages use the chain section).** The
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
    (MD-07 demand forecast drift after SO-24817). New names: Farah Siddiqui (data platform lead), Kunal Shah (rep).
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

1. **Phase 12: Vendor Portal, Distributor / B2B Portal** (slides 65, 67). The first portal pages: portal pages use
   the chain section instead of the flow strip (SITE-PLAN.md). The vendor side ties to Procure to Pay, VIM and
   mVLens (Aravali Castings, Sharda Bearings); the distributor side to SFA, O2C and Scheme and Rebate.
2. Then Phase 13 (Dealer Portal, Retailer Portal; Retailer has a phone screen).

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
