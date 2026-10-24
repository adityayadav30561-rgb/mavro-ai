import type { ModuleContent } from '../schema';
import type { ModuleSlug } from '../slugs';
import { content as accounting } from './accounting';
import { content as assetManagement } from './asset-management';
import { content as crm } from './crm';
import { content as customerService } from './customer-service';
import { content as gateEntry } from './gate-entry';
import { content as hrmsAndPayroll } from './hrms-and-payroll';
import { content as inventoryManagement } from './inventory-management';
import { content as mvlensVendorAudit } from './mvlens-vendor-audit';
import { content as orderToCash } from './order-to-cash';
import { content as procureToPay } from './procure-to-pay';
import { content as productionManagement } from './production-management';
import { content as restHoursLog } from './rest-hours-log';
import { content as rosterLedger } from './roster-ledger';
import { content as salesForceAutomation } from './sales-force-automation';
import { content as travelAndExpense } from './travel-and-expense';
import { content as vendorInvoiceManagement } from './vendor-invoice-management';

/*
 * Module page content, one file per module (./<slug>.ts, exporting `content`), registered here as each module
 * phase lands (IMPLEMENTATION-PLAN.md phases 5–20). The type ties each key to its file's slug. A module gets a
 * route (src/routes.ts) once it is listed here, so the navigation switches from its homepage fallback to the page
 * by itself (src/links.ts).
 *
 * Adding a module: write ./<slug>.ts (`export const content: ModuleContent<'<slug>'> = { slug: '<slug>', ... }`), import it
 * below and add it to the map.
 */
type Registry = { [S in ModuleSlug]?: ModuleContent<S> };

export const moduleContent: Registry = {
  accounting,
  'asset-management': assetManagement,
  crm,
  'customer-service': customerService,
  'gate-entry': gateEntry,
  'hrms-and-payroll': hrmsAndPayroll,
  'inventory-management': inventoryManagement,
  'mvlens-vendor-audit': mvlensVendorAudit,
  'order-to-cash': orderToCash,
  'procure-to-pay': procureToPay,
  'production-management': productionManagement,
  'rest-hours-log': restHoursLog,
  'roster-ledger': rosterLedger,
  'sales-force-automation': salesForceAutomation,
  'travel-and-expense': travelAndExpense,
  'vendor-invoice-management': vendorInvoiceManagement,
};

export const contentFor = (slug: ModuleSlug): ModuleContent | undefined => moduleContent[slug];
