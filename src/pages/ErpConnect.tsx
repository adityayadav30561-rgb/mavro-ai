import { BeforeAfter } from '../blocks/ComparisonTable';
import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { CtaBand } from '../blocks/CtaBand';
import { ErpSystems } from '../blocks/ErpSystems';
import { FaqBlock } from '../blocks/FaqBlock';
import { GapColumns } from '../blocks/GapColumns';
import { HeroScreens } from '../blocks/HeroScreens';
import { PageHero } from '../blocks/PageHero';
import { Section } from '../blocks/Section';
import { SwimlaneFlow } from '../blocks/SwimlaneFlow';
import { SyncSteps } from '../blocks/SyncSteps';
import { Timeline } from '../blocks/Timeline';
import { erpConnect as e } from '../data/erp-connect';
import { connect, explore } from '../data/home';
import { hasPage } from '../links';

const wms = '/modules/warehouse-management';

/**
 * ERP Connect (SITE-PLAN.md section 3.4): MAVRO alongside SAP, Oracle, Tally or a legacy ERP. A dark hero with the
 * boutique approvals app and the phone approval, who it is for, the gaps of native ERP access, the board with a
 * step-through of one record each way (in a dark panel, the hero being the page's night band), the five benefits,
 * before and after, the SAP Business One flow as swimlanes, the 25–30 day roadmap, FAQ and CTA. Content:
 * src/data/erp-connect.ts (the board and the benefits are the homepage's, from home.ts).
 */
export function Page() {
  return (
    <>
      <PageHero
        variant="module"
        tone="dark"
        title={e.hero.title}
        rest={e.hero.rest}
        lead={e.hero.lead}
        facts={e.hero.facts}
        actions={[
          { label: e.cta.label, interest: e.cta.interest },
          { label: e.hero.how, href: '#architecture' },
        ]}
        visual={
          <HeroScreens
            lead={{ screen: 'erp-connect/approvals', alt: e.hero.screen.alt }}
            phone={{ screen: 'erp-connect/phone-approval', alt: e.hero.phone.alt }}
            note={explore.sample}
          />
        }
      />

      <Section id="who" title={e.who.title} rest={e.who.rest} treatment="soft" lead={e.who.lead}>
        <ErpSystems systems={e.who.systems} users={e.who.users} />
      </Section>

      <Section id="gaps" tone="paper" title={e.gaps.title} rest={e.gaps.rest} treatment="mark" lead={e.gaps.lead}>
        <GapColumns gaps={e.gaps.items} />
      </Section>

      <Section id="architecture" title={e.architecture.title} rest={e.architecture.rest} treatment="grad" lead={e.architecture.lead}>
        <SyncSteps
          board={connect}
          steps={e.architecture.steps}
          label={e.architecture.stepsLabel}
          directions={e.architecture.directions}
          prev={e.architecture.prev}
          next={e.architecture.next}
        />
      </Section>

      <Section id="benefits" tone="paper" title={e.benefits.title} rest={e.benefits.rest} treatment="soft" lead={e.benefits.lead}>
        <CapabilityTiles
          columns={5}
          tiles={connect.benefits.map((benefit, index) => ({ ...benefit, points: e.benefits.points[index] }))}
        />
      </Section>

      <Section id="before-after" title={e.problems.title} rest={e.problems.rest} treatment="mark" lead={e.problems.lead}>
        <BeforeAfter before={e.problems.before} after={e.problems.after} rows={e.problems.rows} />
      </Section>

      <Section id="business-one" tone="paper" title={e.b1.title} rest={e.b1.rest} treatment="grad" lead={e.b1.lead}>
        <SwimlaneFlow
          lanes={e.b1.lanes}
          zones={e.b1.zones}
          legend={e.b1.legend}
          close={e.b1.close}
          link={hasPage(wms) ? { label: e.b1.module, href: wms } : null}
        />
      </Section>

      <Section id="roadmap" title={e.roadmap.title} rest={e.roadmap.rest} treatment="soft" lead={e.roadmap.lead}>
        <Timeline data={e.roadmap.plan} />
      </Section>

      <FaqBlock id="faq" tone="paper" title="Questions about" rest="ERP Connect." treatment="mark" lead="Answers from the connectivity deck." items={e.faq} />

      <CtaBand title={e.cta.title} rest={e.cta.rest} body={e.cta.body} label={e.cta.label} interest={e.cta.interest} />
    </>
  );
}
