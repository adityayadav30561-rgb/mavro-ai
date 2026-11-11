import type { PostBody } from './index';

/*
 * Informational + selling. Checked 2026-11-10. Practice, not law: cycle counting counts rotating subsets without
 * stopping operations; ABC classes set how often; errors are caught sooner than at an annual count; annual counts may
 * still be needed for audits (Small Business Trends, Cleverence, Lightsource agree). The chart and the schedule table
 * are examples, said so in their captions. Left out on purpose: a fixed interval per class as a rule (sources range from
 * weekly to quarterly for A items) and accuracy thresholds for skipping the annual count. MAVRO facts: the Inventory
 * Management and Warehouse Management module pages and the WMS deck.
 */
export const post: PostBody = {
  slug: 'cycle-counting',
  takeaways: [
    'Cycle counting checks a small, rotating set of items every day or week, so the whole stock is counted over the year without stopping work.',
    'ABC analysis sets how often each item is counted: high-value A items most often, low-value C items least.',
    'Cycle counts find errors while they are recent enough to trace, unlike a once-a-year stock-take.',
    'Count blind, freeze the bins being counted, post small variances and recount large ones before anyone approves them.',
  ],
  sections: [
    {
      id: 'what-is-cycle-counting',
      heading: 'What is cycle counting?',
      blocks: [
        { kind: 'p', text: 'Cycle counting is counting a small part of the stock on a regular schedule, so that every item is counted over the year.' },
        { kind: 'p', text: 'An annual stock-take counts everything at once, usually with the warehouse frozen for a day or more. Cycle counting spreads the same job across the year, a few bins at a time.' },
        {
          kind: 'table',
          caption: 'Cycle counting and the annual stock-take compared',
          head: ['Aspect', 'Cycle counting', 'Annual stock-take'],
          rows: [
            ['How much is counted', 'A few items or bins at a time', 'Everything at once'],
            ['How often', 'Daily or weekly, all year', 'Once or twice a year'],
            ['Effect on work', 'Normal work continues', 'Movements usually stop'],
            ['When errors are found', 'Within weeks of happening', 'Up to a year later'],
            ['Effort on the count day', 'Small and routine', 'Large, with extra staff'],
          ],
        },
      ],
    },
    {
      id: 'why-cycle-count',
      heading: 'Why count in cycles instead of once a year?',
      blocks: [
        { kind: 'p', text: 'Because errors are found while they are still small and recent enough to trace.' },
        { kind: 'p', text: 'A mis-pick or a wrong receipt found within weeks can be traced to its cause: a picker, a supplier, a unit-of-measure mix-up. Found at the year-end count, it has compounded for months and nobody remembers why.' },
        { kind: 'p', text: 'Cycle counting also spreads the effort. Counting becomes part of the routine, done by people who know the stock, rather than a stressful annual event.' },
        { kind: 'p', text: 'Most of all, it keeps the stock figure trustworthy all year. Planning, purchasing and customer promises all depend on that number.' },
      ],
    },
    {
      id: 'abc-analysis',
      heading: 'How does ABC analysis set the count frequency?',
      blocks: [
        { kind: 'p', text: 'ABC analysis ranks items by the value they carry, so counting effort goes where errors cost most.' },
        {
          kind: 'list',
          items: [
            'A items: a small share of items that carry most of the stock value.',
            'B items: a middle group.',
            'C items: the many items that together carry little value.',
          ],
        },
        {
          kind: 'chart',
          title: 'Example: share of items and share of stock value by ABC class',
          caption: 'An example of a typical shape, not data from any business. Your own split comes from your item master.',
          categories: ['A items', 'B items', 'C items'],
          series: [
            { name: 'Share of items', values: [10, 25, 65] },
            { name: 'Share of stock value', values: [70, 20, 10] },
          ],
          format: 'percent',
          layout: 'group',
        },
        { kind: 'p', text: 'A items are counted most often, C items least. Velocity matters too: a fast-moving C item may need counting more often than a slow A item.' },
      ],
    },
    {
      id: 'setting-the-schedule',
      heading: 'How often should each class be counted?',
      blocks: [
        { kind: 'p', text: 'There is no single right interval. It depends on value, how fast items move, how easily they go missing and how many counting hours you have.' },
        {
          kind: 'table',
          caption: 'One example schedule',
          head: ['Class', 'Example interval', 'Why'],
          rows: [
            ['A', 'Every few weeks', 'Most value at risk'],
            ['B', 'Every couple of months', 'Moderate value'],
            ['C', 'Once or twice a year', 'Little value per item'],
          ],
          note: 'An example only. Sources and practice range from weekly to quarterly for A items: start somewhere reasonable and adjust as variances come in.',
        },
        { kind: 'p', text: 'Review the schedule every quarter. Items with repeated variances should be counted more often until the cause is fixed.' },
      ],
    },
    {
      id: 'running-a-count',
      heading: 'How should a cycle count be run?',
      blocks: [
        { kind: 'p', text: 'A good count is one the counter cannot nudge towards the expected answer.' },
        {
          kind: 'steps',
          items: [
            { title: 'Count blind', text: 'The counter does not see the book quantity, so the count is not steered towards it.' },
            { title: 'Freeze the bins', text: 'Stop movements in the bins being counted, or count when they are quiet.' },
            { title: 'Count in pairs for high value', text: 'Two people count A items, so one error does not pass unseen.' },
            { title: 'Post small variances', text: 'Differences within an agreed tolerance post automatically.' },
            { title: 'Recount large ones', text: 'Bigger differences are recounted before anyone approves an adjustment.' },
          ],
        },
        { kind: 'p', text: 'Count outside the schedule too, when something signals a problem: a short pick, a negative balance, or a bin that should be empty but is not.' },
      ],
    },
    {
      id: 'handling-variances',
      heading: 'What should happen to a variance?',
      blocks: [
        { kind: 'p', text: 'A variance is a question, not just a number to post. The adjustment fixes the book; finding the cause stops it happening again.' },
        {
          kind: 'list',
          items: [
            'Record a reason for every adjustment above the tolerance.',
            'Have someone senior approve large write-offs before they post.',
            'Look for patterns: the same item, bin, shift or supplier.',
            'Raise a replenishment request if the count leaves an item below its reorder level.',
          ],
        },
        { kind: 'p', text: 'Over time, the reasons tell you more than the counts. They point at the process that needs fixing.' },
      ],
    },
    {
      id: 'annual-count',
      heading: 'Does cycle counting replace the annual stock-take?',
      blocks: [
        { kind: 'p', text: 'Often it reduces it, but some businesses still need a full count for their auditors or for regulation.' },
        { kind: 'p', text: 'Agree the approach with your auditor before dropping the annual count. A well-run cycle count programme, with records of every count and variance, is the evidence they will ask for.' },
        { kind: 'callout', tone: 'note', title: 'Keep the records', text: 'Every count, recount, variance, reason and approval should be kept with the date and the counter. Without them, cycle counting is hard to rely on at audit time.' },
      ],
    },
    {
      id: 'what-you-need',
      heading: 'What does a business need to start cycle counting?',
      blocks: [
        { kind: 'p', text: 'Cycle counting needs less than people think, but a few basics are not optional:' },
        {
          kind: 'list',
          items: [
            'Every item in a known bin or location, so a count has a clear scope.',
            'Barcodes on bins and items, so counters scan rather than write.',
            'A scanner or phone app that records counts against the system.',
            'Count tasks generated by the system from the ABC schedule.',
            'Agreed tolerances for when a variance posts and when it is recounted.',
          ],
        },
        { kind: 'p', text: 'Without known locations, a count turns into a search. Fixing locations is often the first real gain of starting a cycle count programme.' },
      ],
    },
    {
      id: 'measuring-accuracy',
      heading: 'How is inventory accuracy measured?',
      blocks: [
        { kind: 'p', text: 'Inventory accuracy is usually measured as the share of counted lines whose counted quantity is within tolerance of the book.' },
        { kind: 'p', text: 'Track it alongside the value of variances. A high line accuracy can hide a few large, expensive errors; the value view shows them.' },
        {
          kind: 'list',
          items: [
            'Lines within tolerance, as a share of lines counted.',
            'Net and absolute value of variances.',
            'Accuracy by class, store and bin zone.',
            'Repeat offenders: items that vary count after count.',
          ],
        },
        { kind: 'p', text: 'Watch the trend more than any single month. Accuracy that rises steadily means the causes are being fixed, not just the numbers.' },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'What are the common cycle counting mistakes?',
      blocks: [
        { kind: 'p', text: 'Most programmes that fail do so for the same few reasons:' },
        {
          kind: 'list',
          items: [
            'Counting with the book quantity visible, so counts drift to the expected number.',
            'Counting bins while goods are still moving in and out.',
            'Posting every variance without a reason or an approval.',
            'Counting the same easy bins and skipping the awkward ones.',
            'Letting the schedule slip in busy months, when errors are most likely.',
          ],
        },
        { kind: 'p', text: 'A system that generates the day’s counts and records every result removes most of these. Counting becomes a routine, not a favour.' },
      ],
    },
    {
      id: 'who-counts',
      heading: 'Who should do the counting?',
      blocks: [
        { kind: 'p', text: 'The people who know the stock best are often the worst people to count it alone. A storekeeper counting their own bins has every reason to find the number they expect.' },
        { kind: 'p', text: 'A common answer is to pair a storekeeper with someone from outside the store, such as finance or another shift. One knows where things are; the other has no stake in the result.' },
        { kind: 'p', text: 'Rotating counters across zones also helps. It spreads knowledge of the stock and makes it harder for any one error to hide.' },
        { kind: 'p', text: 'Whoever counts, the system should record who counted, when and what they found. That record turns a count into evidence.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How does MAVRO handle cycle counting?',
      blocks: [
        { kind: 'p', text: 'MAVRO’s [inventory management software](/modules/inventory-management) schedules cycle counts by ABC class, with two-person blind counts in frozen bins.' },
        { kind: 'figure', module: 'inventory-management', caption: 'The MAVRO stock position: store-wise value, cover and items below reorder.' },
        { kind: 'p', text: 'Variances within tolerance post automatically. Larger ones are recounted and need the plant head’s approval, and items left below reorder raise a requisition.' },
        { kind: 'p', text: 'In the warehouse, [warehouse management](/modules/warehouse-management) chooses bins for counting by movement, value and variance, and ranks stock-take variances by value for recount. For picking the right batch once the count is right, see [FIFO vs FEFO](/blog/fifo-vs-fefo).' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is cycle counting in inventory?',
      a: 'Cycle counting is counting a small, rotating set of items or bins on a schedule, so the whole stock is counted over the year without stopping normal work.',
    },
    {
      q: 'How often should A items be counted?',
      a: 'There is no single rule: practice ranges from weekly to quarterly. Count A items most often, based on their value, how fast they move and how easily they go missing, and adjust as variances come in.',
    },
    {
      q: 'Is cycle counting better than a physical stock-take?',
      a: 'For keeping stock accurate all year, usually yes: errors are found within weeks and work does not stop. Some businesses still need an annual count for auditors.',
    },
    {
      q: 'What is a blind count?',
      a: 'A blind count is one where the counter does not see the book quantity, so the count is not nudged towards the expected answer.',
    },
    {
      q: 'What is a good inventory accuracy target?',
      a: 'There is no universal figure. Measure the share of counted lines within tolerance and the value of variances, set a target with your team and auditor, and track the trend month by month.',
    },
  ],
  sources: [
    { label: 'Small Business Trends: cycle counting inventory', url: 'https://smallbiztrends.com/cycle-counting-inventory/' },
    { label: 'Cleverence: cycle counting vs annual counts', url: 'https://www.cleverence.com/amp/articles/3pl-business/cycle-counting-vs-annual-counts-keeping-inventory-accurate-3742/' },
    { label: 'Lightsource: cycle counting glossary', url: 'https://lightsource.ai/glossary/cycle-counting' },
  ],
};
