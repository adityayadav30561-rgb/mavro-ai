import { Icon } from '../components/Icon';
import './article-list.css';

export interface ArticleItem {
  href: string;
  title: string;
  summary: string;
  /** A short line above the title, e.g. the date the facts were checked. */
  meta?: string;
}

/**
 * Articles as a list of cards: a small meta line, the title, a one-line summary and an arrow. The /blog list and the
 * guides on a module page.
 */
export function ArticleList({ items }: { items: readonly ArticleItem[] }) {
  return (
    <ul className="alist">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href}>
            {item.meta && <small>{item.meta}</small>}
            <b>{item.title}</b>
            <span>{item.summary}</span>
            <Icon name="arrow" size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
}
