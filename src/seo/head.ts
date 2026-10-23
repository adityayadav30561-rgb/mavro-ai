import { site } from '../data/site';
import type { Route } from '../routes';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Absolute URL of a route path. */
const absolute = (path: string) => `${site.url}${path === '/' ? '/' : path}`;

/**
 * schema.org graph: the company and the site on every page, the breadcrumb trail below the homepage, then the
 * route's own nodes (the homepage adds the product and its FAQ, see routes.ts).
 */
function structuredData(route: Route) {
  const org = `${site.url}/#organization`;
  const breadcrumbs = route.crumbs.length
    ? [
        {
          '@type': 'BreadcrumbList',
          '@id': `${absolute(route.path)}#breadcrumbs`,
          itemListElement: [{ name: 'Home', path: '/' }, ...route.crumbs].map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: absolute(crumb.path),
          })),
        },
      ]
    : [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: site.company,
        url: site.url,
        logo: `${site.url}/apple-touch-icon.png`,
        brand: { '@type': 'Brand', name: site.name },
        email: site.contactEmail,
        telephone: site.contactPhone.replace(/\s/g, ''),
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.office.street,
          addressLocality: site.office.city,
          postalCode: site.office.postalCode,
          addressRegion: site.office.region,
          addressCountry: site.office.country,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { '@id': org },
        inLanguage: 'en',
      },
      ...breadcrumbs,
      ...(route.schema?.() ?? []),
    ],
  };
}

/**
 * Everything between the head markers in index.html, for one prerendered page. Pages outside the sitemap
 * (hidden and utility pages) are noindex. The 404 page has no canonical or og:url: it is served at whatever
 * address was missing, so there is no one URL to name.
 * An Open Graph image is deliberately absent until brand artwork exists; add og:image and twitter:image here.
 */
export function renderHead(route: Route) {
  const title = escape(route.title);
  const description = escape(route.description);
  const url = absolute(route.path);
  const isNotFound = route.page === 'NotFound';
  const json = JSON.stringify(structuredData(route)).replace(/</g, '\\u003c');

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    !isNotFound && `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${route.inSitemap ? 'index, follow' : 'noindex, follow'}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    !isNotFound && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}
