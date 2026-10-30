import type { ModuleContent } from '../schema';

/*
 * Auction and Bidding. Source: product deck v2, slide 78 (tagline, four tiles: live reverse auctions with rank-only
 * bidding and anti-sniping auto-extension, sealed bids and RFQs, savings analytics, award governance with L1/L2
 * split rules; six points on why it matters; four screens). The deck's "6–12% typical price discovery" is a deck
 * claim and is not repeated as a MAVRO figure; the figures on the tiles come from the module's screens
 * (prototype/modules/auction-and-bidding/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'auction-and-bidding'> = {
  slug: 'auction-and-bidding',
  tagline: 'Reverse auctions, RFQs and sealed bids that turn negotiation into measurable savings.',
  tiles: [
    {
      icon: 'auction',
      title: 'Live reverse auctions',
      body: 'Rank-only bidding, with the close extended when a bid lands at the last minute.',
      figure: { value: '47', label: 'bids in one live carton auction' },
    },
    {
      icon: 'procurement',
      title: 'Sealed bids and RFQs',
      body: 'Submissions stay sealed until the opening time.',
      figure: { value: '9', label: 'sealed-bid events this year' },
    },
    {
      icon: 'finance',
      title: 'Savings analytics',
      body: 'Savings against the ceiling, event by event and category by category.',
      figure: { value: '7.8%', label: 'below ceiling across 31 awards' },
    },
    {
      icon: 'shield',
      title: 'Award governance',
      body: 'Committee approval with split awards between L1 and L2.',
      figure: { value: '70/30', label: 'split award waiting for approval' },
    },
  ],
  what: 'An e-sourcing suite for procurement: events created from approved indents or the MRP run, invitations limited to QA-approved vendors, live reverse auctions with rank-only bidding or sealed bids, evaluation, and awards decided with committee governance, including split awards between the lowest bidders. Savings are measured against the ceiling on every event, and an award converts to purchase orders in one step after approval.',
  why: [
    'Live reverse auctions find a better price against the ceiling.',
    'Only QA-approved vendors can bid, so quality is never traded for price.',
    'Rank-only visibility keeps bidding competitive and fair.',
    'Split awards, such as 70/30, keep a second source supplying critical materials.',
    'Every bid, timestamp and award decision is on the audit trail.',
    'An approved award becomes purchase orders in one step.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Approved indents and rate contracts' },
      { slug: 'ppds', passes: 'MRP proposals over the auction threshold' },
      { slug: 'mvlens-vendor-audit', passes: 'QA-approved vendors who may bid' },
      { slug: 'vendor-portal', passes: 'Invitations and bids from vendors' },
    ],
    to: [
      { slug: 'procure-to-pay', passes: 'Awards as purchase orders' },
      { slug: 'accounting', passes: 'Committed spend and savings' },
      { slug: 'data-analytics', passes: 'Savings and price history' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Castings, bar stock, packaging and tooling bought through auctions, with only approved foundries and mills invited.' },
    { slug: 'distribution', note: 'Freight lanes, packaging and warehouse services competed through sealed bids and auctions.' },
    { slug: 'pharma', note: 'Packaging and services bought competitively, from vendors qualified by quality first.' },
    { slug: 'service-providers', note: 'Hardware, licences and facilities contracts bid through RFQs and sealed bids.' },
  ],
  roles: [
    { name: 'Buyers', task: 'Create events from indents and run them live.', works: 'Create event' },
    { name: 'Purchase head', task: 'Approves awards and sets the ceiling and award rules.', works: 'Awards' },
    { name: 'QA', task: 'Qualifies the vendors who may be invited.', works: 'Vendors' },
    { name: 'Vendors', task: 'Bid in the Vendor Portal and see only their own rank.', works: 'Live auctions' },
    { name: 'Finance', task: 'Sees savings and commitments by category.', works: 'E-sourcing dashboard' },
  ],
  related: ['procure-to-pay', 'vendor-portal', 'mvlens-vendor-audit', 'ppds'],
  screens: [
    {
      screen: 'auction-and-bidding/esourcing-dashboard',
      view: 'E-sourcing dashboard',
      title: 'E-sourcing dashboard',
      caption: 'Realised savings against the ceiling by category and month, the live event and what needs approval.',
      alt: 'MAVRO e-sourcing dashboard: ₹63 lakh realised savings, 7.8% below ceiling across 31 awards, 41 events, 4.3 bidders per event, savings by category with ceiling, awarded and saved, savings by month, a live auction and events waiting for award or start (illustrative data).',
    },
    {
      screen: 'auction-and-bidding/live-auction',
      view: 'Live auctions',
      title: 'Live auction monitor',
      caption: 'A reverse auction in progress: ranking, the L1 price falling to the ceiling, and what each bidder sees.',
      alt: 'MAVRO live reverse auction for export cartons: time left with two auto-extensions, the L1 bid 8.1% below the ceiling, a ranking of vendors with best bid, gap to L1 and bid count, the L1 price over time, what one bidder sees (only their own rank) and the auction rules (illustrative data).',
    },
    {
      screen: 'auction-and-bidding/create-event',
      view: 'Create event',
      title: 'Create an auction',
      caption: 'An event drafted from the MRP run, with only QA-approved vendors invited and a split award planned.',
      alt: 'MAVRO auction creation for aluminium castings drafted from an MRP proposal: item, quantity and ceiling, vendors with approval status and last audit result with one foundry held out until audited, a 70/30 split award plan and the documents sent with the invitation (illustrative data).',
    },
    {
      screen: 'auction-and-bidding/events-register',
      view: 'Events',
      title: 'Events register',
      caption: 'Every auction and sealed bid with its ceiling, result, savings and status.',
      alt: 'MAVRO events register: reverse auctions and sealed bids since 1 September with item, date, bidders, ceiling, best or awarded price, percentage saved and status from draft to awarded (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. Reverse auction AUC-0088 for 24,000 export cartons is live, ₹48.00 ceiling, L1 at ₹44.10 (8.1% below) after two auto-extensions. Two awards, a 70/30 seal ring split and carbide inserts, await the committee. The MRP run has drafted AUC-0091 for 1,800 kg of castings; Konkan Foundry cannot be invited until its qualification audit on 21–22 Oct.',
  faq: [
    {
      q: 'What does Auction and Bidding in MAVRO do?',
      a: 'MAVRO Auction and Bidding is an e-sourcing suite: it creates events from approved indents or MRP proposals, invites qualified vendors, runs live reverse auctions or sealed bids, evaluates them and awards with committee governance, measuring savings against the ceiling on every event.',
    },
    {
      q: 'What is rank-only bidding?',
      a: 'In a reverse auction each vendor sees only their own rank, not other vendors’ names or prices. This keeps bidding competitive and fair, and the buyer sees the full ranking.',
    },
    {
      q: 'Can only approved vendors bid?',
      a: 'Yes. Only vendors approved by quality, through MAVRO’s vendor audit records, can be invited, so quality is never traded for price.',
    },
    {
      q: 'What is a split award?',
      a: 'The award rule can divide an event between the lowest bidders, for example 70% to L1 and 30% to L2, so that a critical material keeps a second supplying source. The committee approves the split and purchase orders follow.',
    },
  ],
  seo: {
    title: 'Reverse auction and e-sourcing software | MAVRO',
    description:
      'MAVRO Auction and Bidding: live reverse auctions with rank-only bidding, sealed bids and RFQs, savings analytics against the ceiling, QA-approved vendors only, and awards with committee governance and split rules.',
  },
};
