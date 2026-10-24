import type { ModuleContent } from '../schema';

/*
 * Fleet Management. Source: product deck v2, slides 94–95 (tagline, four tiles, what it does, why it matters, four
 * screens), with the TMS deck's fleet, driver, FASTag and vehicle-document checks. The deck's reefer telemetry is
 * kept for pharma and cold-chain fleets. Figures on the tiles come from the module's screens
 * (prototype/modules/fleet-management/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'fleet-management'> = {
  slug: 'fleet-management',
  tagline: 'Live GPS, maintenance planning and per-km economics in one control room.',
  tiles: [
    {
      icon: 'dispatch',
      title: 'Live trip tracking',
      body: 'GPS and reefer temperature telemetry on every trip.',
      figure: { value: '21', label: 'vehicles on trip, live on GPS' },
    },
    {
      icon: 'wrench',
      title: 'Maintenance planner',
      body: 'Bay-wise weekly plan, parts and overdue jobs.',
      figure: { value: '88%', label: 'preventive jobs on time' },
    },
    {
      icon: 'shield',
      title: 'Document watch',
      body: 'Fitness, permit and insurance expiry alerts.',
      figure: { value: '1', label: 'vehicle blocked on a lapsed PUC' },
    },
    {
      icon: 'finance',
      title: 'Cost per km',
      body: 'Fuel, mileage and running cost per vehicle.',
      figure: { value: '₹27.4', label: 'a km across the fleet in October' },
    },
  ],
  what: 'End-to-end fleet operations: live trips with GPS and cold-chain telemetry, a complete vehicle register with statutory documents, a workshop-bay maintenance planner, and vehicle-level cost and driver analytics. Fuel, FASTag tolls, driver costs and job cards roll up into the running cost of each vehicle, so own-fleet economics can be compared with market vehicles lane by lane.',
  why: [
    'Cold-chain excursions are alarmed within minutes, so batches are saved and claims avoided.',
    'Preventive maintenance planning cuts breakdown spend.',
    'Driver safety scores and coaching flags reduce incidents.',
    'Cost per km trends expose vehicles that should be retired or replaced.',
    'No vehicle runs on an expired fitness certificate, permit or insurance.',
    'Own-fleet and market-vehicle economics are compared per lane.',
  ],
  flow: {
    from: [
      { slug: 'transportation-management', passes: 'Trips assigned to own vehicles' },
      { slug: 'gate-entry', passes: 'Gate-in and gate-out times per trip' },
      { slug: 'hrms-and-payroll', passes: 'Drivers, licences and duty hours' },
      { slug: 'inventory-management', passes: 'Spare parts, tyres and batteries' },
    ],
    to: [
      { slug: 'transportation-management', passes: 'Own-fleet cost per lane for allocation' },
      { slug: 'asset-management', passes: 'Vehicles as assets: book value, replacement' },
      { slug: 'accounting', passes: 'Running costs by vehicle and cost centre' },
      { slug: 'procure-to-pay', passes: 'Parts and services ordered for job cards' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Own trucks for depot transfers, vendor milk runs and local deliveries, costed per km against hired vehicles.' },
    { slug: 'distribution', note: 'Delivery vans and trucks at each depot, with document watch and driver scores across the network.' },
    { slug: 'pharma', note: 'Reefer vehicles with temperature telemetry on every trip and excursions alarmed within minutes.' },
  ],
  roles: [
    { name: 'Fleet manager', task: 'Watches trips, documents and running cost, and decides which vehicles to keep or replace.', works: 'Fleet dashboard' },
    { name: 'Workshop supervisor', task: 'Plans the bays for the week, raises job cards and chases parts.', works: 'Maintenance planner' },
    { name: 'Drivers', task: 'Record trip events, fuel and expenses on the driver app.', works: 'Live trips' },
    { name: 'Transport planners', task: 'Assign own vehicles where they cost less than the market.', works: 'Vehicle register' },
    { name: 'Finance', task: 'Sees running cost per vehicle and per cost centre without collecting bills.', works: 'Cost per km' },
  ],
  related: ['transportation-management', 'asset-management', 'gate-entry', 'warehouse-management'],
  screens: [
    {
      screen: 'fleet-management/fleet-dashboard',
      view: 'Fleet dashboard',
      title: 'Fleet dashboard',
      caption: 'Every vehicle by base and state, live trips with their flags, documents coming due and the cost per km by class.',
      alt: 'MAVRO Fleet Management dashboard: 21 of 32 vehicles on trip, 3 in the workshop and 8 at base across three sites, 34 trips today, ₹27.4 a km in October, one vehicle blocked on a lapsed PUC, live trips with driver coaching flags, cost per km by vehicle class and own fleet against market trucks per lane (illustrative data).',
    },
    {
      screen: 'fleet-management/vehicle-register',
      view: 'Vehicle register',
      title: 'Vehicle register',
      caption: 'Each vehicle with its class, base, status, driver, odometer, fitness, insurance, permit and PUC, and its running cost.',
      alt: 'MAVRO vehicle register: own vehicles with registration, class and base, trip or workshop status, driver, odometer, fitness, insurance, permit and PUC expiry with the ones due highlighted, one blocked on an expired PUC, and the October cost per km of each (illustrative data).',
    },
    {
      screen: 'fleet-management/maintenance-planner',
      view: 'Maintenance planner',
      title: 'Maintenance planner',
      caption: 'The workshop’s week bay by bay, jobs waiting for parts, overdue services booked and preventive against breakdown spend.',
      alt: 'MAVRO maintenance planner for the week of 6 October: three workshop bays with done, in-bay, waiting-for-parts and planned job cards, 88% of preventive jobs on time, three overdue services booked, parts for the week and preventive spend rising while breakdown spend falls (illustrative data).',
    },
    {
      screen: 'fleet-management/vehicle-360',
      view: 'Vehicle 360',
      title: 'Vehicle 360° detail',
      caption: 'One vehicle’s live trip, cost per km against its class, where each rupee goes, its documents, its driver and the case for replacing it.',
      alt: 'MAVRO Vehicle 360 for a 32 ft truck: on a live trip at 414 of 662 km, ₹47.9 a km against a ₹42.5 class average and rising for six months, fuel economy 10% under norm, maintenance twice the class average, the cost split by diesel, driver, maintenance, tolls and tyres, document expiries and the driver’s safety score (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision’s own fleet, 8 Oct, 14:02. 32 vehicles (Plant 1 18, Ahmedabad depot 6, Chennai plant 8): 21 on trip, 3 in the Plant 1 workshop, 8 at base; V-29 blocked on a PUC that expired 6 Oct. October to date 41,860 km for ₹11.47 L, ₹27.4 a km. Documents due in 30 days: V-09 insurance 19 Oct, V-15 permit 28 Oct, V-12 fitness 1 Nov, V-21 fitness 4 Nov. Preventive maintenance on time 88%. V-12 (32 ft, 2017) runs at ₹47.9 a km against ₹42.5 for its class, on TRP-0421 to the Ahmedabad depot.',
  faq: [
    {
      q: 'What does Fleet Management in MAVRO do?',
      a: 'MAVRO Fleet Management runs your own vehicles: live trips on GPS with temperature telemetry where the cargo needs it, a vehicle register with every statutory document, a workshop maintenance planner with job cards and parts, and the running cost of each vehicle per km from fuel, tolls, drivers and maintenance.',
    },
    {
      q: 'Does MAVRO stop vehicles with expired documents from being used?',
      a: 'Yes. MAVRO tracks fitness, permit, insurance and PUC for every vehicle and alerts before each expires. A vehicle with a lapsed document is blocked from trip assignment until it is renewed, and driver licences are checked the same way.',
    },
    {
      q: 'How does MAVRO calculate cost per km for each vehicle?',
      a: 'MAVRO adds each vehicle’s diesel from fuel entries, FASTag tolls, driver costs, job cards, tyres and other running expenses, and divides by the kilometres from GPS and trip sheets. Trends by vehicle and class show which vehicles cost more than their class and should be replaced.',
    },
    {
      q: 'Can MAVRO compare our own fleet with hired transporters?',
      a: 'Yes. Because own-fleet costs and contracted freight rates sit on the same platform, MAVRO compares the cost of a delivered load on your vehicle with the market rate for each lane, including empty return legs, so planners use own vehicles where they are cheaper.',
    },
  ],
  seo: {
    title: 'Fleet management software: GPS, maintenance, cost per km | MAVRO',
    description:
      'MAVRO Fleet Management: live trip tracking with GPS and reefer telemetry, a vehicle register with fitness, permit and insurance alerts, a workshop maintenance planner, driver scores and cost per km per vehicle.',
  },
};
