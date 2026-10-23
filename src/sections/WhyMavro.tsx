import { Icon } from '../components/Icon';
import { why } from '../data/home';
import { vars } from '../motion/hooks';
import { TrustPanel } from '../blocks/TrustPanel';
import './why.css';

/**
 * The differentiating principles, as an editorial split: the claim and its evidence (India compliance and
 * security, from the product deck) on the left, sticky on wide screens; six principles as a ruled list on the
 * right. No awards or customer claims; every figure is as stated in the deck.
 */
export function WhyMavro() {
  return (
    <section id="why" className="section why" aria-labelledby="why-title">
      <div className="page why__grid">
        <div className="why__aside">
          <header className="why__head" data-reveal>
            <h2 id="why-title" className="h2">
              {why.title} <span className="soft">{why.titleSoft}</span>
            </h2>
            <p className="lead">{why.lead}</p>
          </header>

          <div className="why__trust" data-reveal style={vars({ '--i': 1 })}>
            <TrustPanel data={why.trust} />
          </div>
        </div>

        <ol className="why__list">
          {why.points.map((point, index) => (
            <li key={point.title} data-reveal style={vars({ '--i': index % 2 })}>
              <span className="why__num num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="why__icon">
                <Icon name={point.icon} />
              </span>
              <div>
                <h3 className="h3">{point.title}</h3>
                <p>{point.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
