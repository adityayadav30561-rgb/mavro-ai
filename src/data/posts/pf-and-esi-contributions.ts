import type { PostBody } from './index';

/*
 * Checked 2026-11-10. EPF wage ceiling ₹25,000 from 17 September 2026 (S.O. 5109(E), Code on Social Security):
 * BDO and the notification record agree. Rates (12% + 12%, EPS 8.33%, ESI 0.75% + 3.25%, ESI ceiling ₹21,000) agree
 * across sources. The 50% wage rule (Code on Wages s. 2(y), in force 21 Nov 2025): India Briefing, KSandK, TaxGuru.
 * Left out on purpose (sources disagree or unverified): how September 2026 is split between the old and new ceiling,
 * EDLI and administration charge rates.
 */
export const post: PostBody = {
  slug: 'pf-and-esi-contributions',
  sections: [
    {
      heading: 'How much PF do the employer and the employee pay?',
      paragraphs: [
        'Each pays 12% of the employee’s PF wages every month. The employee’s 12% goes to their provident fund account. The employer’s 12% is split: 8.33% goes to the Employees’ Pension Scheme (EPS) and the remaining 3.67% to the provident fund account.',
        'The pension share is worked out on wages up to the EPF wage ceiling, so it stops growing once wages pass the ceiling.',
      ],
    },
    {
      heading: 'What is the EPF wage ceiling now?',
      paragraphs: [
        'The EPF wage ceiling is ₹25,000 a month from 17 September 2026. A notification under the Code on Social Security, 2020 (S.O. 5109(E)) raised it from the ₹15,000 that had applied before.',
        'The ceiling decides who must be covered and how far the pension contribution is calculated, so payroll set up for the old figure has to be updated.',
      ],
    },
    {
      heading: 'Who is covered by ESI, and at what rate?',
      paragraphs: [
        'ESI covers employees whose gross wages are up to ₹21,000 a month (₹25,000 for persons with disabilities). The employee pays 0.75% of gross wages and the employer 3.25%, 4% in all.',
        'Unlike PF, ESI is calculated on gross wages rather than on PF wages.',
      ],
    },
    {
      heading: 'A worked example',
      paragraphs: [
        'Take an employee with PF wages of ₹20,000 and gross wages of ₹20,000 a month.',
        'PF: the employee pays 12%, ₹2,400. The employer also pays ₹2,400: 8.33% to EPS (₹1,666) and 3.67% to the provident fund (₹734). The wages are under the ₹25,000 ceiling, so the full amount counts.',
        'ESI: gross wages are within ₹21,000, so ESI applies. The employee pays 0.75%, ₹150, and the employer 3.25%, ₹650.',
        'Each month, then, ₹2,550 is deducted from this employee’s pay for PF and ESI, and the employer adds ₹3,050.',
      ],
    },
    {
      heading: 'What changed with the labour codes?',
      paragraphs: [
        'The four labour codes took effect on 21 November 2025, with one definition of wages for all of them (section 2(y) of the Code on Wages, 2019). Under it, where the allowances left out of wages exceed half of total pay, the excess is added back to wages.',
        'Employers whose pay structures kept basic pay low may therefore see higher PF contributions; where PF is worked out only up to the wage ceiling, the effect is smaller. The details depend on how each pay component is classified, so check them with your adviser.',
      ],
    },
  ],
  mavro: [
    'MAVRO HRMS and Payroll computes PF contributions in the payroll run and prepares the ECR challan every month, and handles ESI eligibility, deductions and returns, with payroll posted to the ledger on approval.',
    'Attendance from biometric, web and mobile punches locks at the payroll cut-off and flows into the run, so contributions are worked out on the month’s actual pay.',
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
