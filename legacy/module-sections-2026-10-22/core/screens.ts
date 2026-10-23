/*
 * Mini module screens for the Base modules carousel: a small, stylised preview of how each module looks.
 * Every value is invented sample data, consistent with the sample order used across the page (SO-24817 for
 * Kestrel Pumps). Each screen is a header plus any of: workflow steps, two figures, a list, progress bars or
 * a bar chart.
 */
export type Tone = 'ok' | 'live' | 'warn' | '';
export type StepState = 'done' | 'live' | 'next';

export interface ModuleScreen {
  title: string;
  chip?: [string, Tone];
  steps?: [string, StepState][];
  kpis?: [string, string][];
  rows?: [string, string, Tone?][];
  progress?: [string, number, string][];
  bars?: number[];
}

export const screens: Record<string, ModuleScreen> = {
  o2c: {
    title: 'Sales order SO-24817',
    chip: ['Credit OK', 'ok'],
    steps: [['Order', 'done'], ['Credit', 'done'], ['Allocate', 'live'], ['Dispatch', 'next'], ['Invoice', 'next']],
    kpis: [['Order value', '₹18.42 L'], ['Promise date', '18 Oct']],
    rows: [['IH-220 Impeller housing', '1,200 pcs'], ['Reserved from stock', '310 pcs', 'live']],
  },
  acc: {
    title: 'General ledger · October',
    chip: ['Books open', 'live'],
    kpis: [['Receivables', '₹1.37 Cr'], ['Payables', '₹0.92 Cr']],
    bars: [42, 55, 48, 63, 58, 74],
  },
  hrms: {
    title: 'Payroll · October',
    chip: ['Processing', 'live'],
    kpis: [['Employees', '486'], ['Net payroll', '₹1.12 Cr']],
    rows: [['PF challan', 'Filed', 'ok'], ['ESI return', 'Filed', 'ok'], ['TDS deposit', 'Due 7 Nov', 'warn']],
  },
  p2p: {
    title: 'Purchase orders',
    chip: ['18 open', ''],
    kpis: [['Open value', '₹62.4 L'], ['Awaiting GRN', '5']],
    rows: [['PO-7714 · Aravali Castings', 'GRN done', 'ok'], ['PO-7720 · Sunrise Metals', 'In transit', 'live'], ['PO-7723 · Delta Seals', 'Approval', 'warn']],
  },
  prd: {
    title: 'Work order WO-5521',
    chip: ['Running', 'ok'],
    kpis: [['Output', '570 / 890'], ['Line', 'L1 · Shift B']],
    progress: [['Machining', 1, '100%'], ['Assembly', 0.64, '64%'], ['Testing', 0.2, '20%']],
  },
  inv: {
    title: 'Stock by item · All stores',
    chip: ['6 below reorder', 'warn'],
    kpis: [['Stock value', '₹2.14 Cr'], ['Stock cover', '23 days']],
    progress: [['IH-220', 0.72, '1,240'], ['CV-110', 0.38, '860'], ['BR-045', 0.9, '2,400']],
  },
  vim: {
    title: 'Invoice INV-V-2291',
    chip: ['3-way matched', 'ok'],
    kpis: [['Payable', '₹83,104'], ['Due', '9 Nov']],
    rows: [['PO-7714', '400 kg', 'ok'], ['GRN-5530', '392 kg', 'ok'], ['Vendor invoice', '392 kg', 'ok']],
  },
  sfa: {
    title: 'Beat plan · Today',
    chip: ['9 of 14 calls', 'live'],
    kpis: [['Orders booked', '₹1.84 L'], ['Distance', '38 km']],
    rows: [['Shree Traders', 'Visited', 'ok'], ['Om Stores', 'Order ₹42k', 'ok'], ['Patel Agencies', 'Next', 'live']],
  },
  tne: {
    title: 'Expense claim EXP-0388',
    chip: ['1 policy flag', 'warn'],
    kpis: [['Claimed', '₹10,970'], ['Advance', '₹8,000']],
    rows: [['Hotel · 2 nights', '₹6,400', 'ok'], ['Travel', '₹3,120', 'ok'], ['Meals', '₹1,450', 'warn']],
  },
  gte: {
    title: 'Gate register · Gate 1',
    chip: ['7 inside', 'live'],
    kpis: [['Avg turnaround', '42 min'], ['Weighbridge', 'Online']],
    rows: [['Truck V-07 · Inward', '09:12', 'ok'], ['Visitor pass VP-118', '09:40', 'live'], ['Truck V-12 · Outward', '10:05', 'ok']],
  },
  crm: {
    title: 'Lead pipeline · Q3',
    chip: ['Live', 'live'],
    kpis: [['Pipeline', '₹3.4 Cr'], ['Conversion', '7.5%']],
    progress: [['New', 1, '120'], ['Qualified', 0.53, '64'], ['Proposal', 0.18, '22'], ['Won', 0.08, '9']],
  },
  csm: {
    title: 'Ticket TCK-1042',
    chip: ['High', 'warn'],
    kpis: [['Open tickets', '23'], ['CSAT', '4.6 / 5']],
    rows: [['SLA remaining', '3h 20m', 'live'], ['Channel', 'Portal'], ['Warranty', 'Valid', 'ok']],
  },
  prj: {
    title: 'Line 3 expansion',
    chip: ['On track', 'ok'],
    kpis: [['Budget used', '58%'], ['Milestones', '4 / 7']],
    progress: [['Civil works', 1, 'Done'], ['Installation', 0.6, '60%'], ['Qualification', 0.1, '10%']],
  },
  mvl: {
    title: 'Vendor audit AUD-0412',
    chip: ['In review', 'live'],
    steps: [['Plan', 'done'], ['Execute', 'done'], ['Review', 'live'], ['Close', 'next']],
    kpis: [['Findings', '3'], ['CAPA open', '2']],
    rows: [['Calibration records', 'Major', 'warn'], ['Pest control log', 'Minor']],
  },
  ros: {
    title: 'Roster · Week 43',
    chip: ['Published', 'ok'],
    kpis: [['Coverage', '98%'], ['Overtime', '36 h']],
    rows: [['Shift A', '64 / 64', 'ok'], ['Shift B', '58 / 60', 'warn'], ['Shift C', '40 / 40', 'ok']],
  },
  rhl: {
    title: 'Duty and rest · This week',
    chip: ['1 violation', 'warn'],
    kpis: [['Compliance', '99.2%'], ['Comp rest due', '2']],
    progress: [['W-118', 0.86, '52 h'], ['W-204', 1, '61 h'], ['W-310', 0.7, '42 h']],
  },
  ast: {
    title: 'Asset CNC-05',
    chip: ['In service', 'ok'],
    kpis: [['Uptime', '96%'], ['Book value', '₹14.2 L']],
    rows: [['Preventive maintenance', '28 Oct', 'live'], ['Calibration', 'Valid', 'ok'], ['Insurance', 'Valid', 'ok']],
  },
  dat: {
    title: 'Data pipelines',
    chip: ['1 delayed', 'warn'],
    kpis: [['Runs today', '142'], ['Success', '99.3%']],
    rows: [['ERP to warehouse', '06:00', 'ok'], ['Field app sync', '06:15', 'ok'], ['Portal orders', 'Delayed', 'warn']],
  },
  foundation: {
    title: 'GST returns · October',
    chip: ['On schedule', 'ok'],
    kpis: [['Input tax credit', '₹42.1 L'], ['E-invoices', '1,284']],
    rows: [['GSTR-1', 'Filed', 'ok'], ['GSTR-3B', 'Ready', 'live'], ['GSTR-2B mismatches', '3', 'warn']],
  },
};
