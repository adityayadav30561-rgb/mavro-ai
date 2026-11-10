import type { PostBody } from './index';

/*
 * Checked 2026-11-10. E-invoicing for AATO above ₹5 crore from 1 August 2023; exempt categories; IRN and QR code; the
 * 30-day reporting limit for AATO of ₹10 crore and above from 1 April 2025, for invoices, credit and debit notes
 * (Tally, GimBooks, TaxBuddy, Fonoa agree). Left out on purpose: the unconfirmed "₹2 crore" proposal.
 */
export const post: PostBody = {
  slug: 'gst-e-invoicing-rules',
  sections: [
    {
      heading: 'Who must issue GST e-invoices?',
      paragraphs: [
        'A business must issue e-invoices for its business-to-business supplies once its aggregate annual turnover (AATO) has passed ₹5 crore in any financial year since 2017-18. The threshold has been ₹5 crore since 1 August 2023.',
        'Some businesses are exempt whatever their turnover: banks, NBFCs and insurers, goods transport agencies, passenger transport services and multiplex cinema admissions, among others.',
      ],
    },
    {
      heading: 'What makes an invoice an e-invoice?',
      paragraphs: [
        'An e-invoice is an invoice reported to the government’s Invoice Registration Portal (IRP), which returns an Invoice Reference Number (IRN) and a signed QR code to print on it.',
        'For a business that must e-invoice, an invoice without a valid IRN is not a valid tax invoice, which puts the buyer’s input tax credit at risk.',
      ],
    },
    {
      heading: 'What is the 30-day reporting rule?',
      paragraphs: [
        'Businesses with an AATO of ₹10 crore or more must report each invoice, credit note and debit note to the IRP within 30 days of its date; after that the portal will not accept it. The rule has applied at ₹10 crore since 1 April 2025.',
        'Businesses below ₹10 crore are not bound by the 30-day limit, but still have to e-invoice once they pass ₹5 crore.',
      ],
    },
    {
      heading: 'What should finance teams check?',
      paragraphs: [
        'Each year’s turnover against the thresholds; that invoices, credit notes and debit notes are reported on the day they are raised rather than in batches; and that the IRN and QR code reach the printed and emailed invoice.',
      ],
    },
  ],
  mavro: [
    'MAVRO is GST-compliant at every touchpoint, with e-invoicing built in: invoices are raised as e-invoices from the order or contract in Order to Cash, not keyed in afterwards.',
    'The same posted invoices, credit notes and vendor bills feed GSTR-1 and GSTR-3B in MAVRO Accounting, so the returns and the books agree.',
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
