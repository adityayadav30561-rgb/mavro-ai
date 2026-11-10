import { Icon, type IconName } from '../components/Icon';
import './fact-card.css';

export interface FactRow {
  icon: IconName;
  label: string;
  value: string;
  /** A second, quieter line under the value. */
  note?: string;
  href?: string;
}

export interface FactChip {
  label: string;
  icon?: IconName;
  href?: string;
}

interface FactCardProps {
  /** The card's subject, e.g. "Pune" or "12 industries". */
  title: string;
  /** Under the title, e.g. "Maharashtra, India". */
  subtitle?: string;
  icon: IconName;
  rows?: readonly FactRow[];
  /** A heading over the chips, e.g. "Industrial areas". */
  chipsLabel?: string;
  chips?: readonly FactChip[];
}

/**
 * A page's key facts at a glance, a hero visual for the pages without a product screen (city, Gulf, industries hub,
 * city index, articles): a titled card with icon rows (label, value, note, optional link) and a set of chips (places,
 * industries), each a link where it has a page. Same language as the Contact card.
 */
export function FactCard({ title, subtitle, icon, rows = [], chipsLabel, chips = [] }: FactCardProps) {
  return (
    <figure className="fcard">
      <figcaption>
        <span className="fcard__mark">
          <Icon name={icon} size={20} />
        </span>
        <span>
          <b>{title}</b>
          {subtitle && <small>{subtitle}</small>}
        </span>
      </figcaption>
      {rows.length > 0 && (
        <ul className="fcard__rows">
          {rows.map((row) => (
            <li key={row.label}>
              <span className="fcard__icon">
                <Icon name={row.icon} size={16} />
              </span>
              <span>
                <small>{row.label}</small>
                {row.href ? <a href={row.href}>{row.value}</a> : <b>{row.value}</b>}
                {row.note && <span className="fcard__note">{row.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
      {chips.length > 0 && (
        <div className="fcard__chips">
          {chipsLabel && <p>{chipsLabel}</p>}
          <ul>
            {chips.map((chip) => {
              const body = (
                <>
                  {chip.icon && <Icon name={chip.icon} size={14} />}
                  {chip.label}
                </>
              );
              return <li key={chip.label}>{chip.href ? <a href={chip.href}>{body}</a> : <span>{body}</span>}</li>;
            })}
          </ul>
        </div>
      )}
    </figure>
  );
}
