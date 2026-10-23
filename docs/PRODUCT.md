# Product facts

What MAVRO is, as stated in the user's decks. Use this instead of re-reading the decks. The site's data files
already encode most of it (`src/data/modules/catalogue.ts`, `src/data/home.ts`).

## Sources

| Deck | Path | Used for |
|---|---|---|
| Mavro Modules v2 (112 slides) | `C:\Users\Aditya\OneDrive - Saisatwik Technologies Private Limited\Desktop\ppt\mavro ppt\Mavro Modules v2.pptx` | Module catalogue, packages, positioning, platform features, clientele (slide 19) |
| MAVRO ERP Connectivity Deck (9 slides) | same folder, `MAVRO_ERP_Connectivity_Deck.pptx` | ERP Connect section (slide 4, integration architecture) |

Other decks in that folder (not used yet): B1 MAVRO flow deck, MAVRO DIAGRAM, Mavro Modules v1 / AMR, PPT
According TO AMR L1, Laminates company presentation, Off-Roll Workforce Management, and the subfolders
"mavro custom ppt" and "mavro detailed ppt". Likely useful in Stage B for module pages.

The text of the decks this site uses is in [source/](source/README.md), slide by slide (for sessions without
the original files). To read a deck's text without extra installs: unzip the .pptx and read `ppt/slides/slideN.xml` (the `<a:t>`
elements), in the order of `ppt/presentation.xml`.

## Company and positioning

- MAVRO is a product of **SaiSatwik Technologies** (STPL, "AI and Tech"), Greater Noida.
- Tagline from the deck: **ERP · Workflow · Automation · Mobility** (no longer shown as an eyebrow).
- For **manufacturers, distributors and exporters**: OEM suppliers, global exporters, multi-line manufacturing,
  distribution-led businesses.
- India-specific: GST at every touchpoint (e-invoicing, GSTR-1/3B, ITC), India payroll (PF, ESI, TDS),
  multi-entity and multi-plant.
- Delivery: 25–30 day phased implementation, a dedicated resource, AMS after go-live.

## Packages and modules (all live)

- **Base package:** Accounting, HRMS and Payroll, Order to Cash, Procure to Pay, Production Management,
  Inventory Management, Vendor Invoice Management, Sales Force Automation, Travel and Expense, Gate Entry, CRM,
  Customer Service, Project Management, mVLens Vendor Audit, Roster Ledger, Rest Hours Log, Asset Management,
  Data Analytics.
- **Portal package:** Vendor Portal (supply side); Distributor / B2B Portal (primary sales); Dealer Portal
  (secondary); Retailer Portal (tertiary).
- **Premium package (niche):** Transportation Management, Warehouse Management, Fleet Management, FSC Portal,
  Scheme and Rebate, Ecommerce Integration, Subscription Management, Auction and Bidding, Cost Forecasting,
  Audit Management, Insurance Management, Real Estate Management, PPDS, Shop Floor Control, Learning Management,
  Contract Labour Supply, Contract Labour Purchase, Business Analyst App, Master Data Management, Document
  Management.

Per-module descriptions, features and "why it matters" points are in the deck's appendix (slides 29–111, one
detail slide plus one screens slide per module). The site's condensed versions are in `src/data/modules/catalogue.ts`.

## Contact (deck slides 1 and 112)

Head office: 1415, 13th Floor, Galaxy Blue Sapphire, Greater Noida 201009. Phone +91 92114 29011.
Email contact@saisatwik.com. Website www.saisatwik.com. In `site.office`, `contactPhone`, `contactEmail`.

## Security and compliance (deck slides 11, 12 and module pages)

- Architecture (slide 11): cloud-native, multi-tenant, API-first; OAuth 2.0 + JWT, rate limiting, HTTPS/TLS;
  MS SQL Server, Redis, blob store, audit log DB.
- Security (slides 11–12): AES-256 at rest and in transit; RBAC with field-level access; MFA/SSO; IP/device
  control; daily backups and disaster recovery; audit logs kept 7 years, tamper-proof; RPO < 4 hr, RTO < 8 hr.
- India compliance: GST e-invoicing and place-of-supply checks before posting; GSTR-1, GSTR-3B and ITC
  generated from transactions; GSTR-2B reconciliation with mismatched vendors held; e-way bills matched to
  invoice and weighbridge; payroll PF, ESI, TDS, PT (plus bonus, LTA); contract labour CLRA, PF, ESIC evidence
  before bills are certified.

## Platform features (deck slide 12)

Audit trail; notifications (push, email, in-app); mobile app (Android, offline-capable); no-code workflow
engine; RBAC with field-level access, MFA/SSO; integration APIs (REST, webhooks, batch, SAP BAPI, SAP B1,
e-commerce); multi-entity, multi-branch, multi-currency, cloud-native; dual rule engine.

## Audiences and industries (deck slide 2, module pages)

- Slide 2: OEM suppliers, global exporters, multi-line manufacturing (OEM + aftermarket), distribution-led
  (dealer, retailer and vendor networks); "multi-line, high-volume, multi-entity"; coverage: finance,
  production, HR and payroll, channel, procurement, exports. Its claims "trusted by major automotive OEMs",
  "exported to markets on every continent" and "60+ countries" are not used on the site.
- Pharma (slides 32, 34, 36, 48): GMP batch records (BMR) with stage sign-off and yields, QC release (CoA,
  assay, dissolution) before finished goods, FEFO and shelf-life allocation, complaints tied to the batch
  record with pharmacovigilance.
- Service providers (user, 2026-10-23, in place of exporters as an industry): Project Management (slide 50:
  portfolio health against budget and schedule, milestone plans with owners, dependencies and gates, governed
  change requests), HRMS (slide 32 and the HRMS deck), Travel and Expense (slide 40: policy-checked claims settled
  through payroll).
- Exports: multi-currency and export invoicing, live multi-currency P&L (slide 21); FSC Portal with
  chain-of-custody traceability and EUDR due-diligence statements (slides 10, 23).

## Customer stories (deck slide 23, on the site as `proof`)

Anonymised, "results verified": a forest supply chain company (FSC + EUDR portal; due diligence 4 weeks → 2
hours; GPS polygon mapping, offline harvest logging, chain of custody, auto EUDR statements, plot registry
replacing paper logs); a multi-plant manufacturer on SAP S/4HANA (TMS; billing disputes down 85%; route-based
freight, validation gates before invoicing, SLA truck allocation, transporter portal, auto debit notes and GL
reconciliation); an industrial procurement group (VIM; vendor onboarding 5 weeks → 48 hours; auto 3-way match,
delivery scheduling visibility, GSTIN/PAN validation, digital PO acknowledgement, vendor scorecards).

## ERP Connect (connectivity deck)

- Works alongside **SAP** (S/4HANA, ECC), **Oracle** (EBS, Fusion Cloud), **Tally** (TallyPrime, ERP 9) and any
  legacy ERP.
- Every ERP syncs two ways (external API) with the **MAVRO Database**, the sole integration broker. The **MAVRO
  App** (web + mobile, boutique screens, Android and iOS) reads and writes it (internal API). Users: office,
  plant, field.
- **No direct ERP access:** the app never calls SAP/Oracle/Tally directly.
- Benefits (deck slide 5, on the site as `connect.benefits`): fewer ERP licences, simpler role-based screens, beyond native
  ERP limits, customisable boutique app, mobile app. Roadmap: 25–30 days (discovery + connectors, pilot, full
  go-live, AMS).

## Clients (deck slide 19, shown in the hero band)

Pathkind Labs, Mankind, Inteliwaves, IntelliSmart, Research & Ranking, Rentomojo, TechLabs, Ontra Labs, KPMG,
Aptech Learning, Al Dahra, FLSmidth, Rajnish Retail Limited, Aramex, Yogiji Digi, Merino, Siddhidhata, Maharishi
Ayurveda, Virtuoso, Gemini Consulting & Services. Logos: `brand/clientele-slide.webp` → `npm run clients` →
`src/assets/clients/`.
