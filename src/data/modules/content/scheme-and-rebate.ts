import type { ModuleContent } from '../schema';

/*
 * Scheme and Rebate. Source: product deck v2, slides 86–87 (tagline, four tiles, what it does, why it matters, four
 * screens). Figures on the tiles come from the module's screens (prototype/modules/scheme-and-rebate/), whose
 * scenario agrees with the Distributor Portal and Dealer Portal claims; like all screen data they are illustrative.
 */
export const content: ModuleContent<'scheme-and-rebate'> = {
  slug: 'scheme-and-rebate',
  tagline: 'Design slabs, simulate budgets and settle claims: leakage-free trade spend.',
  tiles: [
    {
      icon: 'scheme',
      title: 'Slab builder',
      body: 'Quantity and value slabs with payout simulation.',
      figure: { value: '₹7.50 L', label: 'draft payout cut to ₹6.66 L in simulation' },
    },
    {
      icon: 'shield',
      title: 'Budget guardrails',
      body: 'Auto-cap with breach alerts from 85%.',
      figure: { value: '89%', label: 'of the festive slab budget, alert raised' },
    },
    {
      icon: 'claims',
      title: 'Claim verification',
      body: 'Duplicate and POP-audit checks built in.',
      figure: { value: '4', label: 'duplicate claims caught before payout' },
    },
    {
      icon: 'receipt',
      title: 'Credit note engine',
      body: 'Bulk settlement straight into the ledger.',
      figure: { value: '14', label: 'credit notes in the next bulk run' },
    },
  ],
  what: 'Trade marketing spend under control: build distributor, stockist, dealer and retailer schemes with simulated budgets, apply them as orders are entered, track accruals against settlements, and clear verified claims through a governed credit-note engine. Every claim is checked against its scheme, the bills behind it, earlier claims and any audit before it is paid.',
  why: [
    'Scheme budgets never silently overshoot: caps and alerts are built in.',
    'Duplicate claims are caught before payout, not after.',
    'Short claim cycles keep channel partners motivated.',
    'Accrual against settlement visibility keeps the books clean.',
    'Sales lift per scheme is measured, so spend flows to what works.',
    'Slab simulation kills badly priced schemes at design time.',
  ],
  flow: {
    from: [
      { slug: 'order-to-cash', passes: 'Orders the scheme applies to' },
      { slug: 'distributor-portal', passes: 'Distributor claims and purchases' },
      { slug: 'dealer-portal', passes: 'Dealer claims with their retailer bills' },
      { slug: 'sales-force-automation', passes: 'POP audits from field visits' },
    ],
    to: [
      { slug: 'accounting', passes: 'Monthly accruals and credit notes' },
      { slug: 'distributor-portal', passes: 'Settled claims and slab progress' },
      { slug: 'dealer-portal', passes: 'Credit notes and the dealer’s slab' },
      { slug: 'data-analytics', passes: 'Sales lift and spend per scheme' },
    ],
  },
  industries: [
    { slug: 'distribution', note: 'Volume slabs, target rebates and display schemes across distributors, dealers and retailers, settled through the channel.' },
    { slug: 'manufacturing', note: 'Trade schemes for the channel that sells your products, with spend capped and claims checked against bills.' },
    { slug: 'pharma', note: 'Stockist and retailer schemes with budgets capped and every claim verified before a credit note is raised.' },
  ],
  roles: [
    { name: 'Trade marketing', task: 'Designs schemes, simulates the payout and watches budgets against their caps.', works: 'Slab builder' },
    { name: 'Sales head', task: 'Approves schemes within delegation and reads the sales lift each one brings.', works: 'Scheme performance' },
    { name: 'Claims team', task: 'Clears the claims queue: bills matched, duplicates rejected, audits chased.', works: 'Claims' },
    { name: 'Field reps', task: 'Audit counter displays and collect expired stock on their visits.', works: 'Claims' },
    { name: 'Finance', task: 'Books accruals monthly and posts the bulk settlement as credit notes.', works: 'Accruals' },
  ],
  related: ['order-to-cash', 'distributor-portal', 'dealer-portal', 'sales-force-automation'],
  screens: [
    {
      screen: 'scheme-and-rebate/schemes',
      view: 'Schemes',
      title: 'Scheme dashboard',
      caption: 'Every scheme’s budget against its cap and its sales lift, accruals against settlements and the claims waiting.',
      alt: 'MAVRO Scheme and Rebate dashboard: ₹42.6 L of a ₹60 L trade budget used, the festive volume slab over its 85% alert, scheme performance with sales lift, accruals against settlements and 23 claims waiting with 4 duplicates caught (illustrative data).',
    },
    {
      screen: 'scheme-and-rebate/scheme-register',
      view: 'Scheme register',
      title: 'Scheme register',
      caption: 'Each scheme with its audience, basis, period, budget used, what is accrued and the claims still open.',
      alt: 'MAVRO scheme register: seven schemes this year and one draft, each with audience, slab or payout basis, period, budget used against the cap, accrued amount, open claims and status, with ₹30.8 L already settled by credit note (illustrative data).',
    },
    {
      screen: 'scheme-and-rebate/slab-builder',
      view: 'Slab builder',
      title: 'Create scheme: slab builder',
      caption: 'Slabs designed and simulated on last season’s purchases; the top slab is shown to pay for sales that would happen anyway.',
      alt: 'MAVRO slab builder for a draft dealer scheme: three value slabs with payout rates, dealers by slab from last season with a 10% lift, a projected payout of ₹7.50 L against an ₹8 L cap, a suggestion that cuts it to ₹6.66 L, and the guardrails set before it goes live (illustrative data).',
    },
    {
      screen: 'scheme-and-rebate/claims-queue',
      view: 'Claims',
      title: 'Claims settlement queue',
      caption: 'Claims checked for scheme, bills, duplicates and audit; verified ones go to the bulk credit-note run.',
      alt: 'MAVRO claims settlement queue: 23 claims worth ₹6.4 L with checks for scheme, bills, earlier claims and audit, 14 verified for ₹3.9 L, 5 waiting for an audit, 4 duplicates rejected with the earlier claim shown, and the bulk settlement of 14 credit notes (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. Seven schemes this year, ₹42.6 L of ₹60.0 L used, ₹11.8 L accrued and not settled. The festive volume slab for distributors (3% from ₹40 L, 4% from ₹60 L) is at 89% of its ₹14 L budget. 23 claims, ₹6.4 L: 14 verified (₹3.9 L, including Navrangpura Distributors’ ₹1,10,260 and the Ahmedabad dealers’ ₹1,06,640), 5 waiting for an audit, 4 duplicates. Bulk settlement on 9 Oct: 14 credit notes. Draft SCH-0419 rabi season dealer slab: ₹7.50 L projected against an ₹8 L cap, ₹6.66 L as suggested.',
  faq: [
    {
      q: 'What does Scheme and Rebate management in MAVRO do?',
      a: 'MAVRO Scheme and Rebate runs trade schemes from design to settlement. It builds quantity and value slabs, target rebates, per-piece incentives and display schemes, simulates the payout, caps the budget, applies schemes as orders are entered, accrues them monthly and settles verified claims as credit notes.',
    },
    {
      q: 'How does MAVRO stop duplicate or false scheme claims?',
      a: 'MAVRO checks every claim against its scheme and slab, the invoices or retailer bills behind it and every earlier claim. Bills already claimed are flagged as duplicates before payout, and display or stock claims wait for a field audit with photos before they can be verified.',
    },
    {
      q: 'Can MAVRO cap a scheme budget?',
      a: 'Yes. Each scheme in MAVRO has a budget cap. Trade marketing is alerted when spend passes 85%, accruals stop at the cap unless it is raised, and raising it needs approval within your delegation, so scheme budgets never overshoot without anyone noticing.',
    },
    {
      q: 'How are scheme claims settled to distributors and dealers in MAVRO?',
      a: 'Verified claims are settled in a bulk run as credit notes, to distributors directly and to dealers through their distributor. The credit notes post to the ledger against the scheme accruals, and partners see them on their portal the same day.',
    },
  ],
  seo: {
    title: 'Trade scheme and rebate management software | MAVRO',
    description:
      'MAVRO Scheme and Rebate: slab builder with payout simulation, budget caps with alerts, claim verification with duplicate and POP-audit checks, accruals and bulk credit-note settlement for distributors, dealers and retailers.',
  },
};
