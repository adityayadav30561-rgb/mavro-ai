import type { PostBody } from './index';

/*
 * Informational. Checked 2026-11-10. The Income-tax Act, 2025 and Income-tax Rules, 2026 in force from 1 April 2026;
 * Form 16 → Form 130 and Form 16A → Form 131 (BusinessToday, Free Press Journal, TDSMAN agree); FY 2025-26 certificates
 * on the old Form 16, due by 15 June 2026; the last old Form 24Q quarter due by 31 May 2026 (factoHR and others);
 * "tax year" in place of previous year and assessment year (ClearTax). Left out on purpose (sources disagree): the new
 * number of Form 24Q (138 or 143), of Form 12BB and of Form 26AS, and the new Act's due dates.
 */
export const post: PostBody = {
  slug: 'form-16-to-form-130',
  takeaways: [
    'Form 130 replaces Form 16 as the certificate of tax deducted from salary, under the Income-tax Act, 2025, in force from 1 April 2026.',
    'Salary for the financial year 2025-26 still gets the old Form 16, due by 15 June 2026; salary from 1 April 2026 gets Form 130.',
    'The new Act uses one “tax year” in place of the old previous year and assessment year.',
    'Employers still deduct tax every month and file a quarterly return; take the new return’s form number from the notified forms.',
  ],
  sections: [
    {
      id: 'what-replaced-form-16',
      heading: 'What replaced Form 16?',
      blocks: [
        { kind: 'p', text: 'Form 130 replaces Form 16 as the certificate an employer gives each employee for the tax deducted from their salary.' },
        { kind: 'p', text: 'The change comes from the Income-tax Act, 2025 and the Income-tax Rules, 2026. They replaced the Income-tax Act, 1961 from 1 April 2026 and renumbered the forms.' },
        {
          kind: 'table',
          caption: 'The TDS certificates under the old and new Acts',
          head: ['What it certifies', 'Old Act (1961)', 'New Act (2025)'],
          rows: [
            ['Tax deducted from salary', 'Form 16', 'Form 130'],
            ['Tax deducted from other payments', 'Form 16A', 'Form 131'],
          ],
          note: 'Other forms were renumbered too. Where reports disagree on a new number, take it from the forms notified on the income tax department’s website.',
        },
        { kind: 'p', text: 'The purpose of the certificate has not changed. It still shows the salary paid, the deductions claimed and the tax deducted and deposited for the year.' },
      ],
    },
    {
      id: 'which-form-for-which-year',
      heading: 'Which form applies to which year?',
      blocks: [
        { kind: 'p', text: 'The year in which the salary was paid decides the form, not the date the certificate is issued.' },
        {
          kind: 'table',
          caption: 'Which certificate and return each year uses',
          head: ['Salary paid in', 'Law', 'Certificate', 'Quarterly return'],
          rows: [
            ['Financial year 2025-26 (to 31 March 2026)', 'Income-tax Act, 1961', 'Form 16, due by 15 June 2026', 'Form 24Q; last quarter due by 31 May 2026'],
            ['Tax year 2026-27 (from 1 April 2026)', 'Income-tax Act, 2025', 'Form 130', 'The renumbered quarterly return'],
          ],
        },
        { kind: 'p', text: 'So June 2026 was a transition month. Employers issued the old Form 16 for the year just ended while already deducting tax under the new Act.' },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Keep both sets of records',
          text: 'Returns and certificates for 2025-26 and earlier stay under the old Act, so keep them for assessments and corrections. Do not mix them with the new forms.',
        },
      ],
    },
    {
      id: 'what-is-a-tax-year',
      heading: 'What is a “tax year”?',
      blocks: [
        { kind: 'p', text: 'A tax year is the twelve months from 1 April in which income is earned and taxed. The new Act uses this one term throughout.' },
        { kind: 'p', text: 'The old Act used a pair of terms: the previous year, when income was earned, and the assessment year, when it was assessed. That pairing caused endless confusion on payslips and certificates.' },
        {
          kind: 'table',
          caption: 'How the terms map',
          head: ['Income earned from 1 April 2026 to 31 March 2027', 'Called'],
          rows: [
            ['Under the old Act', 'Previous year 2026-27, assessed in assessment year 2027-28'],
            ['Under the new Act', 'Tax year 2026-27'],
          ],
        },
        { kind: 'p', text: 'Payslips, certificates and declarations for salary from April 2026 should therefore say “tax year 2026-27”.' },
      ],
    },
    {
      id: 'how-tds-on-salary-works',
      heading: 'How does an employer deduct tax from salary each month?',
      blocks: [
        { kind: 'p', text: 'The method is the same under both Acts: estimate the year’s tax, spread it over the months, and adjust as the facts change.' },
        {
          kind: 'steps',
          items: [
            { title: 'Estimate the year’s salary', text: 'Project each employee’s taxable salary for the whole year, including expected raises and bonuses.' },
            { title: 'Apply the regime and declarations', text: 'Use the tax regime the employee chose and the deductions they declared.' },
            { title: 'Deduct monthly', text: 'Spread the remaining tax over the months left and deduct it from each month’s salary.' },
            { title: 'Deposit and report', text: 'Deposit the tax with the government and report it in the quarterly return.' },
            { title: 'True up at year end', text: 'Replace declarations with proofs, recompute, and issue the certificate.' },
          ],
        },
        { kind: 'p', text: 'Errors usually come from stale estimates. A raise, an arrears payment or a late proof changes the year’s tax, and the monthly deduction must follow.' },
      ],
    },
    {
      id: 'quarterly-return',
      heading: 'Do employers still file a quarterly TDS return on salaries?',
      blocks: [
        { kind: 'p', text: 'Yes. Employers still report salary TDS every quarter. For the old Act’s last year, the return was Form 24Q, with the last quarter due by 31 May 2026.' },
        { kind: 'p', text: 'From tax year 2026-27 the quarterly return carries a new form number under the 2026 Rules. Reports differ on the number, so take it from the forms notified on the income tax department’s website.' },
        { kind: 'p', text: 'The certificate is built from the returns. If a quarter’s return is wrong, the employee’s certificate and their own tax credit will be wrong too.' },
      ],
    },
    {
      id: 'what-employees-should-check',
      heading: 'What should employees check on Form 130?',
      blocks: [
        { kind: 'p', text: 'Employees use the certificate to file their own return, so a few minutes checking it saves a mismatch later.' },
        {
          kind: 'list',
          items: [
            'The employer’s details and the tax year: tax year 2026-27 for salary from April 2026.',
            'Gross salary and the exemptions and deductions they claimed.',
            'Tax deducted each quarter, and that it matches what the tax department shows against their PAN.',
            'The tax regime the employer applied.',
          ],
        },
        { kind: 'p', text: 'Anyone who changed jobs during the year gets a certificate from each employer and must add the two together in their return.' },
      ],
    },
    {
      id: 'payroll-checklist',
      heading: 'What should payroll teams do now?',
      blocks: [
        { kind: 'p', text: 'The law changed in the middle of the payroll calendar, so a short checklist helps:' },
        {
          kind: 'list',
          items: [
            'Confirm that salary TDS from April 2026 is reported on the new forms.',
            'Change “assessment year” wording on payslips and letters to “tax year”.',
            'Plan to issue Form 130 for tax year 2026-27, built from the year’s quarterly returns.',
            'Keep the old Form 16 and Form 24Q records for 2025-26 and earlier.',
            'Collect investment declarations and proofs on the new declaration form.',
          ],
        },
        { kind: 'p', text: 'Most of this is a payroll setup change, not a change in how much tax is deducted. The amounts still come from the salary, the regime and the deductions.' },
      ],
    },
    {
      id: 'if-form-130-is-wrong',
      heading: 'What if the certificate is wrong?',
      blocks: [
        { kind: 'p', text: 'A wrong certificate almost always means a wrong quarterly return behind it. The fix starts with the employer, not the employee’s own tax return.' },
        {
          kind: 'steps',
          items: [
            { title: 'Compare', text: 'The employee compares the certificate with the tax credit the tax department shows against their PAN.' },
            { title: 'Raise it', text: 'They tell the employer which quarter and which amount do not match.' },
            { title: 'Correct the return', text: 'The employer files a correction to that quarter’s return.' },
            { title: 'Reissue', text: 'Once the correction is processed, the employer reissues the certificate.' },
          ],
        },
        { kind: 'p', text: 'Most mismatches come from a wrong PAN, tax deposited against the wrong quarter, or a late correction. All three are payroll data problems, caught earlier by a monthly check.' },
      ],
    },
    {
      id: 'what-changes-in-payroll-software',
      heading: 'What does the change mean for payroll software?',
      blocks: [
        { kind: 'p', text: 'For payroll systems, the new Act is mostly a change of forms, labels and dates rather than of arithmetic.' },
        {
          kind: 'list',
          items: [
            'New form layouts and numbers for the certificate and the quarterly return.',
            '“Tax year” in place of the old year terms on every output.',
            'Two sets of history: the old Act for 2025-26 and earlier, the new Act from April 2026.',
            'The new declaration form for investment declarations and proofs.',
          ],
        },
        { kind: 'p', text: 'Test the new outputs on one month’s data before the first quarterly return is due. A mistake found then costs a reprint; found after filing, it costs a correction.' },
      ],
    },
    {
      id: 'certificate-and-own-return',
      heading: 'How does the certificate connect to the employee’s own return?',
      blocks: [
        { kind: 'p', text: 'The employee files their own income tax return using the salary certificate and the tax credit the department shows against their PAN. The two should agree.' },
        { kind: 'p', text: 'If the employer deducted more than the final tax, the employee claims the difference as a refund in their return. If it deducted less, the employee pays the balance.' },
        { kind: 'p', text: 'Both cases usually trace back to declarations. An employee who declared investments and never proved them, or proved more than they declared, sees the gap at year end.' },
        { kind: 'p', text: 'Good payroll practice is to collect proofs before the last quarter, so the final months’ deductions absorb any change and the certificate needs no correction.' },
      ],
    },
    {
      id: 'how-mavro-handles-this',
      heading: 'How does MAVRO handle TDS on salary?',
      blocks: [
        { kind: 'p', text: 'MAVRO’s [payroll software](/modules/hrms-and-payroll) computes TDS on salary every month. Each employee chooses the old or new tax regime for the year, and declares investments with proofs online.' },
        { kind: 'figure', module: 'hrms-and-payroll', caption: 'MAVRO HRMS and Payroll: the workforce view that payroll and TDS are worked out from.' },
        { kind: 'p', text: 'Employees download their payslips and tax certificates from the MAVRO app or the self-service portal. Payroll posts to the ledger on approval, so the tax deducted and the books agree.' },
        { kind: 'p', text: 'Because attendance, pay and tax sit in one system, a raise or an arrears payment changes the year’s tax estimate in the same run, and the monthly deduction follows without a separate spreadsheet.' },
        { kind: 'p', text: 'For the social security side of the same payslip, see [how PF and ESI contributions are calculated](/blog/pf-and-esi-contributions).' },
      ],
    },
  ],
  faq: [
    {
      q: 'Is Form 16 replaced by Form 130?',
      a: 'Yes. Under the Income-tax Act, 2025, in force from 1 April 2026, the salary TDS certificate is Form 130. Salary paid in the financial year 2025-26 still gets the old Form 16.',
    },
    {
      q: 'When will employees get Form 130?',
      a: 'Form 130 covers salary paid from 1 April 2026, so the first ones are issued after tax year 2026-27 ends. For 2025-26, employers issued the old Form 16, due by 15 June 2026.',
    },
    {
      q: 'What is the difference between Form 16 and Form 16A now?',
      a: 'Form 16 certified tax deducted from salary and Form 16A tax deducted from other payments. Under the new Act they are Form 130 and Form 131.',
    },
    {
      q: 'What does tax year mean in the Income-tax Act, 2025?',
      a: 'A tax year is the twelve months from 1 April in which income is earned and taxed. It replaces the old previous year and assessment year, so income from April 2026 to March 2027 is tax year 2026-27.',
    },
    {
      q: 'Did employers still issue Form 16 for 2025-26?',
      a: 'Yes. Salary paid in the financial year 2025-26 falls under the old Income-tax Act, 1961, so employers issued the old Form 16 for it, due by 15 June 2026.',
    },
  ],
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
    { label: 'factoHR: Form 24Q due dates and Form 16 timing', url: 'https://factohr.com/form-24q/' },
  ],
};
