import type { ModuleContent } from '../schema';

/*
 * Procure to Pay. Source: product deck v2, slides 38–39 (tagline, four tiles, what it does, why it matters, four
 * screens), written for every industry rather than the deck's regulated-manufacturing example. The match and
 * invoice approval views are Vendor Invoice Management's own screens, so this page shows sourcing and the PO instead
 * (the homepage `procurement` and `purchase-order` screens, moved onto the module shell). Figures on the tiles come
 * from the module's screens (prototype/modules/procure-to-pay/), whose scenario is below; like all screen data they
 * are illustrative.
 */
export const content: ModuleContent<'procure-to-pay'> = {
  slug: 'procure-to-pay',
  tagline: 'Requisition to payment: contract-priced, three-way matched spend.',
  tiles: [
    {
      icon: 'eye',
      title: 'Spend and supplier health',
      body: 'Category spend, price variance and vendor risk.',
      figure: { value: '₹1.04 Cr', label: 'committed this month, 74% of budget' },
    },
    {
      icon: 'orders',
      title: 'Purchase orders',
      body: 'Open POs with their receipt and quality release state.',
      figure: { value: '64', label: 'open POs, each with its GRN state' },
    },
    {
      icon: 'claims',
      title: 'Three-way match',
      body: 'PO, GRN and invoice reconciled to tolerance.',
      figure: { value: '₹38,900', label: 'over contract price, payment blocked' },
    },
    {
      icon: 'rules',
      title: 'Approvals',
      body: 'Requisitions, POs and invoices routed by value and ageing.',
      figure: { value: '2.6 days', label: 'from requisition to PO' },
    },
  ],
  what: 'End-to-end procurement from requisition to payment: category spend and price-variance health, sourcing with quotes compared on landed cost and delivery, a governed purchase order register with receipt and quality state, automatic PO, GRN and invoice reconciliation with tolerance control, and an approval queue that closes into the payment run.',
  why: [
    'Price variance beyond contract tolerance blocks payment, not just flags it.',
    'Short receipts and unplanned freight lines surface line by line.',
    'Vendor quality agreements and GST validity are checked before the GRN posts.',
    'Pending approvals are visible by value, ageing, owner and due date.',
    'Single-source risk on critical items is tracked against approved alternates.',
    'On-time receipts and PO cycle time sit beside spend on one screen.',
  ],
  flow: {
    from: [
      { slug: 'production-management', passes: 'Material shortages from planning' },
      { slug: 'inventory-management', passes: 'Replenishment below reorder level' },
      { slug: 'auction-and-bidding', passes: 'Awarded rates and vendors' },
      { slug: 'vendor-portal', passes: 'Quotes, confirmations and shipment notices' },
    ],
    to: [
      { slug: 'gate-entry', passes: 'Expected arrivals against open POs' },
      { slug: 'inventory-management', passes: 'Goods receipts into stock' },
      { slug: 'vendor-invoice-management', passes: 'POs and GRNs to match invoices against' },
      { slug: 'accounting', passes: 'Commitments against budget' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Shortages from planning become requisitions; castings, bar stock and parts are bought on rate contracts.' },
    { slug: 'distribution', note: 'Purchases planned from stock cover, with vendor fill rates and lead times watched.' },
    { slug: 'pharma', note: 'Quality agreements and approved alternates for critical materials are checked before receipt.' },
    { slug: 'service-providers', note: 'Hardware, software and subcontracted services bought against budgets, approved by value.' },
  ],
  roles: [
    { name: 'Buyers', task: 'Send RFQs, compare quotes on landed cost and place POs on rate contracts.', works: 'RFQs' },
    { name: 'Purchase head', task: 'Watches spend, price variance and supplier health; approves above buyer limits.', works: 'Spend and suppliers' },
    { name: 'Requesters', task: 'Raise requisitions from stores, production or a department and follow them to receipt.', works: 'Requisitions' },
    { name: 'Stores and quality', task: 'Post goods receipts and release material before it is usable or payable.', works: 'Goods receipts' },
    { name: 'Accounts payable', task: 'Clear invoice approvals and match exceptions before the payment run.', works: 'Invoice approvals' },
  ],
  related: ['vendor-invoice-management', 'inventory-management', 'gate-entry', 'accounting'],
  screens: [
    {
      screen: 'procure-to-pay/spend-suppliers',
      view: 'Spend and suppliers',
      title: 'Spend and supplier health',
      caption: 'Committed spend by category against budget and contract price, supplier scorecards and single-source risk.',
      alt: 'MAVRO Procure to Pay spend and supplier health dashboard: ₹1.04 Cr committed against a ₹1.41 Cr budget, ₹38,900 over contract price across 6 invoices with payment blocked, 91% on-time receipts, 2.6 days from requisition to PO, spend by category, supplier health and single-source items (illustrative data).',
    },
    {
      screen: 'procure-to-pay/rfq',
      view: 'RFQs',
      title: 'Quote comparison',
      caption: 'Three quotes ranked on landed cost and delivery date, with each vendor’s quality and on-time record, traced back to the order that needs the material.',
      alt: 'MAVRO RFQ-0311 for 400 kg of aluminium castings: three vendor quotes compared on rate, freight, landed cost, lead time, delivery date, payment terms, quality and on-time delivery, with Aravali Castings recommended at ₹1,02,400 landed (illustrative data).',
    },
    {
      screen: 'procure-to-pay/purchase-order',
      view: 'Purchase orders',
      title: 'Purchase order',
      caption: 'One PO with every document from requisition to payment, the three-way match waiting for the goods, the vendor’s record and the budget.',
      alt: 'MAVRO purchase order PO-7714 to Aravali Castings: the procure-to-pay chain from requisition to payment, the order line of ₹1,02,400, a three-way match with the invoice held until the goods are received, vendor compliance and the raw-material budget at ₹30.4 L of ₹42 L (illustrative data).',
    },
    {
      screen: 'procure-to-pay/po-register',
      view: 'PO register',
      title: 'Purchase order register',
      caption: 'Open POs with how much has been received, the quality release and the invoice match, so blocked payments and late orders stand out.',
      alt: 'MAVRO purchase order register: 64 open POs worth ₹1.86 Cr, 38 awaiting receipt, 10 blocked for payment on price or quantity, each PO with its need-by date, receipt progress, quality release, invoice match and status (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, Plant 1, 8 Oct, 14:02. October commitments ₹1.04 Cr of ₹1.41 Cr; raw material ₹30.4 L of ₹42 L. RFQ-0311 (1 Oct): three quotes for 400 kg LM6 castings; PO-7714 to Aravali Castings on 2 Oct at ₹256/kg = ₹1,02,400, invoice VIM-2207 waiting for the goods (ETA 10 Oct). PO-7702 Mehta Alloys invoiced 2.98% over the PO rate: payment blocked. 6 invoices over contract price, ₹38,900. PO-7719 Kaveri Steel Traders at the gate, 40 kg short.',
  faq: [
    {
      q: 'What does Procure to Pay in MAVRO do?',
      a: 'MAVRO Procure to Pay runs purchasing from requisition to payment. It turns shortages and requests into requisitions, compares vendor quotes, issues purchase orders on rate contracts with approvals by value, tracks receipt and quality release, matches PO, goods receipt and invoice to tolerance, and passes approved invoices to the payment run.',
    },
    {
      q: 'How does MAVRO compare vendor quotes?',
      a: 'MAVRO puts the quotes for an RFQ side by side on rate, freight, landed cost, lead time and the date each vendor can deliver against the need-by date, with each vendor’s quality acceptance and on-time record from past orders. The buyer creates the purchase order from the chosen quote.',
    },
    {
      q: 'Does MAVRO stop payment when an invoice price is above the PO?',
      a: 'Yes. When an invoice line is above the purchase order or contract price by more than the tolerance you set, MAVRO blocks it from payment rather than just flagging it, and routes it to the buyer with the variance. Short receipts and freight lines not on the PO are shown line by line.',
    },
    {
      q: 'Can MAVRO control purchasing against budgets?',
      a: 'Yes. MAVRO checks every requisition and purchase order against the budget for its plant, category and month, shows what is committed and what is left, and routes orders above a buyer’s limit or outside the budget to the next approver.',
    },
  ],
  seo: {
    title: 'Procure to pay software: requisition, PO, 3-way match | MAVRO',
    description:
      'MAVRO Procure to Pay: requisitions, quote comparison, budget-checked purchase orders, receipt and quality tracking, three-way matching that blocks over-price invoices, and spend and supplier health.',
  },
};
