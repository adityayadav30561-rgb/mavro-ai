import { Icon } from '../components/Icon';
import { clients, hero } from '../data/home';
import { cta } from '../data/site';
import { vars } from '../motion/hooks';
import { HeroScene } from './hero/HeroScene';
import './hero.css';

const logos = import.meta.glob<string>('../assets/clients/*.webp', { eager: true, import: 'default' });

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
          <HeroScene />
        </div>
      </div>

      <div className="hero__band" data-live>
        <p className="hero__band-label">{hero.clientsLabel}</p>
        <div className="hero__marquee">
          <div className="hero__track">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-label={copy ? undefined : 'Clients'} aria-hidden={copy ? true : undefined}>
                {clients.map((client) => (
                  <li key={client.file}>
                    <img
                      src={logos[`../assets/clients/${client.file}.webp`]}
                      alt={copy ? '' : client.name}
                      decoding="async"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
