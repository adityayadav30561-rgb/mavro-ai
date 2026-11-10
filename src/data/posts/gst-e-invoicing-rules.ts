import type { PostBody } from './index';

/*
 * Informational. Checked 2026-11-10. E-invoicing for AATO above ₹5 crore (in any financial year since 2017-18) from
 * 1 August 2023; exempt categories; IRN and QR code from the IRP; an invoice without a valid IRN is not a valid tax
 * invoice; the 30-day reporting limit for AATO of ₹10 crore and above from 1 April 2025, for invoices, credit notes
 * and debit notes (Tally, GimBooks, TaxBuddy, Fonoa agree). Left out on purpose: the unconfirmed "₹2 crore" proposal,
 * the threshold history before 2023, B2C dynamic QR rules.
 */
export const post: PostBody = {
  slug: 'gst-e-invoicing-rules',
  takeaways: [
    'A business must issue GST e-invoices for business-to-business supplies once its aggregate annual turnover (AATO) has passed ₹5 crore in any financial year since 2017-18.',
    'An e-invoice is reported to the Invoice Registration Portal (IRP), which returns an Invoice Reference Number (IRN) and a signed QR code.',
    'For a business that must e-invoice, an invoice without a valid IRN is not a valid tax invoice, which puts the buyer’s input tax credit at risk.',
    'Businesses with an AATO of ₹10 crore or more must report each invoice, credit note and debit note within 30 days of its date.',
  ],
  sections: [
    {
      id: 'who-must-e-invoice',
      heading: 'Who must issue GST e-invoices?',
      blocks: [
        { kind: 'p', text: 'Every GST-registered business whose aggregate annual turnover (AATO) has passed ₹5 crore in any financial year since 2017-18 must e-invoice its business-to-business supplies.' },
        { kind: 'p', text: 'The threshold has been ₹5 crore since 1 August 2023. Because it looks at any year since 2017-18, a business that crossed it once stays in, even if turnover later falls.' },
        { kind: 'p', text: 'Turnover here is aggregate turnover across all registrations on the same PAN, not one branch or one state.' },
      ],
    },
    {
      id: 'who-is-exempt',
      heading: 'Who is exempt from e-invoicing?',
      blocks: [
        { kind: 'p', text: 'Some businesses are outside e-invoicing whatever their turnover:' },
        {
          kind: 'list',
          items: [
            'Banks, NBFCs and insurers.',
            'Goods transport agencies.',
            'Passenger transport services.',
            'Admission to multiplex cinemas.',
          ],
        },
        { kind: 'p', text: 'The list is set by notification, so check it against your own category. An exemption covers the business, not just one kind of invoice it raises.' },
      ],
    },
    {
      id: 'thresholds',
      heading: 'Which rules apply at which turnover?',
      blocks: [
        { kind: 'p', text: 'Two thresholds matter: ₹5 crore brings e-invoicing in, and ₹10 crore adds the 30-day reporting limit.' },
        {
          kind: 'table',
          caption: 'E-invoicing obligations by aggregate annual turnover (AATO)',
          head: ['AATO in any year since 2017-18', 'Must e-invoice?', '30-day reporting limit?'],
          rows: [
            ['Up to ₹5 crore', 'No', 'No'],
            ['Above ₹5 crore, below ₹10 crore', 'Yes', 'No'],
            ['₹10 crore or more', 'Yes', 'Yes'],
          ],
          note: 'For businesses that are not in an exempt category. Thresholds as checked on the date above.',
        },
        { kind: 'p', text: 'Growing businesses cross these lines without noticing. Checking turnover against both thresholds at each year end avoids starting late.' },
      ],
    },
    {
      id: 'what-is-an-e-invoice',
      heading: 'What makes an invoice an e-invoice?',
      blocks: [
        { kind: 'p', text: 'An e-invoice is a normal tax invoice that has been reported to the government’s Invoice Registration Portal (IRP) and registered there.' },
        {
          kind: 'steps',
          items: [
            { title: 'Raise the invoice', text: 'The seller raises the invoice in its own system, with all the usual GST details.' },
            { title: 'Report it to the IRP', text: 'The invoice data goes to the Invoice Registration Portal in the standard format.' },
            { title: 'Receive the IRN and QR code', text: 'The IRP validates it and returns an Invoice Reference Number and a digitally signed QR code.' },
            { title: 'Send the invoice', text: 'The invoice goes to the buyer with the IRN and QR code printed on it.' },
          ],
        },
        { kind: 'p', text: 'Done well, this happens in seconds, inside the system that raised the invoice. Nobody should be keying invoices into a portal by hand.' },
      ],
    },
    {
      id: 'why-the-irn-matters',
      heading: 'What happens if an invoice has no IRN?',
      blocks: [
        { kind: 'p', text: 'For a business that must e-invoice, an invoice without a valid IRN is not a valid tax invoice.' },
        { kind: 'p', text: 'The harm falls on the buyer first. Without a valid tax invoice, their input tax credit on that purchase is at risk, so buyers increasingly check for the IRN before they pay.' },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'A missing IRN is a customer problem',
          text: 'An invoice that cannot carry input tax credit will be queried or held by the buyer’s finance team. Reporting every invoice on the day it is raised avoids the conversation.',
        },
      ],
    },
    {
      id: 'thirty-day-rule',
      heading: 'What is the 30-day reporting rule?',
      blocks: [
        { kind: 'p', text: 'Businesses with an AATO of ₹10 crore or more must report each invoice, credit note and debit note to the IRP within 30 days of its date.' },
        { kind: 'p', text: 'After 30 days the portal will not accept it. The rule has applied at ₹10 crore since 1 April 2025.' },
        { kind: 'p', text: 'Below ₹10 crore the 30-day limit does not apply, but e-invoicing still does once turnover has passed ₹5 crore.' },
        { kind: 'p', text: 'The safe practice is the same for both: report every document the day it is raised, rather than in weekly or month-end batches.' },
      ],
    },
    {
      id: 'finance-checklist',
      heading: 'What should finance teams check?',
      blocks: [
        { kind: 'p', text: 'Most e-invoicing problems are process problems, so the checks are simple:' },
        {
          kind: 'list',
          items: [
            'Each year’s turnover against the ₹5 crore and ₹10 crore thresholds.',
            'That credit notes and debit notes are reported, not only invoices.',
            'That documents are reported on the day they are raised.',
            'That the IRN and QR code reach both the printed and the emailed invoice.',
            'That cancelled or rejected reports are corrected before month end.',
          ],
        },
        { kind: 'p', text: 'The same posted invoices feed GSTR-1. When e-invoicing runs from the invoicing system itself, the return and the reported invoices agree by construction.' },
      ],
    },
    {
      id: 'credit-and-debit-notes',
      heading: 'Do credit notes and debit notes need e-invoicing too?',
      blocks: [
        { kind: 'p', text: 'Yes. For a business that must e-invoice, credit notes and debit notes are reported to the IRP in the same way as invoices.' },
        { kind: 'p', text: 'They are also inside the 30-day rule. A business at ₹10 crore or more must report a credit note within 30 days of its date, or the portal will not accept it.' },
        { kind: 'p', text: 'Credit notes are where processes slip most. They are often raised by sales or service teams, outside the invoicing routine, and reported late or not at all.' },
        { kind: 'p', text: 'Raising every credit note in the same system as the invoice it corrects keeps them reported on time and linked to the original.' },
      ],
    },
    {
      id: 'bolted-on-e-invoicing',
      heading: 'What goes wrong when e-invoicing is bolted on?',
      blocks: [
        { kind: 'p', text: 'E-invoicing run as a separate step, after the invoice is made somewhere else, creates predictable problems:' },
        {
          kind: 'list',
          items: [
            'Invoices uploaded in batches, so some miss the 30-day limit.',
            'The books and the IRP disagree when an invoice is edited after it was reported.',
            'Credit notes forgotten because they never pass through the upload step.',
            'Printed invoices sent without the IRN and QR code.',
            'GSTR-1 rebuilt by hand instead of from the reported invoices.',
          ],
        },
        { kind: 'p', text: 'Each of these goes away when the system that raises the invoice also reports it, at the moment it is raised.' },
      ],
    },
    {
      id: 'crossing-the-threshold',
      heading: 'How should a business prepare to cross ₹5 crore?',
      blocks: [
        { kind: 'p', text: 'A growing business should prepare before it crosses ₹5 crore, not after the first invoice that needed an IRN.' },
        {
          kind: 'steps',
          items: [
            { title: 'Watch turnover', text: 'Track aggregate turnover across all registrations on the PAN during the year, not only at year end.' },
            { title: 'Check customer data', text: 'Make sure every business customer has a correct GSTIN and address.' },
            { title: 'Connect invoicing', text: 'Set up reporting to the IRP from the invoicing system itself.' },
            { title: 'Test', text: 'Report a few test invoices and credit notes and check the IRN and QR code on the output.' },
          ],
        },
        { kind: 'p', text: 'Starting early also means the move to the 30-day limit at ₹10 crore needs no change at all.' },
      ],
    },
    {
      id: 'e-invoicing-and-gstr-1',
      heading: 'How does e-invoicing connect to GSTR-1?',
      blocks: [
        { kind: 'p', text: 'The details of reported e-invoices flow into the seller’s GSTR-1, the return of outward supplies. That removes most of the work of preparing it.' },
        { kind: 'p', text: 'It also means GSTR-1 can only be as accurate as the reporting. An invoice reported with a wrong GSTIN or amount carries the error into the return.' },
        { kind: 'p', text: 'Reconciling the books, the IRP and GSTR-1 every month catches the few documents that differ, before the buyer’s GSTR-2B shows the difference.' },
      ],
    },
    {
      id: 'what-buyers-check',
      heading: 'What should a buyer check on an e-invoice?',
      blocks: [
        { kind: 'p', text: 'Buyers have a direct interest in the seller’s e-invoicing, because their credit depends on it. A quick check on receipt helps:' },
        {
          kind: 'list',
          items: [
            'The IRN and QR code are on the invoice.',
            'The buyer’s GSTIN and the place of supply are right.',
            'The invoice matches the purchase order and what was received.',
            'The same invoice later appears in the buyer’s GSTR-2B.',
          ],
        },
        { kind: 'p', text: 'An invoice that fails any of these is cheaper to query on the day it arrives than at month end.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How does MAVRO handle GST e-invoicing?',
      blocks: [
        { kind: 'p', text: 'MAVRO is GST-compliant at every touchpoint, with e-invoicing built in. Invoices are raised as e-invoices from the order or contract in [Order to Cash](/modules/order-to-cash), not keyed in afterwards.' },
        { kind: 'figure', module: 'order-to-cash', caption: 'The order book in MAVRO Order to Cash, where orders become invoices.' },
        { kind: 'p', text: 'The same posted invoices, credit notes and vendor bills feed GSTR-1 and GSTR-3B in MAVRO’s [accounting and GST software](/modules/accounting), so the returns and the books agree.' },
        { kind: 'p', text: 'Because e-invoicing, GSTR-1 and the ledger all read the same posted documents, a correction is made once, in the transaction, and every report follows. Finance teams spend the month end reviewing exceptions rather than rebuilding returns.' },
        { kind: 'p', text: 'Customer GSTINs are checked when the customer is set up, so the most common reporting error is stopped before the first invoice is raised.' },
        { kind: 'p', text: 'For the purchase side of GST, see [GSTR-2B and IMS: how to claim input tax credit](/blog/gstr-2b-and-ims).' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the e-invoice limit under GST in 2026?',
      a: 'E-invoicing applies once a business’s aggregate annual turnover has passed ₹5 crore in any financial year since 2017-18. The threshold has been ₹5 crore since 1 August 2023.',
    },
    {
      q: 'What is the 30-day rule for e-invoices?',
      a: 'Businesses with an aggregate annual turnover of ₹10 crore or more must report each invoice, credit note and debit note to the IRP within 30 days of its date. After that the portal will not accept it.',
    },
    {
      q: 'Is an invoice valid without an IRN?',
      a: 'Not for a business that must e-invoice. Its invoice without a valid IRN is not a valid tax invoice, which puts the buyer’s input tax credit at risk.',
    },
    {
      q: 'Who is exempt from GST e-invoicing?',
      a: 'Banks, NBFCs and insurers, goods transport agencies, passenger transport services and multiplex cinema admissions, among others, are exempt whatever their turnover.',
    },
    {
      q: 'Do credit notes need an IRN?',
      a: 'Yes, for a business that must e-invoice. Credit notes and debit notes are reported to the IRP like invoices, and at ₹10 crore or more they must be reported within 30 days of their date.',
    },
  ],
  sources: [
    { label: 'Tally: e-invoicing rules in India, 2026', url: 'https://tallysolutions.com/accounting/e-invoicing-rules-in-india/' },
    { label: 'GimBooks: is the ₹5 crore e-invoice rule still applicable in 2026?', url: 'https://www.gimbooks.com/blog/5-crore-e-invoice-turnover-rule-2026/amp/' },
    { label: 'TaxBuddy: what is the e-invoice limit', url: 'https://www.taxbuddy.com/blog/what-is-the-e-invoice-limit' },
    {
      label: 'Fonoa: India imposes a time limit to report invoices on the Invoice Registration Portals',
      url: 'https://www.fonoa.com/resources/blog/india-imposes-a-new-time-limit-to-report-invoices-in-the-invoice-registration-portals',
    },
  ],
};
