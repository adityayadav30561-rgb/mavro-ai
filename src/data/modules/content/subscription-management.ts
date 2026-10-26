import type { ModuleContent } from '../schema';

/*
 * Subscription Management. Source: product deck v2, slides 102–103 (tagline, four tiles, what it does, why it
 * matters, four screens). The screens use their own company, an IT services firm selling a subscription app, since
 * the module serves businesses that sell subscriptions (the service-providers industry); its figures agree with the
 * homepage Explore panel. Figures on the tiles come from the module's screens
 * (prototype/modules/subscription-management/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'subscription-management'> = {
  slug: 'subscription-management',
  tagline: 'Plan to renewal: recurring revenue governed by pricing policy and collection discipline.',
  tiles: [
    {
      icon: 'finance',
      title: 'ARR and churn',
      body: 'Plan-wise subscribers, MRR and churn health.',
      figure: { value: '₹38.6 L', label: 'MRR, with churn read plan by plan' },
    },
    {
      icon: 'receipt',
      title: 'Subscription register',
      body: 'Plan, segment, billing cycle and renewal date.',
      figure: { value: '2,140', label: 'paying subscriptions, 64 on trial' },
    },
    {
      icon: 'workflow',
      title: 'Plan builder',
      body: 'Renewal quotes checked against discount policy.',
      figure: { value: '15%', label: 'discount sent up for approval, 10% suggested' },
    },
    {
      icon: 'calendar',
      title: 'Billing and dunning',
      body: 'Failed payments retried before suspension.',
      figure: { value: '21 of 38', label: 'failed payments recovered in a week' },
    },
  ],
  what: 'Recurring revenue operations for subscribed products and services: plan performance and churn health, a subscription register with billing cycles and renewal dates, a plan builder that prices renewals from list price, tier and usage while flagging discount and contract breaches, and a dunning queue that recovers failed payments before any account is suspended.',
  why: [
    'Churn is read plan by plan, so the weak tier is fixed rather than averaged away.',
    'Discounts beyond delegation need the commercial head, not a quiet exception.',
    'Renewals due are owned and quoted before the contract lapses.',
    'Card-expiry waves are worked ahead of time instead of after failure.',
    'Dunning retries and suspension follow one policy across every plan.',
    'Net revenue retention and trial conversion sit beside new MRR.',
  ],
  flow: {
    from: [
      { slug: 'crm', passes: 'Won deals and trials to convert' },
      { slug: 'master-data-management', passes: 'Plans, price lists and tiers' },
      { slug: 'customer-service', passes: 'Tickets that signal churn risk' },
    ],
    to: [
      { slug: 'accounting', passes: 'Recurring invoices and deferred revenue' },
      { slug: 'order-to-cash', passes: 'Collections and overdue annual invoices' },
      { slug: 'data-analytics', passes: 'MRR, churn and retention by plan' },
      { slug: 'crm', passes: 'Renewals and upgrade opportunities' },
    ],
  },
  industries: [
    { slug: 'service-providers', note: 'Software and managed services sold on plans, with renewals quoted on time and failed payments recovered.' },
    { slug: 'manufacturing', note: 'Service contracts and maintenance plans for installed equipment, billed and renewed on a cycle.' },
  ],
  roles: [
    { name: 'Revenue operations', task: 'Watches MRR, churn by plan and the renewals coming due.', works: 'ARR and churn' },
    { name: 'Account managers', task: 'Quote renewals from list, usage and contract terms within their discount limit.', works: 'Plan builder' },
    { name: 'Commercial head', task: 'Approves discounts above the account manager’s delegation.', works: 'Discount approvals' },
    { name: 'Billing team', task: 'Works the dunning queue and chases overdue annual invoices.', works: 'Billing and dunning' },
    { name: 'Customer success', task: 'Reads usage to save low-use accounts and offer upgrades to full ones.', works: 'Usage' },
  ],
  related: ['crm', 'order-to-cash', 'customer-service', 'accounting'],
  screens: [
    {
      screen: 'subscription-management/arr-churn',
      view: 'ARR and churn',
      title: 'ARR, renewals and churn',
      caption: 'MRR and what moved it, churn and trial conversion plan by plan, renewals due with their owners and the card-expiry wave.',
      alt: 'MRR of ₹38.6 L and ARR of ₹4.63 Cr in MAVRO Subscription Management, with 1.8% monthly churn (2.6% on the Basic plan) and 108% net revenue retention. MRR movement for September, plans with churn and trial conversion, and renewals due in 30 days with owners (illustrative data).',
    },
    {
      screen: 'subscription-management/plan-builder',
      view: 'Plan builder',
      title: 'Plan builder: pricing and renewal terms',
      caption: 'A renewal priced from this year’s list, the contract’s uplift cap and actual usage, with the discount checked against delegation.',
      alt: 'MAVRO renewal quote for an Enterprise customer: price build-up from list price, a 7% contractual uplift cap and 92 active users, a requested 15% discount that needs the commercial head, policy checks, term options and a suggested 10% that keeps the price 3.2% above today (illustrative data).',
    },
    {
      screen: 'subscription-management/billing-dunning',
      view: 'Billing and dunning',
      title: 'Billing and dunning queue',
      caption: 'Failed payments worked through one dunning policy, with the reasons they failed and the annual invoices overdue.',
      alt: 'MAVRO billing and dunning queue: 98.6% of a monthly billing run collected, 38 failed payments with 21 recovered, the dunning policy from retry to suspension, accounts in dunning with reason and tries, why payments failed and four overdue annual invoices (illustrative data).',
    },
    {
      screen: 'subscription-management/subscription-register',
      view: 'Subscription register',
      title: 'Subscription register',
      caption: 'Every subscription with its plan, segment, billing cycle, MRR, renewal date, payment method, usage and status.',
      alt: 'MAVRO subscription register: subscriptions with plan, segment, billing cycle, MRR, start and renewal dates, payment method, users against allowance and status, including renewals awaiting approval, accounts in dunning, a low-use cancellation and a trial (illustrative data).',
    },
  ],
  scenario:
    'Arcwise Software, Bengaluru, selling the Arcwise FieldOps app, 8 Oct, 14:02. 2,140 subscribers: Basic 1,210 (₹799 a month), Professional 760 (₹2,399, yearly), Enterprise 170 (from ₹6,299 with 50 users). MRR ₹38.6 L, ARR ₹4.63 Cr, churn 1.8% a month (Basic 2.6%), NRR 108%. 12 renewals in 30 days (₹8.9 L ARR); Coastal Lift Services asks 15% off for two years, above the 10% limit: 10% suggested, ₹10,073 a month. 1 Oct Basic run: 38 failed, 21 recovered, 17 in dunning.',
  faq: [
    {
      q: 'What does Subscription Management in MAVRO do?',
      a: 'MAVRO Subscription Management runs recurring revenue: plans and price lists, a register of every subscription with its billing cycle and renewal date, renewal quotes priced from list, usage and contract terms, recurring invoicing, and a dunning queue that recovers failed payments before an account is suspended.',
    },
    {
      q: 'How does MAVRO control renewal discounts?',
      a: 'Every renewal quote in MAVRO is checked against the discount policy and the customer’s contract. Discounts within an account manager’s delegation go through; larger ones are routed to the commercial head or CFO, and uplift caps, price floors and per-user price changes are flagged on the quote.',
    },
    {
      q: 'Can MAVRO retry failed subscription payments automatically?',
      a: 'Yes. MAVRO retries failed card, UPI and mandate payments on one dunning policy, with email, SMS and a call at set days, a final notice, read-only access and then cancellation. Expiring cards are chased before they fail, so most payments are recovered without suspension.',
    },
    {
      q: 'Does MAVRO show MRR, churn and net revenue retention?',
      a: 'Yes. MAVRO reports MRR and ARR with the new, expansion, contraction and churn movements behind them, logo and revenue churn by plan, net revenue retention and trial conversion, so the plan that is losing customers is seen rather than averaged away.',
    },
  ],
  seo: {
    title: 'Subscription management and recurring billing software | MAVRO',
    description:
      'MAVRO Subscription Management: MRR, ARR and churn by plan, a subscription register, renewal quotes checked against discount policy, recurring billing and a dunning queue that recovers failed payments.',
  },
};
