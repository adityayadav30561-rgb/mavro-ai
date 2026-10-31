import { clients } from '../data/home';
import { vars } from '../motion/hooks';
import './logo-wall.css';

const logos = import.meta.glob<string>('../assets/clients/*.webp', { eager: true, import: 'default' });

/**
 * The clientele as a still wall (Customers page): every logo from the clientele slide in a grid of tiles, grey
 * until hovered, like the hero band but all at once.
 */
export function LogoWall() {
  return (
    <ul className="lwall" aria-label="Clients">
      {clients.map((client, index) => (
        <li key={client.file} data-reveal style={vars({ '--i': index % 5 })}>
          <img src={logos[`../assets/clients/${client.file}.webp`]} alt={client.name} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  );
}
