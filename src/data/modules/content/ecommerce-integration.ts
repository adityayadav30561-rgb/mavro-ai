import type { ModuleContent } from '../schema';

/*
 * Ecommerce Integration. Source: product deck v2, slides 82–83 (tagline, four tiles, what it does, why it matters,
 * four screens). The deck names marketplaces, quick commerce, D2C and B2B; the screens show the four channels the
 * scenario's seller uses. Figures on the tiles come from the module's screens
 * (prototype/modules/ecommerce-integration/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'ecommerce-integration'> = {
  slug: 'ecommerce-integration',
  tagline: 'Every channel, one order feed, buffer-protected inventory: zero oversells.',
  tiles: [
    {
      icon: 'orders',
      title: 'Unified order feed',
      body: 'Marketplaces, quick commerce, D2C and B2B in one queue.',
      figure: { value: '312', label: 'orders today from four channels' },
    },
    {
      icon: 'inventory',
      title: 'Inventory sync',
      body: '10-minute pushes with run-rate buffers.',
      figure: { value: '7', label: 'listings paused at their buffer, none oversold' },
    },
    {
      icon: 'link',
      title: 'Connector health',
      body: 'API status, retry queues and error logs.',
      figure: { value: '23', label: 'acknowledgements queued in an outage, none lost' },
    },
    {
      icon: 'finance',
      title: 'Settlement reconciliation',
      body: 'Payouts matched to orders, daily.',
      figure: { value: '₹6,982', label: 'short on one payout, found and disputed' },
    },
  ],
  what: 'A single integration layer for every online channel: orders from marketplaces, quick commerce, D2C stores and B2B portals ingested into one feed and routed to the nearest fulfilment centre with stock, inventory pushed to each channel under its own buffer rule, and connectors monitored with retry queues, alongside daily settlement reconciliation and return-to-origin tracking.',
  why: [
    'Oversell risk is eliminated: listings pause by themselves when buffers are hit.',
    'Channel outages degrade gracefully: orders queue and are never lost.',
    'MAP and price violations are flagged before margins erode.',
    'RTO patterns are spotted early, including COD abuse and problem items.',
    'One operations team runs every channel instead of one tool per channel.',
    'Marketplace settlements are reconciled to the rupee, daily.',
  ],
  flow: {
    from: [
      { slug: 'warehouse-management', passes: 'Free stock per fulfilment centre' },
      { slug: 'master-data-management', passes: 'Items, prices and listing content' },
      { slug: 'scheme-and-rebate', passes: 'Channel offers and price rules' },
    ],
    to: [
      { slug: 'warehouse-management', passes: 'Orders to pick at the nearest centre' },
      { slug: 'order-to-cash', passes: 'Online orders, invoices and refunds' },
      { slug: 'accounting', passes: 'Payouts, fees and disputed amounts' },
      { slug: 'customer-service', passes: 'Returns and delivery complaints' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Spares, kits and accessories sold online, fulfilled from the same warehouses as the trade business.' },
    { slug: 'distribution', note: 'Brands selling across marketplaces, quick commerce and their own store, with stock buffered per channel.' },
  ],
  roles: [
    { name: 'Ecommerce manager', task: 'Runs every channel from one dashboard and acts on outages, paused listings and price issues.', works: 'Channel dashboard' },
    { name: 'Order operations', task: 'Works the single order feed, confirms risky COD orders and releases orders to picking.', works: 'Order feed' },
    { name: 'Catalogue team', task: 'Keeps listings, prices and buffers right on every channel.', works: 'Listings and sync' },
    { name: 'IT and integrations', task: 'Watches connector health, queues and the error log.', works: 'Connectors' },
    { name: 'Finance', task: 'Reconciles marketplace payouts to orders and files disputes with the evidence.', works: 'Settlements' },
  ],
  related: ['order-to-cash', 'warehouse-management', 'customer-service', 'scheme-and-rebate'],
  screens: [
    {
      screen: 'ecommerce-integration/channel-dashboard',
      view: 'Channel dashboard',
      title: 'Channel dashboard',
      caption: 'Every channel’s orders, listings, connector health, returns and payouts, and the issues that need attention.',
      alt: 'MAVRO Ecommerce Integration channel dashboard: 312 orders today across two marketplaces, a B2B marketplace and a D2C store, 205 of 212 listings live with 7 paused at their buffer, orders routed to three fulfilment centres, one connector with API errors and a payout ₹6,982 short (illustrative data).',
    },
    {
      screen: 'ecommerce-integration/order-feed',
      view: 'Order feed',
      title: 'Unified order feed',
      caption: 'Orders from every channel in one queue with the fulfilment centre chosen, payment type and status, including those waiting on a channel.',
      alt: 'MAVRO unified order feed: online orders from four channels with channel order number, ship-to pincode, items, value, prepaid, COD or credit, the nearest fulfilment centre and status, including orders whose acknowledgement is queued and a COD order held for a confirmation call (illustrative data).',
    },
    {
      screen: 'ecommerce-integration/listings-sync',
      view: 'Listings and sync',
      title: 'Listings and inventory sync',
      caption: 'Free stock less each channel’s run-rate buffer, what each channel shows, the listings paused and the sellers under MAP.',
      alt: 'MAVRO listings and inventory sync: items with free stock and daily sales, the quantity each of four channels shows or paused at its buffer, the next stock due, buffer rules per channel, the sync log and three sellers listing under the minimum advertised price (illustrative data).',
    },
    {
      screen: 'ecommerce-integration/connector-detail',
      view: 'Connectors',
      title: 'Connector detail',
      caption: 'One marketplace connector during an outage: calls by hour, what is queued, the error log and what happens next.',
      alt: 'MAVRO connector detail for a marketplace in a partial outage: API success at 62% in the last hour, orders still arriving by webhook, 23 acknowledgements and 6 shipment confirmations queued, the error log with 503 and 429 responses, and the retry and alert policy (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision sells pump spares online as Northfield Spares, 8 Oct, 14:02. 312 orders today, ₹4.86 L: Marketplace A 146, Marketplace B 92, B2B marketplace 48, D2C store 26; routed to Plant 1 (188), the Ahmedabad depot (96) and Chennai (28). 205 of 212 listings live; 7 paused at their run-rate buffer (MS-25, IM-180, SV-220). Marketplace B’s API fails from 12:40: 23 acknowledgements queued, none lost. Marketplace A’s 7 Oct payout ₹6,982 short. Three sellers under the SK-22 MAP of ₹549.',
  faq: [
    {
      q: 'What does Ecommerce Integration in MAVRO do?',
      a: 'MAVRO Ecommerce Integration connects marketplaces, quick commerce, B2B portals and your own store to one order feed. It routes each order to the nearest fulfilment centre with stock, pushes inventory to every channel under buffer rules, monitors each connector and reconciles marketplace payouts to orders daily.',
    },
    {
      q: 'How does MAVRO prevent overselling on marketplaces?',
      a: 'MAVRO pushes free stock from the warehouse to each channel every 10 minutes, less a buffer based on that item’s rate of sale. When free stock falls to the buffer, the listing pauses by itself on that channel and resumes when stock returns, so orders are never taken for stock you do not have.',
    },
    {
      q: 'What happens to orders if a marketplace API goes down?',
      a: 'Orders keep arriving by webhook, and anything MAVRO cannot send back, such as acknowledgements, shipment confirmations and stock updates, waits in a retry queue with back-off. Picking carries on, nothing is lost, and the team is alerted before the marketplace’s acknowledgement deadline.',
    },
    {
      q: 'Can MAVRO reconcile marketplace settlements?',
      a: 'Yes. MAVRO matches each marketplace payout to its orders, commissions, fees and returns, and lists every difference, such as commission charged at the wrong rate, returns deducted but not received or orders missing from the payout, so disputes are filed with the evidence.',
    },
  ],
  seo: {
    title: 'Ecommerce integration for marketplaces, D2C and B2B | MAVRO',
    description:
      'MAVRO Ecommerce Integration: one order feed from marketplaces, quick commerce, D2C and B2B, inventory sync with run-rate buffers, connector health with retry queues, MAP watch and daily settlement reconciliation.',
  },
};
