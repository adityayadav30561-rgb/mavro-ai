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
  /**
   * Facts the user gave (2026-11-09) that the decks do not state. Each is one sentence, used word for word wherever
   * it appears (FAQs, llms.txt), so search engines and AI assistants read the same fact the same way.
   */
  facts: {
    pricing: 'MAVRO has no fixed price list: pricing depends on what each business needs.',
    deployment: 'MAVRO can run in the cloud or on-premise, on the client’s own servers.',
    data: 'The client owns its data in MAVRO.',
  },
  /** Language and region of every page (`<html lang>`, og:locale, JSON-LD inLanguage). D4's GCC pages add their own. */
  locale: { lang: 'en-IN', og: 'en_IN' },
  /** The default share image (public/og.png, made by `npm run og` from the hero art). */
  shareImage: { path: '/og.png', width: 1200, height: 630, alt: 'MAVRO, the Super ERP for Indian businesses: an isometric plant where one order moves through every department.' },
  title: 'MAVRO | Super ERP software for every Indian business',
  description:
    'MAVRO is the Super ERP for Indian businesses: core ERP, HR and payroll, vendor and channel portals and specialised modules on one platform, with GST built in.',
} as const;

/** Calls to action. Labels are temporary copy; destinations are the in-page targets. */
export const cta = {
  primary: { label: 'Request a demo', href: '#demo' },
  secondary: { label: 'Explore the platform', href: '#platform' },
} as const;
