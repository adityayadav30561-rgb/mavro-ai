import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './audience.css';

export interface AudienceIndustry {
  name: string;
  icon: IconName;
  /** Who the industry is, e.g. "OEM suppliers and multi-line plants". */
  who: string;
  /** What the module does for this industry, in one line. */
  note: string;
  /** The industry page, or its homepage fallback; null for a plain card. */
  href: string | null;
}

export interface AudienceRole {
  name: string;
  task: string;
  /** The view they mostly work in (the module's views). */
  works?: string;
}

interface AudienceProps {
  industries: readonly AudienceIndustry[];
  roles: readonly AudienceRole[];
  labels: { industries: string; roles: string; works: string; see: string };
  /** Where a role's view chip links, e.g. '#screens'. */
  screensHref?: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Who uses a module. Industries as cards (icon, name, who the industry is, what the module does there, a link);
 * beside them the people who work in it, each with initials, what they do and the view they work in. One brand
 * colour throughout. Module pages, section "Who uses it".
 */
export function Audience({ industries, roles, labels, screensHref }: AudienceProps) {
  return (
    <div className="aud">
      <div className="aud__industries">
        <h3 className="aud__label">{labels.industries}</h3>
        <ul className="aud__cards">
          {industries.map((industry, index) => {
            const body = (
              <>
                <span className="aud__head">
                  <span className="aud__icon">
                    <Icon name={industry.icon} size={22} />
                  </span>
                  <span>
                    <b className="aud__name">{industry.name}</b>
                    <span className="aud__who">{industry.who}</span>
                  </span>
                </span>
                <span className="aud__body">
                  <span className="aud__note">{industry.note}</span>
                  {industry.href && (
                    <span className="aud__more">
                      {labels.see.replace('{industry}', industry.name.toLowerCase())}
                      <Icon name="arrow" size={14} />
                    </span>
                  )}
                </span>
              </>
            );
            return (
              <li key={industry.name} data-reveal style={vars({ '--i': index })}>
                {industry.href ? (
                  <a className="aud__card" href={industry.href}>
                    {body}
                  </a>
                ) : (
                  <div className="aud__card">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="aud__roles" data-reveal style={vars({ '--i': 2 })}>
        <h3 className="aud__label">
          {labels.roles}
          <span className="num">{roles.length}</span>
        </h3>
        <ol>
          {roles.map((role) => (
            <li key={role.name}>
              <span className="aud__avatar" aria-hidden="true">
                {initials(role.name)}
              </span>
              <span className="aud__role">
                <span className="aud__role-head">
                  <b>{role.name}</b>
                  {role.works &&
                    (screensHref ? (
                      <a className="aud__works" href={screensHref}>
                        <Icon name="eye" size={14} />
                        {labels.works} {role.works}
                      </a>
                    ) : (
                      <span className="aud__works">
                        <Icon name="eye" size={14} />
                        {labels.works} {role.works}
                      </span>
                    ))}
                </span>
                <span className="aud__task">{role.task}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
