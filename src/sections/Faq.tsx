import { FaqBlock } from '../blocks/FaqBlock';
import { faq } from '../data/home';

/**
 * The homepage FAQ: 15 questions written for search, on paper with the gradient headline. The same items feed
 * the FAQPage structured data of the homepage route (src/routes.ts).
 */
export function Faq() {
  return (
    <FaqBlock
      title={faq.title}
      rest={faq.titleGrad}
      treatment="grad"
      lead={faq.lead}
      items={faq.items}
      more={{ title: faq.more, body: faq.moreBody }}
    />
  );
}
