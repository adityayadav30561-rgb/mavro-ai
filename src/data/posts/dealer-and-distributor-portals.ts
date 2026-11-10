import type { PostBody } from './index';

/*
 * Selling. MAVRO facts from the product deck and the catalogue (src/data/modules/catalogue.ts portals; src/data/
 * packages.ts portal FAQ): the four portals and their layers, what each does, orders landing in Order to Cash with
 * credit and scheme applied, vendor deliveries and invoices updating Procure to Pay, role-based access to own records
 * only. The customer result (vendor onboarding from 5 weeks to 48 hours) is the verified story as the site states it.
 * No statistics.
 */
export const post: PostBody = {
  slug: 'dealer-and-distributor-portals',
  takeaways: [
    'A portal is the outside face of records your own teams already work in: what a partner does there lands in the same modules.',
    'MAVRO has four portals along the chain: Vendor for supply, Distributor for primary sales, Dealer for secondary and Retailer for tertiary.',
    'A distributor order is checked for scheme, stock and credit before it is submitted, and lands in Order to Cash with nothing re-keyed.',
    'Each partner sees only their own account, orders, stock and statements.',
  ],
  sections: [
    {
      id: 'what-is-a-portal',
      heading: 'What is a dealer or distributor portal?',
      blocks: [
        { kind: 'p', text: 'A dealer or distributor portal is a self-service app where a business’s channel partners place orders, see their account and raise claims, without phoning the order desk.' },
        { kind: 'p', text: 'The important part is what sits behind it. A portal built on the same records as the rest of the business means a partner’s order is the order, not a message someone has to re-enter.' },
        { kind: 'p', text: 'In MAVRO, a portal is the outside face of records your teams already work in, so nothing is re-keyed between the two.' },
      ],
    },
    {
      id: 'the-chain',
      heading: 'Which portal serves which part of the chain?',
      blocks: [
        { kind: 'p', text: 'Goods move from suppliers to the shelf through several hands. MAVRO has a portal for each link:' },
        {
          kind: 'table',
          caption: 'The four MAVRO portals, in the order goods move',
          head: ['Portal', 'Layer', 'Who uses it', 'What it does'],
          rows: [
            ['[Vendor Portal](/modules/vendor-portal)', 'Supply side', 'Suppliers', 'Self-serve onboarding with GSTIN and PAN verification, a compliance vault, a 360° supplier profile'],
            ['[Distributor / B2B Portal](/modules/distributor-portal)', 'Primary', 'Distributors', 'An order builder that checks scheme, stock and credit before submission'],
            ['[Dealer Portal](/modules/dealer-portal)', 'Secondary', 'Dealers', 'Offtake and stock cover made visible, with replenishment suggested from rolling offtake'],
            ['[Retailer Portal](/modules/retailer-portal)', 'Tertiary', 'Retailers', 'Best-offer baskets, loyalty, returns and order status in one app'],
          ],
        },
      ],
    },
    {
      id: 'without-portals',
      heading: 'What goes wrong without portals?',
      blocks: [
        { kind: 'p', text: 'Most channels still run on phone calls, email and messaging apps. It feels fast, but it costs in ways that are hard to see:' },
        {
          kind: 'list',
          items: [
            'Orders on WhatsApp, with no live order book and no audit trail.',
            'Schemes worked out after the invoice, so disputes follow.',
            'Credit checked by calling finance, or not at all.',
            'Claims settled from spreadsheets months later.',
            'No view of what dealers actually sold on to retailers.',
          ],
        },
        { kind: 'p', text: 'Each of these comes from the same root: the partner’s action and the company’s record are two different things.' },
      ],
    },
    {
      id: 'distributor-portal',
      heading: 'How does the distributor portal work?',
      blocks: [
        { kind: 'p', text: 'The Distributor / B2B Portal moves primary ordering off phone and email.' },
        { kind: 'p', text: 'A distributor builds the order in an order builder that checks scheme, stock and credit before it is submitted. A problem shows up while the distributor can still change the order, not after it reaches the warehouse.' },
        { kind: 'figure', module: 'distributor-portal', caption: 'The MAVRO Distributor Portal home: credit available, outstanding and recent orders.' },
        { kind: 'p', text: 'Distributors also see their credit and outstanding, and raise claims and credit notes in the same place.' },
      ],
    },
    {
      id: 'order-checks',
      heading: 'What does the order builder check?',
      blocks: [
        { kind: 'p', text: 'Every line of a primary order, before it is submitted. Each check stops a problem that would otherwise appear at dispatch or in a dispute.' },
        {
          kind: 'table',
          caption: 'Checks on a distributor order, and what each prevents',
          head: ['Check', 'What it prevents'],
          rows: [
            ['Scheme', 'Benefits claimed later, instead of applied at order entry'],
            ['Stock', 'Short supply found only at dispatch'],
            ['Credit', 'An order blocked downstream, after the distributor has planned around it'],
            ['Shelf life', 'Near-expiry batches shipped to a partner who cannot sell them'],
            ['Rates', 'Price disputes on the invoice'],
            ['Ship-to GSTIN and licence', 'Invoices to a ship-to whose GST or licence has lapsed'],
          ],
        },
      ],
    },
    {
      id: 'dealer-portal',
      heading: 'What does the dealer portal add?',
      blocks: [
        { kind: 'p', text: 'The Dealer Portal makes secondary sales visible: what dealers sold on, and how much stock cover they have left.' },
        { kind: 'p', text: 'That visibility is what most businesses lack. Primary sales into a dealer say little about real demand; offtake from the dealer says a lot.' },
        { kind: 'p', text: 'From rolling offtake, the portal suggests replenishment, so dealers order what they will sell. Retailer-linked claims are raised against the same records.' },
      ],
    },
    {
      id: 'retailer-portal',
      heading: 'How do retailers order?',
      blocks: [
        { kind: 'p', text: 'The Retailer Portal captures tertiary demand at the counter, in one app.' },
        {
          kind: 'list',
          items: [
            'A basket builder that applies the best available offer.',
            'Loyalty points and returns.',
            'Order and payment status, without calling anyone.',
          ],
        },
        { kind: 'p', text: 'For brands, it is the first direct line to the shelf: what retailers order, when, and on which offers.' },
      ],
    },
    {
      id: 'vendor-portal',
      heading: 'What about the supply side?',
      blocks: [
        { kind: 'p', text: 'The Vendor Portal does for suppliers what the channel portals do for customers.' },
        { kind: 'p', text: 'Suppliers onboard themselves, with GSTIN and PAN verified, keep their documents in a compliance vault, and see their purchase orders and payment status. Purchasing keeps a 360° profile of every supplier.' },
        { kind: 'callout', tone: 'tip', title: 'In practice', text: 'For an industrial procurement group, self-service onboarding with GSTIN and PAN validated automatically cut vendor onboarding from 5 weeks to 48 hours. The client is anonymised; the result is verified.' },
      ],
    },
    {
      id: 'vendor-onboarding',
      heading: 'How does vendor onboarding work on the portal?',
      blocks: [
        { kind: 'p', text: 'A new vendor registers in six steps. GSTIN, PAN and the bank account, by penny-drop, are verified automatically.' },
        { kind: 'p', text: 'A PAN-level check runs before any vendor code is issued, so the same supplier is not created twice. Each plant manages its own suppliers and approvals, on the same master.' },
        { kind: 'p', text: 'Expiring documents are flagged 90 days ahead. A vendor whose compliance lapses is blocked from new purchase orders until it is renewed.' },
      ],
    },
    {
      id: 'claims',
      heading: 'How are channel claims settled?',
      blocks: [
        { kind: 'p', text: 'With the proof attached from the start. Distributors raise scheme, expiry and damage claims on the portal with their supporting documents.' },
        { kind: 'p', text: 'Dealer claims are checked against retailer bills, targets or POP audits before the company pays out. Duplicates and missing bills are caught at that check.' },
        { kind: 'p', text: 'Approved claims settle as credit notes, matched to the partner’s ledger. For slabs, accruals and budget limits on schemes, see [Scheme and Rebate](/modules/scheme-and-rebate).' },
      ],
    },
    {
      id: 'field-team',
      heading: 'What changes for the sales team?',
      blocks: [
        { kind: 'p', text: 'Sales officers stop being the order desk. Order and ledger status replace the daily call to the sales officer.' },
        { kind: 'p', text: 'Visits go to the market instead: outlets that stopped billing, displays to photograph for audit, and new retailers to bring on.' },
        { kind: 'p', text: 'For retailers who prefer it, the rep still places the order, on the same record. [Sales Force Automation](/modules/sales-force-automation) adds beat plans and mobile ordering with an offline mode.' },
      ],
    },
    {
      id: 'by-industry',
      heading: 'How do portals differ by industry?',
      blocks: [
        {
          kind: 'list',
          items: [
            'Auto components: spares sold through distributors and dealers, replenished to a cover norm instead of by phone.',
            'Pharma: batch shelf life and the ship-to’s licence validity checked on every order line, and near-expiry stock at the dealer checked before a reorder.',
            'Consumer goods and distribution: schemes applied at order entry, and secondary offtake captured as data rather than inferred from primary dispatch.',
          ],
        },
      ],
    },
    {
      id: 'same-records',
      heading: 'How do portal orders reach the ERP?',
      blocks: [
        { kind: 'p', text: 'They do not need to “reach” it: they are already in it.' },
        { kind: 'p', text: 'An order placed in a portal lands in [Order to Cash](/modules/order-to-cash) with the customer’s credit check and scheme applied. A vendor’s delivery and invoice update [Procure to Pay](/modules/procure-to-pay).' },
        { kind: 'p', text: 'There is no re-entry between the portal and the ERP, so there is no gap for errors to fall into, and the order desk works on exceptions instead of typing.' },
      ],
    },
    {
      id: 'what-leaders-see',
      heading: 'What do sales leaders see?',
      blocks: [
        { kind: 'p', text: 'The whole chain in one place, because every portal writes to the same records.' },
        {
          kind: 'list',
          items: [
            'Primary sales from distributor orders, by depot and territory.',
            'Secondary offtake, retailer coverage and stock cover from dealers.',
            'Tertiary demand from retailers at the counter, by offer.',
            'Open claims, credit notes and outstanding, partner by partner.',
          ],
        },
        { kind: 'p', text: 'A drop in retailer coverage shows against the previous billing cycle, and a territory stock-out surfaces while the sale can still be saved.' },
      ],
    },
    {
      id: 'security',
      heading: 'Can partners see your internal data?',
      blocks: [
        { kind: 'p', text: 'No. Role-based access limits each portal user to their own account, orders, stock and statements.' },
        { kind: 'p', text: 'Field-level controls, MFA and an audit trail of who saw and changed what apply to portal users exactly as they do to staff.' },
        { kind: 'p', text: 'That matters for adoption too. Partners are more willing to work in a portal when they know their competitors in the same channel cannot see their numbers.' },
      ],
    },
    {
      id: 'rolling-out',
      heading: 'How should portals be rolled out?',
      blocks: [
        { kind: 'p', text: 'Start where the pain is greatest, and bring partners on in waves:' },
        {
          kind: 'steps',
          items: [
            { title: 'Pick the first portal', text: 'Usually distributors, where orders and credit cause most disputes.' },
            { title: 'Clean the masters', text: 'Customer accounts, price lists and schemes, before any partner logs in.' },
            { title: 'Pilot with a few partners', text: 'Choose partners who will give honest feedback.' },
            { title: 'Train the field team', text: 'Sales reps help partners place their first orders.' },
            { title: 'Widen it', text: 'Bring on the rest of the channel, then dealers, retailers or suppliers.' },
          ],
        },
        { kind: 'p', text: 'See all four portals together on the [MAVRO portals](/platform/portals) page.' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is a distributor portal?',
      a: 'A distributor portal is a self-service app where distributors place primary orders, see credit and outstanding, and raise claims. In MAVRO, each order is checked for scheme, stock and credit before submission.',
    },
    {
      q: 'What is the difference between a dealer portal and a distributor portal?',
      a: 'A distributor portal handles primary sales into distributors. A dealer portal handles secondary sales: it shows dealers’ offtake and stock cover and suggests replenishment.',
    },
    {
      q: 'Do portal orders go straight into the ERP?',
      a: 'Yes. In MAVRO, a portal order lands in Order to Cash with the credit check and scheme applied, and a vendor’s delivery and invoice update Procure to Pay, with no re-entry.',
    },
    {
      q: 'Can distributors see other distributors’ data?',
      a: 'No. Role-based access limits each portal user to their own account, orders, stock and statements, with MFA and an audit trail.',
    },
    {
      q: 'How are dealer scheme claims verified?',
      a: 'In MAVRO, dealer claims are checked against retailer bills, targets or POP audits before payout, so duplicates and missing bills are caught. Approved claims settle as credit notes matched to the ledger.',
    },
    {
      q: 'Does the vendor portal check GSTIN and PAN?',
      a: 'Yes. A new vendor registers in six steps with GSTIN, PAN and the bank account verified automatically, and a PAN-level check stops duplicate vendors before a code is issued.',
    },
  ],
  sources: [
    { label: 'MAVRO portals: vendor, distributor, dealer and retailer', url: '/platform/portals' },
    { label: 'MAVRO customer stories (results verified, clients anonymised)', url: '/customers' },
  ],
};
