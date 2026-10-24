import type { ModuleContent } from '../schema';

/*
 * Distributor / B2B Portal (primary). Source: product deck v2, slides 67–68 (tagline, four tiles, what it does, why
 * it matters, four screens). Every screen is what the distributor sees on the manufacturer's portal (the partner
 * chrome in prototype/module-shell.js). Figures on the tiles come from the screens
 * (prototype/modules/distributor-portal/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'distributor-portal'> = {
  slug: 'distributor-portal',
  tagline: 'Self-service primary ordering: schemes, credit and claims in the distributor’s own hands.',
  tiles: [
    {
      icon: 'finance',
      title: 'Account position',
      body: 'Category purchases, credit limit and outstanding.',
      figure: { value: '₹11.4 L', label: 'credit available of ₹40 L' },
    },
    {
      icon: 'orders',
      title: 'Order builder',
      body: 'Cart checked for scheme, stock and credit.',
      figure: { value: '7', label: 'checks before an order is submitted' },
    },
    {
      icon: 'distribution',
      title: 'Primary orders',
      body: 'Order history by depot, with where each order is.',
      figure: { value: '20 of 21', label: 'delivered on the promised date' },
    },
    {
      icon: 'claims',
      title: 'Claims and credit notes',
      body: 'Scheme, expiry and damage claims with their proof.',
      figure: { value: '₹1.10 L', label: 'verified, credited on 9 Oct' },
    },
  ],
  what: 'A portal for channel partners that moves primary ordering off phone and email: the live account and credit position, an order builder that applies trade schemes and checks stock, credit and shelf life before the order is submitted, the full order history by depot, and a claims queue for scheme, expiry, damage and rate-difference credit notes.',
  why: [
    'Partners see their own credit exposure before an order is blocked downstream.',
    'Active trade schemes apply automatically instead of being claimed later.',
    'Short stock and shelf-life failures surface in the cart, not at dispatch.',
    'Licence and GST validity are confirmed for every ship-to at submission.',
    'Claims carry their supporting documents, cutting settlement disputes.',
    'Order and ledger status replace the daily call to the sales officer.',
  ],
  flow: {
    from: [
      { slug: 'scheme-and-rebate', passes: 'Active schemes and volume slabs' },
      { slug: 'inventory-management', passes: 'Depot stock and batch shelf life' },
      { slug: 'order-to-cash', passes: 'Invoices, deliveries and the ledger' },
      { slug: 'sales-force-automation', passes: 'The partner’s field rep and visits' },
    ],
    to: [
      { slug: 'order-to-cash', passes: 'Primary orders, checked for credit' },
      { slug: 'scheme-and-rebate', passes: 'Claims with their proof, for settlement' },
      { slug: 'dealer-portal', passes: 'Stock that becomes dealers’ orders' },
      { slug: 'data-analytics', passes: 'Primary sales for the channel dashboards' },
    ],
  },
  industries: [
    { slug: 'distribution', note: 'Distributors order, track deliveries and claim scheme benefits without calling the sales office.' },
    { slug: 'manufacturing', note: 'Spares and components sold through distributors, with depot stock and credit checked in the cart.' },
    { slug: 'pharma', note: 'Batch shelf life and the ship-to’s licence validity checked on every order line.' },
  ],
  roles: [
    { name: 'Distributor owners', task: 'Place primary orders, watch credit and track the festive slab.', works: 'Order builder' },
    { name: 'Distributor accounts', task: 'Raise claims with proof and match credit notes to the ledger.', works: 'Claims and credit notes' },
    { name: 'Depot teams', task: 'See confirmed orders with split deliveries planned before dispatch.', works: 'Primary orders' },
    { name: 'Field reps', task: 'Spend visits on the market instead of taking orders and status calls.' },
    { name: 'Credit control', task: 'Sees exposure before an order is placed; holds only past the agreed days.' },
  ],
  related: ['order-to-cash', 'scheme-and-rebate', 'sales-force-automation', 'inventory-management'],
  screens: [
    {
      screen: 'distributor-portal/home',
      view: 'Home',
      title: 'Distributor home: orders and credit',
      caption: 'What the distributor sees first: credit available and outstanding, open orders and claims, purchases by category, the scheme slab and what is due.',
      alt: 'MAVRO distributor portal home as the distributor sees it: ₹11.4 L of a ₹40 L credit limit available, ₹28.6 L outstanding with one invoice overdue, 2 open orders, 4 claims pending, purchases by category, recent orders and progress towards the next festive scheme slab (illustrative data).',
    },
    {
      screen: 'distributor-portal/order-builder',
      view: 'Order builder',
      title: 'Order builder: cart validation',
      caption: 'A primary order checked line by line for scheme, stock, credit, shelf life, rates and the ship-to’s GSTIN before it is submitted.',
      alt: 'MAVRO order builder with four lines and 680 pieces: one line split between two depots, seal kits allocated from a batch with enough shelf life, a 4% festive slab applied, ₹9,72,169 to pay with GST, and seven checks including credit, an overdue invoice and the ship-to GSTIN (illustrative data).',
    },
    {
      screen: 'distributor-portal/claims',
      view: 'Claims and credit notes',
      title: 'Claims and credit note queue',
      caption: 'Open claims with their proof and status, credit notes received, and a new claim raised by type with its documents.',
      alt: 'MAVRO distributor claims: 4 open claims worth ₹1,16,000 for scheme incentive, transit damage, a rate difference and expired seal kits, three verified for the next settlement, credit notes since April with one duplicate rejected, and a form to raise a claim with proof (illustrative data).',
    },
    {
      screen: 'distributor-portal/orders',
      view: 'Primary orders',
      title: 'Primary order register',
      caption: 'Every primary order with ship-to, depot, invoice, value, delivery and status, and the claims or dues attached to it.',
      alt: 'MAVRO primary order register for a distributor: 23 orders since April, ₹61.1 L in September and October, 20 of 21 delivered on the promised date, each with ship-to, depot, invoice, value, delivery and status, and notes on claims and an unpaid invoice (illustrative data).',
    },
  ],
  scenario:
    'Navrangpura Distributors (DST-0412, Ahmedabad) on Northfield Precision’s portal, 8 Oct, 14:02. Credit ₹40.0 L, outstanding ₹28.6 L (INV-8841 ₹3.2 L, 33 days over), available ₹11.4 L. Festive slab: ₹51.8 L bought, 4% from ₹60 L. Draft NPO-3318: ₹8,58,200, slab 4% −₹34,328, GST ₹1,48,297, ₹9,72,169; 30 IH-220 from Pune on 12 Oct; seal kits from a batch with 22 months of life. Claims 4, ₹1,16,000, three verified for 9 Oct. Field rep Ravi Patel.',
  faq: [
    {
      q: 'What does the Distributor / B2B Portal in MAVRO do?',
      a: 'The MAVRO Distributor / B2B Portal lets distributors place primary orders themselves. They see their credit limit, outstanding and purchases, build orders that are checked for schemes, stock, credit and shelf life before submission, follow every order by depot, and raise scheme, damage, expiry and rate-difference claims with their proof.',
    },
    {
      q: 'How are trade schemes applied on the MAVRO distributor portal?',
      a: 'Active schemes from MAVRO Scheme and Rebate apply in the cart as the distributor builds an order, including volume slabs that change as purchases grow. The distributor sees the discount and how far they are from the next slab, so the benefit is taken on the order instead of being claimed later.',
    },
    {
      q: 'Does the MAVRO portal check credit before a distributor orders?',
      a: 'Yes. The order builder shows the distributor’s available credit, the order’s effect on it and any overdue invoice before submission, using the same exposure that MAVRO Order to Cash checks. Orders within the agreed terms go through; those beyond them are held with the reason shown.',
    },
    {
      q: 'How do distributors raise claims in MAVRO?',
      a: 'Distributors raise scheme, damage, expiry and rate-difference claims on the portal against an invoice or order, with photos, batch labels or statements attached. MAVRO checks each claim against the scheme, the purchases and earlier claims, and verified claims are settled as GST credit notes to the distributor’s ledger.',
    },
  ],
  seo: {
    title: 'Distributor portal for B2B primary orders, schemes and claims | MAVRO',
    description:
      'MAVRO Distributor / B2B Portal: self-service primary ordering with schemes, stock, credit and shelf-life checked in the cart, order history by depot, and scheme, damage and expiry claims settled as credit notes.',
  },
};
