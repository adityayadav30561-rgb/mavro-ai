/*
 * Homepage copy. Every heading, paragraph and label on the page that is not a module name lives here, so the
 * copy can be revised without touching layout or animation code. All of it is temporary marketing copy, written
 * to evaluate the design; none of it states a figure, certification or customer result.
 */
import type { ChainNode } from '../blocks/ChainDiagram';
import type { Story } from '../blocks/StoryCards';
import type { TimelineData, TimelinePhase } from '../blocks/Timeline';
import type { IconName } from '../components/Icon';
import type { ScreenName } from '../components/Screen';
import { byPack, channelPortals } from './modules';

export const hero = {
  title: ['One ERP for', 'manufacturers & distributors.'],
  lead: 'Core ERP, vendor and channel portals, and specialised modules for logistics, trade schemes and the shop floor, on one platform that shares one set of business data.',
  /** Three facts from the product deck that answer a buyer's first questions: how fast, built for India, and
   *  what about the ERP we already run. */
  proof: [
    { icon: 'rocket', text: 'Live in 25–30 days' },
    { icon: 'shield', text: 'GST and India payroll built in' },
    { icon: 'link', text: 'Works with SAP, Oracle and Tally' },
  ] satisfies { icon: IconName; text: string }[],
  clientsLabel: 'Trusted by',
};
export const intro = {
  title: 'One connected platform.',
  titleSoft: 'Built for complex operations.',
  lead: 'A core ERP handles finance and procurement, but HR, production and the sales channel often fall back to spreadsheets, add-ons and WhatsApp. MAVRO covers all of it on one platform: base modules, portals for vendors and the channel, and premium modules for niche operations.',
  layers: [
    { tier: 'premium', name: 'Premium modules', body: 'Transport, schemes, warehouse, PPDS, auctions and more.' },
    { tier: 'portal', name: 'Portals', body: 'Vendor, distributor, dealer and retailer self-service.' },
    { tier: 'base', name: 'Base modules', body: 'Accounting, payroll, O2C, P2P, production, inventory.' },
  ],
  foundation: {
    name: 'Shared platform',
    body: 'Workflow and rules engine, audit trail, notifications, role-based access, integration APIs.',
  },
};

/**
 * Explore the platform: the three packages as tabs, each with its strongest modules given full treatment.
 * The complete catalogue stays in the Platform mega-menu (and on module pages, Stage B). Module copy and
 * counts come from data/modules/catalogue.ts.
 */
export const explore = {
  title: 'Explore the platform.',
  titleSoft: 'Three packages, one system.',
  lead: 'Base modules run the business, portals bring your vendors and channel into it, and premium modules cover the specialised work. All live, all on the same orders, items and ledgers.',
  packages: {
    base: {
      tab: 'Base package',
      unit: 'modules',
      blurb: 'Core ERP, HR and operations',
      featured: ['o2c', 'acc', 'hrms', 'p2p', 'prd', 'inv', 'prj'],
      all: 'All {n} base modules',
      /** A full screen of each featured module, captured from /prototype by `npm run shots`. */
      screens: {
        o2c: { screen: 'o2c', alt: 'The MAVRO sales orders screen: open orders with credit status, stock allocation and stage, a credit check for Kestrel Pumps and receivables by age.' },
        acc: { screen: 'accounting', alt: 'The MAVRO general ledger screen: journals posted automatically from invoices, receipts and work orders, one journal opened line by line, and GST returns ready to file.' },
        hrms: { screen: 'payroll', alt: 'The MAVRO payroll screen: the September run from attendance to statutory payments, PF, ESI, TDS and PT dues, pay by department and the ledger posting.' },
        p2p: { screen: 'purchase-order', alt: 'The MAVRO purchase order screen: PO-7714 from requisition to payment, a three-way match waiting for the goods receipt, the vendor profile and the budget.' },
        prd: { screen: 'work-order', alt: 'The MAVRO work order screen: WO-5521 with progress at each routing operation, output by shift, the bill of materials and cost per piece.' },
        inv: { screen: 'stock-item', alt: 'The MAVRO item stock screen: IH-220 by location and lot, reserved and free stock, every movement traced to its document, and weekly demand.' },
        prj: { screen: 'project', alt: 'The MAVRO project screen: PRJ-0217 with its milestone plan against the baseline, the dependency holding it up, change requests awaiting approval, budget by cost head and the top risks.' },
      } satisfies Record<string, { screen: ScreenName; alt: string }>,
    },
    portal: {
      tab: 'Portals',
      unit: 'portals',
      blurb: 'Your vendors and channel, self-served',
      featured: ['vendor', 'distributor', 'dealer', 'retailer'],
      all: null,
    },
    premium: {
      tab: 'Premium package',
      unit: 'modules',
      blurb: 'Niche and industry-specific',
      featured: ['tms', 'snr', 'wms', 'sfc', 'fsc', 'auc', 'cls'],
      all: 'All {n} premium modules',
    },
  },
  /** The chain the portals sit on, in the order goods move. */
  chain: [
    { id: 'vendor', name: 'Vendors', icon: 'procurement', link: 'Supply' },
    { id: 'company', name: 'Your business', icon: 'layers', link: 'Primary sales' },
    { id: 'distributor', name: 'Distributors', icon: 'distribution', link: 'Secondary sales' },
    { id: 'dealer', name: 'Dealers', icon: 'warehouse', link: 'Tertiary sales' },
    { id: 'retailer', name: 'Retailers', icon: 'sales', link: null },
  ] satisfies ChainNode[],
  chainTitle: 'Where it sits in your chain',
  chainBadge: 'Portal',
  sample: 'Illustrative data',
};

/** Order to cash, as one sample order travels it. Figures are illustrative and match the hero panels. */
export const workflow = {
  title: 'One workflow.',
  titleSoft: 'Connected from start to finish.',
  lead: 'Follow one order through MAVRO. Each step is created from the one before it, and each module picks up the same record rather than a re-keyed copy.',
  caption: 'Sample order SO-24817 · Kestrel Pumps · 1,200 impeller housings',
  steps: [
    { module: 'Order to Cash', icon: 'orders', title: 'Order created', doc: 'SO-24817', body: 'The sales order is raised and checked against the customer credit limit.' },
    { module: 'Inventory', icon: 'inventory', title: 'Stock allocated', doc: '310 reserved', body: 'Free stock is reserved by batch; the balance goes to production.' },
    { module: 'Production', icon: 'production', title: 'Made to order', doc: 'WO-5521', body: 'A work order for 890 pieces, planned from the BOM and routing.' },
    { module: 'Production', icon: 'quality', title: 'QC released', doc: 'L-0932', body: 'The finished lot is checked before it is released to stores.' },
    { module: 'Gate Entry', icon: 'gate', title: 'Gated out', doc: 'DSP-1904', body: 'The outward gate pass is issued against the dispatch.' },
    { module: 'Transportation', icon: 'transport', title: 'Delivered', doc: 'Trip and POD', body: 'The shipment is tracked through to delivery confirmation.' },
    { module: 'Accounting', icon: 'finance', title: 'Invoiced and posted', doc: 'INV-6120', body: 'Auto-invoiced on dispatch and posted to the ledger, with GST.' },
  ] satisfies { module: string; icon: IconName; title: string; doc: string; body: string }[],
};

/** ERP Connect: the integration architecture page of the MAVRO ERP Connectivity deck. */
export const connect = {
  title: 'How MAVRO connects to SAP,',
  titleSoft: 'Oracle and other ERPs.',
  lead: 'Every ERP syncs with the MAVRO Database. The MAVRO App and its users work from that single, connected source, while your ERP stays the system of record.',
  columns: ['External systems', 'MAVRO platform', 'End users'] as [string, string, string],
  systems: [
    { name: 'SAP', detail: 'S/4HANA · ECC' },
    { name: 'Oracle', detail: 'EBS · Fusion Cloud' },
    { name: 'Tally', detail: 'TallyPrime · ERP 9' },
    { name: 'Any legacy ERP', detail: 'In-house and older systems' },
  ],
  external: { label: 'External API', note: 'Two-way sync' },
  broker: { name: 'MAVRO Database', role: 'Sole integration broker', points: ['Syncs with every ERP', 'One source for the app'] },
  internal: { label: 'Internal API', note: 'Read · write' },
  app: { name: 'MAVRO App', role: 'Web + mobile', points: ['Boutique screens', 'Android and iOS'] },
  users: { name: 'Users', groups: ['Office', 'Plant', 'Field'] },
  rule: 'No direct ERP access',
  ruleBody: 'The MAVRO App never calls SAP, Oracle or Tally directly. All external traffic is brokered by the MAVRO Database.',
  /** The five benefits of MAVRO Connect, from the connectivity deck (slide 5). */
  benefits: [
    { icon: 'people', title: 'Fewer ERP licences', body: 'Occasional users work in MAVRO; named ERP seats stay with core users.' },
    { icon: 'eye', title: 'Simple, role-based screens', body: 'Only the fields each role needs, instead of ERP transaction codes.' },
    { icon: 'layers', title: 'Beyond native ERP limits', body: 'Cross-ERP views and custom reports, with the ERP core untouched.' },
    { icon: 'workflow', title: 'Your own workflows', body: 'Your forms, approvals and terms, changed in days, not months.' },
    { icon: 'phone', title: 'Mobile for every user', body: 'ERP data and approvals on Android and iOS, with offline sync.' },
  ] satisfies { icon: IconName; title: string; body: string }[],
};

/**
 * Implementation: the phased 25 to 30 day rollout and the support model, from the product deck (slides 25 and
 * 28). Days on the timeline run 1 to 30; `ongoing` phases run off the end of it.
 */
export const implementation = {
  title: 'Live in 25 to 30 days.',
  titleSoft: 'Not a year-long project.',
  lead: 'A phased rollout with one dedicated person from the first workshop to go-live, and support that stays after it.',
  plan: {
    label: 'Your first month with MAVRO',
    span: 'Day 1 → Day 30',
    after: 'After go-live',
    ongoing: 'Ongoing',
    milestones: [
      { day: 15, label: 'First go-live' },
      { day: 31, label: 'Live by day 30' },
    ],
    phases: [
      {
        when: 'Week 1–2',
        from: 1,
        to: 14,
        icon: 'calendar',
        title: 'Discovery and setup',
        points: ['Process mapping and sign-off', 'Modules configured, users and roles set up', 'Trial data migration and UAT'],
      },
      {
        when: 'Week 3',
        from: 15,
        to: 21,
        icon: 'rocket',
        title: 'First go-live',
        points: ['Priority modules go live first', 'Department-wise training, on site or remote', 'Same-day issue resolution'],
      },
      {
        when: 'Week 4',
        from: 22,
        to: 30,
        icon: 'check',
        title: 'Full go-live',
        points: ['Remaining modules and the mobile app', 'SOPs and process documentation', 'Your team runs it independently'],
      },
      {
        when: 'Ongoing',
        from: 30,
        to: 'ongoing',
        icon: 'wrench',
        title: 'Support after go-live',
        points: ['A dedicated contact and fixes under AMS', 'Monthly review of usage and roadmap', 'New modules when you need them'],
      },
    ] satisfies TimelinePhase[],
  } satisfies TimelineData,
  supportTitle: 'Who you work with',
  supportNote: 'The same team from kickoff to go-live, and after it.',
  support: [
    {
      icon: 'people',
      title: 'One dedicated resource',
      body: 'One person for your project, full-time through the rollout and not shared, with a direct line to our solution architects.',
    },
    {
      icon: 'headset',
      title: 'Go-live hypercare',
      body: 'On site if agreed, otherwise remote. Same-day resolution with no ticket queue, and training department by department.',
    },
    {
      icon: 'wrench',
      title: 'AMS after go-live',
      body: 'A dedicated contact, fixes and enhancements, and a monthly review of usage, open issues and your roadmap.',
    },
  ] satisfies { icon: IconName; title: string; body: string }[],
};

export type IndustrySlug = 'manufacturing' | 'distribution' | 'pharma' | 'service-providers';

export interface Industry {
  name: string;
  /** URL segment: the industry page `/industries/<slug>` and the homepage anchor `#industry-<slug>`. */
  slug: IndustrySlug;
  icon: IconName;
  /** Who it is, in the deck's words. */
  who: string;
  title: string;
  points: string[];
  record: string;
  trace: string;
  middle: string[];
  fulfil: string;
  /** Modules featured in Explore the platform; each chip opens that module there. */
  modules: string[];
}

/**
 * Industries: manufacturing, distribution and pharma from the product deck (slide 2 and the module pages: GMP
 * batch records, QC release, FEFO allocation, pharmacovigilance), and service providers such as IT companies
 * (user, 2026-10-23, in place of exporters), from the Project Management, HRMS and Travel and Expense pages. Points are capabilities stated in the deck; its customer
 * claims ("trusted by major automotive OEMs", "60+ countries") are left out on purpose.
 */
export const industries = {
  title: 'Built for how your industry runs.',
  titleSoft: 'Same platform, configured middle.',
  lead: 'For manufacturing, distribution and service businesses running at scale: multi-line, high-volume and multi-entity. Every business takes an order and gets paid; what happens in between is configured, not rewritten.',
  shared: 'Customers, items, pricing, GST, inventory, ledgers, roles and audit',
  core: { start: ['Enquiry', 'Quotation', 'Order'], end: ['Invoice', 'Payment'] },
  modulesLabel: 'Modules to see',
  list: [
    {
      name: 'Manufacturing',
      slug: 'manufacturing',
      icon: 'production',
      who: 'OEM suppliers and multi-line plants',
      title: 'OEM and aftermarket lines, run from one plan.',
      points: [
        'Work orders, BOM and routing for OEM and aftermarket production',
        'Live OEE, WIP and output by shift, across plants',
        'Vendor portal and three-way matched buying for high supplier volumes',
      ],
      record: 'Work order',
      trace: 'Lot and heat number',
      middle: ['Planning', 'BOM and routing', 'Production', 'Quality'],
      fulfil: 'Dispatch',
      modules: ['prd', 'sfc', 'inv', 'p2p', 'vendor'],
    },
    {
      name: 'Distribution',
      slug: 'distribution',
      icon: 'distribution',
      who: 'Dealer, distributor and retail networks',
      title: 'Your whole channel on one order book.',
      points: [
        'Beat plans and mobile order booking for the field force',
        'Schemes and rebates by outlet tier, checked at order entry',
        'Distributor, dealer and retailer portals, with every level of sales in view',
      ],
      record: 'Sales order',
      trace: 'Batch and serial',
      middle: ['Scheme check', 'Allocation', 'Picking', 'Ship confirm'],
      fulfil: 'Delivery',
      modules: ['o2c', 'snr', 'wms', 'distributor', 'retailer'],
    },
    {
      name: 'Pharma',
      slug: 'pharma',
      icon: 'quality',
      who: 'Multi-plant, GMP-regulated manufacturing',
      title: 'Batch records, QC release and shelf life, built in.',
      points: [
        'Electronic batch records with stage-wise sign-off and yields',
        'No batch reaches finished goods without QC release',
        'FEFO and shelf-life rules on every order line',
      ],
      record: 'Batch record',
      trace: 'Batch and expiry',
      middle: ['Batch planning', 'Dispensing', 'Manufacturing', 'QA release'],
      fulfil: 'Dispatch',
      modules: ['prd', 'o2c', 'inv', 'hrms'],
    },
    {
      name: 'Service providers',
      slug: 'service-providers',
      icon: 'workflow',
      who: 'IT companies and professional services',
      title: 'Projects, people and costs on one system.',
      points: [
        'Projects tracked against budget, schedule and change requests',
        'Attendance, leave and payroll with PF, ESI and TDS for a growing team',
        'Travel and expense claims checked against policy and settled through payroll',
      ],
      record: 'Project',
      trace: 'Milestone and time card',
      middle: ['Scope', 'Resourcing', 'Delivery', 'Sign-off'],
      fulfil: 'Handover',
      modules: ['prj', 'hrms', 'acc', 'o2c'],
    },
  ] satisfies Industry[],
};

export const showcase = {
  title: 'Powerful operations.',
  titleSoft: 'One clear view.',
  lead: 'Every team works in its own screens. All of them read from the same transactions, so the figure in front of you is the business as it stands.',
  note: 'Interface shown with illustrative sample data.',
  views: [
    {
      name: 'Leadership',
      screen: 'overview',
      title: 'The whole business on one screen.',
      body: 'Order book, revenue, delivery and cash, with the orders that need a decision today ranked by risk to the promise date.',
      alt: 'The MAVRO operations overview with key figures, the order pipeline and orders that need attention.',
    },
    {
      name: 'Sales',
      screen: 'sales-order',
      title: 'Answer the customer without calling the plant.',
      body: 'Every order shows how far it has got, what stock is held for it and which documents it has already created.',
      alt: 'A MAVRO sales order with its document flow, fulfilment progress and linked documents.',
    },
    {
      name: 'Production',
      screen: 'production',
      title: 'A schedule that knows what it is for.',
      body: 'Each bar on the machine schedule is a customer order, so a breakdown shows which promise dates it puts at risk.',
      alt: 'The MAVRO shop floor screen with shift figures, the machine schedule and a work order in progress.',
    },
    {
      name: 'Stores',
      screen: 'inventory',
      title: 'Stock that says what it is promised to.',
      body: 'On hand, reserved, free and under inspection, per item and per bin, valued at what it actually cost.',
      alt: 'The MAVRO inventory screen with stock value, cover, and stock by item split into free, reserved and in inspection.',
    },
    {
      name: 'Finance',
      screen: 'finance',
      title: 'Numbers that arrive already explained.',
      body: 'Receivables, payables and cash, each figure posted from a dispatch, a receipt or a bank line you can open.',
      alt: 'The MAVRO receivables and cash screen with ageing, weekly cash flow and invoices linked to their dispatches.',
    },
  ] satisfies { name: string; screen: ScreenName; title: string; body: string; alt: string }[],
};

export const why = {
  title: 'Purpose-built for Indian operations,',
  titleSoft: 'not a generic ERP with add-ons.',
  lead: 'One platform that covers the gaps a core ERP leaves in HR, production and the channel, delivered by a partner rather than a vendor.',
  points: [
    { icon: 'shield', title: 'Built for Indian manufacturing', body: 'GST at every touchpoint with e-invoicing, India payroll with PF, ESI and TDS, and multi-entity, multi-plant operations from one dashboard.' },
    { icon: 'distribution', title: 'Connects your entire channel', body: 'Sales force automation, a scheme and rebate engine by outlet tier, and portals for vendors, distributors, dealers and retailers.' },
    { icon: 'eye', title: 'Visibility from floor to CFO', body: 'Production status by shift, payables, receivables and cash, and role dashboards for the CFO, plant head, sales and HR.' },
    { icon: 'workflow', title: 'Built once, shared everywhere', body: 'A no-code workflow engine, business rules kept apart from process flows, notifications and an audit trail on every transaction.' },
    { icon: 'phone', title: 'Mobile for every user', body: 'Orders, approvals and dashboards on Android and iOS, so work does not wait for someone to reach a desk.' },
    { icon: 'people', title: 'A delivery partner, not a vendor', body: 'A phased 25 to 30 day implementation with a dedicated resource, knowledge transfer to your team, and AMS after go-live.' },
  ] satisfies { icon: IconName; title: string; body: string }[],
  /**
   * The evidence beside the principles: statutory compliance and security, as stated in the product deck
   * (slides 1, 11, 12 and the module pages). Nothing here may go beyond what the deck says.
   */
  trust: {
    title: 'Trust, built in',
    compliance: {
      tab: 'India compliance',
      items: [
        { icon: 'receipt', title: 'GST and e-invoicing', tags: ['e-invoice', 'GSTR-1', 'GSTR-3B'], body: 'Returns built from transactions, checked before posting.' },
        { icon: 'finance', title: 'Input tax credit', tags: ['GSTR-2B', 'ITC'], body: 'Mismatched vendors are held, so credit stays protected.' },
        { icon: 'transport', title: 'Goods movement', tags: ['E-way bill'], body: 'Matched to invoice and weighbridge on every movement.' },
        { icon: 'people', title: 'Statutory payroll', tags: ['PF', 'ESI', 'TDS', 'PT'], body: 'Calculated in payroll, posted to the ledger on approval.' },
        { icon: 'gate', title: 'Contract labour', tags: ['CLRA', 'PF', 'ESIC'], body: 'No bill is certified while statutory proof is missing.' },
      ] satisfies { icon: IconName; title: string; tags: string[]; body: string }[],
    },
    security: {
      tab: 'Security',
      figures: [
        { value: 'AES-256', label: 'Encryption at rest and in transit' },
        { value: '7 years', label: 'Tamper-proof audit log retention' },
        { value: '< 4 hr', label: 'Recovery point objective (RPO)' },
        { value: '< 8 hr', label: 'Recovery time objective (RTO)' },
      ],
      controls: ['RBAC with field-level access', 'MFA and SSO', 'OAuth 2.0 + JWT', 'HTTPS / TLS', 'IP and device control', 'Daily backups and DR'],
    },
  },
};

const counts = { base: byPack('base').length, portals: channelPortals.length + 1, premium: byPack('premium').length };

/**
 * FAQ, written for search and answer engines (SEO, AEO, GEO): each question is phrased the way buyers search,
 * each answer opens with a direct, self-contained statement that names MAVRO, and the specifics follow (module
 * names, GST returns, ERP versions, the 25 to 30 days). The same text feeds the FAQPage structured data in
 * src/seo/head.ts, so the page and the schema always agree. Every fact is from the decks (docs/PRODUCT.md).
 * Pricing is deliberately absent until the user supplies it.
 */
export const faq = {
  title: 'Frequently asked questions',
  titleGrad: 'about MAVRO ERP.',
  lead: 'Straight answers to what manufacturers and distributors ask before a demo: what MAVRO covers, how it works with SAP, Oracle and Tally, how long it takes, and how it handles GST, payroll and security.',
  more: 'Another question?',
  moreBody: 'Ask it in the demo request, or write to us.',
  items: [
    {
      q: 'What is MAVRO ERP?',
      a: 'MAVRO is an enterprise resource planning (ERP) platform for manufacturers, distributors and exporters, made by SaiSatwik Technologies in Greater Noida, India. It brings base modules (accounting, payroll, order to cash, procure to pay, production, inventory), portals for vendors and the sales channel, and premium modules for specialised operations onto one platform with one set of business data.',
      link: { label: 'Explore the platform', href: '#explore' },
    },
    {
      q: 'Who is MAVRO ERP built for?',
      a: 'MAVRO is built for businesses running at scale: OEM suppliers, multi-line and multi-plant manufacturers, distribution-led companies with dealer and retailer networks, pharma manufacturers, exporters, and service providers such as IT companies. It suits businesses that need finance, operations, HR and channel data in one place, in real time, with Indian compliance built in.',
      link: { label: 'See industries', href: '#industries' },
    },
    {
      q: 'Which modules does MAVRO include?',
      a: `MAVRO includes ${counts.base} base modules, ${counts.portals} portals and ${counts.premium} premium modules, and all of them are live. Base modules cover accounting, HRMS and payroll, order to cash, procure to pay, production, inventory, CRM and sales force automation. The portals serve vendors, distributors, dealers and retailers. Premium modules include transportation, warehouse, scheme and rebate, PPDS and shop floor control.`,
      link: { label: 'Explore the platform', href: '#explore' },
    },
    {
      q: 'Does MAVRO work with SAP, Oracle or Tally?',
      a: 'Yes. With MAVRO ERP Connect, SAP (S/4HANA and ECC), Oracle (EBS and Fusion Cloud), Tally (TallyPrime and ERP 9) and legacy ERPs sync two ways with the MAVRO Database. Your ERP stays the system of record, and the MAVRO App never calls the ERP directly. Occasional users can work in MAVRO, so named ERP licences stay with core users.',
      link: { label: 'How ERP Connect works', href: '#connect' },
    },
    {
      q: 'Can MAVRO replace our current ERP or Tally?',
      a: 'Yes. Each tool you use today maps to a MAVRO module: a legacy ERP to MAVRO Accounting and Vendor Invoice Management, external payroll to MAVRO Payroll, production spreadsheets to Production Management, and WhatsApp orders to sales force automation and the portals. Data moves across in a trial migration in the first two weeks. If you prefer to keep your ERP, MAVRO runs alongside it through ERP Connect.',
      link: { label: 'See the rollout plan', href: '#implementation' },
    },
    {
      q: 'How long does it take to implement MAVRO?',
      a: 'MAVRO is implemented in a phased 25 to 30 day plan: discovery and setup in weeks 1 and 2, the first go-live in week 3, full go-live in week 4, then ongoing support. One dedicated resource stays with your project from the first workshop to go-live, on site if agreed or remote, with same-day issue resolution during go-live.',
      link: { label: 'See the rollout plan', href: '#implementation' },
    },
    {
      q: 'Is MAVRO GST compliant?',
      a: 'Yes. MAVRO applies GST at every touchpoint: e-invoices with place-of-supply checks before posting, GSTR-1 and GSTR-3B built from transactions, input tax credit protected by GSTR-2B reconciliation that holds mismatched vendors, and e-way bills on every movement of goods.',
      link: { label: 'India compliance in MAVRO', href: '#why' },
    },
    {
      q: 'Does MAVRO handle Indian payroll and statutory compliance?',
      a: 'Yes. The MAVRO HRMS and Payroll module calculates PF, ESI, TDS and professional tax inside the payroll run, along with bonus and LTA, syncs attendance to payroll and posts the payroll journal to the general ledger on approval. For contract labour, bills can be held until PF, ESIC and wage evidence is complete.',
      link: { label: 'India compliance in MAVRO', href: '#why' },
    },
    {
      q: 'Can our vendors, distributors and dealers use MAVRO?',
      a: 'Yes. MAVRO has four self-service portals: a Vendor Portal for supplier onboarding with GSTIN and PAN verification, a Distributor (B2B) Portal for primary orders, a Dealer Portal for secondary sales and a Retailer Portal for tertiary demand. Each portal works from the same records your team uses, so orders and claims arrive without re-keying.',
      link: { label: 'See the portals', href: '#portals' },
    },
    {
      q: 'Is MAVRO available on mobile?',
      a: 'Yes. The MAVRO App runs on the web and on Android and iOS, so orders, approvals and dashboards reach users in the office, at the plant and in the field. The mobile app is offline-capable and syncs when the connection returns, and push alerts flag pending approvals.',
    },
    {
      q: 'Does MAVRO support multiple companies, plants and currencies?',
      a: 'Yes. MAVRO is cloud-native and runs multiple entities, branches and plants in multiple currencies on one platform, with a live multi-currency P&L for exporters and role dashboards for the CFO, plant heads, sales and HR.',
    },
    {
      q: 'How does MAVRO keep our data secure?',
      a: 'MAVRO encrypts data with AES-256 at rest and in transit, controls access by role down to individual fields, supports MFA and SSO, and can restrict access by IP address and device. Every transaction is written to a tamper-proof audit log kept for seven years, and daily backups with disaster recovery target a recovery point under 4 hours and a recovery time under 8 hours.',
      link: { label: 'Security in MAVRO', href: '#why' },
    },
    {
      q: 'Does MAVRO integrate with other software?',
      a: 'Yes. MAVRO provides REST APIs, webhooks and batch integration, with connectors for SAP (BAPI), SAP Business One and e-commerce platforms, in addition to ERP Connect for SAP, Oracle, Tally and legacy ERPs.',
    },
    {
      q: 'What support do we get after go-live?',
      a: 'After go-live, MAVRO is supported under AMS: a dedicated contact, bug fixes and enhancements, change requests for new workflows, new modules when you need them, and a monthly review of usage, open issues and roadmap. During the go-live weeks, issues are resolved the same day without a ticket queue.',
    },
    {
      q: 'How do we get a demo of MAVRO?',
      a: 'Request a demo with the form on this page, email contact@saisatwik.com or call +91 92114 29011. The demo is built around your own documents, approvals and current system, and shows which modules you need and how a 25 to 30 day rollout would run.',
      link: { label: 'Request a demo', href: '#demo' },
    },
  ] satisfies { q: string; a: string; link?: { label: string; href: string } }[],
};

/**
 * Customer stories: the three implementations on the product deck's slide 23 ("Clients anonymised, results
 * verified"), approved for the site by the user on 2026-10-23 and rewritten as short case stories. Results and
 * deliverables are the deck's; the challenge lines only restate what its bullets imply. Never add names, quotes
 * or figures that are not in the deck.
 */
export const proof = {
  title: 'What clients changed',
  titleMark: 'with MAVRO.',
  lead: 'Three recent projects delivered by SaiSatwik Technologies. Clients are anonymised; the results are verified.',
  logos: [] as { name: string; src: string }[],
  stories: [
    {
      sector: 'Plantation and export',
      client: 'Forest supply chain company',
      project: 'FSC and EUDR compliance portal',
      result: { before: '4 weeks', after: '2 hours', label: 'to complete EUDR due diligence' },
      challenge: 'Plot records were kept in paper logs, so proving where each export came from took weeks.',
      built: 'One plot registry with chain-of-custody traceability from the parcel to the shipment.',
      points: [
        'GPS polygon mapping for every parcel',
        'Offline, mobile-first harvest logging',
        'EUDR due-diligence statements generated automatically',
      ],
      links: [{ label: 'FSC Portal', href: '#premium', module: 'fsc' }],
    },
    {
      sector: 'Multi-plant logistics',
      stack: 'SAP S/4HANA',
      client: 'Multi-plant manufacturer',
      project: 'Transportation management alongside SAP',
      result: { after: '85%', label: 'fewer freight billing disputes' },
      challenge: 'Freight billing across several plants, run from SAP S/4HANA, led to frequent disputes.',
      built: 'Freight calculated by route and every shipment validated before it is invoiced.',
      points: [
        'SLA-based truck allocation',
        'Self-service portal for transporters',
        'Debit notes and GL reconciliation automated',
      ],
      links: [
        { label: 'Transportation Management', href: '#premium', module: 'tms' },
        { label: 'ERP Connect', href: '#connect' },
      ],
    },
    {
      sector: 'Procurement',
      client: 'Industrial procurement group',
      project: 'Vendor invoice management',
      result: { before: '5 weeks', after: '48 hours', label: 'to onboard a new vendor' },
      challenge: 'Bringing a new vendor on board took five weeks.',
      built: 'Self-service onboarding with GSTIN and PAN validated automatically, and every invoice matched to its order.',
      points: [
        'Automatic three-way match: PO, goods receipt, invoice',
        'Digital PO acknowledgement and alerts',
        'Vendor compliance scorecards',
      ],
      links: [
        { label: 'Vendor Portal', href: '#portals', module: 'vendor' },
        { label: 'Procure to Pay', href: '#modules', module: 'p2p' },
      ],
    },
  ] satisfies Story[],
};

/**
 * Clients shown in the band under the hero, from the clientele slide in the product deck. `file` is the logo in
 * src/assets/clients (cut from brand/clientele-slide.webp by `npm run clients`).
 */
export const clients: { name: string; file: string }[] = [
  { name: 'Pathkind Labs', file: 'pathkind' },
  { name: 'Mankind', file: 'mankind' },
  { name: 'Inteliwaves', file: 'inteliwaves' },
  { name: 'IntelliSmart', file: 'intellismart' },
  { name: 'Research & Ranking', file: 'research-ranking' },
  { name: 'Rentomojo', file: 'rentomojo' },
  { name: 'TechLabs', file: 'techlabs' },
  { name: 'Ontra Labs', file: 'ontra-labs' },
  { name: 'KPMG', file: 'kpmg' },
  { name: 'Aptech Learning', file: 'aptech' },
  { name: 'Al Dahra', file: 'aldahra' },
  { name: 'FLSmidth', file: 'flsmidth' },
  { name: 'Rajnish Retail Limited', file: 'rajnish' },
  { name: 'Aramex', file: 'aramex' },
  { name: 'Yogiji Digi', file: 'yogiji-digi' },
  { name: 'Merino', file: 'merino' },
  { name: 'Siddhidhata', file: 'siddhidhata' },
  { name: 'Maharishi Ayurveda', file: 'maharishi-ayurveda' },
  { name: 'Virtuoso', file: 'virtuoso' },
  { name: 'Gemini Consulting & Services', file: 'gemini' },
];

/** The demo request section (#demo) that closes the page: the pitch on the left, the form on the right. */
export const demo = {
  title: 'See MAVRO with your own process.',
  lead: 'A walkthrough built around your documents, your approvals and the system you run today. Tell us a little about your business and we will set it up.',
  expect: [
    { icon: 'workflow', title: 'Your process, not a generic tour', body: 'Tell us how you sell, buy and make, and the demo follows your flow.' },
    { icon: 'link', title: 'Alongside what you run today', body: 'On SAP, Oracle or Tally? We will show how MAVRO works with it.' },
    { icon: 'rocket', title: 'A clear way forward', body: 'Leave knowing which modules you need and how a 25–30 day rollout would run.' },
  ] satisfies { icon: IconName; title: string; body: string }[],
  direct: 'Prefer to talk now?',
  form: {
    title: 'Request a demo',
    required: 'Fields marked * are required.',
    name: 'Full name',
    email: 'Work email',
    phone: 'Phone',
    company: 'Company',
    system: 'What do you run today?',
    systemPlaceholder: 'Choose one',
    interests: 'Interested in',
    message: 'Anything we should know?',
    messageHint: 'Optional. Industry, number of plants or users, timelines.',
    submit: 'Request my demo',
    sending: 'Sending…',
    privacy: 'We use these details only to arrange your demo.',
    invalid: 'Please check the highlighted fields.',
  },
  systems: ['Tally', 'SAP', 'Oracle', 'Another ERP', 'Spreadsheets or no ERP'],
  interests: ['Base modules', 'Portals', 'Premium modules', 'ERP Connect'],
  errors: {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a phone number we can reach you on.',
    company: 'Please enter your company name.',
  },
  sent: {
    title: 'Thank you, {name}.',
    body: 'Your request is with our team. We will contact you at {email} to schedule your demo.',
  },
  mailto: {
    title: 'Almost there, {name}.',
    body: 'Your email app should open with the request ready to send. If it did not, write to us at {contact}.',
  },
  failed: 'We could not send your request just now. Please try again, or email us at {contact}.',
  again: 'Send another request',
};

/**
 * Calls to action placed mid-page. Each scrolls to the demo form and ticks the matching interest.
 * `interest` must be one of demo.interests (or null for none).
 */
export const inlineCtas = {
  connect: {
    title: 'Running SAP, Oracle or Tally?',
    body: 'See how MAVRO would connect to the ERP you already run, in a demo built around it.',
    label: 'Talk to us about ERP Connect',
    interest: 'ERP Connect',
  },
  modules: {
    title: 'Not sure which modules you need?',
    body: 'We will map your process to the right base, portal and premium modules in the demo.',
    label: 'Plan my modules',
    interest: null,
  },
};

export const footerNote = 'Enterprise ERP for manufacturers, distributors and service providers: base modules, portals and premium modules on one platform.';
