import type { ModuleContent } from '../schema';

/*
 * Contract Labour Purchase. Source: product deck v2, slide 108 (tagline, four tiles: live deployment, contractor
 * scorecards, requisition flow, attendance billing; six points on why it matters; four screens). The deck positions it
 * as a factory-side portal that can be shared with factory owners; here it is the plant's operating view of the same
 * contract workers that Contract Labour Supply controls for compliance. Figures on the tiles come from the module's
 * screens (prototype/modules/contract-labour-purchase/), whose scenario is below; like all screen data they are
 * illustrative.
 */
export const content: ModuleContent<'contract-labour-purchase'> = {
  slug: 'contract-labour-purchase',
  tagline: 'Workforce visibility, compliance and clean billing for contract labour, on the factory floor.',
  tiles: [
    {
      icon: 'eye',
      title: 'Live deployment',
      body: 'Biometric-synced headcount by department and shift.',
      figure: { value: '206 of 220', label: 'contract workers present on shift B' },
    },
    {
      icon: 'people',
      title: 'Contractor scorecards',
      body: 'Fulfilment, compliance status and rating for each contractor.',
      figure: { value: '4.6', label: 'top rating out of 5, with fulfilment at 98%' },
    },
    {
      icon: 'rules',
      title: 'Requisition flow',
      body: 'Shortfall to an approved requisition with a cost estimate.',
      figure: { value: '₹2.2 L', label: 'estimate on a 12-packer requisition' },
    },
    {
      icon: 'receipt',
      title: 'Attendance billing',
      body: 'Biometric against muster, reconciled before payment.',
      figure: { value: '53', label: 'man-days on musters with no punch' },
    },
  ],
  what: 'A factory-side portal for the full contract-labour cycle: daily deployment against plan from biometric attendance, a worker register with gate passes and verification expiries, labour requisitions with cost estimates and approval, contractor scorecards, and billing that pays only for verified shifts after reconciling biometric attendance with the contractor’s muster.',
  why: [
    'Pay only for verified shifts: a biometric match is needed before invoices clear.',
    'A missing PF or ESIC challan holds billing automatically.',
    'Shift shortfalls are visible during the shift, not at day-end.',
    'Gate-pass, medical and police-verification expiries are tracked per worker.',
    'Contractor performance data drives allocation decisions.',
    'The factory-side view can be shared with factory owners as it is.',
  ],
  flow: {
    from: [
      { slug: 'gate-entry', passes: 'Biometric punches at the turnstile' },
      { slug: 'roster-ledger', passes: 'Planned shifts and coverage' },
      { slug: 'production-management', passes: 'Labour demand from the production plan' },
    ],
    to: [
      { slug: 'contract-labour-supply', passes: 'Attendance and requisitions for compliance and billing' },
      { slug: 'vendor-invoice-management', passes: 'Reconciled contractor invoices' },
      { slug: 'accounting', passes: 'Contract labour cost by department' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Packers, helpers and loaders sized to each shift, with every punch checked against the contractor’s muster.' },
    { slug: 'distribution', note: 'Warehouse crews planned for peak days, requisitioned in hours and billed on verified attendance.' },
    { slug: 'pharma', note: 'Contract staff counted by area and shift, with passes and verification tracked per worker.' },
  ],
  roles: [
    { name: 'Plant HR officer', task: 'Raises requisitions and reconciles attendance for billing.', works: 'Raise requisition' },
    { name: 'Plant head', task: 'Approves requisitions and watches shift deployment.', works: 'Factory dashboard' },
    { name: 'Shift supervisors', task: 'See who is present against plan and ask for cover.', works: 'Workforce register' },
    { name: 'Security', task: 'Refuse entry on an expired pass at the turnstile.', works: 'Gate passes' },
    { name: 'Factory owners', task: 'Review deployment, cost and contractor performance.', works: 'Contractor scorecards' },
  ],
  related: ['contract-labour-supply', 'gate-entry', 'roster-ledger', 'vendor-invoice-management'],
  screens: [
    {
      screen: 'contract-labour-purchase/factory-dashboard',
      view: 'Factory dashboard',
      title: 'Contract labour on the floor',
      caption: 'Plan against biometric attendance by department and shift, an open requisition and contractor scorecards.',
      alt: 'MAVRO factory dashboard for contract labour: 206 of 220 present on shift B, a shortfall of 14 across three departments, deployment by department and contractor, headcount through the shift, one open requisition for 12 packers and contractor scorecards with fulfilment and rating (illustrative data).',
    },
    {
      screen: 'contract-labour-purchase/workforce-register',
      view: 'Workforce register',
      title: 'Workforce register',
      caption: 'Contract workers with today’s biometric presence, gate pass, medical and police verification.',
      alt: 'MAVRO workforce register: contract workers in assembly and packing with contractor, presence from the biometric reader, entry time, gate pass, medical and police verification validity and status, with passes and medicals due soon (illustrative data).',
    },
    {
      screen: 'contract-labour-purchase/raise-requisition',
      view: 'Raise requisition',
      title: 'Raise a requisition',
      caption: 'A shortfall turned into an approved requisition: need, contractor, compliance check and cost.',
      alt: 'MAVRO labour requisition for 12 packers: the need and period, a contractor chosen by scorecard and licence headroom with an alternate, compliance checks, a cost estimate of ₹2.2 lakh and the approval route to the plant head (illustrative data).',
    },
    {
      screen: 'contract-labour-purchase/attendance-billing',
      view: 'Attendance and billing',
      title: 'Attendance and billing',
      caption: 'Contractor muster against biometric punches, so only verified shifts are paid.',
      alt: 'MAVRO attendance billing for September: muster against biometric man-days for five contractors, billed against payable amounts, one bill held for missing PF proof, the man-days with no punch for that contractor and the rules applied to the bill (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, Plant 1, 8 Oct, 14:02, shift B. 206 of 220 contract workers are present by biometric, 14 short across assembly, packing and stores. A requisition for 12 packers for 14 to 31 Oct, estimated at ₹2.2 L, waits for the plant head. September billing pays 9,401 verified man-days, 53 fewer than the contractors’ musters, and holds one bill for a missing PF challan.',
  faq: [
    {
      q: 'What does Contract Labour Purchase in MAVRO do?',
      a: 'MAVRO Contract Labour Purchase is the factory-side view of contract manpower: daily deployment against plan from biometric attendance, a worker register with gate passes and verification expiries, requisitions with cost estimates, contractor scorecards, and billing reconciled to verified attendance.',
    },
    {
      q: 'How does MAVRO make sure only verified shifts are paid?',
      a: 'It compares each contractor’s muster with the biometric punches, shows the man-days with no punch, and takes them off the bill. A biometric match is required before an invoice clears.',
    },
    {
      q: 'Can the factory raise a requisition from a shortfall?',
      a: 'Yes. A shortfall on the dashboard becomes a requisition for the department, period and trade, with a contractor suggested by scorecard and licence headroom, a cost estimate and an approval route.',
    },
    {
      q: 'How is it different from Contract Labour Supply?',
      a: 'Contract Labour Purchase is the plant’s operating view: who is on the floor, who to request and what to pay. Contract Labour Supply is the compliance view of the same workers: licences, PF, ESIC, wage registers and bill certification.',
    },
  ],
  seo: {
    title: 'Contract labour deployment and billing software | MAVRO',
    description:
      'MAVRO Contract Labour Purchase: live deployment from biometric attendance, worker register with gate passes, labour requisitions with cost estimates, contractor scorecards and billing paid only for verified shifts.',
  },
};
