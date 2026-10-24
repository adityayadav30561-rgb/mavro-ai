import type { ModuleContent } from '../schema';

/*
 * Warehouse Management. Source: product deck v2, slides 96–97 (tagline, four tiles, what it does, why it matters,
 * four screens), with the detailed WMS deck for scope (storage and inbound, picking and dispatch, productivity, 3PL
 * and special storage, India compliance) and the RF handheld. The deck's quarantine and cold-room control are kept
 * for pharma. Figures on the tiles come from the module's screens (prototype/modules/warehouse-management/), whose
 * scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'warehouse-management'> = {
  slug: 'warehouse-management',
  tagline: 'FEFO-safe, bin-accurate warehousing built for batch-controlled goods.',
  tiles: [
    {
      icon: 'warehouse',
      title: 'Bin-level stock',
      body: 'Batch and bin stock with live allocation status.',
      figure: { value: '1,010', label: 'bins, 80% occupied' },
    },
    {
      icon: 'calendar',
      title: 'FEFO enforcement',
      body: 'Near-expiry batches are always picked first.',
      figure: { value: '3', label: 'batches of one kit, picked by expiry' },
    },
    {
      icon: 'inventory',
      title: 'Guided inbound',
      body: 'GRN, QC sampling, then a suggested putaway bin.',
      figure: { value: '2 h 07 m', label: 'dock to stock today, target 4 h' },
    },
    {
      icon: 'dispatch',
      title: 'Wave picking',
      body: 'Cut-off driven waves with pick-accuracy checks.',
      figure: { value: '99.6%', label: 'pick accuracy, every pick scanned' },
    },
  ],
  what: 'A warehouse management system for batch-controlled goods: zone and bin-level stock with an expiry watch, guided inbound from the dock through QC sampling to a suggested putaway bin, and cut-off driven pick waves through packing, QC and staged dispatch. Every pick, pack and count is confirmed by scan on an RF handheld or Android phone, and stock movements post to Inventory Management as they happen.',
  why: [
    'Expiry write-offs are cut, because FEFO is enforced at allocation, not by memory.',
    'Fast dock-to-stock keeps inventory selling instead of waiting.',
    'Quarantine and cold-room control support GDP compliance.',
    'Cycle-count variances are caught weekly, not at the annual stock take.',
    'Short picks are resolved from overflow bins before vehicles leave.',
    'Zone utilisation data guides expansion decisions.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Expected receipts against open POs' },
      { slug: 'production-management', passes: 'Finished lots released by QC' },
      { slug: 'gate-entry', passes: 'Vehicles cleared to unload' },
      { slug: 'order-to-cash', passes: 'Orders released for picking' },
    ],
    to: [
      { slug: 'inventory-management', passes: 'Every bin movement on the stock ledger' },
      { slug: 'transportation-management', passes: 'Picked, packed and staged loads' },
      { slug: 'gate-entry', passes: 'Loaded vehicles cleared for gate-out' },
      { slug: 'customer-service', passes: 'Returns received and their disposition' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Finished goods put away by velocity and picked in waves to each day’s dispatch cut-off.' },
    { slug: 'distribution', note: 'Thousands of SKUs across depots, picked batch-wise with short picks resolved before loading.' },
    { slug: 'pharma', note: 'FEFO at allocation, quarantine and cold-room control and batch traceability through packing, for GDP.' },
  ],
  roles: [
    { name: 'Warehouse manager', task: 'Watches the shift, zone occupancy and the decisions that need making this hour.', works: 'WMS dashboard' },
    { name: 'Receiving team', task: 'Counts receipts against the ASN, samples for QC and puts away to the suggested bin.', works: 'Inbound and putaway' },
    { name: 'Pickers', task: 'Pick by scan on the RF handheld, batch by batch in expiry order.', works: 'Waves and picking' },
    { name: 'Dispatch supervisor', task: 'Packs, weighs, labels and stages loads in drop order before the vehicle arrives.', works: 'Pick and dispatch' },
    { name: 'Inventory controller', task: 'Runs cycle counts by movement and value and clears variances.', works: 'Cycle counts' },
  ],
  related: ['inventory-management', 'transportation-management', 'gate-entry', 'order-to-cash'],
  screens: [
    {
      screen: 'warehouse-management/wms-dashboard',
      view: 'WMS dashboard',
      title: 'WMS dashboard',
      caption: 'The wave against its cut-off, dock to stock, zone occupancy on a floor plan and the decisions that need making this hour.',
      alt: 'MAVRO Warehouse Management dashboard for a finished-goods warehouse: wave W-0318 at 61 of 86 lines before a 16:30 cut-off, dock to stock of 2 h 07 m, 99.6% pick accuracy, zones on a floor plan with the housings zone at 93%, pallets received and shipped by month, five decisions including a short pick and a quality hold, and an expiry watch on three batches (illustrative data).',
    },
    {
      screen: 'warehouse-management/stock-register',
      view: 'Stock register',
      title: 'Stock register, bin level',
      caption: 'Every batch in every bin with its expiry, what is allocated to which order and what is free.',
      alt: 'MAVRO bin-level stock register: bins with item, batch or lot, expiry, quantity on hand, allocation to orders and loads, free stock and status, including a short-picked bin sent to recount, stock held for a credit release, a FEFO first-out batch, a quality hold and a customer return (illustrative data).',
    },
    {
      screen: 'warehouse-management/inbound-putaway',
      view: 'Inbound and putaway',
      title: 'Inbound GRN and putaway',
      caption: 'Receipts by dock through the day, one receipt from count and shelf-life check to QC sampling, and the bins the putaway engine suggests.',
      alt: 'MAVRO inbound and putaway: today’s receipts on a dock timeline, a vendor receipt of 1,200 seal kits counted, checked for shelf life and in QC sampling at 20 of 32 with no defects, three putaway bins scored by velocity, weight and space, and today’s receipts with dock-to-stock times (illustrative data).',
    },
    {
      screen: 'warehouse-management/pick-dispatch',
      view: 'Pick and dispatch',
      title: 'Pick and dispatch board',
      caption: 'A wave from picking to packing, QC, staging and loading, with short picks resolved and dispatch cleared before gate-out.',
      alt: 'MAVRO pick and dispatch board: wave W-0318 with 61 of 86 lines picked, orders moving through picking, packing, QC and weighing, staging and loading, three short picks resolved from overflow bins, staging lanes in drop order and the dispatch checks of weight, SSCC labels, lot traceability and e-way bill (illustrative data).',
    },
  ],
  phone: {
    screen: 'warehouse-management/rf-pick',
    view: 'Waves and picking',
    title: 'RF pick',
    caption: 'The picker scans the bin, item and batch, the nearest-expiry batch is the one allocated, and the quantity is confirmed at the bin.',
    alt: 'MAVRO handheld pick task: 200 seal kits from bin C-07 for a customer order, batch B0644 expiring March 2027 picked before two later batches, bin, item and batch scanned and the quantity matching the task (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, Plant 1 finished-goods warehouse, 8 Oct, 14:02. ₹61.0 L of stock, 1,010 bins, 80% occupied (zone A 93%). Wave W-0318: 86 lines, 61 picked, cut-off 16:30, for SO-24832 and the 9 Oct loads LD-0927 to LD-0929. Short pick at A-09: 260 IH-180 of 300, the 40 from overflow F-03. SK-22 batches B0644 (Mar 27), B0731 (Dec 27), B0819 (Aug 28): FEFO picks B0644 first; the depot transfer takes B0819 under its 18-month rule. GRN-5516 Nova Seals, 1,200 SK-22, in QC sampling; putaway C-10. Dock to stock 2 h 07 m. L-0927 BR-045 on quality hold.',
  faq: [
    {
      q: 'What does Warehouse Management in MAVRO do?',
      a: 'MAVRO Warehouse Management runs a warehouse at bin level: ASNs and dock slots, receipt counts and QC sampling, directed putaway, FEFO or FIFO allocation, wave picking by scan, packing with SSCC labels, staging in drop order and dispatch clearance, plus replenishment, cycle counting, returns and quarantine.',
    },
    {
      q: 'How does MAVRO enforce FEFO in the warehouse?',
      a: 'MAVRO allocates batches by remaining shelf life when the order is released, so the nearest-expiry batch is picked first and the picker scans the batch to confirm it. Customer or depot rules for minimum remaining shelf life are applied at allocation, so long-dated stock goes where it is required.',
    },
    {
      q: 'Does MAVRO WMS work with barcode scanners and Android phones?',
      a: 'Yes. MAVRO Warehouse Management runs on RF handhelds and Android phones for putaway, picking and counting, and works offline. Every pick, pack and count is confirmed by scanning the bin, item and batch, so short picks and mis-scans are caught at the bin.',
    },
    {
      q: 'Does MAVRO WMS handle e-way bills and Indian compliance at dispatch?',
      a: 'Yes. MAVRO checks value and distance and raises the e-way bill at dispatch, prompts Part-B updates and tracks validity, and supports job-work challans under GST Rule 45, ITC-04 data and Legal Metrology checks at packing, all before the vehicle leaves the gate.',
    },
    {
      q: 'Can MAVRO WMS manage stock for several clients as a 3PL?',
      a: 'Yes. MAVRO Warehouse Management enforces client ownership on every bin, keeps each client’s stock segregated and bills storage days and handling to client statements according to each contract.',
    },
  ],
  seo: {
    title: 'Warehouse management software (WMS) with FEFO and RF picking | MAVRO',
    description:
      'MAVRO Warehouse Management: bin-level stock with expiry watch, guided inbound with QC sampling and directed putaway, FEFO allocation, wave picking by RF scan, staging and dispatch with e-way bill checks.',
  },
};
