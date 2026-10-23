import type { ModuleContent } from '../schema';

/*
 * Vendor Invoice Management. Source: product deck v2, slides 42–43 (tagline, four tiles, what it does, why it
 * matters, four screens). Figures on the tiles come from the module's screens (prototype/modules/
 * vendor-invoice-management/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'vendor-invoice-management'> = {
  slug: 'vendor-invoice-management',
  tagline: 'OCR capture, 3-way match and GST-safe payment runs, on a short AP cycle.',
  tiles: [
    {
      icon: 'eye',
      title: 'Touchless capture',
      body: 'Every invoice read by OCR and validated automatically.',
      figure: { value: '71%', label: 'touchless' },
    },
    {
      icon: 'claims',
      title: '3-way match',
      body: 'PO against GRN against invoice, with tolerance rules.',
      figure: { value: '23', label: 'exceptions, each with a reason' },
    },
    {
      icon: 'shield',
      title: 'GST shield',
      body: 'GSTR-2B reconciled; input credit at risk flagged and held.',
      figure: { value: '₹1.92 L', label: 'ITC protected' },
    },
    {
      icon: 'finance',
      title: 'Payment runs',
      body: 'Maker-checker runs with TDS and early-payment discounts.',
      figure: { value: '₹62.40 L', label: 'next run' },
    },
  ],
  what: 'An accounts payable pipeline from OCR capture through 3-way matching and exception resolution to approved, bank-ready payment runs, with GST reconciliation protecting input tax credit throughout.',
  why: [
    'Duplicate and inflated invoices are stopped before they post.',
    'Input tax credit is protected: vendors who do not match GSTR-2B are held automatically.',
    'Early-payment discounts are captured as a matter of routine.',
    'An exception queue with reasons ends AP firefighting.',
    'Vendors chase less, because payment status and dates are visible.',
    'Three-level authorisation guards every high-value payment run.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Purchase orders to match against' },
      { slug: 'gate-entry', passes: 'Goods in at the gate' },
      { slug: 'inventory-management', passes: 'Goods receipts and quality results' },
      { slug: 'vendor-portal', passes: 'Invoices uploaded by vendors' },
    ],
    to: [
      { slug: 'accounting', passes: 'Matched bills and payments to the ledger' },
      { slug: 'vendor-portal', passes: 'Payment status back to the vendor' },
      { slug: 'cost-forecasting', passes: 'Committed and paid spend' },
      { slug: 'audit-management', passes: 'Evidence for every payment' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'High supplier volumes matched line by line against POs and goods receipts.' },
    { slug: 'distribution', note: 'Freight and service bills matched to trips and contracts before payment.' },
    { slug: 'pharma', note: 'Payment waits for quality release of the material, not just its receipt.' },
    { slug: 'service-providers', note: 'Subcontractor and service invoices checked against agreed rates.' },
  ],
  roles: [
    { name: 'AP team', task: 'Clears exceptions with the reason on every invoice.', works: 'Exceptions' },
    { name: 'Buyers', task: 'Confirm price or quantity differences on their POs.', works: '3-way match' },
    { name: 'Tax team', task: 'Follows up vendors whose invoices are not in GSTR-2B.', works: 'GSTR-2B reconciliation' },
    { name: 'Finance controller', task: 'Checks each payment run before it goes for release.', works: 'Payment runs' },
    { name: 'CFO', task: 'Releases high-value runs, on the web or the phone.', works: 'AP dashboard' },
  ],
  related: ['accounting', 'procure-to-pay', 'inventory-management', 'travel-and-expense'],
  screens: [
    {
      screen: 'vendor-invoice-management/ap-dashboard',
      view: 'AP dashboard',
      title: 'AP dashboard',
      caption: 'The invoice pipeline from receipt to payment, open payables by due date, the exceptions and the next run.',
      alt: 'MAVRO accounts payable dashboard: 71% of 214 invoices touchless, ₹2.36 Cr open payables, a 6.4-day AP cycle, the invoice pipeline from received to paid, payables by due date, 23 exceptions by reason and the next payment run of ₹62.40 L (illustrative data).',
    },
    {
      screen: 'vendor-invoice-management/invoice-register',
      view: 'Invoice register',
      title: 'Invoice register',
      caption: 'Every vendor invoice with its source, its match, its GSTR-2B status and where it stands for payment.',
      alt: 'MAVRO invoice register: 214 invoices worth ₹2.84 Cr, each with source, PO and GRN, 3-way match result, GSTR-2B status and payment status, including a suspected duplicate and invoices held for input credit (illustrative data).',
    },
    {
      screen: 'vendor-invoice-management/three-way-match',
      view: '3-way match',
      title: '3-way match review',
      caption: 'An invoice over tolerance, line by line against its PO and goods receipt, with the OCR read and the ways to resolve it.',
      alt: 'MAVRO 3-way match review of invoice VIM-2224 from Mehta Alloys: the rate on one line 2.98% over the PO, unplanned freight, the invoice as read by OCR with the differences highlighted, and options to pay at the PO rate or route to the buyer (illustrative data).',
    },
    {
      screen: 'vendor-invoice-management/payment-run',
      view: 'Payment runs',
      title: 'Payment run',
      caption: 'A run by vendor with discounts and TDS, its three-level authorisation and the checks before release.',
      alt: 'MAVRO payment run PR-0188: 38 invoices from 24 vendors, ₹62.40 L gross, ₹48,600 early-payment discount, ₹1.12 L TDS and ₹60.79 L net to the bank, prepared and checked and waiting for the CFO to release (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct. October to date: 214 vendor invoices, 201 read by OCR, 152 touchless. 23 exceptions: 7 GSTR-2B (₹1.92 L ITC held), 6 price, 5 waiting for GRN (VIM-2207, Aravali Castings, PO-7714), 4 quantity, 1 duplicate (VIM-2226 of VIM-2203). VIM-2224 Mehta Alloys: rate ₹86.50 against ₹84.00 on PO-7702. Payment run PR-0188 on 10 Oct: ₹62.40 L gross, ₹60.79 L net.',
  faq: [
    {
      q: 'What does Vendor Invoice Management in MAVRO do?',
      a: 'MAVRO Vendor Invoice Management runs accounts payable from invoice capture to payment. It reads invoices by OCR, matches them three ways against the purchase order and goods receipt, queues exceptions with their reasons, reconciles GSTR-2B to protect input tax credit, and pays approved invoices in maker-checker payment runs.',
    },
    {
      q: 'How does 3-way matching work in MAVRO?',
      a: 'MAVRO compares each invoice line with its purchase order and goods receipt on quantity, rate and tax. Within the tolerance you set, the invoice posts and is ready to pay without a touch; outside it, the invoice is held with the reason and routed to the buyer or the accounts team to resolve.',
    },
    {
      q: 'Can MAVRO stop input tax credit being lost on vendor invoices?',
      a: 'Yes. MAVRO matches vendor invoices against GSTR-2B and holds those that do not appear or do not agree, both from the credit claim and from payment. They are released automatically once the vendor’s filing matches, so credit is claimed only where it is safe.',
    },
    {
      q: 'Does MAVRO handle TDS and early-payment discounts in payment runs?',
      a: 'Yes. MAVRO deducts TDS by section as each run is prepared, takes early-payment discounts where the vendor’s terms allow, and produces one bank file. High-value runs need three levels of authorisation before release.',
    },
  ],
  seo: {
    title: 'Vendor invoice automation: OCR, 3-way match, GSTR-2B | MAVRO',
    description:
      'MAVRO Vendor Invoice Management: OCR invoice capture, 3-way matching with tolerance rules, GSTR-2B reconciliation that protects input tax credit, and approved payment runs.',
  },
};
