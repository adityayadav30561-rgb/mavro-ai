import type { PostBody } from './index';

/*
 * Informational. Checked 2026-11-10. How the Invoice Management System (IMS) works with GSTR-2B and GSTR-3B: supplier
 * documents appear once saved in GSTR-1, IFF or GSTR-1A; accept, reject, pending; accepted feed GSTR-2B and GSTR-3B;
 * rejected are excluded; pending are held; no action counts as accepted; recompute GSTR-2B after changes; IMS does not
 * replace the statutory ITC conditions (Tally, Taxmann, GSTZen agree). The chart is an example month, said so in its
 * caption. Left out on purpose (sources disagree): day-of-month deadlines, the GSTR-3B auto-population change, credit
 * note timing.
 */
export const post: PostBody = {
  slug: 'gstr-2b-and-ims',
  takeaways: [
    'GSTR-2B is the monthly statement of input tax credit available to a buyer, built from what its suppliers reported.',
    'The Invoice Management System (IMS) lets the buyer accept, reject or keep pending each supplier document before it reaches GSTR-2B.',
    'A document the buyer does not act on is treated as accepted, so reviewing IMS every month is part of the close.',
    'Accepting a document in IMS does not make the credit valid; the usual conditions for input tax credit still apply.',
  ],
  sections: [
    {
      id: 'what-is-gstr-2b',
      heading: 'What is GSTR-2B?',
      blocks: [
        { kind: 'p', text: 'GSTR-2B is the monthly statement of the input tax credit (ITC) available to a buyer. It is built from the invoices, debit notes and credit notes its suppliers have reported.' },
        { kind: 'p', text: 'It is the reference for how much credit the buyer can claim in its GSTR-3B return for the month. Credit that is not in GSTR-2B is hard to defend.' },
        { kind: 'p', text: 'Because it depends on suppliers’ filings, GSTR-2B is only as good as the supplier data behind it. That is the problem IMS was built to address.' },
      ],
    },
    {
      id: 'what-ims-changes',
      heading: 'What does the Invoice Management System (IMS) change?',
      blocks: [
        { kind: 'p', text: 'IMS puts the buyer in the loop before credit reaches GSTR-2B. As soon as a supplier saves a document in GSTR-1, IFF or GSTR-1A, it appears on the buyer’s IMS dashboard.' },
        { kind: 'p', text: 'The buyer then takes one of three actions on each document:' },
        {
          kind: 'table',
          caption: 'IMS actions and what they do',
          head: ['Action', 'Use it when', 'Effect on credit'],
          rows: [
            ['Accept', 'The document matches a real purchase you received', 'Counts towards credit in GSTR-2B and flows into GSTR-3B'],
            ['Reject', 'The document is wrong, duplicated or not yours', 'Left out of GSTR-2B and GSTR-3B'],
            ['Keep pending', 'You are waiting on the supplier or the goods', 'Held back until you act on it'],
          ],
        },
        { kind: 'p', text: 'After changing actions, the buyer recomputes GSTR-2B on the portal so the statement reflects them.' },
      ],
    },
    {
      id: 'doing-nothing',
      heading: 'What happens if the buyer does nothing?',
      blocks: [
        { kind: 'p', text: 'A document the buyer does not act on is treated as accepted. Its credit flows through as if someone had checked it.' },
        { kind: 'p', text: 'That default is convenient but risky. Credit on an invoice for goods never received, or on a supplier’s error, ends up in the return unless someone stops it.' },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Silence means accept',
          text: 'Make reviewing the IMS dashboard a fixed step in every month-end close, before GSTR-3B is filed, not an occasional clean-up.',
        },
      ],
    },
    {
      id: 'conditions-still-apply',
      heading: 'Does accepting an invoice in IMS make the credit valid?',
      blocks: [
        { kind: 'p', text: 'No. IMS is a document-level workflow; it does not replace the conditions for claiming input tax credit.' },
        {
          kind: 'list',
          items: [
            'The buyer still needs a valid tax invoice.',
            'The goods or services must actually have been received.',
            'The supplier must have paid the tax.',
          ],
        },
        { kind: 'p', text: 'So each document should be checked against the purchase record before it is accepted. IMS records the decision; the evidence still lives in purchasing and stores.' },
      ],
    },
    {
      id: 'example-month',
      heading: 'What does a typical month in IMS look like?',
      blocks: [
        { kind: 'p', text: 'Most documents in a month match and are accepted. The work is in the minority that do not.' },
        {
          kind: 'chart',
          title: 'Example month: supplier documents in IMS by action',
          caption: 'An example to show the shape of the work, not data from any business: most documents are accepted, a few wait and a few are rejected.',
          categories: ['Accepted', 'Kept pending', 'Rejected'],
          series: [{ name: 'Documents', values: [184, 11, 5] }],
          format: 'number',
        },
        { kind: 'p', text: 'The pending and rejected documents are where credit is protected. Each one needs a reason and, usually, a message to the supplier.' },
      ],
    },
    {
      id: 'reasons-to-reject',
      heading: 'When should a buyer reject or hold a document?',
      blocks: [
        { kind: 'p', text: 'Reject a document when it should never have been reported against you. Hold it when it may be right but the evidence is not in yet.' },
        {
          kind: 'list',
          items: [
            'Reject: wrong GSTIN, a duplicate, an invoice for another buyer, or a tax amount that does not match.',
            'Hold: goods not yet received, a disputed quantity, or a price under discussion with the supplier.',
            'Accept: the document matches the purchase order, the goods receipt and the booked bill.',
          ],
        },
        { kind: 'p', text: 'Keeping the reason with each action helps at the next month end, and if the tax department asks.' },
      ],
    },
    {
      id: 'monthly-routine',
      heading: 'What is a good monthly routine?',
      blocks: [
        { kind: 'p', text: 'A routine that works for most finance teams takes five steps:' },
        {
          kind: 'steps',
          items: [
            { title: 'Match', text: 'Match each supplier document to the purchase order, the goods receipt and the booked bill.' },
            { title: 'Accept', text: 'Accept the documents that match.' },
            { title: 'Reject or hold', text: 'Reject what is wrong and keep pending what waits on the supplier, with a reason for each.' },
            { title: 'Recompute', text: 'Recompute GSTR-2B so it reflects the month’s actions.' },
            { title: 'Claim', text: 'Claim the credit in GSTR-3B and follow up with suppliers on what you held or rejected.' },
          ],
        },
        { kind: 'p', text: 'The match step is where software earns its keep. Done by hand, it is the slowest part of the GST close.' },
      ],
    },
    {
      id: 'why-books-and-2b-disagree',
      heading: 'Why do GSTR-2B and the purchase register disagree?',
      blocks: [
        { kind: 'p', text: 'GSTR-2B and your purchase register rarely match line for line. The differences usually fall into a few groups:' },
        {
          kind: 'list',
          items: [
            'Timing: the supplier reported the invoice in a different month from the one you booked it in.',
            'Missing: the supplier has not reported the invoice at all yet.',
            'Errors: a wrong GSTIN, invoice number or tax amount on the supplier’s side or yours.',
            'Duplicates: the same invoice booked twice, or reported twice.',
            'In transit: the invoice is reported but the goods have not arrived.',
          ],
        },
        { kind: 'p', text: 'Sorting differences into these groups tells you who must act: you, the supplier, or nobody until next month.' },
      ],
    },
    {
      id: 'working-with-suppliers',
      heading: 'How should buyers handle suppliers who report late or wrongly?',
      blocks: [
        { kind: 'p', text: 'Credit lost to a supplier’s mistake is the buyer’s loss, so supplier follow-up belongs in the purchasing process.' },
        { kind: 'p', text: 'Tell the supplier exactly which document is missing or wrong, and by when it must be corrected. Keep that message with the IMS action.' },
        { kind: 'p', text: 'Track which suppliers cause repeated problems. That record is useful when choosing suppliers and when agreeing payment terms.' },
        { kind: 'p', text: 'A supplier portal where vendors see their own documents and queries cuts the email traffic considerably.' },
      ],
    },
    {
      id: 'month-end-gst-pack',
      heading: 'What belongs in the month-end GST pack?',
      blocks: [
        { kind: 'p', text: 'Keeping the same pack every month makes the close faster and any later question easy to answer.' },
        {
          kind: 'list',
          items: [
            'The reconciliation of GSTR-2B to the purchase register, with every difference grouped.',
            'The IMS actions taken, with a reason for each reject and hold.',
            'The credit claimed in GSTR-3B and how it ties to GSTR-2B.',
            'Open supplier queries carried into next month.',
          ],
        },
        { kind: 'p', text: 'When these come out of the same system that holds the purchases, the pack is a report rather than a week of spreadsheets.' },
      ],
    },
    {
      id: 'ims-and-three-way-matching',
      heading: 'How does IMS fit with three-way matching?',
      blocks: [
        { kind: 'p', text: 'Three-way matching checks each supplier invoice against the purchase order and the goods receipt before it is paid. It answers the question IMS asks: is this document real and right?' },
        { kind: 'p', text: 'A buyer that matches three ways already has the evidence for every IMS action. Matched invoices are accepted, unmatched ones are held or rejected, and the reason is the match result.' },
        { kind: 'p', text: 'Without it, IMS becomes a second, manual review of the same documents, done in a hurry before GSTR-3B is due.' },
      ],
    },
    {
      id: 'signs-to-fix',
      heading: 'What are the signs an ITC process needs fixing?',
      blocks: [
        { kind: 'p', text: 'A few signs show that input tax credit is being left to chance:' },
        {
          kind: 'list',
          items: [
            'IMS is reviewed only when there is time, so most documents are accepted by default.',
            'The GSTR-2B reconciliation happens after GSTR-3B is filed, not before.',
            'Supplier queries live in personal inboxes, with no record against the invoice.',
            'The same suppliers cause the same mismatches month after month.',
          ],
        },
        { kind: 'p', text: 'Each is a process gap more than a tax gap, and each is fixed by doing the match where the purchases already are.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How does MAVRO handle GSTR-2B and input tax credit?',
      blocks: [
        { kind: 'p', text: 'In MAVRO, vendor invoices are matched three ways against the purchase order and the goods receipt in [Vendor Invoice Management](/modules/vendor-invoice-management). They are also matched daily against GSTR-2B, so credit is claimed only on invoices that match.' },
        { kind: 'figure', module: 'vendor-invoice-management', caption: 'MAVRO Vendor Invoice Management, where vendor invoices are matched before they are approved.' },
        { kind: 'p', text: 'Vendors are verified by GSTIN and PAN on onboarding, and MAVRO’s [accounting and GST software](/modules/accounting) builds GSTR-1 and GSTR-3B from the posted documents.' },
        { kind: 'p', text: 'Because the match runs every day rather than at month end, mismatches surface while the supplier can still correct them. The GST close then starts from a short list of exceptions instead of the whole purchase register.' },
        { kind: 'p', text: 'Suppliers can see their own documents and queries in MAVRO’s Vendor Portal, which keeps the follow-up on a mismatch out of personal inboxes.' },
        { kind: 'p', text: 'For the sales side, see [GST e-invoicing rules](/blog/gst-e-invoicing-rules).' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the Invoice Management System in GST?',
      a: 'The Invoice Management System (IMS) is a GST portal feature where a buyer accepts, rejects or keeps pending each supplier document before it reaches GSTR-2B. Accepted documents count towards input tax credit.',
    },
    {
      q: 'What happens if I do not act on an invoice in IMS?',
      a: 'A document left without action is treated as accepted, so its credit flows into GSTR-2B and GSTR-3B as if it had been checked. Review the dashboard every month before filing.',
    },
    {
      q: 'Can I claim ITC on an invoice I accepted in IMS but never received goods for?',
      a: 'No. Accepting a document in IMS does not replace the conditions for input tax credit: a valid tax invoice, goods or services actually received, and tax paid by the supplier.',
    },
    {
      q: 'Do I need to recompute GSTR-2B after changing IMS actions?',
      a: 'Yes. After accepting, rejecting or holding documents, recompute GSTR-2B on the portal so the statement reflects those actions before you file GSTR-3B.',
    },
    {
      q: 'Why does my GSTR-2B not match my purchase register?',
      a: 'Usually because of timing, invoices the supplier has not reported, errors on either side, duplicates, or goods still in transit. Group the differences to see who must act.',
    },
  ],
  sources: [
    { label: 'Tally: what is changing in GSTR-2B and GSTR-3B with IMS', url: 'https://tallysolutions.com/gst/ims-impact-on-gstr-2b-gstr-3b/' },
    { label: 'Taxmann: GST Invoice Management System (IMS) and ITC claims', url: 'https://www.taxmann.com/post/blog/gst-invoice-management-system-ims/' },
    { label: 'GSTZen: comprehensive overview of the Invoice Management System', url: 'https://gstzen.in/a/comprehensive-overview-of-invoice-management-system-ims.html' },
    { label: 'Tally: step-by-step guide to IMS on the GST portal', url: 'https://tallysolutions.com/gst/a-step-by-step-guide-on-how-to-use-ims-in-gst-portal/' },
  ],
};
