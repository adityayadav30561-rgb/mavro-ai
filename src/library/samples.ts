/*
 * Sample data for the section library (/_library, dev only). Taken from the decks (slide numbers noted) or from
 * the homepage data, so every block is shown with real content; figures on the tiles come from the O2C
 * prototype screen (illustrative, as all screen data is).
 */
import type { CapabilityTile } from '../blocks/CapabilityTiles';
import type { FlowStage } from '../blocks/FlowStrip';
import type { ModuleCard } from '../blocks/ModuleCards';
import type { TourScreen } from '../blocks/ScreenTour';
import { industries } from '../data/home';
import { contentFor, moduleById } from '../data/modules';

/** Product deck slide 34: Order to Cash. */
export const o2c = {
  name: 'Order to Cash',
  tagline: 'Order capture to collection: credit-safe, batch-accurate revenue operations.',
  tiles: [
    { icon: 'orders', title: 'Order book health', body: 'Channel-wise open orders, fill rate and DSO.', figure: { value: '₹4.86 Cr', label: 'open orders' } },
    { icon: 'shield', title: 'Credit and exposure', body: 'Limit breaches held before allocation.', figure: { value: '3', label: 'on credit hold' } },
    { icon: 'inventory', title: 'Batch allocation', body: 'FEFO and shelf-life rules on every order line.' },
    { icon: 'finance', title: 'Dunning engine', body: 'Ageing-driven reminders, escalation and hold.', figure: { value: '₹12.4 L', label: 'overdue' } },
  ] satisfies CapabilityTile[],
  what: {
    title: 'What it does',
    body: 'Commercial order to cash: channel order book health, pricing and scheme validation, credit exposure checks, batch and shelf-life aware allocation, GST-compliant invoicing, and an ageing-driven collections and dunning queue.',
  },
  why: {
    title: 'Why it matters',
    points: [
      'Overdue receivables are visible by ageing bucket with an owner per account.',
      'Credit-blocked orders route to the right releaser instead of stalling.',
      'Shelf-life failures are caught at allocation, not at the distributor dock.',
      'Fill rate and short supply trace back to depot ATP, SKU by SKU.',
      'GST e-invoice and place-of-supply eligibility checked before posting.',
      'Collections MTD and DSO sit on the same screen as the order book.',
    ],
  },
  tour: [
    { screen: 'o2c', title: 'Order book', caption: 'Open orders by channel with credit holds and dispatch dates, so the day starts from what is stuck.', alt: 'MAVRO Order to Cash order book: open order value, orders on credit hold, dispatches this week and overdue receivables, with the order list below (illustrative data).' },
    { screen: 'sales-order', title: 'Order, credit and allocation', caption: 'One order from capture to dispatch: the credit check, the allocated lots and the documents it produced.', alt: 'MAVRO sales order SO-24817 for Kestrel Pumps with its credit check, allocation and linked documents (illustrative data).' },
    { screen: 'finance', title: 'Collections and dunning', caption: 'Receivables by ageing bucket with an owner per account, and the reminders already sent.', alt: 'MAVRO finance view of receivables by ageing bucket with collections status (illustrative data).' },
  ] satisfies TourScreen[],
};

/** Who uses Order to Cash: its industries and roles (src/data/modules/content/order-to-cash.ts). */
const o2cContent = contentFor('order-to-cash')!;
export const audience = {
  industries: o2cContent.industries.map((use) => {
    const industry = industries.list.find((item) => item.slug === use.slug)!;
    return { name: industry.name, icon: industry.icon, note: use.note, href: `/#industry-${industry.slug}` };
  }),
  roles: o2cContent.roles,
  labels: { industries: 'Industries', roles: 'Roles' },
};

const node = (id: string, kind?: 'current') => {
  const module = moduleById(id);
  return { name: module.name, icon: module.icon, href: kind ? null : '/#explore', kind };
};

/** SITE-PLAN 3.1: O2C takes CRM and SFA in; feeds Inventory, dispatch (Transportation) and Accounting. */
export const sits: FlowStage[] = [
  { label: 'Feeds it', nodes: [node('crm'), node('sfa')] },
  { label: 'This module', nodes: [node('o2c', 'current')] },
  { label: 'It feeds', nodes: [node('inv'), node('tms'), node('acc')] },
];

const manufacturing = industries.list[0];
export const chain: FlowStage[] = [
  ...industries.core.start.map((name) => ({ nodes: [{ name, kind: 'shared' as const }] })),
  ...manufacturing.middle.map((name) => ({ nodes: [{ name, kind: 'configured' as const }] })),
  { nodes: [{ name: manufacturing.fulfil, kind: 'configured' as const }] },
  ...industries.core.end.map((name) => ({ nodes: [{ name, kind: 'shared' as const }] })),
];

const card = (id: string, screen?: ModuleCard['screen']): ModuleCard => {
  const module = moduleById(id);
  return { name: module.name, summary: module.summary, icon: module.icon, tier: module.pack, href: '/#explore', screen, alt: '' };
};

export const cards: ModuleCard[] = [
  card('acc', 'accounting'),
  card('p2p', 'purchase-order'),
  card('inv', 'stock-item'),
  card('prd', 'work-order'),
  { ...card('tms'), href: null },
  { ...card('snr'), href: null },
];

/** Connectivity deck slide 6: problems MAVRO solves. */
export const beforeAfter = {
  before: 'Today, native ERP only',
  after: 'After MAVRO',
  rows: [
    { before: 'Every ERP user needs a paid named licence', after: 'Occasional users on MAVRO; ERP seats for core users' },
    { before: 'Complex screens and long user training', after: 'Simple role-based screens, minimal training' },
    { before: 'Every process change is costly ERP development', after: 'Boutique workflows configured in MAVRO' },
    { before: 'ERP access limited to the office desktop', after: 'Native Android and iOS app with offline sync' },
    { before: 'Data split across SAP, Oracle, Tally and legacy tools', after: 'One MAVRO Database, synced with every ERP' },
    { before: 'Customisations put ERP upgrades at risk', after: 'ERP core untouched: clean, safe upgrades' },
  ],
};

/** Product deck slide 26: implementation risks and mitigation (first four). */
export const risks = {
  caption: 'Implementation risks, their impact, mitigation and owner',
  columns: [
    { key: 'risk', label: 'Risk' },
    { key: 'impact', label: 'Impact' },
    { key: 'mitigation', label: 'Mitigation' },
    { key: 'owner', label: 'Owner' },
  ],
  rows: [
    { risk: 'Poor master data quality', impact: { level: 'high', text: 'High' }, mitigation: 'Data cleansing workshop in month 1; trial migration before go-live', owner: 'Client IT' },
    { risk: 'User adoption resistance', impact: { level: 'high', text: 'High' }, mitigation: 'Department champions appointed; in-person training on site', owner: 'Joint' },
    { risk: 'Legacy data migration issues', impact: { level: 'medium', text: 'Medium' }, mitigation: 'Trial migration in month 1; exceptions handled before cutover', owner: 'SaiSatwik' },
    { risk: 'Integration delays', impact: { level: 'low', text: 'Low' }, mitigation: 'Clean cutover assumed; parallel-run buffer built in', owner: 'SaiSatwik' },
  ],
} as const;
