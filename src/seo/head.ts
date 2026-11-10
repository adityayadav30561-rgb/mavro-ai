import { site } from '../data/site';
import { crumbTarget } from '../links';
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
            item: absolute(crumbTarget(crumb)),
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
        description: `${site.company} makes ${site.name}, the Super ERP for Indian businesses in every industry.`,
        // India, and the Gulf markets served from India (DECISIONS.md, D4).
        areaServed: ['India', 'United Arab Emirates', 'Saudi Arabia', 'Qatar'].map((name) => ({ '@type': 'Country', name })),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: site.contactEmail,
          telephone: site.contactPhone.replace(/\s/g, ''),
          areaServed: ['IN', 'AE', 'SA', 'QA'],
          availableLanguage: 'en',
        },
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
      // The product, on every page so module pages (isPartOf) and AI answers reach one entity. No price or rating:
      // pricing depends on the business (site.facts), and no ratings are claimed.
      {
        '@type': 'SoftwareApplication',
        '@id': `${site.url}/#software`,
        name: site.name,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Enterprise resource planning',
        operatingSystem: 'Web, Android, iOS',
        description: site.description,
        url: site.url,
        image: `${site.url}${site.shareImage.path}`,
        inLanguage: site.locale.lang,
        publisher: { '@id': org },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { '@id': org },
        inLanguage: site.locale.lang,
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
 * Every page shares the default image (site.shareImage, `npm run og`); the site is en-IN.
 */
export function renderHead(route: Route) {
  const title = escape(route.title);
  const description = escape(route.description);
  const url = absolute(route.path);
  const isNotFound = route.page === 'NotFound';
  const locale = route.locale ?? site.locale;
  const image = `${site.url}${site.shareImage.path}`;
  const json = JSON.stringify(structuredData(route)).replace(/</g, '\\u003c');

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    !isNotFound && `<link rel="canonical" href="${url}" />`,
    // India at the root; D4's GCC pages will add their own alternates (IMPLEMENTATION-PLAN.md, D4).
    // Self-referencing only: a page has no equivalent in another locale (a Dubai page is not a translation of an
    // Indian one), and hreflang may only pair equivalent pages. India's pages are also the x-default.
    route.inSitemap && `<link rel="alternate" hreflang="${locale.lang}" href="${url}" />`,
    route.inSitemap && !route.locale && `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta name="robots" content="${route.inSitemap ? 'index, follow' : 'noindex, follow'}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    !isNotFound && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${locale.og}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${site.shareImage.width}" />`,
    `<meta property="og:image:height" content="${site.shareImage.height}" />`,
    `<meta property="og:image:alt" content="${escape(site.shareImage.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}
