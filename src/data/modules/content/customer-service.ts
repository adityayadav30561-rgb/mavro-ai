import type { ModuleContent } from '../schema';

/*
 * Customer Service. Source: product deck v2, slides 48–49 (tagline, four tiles, what it does, why it matters, four
 * screens). The deck's pharmacovigilance example is written for every industry: complaints are screened for safety,
 * and for pharma that screen is the adverse-event intimation. Figures on the tiles come from the module's screens
 * (prototype/modules/customer-service/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'customer-service'> = {
  slug: 'customer-service',
  tagline: 'Complaint to closure: multi-channel service with quality and safety checks built in.',
  tiles: [
    {
      icon: 'headset',
      title: 'Ticket load and SLA',
      body: 'Channel-wise volume, response time and breaches.',
      figure: { value: '94%', label: 'first response within SLA' },
    },
    {
      icon: 'master',
      title: 'Ticket register',
      body: 'Category, agent, priority and age on every ticket.',
      figure: { value: '74', label: 'open tickets, one record each' },
    },
    {
      icon: 'quality',
      title: 'Resolution workbench',
      body: 'Complaints linked to the lot record and QC results.',
      figure: { value: '3', label: 'complaints clustered on one lot' },
    },
    {
      icon: 'shield',
      title: 'Escalations and safety',
      body: 'Safety screening inside the statutory window, escalation by rule.',
      figure: { value: '34 of 34', label: 'screened inside the window' },
    },
  ],
  what: 'Service for manufactured and regulated products: tickets from helpline, portal, email and the field consolidated with SLA health, a resolution workbench that ties product complaints to the lot record and QC evidence, and an escalation queue where complaints are screened for safety and reportable events are intimated within the statutory window, including adverse events to pharmacovigilance for pharma.',
  why: [
    'Safety-relevant complaints are screened and reported inside the regulatory clock.',
    'Complaint clusters on a lot trigger a QA investigation, not repeated apologies.',
    'Every channel shares one ticket record, so nothing is answered twice.',
    'Replacement despatch waits for the lot’s disposition instead of pre-empting it.',
    'First-response and closure SLAs are owned per channel and per agent.',
    'Reopen rate and CSAT read against the volume that produced them.',
  ],
  flow: {
    from: [
      { slug: 'dealer-portal', passes: 'Tickets raised by dealers' },
      { slug: 'order-to-cash', passes: 'Invoices and dispatches to the customer' },
      { slug: 'production-management', passes: 'Lot records and QC results' },
      { slug: 'sales-force-automation', passes: 'Complaints logged on calls' },
    ],
    to: [
      { slug: 'production-management', passes: 'Quality investigations on a lot' },
      { slug: 'order-to-cash', passes: 'Credit notes and replacements' },
      { slug: 'crm', passes: 'Upsell leads from existing customers' },
      { slug: 'data-analytics', passes: 'SLA, CSAT and complaint trends' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Complaints traced to the lot, its work order and the outgoing test before a replacement ships.' },
    { slug: 'distribution', note: 'Dealer and customer tickets from every channel on one record, with SLAs per channel.' },
    { slug: 'pharma', note: 'Product complaints tied to the batch record; adverse events intimated to pharmacovigilance in time.' },
    { slug: 'service-providers', note: 'Client tickets owned per agent, with response and closure SLAs and CSAT.' },
  ],
  roles: [
    { name: 'Service agents', task: 'Answer tickets from every channel inside the first-response SLA.', works: 'Tickets' },
    { name: 'Service lead', task: 'Watches SLA health, screens complaints for safety and works escalations.', works: 'Escalations' },
    { name: 'Quality assurance', task: 'Investigates complaint clusters against the lot record and decides disposition.', works: 'Resolution workbench' },
    { name: 'Service head', task: 'Approves warranty replacements above the desk’s limit.', works: 'Warranty claims' },
    { name: 'Management', task: 'Reads SLA, reopen rate and CSAT by channel each month.', works: 'Reports' },
  ],
  related: ['order-to-cash', 'crm', 'production-management', 'sales-force-automation'],
  screens: [
    {
      screen: 'customer-service/ticket-load',
      view: 'Ticket load',
      title: 'Ticket load and SLA health',
      caption: 'Open tickets by channel with response time and breaches, a complaint cluster raised to QA and tickets about to breach.',
      alt: 'MAVRO Customer Service ticket load: 74 open tickets, 94% first response within SLA, tickets by channel with SLA health, a complaint cluster on lot L-0897 raised to QA, and tickets about to breach (illustrative data).',
    },
    {
      screen: 'customer-service/resolution-workbench',
      view: 'Resolution workbench',
      title: 'Resolution workbench: quality complaint',
      caption: 'A complaint tied to its lot record, where the lot went, the safety screen and the QA investigation before a replacement.',
      alt: 'MAVRO Customer Service resolution workbench for a flange leak complaint: the conversation across helpline, email and portal, the lot record with its outgoing test, the six customers the lot went to with three complaints, the safety screen and the QA investigation steps (illustrative data).',
    },
    {
      screen: 'customer-service/escalations',
      view: 'Escalations',
      title: 'Escalation and complaint queue',
      caption: 'Tickets beyond the desk’s authority or SLA, with a safety screen and its clock at the top.',
      alt: 'MAVRO Customer Service escalation queue: seven escalated tickets with their reason, owner, level and clock, a pending safety screen with 22 hours left in its window, escalations by reason and the escalation matrix (illustrative data).',
    },
    {
      screen: 'customer-service/ticket-register',
      view: 'Ticket register',
      title: 'Ticket register',
      caption: 'Every open ticket with category, agent, priority, age and status; tickets older than seven days flagged.',
      alt: 'MAVRO Customer Service ticket register: open tickets with customer, category, agent, priority, age and status, older tickets flagged, and open tickets by category and by agent (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02: 74 open tickets from five channels, 94% first response within SLA, 3.1% reopened, CSAT 4.4 of 5. Three complaints on lot L-0897 (IH-180 housings) are clustered under QA investigation QI-0217; 186 pieces are on hold and replacements wait for the disposition. Seven tickets are escalated; one safety screen is due within 24 hours.',
  faq: [
    {
      q: 'What does the Customer Service module in MAVRO do?',
      a: 'MAVRO Customer Service brings tickets from the helpline, email, customer and dealer portals and field visits into one record per complaint, tracks first-response and resolution SLAs by channel and agent, ties product complaints to the lot record and QC results, and escalates tickets by rule, with a safety screen for complaints that may be reportable.',
    },
    {
      q: 'How does MAVRO handle product quality complaints?',
      a: 'A quality complaint is linked to the lot it came from, showing the work order, outgoing test results and every customer the lot went to. When several complaints land on one lot, MAVRO clusters them and raises a QA investigation, holds the remaining stock, and releases the replacement only once QA has decided the disposition.',
    },
    {
      q: 'Does MAVRO support pharmacovigilance and adverse-event reporting?',
      a: 'Yes. Every complaint can be screened for safety, and a reportable event is tracked against its statutory window from the moment the ticket is opened. For pharma, adverse events are screened and intimated to pharmacovigilance within the regulatory clock; for other industries the same screen covers incidents reportable under law or contract.',
    },
    {
      q: 'Which channels can customers use to raise tickets in MAVRO?',
      a: 'Customers and dealers can raise tickets by helpline, email, the customer portal and the dealer portal, and field staff can log them from the mobile app. Each complaint becomes one ticket record whichever channel it came from, so it is never answered twice.',
    },
  ],
  seo: {
    title: 'Customer service and complaint management software | MAVRO',
    description:
      'MAVRO Customer Service: multi-channel tickets on one record, SLA health by channel and agent, complaints traced to the lot and QC results, and safety screening inside the statutory window.',
  },
};
