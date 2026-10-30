/*
 * Copy for the utility pages: the 404 page and the hidden pipeline check. Page SEO (title, description) is
 * read by the route table (src/routes.ts).
 *
 * Links written as '#section' are homepage sections; the page turns them into '/#section' (routing.tsx). When a
 * real page exists for a destination (Phase 3 onwards), point the link at it.
 */
import type { IconName } from '../components/Icon';

export const notFound = {
  seo: {
    title: 'Page not found | MAVRO',
    description: 'This page does not exist or has moved. Find MAVRO modules, ERP Connect and demo requests from here.',
  },
  title: 'This page is',
  titleGrad: 'not on the record.',
  lead: 'The link may be old, or the page may have moved. Everything MAVRO covers is a click away from here.',
  home: 'Back to the homepage',
  catalogue: 'Browse all modules',
  /** The lookup card: the requested path stands in the search field. */
  lookup: {
    label: 'Page lookup',
    status: 'No match',
    fallbackPath: 'this address',
    suggest: 'Closest matches',
  },
  links: [
    {
      icon: 'layers',
      label: 'The platform',
      body: 'Base modules, portals and premium modules on one platform.',
      href: '#platform',
    },
    {
      icon: 'workflow',
      label: 'Explore the modules',
      body: 'Order to Cash, Accounting, HRMS and Payroll, Production and more.',
      href: '#explore',
    },
    {
      icon: 'link',
      label: 'ERP Connect',
      body: 'Run MAVRO alongside SAP, Oracle, Tally or a legacy ERP.',
      href: '/erp-connect',
    },
    {
      icon: 'calendar',
      label: 'Request a demo',
      body: 'See MAVRO on your own processes.',
      href: '#demo',
    },
  ] satisfies { icon: IconName; label: string; body: string; href: string }[],
} as const;

export const pipelineCheck = {
  seo: {
    title: 'Pipeline check | MAVRO',
    description: 'Internal check page for the multi-page build: prerendered HTML, its own metadata and hydration.',
    crumb: 'Pipeline check',
  },
  title: 'Pipeline check',
  lead: 'A hidden page that proves a route other than the homepage is prerendered with its own metadata, hydrates in the browser and loads only its own code.',
  checks: [
    { label: 'Prerendered', server: 'This text is in the HTML file', client: 'This text is in the HTML file' },
    { label: 'Hydrated', server: 'Waiting for the browser', client: 'React is running on this page' },
    { label: 'Interactive', server: 'Button not wired yet', client: 'The button below counts clicks' },
  ],
  button: 'Count a click',
} as const;
