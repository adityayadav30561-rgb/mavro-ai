import type { ModuleContent } from '../schema';

/*
 * Project Management. Source: product deck v2, slides 50–51 (tagline, four tiles, what it does, why it matters, four
 * screens). The deck describes capex delivery; client projects for service providers are the standard case of the
 * same plan, change and cost control (time cards come from HRMS). Figures on the tiles come from the module's
 * screens (prototype/modules/project-management/), whose scenario is below; like all screen data they are
 * illustrative.
 */
export const content: ModuleContent<'project-management'> = {
  slug: 'project-management',
  tagline: 'Concept to go-live: capex projects tracked on schedule, cost and governance.',
  tiles: [
    {
      icon: 'eye',
      title: 'Portfolio health',
      body: 'Budget, schedule and projects at risk by portfolio.',
      figure: { value: '₹4.40 Cr', label: 'spent of ₹7.16 Cr sanctioned' },
    },
    {
      icon: 'layers',
      title: 'Project register',
      body: 'Owner, stage, budget and health per project.',
      figure: { value: '9', label: 'active projects, 3 at risk' },
    },
    {
      icon: 'calendar',
      title: 'Milestone plan',
      body: 'Baseline, dependencies and qualification gates.',
      figure: { value: '6 days', label: 'behind baseline on PRJ-0217' },
    },
    {
      icon: 'workflow',
      title: 'Change requests',
      body: 'Cost and scope impact routed to steering.',
      figure: { value: '₹31.3 L', label: 'in 5 requests waiting' },
    },
  ],
  what: 'Capital and transformation projects run from one office: portfolio health against budget and schedule, a milestone plan per project with owners, dependencies and qualification gates, a change-request queue that sends anything beyond delegation to the steering committee with its cost and time impact, and a register that keeps every project’s status honest.',
  why: [
    'Slippage is measured against the approved baseline, not against optimism.',
    'Dependencies that block qualification are named with their owner.',
    'Change requests beyond delegation reach steering with the cost impact attached.',
    'Capex used is tracked against sanction through the year.',
    'A project whose risk log is out of date is flagged as a governance breach.',
    'Vendor delay recovery clauses are in view where the schedule is at stake.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Capital orders and vendor delivery dates' },
      { slug: 'accounting', passes: 'Sanctioned budgets and capex actuals' },
      { slug: 'hrms-and-payroll', passes: 'Time cards logged against projects' },
      { slug: 'document-management', passes: 'Drawings, approvals and qualification records' },
    ],
    to: [
      { slug: 'asset-management', passes: 'Capital work in progress to capitalise at go-live' },
      { slug: 'accounting', passes: 'Project costs and capital work in progress' },
      { slug: 'production-management', passes: 'New line capacity at handover' },
      { slug: 'data-analytics', passes: 'Portfolio figures for the steering pack' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'New lines, tooling and utilities tracked against sanction, baseline and go-live.' },
    { slug: 'pharma', note: 'Plant and equipment projects with IQ and OQ gates that hold go-live until they pass.' },
    { slug: 'distribution', note: 'Depot, racking and warehouse projects delivered on budget, with vendor delays named.' },
    { slug: 'service-providers', note: 'Client and internal projects with milestones, change requests and cost against budget.' },
  ],
  roles: [
    { name: 'PMO lead', task: 'Watches the portfolio, prepares the steering pack and chases governance gaps.', works: 'Portfolio health' },
    { name: 'Project owners', task: 'Keep the plan, risks and dependencies current and raise changes.', works: 'Milestone plans' },
    { name: 'Steering committee', task: 'Decides changes beyond delegation, with their cost and time impact.', works: 'Change requests' },
    { name: 'Finance', task: 'Checks the cost of each change and tracks capex against sanction.', works: 'Capex budgets' },
    { name: 'Buyers', task: 'Own the capital orders a milestone waits on, and invoke recovery clauses.', works: 'Risk log' },
  ],
  related: ['procure-to-pay', 'asset-management', 'accounting', 'hrms-and-payroll'],
  screens: [
    {
      screen: 'project-management/portfolio',
      view: 'Portfolio health',
      title: 'Portfolio health and delivery',
      caption: 'Every active project against its sanction and baseline, capex by portfolio, what goes to steering and the delivery risks with their owners.',
      alt: 'MAVRO Project Management portfolio: 9 active capex projects, ₹4.40 Cr spent of ₹7.16 Cr sanctioned and ₹31 L behind plan, 3 projects at risk, 5 change requests waiting, one governance breach, each project’s spend, completion against plan and forecast go-live, and the risks named with owners (illustrative data).',
    },
    {
      screen: 'project-management/milestone-plan',
      view: 'Milestone plans',
      title: 'Project detail: milestone plan',
      caption: 'One project’s plan against its baseline, with gates, the dependency holding it up, open changes, cost by head and the top risks.',
      alt: 'MAVRO project detail for a line automation project: ₹1.46 Cr of ₹2.40 Cr used, 64% complete against 70% planned and six days behind baseline, a milestone plan with baseline bars and qualification gates, a late conveyor order named with its owner, two change requests and the top risks (illustrative data).',
    },
    {
      screen: 'project-management/change-requests',
      view: 'Change requests',
      title: 'Change request approval queue',
      caption: 'Changes with their cost and time impact, routed by delegation; each shows what sanction and go-live become if approved.',
      alt: 'MAVRO change request queue: 5 requests worth ₹31.3 L, 2 going to the steering committee, a robot cell change that would take sanction from ₹2.40 Cr to ₹2.54 Cr and go-live from 20 to 25 Nov with its approval path, decisions this quarter and the delegation limits (illustrative data).',
    },
    {
      screen: 'project-management/project-register',
      view: 'Project register',
      title: 'Project register',
      caption: 'Every project with owner, stage, sanction, committed and spent, baseline and forecast go-live, risk-log date and health.',
      alt: 'MAVRO project register: 9 active projects with ₹7.16 Cr sanctioned, ₹6.12 Cr committed and ₹4.40 Cr spent, stage, baseline and forecast go-live, the date each risk log was updated with one out of date, and two projects closed this year (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 9 active capex projects, ₹7.16 Cr sanctioned, ₹6.12 Cr committed, ₹4.40 Cr spent against ₹4.71 Cr planned; 3 at risk (PRJ-0226 red, PRJ-0217 and PRJ-0219 amber). PRJ-0217 Plant 2 line automation: ₹1.46 Cr of ₹2.40 Cr, 64% vs 70%, go-live 14 → 20 Nov, waiting on PO-7688 conveyors (now 14 Oct). Change requests waiting 5, ₹31.3 L; CR-031 (₹14.2 L, +5 days) and CR-034 (₹9.6 L, +14 days) to steering on 15 Oct. PRJ-0226 risk log 24 days old: governance breach.',
  faq: [
    {
      q: 'What does Project Management in MAVRO do?',
      a: 'MAVRO Project Management runs capital and improvement projects from sanction to go-live. It shows portfolio health against budget and schedule, keeps a milestone plan per project with owners, dependencies and gates against an approved baseline, routes change requests by delegation to the steering committee, and keeps a register of every project’s stage, money and health.',
    },
    {
      q: 'How does MAVRO track a project against its baseline?',
      a: 'Each MAVRO project plan is approved as a baseline. As work is updated, every milestone shows its forecast beside the baseline, completion is compared with what was planned for today, and slippage is shown in days with the dependency that caused it and its owner, such as a late equipment order.',
    },
    {
      q: 'How are project change requests approved in MAVRO?',
      a: 'In MAVRO a change request states its cost and schedule impact and is routed by delegation: smaller changes to the plant or function head, larger ones to finance, and anything beyond that to the steering committee. Each request shows what the project’s sanction and go-live become if it is approved, along with the approval path so far.',
    },
    {
      q: 'Does MAVRO link projects to purchasing and fixed assets?',
      a: 'Yes. Capital orders for a project are raised in MAVRO Procure to Pay, so a late delivery shows on the project with the buyer who owns it. Spending sits in capital work in progress in Accounting and moves into Asset Management as fixed assets when the project goes live.',
    },
  ],
  seo: {
    title: 'Capex project management software: portfolio, milestones, change requests | MAVRO',
    description:
      'MAVRO Project Management: portfolio health against budget and schedule, milestone plans with baselines, dependencies and qualification gates, change requests routed by delegation, and a project register.',
  },
};
