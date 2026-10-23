import { useEffect, useState } from 'react';
import { openCatalogue } from '../components/catalogue';
import { Icon } from '../components/Icon';
import { notFound } from '../data/pages';
import { vars } from '../motion/hooks';
import { useHref } from '../routing';
import './not-found.css';

/**
 * The 404 page (dist/404.html, served by the host for any unknown URL). The visual is a record lookup in the
 * product's own language: the requested address in the search field, "No match", and the closest destinations
 * as real links. The address is filled in after hydration; the prerendered file shows a neutral placeholder.
 */
export function Page() {
  const href = useHref();
  const [path, setPath] = useState<string>(notFound.lookup.fallbackPath);

  useEffect(() => {
    if (window.location.pathname !== '/404' && window.location.pathname !== '/404.html') {
      setPath(decodeURI(window.location.pathname));
    }
  }, []);

  return (
    <section className="section nf" aria-labelledby="nf-title">
      <div className="nf__bg" aria-hidden="true" />
      <div className="page nf__grid">
        <div className="nf__copy" data-reveal>
          <h1 id="nf-title" className="display nf__title">
            {notFound.title} <span className="grad-text">{notFound.titleGrad}</span>
          </h1>
          <p className="lead">{notFound.lead}</p>
          <div className="nf__actions">
            <a className="btn btn--primary" href="/">
              {notFound.home}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </a>
            <button type="button" className="btn btn--ghost" onClick={openCatalogue}>
              {notFound.catalogue}
            </button>
          </div>
        </div>

        <div className="nf__card" data-reveal style={vars({ '--i': 2 })}>
          <div className="nf__bar">
            <span>{notFound.lookup.label}</span>
            <span className="nf__code num" aria-hidden="true">
              404
            </span>
          </div>
          <div className="nf__search">
            <Icon name="link" size={18} />
            <span className="nf__path" title={path}>
              {path}
            </span>
            <span className="chip chip--warn">
              <span className="chip__dot" />
              {notFound.lookup.status}
            </span>
          </div>
          <p className="nf__suggest" id="nf-suggest">
            {notFound.lookup.suggest}
          </p>
          <ul className="nf__links" aria-labelledby="nf-suggest">
            {notFound.links.map((link) => (
              <li key={link.label}>
                <a className="nf__link" href={href(link.href)}>
                  <span className="nf__icon">
                    <Icon name={link.icon} size={20} />
                  </span>
                  <span className="nf__text">
                    <b>{link.label}</b>
                    <span>{link.body}</span>
                  </span>
                  <Icon name="arrow" size={16} className="nf__arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
