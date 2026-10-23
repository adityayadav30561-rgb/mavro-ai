import type { ScreenName } from '../components/Screen';

/* Content for the production, visibility, industry and control sections. */

/** Nodes of the production graph. `col` and `row` place them on a 9 × 3 grid. */
export const graph = [
  { id: 'so', label: 'Sales order', meta: 'SO-24817', col: 1, row: 2, state: 'done' },
  { id: 'plan', label: 'Planning', meta: 'Week 42', col: 2, row: 2, state: 'done' },
  { id: 'bom', label: 'BOM', meta: '14 components', col: 3, row: 2, state: 'done' },
  { id: 'mrp', label: 'Material need', meta: '400 kg short', col: 4, row: 2, state: 'done' },
  { id: 'buy', label: 'Purchase', meta: 'PO-7714', col: 5, row: 1, state: 'done' },
  { id: 'inv', label: 'Inventory', meta: '6 lots issued', col: 5, row: 3, state: 'done' },
  { id: 'prod', label: 'Production', meta: 'WO-5521 · 64%', col: 6, row: 2, state: 'live' },
  { id: 'qc', label: 'Quality', meta: 'Lot L-0932', col: 7, row: 2, state: 'next' },
  { id: 'fg', label: 'Finished goods', meta: 'FG-A-14', col: 8, row: 2, state: 'next' },
  { id: 'dsp', label: 'Dispatch', meta: '17 Oct', col: 9, row: 2, state: 'next' },
] as const;

export interface View {
  name: string;
  screen: ScreenName;
  title: string;
  body: string;
  alt: string;
}

/** The same business through five sets of eyes. */
export const views: View[] = [
  {
    name: 'Leadership',
    screen: 'overview',
    title: 'The whole business on one screen.',
    body: 'Order book, revenue, delivery and cash, with the orders that need a decision today ranked by risk to the promise date.',
    alt: 'The MAVRO operations overview with key figures, the order pipeline and orders that need attention.',
  },
  {
    name: 'Sales',
    screen: 'sales-order',
    title: 'Answer the customer without calling the plant.',
    body: 'Every order shows how far it has got, what stock is held for it and which documents it has already created.',
    alt: 'A MAVRO sales order with its document flow, fulfilment progress and linked documents.',
  },
  {
    name: 'Production',
    screen: 'production',
    title: 'A schedule that knows what it is for.',
    body: 'Each bar on the machine schedule is a customer order. A breakdown shows which promise dates it puts at risk.',
    alt: 'The MAVRO shop floor screen with shift figures, the machine schedule and a work order in progress.',
  },
  {
    name: 'Stores',
    screen: 'inventory',
    title: 'Stock that says what it is promised to.',
    body: 'On hand, reserved, free and under inspection, per item and per bin, valued at what it actually cost.',
    alt: 'The MAVRO inventory screen with stock value, cover, and stock by item split into free, reserved and in inspection.',
  },
  {
    name: 'Finance',
    screen: 'finance',
    title: 'Numbers that arrive already explained.',
    body: 'Receivables, payables and cash, each figure posted from a dispatch, a receipt or a bank line you can open.',
    alt: 'The MAVRO receivables and cash screen with ageing, weekly cash flow and invoices linked to their dispatches.',
  },
];

export interface Industry {
  name: string;
  record: string;
  trace: string;
  middle: string[];
  fulfil: string;
}

export const industryCore = { start: ['Enquiry', 'Quotation', 'Order'], end: ['Invoice', 'Payment'] };

export const industries: Industry[] = [
  {
    name: 'Manufacturing',
    record: 'Work order',
    trace: 'Lot and heat number',
    middle: ['Planning', 'BOM and routing', 'Production', 'Quality'],
    fulfil: 'Dispatch',
  },
  {
    name: 'Printing and packaging',
    record: 'Job card',
    trace: 'Job and reel',
    middle: ['Artwork approval', 'Prepress', 'Printing', 'Cutting and finishing'],
    fulfil: 'Dispatch',
  },
  {
    name: 'Pharma',
    record: 'Batch record',
    trace: 'Batch and expiry',
    middle: ['Batch planning', 'Dispensing', 'Manufacturing', 'QA release'],
    fulfil: 'Dispatch',
  },
  {
    name: 'Services',
    record: 'Project',
    trace: 'Timesheet and milestone',
    middle: ['Scope', 'Resourcing', 'Delivery', 'Sign-off'],
    fulfil: 'Handover',
  },
  {
    name: 'Distribution',
    record: 'Pick wave',
    trace: 'Batch and serial',
    middle: ['Allocation', 'Picking', 'Packing', 'Ship confirm'],
    fulfil: 'Delivery',
  },
];

export const principles = [
  {
    title: 'Roles decide what each person sees and does.',
    body: 'Access is set per role, down to the action and the figure. A sales executive can raise the quote without seeing its cost.',
  },
  {
    title: 'Every change is recorded.',
    body: 'Who, when, what it was before and what it became. The trail is written by the system, not kept by people.',
  },
  {
    title: 'Each organisation keeps its own data.',
    body: 'Every record belongs to one organisation and every query is scoped to it. Group companies share a platform, not a ledger.',
  },
  {
    title: 'Rules live with the data.',
    body: 'Validation runs where the records are stored, so no screen, import or integration can skip it.',
  },
];
