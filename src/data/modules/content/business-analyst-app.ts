import type { ModuleContent } from '../schema';

/*
 * Business Analyst App. Source: product deck v2, slide 88 (tagline, four tiles: reporting coverage, report register,
 * report builder with metric and grain validation, data quality; six points on why it matters; four screens). Figures
 * on the tiles come from the module's screens (prototype/modules/business-analyst-app/), whose scenario is below; like
 * all screen data they are illustrative.
 */
export const content: ModuleContent<'business-analyst-app'> = {
  slug: 'business-analyst-app',
  tagline: 'Certified reporting: one definition per metric, and a report you can defend.',
  tiles: [
    {
      icon: 'eye',
      title: 'Reporting coverage',
      body: 'Domain-wise reports, users and data-quality gaps.',
      figure: { value: '88%', label: 'of reports use only certified metrics' },
    },
    {
      icon: 'layers',
      title: 'Report register',
      body: 'Owner, dataset, refresh and usage for every report.',
      figure: { value: '128', label: 'reports, 14 not opened in 90 days' },
    },
    {
      icon: 'rules',
      title: 'Report builder',
      body: 'Metric and grain validation before certification.',
      figure: { value: '5', label: 'checks before a report publishes' },
    },
    {
      icon: 'search',
      title: 'Data quality',
      body: 'Exceptions routed to the owning source system.',
      figure: { value: '5', label: 'open exceptions, all assigned' },
    },
  ],
  what: 'A self-service analytics workspace with governance attached: reporting coverage and adoption by domain, a report builder that validates metric definitions, lineage and grain before publication, certification with peer review, and a data-quality exception queue that assigns fixes to the owning source system instead of patching numbers in a report.',
  why: [
    'Two teams stop presenting two different numbers for the same metric.',
    'Reports built on uncertified metrics are visible before they spread.',
    'Grain and lineage errors are caught in the builder, not in the review meeting.',
    'Data-quality exceptions go to the source owner instead of a local patch.',
    'Unused reports are retired, freeing refresh capacity for what is used.',
    'Row-level security by role and territory is applied at publication.',
  ],
  flow: {
    from: [
      { slug: 'data-analytics', passes: 'Datasets, freshness and pipeline health' },
      { slug: 'master-data-management', passes: 'Governed customers, items and territories' },
      { slug: 'order-to-cash', passes: 'Orders, invoices and collections' },
      { slug: 'production-management', passes: 'Output, OEE and downtime' },
    ],
    to: [
      { slug: 'document-management', passes: 'Published reports and certification records' },
      { slug: 'data-analytics', passes: 'Data-quality exceptions to fix at the source' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'OEE, order book and margin reported from certified metrics that sales, plants and finance agree on.' },
    { slug: 'distribution', note: 'Secondary sales, stock cover and scheme cost by territory, with row-level security for each manager.' },
    { slug: 'pharma', note: 'Batch, quality and compliance reporting on governed definitions with the lineage to defend them.' },
    { slug: 'service-providers', note: 'Utilisation, revenue and delivery metrics defined once for every team.' },
  ],
  roles: [
    { name: 'Data platform lead', task: 'Certifies metrics and watches coverage and trust.', works: 'Coverage and trust' },
    { name: 'Business analysts', task: 'Build reports from certified metrics and fix validation errors.', works: 'Report builder' },
    { name: 'Metric owners', task: 'Own one definition each, in finance, sales or operations.', works: 'Report register' },
    { name: 'Source-system owners', task: 'Fix data-quality exceptions where the data is made.', works: 'Data quality' },
    { name: 'Managers', task: 'Read certified reports limited to their own territory or plant.', works: 'Report register' },
  ],
  related: ['data-analytics', 'master-data-management', 'order-to-cash', 'document-management'],
  screens: [
    {
      screen: 'business-analyst-app/coverage-trust',
      view: 'Coverage and trust',
      title: 'Reporting coverage and data trust',
      caption: 'Reports by domain, the share on certified metrics, who uses them and where data is doubtful.',
      alt: 'MAVRO reporting coverage: 128 reports across six domains, 88% on certified metrics, 46 certified metrics, 5 data-quality exceptions, coverage and active users by domain, report opens by week, a metric conflict resolved and items needing attention (illustrative data).',
    },
    {
      screen: 'business-analyst-app/report-builder',
      view: 'Report builder',
      title: 'Report builder with validation',
      caption: 'Metrics, layout and lineage, with grain, certification and freshness checked before publication.',
      alt: 'MAVRO report builder for secondary sales by territory: certified and draft metrics from the catalogue, the layout with dimensions, a lineage from source to report, and validation results including a grain mismatch between territory and region targets, an uncertified metric and stale data (illustrative data).',
    },
    {
      screen: 'business-analyst-app/data-quality',
      view: 'Data quality',
      title: 'Data-quality exception queue',
      caption: 'Exceptions assigned to the owner of the source system, with the reports each one affects.',
      alt: 'MAVRO data-quality exception queue: five exceptions for duplicates, freshness, missing GSTIN, missing HSN codes and negative stock balances, each with the rule, where found, reports affected, source owner and status, and the timeline of one fix (illustrative data).',
    },
    {
      screen: 'business-analyst-app/report-register',
      view: 'Report register',
      title: 'Report and dataset register',
      caption: 'Owner, dataset, refresh, usage and certification state for every report.',
      alt: 'MAVRO report register: reports by domain with owner, dataset, refresh, opens in 30 days, users and state, including certified reports, one in the builder, one stale, one with an uncertified metric and two proposed for retirement (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 128 reports, 88% on certified metrics. This week Sales and Finance agreed one definition of net sales. Rashmi Desai is building secondary sales by territory for the sales head; the builder stops her because the sales target is held by region, not territory, and the data feed is 33 hours old. Five data-quality exceptions are open, each assigned to the system that owns the data.',
  faq: [
    {
      q: 'What does the Business Analyst App in MAVRO do?',
      a: 'The MAVRO Business Analyst App is a self-service reporting workspace with governance attached. It shows reporting coverage and adoption, validates metric definitions, grain and lineage in the report builder, certifies reports with peer review, and routes data-quality exceptions to the owning source system.',
    },
    {
      q: 'How does it stop two teams reporting different numbers?',
      a: 'Each metric has one certified definition with an owner. Reports built on it share the number, and reports that use uncertified metrics are marked so users can see it before the report spreads.',
    },
    {
      q: 'What does the report builder validate?',
      a: 'Metric definitions and certification, grain, such as territory against region, dataset freshness, lineage from source to report, and row-level security by role and territory, before a report can be published.',
    },
    {
      q: 'Where are data-quality problems fixed?',
      a: 'At the source. An exception is assigned to the owner of the system where the data is created, such as the distributor portal, the customer master or the warehouse system, instead of being patched in a report.',
    },
  ],
  seo: {
    title: 'Certified self-service reporting and data governance | MAVRO',
    description:
      'MAVRO Business Analyst App: reporting coverage by domain, a report builder that validates metrics, grain and lineage, certified metrics with peer review, data-quality exceptions routed to source owners, and row-level security.',
  },
};
