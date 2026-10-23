import { useEffect, useState } from 'react';
import { pipelineCheck } from '../data/pages';
import './pipeline-check.css';

/**
 * Hidden page (/pipeline-check) that proves the multi-page build: its HTML is prerendered with its own head,
 * it hydrates (the rows switch to their browser state), and its chunk carries no three.js. Not linked, not in
 * the sitemap, noindex. Remove at launch QA.
 */
export function Page() {
  const [hydrated, setHydrated] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => setHydrated(true), []);

  return (
    <section className="section section--paper pcheck" aria-labelledby="pcheck-title">
      <div className="page">
        <header className="head">
          <h1 id="pcheck-title" className="h2">
            {pipelineCheck.title}
          </h1>
          <p className="lead">{pipelineCheck.lead}</p>
        </header>
        <ul className="pcheck__list" data-hydrated={hydrated || undefined}>
          {pipelineCheck.checks.map((check) => (
            <li key={check.label}>
              <span className={hydrated ? 'chip chip--ok' : 'chip'}>
                <span className="chip__dot" />
                {check.label}
              </span>
              <span>{hydrated ? check.client : check.server}</span>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn--primary pcheck__btn" onClick={() => setClicks((n) => n + 1)}>
          {pipelineCheck.button} <span className="num">({clicks})</span>
        </button>
      </div>
    </section>
  );
}
