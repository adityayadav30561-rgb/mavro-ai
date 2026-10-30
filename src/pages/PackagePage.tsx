import { ChainDiagram } from '../blocks/ChainDiagram';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { FlowStrip } from '../blocks/FlowStrip';
import { ModuleCards } from '../blocks/ModuleCards';
import { PackageLinks, type PackageLink } from '../blocks/PackageLinks';
import { PackagePlate } from '../blocks/PackagePlate';
import { PageHero } from '../blocks/PageHero';
import { PremiumSpotlight, type SpotlightGroup } from '../blocks/PremiumSpotlight';
import { Section } from '../blocks/Section';
import { explore } from '../data/home';
import {
  areaOrder,
  areas,
  catalogue,
  entryBySlug,
  packs,
  premiumById,
  premiumGroups,
  type Pack,
  type ModuleSlug,
} from '../data/modules';
import { baseFlow, baseFlowNote, packageContent, packageTemplate as t } from '../data/packages';
import { contentFor } from '../data/modules';
import { hasPage } from '../links';
import { usePath } from '../routing';
import { cardFor, iconOf, pageOf } from './module-card';
import './package-page.css';

const order: Pack[] = ['base', 'portal', 'premium'];

/**
 * The package page template (SITE-PLAN.md section 3.2), one page for Base modules, Portals and Premium modules:
 * hero with the package plate, every module as a card with its lead screen (grouped by business area), a
 * package-specific section (Base: one record from order to ledger; Portals: the supply-to-retail chain; Premium:
 * the list and panel), how the three packages combine, FAQ and CTA. Content: src/data/packages.ts.
 */
export function Page() {
  const path = usePath();
  const pack = order.find((key) => packs[key].page === path);
  if (!pack) throw new Error(`PackagePage: no package at ${path} (src/data/modules/catalogue.ts packs)`);
  const content = packageContent[pack];
  const name = packs[pack].name;
  const entries = catalogue.filter((entry) => entry.pack === pack);

  // Modules as cards: by business area; the portals as one group in chain order.
  const groups =
    pack === 'portal'
      ? [{ name: 'Supply to retail', entries }]
      : areaOrder
          .map((area) => ({ name: areas[area], entries: entries.filter((entry) => entry.area === area) }))
          .filter((group) => group.entries.length > 0);

  const missing = entries.filter((entry) => !pageOf(entry));
  if (missing.length) throw new Error(`PackagePage: ${name} modules without a page: ${missing.map((e) => e.slug).join(', ')}`);

  const links: PackageLink[] = order.map((key) => ({
    tier: key,
    name: packs[key].name,
    blurb: packs[key].blurb,
    count: `${catalogue.filter((entry) => entry.pack === key).length} ${key === 'portal' ? 'portals' : 'modules'}`,
    icon: packageContent[key].icon,
    href: hasPage(packs[key].page) ? packs[key].page : null,
  }));

  const spotlight: SpotlightGroup[] = premiumGroups.map((group) => ({
    name: group.name,
    modules: group.ids.map((id) => {
      const entry = catalogue.find((item) => item.kind === 'module' && item.item.id === id)!;
      return { id, name: entry.name, icon: iconOf(entry), href: pageOf(entry) };
    }),
  }));
  const features = Object.fromEntries(premiumGroups.flatMap((g) => g.ids).map((id) => [id, premiumById(id)]));

  const flowNode = (slug: ModuleSlug) => {
    const entry = entryBySlug(slug);
    return { name: entry.name, icon: iconOf(entry), href: pageOf(entry), note: contentFor(slug)?.tagline.split(':')[0] };
  };

  return (
    <>
      <PageHero
        variant="package"
        chip={{ label: name, tier: pack, icon: content.icon }}
        title={content.hero.title}
        rest={content.hero.rest}
        lead={content.hero.lead}
        facts={content.hero.facts}
        actions={[
          { label: t.demo, interest: name },
          { label: t.seeModules, href: '#modules' },
        ]}
        visual={<PackagePlate tier={pack} />}
      />

      <Section id="modules" title={t.modules.title} rest={`${name}.`} treatment="soft" lead={t.modules.lead}>
        <div className="pk__groups">
          {groups.map((group) => (
            <div key={group.name} className="pk__group">
              <h3 className="pk__area">{group.name}</h3>
              <ModuleCards cards={group.entries.map((entry) => cardFor(entry.slug))} />
            </div>
          ))}
        </div>
      </Section>

      {pack === 'base' && (
        <Section id="specific" tone="paper" title={content.specific.title} rest={content.specific.rest} treatment="mark" lead={content.specific.lead}>
          <FlowStrip
            layout="columns"
            note={baseFlowNote}
            stages={baseFlow.map((stage) => ({ label: stage.label, nodes: stage.slugs.map(flowNode) }))}
          />
        </Section>
      )}

      {pack === 'portal' && (
        <Section id="specific" tone="paper" title={content.specific.title} rest={content.specific.rest} treatment="mark" lead={content.specific.lead}>
          <div className="pk__chain">
            <ChainDiagram title={explore.chainTitle} nodes={explore.chain} core="company" badge={explore.chainBadge} />
          </div>
        </Section>
      )}

      {pack === 'premium' && (
        <Section id="specific" tone="night" title={content.specific.title} rest={content.specific.rest} treatment="grad" lead={content.specific.lead}>
          <PremiumSpotlight groups={spotlight} features={features} seeLabel="see the screens" />
        </Section>
      )}

      <Section id="combine" tone={pack === 'premium' ? 'white' : 'white'} title={t.combine.title} rest={t.combine.rest} treatment="grad" lead={t.combine.lead}>
        <PackageLinks packages={links} current={pack} here={t.combine.here} />
      </Section>

      <FaqBlock
        id="faq"
        tone="paper"
        title={`${t.faq.title} ${name}`}
        rest="answered."
        treatment="mark"
        lead={t.faq.lead}
        items={content.faq}
      />

      <CtaBand
        title={`${t.cta.title} ${name}`}
        rest="on your own data."
        body={t.cta.body}
        label={t.demo}
        interest={name}
      />
    </>
  );
}
