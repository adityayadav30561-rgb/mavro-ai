import { Icon, type IconName } from '../components/Icon';
import './contact-card.css';

interface ContactCardProps {
  title: string;
  rows: readonly { icon: IconName; label: string; value: string; href?: string; lines?: readonly string[] }[];
}

/** Direct contact at a glance (Contact hero visual): email, phone and the head office address, each one tap away. */
export function ContactCard({ title, rows }: ContactCardProps) {
  return (
    <figure className="ccard" data-reveal>
      <figcaption>{title}</figcaption>
      <ul>
        {rows.map((row) => (
          <li key={row.label}>
            <span className="ccard__icon">
              <Icon name={row.icon} size={18} />
            </span>
            <span>
              <small>{row.label}</small>
              {row.href ? <a href={row.href}>{row.value}</a> : <b>{row.value}</b>}
              {row.lines?.map((line) => (
                <span key={line} className="ccard__line">
                  {line}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
