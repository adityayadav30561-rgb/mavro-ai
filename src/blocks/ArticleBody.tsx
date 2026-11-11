import { Icon } from '../components/Icon';
import { Screen, type ScreenName } from '../components/Screen';
import { BarChart, type BarChartProps } from './BarChart';
import { RichText } from './RichText';
import './article-body.css';

export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: readonly string[]; ordered?: boolean }
  | { kind: 'table'; caption: string; head: readonly string[]; rows: readonly (readonly string[])[]; note?: string }
  | { kind: 'figure'; screen: ScreenName; alt: string; caption: string; note: string }
  | ({ kind: 'chart' } & BarChartProps)
  | { kind: 'callout'; tone: 'tip' | 'note' | 'warning'; title: string; text: string }
  | { kind: 'steps'; items: readonly { title: string; text: string }[] };

interface ArticleBodyProps {
  takeawaysTitle: string;
  takeaways: readonly string[];
  sections: readonly { id: string; heading: string; blocks: readonly ArticleBlock[] }[];
}

const calloutIcon = { tip: 'check', note: 'eye', warning: 'shield' } as const;

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className="abody__list">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case 'table':
      return (
        // Focusable and labelled, because a wide table scrolls sideways inside this box on phones.
        <div className="abody__table" role="region" aria-label={block.caption} tabIndex={0}>
          <table>
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        <RichText text={cell} />
                      </th>
                    ) : (
                      <td key={i}>
                        <RichText text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {block.note && <p className="abody__note">{block.note}</p>}
        </div>
      );
    case 'figure':
      return (
        <figure className="abody__figure">
          <div className="abody__shot">
            <Screen name={block.screen} alt={block.alt} sizes="(max-width: 1023px) 94vw, 48rem" />
          </div>
          <figcaption>
            {block.caption} <span>{block.note}</span>
          </figcaption>
        </figure>
      );
    case 'chart':
      return <BarChart {...block} />;
    case 'callout':
      return (
        <div className="abody__callout" data-tone={block.tone}>
          <Icon name={calloutIcon[block.tone]} size={18} />
          <div>
            <b>{block.title}</b>
            <p>
              <RichText text={block.text} />
            </p>
          </div>
        </div>
      );
    case 'steps':
      return (
        <ol className="abody__steps">
          {block.items.map((item, i) => (
            <li key={item.title}>
              <span className="abody__step num">{i + 1}</span>
              <div>
                <b>{item.title}</b>
                <p>
                  <RichText text={item.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
  }
}

/**
 * A long-form article's body (blog posts): a key-takeaways box first, then question-headed sections whose blocks are
 * short paragraphs, lists, tables, module screens, bar charts, callouts and numbered steps, at a readable measure with
 * visuals spanning the column. `data-words` marks what qa/postcheck.cjs counts.
 */
export function ArticleBody({ takeawaysTitle, takeaways, sections }: ArticleBodyProps) {
  return (
    <div className="abody">
      {takeaways.length > 0 && (
      <section className="abody__takeaways" aria-labelledby="takeaways-title" data-words>
        <h2 id="takeaways-title">{takeawaysTitle}</h2>
        <ul>
          {takeaways.map((item) => (
            <li key={item}>
              <Icon name="check" size={16} />
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </section>
      )}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="abody__section" aria-labelledby={`${section.id}-h`} data-words>
          <h2 id={`${section.id}-h`}>{section.heading}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}
