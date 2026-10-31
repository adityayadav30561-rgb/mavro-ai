import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { FlowStrip, type FlowNode } from '../blocks/FlowStrip';
import { GapColumns } from '../blocks/GapColumns';
import { HeroScreens } from '../blocks/HeroScreens';
import { ModuleCards } from '../blocks/ModuleCards';
import { PageHero } from '../blocks/PageHero';
import { Section } from '../blocks/Section';
import { StoryCards } from '../blocks/StoryCards';
import { explore, industries, proof } from '../data/home';
import { contentFor, industryTemplate as t } from '../data/industries';
import { catalogue, entryBySlug, type ModuleSlug } from '../data/modules';
import { usePath } from '../routing';
import { cardFor, iconOf, pageOf } from './module-card';

/** A homepage card's module id (a module or a portal) as its catalogue slug. */
const slugOfId = (id: string) => {
  const entry = catalogue.find((item) => item.item.id === id);
  if (!entry) throw new Error(`IndustryPage: no catalogue entry for module id "${id}"`);
  return entry.slug;
};

/**
 * The industry page template (SITE-PLAN.md section 3.5), one page per industry. The homepage card
 * (`industries.list` in home.ts) gives the headline, the points, the order flow's stages and the first modules;
 * src/data/industries.ts the rest. Hero with the industry's own screen → the three gaps (the deck's) → the order
 * flow with every stage linked to its module → the module cards → compliance → the matching customer stories (a
 * night band; left out when none match) → FAQ → CTA. The build stops if a module card has no page.
 */
export function Page() {
  const path = usePath();
  const industry = industries.list.find((item) => `/industries/${item.slug}` === path);
  const content = industry && contentFor(industry.slug);
  if (!industry || !content) throw new Error(`IndustryPage: no industry content for ${path}`);

  const slugs = [...new Set([...industry.modules.map(slugOfId), ...content.modules.more])] as ModuleSlug[];
  const missing = slugs.filter((slug) => !pageOf(entryBySlug(slug)));
  if (missing.length) throw new Error(`IndustryPage: ${industry.name} modules without a page: ${missing.join(', ')}`);

  // A flow link keyed by a label the card does not have would silently leave that stage unlinked.
  const labels = [...industries.core.start, ...industry.middle, industry.fulfil, ...industries.core.end];
  const stray = Object.keys(content.flow.links).filter((label) => !labels.includes(label));
  if (stray.length) throw new Error(`IndustryPage: ${industry.name} flow links for unknown stages: ${stray.join(', ')}`);

  const node = (label: string, kind: FlowNode['kind']): FlowNode => {
    const slug = content.flow.links[label];
    const entry = slug && entryBySlug(slug);
    return { name: label, kind, ...(entry && { href: pageOf(entry), icon: iconOf(entry), note: entry.name }) };
  };
  const stages = [
    { label: t.stages[0], nodes: industries.core.start.map((label) => node(label, 'shared')) },
    { label: t.stages[1], nodes: industry.middle.map((label) => node(label, 'configured')) },
    { label: t.stages[2], nodes: [node(industry.fulfil, 'configured')] },
    { label: t.stages[3], nodes: industries.core.end.map((label) => node(label, 'shared')) },
  ];

  const stories = content.stories.map((index) => proof.stories[index]);
  const { lead, behind, phone } = content.screens;

  return (
    <>
      <PageHero
        variant="module"
        chip={{ label: industry.name, icon: industry.icon }}
        title={industry.title}
        lead={content.hero.lead}
        facts={content.hero.facts}
        actions={[
          { label: t.demo, interest: null },
          { label: t.flowLink, href: '#flow' },
        ]}
        band={<ClientBand />}
        visual={
          <HeroScreens
            lead={lead}
            behind={behind && { screen: behind.screen, alt: '' }}
            phone={phone}
            note={explore.sample}
          />
        }
      />

      <Section id="gaps" title={content.gaps.title} rest={content.gaps.rest} treatment="soft" lead={content.gaps.lead}>
        <GapColumns gaps={content.gaps.items} />
      </Section>

      <Section id="flow" tone="paper" title={content.flow.title} rest={content.flow.rest} treatment="mark" lead={content.flow.lead}>
        <FlowStrip legend={t.legend} note={content.flow.note} stages={stages} />
      </Section>

      <Section id="modules" title={content.modules.title} rest={content.modules.rest} treatment="grad" lead={content.modules.lead}>
        <ModuleCards cards={slugs.map(cardFor)} more={t.modulesMore} />
      </Section>

      <Section id="compliance" tone="paper" title={content.compliance.title} rest={content.compliance.rest} treatment="soft" lead={content.compliance.lead}>
        <CapabilityTiles tiles={content.compliance.items} columns={3} />
      </Section>

      {stories.length > 0 && (
        <Section id="stories" tone="night" title={t.storiesTitle.title} rest={t.storiesTitle.rest} treatment="grad" lead={t.storiesLead}>
          <StoryCards stories={stories} />
        </Section>
      )}

      <FaqBlock
        id="faq"
        title={`${t.faq.title} ${industry.name.toLowerCase()}`}
        treatment="mark"
        lead={t.faq.lead}
        items={content.faq}
      />

      <CtaBand title={t.cta.title} rest={t.cta.rest} body={t.cta.body} label={t.demo} interest={null} />
    </>
  );
}
