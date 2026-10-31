import { Icon } from '../components/Icon';
import { vars } from '../motion/hooks';
import type { Story } from './StoryCards';
import './result-card.css';

/**
 * The stories' results at a glance (Customers hero visual): one row per story, its before figure struck through,
 * the after figure in the brand sweep and what it measures, on a navy card.
 */
export function ResultCard({ stories, title }: { stories: readonly Story[]; title: string }) {
  return (
    <figure className="rcard" data-reveal>
      <figcaption>{title}</figcaption>
      <ol>
        {stories.map((story, index) => (
          <li key={story.project} style={vars({ '--i': index })}>
            <span className="rcard__fig num">
              {story.result.before && (
                <s>
                  {story.result.before}
                  <Icon name="arrow" size={14} />
                </s>
              )}
              <b>{story.result.after}</b>
            </span>
            <span className="rcard__what">
              {story.result.label}
              <small>{story.sector}</small>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
