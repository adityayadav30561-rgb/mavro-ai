import type { PostBody } from './index';

/*
 * Informational + selling. Checked 2026-11-10. Practice, not law: three-way matching checks the purchase order, the
 * goods receipt and the supplier invoice before payment, and holds payment on a mismatch; two-way matching drops the
 * receipt and suits services and low-value items (PayStream Advisors, Peakflo, Aspire agree). The chart is an example
 * month, said so in its caption; no tolerance percentages are given (none sourced). MAVRO facts: the Vendor Invoice
 * Management, Procure to Pay and Gate Entry module pages (OCR capture, 3-way match with tolerance rules, GSTR-2B
 * reconciliation with at-risk credit held, maker-checker payment runs with TDS and early-payment discounts).
 */
export const post: PostBody = {
  slug: 'three-way-matching',
  takeaways: [
    'Three-way matching checks a supplier invoice against the purchase order and the goods receipt before it is paid.',
    'Payment waits until the three agree, within agreed tolerances, or until someone resolves the difference.',
    'It stops duplicate and inflated invoices and payment for goods that never arrived.',
    'In India it also protects input tax credit, because the matched invoice is the evidence behind every GST claim.',
  ],
  sections: [
    {
      id: 'what-is-three-way-matching',
      heading: 'What is three-way matching?',
      blocks: [
        { kind: 'p', text: 'Three-way matching is an accounts payable control. Before a supplier invoice is paid, it is checked against two other documents.' },
        {
          kind: 'table',
          caption: 'The three documents in a three-way match',
          head: ['Document', 'Who creates it', 'What it proves'],
          rows: [
            ['Purchase order (PO)', 'Purchasing', 'What was ordered, at what price and on what terms'],
            ['Goods receipt note (GRN)', 'Stores or the gate', 'What actually arrived, and in what quantity'],
            ['Supplier invoice', 'The supplier', 'What the supplier is asking to be paid'],
          ],
        },
        { kind: 'p', text: 'The invoice is paid only when the three agree on item, quantity and price. If they do not, payment waits until the difference is resolved.' },
      ],
    },
    {
      id: 'two-three-four-way',
      heading: 'What is the difference between two-way, three-way and four-way matching?',
      blocks: [
        { kind: 'p', text: 'The difference is how many documents the invoice is checked against.' },
        {
          kind: 'table',
          caption: 'Matching levels compared',
          head: ['Level', 'Checks the invoice against', 'Typically used for'],
          rows: [
            ['Two-way', 'The purchase order', 'Services, digital goods and low-value items with no physical receipt'],
            ['Three-way', 'The purchase order and the goods receipt', 'Physical goods: materials, parts, finished goods'],
            ['Four-way', 'The above, plus a further check such as quality inspection', 'Goods that must pass inspection before they are accepted'],
          ],
        },
        { kind: 'p', text: 'Most businesses use more than one level. A plant may match raw materials three or four ways and a software subscription two ways.' },
      ],
    },
    {
      id: 'how-it-works',
      heading: 'How does three-way matching work, step by step?',
      blocks: [
        { kind: 'p', text: 'The match runs on documents that already exist in a well-run purchasing process:' },
        {
          kind: 'steps',
          items: [
            { title: 'Order', text: 'Purchasing raises a PO with the item, quantity, price and terms.' },
            { title: 'Receive', text: 'Stores record the goods receipt against the PO when the delivery arrives, after any inspection.' },
            { title: 'Capture the invoice', text: 'The supplier’s invoice is captured and linked to the PO.' },
            { title: 'Match', text: 'The system compares the three on item, quantity and price, within agreed tolerances.' },
            { title: 'Approve or hold', text: 'Matched invoices go to payment; mismatches go to an exception queue with a reason.' },
          ],
        },
        { kind: 'p', text: 'The control works only if the goods receipt is recorded honestly and promptly. An invoice cannot be matched to a delivery nobody logged.' },
      ],
    },
    {
      id: 'tolerances',
      heading: 'What are matching tolerances?',
      blocks: [
        { kind: 'p', text: 'A tolerance is the difference the business accepts without a manual check. Small differences are normal: rounding, freight, a few units short on a large delivery.' },
        { kind: 'p', text: 'Tolerances are usually set separately for price and quantity, and sometimes per supplier or per category. A strategic supplier of high-value parts may get a tighter tolerance than a stationery vendor.' },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Set tolerances deliberately',
          text: 'Too tight, and the exception queue fills with trivia. Too loose, and the control waves through overcharges. Review them every quarter against the exceptions you actually see.',
        },
      ],
    },
    {
      id: 'common-mismatches',
      heading: 'What causes a mismatch?',
      blocks: [
        { kind: 'p', text: 'Most exceptions fall into a handful of types, each with an obvious owner:' },
        {
          kind: 'table',
          caption: 'Common mismatches and who resolves them',
          head: ['Mismatch', 'Usual cause', 'Resolved by'],
          rows: [
            ['Price above the PO', 'Old price on the invoice, or an unagreed increase', 'Purchasing, with the supplier'],
            ['Quantity above the receipt', 'Short delivery, or a receipt not yet recorded', 'Stores'],
            ['No goods receipt', 'Goods not arrived, or the receipt was not logged', 'Stores'],
            ['No purchase order', 'An order placed outside the process', 'The requester and purchasing'],
            ['Duplicate invoice', 'The same invoice sent or captured twice', 'Accounts payable'],
          ],
        },
        { kind: 'p', text: 'Routing each type to its owner automatically is what keeps the queue short. Accounts payable should not be chasing stores by phone.' },
      ],
    },
    {
      id: 'example-month',
      heading: 'What does a typical month look like?',
      blocks: [
        { kind: 'p', text: 'In a mature process, most invoices match first time. The effort goes into the few that do not.' },
        {
          kind: 'chart',
          title: 'Example month: supplier invoices by match result',
          caption: 'An example to show the shape of the work, not data from any business.',
          categories: ['Matched first time', 'Within tolerance', 'Sent to exceptions'],
          series: [{ name: 'Invoices', values: [412, 36, 22] }],
          format: 'number',
        },
        { kind: 'p', text: 'If exceptions are a large share of invoices, the problem is usually upstream. Orders placed without POs and receipts logged late generate most of them.' },
      ],
    },
    {
      id: 'why-it-matters',
      heading: 'Why does three-way matching matter?',
      blocks: [
        { kind: 'p', text: 'Without it, a business pays what it is asked rather than what it owes. The control prevents several costly errors:' },
        {
          kind: 'list',
          items: [
            'Paying the same invoice twice.',
            'Paying a higher price than was agreed.',
            'Paying for goods that never arrived or arrived short.',
            'Paying for orders nobody approved.',
          ],
        },
        { kind: 'p', text: 'It also gives auditors a clear trail. Every payment can be traced back to an approved order and a recorded delivery.' },
      ],
    },
    {
      id: 'gst-and-matching',
      heading: 'How does three-way matching help with GST?',
      blocks: [
        { kind: 'p', text: 'In India, the matched invoice is also the evidence behind input tax credit. Credit needs a valid tax invoice and goods or services actually received, and three-way matching checks both.' },
        { kind: 'p', text: 'A business that matches three ways already knows which supplier documents are real and right. That makes the monthly review of supplier documents on the GST portal fast, because each action follows the match result.' },
        { kind: 'p', text: 'For how that review works, see [GSTR-2B and IMS: how to claim input tax credit](/blog/gstr-2b-and-ims).' },
      ],
    },
    {
      id: 'handling-exceptions',
      heading: 'How should exceptions be handled?',
      blocks: [
        { kind: 'p', text: 'An exception queue works when every item has a reason, an owner and an age.' },
        {
          kind: 'list',
          items: [
            'Show why each invoice failed, not just that it failed.',
            'Assign it to the team that can fix it.',
            'Track how long it has been open, and escalate old items.',
            'Record how it was resolved, for the next audit.',
          ],
        },
        { kind: 'p', text: 'Suppliers chase less when they can see where their invoice stands. Visibility of payment status and dates is a quiet but real benefit.' },
      ],
    },
    {
      id: 'who-owns-it',
      heading: 'Who owns three-way matching?',
      blocks: [
        { kind: 'p', text: 'Three teams create the documents, so no single team can own the whole control. Each owns its part.' },
        {
          kind: 'list',
          items: [
            'Purchasing owns the PO: right item, right price, approved before the order is placed.',
            'Stores own the goods receipt: what arrived, recorded the day it arrived.',
            'Accounts payable owns the match and the payment, and the exception queue.',
          ],
        },
        { kind: 'p', text: 'Most matching problems are really PO or receipt problems that surface in accounts payable. Fixing them where they start is faster than chasing them at payment time.' },
      ],
    },
    {
      id: 'what-a-receipt-records',
      heading: 'What does a goods receipt need to record?',
      blocks: [
        { kind: 'p', text: 'The goods receipt is the document most often missing or thin. For matching to work, it needs a few fields every time:' },
        {
          kind: 'list',
          items: [
            'The PO it is received against, and the supplier’s delivery note number.',
            'The quantity received, by item, and any shortfall.',
            'The batch or lot, and the expiry where it applies.',
            'The inspection result, where goods are inspected before acceptance.',
            'The date of receipt.',
          ],
        },
        { kind: 'p', text: 'Recording the receipt at the gate, as the vehicle arrives, means it exists before the invoice does. That is what lets most invoices match first time.' },
      ],
    },
    {
      id: 'partial-deliveries',
      heading: 'How does matching handle partial deliveries?',
      blocks: [
        { kind: 'p', text: 'One PO often arrives in several deliveries, and suppliers may invoice per delivery or once for the lot.' },
        { kind: 'p', text: 'The match should work at line level, against what has been received so far. An invoice for the first delivery matches the first receipt; the PO stays open for the rest.' },
        { kind: 'p', text: 'Where one invoice covers several deliveries, it is matched against the sum of their receipts. The system needs to track what has already been invoiced, so nothing is paid twice.' },
      ],
    },
    {
      id: 'before-automating',
      heading: 'What should be fixed before automating the match?',
      blocks: [
        { kind: 'p', text: 'Automation makes a good process fast and a poor one noisy. Three basics come first:' },
        {
          kind: 'steps',
          items: [
            { title: 'PO discipline', text: 'Every purchase that should have a PO gets one, before the order is placed.' },
            { title: 'Clean masters', text: 'Suppliers, items and units of measure are set up once and correctly.' },
            { title: 'Timely receipts', text: 'Deliveries are received in the system on the day they arrive.' },
          ],
        },
        { kind: 'p', text: 'With these in place, the exception queue holds real problems instead of paperwork gaps.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How does MAVRO handle three-way matching?',
      blocks: [
        { kind: 'p', text: 'In MAVRO, every vendor invoice is read by OCR and matched three ways against the PO and the goods receipt in [Vendor Invoice Management](/modules/vendor-invoice-management), with tolerance rules. Mismatches go to an exception queue with their reasons.' },
        { kind: 'figure', module: 'vendor-invoice-management', caption: 'MAVRO Vendor Invoice Management: invoices captured, matched and moved to payment.' },
        { kind: 'p', text: 'Purchase orders come from [Procure to Pay](/modules/procure-to-pay), and deliveries are recorded against the PO at the gate in [Gate Entry](/modules/gate-entry), so the receipt exists before the invoice arrives.' },
        { kind: 'p', text: 'Invoices are reconciled against GSTR-2B, and credit at risk is flagged and held. Payment runs are maker-checker approved, with TDS and early-payment discounts applied.' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is three-way matching in accounts payable?',
      a: 'Three-way matching checks a supplier invoice against the purchase order and the goods receipt before payment. The invoice is paid only when item, quantity and price agree, within tolerance.',
    },
    {
      q: 'What is the difference between two-way and three-way matching?',
      a: 'Two-way matching checks the invoice against the purchase order only. Three-way matching adds the goods receipt, so it also proves the goods arrived. Two-way suits services and low-value items.',
    },
    {
      q: 'What is a matching tolerance?',
      a: 'A tolerance is the price or quantity difference a business accepts without a manual check. Differences inside it pass; larger ones go to an exception queue.',
    },
    {
      q: 'Does three-way matching help with GST input tax credit?',
      a: 'Yes. Credit needs a valid tax invoice and goods actually received. Three-way matching checks both, so matched invoices are the evidence behind each claim and the GSTR-2B review.',
    },
    {
      q: 'What happens when an invoice does not match?',
      a: 'It goes to an exception queue with the reason, such as a price above the PO or no goods receipt, and is routed to the team that can resolve it. It is not paid until the difference is cleared.',
    },
  ],
  sources: [
    { label: 'PayStream Advisors: three-way matching in accounts payable', url: 'https://paystreamadvisors.com/blog/three-way-matching/' },
    { label: 'Peakflo: 3-way matching', url: 'https://blog.peakflo.co/en/account-payable/3-way-matching' },
    { label: 'Aspire: a guide to implementing 3-way matching in accounts payable', url: 'https://aspireapp.com/en-sg/blog/a-guide-to-three-way-matching' },
  ],
};
