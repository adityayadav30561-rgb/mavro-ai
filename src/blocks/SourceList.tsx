import './source-list.css';

/**
 * An article's sources and the date its facts were checked, shown on the page (not only in the data file), so readers
 * and answer engines can see where each figure comes from.
 */
export function SourceList({ sources, checked, title }: { sources: readonly { label: string; url: string }[]; checked: string; title: string }) {
  return (
    <section className="sources" aria-labelledby="sources-title">
      <h2 id="sources-title">{title}</h2>
      <p className="sources__checked">Facts checked on {checked}. Rules change: confirm the current position with the official source before acting.</p>
      <ol>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} rel="noopener" target="_blank">
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
