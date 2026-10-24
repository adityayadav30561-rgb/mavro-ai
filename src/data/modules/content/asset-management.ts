import type { ModuleContent } from '../schema';

/*
 * Asset Management. Source: product deck v2, slides 44–45 (tagline, four tiles, what it does, why it matters, four
 * screens), with the AMR L1 deck's variant (slide 64: QR and RFID verification, breakdown to maintenance order)
 * and standard fixed-asset accounting (Companies Act and income-tax books), written for every industry. Figures on
 * the tiles come from the module's screens (prototype/modules/asset-management/), whose scenario is below; like all
 * screen data they are illustrative.
 */
export const content: ModuleContent<'asset-management'> = {
  slug: 'asset-management',
  tagline: 'Acquisition to disposal: uptime, qualification and book value on one asset record.',
  tiles: [
    {
      icon: 'eye',
      title: 'Uptime and value',
      body: 'Site-wise uptime, breakdowns and gross block.',
      figure: { value: '95.6%', label: 'uptime across sites in October' },
    },
    {
      icon: 'layers',
      title: 'Asset register',
      body: 'Tagged assets with site, condition and written-down value.',
      figure: { value: '1,146', label: 'tagged assets on three sites' },
    },
    {
      icon: 'wrench',
      title: 'Maintenance',
      body: 'Preventive plans, calibration and spares readiness.',
      figure: { value: '92%', label: 'preventive maintenance on time' },
    },
    {
      icon: 'finance',
      title: 'Depreciation',
      body: 'Period run with exceptions cleared at book close.',
      figure: { value: '₹18.7 L', label: 'October charge in the trial run' },
    },
  ],
  what: 'One record per asset across its life: site-wise uptime and breakdown health, a tagged asset register with location, condition and written-down value, breakdowns turned into maintenance orders, preventive maintenance and calibration plans tied to whether the asset may be used, and a period depreciation run that closes the books with every exception resolved.',
  why: [
    'Overdue preventive maintenance is visible before it puts a line at risk.',
    'Expired calibration and qualification block use of the asset, not just alert.',
    'Breakdown clusters point to the specific equipment driving lost hours.',
    'Critical spares below reorder level surface with the shutdown they affect.',
    'Physical verification, insurance and tagging gaps are closed on a cycle.',
    'Depreciation, impairment and life-expiry exceptions clear before book close.',
  ],
  flow: {
    from: [
      { slug: 'procure-to-pay', passes: 'Capital purchases and their invoices' },
      { slug: 'project-management', passes: 'Capital work in progress until put to use' },
      { slug: 'production-management', passes: 'Breakdowns and machine hours' },
      { slug: 'inventory-management', passes: 'Spares issued to maintenance orders' },
    ],
    to: [
      { slug: 'accounting', passes: 'Depreciation journals and the fixed asset schedule' },
      { slug: 'production-management', passes: 'Machine availability and maintenance windows' },
      { slug: 'insurance-management', passes: 'Additions and values to insure' },
      { slug: 'procure-to-pay', passes: 'Spares and service requisitions' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Machines, dies and test rigs kept running and calibrated, with breakdowns traced to the equipment.' },
    { slug: 'pharma', note: 'Equipment qualification and calibration that block use when they lapse, beside book value.' },
    { slug: 'distribution', note: 'Warehouses, forklifts and vehicles across depots, verified, insured and depreciated.' },
    { slug: 'service-providers', note: 'Laptops, servers and office assets issued, verified and depreciated by entity.' },
  ],
  roles: [
    { name: 'Maintenance head', task: 'Watches uptime, breakdown clusters and overdue preventive work.', works: 'Uptime and value' },
    { name: 'Technicians', task: 'Carry out maintenance orders and record the cause, time and parts.', works: 'Maintenance orders' },
    { name: 'Quality', task: 'Keeps instruments in calibration; an expired one cannot be used.', works: 'Calibration' },
    { name: 'Finance controller', task: 'Runs depreciation and clears its exceptions before book close.', works: 'Depreciation' },
    { name: 'Site administrators', task: 'Verify assets by QR scan each cycle and report what is missing.', works: 'Physical verification' },
  ],
  related: ['accounting', 'production-management', 'procure-to-pay', 'inventory-management'],
  screens: [
    {
      screen: 'asset-management/uptime-value',
      view: 'Uptime and value',
      title: 'Asset uptime and value',
      caption: 'Uptime, breakdowns, gross block and book value by site, the equipment behind the lost hours, and the spares, calibration and verification gaps to close.',
      alt: 'MAVRO Asset Management dashboard: 95.6% uptime across three sites against a 97% target, 13 breakdowns with 14 h 20 m lost, ₹24.8 Cr gross block and ₹13.6 Cr book value, breakdown clusters led by one turning centre, critical spares below reorder, calibration due and physical verification gaps (illustrative data).',
    },
    {
      screen: 'asset-management/asset-detail',
      view: 'Assets',
      title: 'Asset detail: maintenance and lifecycle',
      caption: 'One machine’s record: uptime, failures and repair time, every maintenance order, the preventive and calibration plan, its value and its life from purchase to the next shutdown.',
      alt: 'MAVRO asset record for a turning centre: 94.2% uptime in October with three breakdowns, mean time between failures of 192 hours, maintenance history, an overdue spindle check, the preventive and calibration plan, cost of ₹68.4 L with a ₹39.9 L book value and a bearing change planned for the next shutdown (illustrative data).',
    },
    {
      screen: 'asset-management/depreciation-run',
      view: 'Depreciation',
      title: 'Depreciation run: audit queue',
      caption: 'The month’s run by asset class and entity, the journal it will post, and the exceptions that must clear before the books close.',
      alt: 'MAVRO depreciation run for October: ₹18.7 L across six asset classes and three entities against ₹18.6 L in September, 1,121 assets depreciating, the journal preview, and an audit queue of nine exceptions with three open, including an impairment review and an asset in capital work in progress (illustrative data).',
    },
    {
      screen: 'asset-management/asset-register',
      view: 'Asset register',
      title: 'Asset register',
      caption: 'Every tagged asset with its class, location, condition, cost, written-down value, last verification and status.',
      alt: 'MAVRO asset register: 1,146 assets, ₹24.8 Cr gross block and ₹13.6 Cr book value, with tagged machines, test rigs, tools and capital work in progress listed by class, location, condition, cost, book value, last verification and status (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, all sites, 8 Oct, 14:02. 1,146 assets (Plant 1 684, Chennai 402, exports office 60), gross block ₹24.8 Cr, book value ₹13.6 Cr. October uptime 95.6% (target 97%); 13 breakdowns, 14 h 20 m, CNC-03 three of them (6 h 05 m, MO-0418 today). CNC-03: cost ₹68.4 L, book value ₹39.9 L, spindle check overdue, bearing change 19 Oct waits for SB-7014 (PR-0463). TW-14 blocked on expired calibration. October depreciation trial ₹18.7 L (September ₹18.6 L); 9 exceptions, 3 open.',
  faq: [
    {
      q: 'What does Asset Management in MAVRO do?',
      a: 'MAVRO Asset Management keeps one record per asset from purchase to disposal. It tracks uptime and breakdowns by site, keeps a tagged register with location, condition and written-down value, turns breakdowns into maintenance orders, runs preventive maintenance and calibration plans, and posts depreciation at each period close.',
    },
    {
      q: 'How does MAVRO calculate depreciation?',
      a: 'MAVRO runs depreciation each period for every asset by its class and useful life, on the straight-line or written-down-value method, and keeps the income-tax book by block alongside the company book. Exceptions such as impairment, transfers, disposals and fully depreciated assets are cleared in an audit queue before the journal posts to the ledger.',
    },
    {
      q: 'Does MAVRO handle preventive maintenance and calibration?',
      a: 'Yes. MAVRO schedules preventive maintenance and calibration for each asset and instrument, shows what is overdue before it affects production, and blocks an asset or instrument from use when its calibration or qualification expires. Breakdowns become maintenance orders, internal or by a vendor, with the cause, time and spares recorded.',
    },
    {
      q: 'How does physical verification work in MAVRO?',
      a: 'Every asset in MAVRO carries a QR or RFID tag. Site teams scan assets on a verification cycle, and MAVRO lists what was found, what is missing and which tags need replacing. Verification, insurance and tagging gaps stay open until closed, and missing assets are listed for the auditor.',
    },
  ],
  seo: {
    title: 'Asset management software: maintenance, register, depreciation | MAVRO',
    description:
      'MAVRO Asset Management: uptime and breakdowns by site, a tagged asset register with written-down value, preventive maintenance and calibration, critical spares, physical verification and a period depreciation run.',
  },
};
