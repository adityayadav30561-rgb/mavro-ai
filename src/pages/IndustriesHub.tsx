import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FactCard } from '../blocks/FactCard';
import { FaqBlock } from '../blocks/FaqBlock';
import { IndustryGrid } from '../blocks/IndustryGrid';
import { PageHero } from '../blocks/PageHero';
import { Section } from '../blocks/Section';
import { industries } from '../data/home';
import { industriesHub as h } from '../data/industries';
import { hasPage } from '../links';

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
        lower: industry.lower,
        icon: industry.icon,
        who: industry.who,
        title: industry.title,
        href: hasPage(href) ? href : null,
      };
    });

  return (
    <>
      <PageHero
        variant="solution"
        title={h.hero.title}
        rest={h.hero.rest}
        lead={h.hero.lead}
        actions={[
          { label: 'Request a demo', interest: null },
          { label: 'Find your industry', href: '#list' },
        ]}
        visual={
          <FactCard
            icon="layers"
            title={`${industries.list.length} industries`}
            subtitle="One platform, configured for each"
            rows={[
              { icon: 'database', label: 'Shared by every industry', value: 'Customers, items, pricing, GST, ledgers', note: 'Inventory, roles and audit on one set of data' },
              { icon: 'rules', label: 'Configured per industry', value: 'The steps between order and payment' },
            ]}
            chipsLabel="Every industry has its own page"
            chips={industries.list.map((industry) => ({
              label: industry.tab ?? industry.name,
              icon: industry.icon,
              href: hasPage(`/industries/${industry.slug}`) ? `/industries/${industry.slug}` : undefined,
            }))}
          />
        }
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
