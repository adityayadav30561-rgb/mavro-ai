import type { ModuleContent } from '../schema';

/*
 * Sales Force Automation. Source: product deck v2, slides 52–53 (tagline, four tiles, what it does, why it matters,
 * four screens), written for every market rather than the deck's prescription example. Figures on the tiles come
 * from the module's screens (prototype/modules/sales-force-automation/), whose scenario is below; like all screen
 * data they are illustrative.
 */
export const content: ModuleContent<'sales-force-automation'> = {
  slug: 'sales-force-automation',
  tagline: 'Beat plan to call report: field effort planned, evidenced and paid on policy.',
  tiles: [
    {
      icon: 'sales',
      title: 'Field productivity',
      body: 'Territory-wise calls, coverage and secondary value.',
      figure: { value: '91%', label: 'A-class outlets covered' },
    },
    {
      icon: 'people',
      title: 'Rep activity',
      body: 'Call compliance and performance per representative.',
      figure: { value: '18 of 26', label: 'reps at 90% of call norm' },
    },
    {
      icon: 'route',
      title: 'Beat planning',
      body: 'Dealer, distributor and buyer mix against coverage norms.',
      figure: { value: '42', label: 'calls planned a rep a week' },
    },
    {
      icon: 'receipt',
      title: 'Expense and orders',
      body: 'Field claims and secondary orders on one approval queue.',
      figure: { value: '19 of 21', label: 'within policy' },
    },
  ],
  what: 'Field-force management for trade and distribution markets: beat plans built from coverage norms and outlet potential, call reporting with location and sample accountability, rep-wise compliance and secondary contribution, and an approval queue covering field expenses and orders taken in the market.',
  why: [
    'High-potential outlets are covered at the agreed frequency, not by habit.',
    'Travel and frequency norms are checked before a beat plan is published.',
    'Call reports carry location and sample evidence, so effort is verifiable.',
    'Reps below the call norm are visible early enough to coach, not just review.',
    'Field expenses and secondary orders clear one policy-checked queue.',
    'Coverage effort reads against secondary sales, not against activity alone.',
  ],
  flow: {
    from: [
      { slug: 'crm', passes: 'Appointments for qualified leads' },
      { slug: 'scheme-and-rebate', passes: 'Schemes each outlet qualifies for' },
      { slug: 'inventory-management', passes: 'Stock to promise against' },
      { slug: 'hrms-and-payroll', passes: 'Reps, grades and leave' },
    ],
    to: [
      { slug: 'order-to-cash', passes: 'Orders taken in the field' },
      { slug: 'distributor-portal', passes: 'Secondary orders to the distributor' },
      { slug: 'travel-and-expense', passes: 'Approved field claims for payment' },
      { slug: 'data-analytics', passes: 'Coverage and secondary sales' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Reps cover dealers and workshop buyers on planned beats and book orders on the phone.' },
    { slug: 'distribution', note: 'Secondary orders reach the distributor with the scheme already applied.' },
    { slug: 'pharma', note: 'Doctor, chemist and stockist calls planned by potential, with samples accounted for.' },
    { slug: 'service-providers', note: 'Field teams logged against client visits, with expenses settled on policy.' },
  ],
  roles: [
    { name: 'Field reps', task: 'Follow the beat, report each call with location and samples, and book orders.', works: 'Call reports' },
    { name: 'Field sales manager', task: 'Publishes beat plans, coaches reps below norm and clears the approval queue.', works: 'Approvals' },
    { name: 'Area and regional heads', task: 'Compare territories on coverage and secondary value.', works: 'Territories' },
    { name: 'Sales operations', task: 'Sets coverage norms, targets and outlet classes.', works: 'Targets' },
    { name: 'Finance', task: 'Pays approved field claims checked against tracked distance.', works: 'Field expenses' },
  ],
  related: ['crm', 'order-to-cash', 'scheme-and-rebate', 'travel-and-expense'],
  screens: [
    {
      screen: 'sales-force-automation/field-force',
      view: 'Field force',
      title: 'Field force dashboard',
      caption: 'Calls, coverage and secondary orders by territory, the reps below the call norm and what waits for approval.',
      alt: 'MAVRO Sales Force Automation field force dashboard: 142 of 168 planned calls made today, 91% of A-class outlets covered, ₹18.6 L of secondary orders, calls against norm by territory, reps below the call norm and the approval queue (illustrative data).',
    },
    {
      screen: 'sales-force-automation/rep-activity',
      view: 'Rep activity',
      title: 'Rep activity register',
      caption: 'Every rep against the call norm, with location evidence, A-class coverage, samples and secondary value.',
      alt: 'MAVRO Sales Force Automation rep activity register: 26 reps against a call norm of 56, 18 at 90% or more, location evidence on 98% of calls, A-class coverage, samples and secondary value per rep, and the visit mix and missed A-class outlets of a rep to coach (illustrative data).',
    },
    {
      screen: 'sales-force-automation/beat-plan',
      view: 'Beat plans',
      title: 'Beat plan and call planner',
      caption: 'A week of beats built from coverage norms, overdue A-class outlets first, checked before it is published.',
      alt: 'MAVRO Sales Force Automation beat plan for one rep: six daily beats of seven calls each, overdue A-class outlets scheduled first, the dealer, distributor and workshop mix on norm, and one day flagged over the daily travel limit before publishing (illustrative data).',
    },
    {
      screen: 'sales-force-automation/approvals',
      view: 'Approvals',
      title: 'Expense and order approval queue',
      caption: 'Field claims, secondary orders and beat changes in one queue, each checked against policy first.',
      alt: 'MAVRO Sales Force Automation approval queue: 21 items, 12 field expense claims worth ₹38,400 and 7 secondary orders worth ₹4.9 L, two flagged, and one claim opened with its distance checked against call reports and a meal over the policy limit (illustrative data).',
    },
  ],
  phone: {
    screen: 'sales-force-automation/call-report',
    view: 'Call reports',
    title: 'Call report',
    caption: 'A rep checks in at the outlet, accounts for a sample and books a secondary order with the scheme applied.',
    alt: 'MAVRO phone app: a call report at a dealer, checked in 18 metres from the outlet, a product sample accounted for and a secondary order of ₹38,808 with the festive volume scheme applied (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, 8 Oct, 14:02: 26 reps in eight territories, 142 of 168 planned calls made today, ₹18.6 L of secondary orders. Month to date 1,285 calls against a norm of 1,456; 18 reps at 90% or more, three below 80% (two in Ahmedabad). Ravi Patel’s plan for the week of 13 Oct: 42 calls, 11 A-class visits, one day over the travel limit. 21 items wait for approval, two flagged.',
  faq: [
    {
      q: 'What does the Sales Force Automation module in MAVRO do?',
      a: 'MAVRO Sales Force Automation runs the field sales team: it builds beat plans from coverage norms, lets reps report calls and book orders from the phone with location and sample evidence, measures each rep against the call norm and secondary sales, and routes field expenses and secondary orders through one policy-checked approval queue.',
    },
    {
      q: 'How does MAVRO verify field sales visits?',
      a: 'Each call report is checked in at the outlet with the phone’s location and compared with the outlet’s pin, so effort is verifiable. Samples handed over are accounted against the rep’s issued stock, and the distance on a travel claim is compared with the distance tracked between geo-tagged calls.',
    },
    {
      q: 'Can field reps take orders on the phone with MAVRO?',
      a: 'Yes. Reps book secondary orders during the call in the MAVRO mobile app, with prices and the schemes the outlet qualifies for applied. Orders go to the distributor and into MAVRO Order to Cash; orders with discounts beyond the rep’s limit wait for the manager’s approval.',
    },
    {
      q: 'How are beat plans built in MAVRO?',
      a: 'MAVRO builds each rep’s weekly beat from coverage norms: how often each class of outlet must be visited, the daily call norm and the mix of dealers, distributors and other buyers. Overdue high-potential outlets are scheduled first, and the plan is checked against travel limits before it is published to the field app.',
    },
  ],
  seo: {
    title: 'Sales force automation software for field sales teams | MAVRO',
    description:
      'MAVRO Sales Force Automation: beat plans from coverage norms, geo-verified call reports, mobile ordering with schemes applied, rep compliance and one approval queue for field expenses and orders.',
  },
};
