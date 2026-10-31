import { useState, type ReactNode } from 'react';
import { ConnectBoard, LayeredArchitecture } from '../blocks/ArchitectureDiagram';
import { Audience } from '../blocks/Audience';
import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ChainDiagram } from '../blocks/ChainDiagram';
import { BeforeAfter, DataTable } from '../blocks/ComparisonTable';
import { ErpSystems } from '../blocks/ErpSystems';
import { GapColumns } from '../blocks/GapColumns';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { FlowStrip } from '../blocks/FlowStrip';
import { InlineCta } from '../blocks/InlineCta';
import { ModuleCards } from '../blocks/ModuleCards';
import { IntegrationHub } from '../blocks/IntegrationHub';
import { PackageStack } from '../blocks/PackageStack';
import { PackagePlate } from '../blocks/PackagePlate';
import { PageHero } from '../blocks/PageHero';
import { PhoneRow } from '../blocks/PhoneRow';
import { PlatformStrip } from '../blocks/PlatformStrip';
import { PremiumSpotlight } from '../blocks/PremiumSpotlight';
import { ScreenFrame } from '../blocks/ScreenFrame';
import { ScreenTour } from '../blocks/ScreenTour';
import { Section } from '../blocks/Section';
import { StoryCards } from '../blocks/StoryCards';
import { SwimlaneFlow } from '../blocks/SwimlaneFlow';
import { SyncSteps } from '../blocks/SyncSteps';
import { Timeline } from '../blocks/Timeline';
import { RolloutCard } from '../blocks/RolloutCard';
import { StoryFeature } from '../blocks/StoryFeature';
import { ResultCard } from '../blocks/ResultCard';
import { LogoWall } from '../blocks/LogoWall';
import { ContactCard } from '../blocks/ContactCard';
import { Prose } from '../blocks/Prose';
import { MigrationMap } from '../blocks/MigrationMap';
import { ScreenPoints } from '../blocks/ScreenPoints';
import { FigureBand } from '../blocks/FigureBand';
import { TrustPanel } from '../blocks/TrustPanel';
import { WhatWhy } from '../blocks/WhatWhy';
import { Screen } from '../components/Screen';
import { connect, explore, faq, implementation, industries, inlineCtas, intro, proof, why } from '../data/home';
import { erpConnect } from '../data/erp-connect';
import { securityPage } from '../data/security';
import { customersPage } from '../data/company';
import { packageTiers } from '../pages/module-card';
import { catalogue, premiumById, premiumGroups } from '../data/modules';
import { platformPage } from '../data/packages';
import { architecture, platformFeatures } from '../data/platform';
import { audience, beforeAfter, cards, chain, o2c, risks, sits } from './samples';
import './library.css';

/*
 * The section library (/_library): every block with real sample data, for building and checking pages. Dev only:
 * the route exists only under `npm run dev` and is never built (src/routes.ts). docs/LIBRARY.md documents each
 * block. Measure it like any page: qa/measure.html?path=/_library.
 */

const heroes = ['module', 'industry', 'package', 'solution', 'simple'] as const;

function Entry({ name, file, use, children }: { name: string; file: string; use: string; children: ReactNode }) {
  return (
    <div className="lib__entry" id={`lib-${name}`}>
      <p className="lib__meta">
        <b>{name}</b> <code>{file}</code> <span>{use}</span>
      </p>
      {children}
    </div>
  );
}

function HeroDemo({ variant }: { variant: (typeof heroes)[number] }) {
  const demo = { label: 'Request a demo', interest: 'Base modules' };
  switch (variant) {
    case 'module':
      return (
        <PageHero
          variant="module"
          chip={{ label: 'Base modules', tier: 'base' }}
          title={o2c.name}
          lead={o2c.tagline}
          actions={[demo, { label: 'See the screens', href: '#lib-ScreenTour' }]}
          visual={<ScreenFrame variant="bleed" screen="o2c" alt={o2c.tour[0].alt} note={explore.sample} eager />}
        />
      );
    case 'industry':
      return (
        <PageHero
          variant="industry"
          title="ERP for manufacturers"
          rest="from order to the shop floor."
          lead="Sample: the industry hero with a contained product screen that settles flat as it comes into view."
          actions={[demo]}
          visual={
            <ScreenFrame
              screen="production"
              alt="MAVRO production overview (illustrative data)."
              note={explore.sample}
            />
          }
        />
      );
    case 'package':
      return (
        <PageHero
          variant="package"
          chip={{ label: 'Portals', tier: 'portal', icon: 'distribution' }}
          title="Portals"
          rest="for vendors and the channel."
          treatment="soft"
          lead="Sample: the package hero with the package plate in the visual slot."
          actions={[demo]}
          visual={<PackagePlate tier="portal" />}
        />
      );
    case 'solution':
      return (
        <PageHero
          variant="solution"
          tone="dark"
          title="Run MAVRO alongside"
          rest="SAP, Oracle, Tally or any legacy ERP."
          lead={connect.lead}
          actions={[
            { label: 'Request a demo', interest: 'ERP Connect' },
            { label: 'How it works', href: '#lib-ConnectBoard' },
          ]}
          facts={[
            { value: '25–30 days', label: 'Roadmap to go-live' },
            { value: 'Two-way', label: 'Sync with every ERP' },
          ]}
          visual={
            <ScreenFrame screen="overview" alt="MAVRO overview dashboard (illustrative data)." note={explore.sample} />
          }
        />
      );
    default:
      return (
        <PageHero
          variant="simple"
          title="Contact"
          rest="SaiSatwik Technologies."
          treatment="mark"
          lead="Sample: the simple hero for company, contact and legal pages, text only."
          actions={[demo]}
        />
      );
  }
}

export function Page() {
  const [hero, setHero] = useState<(typeof heroes)[number]>('module');

  return (
    <>
      <div className="lib__bar">
        <div className="page lib__bar-row">
          <span>PageHero variant</span>
          {heroes.map((variant) => (
            <button key={variant} type="button" aria-pressed={hero === variant} onClick={() => setHero(variant)}>
              {variant}
            </button>
          ))}
        </div>
      </div>
      <HeroDemo variant={hero} />

      <Section
        id="lib-a"
        title="Capability tiles,"
        rest="screen tour, what and why."
        treatment="soft"
        lead="Module page sections 2 to 4, with Order to Cash from product deck slide 34."
      >
        <Entry name="CapabilityTiles" file="blocks/CapabilityTiles.tsx" use="Module, package">
          <CapabilityTiles tiles={o2c.tiles} />
        </Entry>
        <Entry name="ScreenTour" file="blocks/ScreenTour.tsx" use="Module, industry, platform">
          <ScreenTour screens={o2c.tour} note={explore.sample} />
        </Entry>
        <Entry name="WhatWhy" file="blocks/WhatWhy.tsx" use="Module">
          <WhatWhy what={o2c.what} why={o2c.why} />
        </Entry>
        <Entry name="Audience" file="blocks/Audience.tsx" use="Module (who uses it)">
          <Audience {...audience} />
        </Entry>
      </Section>

      <Section
        id="lib-b"
        tone="paper"
        title="Flows,"
        rest="cards and the platform."
        treatment="mark"
        lead="Where a module sits, an industry's flow, module cards and the shared platform strip."
      >
        <Entry name="FlowStrip" file="blocks/FlowStrip.tsx" use="Module (columns), industry (chain)">
          <FlowStrip stages={sits} />
          <div className="lib__gap" />
          <FlowStrip
            stages={chain}
            layout="chain"
            legend={{ shared: 'Shared by every industry', configured: 'Configured for manufacturing' }}
            note={industries.shared}
          />
        </Entry>
        <Entry name="ModuleCards" file="blocks/ModuleCards.tsx" use="Package, industry, related modules">
          <ModuleCards cards={cards} more="See the module" />
        </Entry>
        <Entry name="PackagePlate" file="blocks/PackagePlate.tsx" use="Package hero, platform hero">
          <div className="lib__narrow">
            <PackagePlate tier="premium" />
          </div>
        </Entry>
        <Entry name="PackageStack" file="blocks/PackageStack.tsx" use="Package pages, platform">
          <PackageStack tiers={packageTiers()} foundation={intro.foundation} current="base" here="You are here" go="See" />
        </Entry>
        <Entry name="IntegrationHub" file="blocks/IntegrationHub.tsx" use="Platform (integrations)">
          <IntegrationHub data={platformPage.integrations.hub} />
        </Entry>
        <Entry name="PhoneRow" file="blocks/PhoneRow.tsx" use="Platform (mobile app)">
          <PhoneRow
            note={explore.sample}
            shots={platformPage.mobile.shots.slice(0, 2).map((shot) => ({ screen: shot.name as `platform/${string}`, alt: shot.alt, title: shot.title, caption: shot.caption }))}
          />
        </Entry>
        <Entry name="PremiumSpotlight" file="blocks/PremiumSpotlight.tsx" use="Premium package page (night band)">
          <div className="night-panel">
            <PremiumSpotlight
              seeLabel="see the screens"
              features={Object.fromEntries(premiumGroups.flatMap((g) => g.ids).map((id) => [id, premiumById(id)]))}
              groups={premiumGroups.map((group) => ({
                name: group.name,
                modules: group.ids.map((id) => {
                  const entry = catalogue.find((item) => item.kind === 'module' && item.item.id === id)!;
                  return { id, name: entry.name, icon: entry.kind === 'module' ? entry.item.icon : 'layers', href: null };
                }),
              }))}
            />
          </div>
        </Entry>
        <Entry name="PlatformStrip" file="blocks/PlatformStrip.tsx" use="Every module page, platform">
          <PlatformStrip />
        </Entry>
      </Section>

      <Section id="lib-c" title={architecture.title} rest="and trust." treatment="grad" lead={architecture.lead}>
        <Entry name="LayeredArchitecture" file="blocks/ArchitectureDiagram.tsx" use="Platform, security">
          <LayeredArchitecture
            data={architecture}
            packages={packageTiers().map((tier) => ({ label: tier.name, count: tier.count, tier: tier.tier, href: tier.href }))}
          />
        </Entry>
        <Entry name="TrustPanel (card)" file="blocks/TrustPanel.tsx" use="Homepage Why MAVRO">
          <div className="lib__narrow">
            <TrustPanel data={why.trust} id="lib-trust" />
          </div>
        </Entry>
        <Entry name="TrustPanel (expanded)" file="blocks/TrustPanel.tsx" use="Security, platform">
          <TrustPanel data={why.trust} variant="expanded" />
        </Entry>
      </Section>

      <Section
        id="lib-d"
        tone="paper"
        title="Tables,"
        rest="timeline, chain and screens."
        treatment="soft"
        lead="Before and after (connectivity deck slide 6), risks (product deck slide 26), the rollout plan, the portal chain and the screen frame."
      >
        <Entry name="SyncSteps" file="blocks/SyncSteps.tsx" use="ERP Connect (architecture)">
          <SyncSteps
            board={connect}
            steps={erpConnect.architecture.steps}
            label={erpConnect.architecture.stepsLabel}
            directions={erpConnect.architecture.directions}
            prev={erpConnect.architecture.prev}
            next={erpConnect.architecture.next}
          />
        </Entry>
        <Entry name="ErpSystems" file="blocks/ErpSystems.tsx" use="ERP Connect (who it is for)">
          <ErpSystems systems={erpConnect.who.systems} users={erpConnect.who.users} />
        </Entry>
        <Entry name="GapColumns" file="blocks/GapColumns.tsx" use="ERP Connect (gaps)">
          <GapColumns gaps={erpConnect.gaps.items} />
        </Entry>
        <Entry name="SwimlaneFlow" file="blocks/SwimlaneFlow.tsx" use="ERP Connect (SAP Business One)">
          <SwimlaneFlow lanes={erpConnect.b1.lanes} zones={erpConnect.b1.zones} legend={erpConnect.b1.legend} close={erpConnect.b1.close} />
        </Entry>
        <Entry name="BeforeAfter" file="blocks/ComparisonTable.tsx" use="ERP Connect">
          <BeforeAfter {...beforeAfter} />
        </Entry>
        <Entry name="DataTable" file="blocks/ComparisonTable.tsx" use="Implementation (risks)">
          <DataTable caption={risks.caption} columns={risks.columns} rows={risks.rows} />
        </Entry>
        <Entry name="StoryFeature" file="blocks/StoryFeature.tsx" use="Customers (stories in full)">
          <StoryFeature stories={proof.stories.slice(0, 1)} labels={customersPage.labels} />
        </Entry>
        <Entry name="ResultCard" file="blocks/ResultCard.tsx" use="Customers hero">
          <div className="lib__narrow">
            <ResultCard stories={proof.stories} title="Result" />
          </div>
        </Entry>
        <Entry name="LogoWall" file="blocks/LogoWall.tsx" use="Customers (clientele)">
          <LogoWall />
        </Entry>
        <Entry name="ContactCard" file="blocks/ContactCard.tsx" use="Contact hero">
          <div className="lib__narrow">
            <ContactCard title="Reach us directly" rows={[{ icon: 'mail', label: 'Email', value: 'contact@saisatwik.com', href: 'mailto:contact@saisatwik.com' }, { icon: 'pin', label: 'Head office', value: '1415, 13th Floor, Galaxy Blue Sapphire', lines: ['Greater Noida 201009'] }]} />
          </div>
        </Entry>
        <Entry name="Prose" file="blocks/Prose.tsx" use="Company, Privacy, Terms, blog posts (when the text exists)">
          <Prose updated="Sample" sections={[{ heading: 'A section heading', paragraphs: ['Long-form text at a readable measure. The real text for Company, Privacy and Terms comes from the user.'] }]} />
        </Entry>
        <Entry name="RolloutCard" file="blocks/RolloutCard.tsx" use="Implementation hero">
          <div className="lib__narrow">
            <RolloutCard title="Your first month" span="Day 1 → Day 30" phases={implementation.plan.phases} foot="One dedicated resource · same-day resolution" />
          </div>
        </Entry>
        <Entry name="MigrationMap" file="blocks/MigrationMap.tsx" use="Implementation (migration plan)">
          <MigrationMap
            from="Today"
            to="In MAVRO"
            rows={[{ icon: 'people', area: 'HR and payroll', today: 'External payroll, posted to the GL by manual journals', to: [{ name: 'HRMS and Payroll', note: 'Attendance to GL', href: '/modules/hrms-and-payroll', icon: 'people' }, { name: 'Payroll posted to the GL on approval' }] }]}
          />
        </Entry>
        <Entry name="ScreenPoints" file="blocks/ScreenPoints.tsx" use="Security (access and audit)">
          <ScreenPoints screen="access" alt="Roles and audit (illustrative data)." note={explore.sample} points={securityPage.access.points.slice(0, 3)} />
        </Entry>
        <Entry name="FigureBand" file="blocks/FigureBand.tsx" use="Security (data protection, night band)">
          <div className="night-panel">
            <FigureBand figures={why.trust.security.figures} controls={why.trust.security.controls} />
          </div>
        </Entry>
        <Entry name="Timeline" file="blocks/Timeline.tsx" use="Homepage, implementation, ERP Connect">
          <Timeline data={implementation.plan} />
        </Entry>
        <Entry name="ChainDiagram" file="blocks/ChainDiagram.tsx" use="Homepage Explore, portal pages">
          <div className="lib__row">
            <ChainDiagram
              title={explore.chainTitle}
              nodes={explore.chain}
              core="company"
              active="vendor"
              badge={explore.chainBadge}
            />
            <ChainDiagram
              title={explore.chainTitle}
              nodes={explore.chain}
              core="company"
              active="dealer"
              badge={explore.chainBadge}
            />
          </div>
        </Entry>
        <Entry
          name="ScreenFrame"
          file="blocks/ScreenFrame.tsx"
          use="Everywhere screens appear (contained; bleed in heroes and Explore)"
        >
          <div className="lib__narrow">
            <ScreenFrame screen="inventory" alt="MAVRO inventory view (illustrative data)." note={explore.sample} />
          </div>
        </Entry>
        <Entry
          name="ScreenKit"
          file="components/Screen.tsx"
          use="Module screens (prototype/modules/<slug>/) and phone screens (prototype/phone.css), Phase 4 samples"
        >
          <div className="lib__kit">
            <Screen
              name="order-to-cash/collections"
              alt="Order to Cash collections and dunning queue: ₹1.37 Cr outstanding, ₹12.4 L over 60 days, ten accounts in the dunning queue with their stage, owner and next step (illustrative data)."
            />
            <Screen
              device="phone"
              name="order-to-cash/credit-release"
              sizes="17rem"
              alt="Credit release on the MAVRO phone app: SO-24861 for Orion Agro Equipment, ₹14,62,000, takes exposure to ₹42.10 L against a ₹40 L limit (illustrative data)."
            />
          </div>
        </Entry>
        <Entry name="InlineCta" file="blocks/InlineCta.tsx" use="Long pages">
          <InlineCta {...inlineCtas.modules} />
        </Entry>
      </Section>

      <Section
        id="lib-e"
        tone="night"
        title="Dark band"
        rest="blocks."
        treatment="grad"
        lead="Blocks drawn for a navy section: the ERP Connect board and the story cards."
      >
        <Entry name="ConnectBoard" file="blocks/ArchitectureDiagram.tsx" use="Homepage, ERP Connect">
          <ConnectBoard data={connect} />
        </Entry>
        <Entry name="StoryCards" file="blocks/StoryCards.tsx" use="Homepage, customers, industry">
          <StoryCards stories={proof.stories} />
        </Entry>
      </Section>

      <FaqBlock
        id="lib-faq"
        tone="white"
        title="FaqBlock,"
        rest="with its own questions."
        treatment="mark"
        lead="Every page has its own FAQ block; its route gets FAQPage structured data from the same items (seo/schema.ts)."
        items={faq.items.slice(0, 4)}
      />

      <CtaBand
        title="See Order to Cash"
        rest="on your own data."
        body="A demo built around your documents, approvals and current system, with the modules you need."
        label="Request a demo"
        interest="Base modules"
      />

      <p className="page lib__foot">{platformFeatures.items.length} platform features · section library, dev only</p>
    </>
  );
}
