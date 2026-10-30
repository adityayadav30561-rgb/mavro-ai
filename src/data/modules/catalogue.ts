import type { IconName } from '../../components/Icon';
import { moduleSlugs, type ModuleSlug } from './slugs';

/*
 * The MAVRO module catalogue, taken from the product deck (Mavro Modules v2): one list, read by the Platform
 * mega-menu, the mobile menu, the module sections and the hero.
 *
 * Packages follow the deck's appendix:
 *   base      the Base package: core ERP, HR and operations
 *   portal    the Portal package: vendor, distributor, dealer and retailer self-service
 *   premium   the Premium package: niche and industry-specific modules
 */
export type Pack = 'base' | 'portal' | 'premium';
export type Area = 'finance' | 'sales' | 'supply' | 'make' | 'people' | 'data';

export interface Module {
  id: string;
  name: string;
  /** Its page: `/modules/<slug>`. */
  slug: ModuleSlug;
  /** One line, for menus and lists. */
  summary: string;
  icon: IconName;
  pack: Pack;
  area: Area;
}

/**
 * `href` is the package's place on the homepage (Explore the platform picks the tab); `page` is its own page
 * (SITE-PLAN.md), which the navigation links to once that route exists (src/links.ts).
 */
export const packs: Record<Pack, { name: string; blurb: string; href: string; page: string }> = {
  base: { name: 'Base modules', blurb: 'Core ERP, HR and operations.', href: '#modules', page: '/platform/base' },
  portal: { name: 'Portals', blurb: 'Self-service for vendors and the channel.', href: '#portals', page: '/platform/portals' },
  premium: { name: 'Premium modules', blurb: 'Niche and industry-specific capability.', href: '#premium', page: '/platform/premium' },
};

export const areas: Record<Area, string> = {
  finance: 'Finance and control',
  sales: 'Sales and channel',
  supply: 'Supply chain and logistics',
  make: 'Manufacturing and quality',
  people: 'People and workforce',
  data: 'Data, projects and assets',
};

export const areaOrder: Area[] = ['finance', 'sales', 'supply', 'make', 'people', 'data'];

export const modules: Module[] = [
  // Finance and control
  { id: 'acc', name: 'Accounting', slug: 'accounting', summary: 'Auto journals, live GL, GST reports', icon: 'finance', pack: 'base', area: 'finance' },
  { id: 'vim', name: 'Vendor Invoice Management', slug: 'vendor-invoice-management', summary: '3-way PO, GRN and invoice match', icon: 'claims', pack: 'base', area: 'finance' },
  { id: 'tne', name: 'Travel and Expense', slug: 'travel-and-expense', summary: 'Requests, advances and settlements', icon: 'travel', pack: 'base', area: 'finance' },
  { id: 'cfo', name: 'Cost Forecasting', slug: 'cost-forecasting', summary: 'Budgets, forecasts and variance', icon: 'scheme', pack: 'premium', area: 'finance' },
  { id: 'aud', name: 'Audit Management', slug: 'audit-management', summary: 'Audit plan to CAPA closure', icon: 'quality', pack: 'premium', area: 'finance' },
  { id: 'ast', name: 'Asset Management', slug: 'asset-management', summary: 'Register, maintenance, depreciation', icon: 'warehouse', pack: 'base', area: 'finance' },
  { id: 'ins', name: 'Insurance Management', slug: 'insurance-management', summary: 'Policies, renewals and claims', icon: 'shield', pack: 'premium', area: 'finance' },

  // Sales and channel
  { id: 'o2c', name: 'Order to Cash', slug: 'order-to-cash', summary: 'Order capture to collection', icon: 'orders', pack: 'base', area: 'sales' },
  { id: 'crm', name: 'CRM', slug: 'crm', summary: 'Leads, pipeline and follow-ups', icon: 'sales', pack: 'base', area: 'sales' },
  { id: 'sfa', name: 'Sales Force Automation', slug: 'sales-force-automation', summary: 'Beat plans and mobile ordering', icon: 'route', pack: 'base', area: 'sales' },
  { id: 'csm', name: 'Customer Service', slug: 'customer-service', summary: 'Tickets, SLAs and warranty', icon: 'people', pack: 'base', area: 'sales' },
  { id: 'snr', name: 'Scheme and Rebate', slug: 'scheme-and-rebate', summary: 'Slabs, accruals and claim settlement', icon: 'scheme', pack: 'premium', area: 'sales' },
  { id: 'ecm', name: 'Ecommerce Integration', slug: 'ecommerce-integration', summary: 'Marketplace orders and returns', icon: 'link', pack: 'premium', area: 'sales' },
  { id: 'sub', name: 'Subscription Management', slug: 'subscription-management', summary: 'Recurring billing and renewals', icon: 'workflow', pack: 'premium', area: 'sales' },

  // Supply chain and logistics
  { id: 'p2p', name: 'Procure to Pay', slug: 'procure-to-pay', summary: 'Indent to PO to payment', icon: 'procurement', pack: 'base', area: 'supply' },
  { id: 'inv', name: 'Inventory Management', slug: 'inventory-management', summary: 'Batch, lot and serial across warehouses', icon: 'inventory', pack: 'base', area: 'supply' },
  { id: 'wms', name: 'Warehouse Management', slug: 'warehouse-management', summary: 'Bin putaway, picking, barcodes', icon: 'warehouse', pack: 'premium', area: 'supply' },
  { id: 'gte', name: 'Gate Entry', slug: 'gate-entry', summary: 'Gate passes, inward and outward', icon: 'gate', pack: 'base', area: 'supply' },
  { id: 'tms', name: 'Transportation Management', slug: 'transportation-management', summary: 'Shipments, loads and lanes', icon: 'transport', pack: 'premium', area: 'supply' },
  { id: 'flt', name: 'Fleet Management', slug: 'fleet-management', summary: 'Vehicles, trips and fuel', icon: 'dispatch', pack: 'premium', area: 'supply' },
  { id: 'auc', name: 'Auction and Bidding', slug: 'auction-and-bidding', summary: 'Reverse auctions and sealed bids', icon: 'auction', pack: 'premium', area: 'supply' },
  { id: 'fsc', name: 'FSC Portal', slug: 'fsc-portal', summary: 'Plot mapping, chain of custody, EUDR', icon: 'pin', pack: 'premium', area: 'supply' },

  // Manufacturing and quality
  { id: 'prd', name: 'Production Management', slug: 'production-management', summary: 'Work orders, BOM and routing', icon: 'production', pack: 'base', area: 'make' },
  { id: 'ppds', name: 'PPDS', slug: 'ppds', summary: 'Detailed scheduling and MRP', icon: 'bom', pack: 'premium', area: 'make' },
  { id: 'sfc', name: 'Shop Floor Control', slug: 'shop-floor-control', summary: 'Live OEE, downtime and WIP', icon: 'eye', pack: 'premium', area: 'make' },
  { id: 'mvl', name: 'mVLens Vendor Audit', slug: 'mvlens-vendor-audit', summary: 'Vendor audits, CAPA, agreements', icon: 'quality', pack: 'base', area: 'make' },

  // People and workforce
  { id: 'hrms', name: 'HRMS and Payroll', slug: 'hrms-and-payroll', summary: 'Payroll with PF, ESI and TDS', icon: 'people', pack: 'base', area: 'people' },
  { id: 'ros', name: 'Roster Ledger', slug: 'roster-ledger', summary: 'Shift rosters and coverage', icon: 'layers', pack: 'base', area: 'people' },
  { id: 'rhl', name: 'Rest Hours Log', slug: 'rest-hours-log', summary: 'Duty and rest-hour compliance', icon: 'shield', pack: 'base', area: 'people' },
  { id: 'lms', name: 'Learning Management', slug: 'learning-management', summary: 'Courses, paths and certification', icon: 'workflow', pack: 'premium', area: 'people' },
  { id: 'cls', name: 'Contract Labour Supply', slug: 'contract-labour-supply', summary: 'Contractor workforce and billing', icon: 'people', pack: 'premium', area: 'people' },
  { id: 'clp', name: 'Contract Labour Purchase', slug: 'contract-labour-purchase', summary: 'Contractor rates and invoices', icon: 'procurement', pack: 'premium', area: 'people' },

  // Data, projects and assets
  { id: 'dat', name: 'Data Analytics', slug: 'data-analytics', summary: 'Pipelines, lineage and quality', icon: 'eye', pack: 'base', area: 'data' },
  { id: 'baa', name: 'Business Analyst App', slug: 'business-analyst-app', summary: 'Certified self-service reports', icon: 'sales', pack: 'premium', area: 'data' },
  { id: 'mdm', name: 'Master Data Management', slug: 'master-data-management', summary: 'Golden records, governed changes', icon: 'master', pack: 'premium', area: 'data' },
  { id: 'dms', name: 'Document Management', slug: 'document-management', summary: 'Repository, versions, approvals', icon: 'procurement', pack: 'premium', area: 'data' },
  { id: 'prj', name: 'Project Management', slug: 'project-management', summary: 'Plans, milestones and costs', icon: 'workflow', pack: 'base', area: 'data' },
  { id: 'res', name: 'Real Estate Management', slug: 'real-estate-management', summary: 'Property, leases and rent', icon: 'warehouse', pack: 'premium', area: 'data' },
];

export const byArea = (area: Area) => modules.filter((m) => m.area === area);
export const byPack = (pack: Pack) => modules.filter((m) => m.pack === pack);
export const moduleById = (id: string) => modules.find((m) => m.id === id)!;
export const packHref = (m: Module) => packs[m.pack].href;

/** A module's or portal's own page, `/modules/<slug>` (SITE-PLAN.md section 2). */
export const modulePage = (item: { slug: ModuleSlug }) => `/modules/${item.slug}`;

/* ---------- Base modules grid ---------- */

export interface Capability {
  id: string;
  body: string;
  tags: string[];
}

/** Order to Cash leads the grid as the featured module. */
export const baseFeatured: Capability = {
  id: 'o2c',
  body: 'Sales orders through credit checks, batch-aware allocation and auto-invoicing on dispatch, to collections, dunning and escalation.',
  tags: ['Credit limit engine', 'Auto-invoicing', 'AR ageing', 'Dunning'],
};

export const baseCapabilities: Capability[] = [
  { id: 'acc', body: 'Auto journals, live GL and GST reports, with AP and AR workflows and credit control across entities and plants.', tags: ['Multi-entity', 'GST', 'AP / AR'] },
  { id: 'hrms', body: 'Automated payroll with PF, ESI and TDS, attendance-to-payroll sync, leave, claims and statutory compliance.', tags: ['Payroll', 'Attendance', 'Statutory'] },
  { id: 'p2p', body: 'Indent-to-PO approval workflows, GRN and quality checks, vendor rate comparison and budget-linked purchase control.', tags: ['Indent', 'PO', 'GRN'] },
  { id: 'prd', body: 'Production planning and work orders, BOM and routing control, and planned against actual output.', tags: ['Work orders', 'BOM', 'Routing'] },
  { id: 'inv', body: 'Multi-warehouse stock with batch, lot and serial tracking, reorder alerts, stock ageing and physical counts.', tags: ['Batch / lot', 'Reorder', 'Counts'] },
  { id: 'vim', body: 'Three-way PO, GRN and invoice matching with multi-level approvals, GSTR-2B reconciliation and payables ageing.', tags: ['3-way match', 'GSTR-2B'] },
  { id: 'sfa', body: 'Beat planning and visit logs, mobile order booking with offline mode, and targets against achievement.', tags: ['Beat plans', 'Mobile orders'] },
  { id: 'tne', body: 'Policy-led travel requests, bookings, advances and settlements, with expense claims posted to the GL.', tags: ['Policy', 'Advances', 'Claims'] },
  { id: 'gte', body: 'Vehicle and visitor gate passes, inward and outward against PO, weighbridge integration and a security trail.', tags: ['Gate pass', 'Weighbridge'] },
  { id: 'crm', body: 'Lead capture and de-duplication, weighted qualification, territory assignment with a first-response SLA, and pipeline conversion by source.', tags: ['Leads', 'Scoring', 'Assignment'] },
  { id: 'csm', body: 'Tickets from helpline, portal, email and field on one record, with SLA timers, complaint and warranty tracking, and escalations.', tags: ['Tickets', 'SLA', 'Warranty'] },
  { id: 'prj', body: 'Portfolio health against budget and schedule, milestone plans with owners and dependencies, and governed change requests.', tags: ['Milestones', 'Budget', 'Change requests'] },
  { id: 'mvl', body: 'Vendor quality audits end to end: plan, execute with evidence, approve, and track findings to CAPA closure and quality agreements.', tags: ['Audit lifecycle', 'CAPA', 'Agreements'] },
  { id: 'ros', body: 'Rosters built from the production demand plan, validated on skill mix and rest rules, with swaps and overtime checked against caps.', tags: ['Roster builder', 'Coverage', 'Overtime'] },
  { id: 'rhl', body: 'Biometric punches reconciled to the roster, rolling duty and rest calculated per worker, and violations routed for approval.', tags: ['Duty hours', 'Rest rules', 'Violations'] },
  { id: 'ast', body: 'One record per asset from acquisition to disposal: uptime, preventive maintenance and calibration, and period depreciation.', tags: ['Register', 'Maintenance', 'Depreciation'] },
  { id: 'dat', body: 'Pipelines from ERP, field app and portals with run health, lineage and quality gates, and alerts on freshness and anomalies.', tags: ['Pipelines', 'Lineage', 'Quality gates'] },
];

/** Shown in the grid's last cell: what is built once and shared by every module. */
export const platformFoundation = {
  name: 'Built for Indian compliance',
  body: 'GST at every touchpoint, India payroll with PF, ESI and TDS, and statutory compliance built in rather than bolted on.',
  points: ['GST-compliant', 'India statutory payroll', 'Multi-entity, multi-plant'],
};

/* ---------- Portals ---------- */

export interface Portal {
  id: string;
  name: string;
  /** Its page: `/modules/<slug>`. */
  slug: ModuleSlug;
  layer: string;
  who: string;
  /** One line, for menus and lists. */
  summary: string;
  body: string;
  points: string[];
}

/** The supply side and the three layers of the sales channel, in the order goods move. */
export const vendorPortal: Portal = {
  id: 'vendor',
  name: 'Vendor Portal',
  slug: 'vendor-portal',
  layer: 'Supply side',
  who: 'Suppliers',
  summary: 'Onboarding, compliance vault, supplier 360°',
  body: 'Self-serve onboarding with GSTIN and PAN verification, a compliance vault and a 360° profile of every supplier.',
  points: ['Single vendor master', 'Guided onboarding', 'Compliance vault'],
};

export const channelPortals: Portal[] = [
  {
    id: 'distributor',
    name: 'Distributor / B2B Portal',
    slug: 'distributor-portal',
    layer: 'Primary',
    who: 'Distributors',
    summary: 'Primary orders checked for scheme, stock, credit',
    body: 'Primary ordering off phone and email: an order builder that checks scheme, stock and credit before submission.',
    points: ['Credit and outstanding', 'Scheme-aware order builder', 'Claims and credit notes'],
    },
  {
    id: 'dealer',
    name: 'Dealer Portal',
    slug: 'dealer-portal',
    layer: 'Secondary',
    who: 'Dealers',
    summary: 'Offtake, stock cover and replenishment',
    body: 'Secondary offtake and stock cover made visible, with replenishment suggested from rolling offtake.',
    points: ['Offtake and stock cover', 'Replenishment planner', 'Retailer-linked claims'],
  },
  {
    id: 'retailer',
    name: 'Retailer Portal',
    slug: 'retailer-portal',
    layer: 'Tertiary',
    who: 'Retailers',
    summary: 'Counter orders, loyalty and returns',
    body: 'Tertiary demand captured at the counter: best-offer baskets, loyalty, returns and order status in one app.',
    points: ['Basket builder with offers', 'Loyalty and returns', 'Order and payment status'],
    },
];

/** All four portals, supply side first. */
export const portals: Portal[] = [vendorPortal, ...channelPortals];

/** One module page's place in the catalogue: a module (with its business area) or a portal. */
export type CatalogueEntry =
  | { kind: 'module'; slug: ModuleSlug; name: string; summary: string; pack: Pack; area: Area; item: Module }
  | { kind: 'portal'; slug: ModuleSlug; name: string; summary: string; pack: 'portal'; area: null; item: Portal };

/** Every module page, in catalogue order: the 38 modules, then the 4 portals. */
export const catalogue: CatalogueEntry[] = [
  ...modules.map((item) => ({ kind: 'module' as const, slug: item.slug, name: item.name, summary: item.summary, pack: item.pack, area: item.area, item })),
  ...portals.map((item) => ({ kind: 'portal' as const, slug: item.slug, name: item.name, summary: item.summary, pack: 'portal' as const, area: null, item })),
];

export const entryBySlug = (slug: ModuleSlug) => catalogue.find((entry) => entry.slug === slug)!;

// Every slug in slugs.ts belongs to exactly one catalogue entry. Runs on load, so dev, the build and the
// prerender all stop on a mismatch.
{
  const used = catalogue.map((entry) => entry.slug);
  const missing = moduleSlugs.filter((slug) => !used.includes(slug));
  const twice = used.filter((slug, i) => used.indexOf(slug) !== i);
  if (missing.length || twice.length) {
    throw new Error(`catalogue: slugs out of step with slugs.ts (missing: ${missing.join(', ') || 'none'}; repeated: ${twice.join(', ') || 'none'})`);
  }
}

/* ---------- Premium modules ---------- */

/**
 * An illustrative interface for a premium module, drawn by SpecialVisual. Three modules have bespoke drawings
 * ('transport', 'scheme', 'auction'); the rest are described as data: a header, three figures, a table and a
 * note. All values are invented sample data.
 */
export interface MockScreen {
  kicker: string;
  title: string;
  chip: [string, 'ok' | 'live' | 'warn'];
  meta: [string, string][];
  cols: string[];
  rows: string[][];
  /** Row to highlight. */
  on?: number;
  note: [string, string];
}

export type PremiumVisual = 'transport' | 'scheme' | 'auction' | MockScreen;

export interface PremiumFeature {
  id: string;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  visual: PremiumVisual;
}

export const premiumGroups: { name: string; ids: string[] }[] = [
  { name: 'Logistics and warehousing', ids: ['tms', 'wms', 'flt'] },
  { name: 'Sales and trade', ids: ['snr', 'ecm', 'sub'] },
  { name: 'Sourcing, finance and risk', ids: ['auc', 'fsc', 'cfo', 'aud', 'ins', 'res'] },
  { name: 'Manufacturing', ids: ['ppds', 'sfc'] },
  { name: 'Workforce', ids: ['lms', 'cls', 'clp'] },
  { name: 'Data and documents', ids: ['baa', 'mdm', 'dms'] },
];

export const premiumFeatures: PremiumFeature[] = [
  {
    id: 'tms',
    kicker: 'Logistics control tower',
    title: 'Every shipment, from load to delivery.',
    body: 'Live shipments with ETAs and risk flags, multi-drop loads built for truck fill, lane-level performance and e-way bill compliance on every movement.',
    points: ['Control tower', 'Load builder', 'Lane analytics', 'E-way bill compliance'],
    visual: 'transport',
  },
  {
    id: 'wms',
    kicker: 'Batch-controlled warehousing',
    title: 'Bin-accurate stock, picked FEFO.',
    body: 'Zone and bin-level stock with expiry watch, guided inbound from dock to putaway, and cut-off driven pick waves through packing, QC and staged dispatch.',
    points: ['Bin-level stock', 'FEFO enforcement', 'Guided inbound', 'Wave picking'],
    visual: {
      kicker: 'Wave W-0318 · FG store',
      title: 'Pick list, nearest expiry first',
      chip: ['Picking', 'live'],
      meta: [['Lines', '86'], ['Picked', '61'], ['Cut-off', '16:30']],
      cols: ['Bin', 'Item', 'Batch', 'Expiry'],
      rows: [['C-07', 'SK-22', 'B0644', 'Mar 27'], ['C-08', 'SK-22', 'B0731', 'Dec 27'], ['C-09', 'SK-22', 'B0819', 'Aug 28'], ['C-12', 'BR-045', 'L-0930', '—']],
      on: 0,
      note: ['FEFO applied at allocation', 'The near-expiry batch is picked before newer stock'],
    },
  },
  {
    id: 'flt',
    kicker: 'Fleet control room',
    title: 'Every vehicle, trip and rupee per km.',
    body: 'Live trips with cold-chain telemetry, a vehicle register with statutory documents, a workshop maintenance planner and running cost per vehicle.',
    points: ['Live trip tracking', 'Maintenance planner', 'Document watch', 'Cost per km'],
    visual: {
      kicker: 'Vehicle register',
      title: 'Own fleet · 32 vehicles',
      chip: ['4 documents due', 'warn'],
      meta: [['On trip', '21'], ['In workshop', '3'], ['Avg cost / km', '₹27.4']],
      cols: ['Vehicle', 'Status', 'Fitness valid', '₹ / km'],
      rows: [['V-07', 'TRP-0418', 'Mar 27', '28.9'], ['V-12', 'TRP-0421', '1 Nov', '47.9'], ['V-03', 'Workshop', 'Jun 27', '–'], ['V-19', 'TRP-0415', 'Jan 27', '27.8']],
      on: 1,
      note: ['Fitness for V-12 expires in 24 days', 'Flagged before the vehicle can be assigned a trip'],
    },
  },
  {
    id: 'fsc',
    kicker: 'Forest certification',
    title: 'Every shipment traced to its plot.',
    body: 'GPS-mapped plots checked for deforestation, harvest logged offline in the field, chain of custody from parcel to container, and an EUDR due-diligence statement assembled for each shipment.',
    points: ['GPS plot registry', 'Offline harvest logs', 'Chain of custody', 'EUDR statements'],
    visual: {
      kicker: 'Container MWE-0412 · Rotterdam',
      title: 'Due-diligence statement',
      chip: ['1 document pending', 'warn'],
      meta: [['Plots', '212'], ['Deforestation-free', '212'], ['Volume', '38.6 m³']],
      cols: ['Lot', 'Species', 'Plots', 'Check'],
      rows: [['RW-2291', 'Rubberwood', '86', 'Clear'], ['RW-2294', 'Rubberwood', '71', 'Clear'], ['TK-0418', 'Teak', '38', 'Clear'], ['TK-0421', 'Teak', '17', 'Permit due']],
      on: 3,
      note: ['One felling permit not uploaded', 'The statement is filed once it is on record'],
    },
  },
  {
    id: 'snr',
    kicker: 'Trade spend',
    title: 'Schemes designed, capped and settled.',
    body: 'Build distributor, stockist and retailer schemes with simulated budgets, apply them at order entry, and clear verified claims through a governed credit-note engine.',
    points: ['Slab builder with simulation', 'Budget guardrails', 'Claim verification', 'Credit note engine'],
    visual: 'scheme',
  },
  {
    id: 'ecm',
    kicker: 'Online channels',
    title: 'Every channel, one order feed.',
    body: 'Orders from marketplaces, quick commerce, D2C and B2B in one queue, buffer-protected inventory sync per channel, connector health and daily settlement reconciliation.',
    points: ['Unified order feed', 'Inventory sync with buffers', 'Connector health', 'Settlement reconciliation'],
    visual: {
      kicker: 'Unified order feed · Today',
      title: 'Channels and inventory buffers',
      chip: ['4 channels live', 'ok'],
      meta: [['Orders today', '312'], ['Inventory sync', 'Every 10 min'], ['Listings paused', '7']],
      cols: ['Channel', 'Orders', 'Buffer', 'Sync'],
      rows: [['Marketplace A', '146', '3 days', 'Synced'], ['Marketplace B', '92', '3 days', 'Queued'], ['B2B marketplace', '48', '2 days', 'Synced'], ['D2C store', '26', '1 day', 'Synced']],
      on: 1,
      note: ['Marketplace API down since 12:40', 'Updates wait in a retry queue; no order is lost'],
    },
  },
  {
    id: 'sub',
    kicker: 'Recurring revenue',
    title: 'Plans, renewals and collections, governed.',
    body: 'Plan performance and churn, a subscription register with billing cycles and renewal dates, renewal quotes checked against discount policy, and dunning before suspension.',
    points: ['ARR and churn', 'Subscription register', 'Plan builder', 'Billing and dunning'],
    visual: {
      kicker: 'Plan performance',
      title: 'Subscribers and MRR by plan',
      chip: ['12 renewals due', 'live'],
      meta: [['Subscribers', '2,140'], ['MRR', '₹38.6 L'], ['Monthly churn', '1.8%']],
      cols: ['Plan', 'Subscribers', 'MRR', 'Billing'],
      rows: [['Basic', '1,210', '₹9.7 L', 'Monthly'], ['Professional', '760', '₹18.2 L', 'Annual'], ['Enterprise', '170', '₹10.7 L', 'Annual']],
      on: 1,
      note: ['Failed payments retried', 'Dunning runs before any subscription is suspended'],
    },
  },
  {
    id: 'auc',
    kicker: 'E-sourcing',
    title: 'Negotiation, run as an auction.',
    body: 'Create events from approved indents, invite qualified vendors, run live reverse auctions or sealed bids, and award with committee governance.',
    points: ['Live reverse auctions', 'Sealed bids and RFQs', 'Savings analytics', 'Award governance'],
    visual: 'auction',
  },
  {
    id: 'cfo',
    kicker: 'Budgeting',
    title: 'Budgets and forecasts that catch overruns early.',
    body: 'Load the baseline, set assumptions, run scenarios, route plant-head and CFO approvals, and publish the approved plan back, with variance review built in.',
    points: ['Budget vs actual', 'Driver-based forecasts', 'Scenario engine', 'Variance alerts'],
    visual: {
      kicker: 'Budget FY 2026-27 · all sites',
      title: 'Budget against actual by cost centre',
      chip: ['H2 reforecast open', 'live'],
      meta: [['Annual budget', '₹43.74 Cr'], ['Spent to date', '₹22.93 Cr'], ['Forecast', '₹45.07 Cr']],
      cols: ['Cost centre', 'Budget', 'Actual', 'Used'],
      rows: [['Plant 1 overheads', '₹12.4 Cr', '₹6.42 Cr', '52%'], ['Plant 1 maintenance', '₹1.40 Cr', '₹1.27 Cr', '91%'], ['Logistics freight', '₹5.60 Cr', '₹3.05 Cr', '54%'], ['Chennai power', '₹1.68 Cr', '₹1.03 Cr', '61%']],
      on: 1,
      note: ['Maintenance past its 90% threshold', 'Variance alert sent to the cost-centre owner'],
    },
  },
  {
    id: 'aud',
    kicker: 'Assurance',
    title: 'Audit plan to CAPA closure, on one trail.',
    body: 'The annual audit plan and its adherence, execution against clause-level checklists with evidence and severity, and findings turned into owned CAPAs.',
    points: ['Assurance health', 'Audit register', 'Checklist execution', 'CAPA closure'],
    visual: {
      kicker: 'Audit IA-0219 · Machining, Plant 1',
      title: 'Findings and corrective actions',
      chip: ['In progress', 'live'],
      meta: [['Audit type', 'Internal'], ['Clauses', '36'], ['Findings', '4']],
      cols: ['Finding', 'Severity', 'Clause', 'Note'],
      rows: [['Blocked torque wrench in use', 'Major', '8.5.1', 'CAPA reopened'], ['Lapsed certification', 'Minor', '7.2', 'Repeat'], ['Work instruction revision', 'Minor', '8.5.1', '—'], ['Uncoded minor stops', 'Observation', '8.5.1', 'Repeat']],
      on: 0,
      note: ['CAPA-0088 reopened', 'Its effectiveness check failed during this audit'],
    },
  },
  {
    id: 'ins',
    kicker: 'Corporate risk',
    title: 'Every policy, renewal and claim on one screen.',
    body: 'The complete policy register with renewals under watch, and a guided claims workflow from incident intimation through survey to settlement.',
    points: ['Policy register', 'Renewal radar', 'Claims workflow', 'Coverage check'],
    visual: {
      kicker: 'Policy register',
      title: 'Covers across the group',
      chip: ['4 renewals in 90 days', 'warn'],
      meta: [['Active policies', '10'], ['Property and machinery', '₹84.8 Cr'], ['Open claims', '3']],
      cols: ['Policy', 'Covers', 'Renews', 'Status'],
      rows: [['Motor fleet', '32 vehicles', '19 Oct', 'Quote in'], ['Fire and perils', 'Plant 1', '30 Nov', 'Renewal due'], ['Marine transit', 'All dispatches', '15 Dec', 'Renewal due'], ['Machinery', '1,142 assets', '31 Mar', 'Endorse']],
      on: 0,
      note: ['Renewals tracked at 30, 60 and 90 days', 'No cover lapses unnoticed'],
    },
  },
  {
    id: 'res',
    kicker: 'Property portfolio',
    title: 'Every property and lease, renewed on evidence.',
    body: 'Plants, depots, offices and land bank with lease terms, rent history and statutory documents, and a benchmarked renewal workflow for every expiring lease.',
    points: ['Portfolio register', 'Renewal workflow', 'Statutory watch', 'Rent analytics'],
    visual: {
      kicker: 'Portfolio register',
      title: 'Properties and leases',
      chip: ['Renewal in review', 'live'],
      meta: [['Properties', '14'], ['Leased', '9'], ['Expiring in 90 days', '2']],
      cols: ['Property', 'Type', '₹ / sq ft', 'Lease ends'],
      rows: [['Depot, Ahmedabad', 'Leased', '24.00', '31 Dec'], ['Sales office, Indore', 'Leased', '62.00', '30 Nov'], ['Depot, Pune', 'Leased', '26.00', 'Mar 2033'], ['Talegaon plot', 'Land bank', '–', '–']],
      on: 0,
      note: ['Renewal benchmarked to market', 'Goes to the CFO with the five-year cost impact'],
    },
  },
  {
    id: 'ppds',
    kicker: 'Production planning and detailed scheduling',
    title: 'Plans that survive the shop floor.',
    body: 'A frozen-horizon MPS, a line Gantt with changeover rules, live batch execution, and an MRP run that turns shortages into purchase proposals.',
    points: ['Line Gantt', 'Live execution', 'MRP engine', 'Demand coverage'],
    visual: {
      kicker: 'Line schedule · Week 43',
      title: 'Sequence and changeovers',
      chip: ['MRP run complete', 'ok'],
      meta: [['Lines', '6'], ['Orders this week', '19'], ['Material shortages', '2']],
      cols: ['Line', 'Order', 'Start', 'Changeover'],
      rows: [['L1', 'WO-5521', 'Mon 06:00', '–'], ['L1', 'WO-5530', 'Wed 14:00', '45 min'], ['L2', 'WO-5524', 'Mon 22:00', '–'], ['L3', 'WO-5527', 'Tue 06:00', '2 h']],
      on: 3,
      note: ['Shortage on castings', 'MRP has drafted a purchase requisition for 120 kg'],
    },
  },
  {
    id: 'sfc',
    kicker: 'Execution control',
    title: 'Work centres, downtime and rework, live.',
    body: 'A live work-centre board with output and downtime, job cards tracked against standard hours, finite scheduling of the next shift, and reason-coded downtime.',
    points: ['Live board', 'Job cards', 'Finite scheduling', 'Downtime and rework'],
    visual: {
      kicker: 'Live board · Shift B',
      title: 'Work centres now',
      chip: ['Shift running', 'ok'],
      meta: [['Output / hour', '142'], ['Jobs open', '11'], ['Downtime', '34 min']],
      cols: ['Work centre', 'Job card', 'Status', 'Down'],
      rows: [['CNC-04', 'JC-8812', 'Running', '–'], ['CNC-05', 'JC-8815', 'Stopped', '22 min'], ['VMC-02', 'JC-8809', 'Running', '–'], ['Press-01', 'JC-8817', 'Setup', '12 min']],
      on: 1,
      note: ['Stoppage on CNC-05', 'Reason must be coded before the shift closes'],
    },
  },
  {
    id: 'lms',
    kicker: 'Learning management',
    title: 'Training matrix to certificate.',
    body: 'A course catalogue by function, curricula built from the role training matrix, assessments and on-job evaluation, and certificates with audit evidence attached.',
    points: ['Course catalogue', 'Curriculum builder', 'Assessment', 'Certification'],
    visual: {
      kicker: 'Training matrix · All sites',
      title: 'Mandatory training by department',
      chip: ['4 overdue', 'warn'],
      meta: [['Courses', '64'], ['Employees', '491'], ['Current', '94.2%']],
      cols: ['Department', 'People', 'Current', 'Overdue'],
      rows: [['Machining · Plant 1', '132', '96.1%', '1'], ['Quality', '28', '97.4%', '0'], ['Stores and warehouse', '46', '89.6%', '2'], ['Chennai plant', '118', '94.0%', '1']],
      on: 2,
      note: ['Untrained staff are not scheduled', 'Learning status feeds the roster'],
    },
  },
  {
    id: 'cls',
    kicker: 'Contract manpower, principal employer',
    title: 'Contract labour, compliant at every gate.',
    body: 'Contractor and worker registers with trade, rate and gate-pass validity, deployment compliance packs for CLRA, PF, ESIC and wages, and compliance-gated bill approval.',
    points: ['Compliance health', 'Labour register', 'Deployment pack', 'Bill approval'],
    visual: {
      kicker: 'Contractor compliance · September',
      title: 'Deployment and bills',
      chip: ['1 bill held', 'warn'],
      meta: [['Contractors', '9'], ['Workers deployed', '472'], ['Bills pending', '3']],
      cols: ['Contractor', 'Workers', 'PF / ESIC', 'Bill'],
      rows: [['Sai Manpower', '128', 'Filed', 'Certified'], ['Bhairav Industrial', '96', 'PF due', 'Held'], ['Tirupati Labour', '64', 'Filed', 'In review'], ['Shree Om Facility', '52', 'Filed', 'In review']],
      on: 1,
      note: ['Bill held for C-117', 'Certification waits for PF and ESIC proof'],
    },
  },
  {
    id: 'clp',
    kicker: 'Contract manpower, factory side',
    title: 'Pay only for verified shifts.',
    body: 'Daily deployment against plan, a worker registry with gate passes, labour requisitions with cost estimates, and attendance-reconciled contractor billing.',
    points: ['Live deployment', 'Contractor scorecards', 'Requisition flow', 'Attendance billing'],
    visual: {
      kicker: 'Deployment · Shift B',
      title: 'Plan against biometric attendance',
      chip: ['Shortfall', 'warn'],
      meta: [['Planned', '220'], ['Present', '206'], ['Requisitions open', '1']],
      cols: ['Department', 'Plan', 'Present', 'Gap'],
      rows: [['Assembly', '80', '74', '−6'], ['Machining helpers', '64', '64', '0'], ['Packing', '46', '42', '−4'], ['Stores', '30', '26', '−4']],
      on: 0,
      note: ['Shortfall visible at shift start', 'A requisition is raised with its cost estimate'],
    },
  },
  {
    id: 'baa',
    kicker: 'Certified reporting',
    title: 'One definition per metric.',
    body: 'Reporting coverage by domain, a report builder that validates metric definitions, lineage and grain before publication, and a data-quality exception queue.',
    points: ['Reporting coverage', 'Report register', 'Report builder', 'Data quality'],
    visual: {
      kicker: 'Report register',
      title: 'Reports and certification',
      chip: ['Certified', 'ok'],
      meta: [['Reports', '128'], ['Certified metrics', '46'], ['Quality exceptions', '5']],
      cols: ['Report', 'Owner', 'Refresh', 'Status'],
      rows: [['Order book by region', 'Sales ops', 'Hourly', 'Certified'], ['Plant OEE', 'Operations', 'Daily', 'Certified'], ['Margin bridge', 'Finance', 'Daily', 'In review'], ['Collection ageing', 'Finance', 'Daily', 'Certified']],
      on: 2,
      note: ['Peer review before publishing', 'Metric, lineage and grain checked in the builder'],
    },
  },
  {
    id: 'mdm',
    kicker: 'Master data governance',
    title: 'One governed record, synced everywhere.',
    body: 'Quality and duplication health by domain, stewardship of customer, material, vendor and territory records, golden records, and approvals for attribute changes.',
    points: ['Data quality', 'Master records', 'Golden record', 'Change approvals'],
    visual: {
      kicker: 'Golden record · Customer',
      title: 'Duplicate cluster, merge proposed',
      chip: ['Merge proposed', 'live'],
      meta: [['Records', '12,480'], ['Duplicate clusters', '37'], ['Quality score', '92%']],
      cols: ['Source', 'Name', 'City', 'Match'],
      rows: [['ERP', 'Kestrel Pumps Ltd', 'Pune', 'Golden'], ['CRM', 'Kestrel Pumps Limited', 'Pune', '98%'], ['Portal', 'Kestral Pumps', 'Pune', '91%']],
      on: 0,
      note: ['Survivorship rules', 'Each attribute keeps its most trusted source'],
    },
  },
  {
    id: 'dms',
    kicker: 'Document management',
    title: 'Every document, versioned and approved.',
    body: 'A central document repository with version control and approvals, retention rules and an audit trail on every document.',
    points: ['Central repository', 'Version control', 'Approvals', 'Retention and audit trail'],
    visual: {
      kicker: 'Document repository',
      title: 'Recent documents',
      chip: ['Approval pending', 'live'],
      meta: [['Documents', '8,960'], ['Pending approval', '6'], ['Retention rules', '14']],
      cols: ['Document', 'Version', 'Owner', 'State'],
      rows: [['SOP-0063 · Calibrated tool control', 'v4', 'QA', 'In approval'], ['QAG-0038 · Quality agreement', 'v2', 'Purchase', 'On hold'], ['DWG-IH220 · Pump housing', 'Rev D', 'Engineering', 'In approval'], ['LIC-0012 · Fire NOC, Chennai', 'v1', 'Admin', 'Approved']],
      on: 1,
      note: ['Approval routed by document type', 'Every version and sign-off is kept'],
    },
  },
];

export const premiumById = (id: string) => premiumFeatures.find((f) => f.id === id)!;
