/*
 * schema.org nodes shared by page types, built from the same data the page renders (search engines require the
 * structured data and the visible text to agree). Used by the route table (src/routes.ts).
 */
import type { FaqItem } from '../blocks/FaqBlock';

/** FAQPage for an FAQ block; `url` is the block's address, e.g. https://…/#faq. */
export const faqPage = (url: string, items: readonly FaqItem[]) => ({
  '@type': 'FAQPage',
  '@id': url,
  url,
  inLanguage: 'en',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});
