import { LayeredArchitecture } from '../blocks/ArchitectureDiagram';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { HeroScreens } from '../blocks/HeroScreens';
import { IntegrationHub } from '../blocks/IntegrationHub';
import { PackageStack } from '../blocks/PackageStack';
import { ClientBand } from '../blocks/ClientBand';
import { PageHero } from '../blocks/PageHero';
import { PhoneRow } from '../blocks/PhoneRow';
import { PlatformStrip } from '../blocks/PlatformStrip';
import { Section } from '../blocks/Section';
import { Icon } from '../components/Icon';
import { connect, explore, intro } from '../data/home';
import { packageTemplate, platformPage as p } from '../data/packages';
import { architecture } from '../data/platform';
import { target } from '../links';
import { useHref } from '../routing';
import { packageTiers } from './module-card';
import './package-page.css';

/**
 * The Platform overview (SITE-PLAN.md section 3.3): what MAVRO is built on. Hero with the platform plates, the five
 * architecture layers (deck slide 11), the eight shared platform features (slide 12), the three packages, the
 * mobile app in phone frames, integrations with links to ERP Connect and Security, FAQ and CTA. Content:
 * src/data/packages.ts and src/data/platform.ts.
 */
export function Page() {
  const href = useHref();
  const tiers = packageTiers();
  const erp = target({ label: 'ERP Connect', page: '/erp-connect', fallback: '#connect' });
  const security = target({ label: 'Security', page: '/security-and-compliance' });

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
        <LayeredArchitecture
          data={architecture}
          packages={tiers.map((tier) => ({ label: tier.name, count: tier.count, tier: tier.tier, href: tier.href }))}
        />
      </Section>

      <Section id="features" title={p.features.title} rest={p.features.rest} treatment="mark" lead={p.features.lead}>
        <PlatformStrip />
      </Section>

      <Section id="packages" tone="paper" title={p.packages.title} rest={p.packages.rest} treatment="grad" lead={p.packages.lead}>
        <PackageStack tiers={tiers} foundation={intro.foundation} go="See" />
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
        <IntegrationHub
          data={p.integrations.hub}
          callout={
            <div className="pf__erp">
              <span className="pf__erp-icon">
                <Icon name="link" size={22} />
              </span>
              <div>
                <b>{p.integrations.erp.title}</b>
                <p>{p.integrations.erp.body}</p>
                <ul className="pf__erp-systems">
                  {connect.systems.map((system) => (
                    <li key={system.name}>
                      {system.name}
                      <span>{system.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="pf__links">
                {erp && (
                  <a href={href(erp)}>
                    {p.integrations.erp.label}
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
            </div>
          }
        />
      </Section>

      <FaqBlock id="faq" title="Questions about the" rest="platform." treatment="grad" lead="Answers from the product decks." items={p.faq} />

      <CtaBand title="See the platform" rest="on your own data." body={packageTemplate.cta.body} label={packageTemplate.demo} interest={null} />
    </>
  );
}
