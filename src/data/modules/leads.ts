import type { ScreenName } from '../../components/Screen';
import type { ModuleSlug } from './slugs';

/*
 * Every module's lead screen: the first screen of its page (its content file spreads it in as screens[0]) and the
 * thumbnail on its cards (package, industry and related-module cards). It lives here, not in the content files, so
 * a card can show it without loading that module's whole content: content loads per page (content/index.ts).
 */
export interface LeadScreen {
  screen: ScreenName;
  alt: string;
}

export const leadScreens: Record<ModuleSlug, LeadScreen> = {
  accounting: {
    screen: 'accounting/general-ledger',
    alt: 'MAVRO general ledger for October: 1,284 journals with 98.6% posted automatically, the journal list with its source documents, journal JV-10482 from invoice INV-6114 line by line, GST returns ready to file and the October close checklist (illustrative data).',
  },
  'asset-management': {
    screen: 'asset-management/uptime-value',
    alt: 'MAVRO Asset Management dashboard: 95.6% uptime across three sites against a 97% target, 13 breakdowns with 14 h 20 m lost, ₹24.8 Cr gross block and ₹13.6 Cr book value, breakdown clusters led by one turning centre, critical spares below reorder, calibration due and physical verification gaps (illustrative data).',
  },
  'auction-and-bidding': {
    screen: 'auction-and-bidding/esourcing-dashboard',
    alt: 'MAVRO e-sourcing dashboard: ₹63 lakh realised savings, 7.8% below ceiling across 31 awards, 41 events, 4.3 bidders per event, savings by category with ceiling, awarded and saved, savings by month, a live auction and events waiting for award or start (illustrative data).',
  },
  'audit-management': {
    screen: 'audit-management/coverage-capa',
    alt: 'MAVRO audit coverage: 31 of 34 audits due done, 27 open findings with one critical, 21 open CAPAs with three overdue, two repeat observations, the plan by internal, vendor, customer, regulatory and certification audits, CAPAs raised and closed by month, items needing attention and audits coming up (illustrative data).',
  },
  'business-analyst-app': {
    screen: 'business-analyst-app/coverage-trust',
    alt: 'MAVRO reporting coverage: 128 reports across six domains, 88% on certified metrics, 46 certified metrics, 5 data-quality exceptions, coverage and active users by domain, report opens by week, a metric conflict resolved and items needing attention (illustrative data).',
  },
  'contract-labour-purchase': {
    screen: 'contract-labour-purchase/factory-dashboard',
    alt: 'MAVRO factory dashboard for contract labour: 206 of 220 present on shift B, a shortfall of 14 across three departments, deployment by department and contractor, headcount through the shift, one open requisition for 12 packers and contractor scorecards with fulfilment and rating (illustrative data).',
  },
  'contract-labour-supply': {
    screen: 'contract-labour-supply/compliance-dashboard',
    alt: 'MAVRO contract manpower dashboard: 472 contract workers across 9 contractors, September bills of ₹1.18 crore with three pending, 11 licences and passes expiring, 468 of 472 safety inductions done, a contractor table with CLRA licence, PF, ESIC, wages, bill and status, bill value by contractor and items needing action (illustrative data).',
  },
  'cost-forecasting': {
    screen: 'cost-forecasting/budget-dashboard',
    alt: 'MAVRO budget dashboard: ₹22.93 crore spent of a ₹43.74 crore budget with 52% of the year gone, a full-year forecast of ₹45.07 crore, cost centres with budget, actual, used against the year marker, forecast and variance, monthly spend against budget, one variance alert and three scenarios (illustrative data).',
  },
  crm: {
    screen: 'crm/pipeline',
    alt: 'MAVRO CRM pipeline: 186 leads in 30 days, 92% answered within the first-response SLA, conversion by source from website, marketplaces, trade fairs, distributor referrals, field reps and existing customers, the funnel to 14 won and the leads waiting for a first response (illustrative data).',
  },
  'customer-service': {
    screen: 'customer-service/ticket-load',
    alt: 'MAVRO Customer Service ticket load: 74 open tickets, 94% first response within SLA, tickets by channel with SLA health, a complaint cluster on lot L-0897 raised to QA, and tickets about to breach (illustrative data).',
  },
  'data-analytics': {
    screen: 'data-analytics/pipeline-health',
    alt: 'MAVRO Data Analytics platform health: 45 of 46 pipelines succeeded, the nightly window ended at 05:52 against 05:30, 41 of 43 dashboards fresh by 06:00, run counts and durations by layer, a timeline of the window with a retried source and a pipeline held at its quality gate, sources and dashboards by audience (illustrative data).',
  },
  'dealer-portal': {
    screen: 'dealer-portal/offtake',
    alt: 'MAVRO Dealer Portal offtake dashboard for one territory: ₹1.12 Cr dealer offtake in September, 271 of 312 retailers billed in 30 days, five dealers out of one item, near-expiry seal kits holding reorders, each dealer’s stock cover against a 21-day norm, and offtake against primary dispatch by week (illustrative data).',
  },
  'distributor-portal': {
    screen: 'distributor-portal/home',
    alt: 'MAVRO distributor portal home as the distributor sees it: ₹11.4 L of a ₹40 L credit limit available, ₹28.6 L outstanding with one invoice overdue, 2 open orders, 4 claims pending, purchases by category, recent orders and progress towards the next festive scheme slab (illustrative data).',
  },
  'document-management': {
    screen: 'document-management/repository-dashboard',
    alt: 'MAVRO document repository dashboard: 8,960 controlled documents, 6 waiting for approval, 9 expiring in 90 days, 14 retention rules, documents by type with number series and effective share, recent documents and the licences and agreements expiring soon (illustrative data).',
  },
  'ecommerce-integration': {
    screen: 'ecommerce-integration/channel-dashboard',
    alt: 'MAVRO Ecommerce Integration channel dashboard: 312 orders today across two marketplaces, a B2B marketplace and a D2C store, 205 of 212 listings live with 7 paused at their buffer, orders routed to three fulfilment centres, one connector with API errors and a payout ₹6,982 short (illustrative data).',
  },
  'fleet-management': {
    screen: 'fleet-management/fleet-dashboard',
    alt: 'MAVRO Fleet Management dashboard: 21 of 32 vehicles on trip, 3 in the workshop and 8 at base across three sites, 34 trips today, ₹27.4 a km in October, one vehicle blocked on a lapsed PUC, live trips with driver coaching flags, cost per km by vehicle class and own fleet against market trucks per lane (illustrative data).',
  },
  'fsc-portal': {
    screen: 'fsc-portal/plot-registry',
    alt: 'MAVRO FSC Portal plot registry: 1,426 plots mapped by GPS polygon or point, 1,419 clear of the 31 December 2020 deforestation cut-off and 7 flagged, plot clusters on a map with one selected, and plots listed with area, geometry, certification, cut-off check and lot (illustrative data).',
  },
  'gate-entry': {
    screen: 'gate-entry/gate-dock',
    alt: 'MAVRO Gate Entry dashboard: 39 vehicle movements today, average turnaround of 1 h 48 m, three vehicles waiting at the gate, six docks with one blocked by a vehicle idle for over three hours, movements by hour and five open security exceptions (illustrative data).',
  },
  'hrms-and-payroll': {
    screen: 'hrms-and-payroll/workforce',
    alt: 'MAVRO HRMS workforce dashboard: 489 employees on three units, 362 of 440 expected punched in today, 11.9% attrition over 12 months with the Chennai plant at 18.6%, 14 open roles, an attrition cluster among CNC operators and the approvals, reviews and offers that need attention (illustrative data).',
  },
  'insurance-management': {
    screen: 'insurance-management/risk-dashboard',
    alt: 'MAVRO insurance risk dashboard: ₹84.8 crore of property and machinery insured on 10 policies, four renewals in 90 days, three open claims including one being filed, 46 days average settlement, a renewal radar, claims with stage and days open, coverage check items, renewal quotes and premium by type of cover (illustrative data).',
  },
  'inventory-management': {
    screen: 'inventory-management/stock-position',
    alt: 'MAVRO Inventory Management stock position: ₹2.14 Cr across 1,284 items in four stores, 27 days of cover, ₹6.8 L under inspection, 3 items below reorder, stock by item with free, reserved and in-inspection quantities, value by stock type and today’s movements (illustrative data).',
  },
  'learning-management': {
    screen: 'learning-management/lms-dashboard',
    alt: 'MAVRO learning dashboard: 94.2% of mandatory training current, 23 re-certifications due in 30 days, 4 overdue and kept off duty, 41 certificates issued, status by department, certifications expiring by month, the overdue people and a new mandatory course raised from an audit finding (illustrative data).',
  },
  'master-data-management': {
    screen: 'master-data-management/quality-dashboard',
    alt: 'MAVRO master data quality: 12,480 records in seven domains, a 92% quality score, 37 duplicate clusters, 6 changes awaiting approval, completeness and duplicate clusters by domain with stewards, quality score by month and items needing a decision (illustrative data).',
  },
  'mvlens-vendor-audit': {
    screen: 'mvlens-vendor-audit/auditor-dashboard',
    alt: 'MAVRO mVLens auditor dashboard: a for-cause audit on site at a bearing supplier at step five of eight, 34 of 48 checklist clauses done, one major, two minor findings and an observation, the auditor’s audits this quarter and three vendor CAPA responses to verify (illustrative data).',
  },
  'order-to-cash': {
    screen: 'order-to-cash/order-book',
    alt: 'MAVRO Order to Cash order book: ₹4.86 Cr of open orders, three on credit hold worth ₹38.2 L, nine to dispatch this week and ₹12.4 L overdue, the order list with credit and allocation, a credit check for Kestrel Pumps and receivables by age (illustrative data).',
  },
  ppds: {
    screen: 'ppds/planning-dashboard',
    alt: 'MAVRO PPDS planning dashboard for week 41: 91% schedule adherence, 79.1% OEE, one dispatch commitment at risk, demand coverage in weeks of stock against safety stock for six items, adherence and OEE by week, and plan exceptions including a breakdown recovered by overtime and an export order asking into the frozen week (illustrative data).',
  },
  'procure-to-pay': {
    screen: 'procure-to-pay/spend-suppliers',
    alt: 'MAVRO Procure to Pay spend and supplier health dashboard: ₹1.04 Cr committed against a ₹1.41 Cr budget, ₹38,900 over contract price across 6 invoices with payment blocked, 91% on-time receipts, 2.6 days from requisition to PO, spend by category, supplier health and single-source items (illustrative data).',
  },
  'production-management': {
    screen: 'production-management/plant-output',
    alt: 'MAVRO Production Management plant dashboard: plant OEE of 78.4% this shift against an 80% target, 1,148 of 1,171 planned pieces made, 4 h 24 m of downtime led by a 2 h 10 m breakdown on a turning centre, seven work centres with availability, performance and quality, and planned against actual output over the rolling year (illustrative data).',
  },
  'project-management': {
    screen: 'project-management/portfolio',
    alt: 'MAVRO Project Management portfolio: 9 active capex projects, ₹4.40 Cr spent of ₹7.16 Cr sanctioned and ₹31 L behind plan, 3 projects at risk, 5 change requests waiting, one governance breach, each project’s spend, completion against plan and forecast go-live, and the risks named with owners (illustrative data).',
  },
  'real-estate-management': {
    screen: 'real-estate-management/portfolio-dashboard',
    alt: 'MAVRO property portfolio dashboard: 14 properties, ₹3.52 crore rent a year, two renewals in 90 days, statutory dates due, leases with area, rent per square foot against the market and lease end, committed rent by year, statutory watch and an idle land plot (illustrative data).',
  },
  'rest-hours-log': {
    screen: 'rest-hours-log/compliance',
    alt: 'MAVRO Rest Hours Log dashboard: 369 shift workers on two plants, a 99.1% rest score last week, 6 open violations with 4 waiting for a plant head, an average week of 48.6 hours against a 60-hour limit, the rules in force, violations by rule for four weeks and the compensatory rest due (illustrative data).',
  },
  'retailer-portal': {
    screen: 'retailer-portal/home',
    alt: 'MAVRO Retailer Portal store home as the retailer sees it: ₹1.38 L bought in October, 4,820 reward points with 600 expiring, two items out at the counter with suggested reorders, recent orders from two distributors with delivery and payment status, and the offers applied (illustrative data).',
  },
  'roster-ledger': {
    screen: 'roster-ledger/coverage',
    alt: 'MAVRO Roster Ledger coverage: 98.0% of 1,512 shift slots filled this week at Plant 1, 11 open slots in the next 72 hours, two qualified-operator gaps, 386 of 1,500 overtime hours used, coverage by department, tonight’s night shift 5 short with the cover found, and the next 7 days against demand (illustrative data).',
  },
  'sales-force-automation': {
    screen: 'sales-force-automation/field-force',
    alt: 'MAVRO Sales Force Automation field force dashboard: 142 of 168 planned calls made today, 91% of A-class outlets covered, ₹18.6 L of secondary orders, calls against norm by territory, reps below the call norm and the approval queue (illustrative data).',
  },
  'scheme-and-rebate': {
    screen: 'scheme-and-rebate/schemes',
    alt: 'MAVRO Scheme and Rebate dashboard: ₹42.6 L of a ₹60 L trade budget used, the festive volume slab over its 85% alert, scheme performance with sales lift, accruals against settlements and 23 claims waiting with 4 duplicates caught (illustrative data).',
  },
  'shop-floor-control': {
    screen: 'shop-floor-control/live-board',
    alt: 'MAVRO Shop Floor Control live board for shift B: 1,148 pieces against plan, 78.4% OEE, 96.4% first-pass yield, a machine schedule for nine work centres with one down on a spindle alarm, and the running work order’s operations and materials (illustrative data).',
  },
  'subscription-management': {
    screen: 'subscription-management/arr-churn',
    alt: 'MRR of ₹38.6 L and ARR of ₹4.63 Cr in MAVRO Subscription Management, with 1.8% monthly churn (2.6% on the Basic plan) and 108% net revenue retention. MRR movement for September, plans with churn and trial conversion, and renewals due in 30 days with owners (illustrative data).',
  },
  'transportation-management': {
    screen: 'transportation-management/control-tower',
    alt: 'MAVRO Transportation Management control tower: 31 shipments in motion across three sites on a lane map, 93.6% on time in full over 30 days, three shipments at risk, ₹13.1 L of a ₹48 L October freight budget, lane performance with the Pune to Ahmedabad lane 18% dearer, and five exceptions including an ETA past the consignee’s cut-off and an e-way bill extension (illustrative data).',
  },
  'travel-and-expense': {
    screen: 'travel-and-expense/spend-compliance',
    alt: 'MAVRO travel spend and compliance dashboard for September: ₹46.8 L of a ₹50 L budget, 94% within policy, reimbursement in 4.2 days, spend by region with Gujarat over budget, spend by category, policy violations and unsettled advances (illustrative data).',
  },
  'vendor-invoice-management': {
    screen: 'vendor-invoice-management/ap-dashboard',
    alt: 'MAVRO accounts payable dashboard: 71% of 214 invoices touchless, ₹2.36 Cr open payables, a 6.4-day AP cycle, the invoice pipeline from received to paid, payables by due date, 23 exceptions by reason and the next payment run of ₹62.40 L (illustrative data).',
  },
  'vendor-portal': {
    screen: 'vendor-portal/dashboard',
    alt: 'MAVRO Vendor Portal dashboard: 412 active vendors across two plants and a depot, 96.1% fully compliant, 9 in onboarding at 4.2 days on average, 17 documents expiring in 90 days, 3 vendors blocked from new POs, and the vendor base by category (illustrative data).',
  },
  'warehouse-management': {
    screen: 'warehouse-management/wms-dashboard',
    alt: 'MAVRO Warehouse Management dashboard for a finished-goods warehouse: wave W-0318 at 61 of 86 lines before a 16:30 cut-off, dock to stock of 2 h 07 m, 99.6% pick accuracy, zones on a floor plan with the housings zone at 93%, pallets received and shipped by month, five decisions including a short pick and a quality hold, and an expiry watch on three batches (illustrative data).',
  },
};
