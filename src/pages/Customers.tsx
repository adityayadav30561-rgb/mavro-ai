import { CtaBand } from '../blocks/CtaBand';
import { LogoWall } from '../blocks/LogoWall';
import { PageHero } from '../blocks/PageHero';
import { ResultCard } from '../blocks/ResultCard';
import { Section } from '../blocks/Section';
import { StoryFeature } from '../blocks/StoryFeature';
import { customersPage as p } from '../data/company';
import { proof } from '../data/home';

/**
 * Customers (SITE-PLAN.md section 3.8): the three verified stories from the product deck in full, the clientele
 * wall and a CTA. Stories: `proof` in home.ts (shared with the homepage); copy: src/data/company.ts.
 */
export function Page() {
  return (
    <>
      <PageHero
        variant="solution"
        title={p.hero.title}
        rest={p.hero.rest}
        lead={p.hero.lead}
        actions={[
          { label: 'Request a demo', interest: null },
          { label: 'Read the stories', href: '#stories' },
        ]}
        visual={<ResultCard stories={proof.stories} title={p.labels.result} />}
      />

      <Section id="stories" tone="paper" title={p.stories.title} rest={p.stories.rest} treatment="grad" lead={p.stories.lead}>
        <StoryFeature stories={proof.stories} labels={p.labels} />
      </Section>

      <Section id="clients" title={p.logos.title} rest={p.logos.rest} treatment="soft" lead={p.logos.lead}>
        <LogoWall />
      </Section>

      <CtaBand title={p.cta.title} rest={p.cta.rest} body={p.cta.body} label="Request a demo" interest={null} />
    </>
  );
}
