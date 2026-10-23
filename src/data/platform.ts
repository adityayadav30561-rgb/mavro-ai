/*
 * The shared MAVRO platform, from the product deck: the features every module is built on (slide 12, "built
 * once, available everywhere") and the technical architecture (slide 11). The same strip appears on every module
 * page (blocks/PlatformStrip); the layers drive the architecture diagram (blocks/LayeredArchitecture).
 */
import type { IconName } from '../components/Icon';

export const platformFeatures = {
  title: 'Built on the',
  rest: 'MAVRO platform.',
  lead: 'Enterprise capabilities shared across every MAVRO module.',
  base: 'Built once, available in every module',
  items: [
    { icon: 'eye', title: 'Audit trail', body: 'Every transaction logged: who, when, which device. Tamper-proof, kept 7 years.' },
    { icon: 'bell', title: 'Notifications', body: 'Real-time alerts by push, email and in-app, routed by role.' },
    { icon: 'phone', title: 'Mobile app', body: 'Orders, approvals and dashboards on Android, offline-capable.' },
    { icon: 'workflow', title: 'Workflow engine', body: 'No-code approvals: thresholds, chains, escalations and SLA timers.' },
    { icon: 'lock', title: 'Security and access', body: 'RBAC down to fields, AES-256, MFA and SSO, IP and device control.' },
    { icon: 'link', title: 'Integration APIs', body: 'REST APIs, webhooks and batch; SAP BAPI, SAP Business One, e-commerce.' },
    { icon: 'layers', title: 'Scalable architecture', body: 'Multi-entity, multi-branch, multi-currency. Cloud-native.' },
    { icon: 'rules', title: 'Dual rule engine', body: 'Business rules and process flows kept apart: configuration, not code.' },
  ] satisfies { icon: IconName; title: string; body: string }[],
};

export const architecture = {
  title: 'Technical architecture',
  lead: 'Cloud-native, multi-tenant and API-first, built for enterprise security and scale.',
  layers: [
    { icon: 'people', name: 'User interfaces', items: ['Web portal (React)', 'Mobile app (Android / iOS)', 'Admin panel', 'API access'] },
    { icon: 'lock', name: 'API gateway and auth', items: ['OAuth 2.0 + JWT', 'Rate limiting', 'Request routing', 'HTTPS / TLS', 'Sessions'] },
    {
      icon: 'workflow',
      name: 'Workflow, rules and notifications engine',
      items: ['Multi-level approvals', 'SLA timers', 'Commercial rules', 'Scheme engine', 'Push alerts'],
    },
    { icon: 'layers', name: 'Core modules', items: ['Accounting', 'HR and payroll', 'Order to cash', 'Procure to pay', 'Production', 'Inventory', 'SFA', 'CRM', 'VIM'] },
    { icon: 'database', name: 'Data layer', items: ['MS SQL Server', 'Redis cache', 'Blob / file store', 'Audit log DB'] },
  ] satisfies { icon: IconName; name: string; items: string[] }[],
  security: {
    name: 'Security and compliance',
    items: [
      'AES-256 encryption, at rest and in transit',
      'RBAC with field-level access control',
      'MFA / SSO support',
      'Daily backups and disaster recovery',
      'Audit logs retained for 7 years',
      'RPO < 4 hr, RTO < 8 hr',
    ],
  },
};
