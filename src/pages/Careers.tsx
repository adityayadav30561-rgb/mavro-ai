import { PageHero } from '../blocks/PageHero';
import { sectionClass } from '../blocks/SectionHead';
import { Icon } from '../components/Icon';
import { careersPage, openings } from '../data/company';
import { site } from '../data/site';
import './company-pages.css';

/**
 * Careers: the open roles in src/data/company.ts, each applied for by email. The route exists only once there are
 * openings (src/routes.ts), so menus and the footer show "Careers" only then.
 */
export function Page() {
  return (
    <>
      <PageHero variant="simple" title={careersPage.title} rest={careersPage.rest} lead="" treatment="grad" />
      <section id="openings" className={sectionClass('paper', '')}>
          <div className="page">
        <ul className="cp__list">
          {openings.map((opening) => (
            <li key={opening.title}>
              <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Application: ${opening.title}`)}`}>
                <small>
                  {opening.location} · {opening.type}
                </small>
                <b>{opening.title}</b>
                <span>{opening.summary}</span>
                <span className="cp__apply">
                  {careersPage.apply}
                  <Icon name="arrow" size={16} />
                </span>
              </a>
            </li>
          ))}
        </ul>
        </div>
        </section>
    </>
  );
}
