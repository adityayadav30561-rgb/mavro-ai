/*
 * The ERP Connect page (/erp-connect, SITE-PLAN.md section 3.4). Every line comes from the MAVRO ERP Connectivity
 * deck (docs/source/erp-connect-deck.md, slides 1–6 and 8; not the competitor table on slide 7) and the B1 MAVRO
 * flow deck (docs/source/sap-b1-flow-deck.md). The board itself and the five benefits are the homepage's
 * (`connect` in home.ts), so both stay identical.
 */
import type { BoardPart } from '../blocks/ArchitectureDiagram';
import type { TimelineData } from '../blocks/Timeline';
import type { IconName } from '../components/Icon';

export const erpConnect = {
  seo: {
    title: 'ERP Connect: MAVRO alongside SAP, Oracle and Tally | MAVRO',
    description:
      'Run MAVRO alongside SAP, Oracle, Tally or a legacy ERP. Two-way sync through the MAVRO Database, simple role-based screens and a mobile app for every user, with the ERP left as the system of record.',
  },

  hero: {
    title: 'Run MAVRO alongside',
    rest: 'SAP, Oracle, Tally or any legacy ERP.',
    lead: 'Your ERP stays the system of record. Every user who only needs to view, enter or approve data works in one simple MAVRO app on web and mobile, synced two ways with the ERP.',
    facts: [
      { value: '25–30 days', label: 'Roadmap to full go-live' },
      { value: 'Two-way', label: 'Sync with every ERP' },
      { value: 'Web + mobile', label: 'Android and iOS' },
    ],
    how: 'How it connects',
    screen: {
      alt: 'A MAVRO approvals app beside SAP S/4HANA: purchase requisitions and orders keep their SAP numbers, each with its sync state, and a purchase order’s trail from SAP to MAVRO and back (illustrative data).',
    },
    phone: {
      alt: 'The same purchase order approved on a phone: the approval saved to the MAVRO Database and being written to SAP S/4HANA (illustrative data).',
    },
  },

  /** Deck slide 2. */
  who: {
    title: 'Built for businesses',
    rest: 'that already run an ERP.',
    lead: 'An organisation with a core ERP, or several, where many staff only need to view, enter or approve data. MAVRO gives those users a simple, customised application on web and mobile, while the ERP remains the system of record.',
    systems: [
      { name: 'SAP', detail: 'S/4HANA · ECC', icon: 'layers', line: 'Users paying for seats they rarely use.' },
      { name: 'Oracle', detail: 'EBS · Fusion Cloud', icon: 'database', line: 'Teams needing simpler, faster screens.' },
      { name: 'Tally', detail: 'TallyPrime · ERP 9', icon: 'finance', line: 'Growing companies outpacing desktop-only accounting.' },
      { name: 'Any legacy ERP', detail: 'In-house and older systems', icon: 'wrench', line: 'Systems that are hard to extend.' },
    ] satisfies { name: string; detail: string; icon: IconName; line: string }[],
    users: { label: 'One application for every ERP user', groups: ['Office', 'Plant', 'Field'] },
  },

  /** Deck slide 3. */
  gaps: {
    title: 'A strong core,',
    rest: 'with gaps around it.',
    lead: 'SAP, Oracle and Tally run the core well. Giving every user direct ERP access is costly, complex and desk-bound: every screen, seat and change request depends on the ERP.',
    items: [
      {
        icon: 'receipt',
        title: 'Licence and cost',
        tag: 'A paid seat for every named user',
        points: ['Occasional users still need full seats', 'Renewals grow with every new user', 'Customisation adds consultant cost'],
      },
      {
        icon: 'eye',
        title: 'Usability',
        tag: 'Long training for simple tasks',
        points: ['Transaction codes and crowded screens', 'Users see far more than they need', 'Errors from manual re-entry'],
      },
      {
        icon: 'phone',
        title: 'Mobility and flexibility',
        tag: 'Desk-bound ERP access',
        points: ['ERP access tied to the desktop', 'Approvals stall when users are away', 'Data split across multiple ERPs'],
      },
    ] satisfies { icon: IconName; title: string; tag: string; points: string[] }[],
  },

  /** Deck slide 4, with a step-through of one record each way. */
  architecture: {
    title: 'How it connects:',
    rest: 'one broker, no direct access.',
    lead: 'Every ERP syncs with the MAVRO Database. The MAVRO App and its users work from that single, connected source.',
    stepsLabel: 'Follow one record',
    directions: { out: 'From a user to the ERP', back: 'From the ERP to every user' },
    steps: [
      {
        dir: 'out',
        title: 'A user enters or approves',
        body: 'Someone in the office, at the plant or in the field works in the MAVRO App, on web or on the phone.',
        parts: ['users', 'app'],
      },
      {
        dir: 'out',
        title: 'The app writes to the MAVRO Database',
        body: 'Over the internal API. The app never calls SAP, Oracle or Tally itself.',
        parts: ['app', 'internal', 'db'],
      },
      {
        dir: 'out',
        title: 'The database syncs it to the ERP',
        body: 'Over the external API, to SAP, Oracle, Tally or the legacy ERP, which stays the system of record.',
        parts: ['db', 'external', 'systems'],
      },
      {
        dir: 'back',
        title: 'Changes in the ERP sync back',
        body: 'The same external API carries what changes in the ERP back to the MAVRO Database. With several ERPs, they all land in one place.',
        parts: ['systems', 'external', 'db'],
      },
      {
        dir: 'back',
        title: 'Every user sees it in their own screens',
        body: 'The app reads from the database, so each role sees only the fields it needs, on web and mobile.',
        parts: ['db', 'internal', 'app', 'users'],
      },
    ] satisfies { dir: 'out' | 'back'; title: string; body: string; parts: BoardPart[] }[],
    prev: 'Previous step',
    next: 'Next step',
  },

  /** Deck slide 5: the homepage's five benefits, each with the deck's three points. */
  benefits: {
    title: 'Five things',
    rest: 'that change for your users.',
    lead: 'Your ERP stays the system of record. MAVRO makes it cheaper, simpler and available everywhere.',
    points: [
      ['Fewer paid ERP seats', 'Lower renewal cost', 'Grow users, not licences'],
      ['Minimal training', 'Only the fields each role needs', 'Faster entry and approvals'],
      ['Custom reports and dashboards', 'Cross-ERP views in one place', 'Upgrade-safe ERP core'],
      ['Your forms and approvals', 'Your branding and terms', 'Changes in days, not months'],
      ['Approvals on the move', 'Offline-capable sync', 'Push alerts for pending tasks'],
    ],
  },

  /** Deck slide 6. */
  problems: {
    title: 'Every native-ERP limit,',
    rest: 'mapped to MAVRO.',
    lead: 'The ERP keeps running exactly as it does today.',
    before: 'Today, native ERP only',
    after: 'After MAVRO',
    rows: [
      { before: 'Every ERP user needs a paid named licence', after: 'Occasional users on MAVRO, ERP seats for core users' },
      { before: 'Complex screens and long user training', after: 'Simple role-based screens, minimal training' },
      { before: 'Every process change is costly ERP development', after: 'Boutique workflows configured in MAVRO' },
      { before: 'ERP access limited to the office desktop', after: 'Native Android and iOS app with offline sync' },
      { before: 'Data split across SAP, Oracle, Tally and legacy tools', after: 'One MAVRO Database, synced with every ERP' },
      { before: 'Customisations put ERP upgrades at risk', after: 'ERP core untouched: clean, safe upgrades' },
    ],
  },

  /** The B1 MAVRO flow deck (slides 2, 4 and 6). */
  b1: {
    title: 'With SAP Business One:',
    rest: 'B1 records, MAVRO executes.',
    lead: 'B1 stays the transactional system. MAVRO is the warehouse and inventory execution layer, from the material that arrives to the shipment that leaves, with a scan at the two control points.',
    lanes: [
      { id: 'b1', name: 'SAP Business One', note: 'Transactional system' },
      { id: 'mavro', name: 'MAVRO', note: 'Warehouse and inventory execution' },
    ],
    legend: { scan: 'Mandatory scan', both: 'MAVRO, integrated' },
    zones: [
      {
        name: 'Inbound',
        summary: 'PO, GRN, scan, quality, stock',
        steps: [
          { name: 'PO created', lane: 'b1' },
          { name: 'Material received', lane: 'mavro' },
          { name: 'GRN at plant and store location', lane: 'b1' },
          { name: 'Inward scan', lane: 'mavro', note: 'Validates received material against the GRN', scan: true },
          { name: 'Inspection, if a sampling plan applies', lane: 'mavro', note: 'Accepted: released to inventory. Rejected: hold' },
          { name: 'Warehouse inventory updated', lane: 'mavro' },
        ],
      },
      {
        name: 'Warehouse and production',
        summary: 'Bins, issue, production, finished goods',
        steps: [
          { name: 'GRN completion', lane: 'b1', note: 'Notifies MAVRO' },
          { name: 'Inventory down to the bin', lane: 'mavro', note: 'Store, section, rack, bin' },
          { name: 'Production order', lane: 'b1', note: 'Raw material from the BOM, availability checked' },
          { name: 'Raw material issue', lane: 'mavro' },
          { name: 'Production and packing', lane: 'mavro', note: 'Semi-finished output, packing material issued' },
          { name: 'Finished goods stock', lane: 'mavro' },
          { name: 'FG stock synced to B1', lane: 'b1' },
        ],
      },
      {
        name: 'Outbound',
        summary: 'Order, delivery, pick, pack, scan',
        steps: [
          { name: 'Sales order', lane: 'b1' },
          { name: 'Outbound delivery and shipment', lane: 'b1' },
          { name: 'Picking from warehouse stock', lane: 'mavro' },
          { name: 'Packing', lane: 'mavro' },
          { name: 'Transporter assignment', lane: 'mavro' },
          { name: 'Outbound scan', lane: 'mavro', note: 'Right material, quantity and shipment', scan: true },
          { name: 'Shipment confirmation', lane: 'mavro' },
        ],
      },
      {
        name: 'Billing and dispatch',
        summary: 'From shipment confirmation to dispatch',
        steps: [
          { name: 'Customer notification', lane: 'mavro', note: 'Sent on shipment confirmation, with the invoice and e-documents' },
          { name: 'Invoice', lane: 'b1' },
          { name: 'E-invoice', lane: 'both' },
          { name: 'E-way bill', lane: 'both' },
          { name: 'Dispatch', lane: 'mavro', note: 'Once the notification, invoice and e-documents are done' },
        ],
      },
    ],
    close: 'B1 records the transactions. MAVRO executes the warehouse.',
    module: 'See Warehouse Management',
  },

  /** Deck slide 8. */
  roadmap: {
    title: 'Live in 25 to 30 days,',
    rest: 'connectors first.',
    lead: 'Connectors and data mapping first, pilot users next, then every user on web and mobile.',
    plan: {
      label: 'Your ERP Connect rollout',
      span: 'Day 1 → Day 30',
      after: 'After go-live',
      ongoing: 'Ongoing',
      milestones: [
        { day: 15, label: 'Pilot live' },
        { day: 31, label: 'All users live' },
      ],
      phases: [
        {
          when: 'Week 1–2',
          from: 1,
          to: 14,
          icon: 'link',
          title: 'Discovery and connectors',
          points: ['ERP landscape and data mapping', 'SAP, Oracle or Tally connectors set up', 'Sync rules, schedules and the roles matrix'],
        },
        {
          when: 'Week 3',
          from: 15,
          to: 21,
          icon: 'rocket',
          title: 'Pilot go-live',
          points: ['Pilot users live on web and mobile', 'Two-way sync validated with the ERP', 'Department-wise training'],
        },
        {
          when: 'Week 4',
          from: 22,
          to: 30,
          icon: 'check',
          title: 'Full go-live',
          points: ['All users and sites live', 'ERP licence optimisation review', 'SOPs, then your team runs it'],
        },
        {
          when: 'Ongoing',
          from: 30,
          to: 'ongoing',
          icon: 'people',
          title: 'AMS support',
          points: ['A dedicated contact after go-live', 'Connector monitoring and fixes', 'Monthly usage and roadmap review'],
        },
      ],
    } satisfies TimelineData,
  },

  faq: [
    {
      q: 'What is MAVRO ERP Connect?',
      a: 'ERP Connect runs MAVRO alongside SAP, Oracle, Tally or a legacy ERP. Every ERP syncs two ways with the MAVRO Database, and users who only need to view, enter or approve data work in one simple MAVRO app on web and mobile. The ERP remains the system of record.',
    },
    {
      q: 'Which ERPs does MAVRO connect to?',
      a: 'SAP (S/4HANA and ECC), Oracle (EBS and Fusion Cloud), Tally (TallyPrime and ERP 9) and in-house or older legacy ERPs. A business with several ERPs connects all of them to the same MAVRO Database.',
    },
    {
      q: 'Does the MAVRO app access our ERP directly?',
      a: 'No. The MAVRO App reads and writes the MAVRO Database over an internal API, and all external traffic to SAP, Oracle or Tally is brokered by the MAVRO Database over an external API with two-way sync.',
    },
    {
      q: 'How does ERP Connect reduce ERP licence costs?',
      a: 'Occasional users work in MAVRO instead of the ERP, so named ERP seats stay with core users. You grow users, not licences, and the ERP licence position is reviewed at full go-live.',
    },
    {
      q: 'Do we have to change or customise our ERP?',
      a: 'No. Workflows, forms and approvals are configured in MAVRO, so the ERP core is untouched and upgrades stay clean and safe.',
    },
    {
      q: 'How long does an ERP Connect rollout take?',
      a: '25 to 30 days: discovery and connectors in weeks one and two, a pilot go-live in week three with two-way sync validated, and full go-live in week four, followed by AMS support with connector monitoring.',
    },
    {
      q: 'How does MAVRO work with SAP Business One?',
      a: 'B1 stays the transactional system for purchase orders, GRNs, production orders, sales orders and invoices. MAVRO is the warehouse and inventory execution layer: receiving, inward and outbound scans, quality, bin-level stock, production issue and packing, picking, transporter assignment and dispatch, with finished goods stock synced back to B1.',
    },
  ],

  cta: {
    title: 'See MAVRO beside',
    rest: 'the ERP you run.',
    body: 'A demo built around your ERP: which users move to MAVRO, what syncs, and the 25–30 day plan.',
    label: 'Request a demo',
    interest: 'ERP Connect',
  },
} as const;
