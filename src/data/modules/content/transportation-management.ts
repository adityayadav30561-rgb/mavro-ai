import type { ModuleContent } from '../schema';

/*
 * Transportation Management. Source: product deck v2, slides 76–77 (tagline, four tiles, what it does, why it
 * matters, four screens), with the detailed TMS deck for scope (planning, execution, delivery and freight, Indian
 * transport compliance) and the driver app. The deck's cold-chain monitoring is kept for pharma. Figures on the
 * tiles come from the module's screens (prototype/modules/transportation-management/), whose scenario is below; like
 * all screen data they are illustrative.
 */
export const content: ModuleContent<'transportation-management'> = {
  slug: 'transportation-management',
  tagline: 'A control tower for every shipment: primary, secondary and cold chain.',
  tiles: [
    {
      icon: 'transport',
      title: 'Control tower',
      body: 'Live shipments with ETAs and risk flags.',
      figure: { value: '31', label: 'shipments in motion, 3 at risk' },
    },
    {
      icon: 'layers',
      title: 'Load builder',
      body: 'Multi-drop loads built for maximum truck fill.',
      figure: { value: '89%', label: 'truck fill on a three-drop load' },
    },
    {
      icon: 'route',
      title: 'Lane analytics',
      body: 'OTIF, transit time and cost per kg on every lane.',
      figure: { value: '93.6%', label: 'on time, in full over 30 days' },
    },
    {
      icon: 'receipt',
      title: 'E-way compliance',
      body: 'Validity tracking and auto-extension filings.',
      figure: { value: '31', label: 'live e-way bills, 1 extension queued' },
    },
  ],
  what: 'Logistics command and control: live shipment tracking with risk flags, a load builder that consolidates orders into multi-drop loads, lane-level performance analytics, and complete e-way bill and insurance compliance on every movement. Planning, allocation against rate contracts, the LR, gate-out, tracking, proof of delivery and freight bill checks run on one trip record.',
  why: [
    'Delays are known hours before customers feel them.',
    'Higher truck fill through consolidation brings direct freight savings.',
    'Detention and SLA breaches are logged against transporters automatically.',
    'Cold-chain shipments are monitored to 2–8 °C compliance.',
    'Freight against budget is tracked monthly, lane by lane.',
    'Consignees are notified the moment an ETA changes.',
  ],
  flow: {
    from: [
      { slug: 'order-to-cash', passes: 'Orders released for dispatch' },
      { slug: 'warehouse-management', passes: 'Picked, packed and staged loads' },
      { slug: 'fleet-management', passes: 'Own vehicles and drivers available' },
      { slug: 'gate-entry', passes: 'Gate-out, weighbridge and turnaround times' },
    ],
    to: [
      { slug: 'order-to-cash', passes: 'Proof of delivery against each invoice' },
      { slug: 'vendor-invoice-management', passes: 'Freight bills matched to LR and ePOD' },
      { slug: 'accounting', passes: 'Freight accrued by cost centre at dispatch' },
      { slug: 'customer-service', passes: 'ETA changes and delivery disputes' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Daily outbound from several plants on contracted lanes, with loads consolidated before trucks are booked.' },
    { slug: 'distribution', note: 'Primary movement to depots and secondary movement to distributors in one control tower.' },
    { slug: 'pharma', note: 'Cold-chain shipments monitored to 2–8 °C, with e-way bill and document discipline on every load.' },
  ],
  roles: [
    { name: 'Logistics manager', task: 'Runs the control tower and acts on the few shipments that need a decision today.', works: 'Control tower' },
    { name: 'Transport planners', task: 'Group orders into loads, rank transporters and raise indents.', works: 'Load builder' },
    { name: 'Drivers', task: 'Report trip events and capture proof of delivery on the driver app.', works: 'ePOD' },
    { name: 'Freight accounts', task: 'Pass freight bills only when they match the contract, LR and ePOD.', works: 'Freight bills' },
    { name: 'Customer service', task: 'Answers where an order is from the live trip, not a call to the driver.', works: 'Shipment tracking' },
  ],
  related: ['fleet-management', 'warehouse-management', 'gate-entry', 'order-to-cash'],
  screens: [
    {
      screen: 'transportation-management/control-tower',
      view: 'Control tower',
      title: 'Control tower',
      caption: 'Every shipment in motion on one map, lane performance, freight against budget and the few trips that need action, each with its reason.',
      alt: 'MAVRO Transportation Management control tower: 31 shipments in motion across three sites on a lane map, 93.6% on time in full over 30 days, three shipments at risk, ₹13.1 L of a ₹48 L October freight budget, lane performance with the Pune to Ahmedabad lane 18% dearer, and five exceptions including an ETA past the consignee’s cut-off and an e-way bill extension (illustrative data).',
    },
    {
      screen: 'transportation-management/shipment-register',
      view: 'Shipment register',
      title: 'Shipment register',
      caption: 'Every consignment with its order, lane, transporter, vehicle, ETA, e-way bill validity and status.',
      alt: 'MAVRO shipment register: shipments in motion and delivered today with order, lane and weight, transporter and vehicle number, departure, ETA, e-way bill validity and status, including one at risk, one with a damaged line on its proof of delivery and one waiting for an e-way bill extension (illustrative data).',
    },
    {
      screen: 'transportation-management/load-builder',
      view: 'Load builder',
      title: 'Load builder',
      caption: 'Orders released for dispatch grouped into a three-drop load, the truck filled to 89%, transporters ranked on the lane contract and the saving shown.',
      alt: 'MAVRO load builder for 9 October: three orders for Vadodara, Ahmedabad and the depot consolidated into one 24 ft load at 89% of its weight, the drop sequence and loading list, ₹16,600 saved against shipping separately, transporters ranked on rate and reliability, and planning guardrails that keep an order on credit hold out (illustrative data).',
    },
    {
      screen: 'transportation-management/shipment-tracking',
      view: 'Shipment tracking',
      title: 'Shipment tracking detail',
      caption: 'One trip from indent to freight bill: the live route, a recalculated ETA, the consignee told automatically, driving hours and the documents checked at gate-out.',
      alt: 'MAVRO shipment tracking for SHP-6127 to Coimbatore: the trip from indent to freight bill, 232 of 1,180 km run, an unplanned halt near Satara, the ETA moved from 12:30 to 14:20 past the receiving window, the consignee notified and replying, the driver’s hours against the rest rule and the invoice, consignment note and e-way bill (illustrative data).',
    },
  ],
  phone: {
    screen: 'transportation-management/epod',
    view: 'ePOD',
    title: 'Proof of delivery',
    caption: 'The driver records each line at the drop, photographs the damage, times the wait and takes the receiver’s signature.',
    alt: 'MAVRO driver app: proof of delivery at the customer with 240 housings received in full, 79 of 80 valve bodies with one damaged and photographed, 19 minutes at the drop and the receiver’s signature (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, all sites, 8 Oct, 14:02. 31 shipments in motion, 22 dispatched today, OTIF 93.6% over 30 days, 3 at risk; October freight ₹13.1 L of ₹48.0 L. SHP-6127 (SO-24781, 640 GH-280 to Meridian Compressors, Coimbatore, 1,180 km) halted 52 m near Satara: ETA 10 Oct 12:30 → 14:20, after the 14:00 cut-off; consignee told 13:12. SHP-6114’s e-way bill lapses tonight (auto-extension at 15:59). LD-0927 for 9 Oct: three drops, 8,948 kg (89%), ₹33,600 against ₹50,200 shipped separately. SHP-6128: 1 CV-110 damaged at Kestrel Pumps, claim TCL-0118.',
  faq: [
    {
      q: 'What does Transportation Management in MAVRO do?',
      a: 'MAVRO Transportation Management plans, tracks and settles every outbound shipment. It groups orders into costed loads, ranks transporters against lane rate contracts, issues the LR and e-way bill, tracks trips live with recalculated ETAs, captures proof of delivery on the driver app and matches every freight bill to the contract, LR and ePOD.',
    },
    {
      q: 'Does MAVRO TMS handle e-way bills, GST on freight and TDS?',
      a: 'Yes. MAVRO generates e-way bills and Part-B updates, warns before a bill lapses mid-transit and files extensions, links every LR to a valid e-invoice IRN, decides forward or reverse charge on GTA freight bills, and computes TDS under section 194C with threshold tracking.',
    },
    {
      q: 'Can MAVRO track trucks from contracted transporters as well as our own fleet?',
      a: 'Yes. MAVRO tracks every trip through GPS devices, FASTag records and the driver app, whether the vehicle is contracted, hired on the spot market or your own (Fleet Management). Halts outside planned points raise alerts, ETAs are recalculated, and consignees are told when an ETA moves.',
    },
    {
      q: 'How does MAVRO reduce freight billing disputes?',
      a: 'MAVRO records delivery proof with photo, signature and line-level short or damage at the drop, computes detention from gate timestamps, and matches each freight bill to the rate contract, LR and ePOD before approval. Claims for damage or shortage are raised against the transporter with the evidence attached.',
    },
    {
      q: 'Can MAVRO TMS run alongside SAP or another ERP?',
      a: 'Yes. MAVRO Transportation Management can run on its own or alongside SAP, Oracle or Tally through ERP Connect: orders flow in from the ERP, and deliveries, freight accruals and verified freight bills flow back, so transport runs in MAVRO while the ERP stays the system of record.',
    },
  ],
  seo: {
    title: 'Transportation management software (TMS) with e-way bill and ePOD | MAVRO',
    description:
      'MAVRO Transportation Management: a control tower for every shipment, multi-drop load building, transporter allocation on rate contracts, live GPS tracking, ePOD, freight bill matching and e-way bill compliance.',
  },
};
