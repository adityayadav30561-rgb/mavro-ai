import type { ModuleContent } from '../schema';

/*
 * Vendor Portal. Source: product deck v2, slides 65–66 (tagline, four tiles, what it does, why it matters, four
 * screens), written for every industry. Three screens are the buyer's views; the onboarding screen is what the
 * applying vendor sees (the partner chrome in prototype/module-shell.js). Figures on the tiles come from the screens
 * (prototype/modules/vendor-portal/), whose scenario is below; like all screen data they are illustrative.
 */
export const content: ModuleContent<'vendor-portal'> = {
  slug: 'vendor-portal',
  tagline: 'One vendor master, faster onboarding and always-audit-ready compliance, across every plant.',
  tiles: [
    {
      icon: 'master',
      title: 'Single vendor master',
      body: 'One golden vendor record across every plant and ERP.',
      figure: { value: '412', label: 'active vendors, one record each' },
    },
    {
      icon: 'workflow',
      title: 'Guided onboarding',
      body: 'Six steps with GSTIN and PAN checked automatically.',
      figure: { value: '4.2 days', label: 'average onboarding, last 90 days' },
    },
    {
      icon: 'shield',
      title: 'Compliance vault',
      body: 'Expiry-tracked GST, licences and certificates.',
      figure: { value: '17', label: 'documents expiring in 90 days' },
    },
    {
      icon: 'eye',
      title: 'Vendor 360°',
      body: 'Spend, on-time delivery, quality and payments in one view.',
      figure: { value: '94%', label: 'on time for the vendor shown' },
    },
  ],
  what: 'A self-serve portal for the whole vendor lifecycle: the vendor applies, GSTIN, PAN and bank details are verified, documents are uploaded into a vault that tracks their expiry, the buyer, quality and finance approve, and the ERP vendor code is issued. Every supplier then has a 360° profile of spend, delivery, quality and payments.',
  why: [
    'Onboarding takes days rather than weeks, with GSTIN, PAN and penny-drop bank checks done automatically.',
    'No duplicate vendors: a PAN-level check runs before any vendor code is issued.',
    'Expiring documents are flagged 90 days ahead, and non-compliant vendors are blocked from new POs.',
    'The vendor base and its compliance by category are ready for the leadership review.',
    'A complete audit trail stands behind every vendor for regulatory and customer audits.',
    'Each plant manages its own suppliers and approvals, on the same master.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Purchase orders for vendors to see and acknowledge' },
      { slug: 'mvlens-vendor-audit', passes: 'Audit results and quality agreements' },
      { slug: 'accounting', passes: 'Payments and remittance details' },
      { slug: 'master-data-management', passes: 'Categories, plants and approval rules' },
    ],
    to: [
      { slug: 'procure-to-pay', passes: 'Approved vendor codes; blocked vendors get no POs' },
      { slug: 'vendor-invoice-management', passes: 'Invoices the vendor submits on the portal' },
      { slug: 'mvlens-vendor-audit', passes: 'New vendors to qualify' },
      { slug: 'gate-entry', passes: 'Dispatch details for the vehicle at the gate' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Castings, bar stock and bought-out parts vendors on one master for every plant.' },
    { slug: 'pharma', note: 'GMP certificates and licences in a vault that blocks a vendor when one lapses.' },
    { slug: 'distribution', note: 'Packaging, transport and service vendors for every depot, verified once.' },
    { slug: 'service-providers', note: 'Contractors and service vendors onboarded with tax and bank checks.' },
  ],
  roles: [
    { name: 'Purchase head', task: 'Watches the vendor base, compliance and onboarding across plants.', works: 'Vendor dashboard' },
    { name: 'Buyers', task: 'Invite vendors, approve categories and rates, and see each vendor’s record.', works: 'Vendor 360' },
    { name: 'Supplier quality', task: 'Approves new vendors and may plan an audit before the first order.', works: 'Approvals' },
    { name: 'Finance', task: 'Confirms bank and tax details before the vendor code is issued.', works: 'Approvals' },
    { name: 'Vendors', task: 'Apply, upload documents, renew them before expiry and follow orders and payments.', works: 'Onboarding' },
  ],
  related: ['procure-to-pay', 'vendor-invoice-management', 'mvlens-vendor-audit', 'gate-entry'],
  screens: [
    {
      screen: 'vendor-portal/dashboard',
      view: 'Vendor dashboard',
      title: 'Vendor dashboard',
      caption: 'The vendor base by category and plant with its compliance, onboarding by step, blocked vendors and the documents expiring next.',
      alt: 'MAVRO Vendor Portal dashboard: 412 active vendors across two plants and a depot, 96.1% fully compliant, 9 in onboarding at 4.2 days on average, 17 documents expiring in 90 days, 3 vendors blocked from new POs, and the vendor base by category (illustrative data).',
    },
    {
      screen: 'vendor-portal/onboarding',
      view: 'Onboarding',
      title: 'Onboarding workflow, as the vendor sees it',
      caption: 'A new vendor’s six-step registration: GSTIN, PAN and bank verified automatically, documents with their expiry, and the approvals still to come.',
      alt: 'MAVRO Vendor Portal from the applying vendor’s side: registration at step 4 of 6, GSTIN, PAN, duplicate check, penny-drop bank check and Udyam registration verified, five of six documents uploaded with a factory licence expiring within 90 days, and the buyer, quality and finance approvals that follow (illustrative data).',
    },
    {
      screen: 'vendor-portal/register',
      view: 'Vendor register',
      title: 'Vendor register',
      caption: 'Every vendor on one master, with plants, GSTIN status, documents, Udyam category, on-time delivery and status.',
      alt: 'MAVRO vendor register: vendors deduplicated by PAN, each with category, plants supplied, GSTIN status, documents in the vault, Udyam category, on-time delivery over 12 months and status, including one blocked vendor and one still onboarding (illustrative data).',
    },
    {
      screen: 'vendor-portal/vendor-360',
      view: 'Vendor 360',
      title: 'Vendor 360° detail',
      caption: 'One vendor’s spend, on-time delivery, rejections and payment days, an order traced to payment, its compliance vault and supply risk.',
      alt: 'MAVRO vendor 360° for a castings supplier: ₹96.4 L spend this year, 94% on time in full, 0.6% rejected, paid in 38 days against a 45-day limit, a purchase order traced from order to payment, the compliance vault with a quality agreement due for renewal, and single-source risk (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 412 active vendors (Plant 1 268, Chennai 121, Pune depot 23), 396 fully compliant, 17 documents expiring in 90 days, 3 blocked from new POs; 9 onboarding at 4.2 days average; 6 duplicates stopped this year. Deccan Forge Works (VR-0188) at step 4 of 6, factory licence expiring 30 Nov. Aravali Castings (V-10021): ₹96.4 L this year, 94% on time, 0.6% rejected, paid in 38 days; PO-7714 in transit with VIM-2207 waiting for its goods receipt.',
  faq: [
    {
      q: 'What does the Vendor Portal in MAVRO do?',
      a: 'The MAVRO Vendor Portal lets suppliers register and manage themselves. A vendor applies online, GSTIN, PAN and bank details are verified automatically, documents go into a vault that tracks their expiry, the buyer, supplier quality and finance approve, and the vendor code is issued. Each supplier then has a 360° profile of spend, delivery, quality and payments.',
    },
    {
      q: 'How does MAVRO verify a new vendor?',
      a: 'MAVRO checks the vendor’s GSTIN on the GST portal and matches the legal name, validates the PAN against it, confirms the bank account by a penny-drop credit and reads the Udyam registration for MSME status. A PAN-level check stops a vendor already in the master from being registered twice.',
    },
    {
      q: 'What happens when a vendor’s document expires in MAVRO?',
      a: 'MAVRO flags documents such as GST registration, factory licences and quality certificates 90 days before they expire and reminds the vendor to upload the renewal. If a document lapses, the vendor is blocked from new purchase orders until it is renewed, and the block shows on the vendor’s record.',
    },
    {
      q: 'Can vendors submit invoices through the MAVRO Vendor Portal?',
      a: 'Yes. Vendors see their purchase orders on the portal and submit invoices there, which arrive in MAVRO Vendor Invoice Management for the three-way match. They can follow each invoice and its payment, and the 360° profile shows the same order, invoice and payment trail to the buyer.',
    },
  ],
  seo: {
    title: 'Vendor portal and supplier onboarding with GST and PAN checks | MAVRO',
    description:
      'MAVRO Vendor Portal: self-serve supplier onboarding with GSTIN, PAN and penny-drop bank checks, one deduplicated vendor master, a compliance vault with expiry alerts and a 360° profile for every vendor.',
  },
};
