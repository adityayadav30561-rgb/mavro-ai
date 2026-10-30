import { LayeredArchitecture } from '../blocks/ArchitectureDiagram';
import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { PackageLinks, type PackageLink } from '../blocks/PackageLinks';
import { HeroScreens } from '../blocks/HeroScreens';
import { PackagePlate } from '../blocks/PackagePlate';
import { ClientBand } from '../blocks/ClientBand';
import { PageHero } from '../blocks/PageHero';
import { PhoneRow } from '../blocks/PhoneRow';
import { PlatformStrip } from '../blocks/PlatformStrip';
import { Section } from '../blocks/Section';
import { Icon } from '../components/Icon';
import { explore } from '../data/home';
import { catalogue, packs, type Pack } from '../data/modules';
import { packageContent, packageTemplate, platformPage as p } from '../data/packages';
import { architecture } from '../data/platform';
import { hasPage, target } from '../links';
import { useHref } from '../routing';
import './package-page.css';

const order: Pack[] = ['base', 'portal', 'premium'];

/**
 * The Platform overview (SITE-PLAN.md section 3.3): what MAVRO is built on. Hero with the platform plates, the five
 * architecture layers (deck slide 11), the eight shared platform features (slide 12), the three packages, the
 * mobile app in phone frames, integrations with links to ERP Connect and Security, FAQ and CTA. Content:
 * src/data/packages.ts and src/data/platform.ts.
 */
export function Page() {
  const href = useHref();
  const links: PackageLink[] = order.map((key) => ({
    tier: key,
    name: packs[key].name,
    blurb: packs[key].blurb,
    count: `${catalogue.filter((entry) => entry.pack === key).length} ${key === 'portal' ? 'portals' : 'modules'}`,
    icon: packageContent[key].icon,
    href: hasPage(packs[key].page) ? packs[key].page : null,
  }));
  const erp = target({ label: 'ERP Connect', page: '/erp-connect', fallback: '#connect' });
  const security = target({ label: 'Security', page: '/security' });

  return (
    <>
      <PageHero
        variant="module"
        title={p.hero.title}
        rest={p.hero.rest}
        lead={p.hero.lead}
        facts={p.hero.facts}
        actions={[
          { label: packageTemplate.demo, interest: null },
          { label: 'See how it is built', href: '#architecture' },
        ]}
        band={<ClientBand />}
        visual={
          <HeroScreens
            lead={{ screen: 'overview', alt: 'The MAVRO overview screen: orders, production, stock and receivables for the plant on one dashboard (illustrative data).' }}
            behind={{ screen: 'o2c', alt: '' }}
            phone={{ screen: 'platform/approvals', alt: p.mobile.shots[0].alt }}
            note={explore.sample}
          />
        }
      />

      <Section id="architecture" tone="paper" title={p.architecture.title} rest={p.architecture.rest} treatment="soft" lead={p.architecture.lead}>
        <LayeredArchitecture data={architecture} />
      </Section>

      <Section id="features" title={p.features.title} rest={p.features.rest} treatment="mark" lead={p.features.lead}>
        <PlatformStrip />
      </Section>

      <Section id="packages" tone="paper" title={p.packages.title} rest={p.packages.rest} treatment="grad" lead={p.packages.lead}>
        <div className="pk__combine">
          <PackagePlate />
          <PackageLinks packages={links} go="See" stack />
        </div>
      </Section>

      <Section id="mobile" title={p.mobile.title} rest={p.mobile.rest} treatment="soft" lead={p.mobile.lead}>
        <PhoneRow
          shots={p.mobile.shots.map((shot) => ({
            screen: shot.name as `platform/${string}`,
            alt: shot.alt,
            title: shot.title,
            caption: shot.caption,
          }))}
          note={explore.sample}
        />
      </Section>

      <Section id="integrations" tone="paper" title={p.integrations.title} rest={p.integrations.rest} treatment="mark" lead={p.integrations.lead}>
        <CapabilityTiles tiles={p.integrations.items} columns={3} />
        <p className="pf__links">
          {erp && (
            <a href={href(erp)}>
              {p.integrations.erp}
              <Icon name="arrow" size={14} />
            </a>
          )}
          {security && (
            <a href={href(security)}>
              {p.integrations.security}
              <Icon name="arrow" size={14} />
            </a>
          )}
        </p>
      </Section>

      <FaqBlock id="faq" title="Questions about the" rest="platform." treatment="grad" lead="Answers from the product decks." items={p.faq} />

      <CtaBand title="See the platform" rest="on your own data." body={packageTemplate.cta.body} label={packageTemplate.demo} interest={null} />
    </>
  );
}
