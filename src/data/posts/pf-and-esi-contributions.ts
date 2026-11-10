import type { PostBody } from './index';

/*
 * Informational. Checked 2026-11-10.
 * - EPF wage ceiling ₹25,000 from 17 September 2026 (S.O. 5109(E), Code on Social Security): BDO, the notification
 *   record and KSandK agree. Rates (12% + 12%, EPS 8.33%, EPF 3.67%) agree across sources.
 * - ESI: 0.75% employee, 3.25% employer, on gross wages up to ₹21,000 a month (₹25,000 for persons with disabilities).
 * - The 50% wage rule (Code on Wages s. 2(y), in force 21 November 2025): India Briefing, KSandK, TaxGuru.
 * Every amount in the tables and chart is arithmetic on those rates. Left out on purpose (sources disagree or
 * unverified): how September 2026 splits between the two ceilings, EDLI and administration charge rates, due dates.
 */
export const post: PostBody = {
  slug: 'pf-and-esi-contributions',
  takeaways: [
    'Employer and employee each pay 12% of the employee’s PF wages every month; 8.33% of the employer’s share goes to the pension scheme (EPS).',
    'The EPF wage ceiling is ₹25,000 a month from 17 September 2026, up from ₹15,000. It caps the pension share.',
    'ESI applies to gross wages up to ₹21,000 a month: the employee pays 0.75% and the employer 3.25%.',
    'Under the labour codes, allowances above half of total pay count as wages, which can raise the PF base.',
  ],
  sections: [
    {
      id: 'what-are-pf-and-esi',
      heading: 'What are PF and ESI?',
      blocks: [
        { kind: 'p', text: 'PF and ESI are the two monthly social security contributions most Indian employers deduct from salary and add to themselves.' },
        {
          kind: 'list',
          items: [
            'PF, the Employees’ Provident Fund, is retirement savings run by the EPFO. Part of the employer’s share goes into the Employees’ Pension Scheme (EPS).',
            'ESI, Employees’ State Insurance, is health cover and cash benefits run by the ESIC, for employees up to a wage limit.',
          ],
        },
        { kind: 'p', text: 'Both are worked out every month, in the same payroll run that produces the payslip. Getting either wrong means arrears, interest and a correction that touches every affected employee.' },
        { kind: 'p', text: 'This guide covers the rates, the wage ceilings, a worked example and what the labour codes changed. It reflects the rules as checked on the date above.' },
      ],
    },
    {
      id: 'pf-rates',
      heading: 'How much PF do the employer and the employee pay?',
      blocks: [
        { kind: 'p', text: 'Each pays 12% of the employee’s PF wages every month. The employee’s 12% goes to their provident fund account in full.' },
        { kind: 'p', text: 'The employer’s 12% is split in two. 8.33% goes to the Employees’ Pension Scheme and the remaining 3.67% to the provident fund account.' },
        {
          kind: 'table',
          caption: 'Where each PF contribution goes',
          head: ['Contribution', 'Rate of PF wages', 'Goes to'],
          rows: [
            ['Employee', '12%', 'Provident fund account (EPF)'],
            ['Employer, pension share', '8.33%', 'Employees’ Pension Scheme (EPS), on wages up to the ceiling'],
            ['Employer, provident fund share', '3.67%', 'Provident fund account (EPF)'],
          ],
          note: 'The employer also pays insurance (EDLI) and administration charges, which are not covered here.',
        },
        { kind: 'p', text: 'The pension share is worked out on wages only up to the EPF wage ceiling. Where PF is paid on higher wages, the pension share stays capped and the rest of the employer’s 12% goes to the provident fund.' },
      ],
    },
    {
      id: 'epf-wage-ceiling',
      heading: 'What is the EPF wage ceiling in 2026?',
      blocks: [
        { kind: 'p', text: 'The EPF wage ceiling is ₹25,000 a month from 17 September 2026. A notification under the Code on Social Security, 2020 (S.O. 5109(E)) raised it from the ₹15,000 that applied before.' },
        { kind: 'p', text: 'The ceiling does two jobs in payroll:' },
        {
          kind: 'list',
          items: [
            'It decides who must be covered: employees earning up to the ceiling are covered compulsorily.',
            'It caps the pension share: 8.33% of ₹25,000 is about ₹2,083 a month, however high the wages.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Update the ceiling in your payroll setup',
          text: 'A payroll configured for ₹15,000 will under-pay the pension share and may leave out employees who are now covered. Check the ceiling, the coverage rule and the EPS cap in your setup.',
        },
      ],
    },
    {
      id: 'esi',
      heading: 'Who is covered by ESI, and at what rate?',
      blocks: [
        { kind: 'p', text: 'ESI covers employees whose gross wages are up to ₹21,000 a month, or ₹25,000 for persons with disabilities.' },
        { kind: 'p', text: 'The employee pays 0.75% of gross wages and the employer 3.25%, so 4% in all.' },
        { kind: 'p', text: 'Two differences from PF trip payroll teams up:' },
        {
          kind: 'list',
          items: [
            'ESI is worked out on gross wages, not on PF wages.',
            'Above the wage limit there is no ESI at all, rather than a capped amount.',
          ],
        },
      ],
    },
    {
      id: 'worked-example',
      heading: 'How do PF and ESI work out on a real salary?',
      blocks: [
        { kind: 'p', text: 'Take an employee whose PF wages and gross wages are both ₹20,000 a month. That is under the ₹25,000 EPF ceiling and within the ₹21,000 ESI limit, so both apply in full.' },
        {
          kind: 'table',
          caption: 'Monthly PF and ESI on wages of ₹20,000',
          head: ['Item', 'Rate', 'Amount'],
          rows: [
            ['Employee PF', '12%', '₹2,400'],
            ['Employer PF, pension (EPS)', '8.33%', '₹1,666'],
            ['Employer PF, provident fund', '3.67%', '₹734'],
            ['Employee ESI', '0.75%', '₹150'],
            ['Employer ESI', '3.25%', '₹650'],
            ['Deducted from the employee’s pay', '', '₹2,550'],
            ['Added by the employer', '', '₹3,050'],
          ],
        },
        { kind: 'p', text: 'The chart below runs the same rates at three wage levels. At ₹24,000 the employee is above the ESI limit, so ESI drops out and only PF remains.' },
        {
          kind: 'chart',
          title: 'Monthly PF and ESI contributions at three wage levels',
          caption: 'Worked out from the rates above, assuming PF wages equal gross wages. ESI shows both shares together.',
          categories: ['Wages ₹16,000', 'Wages ₹20,000', 'Wages ₹24,000'],
          series: [
            { name: 'Employee PF', values: [1920, 2400, 2880] },
            { name: 'Employer PF', values: [1920, 2400, 2880] },
            { name: 'ESI, both shares', values: [640, 800, 0] },
          ],
          format: 'inr',
        },
      ],
    },
    {
      id: 'labour-codes',
      heading: 'What did the labour codes change for PF?',
      blocks: [
        { kind: 'p', text: 'The four labour codes took effect on 21 November 2025, with one definition of wages for all of them. It is set out in section 2(y) of the Code on Wages, 2019.' },
        { kind: 'p', text: 'Under it, some allowances are left out of wages. But where those left-out allowances exceed half of total pay, the excess is added back to wages.' },
        {
          kind: 'table',
          caption: 'Example: how the 50% rule can raise PF wages',
          head: ['Step', 'Amount'],
          rows: [
            ['Total pay', '₹40,000'],
            ['Basic pay', '₹15,000'],
            ['Allowances left out of wages', '₹25,000'],
            ['Half of total pay', '₹20,000'],
            ['Excess added back to wages', '₹5,000'],
            ['Wages for PF', '₹20,000'],
          ],
          note: 'An illustration of the rule. How each pay component is classified depends on your structure; check it with your adviser.',
        },
        { kind: 'p', text: 'Employers whose structures kept basic pay low may therefore pay more PF. Where PF is worked out only up to the wage ceiling, the effect is smaller.' },
      ],
    },
    {
      id: 'monthly-check',
      heading: 'How should payroll check PF and ESI every month?',
      blocks: [
        { kind: 'p', text: 'A short routine before each payroll closes catches most errors while they are still cheap to fix.' },
        {
          kind: 'steps',
          items: [
            { title: 'Confirm the wage base', text: 'Check each employee’s PF wages against the 50% rule, and gross wages for ESI.' },
            { title: 'Apply the ceilings', text: 'Cap the pension share at 8.33% of ₹25,000 and drop ESI for anyone above the limit.' },
            { title: 'Review the changes', text: 'Look at joiners, leavers, pay revisions and arrears, the lines most likely to be wrong.' },
            { title: 'Reconcile the totals', text: 'Match total PF and ESI in payroll to the challan amounts before they are paid.' },
            { title: 'Post and keep the record', text: 'Post payroll to the ledger and keep the month’s working with the challans for audit.' },
          ],
        },
        { kind: 'p', text: 'Doing this inside the payroll system, not in a spreadsheet beside it, keeps the check and the payment on the same numbers.' },
      ],
    },
    {
      id: 'joiners-and-leavers',
      heading: 'How do joiners, leavers and pay changes affect PF and ESI?',
      blocks: [
        { kind: 'p', text: 'PF and ESI follow the wages actually paid for the month. So the month someone joins or leaves, contributions are worked out on the pay for the days they were paid.' },
        { kind: 'p', text: 'Pay revisions need the same care. A raise can take an employee past the ESI limit or change how far the pension share is capped.' },
        { kind: 'p', text: 'Arrears paid in a later month are wages too, so PF follows them when they are paid. Keeping attendance, pay changes and arrears in one system means the contributions follow without anyone re-keying them.' },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'What are the common PF and ESI mistakes?',
      blocks: [
        { kind: 'p', text: 'Most errors come from rules that changed or from treating PF and ESI the same way. Watch for these:' },
        {
          kind: 'list',
          items: [
            'Keeping the old ₹15,000 ceiling in payroll after 17 September 2026.',
            'Working out PF on basic pay alone, without testing the 50% wage rule.',
            'Working out ESI on PF wages instead of gross wages.',
            'Letting the pension share grow past 8.33% of the ceiling.',
            'Deducting ESI from an employee whose gross wages are above the limit.',
          ],
        },
        { kind: 'p', text: 'Each of these is cheapest to fix in the payroll setup, before the month is paid. Once contributions are filed, a correction means revised returns and arrears for every affected employee.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How does MAVRO handle PF and ESI?',
      blocks: [
        { kind: 'p', text: 'MAVRO’s [payroll software](/modules/hrms-and-payroll) computes PF in every payroll run and has the ECR challan ready each month. It handles ESI eligibility, deductions and returns in the same run.' },
        { kind: 'figure', module: 'hrms-and-payroll', caption: 'The workforce dashboard in MAVRO HRMS and Payroll: headcount, attendance and attrition by unit.' },
        { kind: 'p', text: 'Attendance from biometric, web and mobile punches locks at the payroll cut-off and flows into the run. Contributions are worked out on the month’s actual pay, and payroll posts to the ledger on approval.' },
        { kind: 'p', text: 'Joiners, leavers, pay revisions and arrears flow through the same run, so contributions follow the month’s real pay without anyone re-keying it.' },
        { kind: 'p', text: 'For the tax deducted from the same salary, see [Form 16 is now Form 130](/blog/form-16-to-form-130). For how statutory payroll sits with the rest of MAVRO’s compliance, see [security and compliance](/security-and-compliance).' },
      ],
    },
  ],
  faq: [
    {
      q: 'Is PF calculated on basic or gross salary?',
      a: 'PF is calculated on PF wages, which are mainly basic pay and dearness allowance. Under the labour codes, allowances above half of total pay are added back, so PF wages can be more than basic pay.',
    },
    {
      q: 'What is the PF wage ceiling in 2026?',
      a: 'The EPF wage ceiling is ₹25,000 a month from 17 September 2026, raised from ₹15,000 by notification S.O. 5109(E) under the Code on Social Security, 2020.',
    },
    {
      q: 'Is ESI deducted if salary is above ₹21,000?',
      a: 'No. ESI applies to employees whose gross wages are up to ₹21,000 a month, or ₹25,000 for persons with disabilities. Above that, neither the employee nor the employer pays ESI.',
    },
    {
      q: 'Who pays the EPS pension contribution?',
      a: 'The employer. The 8.33% that goes to the Employees’ Pension Scheme is part of the employer’s 12%; the employee’s 12% goes to the provident fund account in full.',
    },
    {
      q: 'Does all of the employer’s 12% go to the employee’s PF account?',
      a: 'No. Of the employer’s 12%, 8.33% goes to the Employees’ Pension Scheme, worked out on wages up to the ceiling, and the rest goes to the provident fund account.',
    },
  ],
  sources: [
    { label: 'BDO India: PF wage ceiling increased to ₹25,000 under the Social Security Code', url: 'https://www.bdo.in/en-gb/insights/alerts-updates/alert-new-epf-ceiling-hiked' },
    {
      label: 'Notification revising the wage ceiling from ₹15,000 to ₹25,000 for Chapter III of the Code on Social Security, from 17 September 2026',
      url: 'https://www.simpliance.in/India/LEI/govt_notification/central/notification-regarding-revision-of-wage-ceiling-rs-15000-to-rs25000-for-the-purpose-of-chapter-iii-of-cossepf-wef-17th-sep-2026-10267',
    },
    { label: 'KSandK: EPF wage ceiling increased to ₹25,000, employer obligations', url: 'https://ksandk.com/newsletter/epf-wage-ceiling-25000-employer-compliance-2026/' },
    { label: 'Calcguru: PF and ESI rates and the ESI wage ceiling (2026)', url: 'https://calcguru.in/?p=4238' },
    { label: 'India Briefing: the 50% wage rule and PF under the labour codes', url: 'https://india-briefing.com/news/salary-structure-india-labor-code-compliance-guide-44332.html/' },
    { label: 'KSandK: the 50% wage rule under the labour codes, salary, PF and gratuity', url: 'https://ksandk.com/labour-employment/50-wage-rule-labour-codes-salary-pf-gratuity/' },
    { label: 'TaxGuru: wage rules for employers effective 21 November 2025', url: 'https://taxguru.in/corporate-law/employers-wage-rules-effective-21st-nov-2025.html' },
  ],
};
