import { Icon } from '../components/Icon';
import { portals } from '../data/home';
import { channelPortals, vendorPortal, type Portal } from '../data/modules';
import { vars } from '../motion/hooks';
import './portals.css';

/* The chain the portals sit on, in the order goods move. */
const chain = [
  { name: 'Vendors', link: 'Supply' },
  { name: portals.company, link: 'Primary sales', core: true },
  { name: 'Distributors', link: 'Secondary sales' },
  { name: 'Dealers', link: 'Tertiary sales' },
  { name: 'Retailers' },
];

function PortalCard({ portal, index }: { portal: Portal; index: number }) {
  return (
    <li className="portal" data-side={portal.id === 'vendor' ? 'supply' : 'channel'} data-reveal style={vars({ '--i': index })}>
      <div className="portal__top">
        <span className="portal__layer">{portal.layer}</span>
      </div>
      <h3 className="h3">{portal.name}</h3>
      <p className="portal__who">For {portal.who.toLowerCase()}</p>
      <p className="portal__body">{portal.body}</p>
      <ul className="portal__points">
        {portal.points.map((point) => (
          <li key={point}>
            <Icon name="check" size={14} />
            {point}
          </li>
        ))}
      </ul>
    </li>
  );
}

/**
 * The Portal package: the supply side and the three layers of the sales channel, drawn first as the chain
 * goods travel along, then as one card per portal.
 */
export function Portals() {
  return (
    <section id="portals" className="section portals" aria-labelledby="portals-title">
      <div className="page">
        <header className="head head--split" data-reveal>
          <h2 id="portals-title" className="h2">
            {portals.title} <span className="soft">{portals.titleSoft}</span>
          </h2>
          <p className="lead">{portals.lead}</p>
        </header>

        <ol className="chain" data-live data-reveal aria-label="Where each portal sits, from supplier to retailer">
          {chain.map((node) => (
            <li key={node.name} className="chain__step" data-core={node.core || undefined}>
              <span className="chain__node">{node.name}</span>
              {node.link && (
                <span className="chain__link">
                  <span className="chain__line" aria-hidden="true" />
                  <span className="chain__label">{node.link}</span>
                </span>
              )}
            </li>
          ))}
        </ol>

        <ul className="portals__grid">
          <PortalCard portal={vendorPortal} index={0} />
          {channelPortals.map((portal, i) => (
            <PortalCard key={portal.id} portal={portal} index={i + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
