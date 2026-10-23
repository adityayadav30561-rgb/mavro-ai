import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './audience.css';

export interface AudienceIndustry {
  name: string;
  icon: IconName;
  /** What the module does for this industry, in one line. */
  note: string;
  /** The industry page, or its homepage fallback; null for a plain card. */
  href: string | null;
}

interface AudienceProps {
  industries: readonly AudienceIndustry[];
  roles: readonly { name: string; task: string }[];
  labels: { industries: string; roles: string };
}

/**
 * Who uses a module: the industries it serves as cards (icon, name, what it does there, a link to the industry)
 * beside the roles that work in it, each with its task. Module pages, section "Who uses it".
 */
export function Audience({ industries, roles, labels }: AudienceProps) {
  return (
    <div className="aud">
      <div className="aud__industries">
        <h3 className="aud__label">{labels.industries}</h3>
        <ul className="aud__cards">
          {industries.map((industry, index) => {
            const body = (
              <>
                <span className="aud__icon">
                  <Icon name={industry.icon} size={22} />
                </span>
                <b className="aud__name">
                  {industry.name}
                  {industry.href && <Icon name="arrow" size={16} className="aud__arrow" />}
                </b>
                <span className="aud__note">{industry.note}</span>
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
        <h3 className="aud__label">{labels.roles}</h3>
        <ol>
          {roles.map((role) => (
            <li key={role.name}>
              <span className="aud__avatar" aria-hidden="true">
                <Icon name="people" size={18} />
              </span>
              <span>
                <b>{role.name}</b>
                <span>{role.task}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
