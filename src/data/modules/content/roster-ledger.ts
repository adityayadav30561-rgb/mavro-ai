import type { ModuleContent } from '../schema';

/*
 * Roster Ledger. Source: product deck v2, slides 62–63 (tagline, four tiles, what it does, why it matters, four
 * screens), with shift and roster management from the HRMS deck (rotational shifts, week-offs and OT rules by plant
 * and department). Written for every industry. Figures on the tiles come from the module's screens
 * (prototype/modules/roster-ledger/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'roster-ledger'> = {
  slug: 'roster-ledger',
  tagline: 'Demand plan to published roster: coverage, skills and rest rules held together.',
  tiles: [
    {
      icon: 'eye',
      title: 'Coverage health',
      body: 'Department-wise coverage and open slots.',
      figure: { value: '98.0%', label: 'of shift slots filled this week' },
    },
    {
      icon: 'layers',
      title: 'Roster register',
      body: 'Week-wise rosters from draft to locked.',
      figure: { value: '4 of 6', label: 'next week’s rosters signed off' },
    },
    {
      icon: 'rules',
      title: 'Roster builder',
      body: 'Auto-roster validated on skill mix and rest rules.',
      figure: { value: '0', label: 'rest-rule breaks in the draft' },
    },
    {
      icon: 'calendar',
      title: 'Swaps and overtime',
      body: 'Requests checked against fatigue and overtime caps.',
      figure: { value: '386 h', label: 'of a 1,500 h October OT budget' },
    },
  ],
  what: 'Shift planning for multi-site, multi-shift operations: coverage health by department, an auto-roster built from the production plan and checked against skill mix and rest rules, supervisor review before it is published, and a swap and overtime queue that enforces fatigue limits and overtime budgets.',
  why: [
    'Night-shift shortfalls surface before the shift starts, not after.',
    'Qualified-operator requirements are enforced, protecting line qualification.',
    'Weekly off, rest gap and overtime limits are checked before a roster publishes.',
    'Swap requests that break rest rules are rejected with the reason shown.',
    'Overtime is approved against a budget rather than settled in payroll.',
    'Published rosters reach workers on the app, cutting notice-board disputes.',
  ],
  flow: {
    from: [
      { slug: 'production-management', passes: 'The production plan by line and shift' },
      { slug: 'hrms-and-payroll', passes: 'Employees, leave and joining dates' },
      { slug: 'learning-management', passes: 'Skills and qualifications per operator' },
      { slug: 'asset-management', passes: 'Machine shutdowns and maintenance windows' },
    ],
    to: [
      { slug: 'rest-hours-log', passes: 'The published roster that punches are checked against' },
      { slug: 'hrms-and-payroll', passes: 'Worked shifts and approved overtime' },
      { slug: 'production-management', passes: 'The crew available per line and shift' },
      { slug: 'contract-labour-purchase', passes: 'Shortfalls to fill with contract workers' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Three-shift plants rostered from the production plan, with a qualified operator on every line.' },
    { slug: 'pharma', note: 'Qualified operators on every line and shift, so line qualification holds through leave and swaps.' },
    { slug: 'distribution', note: 'Warehouse and dispatch shifts sized to the order plan, with weekly offs and overtime in budget.' },
    { slug: 'service-providers', note: 'Support and operations desks in shifts around the clock, with swaps checked against rest rules.' },
  ],
  roles: [
    { name: 'Roster planner', task: 'Runs the auto-roster from the plan, fixes gaps and publishes each week.', works: 'Roster builder' },
    { name: 'Supervisors', task: 'Review their department’s roster and approve swaps and overtime.', works: 'Swaps and overtime' },
    { name: 'Plant head', task: 'Watches coverage, night shifts and the overtime budget across departments.', works: 'Shift coverage' },
    { name: 'Workers', task: 'See their published roster on the app and request swaps there.' },
    { name: 'HR and payroll', task: 'Takes locked weeks’ worked shifts and overtime into payroll.', works: 'Roster register' },
  ],
  related: ['hrms-and-payroll', 'rest-hours-log', 'production-management', 'asset-management'],
  screens: [
    {
      screen: 'roster-ledger/coverage',
      view: 'Shift coverage',
      title: 'Shift coverage and roster ledger',
      caption: 'Coverage by department, open slots and skill gaps, tonight’s shortfall with how it is being filled, and the roster weeks from draft to locked.',
      alt: 'MAVRO Roster Ledger coverage: 98.0% of 1,512 shift slots filled this week at Plant 1, 11 open slots in the next 72 hours, two qualified-operator gaps, 386 of 1,500 overtime hours used, coverage by department, tonight’s night shift 5 short with the cover found, and the next 7 days against demand (illustrative data).',
    },
    {
      screen: 'roster-ledger/builder',
      view: 'Roster builder',
      title: 'Roster builder: coverage and rest rules',
      caption: 'Next week’s auto-roster for one cell, operator by day, with every rule checked and a suggested fix for the one gap.',
      alt: 'MAVRO roster builder for a CNC cell, week of 13 Oct: 13 operators across three shifts and seven days, 77 of 78 slots filled, rule checks for weekly offs, rest gaps, days in a row, setters and qualified operators, the demand from the production plan and a suggested fix for one short shift (illustrative data).',
    },
    {
      screen: 'roster-ledger/swaps-overtime',
      view: 'Swaps and overtime',
      title: 'Swap and overtime approval queue',
      caption: 'Swaps and overtime checked against rest, hour limits and the budget; rejected requests show the worker why.',
      alt: 'MAVRO swap and overtime queue: 9 requests waiting, an overtime request checked per operator with a spread-over above the limit sent to the plant head, swaps within the rules, three swaps rejected for rest gaps and a seventh day, and the October overtime budget by department (illustrative data).',
    },
    {
      screen: 'roster-ledger/roster-register',
      view: 'Roster register',
      title: 'Shift roster register',
      caption: 'Every roster by plant, department and week, with coverage, overtime, sign-off and how many workers have seen it.',
      alt: 'MAVRO shift roster register: rosters for two plants from draft to locked, next week 4 of 6 signed off, 97.4% coverage this week, 353 of 369 shift workers have seen their roster on the app, and September’s hours sent to payroll (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, Plant 1, Wednesday 8 Oct, 14:02. Shifts A 00:00, B 08:00, C 16:00, rotating forward weekly. Week of 6 Oct: 1,482 of 1,512 slots (98.0%); 11 open in 72 hours, 7 on nights; tonight shift A 5 short in Machining, 3 filled from the cover pool, 2 offered on the app; gaps: CNC-03 setter, PT-01 tester. October OT 386 of 1,500 h. Week of 13 Oct: CNC cell auto-roster 77 of 78 (Monday shift C short if LV-3321 is approved), 4 of 6 departments signed off. OT-0311 (3 operators to 20:00 for the CNC-03 recovery) raised VIO-0152 for spread-over.',
  faq: [
    {
      q: 'What does Roster Ledger in MAVRO do?',
      a: 'MAVRO Roster Ledger plans shifts for plants and other shift operations. It shows coverage by department and the open slots ahead, builds the weekly roster from the production plan, checks it against skills and rest rules, sends it to supervisors for sign-off, publishes it to workers on the app and runs a queue for swaps and overtime.',
    },
    {
      q: 'How does MAVRO build a shift roster?',
      a: 'MAVRO turns the production plan into the people needed per line and shift, then auto-rosters the available operators around leave, weekly offs and shift rotation. Before publishing it checks that every shift has its qualified operators and setters and that no one breaks the rest gap, days-in-a-row or overtime limits, and suggests a fix for each gap.',
    },
    {
      q: 'How are shift swaps and overtime approved in MAVRO?',
      a: 'Workers request swaps and supervisors request overtime in MAVRO. Each request is checked against the rest gap between shifts, days in a row, weekly and quarterly hour limits and the overtime budget. Requests that break a rule are rejected with the reason shown; the rest go to the supervisor, and any breach of the hour rules goes to the plant head through the Rest Hours Log.',
    },
    {
      q: 'How do workers see their roster in MAVRO?',
      a: 'Once a roster is published, each worker sees their shifts and weekly offs in the MAVRO mobile app, gets a notification when it changes and can request a swap there. The roster register shows how many workers have opened it, and locked weeks pass worked shifts and overtime to payroll.',
    },
  ],
  seo: {
    title: 'Shift roster software: coverage, swaps and overtime | MAVRO Roster Ledger',
    description:
      'MAVRO Roster Ledger: shift coverage by department, an auto-roster from the production plan checked against skills and rest rules, supervisor sign-off, swaps and overtime against budget, and rosters on the app.',
  },
};
