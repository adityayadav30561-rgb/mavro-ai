/*
 * The Implementation and support page (/implementation, SITE-PLAN.md section 3.6). The rollout plan and the
 * support model are the homepage's (`implementation` in home.ts), so both stay identical; this file adds the
 * product deck's migration plan (slide 24), risks and mitigation (slide 26), the first 90 days after go-live
 * (slide 27) and the support model's points (slide 28). Left out on purpose: slide 26's status column (it describes
 * one past project), "Month 1/2" timings that contradict a 25–30 day go-live, and slide 27's figures ("month-end
 * close in 1–2 days", "zero disputes before payment") and slide 24's "zero double-entry", unverifiable outcomes
 * (DECISIONS.md, "Left out on purpose").
 */
import type { Level, TableColumn } from '../blocks/ComparisonTable';
import type { IconName } from '../components/Icon';
import type { ModuleSlug } from './modules';

export const implementationPage = {
  seo: {
    title: 'Implementation and support: live in 25 to 30 days | MAVRO',
    description:
      'How MAVRO goes live in 25 to 30 days: discovery and setup, a first go-live in week three, full go-live in week four, a dedicated resource, go-live hypercare and AMS support after it, with every current tool mapped to a MAVRO module.',
  },
  hero: {
    title: 'Live in 25 to 30 days,',
    rest: 'with one team throughout.',
    lead: 'A phased rollout with one dedicated person from the first workshop to go-live, priority modules first, training department by department, and support that stays after it.',
    facts: [
      { value: '25–30 days', label: 'Phased implementation' },
      { value: '1', label: 'Dedicated resource, not shared' },
      { value: 'Same day', label: 'Resolution during go-live' },
    ],
    card: { title: 'Your first month', span: 'Day 1 → Day 30', foot: 'One dedicated resource · same-day resolution' },
    actions: { plan: 'See the plan' },
  },
  plan: { title: 'The plan,', rest: 'week by week.', lead: 'Discovery and setup first, priority modules live in week three, everything live in week four, then support that stays.' },
  support: {
    title: 'Who you',
    rest: 'work with.',
    lead: 'The same team from kickoff to go-live, and after it.',
    points: [
      ['One resource for your project', 'Full-time through the 25–30 days', 'Not shared, yours alone', 'A direct line to solution architects'],
      ['On site if agreed, else remote', 'Same-day resolution, no ticket queue', 'Training department by department', 'Stable before month-end, confirmed'],
      ['A dedicated contact after go-live', 'Fixes and enhancements under AMS', 'A monthly review of usage and roadmap', 'New modules when you need them'],
    ],
  },
  migration: {
    title: 'Every tool you use today,',
    rest: 'mapped to a MAVRO module.',
    lead: 'Each gap a core ERP leaves, and the workaround that fills it today, moves to a module with its own records.',
    from: 'Today',
    to: 'In MAVRO',
    rows: [
      {
        icon: 'finance',
        area: 'Core ERP and finance',
        today: 'A legacy ERP with costly add-ons and partner dependency',
        to: [{ slug: 'accounting', note: 'Live GL, auto journals' }, { slug: 'vendor-invoice-management', note: 'Three-way match' }, { label: 'GST filings generated from transactions' }],
      },
      {
        icon: 'people',
        area: 'HR and payroll',
        today: 'External payroll, posted to the GL by manual journals',
        to: [{ slug: 'hrms-and-payroll', note: 'Attendance to GL, PF, ESI and TDS built in' }, { label: 'Payroll posted to the GL on approval' }],
      },
      {
        icon: 'production',
        area: 'Production and operations',
        today: 'Shifts tracked in spreadsheets',
        to: [{ slug: 'production-management', note: 'Live OEE and WIP' }, { slug: 'order-to-cash', note: 'Order lifecycle, auto-invoicing' }, { slug: 'inventory-management', note: 'Real-time stock' }],
      },
      {
        icon: 'distribution',
        area: 'Channel and vendors',
        today: 'Orders and POs on WhatsApp and the phone',
        to: [{ slug: 'sales-force-automation', note: 'Mobile order booking, GPS beats' }, { slug: 'distributor-portal', note: 'Distributor orders' }, { slug: 'vendor-portal', note: 'A digital PO trail' }],
      },
    ] satisfies { icon: IconName; area: string; today: string; to: ({ slug: ModuleSlug; note: string } | { label: string })[] }[],
  },
  risks: {
    title: 'Known risks,',
    rest: 'managed from the start.',
    lead: 'We have delivered similar implementations. These are the risks that come up and how each is handled.',
    caption: 'Implementation risks, their impact, mitigation and owner',
    columns: [
      { key: 'risk', label: 'Risk' },
      { key: 'impact', label: 'Impact' },
      { key: 'mitigation', label: 'Mitigation' },
      { key: 'owner', label: 'Owner' },
    ] satisfies TableColumn[],
    rows: [
      { risk: 'Poor master data quality', impact: { level: 'high', text: 'High' }, mitigation: 'Data cleansing workshop at the start; trial migration before go-live', owner: 'Client IT' },
      { risk: 'User adoption resistance', impact: { level: 'high', text: 'High' }, mitigation: 'Department champions appointed; in-person training on site', owner: 'Joint' },
      { risk: 'Scope creep', impact: { level: 'high', text: 'High' }, mitigation: 'BRD signed off before development; change requests priced separately', owner: 'Joint' },
      { risk: 'Legacy data migration issues', impact: { level: 'medium', text: 'Medium' }, mitigation: 'Trial migration first; exceptions handled before cutover', owner: 'SaiSatwik' },
      { risk: 'Process gaps discovered late', impact: { level: 'medium', text: 'Medium' }, mitigation: 'Weekly steering committee; issues logged and resolved in sprint', owner: 'Joint' },
      { risk: 'Key user unavailability', impact: { level: 'medium', text: 'Medium' }, mitigation: 'RACI agreed at kickoff; backup users trained per department', owner: 'Client' },
      { risk: 'Integration delays', impact: { level: 'low', text: 'Low' }, mitigation: 'Clean cutover assumed; parallel-run buffer built in', owner: 'SaiSatwik' },
    ] satisfies Record<string, string | { level: Level; text: string }>[],
  },
  after: {
    title: 'Ninety days after go-live,',
    rest: 'across the business.',
    lead: 'What the business looks like once every department works in MAVRO.',
    items: [
      { icon: 'finance', title: 'Finance', body: 'Live P&L, real-time payables and receivables, and GST generated from transactions.' },
      { icon: 'people', title: 'HR and payroll', body: 'Payroll closes with GL posting; PF, TDS and ESI from within MAVRO.' },
      { icon: 'production', title: 'Production', body: 'Work orders and output tracked live, with delays flagged early.' },
      { icon: 'sales', title: 'Sales', body: 'Reps book orders on mobile, with GPS beats and schemes enforced.' },
      { icon: 'procurement', title: 'Procurement', body: 'Vendors work digitally, and the three-way match runs before payment.' },
      { icon: 'eye', title: 'Leadership', body: 'One dashboard for the CFO, COO and MD: finance, HR and operations, live.' },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },
  faq: [
    {
      q: 'How long does a MAVRO implementation take?',
      a: '25 to 30 days. Discovery and setup in weeks one and two, the first go-live with priority modules in week three, full go-live with the remaining modules and the mobile app in week four, then AMS support.',
    },
    {
      q: 'Who works on our implementation?',
      a: 'One dedicated resource, full-time for the 25–30 days and not shared with other projects, with a direct line to our solution architects. During go-live they work on site if agreed, otherwise remotely, with same-day resolution and no ticket queue.',
    },
    {
      q: 'How is data migrated from our current system?',
      a: 'A data cleansing workshop starts the project, followed by a trial migration before go-live; exceptions are handled before cutover, so the move is a clean cutover rather than a long parallel run.',
    },
    {
      q: 'Can MAVRO replace our current ERP or Tally?',
      a: 'Yes. Each tool you use today maps to a MAVRO module: the legacy ERP to Accounting and Vendor Invoice Management, external payroll to HRMS and Payroll, spreadsheets to Production, Order to Cash and Inventory, and WhatsApp ordering to Sales Force Automation and the portals. If you would rather keep your ERP, ERP Connect runs MAVRO alongside it.',
    },
    {
      q: 'How are our users trained?',
      a: 'Department by department, in person or remotely, during go-live, with department champions appointed early and backup users trained in each department. SOPs and process documentation are handed over so your team runs MAVRO independently.',
    },
    {
      q: 'What support do we get after go-live?',
      a: 'AMS support with a dedicated contact, bug fixes and enhancements, and a monthly review of usage, open issues and your roadmap. New modules are available when you need them.',
    },
  ],
  cta: { title: 'Plan your rollout', rest: 'with us.', body: 'A demo built around your process, and the 25–30 day plan for your modules and departments.' },
};
