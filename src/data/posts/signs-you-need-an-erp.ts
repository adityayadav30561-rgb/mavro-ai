import type { PostBody } from './index';

/*
 * Informational + selling. Checked 2026-11-10. Practice: what an ERP is and the common signs a business has outgrown
 * spreadsheets and separate tools (Software Advice, Insights for Professionals agree). No statistics. MAVRO facts: the
 * product deck (the gaps a core ERP leaves: payroll not linked to the GL, production updated once a day, dealer orders
 * on WhatsApp, vendor POs by phone; base modules, portals and premium modules on one set of records; 25–30 day phased
 * implementation; ERP Connect alongside SAP, Oracle, Tally or a legacy ERP). No competitor framing: Tally appears only
 * as a system MAVRO connects to.
 */
export const post: PostBody = {
  slug: 'signs-you-need-an-erp',
  takeaways: [
    'An ERP is one system for a business’s core work, finance, buying, stock, production, sales and people, on one shared set of data.',
    'The clearest sign you need one is that departments argue about whose numbers are right.',
    'Other signs: spreadsheets as the real system, stock you cannot trust, a slow month-end, and statutory work done by hand.',
    'A modern ERP can run beside the tools you keep, so moving does not have to mean replacing everything at once.',
  ],
  sections: [
    {
      id: 'what-is-an-erp',
      heading: 'What is an ERP?',
      blocks: [
        { kind: 'p', text: 'An ERP, enterprise resource planning software, is one system for a business’s core work. Finance, purchasing, stock, production, sales and people all work in it, on one shared set of data.' },
        { kind: 'p', text: 'The point is the shared data. When a sale, a purchase or a pay run is recorded once and every department reads the same record, the business stops reconciling its own numbers.' },
        { kind: 'p', text: 'Most businesses do not start with an ERP. They grow into needing one, and the signs are usually visible long before the decision is made.' },
      ],
    },
    {
      id: 'numbers-disagree',
      heading: 'Do your departments disagree about the numbers?',
      blocks: [
        { kind: 'p', text: 'This is the clearest sign. Sales has one figure for orders, finance another for revenue, and stores a third for stock, and meetings start with deciding whose is right.' },
        { kind: 'p', text: 'It happens because each team keeps its own records. The numbers drift apart through timing, re-keying and different rules, and nobody owns the gap.' },
        { kind: 'p', text: 'An ERP removes the argument by removing the copies. There is one order, one invoice and one stock figure, and every report reads them.' },
      ],
    },
    {
      id: 'spreadsheets',
      heading: 'Are spreadsheets your real system?',
      blocks: [
        { kind: 'p', text: 'Spreadsheets are excellent tools and poor systems. The warning sign is when the business depends on a few of them that only one person understands.' },
        {
          kind: 'list',
          items: [
            'Several versions of the same file, emailed back and forth.',
            'Formulas nobody dares to change.',
            'Data copied from one system into another every week.',
            'Reports that take days because they are rebuilt by hand.',
          ],
        },
        { kind: 'p', text: 'When the person who owns the key spreadsheet goes on leave, and a process stops, the business has already outgrown it.' },
      ],
    },
    {
      id: 'stock-you-cannot-trust',
      heading: 'Can you trust your stock figure?',
      blocks: [
        { kind: 'p', text: 'If someone has to walk to the store to check before promising a customer, the stock figure is not doing its job.' },
        { kind: 'p', text: 'Untrusted stock costs twice. The business buys too much to be safe, and still runs short of the item that matters, because the records are out of date.' },
        { kind: 'p', text: 'An ERP updates stock with every receipt, issue and dispatch, by batch and location. Sales, purchasing and planning then work from the same live number.' },
      ],
    },
    {
      id: 'slow-close',
      heading: 'Does month-end take weeks?',
      blocks: [
        { kind: 'p', text: 'A slow close usually means the books are assembled at month end rather than built as the month runs. Journals are typed in from other systems, and reconciliations wait for the last report.' },
        { kind: 'p', text: 'In an ERP, invoices, receipts, goods receipts and pay runs post their own journals. Bank and inter-company reconciliations can run during the month, so the close becomes a review.' },
        { kind: 'p', text: 'Leaders feel the difference most. Decisions are made on this month’s numbers, not last quarter’s.' },
      ],
    },
    {
      id: 'statutory-by-hand',
      heading: 'Is statutory work done by hand?',
      blocks: [
        { kind: 'p', text: 'In India, compliance is a strong signal. When PF, ESI and TDS are filed from spreadsheets, and GST returns are compiled from reports each month, every error means penalties and rework.' },
        { kind: 'p', text: 'Compliance should come out of the transactions, not be rebuilt from them. Payroll should post to the ledger; GST returns should come from posted invoices.' },
        { kind: 'p', text: 'For the details, see [how PF and ESI are calculated](/blog/pf-and-esi-contributions) and [GST e-invoicing rules](/blog/gst-e-invoicing-rules).' },
      ],
    },
    {
      id: 'channel-on-whatsapp',
      heading: 'Do orders and suppliers live on the phone?',
      blocks: [
        { kind: 'p', text: 'Dealer orders on WhatsApp and supplier orders by phone feel fast, but they leave no audit trail and no live order book.' },
        { kind: 'p', text: 'Schemes are checked after the invoice, not before. Supplier promises are in someone’s memory. Nobody can see the whole picture.' },
        { kind: 'p', text: 'Portals for vendors and the sales channel put those conversations on the same records as the rest of the business, without asking partners to learn an ERP.' },
      ],
    },
    {
      id: 'people-not-output',
      heading: 'Is growth adding people rather than output?',
      blocks: [
        { kind: 'p', text: 'When every new customer or plant needs another person to re-key data, the systems are not scaling with the business.' },
        { kind: 'p', text: 'Look at where time goes. If skilled staff spend their days copying orders between systems, chasing approvals by email or rebuilding reports, that is capacity the business is paying for twice.' },
        { kind: 'p', text: 'An ERP does not remove the need for people. It moves them from moving data to using it.' },
      ],
    },
    {
      id: 'leaders-cannot-see',
      heading: 'Can leaders see the business as it is today?',
      blocks: [
        { kind: 'p', text: 'Ask a simple question: what were yesterday’s orders, today’s stock and this week’s receivables? If the answer takes a day and three people, leadership is steering by old numbers.' },
        { kind: 'p', text: 'Live dashboards are only possible when the data underneath is live. In separate tools, a dashboard is just a prettier version of last week’s spreadsheet.' },
        { kind: 'p', text: 'An ERP lets the CFO, plant heads, sales and HR each see their own view of the same records, as they stand.' },
      ],
    },
    {
      id: 'cost-of-waiting',
      heading: 'What does it cost to wait?',
      blocks: [
        { kind: 'p', text: 'The cost of separate tools is rarely one big bill. It is spread across the business, which is why it is easy to ignore.' },
        {
          kind: 'list',
          items: [
            'Stock bought to cover for numbers nobody trusts.',
            'Penalties and rework when statutory filings are wrong.',
            'Credit lost on supplier invoices that were never checked.',
            'Customers lost to late or wrong deliveries.',
            'Decisions delayed until the numbers are reconciled.',
          ],
        },
        { kind: 'p', text: 'Each of these grows with the business. Waiting usually makes the eventual move bigger, not smaller.' },
      ],
    },
    {
      id: 'how-to-prepare',
      heading: 'How should a business prepare for an ERP?',
      blocks: [
        { kind: 'p', text: 'A little preparation makes the implementation faster and the result better:' },
        {
          kind: 'steps',
          items: [
            { title: 'List the pain', text: 'Write down the five problems that cost most, in the words of the people who live with them.' },
            { title: 'Map the flow', text: 'Sketch how an order moves from enquiry to cash, and where it is re-keyed.' },
            { title: 'Clean the masters', text: 'Tidy customer, supplier and item lists before migration.' },
            { title: 'Name owners', text: 'Pick a champion in each department to decide and to train others.' },
          ],
        },
        { kind: 'p', text: 'Bring that list and map to a demo. It turns the conversation from features to your business.' },
      ],
    },
    {
      id: 'symptom-to-module',
      heading: 'Which symptom does which part of an ERP fix?',
      blocks: [
        { kind: 'p', text: 'Each sign maps to a part of the system:' },
        {
          kind: 'table',
          caption: 'Common symptoms and the ERP area that fixes them',
          head: ['Symptom', 'What fixes it', 'In MAVRO'],
          rows: [
            ['Numbers disagree between teams', 'One shared set of records', '[The MAVRO platform](/platform)'],
            ['Stock you cannot trust', 'Live stock by batch and location', '[Inventory Management](/modules/inventory-management)'],
            ['Slow month-end', 'Journals posted from transactions', '[Accounting](/modules/accounting)'],
            ['Payroll and statutory by hand', 'Payroll posted to the ledger', '[HRMS and Payroll](/modules/hrms-and-payroll)'],
            ['Supplier invoices paid unchecked', 'Three-way matching', '[Vendor Invoice Management](/modules/vendor-invoice-management)'],
            ['Dealer orders on WhatsApp', 'Channel portals', '[Distributor Portal](/modules/distributor-portal)'],
          ],
        },
      ],
    },
    {
      id: 'what-to-look-for',
      heading: 'What should you look for in an ERP?',
      blocks: [
        { kind: 'p', text: 'For an Indian business, a short list covers most of what matters:' },
        {
          kind: 'list',
          items: [
            'One set of data across finance, operations, people and the channel.',
            'GST, e-invoicing and statutory payroll built in, not added on.',
            'A mobile app for people who are not at a desk.',
            'Portals for suppliers and the sales channel.',
            'A way to run alongside the systems you are not replacing yet.',
            'An implementation measured in weeks, with a dedicated contact.',
          ],
        },
        { kind: 'p', text: 'Ask to see your own process in a demo, with your own documents and approvals. A generic tour shows features; your own process shows fit.' },
      ],
    },
    {
      id: 'what-changes-for-people',
      heading: 'What changes for the people who use it?',
      blocks: [
        { kind: 'p', text: 'People worry that an ERP means more screens and more work. Done well, it means fewer.' },
        { kind: 'p', text: 'Each role gets the screens it needs: the order desk sees orders and credit, stores see receipts and bins, payroll sees attendance and pay. Approvals move to a phone, so a manager on the shop floor does not hold up a purchase.' },
        { kind: 'p', text: 'The biggest change is what disappears: copying data, chasing status and reconciling reports. That time goes back into the work people were hired for.' },
      ],
    },
    {
      id: 'how-mavro-fits',
      heading: 'How does MAVRO fit?',
      blocks: [
        { kind: 'p', text: 'MAVRO is a Super ERP for Indian businesses: base modules, portals for vendors and the channel, and premium modules for specialised work, on [one platform](/platform) that shares one set of business data.' },
        { kind: 'figure', module: 'accounting', caption: 'MAVRO Accounting: a live general ledger posted from every transaction.' },
        { kind: 'p', text: 'It does not have to replace everything at once. [ERP Connect](/erp-connect) runs MAVRO alongside SAP, Oracle, Tally or a legacy ERP, syncing two ways.' },
        { kind: 'p', text: 'Implementation is phased and takes 25 to 30 days, with priority modules live first and one dedicated resource throughout.' },
      ],
    },
  ],
  faq: [
    {
      q: 'When does a business need an ERP?',
      a: 'When departments disagree about the numbers, spreadsheets have become the real system, stock cannot be trusted, month-end takes weeks, or statutory work is done by hand. Usually several of these appear together as a business grows.',
    },
    {
      q: 'Is an ERP only for large companies?',
      a: 'No. An ERP is worth it once a business has several teams working on the same orders, stock and money. Growing mid-sized businesses often feel the pain of separate tools most.',
    },
    {
      q: 'Do I have to replace my accounting software to use an ERP?',
      a: 'Not always. With MAVRO, ERP Connect runs alongside SAP, Oracle, Tally or a legacy ERP, so you can add modules while your existing system stays the system of record.',
    },
    {
      q: 'How long does an ERP implementation take?',
      a: 'It depends on scope. MAVRO is implemented in 25 to 30 days on a phased plan: discovery and setup first, priority modules live in week three, everything live in week four.',
    },
    {
      q: 'What are the signs a business has outgrown spreadsheets?',
      a: 'Several versions of the same file, formulas nobody dares to change, data copied between systems every week, and processes that stop when one person is away.',
    },
  ],
  sources: [
    { label: 'Software Advice: when does a company need an ERP?', url: 'https://www.softwareadvice.com/resources/when-does-a-company-need-an-erp' },
    { label: 'Insights for Professionals: 5 signs it’s time for an ERP system', url: 'https://www.insightsforprofessionals.com/finance/financial-technology/signs-its-time-for-an-erp-system' },
  ],
};
