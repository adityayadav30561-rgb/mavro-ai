import type { ModuleContent } from '../schema';

/*
 * Cost Forecasting. Source: product deck v2, slide 74 (tagline, four tiles: budget vs actual, driver-based
 * forecasts on volume, forex, tariff and wage, the scenario engine with base, optimistic and stress, and variance
 * alerts at 90% utilisation with a review trail; six points on why it matters; four screens). Figures on the tiles
 * come from the module's screens (prototype/modules/cost-forecasting/), whose scenario is below; like all screen
 * data they are illustrative.
 */
export const content: ModuleContent<'cost-forecasting'> = {
  slug: 'cost-forecasting',
  tagline: 'Budgets, driver-based forecasts and variance control across every cost centre.',
  tiles: [
    {
      icon: 'finance',
      title: 'Budget against actual',
      body: 'Every cost centre against its budget and the share of the year gone.',
      figure: { value: '52.4%', label: 'of the budget spent, 52% of the year gone' },
    },
    {
      icon: 'rules',
      title: 'Driver-based forecasts',
      body: 'Volume, exchange rate, power tariff, wages and freight drive the reforecast.',
      figure: { value: '5', label: 'drivers behind the H2 reforecast' },
    },
    {
      icon: 'layers',
      title: 'Scenario engine',
      body: 'Base, optimistic and stress side by side, with the full-year cost of each.',
      figure: { value: '₹38.5 L', label: 'between the optimistic and stress full year' },
    },
    {
      icon: 'bell',
      title: 'Variance alerts',
      body: 'Flagged at 90% of budget, with a review trail to the CFO.',
      figure: { value: '₹57 L', label: 'variance explained in one bridge' },
    },
  ],
  what: 'Operating budgets by cost centre and account, with phasing, actuals from Accounting and commitments from open orders; reforecasts built from the drivers that move cost, such as volume, exchange rate, power tariff, wages and freight; base, optimistic and stress scenarios side by side; and variance alerts that open a review with the owner’s explanation, a bridge by cause and an approval trail, before the approved plan publishes back to the budgets.',
  why: [
    'Overruns surface at 90% of budget, while there is still time to act.',
    'Reforecasts take hours: change a driver and every cost centre moves with it.',
    'A variance bridge shows what drove the gap, not just its size.',
    'Cost-centre owners see their own lines, actuals and commitments.',
    'Forecast accuracy is tracked against actuals, month after month.',
    'Approved plans publish back to the budgets in Accounting.',
  ],
  flow: {
    from: [
      { slug: 'accounting', passes: 'Actuals by cost centre and account' },
      { slug: 'procure-to-pay', passes: 'Commitments on open purchase orders' },
      { slug: 'asset-management', passes: 'Maintenance orders and their cost' },
      { slug: 'hrms-and-payroll', passes: 'Headcount and wage costs' },
      { slug: 'order-to-cash', passes: 'Sales volume behind the drivers' },
    ],
    to: [
      { slug: 'accounting', passes: 'Approved budgets and transfers' },
      { slug: 'data-analytics', passes: 'Budget, forecast and variance for reporting' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Plant overheads, power, maintenance and freight forecast from volume and tariffs, with overruns caught early.' },
    { slug: 'distribution', note: 'Freight, schemes and depot costs budgeted by region and reforecast as volumes move.' },
    { slug: 'pharma', note: 'Plant and quality costs budgeted by site, with every variance explained before the review.' },
    { slug: 'service-providers', note: 'People, software and office costs by entity and cost centre, with scenarios for hiring plans.' },
  ],
  roles: [
    { name: 'FP&A manager', task: 'Runs the reforecast, its drivers and scenarios, and the variance reviews.', works: 'Forecast wizard' },
    { name: 'Cost-centre owners', task: 'See their own lines and explain any variance that is flagged.', works: 'Budget lines' },
    { name: 'Plant heads', task: 'Review their plants’ forecast and approve it before the CFO.', works: 'Approvals' },
    { name: 'CFO', task: 'Approves the plan and decides on budget transfers.', works: 'Variance review' },
    { name: 'Finance controller', task: 'Keeps budgets, phasing and actuals in line with the books.', works: 'Budget dashboard' },
  ],
  related: ['accounting', 'data-analytics', 'asset-management', 'procure-to-pay'],
  screens: [
    {
      screen: 'cost-forecasting/budget-dashboard',
      view: 'Budget dashboard',
      title: 'Budget against actual',
      caption: 'Every cost centre against its budget and the share of the year gone, with the alerts and the reforecast.',
      alt: 'MAVRO budget dashboard: ₹22.93 crore spent of a ₹43.74 crore budget with 52% of the year gone, a full-year forecast of ₹45.07 crore, cost centres with budget, actual, used against the year marker, forecast and variance, monthly spend against budget, one variance alert and three scenarios (illustrative data).',
    },
    {
      screen: 'cost-forecasting/forecast-wizard',
      view: 'Forecast wizard',
      title: 'Driver-based reforecast',
      caption: 'Five drivers with an assumption per scenario and its effect on the full-year cost, then review and approval.',
      alt: 'MAVRO forecast wizard for the second-half reforecast: sales volume, USD/INR, power tariff, wage DA and freight rates with optimistic, base and stress assumptions and their effect in rupees lakh, a known repairs run-rate adjustment, full-year cost per scenario, a monthly cost chart and the approval route to the CFO (illustrative data).',
    },
    {
      screen: 'cost-forecasting/variance-review',
      view: 'Variance review',
      title: 'Variance review',
      caption: 'A flagged cost centre with its bridge by cause, the postings behind it, the owner’s comment and the review trail.',
      alt: 'MAVRO variance review for Plant 1 repairs and maintenance at 91% of budget: a bridge from the ₹70 lakh phased budget to ₹127 lakh actual through breakdown repairs, preventive maintenance catch-up, spares price and outsourced repairs, the largest postings, the owner’s comment, the full-year forecast and the review trail (illustrative data).',
    },
    {
      screen: 'cost-forecasting/budget-lines',
      view: 'Budget lines',
      title: 'Budget lines',
      caption: 'Every cost centre and account with its phasing, actual, commitments, what is left and its status.',
      alt: 'MAVRO budget lines register: cost centres and accounts with owner, phasing, budget, actual, committed, available and used, one line on alert at 97% with commitments, one phased line paid upfront with its alert suppressed and two on watch (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, FY 2026-27, 8 Oct, 14:02: 52% of the year gone. Operating cost budget ₹43.74 Cr, ₹22.93 Cr spent. Plant 1 repairs and maintenance reached 91% of its ₹140 L budget on 6 Oct and opened a variance review: breakdowns, a preventive maintenance catch-up, spares price and outsourced repairs. The H2 reforecast, driven by volume, USD/INR, power tariff, wage DA and freight, puts the full year at ₹45.07 Cr in the base scenario, between ₹44.88 Cr and ₹45.26 Cr. It goes to the plant heads, then the CFO.',
  faq: [
    {
      q: 'What does Cost Forecasting in MAVRO do?',
      a: 'MAVRO Cost Forecasting holds operating budgets by cost centre and account, compares them with actuals from Accounting and commitments from open orders, builds reforecasts from cost drivers with base, optimistic and stress scenarios, and flags variances for review before an approved plan publishes back to the budgets.',
    },
    {
      q: 'What is a driver-based forecast?',
      a: 'Instead of editing each budget line, the forecast is moved by the things that drive cost, such as sales volume, the exchange rate, power tariffs, wage revisions and freight rates. Change a driver and every cost centre it affects moves with it, so a reforecast takes hours rather than weeks.',
    },
    {
      q: 'When does MAVRO raise a variance alert?',
      a: 'When a budget line reaches 90% of its annual budget, or of its phased budget to date. The alert goes to the cost-centre owner, who explains it; the variance review shows the bridge by cause and the postings behind it, and keeps the trail to the CFO’s decision. Lines paid upfront, such as insurance premiums, can be phased so they do not raise false alerts.',
    },
    {
      q: 'Does the approved budget flow back to Accounting?',
      a: 'Yes. Once the plant heads and the CFO approve a plan, it publishes to the budgets in Accounting, and actuals are measured against it from then on.',
    },
  ],
  seo: {
    title: 'Budgeting, cost forecasting and variance software | MAVRO',
    description:
      'MAVRO Cost Forecasting: budget against actual by cost centre, driver-based reforecasts, base, optimistic and stress scenarios, variance alerts at 90% with a review trail, and approved plans published to Accounting.',
  },
};
