import type { PostBody } from './index';

/*
 * Checked 2026-11-10. How the Invoice Management System (IMS) works with GSTR-2B and GSTR-3B: supplier documents appear
 * once saved in GSTR-1, IFF or GSTR-1A; accept, reject, pending; accepted feed GSTR-2B and GSTR-3B; rejected are
 * excluded; pending are held; no action counts as accepted; recompute GSTR-2B after changes; IMS does not replace the
 * statutory ITC conditions (Tally, Taxmann, GSTZen agree). Left out on purpose (sources disagree): day-of-month
 * deadlines and the GSTR-3B auto-population change.
 */
export const post: PostBody = {
  slug: 'gstr-2b-and-ims',
  sections: [
    {
      heading: 'What is GSTR-2B?',
      paragraphs: [
        'GSTR-2B is the monthly statement of input tax credit available to a buyer, built from what its suppliers have reported. It is the reference for how much credit can be claimed in GSTR-3B for the month.',
      ],
    },
    {
      heading: 'What does the Invoice Management System (IMS) change?',
      paragraphs: [
        'IMS lets the buyer act on each supplier document before it reaches GSTR-2B. As soon as a supplier saves an invoice, debit note or credit note in GSTR-1, IFF or GSTR-1A, it appears on the buyer’s IMS dashboard.',
        'The buyer can accept it, reject it or keep it pending. Accepted documents count towards credit in GSTR-2B and flow into GSTR-3B; rejected ones are left out; pending ones are held back until the buyer acts.',
      ],
    },
    {
      heading: 'What happens if the buyer does nothing?',
      paragraphs: [
        'A document the buyer does not act on is treated as accepted, so its credit flows through as if it had been checked. That makes reviewing the dashboard every month part of the close, not an option.',
        'After changing actions on documents, the buyer recomputes GSTR-2B on the portal so the statement reflects them.',
      ],
    },
    {
      heading: 'Does accepting an invoice in IMS make the credit valid?',
      paragraphs: [
        'No. IMS is a document-level workflow; it does not replace the conditions for claiming input tax credit. The buyer still needs a valid tax invoice, the goods or services actually received and the supplier’s tax paid, so each document is checked against the purchase record before it is accepted.',
      ],
    },
    {
      heading: 'A monthly routine that works',
      paragraphs: [
        'Match each supplier document to the purchase order, the goods receipt and the booked bill. Accept what matches, reject what is wrong or not yours, keep pending what is waiting on the supplier, recompute GSTR-2B, then claim the credit in GSTR-3B.',
      ],
    },
  ],
  mavro: [
    'In MAVRO, vendor invoices are matched three ways against the purchase order and the goods receipt in Vendor Invoice Management, and matched daily against GSTR-2B, so input tax credit is claimed only on invoices that match.',
    'Vendors are verified by GSTIN and PAN on onboarding, and MAVRO Accounting builds GSTR-1 and GSTR-3B from the posted documents.',
  ],
  sources: [
    { label: 'Tally: what is changing in GSTR-2B and GSTR-3B with IMS', url: 'https://tallysolutions.com/gst/ims-impact-on-gstr-2b-gstr-3b/' },
    { label: 'Taxmann: GST Invoice Management System (IMS) and ITC claims', url: 'https://www.taxmann.com/post/blog/gst-invoice-management-system-ims/' },
    { label: 'GSTZen: comprehensive overview of the Invoice Management System', url: 'https://gstzen.in/a/comprehensive-overview-of-invoice-management-system-ims.html' },
    { label: 'Tally: step-by-step guide to IMS on the GST portal', url: 'https://tallysolutions.com/gst/a-step-by-step-guide-on-how-to-use-ims-in-gst-portal/' },
  ],
};
