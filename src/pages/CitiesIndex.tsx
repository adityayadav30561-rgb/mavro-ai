import { CtaBand } from '../blocks/CtaBand';
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

  const gulf = gccCountries.map((country) => ({
    name: country.name,
    lower: country.inText,
    icon: t.icon,
    who: country.cities.map((city) => city.name).join(', '),
    title: `Known for ${country.knownFor}`,
    href: hasPage(gccPath(country)) ? gccPath(country) : null,
  }));

  return (
    <>
      <PageHero
        variant="simple"
        title={c.hero.title}
        rest={c.hero.rest}
        lead={c.hero.lead}
        actions={[
          { label: t.demo, interest: null },
          { label: 'Find your city', href: `#${groups[0]?.region ?? 'faq'}` },
        ]}
      />

      {groups.map((group, index) => (
        <Section
          key={group.region}
          id={group.region}
          tone={index % 2 ? undefined : 'paper'}
          title={regions[group.region]}
          treatment="soft"
          lead={index === 0 ? c.list.lead : undefined}
        >
          <IndustryGrid cards={group.cards} more={c.list.more} />
        </Section>
      ))}

      {gulf.length > 0 && (
        <Section id="gulf" tone={groups.length % 2 ? undefined : 'paper'} title={c.gulf.title} rest={c.gulf.rest} treatment="grad" lead={c.gulf.lead}>
          <IndustryGrid cards={gulf} more={c.list.more} />
        </Section>
      )}

      <FaqBlock id="faq" title={c.faq.title} rest={c.faq.rest} treatment="mark" items={c.faq.items} />

      <CtaBand title={t.cta.title} rest={t.cta.rest} body={t.cta.body} label={t.demo} interest={null} />
    </>
  );
}
