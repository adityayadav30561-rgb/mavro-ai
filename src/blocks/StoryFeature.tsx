import { Icon } from '../components/Icon';
import { hasPage } from '../links';
import { vars } from '../motion/hooks';
import { useHref } from '../routing';
import type { Story } from './StoryCards';
import './story-feature.css';

interface StoryFeatureProps {
  stories: readonly Story[];
  labels: { challenge: string; built: string; delivered: string; modules: string; result: string };
}

/**
 * Customer stories in full (Customers page): one wide card per story, its result on a navy panel at the left
 * (the before figure struck through, the after figure in the brand sweep) and the challenge, what was built, what
 * it delivered and the modules on the right. Below 1024px the panel sits on top. Never add names, quotes or
 * figures that are not in the decks.
 */
export function StoryFeature({ stories, labels }: StoryFeatureProps) {
  const href = useHref();

  return (
    <ol className="sfeat">
      {stories.map((story, index) => (
        <li key={story.project} className="sfeat__item" data-reveal style={vars({ '--i': index })}>
          <article aria-labelledby={`sfeat-${index}`}>
            <div className="sfeat__result">
              <div className="sfeat__tags">
                <span>{story.sector}</span>
                {story.stack && <span data-stack>{story.stack}</span>}
              </div>
              <p className="sfeat__label">{labels.result}</p>
              {story.result.before && (
                <p className="sfeat__before num">
                  <s>{story.result.before}</s>
                  <Icon name="arrow" size={18} />
                </p>
              )}
              <p className="sfeat__after num">{story.result.after}</p>
              <p className="sfeat__what">{story.result.label}</p>
              <p className="sfeat__client">{story.client}</p>
            </div>

            <div className="sfeat__body">
              <h3 id={`sfeat-${index}`}>{story.project}</h3>
              <dl className="sfeat__story">
                <div>
                  <dt>{labels.challenge}</dt>
                  <dd>{story.challenge}</dd>
                </div>
                <div>
                  <dt>{labels.built}</dt>
                  <dd>{story.built}</dd>
                </div>
              </dl>
              <p className="sfeat__sub">{labels.delivered}</p>
              <ul className="sfeat__points">
                {story.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={15} />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="sfeat__sub">{labels.modules}</p>
              <div className="sfeat__links">
                {story.links.map((link) => {
                  const page = link.page && hasPage(link.page) ? link.page : null;
                  return (
                    <a key={link.label} href={href(page ?? link.href)}>
                      {link.label}
                      <Icon name="arrow" size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
