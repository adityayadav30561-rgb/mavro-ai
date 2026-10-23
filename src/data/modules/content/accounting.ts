import type { ModuleContent } from '../schema';

/*
 * Accounting. No deck has an appendix slide for it (sources.ts); built from the deck's summary points (v2 slides 2,
 * 7, 21, 24: auto journals, live GL, GST reports; AP/AR workflows and credit control; multi-entity, multi-plant;
 * auto-generated GST filings) plus the standard capabilities of an accounting module (user, 2026-10-23: "if
 * something is missing for any module, use standard info"). No figures beyond the illustrative screen data.
 */
export const content: ModuleContent<'accounting'> = {
  slug: 'accounting',
  tagline: 'A live general ledger posted from every transaction, GST-ready and closed in days.',
  tiles: [
    {
      icon: 'finance',
      title: 'Auto journals',
      body: 'Invoices, receipts, goods receipts and work orders post their own journals.',
      figure: { value: '98.6%', label: 'posted automatically' },
    },
    {
      icon: 'receipt',
      title: 'GST returns',
      body: 'GSTR-1 and 3B built from posted documents, 2B matched daily.',
      figure: { value: '₹14.2 L', label: 'GSTR-3B payable' },
    },
    {
      icon: 'layers',
      title: 'Multi-entity',
      body: 'Entities and plants consolidated, inter-entity balances eliminated.',
      figure: { value: '3', label: 'entities consolidated' },
    },
    {
      icon: 'calendar',
      title: 'Fast close',
      body: 'Bank, inter-entity and clearing accounts reconciled as the month runs.',
      figure: { value: '2 days', label: 'September close' },
    },
  ],
  what: 'The financial core of MAVRO: a live general ledger that every module posts to, accounts payable and receivable with credit control, bank reconciliation by rules, GST returns built from the same transactions, fixed assets and depreciation, and financial statements consolidated across entities and plants.',
  why: [
    'Journals come from the documents that caused them, so no one re-keys a sale or a goods receipt.',
    'GST returns are built from posted invoices, so filings and books always agree.',
    'Input tax credit is claimed only on invoices that match the vendor’s filing.',
    'Bank lines match receipts and payments by rule; only the exceptions need a person.',
    'Entities and plants close together, with inter-entity balances agreed before consolidation.',
    'Manual journals go through maker-checker approval with a full audit trail.',
  ],
  flow: {
    from: [
      { slug: 'order-to-cash', passes: 'Sales invoices and receipts' },
      { slug: 'vendor-invoice-management', passes: 'Matched vendor bills and payments' },
      { slug: 'hrms-and-payroll', passes: 'The payroll journal' },
      { slug: 'asset-management', passes: 'Depreciation runs' },
    ],
    to: [
      { slug: 'cost-forecasting', passes: 'Actuals against budget' },
      { slug: 'business-analyst-app', passes: 'Certified financial reports' },
      { slug: 'audit-management', passes: 'Ledger evidence for audits' },
      { slug: 'data-analytics', passes: 'Finance data for dashboards' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Work orders post WIP and finished goods, so product cost reaches the ledger as production runs.' },
    { slug: 'distribution', note: 'Scheme accruals and credit notes post as they happen, keeping channel margins honest.' },
    { slug: 'pharma', note: 'Multi-plant books consolidated, with batch costs traced to the ledger.' },
    { slug: 'service-providers', note: 'Project costs and billing post to the ledger by client and cost centre.' },
  ],
  roles: [
    { name: 'Finance controller', task: 'Runs the close, approves manual journals and signs off the statements.', works: 'Period close' },
    { name: 'Accounts team', task: 'Reconciles bank accounts and clears the exceptions rules could not match.', works: 'Bank reconciliation' },
    { name: 'Tax team', task: 'Reviews GSTR-1 and 3B and follows up held vendor invoices.', works: 'GST returns' },
    { name: 'CFO', task: 'Reads consolidated results across entities as soon as the books close.', works: 'Financial statements' },
    { name: 'Auditors', task: 'Trace any figure to its journal and the document that caused it.', works: 'General ledger' },
  ],
  related: ['vendor-invoice-management', 'order-to-cash', 'travel-and-expense', 'procure-to-pay'],
  screens: [
    {
      screen: 'accounting/general-ledger',
      view: 'General ledger',
      title: 'General ledger',
      caption: 'Journals posted from the documents that caused them, each opened line by line, with GST returns and the close beside them.',
      alt: 'MAVRO general ledger for October: 1,284 journals with 98.6% posted automatically, the journal list with its source documents, journal JV-10482 from invoice INV-6114 line by line, GST returns ready to file and the October close checklist (illustrative data).',
    },
    {
      screen: 'accounting/bank-reconciliation',
      view: 'Bank reconciliation',
      title: 'Bank reconciliation',
      caption: 'Statement lines matched to receipts and payments by rule; the few left are reviewed side by side.',
      alt: 'MAVRO bank reconciliation for the HDFC current account: 186 statement lines with 179 matched automatically, statement lines beside their ledger entries, a reconciliation statement that agrees to the books and the matching rules (illustrative data).',
    },
    {
      screen: 'accounting/gst-returns',
      view: 'GST returns',
      title: 'GST returns',
      caption: 'GSTR-1 and 3B built from posted invoices, with input credit claimed only where the vendor’s filing matches.',
      alt: 'MAVRO GST returns for October: GSTR-1 ready to file with 412 e-invoices, the GSTR-3B computation with ₹32.8 L output tax, ₹18.6 L input credit and ₹14.2 L payable, the GSTR-2B match and seven vendor invoices held (illustrative data).',
    },
    {
      screen: 'accounting/financial-statements',
      view: 'Financial statements',
      title: 'Financial statements',
      caption: 'Profit and loss by entity, eliminations and the consolidated result, with the balance sheet beside it.',
      alt: 'MAVRO financial statements for September: profit and loss for three entities with ₹38.6 L of inter-entity sales eliminated, consolidated revenue of ₹6.55 Cr and profit before tax of ₹1.16 Cr, revenue and EBITDA by month and the balance sheet (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, three entities (NP Pune, NP Chennai, NP Exports), 8 Oct. 1,284 journals in October, 98.6% automatic; GSTR-3B ₹14.2 L payable after ₹18.6 L ITC; 7 vendor invoices held on the 2B match (₹1.92 L); HDFC statement 186 lines, 179 matched; September closed in 2 working days with consolidated revenue ₹6.55 Cr and PBT ₹1.16 Cr.',
  faq: [
    {
      q: 'What does the Accounting module in MAVRO do?',
      a: 'MAVRO Accounting is the general ledger every MAVRO module posts to. Invoices, receipts, goods receipts, payroll and work orders post their own journals, and it adds payables and receivables, bank reconciliation, GST returns, fixed assets and financial statements consolidated across entities and plants.',
    },
    {
      q: 'Does MAVRO generate GST returns automatically?',
      a: 'Yes. MAVRO builds GSTR-1 and GSTR-3B from posted invoices, credit notes and vendor bills, so the returns and the books always agree. Vendor invoices are matched daily against GSTR-2B, and input tax credit is claimed only on invoices that match.',
    },
    {
      q: 'Can MAVRO handle multiple companies and plants?',
      a: 'Yes. MAVRO Accounting runs multiple entities, branches and plants on one platform, in multiple currencies. Inter-entity balances are agreed and eliminated, and consolidated statements are produced from the posted ledger without spreadsheets.',
    },
    {
      q: 'How does MAVRO speed up the month-end close?',
      a: 'MAVRO reconciles bank, inter-entity and clearing accounts as the month runs rather than at the end. Journals post automatically from source documents, manual journals go through maker-checker approval, and the close checklist shows what is left before a period is locked.',
    },
  ],
  seo: {
    title: 'Accounting software with GST returns and auto journals | MAVRO',
    description:
      'MAVRO Accounting: a live general ledger posted from every transaction, GST returns built from posted invoices, bank reconciliation by rules and multi-entity statements.',
  },
};
