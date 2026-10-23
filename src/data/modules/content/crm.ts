import type { ModuleContent } from '../schema';

/*
 * CRM (lead management). Source: product deck v2, slides 46–47 (tagline, four tiles, what it does, why it matters,
 * four screens). Figures on the tiles come from the module's screens (prototype/modules/crm/), whose scenario is
 * below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'crm'> = {
  slug: 'crm',
  tagline: 'Lead capture to appointment: scored, routed and owned within SLA.',
  tiles: [
    {
      icon: 'sales',
      title: 'Pipeline velocity',
      body: 'Leads, pipeline and conversion by source.',
      figure: { value: '7.5%', label: 'lead to won' },
    },
    {
      icon: 'master',
      title: 'Lead register',
      body: 'Segment, region and owner on every lead.',
      figure: { value: '186', label: 'leads in 30 days' },
    },
    {
      icon: 'quality',
      title: 'Qualification',
      body: 'Weighted scoring on verified credit, GST and trade signals.',
      figure: { value: '104', label: 'qualified' },
    },
    {
      icon: 'route',
      title: 'Assignment',
      body: 'Territory routing with a first-response SLA.',
      figure: { value: '92%', label: 'answered within SLA' },
    },
  ],
  what: 'Demand generation for distributor and institutional markets: pipeline and conversion health by source, a de-duplicated lead register, weighted qualification on verified credit, GST and trade signals, and territory-based assignment governed by a first-response SLA.',
  why: [
    'Every lead has an owner and a first-response clock from the moment it lands.',
    'Weak sources are visible by conversion, not by lead count alone.',
    'Credit, GST and trade-reference checks happen before the appointment, not after.',
    'Duplicate and junk records are clustered for merge instead of worked twice.',
    'Territory conflicts are escalated rather than settled informally in the field.',
    'Idle opportunities resurface with the last activity logged against them.',
  ],
  flow: {
    from: [
      { slug: 'sales-force-automation', passes: 'Leads logged by field reps' },
      { slug: 'distributor-portal', passes: 'Referrals from distributors' },
      { slug: 'ecommerce-integration', passes: 'Marketplace enquiries' },
      { slug: 'customer-service', passes: 'Upsell leads from existing customers' },
    ],
    to: [
      { slug: 'order-to-cash', passes: 'Won quotations become sales orders' },
      { slug: 'sales-force-automation', passes: 'Appointments into beat plans' },
      { slug: 'master-data-management', passes: 'New customers, checked once' },
      { slug: 'data-analytics', passes: 'Pipeline for sales dashboards' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'OEM enquiries qualified on credit and checked against free capacity before quoting.' },
    { slug: 'distribution', note: 'Leads routed by territory so each dealer prospect has one owner.' },
    { slug: 'pharma', note: 'Institutional and stockist leads verified on licences and GST before onboarding.' },
    { slug: 'service-providers', note: 'Enquiries scored and owned until the proposal goes out.' },
  ],
  roles: [
    { name: 'Inside sales lead', task: 'Watches the pipeline by source and settles escalated leads.', works: 'Pipeline' },
    { name: 'Sales reps', task: 'Answer their leads inside the SLA and book appointments.', works: 'Leads' },
    { name: 'Sales operations', task: 'Keeps routing rules and rep caps in step with territories.', works: 'Assignment queue' },
    { name: 'Marketing', task: 'Reads which campaigns and sources convert.', works: 'Campaigns' },
    { name: 'Sales head', task: 'Reviews conversion and idle opportunities each week.', works: 'Reports' },
  ],
  related: ['order-to-cash', 'sales-force-automation', 'customer-service', 'scheme-and-rebate'],
  screens: [
    {
      screen: 'crm/pipeline',
      view: 'Pipeline',
      title: 'Pipeline and lead velocity',
      caption: 'Conversion by source, the funnel, time in each stage and the leads closest to their SLA.',
      alt: 'MAVRO CRM pipeline: 186 leads in 30 days, 92% answered within the first-response SLA, conversion by source from website, marketplaces, trade fairs, distributor referrals, field reps and existing customers, the funnel to 14 won and the leads waiting for a first response (illustrative data).',
    },
    {
      screen: 'crm/lead-detail',
      view: 'Leads',
      title: 'Lead qualification and scoring',
      caption: 'A lead scored on verified GST, credit and trade references, with its requirement checked against capacity.',
      alt: 'MAVRO CRM lead detail for Godavari Pumps: a qualification score of 79 of 100 built from GST, credit, trade references, fit and engagement, the checks verified before the appointment, the requirement against free capacity and the activity history (illustrative data).',
    },
    {
      screen: 'crm/assignment-queue',
      view: 'Assignment queue',
      title: 'Lead assignment queue',
      caption: 'New leads routed by territory and segment, each with its SLA clock; conflicts escalated, rep load kept under a cap.',
      alt: 'MAVRO CRM lead assignment queue: nine new leads with their source, territory, owner, score and first-response time left, two escalated for a territory conflict and a new region, rep load against a cap of 25 and the routing rules (illustrative data).',
    },
    {
      screen: 'crm/lead-register',
      view: 'Lead register',
      title: 'Lead register',
      caption: 'Every lead with segment, region, source, owner, score and stage; duplicates and idle leads flagged.',
      alt: 'MAVRO CRM lead register: 186 leads with segment, region, source, owner, score, stage and last activity, two suspected duplicates and an idle lead flagged (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, last 30 days: 186 leads from six sources, 104 qualified, 58 appointments, 31 quotations, 14 won (7.5%); 92% answered within the 4-hour SLA. LD-1842 Godavari Pumps scores 79 and has an appointment on 10 Oct. Nine leads in the assignment queue, two escalated (Coastline Irrigation, territory conflict). Six duplicates in three clusters.',
  faq: [
    {
      q: 'What does the CRM module in MAVRO do?',
      a: 'MAVRO CRM manages leads from capture to appointment. It keeps one de-duplicated lead register, scores each lead on verified GST, credit and trade signals, routes it to an owner by territory and segment with a first-response SLA, and shows pipeline and conversion by source. Won quotations become sales orders in MAVRO Order to Cash.',
    },
    {
      q: 'How does MAVRO score and qualify leads?',
      a: 'MAVRO scores each lead on weighted signals: GST registration and filing, credit standing, trade references, fit with your segments and volumes, and engagement. GST and credit are checked automatically when the lead is captured, so qualification happens before the appointment rather than after.',
    },
    {
      q: 'Can MAVRO assign leads to sales reps automatically?',
      a: 'Yes. MAVRO routes each new lead to an owner by territory and segment, respects a cap on open leads per rep, and starts a first-response clock. Leads claimed by two territories, or from a region with no owner, are escalated to the inside sales lead instead of being settled informally.',
    },
    {
      q: 'Does MAVRO CRM catch duplicate leads?',
      a: 'Yes. MAVRO matches new leads against existing leads and accounts by GSTIN, phone, email and company name, and clusters likely duplicates for review and merge, so the same company is not worked twice by different reps.',
    },
  ],
  seo: {
    title: 'CRM for manufacturers and distributors: lead scoring and routing | MAVRO',
    description:
      'MAVRO CRM: one de-duplicated lead register, lead scoring on verified GST, credit and trade signals, territory routing with a first-response SLA, and conversion by source.',
  },
};
