import type { PostBody } from './index';

/*
 * Selling. MAVRO facts from the product deck's implementation slides (src/data/home.ts `implementation`,
 * src/data/implementation.ts): the 25–30 day phased plan (weeks 1–2 discovery and setup, week 3 first go-live,
 * week 4 full go-live, then AMS), the team model, the risks table with mitigations and owners, the ninety-day
 * outcomes. The chart is the plan's own day ranges. No statistics about other projects or the market.
 */
export const post: PostBody = {
  slug: 'how-long-erp-implementation',
  takeaways: [
    'How long an ERP implementation takes depends mostly on scope, data quality and how fast decisions are made, not on the software.',
    'MAVRO is implemented in 25 to 30 days on a phased plan: discovery and setup in weeks one and two, priority modules live in week three, everything live in week four.',
    'One dedicated resource stays with the project from the first workshop to go-live, and support continues after it.',
    'The biggest risks, master data, adoption and scope creep, are planned for from the first week rather than discovered at the end.',
  ],
  sections: [
    {
      id: 'short-answer',
      heading: 'How long does an ERP implementation take?',
      blocks: [
        { kind: 'p', text: 'It depends on what is being implemented and how ready the business is. A phased rollout of the modules a business needs first can go live in weeks; trying to change everything at once can take far longer.' },
        { kind: 'p', text: 'MAVRO is implemented in 25 to 30 days. Priority modules go live first, the rest follow, and the business runs on MAVRO by the end of the first month.' },
        { kind: 'p', text: 'The rest of this article explains what fills those 30 days, what slows projects down, and how to keep yours on time.' },
      ],
    },
    {
      id: 'what-drives-duration',
      heading: 'What decides how long it takes?',
      blocks: [
        { kind: 'p', text: 'Four things matter more than the software itself:' },
        {
          kind: 'list',
          items: [
            'Scope: how many modules, entities, plants and users go live together.',
            'Data: how clean the customer, supplier, item and opening balance data is.',
            'Decisions: how quickly process questions are answered and signed off.',
            'People: whether key users are available for workshops, testing and training.',
          ],
        },
        { kind: 'p', text: 'A phased plan controls the first. The other three need a named owner on the business side from the first week.' },
      ],
    },
    {
      id: 'week-by-week',
      heading: 'What happens week by week?',
      blocks: [
        { kind: 'p', text: 'The MAVRO plan has four phases:' },
        {
          kind: 'steps',
          items: [
            { title: 'Weeks 1–2: discovery and setup', text: 'Process mapping and sign-off; modules configured, users and roles set up; trial data migration and user acceptance testing.' },
            { title: 'Week 3: first go-live', text: 'Priority modules go live first; department-wise training, on site or remote; same-day issue resolution.' },
            { title: 'Week 4: full go-live', text: 'Remaining modules and the mobile app; SOPs and process documentation; your team runs it independently.' },
            { title: 'Ongoing: support after go-live', text: 'A dedicated contact and fixes under AMS; a monthly review of usage and roadmap; new modules when you need them.' },
          ],
        },
        {
          kind: 'chart',
          title: 'Days in each phase of the MAVRO plan',
          caption: 'From the plan itself: days 1–14, 15–21 and 22–30.',
          categories: ['Discovery and setup', 'First go-live', 'Full go-live'],
          series: [{ name: 'Days', values: [14, 7, 9] }],
          format: 'days',
        },
      ],
    },
    {
      id: 'priority-modules',
      heading: 'Why go live with priority modules first?',
      blocks: [
        { kind: 'p', text: 'Because a working system in week three is worth more than a perfect one in month six.' },
        { kind: 'p', text: 'Priority modules are the ones that remove the biggest pain: often orders and invoicing, attendance and payroll, or purchasing and stock. Going live with them first proves the system on real transactions and builds confidence for the rest.' },
        { kind: 'p', text: 'It also limits risk. If something needs adjusting, it is found in a few modules with a few teams, not across the whole business on one weekend.' },
      ],
    },
    {
      id: 'who-is-involved',
      heading: 'Who works on the implementation?',
      blocks: [
        { kind: 'p', text: 'The same team runs the project from kickoff to go-live, and stays after it.' },
        {
          kind: 'table',
          caption: 'The MAVRO implementation team model',
          head: ['Stage', 'What you get'],
          rows: [
            ['During the project', 'One dedicated resource, full-time through the 25–30 days, not shared; a direct line to solution architects'],
            ['At go-live', 'On site if agreed, else remote; same-day resolution with no ticket queue; training department by department'],
            ['After go-live', 'A dedicated contact; fixes and enhancements under AMS; a monthly review of usage and roadmap'],
          ],
        },
        { kind: 'p', text: 'On your side, each department names a champion who decides, tests and helps train colleagues.' },
      ],
    },
    {
      id: 'data-migration',
      heading: 'How is data migrated?',
      blocks: [
        { kind: 'p', text: 'Data migration is where most implementations lose time, so it starts in the first fortnight, not the last.' },
        {
          kind: 'list',
          items: [
            'A data cleansing workshop at the start, to fix master data before it moves.',
            'A trial migration during setup, checked by the people who use the data.',
            'Exceptions handled before cutover, so go-live does not start with errors.',
          ],
        },
        { kind: 'p', text: 'Clean customer, supplier and item masters make every later step faster. They are the one thing a business can start on before the project begins.' },
      ],
    },
    {
      id: 'prepare',
      heading: 'What should a business prepare before kickoff?',
      blocks: [
        { kind: 'p', text: 'A few things can be gathered before the first workshop, and each one saves time later:' },
        {
          kind: 'list',
          items: [
            'Customer, supplier and item lists, with duplicates removed.',
            'Opening balances and open documents: orders, invoices and stock.',
            'A list of users, their departments and what each one approves.',
            'The forms, reports and approvals people use today.',
            'Statutory details: GSTINs, PF and ESI codes, and state registrations.',
          ],
        },
        { kind: 'p', text: 'None of this needs the software. It needs someone on the business side with the time to collect it.' },
      ],
    },
    {
      id: 'several-sites',
      heading: 'What about several plants, branches or entities?',
      blocks: [
        { kind: 'p', text: 'MAVRO is multi-entity, multi-branch and multi-currency, so several sites run on one setup rather than separate copies.' },
        { kind: 'p', text: 'The go-live order is agreed at discovery. A group might start with the entity whose pain is greatest, prove it, then bring the rest on the same configuration.' },
        { kind: 'p', text: 'Cloud and on-premise deployment are both options, settled during discovery. Either way, the data is owned by the client.' },
      ],
    },
    {
      id: 'risks',
      heading: 'What are the risks, and how are they handled?',
      blocks: [
        { kind: 'p', text: 'The risks that come up are well known, so each has a mitigation and an owner from the start:' },
        {
          kind: 'table',
          caption: 'Implementation risks, impact, mitigation and owner',
          head: ['Risk', 'Impact', 'Mitigation', 'Owner'],
          rows: [
            ['Poor master data quality', 'High', 'Data cleansing workshop at the start; trial migration before go-live', 'Client IT'],
            ['User adoption resistance', 'High', 'Department champions; in-person training on site', 'Joint'],
            ['Scope creep', 'High', 'Requirements signed off before development; change requests priced separately', 'Joint'],
            ['Legacy data migration issues', 'Medium', 'Trial migration first; exceptions handled before cutover', 'SaiSatwik'],
            ['Process gaps found late', 'Medium', 'Weekly steering committee; issues resolved in sprint', 'Joint'],
            ['Key user unavailability', 'Medium', 'Roles agreed at kickoff; backup users trained per department', 'Client'],
          ],
        },
      ],
    },
    {
      id: 'warning-signs',
      heading: 'How can you tell a project is slipping?',
      blocks: [
        { kind: 'p', text: 'The signs show early, long before a go-live date is missed:' },
        {
          kind: 'list',
          items: [
            'Process sign-offs keep moving to next week.',
            'The trial migration is repeated because the source data is still changing.',
            'Champions miss workshops or testing sessions.',
            'New requirements arrive without a change request.',
          ],
        },
        { kind: 'p', text: 'The weekly steering committee is where these are raised and resolved, while there is still time to recover.' },
      ],
    },
    {
      id: 'training',
      heading: 'How are users trained?',
      blocks: [
        { kind: 'p', text: 'Department by department, on the screens each role will actually use, during the go-live weeks.' },
        { kind: 'p', text: 'Training on real transactions sticks better than classroom sessions weeks before go-live. Champions in each department carry it on, and SOPs and process documentation are handed over in week four.' },
        { kind: 'p', text: 'Because each role sees only the fields it needs, training is short. Most people learn their part in a session, not a course.' },
      ],
    },
    {
      id: 'after-go-live',
      heading: 'What happens after go-live?',
      blocks: [
        { kind: 'p', text: 'Support continues under AMS, with the same people who know your setup.' },
        {
          kind: 'list',
          items: [
            'A dedicated contact for questions and fixes.',
            'Fixes and enhancements, and change requests for new workflows.',
            'New modules when you need them.',
            'A monthly review of usage, open issues and your roadmap.',
          ],
        },
        { kind: 'p', text: 'During the go-live weeks themselves, issues are resolved the same day, without a ticket queue.' },
      ],
    },
    {
      id: 'go-live-day',
      heading: 'What happens on go-live day?',
      blocks: [
        { kind: 'p', text: 'The priority modules switch over, and the team that configured them is on hand, on site if agreed or remotely.' },
        { kind: 'p', text: 'Opening balances and open documents are already loaded from the final migration. Users start on real transactions, with their champion beside them.' },
        { kind: 'p', text: 'Issues are logged and resolved the same day, without a ticket queue. Anything that needs a process change goes to the steering committee that week.' },
      ],
    },
    {
      id: 'ninety-days',
      heading: 'What does the business look like ninety days later?',
      blocks: [
        { kind: 'p', text: 'Once every department works in MAVRO, the change shows up across the business:' },
        {
          kind: 'table',
          caption: 'Ninety days after go-live',
          head: ['Area', 'What changes'],
          rows: [
            ['Finance', 'Live P&L, real-time payables and receivables, GST generated from transactions'],
            ['HR and payroll', 'Payroll closes with GL posting; PF, TDS and ESI from within MAVRO'],
            ['Production', 'Work orders and output tracked live, with delays flagged early'],
            ['Sales', 'Reps book orders on mobile, with beats and schemes enforced'],
            ['Procurement', 'Vendors work digitally; the three-way match runs before payment'],
            ['Leadership', 'One dashboard across finance, HR and operations, live'],
          ],
        },
      ],
    },
    {
      id: 'keep-it-on-time',
      heading: 'How can you keep your implementation on time?',
      blocks: [
        { kind: 'p', text: 'Most delays are decided before the project starts. A few steps help:' },
        {
          kind: 'list',
          items: [
            'Agree the priority modules and the go-live order up front.',
            'Name a champion in each department, with time set aside.',
            'Start cleaning master data before kickoff.',
            'Sign off requirements before configuration, and price changes separately.',
          ],
        },
        { kind: 'p', text: 'See the full plan on the [MAVRO implementation](/implementation) page, or start from [when a business needs an ERP](/blog/signs-you-need-an-erp).' },
      ],
    },
  ],
  faq: [
    {
      q: 'How long does it take to implement MAVRO?',
      a: 'MAVRO is implemented in 25 to 30 days: discovery and setup in weeks one and two, priority modules live in week three, and everything, including the mobile app, live in week four.',
    },
    {
      q: 'Why do ERP implementations take longer than planned?',
      a: 'Usually because of unclean master data, slow decisions, key users who are not available, and scope that grows during the project. A phased plan with named owners controls all four.',
    },
    {
      q: 'Is the implementation done on site or remotely?',
      a: 'On site if agreed, otherwise remotely. Training is department by department, and issues during the go-live weeks are resolved the same day.',
    },
    {
      q: 'What support is there after go-live?',
      a: 'AMS support with a dedicated contact: fixes and enhancements, change requests, new modules when needed, and a monthly review of usage and roadmap.',
    },
    {
      q: 'What should we prepare before an ERP implementation starts?',
      a: 'Clean customer, supplier and item lists, opening balances and open documents, a list of users and approvers, the forms and reports in use today, and statutory details such as GSTINs and PF and ESI codes.',
    },
  ],
  sources: [
    { label: 'MAVRO implementation and support: the 25–30 day plan', url: '/implementation' },
  ],
};
