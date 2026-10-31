import { useEffect } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { industries } from '../data/home';
import { channelPortals, moduleById, packs, vendorPortal, type Pack } from '../data/modules';
import { hasPage } from '../links';
import { useTabs, vars } from '../motion/hooks';
import './industries.css';

const portalList = [vendorPortal, ...channelPortals];
const portalIcons: Record<string, IconName> = {
  vendor: 'procurement',
  distributor: 'distribution',
  dealer: 'warehouse',
  retailer: 'sales',
};

/** A module or portal id as a chip: its name, icon and the package anchor Explore listens for. */
function moduleLink(id: string): { name: string; icon: IconName; pack: Pack } {
  const portal = portalList.find((p) => p.id === id);
  if (portal) return { name: portal.name.replace(' / B2B', ''), icon: portalIcons[id], pack: 'portal' };
  const module = moduleById(id);
  return { name: module.name, icon: module.icon, pack: module.pack };
}

/**
 * The four audiences from the product deck as tabs. Each panel says what MAVRO does for that business, shows
 * the order flow with its shared ends and configured middle, and links to the modules to look at: a chip opens
 * that exact module in Explore the platform (data-module, read by Explore's link handler).
 */
export function Industries() {
  const { active, select, tabProps, panelProps } = useTabs(industries.list.length, 'industry');
  const industry = industries.list[active];

  // #industry-pharma (the header's Solutions links, until the industry pages exist) scrolls here, to the marker
  // below, and picks that industry's tab.
  useEffect(() => {
    const fromHash = (hash: string) => {
      const index = industries.list.findIndex((item) => `#industry-${item.slug}` === hash);
      if (index >= 0) select(index);
    };
    fromHash(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#industry-"]');
      if (link) fromHash(link.getAttribute('href') ?? '');
    };
    const onHash = () => fromHash(window.location.hash);
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHash);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHash);
    };
  }, [select]);

  const stages = [
    ...industries.core.start.map((label) => ({ label, core: true })),
    ...industry.middle.map((label) => ({ label, core: false })),
    { label: industry.fulfil, core: false },
    ...industries.core.end.map((label) => ({ label, core: true })),
  ];

  return (
    <section id="industries" className="section section--paper ind" aria-labelledby="ind-title">
      {industries.list.map((item) => (
        <span key={item.slug} id={`industry-${item.slug}`} className="ind__anchor" aria-hidden="true" />
      ))}
      <div className="page">
        <header className="head head--split" data-reveal>
          <h2 id="ind-title" className="h2">
            {industries.title} <span className="mark">{industries.titleSoft}</span>
          </h2>
          <p className="lead">{industries.lead}</p>
        </header>

        <div className="ind__wrap" data-reveal>
          <div className="ind__tabs" role="tablist" aria-label="Industry">
            {industries.list.map((item, index) => (
              <button key={item.name} type="button" className="ind__tab" {...tabProps(index)}>
                <span className="ind__tab-icon">
                  <Icon name={item.icon} size={20} />
                </span>
                <span className="ind__tab-text">
                  <b>{item.name}</b>
                  <span>{item.who}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="ind__panel" {...panelProps}>
            <div className="ind__intro" key={`${industry.name}-intro`}>
              <h3 className="ind__title">{industry.title}</h3>
              <ul className="ind__points">
                {industry.points.map((point, i) => (
                  <li key={point} style={vars({ '--i': i })}>
                    <Icon name="check" size={16} />
                    {point}
                  </li>
                ))}
              </ul>
              {hasPage(`/industries/${industry.slug}`) && (
                <a className="ind__page" href={`/industries/${industry.slug}`}>
                  {industries.pageLink} {industry.name.toLowerCase()}
                  <Icon name="arrow" size={14} />
                </a>
              )}
            </div>

            <div className="ind__flowbox">
              <div className="ind__legend" aria-hidden="true">
                <span data-core>Shared by every industry</span>
                <span>Configured for {industry.name.toLowerCase()}</span>
                <span className="ind__record">
                  Working record <b>{industry.record}</b> · traced by <b>{industry.trace}</b>
                </span>
              </div>
              <ol className="ind__flow">
                {stages.map((stage, index) => (
                  <li
                    key={stage.core ? stage.label : `${industry.name}-${index}`}
                    data-core={stage.core || undefined}
                    style={vars({ '--i': index })}
                  >
                    <span className="sr-only">{stage.core ? 'Shared stage: ' : 'Configured stage: '}</span>
                    {stage.label}
                  </li>
                ))}
              </ol>
              <p className="ind__shared">
                <b>Shared by every industry:</b> {industries.shared}
              </p>
            </div>

            <div className="ind__modules">
              <p className="ind__modules-label">{industries.modulesLabel}</p>
              <ul key={`${industry.name}-modules`}>
                {industry.modules.map((id, i) => {
                  const link = moduleLink(id);
                  return (
                    <li key={id} style={vars({ '--i': i })}>
                      <a href={packs[link.pack].href} data-module={id} data-pack={link.pack}>
                        <span className="ind__mod-icon">
                          <Icon name={link.icon} size={16} />
                        </span>
                        {link.name}
                        <Icon name="arrow" size={14} className="ind__mod-arrow" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
