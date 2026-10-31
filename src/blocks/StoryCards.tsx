import { Icon } from '../components/Icon';
import { hasPage } from '../links';
import { vars } from '../motion/hooks';
import { useHref } from '../routing';
import './story-cards.css';

export interface Story {
  sector: string;
  stack?: string;
  client: string;
  project: string;
  /** The headline result. `before` is optional: a single figure shows on its own. */
  result: { before?: string; after: string; label: string };
  challenge: string;
  built: string;
  points: string[];
  /** Related modules: a link goes to its `page` once that page exists (src/routes.ts), until then to `href`, where on
   *  the homepage a `module` link opens that module in Explore the platform. */
  links: { label: string; href: string; page?: string; module?: string }[];
}

/**
 * Customer stories as glass case cards, each led by its result (a muted before figure, an arrow, the after
 * figure in the brand sweep), then the client, what was built, three deliverables and related modules. Drawn for
 * a dark band (section--night). Never add names, quotes or figures that are not in the decks.
 */
export function StoryCards({ stories }: { stories: readonly Story[] }) {
  const href = useHref();

  return (
    <ol className="proof__stories" data-count={stories.length}>
      {stories.map((story, index) => (
        <li key={story.project} className="proof__story" data-reveal style={vars({ '--i': index })}>
          <article aria-labelledby={`story-${index}`}>
            <div className="proof__tags">
              <span>{story.sector}</span>
              {story.stack && <span data-stack>{story.stack}</span>}
            </div>

            <p className="proof__client">{story.client}</p>

            <p className="proof__result">
              {story.result.before && (
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
              {story.links.map((link) => {
                const page = link.page && hasPage(link.page) ? link.page : null;
                return (
                  <a key={link.label} href={href(page ?? link.href)} data-module={page ? undefined : link.module}>
                    {link.label}
                    <Icon name="arrow" size={14} />
                  </a>
                );
              })}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
