/*
 * /llms.txt (llmstxt.org): a plain-text summary of the site for AI assistants, with the key facts stated the same
 * way as on the pages and a link to every indexable page. Generated at build time by scripts/prerender.mjs from the
 * route table, so a new page appears here as soon as it has a route. Only `inSitemap` routes are listed: draft and
 * hidden pages never are (user, 2026-11-09: AI crawlers allowed; drafts hold invented copy until launch).
 */
import { packs } from '../data/modules';
import { site } from '../data/site';
import type { Route } from '../routes';

const line = (route: Route) => `- [${route.title.replace(/ \| MAVRO$/, '')}](${site.url}${route.path}): ${route.description}`;

export function llmsTxt(routes: readonly Route[]) {
  const live = routes.filter((route) => route.inSitemap && route.path !== '/');
  const group = (test: (path: string) => boolean) => live.filter((route) => test(route.path)).map(line);
  const isModule = (path: string) => path.startsWith('/modules/');
  const isIndustry = (path: string) => path.startsWith('/industries');
  const isCity = (path: string) => /^\/((ae|sa|qa)\/)?erp-software/.test(path);
  const isPlatform = (path: string) => path === '/platform' || path === '/erp-connect' || Object.values(packs).some((pack) => pack.page === path);

  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is made by ${site.company}, ${site.office.city}, India (${site.contactEmail}, ${site.contactPhone}).`,
    '',
    '## Key facts',
    '',
    '- MAVRO is a Super ERP: base modules, portals for vendors and the sales channel, and premium modules on one platform that shares one set of business data.',
    '- Indian compliance is built in: GST with e-invoicing, GSTR-1, GSTR-3B and ITC reconciliation, e-way bills, and statutory payroll with PF, ESI, TDS and PT.',
    '- ERP Connect runs MAVRO alongside SAP, Oracle, Tally or a legacy ERP, syncing two ways through the MAVRO Database with no direct access to the ERP.',
    '- Implementation is phased and takes 25–30 days, with a dedicated resource and AMS support after go-live.',
    `- ${site.facts.deployment}`,
    `- ${site.facts.data}`,
    `- ${site.facts.pricing}`,
    '- Product screens on the site use illustrative sample data.',
    '',
    '## Platform',
    '',
    ...group(isPlatform),
    '',
    '## Industries',
    '',
    ...group(isIndustry),
    '',
    '## Locations',
    '',
    ...group(isCity),
    '',
    '## Modules',
    '',
    ...group(isModule),
    '',
    '## Company',
    '',
    ...group((path) => !isModule(path) && !isIndustry(path) && !isCity(path) && !isPlatform(path)),
    '',
  ].join('\n');
}
