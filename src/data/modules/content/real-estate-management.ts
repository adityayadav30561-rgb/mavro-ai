import type { ModuleContent } from '../schema';

/*
 * Real Estate Management. Source: product deck v2, slide 104 (tagline, four tiles: portfolio register, renewal
 * workflow from market benchmark to CFO approval, statutory watch, rent analytics; six points on why it matters; four
 * screens). Figures on the tiles come from the module's screens (prototype/modules/real-estate-management/), whose
 * scenario is below; like all screen data (including the market comparables) they are illustrative.
 */
export const content: ModuleContent<'real-estate-management'> = {
  slug: 'real-estate-management',
  tagline: 'Every property and lease, with each renewal decision backed by market data.',
  tiles: [
    {
      icon: 'warehouse',
      title: 'Portfolio register',
      body: 'Owned, leased and idle land in one register.',
      figure: { value: '14', label: 'properties, 5 owned and 9 leased' },
    },
    {
      icon: 'workflow',
      title: 'Renewal workflow',
      body: 'Market benchmark, negotiation and CFO approval.',
      figure: { value: '90 days', label: 'before expiry the renewal starts' },
    },
    {
      icon: 'shield',
      title: 'Statutory watch',
      body: 'Fire NOC, licences, property tax and registrations tracked.',
      figure: { value: '3', label: 'statutory dates due in 90 days' },
    },
    {
      icon: 'finance',
      title: 'Rent analytics',
      body: 'Rate per sq ft, escalations and five-year commitments.',
      figure: { value: '₹3.52 Cr', label: 'rent a year across leases' },
    },
  ],
  what: 'The full property portfolio, with plants, depots, offices, guest houses and land bank, in one register with lease terms, rent payment history and statutory documents; a renewal workflow for every expiring lease that benchmarks the rent against the market, tracks the negotiation and models the five-year cost before the CFO approves; TDS on rent and registration kept current; and idle land surfaced for a decision.',
  why: [
    'Renewals start 90 days early, with market benchmarks to hand.',
    'Negotiated rates are compared with the market average and documented.',
    'TDS on rent and lease registration are always current.',
    'Landlord history and payment record sit in one place.',
    'The five-year cost is modelled before anything is signed.',
    'Idle land is surfaced for a lease, sale or use decision.',
  ],
  flow: {
    from: [
      { slug: 'accounting', passes: 'Rent payments and TDS' },
      { slug: 'asset-management', passes: 'Buildings and their fixed assets' },
      { slug: 'document-management', passes: 'Deeds, NOCs and licences' },
    ],
    to: [
      { slug: 'accounting', passes: 'Rent expense, deposits and TDS' },
      { slug: 'insurance-management', passes: 'Properties to cover' },
      { slug: 'cost-forecasting', passes: 'Committed rent by year' },
      { slug: 'warehouse-management', passes: 'Depots and warehouses in use' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Plants, depots, sales offices and idle land on one register, with every lease renewed on evidence.' },
    { slug: 'distribution', note: 'Many depots and offices across cities, each lease tracked, benchmarked and renewed in time.' },
    { slug: 'pharma', note: 'Plant and warehouse licences and leases tracked beside the properties they apply to.' },
    { slug: 'service-providers', note: 'Offices across cities with leases, deposits and rent escalations managed centrally.' },
  ],
  roles: [
    { name: 'Admin and estates manager', task: 'Keeps the register, rent and statutory dates current.', works: 'Property register' },
    { name: 'CFO', task: 'Approves renewals with the five-year cost in front of them.', works: 'Lease renewals' },
    { name: 'Legal', task: 'Reviews agreements, registration and stamp duty.', works: 'Documents' },
    { name: 'Finance', task: 'Pays rent, deducts TDS and accounts for deposits.', works: 'Rent payments' },
    { name: 'Site heads', task: 'See their property’s lease, documents and renewals.', works: 'Property 360' },
  ],
  related: ['accounting', 'asset-management', 'insurance-management', 'document-management'],
  screens: [
    {
      screen: 'real-estate-management/portfolio-dashboard',
      view: 'Portfolio dashboard',
      title: 'Portfolio dashboard',
      caption: 'Leases against market rent, committed rent by year, statutory dates and the land bank.',
      alt: 'MAVRO property portfolio dashboard: 14 properties, ₹3.52 crore rent a year, two renewals in 90 days, statutory dates due, leases with area, rent per square foot against the market and lease end, committed rent by year, statutory watch and an idle land plot (illustrative data).',
    },
    {
      screen: 'real-estate-management/lease-renewal',
      view: 'Lease renewals',
      title: 'Lease renewal workflow',
      caption: 'A depot lease renewed on evidence: market benchmark, negotiation and the five-year cost of each offer.',
      alt: 'MAVRO lease renewal for a warehouse: a market benchmark of six comparable warehouses with today’s rent, the landlord’s asks and a recommended rent on a scale, the negotiation history, five-year cost for three offers with escalation and a recommendation for the CFO (illustrative data).',
    },
    {
      screen: 'real-estate-management/property-360',
      view: 'Property 360',
      title: 'Property 360',
      caption: 'One page per property: lease terms, rent schedule, payments with TDS and every document.',
      alt: 'MAVRO property 360 for a leased depot: area, rent, lease period, lock-in, escalation and deposit, rent over the lease, monthly payments on time with TDS deducted, upcoming dates and the lease deed, NOC and insurance documents (illustrative data).',
    },
    {
      screen: 'real-estate-management/property-register',
      view: 'Property register',
      title: 'Property register',
      caption: 'Owned, leased and idle properties with use, area, rent, landlord, escalation and document state.',
      alt: 'MAVRO property register: 14 properties including plants, depots, offices, guest houses and a land plot, with holding, area, monthly rent, landlord or title, escalation, lease end and document status (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 14 properties and ₹3.52 Cr of rent a year. The Ahmedabad depot lease ends on 31 Dec: the landlord asked for ₹27.60 a sq ft, the market average is ₹25.40, and the recommended close is ₹25.80, ₹33.4 L below the ask over five years, for the CFO’s approval. The Chennai fire NOC expires on 15 Nov, and a 4.2-acre plot at Talegaon sits idle.',
  faq: [
    {
      q: 'What does Real Estate Management in MAVRO do?',
      a: 'MAVRO Real Estate Management holds every property, owned or leased, with lease terms, rent payments, deposits and statutory documents; runs a benchmarked renewal workflow for each expiring lease; and surfaces idle land for a decision.',
    },
    {
      q: 'How does MAVRO support lease renewals?',
      a: 'The renewal starts 90 days before expiry. It compares the landlord’s ask with market rents for the area, records the negotiation, models the five-year cost of each offer with escalation, and sends a recommendation to the CFO before anything is signed.',
    },
    {
      q: 'Does it handle TDS on rent and registration?',
      a: 'Yes. Rent payments record the TDS deducted, and lease registration, stamp duty and statutory documents such as the fire NOC are tracked with their due dates.',
    },
    {
      q: 'Can it track land that is not in use?',
      a: 'Yes. Land bank is kept in the same register with its title documents, holding cost and options, so idle land can be reviewed for lease, sale or use.',
    },
  ],
  seo: {
    title: 'Lease and property management software for enterprises | MAVRO',
    description:
      'MAVRO Real Estate Management: one register for owned, leased and idle properties, lease renewals benchmarked against market rent, five-year cost modelling, TDS on rent, and statutory watch.',
  },
};
