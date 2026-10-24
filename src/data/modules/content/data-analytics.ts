import type { ModuleContent } from '../schema';

/*
 * Data Analytics. Source: product deck v2, slides 58–59 (tagline, four tiles, what it does, why it matters, four
 * screens), written for every industry. The deck's model health is described as monitoring of forecast models; the
 * MAVRO AI story stays parked (user, 2026-10-22), so no AI capabilities are claimed here. Figures on the tiles come
 * from the module's screens (prototype/modules/data-analytics/), whose scenario is below; like all screen data they
 * are illustrative.
 */
export const content: ModuleContent<'data-analytics'> = {
  slug: 'data-analytics',
  tagline: 'Source system to decision: pipelines, quality gates and model health in one place.',
  tiles: [
    {
      icon: 'eye',
      title: 'Platform health',
      body: 'Layer-wise load volume, failures and run success.',
      figure: { value: '45 of 46', label: 'pipelines succeeded last night' },
    },
    {
      icon: 'layers',
      title: 'Pipeline register',
      body: 'Source, target, owner and schedule per pipeline.',
      figure: { value: '58', label: 'pipelines, every metric owned' },
    },
    {
      icon: 'rules',
      title: 'Lineage and quality',
      body: 'Stage-wise runs with quality gates before publish.',
      figure: { value: '38', label: 'duplicate orders stopped at a gate' },
    },
    {
      icon: 'bell',
      title: 'Anomalies and models',
      body: 'Metric alerts, freshness breaches and model drift.',
      figure: { value: '5', label: 'open alerts, 1 model retraining' },
    },
  ],
  what: 'The data layer under every other module: pipelines from the ERP, the shop floor, the field app, portals and outside sources with run health and a freshness promise, stage-by-stage lineage with quality gates that hold publication, and an alert queue for freshness breaches, metric anomalies and forecast models that need retraining.',
  why: [
    'A failed load is known before the morning review, with the stage named.',
    'Quality gates stop bad data reaching dashboards and decisions.',
    'Every metric has an owner, a lineage and a freshness commitment.',
    'Anomalies are triaged as a data error or a genuine business shift, explicitly.',
    'Model drift triggers retraining instead of quietly degrading forecasts.',
    'Nightly window overruns are visible against the dashboard refresh promise.',
  ],
  flow: {
    from: [
      { slug: 'order-to-cash', passes: 'Orders, invoices and receipts' },
      { slug: 'production-management', passes: 'Work orders, output and machine events' },
      { slug: 'sales-force-automation', passes: 'Secondary orders and visits from the field app' },
      { slug: 'accounting', passes: 'Journals, balances and bank statements' },
    ],
    to: [
      { slug: 'business-analyst-app', passes: 'Certified data for self-service reports' },
      { slug: 'master-data-management', passes: 'Data errors to fix at the source' },
      { slug: 'cost-forecasting', passes: 'Clean history for cost forecasts' },
      { slug: 'project-management', passes: 'Figures for the steering pack' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Shop floor, ERP and field data in one model, checked before OEE and output reach the morning review.' },
    { slug: 'pharma', note: 'Lineage and quality gates for every metric, so each reported figure traces back to its source.' },
    { slug: 'distribution', note: 'Secondary sales from the field app and portals, held back when duplicates or gaps appear.' },
    { slug: 'service-providers', note: 'Delivery, billing and people data on dashboards with a named owner and a freshness promise.' },
  ],
  roles: [
    { name: 'Data platform lead', task: 'Watches the nightly window, failures and held pipelines before the morning review.', works: 'Platform health' },
    { name: 'Data engineers', task: 'Build pipelines, write quality rules and fix what a gate holds back.', works: 'Lineage' },
    { name: 'Metric owners', task: 'Decide whether an anomaly is a data error or a real change in the business.', works: 'Alerts' },
    { name: 'Planners and analysts', task: 'Use the forecast models and see when one has drifted.', works: 'Models' },
    { name: 'Leadership', task: 'Read dashboards that state how fresh they are and who owns each figure.', works: 'Dashboards' },
  ],
  related: ['sales-force-automation', 'production-management', 'accounting', 'order-to-cash'],
  screens: [
    {
      screen: 'data-analytics/pipeline-health',
      view: 'Platform health',
      title: 'Pipeline health and insight delivery',
      caption: 'Last night’s run by layer, the window against its target with the retry and the held gate marked, sources, and which dashboards were fresh by 06:00.',
      alt: 'MAVRO Data Analytics platform health: 45 of 46 pipelines succeeded, the nightly window ended at 05:52 against 05:30, 41 of 43 dashboards fresh by 06:00, run counts and durations by layer, a timeline of the window with a retried source and a pipeline held at its quality gate, sources and dashboards by audience (illustrative data).',
    },
    {
      screen: 'data-analytics/pipeline-detail',
      view: 'Lineage',
      title: 'Pipeline detail: lineage and quality rules',
      caption: 'One pipeline stage by stage, the rules checked before publishing, why it was held, who owns it and what the hold protects.',
      alt: 'MAVRO pipeline detail for field app secondary orders: lineage from the app through raw, cleaned and curated stages to two dashboards, held at a quality gate where 2 of 8 rules failed on 38 duplicate order IDs worth ₹3.9 L, the reps whose phones re-sent orders, the owners and the fix (illustrative data).',
    },
    {
      screen: 'data-analytics/alerts',
      view: 'Alerts',
      title: 'Anomaly and alert queue',
      caption: 'Freshness breaches, failed rules, metric anomalies and model drift, each classed as a data error or a business shift and owned.',
      alt: 'MAVRO anomaly and alert queue: 5 open alerts, including a stale dashboard, duplicate orders, an attrition high sent to HR and a freight cost anomaly in triage, and a demand forecast whose weekly error rose to 16.4% against a 12% limit, with its cause and retraining planned (illustrative data).',
    },
    {
      screen: 'data-analytics/pipeline-register',
      view: 'Pipeline register',
      title: 'Pipeline and model register',
      caption: 'Every pipeline with its route, owners, schedule, freshness promise and 30-day record, and each forecast model against its error limit.',
      alt: 'MAVRO pipeline and model register: 58 pipelines, 97.6% of runs on their promise over 30 days, each with source and target, pipeline and metric owners, schedule, last run and status, and three forecast models with their error against the limit (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. Nightly window 00:30–05:30, dashboards by 06:00. Last night 46 pipelines: 44 first time, PL-131 (GSTR-2B import) recovered on retry, PL-087 (field app secondary orders) held at its gate on 38 duplicate order IDs (₹3.9 L, +2.1% on the app total). Window ended 05:52; 41 of 43 dashboards fresh. Open alerts 5, including MD-07 demand forecast drift (16.4% against 12%) after SO-24817, retraining at 01:00. 58 pipelines in all, 97.6% on promise over 30 days.',
  faq: [
    {
      q: 'What does Data Analytics in MAVRO do?',
      a: 'MAVRO Data Analytics is the data layer under the other modules. It runs pipelines from MAVRO, the shop floor, the field app, portals and outside sources, checks each one against quality rules before it publishes, traces every dashboard figure back to its source, and raises alerts for late data, unusual figures and forecast models that need retraining.',
    },
    {
      q: 'How does MAVRO stop bad data reaching dashboards?',
      a: 'Every MAVRO pipeline passes a quality gate before it publishes: rules for duplicates, volumes, missing references, value ranges, freshness and totals that must reconcile with the source. A rule set to hold stops publication, the dashboard keeps its last good data and says so, and the failure goes to the pipeline’s owner with the rows involved.',
    },
    {
      q: 'Can I see where a dashboard number comes from in MAVRO?',
      a: 'Yes. MAVRO keeps the lineage of every metric stage by stage, from the source system through raw, cleaned and curated data to the dashboards that use it, with the run times and rule results at each stage. Every metric also has a named owner and a promise of when it is refreshed.',
    },
    {
      q: 'What happens when a metric suddenly changes in MAVRO?',
      a: 'MAVRO raises an anomaly alert and the metric’s owner classes it: a data error, which is fixed in the pipeline, or a genuine change in the business, which is sent to the people who act on it. Forecast models are checked the same way, and a model whose error passes its limit is retrained and compared with the current version before it takes over.',
    },
  ],
  seo: {
    title: 'Data pipelines, quality and lineage for your ERP data | MAVRO Data Analytics',
    description:
      'MAVRO Data Analytics: pipeline health and the nightly window, lineage with quality gates that hold bad data, owned metrics with freshness promises, and alerts for anomalies and forecast model drift.',
  },
};
