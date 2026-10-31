import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { DataTable } from '../blocks/ComparisonTable';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { MigrationMap } from '../blocks/MigrationMap';
import { PageHero } from '../blocks/PageHero';
import { RolloutCard } from '../blocks/RolloutCard';
import { Section } from '../blocks/Section';
import { Timeline } from '../blocks/Timeline';
import { implementation } from '../data/home';
import { implementationPage as p } from '../data/implementation';
import { entryBySlug } from '../data/modules';
import { cardFor, iconOf, pageOf } from './module-card';

/**
 * Implementation and support (SITE-PLAN.md section 3.6): the rollout card in the hero, the homepage plan as the
 * full timeline, who you work with (the support model with the deck's points), every current tool mapped to a
 * module, risks and mitigation, ninety days after go-live, FAQ and CTA. Content: src/data/implementation.ts and
 * `implementation` in home.ts.
 */
export function Page() {
  const rows = p.migration.rows.map((row) => ({
    ...row,
    to: row.to.map((target) => {
      if (!target.slug) return { name: target.label ?? '' };
      const entry = entryBySlug(target.slug);
      if (!pageOf(entry)) throw new Error(`Implementation: ${target.slug} has no page`);
      return { name: cardFor(target.slug).name, note: target.note, href: pageOf(entry), icon: iconOf(entry) };
    }),
  }));

  return (
    <>
      <PageHero
        variant="solution"
        title={p.hero.title}
        rest={p.hero.rest}
        lead={p.hero.lead}
        facts={p.hero.facts}
        actions={[
          { label: 'Request a demo', interest: null },
          { label: p.hero.actions.plan, href: '#plan' },
        ]}
        visual={
          <RolloutCard
            title={p.hero.card.title}
            span={p.hero.card.span}
            phases={implementation.plan.phases}
            foot={p.hero.card.foot}
          />
        }
      />

      <Section id="plan" title={p.plan.title} rest={p.plan.rest} treatment="soft" lead={p.plan.lead}>
        <Timeline data={implementation.plan} />
      </Section>

      <Section id="support" tone="paper" title={p.support.title} rest={p.support.rest} treatment="mark" lead={p.support.lead}>
        <CapabilityTiles
          columns={3}
          tiles={implementation.support.map((item, index) => ({ ...item, points: p.support.points[index] }))}
        />
      </Section>

      <Section id="migration" title={p.migration.title} rest={p.migration.rest} treatment="grad" lead={p.migration.lead}>
        <MigrationMap from={p.migration.from} to={p.migration.to} rows={rows} />
      </Section>

      <Section id="risks" tone="paper" title={p.risks.title} rest={p.risks.rest} treatment="soft" lead={p.risks.lead}>
        <DataTable caption={p.risks.caption} columns={p.risks.columns} rows={p.risks.rows} />
      </Section>

      <Section id="after" title={p.after.title} rest={p.after.rest} treatment="mark" lead={p.after.lead}>
        <CapabilityTiles columns={3} tiles={p.after.items} />
      </Section>

      <FaqBlock id="faq" tone="paper" title="Questions about" rest="implementation." treatment="grad" lead="Answers from the product deck." items={p.faq} />

      <CtaBand title={p.cta.title} rest={p.cta.rest} body={p.cta.body} label="Request a demo" interest={null} />
    </>
  );
}
