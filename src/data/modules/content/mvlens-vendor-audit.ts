import type { ModuleContent } from '../schema';

/*
 * mVLens Vendor Audit. Source: product deck v2, slides 30–31 (tagline, four tiles, what it does, why it matters,
 * four screens: auditor, audit manager, agreement coordinator and approver portals), written for every industry.
 * The deck's role portals are the four screens; the auditor's phone screen is the on-site checklist. Figures on the
 * tiles come from the module's screens (prototype/modules/mvlens-vendor-audit/), whose scenario is below; like all
 * screen data they are illustrative.
 */
export const content: ModuleContent<'mvlens-vendor-audit'> = {
  slug: 'mvlens-vendor-audit',
  tagline: 'Role-based vendor quality audits: plan, execute, approve and close CAPAs end to end.',
  tiles: [
    {
      icon: 'people',
      title: 'Role-based portals',
      body: 'Auditor, audit manager, approver and coordinator views.',
      figure: { value: '3', label: 'reports waiting for the approver' },
    },
    {
      icon: 'workflow',
      title: 'Audit lifecycle',
      body: 'Eight steps from plan to approved report.',
      figure: { value: '24', label: 'audits in this year’s programme' },
    },
    {
      icon: 'quality',
      title: 'CAPA tracking',
      body: 'Finding to CAPA to vendor response to closure.',
      figure: { value: '8', label: 'CAPAs open, 3 to verify' },
    },
    {
      icon: 'receipt',
      title: 'Quality agreements',
      body: 'Template drafting, e-signature and signed archive.',
      figure: { value: '38', label: 'signed agreements in force' },
    },
  ],
  what: 'A vendor audit platform with a portal for every role: audit managers plan the programme and assign audits, auditors run the checklist on site and record findings with evidence, approvers review each classified report before it goes to the vendor, and coordinators take quality agreements from template through legal review to an e-signed archive. Findings become CAPAs that the vendor answers and the auditor verifies.',
  why: [
    'Every audit step has an owner and a date, so nothing waits in email threads.',
    'Findings classify the site by rule: Acceptable, Observations or Not acceptable.',
    'CAPAs are tracked from finding to verified closure, with vendor responses in the app.',
    'Third-party audits by outside agencies are managed alongside internal ones.',
    'Quality agreements move from template to legal to e-signature without offline copies.',
    'A full audit trail is ready for regulatory and customer inspections.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Approved vendors, critical items and single-source risk' },
      { slug: 'gate-entry', passes: 'Seal and quantity exceptions at the gate' },
      { slug: 'production-management', passes: 'Incoming lots rejected, by vendor' },
      { slug: 'vendor-portal', passes: 'Questionnaires, evidence and CAPA responses' },
    ],
    to: [
      { slug: 'procure-to-pay', passes: 'Vendor approval, audit result and supply holds' },
      { slug: 'vendor-portal', passes: 'Audit notices, findings and CAPAs to answer' },
      { slug: 'document-management', passes: 'Signed agreements and approved reports' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Process audits of casting, machining and component suppliers, with CAPAs closed before the next order.' },
    { slug: 'pharma', note: 'Qualification and periodic audits of material and packaging vendors, with quality agreements e-signed.' },
    { slug: 'distribution', note: 'Audits of contract packers, warehouses and transporters against the agreed standard.' },
    { slug: 'service-providers', note: 'Audits of subcontractors and service vendors, with agreements and corrective actions on record.' },
  ],
  roles: [
    { name: 'Audit manager', task: 'Plans the programme, assigns auditors and follows every audit to closure.', works: 'Audit plans' },
    { name: 'Auditors', task: 'Run the checklist on site from the phone and record findings with evidence.', works: 'Auditor dashboard' },
    { name: 'Approver', task: 'Reviews classified reports and decides approvals and supply holds.', works: 'Approvals' },
    { name: 'Agreement coordinator', task: 'Drafts quality agreements from templates and takes them to e-signature.', works: 'Quality agreements' },
    { name: 'Vendors', task: 'Answer questionnaires and CAPAs, and sign agreements, online.', works: 'CAPA' },
  ],
  related: ['procure-to-pay', 'production-management', 'gate-entry', 'inventory-management'],
  screens: [
    {
      screen: 'mvlens-vendor-audit/auditor-dashboard',
      view: 'Auditor dashboard',
      title: 'Auditor portal',
      caption: 'The auditor’s day: the audit on site with its lifecycle and checklist progress, the findings so far and how they will classify the site, and CAPAs to verify.',
      alt: 'MAVRO mVLens auditor dashboard: a for-cause audit on site at a bearing supplier at step five of eight, 34 of 48 checklist clauses done, one major, two minor findings and an observation, the auditor’s audits this quarter and three vendor CAPA responses to verify (illustrative data).',
    },
    {
      screen: 'mvlens-vendor-audit/audit-plan',
      view: 'Audit plans',
      title: 'Audit manager: create audit plan',
      caption: 'A qualification audit planned in one place: vendor, type, scope, checklist, team, approver and questionnaire, with an owner and due date for all eight steps.',
      alt: 'MAVRO mVLens audit plan for the qualification audit of a new casting supplier: audit type, scope, a 64-clause checklist template, dates, lead auditor, co-auditor and approver, the eight lifecycle steps with owners and due dates, auditor availability and the year’s audit programme (illustrative data).',
    },
    {
      screen: 'mvlens-vendor-audit/quality-agreements',
      view: 'Quality agreements',
      title: 'Agreement coordinator portal',
      caption: 'Quality agreements by stage from drafting to the signed archive, the clauses and signatures of one in e-signature, and the renewals coming due.',
      alt: 'MAVRO mVLens agreement coordinator portal: 38 signed quality agreements, five in progress across drafting, vendor review, legal review, e-signature and on hold, one agreement with two of three signatures, and four renewals due in the next 60 days (illustrative data).',
    },
    {
      screen: 'mvlens-vendor-audit/approvals',
      view: 'Approvals',
      title: 'Audit approver portal',
      caption: 'The approver reviews a classified report with its findings, evidence and trail, and sees what approval will do before deciding.',
      alt: 'MAVRO mVLens audit approver portal: three reports waiting, a third-party heat treatment audit classified Not acceptable with one critical, two major and one minor finding, CAPA due dates, evidence files, the classification rules and the supply hold that approval will apply (illustrative data).',
    },
  ],
  phone: {
    screen: 'mvlens-vendor-audit/record-finding',
    view: 'Findings',
    title: 'Record a finding on site',
    caption: 'The auditor records a finding against its clause on the phone, with severity, photos and the vendor’s acknowledgement.',
    alt: 'MAVRO mVLens phone app: an auditor recording a major finding on a dispatch clause during a supplier audit, with the checklist progress, a description, three photos and the vendor’s acknowledgement (illustrative data).',
    device: 'phone',
  },
  scenario:
    'Northfield Precision, Plant 1, 8 Oct, 14:02. Programme: 24 audits this year, 14 closed (9 Acceptable, 4 Observations, 1 Not acceptable), 4 open, 6 scheduled. AUD-0418 Sharda Bearings, for-cause after the PO-7709 seal mismatch: 34 of 48 clauses, 1 major, 2 minor, 1 observation. Approver Anil Bhosale has AUD-0413 (Bharat Heat Treaters, third-party, Not acceptable), AUD-0414 and AUD-0415. AUD-0424 Konkan Foundry qualification planned for 21–22 Oct. 8 CAPAs open; 38 agreements signed, QAG-0037 Nova Seals at 2 of 3 signatures.',
  faq: [
    {
      q: 'What is mVLens Vendor Audit in MAVRO?',
      a: 'mVLens is MAVRO’s vendor quality audit module. Audit managers plan and assign audits, auditors run checklists on site and record findings with evidence, approvers review each classified report, and coordinators take quality agreements to e-signature. Findings become CAPAs that vendors answer and auditors verify, with a full audit trail.',
    },
    {
      q: 'How does mVLens classify a vendor site after an audit?',
      a: 'mVLens classifies each site by rule from its findings: any critical finding makes it Not acceptable, any major finding or several minor ones give Observations, and minor findings or observations alone leave it Acceptable. The approver reviews the classified report before it goes to the vendor, and a Not acceptable result can put the vendor on supply hold.',
    },
    {
      q: 'Can MAVRO manage third-party vendor audits?',
      a: 'Yes. mVLens manages audits carried out by outside agencies alongside internal ones: the agency’s report, findings and evidence are recorded against the same checklist, classified by the same rules, approved by the same approver and followed up with the same CAPAs.',
    },
    {
      q: 'How are CAPAs tracked with vendors in mVLens?',
      a: 'Each finding in mVLens can raise a corrective and preventive action with an owner and due date. The vendor answers through the vendor portal with evidence, the auditor verifies the response, and the CAPA closes only once verified. Overdue responses are flagged and reminders go out automatically.',
    },
    {
      q: 'Does mVLens handle quality agreements?',
      a: 'Yes. mVLens drafts quality agreements from templates, sends them to the vendor and to legal for review, collects e-signatures from both sides and keeps the signed versions in an archive with their renewal dates, so no agreement depends on offline copies.',
    },
  ],
  seo: {
    title: 'Vendor audit software: supplier audits, CAPA, quality agreements | MAVRO',
    description:
      'mVLens Vendor Audit in MAVRO: role-based portals for audit managers, auditors, approvers and coordinators, an eight-step audit lifecycle, rule-based site classification, CAPA tracking and e-signed quality agreements.',
  },
};
