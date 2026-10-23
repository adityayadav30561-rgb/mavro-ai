import type { ModuleContent } from '../schema';

/*
 * Travel and Expense. Source: product deck v2, slides 40–41 (tagline, four tiles, what it does, why it matters,
 * four screens). The deck writes it for a field-heavy workforce, which is how the screens' scenario uses it: the
 * Sales Force Automation field force and the finance shared service. Figures on the tiles come from the screens
 * (prototype/modules/travel-and-expense/); like all screen data they are illustrative.
 */
export const content: ModuleContent<'travel-and-expense'> = {
  slug: 'travel-and-expense',
  tagline: 'Trip request to reimbursement: policy-checked travel spend with a clean payroll close.',
  tiles: [
    {
      icon: 'eye',
      title: 'Spend and compliance',
      body: 'Travel spend by region, policy violations and payout speed.',
      figure: { value: '94%', label: 'within policy' },
    },
    {
      icon: 'travel',
      title: 'Trip requests',
      body: 'Pre-trip approval against grade entitlements and negotiated rates.',
      figure: { value: '₹3,600', label: 'excess shown up front' },
    },
    {
      icon: 'receipt',
      title: 'Expense reports',
      body: 'Receipt-backed claims with policy flags on every line.',
      figure: { value: '99.2%', label: 'lines with receipts' },
    },
    {
      icon: 'finance',
      title: 'Reimbursements',
      body: 'Settled on SLA, by bank transfer or in the payroll run.',
      figure: { value: '4.2 days', label: 'to reimburse' },
    },
  ],
  what: 'Travel and expense control for a field-heavy workforce: regional spend and compliance health, trip requests checked against grade entitlements and negotiated rates before anyone books, receipt-backed expense reports with automatic policy flags, and a reimbursement queue that settles on SLA, by bank transfer or in the payroll run.',
  why: [
    'Entitlement breaches are approved knowingly, with the excess quantified up front.',
    'Out-of-policy hotel tariffs and late bookings are flagged before the money is spent, not after.',
    'Missing receipts and GST-invalid claims are held out of the payment run.',
    'Unsettled travel advances stay visible against the traveller until they are recovered.',
    'Claim ageing and the settlement SLA are owned by the finance shared service.',
    'Spend by region and cost centre reads against budget on one screen.',
  ],
  flow: {
    from: [
      { slug: 'hrms-and-payroll', passes: 'Employees, grades and cost centres' },
      { slug: 'sales-force-automation', passes: 'Field visits behind each claim' },
      { slug: 'project-management', passes: 'Projects to charge travel to' },
      { slug: 'cost-forecasting', passes: 'Travel budgets by cost centre' },
    ],
    to: [
      { slug: 'hrms-and-payroll', passes: 'Reimbursements in the payroll run' },
      { slug: 'accounting', passes: 'Expenses and input GST to the ledger' },
      { slug: 'cost-forecasting', passes: 'Actual travel spend' },
      { slug: 'audit-management', passes: 'Receipts and approvals as evidence' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Plant and vendor visits charged to the right plant and cost centre.' },
    { slug: 'distribution', note: 'Field reps claim against their beat plans, checked against policy line by line.' },
    { slug: 'pharma', note: 'Field force travel and allowances kept to grade entitlements across regions.' },
    { slug: 'service-providers', note: 'Client travel charged to projects and checked against policy before it is billed.' },
  ],
  roles: [
    { name: 'Travellers', task: 'Request trips and claim expenses from the phone, with receipts read on capture.', works: 'Expense reports' },
    { name: 'Managers', task: 'Approve trips and see any excess over entitlement before booking.', works: 'Trip requests' },
    { name: 'Travel desk', task: 'Books approved trips at negotiated rates and issues advances.', works: 'Bookings' },
    { name: 'Finance shared service', task: 'Settles approved claims on SLA and recovers open advances.', works: 'Reimbursements' },
    { name: 'CFO', task: 'Reads travel spend by region and cost centre against budget.', works: 'Spend and compliance' },
  ],
  related: ['hrms-and-payroll', 'sales-force-automation', 'accounting', 'vendor-invoice-management'],
  screens: [
    {
      screen: 'travel-and-expense/spend-compliance',
      view: 'Spend and compliance',
      title: 'Travel spend and compliance',
      caption: 'Spend by region against budget, policy violations by type and the advances still open.',
      alt: 'MAVRO travel spend and compliance dashboard for September: ₹46.8 L of a ₹50 L budget, 94% within policy, reimbursement in 4.2 days, spend by region with Gujarat over budget, spend by category, policy violations and unsettled advances (illustrative data).',
    },
    {
      screen: 'travel-and-expense/trip-request',
      view: 'Trip requests',
      title: 'Trip request and policy check',
      caption: 'A trip checked line by line against the traveller’s entitlement, with the excess quantified before approval.',
      alt: 'MAVRO trip request TR-0418, Pune to Chennai for a sales head: air, hotel, local travel and daily allowance checked against the M3 entitlement, a late booking and a hotel ₹3,600 over flagged, and the approval steps (illustrative data).',
    },
    {
      screen: 'travel-and-expense/reimbursements',
      view: 'Reimbursements',
      title: 'Reimbursement settlement',
      caption: 'Approved claims settled on SLA, by bank transfer or in the payroll run; claims without documents held.',
      alt: 'MAVRO reimbursement settlement queue: 18 approved reports worth ₹2.86 L, each with its policy result, age and how it settles, by NEFT, in the October payroll run, or held for missing documents (illustrative data).',
    },
    {
      screen: 'travel-and-expense/expense-register',
      view: 'Expense register',
      title: 'Expense report register',
      caption: 'Every expense report with its cost centre, policy flags and payment status.',
      alt: 'MAVRO expense report register: 238 reports worth ₹31.4 L, 93% within policy, each report with traveller, trip, cost centre, lines, amount, policy flags and status (illustrative data).',
    },
  ],
  phone: {
    screen: 'travel-and-expense/receipt-claim',
    view: 'Expense reports',
    title: 'Add receipt',
    caption: 'A field rep photographs a hotel receipt; it is read, checked against policy and attached to the claim.',
    alt: 'MAVRO phone app: a hotel receipt photographed and read, ₹4,800 plus ₹576 GST for two nights, the hotel GSTIN valid, within the traveller’s policy limit, attached to expense report ER-2291 (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, 8 Oct. September: ₹46.8 L of travel and expense against ₹50 L, 412 reports from 168 travellers, 94% within policy, reimbursed in 4.2 days. TR-0418: Vikram Shah to Chennai 14–16 Oct, hotel ₹3,600 over entitlement. 18 approved reports wait for settlement (₹2.86 L); ER-2291 (Ravi Patel) held for missing receipts against a ₹62,000 open advance.',
  faq: [
    {
      q: 'What does the Travel and Expense module in MAVRO do?',
      a: 'MAVRO Travel and Expense controls travel spend from trip request to reimbursement. Trips are checked against grade entitlements and negotiated rates before booking, expense reports carry receipts and policy flags on every line, and approved claims are settled on SLA by bank transfer or in the payroll run.',
    },
    {
      q: 'How does MAVRO enforce a travel policy?',
      a: 'MAVRO checks each trip request and expense line against the traveller’s grade entitlement, city tier and booking rules. Breaches such as a hotel above the grade tariff or a late booking are flagged with the excess quantified, so a manager approves them knowingly instead of finding them after payment.',
    },
    {
      q: 'Can employees submit expenses from their phones in MAVRO?',
      a: 'Yes. Travellers capture receipts in the MAVRO mobile app, which reads the merchant, amount and GST, checks the hotel GSTIN and the policy limit, and attaches the receipt to the expense report. Claims with missing receipts are held out of the payment run until they are complete.',
    },
    {
      q: 'Are travel reimbursements paid through payroll in MAVRO?',
      a: 'They can be. MAVRO settles approved claims either by bank transfer within the SLA or in the next payroll run, where they appear on the payslip. Open travel advances are netted off against claims, and the expense and its input GST post to the ledger.',
    },
  ],
  seo: {
    title: 'Travel and expense management with policy checks | MAVRO',
    description:
      'MAVRO Travel and Expense: trip requests checked against grade entitlements, receipt-backed expense reports with policy flags, and reimbursements settled on SLA or in payroll.',
  },
};
