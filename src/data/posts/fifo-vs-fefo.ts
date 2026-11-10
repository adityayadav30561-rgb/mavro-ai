import type { PostBody } from './index';

/*
 * Checked 2026-11-10. Practice, not law: FEFO picks by expiry, FIFO by receipt; they diverge when receipt order and
 * expiry order differ; FEFO is the norm for food, pharmaceuticals, cosmetics and chemicals; FIFO for undated goods
 * (Fabrico, The Fulfillment Lab, Patron Accounting agree). No regulation is named: none of the sources cites one.
 */
export const post: PostBody = {
  slug: 'fifo-vs-fefo',
  sections: [
    {
      heading: 'What is the difference between FIFO and FEFO?',
      paragraphs: [
        'FIFO (first in, first out) ships the stock that arrived first; FEFO (first expired, first out) ships the stock that expires first, whenever it arrived.',
        'Both are rules for the order goods leave the warehouse. They give the same result only while batches arrive in the same order as they expire.',
      ],
    },
    {
      heading: 'When do FIFO and FEFO give different answers?',
      paragraphs: [
        'When a later receipt expires sooner. Say a warehouse holds batch A, received in January and expiring next August, and batch B, received in March and expiring next March.',
        'FIFO picks batch A because it arrived first, and batch B waits on the shelf while its expiry comes closer, until it has to be written off or sold at a discount. FEFO picks batch B first because it expires first, and nothing is lost.',
      ],
    },
    {
      heading: 'Which goods need FEFO?',
      paragraphs: [
        'Anything with a shelf life: food and beverages, pharmaceuticals, cosmetics, chemicals, adhesives and paints. For these, the expiry date, not the arrival date, decides what is worth shipping.',
        'Undated goods, such as most engineering parts, can run on FIFO, which still keeps old stock from ageing in a corner.',
      ],
    },
    {
      heading: 'What about customers who want a minimum shelf life?',
      paragraphs: [
        'Many buyers will only accept stock with a minimum remaining shelf life. FEFO on its own would send them the batch closest to expiry, so allocation has to apply both rules: the earliest-expiring batch that still meets the customer’s minimum.',
      ],
    },
    {
      heading: 'Why does FEFO fail in practice?',
      paragraphs: [
        'Because it is followed from memory. Pickers take the nearest pallet, batches are stored behind each other, and expiry dates are not checked at the bin. FEFO holds only when the system chooses the batch at allocation and the picker’s scan confirms it.',
      ],
    },
  ],
  mavro: [
    'MAVRO Warehouse Management sets the issue order by FIFO, FEFO or LIFO, by remaining shelf life where it applies, and enforces it at allocation, not by memory; the RF scan catches a wrong batch at the bin.',
    'MAVRO Inventory Management tracks every item by batch, lot and expiry, with expiry signals on the stock position.',
  ],
  sources: [
    { label: 'Fabrico: FIFO vs FEFO', url: 'https://www.fabrico.io/blog/fifo-vs-fefo/' },
    { label: 'The Fulfillment Lab: FEFO meaning, first expired first out', url: 'https://www.thefulfillmentlab.com/blog/fefo' },
    { label: 'Patron Accounting: FEFO, with a worked example', url: 'https://www.patronaccounting.com/glossary/stock-audit/fefo' },
  ],
};
