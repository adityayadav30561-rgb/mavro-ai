import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { IndustryGrid } from '../blocks/IndustryGrid';
import { PageHero } from '../blocks/PageHero';
import { Section } from '../blocks/Section';
import { industries } from '../data/home';
import { industriesHub as h } from '../data/industries';
import { catalogue, portals } from '../data/modules';
import { hasPage } from '../links';

/** A homepage card's module or portal id as the short name on an industry card. */
const nameOf = (id: string) => {
  const portal = portals.find((item) => item.id === id);
  if (portal) return portal.name.replace(' / B2B', '');
  const entry = catalogue.find((item) => item.item.id === id);
  if (!entry) throw new Error(`IndustriesHub: no catalogue entry for module id "${id}"`);
  return entry.name;
};

/**
 * The industries hub, /industries: every industry the site names as a card linked to its page (the featured ones
 * first, as on the homepage tabs), the core that every industry shares, FAQ and CTA. Content: `industriesHub` in
 * src/data/industries.ts; the cards read `industries.list` in home.ts.
 */
export function Page() {
  const cards = [...industries.list]
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .map((industry) => {
      const href = `/industries/${industry.slug}`;
      return {
        name: industry.name,
        icon: industry.icon,
        who: industry.who,
        title: industry.title,
        modules: industry.modules.slice(0, 3).map(nameOf),
        href: hasPage(href) ? href : null,
      };
    });

  return (
    <>
      <PageHero
        variant="simple"
        title={h.hero.title}
        rest={h.hero.rest}
        lead={h.hero.lead}
        actions={[
          { label: 'Request a demo', interest: null },
          { label: 'Find your industry', href: '#list' },
        ]}
        band={<ClientBand />}
      />

      <Section id="list" tone="paper" title={h.grid.title} rest={h.grid.rest} treatment="grad" lead={h.grid.lead}>
        <IndustryGrid cards={cards} more={h.grid.more} />
      </Section>

      <Section id="core" title={h.core.title} rest={h.core.rest} treatment="soft" lead={h.core.lead}>
        <CapabilityTiles tiles={h.core.tiles} columns={3} />
      </Section>

      <FaqBlock id="faq" title={h.faq.title} rest={h.faq.rest} treatment="mark" lead={h.faq.lead} items={h.faq.items} />

      <CtaBand title={h.cta.title} rest={h.cta.rest} body={h.cta.body} label="Request a demo" interest={null} />
    </>
  );
}
