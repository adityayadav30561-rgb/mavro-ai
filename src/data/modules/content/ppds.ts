import type { ModuleContent } from '../schema';

/*
 * PPDS (Production Planning and Detailed Scheduling). Source: product deck v2, slides 110–111 (tagline, four tiles,
 * what it does, why it matters, four screens). The deck writes it for multi-line pharma plants (same-molecule
 * grouping, cleaning-matrix changeovers); the page states the same capabilities for every industry and keeps pharma's
 * terms in the pharma note. Figures on the tiles come from the module's screens (prototype/modules/ppds/), whose
 * scenario agrees with Production Management and Shop Floor Control; like all screen data they are illustrative.
 */
export const content: ModuleContent<'ppds'> = {
  slug: 'ppds',
  tagline: 'MPS to line-level Gantt to MRP: planning that survives contact with the shop floor.',
  tiles: [
    {
      icon: 'calendar',
      title: 'Line Gantt',
      body: 'Shift-level schedule with a changeover matrix.',
      figure: { value: '50 min', label: 'of changeover saved by one resequence' },
    },
    {
      icon: 'production',
      title: 'Live execution',
      body: 'Order progress and downtime straight from the lines.',
      figure: { value: '91%', label: 'schedule adherence this week' },
    },
    {
      icon: 'bom',
      title: 'MRP engine',
      body: '8-week explosion with auto-drafted purchase proposals.',
      figure: { value: '6', label: 'shortages, each with an action attached' },
    },
    {
      icon: 'inventory',
      title: 'Demand coverage',
      body: 'Weeks of stock against safety, item by item.',
      figure: { value: '0.3', label: 'weeks of an item flagged against 2.0 safety' },
    },
  ],
  what: 'Detailed production planning for multi-line plants: a master production schedule with a frozen horizon, a line Gantt you can resequence with changeovers taken from the matrix, live order progress from the shop floor, and an MRP run that turns shortages into purchase proposals and auctions.',
  why: [
    'Sequence optimisation recovers hours every week: grouping like products cuts changeovers.',
    'Material shortages surface with resolutions attached, not as surprises.',
    'The impact of downtime on dispatch commitments is visible immediately.',
    'Export-order changes re-plan the frozen horizon in a controlled way.',
    'OEE and schedule adherence are tracked per line, per week.',
    'MRP proposals flow directly into auctions and purchase orders.',
  ],
  flow: {
    from: [
      { slug: 'order-to-cash', passes: 'Confirmed orders and forecasts' },
      { slug: 'inventory-management', passes: 'Stock, reservations and safety levels' },
      { slug: 'shop-floor-control', passes: 'Progress and downtime from the lines' },
      { slug: 'asset-management', passes: 'Planned maintenance windows' },
    ],
    to: [
      { slug: 'production-management', passes: 'Work orders to release' },
      { slug: 'shop-floor-control', passes: 'The detailed schedule by work centre' },
      { slug: 'procure-to-pay', passes: 'Purchase requisitions from MRP' },
      { slug: 'auction-and-bidding', passes: 'Large MRP needs as auctions' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Machining and assembly orders sequenced by part family to cut fixture changes, with castings and bar planned 8 weeks out.' },
    { slug: 'pharma', note: 'Multi-line plants sequenced by molecule with cleaning-matrix changeovers and a frozen horizon for export orders.' },
  ],
  roles: [
    { name: 'Production planners', task: 'Build the line schedule, resequence for changeovers and firm planned orders.', works: 'Line schedule' },
    { name: 'Plant head', task: 'Approves changes inside the frozen horizon and reads adherence and OEE by week.', works: 'Planning dashboard' },
    { name: 'Materials planners', task: 'Work the MRP shortages and send proposals to purchasing.', works: 'MRP run' },
    { name: 'Sales and dispatch', task: 'See which dispatch commitments a breakdown or a hold puts at risk.', works: 'Planning dashboard' },
    { name: 'Purchasing', task: 'Turn MRP proposals into requisitions, purchase orders or auctions.', works: 'MRP run' },
  ],
  related: ['production-management', 'shop-floor-control', 'procure-to-pay', 'inventory-management'],
  screens: [
    {
      screen: 'ppds/planning-dashboard',
      view: 'Planning dashboard',
      title: 'Planning dashboard',
      caption: 'Weeks of stock against safety item by item, the week’s adherence and OEE, and every plan exception with what is being done.',
      alt: 'MAVRO PPDS planning dashboard for week 41: 91% schedule adherence, 79.1% OEE, one dispatch commitment at risk, demand coverage in weeks of stock against safety stock for six items, adherence and OEE by week, and plan exceptions including a breakdown recovered by overtime and an export order asking into the frozen week (illustrative data).',
    },
    {
      screen: 'ppds/line-schedule',
      view: 'Line schedule',
      title: 'Line schedule (Gantt)',
      caption: 'Three days by shift and work centre with changeovers from the matrix, and a resequence that saves 50 minutes.',
      alt: 'MAVRO line schedule for three days by shift: firm and planned orders on seven work centres, changeovers drawn from the changeover matrix, a machine waiting for castings, and a proposal to run two valve-body orders back to back that cuts changeover from 180 to 130 minutes (illustrative data).',
    },
    {
      screen: 'ppds/production-orders',
      view: 'Production orders',
      title: 'Production orders',
      caption: 'Every order in the 8-week plan with what it is for, its week, material, progress and status, including a frozen-week change.',
      alt: 'MAVRO production orders: orders in the 8-week plan with item, quantity, the sales order, transfer or stock they serve, MPS week, dates, material status and progress, including orders waiting for castings, one held for quality and an export order asking into a frozen week (illustrative data).',
    },
    {
      screen: 'ppds/mrp-run',
      view: 'MRP run',
      title: 'MRP run and shortages',
      caption: 'The night’s MRP run: shortages by week, each with a requisition, an auction or the order already covering it.',
      alt: 'MAVRO MRP run: 1,284 items planned over 8 weeks, 6 shortages with 2 already covered, 4 purchase proposals worth ₹10.94 L including a reverse auction for castings, the projected castings balance with and without it, and the orders the need is pegged to (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, Plant 1, 8 Oct, 14:02, week 41; MPS frozen to 19 Oct. Adherence 91%, OEE 79.1%. IH-220 at 0.3 weeks of stock against 2.0 (all Plant 1 stock reserved for SO-24817; WO-5532 refills the depot). SO-24809 recovered by OT-0311; SO-24798 at risk on lot L-0927. Export order EXP-0388 (400 GB-310) asks into frozen week 42. CNC-03 resequence saves 50 minutes. MRP at 02:00: 6 shortages, 4 proposals worth ₹10.94 L, including a reverse auction for 1,800 kg of castings.',
  faq: [
    {
      q: 'What does PPDS in MAVRO do?',
      a: 'MAVRO PPDS (production planning and detailed scheduling) turns the master production schedule into a shift-level schedule for each line or work centre, sequences orders to cut changeovers, tracks progress from the shop floor and runs MRP over eight weeks to turn material shortages into purchase proposals.',
    },
    {
      q: 'How does MAVRO reduce changeover time?',
      a: 'MAVRO holds a changeover matrix of the time from each product family to each other. The line schedule draws changeovers from it, and the optimiser proposes sequences that group like products, showing the minutes saved and any due date affected before the planner applies them.',
    },
    {
      q: 'Can MAVRO protect a frozen production schedule?',
      a: 'Yes. Weeks inside the frozen horizon are locked: a customer or export order that asks to move into them is raised as a change for the plant head to approve, with the orders it would push out shown, so the schedule changes only in a controlled way.',
    },
    {
      q: 'What happens to MRP shortages in MAVRO?',
      a: 'Every shortage from the MRP run carries a proposed action: a purchase requisition, a purchase order under a rate contract or, above a value threshold, a reverse auction. Needs already covered by open requisitions or orders are shown as covered, so purchasing only works what is new.',
    },
  ],
  seo: {
    title: 'Production planning and scheduling (PPDS) with MRP | MAVRO',
    description:
      'MAVRO PPDS: a master production schedule with a frozen horizon, a line Gantt with changeover matrix and sequence optimisation, live execution, weeks-of-stock coverage and an 8-week MRP run that drafts purchase proposals.',
  },
};
