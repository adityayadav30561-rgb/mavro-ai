import { CapabilityTiles, type CapabilityTile } from '../blocks/CapabilityTiles';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FactCard } from '../blocks/FactCard';
import { FaqBlock } from '../blocks/FaqBlock';
import { IndustryGrid } from '../blocks/IndustryGrid';
import { PageHero } from '../blocks/PageHero';
import { PlaceLinks } from '../blocks/PlaceLinks';
import { Section } from '../blocks/Section';
import { cityTemplate } from '../data/cities';
import { gccPath, gccPlace, gccTemplate as t } from '../data/gcc';
import { industries, inSentence } from '../data/home';
import { hasPage } from '../links';
import { usePath } from '../routing';

const cap = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).replace(/\.$/, '');

/**
 * The Gulf template (D4; data src/data/gcc.ts), for a country page (/ae/erp-software) and its city pages
 * (/ae/erp-software/dubai): hero, the place's industries over its areas, what MAVRO does for the country's tax and
 * payroll (only what the user confirmed), how MAVRO reaches it from India, its cities (country page) or the other
 * cities (city page), its own questions, CTA.
 */
export function Page() {
  const path = usePath();
  const { country, city } = gccPlace(path);
  if (!country) throw new Error(`GccPage: no country at ${path} (src/data/gcc.ts)`);
  const place = city ?? country;
  const name = city ? city.name : country.inText;
  const Name = city ? city.name : country.name;

  const industryTiles: CapabilityTile[] = place.industries.map(({ slug, note }) => {
    const industry = industries.list.find((item) => item.slug === slug);
    if (!industry) throw new Error(`GccPage: ${Name} names unknown industry "${slug}"`);
    const href = `/industries/${slug}`;
    return { icon: industry.icon, title: industry.name, body: note, link: hasPage(href) ? { label: `MAVRO for ${inSentence(industry)}`, href } : null };
  });

  const cityCards = country.cities.map((item) => ({
    name: item.name,
    lower: item.name,
    icon: cityTemplate.icon,
    who: country.name,
    title: `Known for ${item.knownFor}`,
    href: hasPage(gccPath(country, item)) ? gccPath(country, item) : null,
  }));
  const others = country.cities
    .filter((item) => item !== city && hasPage(gccPath(country, item)))
    .map((item) => ({ name: item.name, href: gccPath(country, item) }));

  return (
    <>
      <PageHero
        variant="solution"
        chip={{ label: city ? `${city.name}, ${country.name}` : country.name, icon: 'pin' }}
        title="ERP software in"
        rest={`${name}.`}
        lead={place.lead}
        actions={[
          { label: t.demo, interest: null },
          { label: `Industries in ${name}`, href: '#industries' },
        ]}
        visual={
          <FactCard
            icon="pin"
            title={Name}
            subtitle={city ? country.name : 'Served from India'}
            rows={[
              { icon: 'production', label: 'Known for', value: cap(place.knownFor) },
              { icon: 'receipt', label: 'Built in', value: country.compliance.tiles.map((tile) => tile.title).join(' · ') },
              { icon: 'finance', label: 'Currency', value: `${country.currency} and others`, note: 'With a live multi-currency P&L' },
              { icon: 'rocket', label: 'Implementation', value: '25–30 days, from India', note: 'On-site visits when agreed' },
            ]}
            chipsLabel={city || !country.cities.length ? 'Areas and zones' : 'City pages'}
            chips={
              city || !country.cities.length
                ? (place.areas ?? []).map((label) => ({ label }))
                : country.cities.map((item) => ({ label: item.name, icon: 'pin' as const, href: gccPath(country, item) }))
            }
          />
        }
        band={<ClientBand />}
      />

      <Section
        id="industries"
        tone="paper"
        title={t.industries.title}
        rest={t.industries.rest}
        treatment="grad"
        lead={place.areas ? `${Name}: ${place.areas.join(', ')}.` : undefined}
      >
        <CapabilityTiles tiles={industryTiles} columns={3} />
      </Section>

      <Section id="compliance" title={country.compliance.title} rest="built in." treatment="soft" lead={country.compliance.lead}>
        <CapabilityTiles tiles={country.compliance.tiles} columns={country.compliance.tiles.length === 3 ? 3 : undefined} />
      </Section>

      <Section id="delivery" tone="paper" title={t.delivery.title} rest={t.delivery.rest} treatment="mark">
        <CapabilityTiles tiles={t.delivery.tiles(name)} columns={3} />
      </Section>

      {!city && cityCards.length > 0 && (
        <Section id="cities" title={t.cities.title} rest={t.cities.rest} treatment="soft">
          <IndustryGrid cards={cityCards} more={t.cities.more} />
        </Section>
      )}

      <FaqBlock id="faq" title={`${t.faq.title} ${Name}`} treatment="grad" lead={t.faq.lead} items={place.faq} />

      {city && others.length > 0 && (
        <Section id="nearby" title={t.nearby.title} rest={`${country.inText}.`} treatment="soft">
          <PlaceLinks places={others} label={t.nearby.label} />
        </Section>
      )}

      <CtaBand title={t.cta.title} rest={t.cta.rest} body={t.cta.body} label={t.demo} interest={null} />
    </>
  );
}
