/*
 * The Security and compliance page (/security-and-compliance, SITE-PLAN.md section 3.7). The figures, controls and
 * compliance rules are the homepage's trust card (`why.trust` in home.ts) one level deeper; the architecture is
 * deck slide 11 (`architecture` in platform.ts); access and audit are slide 12; the India compliance detail comes
 * from the module pages (Accounting, Vendor Invoice Management, Order to Cash, Transportation Management, HRMS and
 * Payroll, the contract labour modules, Vendor Portal) and the HRMS deck (slide 7). No certification, hosting
 * location, data residency or testing claim: none is in the decks (DECISIONS.md).
 */
import type { IconName } from '../components/Icon';
import type { ModuleSlug } from './modules';

export const securityPage = {
  seo: {
    title: 'Security and compliance: GST, statutory payroll and data protection | MAVRO',
    description:
      'How MAVRO protects your data and keeps you compliant: AES-256 encryption, role and field-level access, MFA and SSO, a tamper-proof audit trail kept 7 years, RPO under 4 hours and RTO under 8, and GST, e-invoicing, e-way bills, PF, ESI, TDS, PT and CLRA built in.',
  },
  hero: {
    title: 'Compliant by design,',
    rest: 'secure at every layer.',
    lead: 'GST returns built from your transactions, statutory payroll calculated in payroll, every change written to an audit trail you cannot edit, and your data encrypted at rest and in transit.',
    facts: [
      { value: 'AES-256', label: 'At rest and in transit' },
      { value: '7 years', label: 'Tamper-proof audit trail' },
      { value: 'RPO < 4 hr', label: 'RTO < 8 hr' },
    ],
    screen: {
      alt: 'MAVRO GST returns: GSTR-1 ready to file with its e-invoices, the GSTR-3B computation with output tax and input credit, and the GSTR-2B reconciliation (illustrative data).',
    },
    actions: { compliance: 'See India compliance' },
  },
  architecture: {
    title: 'Security',
    rest: 'at every layer.',
    lead: 'Cloud-native, multi-tenant and API-first: every request is authenticated at the gateway, and security wraps all five layers.',
  },
  access: {
    title: 'Who can see what,',
    rest: 'and a record of everything.',
    lead: 'Roles decide what each person can view, create, approve and see the cost of; every change is written by the system and cannot be edited.',
    screen: 'MAVRO roles and audit: what each role may view, create and approve, with its approval limit, beside the audit trail of the day’s changes, who made them and when (illustrative data).',
    points: [
      { icon: 'people', title: 'Role-based access', body: 'Roles with field-level control: view, create, approve and see cost, with approval limits per role.' },
      { icon: 'lock', title: 'MFA and SSO', body: 'Multi-factor authentication and single sign-on are supported.' },
      { icon: 'link', title: 'API gateway', body: 'OAuth 2.0 and JWT on every request, with rate limiting and request routing, over HTTPS and TLS.' },
      { icon: 'phone', title: 'IP and device control', body: 'Access can be limited by IP address and by device.' },
      { icon: 'eye', title: 'Audit trail', body: 'Every transaction logged with who, when and which device; tamper-proof and kept 7 years.' },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },
  compliance: {
    title: 'India compliance,',
    rest: 'in the module that makes the record.',
    lead: 'Returns, challans and registers come from the transactions themselves, checked before they post, not compiled in spreadsheets afterwards.',
    items: [
      {
        icon: 'receipt',
        title: 'GST returns',
        body: 'GSTR-1 and GSTR-3B built from transactions; GSTR-2B reconciled, and input credit at risk held.',
        points: ['GSTR-1 and GSTR-3B', 'GSTR-2B reconciliation', 'Input tax credit protected'],
        module: 'accounting',
      },
      {
        icon: 'finance',
        title: 'E-invoicing',
        body: 'Auto e-invoicing at every touchpoint; e-invoice and place-of-supply eligibility checked before an invoice posts.',
        points: ['E-invoice on posting', 'Place-of-supply checks', 'GST-compliant invoices'],
        module: 'order-to-cash',
      },
      {
        icon: 'transport',
        title: 'E-way bills',
        body: 'E-way bill and insurance compliance on every movement, matched to the invoice and the weighbridge.',
        points: ['E-way bill per shipment', 'Insurance on every movement', 'Gate and weighbridge matched'],
        module: 'transportation-management',
      },
      {
        icon: 'people',
        title: 'Statutory payroll',
        body: 'Calculated in payroll and posted to the ledger on approval, with statutory rates updated centrally.',
        points: ['PF with the ECR challan', 'ESI and state-wise PT', 'TDS, Form 16 and 24Q', 'Gratuity and LTA'],
        module: 'hrms-and-payroll',
      },
      {
        icon: 'gate',
        title: 'Contract labour',
        body: 'No contractor bill is certified while statutory proof is missing; a missing challan holds billing.',
        points: ['CLRA licence and registers', 'PF and ESIC challans', 'Wage register evidence'],
        module: 'contract-labour-supply',
      },
      {
        icon: 'shield',
        title: 'Vendor compliance',
        body: 'GSTIN and PAN verified at onboarding; expiring documents flagged ahead and non-compliant vendors blocked from POs.',
        points: ['GSTIN and PAN checks', 'Compliance vault with expiries', 'Blocked from POs if lapsed'],
        module: 'vendor-portal',
      },
    ] satisfies { icon: IconName; title: string; body: string; points: string[]; module: ModuleSlug }[],
    more: 'See',
  },
  protection: {
    title: 'Your data,',
    rest: 'protected and recoverable.',
    lead: 'Encrypted, backed up every day, recoverable within hours, and with every change kept for seven years.',
  },
  faq: [
    {
      q: 'How does MAVRO keep our data secure?',
      a: 'Data is encrypted with AES-256 at rest and in transit. Access is role-based with field-level control, MFA and SSO, and IP and device control; every request passes an API gateway with OAuth 2.0 and JWT over HTTPS and TLS.',
    },
    {
      q: 'Does MAVRO keep an audit trail?',
      a: 'Yes. Every transaction is logged with who made it, when and from which device. The audit trail is tamper-proof and kept for 7 years, and changes are written by the system, so they cannot be edited.',
    },
    {
      q: 'What happens if something goes wrong?',
      a: 'Data is backed up daily with disaster recovery in place. The recovery point objective is under 4 hours and the recovery time objective under 8 hours.',
    },
    {
      q: 'Is MAVRO GST compliant?',
      a: 'Yes. GSTR-1 and GSTR-3B are built from transactions, GSTR-2B is reconciled with input credit at risk held, invoices are e-invoiced with place-of-supply checks before they post, and e-way bills are kept on every movement.',
    },
    {
      q: 'Does MAVRO handle Indian statutory payroll?',
      a: 'Yes. PF with the ECR challan, ESI, state-wise professional tax, TDS with Form 16 and 24Q, gratuity and LTA are computed and filed from within MAVRO, and payroll posts to the ledger on approval.',
    },
    {
      q: 'Can MAVRO manage contract labour compliance?',
      a: 'Yes. The contract labour modules check CLRA, PF, ESIC and wage evidence for every contractor and period, and no contractor bill is certified while statutory proof is missing.',
    },
  ],
  cta: { title: 'See the controls', rest: 'on your own data.', body: 'A demo of roles, approvals, the audit trail and your GST and payroll returns, built around your business.' },
};
