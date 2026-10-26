import type { ModuleContent } from '../schema';

/*
 * Shop Floor Control. Source: product deck v2, slides 98–99 (tagline, four tiles, what it does, why it matters, four
 * screens). The live board is the homepage shop-floor screen on the module shell (IMPLEMENTATION-PLAN.md, "Existing
 * screens to reuse"). Figures on the tiles come from the module's screens (prototype/modules/shop-floor-control/),
 * whose scenario agrees with Production Management, Roster Ledger and Asset Management; like all screen data they
 * are illustrative.
 */
export const content: ModuleContent<'shop-floor-control'> = {
  slug: 'shop-floor-control',
  tagline: 'Job card to shift close: work centre load, downtime and rework under live control.',
  tiles: [
    {
      icon: 'eye',
      title: 'Live board',
      body: 'Work centre status, output per hour and downtime.',
      figure: { value: '78.4%', label: 'OEE this shift, one machine down' },
    },
    {
      icon: 'receipt',
      title: 'Job cards',
      body: 'Operation, operator, quantity and standard hours.',
      figure: { value: '93%', label: 'labour efficiency on 18 job cards' },
    },
    {
      icon: 'calendar',
      title: 'Finite scheduling',
      body: 'Capacity against load with manpower and material.',
      figure: { value: '123%', label: 'load caught and rebalanced before commit' },
    },
    {
      icon: 'wrench',
      title: 'Downtime and rework',
      body: 'Reason-coded approval before shift close.',
      figure: { value: '4 h 24 m', label: 'of downtime coded by cause this shift' },
    },
  ],
  what: 'Execution control between the work order and the batch record: a live work-centre board with output and downtime, job cards tracked against standard hours, finite scheduling of the next shifts against real capacity, manpower and material, and reason-coded downtime and rework approved before the shift is closed.',
  why: [
    'Repeat stoppages on a work centre are visible within the shift, not the month.',
    'Overloaded work centres are rebalanced before the schedule is committed.',
    'Jobs blocked on material or manpower are named, with the blocker owned.',
    'Operators without valid training cannot be scheduled or sign off a job card.',
    'Downtime reasons are coded, so losses can be attacked by cause.',
    'Rework lots wait for QA disposition instead of merging back silently.',
  ],
  flow: {
    from: [
      { slug: 'production-management', passes: 'Released work orders and routings' },
      { slug: 'ppds', passes: 'The detailed schedule by work centre' },
      { slug: 'roster-ledger', passes: 'Who is on each shift' },
      { slug: 'learning-management', passes: 'Operator certifications' },
    ],
    to: [
      { slug: 'production-management', passes: 'Output, scrap and job card hours' },
      { slug: 'asset-management', passes: 'Breakdowns raised as maintenance orders' },
      { slug: 'hrms-and-payroll', passes: 'Hours worked and overtime' },
      { slug: 'data-analytics', passes: 'OEE and downtime by cause' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Machining, assembly and test cells run shift by shift, with downtime coded and rework held for QA.' },
    { slug: 'pharma', note: 'Line execution between the order and the batch record, with operators checked against their training.' },
  ],
  roles: [
    { name: 'Shift supervisors', task: 'Watch the live board and approve downtime and rework before the shift closes.', works: 'Downtime and rework' },
    { name: 'Production planners', task: 'Schedule the next shifts against capacity, manpower and material.', works: 'Scheduling board' },
    { name: 'Operators', task: 'Book quantities and hours on their job cards at the work centre.', works: 'Job cards' },
    { name: 'Quality', task: 'Disposition rework lots and release first-offs after repairs.', works: 'Downtime and rework' },
    { name: 'Plant head', task: 'Reads OEE, output against plan and repeat stoppages across the shift.', works: 'Live shop floor' },
  ],
  related: ['production-management', 'ppds', 'asset-management', 'roster-ledger'],
  screens: [
    {
      screen: 'shop-floor-control/live-board',
      view: 'Live shop floor',
      title: 'Live shop floor status',
      caption: 'Every work centre on today’s timeline with the machine that is down, output against plan and the order on the floor.',
      alt: 'MAVRO Shop Floor Control live board for shift B: 1,148 pieces against plan, 78.4% OEE, 96.4% first-pass yield, a machine schedule for nine work centres with one down on a spindle alarm, and the running work order’s operations and materials (illustrative data).',
    },
    {
      screen: 'shop-floor-control/scheduling-board',
      view: 'Scheduling board',
      title: 'Scheduling board: capacity against load',
      caption: 'The next four shifts by work centre against real capacity, with the overload rebalanced and blocked jobs owned.',
      alt: 'MAVRO scheduling board: load against capacity for seven work centres over the next four shifts, a turning centre at 123% tonight with overtime and a job moved to rebalance it, and jobs blocked on castings, an operator certification and a quality hold, each with an owner (illustrative data).',
    },
    {
      screen: 'shop-floor-control/downtime-rework',
      view: 'Downtime and rework',
      title: 'Downtime and rework approval queue',
      caption: 'Every stoppage of the shift reason-coded for approval, rework lots held for QA and the shift close checklist.',
      alt: 'MAVRO downtime and rework approval: 4 h 24 m of downtime this shift as reason-coded events awaiting approval, a repeat breakdown flagged, minor stops without a reason, rework lots waiting for QA, downtime by cause and the shift close checklist (illustrative data).',
    },
    {
      screen: 'shop-floor-control/job-card-register',
      view: 'Job cards',
      title: 'Job card register',
      caption: 'Each operation booked with its operator and certification, quantities and standard hours against actual.',
      alt: 'MAVRO job card register for the shift: job cards with work order and operation, work centre, operator with certification status, good and rejected quantity, standard and actual hours and efficiency, including one card reassigned because an operator’s certification lapsed (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, Plant 1, 8 Oct, 14:02, shift B. Output 1,148 of 1,171 planned, OEE 78.4%. CNC-03 down 2 h 10 m on a spindle alarm (MO-0418), its third breakdown in October; WO-5518 recovers on overtime OT-0311 and CNC-03 is at 123% tonight, so WO-5533 moves to 9 Oct. Downtime 4 h 24 m, 3 minor stops still uncoded. Rework: 2 IH-220 of lot L-0932 and 2,400 BR-045 of L-0927 wait for QA. 18 job cards, 93% efficiency; Yogesh Dhumal’s lapsed 5-axis certification blocks him from tonight’s setting.',
  faq: [
    {
      q: 'What does Shop Floor Control in MAVRO do?',
      a: 'MAVRO Shop Floor Control runs execution on the floor: a live board of every work centre with output and downtime, job cards booked against standard hours, finite scheduling of the next shifts against capacity, manpower and material, and reason-coded downtime and rework approved before the shift closes.',
    },
    {
      q: 'Does MAVRO track OEE and downtime by cause?',
      a: 'Yes. MAVRO calculates OEE per work centre from availability, performance and quality, and every stoppage carries a reason code such as breakdown, changeover, minor stop or waiting for material. Repeat stoppages are flagged within the shift, and breakdowns are raised as maintenance orders.',
    },
    {
      q: 'Can MAVRO stop untrained operators from working on a machine?',
      a: 'Yes. MAVRO checks each operator’s certification for the work centre before a job card is issued or signed off. An operator whose certification has lapsed cannot be scheduled on that work centre until they are re-certified, and the job goes to a qualified operator.',
    },
    {
      q: 'How does MAVRO handle rework on the shop floor?',
      a: 'Pieces that fail inspection are held as a rework lot with the defect and a proposed fix. The lot waits for QA disposition, rework, release or scrap, and cannot merge back into good stock until QA decides; first-offs after a repair are released the same way.',
    },
  ],
  seo: {
    title: 'Shop floor control software: live OEE, job cards, scheduling | MAVRO',
    description:
      'MAVRO Shop Floor Control: a live work-centre board with OEE and downtime, job cards against standard hours, finite scheduling with manpower and material, and reason-coded downtime and rework approval before shift close.',
  },
};
