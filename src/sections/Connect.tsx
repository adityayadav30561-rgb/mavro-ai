import { ConnectBoard } from '../blocks/ArchitectureDiagram';
import { InlineCta } from '../blocks/InlineCta';
import { SectionHead } from '../blocks/SectionHead';
import { Icon } from '../components/Icon';
import { connect, inlineCtas } from '../data/home';
import { vars } from '../motion/hooks';
import './connect.css';

/**
 * ERP Connect: how MAVRO sits alongside SAP, Oracle, Tally and legacy ERPs. Taken from the integration
 * architecture page of the ERP Connectivity deck, drawn by blocks/ArchitectureDiagram (ConnectBoard). A focus
 * section, so it is one of the page's two dark bands; the five benefits come from the deck's slide 5.
 */
export function Connect() {
  return (
    <section id="connect" className="section section--night cx" aria-labelledby="cx-title">
      <div className="cx__glow" aria-hidden="true" />
      <div className="page">
        <SectionHead
          id="cx-title"
          title={connect.title}
          rest={connect.titleSoft}
          treatment="grad"
          lead={connect.lead}
        />

        <ConnectBoard data={connect} />

        <ul className="cx__benefits" aria-label="What MAVRO Connect changes">
          {connect.benefits.map((benefit, index) => (
            <li key={benefit.title} data-reveal style={vars({ '--i': index })}>
              <span className="cx__benefit-icon">
                <Icon name={benefit.icon} size={20} />
              </span>
              <b>{benefit.title}</b>
              <p>{benefit.body}</p>
            </li>
          ))}
        </ul>

        <InlineCta {...inlineCtas.connect} tone="dark" />
      </div>
    </section>
  );
}
