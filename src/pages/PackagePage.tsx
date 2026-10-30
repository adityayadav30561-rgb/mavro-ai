import { ChainDiagram } from '../blocks/ChainDiagram';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { FlowStrip, type FlowNode } from '../blocks/FlowStrip';
import { HeroScreens } from '../blocks/HeroScreens';
import { ModuleCards } from '../blocks/ModuleCards';
import { PackageLinks, type PackageLink } from '../blocks/PackageLinks';
import { PackagePlate } from '../blocks/PackagePlate';
import { PageHero } from '../blocks/PageHero';
import { PortalLayers } from '../blocks/PortalLayers';
import { PremiumSpotlight, type SpotlightGroup } from '../blocks/PremiumSpotlight';
import { Section } from '../blocks/Section';
import { Icon } from '../components/Icon';
import { explore } from '../data/home';
import {
  areaOrder,
  areas,
  catalogue,
  contentFor,
  entryBySlug,
  packs,
  portals,
  premiumById,
  premiumGroups,
  type ModuleSlug,
  type Pack,
} from '../data/modules';
import { areaMeta, baseFlow, baseFlowNote, packageContent, packageTemplate as t } from '../data/packages';
import { hasPage } from '../links';
import { usePath } from '../routing';
import { cardFor, iconOf, pageOf, thumbnail } from './module-card';
import './package-page.css';

const order: Pack[] = ['base', 'portal', 'premium'];

/** The lead screen and phone screen a module's page leads with, as hero shots. */
function shot(slug: ModuleSlug) {
  const own = contentFor(slug)!.screens[0];
  return { screen: own.screen, alt: own.alt };
}
function phoneShot(slug: ModuleSlug) {
  const phone = contentFor(slug)?.phone;
  return phone ? { screen: phone.screen, alt: phone.alt } : undefined;
}

/**
 * The package page template (SITE-PLAN.md section 3.2), one page for Base modules, Portals and Premium modules.
 * The hero is the module hero: the package's lead screen bleeding off the edge, a second module behind it and a phone
 * in front, over the client band. Then every module as a card by business area under a jump bar (Portals: the chain
 * beside four rich portal rows), a package-specific section (Base: one record from order to ledger; Portals: the
 * records they share with the Base modules; Premium: the list and panel), how the packages combine with the plate,
 * FAQ and CTA. Content: src/data/packages.ts.
 */
export function Page() {
  const path = usePath();
  const pack = order.find((key) => packs[key].page === path);
  if (!pack) throw new Error(`PackagePage: no package at ${path} (src/data/modules/catalogue.ts packs)`);
  const content = packageContent[pack];
  const name = packs[pack].name;
  const entries = catalogue.filter((entry) => entry.pack === pack);

  const missing = entries.filter((entry) => !pageOf(entry));
  if (missing.length) throw new Error(`PackagePage: ${name} modules without a page: ${missing.map((e) => e.slug).join(', ')}`);

  // Modules as cards, by business area.
  const groups = areaOrder
    .map((area) => ({ area, name: areas[area], entries: entries.filter((entry) => entry.area === area) }))
    .filter((group) => group.entries.length > 0);

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

  const flowNode = (slug: ModuleSlug): FlowNode => {
    const entry = entryBySlug(slug);
    return { name: entry.name, icon: iconOf(entry), href: pageOf(entry), note: entry.summary };
  };

  // Portals: the modules behind them, each named in the portals' own module pages (their flow of records).
  const shared: ModuleSlug[] = ['procure-to-pay', 'vendor-invoice-management', 'order-to-cash', 'scheme-and-rebate', 'inventory-management'];

  const portalRows = portals.map((portal) => ({
    name: portal.name,
    layer: portal.layer,
    who: portal.who,
    body: portal.body,
    points: portal.points,
    href: hasPage(`/modules/${portal.slug}`) ? `/modules/${portal.slug}` : null,
    ...thumbnail(portal.slug),
  }));

  const behind = shot(content.screens.behind);

  return (
    <>
      <PageHero
        variant="module"
        chip={{ label: name, tier: pack, icon: content.icon }}
        title={content.hero.title}
        rest={content.hero.rest}
        lead={content.hero.lead}
        facts={content.hero.facts}
        actions={[
          { label: t.demo, interest: name },
          { label: t.seeModules, href: '#modules' },
        ]}
        band={<ClientBand />}
        visual={
          <HeroScreens
            lead={shot(content.screens.lead)}
            behind={{ ...behind, alt: '' }}
            phone={phoneShot(content.screens.phone)}
            note={explore.sample}
          />
        }
      />

      <Section id="modules" title={content.modules.title} rest={content.modules.rest} treatment="soft" lead={content.modules.lead}>
        {pack === 'portal' ? (
          <div className="pk__portals">
            <div className="pk__chain">
              <ChainDiagram title={explore.chainTitle} nodes={explore.chain} core="company" badge={explore.chainBadge} />
            </div>
            <PortalLayers portals={portalRows} more="See the portal" />
          </div>
        ) : (
          <>
            <nav className="pk__jump" aria-label="Business areas">
              <span>{t.jump}</span>
              {groups.map((group) => (
                <a key={group.area} href={`#area-${group.area}`}>
                  <Icon name={areaMeta[group.area!].icon} size={16} />
                  {group.name}
                  <b className="num">{group.entries.length}</b>
                </a>
              ))}
            </nav>
            <div className="pk__groups">
              {groups.map((group) => (
                <div key={group.area} id={`area-${group.area}`} className="pk__group">
                  <header className="pk__area">
                    <span className="pk__area-icon">
                      <Icon name={areaMeta[group.area!].icon} size={22} />
                    </span>
                    <div>
                      <h3>{group.name}</h3>
                      <p>{areaMeta[group.area!].line}</p>
                    </div>
                    <span className="pk__area-count num">
                      {group.entries.length} {group.entries.length === 1 ? 'module' : 'modules'}
                    </span>
                  </header>
                  <ModuleCards cards={group.entries.map((entry) => cardFor(entry.slug))} />
                </div>
              ))}
            </div>
          </>
        )}
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
          <FlowStrip
            layout="columns"
            note="Each portal writes to the module behind it: a distributor’s order is a sales order, a vendor’s invoice is an invoice to match."
            stages={[
              { label: 'Outside your walls', nodes: portals.map((portal) => flowNode(portal.slug)) },
              { label: 'Inside, the same records', nodes: shared.map(flowNode) },
            ]}
          />
        </Section>
      )}

      {pack === 'premium' && (
        <Section id="specific" tone="night" title={content.specific.title} rest={content.specific.rest} treatment="grad" lead={content.specific.lead}>
          <PremiumSpotlight groups={spotlight} features={features} seeLabel="see the screens" />
        </Section>
      )}

      <Section id="combine" title={t.combine.title} rest={t.combine.rest} treatment="grad" lead={t.combine.lead}>
        <div className="pk__combine">
          <PackagePlate tier={pack} />
          <PackageLinks packages={links} current={pack} here={t.combine.here} go={t.combine.go} stack />
        </div>
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
