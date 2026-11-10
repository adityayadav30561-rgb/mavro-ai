import type { PostBody } from './index';

/*
 * Selling. MAVRO facts from the connectivity deck (src/data/erp-connect.ts): the three gaps of giving every user direct
 * ERP access (licence and cost, usability, mobility), the five sync steps through the MAVRO Database, no direct ERP
 * access by the app, the five benefit groups, the 25–30 day ERP Connect rollout. The customer result (85% fewer
 * freight billing disputes, multi-plant manufacturer on SAP S/4HANA) is the verified story as the site states it.
 * The chart is an example organisation, said so in its caption. No licence prices or savings figures.
 */
export const post: PostBody = {
  slug: 'erp-access-without-more-licences',
  takeaways: [
    'Most staff who touch an ERP only view, enter or approve data, yet each usually needs a full paid seat.',
    'A companion app synced two ways with the ERP gives those users simple screens on web and mobile, while the ERP stays the system of record.',
    'In MAVRO, the app writes to the MAVRO Database and never calls SAP, Oracle or Tally directly; the database syncs with the ERP.',
    'ERP Connect goes live in 25 to 30 days: connectors first, pilot users next, then every user.',
  ],
  sections: [
    {
      id: 'the-problem',
      heading: 'Why does ERP access cost so much?',
      blocks: [
        { kind: 'p', text: 'SAP, Oracle and Tally run the core of a business well. The cost comes from giving everyone direct access to them.' },
        { kind: 'p', text: 'Every named user usually needs a paid seat, even if they log in twice a month to approve a purchase. Renewals grow with every new user, and each customisation adds consultant cost.' },
        { kind: 'p', text: 'So businesses ration access. The people who need data most, on the shop floor and in the field, are often the ones without it.' },
      ],
    },
    {
      id: 'three-gaps',
      heading: 'What goes wrong when everyone works in the ERP directly?',
      blocks: [
        { kind: 'p', text: 'Three problems show up together:' },
        {
          kind: 'table',
          caption: 'The three gaps of direct ERP access',
          head: ['Gap', 'What it looks like'],
          rows: [
            ['Licence and cost', 'Occasional users still need full seats; renewals grow with every user; customisation adds consultant cost'],
            ['Usability', 'Transaction codes and crowded screens; users see far more than they need; errors from re-entry'],
            ['Mobility', 'Access tied to the desktop; approvals stall when people are away; data split across several ERPs'],
          ],
        },
        { kind: 'p', text: 'None of these is a fault of the ERP. They come from asking one system to be both the core of record and the everyday tool for hundreds of casual users.' },
      ],
    },
    {
      id: 'who-needs-what',
      heading: 'Who really needs full ERP access?',
      blocks: [
        { kind: 'p', text: 'Fewer people than most licence counts suggest. Sort users by what they actually do:' },
        {
          kind: 'list',
          items: [
            'Power users configure, post and close: finance, planning, a few administrators. They need the ERP itself.',
            'Everyday users enter orders, receipts, time and expenses.',
            'Approvers say yes or no to requests, often from a phone.',
            'Viewers check stock, order status or reports.',
          ],
        },
        {
          kind: 'chart',
          title: 'Example: users by what they need from the ERP',
          caption: 'An example organisation to show the usual shape, not data from any business.',
          categories: ['Configure, post and close', 'Enter data', 'Approve', 'View only'],
          series: [{ name: 'Users', values: [30, 140, 60, 90] }],
          format: 'number',
        },
        { kind: 'p', text: 'Everyone outside the first group can do their job in a simpler app, if that app is properly connected to the ERP.' },
      ],
    },
    {
      id: 'how-it-works',
      heading: 'How does a companion app stay in sync with the ERP?',
      blocks: [
        { kind: 'p', text: 'In MAVRO, every ERP syncs with the MAVRO Database, and the MAVRO App and its users work from that one connected source.' },
        {
          kind: 'steps',
          items: [
            { title: 'A user enters or approves', text: 'Someone in the office, at the plant or in the field works in the MAVRO App, on web or phone.' },
            { title: 'The app writes to the MAVRO Database', text: 'Over the internal API. The app never calls SAP, Oracle or Tally itself.' },
            { title: 'The database syncs to the ERP', text: 'Over the external API, to the ERP, which stays the system of record.' },
            { title: 'Changes sync back', text: 'What changes in the ERP comes back to the MAVRO Database the same way.' },
            { title: 'Each user sees their own screens', text: 'The app reads from the database, so each role sees only the fields it needs.' },
          ],
        },
      ],
    },
    {
      id: 'system-of-record',
      heading: 'Does the ERP stay in charge?',
      blocks: [
        { kind: 'p', text: 'Yes. The ERP remains the system of record, and keeps running exactly as it does today.' },
        { kind: 'p', text: 'The MAVRO App has no direct access to the ERP. Everything passes through the MAVRO Database and the ERP’s own external interface, so the ERP core is not changed or customised.' },
        { kind: 'callout', tone: 'note', title: 'Why no direct access matters', text: 'Upgrades to the ERP stay clean, because nothing was modified inside it. Security teams can see exactly one path in and out.' },
      ],
    },
    {
      id: 'what-users-get',
      heading: 'What do users get in the app?',
      blocks: [
        { kind: 'p', text: 'Five things, according to what each group needs:' },
        {
          kind: 'list',
          items: [
            'Fewer paid ERP seats: grow users, not licences.',
            'Minimal training: only the fields each role needs, so entry and approvals are faster.',
            'Custom reports and dashboards, including views across several ERPs.',
            'Your own forms, approvals, branding and terms, changed in days rather than months.',
            'Approvals on the move, with offline-capable sync and push alerts for pending tasks.',
          ],
        },
        { kind: 'p', text: 'For the people who used to wait for a desk, the mobile app is usually the biggest change.' },
      ],
    },
    {
      id: 'several-erps',
      heading: 'What if a business runs more than one ERP?',
      blocks: [
        { kind: 'p', text: 'Groups often run SAP in one entity, Tally in another and an older system somewhere else. Each has its own users, screens and reports.' },
        { kind: 'p', text: 'Because every ERP syncs into the same MAVRO Database, their data lands in one place. Users work in one app, and leaders see one dashboard across entities.' },
        { kind: 'p', text: 'That also makes later consolidation easier. Moving an entity from one ERP to another changes a connector, not the screens people use every day.' },
      ],
    },
    {
      id: 'supported-erps',
      heading: 'Which ERPs does it work with?',
      blocks: [
        { kind: 'p', text: 'ERP Connect works alongside the ERPs most Indian businesses already run, and with older systems:' },
        {
          kind: 'table',
          caption: 'ERPs that sync with the MAVRO Database',
          head: ['ERP', 'Versions'],
          rows: [
            ['SAP', 'S/4HANA and ECC'],
            ['Oracle', 'E-Business Suite and Fusion Cloud'],
            ['Tally', 'TallyPrime and ERP 9'],
            ['Legacy ERPs', 'Any system with an external interface to sync with'],
          ],
        },
        { kind: 'p', text: 'The MAVRO App runs on the web and on Android and iOS phones, for users in the office, at the plant and in the field.' },
      ],
    },
    {
      id: 'security',
      heading: 'Is a companion app secure?',
      blocks: [
        { kind: 'p', text: 'It is held to the same controls as the rest of the MAVRO platform. Data is encrypted with AES-256 at rest and in transit.' },
        { kind: 'p', text: 'Access is role-based down to individual fields, with MFA or single sign-on and IP and device controls. The APIs use OAuth 2.0 with JWT and rate limiting.' },
        { kind: 'p', text: 'Every action is recorded in a tamper-proof audit log, kept for seven years. Security teams see who entered, approved or viewed what, and when.' },
      ],
    },
    {
      id: 'first-tasks',
      heading: 'Which tasks should move to the app first?',
      blocks: [
        { kind: 'p', text: 'The ones done most often by people with the least ERP training. Good first candidates:' },
        {
          kind: 'list',
          items: [
            'Approvals that stall when the approver is away from a desk.',
            'Orders booked by sales reps in the field.',
            'Receipts, gate entries and stock look-ups at the plant.',
            'Time, leave and expense entries from every employee.',
          ],
        },
        { kind: 'p', text: 'Each one moves a large group of occasional users off full seats, with a visible change for them on day one.' },
      ],
    },
    {
      id: 'customer-story',
      heading: 'What does this look like in practice?',
      blocks: [
        { kind: 'p', text: 'A multi-plant manufacturer running SAP S/4HANA had frequent freight billing disputes across its plants.' },
        { kind: 'p', text: 'SaiSatwik built transportation management alongside SAP: freight calculated by route, every shipment validated before it is invoiced, SLA-based truck allocation and a self-service portal for transporters. Debit notes and GL reconciliation were automated.' },
        { kind: 'figure', module: 'transportation-management', caption: 'The MAVRO transportation control tower, the kind of module that runs beside SAP.' },
        { kind: 'callout', tone: 'tip', title: 'The result', text: '85% fewer freight billing disputes, with SAP still the system of record. The client is anonymised; the result is verified.' },
      ],
    },
    {
      id: 'licence-review',
      heading: 'What happens to existing ERP licences?',
      blocks: [
        { kind: 'p', text: 'They are reviewed once the app is live for everyone. The full go-live stage includes an ERP licence optimisation review.' },
        { kind: 'p', text: 'That review compares who still works in the ERP itself with who now works only in the app. Seats that are no longer needed can then be dropped at the next renewal.' },
        { kind: 'p', text: 'The review uses real usage, not estimates, because by then every user has been working in the app for weeks.' },
      ],
    },
    {
      id: 'rollout',
      heading: 'How long does it take to go live?',
      blocks: [
        { kind: 'p', text: 'ERP Connect goes live in 25 to 30 days, in four stages:' },
        {
          kind: 'table',
          caption: 'The ERP Connect rollout',
          head: ['Stage', 'What happens'],
          rows: [
            ['Discovery and connectors', 'ERP landscape and data mapping; SAP, Oracle or Tally connectors set up; sync rules, schedules and the roles matrix'],
            ['Pilot go-live', 'Pilot users live on web and mobile; two-way sync validated; department-wise training'],
            ['Full go-live', 'All users and sites live; ERP licence optimisation review; SOPs handed over'],
            ['AMS support', 'A dedicated contact; connector monitoring and fixes; monthly usage and roadmap review'],
          ],
        },
      ],
    },
    {
      id: 'before-you-start',
      heading: 'What should you work out before starting?',
      blocks: [
        { kind: 'p', text: 'A short list makes the first workshop productive:' },
        {
          kind: 'list',
          items: [
            'Which ERPs and entities are in scope.',
            'Which users only view, enter or approve, and how many there are.',
            'The forms and approvals they use most.',
            'Which data must sync, and how fresh it needs to be.',
            'Who signs off the roles matrix.',
          ],
        },
        { kind: 'p', text: 'With that, the demo can show your own users’ screens rather than a generic tour.' },
      ],
    },
    {
      id: 'next-step',
      heading: 'Where does this fit with the rest of MAVRO?',
      blocks: [
        { kind: 'p', text: 'ERP Connect is how MAVRO runs [alongside SAP, Oracle or Tally](/erp-connect). The same platform carries MAVRO’s own modules, so a business can add shop-floor, portal or logistics modules without replacing its ERP.' },
        { kind: 'p', text: 'For a longer view of when to move further, see [when does a business need an ERP](/blog/signs-you-need-an-erp).' },
      ],
    },
  ],
  faq: [
    {
      q: 'How can I reduce ERP licence costs?',
      a: 'Keep full ERP seats for the people who configure, post and close, and move users who only view, enter or approve data to a companion app synced two ways with the ERP.',
    },
    {
      q: 'Does MAVRO connect directly to SAP or Tally?',
      a: 'The MAVRO App never calls the ERP directly. It writes to the MAVRO Database, which syncs two ways with SAP, Oracle, Tally or a legacy ERP over the ERP’s external interface.',
    },
    {
      q: 'Will this change or customise our ERP?',
      a: 'No. Workflows, forms and approvals are configured in MAVRO, so the ERP core is untouched and upgrades stay clean. The ERP remains the system of record.',
    },
    {
      q: 'How long does ERP Connect take to implement?',
      a: 'ERP Connect goes live in 25 to 30 days: discovery and connectors first, then pilot users on web and mobile, then every user and site, with AMS support after go-live.',
    },
  ],
  sources: [
    { label: 'MAVRO ERP Connect: how MAVRO runs alongside SAP, Oracle and Tally', url: '/erp-connect' },
    { label: 'MAVRO customer stories (results verified, clients anonymised)', url: '/customers' },
  ],
};
