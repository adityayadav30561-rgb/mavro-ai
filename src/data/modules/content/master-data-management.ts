import type { ModuleContent } from '../schema';

/*
 * Master Data Management. Source: product deck v2, slide 90 (tagline, four tiles: data quality, master records,
 * golden record, change approvals; six points on why it matters; four screens). Figures on the tiles come from the
 * module's screens (prototype/modules/master-data-management/), whose scenario is below; like all screen data they are
 * illustrative.
 */
export const content: ModuleContent<'master-data-management'> = {
  slug: 'master-data-management',
  tagline: 'One governed record per customer, material, vendor and territory, synced everywhere.',
  tiles: [
    {
      icon: 'eye',
      title: 'Data quality',
      body: 'Domain-wise completeness and duplicate clusters.',
      figure: { value: '92%', label: 'quality score across 12,480 records' },
    },
    {
      icon: 'master',
      title: 'Master records',
      body: 'Steward, quality score and state for every record.',
      figure: { value: '7', label: 'domains, each with a named steward' },
    },
    {
      icon: 'link',
      title: 'Golden record',
      body: 'Match, survivorship and enrichment with sources.',
      figure: { value: '3 → 1', label: 'records merged for one customer' },
    },
    {
      icon: 'rules',
      title: 'Change approvals',
      body: 'Attribute changes reviewed before downstream sync.',
      figure: { value: '6', label: 'changes waiting for the right approver' },
    },
  ],
  what: 'Governance for the data every other module depends on: domain-level quality and duplication health, stewardship over customer, material, vendor, employee, account, territory and location records, golden-record creation through matching, survivorship and external enrichment, and change approval before anything syncs downstream.',
  why: [
    'Duplicate customers across GST and pincode are merged, not billed twice.',
    'Licence and registration validity is enforced before a record goes active.',
    'Territory remaps are impact-checked before they break beats and reporting.',
    'Pricing and tax attribute changes need the right approver, every time.',
    'Every master record has a named steward and a quality score.',
    'Downstream systems receive one synchronised version, not local copies.',
  ],
  flow: {
    from: [
      { slug: 'crm', passes: 'New and changed customers' },
      { slug: 'procure-to-pay', passes: 'New and changed vendors and items' },
      { slug: 'vendor-portal', passes: 'Vendor-submitted details and documents' },
      { slug: 'hrms-and-payroll', passes: 'Employee records' },
    ],
    to: [
      { slug: 'order-to-cash', passes: 'Customer and price masters' },
      { slug: 'inventory-management', passes: 'Item master and tax codes' },
      { slug: 'sales-force-automation', passes: 'Territories and outlets' },
      { slug: 'business-analyst-app', passes: 'Governed dimensions for reporting' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Item, vendor and customer masters kept clean across the plants, with price and tax changes approved.' },
    { slug: 'distribution', note: 'Customers, outlets and territories governed across thousands of records, with remaps impact-checked.' },
    { slug: 'pharma', note: 'Licence and registration validity enforced on customers and vendors before a record goes active.' },
    { slug: 'service-providers', note: 'Clients, entities and employees held once and shared with every system.' },
  ],
  roles: [
    { name: 'Data steward lead', task: 'Runs duplicate reviews, merges and the approval queue.', works: 'Quality dashboard' },
    { name: 'Domain stewards', task: 'Own customer, material, vendor or territory records and their quality.', works: 'Master records' },
    { name: 'Sales head', task: 'Approves price, credit and territory changes.', works: 'Change approvals' },
    { name: 'Finance controller', task: 'Approves tax and payment attribute changes.', works: 'Change approvals' },
    { name: 'Purchase head', task: 'Approves vendor bank and terms changes.', works: 'Change approvals' },
  ],
  related: ['crm', 'procure-to-pay', 'inventory-management', 'business-analyst-app'],
  screens: [
    {
      screen: 'master-data-management/quality-dashboard',
      view: 'Quality dashboard',
      title: 'Master data quality dashboard',
      caption: 'Completeness, duplicates and stewardship by domain, with what needs a decision.',
      alt: 'MAVRO master data quality: 12,480 records in seven domains, a 92% quality score, 37 duplicate clusters, 6 changes awaiting approval, completeness and duplicate clusters by domain with stewards, quality score by month and items needing a decision (illustrative data).',
    },
    {
      screen: 'master-data-management/golden-record',
      view: 'Golden record',
      title: 'Golden record, merge and enrich',
      caption: 'Three records for one customer matched, the best value chosen per field and the name enriched from the registry.',
      alt: 'MAVRO golden record for one customer in three systems: ERP, CRM and portal records compared field by field with match scores, the golden value chosen for each with its source, a registry enrichment, the impact of the merge on orders, invoices and credit, and other clusters in the queue (illustrative data).',
    },
    {
      screen: 'master-data-management/change-approvals',
      view: 'Change approvals',
      title: 'Change approval queue',
      caption: 'Price, tax, credit, bank and territory changes reviewed by the right approver before they sync.',
      alt: 'MAVRO change approval queue: six attribute changes for price, HSN code, territory remap, credit limit, vendor bank account and payment terms with from and to values and approvers, and the impact check and approval step for a territory remap (illustrative data).',
    },
    {
      screen: 'master-data-management/master-records',
      view: 'Master records',
      title: 'Master record register',
      caption: 'Records needing attention with steward, quality score, issue, systems and state.',
      alt: 'MAVRO master record register: customer, material, vendor and territory records needing attention with steward, quality score, issue such as duplicate cluster, missing GSTIN or HSN, source systems, last change and state (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 12,480 master records and 37 duplicate clusters. Kestrel Pumps exists as three customer records, one with a typo created from a portal order; the steward merges them into one golden record before the next invoice. Six changes wait for approval, including an Ahmedabad territory remap that moves 38 outlets and a vendor bank account change that needs two approvers.',
  faq: [
    {
      q: 'What does Master Data Management in MAVRO do?',
      a: 'MAVRO Master Data Management governs customers, materials, vendors, employees, accounts, territories and locations: it measures quality and duplicates, names a steward for every record, builds golden records through matching, survivorship and enrichment, and holds changes for approval before they sync to other systems.',
    },
    {
      q: 'What is a golden record?',
      a: 'It is the single best version of a record built from several sources. For each field, a rule chooses the best source, for example the ERP for credit terms and the CRM for the latest address, and external checks such as the GST registry can enrich it.',
    },
    {
      q: 'Which changes need approval?',
      a: 'Sensitive attributes such as price, tax codes, credit limits, vendor bank accounts, payment terms and territory remaps are held until the right approver signs, and a territory remap shows its impact on beats and outlets first.',
    },
    {
      q: 'How do other modules get the clean data?',
      a: 'Approved changes sync to ERP, CRM, the portals and reporting together, so every system receives the same version instead of local copies.',
    },
  ],
  seo: {
    title: 'Master data management and golden record software | MAVRO',
    description:
      'MAVRO Master Data Management: quality and duplicate health by domain, named stewards, golden records with matching, survivorship and enrichment, and approval of price, tax, credit and territory changes before they sync.',
  },
};
