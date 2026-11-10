import { CtaBand } from '../blocks/CtaBand';
import { FactCard } from '../blocks/FactCard';
import { FaqBlock } from '../blocks/FaqBlock';
import { IndustryGrid } from '../blocks/IndustryGrid';
import { PageHero } from '../blocks/PageHero';
import { Section } from '../blocks/Section';
import { cities, citiesIndex as c, cityPath, cityTemplate as t, regions, states, type Region } from '../data/cities';
import { gccCountries, gccPath } from '../data/gcc';
import { hasPage } from '../links';

const order: Region[] = ['north', 'west', 'south', 'east', 'central'];

/**
 * The city index, /erp-software (D3): every city page as a card, by region, then FAQ and CTA. Linked from the footer
 * only (DECISIONS.md, "D3 city pages"). Content: `citiesIndex` and `cities` in src/data/cities.ts.
 */
export function Page() {
  const groups = order
    .map((region) => ({
      region,
      cards: cities
        .filter((city) => city.region === region)
        .map((city) => ({
          name: city.name,
          lower: city.name,
          icon: t.icon,
          who: states[city.state].name,
          title: `Known for ${city.knownFor}`,
          href: hasPage(cityPath(city)) ? cityPath(city) : null,
        })),
    }))
    .filter((group) => group.cards.length > 0);

  // Regions with only a few cities share a section, so no section holds a lone card.
  const big = groups.filter((group) => group.cards.length >= 5);
  const small = groups.filter((group) => group.cards.length < 5);
  const sections = [
    ...big.map((group) => ({ id: group.region, title: regions[group.region], cards: group.cards })),
    ...(small.length
      ? [{ id: small.map((group) => group.region).join('-'), title: c.otherRegions, cards: small.flatMap((group) => group.cards) }]
      : []),
  ];

  const gulf = gccCountries.map((country) => ({
    name: country.name,
    lower: country.inText,
    icon: t.icon,
    who: country.cities.length ? country.cities.map((city) => city.name).join(', ') : (country.areas?.[0] ?? ''),
    title: `Known for ${country.knownFor}`,
    href: hasPage(gccPath(country)) ? gccPath(country) : null,
  }));

  return (
    <>
      <PageHero
        variant="solution"
        title={c.hero.title}
        rest={c.hero.rest}
        lead={c.hero.lead}
        actions={[
          { label: t.demo, interest: null },
          { label: 'Find your city', href: `#${groups[0]?.region ?? 'faq'}` },
        ]}
        visual={
          <FactCard
            icon="pin"
            title={`${cities.length} cities in India`}
            subtitle="And the UAE, Saudi Arabia and Qatar"
            rows={[
              ...groups.map((group) => ({
                icon: 'pin' as const,
                label: regions[group.region],
                value: `${group.cards.length} ${group.cards.length === 1 ? 'city' : 'cities'}`,
                note: group.cards.map((card) => card.name).join(', '),
              })),
            ]}
            chipsLabel="Beyond India"
            chips={gccCountries.map((country) => ({ label: country.name, icon: 'pin' as const, href: gccPath(country) }))}
          />
        }
      />

      {sections.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          tone={index % 2 ? undefined : 'paper'}
          title={section.title}
          treatment="soft"
          lead={index === 0 ? c.list.lead : undefined}
        >
          <IndustryGrid cards={section.cards} more={c.list.more} />
        </Section>
      ))}

      {gulf.length > 0 && (
        <Section id="gulf" tone={sections.length % 2 ? undefined : 'paper'} title={c.gulf.title} rest={c.gulf.rest} treatment="grad" lead={c.gulf.lead}>
          <IndustryGrid cards={gulf} more={c.list.more} />
        </Section>
      )}

      <FaqBlock id="faq" title={c.faq.title} rest={c.faq.rest} treatment="mark" items={c.faq.items} />

      <CtaBand title={t.cta.title} rest={t.cta.rest} body={t.cta.body} label={t.demo} interest={null} />
    </>
  );
}
