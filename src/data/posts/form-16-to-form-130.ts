import type { PostBody } from './index';

/*
 * Checked 2026-11-10. The Income-tax Act, 2025 and Income-tax Rules, 2026 in force from 1 April 2026; Form 16 →
 * Form 130 and Form 16A → Form 131 (BusinessToday, Free Press Journal, TDSMAN agree); FY 2025-26 certificates still
 * on the old Form 16 by 15 June 2026; "tax year" replaces previous year / assessment year. Left out on purpose
 * (sources disagree): the new number of Form 24Q (138 or 143) and of Form 12BB, and new-regime due dates.
 */
export const post: PostBody = {
  slug: 'form-16-to-form-130',
  takeaways: [],
  sections: [
    {
      id: 'what-replaced-form-16',
      heading: 'What replaced Form 16?',
      blocks: [
        { kind: 'p', text: 'Form 130 replaces Form 16 as the certificate of tax deducted from salary. The Income-tax Act, 2025 and the Income-tax Rules, 2026 replaced the Income-tax Act, 1961 from 1 April 2026 and renumbered the forms; Form 16A, the certificate for TDS on other payments, became Form 131.' },
      ],
    },
    {
      id: 'which-form-applies-to-which-year',
      heading: 'Which form applies to which year?',
      blocks: [
        { kind: 'p', text: 'The year decides the form. Salary paid in the financial year 2025-26, which ended on 31 March 2026, falls under the old Act, so employers issued the old Form 16 for it, due by 15 June 2026.' },
        { kind: 'p', text: 'Salary paid from 1 April 2026 falls under the new Act, so the certificate for tax year 2026-27 is the new Form 130.' },
      ],
    },
    {
      id: 'what-is-a-tax-year',
      heading: 'What is a “tax year”?',
      blocks: [
        { kind: 'p', text: 'The new Act uses one “tax year”, the twelve months from 1 April, in place of the old pair of “previous year” (when income is earned) and “assessment year” (when it is assessed). Tax year 2026-27 runs from 1 April 2026 to 31 March 2027.' },
      ],
    },
    {
      id: 'do-employers-still-file-a-quarterly-tds',
      heading: 'Do employers still file a quarterly TDS return on salaries?',
      blocks: [
        { kind: 'p', text: 'Yes. Employers still deduct tax from salary every month and report it quarterly. For the old Act’s last year, the return was Form 24Q, with the last quarter due by 31 May 2026.' },
        { kind: 'p', text: 'From tax year 2026-27 the quarterly return has a new form number under the 2026 Rules. Reports differ on the number, so take it from the forms notified on the income tax department’s website.' },
      ],
    },
    {
      id: 'what-should-payroll-teams-check-now',
      heading: 'What should payroll teams check now?',
      blocks: [
        { kind: 'p', text: 'That this year’s salary TDS is reported on the new forms, that employee certificates for 2026-27 will be issued as Form 130, and that last year’s Form 16 and Form 24Q records are kept for the old Act’s assessments.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How MAVRO handles this',
      blocks: [
        { kind: 'p', text: 'MAVRO HRMS and Payroll computes TDS on salary every month, lets each employee choose the old or new tax regime for the financial year, takes investment declarations with proofs online, and generates employees’ TDS certificates in the app.' },
        { kind: 'p', text: 'Employees download their payslips and tax certificates from the MAVRO app or the self-service portal.' },
      ],
    },
  ],
  faq: [],
  sources: [
    {
      label: 'Business Today: Form 16 to Form 130, the new forms from 1 April 2026',
      url: 'https://www.businesstoday.in/personal-finance/news/story/form-16-to-form-130-new-income-tax-act-brings-in-new-forms-from-april-1-522253-2026-03-25',
    },
    {
      label: 'Free Press Journal: Form 16 to turn into Form 130 under the Income-tax Act, 2025',
      url: 'https://www.freepressjournal.in/business/form-16-to-turn-into-form-130-26as-to-become-168-from-april-1-2026-what-will-change-under-the-new-income-tax-act-2025',
    },
    { label: 'TDSMAN: new TDS and TCS forms under the Income-tax Act, 2025, mapped to the old forms', url: 'https://blog.tdsman.com/2026/06/new-tds-tcs-forms-it-act-2025-mapping-with-old-forms/' },
    { label: 'ClearTax: TDS and TCS changes from April 2026', url: 'https://cleartax.in/s/tds-and-tcs-changes-from-april-2026' },
    { label: 'Form 24Q due dates and Form 16 timing (factoHR)', url: 'https://factohr.com/form-24q/' },
  ],
};
