import { areaOrder, areas, byArea, channelPortals, packHref, packs, vendorPortal } from '../data/modules';
import { Icon } from './Icon';

interface PlatformMenuProps {
  id: string;
  open: boolean;
  onNavigate: () => void;
}

const portals = [vendorPortal, ...channelPortals];

/**
 * The Platform mega-menu: every module, grouped by business area, with the portals alongside. A disclosure,
 * not an ARIA menu, so it is read and tabbed like ordinary links.
 */
export function PlatformMenu({ id, open, onNavigate }: PlatformMenuProps) {
  return (
    <div id={id} className="mega" data-open={open || undefined} hidden={!open}>
      <div className="mega__panel">
        <div className="mega__cols">
          {areaOrder.map((area) => (
            <div key={area} className="mega__col">
              <p className="mega__tier">{areas[area]}</p>
              <ul>
                {byArea(area).map((module) => (
                  <li key={module.id}>
                    <a href={packHref(module)} className="mega__link" onClick={onNavigate}>
                      <Icon name={module.icon} size={16} />
                      <span>{module.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="mega__aside">
          <p className="mega__tier">{packs.portal.name}</p>
          <ul className="mega__portals">
            {portals.map((portal) => (
              <li key={portal.id}>
                <a href={packs.portal.href} onClick={onNavigate}>
                  <span className="mega__portal-layer">{portal.layer}</span>
                  <span className="mega__name">{portal.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mega__aside-foot">
            <p className="mega__aside-body">Already on SAP, Oracle or Tally? MAVRO works alongside your ERP.</p>
            <a href="#connect" className="link" onClick={onNavigate}>
              ERP Connect
              <Icon name="arrow" size={16} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
