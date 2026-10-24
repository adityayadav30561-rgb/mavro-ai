import type { ModuleContent } from '../schema';

/*
 * Production Management. Source: product deck v2, slides 36–37 (tagline, four tiles, what it does, why it matters,
 * four screens), written for every industry rather than the deck's multi-plant pharma; batch manufacturing records
 * and QC release with CoA, assay and dissolution are kept for pharma. The work order screen is the homepage
 * `work-order` screen moved onto the module shell. Figures on the tiles come from the module's screens
 * (prototype/modules/production-management/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'production-management'> = {
  slug: 'production-management',
  tagline: 'Work order to QC release: batch-accurate execution across every plant and line.',
  tiles: [
    {
      icon: 'production',
      title: 'Plant output and OEE',
      body: 'Line-wise output, OEE and downtime by plant.',
      figure: { value: '78.4%', label: 'plant OEE this shift' },
    },
    {
      icon: 'layers',
      title: 'Work order register',
      body: 'Scheduled orders with live line and QC state.',
      figure: { value: '23', label: 'work orders released' },
    },
    {
      icon: 'bom',
      title: 'Work order records',
      body: 'Operation sign-offs and yields against the routing.',
      figure: { value: '0.7%', label: 'scrap and rework on WO-5521' },
    },
    {
      icon: 'quality',
      title: 'QC release',
      body: 'Lot queue with out-of-spec and hold-time control.',
      figure: { value: '7', label: 'lots waiting for a decision' },
    },
  ],
  what: 'Shop-floor execution and quality release across plants and lines: output and OEE by work centre and plant, a scheduled work order register with each order’s line and quality state, work order and batch records with operations signed off in sequence, yields and material issued against the BOM, and a QC release queue that decides what reaches the finished-goods store.',
  why: [
    'Line OEE below target surfaces with its cause: breakdown, changeover, stops or speed.',
    'Operations cannot be signed off out of sequence or without their quality check.',
    'Hold-time limits are tracked live, with escalation raised before a breach.',
    'Deviations and out-of-specification results stay with the lot until closed.',
    'Planned and actual output show per line, per shift and over the rolling year.',
    'No lot reaches the finished-goods store without its certificate and every check cleared.',
  ],
  flow: {
    from: [
      { slug: 'order-to-cash', passes: 'Sales orders to make against' },
      { slug: 'ppds', passes: 'The schedule by line and shift' },
      { slug: 'inventory-management', passes: 'Material issued against the BOM' },
      { slug: 'asset-management', passes: 'Machine availability and maintenance windows' },
    ],
    to: [
      { slug: 'inventory-management', passes: 'Released finished goods into stores' },
      { slug: 'order-to-cash', passes: 'Make dates and quantities ready to ship' },
      { slug: 'accounting', passes: 'Work in progress and production cost' },
      { slug: 'customer-service', passes: 'The lot record behind every complaint' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Work orders for customer orders and stock, routed through machines and inspection to dispatch.' },
    { slug: 'pharma', note: 'Batch records with stage sign-offs and yields, and QC release with CoA, assay and dissolution.' },
    { slug: 'distribution', note: 'Kitting, repacking and light assembly at the depot, run as work orders with a QC check.' },
    { slug: 'service-providers', note: 'Systems assembled or configured for a client project, run as work orders against it.' },
  ],
  roles: [
    { name: 'Plant head', task: 'Watches OEE, downtime and the work orders at risk across lines.', works: 'Plant output' },
    { name: 'Production planner', task: 'Releases work orders and reschedules around breakdowns and shortages.', works: 'Work order register' },
    { name: 'Shift supervisors', task: 'Record output and scrap, and sign off each operation in sequence.', works: 'Work orders' },
    { name: 'Quality inspectors', task: 'Sample lots, record results and hold what fails.', works: 'QC release' },
    { name: 'QA head', task: 'Decides on out-of-specification lots and signs releases.', works: 'QC release' },
  ],
  related: ['inventory-management', 'procure-to-pay', 'mvlens-vendor-audit', 'asset-management'],
  screens: [
    {
      screen: 'production-management/plant-output',
      view: 'Plant output',
      title: 'Plant output and OEE',
      caption: 'Every work centre’s OEE split into availability, performance and quality, the main loss on each, downtime by cause and output against plan.',
      alt: 'MAVRO Production Management plant dashboard: plant OEE of 78.4% this shift against an 80% target, 1,148 of 1,171 planned pieces made, 4 h 24 m of downtime led by a 2 h 10 m breakdown on a turning centre, seven work centres with availability, performance and quality, and planned against actual output over the rolling year (illustrative data).',
    },
    {
      screen: 'production-management/work-order',
      view: 'Work orders',
      title: 'Work order execution',
      caption: 'One work order through its routing: each operation’s progress on its work centre, material issued against the BOM, output by shift and cost against standard.',
      alt: 'MAVRO work order WO-5521 for 890 impeller housings: 570 machined and on plan, 0.7% scrap and rework, six routing operations with progress and status, the bill of materials with one casting short on order, output by shift and actual cost per piece of ₹1,180 against a ₹1,176 standard (illustrative data).',
    },
    {
      screen: 'production-management/qc-release',
      view: 'QC release',
      title: 'QC release queue',
      caption: 'Incoming, in-process and final lots waiting for a decision, how long each has been held against its limit, and the out-of-specification investigation that blocks a release.',
      alt: 'MAVRO QC release queue: seven lots waiting, two ready to release with 348 pieces, one out of specification with 2,400 brackets blocked, hold time against each lot’s limit, the investigation steps for the blocked lot and the release checks for a final inspection lot (illustrative data).',
    },
    {
      screen: 'production-management/work-order-register',
      view: 'Work order register',
      title: 'Work order register',
      caption: 'Every scheduled work order with its item, sales order, work centre, progress, due date and quality state, and the two at risk.',
      alt: 'MAVRO work order register: 23 released work orders at one plant, 11 shown by due date with item, customer order, work centre, progress, due date and quality state, two at risk from a quality hold and a machine breakdown (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, Plant 1, 8 Oct, 14:02, shift B. Plant OEE 78.4% (target 80%) across seven work centres; CNC-03 down 2 h 10 m on a spindle alarm (MO-0418), WO-5518 resumed after first-off L-0935. Output 1,148 of 1,171 pieces. 23 work orders released, 2 at risk: WO-5518 (SO-24809) and WO-5514 (lot L-0927, OOS-0112, SO-24798). WO-5521 (890 IH-220 for SO-24817) 570 machined; lot L-0932 48 passed, 2 held. Seven lots in the QC release queue.',
  faq: [
    {
      q: 'What does Production Management in MAVRO do?',
      a: 'MAVRO Production Management runs the shop floor from work order to quality release. It shows output and OEE by work centre and plant, keeps a register of scheduled work orders with their line and quality state, records each operation, yield and material issue against the routing and BOM, and holds every lot in a QC release queue until it passes.',
    },
    {
      q: 'How does MAVRO calculate OEE?',
      a: 'MAVRO calculates OEE for each work centre as availability × performance × quality: planned time less recorded downtime, output against the standard rate, and pieces passed first time. Downtime is logged with its cause, such as breakdown, changeover or waiting for material, so a line below target shows why.',
    },
    {
      q: 'Does MAVRO support batch manufacturing records for pharma?',
      a: 'Yes. For pharma, MAVRO keeps electronic batch manufacturing records: stages signed off in sequence with QA verification, yields against the master record, hold-time limits tracked live, and deviations and out-of-specification investigations attached to the batch. No batch reaches the finished-goods store without its CoA, assay and dissolution clearance.',
    },
    {
      q: 'How does QC release work in MAVRO?',
      a: 'Every incoming, in-process and final lot in MAVRO waits in a QC release queue with its sample, results and the time it has been held against its limit. A lot is released into stores only when every check has passed and its certificate is signed; an out-of-specification result opens an investigation and blocks the lot until the QA head decides.',
    },
    {
      q: 'Does MAVRO track material and cost on each work order?',
      a: 'Yes. MAVRO issues material against the work order’s bill of materials, by lot where it is batch-controlled, and backflushes consumables. Machine, labour and overhead costs build up per piece, so the planner sees actual cost against standard and the margin on the sales order while the work order is still running.',
    },
  ],
  seo: {
    title: 'Production management software: work orders, OEE, QC release | MAVRO',
    description:
      'MAVRO Production Management: OEE and output by line and plant, a work order register with live line and QC state, operation sign-offs and yields, batch records for pharma, and a QC release queue.',
  },
};
