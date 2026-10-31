import './prose.css';

/**
 * Long-form text (Company, Privacy, Terms, blog posts): headed sections of paragraphs at a readable measure, with
 * an optional "last updated" line.
 */
export function Prose({ sections, updated }: { sections: readonly { heading?: string; paragraphs: readonly string[] }[]; updated?: string }) {
  return (
    <div className="prose">
      {updated && <p className="prose__updated">{updated}</p>}
      {sections.map((section, index) => (
        <section key={section.heading ?? index}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
