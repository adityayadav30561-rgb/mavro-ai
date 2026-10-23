import type { ModuleContent } from '../schema';

/*
 * Order to Cash. Source: product deck v2, slides 34–35 (tagline, four tiles, what it does, why it matters, four
 * screens). The deck describes it for distribution-led pharma; the page keeps its capabilities and states them for
 * every industry. Figures on the tiles come from the module's screens (prototype/modules/order-to-cash/), whose
 * scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'order-to-cash'> = {
  slug: 'order-to-cash',
  tagline: 'Order capture to collection: credit-safe, batch-accurate revenue operations.',
  tiles: [
    {
      icon: 'orders',
      title: 'Order book health',
      body: 'Open orders by channel, with fill rate and DSO beside them.',
      figure: { value: '₹4.86 Cr', label: 'open orders' },
    },
    {
      icon: 'shield',
      title: 'Credit and exposure',
      body: 'Limit breaches are held before any stock is allocated.',
      figure: { value: '3', label: 'on credit hold' },
    },
    {
      icon: 'inventory',
      title: 'Batch allocation',
      body: 'FEFO and shelf-life rules on every order line.',
      figure: { value: '42 / 61', label: 'fully allocated' },
    },
    {
      icon: 'finance',
      title: 'Dunning engine',
      body: 'Reminders, escalation and holds driven by invoice ageing.',
      figure: { value: '₹12.4 L', label: 'over 60 days' },
    },
  ],
  what: 'The commercial cycle in one module: the order book and its health by channel, pricing and scheme validation as orders are entered, credit exposure checks, allocation that respects batch and shelf life, GST-compliant invoicing, and a collections and dunning queue driven by invoice ageing.',
  why: [
    'Overdue receivables are visible by ageing bucket, with an owner for every account.',
    'Credit-blocked orders go to the right releaser instead of stalling.',
    'Shelf-life failures are caught at allocation, not at the customer’s dock.',
    'Fill rate and short supply trace back to available stock, item by item.',
    'GST e-invoice and place-of-supply eligibility are checked before an invoice posts.',
    'Collections and DSO sit on the same screen as the order book.',
  ],
  flow: {
    from: [
      { slug: 'crm', passes: 'Won quotations become orders' },
      { slug: 'sales-force-automation', passes: 'Orders booked in the field' },
      { slug: 'distributor-portal', passes: 'Primary orders from distributors' },
      { slug: 'scheme-and-rebate', passes: 'Schemes checked at order entry' },
    ],
    to: [
      { slug: 'inventory-management', passes: 'Reservations and allocated lots' },
      { slug: 'production-management', passes: 'Make-to-order demand' },
      { slug: 'transportation-management', passes: 'Orders ready to dispatch' },
      { slug: 'accounting', passes: 'Invoices and receipts to the ledger' },
    ],
  },
  industries: [
    {
      slug: 'manufacturing',
      note: 'Make-to-order lines reserved from stock or planned into production, and the order follows its work order.',
    },
    { slug: 'distribution', note: 'Schemes, stock and credit checked as orders come in from every channel.' },
    {
      slug: 'pharma',
      note: 'FEFO and shelf-life rules on every line, so short-dated stock is caught before it ships.',
    },
    { slug: 'service-providers', note: 'Orders invoiced with GST and collected against one customer ledger.' },
  ],
  roles: [
    {
      name: 'Order desk',
      task: 'Captures orders with schemes, stock and credit checked as they are entered.',
      works: 'Sales orders',
    },
    {
      name: 'Sales managers',
      task: 'Watch the order book by channel and ask for credit releases.',
      works: 'Order book',
    },
    {
      name: 'Sales head',
      task: 'Releases or rejects held orders, from the web or the phone.',
      works: 'Credit control',
    },
    { name: 'Credit controllers', task: 'Work the dunning queue and record promises to pay.', works: 'Collections' },
    { name: 'Finance', task: 'Sees invoices, receipts and DSO post to the ledger as they happen.', works: 'Invoices' },
  ],
  related: ['crm', 'sales-force-automation', 'customer-service', 'scheme-and-rebate'],
  screens: [
    {
      screen: 'order-to-cash/order-book',
      view: 'Order book',
      title: 'Order book',
      caption: 'Open orders with their credit status, allocation and stage, so the day starts from what is stuck.',
      alt: 'MAVRO Order to Cash order book: ₹4.86 Cr of open orders, three on credit hold worth ₹38.2 L, nine to dispatch this week and ₹12.4 L overdue, the order list with credit and allocation, a credit check for Kestrel Pumps and receivables by age (illustrative data).',
    },
    {
      screen: 'order-to-cash/order-workflow',
      view: 'Sales orders',
      title: 'Order workflow',
      caption:
        'One order from enquiry to payment: its document flow, fulfilment from stock and production, and its credit.',
      alt: 'MAVRO sales order SO-24817 for Kestrel Pumps: the document flow from enquiry to payment, 310 pieces reserved from stock and 890 in production, the order lines, commercials of ₹21,73,560 within the credit limit and seven linked documents (illustrative data).',
    },
    {
      screen: 'order-to-cash/collections',
      view: 'Collections',
      title: 'Collections and dunning',
      caption: 'Receivables by age with an owner per account, and each account’s stage on the dunning ladder.',
      alt: 'MAVRO collections and dunning queue: ₹1.37 Cr outstanding, ₹12.4 L over 60 days, ten accounts with their oldest invoice, dunning stage, owner and next step, receivables by age and the dunning ladder from courtesy notice to credit hold (illustrative data).',
    },
    {
      screen: 'order-to-cash/order-register',
      view: 'Order register',
      title: 'Sales order register',
      caption:
        'Every order in the period with its allocation, invoice and e-invoice status, ready to filter and export.',
      alt: 'MAVRO sales order register for 1 September to 8 October: 186 orders worth ₹11.40 Cr, ₹6.54 Cr invoiced, ₹4.86 Cr open with 42 of 61 open orders fully allocated, and the order list with channel, allocation, status, invoice and e-invoice IRN (illustrative data).',
    },
  ],
  phone: {
    screen: 'order-to-cash/credit-release',
    view: 'Credit control',
    title: 'Credit release',
    caption: 'The sales head releases a held order from the phone.',
    alt: 'MAVRO phone app: credit release for SO-24861, Orion Agro Equipment, ₹14,62,000, taking exposure to ₹42.10 L against a ₹40 L limit, with payment behaviour and Release and Reject buttons (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, Plant 1 Pune, 8 Oct. ₹4.86 Cr open across 61 orders (42 fully allocated); 3 orders on credit hold worth ₹38.2 L, including SO-24861 (Orion Agro Equipment, ₹14,62,000, over its ₹40 L limit by ₹2.10 L) and SO-24873 (Anand Engineering Works, held for ₹3.4 L over 90 days). Receivables ₹1.37 Cr, ₹12.4 L over 60 days. SO-24817 for Kestrel Pumps: 1,200 IH-220 housings, ₹21,73,560, 310 from stock and 890 on WO-5521.',
  faq: [
    {
      q: 'What does the Order to Cash module in MAVRO do?',
      a: 'MAVRO Order to Cash runs the commercial cycle from order capture to collection. It checks pricing, schemes and credit as an order is entered, allocates stock by batch and shelf life, raises GST-compliant invoices with e-invoicing, and works an ageing-driven collections and dunning queue, with the order book, collections and DSO on one screen.',
    },
    {
      q: 'How does MAVRO handle an order that exceeds the customer’s credit limit?',
      a: 'MAVRO checks credit exposure, meaning outstanding invoices plus open orders plus the new order, before any stock is allocated. An order that breaches the limit is held and routed to the person who can release it, who approves or rejects it on the web or in the MAVRO mobile app, so the order does not stall in a queue.',
    },
    {
      q: 'Does MAVRO support GST e-invoicing in Order to Cash?',
      a: 'Yes. MAVRO checks e-invoice and place-of-supply eligibility before an invoice posts, raises the invoice on dispatch with its e-invoice reference, and posts it to the ledger and the GST returns, so sales are reported from the same transactions that were invoiced.',
    },
    {
      q: 'How does automated dunning work in MAVRO?',
      a: 'MAVRO dunning is driven by invoice ageing. Reminders go out at the days past due you set, then escalate to a collector call, a final notice and, if needed, a credit hold on new orders. Every account has an owner, and promises to pay and disputes are recorded against it.',
    },
    {
      q: 'Can MAVRO allocate stock by batch and expiry date?',
      a: 'Yes. MAVRO allocates order lines against batches with FEFO and shelf-life rules, so stock that would expire too soon is caught at allocation rather than at the customer’s dock. Batch, lot and serial tracking come from MAVRO Inventory Management, on the same items and warehouses.',
    },
  ],
  seo: {
    title: 'Order to Cash software with credit checks and dunning | MAVRO',
    description:
      'MAVRO Order to Cash takes an order from capture to collection: scheme and credit checks, batch-aware allocation, GST e-invoicing on dispatch and an ageing-driven dunning queue.',
  },
};
