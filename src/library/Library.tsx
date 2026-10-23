import { useState, type ReactNode } from 'react';
import { ConnectBoard, LayeredArchitecture } from '../blocks/ArchitectureDiagram';
import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ChainDiagram } from '../blocks/ChainDiagram';
import { BeforeAfter, DataTable } from '../blocks/ComparisonTable';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { FlowStrip } from '../blocks/FlowStrip';
import { InlineCta } from '../blocks/InlineCta';
import { ModuleCards } from '../blocks/ModuleCards';
import { PageHero } from '../blocks/PageHero';
import { PlatformStrip } from '../blocks/PlatformStrip';
import { ScreenFrame } from '../blocks/ScreenFrame';
import { ScreenTour } from '../blocks/ScreenTour';
import { Section } from '../blocks/Section';
import { StoryCards } from '../blocks/StoryCards';
import { Timeline } from '../blocks/Timeline';
import { TrustPanel } from '../blocks/TrustPanel';
import { WhatWhy } from '../blocks/WhatWhy';
import { connect, explore, faq, implementation, industries, inlineCtas, proof, why } from '../data/home';
import { architecture, platformFeatures } from '../data/platform';
import { beforeAfter, cards, chain, o2c, risks, sits } from './samples';
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
          lead="Sample: the package hero with a diagram in the visual slot (the package plate comes in Phase 21)."
          actions={[demo]}
          visual={
            <ChainDiagram
              title={explore.chainTitle}
              nodes={explore.chain}
              core="company"
              active="distributor"
              badge={explore.chainBadge}
            />
          }
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
        <Entry name="PlatformStrip" file="blocks/PlatformStrip.tsx" use="Every module page, platform">
          <PlatformStrip />
        </Entry>
      </Section>

      <Section id="lib-c" title={architecture.title} rest="and trust." treatment="grad" lead={architecture.lead}>
        <Entry name="LayeredArchitecture" file="blocks/ArchitectureDiagram.tsx" use="Platform, security">
          <LayeredArchitecture data={architecture} />
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
        <Entry name="BeforeAfter" file="blocks/ComparisonTable.tsx" use="ERP Connect">
          <BeforeAfter {...beforeAfter} />
        </Entry>
        <Entry name="DataTable" file="blocks/ComparisonTable.tsx" use="Implementation (risks)">
          <DataTable caption={risks.caption} columns={risks.columns} rows={risks.rows} />
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
