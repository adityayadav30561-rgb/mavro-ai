import type { ModuleContent } from '../schema';

/*
 * FSC Portal: forest certification (FSC chain of custody) and EUDR due diligence. Source: product deck v2, slide 10
 * (GPS polygon plot mapping, chain-of-custody traceability, EUDR due-diligence statements) and the slide 23 customer
 * story (plot registry replacing paper logs, offline harvest logging). The slide 84 appendix describes a different
 * portal under the same name and is not used (user, 2026-10-26; DECISIONS.md). There is no detail slide, so tiles,
 * "why it matters" and screens follow standard FSC and EUDR practice. The screens use their own company, a wood
 * component exporter; figures on the tiles come from them and, like all screen data, are illustrative.
 */
export const content: ModuleContent<'fsc-portal'> = {
  slug: 'fsc-portal',
  tagline: 'Every shipment traced to its plot: GPS plot mapping, chain of custody and EUDR due diligence.',
  tiles: [
    {
      icon: 'pin',
      title: 'GPS plot registry',
      body: 'Polygons for every plot, checked against the deforestation cut-off.',
      figure: { value: '1,426', label: 'plots mapped, 7 flagged and kept out' },
    },
    {
      icon: 'phone',
      title: 'Offline harvest logging',
      body: 'Logged at the plot on a phone, synced when there is signal.',
      figure: { value: '1,184', label: 'harvest logs this month' },
    },
    {
      icon: 'link',
      title: 'Chain of custody',
      body: 'Plot to harvest to lot to container, with the volume balance.',
      figure: { value: '212', label: 'plots behind one container, unbroken' },
    },
    {
      icon: 'receipt',
      title: 'EUDR statements',
      body: 'The due-diligence package assembled for each shipment.',
      figure: { value: '8', label: 'risk checks with evidence per shipment' },
    },
  ],
  what: 'Traceability for wood and other forest products, from the plot to the shipment: a registry of every supplying plot with GPS polygons checked against the EU deforestation cut-off, harvest logged offline at the plot, an unbroken chain of custody through log receipts, sawmill lots and finished batches with a volume balance behind every FSC claim, and an EUDR due-diligence package assembled for each shipment.',
  why: [
    'Plots with tree-cover loss after the cut-off are flagged and kept out of every lot.',
    'Plot records live in one registry instead of paper logs and spreadsheets.',
    'Field teams log harvests offline, so remote plots are recorded at the source.',
    'FSC claims on invoices are backed by the certified share of each lot’s input.',
    'Due-diligence packages are assembled from records, not chased before each shipment.',
    'A missing permit or declaration is caught before the container ships.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Purchases of logs from growers and estates' },
      { slug: 'gate-entry', passes: 'Log receipts with transit passes' },
      { slug: 'vendor-portal', passes: 'Supplier declarations and documents' },
    ],
    to: [
      { slug: 'production-management', passes: 'Lots cleared for the sawmill and plant' },
      { slug: 'order-to-cash', passes: 'FSC claims on export invoices' },
      { slug: 'transportation-management', passes: 'Containers cleared to ship' },
      { slug: 'document-management', passes: 'Certificates, permits and statements' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Furniture, components, paper and packaging made from certified wood, with every export traced to its plots.' },
    { slug: 'distribution', note: 'Traders and exporters buying from many growers, with plot evidence ready for each buyer in the EU.' },
  ],
  roles: [
    { name: 'Traceability manager', task: 'Keeps the plot registry clean and the chain of custody unbroken for every lot.', works: 'Chain of custody' },
    { name: 'Field officers', task: 'Map plots and log harvests at the plot on a phone, online or not.', works: 'Harvest logs' },
    { name: 'Export team', task: 'Sends each buyer the due-diligence package before the container ships.', works: 'EUDR statements' },
    { name: 'Sawmill supervisors', task: 'Receive logs against transit passes and build lots that stay traceable.', works: 'Lots' },
    { name: 'Certification lead', task: 'Keeps FSC certificates and claims in line with the certified input.', works: 'Certificates' },
  ],
  related: ['procure-to-pay', 'vendor-portal', 'document-management', 'transportation-management'],
  screens: [
    {
      screen: 'fsc-portal/plot-registry',
      view: 'Plot registry',
      title: 'Plot registry and map',
      caption: 'Every supplying plot on the map with its polygon, certification and the deforestation cut-off check.',
      alt: 'MAVRO FSC Portal plot registry: 1,426 plots mapped by GPS polygon or point, 1,419 clear of the 31 December 2020 deforestation cut-off and 7 flagged, plot clusters on a map with one selected, and plots listed with area, geometry, certification, cut-off check and lot (illustrative data).',
    },
    {
      screen: 'fsc-portal/chain-of-custody',
      view: 'Chain of custody',
      title: 'Chain of custody',
      caption: 'One container traced back through components, sawmill lots, log receipts and harvest logs to its 212 plots.',
      alt: 'MAVRO chain of custody for one export container: 212 plots, 624 harvest logs, 41 log receipts, 4 sawmill lots, 18 component batches, the volume balance per lot from logs to components, the certified share behind the FSC claim and the custody checks with one permit missing (illustrative data).',
    },
    {
      screen: 'fsc-portal/eudr-statement',
      view: 'EUDR statements',
      title: 'EUDR due-diligence statement',
      caption: 'The information, risk assessment and evidence package for one shipment, held until the last document is on record.',
      alt: 'MAVRO EUDR due diligence for one container: product, species, quantity, country and geolocation of 212 plots, eight risk checks with evidence including the deforestation cut-off and felling permits, the outcome and the package sent to the EU buyer (illustrative data).',
    },
    {
      screen: 'fsc-portal/lot-register',
      view: 'Lots',
      title: 'Lot register',
      caption: 'Every sawmill lot with its plots, volumes, certified share, FSC claim, cut-off check and shipment.',
      alt: 'MAVRO lot register: sawmill lots of rubberwood and teak with plots, log and sawn volumes, certified share of the input, FSC 100% or FSC Mix claim, the deforestation check and the container each is allocated to, including one lot held for a plot under review (illustrative data).',
    },
  ],
  phone: {
    screen: 'fsc-portal/harvest-log',
    view: 'Harvest logs',
    title: 'Offline harvest log',
    caption: 'The field officer logs a harvest at the plot with no signal: GPS inside the polygon, counts, photos and the grower’s signature.',
    alt: 'MAVRO field app with no signal: a harvest log at a rubberwood plot with the GPS point inside the plot polygon, 42 trees, 118 logs and about 9.6 cubic metres, photos and the grower’s signed declaration, saved on the phone to sync later (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Malabar Woodcraft Exports, Kochi: rubberwood and plantation-teak furniture components for EU buyers, 8 Oct, 14:02. 1,426 plots (1,398 polygons, 28 points under 4 ha), 1,419 clear of the 31 Dec 2020 cut-off, 7 flagged. Container MWE-0412 for Lindqvist Interiors BV, Rotterdam, ships 14 Oct: 38.6 m³ from lots RW-2291, RW-2294, TK-0418 and TK-0421, 212 plots, 87% certified input, FSC Mix. The felling permit for TK-0421’s 17 plots is missing, so the due-diligence package waits.',
  faq: [
    {
      q: 'What does the FSC Portal in MAVRO do?',
      a: 'The MAVRO FSC Portal traces forest products from the plot to the shipment. It keeps a GPS registry of every supplying plot, logs harvests offline in the field, maintains the chain of custody through lots and batches with a volume balance behind each FSC claim, and assembles an EUDR due-diligence package for each shipment.',
    },
    {
      q: 'How does MAVRO support EUDR due diligence?',
      a: 'MAVRO records the geolocation of every plot as a GPS polygon or point, checks each plot against the 31 December 2020 deforestation cut-off, keeps land, permit and transit documents per plot and lot, and puts the information, risk assessment and evidence for each shipment in one package for the EU operator who files the statement.',
    },
    {
      q: 'Can field teams record harvests without mobile signal?',
      a: 'Yes. The MAVRO field app works offline. Field officers map plots, log harvests with photos and GPS, and take the grower’s signed declaration at the plot; records are saved on the phone and sync when signal returns.',
    },
    {
      q: 'How does MAVRO keep FSC chain-of-custody claims accurate?',
      a: 'Every lot in MAVRO knows the plots and log receipts behind it, the share of certified input and the volumes in and out at each stage. The claim on an invoice, such as FSC 100% or FSC Mix, follows from that record, and lots with a plot under review cannot be allocated to a shipment.',
    },
  ],
  seo: {
    title: 'FSC chain of custody and EUDR due diligence software | MAVRO',
    description:
      'MAVRO FSC Portal: GPS plot registry checked against the deforestation cut-off, offline harvest logging, chain of custody from plot to container with volume balance, and EUDR due-diligence packages for every shipment.',
  },
};
