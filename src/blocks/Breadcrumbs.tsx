import { Icon } from '../components/Icon';
import { crumbTarget } from '../links';
import { useCrumbs } from '../routing';
import './breadcrumbs.css';

/**
 * Home / Base modules / Order to Cash, from the route's crumbs (src/routes.ts), so the visible trail and the
 * BreadcrumbList structured data in the head always agree. The last crumb is the current page; a crumb whose page
 * does not exist yet links to its fallback (src/links.ts).
 */
export function Breadcrumbs() {
  const crumbs = useCrumbs();
  if (crumbs.length === 0) return null;
  const trail = [{ name: 'Home', path: '/' }, ...crumbs];

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((crumb, index) => (
          <li key={crumb.path}>
            {index > 0 && <Icon name="chevron" size={14} className="crumbs__sep" />}
            {index === trail.length - 1 ? (
              <span aria-current="page">{crumb.name}</span>
            ) : (
              <a href={crumbTarget(crumb)}>{crumb.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
