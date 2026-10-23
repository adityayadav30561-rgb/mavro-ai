/*
 * The URL segment of every module and portal page (`/modules/<slug>`, SITE-PLAN.md section 2), one per entry in
 * the catalogue. `ModuleSlug` is the type every per-module file is keyed by, so a typo or a missing module is a
 * type error; catalogue.ts checks at load that each slug is used exactly once.
 */
export const moduleSlugs = [
  // Base package (18)
  'accounting',
  'vendor-invoice-management',
  'travel-and-expense',
  'asset-management',
  'order-to-cash',
  'crm',
  'sales-force-automation',
  'customer-service',
  'procure-to-pay',
  'inventory-management',
  'gate-entry',
  'production-management',
  'mvlens-vendor-audit',
  'hrms-and-payroll',
  'roster-ledger',
  'rest-hours-log',
  'data-analytics',
  'project-management',
  // Portal package (4)
  'vendor-portal',
  'distributor-portal',
  'dealer-portal',
  'retailer-portal',
  // Premium package (20)
  'cost-forecasting',
  'audit-management',
  'insurance-management',
  'scheme-and-rebate',
  'ecommerce-integration',
  'subscription-management',
  'warehouse-management',
  'transportation-management',
  'fleet-management',
  'auction-and-bidding',
  'fsc-portal',
  'ppds',
  'shop-floor-control',
  'learning-management',
  'contract-labour-supply',
  'contract-labour-purchase',
  'business-analyst-app',
  'master-data-management',
  'document-management',
  'real-estate-management',
] as const;

export type ModuleSlug = (typeof moduleSlugs)[number];
