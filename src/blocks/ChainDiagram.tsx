import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './chain-diagram.css';

export interface ChainNode {
  id: string;
  name: string;
  icon: IconName;
  /** Label of the link to the next node; null on the last node. */
  link: string | null;
}

interface ChainDiagramProps {
  title: string;
  /** In the order goods move: vendors, your business, distributors, dealers, retailers. */
  nodes: readonly ChainNode[];
  /** The node that is the business itself (drawn as the core). */
  core: string;
  /** The lit node; its badge reads `badge`. The link it serves lights too. Omit it to light every portal and link. */
  active?: string;
  badge: string;
}

/**
 * The supply-to-retail chain with one node lit: the portal's place in the chain goods move along. A node before
 * the core serves the link after it (vendors: supply); a node after the core, the link before it (dealers: the
 * distributors' secondary sales). Decorative: the text beside it says the same in words.
 */
export function ChainDiagram({ title, nodes, core, active, badge }: ChainDiagramProps) {
  const at = nodes.findIndex((node) => node.id === active);
  const lit = at < nodes.findIndex((node) => node.id === core) ? at : at - 1;
  const all = !active;

  return (
    <figure className="pc" aria-hidden="true">
      <figcaption className="pc__title">{title}</figcaption>
      <ol className="pc__chain">
        {nodes.map((node, index) => (
          <li
            key={node.id}
            className="pc__step"
            data-on={(all ? node.id !== core : node.id === active) || undefined}
            data-core={node.id === core || undefined}
            style={vars({ '--i': index })}
          >
            <span className="pc__node">
              <span className="pc__icon">
                <Icon name={node.icon} size={18} />
              </span>
              <b>{node.name}</b>
              {node.id === active && <span className="pc__badge">{badge}</span>}
            </span>
            {node.link && (
              <span className="pc__link" data-on={(all || index === lit) || undefined}>
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
