import { FlowRail } from '../components/FlowRail';
import { site } from '../data/site';
import { o2c } from '../data/story';
import './final-cta.css';

const railItems = o2c.map((stage) => ({ label: stage.label }));

export function FinalCta() {
  return (
    <section id="demo" className="section cta" aria-labelledby="cta-title">
      <div className="page">
        <div className="cta__panel">
        {/* The flow from the hero, now complete. */}
        <div className="cta__rail" aria-hidden="true" data-reveal>
          <FlowRail items={railItems} active={railItems.length} fill={1} />
        </div>
        <h2 id="cta-title" className="display" data-reveal>
          See your business <span className="hero__accent">as one system.</span>
        </h2>
        <p className="lead" data-reveal>
          A walkthrough built around your own process: your documents, your approvals, your numbers.
        </p>
        <div className="cta__actions" data-reveal>
          <a className="btn btn--primary" href={site.contactHref}>
            Book a demo
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn--ghost" href="#platform">
            Replay the flow
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
