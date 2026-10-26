import type { ModuleContent } from '../schema';

/*
 * Audit Management. Source: product deck v2, slide 80 (tagline, four tiles: assurance health, audit register,
 * audit execution and CAPA closure; six points on why it matters; four screens). Vendor audits run in mVLens Vendor
 * Audit and appear here on the same plan. Figures on the tiles come from the module's screens
 * (prototype/modules/audit-management/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'audit-management'> = {
  slug: 'audit-management',
  tagline: 'Audit plan to CAPA closure: one assurance trail across sites, vendors and functions.',
  tiles: [
    {
      icon: 'eye',
      title: 'Assurance health',
      body: 'Plan adherence, open findings by severity and CAPA ageing.',
      figure: { value: '91%', label: 'of the audits due this year done' },
    },
    {
      icon: 'layers',
      title: 'Audit register',
      body: 'Internal, regulatory, customer, certification and vendor audits.',
      figure: { value: '64', label: 'audits on this year’s plan' },
    },
    {
      icon: 'rules',
      title: 'Audit execution',
      body: 'Clause-level checklists with evidence and severity.',
      figure: { value: '36', label: 'clauses on one process checklist' },
    },
    {
      icon: 'quality',
      title: 'CAPA closure',
      body: 'Closed only when the effectiveness check passes.',
      figure: { value: '21', label: 'CAPAs open, 3 overdue' },
    },
  ],
  what: 'The annual audit plan across internal, regulatory, customer, certification and vendor audits and its adherence; audits carried out clause by clause against checklists, with evidence, severity and repeat findings flagged; findings turned into owned corrective and preventive actions that close only when their effectiveness is verified; and regulatory deadlines, auditor independence and the evidence trail kept on one record.',
  why: [
    'Critical findings are visible the same day, not at the next review.',
    'Repeat observations are flagged against the earlier audit that raised them.',
    'A CAPA closes only with evidence that it worked.',
    'Regulatory responses are tracked against their deadlines.',
    'Auditor independence and the evidence behind each finding are on record.',
    'Vendor and warehouse audits share the plan with plant self-inspections.',
  ],
  flow: {
    from: [
      { slug: 'mvlens-vendor-audit', passes: 'Vendor audits, findings and CAPAs' },
      { slug: 'asset-management', passes: 'Calibration and equipment status' },
      { slug: 'hrms-and-payroll', passes: 'Training and certification records' },
      { slug: 'customer-service', passes: 'Complaints that call for an audit' },
    ],
    to: [
      { slug: 'production-management', passes: 'Findings and actions on the lines' },
      { slug: 'document-management', passes: 'Reports, evidence and responses' },
      { slug: 'data-analytics', passes: 'Assurance and CAPA reporting' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Process, system and customer audits on the plants, with findings closed before the next certification visit.' },
    { slug: 'pharma', note: 'Self-inspections and regulatory inspections with CAPAs that close only on verified effectiveness.' },
    { slug: 'distribution', note: 'Warehouse, depot and supplier audits on one plan, with findings owned by each site.' },
  ],
  roles: [
    { name: 'Internal audit head', task: 'Owns the plan, its adherence and the assurance picture.', works: 'Coverage and CAPA' },
    { name: 'Auditors', task: 'Carry out audits clause by clause with evidence on the record.', works: 'Audit execution' },
    { name: 'QA head', task: 'Verifies that CAPAs worked before they close.', works: 'CAPA closure' },
    { name: 'Auditees', task: 'Answer findings and carry out the actions they own.', works: 'Findings' },
    { name: 'Compliance', task: 'Responds to regulators within their deadlines.', works: 'Regulatory responses' },
  ],
  related: ['mvlens-vendor-audit', 'asset-management', 'production-management', 'document-management'],
  screens: [
    {
      screen: 'audit-management/coverage-capa',
      view: 'Coverage and CAPA',
      title: 'Audit coverage and CAPA health',
      caption: 'Plan adherence by audit type, open findings by severity, CAPAs and what needs attention.',
      alt: 'MAVRO audit coverage: 31 of 34 audits due done, 27 open findings with one critical, 21 open CAPAs with three overdue, two repeat observations, the plan by internal, vendor, customer, regulatory and certification audits, CAPAs raised and closed by month, items needing attention and audits coming up (illustrative data).',
    },
    {
      screen: 'audit-management/audit-execution',
      view: 'Audit execution',
      title: 'Audit execution',
      caption: 'A process audit clause by clause: the result, the finding and its evidence, with repeats flagged.',
      alt: 'MAVRO audit execution for an internal machining process audit: a 36-clause ISO 9001 checklist with 28 done, a major finding for a blocked torque wrench found in use with photos and the asset record, the linked CAPA reopened, and four findings including two repeats of earlier audits (illustrative data).',
    },
    {
      screen: 'audit-management/capa-closure',
      view: 'CAPA closure',
      title: 'CAPA closure queue',
      caption: 'Open CAPAs by stage, and one that failed its effectiveness check, reopened at root cause.',
      alt: 'MAVRO CAPA closure queue: open corrective actions from internal, vendor, customer and regulatory audits with owner, stage from root cause to effectiveness and due date, three overdue, and the calibration recall CAPA reopened after its effectiveness check failed, with proposed actions (illustrative data).',
    },
    {
      screen: 'audit-management/audit-register',
      view: 'Audit register',
      title: 'Audit register',
      caption: 'Every audit with its auditee, auditor, checklist, findings by severity, result and status.',
      alt: 'MAVRO audit register: customer, internal, vendor, regulatory and certification audits since 1 September with auditee, auditor, date, checklist, findings by severity, result and status, including vendor reports awaiting approval and a regulatory reply due (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. The FY 2026-27 plan holds 64 audits; 31 of the 34 due are done. During internal audit IA-0219 of machining at Plant 1, Rekha Iyengar from the Chennai plant’s QA finds torque wrench TW-14 in use at ASM-02, two days after its calibration expired and it was blocked. The major finding reopens CAPA-0088, the calibration recall raised after the March audit, because its effectiveness check fails. Two findings repeat earlier audits.',
  faq: [
    {
      q: 'What does Audit Management in MAVRO do?',
      a: 'MAVRO Audit Management holds the annual plan of internal, regulatory, customer, certification and vendor audits, runs each audit clause by clause with evidence and severity, turns findings into owned corrective and preventive actions, and closes them only when their effectiveness is verified.',
    },
    {
      q: 'How does MAVRO handle repeat findings?',
      a: 'When a finding matches one raised in an earlier audit of the same area, MAVRO flags it as a repeat and links the two, so the earlier corrective action can be reviewed rather than raised again.',
    },
    {
      q: 'When can a CAPA be closed?',
      a: 'Only after its effectiveness check passes. Root cause, action and evidence are recorded first; if a later audit or check shows the problem has come back, the CAPA is reopened at root cause instead of closed.',
    },
    {
      q: 'How do vendor audits fit in?',
      a: 'Vendor audits are carried out in mVLens Vendor Audit and appear in Audit Management on the same plan and register as internal and customer audits, with their findings and CAPAs in the same closure queue.',
    },
  ],
  seo: {
    title: 'Audit management and CAPA software | MAVRO',
    description:
      'MAVRO Audit Management: the audit plan and its adherence, clause-level checklists with evidence and severity, repeat findings flagged, CAPAs closed only on verified effectiveness, and regulatory deadlines tracked.',
  },
};
