/*
 * The story the whole page tells: one customer order, and everything it sets in motion.
 *
 * Kestrel Pumps orders 1,200 impeller housings at ₹1,535 each (₹18,42,000 before tax). 310 are in stock, 890
 * are made, the castings run short by 400 kg, and that shortage becomes a purchase. All figures are
 * illustrative sample data and are kept arithmetically consistent across sections.
 */

export interface Effect {
  module: string;
  text: string;
}

export interface Stage {
  label: string;
  doc: string;
  title: string;
  facts: [string, string][];
  from?: string;
  effects: Effect[];
}

export const order = {
  no: 'SO-24817',
  customer: 'Kestrel Pumps Ltd',
  item: 'IH-220 Impeller housing',
  qty: '1,200 pcs',
  value: '₹18,42,000',
  promise: '18 Oct',
};

export const o2c: Stage[] = [
  {
    label: 'Enquiry',
    doc: 'ENQ-3391',
    title: 'Kestrel Pumps asks for 1,200 impeller housings.',
    facts: [
      ['Customer', 'Kestrel Pumps Ltd'],
      ['Item', 'IH-220 Impeller housing'],
      ['Quantity', '1,200 pcs'],
      ['Needed by', '18 Oct'],
    ],
    effects: [
      { module: 'Sales', text: 'Enquiry logged on the account and assigned to an owner.' },
      { module: 'Planning', text: 'Capacity for week 42 checked before anyone promises a date.' },
    ],
  },
  {
    label: 'Quotation',
    doc: 'QTN-2207',
    title: 'The price is built from the real cost to make it.',
    from: 'ENQ-3391',
    facts: [
      ['Unit price', '₹1,535'],
      ['Quote value', '₹18,42,000'],
      ['Costed margin', '23.4%'],
      ['Valid until', '30 Sep'],
    ],
    effects: [
      { module: 'Costing', text: 'Cost rolled up from the current BOM and routing.' },
      { module: 'Approvals', text: 'Discount is inside the limit, so no approval is waited on.' },
    ],
  },
  {
    label: 'Sales order',
    doc: 'SO-24817',
    title: 'The customer confirms. The quotation becomes the order.',
    from: 'QTN-2207',
    facts: [
      ['Customer PO', 'KP/PO/1182'],
      ['Quantity', '1,200 pcs'],
      ['Promise date', '18 Oct'],
      ['Credit', 'Within limit'],
    ],
    effects: [
      { module: 'Inventory', text: '310 pcs of finished stock reserved for this order.' },
      { module: 'Planning', text: 'Demand for the remaining 890 pcs passed to planning.' },
      { module: 'Finance', text: 'Customer credit exposure updated.' },
    ],
  },
  {
    label: 'Production',
    doc: 'WO-5521',
    title: 'A work order is raised for exactly what stock cannot cover.',
    from: 'SO-24817',
    facts: [
      ['Quantity', '890 pcs'],
      ['Routing', '5 operations'],
      ['Material', 'Castings short 400 kg'],
      ['Due', '14 Oct'],
    ],
    effects: [
      { module: 'Purchase', text: 'Requisition PR-0456 raised for the shortage.' },
      { module: 'Inventory', text: 'Raw material issued to the shop floor against the order.' },
      { module: 'Costing', text: 'Actual cost accumulates on the order as work is booked.' },
    ],
  },
  {
    label: 'Quality',
    doc: 'QC-0932',
    title: 'Nothing reaches finished stock without passing inspection.',
    from: 'WO-5521',
    facts: [
      ['Lot', 'L-0932'],
      ['Sample', '50 pcs'],
      ['Passed', '48'],
      ['On hold', '2'],
    ],
    effects: [
      { module: 'Production', text: 'Held pieces routed to rework on the same work order.' },
      { module: 'Inventory', text: 'Only accepted quantity can be received as finished goods.' },
    ],
  },
  {
    label: 'Inventory',
    doc: 'FGR-3310',
    title: 'Accepted goods land in stock, already allocated.',
    from: 'QC-0932',
    facts: [
      ['Received', '890 pcs'],
      ['Reserved earlier', '310 pcs'],
      ['Ready for order', '1,200 pcs'],
      ['Location', 'FG-A-14'],
    ],
    effects: [
      { module: 'Sales', text: 'The order shows ready to ship. No one has to ask the stores.' },
      { module: 'Finance', text: 'Stock valued at the actual cost of this work order.' },
    ],
  },
  {
    label: 'Dispatch',
    doc: 'DSP-1904',
    title: 'The shipment leaves with its paperwork already done.',
    from: 'SO-24817',
    facts: [
      ['Shipped', '1,200 pcs'],
      ['Packages', '24 crates'],
      ['Transporter', 'Western Roadlines'],
      ['Gate out', '17 Oct, 16:20'],
    ],
    effects: [
      { module: 'Inventory', text: 'Stock reduced at gate-out, by lot.' },
      { module: 'Customer', text: 'Dispatch advice sent with lot and inspection references.' },
    ],
  },
  {
    label: 'Invoice',
    doc: 'INV-6120',
    title: 'The invoice is the dispatch, priced. Nothing is retyped.',
    from: 'DSP-1904',
    facts: [
      ['Taxable value', '₹18,42,000'],
      ['GST 18%', '₹3,31,560'],
      ['Invoice total', '₹21,73,560'],
      ['Terms', 'Net 30'],
    ],
    effects: [
      { module: 'Finance', text: 'Revenue, tax and receivable posted to the ledger.' },
      { module: 'Sales', text: 'Order closed for billing.' },
    ],
  },
  {
    label: 'Payment',
    doc: 'RCT-4471',
    title: 'Cash arrives and the loop closes.',
    from: 'INV-6120',
    facts: [
      ['Received', '₹21,73,560'],
      ['Date', '14 Nov'],
      ['Mode', 'Bank transfer'],
      ['Against', 'INV-6120'],
    ],
    effects: [
      { module: 'Finance', text: 'Receivable cleared and matched to the bank statement.' },
      { module: 'Analytics', text: 'Final margin on the order: 22.9%, against 23.4% quoted.' },
    ],
  },
];

export interface P2PStage {
  label: string;
  doc: string;
  summary: string;
  facts: [string, string][];
}

export const p2p: P2PStage[] = [
  {
    label: 'Requisition',
    doc: 'PR-0456',
    summary: 'Planning finds the shortage on WO-5521 and raises the requisition itself.',
    facts: [
      ['Item', 'LM6 aluminium castings'],
      ['Quantity', '400 kg'],
      ['Needed by', '12 Oct'],
      ['Raised by', 'Material planning run'],
    ],
  },
  {
    label: 'RFQ',
    doc: 'RFQ-0311',
    summary: 'Approved vendors for the item are invited to quote in one step.',
    facts: [
      ['Sent to', '3 approved vendors'],
      ['Closes', '3 Oct, 17:00'],
      ['Specification', 'Drawing IH-220-C rev D'],
      ['Buyer', 'R. Menon'],
    ],
  },
  {
    label: 'Vendor quotation',
    doc: 'VQ-0311',
    summary: 'Quotes are compared on price and on whether they meet the date.',
    facts: [
      ['Aravali Castings', '₹212 / kg, 7 days'],
      ['Northline Alloys', '₹205 / kg, 12 days'],
      ['Sunrise Metals', '₹219 / kg, 6 days'],
      ['Selected', 'Aravali, lowest that meets 12 Oct'],
    ],
  },
  {
    label: 'Purchase order',
    doc: 'PO-7714',
    summary: 'The chosen quote becomes the order. Rate and terms carry over.',
    facts: [
      ['Vendor', 'Aravali Castings'],
      ['Order value', '400 kg × ₹212 = ₹84,800'],
      ['Delivery', '10 Oct'],
      ['Approval', 'Within buyer limit'],
    ],
  },
  {
    label: 'ASN',
    doc: 'ASN-2290',
    summary: 'The vendor tells the plant what is on the truck before it arrives.',
    facts: [
      ['Shipped', '400 kg, 8 pallets'],
      ['Heat number', 'H-41207'],
      ['Expected', '10 Oct'],
      ['Against', 'PO-7714'],
    ],
  },
  {
    label: 'Inbound',
    doc: 'GE-8841',
    summary: 'The gate matches the truck to the notice. No surprises at the dock.',
    facts: [
      ['Gate in', '10 Oct, 11:40'],
      ['Dock', 'Receiving 2'],
      ['Matched to', 'ASN-2290'],
      ['Variance', 'None'],
    ],
  },
  {
    label: 'GRN',
    doc: 'GRN-5108',
    summary: 'Goods are received against the order and held for inspection.',
    facts: [
      ['Received', '400 kg'],
      ['Against', 'PO-7714'],
      ['Stock status', 'Under inspection'],
      ['Usable', 'Not yet'],
    ],
  },
  {
    label: 'Quality',
    doc: 'IQC-0718',
    summary: 'Inspection decides what is accepted. The rest goes back on a debit note.',
    facts: [
      ['Accepted', '392 kg'],
      ['Rejected', '8 kg, porosity'],
      ['Debit note', 'DN-0219 raised'],
      ['Vendor rating', 'Updated'],
    ],
  },
  {
    label: 'Inventory',
    doc: 'RM-C-07',
    summary: 'Accepted material is put away, already allocated to the work order that needed it.',
    facts: [
      ['Put away', '392 kg'],
      ['Bin', 'RM-C-07'],
      ['Allocated to', 'WO-5521'],
      ['Shortage', 'Cleared'],
    ],
  },
  {
    label: 'Payment',
    doc: 'PAY-3028',
    summary: 'Order, receipt and invoice agree, so the payment releases on its due date.',
    facts: [
      ['Vendor invoice', '392 kg × ₹212'],
      ['Payable', '₹83,104'],
      ['Three-way match', 'Passed'],
      ['Paid', '9 Nov'],
    ],
  },
];

/** The quantities that travel the whole purchase, and the stage (index) at which each becomes known. */
export const p2pLedger = [
  { label: 'Ordered', value: '400 kg', at: 3 },
  { label: 'Received', value: '400 kg', at: 6 },
  { label: 'Accepted', value: '392 kg', at: 7 },
  { label: 'Paid', value: '₹83,104', at: 9 },
];

/** Seven tools, seven versions of the same order. */
export const fragments = [
  { tool: 'CRM', line: 'Kestrel Pumps · 1,200 pcs', note: 'Promised 18 Oct' },
  { tool: 'Spreadsheet', line: 'Plan_v7_final.xlsx · 1,150 pcs', note: 'Edited 3 days ago' },
  { tool: 'Production software', line: 'Job 5521 · 1,000 pcs', note: 'Due 21 Oct' },
  { tool: 'Inventory software', line: 'IH-220 · 310 in stock', note: 'Last sync 09:12' },
  { tool: 'Purchase software', line: 'Castings · no open order', note: 'Shortage not seen' },
  { tool: 'Accounting software', line: 'Kestrel · ₹18.1 L expected', note: 'Keyed in by hand' },
  { tool: 'Reporting', line: 'Order book · September', note: 'Exported 30 Sep' },
];

export const record = [
  { team: 'Sales', label: 'Ordered', value: '1,200 pcs' },
  { team: 'Planning', label: 'Promise date', value: '18 Oct' },
  { team: 'Stores', label: 'Reserved', value: '310 pcs' },
  { team: 'Production', label: 'WO-5521', value: '890 pcs' },
  { team: 'Purchase', label: 'PO-7714', value: '400 kg' },
  { team: 'Finance', label: 'Order value', value: '₹18,42,000' },
];
