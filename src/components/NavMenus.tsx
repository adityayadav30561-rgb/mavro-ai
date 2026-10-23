import {
  companyLinks,
  featuredStory,
  industryLinks,
  needLinks,
  resourceLinks,
  type NavLink as Item,
} from '../data/nav';
import { site } from '../data/site';
import { shown } from '../links';
import { Icon } from './Icon';
import { NavLink } from './NavLink';

interface MenuProps {
  id: string;
  open: boolean;
  onNavigate: () => void;
}

/** A link with an icon tile, its label and a one-line note. Hidden when it has nowhere to go yet. */
function Rich({ link, onNavigate }: { link: Item; onNavigate: () => void }) {
  return (
    <li>
      <NavLink link={link} className="drop__link" onClick={onNavigate}>
        <span className="drop__icon">
          <Icon name={link.icon ?? 'arrow'} size={18} />
        </span>
        <span className="drop__text">
          <b>{link.label}</b>
          {link.note && <span>{link.note}</span>}
        </span>
      </NavLink>
    </li>
  );
}

/** Solutions: by industry, by need, and one customer story. */
export function SolutionsMenu({ id, open, onNavigate }: MenuProps) {
  const { result } = featuredStory;
  return (
    <div id={id} className="drop drop--wide" hidden={!open}>
      <div className="drop__panel drop__panel--solutions">
        <div className="drop__col">
          <p className="mega__tier">By industry</p>
          <ul>
            {shown(industryLinks).map((link) => (
              <Rich key={link.label} link={link} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
        <div className="drop__col">
          <p className="mega__tier">By need</p>
          <ul>
            {shown(needLinks).map((link) => (
              <Rich key={link.label} link={link} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
        <NavLink link={featuredStory.link} className="drop__story" onClick={onNavigate}>
          <span className="drop__story-sector">{featuredStory.sector}</span>
          <span className="drop__story-result">
            {'before' in result && <s className="num">{result.before}</s>}
            {'before' in result && <Icon name="arrow" size={16} />}
            <b className="num grad-text">{result.after}</b>
          </span>
          <span className="drop__story-label">{result.label}</span>
          <span className="drop__story-project">{featuredStory.project}</span>
          <span className="drop__story-more">
            {featuredStory.link.label}
            <Icon name="arrow" size={14} />
          </span>
        </NavLink>
      </div>
    </div>
  );
}

/** Resources: implementation, security, stories, FAQ (and the blog once it exists). */
export function ResourcesMenu({ id, open, onNavigate }: MenuProps) {
  return (
    <div id={id} className="drop" hidden={!open}>
      <div className="drop__panel">
        <ul>
          {shown(resourceLinks).map((link) => (
            <Rich key={link.label} link={link} onNavigate={onNavigate} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Company: the company pages that exist, then the direct contact details. */
export function CompanyMenu({ id, open, onNavigate }: MenuProps) {
  return (
    <div id={id} className="drop drop--end" hidden={!open}>
      <div className="drop__panel">
        <ul>
          {shown(companyLinks).map((link) => (
            <Rich key={link.label} link={link} onNavigate={onNavigate} />
          ))}
        </ul>
        <address className="drop__contact">
          <a href={`tel:${site.contactPhone.replace(/\s/g, '')}`} className="num">
            <Icon name="phone" size={16} />
            {site.contactPhone}
          </a>
          <a href={`mailto:${site.contactEmail}`}>
            <Icon name="mail" size={16} />
            {site.contactEmail}
          </a>
          <span>
            <Icon name="pin" size={16} />
            {site.office.city}, {site.office.region}
          </span>
        </address>
      </div>
    </div>
  );
}
