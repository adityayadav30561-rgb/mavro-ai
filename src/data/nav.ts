import type { IconName } from '../components/Icon';
import type { Link } from '../links';
import { industries, proof } from './home';
import { modulePage, moduleById, packs, portals, type Module, type Pack, type Portal } from './modules';
import { site } from './site';

/*
 * The site navigation (SITE-PLAN.md section 8): header, menus, mobile drawer and footer, all in one place.
 *
 * Every link names its page and a fallback (src/links.ts): it goes to the page once that route exists and to
 * the homepage section that covers it until then. A link with neither is planned and stays hidden, so the menus
 * grow as pages land and never show a dead end.
 */

export interface NavLink extends Link {
  icon?: IconName;
  /** One line under the label, in menus. */
  note?: string;
  /** Homepage only: opens this module in Explore the platform (Explore's link handler reads data-module). */
  module?: string;
}

/** Header items, in order. `menu` names the panel a trigger opens; the rest are plain links. */
export type MenuId = 'platform' | 'solutions' | 'resources' | 'company';

export const header: { label: string; menu?: MenuId; link?: NavLink }[] = [
  { label: 'Platform', menu: 'platform' },
  { label: 'Solutions', menu: 'solutions' },
  { label: 'Customers', link: { label: 'Customers', page: '/customers', fallback: '#stories' } },
  { label: 'Resources', menu: 'resources' },
  { label: 'Company', menu: 'company' },
];

/* ---------- Platform ---------- */

/** The module or portal's page; until it exists, its package in Explore the platform, with the module picked. */
export const moduleLink = (item: Module | Portal, pack: Pack): NavLink => ({
  label: item.name,
  page: modulePage(item),
  fallback: packs[pack].href,
  module: item.id,
  note: item.summary,
});

export type Branch = Pack | 'connect';

/** The platform overview page. Not a branch of the menu (user, 2026-10-23: the packages already cover every
 *  module); linked from the footer. */
export const overviewLink: NavLink = { label: 'Platform overview', page: '/platform', fallback: '#platform', icon: 'layers' };

export const connectLink: NavLink = {
  label: 'ERP Connect',
  page: '/erp-connect',
  fallback: '#connect',
  icon: 'link',
  note: 'Work alongside SAP, Oracle or Tally',
};

/** The Platform menu's left rail. Hovering or focusing a branch shows its modules on the right. */
export const branches: { id: Branch; link: NavLink; title: string; lead: string; all: string }[] = [
  {
    id: 'base',
    link: {
      label: packs.base.name,
      page: packs.base.page,
      fallback: packs.base.href,
      icon: 'finance',
      note: packs.base.blurb,
    },
    title: packs.base.name,
    lead: 'The core ERP: finance, sales, buying, stock, production and people, ready from day one.',
    all: 'See the Base package',
  },
  {
    id: 'portal',
    link: {
      label: packs.portal.name,
      page: packs.portal.page,
      fallback: packs.portal.href,
      icon: 'distribution',
      note: packs.portal.blurb,
    },
    title: packs.portal.name,
    lead: 'Suppliers and every layer of the sales channel work in MAVRO, on the same orders and stock.',
    all: 'See the Portals',
  },
  {
    id: 'premium',
    link: {
      label: packs.premium.name,
      page: packs.premium.page,
      fallback: packs.premium.href,
      icon: 'rocket',
      note: packs.premium.blurb,
    },
    title: packs.premium.name,
    lead: 'Specialised modules for logistics, trade schemes, the shop floor, contract labour and governance.',
    all: 'See the Premium package',
  },
  {
    id: 'connect',
    link: connectLink,
    title: 'Already on SAP, Oracle or Tally?',
    lead: 'MAVRO works alongside your ERP. Every system syncs with the MAVRO Database, and your ERP stays the system of record.',
    all: 'How ERP Connect works',
  },
];

/** The portals in the order goods move, for the Portals branch and the drawer. */
export const portalLinks = portals.map((portal) => ({ portal, link: moduleLink(portal, 'portal') }));

/* ---------- Solutions ---------- */

export const industryLinks: NavLink[] = industries.list.map((industry) => ({
  label: industry.name,
  page: `/industries/${industry.slug}`,
  fallback: `#industry-${industry.slug}`,
  icon: industry.icon,
  note: industry.who,
}));

export const needLinks: NavLink[] = [
  {
    ...connectLink,
    label: 'Work alongside SAP, Oracle or Tally',
    note: 'Sync through the MAVRO Database; no direct ERP access',
  },
  {
    label: 'Replace a legacy ERP or Tally',
    page: '/implementation',
    fallback: '#implementation',
    icon: 'rocket',
    note: 'A phased go-live in 25 to 30 days',
  },
  {
    label: 'India compliance',
    page: '/security-and-compliance',
    fallback: '#why',
    icon: 'shield',
    note: 'GST e-invoicing, GSTR returns, PF, ESI and TDS',
  },
];

/** The story shown in the Solutions menu (the first of the homepage's customer stories). */
const story = proof.stories[0];
export const featuredStory = {
  sector: story.sector,
  project: story.project,
  result: story.result,
  link: { label: 'Read the customer stories', page: '/customers', fallback: '#stories' } as NavLink,
};

/* ---------- Resources and Company ---------- */

const implementationLink: NavLink = {
  label: 'Implementation and support',
  page: '/implementation',
  fallback: '#implementation',
  icon: 'calendar',
  note: 'Live in 25 to 30 days, then ongoing support',
};
const securityLink: NavLink = {
  label: 'Security and compliance',
  page: '/security-and-compliance',
  fallback: '#why',
  icon: 'lock',
  note: 'Encryption, audit trail, recovery, India statutory',
};
const storiesLink: NavLink = {
  label: 'Customer stories',
  page: '/customers',
  fallback: '#stories',
  icon: 'sales',
  note: 'Three projects and their verified results',
};
const faqLink: NavLink = { label: 'FAQ', fallback: '#faq', icon: 'headset', note: 'Straight answers before a demo' };

export const resourceLinks: NavLink[] = [
  implementationLink,
  securityLink,
  storiesLink,
  faqLink,
  { label: 'Blog', page: '/blog', icon: 'receipt', note: 'Articles and product notes' },
];

const aboutLink: NavLink = {
  label: `About ${site.company}`,
  page: '/company',
  icon: 'people',
  note: 'The team that builds and implements MAVRO',
};
const contactLink: NavLink = {
  label: 'Contact',
  page: '/contact',
  fallback: site.contactHref,
  icon: 'mail',
  note: 'Talk to the team or request a demo',
};
const careersLink: NavLink = {
  label: 'Careers',
  page: '/careers',
  icon: 'rocket',
  note: 'Open roles at ' + site.company,
};

export const companyLinks: NavLink[] = [aboutLink, contactLink, careersLink];

/* ---------- Footer ---------- */

/** Eight modules for the footer's Popular modules column. */
const popular = ['o2c', 'acc', 'hrms', 'p2p', 'prd', 'inv', 'tms', 'wms'].map((id) => {
  const module = moduleById(id);
  return moduleLink(module, module.pack);
});

const label = (link: NavLink, text: string): NavLink => ({ ...link, label: text });

export const footerColumns: { title: string; links: NavLink[] }[] = [
  { title: 'Platform', links: [overviewLink, ...branches.map((branch) => branch.link)] },
  { title: 'Popular modules', links: popular },
  { title: 'Solutions', links: industryLinks },
  { title: 'Resources', links: [label(implementationLink, 'Implementation'), securityLink, storiesLink, faqLink] },
  {
    title: 'Company',
    links: [label(aboutLink, 'About'), contactLink, careersLink, { label: 'Request a demo', fallback: '#demo' }],
  },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy policy', page: '/privacy' },
  { label: 'Terms of use', page: '/terms' },
];
