/*
 * Site-wide facts. `url` and `contactHref` are PLACEHOLDERS until the production domain and the demo-request
 * destination (form, calendar or mailbox) are decided. Everything that needs them (canonical, Open Graph,
 * structured data, sitemap, robots, the closing CTA) reads them from here, so this is the only edit required.
 */
export const site = {
  name: 'MAVRO',
  company: 'SaiSatwik Technologies',
  url: 'https://mavro.example',
  /** In-page target of every "Book a demo" button except the closing one. */
  demoHref: '#demo',
  contactHref: 'mailto:demo@mavro.example',
  title: 'MAVRO | Run the whole business as one system',
  description:
    'MAVRO is an ERP platform that connects sales, planning, purchase, production, quality, inventory and finance in one flow, from enquiry to payment.',
  nav: [
    { label: 'Platform', href: '#platform' },
    { label: 'Order to cash', href: '#order-to-cash' },
    { label: 'Procure to pay', href: '#procure-to-pay' },
    { label: 'Industries', href: '#industries' },
    { label: 'Control', href: '#control' },
  ],
} as const;
