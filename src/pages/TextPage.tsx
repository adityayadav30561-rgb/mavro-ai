import { PageHero } from '../blocks/PageHero';
import { Prose } from '../blocks/Prose';
import { sectionClass } from '../blocks/SectionHead';
import { companyText, privacyText, termsText, type TextContent } from '../data/company';
import { usePath } from '../routing';

/** Which text each prose route shows; a route exists only once its text does (src/routes.ts). */
export const textPages: Record<string, TextContent | null> = {
  '/company': companyText,
  '/privacy': privacyText,
  '/terms': termsText,
};

/**
 * A prose page (SITE-PLAN.md section 3.10): Company, Privacy policy, Terms of use, from the user's text in
 * src/data/company.ts. A simple hero, then the sections.
 */
export function Page() {
  const path = usePath();
  const text = textPages[path];
  if (!text) throw new Error(`TextPage: no text for ${path}`);
  return (
    <>
      <PageHero variant="simple" title={text.title} lead={text.lead ?? ''} treatment="mark" />
      <section id="text" className={sectionClass('paper', '')}>
          <div className="page">
        <Prose sections={text.sections} updated={text.updated} />
        </div>
        </section>
    </>
  );
}
