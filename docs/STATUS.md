# Status

_Last updated: 2026-10-22. Update this file at the end of every task and before clearing context._

## Where we are

**Stage C (phased implementation), starting.** The homepage is done (Stage A). The site plan
([SITE-PLAN.md](SITE-PLAN.md), 60 pages) was approved on 2026-10-23, and the phased plan is
[IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md): 28 phases (foundations 1–5, module pages 6–20, other pages
21–26, homepage integration 27, launch QA 28). **Next: Phase 1, routing, prerender and per-page SEO.** One phase
per session; the user approves the module template after Phase 5. See [WORKFLOW.md](WORKFLOW.md).

Everything builds (`npm run build` passes) and has been checked in the browser at phone, tablet, laptop and
large-monitor sizes. The project is on GitHub (private): https://github.com/adityayadav30561-rgb/mavro-ai. See docs/CLOUD.md.

## The homepage, in order (`src/App.tsx`)

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

Header: logo, Platform mega-menu (all modules by business area + portals), Product, ERP Connect, Portals,
Premium modules, Why MAVRO, Explore the platform, Request a demo. Mobile drawer with the same content.

## Most recent work (newest first)

- 2026-10-23: the project was put under git and pushed to GitHub (private repo) so work can continue from
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

1. The improvement plan is done except item 7 (MAVRO AI, parked until the user confirms which capabilities are live).
2. When the user says the homepage is done, close Stage A (checklist in [WORKFLOW.md](WORKFLOW.md)).
3. Stage B: plan the rest of the website with the user (sitemap, page types, content sources).

## Open items (need the user or real assets)

| Item | Where | Now |
|---|---|---|
| Production domain | `site.url` in `src/data/site.ts` | `https://mavro.example` placeholder |
| Demo form endpoint | `site.demoEndpoint` in `src/data/site.ts` | `null`, so the form opens a pre-filled email to contact@saisatwik.com. Set a form service URL (Formspree, Basin, HubSpot or MAVRO's own API) that accepts a JSON POST to receive requests directly |
| Industry list | `industries` in `src/data/home.ts` | Now the deck's audiences: Manufacturing, Distribution, Pharma, Exporters (Printing and packaging and Services, from the earlier site, were dropped). Confirm with the user before launch |
| Testimonials / case studies | `proof` in `src/data/home.ts` | three anonymised stories from deck slide 23 (approved 2026-10-23). Named stories, quotes or logos per story only with the client's approval |
| Social share image | `src/seo/head.ts` | none |
| FAQ: pricing and hosting | `faq.items` in home.ts | not answered: the decks do not state a pricing model, deployment options beyond "cloud-native" or data ownership terms. Add those questions once the user supplies the answers |
| Resources, Company, About, Careers, Privacy, Terms | `href: null` in `src/data/site.ts` | planned pages; links stay hidden until the pages exist |

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
