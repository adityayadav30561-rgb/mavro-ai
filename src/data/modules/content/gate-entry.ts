import type { ModuleContent } from '../schema';

/*
 * Gate Entry. Source: product deck v2, slides 54–55 (tagline, four tiles, what it does, why it matters, four
 * screens), written for every industry; the deck's cold-chain and hygiene checks are kept for pharma. Figures on the
 * tiles come from the module's screens (prototype/modules/gate-entry/), whose scenario is below; like all screen
 * data they are illustrative.
 */
export const content: ModuleContent<'gate-entry'> = {
  slug: 'gate-entry',
  tagline: 'Gate in to gate out: every vehicle, document and dock movement on record.',
  tiles: [
    {
      icon: 'gate',
      title: 'Gate and dock load',
      body: 'Movements, turnaround time and vehicles waiting.',
      figure: { value: '1 h 48 m', label: 'average turnaround today' },
    },
    {
      icon: 'receipt',
      title: 'Gate register',
      body: 'Vehicle, driver, party and purpose per gate pass.',
      figure: { value: '47', label: 'gate passes today' },
    },
    {
      icon: 'transport',
      title: 'Vehicle clearance',
      body: 'Weighbridge, documents and dock allocation.',
      figure: { value: '40 kg', label: 'short, caught before unloading' },
    },
    {
      icon: 'shield',
      title: 'Security exceptions',
      body: 'Mismatches, expired passes and seal breaches.',
      figure: { value: '5', label: 'open, each escalated by name' },
    },
  ],
  what: 'Access and yard control at the plant boundary: gate and dock load with turnaround time; clearance for each vehicle covering driver verification, the invoice and e-way bill matched to the order, weighbridge capture, vehicle checks and dock allocation; and a security exception queue for document mismatches, expired passes and seal breaches.',
  why: [
    'Invoice, e-way bill and weighbridge figures must agree before unloading.',
    'Vehicles idling in the yard are visible with the dock that is blocking them.',
    'Expired contractor gate passes stop entry instead of being waved through.',
    'Cold-chain vehicles are flagged when reefer logs or idle time breach limits.',
    'Tampered seals and unauthorised exits are logged and escalated by name.',
    'Detention and turnaround disputes are settled from the gate record.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Expected arrivals against open POs' },
      { slug: 'order-to-cash', passes: 'Dispatches cleared to leave' },
      { slug: 'vendor-portal', passes: 'Shipment notices before the truck arrives' },
      { slug: 'contract-labour-supply', passes: 'Contract workers and their pass validity' },
    ],
    to: [
      { slug: 'inventory-management', passes: 'Vehicles cleared to unload' },
      { slug: 'procure-to-pay', passes: 'Weight and document mismatches to the buyer' },
      { slug: 'vendor-invoice-management', passes: 'The gate record behind every receipt' },
      { slug: 'transportation-management', passes: 'Turnaround and detention times' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Inward material weighed and matched to its PO before unloading; dispatches sealed and recorded.' },
    { slug: 'distribution', note: 'Dock turnaround at depots tracked, and detention claims settled from the gate record.' },
    { slug: 'pharma', note: 'Cold-chain vehicles flagged on reefer logs or idle time, with hygiene checks before unloading.' },
    { slug: 'service-providers', note: 'Visitors, contractors and equipment recorded in and out at every office and site.' },
  ],
  roles: [
    { name: 'Gate officers', task: 'Check the driver, documents and vehicle on the phone and issue the gate pass.', works: 'Gate passes' },
    { name: 'Security supervisor', task: 'Watches the yard and docks and clears exceptions with the people responsible.', works: 'Security exceptions' },
    { name: 'Dock and stores in-charge', task: 'Allocates docks and unloads or loads against the gate pass.', works: 'Dock schedule' },
    { name: 'Buyers', task: 'Decide what happens when weight or documents do not agree with the order.', works: 'Vehicle clearance' },
    { name: 'Logistics', task: 'Settle detention and turnaround questions with transporters.', works: 'Gate register' },
  ],
  related: ['procure-to-pay', 'inventory-management', 'vendor-invoice-management', 'order-to-cash'],
  screens: [
    {
      screen: 'gate-entry/gate-dock',
      view: 'Gate and dock load',
      title: 'Gate movements and dock load',
      caption: 'Every dock and the vehicle at it, the vehicles waiting at the gate, movements by hour and the open security exceptions.',
      alt: 'MAVRO Gate Entry dashboard: 39 vehicle movements today, average turnaround of 1 h 48 m, three vehicles waiting at the gate, six docks with one blocked by a vehicle idle for over three hours, movements by hour and five open security exceptions (illustrative data).',
    },
    {
      screen: 'gate-entry/vehicle-clearance',
      view: 'Vehicle clearance',
      title: 'Vehicle detail: weighbridge and documents',
      caption: 'One vehicle from gate to dock: the order, invoice, e-way bill and weighbridge compared, the checks before unloading and the buyer’s decision on a shortfall.',
      alt: 'MAVRO vehicle clearance for gate pass GP-3184: purchase order, invoice, e-way bill and weighbridge compared for 6,240 kg of steel bar, a net weight 40 kg short and over tolerance, the buyer’s decision to unload at the weighed net, driver verification and the dock allocation (illustrative data).',
    },
    {
      screen: 'gate-entry/security-exceptions',
      view: 'Security exceptions',
      title: 'Security exception queue',
      caption: 'Weight and document mismatches, expired passes, idle vehicles and seal breaches, each with the person it is escalated to.',
      alt: 'MAVRO security exception queue: five open exceptions including a weight shortfall, an expired contract worker pass, scrap leaving without a gate pass and a seal number that differs from the invoice, with the escalation trail of the seal breach (illustrative data).',
    },
    {
      screen: 'gate-entry/gate-register',
      view: 'Gate register',
      title: 'Gate entry register',
      caption: 'Every gate pass of the day with times in and out, vehicle and driver, party, document, dock, weight and time inside.',
      alt: 'MAVRO gate register for the day: 47 gate passes, each with time in and out, vehicle and driver, party, purpose, purchase or sales order, dock, net weight, time inside and status (illustrative data).',
    },
  ],
  phone: {
    screen: 'gate-entry/gate-check',
    view: 'Gate passes',
    title: 'Gate check',
    caption: 'The gate officer verifies the driver, invoice, e-way bill and vehicle on the phone, takes photos and lets the vehicle in.',
    alt: 'MAVRO phone app: a gate officer’s check of an inward vehicle with the driving licence, invoice, e-way bill and vehicle condition verified, four photos and a note that the assigned dock is blocked (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, Plant 1 main gate, 8 Oct, 14:02. 39 vehicle movements (24 in, 15 out), 9 in the yard, 3 waiting, average turnaround 1 h 48 m. GP-3184 Kaveri Steel Traders (PO-7719, 6,240 kg EN8 bar) weighed 6,200 kg net: 40 kg short, over the 0.5% tolerance; unloading at the weighed net. GP-3168 idle 3 h 10 m at D3, so GP-3189 waits. Five security exceptions open, including the seal mismatch on Sharda Bearings’ 6 Oct delivery.',
  faq: [
    {
      q: 'What does Gate Entry in MAVRO do?',
      a: 'MAVRO Gate Entry controls every movement through the plant gate. It issues gate passes for vehicles, visitors and contractors, checks the driver, invoice and e-way bill against the order, captures weighbridge weights, allocates docks, measures turnaround, and raises security exceptions for mismatches, expired passes and seal breaches.',
    },
    {
      q: 'Does MAVRO Gate Entry work with a weighbridge?',
      a: 'Yes. MAVRO Gate Entry integrates with the weighbridge, records gross and tare weights on the gate pass and compares the net weight with the invoice and e-way bill. A difference beyond your tolerance raises an exception to the buyer before the vehicle is unloaded.',
    },
    {
      q: 'Can MAVRO stop contractors with expired gate passes?',
      a: 'Yes. MAVRO checks every contractor and visitor pass at entry. An expired pass stops entry and raises an exception to the person responsible for the contractor, instead of relying on the guard to notice, and returnable material passes are tracked until the goods come back.',
    },
    {
      q: 'How does MAVRO help settle detention and turnaround disputes?',
      a: 'MAVRO records when each vehicle arrived, was weighed, reached and left the dock and went out, with the gate officer, photos and weighbridge tickets. Turnaround, waiting time and the dock that held a vehicle come from that record, so detention claims are settled on facts.',
    },
  ],
  seo: {
    title: 'Gate entry software: gate pass, weighbridge, dock control | MAVRO',
    description:
      'MAVRO Gate Entry: vehicle and visitor gate passes, invoice and e-way bill checks against the order, weighbridge integration, dock allocation and turnaround, and a security exception queue.',
  },
};
