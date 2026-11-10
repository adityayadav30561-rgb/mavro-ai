import type { PostBody } from './index';

/*
 * Informational + selling. Checked 2026-11-10. Practice, not law: FEFO picks by expiry, FIFO by receipt; they diverge
 * when receipt order and expiry order differ; FEFO is the norm for food, pharmaceuticals, cosmetics and chemicals; FIFO
 * for undated goods (Fabrico, The Fulfillment Lab, Patron Accounting agree). The chart and tables are a worked example,
 * said so in their captions. No regulation is named: none of the sources cites one. MAVRO facts: the WMS deck (FIFO /
 * FEFO / LIFO, issue order by remaining shelf life, RF scan catches mis-scans, quality hold and quarantine) and the
 * Warehouse Management and Inventory Management module pages.
 */
export const post: PostBody = {
  slug: 'fifo-vs-fefo',
  takeaways: [
    'FIFO (first in, first out) ships the stock that arrived first; FEFO (first expired, first out) ships the stock that expires first.',
    'The two give different answers whenever a later batch expires sooner, and then FIFO lets the short-dated batch age on the shelf.',
    'Anything with a shelf life, such as food, pharmaceuticals, cosmetics and chemicals, should be picked by FEFO.',
    'FEFO only holds when the system chooses the batch at allocation and a scan confirms it at the bin.',
  ],
  sections: [
    {
      id: 'difference',
      heading: 'What is the difference between FIFO and FEFO?',
      blocks: [
        { kind: 'p', text: 'FIFO and FEFO are rules for the order in which stock leaves a warehouse. They decide which batch a picker is sent to.' },
        {
          kind: 'list',
          items: [
            'FIFO, first in first out: ship the stock that arrived first.',
            'FEFO, first expired first out: ship the stock that expires first, whenever it arrived.',
          ],
        },
        { kind: 'p', text: 'While batches arrive in the same order as they expire, both rules pick the same batch. The difference only shows when that order breaks.' },
        { kind: 'p', text: 'This guide is about the physical order of picking. How stock is valued in the books is a separate, accounting question.' },
      ],
    },
    {
      id: 'when-they-differ',
      heading: 'When do FIFO and FEFO give different answers?',
      blocks: [
        { kind: 'p', text: 'They differ when a later receipt expires sooner. That happens more than people expect: suppliers ship from different production runs, and returns come back with their own dates.' },
        { kind: 'p', text: 'Take a warehouse holding two batches of the same item. Batch A arrived first with 200 days of shelf life left. Batch B arrived a month later but has only 60 days left.' },
        { kind: 'p', text: 'Under FIFO, batch A ships first. Batch B waits a month and leaves with 30 days left, too short for many buyers. Under FEFO, batch B ships first with 60 days left, and batch A still leaves with 170 days.' },
        {
          kind: 'chart',
          title: 'Shelf life left when each batch ships',
          caption: 'A worked example, not data from any business: two batches, one month apart, each shipped in a month.',
          categories: ['FIFO: batch A, shipped first', 'FIFO: batch B, a month later', 'FEFO: batch B, shipped first', 'FEFO: batch A, a month later'],
          series: [{ name: 'Days of shelf life left at dispatch', values: [200, 30, 60, 170] }],
          format: 'days',
        },
        { kind: 'p', text: 'The worst case under FIFO is 30 days; under FEFO it is 60 days. Over hundreds of batches, that gap becomes write-offs and price cuts.' },
      ],
    },
    {
      id: 'which-goods',
      heading: 'Which goods need FEFO?',
      blocks: [
        { kind: 'p', text: 'Anything with a shelf life should be picked by FEFO, because the expiry date, not the arrival date, decides what is still worth shipping.' },
        {
          kind: 'table',
          caption: 'Which issue rule suits which goods',
          head: ['Rule', 'Picks', 'Suits', 'Example goods'],
          rows: [
            ['FEFO', 'The batch that expires first', 'Goods with a shelf life', 'Food and beverages, pharmaceuticals, cosmetics, chemicals, adhesives, paints'],
            ['FIFO', 'The batch that arrived first', 'Undated goods that still age', 'Engineering parts, packaging, consumables'],
            ['LIFO', 'The batch that arrived last', 'Bulk stock where the newest is the easiest to reach', 'Stacked bulk materials such as aggregates'],
          ],
        },
        { kind: 'p', text: 'Many warehouses need more than one rule. A plant may pick raw materials by FEFO and spare parts by FIFO in the same building.' },
      ],
    },
    {
      id: 'minimum-shelf-life',
      heading: 'What about customers who want a minimum shelf life?',
      blocks: [
        { kind: 'p', text: 'Many buyers will only accept stock with a minimum remaining shelf life, set in their contract or their policy.' },
        { kind: 'p', text: 'FEFO on its own would send them the batch closest to expiry, which they may reject. Allocation has to apply both rules together.' },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'FEFO with a floor',
          text: 'Pick the earliest-expiring batch that still meets this customer’s minimum. Short-dated stock then goes to the channels that accept it, such as a depot with faster turnover.',
        },
        { kind: 'p', text: 'This rule changes by customer, so it belongs in the system that allocates orders, not on a sheet taped to the racking.' },
      ],
    },
    {
      id: 'why-fefo-fails',
      heading: 'Why does FEFO fail in practice?',
      blocks: [
        { kind: 'p', text: 'FEFO usually fails because it is followed from memory rather than enforced.' },
        {
          kind: 'list',
          items: [
            'Pickers take the nearest pallet, not the right one.',
            'Batches are stored behind each other, so the short-dated one is hard to reach.',
            'Expiry dates are not captured at receipt, so nobody knows which batch is which.',
            'Returns go back to stock without their own dates.',
            'Nothing checks the batch at the bin when it is picked.',
          ],
        },
        { kind: 'p', text: 'Each of these is a process gap. Training helps for a while, but only system rules keep FEFO working on a busy shift.' },
      ],
    },
    {
      id: 'how-to-enforce',
      heading: 'How do you make FEFO stick?',
      blocks: [
        { kind: 'p', text: 'FEFO holds when every step from the dock to the dispatch bay knows each batch’s expiry.' },
        {
          kind: 'steps',
          items: [
            { title: 'Capture expiry at receipt', text: 'Record the batch and expiry on the goods receipt, before anything is put away.' },
            { title: 'Put away by batch', text: 'Store each batch in its own bin, so short-dated stock is reachable.' },
            { title: 'Allocate by system', text: 'Let the system choose the batch when the order is allocated, applying any customer minimum.' },
            { title: 'Confirm with a scan', text: 'The picker scans the bin and batch; a wrong batch is caught before it leaves.' },
            { title: 'Watch near-expiry stock', text: 'Flag batches approaching expiry and move them while they can still be sold.' },
          ],
        },
        { kind: 'p', text: 'The first step matters most. A batch without a recorded expiry cannot be picked by FEFO, however good the rest of the process is.' },
      ],
    },
    {
      id: 'what-to-measure',
      heading: 'How do you know FEFO is working?',
      blocks: [
        { kind: 'p', text: 'A few measures show whether the rule is being followed:' },
        {
          kind: 'list',
          items: [
            'Expiry write-offs, by value and by item, month by month.',
            'Stock within a set number of days of expiry, by store.',
            'Orders rejected or returned by customers for short shelf life.',
            'Picks where the scanned batch differed from the one allocated.',
          ],
        },
        { kind: 'p', text: 'Falling write-offs with no rise in short-dated rejections means FEFO is working. Rising mismatched scans means the floor is working around the system.' },
      ],
    },
    {
      id: 'returns-and-quarantine',
      heading: 'How do returns and quarantine fit into FEFO?',
      blocks: [
        { kind: 'p', text: 'Returned goods come back with their own batch and expiry. If they go back to stock without them, FEFO breaks for that item.' },
        { kind: 'p', text: 'Treat each return like a receipt: record the batch and expiry, inspect it, and decide whether it is restocked, repaired, returned to the supplier or scrapped.' },
        { kind: 'p', text: 'Stock waiting for a quality decision should sit in quarantine, visible in the system but never offered to an order. A batch on quality hold that slips into a pick is a worse problem than an expiry write-off.' },
        { kind: 'p', text: 'The same applies to stock that fails an incoming quality check. It belongs on hold until someone releases it, with the reason recorded.' },
      ],
    },
    {
      id: 'what-suppliers-must-provide',
      heading: 'What does FEFO need from suppliers?',
      blocks: [
        { kind: 'p', text: 'FEFO starts at the dock, so it depends on what suppliers send with their goods.' },
        {
          kind: 'list',
          items: [
            'The batch number and expiry date on every carton or pallet label.',
            'The same details on the delivery note or advance shipping notice.',
            'A minimum remaining shelf life on receipt, agreed in the purchase terms.',
          ],
        },
        { kind: 'p', text: 'A delivery that arrives with too little shelf life left should be flagged at receipt, before it is put away and becomes your problem.' },
        { kind: 'p', text: 'Suppliers who repeatedly ship short-dated stock show up quickly once receipts record expiry. That record is useful at the next price negotiation.' },
      ],
    },
    {
      id: 'fefo-across-sites',
      heading: 'How does FEFO work across several warehouses?',
      blocks: [
        { kind: 'p', text: 'With more than one warehouse or depot, FEFO becomes a decision about where stock should go as well as which batch to pick.' },
        { kind: 'p', text: 'Short-dated batches are best sent where they will sell fastest. Longer-dated batches can go to slower depots or to customers with strict shelf-life minimums.' },
        { kind: 'p', text: 'That decision needs batch and expiry visible across every site in one system. With separate spreadsheets per depot, each site runs its own FEFO and the network as a whole still writes stock off.' },
      ],
    },
    {
      id: 'choosing-a-rule',
      heading: 'How do you choose the rule for each item?',
      blocks: [
        { kind: 'p', text: 'Choose per item, not per warehouse. Three questions settle most cases:' },
        {
          kind: 'list',
          items: [
            'Does the item carry an expiry or a best-before date? If so, use FEFO.',
            'Does it age in other ways, such as packaging, finish or obsolescence? If so, use FIFO.',
            'Is it bulk stock where the newest is the only one you can reach? Then LIFO may be the practical choice.',
          ],
        },
        { kind: 'p', text: 'Write the rule into the item master, so every receipt, allocation and pick follows it without anyone having to remember.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How does MAVRO handle FIFO and FEFO?',
      blocks: [
        { kind: 'p', text: 'MAVRO’s [warehouse management software](/modules/warehouse-management) sets the issue order per item as FIFO, FEFO or LIFO, by remaining shelf life where it applies. The rule is enforced at allocation, not left to memory.' },
        { kind: 'figure', module: 'warehouse-management', caption: 'The MAVRO warehouse dashboard: stock, bins, waves and dispatch for batch-controlled goods.' },
        { kind: 'p', text: 'Pickers confirm each pick by RF scan, so a wrong batch or a short pick is caught at the bin. Batches on quality hold or in quarantine are never offered to an order.' },
        { kind: 'p', text: 'Every item is tracked by batch, lot and expiry in [inventory management](/modules/inventory-management), with expiry signals on the stock position. For keeping those quantities accurate, see [cycle counting vs the annual stock-take](/blog/cycle-counting).' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the difference between FIFO and FEFO?',
      a: 'FIFO ships the stock that arrived first; FEFO ships the stock that expires first, whatever its arrival date. They pick the same batch only while batches arrive in the order they expire.',
    },
    {
      q: 'Is FEFO better than FIFO?',
      a: 'For goods with a shelf life, yes: FEFO cuts expiry write-offs because the short-dated batch leaves first. For undated goods, FIFO is simpler and works well.',
    },
    {
      q: 'What industries use FEFO?',
      a: 'FEFO is the norm wherever goods expire: food and beverages, pharmaceuticals, cosmetics, chemicals, adhesives and paints.',
    },
    {
      q: 'How do you apply FEFO with a customer’s minimum shelf life?',
      a: 'Allocate the earliest-expiring batch that still meets that customer’s minimum remaining shelf life. Shorter-dated stock goes to customers or channels that accept it.',
    },
    {
      q: 'Does FEFO apply to raw materials as well as finished goods?',
      a: 'Yes. Any material with a shelf life, such as resins, adhesives, chemicals or food ingredients, should be issued to production by FEFO, so older-dated stock is used before it expires.',
    },
  ],
  sources: [
    { label: 'Fabrico: FIFO vs FEFO', url: 'https://www.fabrico.io/blog/fifo-vs-fefo/' },
    { label: 'The Fulfillment Lab: FEFO meaning, first expired first out', url: 'https://www.thefulfillmentlab.com/blog/fefo' },
    { label: 'Patron Accounting: FEFO, with a worked example', url: 'https://www.patronaccounting.com/glossary/stock-audit/fefo' },
  ],
};
