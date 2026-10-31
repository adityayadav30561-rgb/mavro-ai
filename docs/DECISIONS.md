# Decisions and user preferences

What the user asked for, liked and rejected, with the reasoning. Read before changing design; do not
reintroduce anything under "Rejected". Add new entries as soon as the user states a preference.

## Standing preferences (apply everywhere)

| Preference | Detail |
|---|---|
| Official logo only | The supplied MAVRO.AI image (`brand/mavro-logo.jpg`), never redrawn or recoloured; light backgrounds only. |
| Colours from the logo | Violet `#7a36fb`, blue `#0a48fd` (primary), cyan `#03c8fd` (accent), navy `#090e34` (ink). Light site; ERP Connect and the Demo panel are the dark navy moments. Tier colours: Base = blue, Portals = cyan, Premium = violet. |
| Font | Manrope only. |
| No eyebrow labels | No small uppercase labels above headings, anywhere (removed 2026-10-22). |
| Every module is live | No "Coming soon" tags anywhere. |
| No "Premium" tag on individual modules | Package names may appear as section titles, but modules are not marked. |
| Every module gets its own space | No compact lists of module names; each module gets a card or a panel. On the homepage this is being replaced by one condensed "Explore the platform" section (improvement plan item 4, approved 2026-10-22); the full catalogue moves to the mega-menu and future module pages. |
| Keep the product screenshots | The prototype screenshots (`src/assets/screens/`, from `prototype/`) are approved; restyling the site must not replace them. |
| Fit the screen | Sections should take about one screen on laptops and large monitors alike (rem scaling, see README "Responsive sizing"). |
| Fully responsive | Every screen size and device type: phones, tablets, laptops, 27" monitors. |
| No invented claims | Stats, testimonials, certifications, customer results only when supplied and verified. Client logos are supplied (clientele slide). |
| Git: `main` only | All work is committed and pushed to `main`; no feature or session branches (user, 2026-10-23). Repeated firmly on 2026-10-24 after Phase 14 was pushed to a session branch: "I don't want to see that you are working on other branch". Applies even when a cloud session is told to use a `claude/...` branch; if a push to `main` is blocked, ask the user instead of using another branch. |
| Content from the decks | Module names, portals, packages and ERP Connect come from the user's decks (docs/PRODUCT.md). |
| Missing deck content | Where a deck says nothing about a module (or part of one), use standard information for that kind of module, kept to the modules MAVRO offers (user, 2026-10-23: "just know the modules we are offering, and if something is missing for any module, use standard info"). Still no invented figures, customer results or certifications. Accounting is the first case. |

## Section by section

| Section | Decision | Why / history |
|---|---|---|
| Section order | Hero, Platform intro, Product showcase, ERP Connect, Explore the platform (Base / Portals / Premium), Workflow, Implementation, Industries, Why MAVRO, (Customer proof), Demo | User: ERP Connect is a focus section and the product's look and feel matters, so both moved up from the bottom (2026-10-19). |
| Header nav | **Since Phase 3 (2026-10-23):** Platform ▾, Solutions ▾, Customers, Resources ▾, Company ▾, Request a demo (SITE-PLAN.md section 8). The "Explore the platform" text link left the header (the plan has only the demo button) | Five destinations instead of six homepage anchors; every link opens a real page once it exists. No dead links. |
| Mega-menu | **Since Phase 3:** branched. A rail (Base modules, Portals, Premium modules, ERP Connect; it opens on Base) and a stage: a package shows its modules by area with icon and summary; Portals shows the four portal cards and the supply-to-retail chain; ERP Connect shows the systems, the five benefits and the no-direct-access rule. Featured card bottom right: "Already on SAP, Oracle or Tally?" with a miniature of the Connect board (on the Connect branch: the TMS-alongside-SAP story). Modules carry no package tags; the package is only the branch | SITE-PLAN.md section 8; user removed premium tags earlier. |
| Hero band | Client logos ("Trusted by"), grey, colour on hover | User: "in this row, our clientele should come, not the modules" (2026-10-22). |
| Hero visual | Custom three.js scene: platform core + six module nodes + two floating UI panels (sales order, work order) on a diagonal | Original brief; reduced from three panels in item 8 so the core reads clearly. |
| Hero copy | "One ERP for manufacturers & distributors." + proof points: live in 25–30 days, GST and India payroll built in, works with SAP/Oracle/Tally | Design review item 1 (2026-10-22): name the audience, answer speed / India / existing-ERP questions up front. |
| Implementation | Timeline + phase cards + support strip from deck slides 25 and 28; generalised (the deck's "attendance and payroll first" became "priority modules first") | Design review item 1. |
| Module packages | **One section, Explore the platform** (item 4, 2026-10-22): package tabs, then featured modules in a rail beside a panel with the module's story and an illustrative screen. Supersedes the carousel, the Portals section and the Premium list/panel below (kept for history) | User approved condensing the three sections after the design review. |
| (history) Base modules | Pinned horizontal carousel driven by vertical scroll with mini module screens | Superseded by Explore; the mini screens were then replaced by full product screens at the user's request. Snapshot in `legacy/module-sections-2026-10-22/`. |
| (history) Premium modules | Grouped list on the left, panel on the right that changes on click | Superseded by Explore, which keeps the same list-left / panel-right idea the user liked ("one side ... other side changing when clicked"). |
| (history) Portals | Chain diagram + one card per portal | Superseded by Explore; the chain is now the Portals tab's visual, with the selected portal lit. |
| ERP Connect | Architecture from the connectivity deck's integration page only (systems → MAVRO Database → MAVRO App → users; "no direct ERP access") | User: "just take the connectivity page". |
| Product showcase | Heading and team tabs left, large screenshot right | Fits one screen on laptops. |

## Design review, 2026-10-22

The user asked for an expert review and approved every recommendation, to be built one at a time from most to
least important, with full design effort. The ordered list lives in [STATUS.md](STATUS.md) ("Improvement plan").

## Demo form and mid-page CTAs (improvement item 2, 2026-10-22)

| Decision | Choice | Why |
|---|---|---|
| Closing section | One navy panel: pitch, what the demo covers, direct email and phone on the left; a white form card on the right. Replaces the old FinalCta | A real form converts better than a single mailto button; the navy matches the wordmark. |
| Fields | Required: name, work email, phone, company. Optional: current system (select), interests (Base modules, Portals, Premium modules, ERP Connect), message | Enough to prepare a tailored demo without a long form. |
| Delivery | JSON POST to `site.demoEndpoint`; while it is `null`, open a pre-filled email to `site.contactEmail` | Static site, no backend yet; the fallback still delivers every request. |
| Validation and accessibility | Validate on submit, then live; an alert plus per-field errors tied with `aria-describedby`; focus moves to the first invalid field; the result card is a `role="status"` and takes focus | Keyboard and screen-reader users get the same feedback. |
| Spam | Hidden honeypot field; if filled, show success and send nothing | No CAPTCHA friction for people. |
| Interests | 2 x 2 tiles (one column under 380px) | Four pills wrapped with one left alone on a row. |
| Mid-page CTAs | After ERP Connect ("Running SAP, Oracle or Tally?", ticks ERP Connect) and at the end of Premium ("Not sure which modules you need?", dark tone). Both scroll to `#demo` | Catch intent where it forms instead of only at the page end. |
| Contact details | contact@saisatwik.com, +91 92114 29011 (from the deck) | Real channels for people who prefer not to use a form. |

## Security, compliance and contact (improvement item 3, 2026-10-22)

| Decision | Choice | Why |
|---|---|---|
| Why MAVRO evidence | The sample document trail (a duplicate of the Workflow section) is replaced by a "Trust, built in" card under the heading: tabs India compliance / Security | Buyers ask about GST, payroll statutory and data security early; the deck has concrete facts for both. |
| Compliance tab | Five rules (GST and e-invoicing, input tax credit, goods movement, statutory payroll, contract labour), each with the returns or registers it covers as tags and one line of what MAVRO does | Scannable; tags carry the terms buyers search for. |
| Security tab | Four figures (AES-256, 7 years audit retention, RPO < 4 hr, RTO < 8 hr) then six controls | Only the deck's own figures; no certifications are claimed (none are in the deck). |
| Layout | Both panels share one grid cell so the card never changes height; on wide screens the principles list stretches its three rows to the aside's height | No jump on tab change; no empty gap under the principles. |
| Footer | Head office (pin icon), phone and email under the brand note; the same details in the Organization structured data | Real contact details from the deck. The deck gives the PIN as 201009 on both slides that show it. |

## Explore the platform (improvement item 4, 2026-10-22)

| Decision | Choice | Why |
|---|---|---|
| Structure | Package tabs (name, blurb, live module count) above a stage: featured-module rail on the left, panel on the right (kicker, headline, body, points, visual) | The list-left / panel-right pattern the user preferred for Premium, applied to all three packages. |
| Featured modules | Base: Order to Cash, Accounting, HRMS and Payroll, Procure to Pay, Production, Inventory. Portals: all four. Premium: Transportation, Scheme and Rebate, Warehouse, Shop Floor Control, Auction and Bidding, Contract Labour Supply. Set in `explore.packages.*.featured` | The modules that carry the deck's story (O2C, India payroll, the channel, logistics). Easy to change. |
| The rest of the catalogue | "All N base/premium modules" opens the Platform mega-menu (drawer on phones); no compact name list | Name lists were rejected earlier; the menu already holds every module, and module pages come in Stage B. |
| Visuals | Base: a **full product screen per module** (prototype pages o2c, accounting, payroll, purchase-order, work-order, stock-item), in the wider column and bleeding off the panel's edges. User asked for these instead of the mini snippets (2026-10-22): "create a screen of a page of that module", same design as the Showcase screens. Portals: the supply-to-retail chain with the selected portal and its link lit. Premium: the existing drawings | Reuses approved work; each package has its own visual language. |
| Stability | Panel has one minimum height on desktop, so switching packages or modules never moves the page below | Avoids layout jumps. |
| Old anchors | `#modules`, `#portals`, `#premium` are markers at the section top; following them selects the tab | Nav, footer, mega-menu and the platform diagram keep working without edits. |
| Background | White, right after ERP Connect; item 5 makes ERP Connect dark so the two separate | Avoids two dark bands next to each other once Connect is dark. |

## ERP Connect and the platform diagram (improvement item 5, 2026-10-22)

| Decision | Choice | Why |
|---|---|---|
| ERP Connect | A dark band: navy with brand light pooling behind a glassy board; the MAVRO Database hub is the one bright, glowing object; wires and packets in cyan and violet; the heading's second line in the gradient | ERP Connect is a focus section (user, 2026-10-19); the dark band sets it apart and matches the wordmark. |
| Benefits | The connectivity deck's five benefits (slide 5) as a row under the board: fewer ERP licences, simple role-based screens, beyond native ERP limits, your own workflows, mobile for every user | Says why the architecture matters, from the deck; no figures added. |
| Rhythm | Showcase (paper) → ERP Connect (navy) → Explore (white) → Workflow (paper) | No two neighbours share a background. |
| Platform diagram | Tier labels are links to Explore's packages with a small arrow; hover or focus lifts the matching plate and outlines it in the tier colour; clicking a plate follows the same link. The shared-platform layer is not a link | Makes the overview a way in to the detail; the SVG stays decorative, the labels carry the links for keyboards and screen readers. |

## Industries (improvement item 6, 2026-10-22)

| Decision | Choice | Why |
|---|---|---|
| Which industries | Manufacturing (OEM suppliers, multi-line plants), Distribution (dealer, distributor and retail networks), Pharma (multi-plant, GMP), **Service providers** (IT companies and professional services). Exporters replaced by Service providers at the user's request (2026-10-23: "we have service providers like IT companies instead of exporters"). Printing and packaging dropped | The deck's own audiences (slide 2) plus pharma from its module pages. "FMCG" is not used because the deck does not say it. |
| Claims | Only capabilities from the deck. Left out: "trusted by major automotive OEMs", "markets on every continent", "60+ countries" | Unverifiable customer and reach claims. |
| Layout | Four industry cards above one full-width panel: headline + three points, the order flow on one line, then module chips | A side list squeezed the 10-stage flow onto two lines. |
| Module chips | Each opens that exact module in Explore the platform (package tab + module tab); only featured modules are used. **Since Phase 27 (2026-10-31):** each opens the module's own page; Explore is the fallback only for a module without one | "Each links to its relevant modules" from the plan, without dead ends; the plan's Phase 27 points the homepage at the new pages. |

## Visual refinements (improvement item 8, 2026-10-23)

| Decision | Choice | Why |
|---|---|---|
| Headline treatments | Three second-line styles in `base.css`: `.soft` (grey), `.grad-text` (brand sweep), `.mark` (ink with a brand-gradient marker that draws in on reveal), plus a centred one-colour heading (`head--center`). Neighbouring sections never share one. Current order: Hero grad, Intro soft, Showcase mark, Connect grad (dark), Explore soft, Workflow centred, Implementation grad, Industries mark, Why soft, Stories mark (dark), FAQ grad | Every section used dark + grey, which read as a template. Keep the rule when adding sections. |
| Hero panels | Two (sales order, work order) instead of three | Less clutter around the 3D core. |
| Workflow | No travelling light pulse on the line | Decoration that competed with the steps. |

## FAQ (improvement item 9, 2026-10-23)

| Decision | Choice | Why |
|---|---|---|
| Written for search | User: "write faqs according to aeo geo seo". Questions phrased as buyers search; each answer opens with a direct, self-contained statement naming MAVRO, then specifics (module names, GST returns, ERP versions, 25 to 30 days), 30 to 70 words | Answer engines and AI overviews quote short, complete answers that name the entity. |
| Facts | Only from the decks; module counts computed from the catalogue. No pricing, hosting or data-ownership answers until the user supplies them | No invented claims. |
| Markup | Native `<details>` (answers always in the HTML, keyboard accessible, no JS); `h3` questions; anchor id per question; FAQPage JSON-LD built from the same items | Crawlers see every answer; schema and page can never disagree. |
| Placement | After Why MAVRO, before the demo; paper background; gradient headline (the headline-variation rule) | Objections answered right before the ask. |

## Customer stories (improvement item 10, 2026-10-23)

| Decision | Choice | Why |
|---|---|---|
| Source | Deck slide 23's three implementations ("Clients anonymised, results verified"); user approved using them "in a way it suits on the site, not as it is" | Real, verified results are the strongest proof on the page. |
| Rewrite | Each becomes a short case: client type and sector, one headline result, the starting point (only what the deck's bullets imply), what was built, three deliverables, links to related modules. Clients stay anonymised | Reads as a story instead of a slide; no added facts. |
| Design | Dark band (`section--night`), three glass cards; the result leads, a muted before figure with an arrow into the after figure in the brand sweep; the figures line up across cards | Results are the point; the dark band sits between white Why MAVRO and paper FAQ. |
| Headline | "What clients changed with MAVRO." with the marker treatment (brighter on navy) | Follows the headline-variation rule (Why soft, Stories mark, FAQ grad). |

## Navigation (Phase 3, 2026-10-23)

| Decision | Choice | Why |
|---|---|---|
| Links follow the route table | Each link in `src/data/nav.ts` names its page and a homepage fallback; it goes to the page once the route exists, the fallback until then, and is hidden if it has neither (About, Careers, Blog, Privacy, Terms today) | The menus grow by themselves as pages land, and never show a dead end. Replaces the old `href: null` rule |
| Fallbacks | Packages and modules → Explore (the module opens via `data-module`); industries → `#industry-<slug>` (picks that industry); Customers → `#stories`; Implementation → `#implementation`; Security and compliance → `#why`; Contact → email | Every menu entry is useful today |
| Panel height | The Platform stage has one height for every branch (the overview's), so moving along the rail never moves the panel's edge | No jumping panel under the pointer |
| Hover intent | Menus open after 90 ms of hover (60 ms when switching from an open menu) and close 220 ms after leaving; rail branches switch after the pointer rests 110 ms and only on real movement, so a panel opening under a still cursor keeps its branch | Diagonal moves towards a module do not switch the panel |
| Keyboard | Triggers are buttons with `aria-expanded`; Up/Down/Home/End move along the rail and focusing a branch shows it; Escape closes and returns focus to the trigger; the drawer traps focus and Escape returns to the menu button | Disclosure pattern, not an ARIA menu: everything reads and tabs as links |
| Solutions | By industry (4), by need (ERP Connect, replace a legacy ERP or Tally, India compliance), the first customer story as a navy card led by its result. Narrow desktops (<1200px) drop the story card | SITE-PLAN.md section 8 |
| Company | The company pages that exist, then phone, email and city | Gives the menu something useful before About and Careers exist |
| Mobile | Full-screen drawer: module search on top, then accordions Platform → package → business area → module, Solutions, Customers, Resources, Company; demo button pinned at the bottom | SITE-PLAN.md section 8 |
| Footer | Brand, contact block, then five columns: Platform, Popular modules (8), Solutions (4 industries), Resources, Company; legal links appear when their pages exist. Footer note now says "service providers" instead of "exporters" | SITE-PLAN.md section 8 and the industries decision |

## Module model and screens (Phase 4, 2026-10-23)

| Decision | Choice | Why |
|---|---|---|
| Site title | "MAVRO \| Enterprise ERP for manufacturers, distributors and service providers" | User, 2026-10-23 ("yes change the title"), following the industries decision |
| Module URLs | Explicit slugs per catalogue entry (`slugs.ts`); `/modules/distributor-portal` rather than a slug made from "Distributor / B2B Portal" | Stable, readable URLs that do not change if a display name changes |
| Phone screens | Captured without a device frame; the site draws the frame (navy bezel) around them | One capture works in any frame size; the frame stays in the design system |
| Prototype sidebar | Module screens list every module by business area, the active area open and the active module's views under it; homepage screens keep their original sidebar | "The sidebar grows to cover every module" (SITE-PLAN.md 6) without re-capturing approved screens |

## Module page template (Phase 5, 2026-10-23; pending the user's review)

| Decision | Choice | Why |
|---|---|---|
| FAQ wording | "Exporters" removed from the homepage FAQ ("What is MAVRO?" now says service providers; "Who is MAVRO for?" and the multi-currency answer no longer name exporters) | User, 2026-10-23: "yes change the faq too" |
| Order to Cash screens | All four deck views (order book, order workflow, collections and dunning, sales order register) under `prototype/modules/order-to-cash/` with the module sidebar. Order book and order workflow are the approved `o2c` and `sales-order` screens moved onto the module shell (same content; the homepage keeps its originals); the register is new | One consistent sidebar across the module's tour; reuse where the screen is genuinely the module's view |
| Phone screen | The module's phone screen (O2C: credit release) stands in front of the lead screen in the hero | Shows web and mobile together without another section |
| Hero | The plate and screen hang from the hero's bottom edge, which cuts the screen on every desktop size | No empty band under the screen |
| Section headings | Shared across modules with the module's name (`template.ts`); per-module copy is the content file | 42 pages stay consistent; content effort goes into the module's own facts |
| Demo from a module page | The demo button ticks the module's package and starts the form's message with "I would like to see <module>." | The form keeps its four interests; the module still reaches the team |
| Deck adaptation | The deck writes O2C for distribution-led pharma; the page states the same capabilities for every industry (FEFO stays, as batch allocation) | The site serves four industries |

## Module page template, review round 1 (2026-10-23)

| Decision | Choice | Why |
|---|---|---|
| Hero screen | Runs off the window's right edge on every desktop size (width max(52rem, 50vw + 14rem)), cut by the hero's bottom edge; no tinted plate and no border lines around it | User: "the screen should be in extreme right … like we have on our homepage, and these lines should not be visible" |
| Phone mockup | A drawn device: graphite rim with a light edge, black bezel, Dynamic Island, side buttons, glass sheen; all sizes proportional (`Screen device="phone"`) | User: the earlier phone boundary "doesn't look good" |
| Who uses it | Industry cards with a coloured band (icon, name), who the industry is, what the module does there and a link; the people who work in it with an initials avatar, their task and a "Works in <view>" chip linking to the screens | User asked to improve the section |
| Built on the platform | The page's one night band: the module drawn on top of the eight platform features with a rail into each | User asked to improve the section |
| Related modules | Each card shows that module's real lead screen (its deck screen 01, built now: CRM pipeline, SFA field force, Customer Service ticket load, Scheme and Rebate schemes), cropped to its content | User: "put 1 screen of that module" |
| Screens are a sample | Every module has its full set of views (`src/data/modules/views.ts`): the prototype sidebar lists them all, and the page names the views the tour does not show ("Also in Order to Cash") | User: "if we are putting 4 screens per module, that doesn't mean we will have only 4 screens in the entire module" |

## Module page template, review round 2 (2026-10-23)

| Decision | Choice | Why |
|---|---|---|
| Clients on module pages | The homepage client band ("Trusted by", the clientele logos) sits at the foot of every module hero (`blocks/ClientBand.tsx`, shared with the homepage, same markup) | User: "put the clientele on these pages as well, just like homepage" |
| No decorative colour | One brand colour per element: industry cards are white with a blue icon tile (no coloured gradient bands), role avatars are neutral, the platform plate is navy instead of the brand sweep, the module card on the platform is plain, the flow's current node is solid blue, capability accent lines are solid, the CTA band keeps one soft light | User: the coloured glowing bands "look like AI slop" |
| Page rhythm | Hero (light) + client band, then white / paper alternating to the FAQ, one night band (the CTA), white footer; headline treatments cycle soft, mark, grad without repeats | Design pass after the user asked for backgrounds "in good sync and not random" |

## Rest of the site (Stage B planning, 2026-10-23)

| Question | User's decision |
|---|---|
| Other products in the detailed decks (CRM for real estate, ATS, LOS + LMS) and the off-roll workforce service | "None for now": not on this site |
| Pricing | No pricing page; demo and quote only |
| Product screens on the new pages | "We will generate the screens by ourselves, just like we did on the homepage … we will not use the screens in the appendix, 3-4 screens per module, and all will be according to the module for which they are built, not common." Every module gets 3–4 bespoke HTML prototype screens; no generic templates |
| Blog and careers | Plan them, hidden until content exists |
| Working style | Plan first (SITE-PLAN.md), then a phased plan, then implement phase by phase; no section built lazily |
| FAQ page | "No separate FAQ page": FAQs on the homepage and in each page's own FAQ block |
| Industries | Service providers (IT companies) instead of Exporters, site-wide |
| Plan approval | SITE-PLAN.md draft 3 approved (2026-10-23); IMPLEMENTATION-PLAN.md derived from it, one phase per session, module template reviewed by the user after Phase 5 before the module phases |

## FSC Portal (Phase 16, 2026-10-26)

| Decision | Choice | Why |
|---|---|---|
| What FSC Portal is | **Forest certification (FSC + EUDR)**: GPS plot registry, offline harvest logging, chain of custody from parcel to container, EUDR due-diligence statements. The slide 84 appendix (forwarding and stocking centre: consignment stock, cycle counts, damage claims) is not used | The deck contradicts itself (slide 10 and the slide 23 story against slide 84); the user chose forest certification. The FSC customer story links to the page; the homepage Explore panel and menu summary changed to match |

## Rejected (do not bring back)

- Coloured gradient bands, multi-colour avatars and glowing accents on cards ("looks like AI slop", 2026-10-23).
- A "Platform overview" branch in the Platform mega menu listing every module (user, 2026-10-23: the Base, Portals and
  Premium branches already cover it, and it looked cluttered). Platform overview stays a footer link. Since 2026-10-30 (the page was not reachable from the header) the mega menu also has one plain "Platform overview" link under its rail, and the mobile drawer one at the top of its Platform accordion; that is a link to a page, not a branch listing modules.
- Eyebrow labels above headings.
- "Coming soon" tags; "Premium" tags on modules.
- Compact lists of module names (the "also in the package" lists).
- A "Jump to" bar of business-area anchors over the module cards on package pages (removed 2026-10-30 at the user's request).
- Isometric 3D figurines in the Base module cards (replaced by mini module screens).
- Small "snippet" mini screens for Base modules (replaced by full product screens, 2026-10-22).
- Premium modules as a cloud of chips beside the heading.
- Modules scrolling in the hero band (replaced by client logos).

## Left out on purpose (user may revisit)

From the product deck, not used because they are unverifiable marketing claims: ROI figures,
"400+ AI capabilities" and the AI slides, "exports to 60+ countries", competitor comparison table. The
implementation time ("25 to 30 day phased implementation") is used, as stated in the deck. The slide 23 success
stories are used since 2026-10-23, with the user's approval (see Customer stories).
