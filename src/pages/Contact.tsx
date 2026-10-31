import { CapabilityTiles } from '../blocks/CapabilityTiles';
import { ContactCard } from '../blocks/ContactCard';
import { PageHero } from '../blocks/PageHero';
import { Section } from '../blocks/Section';
import { contactPage as p } from '../data/company';
import { site } from '../data/site';
import { DemoPanel } from '../blocks/DemoPanel';

/**
 * Contact (SITE-PLAN.md section 3.10): direct contact in the hero, the full demo form (the homepage's #demo
 * section, so a "Request a demo" link from any page can land here too) and what happens after a request. Copy:
 * src/data/company.ts; contact details: src/data/site.ts.
 */
export function Page() {
  const { office } = site;
  return (
    <>
      <PageHero
        variant="solution"
        title={p.hero.title}
        rest={p.hero.rest}
        lead={p.hero.lead}
        actions={[{ label: 'Request a demo', href: '#demo' }]}
        visual={
          <ContactCard
            title={p.reach.title}
            rows={[
              { icon: 'mail', label: p.reach.email, value: site.contactEmail, href: `mailto:${site.contactEmail}` },
              { icon: 'phone', label: p.reach.phone, value: site.contactPhone, href: `tel:${site.contactPhone.replace(/\s/g, '')}` },
              { icon: 'pin', label: p.reach.office, value: office.street, lines: [`${office.city} ${office.postalCode}, ${office.region}`] },
            ]}
          />
        }
      />

      <DemoPanel />

      <Section id="next" tone="paper" title={p.next.title} rest={p.next.rest} treatment="mark" lead={p.next.lead}>
        <CapabilityTiles columns={3} tiles={p.next.steps} />
      </Section>
    </>
  );
}
