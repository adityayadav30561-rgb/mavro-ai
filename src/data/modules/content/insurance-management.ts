import type { ModuleContent } from '../schema';

/*
 * Insurance Management. Source: product deck v2, slide 100 (tagline, four tiles: policy register, renewal radar at
 * 30, 60 and 90 days, the claims workflow from intimation through survey to settlement, and the coverage check; six
 * points on why it matters; four screens). Insurers, broker and policy numbers on the screens are fictional. Figures
 * on the tiles come from the module's screens (prototype/modules/insurance-management/), whose scenario is below;
 * like all screen data they are illustrative.
 */
export const content: ModuleContent<'insurance-management'> = {
  slug: 'insurance-management',
  tagline: 'Every policy, renewal and claim across the group, on one screen.',
  tiles: [
    {
      icon: 'shield',
      title: 'Policy register',
      body: 'Every policy with its cover, sum insured, premium and excess.',
      figure: { value: '10', label: 'active policies across the group' },
    },
    {
      icon: 'calendar',
      title: 'Renewal radar',
      body: 'Renewals at 30, 60 and 90 days, quotes asked in time.',
      figure: { value: '4', label: 'renewals in the next 90 days' },
    },
    {
      icon: 'claims',
      title: 'Claims workflow',
      body: 'Intimation, survey and settlement, with every document.',
      figure: { value: '46 days', label: 'average time to settle' },
    },
    {
      icon: 'search',
      title: 'Coverage check',
      body: 'Assets and covers compared, gaps raised before a loss.',
      figure: { value: '₹38 L', label: 'of new assets flagged to endorse' },
    },
  ],
  what: 'A register of every policy in the group, from fire and machinery breakdown to transit, motor, health and liability, with sum insured, premium, excess and documents; renewals watched at 90, 60 and 30 days; claims filed from the incident record, intimated within the policy’s window and followed through survey to settlement; and a coverage check that compares the asset register and the incident with what the policy covers.',
  why: [
    'No renewal is missed: quotes are asked at 90 days.',
    'Claims are intimated within the window, with the documents the insurer asks for.',
    'Settlement time is visible, claim by claim and stage by stage.',
    'Premium spend is seen by type of cover against the budget.',
    'An incident in a plant reaches corporate risk the same day.',
    'Policies, surveys and settlements sit in one vault.',
  ],
  flow: {
    from: [
      { slug: 'asset-management', passes: 'Assets, values and additions to insure' },
      { slug: 'production-management', passes: 'Breakdowns and incidents on the lines' },
      { slug: 'transportation-management', passes: 'Transit damage and dispatch values' },
      { slug: 'fleet-management', passes: 'Vehicles, accidents and renewals' },
      { slug: 'hrms-and-payroll', passes: 'Employees covered by group policies' },
    ],
    to: [
      { slug: 'accounting', passes: 'Premiums, prepaid cover and claim receipts' },
      { slug: 'cost-forecasting', passes: 'Premium budgets and their phasing' },
      { slug: 'document-management', passes: 'Policies, surveys and settlements' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Plants, machinery and stock insured at their real value, with breakdown claims filed from the maintenance record.' },
    { slug: 'distribution', note: 'Transit, warehouse stock and fleet policies across depots, with damage claims and recoveries tracked.' },
    { slug: 'pharma', note: 'Plants, cold-chain stock and product liability covered, with renewals and claims on one screen.' },
    { slug: 'service-providers', note: 'Office, liability and employee policies across entities, renewed on time.' },
  ],
  roles: [
    { name: 'Corporate risk manager', task: 'Keeps every policy current and every claim moving.', works: 'Risk dashboard' },
    { name: 'Plant and site heads', task: 'Report incidents the day they happen.', works: 'Incidents' },
    { name: 'Maintenance and stores', task: 'Supply the records, photos and estimates a claim needs.', works: 'File a claim' },
    { name: 'Finance', task: 'Pays premiums, accounts for prepaid cover and receives settlements.', works: 'Policy register' },
    { name: 'HR', task: 'Keeps employees on the group health and accident policies.', works: 'Policy register' },
  ],
  related: ['asset-management', 'fleet-management', 'transportation-management', 'accounting'],
  screens: [
    {
      screen: 'insurance-management/risk-dashboard',
      view: 'Risk dashboard',
      title: 'Risk and insurance dashboard',
      caption: 'Renewals at 30, 60 and 90 days, open and settled claims, coverage gaps and premium by cover.',
      alt: 'MAVRO insurance risk dashboard: ₹84.8 crore of property and machinery insured on 10 policies, four renewals in 90 days, three open claims including one being filed, 46 days average settlement, a renewal radar, claims with stage and days open, coverage check items, renewal quotes and premium by type of cover (illustrative data).',
    },
    {
      screen: 'insurance-management/file-claim',
      view: 'File a claim',
      title: 'File a claim',
      caption: 'A machine breakdown claim drafted from the maintenance order, checked against the policy, with the intimation clock.',
      alt: 'MAVRO claim filing for a CNC turning centre spindle breakdown: incident details and timeline from the maintenance order, a coverage check against the machinery breakdown policy with a warning that a preventive check was overdue, the expected claim after the excess, 45 hours left to intimate the insurer and the document checklist (illustrative data).',
    },
    {
      screen: 'insurance-management/claim-tracking',
      view: 'Claims',
      title: 'Claim tracking',
      caption: 'One claim from intimation to settlement: progress, claimed against assessed, and where the time went.',
      alt: 'MAVRO claim tracking for water ingress at a plant store: progress from incident and same-day intimation through survey and report to the settlement offer, ₹6.40 lakh claimed against ₹5.10 lakh assessed after salvage, depreciation and the excess, days per stage and the claim documents (illustrative data).',
    },
    {
      screen: 'insurance-management/policy-register',
      view: 'Policy register',
      title: 'Policy register',
      caption: 'Every policy with its insurer, cover, sum insured, premium, excess, renewal and status.',
      alt: 'MAVRO policy register: fire, machinery breakdown, marine transit, motor fleet, group health, liability, employees’ compensation, personal accident and burglary policies with insurer, cover, sum insured, premium, excess, renewal date and status, one awaiting an endorsement for new assets (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. Ten policies with two insurers through one broker; ₹84.8 Cr of property and machinery insured. At 11:36 CNC-03’s spindle failed: the claim is drafted from the maintenance order, the coverage check warns that the spindle check was overdue, and the insurer must hear by 10 Oct, 11:36. The Chennai water ingress claim has a settlement offer of ₹5.10 L against ₹6.40 L claimed on day 51. Four assets added on 4 Oct, ₹38 L, still need an endorsement.',
  faq: [
    {
      q: 'What does Insurance Management in MAVRO do?',
      a: 'MAVRO Insurance Management keeps a register of every policy in the group with its cover, sum insured, premium, excess and documents, watches renewals at 90, 60 and 30 days, takes claims from the incident through intimation, survey and settlement, and checks coverage against the asset register.',
    },
    {
      q: 'How does MAVRO help claims get filed on time?',
      a: 'A claim is drafted from the record of the incident, such as a maintenance order or a transit damage report, with the asset, timings and photos already on it. MAVRO shows the time left in the policy’s intimation window and the documents the insurer needs.',
    },
    {
      q: 'What does the coverage check look for?',
      a: 'It compares the asset register with the policies, so new assets that are not yet endorsed and values that have changed are flagged. On a claim, it checks that the asset is on the policy, the period, the cover and the excess, and warns about anything the insurer may question, such as overdue maintenance.',
    },
    {
      q: 'Can small losses be handled without a claim?',
      a: 'Yes. When a loss is below the policy excess, such as minor damage in transit, MAVRO records it against the policy without a claim and the cost can be recovered from the party responsible, such as the transporter.',
    },
  ],
  seo: {
    title: 'Insurance policy, renewal and claims management software | MAVRO',
    description:
      'MAVRO Insurance Management: a register of every policy, renewals at 30, 60 and 90 days, claims from intimation through survey to settlement, and a coverage check against the asset register.',
  },
};
