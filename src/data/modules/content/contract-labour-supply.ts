import type { ModuleContent } from '../schema';

/*
 * Contract Labour Supply. Source: product deck v2, slide 106 (tagline, four tiles: compliance health, labour register,
 * deployment pack, bill approval; six points on why it matters; four screens). It is the principal employer's side:
 * statutory compliance (CLRA, PF, ESIC, wages) enforced before a contractor bill is certified. Contract Labour
 * Purchase is the factory-side operations portal on the same contract workers. Figures on the tiles come from the
 * module's screens (prototype/modules/contract-labour-supply/), whose scenario is below; like all screen data they
 * are illustrative.
 */
export const content: ModuleContent<'contract-labour-supply'> = {
  slug: 'contract-labour-supply',
  tagline: 'Contractor onboarding to bill payment, with statutory compliance enforced at every gate.',
  tiles: [
    {
      icon: 'shield',
      title: 'Compliance health',
      body: 'Contractor-wise deployment, bill value and compliance gaps.',
      figure: { value: '472', label: 'contract workers across 9 contractors' },
    },
    {
      icon: 'people',
      title: 'Labour register',
      body: 'Trade, site, rate and gate-pass validity for every worker.',
      figure: { value: '9', label: 'gate passes expiring in 30 days' },
    },
    {
      icon: 'receipt',
      title: 'Deployment pack',
      body: 'Licence, PF, ESIC, wage register and induction evidence per period.',
      figure: { value: '8', label: 'evidence checks on each contractor pack' },
    },
    {
      icon: 'gate',
      title: 'Bill approval',
      body: 'Certification is blocked until the statutory evidence is on record.',
      figure: { value: '₹23.5 L', label: 'bill held for a missing PF challan' },
    },
  ],
  what: 'Principal-employer control over contract manpower: contractor and worker registers with trade, rate and gate-pass validity, a deployment compliance pack for each contractor and period covering licence, PF, ESIC, wage register and safety induction, and a bill approval queue where certification is blocked until the statutory evidence is complete. The same register feeds the statutory returns.',
  why: [
    'Principal-employer liability is managed with evidence, not with assurances.',
    'Bills cannot be certified while PF, ESIC or wage proof is missing.',
    'Minimum-wage revisions are applied and reconciled worker by worker.',
    'Expiring licences and gate passes are flagged before deployment stops.',
    'Workers without a safety induction cannot be posted to a live area.',
    'Statutory returns draw on the same register that runs daily deployment.',
  ],
  flow: {
    from: [
      { slug: 'contract-labour-purchase', passes: 'Attendance and requisitions from the factory' },
      { slug: 'gate-entry', passes: 'Gate passes and entry exceptions' },
      { slug: 'hrms-and-payroll', passes: 'Wage rates and statutory settings' },
    ],
    to: [
      { slug: 'vendor-invoice-management', passes: 'Certified contractor bills for payment' },
      { slug: 'accounting', passes: 'Contract labour cost and TDS' },
      { slug: 'document-management', passes: 'Licences, challans and returns' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Helpers, packers and loaders from contractors on every shift, each bill backed by PF, ESIC and wage proof.' },
    { slug: 'distribution', note: 'Warehouse and loading crews from several contractors, checked for licence, pass and induction before posting.' },
    { slug: 'pharma', note: 'Contract staff in controlled areas only with induction and verification on record.' },
  ],
  roles: [
    { name: 'Contract labour compliance officer', task: 'Checks the evidence pack and certifies or holds each bill.', works: 'Bill approval' },
    { name: 'HR head', task: 'Sees contractor compliance and wage revisions across sites.', works: 'Compliance dashboard' },
    { name: 'Plant HR', task: 'Onboards workers, issues gate passes and tracks expiry.', works: 'Labour register' },
    { name: 'Finance', task: 'Pays only certified bills, with TDS on contractor payments.', works: 'Bill approval' },
    { name: 'Contractors', task: 'Upload challans, registers and proof for each period.', works: 'Deployment pack' },
  ],
  related: ['contract-labour-purchase', 'hrms-and-payroll', 'gate-entry', 'vendor-invoice-management'],
  screens: [
    {
      screen: 'contract-labour-supply/compliance-dashboard',
      view: 'Compliance dashboard',
      title: 'Contract manpower and compliance',
      caption: 'Every contractor with workers, licence, PF, ESIC, wages, bill and status, plus what needs action.',
      alt: 'MAVRO contract manpower dashboard: 472 contract workers across 9 contractors, September bills of ₹1.18 crore with three pending, 11 licences and passes expiring, 468 of 472 safety inductions done, a contractor table with CLRA licence, PF, ESIC, wages, bill and status, bill value by contractor and items needing action (illustrative data).',
    },
    {
      screen: 'contract-labour-supply/deployment-pack',
      view: 'Deployment pack',
      title: 'Deployment compliance pack',
      caption: 'The evidence behind one contractor’s monthly bill, checked item by item.',
      alt: 'MAVRO deployment compliance pack for one contractor: a checklist of licence and agreement, PF challan missing and blocking the bill, ESIC challan, wage register, wages paid by bank transfer, minimum-wage check, safety induction and an attendance difference, with muster against biometric man-days and the bill held (illustrative data).',
    },
    {
      screen: 'contract-labour-supply/bill-approval',
      view: 'Bill approval',
      title: 'Contractor bill approval',
      caption: 'Nine September bills with their five checks; certification is blocked on any gap.',
      alt: 'MAVRO contractor bill approval queue: nine bills with workers and amount, ticks for attendance, PF, ESIC, wages and safety induction, one bill held for a missing PF challan, two in review and six certified, with the reason for the held bill and the payable amount on biometric days (illustrative data).',
    },
    {
      screen: 'contract-labour-supply/labour-register',
      view: 'Labour register',
      title: 'Contractor and labour register',
      caption: 'Every worker with trade, rate, gate pass, medical, police verification and induction.',
      alt: 'MAVRO labour register: contract workers with contractor, trade, daily rate, gate pass validity, medical fitness, police verification, safety induction and status, including an expired pass with entry refused, passes and medicals due, and workers not yet posted to live areas (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02, principal employer. 472 contract workers from 9 contractors; September bills total ₹1.18 Cr, six certified and three pending. Bhairav Industrial’s ₹23.5 L bill is held because the September PF challan, due on 15 Oct, is not on record yet, and its muster is 38 man-days above biometric. A Shree Om worker’s gate pass expired on 6 Oct and the turnstile refused entry at 07:52.',
  faq: [
    {
      q: 'What does Contract Labour Supply in MAVRO do?',
      a: 'MAVRO Contract Labour Supply gives the principal employer control over contract manpower: contractor and worker registers, a compliance pack for each contractor and period covering licence, PF, ESIC, wage register and safety induction, and a bill approval queue where certification is blocked until the statutory evidence is complete.',
    },
    {
      q: 'Can a contractor bill be paid without PF and ESIC proof?',
      a: 'No. In MAVRO a bill cannot be certified while the PF challan, ESIC challan or wage proof for the period is missing. It is released as soon as the evidence is uploaded.',
    },
    {
      q: 'How does MAVRO handle minimum-wage revisions?',
      a: 'When a revision takes effect, the new rates are applied and reconciled worker by worker, and bills that use a rate before its effective date are flagged for review.',
    },
    {
      q: 'What stops workers without safety induction from entering live areas?',
      a: 'The induction status sits on the worker’s record. A worker without it cannot be posted to a live area, and an expired gate pass is refused at the turnstile through Gate Entry.',
    },
  ],
  seo: {
    title: 'Contract labour compliance and CLRA software | MAVRO',
    description:
      'MAVRO Contract Labour Supply: contractor and worker registers, deployment compliance packs for CLRA licence, PF, ESIC and wages, safety induction control, and contractor bills certified only when the statutory evidence is complete.',
  },
};
