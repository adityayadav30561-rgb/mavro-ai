/*
 * Site-wide facts, navigation and calls to action.
 *
 * `url` is a PLACEHOLDER until the production domain is decided; canonical, Open Graph, structured data, sitemap
 * and robots all read it from here.
 *
 * Demo requests: the form at #demo posts JSON to `demoEndpoint` (a form service such as Formspree, Basin or a
 * HubSpot form, or MAVRO's own API). Until one is set it is null, and the form instead opens a pre-filled email
 * to `contactEmail`. Contact details are from the product deck.
 *
 * Links: an item with `href: null` is a planned destination that does not exist yet. It is kept here so the
 * structure is ready, but it is not rendered, so the page never shows a dead end.
 */
export interface NavLink {
  label: string;
  href: string | null;
}

export const site = {
  name: 'MAVRO',
  company: 'SaiSatwik Technologies',
  url: 'https://mavro.example',
  demoEndpoint: null as string | null,
  contactEmail: 'contact@saisatwik.com',
  contactPhone: '+91 92114 29011',
  contactHref: 'mailto:contact@saisatwik.com',
  /** Head office, as printed on the product deck's cover and closing slides. */
  office: {
    label: 'Head office',
    street: '1415, 13th Floor, Galaxy Blue Sapphire',
    city: 'Greater Noida',
    postalCode: '201009',
    region: 'Uttar Pradesh',
    country: 'IN',
  },
  title: 'MAVRO | Enterprise ERP for manufacturers, distributors and exporters',
  description:
    'MAVRO brings base ERP modules, vendor and channel portals and premium modules onto one platform, and connects to SAP, Oracle, Tally and legacy ERPs.',
} as const;

/** Calls to action. Labels are temporary copy; destinations are the in-page targets. */
export const cta = {
  primary: { label: 'Request a demo', href: '#demo' },
  secondary: { label: 'Explore the platform', href: '#platform' },
} as const;

/**
 * Header navigation. `menu: 'platform'` opens the Platform mega-menu (its content is the module catalogue in
 * modules.ts). Resources and Company are planned and appear once their pages exist.
 */
export const nav: (NavLink & { menu?: 'platform' })[] = [
  { label: 'Platform', href: '#platform', menu: 'platform' },
  { label: 'Product', href: '#product' },
  { label: 'ERP Connect', href: '#connect' },
  { label: 'Portals', href: '#portals' },
  { label: 'Premium modules', href: '#premium' },
  { label: 'Why MAVRO', href: '#why' },
  { label: 'Resources', href: null },
  { label: 'Company', href: null },
];

export const footer: { title: string; links: NavLink[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Platform overview', href: '#platform' },
      { label: 'Product tour', href: '#product' },
      { label: 'Base modules', href: '#modules' },
      { label: 'Portals', href: '#portals' },
      { label: 'Premium modules', href: '#premium' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'ERP Connect', href: '#connect' },
      { label: 'Order to cash', href: '#workflow' },
      { label: 'Implementation', href: '#implementation' },
      { label: 'Industries', href: '#industries' },
      { label: 'Why MAVRO', href: '#why' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Request a demo', href: '#demo' },
      { label: 'Contact', href: site.contactHref },
      { label: 'About', href: null },
      { label: 'Careers', href: null },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Documentation', href: null },
      { label: 'Blog', href: null },
      { label: 'Customer stories', href: '#stories' },
    ],
  },
];

export const legal: NavLink[] = [
  { label: 'Privacy policy', href: null },
  { label: 'Terms of service', href: null },
];

/** Drops planned links that have no destination yet. */
export const live = <T extends NavLink>(links: readonly T[]) =>
  links.filter((link): link is T & { href: string } => link.href !== null);
