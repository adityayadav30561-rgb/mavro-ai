import { Fragment } from 'react';

/**
 * Plain text with one markup, [link text](/path), turned into links (article bodies, src/data/posts/). Internal
 * paths get a plain link; external ones open in a new tab.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!link) return <Fragment key={index}>{part}</Fragment>;
        const [, label, href] = link;
        const external = /^https?:/.test(href);
        return (
          <a key={index} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
            {label}
          </a>
        );
      })}
    </>
  );
}

/** The text without its link markup (word counts, meta descriptions). */
export const plainText = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
