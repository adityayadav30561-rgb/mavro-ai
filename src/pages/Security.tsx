import { LayeredArchitecture } from '../blocks/ArchitectureDiagram';
import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { FigureBand } from '../blocks/FigureBand';
import { HeroScreens } from '../blocks/HeroScreens';
import { PageHero } from '../blocks/PageHero';
import { ScreenPoints } from '../blocks/ScreenPoints';
import { Section } from '../blocks/Section';
import { explore, why } from '../data/home';
import { entryBySlug } from '../data/modules';
import { architecture } from '../data/platform';
import { securityPage as p } from '../data/security';
import { packageTiers, pageOf } from './module-card';

/**
 * Security and compliance (SITE-PLAN.md section 3.7): the homepage trust card one level deeper. Hero with the GST
 * returns screen; security at every layer (the layered architecture); access and audit beside the roles and audit
 * screen; India compliance by rule, each linked to the module that produces the record; data protection figures
 * (the page's night band); FAQ and CTA. Content: src/data/security.ts, `why.trust` in home.ts, platform.ts.
 */
export function Page() {
  const tiers = packageTiers();
  const compliance = p.compliance.items.map(({ module, ...item }) => {
    const entry = entryBySlug(module);
    const href = pageOf(entry);
    if (!href) throw new Error(`Security: ${module} has no page`);
    return { ...item, link: { label: `${p.compliance.more} ${entry.name}`, href } };
  });

  return (
    <>
      <PageHero
        variant="module"
        title={p.hero.title}
        rest={p.hero.rest}
        lead={p.hero.lead}
        facts={p.hero.facts}
        actions={[
          { label: 'Request a demo', interest: null },
          { label: p.hero.actions.compliance, href: '#compliance' },
        ]}
        band={<ClientBand />}
        visual={
          <HeroScreens
            lead={{ screen: 'accounting/gst-returns', alt: p.hero.screen.alt }}
            behind={{ screen: 'access', alt: '' }}
            note={explore.sample}
          />
        }
      />

      <Section id="architecture" title={p.architecture.title} rest={p.architecture.rest} treatment="soft" lead={p.architecture.lead}>
        <LayeredArchitecture
          data={architecture}
          packages={tiers.map((tier) => ({ label: tier.name, count: tier.count, tier: tier.tier, href: tier.href }))}
        />
      </Section>

      <Section id="access" tone="paper" title={p.access.title} rest={p.access.rest} treatment="mark" lead={p.access.lead}>
        <ScreenPoints screen="access" alt={p.access.screen} note={explore.sample} points={p.access.points} />
      </Section>

      <Section id="compliance" title={p.compliance.title} rest={p.compliance.rest} treatment="grad" lead={p.compliance.lead}>
        <CapabilityTiles columns={3} tiles={compliance} />
      </Section>

      <Section id="data-protection" tone="night" title={p.protection.title} rest={p.protection.rest} treatment="soft" lead={p.protection.lead}>
        <FigureBand figures={why.trust.security.figures} controls={why.trust.security.controls} />
      </Section>

      <FaqBlock id="faq" tone="paper" title="Questions about" rest="security and compliance." treatment="mark" lead="Answers from the product decks." items={p.faq} />

      <CtaBand title={p.cta.title} rest={p.cta.rest} body={p.cta.body} label="Request a demo" interest={null} />
    </>
  );
}
