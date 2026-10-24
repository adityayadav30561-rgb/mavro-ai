import type { ModuleContent } from '../schema';

/*
 * HRMS and Payroll. Sources: product deck v2, slides 32–33 (tagline, four tiles, what it does, why it matters, four
 * screens) and the HRMS deck (core HR, attendance and payroll, India statutory, self-service and the mobile app,
 * the 25–30 day implementation). The v2 slide describes a multi-unit pharma operation; the page states the same
 * capabilities for every industry and adds payroll from the HRMS deck. Only the HRMS deck's live scope is used, not
 * its roadmap. Figures on the tiles come from the module's screens (prototype/modules/hrms-and-payroll/), whose
 * scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'hrms-and-payroll'> = {
  slug: 'hrms-and-payroll',
  tagline: 'Headcount, onboarding, attendance and payroll inputs: one governed people record.',
  tiles: [
    {
      icon: 'people',
      title: 'Workforce health',
      body: 'Headcount, attrition and open roles by unit.',
      figure: { value: '489', label: 'employees on three units' },
    },
    {
      icon: 'workflow',
      title: 'Guided onboarding',
      body: 'Offer to day-one activation, every task owned by name.',
      figure: { value: '12', label: 'people from offer to day 30' },
    },
    {
      icon: 'calendar',
      title: 'Leave and attendance',
      body: 'SLA-tracked approvals feeding the payroll cut-off.',
      figure: { value: '34', label: 'approvals waiting, 48-hour SLA' },
    },
    {
      icon: 'finance',
      title: 'Payroll and statutory',
      body: 'Attendance-linked run with PF, ESI, PT and TDS.',
      figure: { value: '₹1.48 Cr', label: 'September gross, 486 payslips' },
    },
  ],
  what: 'One people system for plant, office and field teams: headcount and attrition by unit, a governed employee register with grade and CTC control, checklist-driven onboarding from offer to day one, leave, attendance and regularisation approvals that close into the payroll cut-off, and an attendance-linked payroll run with PF, ESI, professional tax and TDS calculated, posted and ready to file.',
  why: [
    'Attrition spikes surface by unit and role before they hit line or field coverage.',
    'Probation reviews, offer acceptances and contract renewals never slip silently.',
    'The payroll cut-off is enforced: late regularisations are flagged as arrears, not absorbed.',
    'Onboarding tasks are owned by name, from IT assets to statutory enrolment.',
    'Grade, CTC and location guardrails block out-of-band hires at entry.',
    'Attendance, loss of pay and leave balances reach payroll as one verified feed.',
  ],
  flow: {
    from: [
      { slug: 'roster-ledger', passes: 'Shifts and weekly offs to mark attendance against' },
      { slug: 'rest-hours-log', passes: 'Overtime cleared inside the hour limits' },
      { slug: 'travel-and-expense', passes: 'Approved claims to pay with salary' },
      { slug: 'project-management', passes: 'Time cards logged against projects' },
    ],
    to: [
      { slug: 'accounting', passes: 'The payroll journal and statutory liabilities' },
      { slug: 'roster-ledger', passes: 'Who is employed, on leave or joining' },
      { slug: 'sales-force-automation', passes: 'Field reps on leave, so beats are covered' },
      { slug: 'asset-management', passes: 'Laptops and kit issued to each employee' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Shift workers on biometric punches across plants, overtime from the roster and one payroll run for every unit.' },
    { slug: 'pharma', note: 'Plant, QA and field teams on one record, with attrition by unit watched before it affects coverage.' },
    { slug: 'distribution', note: 'Depot, warehouse and sales staff across branches, with field reps punching in by geo-fenced mobile.' },
    { slug: 'service-providers', note: 'Office and on-site staff on web and mobile attendance, with leave policies, payroll and Form 16.' },
  ],
  roles: [
    { name: 'HR and payroll lead', task: 'Runs the payroll cycle and statutory dues, and watches the workforce by unit.', works: 'Payroll' },
    { name: 'Managers', task: 'Approve leave and regularisations within the SLA and hold probation reviews.', works: 'Leave and attendance' },
    { name: 'HR executives', task: 'Own onboarding checklists, employee records and exits.', works: 'Onboarding' },
    { name: 'Employees', task: 'Punch in, apply for leave and download payslips and Form 16 on the app.' },
    { name: 'Finance', task: 'Approves the run and receives the payroll journal in the ledger.', works: 'Payroll' },
  ],
  related: ['roster-ledger', 'rest-hours-log', 'travel-and-expense', 'accounting'],
  screens: [
    {
      screen: 'hrms-and-payroll/workforce',
      view: 'Workforce dashboard',
      title: 'Workforce dashboard',
      caption: 'Headcount, attendance, attrition and open roles by unit, the attrition cluster to act on, and what needs HR this month.',
      alt: 'MAVRO HRMS workforce dashboard: 489 employees on three units, 362 of 440 expected punched in today, 11.9% attrition over 12 months with the Chennai plant at 18.6%, 14 open roles, an attrition cluster among CNC operators and the approvals, reviews and offers that need attention (illustrative data).',
    },
    {
      screen: 'hrms-and-payroll/leave-attendance',
      view: 'Leave and attendance',
      title: 'Leave and attendance approvals',
      caption: 'Leave, missed punches and comp-offs in one queue, each checked against balances, the gate log and the roster before it reaches payroll.',
      alt: 'MAVRO leave and attendance approvals: 34 requests pending with 3 past the 48-hour SLA, each with its balance and a roster or gate-log check, an earned-leave request with cover on the roster, and four September regularisations paid as arrears (illustrative data).',
    },
    {
      screen: 'hrms-and-payroll/onboarding',
      view: 'Onboarding',
      title: 'Onboarding workflow',
      caption: 'A joiner from offer to day 30: the checklist with an owner and due date per task, and offers held when the CTC is outside the grade band.',
      alt: 'MAVRO onboarding workflow for a quality inspector joining on 13 Oct: grade S2 within band, 5 of 10 tasks done with an owner each, from background check and kit to biometric enrolment and PF, an offer held for a CTC above its grade band and the joiners in onboarding (illustrative data).',
    },
    {
      screen: 'hrms-and-payroll/payroll',
      view: 'Payroll',
      title: 'Payroll run',
      caption: 'The month’s run from locked attendance to statutory payments, pay by department and the ledger posting.',
      alt: 'MAVRO payroll for September: 486 employees, ₹1.48 Cr gross and ₹1.12 Cr paid on 1 Oct, PF, ESI, TDS and professional tax dues with their status, pay and overtime by department and the payroll journal (illustrative data).',
    },
  ],
  phone: {
    screen: 'hrms-and-payroll/punch',
    view: 'Attendance register',
    title: 'Punch in from the field',
    caption: 'A field rep punches in inside her territory’s geo-fence, and sees her hours, leave balance and payslip on the phone.',
    alt: 'MAVRO phone app: a field rep punched in at 09:18 inside the Ahmedabad east zone, 4 h 52 m worked today, hours for the last seven days, leave balances, the September payslip and a travel claim paid with October salary (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 489 employees (486 paid in September, 5 joined, 2 left): Plant 1 264, Chennai plant 129, Pune office and field sales 96. Today 440 expected, 362 punched in (24 field reps by geo-fenced mobile), 69 due on shift C, 9 absent. Attrition 11.9%, Chennai 18.6%; 14 open roles, 3 offers out. 34 approvals pending, 3 past SLA; 4 September regularisations paid as October arrears; cut-off 31 Oct. Sneha Patil (quality inspector, EMP-1494) joins 13 Oct, 5 of 10 tasks done; OF-0394 held at ₹7.8 L against a ₹7.2 L band top. September payroll: ₹1.48 Cr gross, paid 1 Oct.',
  faq: [
    {
      q: 'What does HRMS and Payroll in MAVRO do?',
      a: 'MAVRO HRMS and Payroll keeps one record for every employee and runs the payroll from it. It covers the employee register, onboarding and exits, leave and attendance from biometric, web and mobile punches, approvals with SLA timers, and an attendance-linked payroll run with PF, ESI, professional tax and TDS, posted to the general ledger on approval.',
    },
    {
      q: 'Does MAVRO payroll handle PF, ESI, professional tax and TDS?',
      a: 'Yes. MAVRO calculates PF with the ECR challan, ESI eligibility and contributions, state-wise professional tax slabs and monthly TDS under the old or new regime inside the payroll run. It handles investment declarations and Form 12BB, generates Form 16 and the quarterly 24Q return, and tracks gratuity and LTA.',
    },
    {
      q: 'How does attendance reach payroll in MAVRO?',
      a: 'Punches from biometric devices, the web and geo-fenced mobile land in one live register in MAVRO. Leave, missed punches and on-duty days are approved in a queue with an SLA, then attendance locks at the payroll cut-off and flows into the run with loss of pay and overtime calculated. Items that arrive after the lock are paid as arrears in the next month.',
    },
    {
      q: 'Can employees use MAVRO HRMS on their phones?',
      a: 'Yes. MAVRO has a native Android and iOS app that works offline and syncs when back online. Employees punch in from approved locations, apply for leave and see their balances, download payslips and Form 16, and managers approve requests from push alerts.',
    },
    {
      q: 'How long does it take to implement MAVRO HRMS?',
      a: 'MAVRO HRMS is implemented in 25 to 30 days. The first two weeks cover discovery, configuration and a trial migration; attendance and payroll go live in week three, and leave, self-service and the mobile app in week four, with support after go-live.',
    },
  ],
  seo: {
    title: 'HRMS and payroll software for India: attendance, PF, ESI, TDS | MAVRO',
    description:
      'MAVRO HRMS and Payroll: a governed employee register, onboarding, leave and attendance from biometric and geo-fenced mobile punches, and payroll with PF, ESI, professional tax, TDS and Form 16.',
  },
};
