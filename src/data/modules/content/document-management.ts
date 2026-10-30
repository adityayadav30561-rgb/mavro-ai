import type { ModuleContent } from '../schema';

/*
 * Document Management. Source: the AMR L1 deck, slides 78–79 (the product deck v2 has no detail slide for it; v1
 * lists it only as "central document repository"): tagline, four tiles (repository, upload with auto-numbering and
 * duplicate detection, versions with one effective version and approval, zip requests with approval and expiry), what
 * it does and six points on why it matters, four screens. That deck's artwork, plate-destruction and customer-code
 * numbering points belong to a printing customer and are not used; the screens use drawings, SOPs, quality
 * agreements, certificates and licences. Figures on the tiles come from the module's screens
 * (prototype/modules/document-management/); like all screen data they are illustrative.
 */
export const content: ModuleContent<'document-management'> = {
  slug: 'document-management',
  tagline: 'Controlled documents by type: numbered, versioned, approved and retrievable.',
  tiles: [
    {
      icon: 'layers',
      title: 'Repository',
      body: 'Folders by document type and status.',
      figure: { value: '8,960', label: 'controlled documents in one repository' },
    },
    {
      icon: 'rules',
      title: 'Upload',
      body: 'Auto-numbering, version detection and duplicate checks.',
      figure: { value: '11', label: 'duplicate uploads blocked in a week' },
    },
    {
      icon: 'workflow',
      title: 'Versions',
      body: 'One effective version at a time, with approval routed.',
      figure: { value: '1', label: 'effective version per document' },
    },
    {
      icon: 'lock',
      title: 'Zip requests',
      body: 'Bulk downloads with approval and expiry.',
      figure: { value: '48 h', label: 'link life on a restricted pack' },
    },
  ],
  what: 'A controlled repository for drawings, SOPs, certificates, specifications, contracts, quality agreements and licences: auto-numbered uploads with version and duplicate detection, a version history with approval so only one version is effective, bulk zip downloads with access control and expiring links, and alerts to owners before a contract, licence or certificate expires.',
  why: [
    'Every document follows a type-and-sequence number.',
    'Duplicate uploads are caught before they enter the repository.',
    'Only one effective version exists at a time.',
    'A superseded version stays on record without staying in use.',
    'Zip links expire, and restricted content needs approval.',
    'Expiring contracts and licences alert their owners.',
  ],
  flow: {
    from: [
      { slug: 'audit-management', passes: 'Audit reports and evidence' },
      { slug: 'mvlens-vendor-audit', passes: 'Quality agreements and audit reports' },
      { slug: 'vendor-portal', passes: 'Vendor certificates and documents' },
      { slug: 'real-estate-management', passes: 'Leases, deeds and NOCs' },
    ],
    to: [
      { slug: 'learning-management', passes: 'SOPs that trained staff must acknowledge' },
      { slug: 'production-management', passes: 'Effective drawings and specifications' },
      { slug: 'audit-management', passes: 'Controlled documents for auditors' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Drawings, specifications and SOPs controlled by revision, with only the effective one in use on the floor.' },
    { slug: 'pharma', note: 'SOPs, certificates of analysis and licences with approval, version control and expiry alerts.' },
    { slug: 'distribution', note: 'Contracts, licences and agreements per depot, with owners alerted before they lapse.' },
    { slug: 'service-providers', note: 'Client contracts, policies and certifications controlled, versioned and retrievable.' },
  ],
  roles: [
    { name: 'Document controller', task: 'Reviews uploads, numbers them and keeps one effective version.', works: 'Upload batch' },
    { name: 'QA head', task: 'Approves SOPs and releases restricted document packs.', works: 'Version history' },
    { name: 'Engineering', task: 'Uploads drawings and revisions for approval.', works: 'Upload batch' },
    { name: 'Auditors', task: 'Receive controlled packs with expiring links.', works: 'Zip requests' },
    { name: 'Document owners', task: 'Renew licences and agreements before they expire.', works: 'Repository dashboard' },
  ],
  related: ['audit-management', 'learning-management', 'mvlens-vendor-audit', 'real-estate-management'],
  screens: [
    {
      screen: 'document-management/repository-dashboard',
      view: 'Repository dashboard',
      title: 'Repository dashboard',
      caption: 'Documents by type with number series, what is awaiting approval and what is about to expire.',
      alt: 'MAVRO document repository dashboard: 8,960 controlled documents, 6 waiting for approval, 9 expiring in 90 days, 14 retention rules, documents by type with number series and effective share, recent documents and the licences and agreements expiring soon (illustrative data).',
    },
    {
      screen: 'document-management/upload-batch',
      view: 'Upload batch',
      title: 'Upload batch review',
      caption: 'Nine files auto-numbered, a new drawing revision detected and duplicates blocked before they enter.',
      alt: 'MAVRO upload batch: nine files with document type, assigned number and result, five new documents, one new drawing revision that supersedes the previous one after approval, two duplicates blocked by checksum and one file waiting for a type (illustrative data).',
    },
    {
      screen: 'document-management/version-history',
      view: 'Version history',
      title: 'Version history and approval',
      caption: 'An SOP revision after a CAPA: what changed, the approval route and when it takes effect.',
      alt: 'MAVRO version history of a standard operating procedure: four versions with the current one effective, a new version in approval, what changes against the effective version, the approval steps, document details and the CAPA, audit and training it links to (illustrative data).',
    },
    {
      screen: 'document-management/zip-requests',
      view: 'Zip requests',
      title: 'Bulk download requests',
      caption: 'Zip packs with approval for restricted files and links that expire.',
      alt: 'MAVRO bulk download requests: audit and authority packs with file counts, requester, link life and status, two waiting for approval because they contain restricted customer drawings, and the contents and approval of one pack (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 8,960 controlled documents. After the IA-0219 audit, SOP-0063 on calibrated tool control has a new version waiting for the plant head’s approval; the current one stays effective until then. Engineering’s upload of nine files has a new IH-220 drawing revision, two duplicates blocked and one file with no type. A pack for the Kestrel Pumps audit on 17 Oct contains restricted customer drawings, so the QA head must approve its download.',
  faq: [
    {
      q: 'What does Document Management in MAVRO do?',
      a: 'MAVRO Document Management is a controlled repository for drawings, SOPs, certificates, specifications, contracts and licences. It numbers uploads automatically, detects new versions and duplicates, routes versions for approval so only one is effective, and controls bulk downloads with approval and expiring links.',
    },
    {
      q: 'How does MAVRO keep only one version in use?',
      a: 'A new version stays in approval while the current one remains effective. When it is approved, it becomes effective and the previous one is superseded, but kept on record with its history.',
    },
    {
      q: 'Can restricted documents be shared safely?',
      a: 'Yes. A zip request that includes restricted files, such as customer drawings, goes to an approver first, the link expires after a set time and every download is logged.',
    },
    {
      q: 'Does it warn before a licence or contract expires?',
      a: 'Yes. Documents with an expiry date, such as licences, NOCs, contracts and certificates, alert their owners at 90, 60 and 30 days.',
    },
  ],
  seo: {
    title: 'Document control and version management software | MAVRO',
    description:
      'MAVRO Document Management: a controlled repository with auto-numbering, version and duplicate detection, approval so one version is effective, restricted bulk downloads with expiring links, and expiry alerts for licences and contracts.',
  },
};
