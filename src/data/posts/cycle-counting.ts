import type { PostBody } from './index';

/*
 * Checked 2026-11-10. Practice, not law: cycle counting counts rotating subsets without stopping operations; ABC
 * classes set how often; errors are caught sooner than at an annual count; annual counts may still be needed for audits
 * (Small Business Trends, Cleverence, Lightsource agree). Left out on purpose: a fixed interval per class (sources range
 * from weekly to quarterly for A items) and accuracy thresholds for skipping the annual count.
 */
export const post: PostBody = {
  slug: 'cycle-counting',
  takeaways: [],
  sections: [
    {
      id: 'what-is-cycle-counting',
      heading: 'What is cycle counting?',
      blocks: [
        { kind: 'p', text: 'Cycle counting checks a small, rotating set of items or bins every day or week, so the whole stock is counted over the year without stopping the warehouse. An annual stock-take counts everything at once, usually with operations frozen.' },
      ],
    },
    {
      id: 'why-count-in-cycles-instead-of-once-a-ye',
      heading: 'Why count in cycles instead of once a year?',
      blocks: [
        { kind: 'p', text: 'Because errors are found while they are still small and recent. A mis-pick or a wrong receipt found within weeks can be traced to its cause; found at the year-end count, it has been compounding for months and nobody remembers why.' },
        { kind: 'p', text: 'Cycle counting also spreads the work, so counting does not need a shutdown.' },
      ],
    },
    {
      id: 'how-does-abc-analysis-set-the-count-freq',
      heading: 'How does ABC analysis set the count frequency?',
      blocks: [
        { kind: 'p', text: 'ABC analysis ranks items by value: a few A items carry most of the stock value, many C items very little. A items are counted most often, B items less often, C items least.' },
        { kind: 'p', text: 'How often depends on value, how fast items move, how easily they go missing and how many counting hours are available, so set the frequency per class and review it as variances come in.' },
      ],
    },
    {
      id: 'how-should-a-count-be-run',
      heading: 'How should a count be run?',
      blocks: [
        { kind: 'p', text: 'Count blind, without showing the counter the book quantity, so the count is not nudged towards it. Freeze movements in the bins being counted, or count when they are quiet. Let small variances within a tolerance post, and recount large ones before anyone approves them.' },
        { kind: 'p', text: 'Count outside the schedule too, when something signals a problem: a short pick, a negative balance or a bin that should be empty but is not.' },
      ],
    },
    {
      id: 'does-cycle-counting-replace-the-annual-s',
      heading: 'Does cycle counting replace the annual stock-take?',
      blocks: [
        { kind: 'p', text: 'Often it reduces it, but some businesses still need a full count for their auditors or for regulation. Agree the approach with your auditor before dropping the annual count.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How MAVRO handles this',
      blocks: [
        { kind: 'p', text: 'MAVRO Inventory Management schedules cycle counts by ABC class, with two-person blind counts in frozen bins. Variances within tolerance post automatically; larger ones are recounted and need approval, and items left below reorder raise a requisition.' },
        { kind: 'p', text: 'MAVRO Warehouse Management chooses bins for counting by movement, value and variance, and ranks stock-take variances by value for recount.' },
      ],
    },
  ],
  faq: [],
  sources: [
    { label: 'Small Business Trends: cycle counting inventory', url: 'https://smallbiztrends.com/cycle-counting-inventory/' },
    { label: 'Cleverence: cycle counting vs annual counts', url: 'https://www.cleverence.com/amp/articles/3pl-business/cycle-counting-vs-annual-counts-keeping-inventory-accurate-3742/' },
    { label: 'Lightsource: cycle counting glossary', url: 'https://lightsource.ai/glossary/cycle-counting' },
  ],
};
