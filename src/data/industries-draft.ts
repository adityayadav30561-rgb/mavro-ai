/*
 * Draft industry pages (D1, 2026-11-09). The user asked for a page for every industry the site names and said:
 * "invent the claims, we will remove and add real things once we are ready to launch the site". So each page
 * below is marked `draft` and stays noindex and out of the sitemap until it is replaced with real material.
 *
 * What is grounded: every capability line names what a MAVRO module does on its own module page (src/data/modules/
 * content/<slug>.ts), and every screen is that module's own illustrative screen with its own alt text.
 * What is invented: the industry framing, the three gaps, the hero facts and the FAQ wording.
 * Never invented, even here: figures, customer names or results, testimonials, certifications, or a claim that
 * MAVRO meets a named regulation the decks do not state.
 */
import type { IconName } from '../components/Icon';
import type { ScreenName } from '../components/Screen';
import type { IndustryContent } from './industries';
import { moduleContent, type ModuleSlug } from './modules';

const DRAFT = 'Industry framing, gaps, hero facts and FAQ written before launch; capabilities from the module pages.';

/** A module's own screen with its own alt text, so a reused screen never gets a new description. */
function shot(name: ScreenName): { screen: ScreenName; alt: string } {
  const [slug] = name.split('/') as [ModuleSlug];
  const content = moduleContent[slug];
  const found = content && [...content.screens, ...(content.phone ? [content.phone] : [])].find((s) => s.screen === name);
  if (!found) throw new Error(`industries-draft: no module screen "${name}"`);
  return { screen: found.screen, alt: found.alt };
}

/** Compliance tiles shared by most industries (the same wording as the manufacturing page, from the deck). */
const c = {
  gst: { icon: 'receipt', title: 'GST at every touchpoint', body: 'Auto e-invoicing; GSTR-1, GSTR-3B and ITC generated; GSTR-2B reconciled against vendor invoices.' },
  eway: { icon: 'transport', title: 'E-way bills on every movement', body: 'Transportation Management keeps e-way bill and insurance compliance on every shipment.' },
  payroll: { icon: 'people', title: 'Statutory payroll', body: 'PF, ESI, TDS and PT in HRMS and Payroll, with attendance synced and payroll posted to the GL.' },
  labour: { icon: 'shield', title: 'Contract labour', body: 'CLRA, PF, ESIC and wage evidence checked before a contractor bill is certified.' },
  gate: { icon: 'gate', title: 'Gate and weighbridge', body: 'Inward and outward against the PO, weighbridge integration and a security audit trail at the gate.' },
  audit: { icon: 'eye', title: 'Audit trail', body: 'Every transaction logged with who, when and which device; vendors verified by GSTIN and PAN on onboarding.' },
} satisfies Record<string, { icon: IconName; title: string; body: string }>;

const facts = (a: [string, string], b: [string, string]) => [
  { value: a[0], label: a[1] },
  { value: b[0], label: b[1] },
  { value: '25–30 days', label: 'Phased implementation' },
];

const flowTitle = 'Your order flow,';
const modulesLead = 'Each has its own page, with its screens and what it does.';
const complianceLead = 'Indian statutory requirements handled in the modules that create the records, not in spreadsheets afterwards.';
const connectFaq = (who: string) => ({
  q: 'Can MAVRO run alongside Tally, SAP or another ERP?',
  a: `Yes. With ERP Connect, MAVRO syncs two ways with SAP, Oracle, Tally or a legacy ERP through the MAVRO Database, so ${who} can add modules without replacing the system the accounts team already uses.`,
});

export const draftIndustries: IndustryContent[] = [
  {
    slug: 'printing-packaging',
    draft: DRAFT,
    seo: {
      title: 'ERP for printing and packaging companies | MAVRO',
      description:
        'MAVRO for commercial printers and packaging converters: job cards with BOM and routing, press scheduling by machine and shift, live output and downtime, paper and board stock by lot, GST and payroll built in.',
    },
    hero: {
      lead: 'For commercial printers and packaging converters: estimates, job cards, press schedules, paper and board stock, dispatch and billing on one system, so every job is costed and every press is planned.',
      facts: facts(['Job-wise', 'Costing on every job card'], ['By machine', 'Press schedules and downtime']),
    },
    screens: {
      lead: shot('ppds/line-schedule'),
      behind: { screen: 'shop-floor-control/scheduling-board' },
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a print shop short.',
      lead: 'Accounting software records the invoice, but the job itself, from prepress to the last carton, runs on whiteboards and phone calls.',
      items: [
        {
          icon: 'production',
          title: 'Jobs and presses',
          tag: 'Schedules live on a whiteboard',
          points: ['Press loading planned by memory', 'Make-ready and downtime never recorded', 'Rush jobs reshuffle the day without a trace'],
        },
        {
          icon: 'inventory',
          title: 'Paper and board',
          tag: 'Stock known only after a count',
          points: ['Board short discovered on the day of the run', 'Wastage not booked against the job', 'Offcuts and reels untracked across stores'],
        },
        {
          icon: 'finance',
          title: 'Job costing',
          tag: 'Margin found after the job ships',
          points: ['Estimates and actuals in different files', 'Plates, ink and press hours not costed per job', 'Reprints absorbed without a record'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured for the press room.',
      lead: 'Every business takes an order and gets paid. In a print shop, the middle is job planning, prepress, the press run and finishing, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        'Job planning': 'ppds',
        Prepress: 'production-management',
        'Press run': 'shop-floor-control',
        Finishing: 'production-management',
        Dispatch: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One job card from estimate to dispatch, traced by job and lot number.',
    },
    modules: { title: 'The modules', rest: 'a print shop runs on.', lead: modulesLead, more: ['procure-to-pay', 'hrms-and-payroll', 'accounting'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [c.gst, c.eway, c.payroll, c.labour, c.gate, c.audit],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for printing and packaging companies?',
        a: 'Yes. Printers and packaging converters run job cards with BOM and routing, press schedules, paper and board stock, dispatch and billing on MAVRO, with GST and payroll built in.',
      },
      {
        q: 'Can MAVRO schedule jobs across presses?',
        a: 'Yes. PPDS schedules jobs on each machine and shift against capacity, and Shop Floor Control shows live output, downtime and WIP as the shift runs, so a rush job can be slotted in with its effect on the rest of the day in view.',
      },
      {
        q: 'Does MAVRO cost each print job?',
        a: 'Yes. Each job card carries its BOM (board, ink, plates) and routing (press and finishing time), and material issued and hours booked against the job give its actual cost next to the estimate.',
      },
      {
        q: 'How is paper and board stock tracked?',
        a: 'Inventory Management tracks every reel and sheet lot across stores with reorder levels, so material is bought before a job runs short and wastage is booked against the job that used it.',
      },
      connectFaq('a print shop'),
    ],
  },

  {
    slug: 'retail-ecommerce',
    draft: DRAFT,
    seo: {
      title: 'ERP for retail and ecommerce businesses | MAVRO',
      description:
        'MAVRO for retail chains, D2C brands and marketplace sellers: marketplace and webstore orders and returns in one order book, stock by store and warehouse, barcode picking, a retailer app, GST built in.',
    },
    hero: {
      lead: 'For retail chains, D2C brands and marketplace sellers: every channel’s orders and returns, stock by store and warehouse, picking and dispatch, and the books, on one system.',
      facts: facts(['One order book', 'Marketplaces, webstore and stores'], ['By barcode', 'Pick, pack and ship']),
    },
    screens: {
      lead: shot('ecommerce-integration/channel-dashboard'),
      behind: { screen: 'warehouse-management/pick-dispatch' },
      phone: shot('retailer-portal/basket'),
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a retailer short.',
      lead: 'Each marketplace has its own seller panel, the stores have their billing software, and the warehouse works from printouts.',
      items: [
        {
          icon: 'link',
          title: 'Channels',
          tag: 'One login per marketplace',
          points: ['Orders keyed in from each seller panel', 'Listings and prices drift between channels', 'Returns reconciled weeks later'],
        },
        {
          icon: 'inventory',
          title: 'Stock',
          tag: 'Overselling and dead stock at once',
          points: ['Store and warehouse stock in separate systems', 'Channel stock updated once a day', 'Transfers between stores on paper'],
        },
        {
          icon: 'warehouse',
          title: 'Fulfilment',
          tag: 'Picking from printouts',
          points: ['Wrong-item shipments found on return', 'No scan at pack or dispatch', 'Courier status checked by hand'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured for every channel.',
      lead: 'Every business takes an order and gets paid. In retail, the middle is channel sync, allocation, pick and pack and shipping, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        'Channel sync': 'ecommerce-integration',
        Allocation: 'inventory-management',
        'Pick and pack': 'warehouse-management',
        Ship: 'transportation-management',
        Delivery: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One customer order from any channel to delivery, traced by SKU and batch.',
    },
    modules: { title: 'The modules', rest: 'a retailer runs on.', lead: modulesLead, more: ['customer-service', 'scheme-and-rebate', 'accounting'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [
        c.gst,
        c.eway,
        c.payroll,
        { icon: 'claims', title: 'Returns with a trail', body: 'Marketplace returns and refunds posted against the original order, so stock and GST reverse together.' },
        { icon: 'scheme', title: 'Offers on the record', body: 'Schemes and loyalty applied at order entry and accrued in the books, not settled from a spreadsheet.' },
        c.audit,
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for retail and ecommerce businesses?',
        a: 'Yes. Retail chains, D2C brands and marketplace sellers run channel orders and returns, stock by store and warehouse, picking, dispatch and accounting on MAVRO, with GST built in.',
      },
      {
        q: 'Can MAVRO pull orders from marketplaces and a webstore?',
        a: 'Yes. Ecommerce Integration connects marketplaces and a webstore, brings their orders and returns into one order book and keeps listings, prices and stock in sync across channels.',
      },
      {
        q: 'Does MAVRO track stock by store and warehouse?',
        a: 'Yes. Inventory Management tracks stock by location, batch and serial, and Warehouse Management runs bin putaway, barcode picking and dispatch, so every channel sells from the same stock figure.',
      },
      {
        q: 'Is there an app for retailers to order?',
        a: 'Yes. The Retailer Portal lets retailers order, see offers and loyalty points and raise returns from their phone, with the order landing in the same order book.',
      },
      connectFaq('a retailer'),
    ],
  },

  {
    slug: 'logistics',
    draft: DRAFT,
    seo: {
      title: 'ERP for logistics, transport and 3PL companies | MAVRO',
      description:
        'MAVRO for transporters, 3PLs and warehousing companies: loads and lanes, shipment tracking to proof of delivery, fleet, trips, fuel and maintenance, bin-level warehousing, gate entry, GST and e-way bills built in.',
    },
    hero: {
      lead: 'For transporters, 3PLs and warehousing companies: bookings, loads, fleet, gates, warehouses, proof of delivery and billing on one system, live for every consignment.',
      facts: facts(['Live', 'Shipment tracking to ePOD'], ['Per vehicle', 'Trips, fuel and maintenance']),
    },
    screens: {
      lead: shot('transportation-management/control-tower'),
      behind: { screen: 'fleet-management/fleet-dashboard' },
      phone: shot('transportation-management/epod'),
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a logistics firm short.',
      lead: 'Accounts are in the ERP, but loads are planned on calls, trucks are tracked on a separate app and proof of delivery comes back on paper.',
      items: [
        {
          icon: 'transport',
          title: 'Loads and lanes',
          tag: 'Planned on the phone',
          points: ['Part loads not combined', 'Lane rates in a spreadsheet', 'Delays found when the customer calls'],
        },
        {
          icon: 'dispatch',
          title: 'Fleet',
          tag: 'Cost per trip unknown',
          points: ['Fuel and tolls booked in bulk', 'Maintenance done after a breakdown', 'Documents expire unnoticed'],
        },
        {
          icon: 'claims',
          title: 'Proof and billing',
          tag: 'Billing waits for paper PODs',
          points: ['PODs lost between driver and office', 'Detention and extra charges not billed', 'Disputes without a delivery record'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured for every consignment.',
      lead: 'Every business takes an order and gets paid. In logistics, the middle is booking, load planning, gate out and transit, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        Booking: 'order-to-cash',
        'Load planning': 'transportation-management',
        'Gate out': 'gate-entry',
        'In transit': 'transportation-management',
        'Proof of delivery': 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One shipment from booking to proof of delivery, traced by consignment and vehicle.',
    },
    modules: { title: 'The modules', rest: 'a logistics firm runs on.', lead: modulesLead, more: ['inventory-management', 'hrms-and-payroll', 'customer-service'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [
        c.eway,
        c.gst,
        { icon: 'dispatch', title: 'Vehicle documents', body: 'Registration, insurance, permits and fitness tracked per vehicle in Fleet Management, with renewals flagged before they lapse.' },
        c.gate,
        c.payroll,
        c.audit,
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for logistics and transport companies?',
        a: 'Yes. Transporters, 3PLs and warehousing companies run bookings, load planning, fleet, warehouses, gate entry, proof of delivery and billing on MAVRO, with GST and e-way bills built in.',
      },
      {
        q: 'Can MAVRO track shipments to proof of delivery?',
        a: 'Yes. Transportation Management builds shipments into loads and lanes, tracks them in a control tower and closes them with an electronic proof of delivery captured on the driver’s phone.',
      },
      {
        q: 'Does MAVRO manage a fleet?',
        a: 'Yes. Fleet Management keeps every vehicle’s trips, fuel, maintenance plan and documents on one register, so the cost of each trip and the state of each vehicle are in view.',
      },
      {
        q: 'Can MAVRO run a 3PL warehouse?',
        a: 'Yes. Warehouse Management runs bin-level putaway, RF picking and dispatch, and Gate Entry records every vehicle in and out against its documents.',
      },
      connectFaq('a logistics company'),
    ],
  },

  {
    slug: 'textiles-apparel',
    draft: DRAFT,
    seo: {
      title: 'ERP for textile and apparel manufacturers | MAVRO',
      description:
        'MAVRO for textile and apparel units: style and size-wise BOM and routing, cutting, stitching and finishing on the shop floor, fabric and trims by lot, job workers and contract labour, GST and payroll built in.',
    },
    hero: {
      lead: 'For spinning, weaving, garment and home textile units: styles, production, fabric and trims, job workers, contract labour, payroll and the books on one system.',
      facts: facts(['By style and size', 'BOM and routing'], ['Per contractor', 'Labour costed and compliant']),
    },
    screens: {
      lead: shot('production-management/work-order-register'),
      behind: { screen: 'inventory-management/stock-position' },
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a textile unit short.',
      lead: 'The ERP keeps the accounts, while styles, cut plans, job work and the contract workforce run on registers and spreadsheets.',
      items: [
        {
          icon: 'production',
          title: 'Production',
          tag: 'Styles tracked on paper',
          points: ['Cut, stitch and finish counts reconciled at day end', 'WIP by style and size unknown', 'Rework not costed'],
        },
        {
          icon: 'inventory',
          title: 'Fabric and trims',
          tag: 'Lots mixed between orders',
          points: ['Fabric at job workers not on the books', 'Trims short on the line', 'Lot-wise consumption not recorded'],
        },
        {
          icon: 'people',
          title: 'Workforce',
          tag: 'Contractor compliance on trust',
          points: ['Piece rates calculated by hand', 'PF and ESIC proof missing at audit', 'Attendance and payroll in separate files'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured for the line.',
      lead: 'Every business takes an order and gets paid. In a textile unit, the middle is sampling, cutting, stitching and finishing, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        Sampling: 'production-management',
        Cutting: 'shop-floor-control',
        Stitching: 'shop-floor-control',
        Finishing: 'production-management',
        Dispatch: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One production order from sampling to dispatch, traced by style and fabric lot.',
    },
    modules: { title: 'The modules', rest: 'a textile unit runs on.', lead: modulesLead, more: ['contract-labour-supply', 'procure-to-pay', 'order-to-cash'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [c.gst, c.labour, c.payroll, c.eway, c.gate, c.audit],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for textile and apparel manufacturers?',
        a: 'Yes. Textile and apparel units run styles, production, fabric and trims, job work, contract labour, payroll and accounts on MAVRO, with GST built in.',
      },
      {
        q: 'Can MAVRO handle style and size-wise production?',
        a: 'Yes. Production Management keeps a BOM and routing per style, and Shop Floor Control records output, rework and WIP at each operation as the shift runs.',
      },
      {
        q: 'How does MAVRO handle contract labour?',
        a: 'Contract Labour Purchase handles requisitions, deployment and attendance-based billing for contract workers, and Contract Labour Supply checks CLRA, PF, ESIC and wage evidence before a contractor bill is certified.',
      },
      {
        q: 'Can fabric be tracked by lot?',
        a: 'Yes. Inventory Management tracks fabric and trims by lot across stores, and material issued to a production order is booked against it.',
      },
      connectFaq('a textile unit'),
    ],
  },

  {
    slug: 'food-beverage',
    draft: DRAFT,
    seo: {
      title: 'ERP for food and beverage manufacturers | MAVRO',
      description:
        'MAVRO for food processors, dairies and beverage makers: batch production with yields and QC release, batch and expiry tracking with FEFO picking, distributor orders with schemes, GST and e-way bills built in.',
    },
    hero: {
      lead: 'For food processors, dairies and beverage makers: buying, batch production, quality, shelf life, distributors and the books on one system, traced batch by batch.',
      facts: facts(['Batch and expiry', 'On every order line'], ['QC release', 'Before stock moves']),
    },
    screens: {
      lead: shot('production-management/qc-release'),
      behind: { screen: 'inventory-management/item-stock' },
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a food business short.',
      lead: 'The ERP records the sale, but batches, shelf life and the distributor network are managed in registers and messages.',
      items: [
        {
          icon: 'production',
          title: 'Batches',
          tag: 'Yields known after the month',
          points: ['Batch sheets filled by hand', 'Stock moves before QC signs off', 'Recall scope unclear'],
        },
        {
          icon: 'inventory',
          title: 'Shelf life',
          tag: 'Expiry found on the shelf',
          points: ['Older batches left behind in picking', 'Near-expiry stock not flagged', 'Returns not traced to batch'],
        },
        {
          icon: 'distribution',
          title: 'Channel',
          tag: 'Distributor orders on WhatsApp',
          points: ['Schemes calculated after the invoice', 'No live view of distributor stock', 'Claims settled from spreadsheets'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured for batch and shelf life.',
      lead: 'Every business takes an order and gets paid. In food and beverage, the middle is procurement, processing, QC release and packing, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        Procurement: 'procure-to-pay',
        Processing: 'production-management',
        'QC release': 'production-management',
        Packing: 'warehouse-management',
        Dispatch: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One batch from raw material to the distributor, traced by batch and expiry.',
    },
    modules: { title: 'The modules', rest: 'a food business runs on.', lead: modulesLead, more: ['procure-to-pay', 'warehouse-management', 'sales-force-automation'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [
        c.gst,
        c.eway,
        { icon: 'quality', title: 'Batch traceability', body: 'Every batch traced from raw material lots to the customers it reached, with QC release recorded before stock moves.' },
        c.payroll,
        c.gate,
        c.audit,
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for food and beverage manufacturers?',
        a: 'Yes. Food processors, dairies and beverage makers run buying, batch production, QC release, batch and expiry tracking, distributor orders and accounts on MAVRO, with GST built in.',
      },
      {
        q: 'Does MAVRO track batch and expiry?',
        a: 'Yes. Inventory Management tracks stock by batch and expiry, and order lines are allocated first-expiry-first-out so older stock leaves first.',
      },
      {
        q: 'Can stock be held until QC releases a batch?',
        a: 'Yes. In Production Management no batch reaches finished goods without QC release, so stock cannot be picked before quality signs off.',
      },
      {
        q: 'Can distributors order through MAVRO?',
        a: 'Yes. The Distributor Portal lets distributors place orders and raise claims, and Scheme and Rebate checks schemes at order entry and accrues them in the books.',
      },
      connectFaq('a food business'),
    ],
  },

  {
    slug: 'chemicals',
    draft: DRAFT,
    seo: {
      title: 'ERP for chemical and process manufacturers | MAVRO',
      description:
        'MAVRO for speciality chemical, paint and process manufacturers: batch production against a master recipe, QC release, batch and lot traceability, vendor audits and versioned documents, GST and e-way bills built in.',
    },
    hero: {
      lead: 'For speciality chemical, paint and process manufacturers: planning, batch production, quality, materials, vendor audits, documents and the books on one system, traced batch by batch.',
      facts: facts(['Batch and lot', 'Raw material to customer'], ['Versioned', 'Documents per material']),
    },
    screens: {
      lead: shot('ppds/planning-dashboard'),
      behind: { screen: 'production-management/plant-output' },
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a process plant short.',
      lead: 'The ERP posts the invoice, while recipes, batch sheets, vendor audits and material documents sit in folders and inboxes.',
      items: [
        {
          icon: 'production',
          title: 'Batches',
          tag: 'Recipes on paper',
          points: ['Batch sheets written up after the shift', 'Yield variance found at month end', 'Rework not linked to the batch'],
        },
        {
          icon: 'quality',
          title: 'Suppliers',
          tag: 'Audits in spreadsheets',
          points: ['Vendor audit findings not closed', 'Material approval by email', 'No single view of supplier quality'],
        },
        {
          icon: 'master',
          title: 'Documents',
          tag: 'The latest version is anyone’s guess',
          points: ['Specs and data sheets in shared folders', 'Customer document requests by hand', 'No version history'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured for the batch.',
      lead: 'Every business takes an order and gets paid. In a process plant, the middle is batch planning, processing, QC release and filling, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        'Batch planning': 'ppds',
        Processing: 'production-management',
        'QC release': 'production-management',
        Filling: 'production-management',
        Dispatch: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One batch record from planning to dispatch, traced by batch and lot.',
    },
    modules: { title: 'The modules', rest: 'a process plant runs on.', lead: modulesLead, more: ['procure-to-pay', 'transportation-management', 'accounting'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [
        c.gst,
        c.eway,
        { icon: 'quality', title: 'Vendor audits', body: 'Audit plans, findings and CAPA closure in mVLens Vendor Audit, with quality agreements kept per supplier.' },
        { icon: 'procurement', title: 'Controlled documents', body: 'Specifications and data sheets versioned and approved in Document Management, with every change on record.' },
        c.payroll,
        c.audit,
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for chemical manufacturers?',
        a: 'Yes. Speciality chemical, paint and process manufacturers run planning, batch production, QC release, materials, vendor audits, documents and accounts on MAVRO, with GST built in.',
      },
      {
        q: 'Does MAVRO keep a batch record for every batch?',
        a: 'Yes. Production Management runs each batch against its master recipe with stage-wise yields, and QC release is recorded before the batch reaches finished goods.',
      },
      {
        q: 'Can MAVRO trace a batch back to raw material lots?',
        a: 'Yes. Inventory Management tracks every material by batch and lot, so a finished batch traces back to the lots it consumed and forward to the customers it reached.',
      },
      {
        q: 'How are supplier audits managed?',
        a: 'mVLens Vendor Audit plans audits, records findings, follows CAPA to closure and keeps quality agreements per supplier.',
      },
      connectFaq('a process plant'),
    ],
  },

  {
    slug: 'construction-real-estate',
    draft: DRAFT,
    seo: {
      title: 'ERP for construction and real estate companies | MAVRO',
      description:
        'MAVRO for contractors, developers and property owners: projects against budget, milestones and change requests, site procurement and contract labour, equipment, property, lease and rent management, GST built in.',
    },
    hero: {
      lead: 'For contractors, developers and property owners: projects, site buying, contract labour, equipment, properties and leases, and the books on one system, costed project by project.',
      facts: facts(['Per project', 'Budget, milestones and change'], ['Per property', 'Leases and rent']),
    },
    screens: {
      lead: shot('project-management/portfolio'),
      behind: { screen: 'real-estate-management/portfolio-dashboard' },
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a builder short.',
      lead: 'Accounts close the books, but project budgets, site material, labour contractors and leases are tracked in separate spreadsheets.',
      items: [
        {
          icon: 'workflow',
          title: 'Projects',
          tag: 'Overruns found at the end',
          points: ['Budget and actual compared monthly', 'Change requests agreed on the phone', 'Milestones tracked in slides'],
        },
        {
          icon: 'people',
          title: 'Sites',
          tag: 'Labour and material off the books',
          points: ['Contractor bills paid without compliance proof', 'Site stock unknown', 'Equipment idle on one site, hired on another'],
        },
        {
          icon: 'warehouse',
          title: 'Properties',
          tag: 'Lease dates in a diary',
          points: ['Renewals missed', 'Rent escalations calculated by hand', 'No single view of the portfolio'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured for the site.',
      lead: 'Every business takes an order and gets paid. In construction, the middle is planning, procurement, site work and inspection, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        Planning: 'project-management',
        Procurement: 'procure-to-pay',
        'Site work': 'contract-labour-purchase',
        Inspection: 'project-management',
        Handover: 'real-estate-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One project from plan to handover, traced by site and milestone.',
    },
    modules: { title: 'The modules', rest: 'a builder runs on.', lead: modulesLead, more: ['inventory-management', 'hrms-and-payroll', 'accounting'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [
        c.gst,
        c.labour,
        c.payroll,
        { icon: 'warehouse', title: 'Asset register', body: 'Equipment registered with its maintenance and depreciation in Asset Management, so the books and the site agree.' },
        { icon: 'calendar', title: 'Lease dates', body: 'Lease renewals, escalations and rent due tracked per property in Real Estate Management.' },
        c.audit,
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for construction and real estate companies?',
        a: 'Yes. Contractors, developers and property owners run projects, site procurement, contract labour, equipment, properties, leases and accounts on MAVRO, with GST built in.',
      },
      {
        q: 'Can MAVRO track project budgets and change requests?',
        a: 'Yes. Project Management tracks each project against its approved baseline for budget and schedule, keeps a milestone plan with owners, and sends change requests with their cost and time impact for approval.',
      },
      {
        q: 'How are labour contractors managed?',
        a: 'Contract Labour Purchase handles requisitions, deployment and attendance-based billing for contract workers on site, and Contract Labour Supply checks CLRA, PF, ESIC and wage evidence before a contractor bill is certified.',
      },
      {
        q: 'Does MAVRO manage properties and leases?',
        a: 'Yes. Real Estate Management keeps each property with its leases, renewals and rent, and flags renewals before they fall due.',
      },
      connectFaq('a builder'),
    ],
  },

  {
    slug: 'agriculture-plantation',
    draft: DRAFT,
    seo: {
      title: 'ERP for agriculture, plantations and agri exporters | MAVRO',
      description:
        'MAVRO for plantations, agri-processors and forest-product exporters: plot mapping, harvest logs, chain of custody, EUDR due-diligence statements, seasonal workforce rosters and payroll, GST built in.',
    },
    hero: {
      lead: 'For plantations, agri-processors and forest-product exporters: plots, harvests, lots, chain of custody, seasonal workers and the books on one system, traced from the plot to the buyer.',
      facts: facts(['Plot to lot', 'Chain of custody'], ['EUDR', 'Due-diligence statements']),
    },
    screens: {
      lead: shot('fsc-portal/plot-registry'),
      behind: { screen: 'fsc-portal/chain-of-custody' },
      phone: shot('fsc-portal/harvest-log'),
    },
    gaps: {
      title: 'Where a generic ERP',
      rest: 'leaves a plantation short.',
      lead: 'The ERP records the sale, but plots, harvests, the traceability buyers ask for and a seasonal workforce are tracked on paper.',
      items: [
        {
          icon: 'pin',
          title: 'Traceability',
          tag: 'Buyers ask, records can’t answer',
          points: ['Plots not mapped', 'Harvests not linked to lots', 'Due-diligence evidence assembled by hand'],
        },
        {
          icon: 'people',
          title: 'Seasonal workforce',
          tag: 'Muster rolls on paper',
          points: ['Rosters made each morning', 'Attendance and wages reconciled later', 'Statutory deductions missed'],
        },
        {
          icon: 'inventory',
          title: 'Lots and stock',
          tag: 'Lots mixed after harvest',
          points: ['Processing yields unknown', 'Lots mixed in the store', 'Dispatch not tied to the lot'],
        },
      ],
    },
    flow: {
      title: flowTitle,
      rest: 'configured from the plot.',
      lead: 'Every business takes an order and gets paid. On a plantation, the middle is plot mapping, harvest, processing and chain of custody, and each stage is a MAVRO module.',
      links: {
        Enquiry: 'crm',
        Quotation: 'order-to-cash',
        Order: 'order-to-cash',
        'Plot mapping': 'fsc-portal',
        Harvest: 'fsc-portal',
        Processing: 'production-management',
        'Chain of custody': 'fsc-portal',
        Dispatch: 'transportation-management',
        Invoice: 'order-to-cash',
        Payment: 'accounting',
      },
      note: 'One harvest lot from the plot to the buyer, traced by plot and lot.',
    },
    modules: { title: 'The modules', rest: 'a plantation runs on.', lead: modulesLead, more: ['production-management', 'fleet-management', 'accounting'] },
    compliance: {
      title: 'Compliance,',
      rest: 'built in rather than bolted on.',
      lead: complianceLead,
      items: [
        { icon: 'pin', title: 'Chain of custody', body: 'Every lot linked to the plots and harvests it came from in the FSC Portal, ready for a buyer’s or certifier’s audit.' },
        { icon: 'shield', title: 'EUDR statements', body: 'Due-diligence statements built from the plot geolocation and lot records in the FSC Portal.' },
        c.payroll,
        c.gst,
        c.eway,
        c.audit,
      ],
    },
    stories: [],
    faq: [
      {
        q: 'Is MAVRO suitable for plantations and agri businesses?',
        a: 'Yes. Plantations, agri-processors and forest-product exporters run plot mapping, harvests, lots, chain of custody, seasonal workforce and accounts on MAVRO, with GST built in.',
      },
      {
        q: 'Can MAVRO help with EUDR due diligence?',
        a: 'The FSC Portal maps plots, logs harvests, links every lot to its plots and builds EUDR due-diligence statements from those records.',
      },
      {
        q: 'Can harvests be logged in the field?',
        a: 'Yes. Harvests are logged from a phone against the plot, and the lot they form carries that record through processing and dispatch.',
      },
      {
        q: 'How is a seasonal workforce managed?',
        a: 'Roster Ledger builds shift rosters and tracks coverage, and HRMS and Payroll records attendance and pays workers with PF, ESI and other statutory deductions.',
      },
      connectFaq('a plantation'),
    ],
  },
];
