import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './flow-strip.css';

export interface FlowNode {
  name: string;
  /** A real page; nodes without one render as plain labels. */
  href?: string | null;
  icon?: IconName;
  /** One line under the name: what passes along the link (a module's inputs and outputs). */
  note?: string;
  /**
   * shared: the same in every industry (outlined); configured: set up for this industry (brand fill);
   * current: the module this page is about (emphasised).
   */
  kind?: 'shared' | 'configured' | 'current';
}

export interface FlowStage {
  /** A short label over a group, e.g. "Feeds it" / "It feeds". */
  label?: string;
  nodes: readonly FlowNode[];
}

interface FlowStripProps {
  stages: readonly FlowStage[];
  /** Explains the node styles when shared and configured stages are mixed. */
  legend?: { shared: string; configured: string };
  /** One line under the strip. */
  note?: string;
  /** columns: stages share the width (a module's inputs and outputs); chain: compact stages that wrap (long flows). */
  layout?: 'columns' | 'chain';
}

/**
 * Stages left to right with arrows between them; a stage holds one node or a group. Used for a module's place in
 * the flow (what feeds it, the module, what it feeds) and for an industry's order flow (shared ends, configured
 * middle). Runs downwards on phones. Linked nodes go to their module pages.
 */
export function FlowStrip({ stages, legend, note, layout = 'columns' }: FlowStripProps) {
  return (
    <figure className="fs" data-layout={layout} data-reveal>
      {legend && (
        <div className="fs__legend" aria-hidden="true">
          <span data-kind="shared">{legend.shared}</span>
          <span data-kind="configured">{legend.configured}</span>
        </div>
      )}
      <ol className="fs__stages">
        {stages.map((stage, index) => (
          <li key={index} className="fs__stage" style={vars({ '--i': index })}>
            {stage.label && <span className="fs__label">{stage.label}</span>}
            <ul className="fs__nodes">
              {stage.nodes.map((node) => {
                const content = (
                  <>
                    {node.icon && <Icon name={node.icon} size={18} />}
                    <span className="fs__name">
                      {node.name}
                      {node.note && <small className="fs__pass">{node.note}</small>}
                    </span>
                    {node.href && <Icon name="arrow" size={14} className="fs__arrow" />}
                  </>
                );
                return (
                  <li key={node.name}>
                    {node.href ? (
                      <a className="fs__node" data-kind={node.kind} href={node.href}>
                        {content}
                      </a>
                    ) : (
                      <span
                        className="fs__node"
                        data-kind={node.kind}
                        aria-current={node.kind === 'current' ? 'page' : undefined}
                      >
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      {note && <figcaption className="fs__note">{note}</figcaption>}
    </figure>
  );
}
