import { Audience } from '../blocks/Audience';
import { ClientBand } from '../blocks/ClientBand';
import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ChainDiagram } from '../blocks/ChainDiagram';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { FlowStrip, type FlowNode } from '../blocks/FlowStrip';
import { ModuleCards, type ModuleCard } from '../blocks/ModuleCards';
import { PageHero } from '../blocks/PageHero';
import { PlatformStrip } from '../blocks/PlatformStrip';
import { ScreenFrame } from '../blocks/ScreenFrame';
import { ScreenTour } from '../blocks/ScreenTour';
import { Section } from '../blocks/Section';
import { WhatWhy } from '../blocks/WhatWhy';
import { Screen } from '../components/Screen';
import { explore, industries } from '../data/home';
import {
  catalogue,
  contentFor,
  entryBySlug,
  fill,
  leadScreens,
  moduleViews,
  modulePage,
  moduleTemplate as t,
  packs,
  type CatalogueEntry,
  type ModuleLink,
  type ModuleSlug,
} from '../data/modules';
import { hasPage, target } from '../links';
import { useHref, usePath } from '../routing';
import './module-page.css';

/** A module's page, or null while it has none (a plain label or card instead of a link). */
const pageOf = (entry: CatalogueEntry) => (hasPage(modulePage(entry)) ? modulePage(entry) : null);

const iconOf = (entry: CatalogueEntry) => (entry.kind === 'module' ? entry.item.icon : 'distribution');

/** The lead screen of a module for its card: its own first screen once it has content, else its lead screen
 *  (leads.ts), else its homepage Explore screen. */
function thumbnail(slug: ModuleSlug): Pick<ModuleCard, 'screen' | 'alt'> {
  const own = contentFor(slug)?.screens[0];
  if (own) return { screen: own.screen, alt: own.alt };
  if (leadScreens[slug]) return leadScreens[slug];
  const entry = entryBySlug(slug);
  const base = explore.packages.base.screens as Record<string, { screen: ModuleCard['screen']; alt: string }>;
  return entry.kind === 'module' && base[entry.item.id] ? base[entry.item.id] : {};
}

/**
 * The module page template (SITE-PLAN.md section 3.1), one page per module in src/data/modules/content/. Ten
 * sections, all from the section library: hero (lead screen and phone screen), capability tiles, screen tour,
 * what it does and why it matters, where it sits, who uses it, the platform, related modules, FAQ, closing CTA.
 * Backgrounds alternate white and paper and headline treatments never repeat between neighbours (docs/LIBRARY.md).
 */
export function Page() {
  const path = usePath();
  const href = useHref();
  const slug = path.split('/').pop() as ModuleSlug;
  const content = contentFor(slug);
  if (!content) throw new Error(`ModulePage: no content for ${path} (src/data/modules/content/)`);

  const entry = entryBySlug(slug);
  const { name } = entry;
  const pack = packs[entry.pack];
  const interest = pack.name;
  const [lead] = content.screens;
  // The module's views the tour does not show (views.ts): the screens are a sample of the module.
  const shownViews = [...content.screens, ...(content.phone ? [content.phone] : [])].map((s) => s.view);
  const otherViews = (moduleViews[slug] ?? []).filter((view) => !shownViews.includes(view));

  const node = (link: ModuleLink): FlowNode => {
    const other = entryBySlug(link.slug);
    return { name: other.name, icon: iconOf(other), href: pageOf(other), note: link.passes };
  };

  const audience = content.industries.map((use) => {
    const industry = industries.list.find((item) => item.slug === use.slug)!;
    const to = target({
      label: industry.name,
      page: `/industries/${industry.slug}`,
      fallback: `#industry-${industry.slug}`,
    });
    return { name: industry.name, icon: industry.icon, who: industry.who, note: use.note, href: to && href(to) };
  });

  const related =
    content.related ??
    catalogue
      .filter((other) => other.area === entry.area && other.slug !== slug)
      .map((other) => other.slug)
      .slice(0, 4);
  const cards: ModuleCard[] = related.map((other) => {
    const card = entryBySlug(other);
    return {
      name: card.name,
      summary: card.summary,
      icon: iconOf(card),
      tier: card.pack,
      href: pageOf(card),
      ...thumbnail(other),
    };
  });

  // Where it sits: what feeds it and what it feeds. Portal pages draw the supply-to-retail chain beside it.
  const flow = (
    <FlowStrip
      stages={[
        { label: t.flow.from, nodes: content.flow.from.map(node) },
        { nodes: [{ name, icon: iconOf(entry), kind: 'current' }] },
        { label: t.flow.to, nodes: content.flow.to.map(node) },
      ]}
    />
  );

  return (
    <>
      <PageHero
        variant="module"
        chip={{ label: pack.name, tier: entry.pack }}
        title={name}
        lead={content.tagline}
        actions={[
          { label: t.demo, interest, module: name },
          { label: t.seeScreens, href: '#screens' },
        ]}
        band={<ClientBand />}
        visual={
          <>
            <ScreenFrame variant="bleed" screen={lead.screen} alt={lead.alt} note={explore.sample} eager />
            {content.phone && (
              <div className="mp__phone">
                <Screen device="phone" name={content.phone.screen} alt={content.phone.alt} sizes="12rem" eager />
              </div>
            )}
          </>
        }
      />

      <Section
        id="capabilities"
        title={fill(t.capabilities.title, name)}
        rest={t.capabilities.rest}
        treatment="soft"
        lead={t.capabilities.lead}
      >
        <CapabilityTiles tiles={content.tiles} tier={entry.pack} />
      </Section>

      <Section
        id="screens"
        tone="paper"
        title={fill(t.tour.title, name)}
        rest={t.tour.rest}
        treatment="mark"
        lead={t.tour.lead}
      >
        <ScreenTour
          id="module-tour"
          screens={content.screens}
          note={explore.sample}
          more={{ label: fill(t.tour.more, name), views: otherViews }}
        />
      </Section>

      <Section id="what" title={t.whatWhy.title} rest={t.whatWhy.rest} treatment="grad" layout="stack">
        <WhatWhy
          what={{ title: t.whatWhy.what, body: content.what }}
          why={{ title: t.whatWhy.why, points: content.why }}
        />
      </Section>

      <Section
        id="flow"
        tone="paper"
        title={fill(t.flow.title, name)}
        rest={t.flow.rest}
        treatment="soft"
        lead={entry.kind === 'portal' ? t.flow.portalLead : t.flow.lead}
      >
        {entry.kind === 'portal' ? (
          <div className="mp__portal">
            <ChainDiagram
              title={explore.chainTitle}
              nodes={explore.chain}
              core="company"
              active={entry.item.id}
              badge={explore.chainBadge}
            />
            {flow}
          </div>
        ) : (
          flow
        )}
      </Section>

      <Section
        id="audience"
        title={t.audience.title}
        rest={fill(t.audience.rest, name)}
        treatment="mark"
        lead={t.audience.lead}
      >
        <Audience
          industries={audience}
          roles={content.roles}
          labels={{
            industries: t.audience.industries,
            roles: t.audience.roles,
            works: t.audience.works,
            see: fill(t.audience.see, name),
          }}
          screensHref="#screens"
        />
      </Section>

      <Section
        id="platform"
        tone="paper"
        title={t.platform.title}
        rest={t.platform.rest}
        treatment="grad"
        lead={fill(t.platform.lead, name)}
      >
        <PlatformStrip
          module={{ name, icon: iconOf(entry), tier: entry.pack, label: fill(t.platform.module, pack.name) }}
        />
      </Section>

      <Section
        id="related"
        title={t.related.title}
        rest={t.related.rest}
        treatment="soft"
        lead={fill(t.related.lead, name)}
      >
        <ModuleCards cards={cards} more={t.related.more} />
      </Section>

      <FaqBlock
        id="faq"
        tone="paper"
        title={fill(t.faq.title, name)}
        rest={t.faq.rest}
        treatment="mark"
        lead={fill(t.faq.lead, name)}
        items={content.faq}
      />

      <CtaBand
        title={fill(t.cta.title, name)}
        rest={t.cta.rest}
        body={fill(t.cta.body, name)}
        label={t.demo}
        interest={interest}
        module={name}
      />
    </>
  );
}
