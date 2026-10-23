import { clients, hero } from '../data/home';
import './client-band.css';

const logos = import.meta.glob<string>('../assets/clients/*.webp', { eager: true, import: 'default' });

/**
 * "Trusted by" and the client logos (the clientele slide), grey until hovered, drifting in a slow loop that pauses
 * on hover. The foot of the homepage hero and of module page heroes.
 */
export function ClientBand() {
  return (
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
  );
}
