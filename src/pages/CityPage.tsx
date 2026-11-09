import { CapabilityTiles, type CapabilityTile } from '../blocks/CapabilityTiles';
import { ClientBand } from '../blocks/ClientBand';
import { CtaBand } from '../blocks/CtaBand';
import { FaqBlock } from '../blocks/FaqBlock';
import { PageHero } from '../blocks/PageHero';
import { PlaceLinks } from '../blocks/PlaceLinks';
import { Section } from '../blocks/Section';
import { cityBySlug, cityPath, cityTemplate as t, states } from '../data/cities';
import { industries, inSentence } from '../data/home';
import { site } from '../data/site';
import { hasPage } from '../links';
import { usePath } from '../routing';

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
    },
    { icon: 'transport', title: 'E-way bills', body: 'Transportation Management keeps e-way bill compliance on every shipment leaving or entering the state.' },
    { icon: 'people', title: 'Statutory payroll', body: state.pt ?? 'PF, ESI and TDS computed in HRMS and Payroll, with payroll posted to the ledger.' },
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
        variant="simple"
        chip={{ label: `${city.name}, ${state.name}`, icon: 'pin' }}
        title={`ERP software in ${city.name}`}
        rest={`for ${city.knownFor}`}
        lead={city.lead}
        facts={[
          { value: state.gstCode, label: `GST state code, ${state.name}` },
          {
            value: city.presence === 'head-office' ? 'Head office' : city.presence === 'remote' ? 'Remote + on site' : 'Local team',
            label: city.presence === 'head-office' ? site.office.street.split(',').slice(-1)[0].trim() : city.presence === 'remote' ? 'On-site work when agreed' : 'Team or partner nearby',
          },
          { value: '25–30 days', label: 'Phased implementation' },
        ]}
        actions={[
          { label: t.demo, interest: null },
          { label: `Industries in ${city.name}`, href: '#industries' },
        ]}
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
