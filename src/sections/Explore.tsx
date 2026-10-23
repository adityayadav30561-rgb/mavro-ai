import { useEffect, useState, type ReactNode } from 'react';
import { openCatalogue } from '../components/catalogue';
import { Icon, type IconName } from '../components/Icon';
import { ChainDiagram } from '../blocks/ChainDiagram';
import { InlineCta } from '../blocks/InlineCta';
import { ScreenFrame } from '../blocks/ScreenFrame';
import { explore, inlineCtas } from '../data/home';
import {
  baseCapabilities,
  baseFeatured,
  byPack,
  channelPortals,
  moduleById,
  premiumById,
  vendorPortal,
  type Pack,
} from '../data/modules';
import { useTabs, vars } from '../motion/hooks';
import { SpecialVisual } from './explore/SpecialVisual';
import './explore.css';

interface Item {
  id: string;
  name: string;
  icon: IconName;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
  /** A full product screenshot: the panel gives it more room and lets it run off the edges. */
  shot?: boolean;
}

const capabilities = [baseFeatured, ...baseCapabilities];
const portalList = [vendorPortal, ...channelPortals];
const portalIcons: Record<string, IconName> = {
  vendor: 'procurement',
  distributor: 'distribution',
  dealer: 'warehouse',
  retailer: 'sales',
};

const items: Record<Pack, Item[]> = {
  base: explore.packages.base.featured.map((id) => {
    const module = moduleById(id);
    const capability = capabilities.find((c) => c.id === id)!;
    return {
      id,
      name: module.name,
      icon: module.icon,
      kicker: module.summary,
      title: module.name,
      body: capability.body,
      points: capability.tags,
      visual: (
        <ScreenFrame
          screen={explore.packages.base.screens[id as keyof typeof explore.packages.base.screens].screen}
          alt={explore.packages.base.screens[id as keyof typeof explore.packages.base.screens].alt}
          sizes="(max-width: 1023px) 150vw, 48rem"
          variant="bleed"
          note={explore.sample}
        />
      ),
      shot: true,
    };
  }),
  portal: explore.packages.portal.featured.map((id) => {
    const portal = portalList.find((p) => p.id === id)!;
    return {
      id,
      name: portal.name,
      icon: portalIcons[id],
      kicker: id === 'vendor' ? portal.layer : `${portal.layer} sales`,
      title: portal.name,
      body: portal.body,
      points: portal.points,
      visual: (
        <ChainDiagram
          title={explore.chainTitle}
          nodes={explore.chain}
          core="company"
          active={id}
          badge={explore.chainBadge}
        />
      ),
    };
  }),
  premium: explore.packages.premium.featured.map((id) => {
    const module = moduleById(id);
    const feature = premiumById(id);
    return {
      id,
      name: module.name,
      icon: module.icon,
      kicker: module.name,
      title: feature.title,
      body: feature.body,
      points: feature.points,
      visual: <SpecialVisual kind={feature.visual} />,
    };
  }),
};

const order: Pack[] = ['base', 'portal', 'premium'];
const packIcons: Record<Pack, IconName> = { base: 'layers', portal: 'distribution', premium: 'rocket' };
const counts: Record<Pack, number> = {
  base: byPack('base').length,
  portal: byPack('portal').length || portalList.length,
  premium: byPack('premium').length,
};

/* Links anywhere on the page (nav, footer, mega-menu, platform diagram) open the matching package. */
const anchors: Record<string, number> = { '#modules': 0, '#portals': 1, '#premium': 2 };

/** One package: its featured modules as a vertical tab list beside a panel with the module's story and screen. */
function PackageView({ pack, initial = 0 }: { pack: Pack; initial?: number }) {
  const list = items[pack];
  const copy = explore.packages[pack];
  const { active, tabProps, panelProps } = useTabs(list.length, `xp-${pack}`, initial);
  const item = list[active];

  return (
    <div className="xp__stage">
      <div className="xp__rail">
        <div className="xp__tabs" role="tablist" aria-label={copy.tab} aria-orientation="vertical">
          {list.map((entry, index) => (
            <button key={entry.id} type="button" className="xp__tab" {...tabProps(index)}>
              <span className="xp__tab-icon">
                <Icon name={entry.icon} size={20} />
              </span>
              <span className="xp__tab-name">{entry.name}</span>
            </button>
          ))}
        </div>
        {copy.all && (
          <button type="button" className="xp__all" onClick={openCatalogue}>
            <Icon name="layers" size={16} />
            {copy.all.replace('{n}', String(counts[pack]))}
            <Icon name="arrow" size={14} className="btn__arrow" />
          </button>
        )}
      </div>

      <div className="xp__panel" data-shot={item.shot || undefined} {...panelProps}>
        <div className="xp__text" key={`${item.id}-text`}>
          <p className="xp__kicker">{item.kicker}</p>
          <h3 className="xp__title">{item.title}</h3>
          <p className="xp__body">{item.body}</p>
          <ul className="xp__points">
            {item.points.map((point, i) => (
              <li key={point} style={vars({ '--i': i })}>
                <Icon name="check" size={16} />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="xp__visual" key={`${item.id}-visual`} data-shot={item.shot || undefined}>
          {item.visual}
        </div>
      </div>
    </div>
  );
}

/**
 * Explore the platform: the Base package, the Portals and the Premium package as three tabs, each showing
 * its strongest modules in full (story, capabilities, an illustrative screen). The full catalogue is one
 * click away in the Platform menu. Replaces the earlier three sections (snapshot in legacy/).
 */
export function Explore() {
  const { active, select, tabProps, panelProps } = useTabs(order.length, 'pack');
  const pack = order[active];
  // A link elsewhere can ask for one module (data-module="tms"); n remounts the package view to apply it.
  const [focus, setFocus] = useState<{ id: string; n: number } | null>(null);
  const initial = focus
    ? Math.max(
        0,
        items[pack].findIndex((item) => item.id === focus.id),
      )
    : 0;

  // Old anchors keep working: #modules, #portals and #premium scroll here (the markers below) and pick the tab.
  useEffect(() => {
    const fromHash = (hash: string) => {
      if (hash in anchors) select(anchors[hash]);
    };
    fromHash(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href') ?? '';
      fromHash(hash);
      const id = link.dataset.module;
      if (id && hash in anchors) setFocus((f) => ({ id, n: (f?.n ?? 0) + 1 }));
    };
    const onHash = () => fromHash(window.location.hash);
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHash);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHash);
    };
  }, [select]);

  return (
    <section id="explore" className="section xp" aria-labelledby="xp-title">
      <span id="modules" className="xp__anchor" aria-hidden="true" />
      <span id="portals" className="xp__anchor" aria-hidden="true" />
      <span id="premium" className="xp__anchor" aria-hidden="true" />

      <div className="page">
        <header className="head head--split" data-reveal>
          <h2 id="xp-title" className="h2">
            {explore.title} <span className="soft">{explore.titleSoft}</span>
          </h2>
          <p className="lead">{explore.lead}</p>
        </header>

        <div className="xp__packs" role="tablist" aria-label="Packages" data-reveal>
          {order.map((key, index) => {
            const copy = explore.packages[key];
            return (
              <button key={key} type="button" className="xp__pack" data-pack={key} {...tabProps(index)}>
                <span className="xp__pack-icon">
                  <Icon name={packIcons[key]} size={20} />
                </span>
                <span className="xp__pack-text">
                  <span className="xp__pack-name">{copy.tab}</span>
                  <span className="xp__pack-blurb">{copy.blurb}</span>
                </span>
                <span className="xp__pack-count num">
                  {counts[key]}
                  <small>{copy.unit}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="xp__body-wrap" data-pack={pack} data-reveal {...panelProps} tabIndex={-1}>
          <PackageView key={`${pack}-${focus?.n ?? 0}`} pack={pack} initial={initial} />
        </div>

        <InlineCta {...inlineCtas.modules} />
      </div>
    </section>
  );
}
