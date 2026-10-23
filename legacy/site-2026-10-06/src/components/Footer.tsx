import { site } from '../data/site';
import { Logo } from './Logo';
import './footer.css';

const groups = [
  {
    title: 'Platform',
    links: [
      { label: 'One source of truth', href: '#platform' },
      { label: 'Production and quality', href: '#production' },
      { label: 'Every team, one truth', href: '#visibility' },
      { label: 'Control', href: '#control' },
    ],
  },
  {
    title: 'Flows',
    links: [
      { label: 'Order to cash', href: '#order-to-cash' },
      { label: 'Procure to pay', href: '#procure-to-pay' },
      { label: 'Industries', href: '#industries' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="page footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>One business. One system. One flow.</p>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="footer__title">{group.title}</p>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="page footer__legal">
        <p>
          © 2026 {site.company}. {site.name} is a product of {site.company}.
        </p>
        <p>Product screens are shown with illustrative sample data.</p>
      </div>
    </footer>
  );
}
