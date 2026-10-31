/*
 * The industry pages (/industries/<slug>, SITE-PLAN.md section 3.5), one template (src/pages/IndustryPage.tsx).
 * The headline, points, who it is for, the order flow's stage labels and the first modules come from the homepage
 * card (`industries.list` in home.ts), so the card and its page never drift; this file holds what only the page has.
 *
 * Sources: Manufacturing, the product deck (slides 2–3: who it is for, the three gaps) and the module pages;
 * Pharma, the Healthcare Manufacturing deck (slides 2–3, 7 and 26–28) and the product deck's Production Management
 * page (slide 34: batch records against the GMP master, QC release). Left out on purpose: the deck's customer and
 * reach claims ("trusted by major automotive OEMs", "60+ countries"), its before/after figures and outcome slides,
 * and any certification the decks do not state.
 */
import type { IconName } from '../components/Icon';
import type { IndustrySlug } from './home';
import type { ModuleSlug } from './modules';

export interface IndustryContent {
  slug: IndustrySlug;
  seo: { title: string; description: string };
  hero: { lead: string; facts: { value: string; label: string }[] };
  /** The hero's screens: the industry's own screen, optionally a module screen behind it and a phone in front. */
  screens: {
    lead: { screen: `industries/${string}`; alt: string };
    behind?: { screen: `${ModuleSlug}/${string}` };
    phone?: { screen: `industries/${string}` | `platform/${string}` | `${ModuleSlug}/${string}`; alt: string };
  };
  gaps: { title: string; rest: string; lead: string; items: { icon: IconName; title: string; tag: string; points: string[] }[] };
  /** The module each flow stage opens, by its label in the homepage card (core and middle stages alike). */
  flow: { title: string; rest: string; lead: string; links: Record<string, ModuleSlug>; note: string };
  /** Modules after the homepage card's, to make eight cards (two rows of four). */
  modules: { title: string; rest: string; lead: string; more: ModuleSlug[] };
  compliance: { title: string; rest: string; lead: string; items: { icon: IconName; title: string; body: string }[] };
  /** Indexes into the homepage customer stories (`proof.stories`) that match this industry; none, no section. */
  stories: number[];
  faq: { q: string; a: string }[];
}

export const industryTemplate = {
  demo: 'Request a demo',
  flowLink: 'See the order flow',
  /** The order flow's four groups: shared, configured, configured, shared. */
  stages: ['Take the order', 'In between, configured', 'Deliver', 'Get paid'],
  legend: { shared: 'The same in every industry', configured: `Configured for this industry` },
  modulesMore: 'See the module',
  storiesTitle: { title: 'What clients', rest: 'changed with MAVRO.' },
  storiesLead: 'Recent projects delivered by SaiSatwik Technologies. Clients are anonymised; the results are verified.',
  faq: { title: 'Questions about MAVRO for', lead: 'Answers from the product decks.' },
  cta: { title: 'See MAVRO', rest: 'run your process.', body: 'A demo built around your own documents, approvals and plants, and a 25–30 day plan to go live.' },
};

export const industryContent: IndustryContent[] = [
  {
    slug: 'manufacturing',
    seo: {
      title: 'ERP for manufacturers: OEM and multi-line plants | MAVRO',
      description:
        'MAVRO for OEM suppliers and multi-line plants: work orders, BOM and routing, live OEE and WIP by shift across plants, vendor portal and three-way matched buying, statutory payroll and GST built in.',
    },
    hero: {
      lead: 'For OEM suppliers and multi-line plants running at scale: production, shop floor, buying, stock, payroll and finance on one system, live by shift and by plant, with Indian compliance built in.',
      facts: [
        { value: 'By shift', label: 'OEE, WIP and output, live' },
        { value: 'Multi-plant', label: 'Multi-entity books' },
        { value: '25–30 days', label: 'Phased implementation' },
      ],
    },
    screens: {
      lead: {
        screen: 'industries/manufacturing-plants',
        alt: 'MAVRO Production Management across three plants: OEE, output and orders at risk per plant, every OEM and aftermarket line with its OEE and status, and the OEM orders due this week (illustrative data).',
      },
      behind: { screen: 'shop-floor-control/live-board' },
      phone: {
        screen: 'platform/approvals',
        alt: 'The plant head’s approvals on the phone: a contract labour request, an SOP revision, a cost reforecast and a spare-part requisition from four modules in one inbox (illustrative data).',
      },
    },
    gaps: {
      title: 'Where a core ERP',
      rest: 'leaves a plant short.',
      lead: 'A core ERP handles finance and procurement, but HR, production and channel fall back to manual workarounds.',
      items: [
        {
          icon: 'people',
          title: 'HR and payroll',
          tag: 'Statutory payroll needs a partner add-on',
          points: ['Payroll not linked to the GL: manual journals', 'Attendance reconciled as a monthly patch', 'PF and TDS filed from separate spreadsheets'],
        },
        {
          icon: 'production',
          title: 'Production and operations',
          tag: 'No real-time shop-floor visibility',
          points: ['Production updated once a day: shift gaps invisible', 'No WIP by shift or live OEE tracking', 'Inventory across disconnected files'],
        },
        {
          icon: 'distribution',
          title: 'Channel and vendors',
          tag: 'No native retailer app or vendor portal',
          points: ['Vendor POs by phone: no digital audit trail', 'Dealer orders on WhatsApp: no live order book', 'No scheme enforcement or confirmation trail'],
        },
      ],
    },
    flow: {
      title: 'Your order flow,',
      rest: 'configured for the plant.',
      lead: 'Every business takes an order and gets paid. In a plant, the middle is planning, BOM and routing, production and quality, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        Planning: 'ppds',
        'BOM and routing': 'production-management',
        Production: 'shop-floor-control',
        Quality: 'production-management',
        Dispatch: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One work order from planning to dispatch, traced by lot and heat number.',
    },
    modules: {
      title: 'The modules',
      rest: 'a plant runs on.',
      lead: 'Each has its own page, with its screens and what it does.',
      more: ['ppds', 'vendor-invoice-management', 'accounting'],
    },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: 'Indian statutory requirements handled in the modules that create the records, not in spreadsheets afterwards.',
      items: [
        { icon: 'receipt', title: 'GST at every touchpoint', body: 'Auto e-invoicing; GSTR-1, GSTR-3B and ITC generated; GSTR-2B reconciled against vendor invoices.' },
        { icon: 'transport', title: 'E-way bills on every movement', body: 'Transportation Management keeps e-way bill and insurance compliance on every shipment.' },
        { icon: 'people', title: 'Statutory payroll', body: 'PF, ESI, TDS and PT in HRMS and Payroll, with attendance synced and payroll posted to the GL.' },
        { icon: 'shield', title: 'Contract labour', body: 'CLRA, PF, ESIC and wage evidence checked before a contractor bill is certified.' },
        { icon: 'gate', title: 'Gate and weighbridge', body: 'Inward and outward against the PO, weighbridge integration and a security audit trail at the gate.' },
        { icon: 'eye', title: 'Audit trail', body: 'Every transaction logged with who, when and which device; vendors verified by GSTIN and PAN on onboarding.' },
      ],
    },
    stories: [1, 2],
    faq: [
      {
        q: 'Is MAVRO built for manufacturing companies?',
        a: 'Yes. MAVRO is built for manufacturing and distribution businesses running at scale: multi-line, high-volume and multi-entity. It covers production, shop floor, procurement, inventory, HR and payroll, channel and finance on one platform, with Indian compliance built in.',
      },
      {
        q: 'Can MAVRO show OEE and WIP live by shift?',
        a: 'Yes. Production Management and Shop Floor Control track output, downtime and OEE by line and shift across plants, with planned against actual output and WIP visible as the shift runs, not once a day.',
      },
      {
        q: 'Does MAVRO handle both OEM and aftermarket production?',
        a: 'Yes. Work orders, BOM and routing cover OEM and aftermarket lines, PPDS schedules them on the lines, and the order book shows which customer order each work order serves.',
      },
      {
        q: 'How does MAVRO work with a large supplier base?',
        a: 'Suppliers onboard and transact through the Vendor Portal, purchases run through Procure to Pay, and Vendor Invoice Management matches every invoice three ways against the PO and the goods receipt before it is approved.',
      },
      {
        q: 'Does MAVRO include Indian statutory payroll?',
        a: 'Yes. HRMS and Payroll handles PF, ESI, TDS and PT natively, with attendance synced to payroll and payroll posted to the GL, so no partner add-on is needed.',
      },
      {
        q: 'Can MAVRO run alongside SAP or another ERP?',
        a: 'Yes. With ERP Connect, MAVRO syncs two ways with SAP, Oracle, Tally or a legacy ERP through the MAVRO Database, so a plant can add shop-floor, portal or logistics modules without replacing its ERP.',
      },
    ],
  },
  {
    slug: 'pharma',
    seo: {
      title: 'ERP for pharma and healthcare manufacturers | MAVRO',
      description:
        'MAVRO for pharma and healthcare manufacturers: batch records against the GMP master, QC release, batch, lot and expiry traceability, FEFO warehousing, vendor audits and compliance, on one platform.',
    },
    hero: {
      lead: 'For healthcare manufacturers with a broad portfolio, batch-controlled production and a stockist network: production, quality, stock, purchasing, sales and finance in one system, with batch traceability built in.',
      facts: [
        { value: 'Batch trace', label: 'Supplier to customer' },
        { value: 'FEFO', label: 'Picking and expiry alerts' },
        { value: '25–30 days', label: 'Phased implementation' },
      ],
    },
    screens: {
      lead: {
        screen: 'industries/pharma-batch-record',
        alt: 'A MAVRO batch record for a tablet batch: eight stages signed by production and verified by QA in sequence, yields against limits, in-process checks, a hold-time clock and an open deviation attached to the batch; coating and packing locked (illustrative data).',
      },
      phone: {
        screen: 'industries/pharma-qc-release',
        alt: 'QC release on the phone: a batch with every stage verified, assay, dissolution and certificate of analysis passed, released from quarantine to the finished-goods store (illustrative data).',
      },
    },
    gaps: {
      title: 'Where a core ERP',
      rest: 'leaves quality on paper.',
      lead: 'A core ERP runs finance and purchasing. Production, quality and traceability fall back to manual work.',
      items: [
        {
          icon: 'quality',
          title: 'Quality',
          tag: 'Batch and quality records live outside the ERP',
          points: ['Batch-to-customer trace done by hand', 'QC status not linked to stock release', 'Vendor audits and CAPAs on email'],
        },
        {
          icon: 'production',
          title: 'Production and operations',
          tag: 'No real-time shop-floor visibility',
          points: ['Production updated once a day: shift gaps invisible', 'No WIP by shift or live OEE tracking', 'Inventory across disconnected files'],
        },
        {
          icon: 'distribution',
          title: 'Stockists and vendors',
          tag: 'No live stockist or vendor visibility',
          points: ['Vendor POs by phone: no digital audit trail', 'Stockist orders on WhatsApp: no live order book', 'Near-expiry stock spotted too late'],
        },
      ],
    },
    flow: {
      title: 'Your order flow,',
      rest: 'configured for GMP.',
      lead: 'Every business takes an order and gets paid. In pharma, the middle is batch planning, manufacturing and QA release, with every batch traced from supplier to customer.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        'Batch planning': 'ppds',
        Manufacturing: 'production-management',
        'QA release': 'production-management',
        Dispatch: 'warehouse-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One batch record from planning to dispatch, traced by batch and expiry.',
    },
    modules: {
      title: 'The modules',
      rest: 'a GMP plant runs on.',
      lead: 'Each has its own page, with its screens and what it does.',
      more: ['ppds', 'warehouse-management', 'mvlens-vendor-audit', 'vendor-portal'],
    },
    compliance: {
      title: 'Quality and compliance,',
      rest: 'in the record itself.',
      lead: 'The controls a regulated plant needs are part of the batch record, the release and the warehouse, not a register kept beside them.',
      items: [
        { icon: 'quality', title: 'Batch records against the GMP master', body: 'Stage-wise sign-off and yields; stages cannot be signed out of sequence or without QA verification.' },
        { icon: 'check', title: 'QC release', body: 'A sample queue with OOS and hold-period control; no batch reaches the FG store without CoA, assay and dissolution clearance.' },
        { icon: 'bell', title: 'Hold times and deviations', body: 'Hold-time limits tracked live with escalation before a breach; deviations and OOS stay attached to the batch until closed.' },
        { icon: 'inventory', title: 'Batch, lot and expiry', body: 'Tracked on every movement, from supplier to customer, with FEFO picking, expiry alerts and batch-wise dispatch on invoices.' },
        { icon: 'warehouse', title: 'Quarantine and cold rooms', body: 'Warehouse Management controls quarantine and cold rooms in support of GDP compliance, with FEFO enforced at allocation.' },
        { icon: 'shield', title: 'Vendors, audits and CAPA', body: 'A compliance vault with expiry-tracked GST, licences and GMP certificates; vendor audits and CAPA in mVLens; an audit trail on every transaction.' },
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for pharma manufacturers?',
        a: 'MAVRO is built for healthcare manufacturers with batch-controlled production: pharma, medical devices, nutraceuticals and OTC, and distribution-led businesses. Production, quality, stock, purchasing, sales and finance run on one system with batch traceability built in.',
      },
      {
        q: 'Does MAVRO have electronic batch records?',
        a: 'Yes. Production Management keeps batch records against the GMP master, with stage-wise sign-off and yield capture. Stages cannot be signed out of sequence or without QA verification, and hold-time limits are tracked live.',
      },
      {
        q: 'How does QC release work in MAVRO?',
        a: 'Samples go to a QC release queue with OOS and hold-period control. Deviations and OOS investigations stay attached to the batch until closed, and no batch reaches the finished-goods store without CoA, assay and dissolution clearance.',
      },
      {
        q: 'Can MAVRO trace a batch from supplier to customer?',
        a: 'Yes. Batch, lot and serial numbers and expiry are tracked on every movement, invoices carry batch-wise dispatch, and the trail runs from the supplier’s receipt to the customer, in the system rather than in registers.',
      },
      {
        q: 'How does MAVRO handle expiry and near-expiry stock?',
        a: 'Inventory and Warehouse Management enforce FEFO at allocation, so near-expiry batches are picked first, and raise expiry alerts, so stock is dispatched before it has to be written off.',
      },
      {
        q: 'How are vendors and their certificates managed?',
        a: 'The Vendor Portal keeps a compliance vault with expiry-tracked GST, licences and GMP certificates, flags expiring documents ahead and blocks non-compliant vendors from POs. Vendor audits and CAPA run in mVLens Vendor Audit.',
      },
    ],
  },
  {
    slug: 'distribution',
    seo: {
      title: 'ERP for distribution: dealer, distributor and retail networks | MAVRO',
      description:
        'MAVRO for distribution-led businesses: one order book for distributors, dealers and retailers, schemes and rebates checked at order entry, field sales on mobile, portals for every level of the channel, and GST e-invoicing built in.',
    },
    hero: {
      lead: 'For businesses that sell through dealers, distributors and retailers: the field force, schemes, orders, warehouse and every level of the channel on one order book, with GST built in.',
      facts: [
        { value: 'One order book', label: 'Distributor to retailer' },
        { value: 'At order entry', label: 'Schemes and credit checked' },
        { value: '25–30 days', label: 'Phased implementation' },
      ],
    },
    screens: {
      lead: {
        screen: 'industries/distribution-channel',
        alt: 'MAVRO channel sales for the festive season: distributor purchases and secondary orders, distributors, dealers and retailers, each distributor’s progress to the next scheme slab, credit used and claims, with scheme budgets and what needs attention (illustrative data).',
      },
      behind: { screen: 'scheme-and-rebate/slab-builder' },
      phone: {
        screen: 'sales-force-automation/call-report',
        alt: 'A field rep’s call report on the phone at a dealer: checked in at the outlet, a secondary order with the festive slab discount applied (illustrative data).',
      },
    },
    gaps: {
      title: 'Where a core ERP',
      rest: 'loses the channel.',
      lead: 'A core ERP handles finance and procurement, but the channel falls back to phone calls, WhatsApp and add-ons from other partners.',
      items: [
        {
          icon: 'distribution',
          title: 'Channel and vendors',
          tag: 'No native retailer or vendor portal',
          points: ['Dealer orders on WhatsApp: no live order book', 'No scheme enforcement or confirmation trail', 'Vendor POs by phone: no digital audit trail'],
        },
        {
          icon: 'layers',
          title: 'Missing modules',
          tag: 'Retailer app and vendor portal not native',
          points: ['Mobile and portals bought as add-ons', 'Statutory payroll needs a partner add-on', 'Several partners: fragmented support'],
        },
        {
          icon: 'receipt',
          title: 'Cost and upgrades',
          tag: 'Heavy maintenance cost',
          points: ['Licence and maintenance fees rise every renewal', 'Cost grows without added capability', 'End-of-life versions force another migration'],
        },
      ],
    },
    flow: {
      title: 'Your order flow,',
      rest: 'configured for the channel.',
      lead: 'Every business takes an order and gets paid. In distribution, the middle is the scheme check, allocation, picking and the ship confirmation, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        'Scheme check': 'scheme-and-rebate',
        Allocation: 'order-to-cash',
        Picking: 'warehouse-management',
        'Ship confirm': 'warehouse-management',
        Delivery: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One sales order from the scheme check to delivery, traced by batch and serial.',
    },
    modules: {
      title: 'The modules',
      rest: 'a channel runs on.',
      lead: 'Each has its own page, with its screens and what it does.',
      more: ['sales-force-automation', 'dealer-portal', 'transportation-management'],
    },
    compliance: {
      title: 'Compliance and control,',
      rest: 'at the order, not after it.',
      lead: 'GST, e-way bills, schemes and credit are checked where the order is entered and the goods move.',
      items: [
        { icon: 'receipt', title: 'GST e-invoicing', body: 'Auto e-invoicing at every touchpoint, with e-invoice and place-of-supply eligibility checked before posting; GSTR-1 and GSTR-3B generated.' },
        { icon: 'transport', title: 'E-way bills on every movement', body: 'Transportation Management keeps e-way bill and insurance compliance on every shipment, through to proof of delivery.' },
        { icon: 'scheme', title: 'Schemes checked at order entry', body: 'Distributor, dealer and retailer schemes applied as orders are entered, with accruals tracked against settlements.' },
        { icon: 'claims', title: 'Claims and credit notes', body: 'Every claim checked against its scheme, the bills behind it and earlier claims before a credit note is raised.' },
        { icon: 'finance', title: 'Credit exposure', body: 'Credit checked as the order is entered; credit-blocked orders route to the right releaser instead of stalling.' },
        { icon: 'inventory', title: 'Batch, serial and shelf life', body: 'Allocation respects batch and shelf life, so short-dated stock is caught at allocation, not at the distributor’s dock.' },
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO built for distribution businesses?',
        a: 'Yes. MAVRO is built for distribution-led businesses with large dealer, distributor and retailer networks: field sales, schemes, orders, warehouse, transport and the portals for every level of the channel run on one order book.',
      },
      {
        q: 'How does MAVRO handle trade schemes and rebates?',
        a: 'Scheme and Rebate builds distributor, dealer and retailer schemes with slabs and budgets, applies them as orders are entered in Order to Cash, tracks accruals against settlements and clears verified claims through credit notes.',
      },
      {
        q: 'Can distributors, dealers and retailers order themselves?',
        a: 'Yes. The Distributor, Dealer and Retailer portals let each level of the channel place orders and see its schemes and offers, and every order lands in the same order book as the orders booked by your field reps.',
      },
      {
        q: 'Does MAVRO work for field sales teams?',
        a: 'Yes. Sales Force Automation gives reps GPS beat plans, visit logs and mobile order booking that works offline, with targets against achievement in view.',
      },
      {
        q: 'How does MAVRO manage credit across the channel?',
        a: 'Order to Cash checks credit exposure as each order is entered, routes credit-blocked orders to the right person to release, and runs collections and dunning by invoice ageing.',
      },
      {
        q: 'Does MAVRO handle GST e-invoicing and e-way bills?',
        a: 'Yes. Invoices are GST-compliant with e-invoicing built in, and Transportation Management keeps e-way bill compliance on every shipment.',
      },
    ],
  },
  {
    slug: 'service-providers',
    seo: {
      title: 'ERP for service providers and IT companies | MAVRO',
      description:
        'MAVRO for IT companies and professional services: client projects against budget, schedule and change requests, time cards, attendance and payroll with PF, ESI, PT and TDS, travel and expense claims checked against policy, and billing.',
    },
    hero: {
      lead: 'For IT companies and professional services: client projects, the people on them and what they cost on one system, from the time card to payroll and from the milestone to the invoice.',
      facts: [
        { value: 'Time card to payroll', label: 'One verified feed' },
        { value: 'PF, ESI, PT, TDS', label: 'Statutory payroll, built in' },
        { value: '25–30 days', label: 'Phased implementation' },
      ],
    },
    screens: {
      lead: {
        screen: 'industries/services-project',
        alt: 'A client project in MAVRO: milestones billed on sign-off, progress and status, the people on it and their hours, and costs from time cards and expense claims against budget (illustrative data).',
      },
      phone: {
        screen: 'industries/services-time-card',
        alt: 'A developer’s time card on the phone: the day’s hours logged against projects and tasks, the week so far, ready to submit (illustrative data).',
      },
    },
    gaps: {
      title: 'Where spreadsheets',
      rest: 'leave a growing team short.',
      lead: 'Registers and spreadsheets handle the basics, but attendance, payroll and leave fall back to manual workarounds.',
      items: [
        {
          icon: 'calendar',
          title: 'Attendance and payroll',
          tag: 'Attendance and payroll disconnected',
          points: ['Muster reconciled by hand', 'Attendance not linked to payroll runs', 'Loss of pay and overtime computed manually'],
        },
        {
          icon: 'rules',
          title: 'Leave and policy',
          tag: 'Leave tracked in spreadsheets',
          points: ['Leave balances kept in spreadsheets', 'Approvals by email: no audit trail', 'Encashment and carry-forward done by hand'],
        },
        {
          icon: 'phone',
          title: 'Employee self-service',
          tag: 'No self-service for the team',
          points: ['HR flooded with payslip and balance queries', 'Approvals stall when managers are away', 'No mobile self-service for people on site'],
        },
      ],
    },
    flow: {
      title: 'Your order flow,',
      rest: 'configured for projects.',
      lead: 'Every business takes an order and gets paid. For a service provider, the middle is scope, resourcing, delivery and sign-off, with the people and their hours on the project.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        Scope: 'project-management',
        Resourcing: 'hrms-and-payroll',
        Delivery: 'project-management',
        'Sign-off': 'project-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One project from scope to handover, traced by milestone and time card.',
    },
    modules: {
      title: 'The modules',
      rest: 'a services firm runs on.',
      lead: 'Each has its own page, with its screens and what it does.',
      more: ['travel-and-expense', 'crm', 'document-management', 'learning-management'],
    },
    compliance: {
      title: 'Payroll, tax and policy,',
      rest: 'computed inside MAVRO.',
      lead: 'Indian statutory payroll is built in, not bolted on: every computation and filing happens inside the platform.',
      items: [
        { icon: 'people', title: 'PF and ESI', body: 'Contributions computed with the ECR challan ready every month; ESI eligibility, deductions and returns handled automatically.' },
        { icon: 'receipt', title: 'TDS, Form 16 and 24Q', body: 'Monthly TDS computed, Form 16 generated in the app, and declarations carried through Form 12BB to the quarterly 24Q return.' },
        { icon: 'rules', title: 'Professional tax and gratuity', body: 'State-wise PT slabs applied without manual lookup; gratuity accrued and paid as per the Gratuity Act.' },
        { icon: 'finance', title: 'GST e-invoicing for services', body: 'GST-compliant invoicing with e-invoicing built in, and contractor payments tracked GST-compliant.' },
        { icon: 'travel', title: 'Travel policy', body: 'Trips checked against grade entitlements before anyone books; missing receipts and GST-invalid claims held out of the payment run.' },
        { icon: 'calendar', title: 'Leave and attendance', body: 'Approvals with an audit trail, regional holiday calendars, and a payroll cut-off that turns late regularisations into arrears.' },
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for IT and professional services companies?',
        a: 'Yes. Service providers run client projects, time cards, attendance and payroll, travel and expenses, and billing on MAVRO, with projects tracked against budget, schedule and change requests.',
      },
      {
        q: 'Can employees log time against projects?',
        a: 'Yes. The daily time card logs hours against projects, tasks and locations, and the approved hours cost the project and reach attendance and payroll as one feed.',
      },
      {
        q: 'Does MAVRO handle Indian statutory payroll?',
        a: 'Yes. PF, ESI, professional tax, TDS with Form 16, gratuity and LTA are computed and filed from within MAVRO, with statutory rates updated centrally and each employee choosing the old or new tax regime per financial year.',
      },
      {
        q: 'How are travel and expense claims controlled?',
        a: 'Travel and Expense checks trips against grade entitlements and negotiated rates before booking, flags out-of-policy claims, holds missing receipts and GST-invalid claims out of the payment run, and settles by bank transfer or in payroll.',
      },
      {
        q: 'Can MAVRO track project budgets and change requests?',
        a: 'Yes. Project Management tracks each project against its approved baseline for budget and schedule, keeps a milestone plan with owners, and sends change requests with their cost and time impact for approval.',
      },
      {
        q: 'Is there employee self-service on mobile?',
        a: 'Yes. Employees apply for leave, see balances and payslips, log time and submit expense claims from the MAVRO app, and managers approve from their phone.',
      },
    ],
  },
];

export const contentFor = (slug: IndustrySlug) => industryContent.find((content) => content.slug === slug);
