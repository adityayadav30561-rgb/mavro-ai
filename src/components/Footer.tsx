import { footerNote } from '../data/home';
import { footerColumns, legalLinks } from '../data/nav';
import { site } from '../data/site';
import { shown } from '../links';
import { useHref } from '../routing';
import { Icon } from './Icon';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import './footer.css';

/**
 * Columns from data/nav.ts (SITE-PLAN.md section 8): Platform, Popular modules, Solutions, Resources, Company.
 * Each link goes to its page once it exists, to its homepage section until then, and is left out if it has
 * neither; a column with nothing to show is left out too.
 */
export function Footer() {
  const columns = footerColumns
    .map((column) => ({ ...column, links: shown(column.links) }))
    .filter((c) => c.links.length > 0);
  const legal = shown(legalLinks);
  const href = useHref();

  return (
    <footer className="footer">
      <div className="page footer__grid">
        <div className="footer__brand">
          <a href={href('#top')} aria-label="MAVRO home">
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
        <div className="footer__cols">
          {columns.map((column) => (
            <nav key={column.title} aria-label={`Footer: ${column.title}`}>
              <p className="footer__title">{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="page footer__legal">
        <p>
          © {new Date().getFullYear()} {site.company}. {site.name} is a product of {site.company}.
        </p>
        <p>Product visuals use illustrative sample data.</p>
        {legal.length > 0 && (
          <ul>
            {legal.map((link) => (
              <li key={link.label}>
                <NavLink link={link} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
