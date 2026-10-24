import type { ModuleContent } from '../schema';

/*
 * Rest Hours Log. Source: product deck v2, slides 60–61 (tagline, four tiles, what it does, why it matters, four
 * screens), written for every industry. The deck names no specific limits; the screens use the usual statutory
 * working-hour limits as configured rules, plus the plant's own fatigue rules, and the copy does not cite an Act, as
 * limits differ by state and are set per plant. Figures on the tiles come from the module's screens
 * (prototype/modules/rest-hours-log/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'rest-hours-log'> = {
  slug: 'rest-hours-log',
  tagline: 'Biometric punch to statutory return: working hours held inside the legal limit.',
  tiles: [
    {
      icon: 'shield',
      title: 'Compliance health',
      body: 'Site-wise weekly hours, rest score and violations.',
      figure: { value: '99.1%', label: 'rest score last week' },
    },
    {
      icon: 'layers',
      title: 'Duty log register',
      body: 'Duty and rest hours per worker, per week.',
      figure: { value: '369', label: 'shift workers on two plants' },
    },
    {
      icon: 'rules',
      title: 'Rule calculator',
      body: 'Rolling duty, rest gap and weekly-off evaluation.',
      figure: { value: '8', label: 'rules checked at every punch' },
    },
    {
      icon: 'check',
      title: 'Violations',
      body: 'Breach approval with compensatory rest tracked.',
      figure: { value: '4', label: 'waiting for a plant head' },
    },
  ],
  what: 'Working-hours governance for shift operations: biometric punches reconciled against the roster, rolling duty and rest calculated for every worker under the statutory limits and the plant’s own fatigue rules, violations routed to the plant head with compensatory rest scheduled, and registers kept ready for inspector returns.',
  why: [
    'Weekly-hour and rest-gap breaches are caught in the cycle they occur.',
    'Working consecutive days without a weekly off is escalated automatically.',
    'Overtime reaching payroll is pre-approved and inside the statutory cap.',
    'Compensatory rest is scheduled, not promised and forgotten.',
    'Fatigue risk on night and double shifts is visible to the plant head.',
    'Inspector returns are reconciled from the same log that runs operations.',
  ],
  flow: {
    from: [
      { slug: 'roster-ledger', passes: 'The published roster and overtime requests' },
      { slug: 'hrms-and-payroll', passes: 'Biometric punches, leave and holidays' },
      { slug: 'gate-entry', passes: 'Gate times to settle missed punches' },
      { slug: 'production-management', passes: 'The breakdown or rush behind extra hours' },
    ],
    to: [
      { slug: 'hrms-and-payroll', passes: 'Overtime cleared for payroll, and hours held back' },
      { slug: 'roster-ledger', passes: 'Rest days and moved weekly offs to roster' },
      { slug: 'audit-management', passes: 'Registers and returns for inspections' },
      { slug: 'data-analytics', passes: 'Hours and fatigue trends by plant' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Three-shift plants where breakdown recovery and cover can push a worker past the limits.' },
    { slug: 'pharma', note: 'Production and QA shifts kept inside hour limits, with the registers an inspector asks for.' },
    { slug: 'distribution', note: 'Warehouse and dispatch crews whose peak-season overtime stays inside the caps.' },
    { slug: 'service-providers', note: 'Round-the-clock support shifts, with night runs and rest gaps watched.' },
  ],
  roles: [
    { name: 'Plant head', task: 'Approves or rejects each violation and the compensatory rest proposed.', works: 'Violations' },
    { name: 'HR and payroll', task: 'Keeps the duty log and releases only cleared overtime to payroll.', works: 'Duty and rest log' },
    { name: 'Supervisors', task: 'See a worker’s rolling hours and rest before asking for cover or overtime.', works: 'Work-rest detail' },
    { name: 'Factory manager', task: 'Files inspector returns from the reconciled registers.', works: 'Inspector returns' },
  ],
  related: ['roster-ledger', 'hrms-and-payroll', 'production-management', 'gate-entry'],
  screens: [
    {
      screen: 'rest-hours-log/compliance',
      view: 'Compliance health',
      title: 'Duty hours and rest compliance',
      caption: 'Rest score, open violations and average hours by plant, the rules in force, violations by rule and the rest still to give.',
      alt: 'MAVRO Rest Hours Log dashboard: 369 shift workers on two plants, a 99.1% rest score last week, 6 open violations with 4 waiting for a plant head, an average week of 48.6 hours against a 60-hour limit, the rules in force, violations by rule for four weeks and the compensatory rest due (illustrative data).',
    },
    {
      screen: 'rest-hours-log/work-rest',
      view: 'Work-rest detail',
      title: 'Work-rest detail: rule evaluation',
      caption: 'One worker’s punches on a 24-hour track, the rest before each shift and every rule evaluated, with what happened to each breach.',
      alt: 'MAVRO work-rest detail for a setter over ten days: duty blocks on a 24-hour track, a weekly-off cover with rest gaps of 7 h 53 m and 7 h 52 m against 12 hours, 48 hours in seven days, six days in a row, eight rules evaluated, and the outcome: one violation approved with a rest day and one prevented by moving his weekly off (illustrative data).',
    },
    {
      screen: 'rest-hours-log/violations',
      view: 'Violations',
      title: 'Violation approval queue',
      caption: 'Each breach with its cause, measured value and proposed compensatory rest, decided by the plant head of the worker’s plant.',
      alt: 'MAVRO violation approval queue: 4 violations waiting for a plant head, including a 12-hour spread-over for three operators on breakdown recovery, a double shift and a missed rest break, with the operator-by-operator check, the proposed rest and who approves what (illustrative data).',
    },
    {
      screen: 'rest-hours-log/duty-log',
      view: 'Duty and rest log',
      title: 'Duty and rest log register',
      caption: 'Every worker’s week: shifts, normal and overtime hours, the shortest rest, days and nights in a row, and the status.',
      alt: 'MAVRO duty and rest log register for a closed week: 369 worker-weeks with 357 within every rule, 480 overtime hours, and per worker the shifts, normal and overtime hours, shortest rest, days and nights in a row, rest day and status (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, both plants, Wednesday 8 Oct, 14:02. 369 shift workers (Plant 1 248, Chennai 121). Last week: rest score 99.1%, 13 violations, all decided. Open 6: waiting for a plant head VIO-0152 (12 h spread-over, 3 operators, OT-0311, CNC-03 recovery), VIO-0151, VIO-0149, VIO-0153; rest due VIO-0146 (Rajesh Kamble, rest gaps 7 h 53 m and 7 h 52 m around a weekly-off cover, rest day 15 Oct) and VIO-0147 (rest day 9 Oct). VIO-0150 prevented: Rajesh Kamble’s 7th day, weekly off moved to 9 Oct. September: 14 h of OT above the cap held from payroll.',
  faq: [
    {
      q: 'What does the Rest Hours Log in MAVRO do?',
      a: 'The MAVRO Rest Hours Log keeps shift work inside the legal and company limits on working hours. It reconciles biometric punches with the roster, calculates each worker’s rolling duty and rest, flags or prevents breaches, routes violations to the plant head with compensatory rest, and keeps the registers ready for inspections.',
    },
    {
      q: 'Which working-hour rules does MAVRO check?',
      a: 'MAVRO checks daily and weekly hours, the total with overtime, spread-over, the rest break within a shift, the weekly holiday and days worked in a row, as set for each state and plant. Plants can add fatigue rules of their own, such as a minimum rest gap between shifts, a limit on nights in a row and no double shift without approval.',
    },
    {
      q: 'What happens in MAVRO when a worker breaks a rest rule?',
      a: 'MAVRO raises a violation with the rule, the measured value and the cause, such as cover for an absentee or a breakdown recovery, and routes it to the plant head. Approval schedules compensatory rest on the roster; overtime is paid only after approval. Where a breach can be seen coming, such as a seventh day in a row, MAVRO changes the roster before it happens.',
    },
    {
      q: 'Does MAVRO keep registers for labour inspections?',
      a: 'Yes. MAVRO builds the muster roll, overtime register and leave records from the same duty and rest log that runs the plant, reconciled with punches and the roster, so the inspector returns match what was worked. Every change is logged with who made it and when.',
    },
  ],
  seo: {
    title: 'Working hours and rest compliance software for plants | MAVRO Rest Hours Log',
    description:
      'MAVRO Rest Hours Log: biometric punches reconciled to the roster, rolling duty and rest checked against hour limits and fatigue rules, violations approved with compensatory rest, and registers for inspector returns.',
  },
};
