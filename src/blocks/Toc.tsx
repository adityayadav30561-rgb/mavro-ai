import './toc.css';

/** A page's contents: links to its sections (blog articles' sidebar, and above the text on small screens). */
export function Toc({ title, items }: { title: string; items: readonly { id: string; label: string }[] }) {
  return (
    <nav className="toc" aria-label={title}>
      <p>{title}</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
