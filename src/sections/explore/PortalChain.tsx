import { Icon, type IconName } from '../../components/Icon';
import { explore } from '../../data/home';
import { vars } from '../../motion/hooks';
import './portal-chain.css';

const icons: Record<string, IconName> = {
  vendor: 'procurement',
  company: 'layers',
  distributor: 'distribution',
  dealer: 'warehouse',
  retailer: 'sales',
};

/* Which link carries each portal's traffic: the one between it and the node before or after it. */
const linkOf: Record<string, number> = { vendor: 0, distributor: 1, dealer: 2, retailer: 3 };

/**
 * The portal's place in the chain goods move along: vendors, your business, distributors, dealers,
 * retailers. The selected portal and the link it serves light up; the rest stay quiet. Decorative: the
 * panel text beside it says the same in words.
 */
export function PortalChain({ active }: { active: string }) {
  const lit = linkOf[active];

  return (
    <figure className="pc" aria-hidden="true">
      <figcaption className="pc__title">{explore.chainTitle}</figcaption>
      <ol className="pc__chain">
        {explore.chain.map((node, index) => (
          <li
            key={node.id}
            className="pc__step"
            data-on={node.id === active || undefined}
            data-core={node.id === 'company' || undefined}
            style={vars({ '--i': index })}
          >
            <span className="pc__node">
              <span className="pc__icon">
                <Icon name={icons[node.id]} size={18} />
              </span>
              <b>{node.name}</b>
              {node.id === active && <span className="pc__badge">Portal</span>}
            </span>
            {node.link && (
              <span className="pc__link" data-on={index === lit || undefined}>
                <span className="pc__line" />
                <span className="pc__label">{node.link}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
