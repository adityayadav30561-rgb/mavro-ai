import { site } from '../data/site';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** schema.org graph: the company, the site and the product. No ratings or prices are claimed. */
function structuredData() {
  const org = `${site.url}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: site.company,
        url: site.url,
        logo: `${site.url}/favicon.svg`,
        brand: { '@type': 'Brand', name: site.name },
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
      {
        '@type': 'SoftwareApplication',
        '@id': `${site.url}/#software`,
        name: site.name,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Enterprise resource planning',
        operatingSystem: 'Web',
        description: site.description,
        url: site.url,
        publisher: { '@id': org },
      },
    ],
  };
}

/**
 * Everything between the head markers in index.html, for the prerendered page.
 * An Open Graph image is deliberately absent until brand artwork exists; add og:image and twitter:image here.
 */
export function renderHead() {
  const title = escape(site.title);
  const description = escape(site.description);
  const url = `${site.url}/`;
  const json = JSON.stringify(structuredData()).replace(/</g, '\\u003c');

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ');
}
