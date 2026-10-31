import { Icon } from '../components/Icon';
import { ClientBand } from '../blocks/ClientBand';
import { hero } from '../data/home';
import { cta } from '../data/site';
import { vars } from '../motion/hooks';
import { HeroPlant } from './hero/HeroPlant';
import './hero.css';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />

      <div className="page hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="display hero__title hero__in" style={vars({ '--i': 1 })}>
            {hero.title[0]} <span className="grad-text">{hero.title[1]}</span>
          </h1>
          <p className="lead hero__lead hero__in" style={vars({ '--i': 2 })}>
            {hero.lead}
          </p>
          <div className="hero__actions hero__in" style={vars({ '--i': 3 })}>
            <a className="btn btn--primary" href={cta.primary.href}>
              {cta.primary.label}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </a>
            <a className="btn btn--ghost" href={cta.secondary.href}>
              {cta.secondary.label}
            </a>
          </div>
          <ul className="hero__proof hero__in" style={vars({ '--i': 4 })} aria-label="Why teams choose MAVRO">
            {hero.proof.map((item) => (
              <li key={item.text}>
                <span className="hero__proof-icon">
                  <Icon name={item.icon} size={16} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__stage hero__in" style={vars({ '--i': 2 })}>
          <HeroPlant />
        </div>
      </div>

      <ClientBand />
    </section>
  );
}
