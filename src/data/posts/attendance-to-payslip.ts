import type { PostBody } from './index';

/*
 * Selling. MAVRO facts from the HRMS deck and the HRMS and Payroll module page: punches from biometric devices, the web
 * and geo-fenced mobile in one register; leave, missed punches and comp-offs in one approval queue with SLA timers,
 * checked against balances, the gate log and the roster; attendance locked at the payroll cut-off; late items paid as
 * arrears; loss of pay and overtime; PF with the ECR challan, ESI, professional tax and TDS; payroll posted to the GL;
 * payslips and tax certificates on the app (offline-capable, push alerts); attendance and payroll live in week three.
 * The chart is an example month, said so in its caption.
 */
export const post: PostBody = {
  slug: 'attendance-to-payslip',
  takeaways: [
    'When attendance and payroll live in separate tools, attendance becomes a monthly patch and errors reach payslips.',
    'In MAVRO, punches from biometric devices, the web and geo-fenced mobile land in one live register.',
    'Leave, missed punches and comp-offs are approved in one queue with an SLA, then attendance locks at the payroll cut-off.',
    'The payroll run takes attendance, loss of pay and overtime as one verified feed, computes PF, ESI, PT and TDS, and posts to the ledger.',
  ],
  sections: [
    {
      id: 'the-gap',
      heading: 'Why does attendance-to-payroll go wrong?',
      blocks: [
        { kind: 'p', text: 'In many businesses, attendance comes from one system, leave from another and payroll from a third. Every month, someone exports, cleans and re-imports the data.' },
        {
          kind: 'list',
          items: [
            'Attendance is reconciled as a monthly patch, days before payroll.',
            'Late leave approvals are absorbed silently, or missed.',
            'Payroll is not linked to the ledger, so finance posts manual journals.',
            'PF and TDS are filed from separate spreadsheets.',
          ],
        },
        { kind: 'p', text: 'Each step is a chance for an error that reaches an employee’s payslip. Fixing it later costs more trust than money.' },
      ],
    },
    {
      id: 'punches',
      heading: 'Where do attendance punches come from?',
      blocks: [
        { kind: 'p', text: 'From wherever people work. In MAVRO, punches from biometric devices, the web and geo-fenced mobile land in one live register.' },
        {
          kind: 'table',
          caption: 'Who punches where',
          head: ['People', 'How they punch'],
          rows: [
            ['Shift workers in plants', 'Biometric devices at the gate or line'],
            ['Office staff', 'The web, or the mobile app'],
            ['Field sales and service staff', 'Geo-fenced mobile, inside their territory'],
          ],
        },
        { kind: 'p', text: 'One register means one truth. A supervisor, HR and payroll all see the same attendance, as it happens, for every unit.' },
      ],
    },
    {
      id: 'field-staff',
      heading: 'How does geo-fenced mobile attendance work?',
      blocks: [
        { kind: 'p', text: 'A field employee punches in on the MAVRO app, inside the geo-fence set for their territory. A punch from outside it is flagged, not silently accepted.' },
        { kind: 'figure', module: 'hrms-and-payroll', caption: 'The MAVRO workforce dashboard: punched in today, on shift and absent, by unit.' },
        { kind: 'p', text: 'On the same app, they see their hours, leave balance and payslip. The app works offline and syncs when the connection returns, so a weak signal does not lose a day’s attendance.' },
      ],
    },
    {
      id: 'approvals',
      heading: 'How are leave and missed punches approved?',
      blocks: [
        { kind: 'p', text: 'In one queue, with a service-level timer on each request.' },
        { kind: 'p', text: 'Leave, missed punches, on-duty days and comp-offs all wait for approval in the same place. Each is checked against the employee’s balance, the gate log and the roster before it reaches payroll.' },
        { kind: 'p', text: 'Managers approve from push alerts on their phone. The SLA timer shows what is waiting and what is late, so nothing sits unnoticed until payday.' },
      ],
    },
    {
      id: 'rosters-and-overtime',
      heading: 'Where do shifts and overtime come from?',
      blocks: [
        { kind: 'p', text: 'From the roster. Shift rosters, swaps and overtime are planned in [Roster Ledger](/modules/roster-ledger), and attendance is checked against them.' },
        { kind: 'p', text: 'That is what makes overtime trustworthy. Overtime is paid against hours that were rostered and worked, not against a figure typed in at month end.' },
        { kind: 'p', text: 'For plants running three shifts, it also shows coverage gaps before a shift starts short.' },
      ],
    },
    {
      id: 'cut-off',
      heading: 'What happens at the payroll cut-off?',
      blocks: [
        { kind: 'p', text: 'Attendance locks. Whatever has been approved by the cut-off flows into the payroll run.' },
        { kind: 'p', text: 'Anything that arrives after the lock, such as a late regularisation, is not absorbed quietly. It is flagged and paid as arrears in the next month.' },
        {
          kind: 'chart',
          title: 'Example month: attendance requests by how they reached payroll',
          caption: 'An example to show the shape of a month, not data from any business.',
          categories: ['Approved within SLA', 'Approved late, before cut-off', 'After cut-off, paid as arrears'],
          series: [{ name: 'Requests', values: [212, 18, 4] }],
          format: 'number',
        },
        { kind: 'p', text: 'An enforced cut-off is what lets payroll close on time every month, with a clear record of what moved to next month and why.' },
      ],
    },
    {
      id: 'payroll-run',
      heading: 'What does the payroll run do?',
      blocks: [
        { kind: 'p', text: 'It takes attendance, loss of pay, leave balances and overtime as one verified feed, then computes pay and the statutory deductions.' },
        {
          kind: 'list',
          items: [
            'PF, with the ECR challan ready every month.',
            'ESI eligibility, deductions and returns.',
            'Professional tax by state.',
            'TDS under the regime each employee chose for the year.',
          ],
        },
        { kind: 'p', text: 'For the rules behind these, see [how PF and ESI are calculated](/blog/pf-and-esi-contributions) and [TDS on salary after April 2026](/blog/form-16-to-form-130).' },
      ],
    },
    {
      id: 'ledger',
      heading: 'How does payroll reach the books?',
      blocks: [
        { kind: 'p', text: 'Payroll posts to the general ledger on approval. Finance does not type in a payroll journal; it reviews the one payroll created.' },
        { kind: 'p', text: 'That closes the loop that separate tools leave open. Salary cost, statutory liabilities and payments all appear in the books from the same run that produced the payslips.' },
        { kind: 'p', text: 'At month end, payroll and finance reconcile nothing between them, because there is only one set of figures.' },
      ],
    },
    {
      id: 'self-service',
      heading: 'What do employees see?',
      blocks: [
        { kind: 'p', text: 'Their own records, on the app or the self-service portal, without raising an HR ticket.' },
        {
          kind: 'list',
          items: [
            'Payslips and tax certificates, on demand.',
            'Leave balances, and leave applications.',
            'Attendance and hours worked.',
            'Expense and travel claims.',
          ],
        },
        { kind: 'p', text: 'Every question an employee answers for themselves is one HR does not have to. For a growing workforce, that adds up quickly.' },
      ],
    },
    {
      id: 'joiners',
      heading: 'How does a new joiner reach payroll?',
      blocks: [
        { kind: 'p', text: 'Through an onboarding checklist, from offer to day one. Every task has an owner by name and a due date, from IT assets to statutory enrolment.' },
        { kind: 'p', text: 'Grade, CTC and location guardrails check the offer at entry. An offer outside the grade band is held before it goes out, not found in the first payroll run.' },
        { kind: 'p', text: 'By the time the joiner punches in for the first time, their record, shift and statutory details are already in place. Their first payslip needs no manual set-up.' },
      ],
    },
    {
      id: 'tax-and-benefits',
      heading: 'How are tax regimes, gratuity and LTA handled?',
      blocks: [
        { kind: 'p', text: 'Each employee picks the old or new tax regime for the financial year in MAVRO. They declare investments and upload proofs online, and monthly TDS is computed from that choice.' },
        { kind: 'p', text: 'Gratuity is accrued and paid, and LTA claims, exemptions and proofs are managed in the same module. Payroll never waits on a separate spreadsheet for them.' },
        { kind: 'p', text: 'Holiday calendars are kept per state and plant, with regional and festival holidays. A plant in one state and an office in another each follow their own calendar.' },
      ],
    },
    {
      id: 'who-does-what',
      heading: 'Who does what each month?',
      blocks: [
        { kind: 'p', text: 'Each role works on the same record, so nobody waits for an export from someone else.' },
        {
          kind: 'table',
          caption: 'Roles in the attendance-to-payroll cycle',
          head: ['Role', 'What they do in MAVRO'],
          rows: [
            ['Payroll lead', 'Runs the payroll cycle and the statutory dues, and watches the workforce by unit'],
            ['Managers', 'Approve leave and regularisations within the SLA'],
            ['HR operations', 'Own onboarding checklists, employee records and exits'],
            ['Employees', 'Punch in, apply for leave, and download payslips and tax certificates on the app'],
            ['Finance', 'Approves the run and receives the payroll journal in the ledger'],
          ],
        },
      ],
    },
    {
      id: 'month-end',
      heading: 'What does a payroll month look like, step by step?',
      blocks: [
        { kind: 'p', text: 'With one register and one queue, the month follows the same order every time:' },
        {
          kind: 'steps',
          items: [
            { title: 'Punches all month', text: 'Biometric, web and geo-fenced mobile punches land in the live register.' },
            { title: 'Approvals as they come', text: 'Leave, missed punches and comp-offs are approved in the queue, within the SLA.' },
            { title: 'Lock at the cut-off', text: 'Attendance locks; anything later is flagged for arrears next month.' },
            { title: 'Run and review', text: 'Pay, loss of pay, overtime and statutory deductions are computed from the locked feed.' },
            { title: 'Approve and post', text: 'Finance approves the run, and it posts to the general ledger.' },
            { title: 'Publish', text: 'Payslips reach the app, and PF, ESI, PT and TDS are ready to pay and file.' },
          ],
        },
      ],
    },
    {
      id: 'by-industry',
      heading: 'How does this differ by industry?',
      blocks: [
        { kind: 'p', text: 'The flow is the same; what changes is who punches where.' },
        {
          kind: 'list',
          items: [
            'Manufacturing: shift workers on biometric punches across plants, overtime from the roster, and one payroll run for every unit.',
            'Pharma: plant, QA and field teams on one record, with attrition watched by unit before it affects coverage.',
            'Distribution: depot, warehouse and sales staff across branches, with field reps on geo-fenced mobile.',
            'Services: office and on-site staff on web and mobile attendance, with leave policies and payroll in one place.',
          ],
        },
      ],
    },
    {
      id: 'exceptions',
      heading: 'What does HR still check by hand?',
      blocks: [
        { kind: 'p', text: 'Only the exceptions. A punch outside the geo-fence, a request that broke its SLA, or an arrears line from last month is shown for review.' },
        { kind: 'p', text: 'Everything else has already been checked against balances, the gate log and the roster. HR spends payroll week on the few cases that need judgement, not on re-checking every row.' },
      ],
    },
    {
      id: 'going-live',
      heading: 'How quickly can attendance and payroll go live?',
      blocks: [
        { kind: 'p', text: 'MAVRO HRMS is implemented in 25 to 30 days. The first two weeks cover discovery, configuration and a trial migration.' },
        { kind: 'p', text: 'Attendance and payroll go live in week three, and leave, self-service and the mobile app in week four. Support continues after go-live.' },
        { kind: 'p', text: 'Running one parallel month, old and new side by side, is a sensible way to prove the payroll before switching off the old tool.' },
      ],
    },
    {
      id: 'where-to-start',
      heading: 'Where should a business start?',
      blocks: [
        { kind: 'p', text: 'With the step that breaks most often. For most, that is the hand-off from attendance to payroll.' },
        { kind: 'p', text: 'See everything [MAVRO HRMS and payroll software](/modules/hrms-and-payroll) covers, from the employee register and onboarding to statutory payroll and the mobile app.' },
      ],
    },
  ],
  faq: [
    {
      q: 'Can biometric attendance feed payroll automatically?',
      a: 'Yes. In MAVRO, biometric, web and geo-fenced mobile punches land in one register, are approved against balances and the roster, and flow into the payroll run at the cut-off.',
    },
    {
      q: 'What happens to attendance changes after the payroll cut-off?',
      a: 'Attendance locks at the cut-off. Late regularisations are flagged and paid as arrears in the next month, rather than absorbed silently.',
    },
    {
      q: 'Does MAVRO payroll post to the general ledger?',
      a: 'Yes. Payroll posts to the general ledger on approval, so salary cost and statutory liabilities reach the books from the same run that produced the payslips.',
    },
    {
      q: 'Can field staff mark attendance from their phones?',
      a: 'Yes. Field staff punch in on the MAVRO app inside their territory’s geo-fence; the app works offline and syncs when the connection returns.',
    },
  ],
  sources: [
    { label: 'MAVRO HRMS and Payroll: what the module does', url: '/modules/hrms-and-payroll' },
    { label: 'MAVRO Roster Ledger: shift rosters, coverage and overtime', url: '/modules/roster-ledger' },
  ],
};
