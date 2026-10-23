import type { ModuleSlug } from './slugs';

/*
 * Where each module page's content comes from (docs/source/, the text of the decks). Keyed by every slug, so a
 * module without a source is a type error. Module phases read the slides named here first.
 *
 * Where the decks fall short (`gap`), the page uses standard information for that kind of module (user,
 * 2026-10-23): the capabilities an ERP module of its type normally has, written in the deck's voice and kept to
 * what MAVRO offers. Never invented figures, customer results, certifications or claims.
 */

/** The deck text files in docs/source/. */
export type Deck =
  | 'product-deck-v2'
  | 'product-deck-v1'
  | 'product-deck-amr'
  | 'product-deck-amr-l1'
  | 'hrms-deck'
  | 'tms-deck'
  | 'wms-deck'
  | 'healthcare-manufacturing-deck'
  | 'erp-connect-deck'
  | 'sap-b1-flow-deck';

export interface ModuleSource {
  /** The module's appendix slides: the detail slide (tagline, four tiles, what it does, why it matters, four named
   *  screens) and the screens slide after it. Product deck v2 unless `deck` says otherwise. */
  appendix: { deck: Deck; detail: number; screens: number } | null;
  /** Further material for the page (detailed decks, summary slides). */
  extra?: { deck: Deck; where: string }[];
  /** What the decks do not cover; filled with standard information for the module type (see above). */
  gap?: string;
}

const v2 = (detail: number): ModuleSource['appendix'] => ({ deck: 'product-deck-v2', detail, screens: detail + 1 });

export const moduleSources: Record<ModuleSlug, ModuleSource> = {
  // Base package
  accounting: {
    appendix: null,
    extra: [
      {
        deck: 'product-deck-v2',
        where:
          'slide 7 (Accounting tile: auto journals, live GL, GST reports; AP/AR workflows, credit control; multi-entity, multi-plant; dunning and AR ageing automation)',
      },
      {
        deck: 'product-deck-v2',
        where:
          'slides 2, 21 and 24 (multi-entity and multi-plant financials; GST at every touchpoint; live GL, auto journals, auto-generated GST filings from transactions)',
      },
    ],
    gap: 'No appendix slide in any deck (v2, v1, AMR, AMR L1, healthcare): no tagline, four tiles, "what it does", "why it matters" or screen list. Built from the summary points above plus standard accounting-module information (general ledger, journals, AP/AR, bank reconciliation, GST returns, period close, financial statements), with no invented figures.',
  },
  'vendor-invoice-management': { appendix: v2(42) },
  'travel-and-expense': { appendix: v2(40) },
  'asset-management': { appendix: v2(44) },
  'order-to-cash': { appendix: v2(34) },
  crm: { appendix: v2(46) },
  'sales-force-automation': { appendix: v2(52) },
  'customer-service': { appendix: v2(48) },
  'procure-to-pay': { appendix: v2(38) },
  'inventory-management': { appendix: v2(56) },
  'gate-entry': { appendix: v2(54) },
  'production-management': {
    appendix: v2(36),
    extra: [{ deck: 'healthcare-manufacturing-deck', where: 'production and QC release slides (pharma variant)' }],
  },
  'mvlens-vendor-audit': { appendix: v2(30) },
  'hrms-and-payroll': {
    appendix: v2(32),
    extra: [{ deck: 'hrms-deck', where: 'whole deck: core HR, attendance and payroll, India statutory, walkthroughs' }],
  },
  'roster-ledger': { appendix: v2(62) },
  'rest-hours-log': { appendix: v2(60) },
  'data-analytics': { appendix: v2(58) },
  'project-management': { appendix: v2(50) },
  // Portal package
  'vendor-portal': { appendix: v2(65) },
  'distributor-portal': { appendix: v2(67) },
  'dealer-portal': { appendix: v2(69) },
  'retailer-portal': { appendix: v2(71) },
  // Premium package
  'cost-forecasting': { appendix: v2(74) },
  'audit-management': { appendix: v2(80) },
  'insurance-management': { appendix: v2(100) },
  'scheme-and-rebate': { appendix: v2(86) },
  'ecommerce-integration': { appendix: v2(82) },
  'subscription-management': { appendix: v2(102) },
  'warehouse-management': {
    appendix: v2(96),
    extra: [{ deck: 'wms-deck', where: 'whole deck: storage, picking, dispatch, compliance, walkthroughs' }],
  },
  'transportation-management': {
    appendix: v2(76),
    extra: [{ deck: 'tms-deck', where: 'whole deck: planning, execution, freight, control tower, compliance' }],
  },
  'fleet-management': { appendix: v2(94) },
  'auction-and-bidding': { appendix: v2(78) },
  'fsc-portal': { appendix: v2(84) },
  ppds: { appendix: v2(110) },
  'shop-floor-control': { appendix: v2(98) },
  'learning-management': { appendix: v2(92) },
  'contract-labour-supply': { appendix: v2(106) },
  'contract-labour-purchase': { appendix: v2(108) },
  'business-analyst-app': { appendix: v2(88) },
  'master-data-management': { appendix: v2(90) },
  // Not in v2's appendix; the AMR L1 deck has the full slide (its screens slide is mislabelled "Insurance
  // Management — Screens" but lists the four DMS screens).
  'document-management': { appendix: { deck: 'product-deck-amr-l1', detail: 78, screens: 79 } },
  'real-estate-management': { appendix: v2(104) },
};
