import type { ModuleContent } from '../schema';

/*
 * Inventory Management. Source: product deck v2, slides 56–57 (tagline, four tiles, what it does, why it matters,
 * four screens), written for every industry rather than the deck's pharma stores. The stock position and the item
 * view are the homepage `inventory` and `stock-item` screens moved onto the module shell. Figures on the tiles come
 * from the module's screens (prototype/modules/inventory-management/), whose scenario is below; like all screen data
 * they are illustrative.
 */
export const content: ModuleContent<'inventory-management'> = {
  slug: 'inventory-management',
  tagline: 'Store-wise cover, cycle counts and write-offs: stock that the books can trust.',
  tiles: [
    {
      icon: 'inventory',
      title: 'Stock position',
      body: 'Store-wise value, cover and items below reorder.',
      figure: { value: '27 days', label: 'of cover against open demand' },
    },
    {
      icon: 'layers',
      title: 'Stock register',
      body: 'Item, bin, batch and status across every store.',
      figure: { value: '1,284', label: 'items in four stores' },
    },
    {
      icon: 'check',
      title: 'Cycle counts',
      body: 'ABC counts with variance and replenishment.',
      figure: { value: '95.7%', label: 'of lines within tolerance' },
    },
    {
      icon: 'rules',
      title: 'Adjustments',
      body: 'Write-offs approved with a reason and QA sign-off.',
      figure: { value: '₹83,950', label: 'of write-offs waiting for approval' },
    },
  ],
  what: 'Material control across raw-material, work-in-progress, finished-goods and consumable stores: stock value and cover with reorder and expiry signals, a batch- and bin-level stock register, ABC cycle counts that raise variances and replenishment requests, and an adjustment queue where every write-off needs a reason, a QA disposition where stock is rejected, and an approval.',
  why: [
    'Materials below reorder are seen in days of cover, not just quantity.',
    'Near-expiry and slow-moving stock surface while action is still possible.',
    'Count variances beyond tolerance need the plant head’s approval to post.',
    'Blind two-person counts and a count freeze protect the count’s integrity.',
    'Damaged and rejected lots wait for QA disposition before write-off.',
    'Cold-store and bin capacity is known before the next lot is received.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Goods receipts against purchase orders' },
      { slug: 'gate-entry', passes: 'Vehicles cleared to unload' },
      { slug: 'production-management', passes: 'Finished goods and material issues' },
      { slug: 'customer-service', passes: 'Returned goods for disposition' },
    ],
    to: [
      { slug: 'order-to-cash', passes: 'Stock free to promise and allocate' },
      { slug: 'production-management', passes: 'Material available for work orders' },
      { slug: 'procure-to-pay', passes: 'Replenishment requests' },
      { slug: 'accounting', passes: 'Stock valuation and write-offs' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Raw material, work in progress and finished goods tracked by lot from receipt to dispatch.' },
    { slug: 'distribution', note: 'Stock across depots with cover and reorder signals, and batches issued first to expire.' },
    { slug: 'pharma', note: 'Batch and expiry control, quarantine until QA release, and cold-store capacity watched.' },
    { slug: 'service-providers', note: 'Spares, equipment in store and consumables counted and issued against projects.' },
  ],
  roles: [
    { name: 'Stores manager', task: 'Watches cover and reorder signals and approves write-offs within limits.', works: 'Adjustments' },
    { name: 'Stores in-charge', task: 'Receives, puts away, issues and transfers stock by bin and lot.', works: 'Movements' },
    { name: 'Counting teams', task: 'Count bins blind, two to a team, while the bins are frozen.', works: 'Cycle counts' },
    { name: 'Quality', task: 'Decides what happens to rejected, returned and expired lots.', works: 'Batches and expiry' },
    { name: 'Plant head', task: 'Approves count variances beyond tolerance and large write-offs.', works: 'Adjustments' },
  ],
  related: ['procure-to-pay', 'gate-entry', 'order-to-cash', 'accounting'],
  screens: [
    {
      screen: 'inventory-management/stock-position',
      view: 'Stock position',
      title: 'Stock position and cover',
      caption: 'Stock value and days of cover across the stores, what each item is promised to, and the items below reorder or near expiry.',
      alt: 'MAVRO Inventory Management stock position: ₹2.14 Cr across 1,284 items in four stores, 27 days of cover, ₹6.8 L under inspection, 3 items below reorder, stock by item with free, reserved and in-inspection quantities, value by stock type and today’s movements (illustrative data).',
    },
    {
      screen: 'inventory-management/cycle-count',
      view: 'Cycle counts',
      title: 'Cycle count: variance and replenishment',
      caption: 'A blind, two-person count of the A-class bins: variances within tolerance post, larger ones go to the plant head, and low stock raises a requisition.',
      alt: 'MAVRO cycle count CC-1008: 46 A-class bins counted blind by two-person teams, 95.7% of lines within tolerance, net variance of minus ₹13,990, two variances over tolerance waiting for the plant head and a replenishment request raised for bearing sleeves (illustrative data).',
    },
    {
      screen: 'inventory-management/adjustments',
      view: 'Adjustments',
      title: 'Stock adjustment approval queue',
      caption: 'Every write-off with its reason, the QA disposition where stock was rejected, and the approver it waits for.',
      alt: 'MAVRO stock adjustment queue: ₹83,950 of write-offs waiting for approval, two lots waiting for QA disposition, and adjustment ADJ-0627 open with 36 rejected housings, the QA decision to scrap, its evidence and the approval route to the plant head (illustrative data).',
    },
    {
      screen: 'inventory-management/item-stock',
      view: 'Items',
      title: 'Item stock and movements',
      caption: 'One item by location and lot, what is reserved and free to promise, and every movement traced to its document.',
      alt: 'MAVRO item view for the IH-220 impeller housing: 362 pieces on hand, 310 reserved for a customer order, 52 free to promise, stock by location and lot, the movement ledger and weekly demand against the reorder level (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, Plant 1, 8 Oct, 14:02. ₹2.14 Cr of stock, 1,284 items in four stores, 27 days of cover. Cycle count CC-1008 of 46 A-class bins: 44 lines within tolerance; BS-07 22 short and GW-300 3 short wait for the plant head; PR-0461 raised for BS-07. Adjustment queue: ₹83,950 of write-offs to approve (ADJ-0627, 36 rejected IH-180 housings, ₹44,640, scrapped by QA); lots L-0927 and L-0897 wait for QA disposition.',
  faq: [
    {
      q: 'What does Inventory Management in MAVRO do?',
      a: 'MAVRO Inventory Management controls stock across raw-material, work-in-progress, finished-goods and consumable stores. It shows value and days of cover with reorder and expiry signals, keeps a register by item, bin, batch and status, runs ABC cycle counts that raise variances and replenishment, and approves every write-off with a reason.',
    },
    {
      q: 'How does cycle counting work in MAVRO?',
      a: 'MAVRO schedules counts by ABC class, so high-value items are counted most often. Teams of two count each bin blind, without seeing the book quantity, while the bins are frozen. Variances within tolerance post automatically; larger ones are recounted and need the plant head’s approval, and items left below reorder raise a requisition.',
    },
    {
      q: 'Does MAVRO track batches, lots, serial numbers and expiry?',
      a: 'Yes. MAVRO tracks stock by batch, lot or serial number in every store and bin, with its status: free, reserved, in inspection or on hold. Expiry dates drive near-expiry alerts and first-expiry-first-out issue, and every movement is traced to the document that caused it.',
    },
    {
      q: 'How are stock write-offs controlled in MAVRO?',
      a: 'Every adjustment in MAVRO needs a reason. Rejected, returned and damaged lots wait for a quality disposition before they can be written off, and approval limits send larger write-offs and count variances beyond tolerance to the plant head. The posting to the ledger is shown before approval.',
    },
  ],
  seo: {
    title: 'Inventory management software: stock, cycle counts, batches | MAVRO',
    description:
      'MAVRO Inventory Management: store-wise stock value and cover, batch, bin and expiry tracking, ABC cycle counts with variance approval and replenishment, and write-offs approved with QA disposition.',
  },
};
