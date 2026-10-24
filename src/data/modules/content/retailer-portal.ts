import type { ModuleContent } from '../schema';

/*
 * Retailer Portal (tertiary). Source: product deck v2, slides 71–72 (tagline, four tiles, what it does, why it
 * matters, four screens). A retailer-facing ordering app: every screen is what the retailer sees (the partner chrome
 * in prototype/module-shell.js), and the basket builder is shown on the phone. Figures on the tiles come from the
 * screens (prototype/modules/retailer-portal/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'retailer-portal'> = {
  slug: 'retailer-portal',
  tagline: 'Tertiary demand captured at the counter: offers, loyalty and returns in one app.',
  tiles: [
    {
      icon: 'warehouse',
      title: 'Store position',
      body: 'Category purchases, out-of-stock items and reward tier.',
      figure: { value: '2', label: 'items out at the counter, reorder prompted' },
    },
    {
      icon: 'orders',
      title: 'Basket builder',
      body: 'Best-offer engine with stock and substitution.',
      figure: { value: '2%', label: 'best offer picked for the basket' },
    },
    {
      icon: 'claims',
      title: 'Loyalty and returns',
      body: 'Points redemption, expiry and damage returns.',
      figure: { value: '4,820', label: 'reward points, 600 expiring' },
    },
    {
      icon: 'distribution',
      title: 'My orders',
      body: 'Delivery and payment status by distributor.',
      figure: { value: '2.1 days', label: 'average delivery' },
    },
  ],
  what: 'A retailer-facing ordering app that connects the counter to the distributor: purchases by category and reorder prompts for what is running out, a basket builder that picks the best live offer and proposes substitutions on real stock, loyalty points and returns in one queue, and the full order history with delivery and payment status.',
  why: [
    'Tertiary offtake becomes visible data instead of an estimate from the field.',
    'Out-of-stock items prompt a reorder before the counter loses the sale.',
    'The best running offer is applied for the retailer, protecting trade trust.',
    'Substitutions are proposed on stock reality rather than a silent short supply.',
    'Loyalty points and returns settle through the same governed workflow.',
    'The credit period and payment mode are clear before the order is placed.',
  ],
  flow: {
    from: [
      { slug: 'scheme-and-rebate', passes: 'Retailer offers, slabs and loyalty rules' },
      { slug: 'distributor-portal', passes: 'Distributor stock, prices and deliveries' },
      { slug: 'sales-force-automation', passes: 'Orders the field rep takes for the retailer' },
      { slug: 'order-to-cash', passes: 'Invoices, credit terms and payments' },
    ],
    to: [
      { slug: 'distributor-portal', passes: 'Retailer orders to each distributor' },
      { slug: 'scheme-and-rebate', passes: 'Points earned, redeemed and expiring' },
      { slug: 'customer-service', passes: 'Damage and wrong-item returns' },
      { slug: 'data-analytics', passes: 'Tertiary demand by outlet and item' },
    ],
  },
  industries: [
    { slug: 'distribution', note: 'Retailers order from their distributors on an app, with offers and points applied for them.' },
    { slug: 'manufacturing', note: 'Spares counters reorder what they sell, with substitutions proposed on real stock.' },
    { slug: 'pharma', note: 'Near-expiry returns and batch-aware substitutions at the counter, settled in one queue.' },
  ],
  roles: [
    { name: 'Retailers', task: 'Reorder from the counter, take the best offer, and track orders and payments.', works: 'Basket builder' },
    { name: 'Counter staff', task: 'Raise returns with photos or batch labels and check points.', works: 'Loyalty and returns' },
    { name: 'Field reps', task: 'Place orders for retailers who prefer it, on the same record.' },
    { name: 'Trade marketing', task: 'Runs retailer offers and loyalty, and sees what each one lifts.' },
  ],
  related: ['scheme-and-rebate', 'sales-force-automation', 'distributor-portal', 'customer-service'],
  screens: [
    {
      screen: 'retailer-portal/home',
      view: 'Store home',
      title: 'Store home: orders and rewards',
      caption: 'What the retailer sees first: purchases, points, items out at the counter with reorder suggestions, recent orders and offers.',
      alt: 'MAVRO Retailer Portal store home as the retailer sees it: ₹1.38 L bought in October, 4,820 reward points with 600 expiring, two items out at the counter with suggested reorders, recent orders from two distributors with delivery and payment status, and the offers applied (illustrative data).',
    },
    {
      screen: 'retailer-portal/loyalty-returns',
      view: 'Loyalty and returns',
      title: 'Loyalty and returns queue',
      caption: 'Returns for damage, near expiry and wrong items with their outcome, the points statement and ways to use the points.',
      alt: 'MAVRO loyalty and returns from the retailer’s side: three open returns for damaged, near-expiry and wrong items with photos and batch labels, a points statement from brought-forward to balance, and redemption of expiring points (illustrative data).',
    },
    {
      screen: 'retailer-portal/orders',
      view: 'My orders',
      title: 'Tertiary order register',
      caption: 'Every order with each distributor, on the app or by the field rep, with delivery, payment and notes.',
      alt: 'MAVRO retailer order register: 22 orders since April from two distributors, 14 placed on the app and 8 by the field rep, delivered in 2.1 days on average, each with value, delivery, status and payment, and a saved basket (illustrative data).',
    },
  ],
  phone: {
    screen: 'retailer-portal/basket',
    view: 'Basket builder',
    title: 'Basket builder on the phone',
    caption: 'The retailer builds a basket on the phone; the best offer is applied and an out-of-stock kit is swapped for a pack.',
    alt: 'MAVRO retailer app basket: four items from two distributors, one delivered in two lots, a single seal kit swapped for packs at a lower price, a 2% early-payment offer picked as the best, expiring points used, and ₹64,251 to pay (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Ahmedabad Pump Mart (Kankaria; owner Harsh Mehta) on Northfield Precision’s retailer app, 8 Oct, 14:02. Buys from Navrangpura Distributors and Changodar Industrial; field rep Meera Kapoor (SO-S-2281, ₹1,18,000 today). October ₹1.38 L; due ₹84,200; Gold, 4,820 points, 600 expiring 31 Oct. Out at the counter: IH-220 and the single SK-22 kit. Basket at 14:20: ₹55,820 of items, 2% early-payment offer, SK-22 swapped for packs, IH-220 in two lots, ₹64,251 to pay. 22 orders since April, ₹8.36 L delivered.',
  faq: [
    {
      q: 'What does the Retailer Portal in MAVRO do?',
      a: 'The MAVRO Retailer Portal is an ordering app for retailers. They see what they bought and what is running out at the counter, build baskets where the best live offer is applied and out-of-stock items get a substitute, collect and redeem loyalty points, return damaged or near-expiry items, and track every order’s delivery and payment.',
    },
    {
      q: 'How does MAVRO pick the best offer for a retailer?',
      a: 'When a retailer builds a basket, MAVRO checks every offer running for that retailer, such as volume slabs, early-payment discounts and points, against the basket and applies the one worth most. If a slab is close, it shows how much more would reach it, so the retailer decides with the numbers in front of them.',
    },
    {
      q: 'What happens when an item is out of stock at the distributor?',
      a: 'MAVRO checks the distributor’s stock as the basket is built. If an item is short, it offers what is available now with the rest on the next delivery date, or proposes a substitute such as a different pack of the same item, instead of the order being short-supplied without notice.',
    },
    {
      q: 'Can retailers use MAVRO on a phone?',
      a: 'Yes. The Retailer Portal works on the phone and on the web. Retailers can build and place orders, apply points, raise returns with photos and see delivery and payment status from the counter, and orders placed by their field rep appear in the same history.',
    },
  ],
  seo: {
    title: 'Retailer ordering app with offers, loyalty and returns | MAVRO Retailer Portal',
    description:
      'MAVRO Retailer Portal: a retailer ordering app with reorder prompts, a best-offer basket builder with substitutions on real stock, loyalty points and returns in one queue, and order and payment status by distributor.',
  },
};
