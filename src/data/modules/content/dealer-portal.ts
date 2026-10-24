import type { ModuleContent } from '../schema';

/*
 * Dealer Portal (secondary). Source: product deck v2, slides 69–70 (tagline, four tiles, what it does, why it
 * matters, four screens). Two screens are the manufacturer's channel views (offtake, claim approval); two are what the
 * dealer sees (replenishment planner, secondary sales register; the partner chrome in prototype/module-shell.js).
 * Figures on the tiles come from the screens (prototype/modules/dealer-portal/), whose scenario is below; like all
 * screen data they are illustrative.
 */
export const content: ModuleContent<'dealer-portal'> = {
  slug: 'dealer-portal',
  tagline: 'Secondary offtake, stock cover and dealer claims: the channel layer made visible.',
  tiles: [
    {
      icon: 'eye',
      title: 'Offtake and stock',
      body: 'Territory offtake, retailer coverage and stock cover.',
      figure: { value: '₹1.12 Cr', label: 'dealer offtake in a territory, one month' },
    },
    {
      icon: 'receipt',
      title: 'Secondary sales',
      body: 'Retailer-wise billing uploaded with payment terms.',
      figure: { value: '271 of 312', label: 'retailers billed in 30 days' },
    },
    {
      icon: 'inventory',
      title: 'Replenishment',
      body: 'Suggested orders from rolling offtake and cover norms.',
      figure: { value: '21 days', label: 'stock cover norm behind each suggestion' },
    },
    {
      icon: 'claims',
      title: 'Dealer claims',
      body: 'Retailer-linked schemes verified before payout.',
      figure: { value: '2', label: 'duplicate claims stopped this cycle' },
    },
  ],
  what: 'Visibility into the layer between the distributor and the counter: territory offtake and retailer coverage, retailer-wise secondary billing uploaded by each dealer, a replenishment planner that turns rolling offtake and stock-cover norms into suggested orders, and a dealer claim queue that checks retailer-linked schemes against the bills before the company pays.',
  why: [
    'Secondary sales are captured as data, not inferred from primary dispatch.',
    'Stock-outs at territory level surface while the sale can still be saved.',
    'Suggested orders follow agreed cover norms instead of memory or habit.',
    'Scheme claims are matched to retailer invoices before the company pays out.',
    'Drops in retailer coverage show against the previous billing cycle.',
    'Near-expiry stock at the dealer is checked before the same item is reordered.',
  ],
  flow: {
    from: [
      { slug: 'distributor-portal', passes: 'Distributor stock and deliveries to dealers' },
      { slug: 'scheme-and-rebate', passes: 'Dealer and retailer schemes, slabs and rules' },
      { slug: 'sales-force-automation', passes: 'Beat visits and POP audit photos' },
      { slug: 'inventory-management', passes: 'Depot stock and batch shelf life' },
    ],
    to: [
      { slug: 'distributor-portal', passes: 'Suggested orders to the dealer’s distributor' },
      { slug: 'scheme-and-rebate', passes: 'Verified dealer claims for settlement' },
      { slug: 'retailer-portal', passes: 'Retailer coverage and billing by outlet' },
      { slug: 'data-analytics', passes: 'Secondary offtake for the channel dashboards' },
    ],
  },
  industries: [
    { slug: 'distribution', note: 'Dealer offtake, stock cover and retailer coverage by territory, with claims checked against bills.' },
    { slug: 'manufacturing', note: 'Spares sold through dealers, replenished to a cover norm instead of by phone.' },
    { slug: 'pharma', note: 'Near-expiry stock at the dealer checked before the same batch item is reordered.' },
  ],
  roles: [
    { name: 'Field sales manager', task: 'Watches offtake, coverage drops and stock-outs across dealers in a territory.', works: 'Offtake and stock' },
    { name: 'Trade marketing', task: 'Approves dealer claims once they match retailer bills or POP audits.', works: 'Dealer claims' },
    { name: 'Dealers', task: 'Upload their bills to retailers and send suggested orders to their distributor.', works: 'Replenishment planner' },
    { name: 'Field reps', task: 'Visit outlets that stopped billing and photograph displays for audit.' },
  ],
  related: ['distributor-portal', 'scheme-and-rebate', 'sales-force-automation', 'inventory-management'],
  screens: [
    {
      screen: 'dealer-portal/offtake',
      view: 'Offtake and stock',
      title: 'Secondary offtake and stock',
      caption: 'Dealers in a territory with offtake, retailers billed, stock cover against the norm and what to watch, beside primary dispatch.',
      alt: 'MAVRO Dealer Portal offtake dashboard for one territory: ₹1.12 Cr dealer offtake in September, 271 of 312 retailers billed in 30 days, five dealers out of one item, near-expiry seal kits holding reorders, each dealer’s stock cover against a 21-day norm, and offtake against primary dispatch by week (illustrative data).',
    },
    {
      screen: 'dealer-portal/replenishment',
      view: 'Replenishment planner',
      title: 'Replenishment planner, as the dealer sees it',
      caption: 'A suggested order to the dealer’s distributor from four weeks of sales and stock today, with the arithmetic shown.',
      alt: 'MAVRO replenishment planner from the dealer’s side: six items with four weeks of sales, stock, cover in days, a target for 21 days plus delivery and a suggested quantity, one item out of stock split into two lots, ₹4,43,942 to pay with a 2% scheme, and credit with the distributor (illustrative data).',
    },
    {
      screen: 'dealer-portal/claims',
      view: 'Dealer claims',
      title: 'Dealer claim approval queue',
      caption: 'Dealer claims checked against retailer bills, targets or POP audits before payout; duplicates and missing bills are caught.',
      alt: 'MAVRO dealer claim queue: 8 claims worth ₹1,76,640, three verified, one part-paid because three retailers’ bills are missing, two waiting for display audits and two duplicates stopped, with the bills behind one claim shown (illustrative data).',
    },
    {
      screen: 'dealer-portal/secondary-sales',
      view: 'Secondary sales',
      title: 'Secondary sales register',
      caption: 'The dealer’s bills to retailers and workshops, synced from its billing app or uploaded, with terms and payment status.',
      alt: 'MAVRO secondary sales register from the dealer’s side: ₹2.60 L billed in October in 31 bills, 24 of 27 retailers billed in 30 days, each bill with customer, items, value, terms, scheme, payment and whether it came from the billing app or an upload (illustrative data).',
    },
  ],
  scenario:
    'Ahmedabad territory, 8 Oct, 14:02. 18 dealers on three distributors; September offtake ₹1.12 Cr, October to date ₹29.6 L; 271 of 312 retailers billed in 30 days (92% the cycle before). IH-220 out at 5 dealers (depot refill 12 Oct); SK-22 batch B0602 near expiry at 2 dealers, reorders held. Ambica Pumps (Vatva): ₹9.4 L in September, ₹2.6 L in October in 31 bills, suggested order ₹4,43,942 to Navrangpura Distributors. Dealer claims 8, ₹1,76,640: ₹1,06,640 verified for 9 Oct, 2 duplicates stopped.',
  faq: [
    {
      q: 'What does the Dealer Portal in MAVRO do?',
      a: 'The MAVRO Dealer Portal makes the layer between distributors and retailers visible. Dealers upload their bills to retailers, so the manufacturer sees real secondary offtake, retailer coverage and stock cover by territory. Dealers get suggested orders from their own sales and cover norms, and their scheme claims are checked against the retailer bills before payout.',
    },
    {
      q: 'How does MAVRO suggest a dealer’s replenishment order?',
      a: 'MAVRO takes each item’s sales to retailers over the last four weeks, works out sales a day, and multiplies by the agreed cover norm plus delivery time to get a target stock. The suggested order is the target less stock on hand, rounded to the pack, with near-expiry stock and distributor availability checked first.',
    },
    {
      q: 'How are dealer scheme claims verified in MAVRO?',
      a: 'In MAVRO each dealer claim is checked against the evidence the scheme needs: retailer bills the dealer uploaded for retailer slabs, secondary purchases for target rebates, and the field rep’s photos for display schemes. Claims on bills already claimed are stopped as duplicates, and part-proven claims are paid in part with the reason shown.',
    },
    {
      q: 'How do dealers send their secondary sales to MAVRO?',
      a: 'Dealers can connect their billing software so bills sync automatically, upload a spreadsheet, or enter bills on the portal. Each bill carries the retailer, items, value and payment terms, which gives the manufacturer outlet-level offtake and coverage without relying on estimates from the field.',
    },
  ],
  seo: {
    title: 'Dealer portal for secondary sales, replenishment and claims | MAVRO',
    description:
      'MAVRO Dealer Portal: secondary offtake and retailer coverage by territory, retailer-wise billing upload, norm-based replenishment suggestions and dealer scheme claims verified against retailer bills before payout.',
  },
};
