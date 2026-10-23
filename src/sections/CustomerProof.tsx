import { Icon } from '../components/Icon';
import { proof } from '../data/home';
import { vars } from '../motion/hooks';
import './customer-proof.css';

/**
 * Customer stories: three anonymised implementations from the product deck (slide 23), each as a short case:
 * client and sector, the headline result, where they started, what was built, three deliverables, and links
 * to the related modules (a `module` link opens that module in Explore the platform). A dark band, between the
 * white Why MAVRO and the paper FAQ. Renders nothing if `proof` is ever emptied.
 */
export function CustomerProof() {
  if (proof.logos.length === 0 && proof.stories.length === 0) return null;

  return (
    <section id="stories" className="section section--night proof" aria-labelledby="proof-title">
      <div className="proof__glow" aria-hidden="true" />
      <div className="page">
        <header className="head head--split" data-reveal>
          <h2 id="proof-title" className="h2">
            {proof.title} <span className="mark">{proof.titleMark}</span>
          </h2>
          <p className="lead">{proof.lead}</p>
        </header>

        <ol className="proof__stories">
          {proof.stories.map((story, index) => (
            <li key={story.project} className="proof__story" data-reveal style={vars({ '--i': index })}>
              <article aria-labelledby={`story-${index}`}>
                <div className="proof__tags">
                  <span>{story.sector}</span>
                  {'stack' in story && story.stack && <span data-stack>{story.stack}</span>}
                </div>

                <p className="proof__client">{story.client}</p>

                <p className="proof__result">
                  {'before' in story.result && story.result.before && (
                    <span className="proof__before num">
                      {story.result.before}
                      <Icon name="arrow" size={18} />
                    </span>
                  )}
                  <b className="num">{story.result.after}</b>
                  <span className="proof__label">{story.result.label}</span>
                </p>

                <h3 id={`story-${index}`} className="proof__project">
                  {story.project}
                </h3>
                <p className="proof__text">
                  <span>{story.challenge}</span> {story.built}
                </p>

                <ul className="proof__points">
                  {story.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={15} />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="proof__links">
                  {story.links.map((link) => (
                    <a key={link.label} href={link.href} data-module={'module' in link ? link.module : undefined}>
                      {link.label}
                      <Icon name="arrow" size={14} />
                    </a>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
