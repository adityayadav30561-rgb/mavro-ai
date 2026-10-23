import { footerNote } from '../data/home';
import { footer, legal, live, site } from '../data/site';
import { useHref } from '../routing';
import { Icon } from './Icon';
import { Logo } from './Logo';
import './footer.css';

/** Columns and links come from data/site.ts; planned links without a destination are left out. */
export function Footer() {
  const groups = footer.map((group) => ({ ...group, links: live(group.links) })).filter((g) => g.links.length > 0);
  const legalLinks = live(legal);
  const href = useHref();

  return (
    <footer className="footer">
      <div className="page footer__grid">
        <div className="footer__brand">
          <a href={href('#top')} aria-label="MAVRO, back to top">
            <Logo height={28} />
          </a>
          <p>{footerNote}</p>
          <address className="footer__contact">
            <span className="footer__office">
              <Icon name="pin" size={16} />
              <span>
                <b>{site.office.label}</b>
                <span>{site.office.street},</span>
                <span>
                  {site.office.city} {site.office.postalCode}
                </span>
              </span>
            </span>
            <a href={`tel:${site.contactPhone.replace(/\s/g, '')}`} className="num">
              <Icon name="phone" size={16} />
              {site.contactPhone}
            </a>
            <a href={`mailto:${site.contactEmail}`}>
              <Icon name="mail" size={16} />
              {site.contactEmail}
            </a>
          </address>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-label={`Footer: ${group.title}`}>
            <p className="footer__title">{group.title}</p>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={href(link.href)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="page footer__legal">
        <p>
          © {new Date().getFullYear()} {site.company}. {site.name} is a product of {site.company}.
        </p>
        <p>Product visuals use illustrative sample data.</p>
        {legalLinks.length > 0 && (
          <ul>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={href(link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
