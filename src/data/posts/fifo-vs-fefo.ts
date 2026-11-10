import type { PostBody } from './index';

/*
 * Checked 2026-11-10. Practice, not law: FEFO picks by expiry, FIFO by receipt; they diverge when receipt order and
 * expiry order differ; FEFO is the norm for food, pharmaceuticals, cosmetics and chemicals; FIFO for undated goods
 * (Fabrico, The Fulfillment Lab, Patron Accounting agree). No regulation is named: none of the sources cites one.
 */
export const post: PostBody = {
  slug: 'fifo-vs-fefo',
  takeaways: [],
  sections: [
    {
      id: 'what-is-the-difference-between-fifo-and',
      heading: 'What is the difference between FIFO and FEFO?',
      blocks: [
        { kind: 'p', text: 'FIFO (first in, first out) ships the stock that arrived first; FEFO (first expired, first out) ships the stock that expires first, whenever it arrived.' },
        { kind: 'p', text: 'Both are rules for the order goods leave the warehouse. They give the same result only while batches arrive in the same order as they expire.' },
      ],
    },
    {
      id: 'when-do-fifo-and-fefo-give-different-ans',
      heading: 'When do FIFO and FEFO give different answers?',
      blocks: [
        { kind: 'p', text: 'When a later receipt expires sooner. Say a warehouse holds batch A, received in January and expiring next August, and batch B, received in March and expiring next March.' },
        { kind: 'p', text: 'FIFO picks batch A because it arrived first, and batch B waits on the shelf while its expiry comes closer, until it has to be written off or sold at a discount. FEFO picks batch B first because it expires first, and nothing is lost.' },
      ],
    },
    {
      id: 'which-goods-need-fefo',
      heading: 'Which goods need FEFO?',
      blocks: [
        { kind: 'p', text: 'Anything with a shelf life: food and beverages, pharmaceuticals, cosmetics, chemicals, adhesives and paints. For these, the expiry date, not the arrival date, decides what is worth shipping.' },
        { kind: 'p', text: 'Undated goods, such as most engineering parts, can run on FIFO, which still keeps old stock from ageing in a corner.' },
      ],
    },
    {
      id: 'what-about-customers-who-want-a-minimum',
      heading: 'What about customers who want a minimum shelf life?',
      blocks: [
        { kind: 'p', text: 'Many buyers will only accept stock with a minimum remaining shelf life. FEFO on its own would send them the batch closest to expiry, so allocation has to apply both rules: the earliest-expiring batch that still meets the customer’s minimum.' },
      ],
    },
    {
      id: 'why-does-fefo-fail-in-practice',
      heading: 'Why does FEFO fail in practice?',
      blocks: [
        { kind: 'p', text: 'Because it is followed from memory. Pickers take the nearest pallet, batches are stored behind each other, and expiry dates are not checked at the bin. FEFO holds only when the system chooses the batch at allocation and the picker’s scan confirms it.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How MAVRO handles this',
      blocks: [
        { kind: 'p', text: 'MAVRO Warehouse Management sets the issue order by FIFO, FEFO or LIFO, by remaining shelf life where it applies, and enforces it at allocation, not by memory; the RF scan catches a wrong batch at the bin.' },
        { kind: 'p', text: 'MAVRO Inventory Management tracks every item by batch, lot and expiry, with expiry signals on the stock position.' },
      ],
    },
  ],
  faq: [],
  sources: [
    { label: 'Fabrico: FIFO vs FEFO', url: 'https://www.fabrico.io/blog/fifo-vs-fefo/' },
    { label: 'The Fulfillment Lab: FEFO meaning, first expired first out', url: 'https://www.thefulfillmentlab.com/blog/fefo' },
    { label: 'Patron Accounting: FEFO, with a worked example', url: 'https://www.patronaccounting.com/glossary/stock-audit/fefo' },
  ],
};
