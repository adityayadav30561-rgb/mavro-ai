/*
 * The package pages (/platform/base, /platform/portals, /platform/premium) and the Platform overview (/platform):
 * their own words (SITE-PLAN.md sections 3.2 and 3.3). Module lists, counts and summaries come from
 * modules/catalogue.ts, never typed here; product facts from the decks (docs/PRODUCT.md). Shared headings sit in
 * `packageTemplate`.
 */
import type { IconName } from '../components/Icon';
import { catalogue, packs, type Pack } from './modules';

const count = (pack: Pack) => catalogue.filter((entry) => entry.pack === pack).length;
const nBase = count('base');
const nPortal = count('portal');
const nPremium = count('premium');

/** The wording shared by the three package pages. */
export const packageTemplate = {
  demo: 'Request a demo',
  seeModules: 'See the modules',
  modules: {
    title: 'Every module in',
    lead: 'Each module has its own page, with its screens and what it does.',
  },
  combine: {
    title: 'Three packages,',
    rest: 'one platform.',
    lead: 'The packages are not separate products. They share the same orders, items, ledgers and the same platform features, so a portal order lands in Order to Cash and a premium module reads the same stock.',
    here: 'You are here',
  },
  faq: { title: 'Questions about', lead: 'Answers from the product decks, written the way buyers ask.' },
  cta: { title: 'See', body: 'A walkthrough built around your documents, your approvals and the way you run today.' },
};

export interface PackageContent {
  pack: Pack;
  icon: IconName;
  hero: { title: string; rest: string; lead: string; facts: { value: string; label: string }[] };
  /** Heading of the package-specific section. */
  specific: { title: string; rest: string; lead: string };
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
}

export const packageContent: Record<Pack, PackageContent> = {
  base: {
    pack: 'base',
    icon: 'layers',
    hero: {
      title: 'Base modules',
      rest: 'for the core of the business.',
      lead: `${nBase} modules covering finance, sales, supply chain, production, people and projects, on one set of records: order to cash, procure to pay, payroll and the plant floor.`,
      facts: [
        { value: String(nBase), label: 'Base modules' },
        { value: '25–30 days', label: 'Phased implementation' },
      ],
    },
    specific: {
      title: 'One record,',
      rest: 'from the order to the ledger.',
      lead: 'A customer order, a purchase, a work order and a pay run all touch the same items, parties and ledgers. Each base module hands the next one what it needs, with no re-keying.',
    },
    faq: [
      {
        q: 'What is in the MAVRO Base package?',
        a: `The MAVRO Base package has ${nBase} modules: Accounting, HRMS and Payroll, Order to Cash, Procure to Pay, Production Management, Inventory Management, Vendor Invoice Management, Sales Force Automation, Travel and Expense, Gate Entry, CRM, Customer Service, Project Management, mVLens Vendor Audit, Roster Ledger, Rest Hours Log, Asset Management and Data Analytics.`,
      },
      {
        q: 'Can I start with a few Base modules and add more later?',
        a: 'Yes. Every module is built on the same platform and the same records, so a business can go live with the modules it needs first and add others later, including portals and premium modules, without moving data between systems.',
      },
      {
        q: 'Does the Base package cover Indian statutory compliance?',
        a: 'Yes. Accounting handles GST e-invoicing, GSTR-1, GSTR-3B and input tax credit, e-way bills are matched to invoices, and HRMS and Payroll run PF, ESI, TDS and professional tax from attendance.',
      },
      {
        q: 'How long does it take to implement the Base modules?',
        a: 'MAVRO is implemented in phases over 25 to 30 days, with a dedicated resource during the project and annual maintenance support after go-live. The modules chosen and the number of plants affect the plan.',
      },
    ],
    seo: {
      title: `MAVRO Base modules: ${nBase} core ERP modules for manufacturers`,
      description: `The ${nBase} MAVRO Base modules: accounting, payroll, order to cash, procure to pay, production, inventory, sales force automation, gate entry and more, on one set of records with Indian GST and payroll compliance.`,
    },
  },
  portal: {
    pack: 'portal',
    icon: 'distribution',
    hero: {
      title: 'Portals',
      rest: 'for vendors and the channel.',
      lead: `${nPortal} self-service portals that bring suppliers, distributors, dealers and retailers into your ERP: supply, primary, secondary and tertiary sales on the same orders and stock.`,
      facts: [
        { value: String(nPortal), label: 'Portals' },
        { value: 'One chain', label: 'Supply to retail' },
      ],
    },
    specific: {
      title: 'The chain',
      rest: 'from supplier to shelf.',
      lead: 'Each portal serves one link of the chain that goods move along, and every order, invoice and stock figure it shows is the one in your ERP.',
    },
    faq: [
      {
        q: 'What are the MAVRO portals?',
        a: `MAVRO has ${nPortal} portals: the Vendor Portal for supply, the Distributor or B2B Portal for primary sales, the Dealer Portal for secondary sales and the Retailer Portal for tertiary sales. Each is a self-service view of the same ERP records for people outside the company.`,
      },
      {
        q: 'Do portal orders go straight into the ERP?',
        a: 'Yes. An order placed in a portal lands in Order to Cash with the customer’s credit check and scheme applied, and a vendor’s delivery and invoice update Procure to Pay, so there is no re-entry between the portal and the ERP.',
      },
      {
        q: 'Can distributors and dealers see my internal data?',
        a: 'No. Role-based access limits each portal user to their own account, orders, stock and statements. Field-level controls, MFA and an audit trail of who saw and changed what apply to portal users as they do to staff.',
      },
      {
        q: 'How do the portals relate to the Base modules?',
        a: 'The portals are the outside face of Base records. The Vendor Portal works with Procure to Pay and Vendor Invoice Management, and the Distributor, Dealer and Retailer portals work with Order to Cash, Scheme and Rebate and Inventory, so partners see and act on the same data your teams do.',
      },
    ],
    seo: {
      title: 'MAVRO Portals: vendor, distributor, dealer and retailer portals',
      description: `The ${nPortal} MAVRO portals: Vendor, Distributor, Dealer and Retailer, self-service for suppliers and the sales channel on the same orders, stock and credit as your ERP.`,
    },
  },
  premium: {
    pack: 'premium',
    icon: 'rocket',
    hero: {
      title: 'Premium modules',
      rest: 'for the specialised work.',
      lead: `${nPremium} modules for the operations a core ERP leaves to spreadsheets: transport and warehousing, schemes and rebates, auctions, scheduling, audits, budgets, training and more.`,
      facts: [
        { value: String(nPremium), label: 'Premium modules' },
        { value: '6', label: 'Business areas' },
      ],
    },
    specific: {
      title: 'Every module,',
      rest: 'with its own space.',
      lead: 'Pick a module to see what it does and what its screen looks like. Each one runs on the same records as the base modules it sits beside.',
    },
    faq: [
      {
        q: 'What are MAVRO Premium modules?',
        a: `MAVRO Premium modules are ${nPremium} specialised modules for niche and industry-specific work, such as Transportation Management, Warehouse Management, Scheme and Rebate, PPDS, Auction and Bidding, Learning Management and Document Management. They add to the Base modules rather than replace them.`,
      },
      {
        q: 'Can I add Premium modules to the Base package later?',
        a: 'Yes. Premium modules read and write the same records as the Base modules, so one can be added when the need arises, such as Transportation Management when freight grows or Scheme and Rebate when trade schemes get complex.',
      },
      {
        q: 'Which Premium modules suit manufacturers?',
        a: 'Manufacturers commonly look at PPDS for detailed scheduling and MRP, Shop Floor Control for live OEE and downtime, Warehouse Management, Transportation Management, Auction and Bidding for sourcing, and Audit Management for CAPA closure.',
      },
      {
        q: 'Which Premium modules suit distributors?',
        a: 'Distribution-led businesses commonly look at Scheme and Rebate for slabs and claims, Transportation Management and Fleet Management for freight, Warehouse Management for batch and bin control, and Ecommerce Integration for marketplace orders.',
      },
    ],
    seo: {
      title: `MAVRO Premium modules: ${nPremium} specialised ERP modules`,
      description: `The ${nPremium} MAVRO Premium modules: transportation, warehouse, fleet, scheme and rebate, auctions, PPDS, shop floor control, audits, budgets, learning, contract labour, analytics and document management.`,
    },
  },
};

/** The nodes of the Base page's "one record" strip: stage label, then module slugs. Notes come from each module's flow. */
export const baseFlow = [
  { label: 'Sell', slugs: ['crm', 'sales-force-automation', 'order-to-cash'] },
  { label: 'Make and stock', slugs: ['production-management', 'inventory-management', 'gate-entry'] },
  { label: 'Buy and pay', slugs: ['procure-to-pay', 'vendor-invoice-management'] },
  { label: 'Account and people', slugs: ['accounting', 'hrms-and-payroll'] },
] as const;

export const baseFlowNote = 'Each stage passes its records to the next: the same customer, item and batch from the order to the ledger.';

/** The Platform overview (/platform). */
export const platformPage = {
  hero: {
    title: 'One platform.',
    rest: 'Every module.',
    lead: 'MAVRO is a Super ERP: base modules, portals and premium modules on one cloud-native platform, one set of records and one set of controls, with an app for the people who are not at a desk.',
    facts: [
      { value: String(nBase + nPortal + nPremium), label: 'Modules and portals' },
      { value: '3', label: 'Packages' },
    ],
  },
  architecture: {
    title: 'How it is built:',
    rest: 'five layers.',
    lead: 'From the screen to the data, every layer is shared by every module.',
  },
  features: {
    title: 'Built once,',
    rest: 'in every module.',
    lead: 'Controls and tools you would otherwise buy and integrate module by module.',
  },
  packages: {
    title: 'Three packages,',
    rest: 'one system.',
    lead: 'Base modules run the business, portals bring your vendors and channel into it, and premium modules cover the specialised work.',
  },
  mobile: {
    title: 'The app',
    rest: 'for people on the move.',
    lead: 'Orders, approvals and dashboards on Android, built to keep working without a signal. The screens below are from the app; the data is illustrative.',
    shots: [
      { name: 'platform/approvals', title: 'Approvals in one inbox', caption: 'Requisitions, SOPs, forecasts and purchases from different modules, approved from the phone.', alt: 'MAVRO mobile app approvals inbox: four approvals from four modules, a contract labour requisition, a document revision, a cost forecast and a purchase request, each with approve and reject buttons (illustrative data).' },
      { name: 'platform/manager-dashboard', title: 'The plant at a glance', caption: 'OEE, schedule adherence, deployment and what needs the plant head, live.', alt: 'MAVRO mobile app plant dashboard: OEE, schedule adherence, contract workers present, orders at risk, OEE by hour against target and two items needing attention (illustrative data).' },
      { name: 'platform/alerts', title: 'Alerts routed by role', caption: 'Push, email and in-app, to the person who has to act.', alt: 'MAVRO mobile app alerts: five notifications routed to a plant head, including a machine alarm, a blocked tool found in use, a shift shortfall, an expired gate pass and an auction closing (illustrative data).' },
      { name: 'platform/offline', title: 'Works without a signal', caption: 'Orders and visit notes are saved on the phone and sent in order when signal returns.', alt: 'MAVRO mobile app offline: a sales order saved on the phone with no signal, and three items queued to sync, the order, a visit note and a promise to pay (illustrative data).' },
    ],
  },
  integrations: {
    title: 'Connects to',
    rest: 'what you already run.',
    lead: 'REST APIs, webhooks and batch interfaces, with connectors for SAP and e-commerce channels. For SAP, Oracle, Tally or a legacy ERP you keep, MAVRO can run beside it.',
    items: [
      { icon: 'link', title: 'REST APIs', body: 'Read and write records from your own systems.' },
      { icon: 'bell', title: 'Webhooks', body: 'Events pushed to other systems as they happen.' },
      { icon: 'database', title: 'Batch interfaces', body: 'Scheduled loads and extracts for bulk data.' },
      { icon: 'workflow', title: 'SAP BAPI', body: 'Standard SAP interfaces for ERP data.' },
      { icon: 'layers', title: 'SAP Business One', body: 'Flows for Business One customers.' },
      { icon: 'sales', title: 'E-commerce', body: 'Marketplace and storefront orders and returns.' },
    ] satisfies { icon: IconName; title: string; body: string }[],
    erp: 'Running SAP, Oracle or Tally? See ERP Connect',
    security: 'How MAVRO protects your data',
  },
  faq: [
    {
      q: 'What is the MAVRO platform?',
      a: 'The MAVRO platform is the shared base under every module: a cloud-native, multi-tenant, API-first architecture with a workflow and rules engine, audit trail, notifications, role-based access and integration APIs. Base modules, portals and premium modules all run on it and share one set of records.',
    },
    {
      q: 'Is MAVRO cloud-based?',
      a: 'Yes. MAVRO is cloud-native and multi-tenant, with a web portal, an Android and iOS app, an admin panel and API access, on MS SQL Server with Redis caching, daily backups and disaster recovery.',
    },
    {
      q: 'Does MAVRO have a mobile app?',
      a: 'Yes. The MAVRO mobile app handles orders, approvals and dashboards on Android, can work offline, and sends push alerts routed by role. Field teams can capture orders and visits without a signal and sync later.',
    },
    {
      q: 'Can MAVRO connect to other systems?',
      a: 'Yes. MAVRO offers REST APIs, webhooks and batch interfaces, SAP BAPI and SAP Business One integration, and e-commerce connectors. ERP Connect also lets MAVRO run alongside SAP, Oracle, Tally or a legacy ERP.',
    },
  ],
  seo: {
    title: 'MAVRO platform: one cloud ERP for finance, supply chain, plants and the channel',
    description: `The MAVRO platform: ${nBase + nPortal + nPremium} base, portal and premium modules on one cloud-native architecture with workflow and rules engine, audit trail, role-based access, a mobile app and integration APIs.`,
  },
};

export const packNames = { base: packs.base.name, portal: packs.portal.name, premium: packs.premium.name };
