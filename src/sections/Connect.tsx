import { Icon } from '../components/Icon';
import { InlineCta } from '../components/InlineCta';
import { connect, inlineCtas } from '../data/home';
import { vars } from '../motion/hooks';
import './connect.css';

function Link({ label, note, both }: { label: string; note: string; both?: boolean }) {
  return (
    <div className="cx__link" data-both={both || undefined} aria-hidden="true">
      <span className="cx__link-label">{label}</span>
      <span className="cx__wire">
        <span className="cx__packet" />
        {both && <span className="cx__packet cx__packet--back" />}
      </span>
      <span className="cx__link-note">{note}</span>
    </div>
  );
}

/**
 * ERP Connect: how MAVRO sits alongside SAP, Oracle, Tally and legacy ERPs. Taken from the integration
 * architecture page of the ERP Connectivity deck: every ERP syncs two ways with the MAVRO Database, the only
 * integration broker; the MAVRO App reads and writes that database; users never touch the ERP directly. A
 * focus section, so it is one of the page's two dark bands; the five benefits come from the deck's slide 5.
 */
export function Connect() {
  return (
    <section id="connect" className="section section--night cx" aria-labelledby="cx-title">
      <div className="cx__glow" aria-hidden="true" />
      <div className="page">
        <header className="head head--split" data-reveal>
          <h2 id="cx-title" className="h2">
            {connect.title} <span className="grad-text">{connect.titleSoft}</span>
          </h2>
          <p className="lead">{connect.lead}</p>
        </header>

        <figure className="cx__board" data-reveal data-live>
          <div className="cx__map">
            <div className="cx__col cx__col--systems">
              <p className="cx__heading">{connect.columns[0]}</p>
              <ul className="cx__systems">
                {connect.systems.map((system) => (
                  <li key={system.name}>
                    <b>{system.name}</b>
                    <span>{system.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link label={connect.external.label} note={connect.external.note} both />

            <div className="cx__platform">
              <p className="cx__heading">{connect.columns[1]}</p>
              <div className="cx__platform-row">
                <div className="cx__hub cx__hub--db">
                  <span className="cx__hub-icon">
                    <Icon name="database" />
                  </span>
                  <b>{connect.broker.name}</b>
                  <span className="cx__role">{connect.broker.role}</span>
                  <ul>
                    {connect.broker.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <Link label={connect.internal.label} note={connect.internal.note} both />

                <div className="cx__hub cx__hub--app">
                  <span className="cx__hub-icon">
                    <Icon name="phone" />
                  </span>
                  <b>{connect.app.name}</b>
                  <span className="cx__role">{connect.app.role}</span>
                  <ul>
                    {connect.app.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Link label="" note="" />

            <div className="cx__col cx__col--users">
              <p className="cx__heading">{connect.columns[2]}</p>
              <div className="cx__users">
                <span className="cx__hub-icon">
                  <Icon name="people" />
                </span>
                <b>{connect.users.name}</b>
                <ul>
                  {connect.users.groups.map((group) => (
                    <li key={group}>{group}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <figcaption className="cx__rule">
            <span className="cx__rule-mark" aria-hidden="true">
              ✕
            </span>
            <p>
              <b>{connect.rule}.</b> {connect.ruleBody}
            </p>
          </figcaption>
        </figure>

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
