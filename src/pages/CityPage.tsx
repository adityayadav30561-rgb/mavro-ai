import { CapabilityTiles, type CapabilityTile } from '../blocks/CapabilityTiles';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FactCard } from '../blocks/FactCard';
import { FaqBlock } from '../blocks/FaqBlock';
import { PageHero } from '../blocks/PageHero';
import { PlaceLinks } from '../blocks/PlaceLinks';
import { Section } from '../blocks/Section';
import { cityBySlug, cityPath, cityTemplate as t, states } from '../data/cities';
import { industries, inSentence } from '../data/home';
import { site } from '../data/site';
import { queryLinks } from '../data/query-links';
import { hasPage } from '../links';
import { usePath } from '../routing';

const cap = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).replace(/\.$/, '');

/**
 * The city page template (D3; data src/data/cities.ts): hero with the city's own lead and its state's facts, the
 * city's three industries (each linked to its industry page) over its industrial areas, the state's compliance, how
 * implementation reaches the city, the city's own questions, nearby cities, CTA. Most of the text is the city's own
 * (qa/similarity.cjs keeps the pages apart).
 */
export function Page() {
  const path = usePath();
  const city = cityBySlug(path.slice(t.indexPath.length + 1));
  if (!city) throw new Error(`CityPage: no city at ${path} (src/data/cities.ts)`);
  const state = states[city.state];
  const where = city.aka ? `${city.name} (${city.aka})` : city.name;

  const industryTiles: CapabilityTile[] = city.industries.map(({ slug, note }) => {
    const industry = industries.list.find((item) => item.slug === slug);
    if (!industry) throw new Error(`CityPage: ${city.name} names unknown industry "${slug}"`);
    const href = `/industries/${slug}`;
    return {
      icon: industry.icon,
      title: industry.name,
      body: note,
      link: hasPage(href) ? { label: `MAVRO for ${inSentence(industry)}`, href } : null,
    };
  });

  const complianceTiles: CapabilityTile[] = [
    {
      icon: 'receipt',
      title: 'GST and e-invoicing',
      body: `Invoices for ${state.name} carry GSTINs starting ${state.gstCode}; e-invoicing, GSTR-1, GSTR-3B and ITC reconciliation run from the transactions.`,
      link: queryLinks.gst,
    },
    { icon: 'transport', title: 'E-way bills', body: 'Transportation Management keeps e-way bill compliance on every shipment leaving or entering the state.' },
    {
      icon: 'people',
      title: 'Statutory payroll',
      body: state.pt ?? 'PF, ESI and TDS computed in HRMS and Payroll, with payroll posted to the ledger.',
      link: queryLinks.payroll,
    },
  ];

  const deliveryTiles: CapabilityTile[] = [
    { icon: 'pin', title: city.presence === 'head-office' ? 'Head office' : 'Who you work with', body: t.presence[city.presence](city.name, state.name) },
    { icon: 'rocket', title: 'Live in 25–30 days', body: t.rollout },
    { icon: 'headset', title: 'Support after go-live', body: t.support },
  ];

  const nearby = city.nearby
    .map((slug) => cityBySlug(slug))
    .filter((place) => place && hasPage(cityPath(place)))
    .map((place) => ({ name: place!.name, href: cityPath(place!) }));

  return (
    <>
      <PageHero
        variant="solution"
        chip={{ label: `${city.name}, ${state.name}`, icon: 'pin' }}
        title={t.heroTitle}
        rest={`${city.name}.`}
        lead={city.lead}
        actions={[
          { label: t.demo, interest: null },
          { label: `Industries in ${city.name}`, href: '#industries' },
        ]}
        visual={
          <FactCard
            icon="pin"
            title={where}
            subtitle={`${state.name}, India`}
            rows={[
              { icon: 'production', label: 'Known for', value: cap(city.knownFor) },
              { icon: 'receipt', label: 'GST state code', value: state.gstCode, note: `GSTINs registered in ${state.name} start ${state.gstCode}` },
              {
                icon: 'people',
                label: city.presence === 'head-office' ? 'Head office' : 'Who you work with',
                value: city.presence === 'head-office' ? 'SaiSatwik Technologies' : city.presence === 'remote' ? 'Remote, on site when agreed' : 'A local team or partner',
                note: city.presence === 'head-office' ? `${site.office.street}, ${site.office.city}` : city.presence === 'state-team' ? `On the ground in ${state.name}` : undefined,
              },
              { icon: 'rocket', label: 'Implementation', value: '25–30 days', note: 'Phased, with one dedicated resource' },
            ]}
            chipsLabel="Industrial areas"
            chips={city.areas.map((label) => ({ label }))}
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
        lead={`${where}: ${city.areas.join(', ')}.`}
      >
        <CapabilityTiles tiles={industryTiles} columns={3} />
      </Section>

      <Section id="compliance" title={`${t.compliance.title} ${state.name},`} rest={t.compliance.rest} treatment="soft" lead={t.compliance.lead}>
        <CapabilityTiles tiles={complianceTiles} columns={3} />
      </Section>

      <Section id="delivery" tone="paper" title={t.delivery.title} rest={t.delivery.rest} treatment="mark">
        <CapabilityTiles tiles={deliveryTiles} columns={3} />
      </Section>

      <FaqBlock id="faq" title={`${t.faq.title} ${city.name}`} treatment="grad" lead={t.faq.lead} items={city.faq} />

      {nearby.length > 0 && (
        <Section id="nearby" title={t.nearby.title} rest="cities." treatment="soft">
          <PlaceLinks places={nearby} label={t.nearby.label} />
        </Section>
      )}

      <CtaBand title={t.cta.title} rest={t.cta.rest} body={t.cta.body} label={t.demo} interest={null} />
    </>
  );
}
