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
 * The header, menus and footer links live in data/nav.ts.
 */

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
  title: 'MAVRO | Enterprise ERP for manufacturers, distributors and service providers',
  description:
    'MAVRO brings base ERP modules, vendor and channel portals and premium modules onto one platform, and connects to SAP, Oracle, Tally and legacy ERPs.',
} as const;

/** Calls to action. Labels are temporary copy; destinations are the in-page targets. */
export const cta = {
  primary: { label: 'Request a demo', href: '#demo' },
  secondary: { label: 'Explore the platform', href: '#platform' },
} as const;
