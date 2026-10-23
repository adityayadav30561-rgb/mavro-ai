import { Icon, type IconName } from '../components/Icon';
import { useTabs } from '../motion/hooks';
import './trust-panel.css';

export interface TrustData {
  title: string;
  compliance: {
    tab: string;
    items: readonly { icon: IconName; title: string; tags: readonly string[]; body: string }[];
  };
  security: {
    tab: string;
    figures: readonly { value: string; label: string }[];
    controls: readonly string[];
  };
}

/**
 * India compliance and platform security (product deck slides 11–12).
 *
 * card (homepage Why MAVRO): one card, switched by tabs. Both panels share one grid cell so the card keeps its
 * height when the tab changes; the hidden one is visibility: hidden, which also takes it out of the tab order and
 * the accessibility tree. `id` names the tabs (one per page).
 * expanded (security, platform pages): both panels side by side, each under its own heading, no tabs.
 */
export function TrustPanel({
  data,
  id = 'trust',
  variant = 'card',
}: {
  data: TrustData;
  id?: string;
  variant?: 'card' | 'expanded';
}) {
  const { active, tabProps, panelProps } = useTabs(2, id);

  if (variant === 'expanded') return <TrustExpanded data={data} />;

  const panel = (index: number) =>
    index === active ? { ...panelProps, 'data-active': '' } : { 'aria-hidden': true as const };

  return (
    <figure className="trust">
      <figcaption className="trust__head">
        <span className="trust__mark" aria-hidden="true">
          <Icon name="shield" size={20} />
        </span>
        <h3 className="trust__title">{data.title}</h3>
      </figcaption>

      <div className="trust__tabs" role="tablist" aria-label={data.title}>
        {[data.compliance.tab, data.security.tab].map((label, index) => (
          <button key={label} type="button" className="trust__tab" {...tabProps(index)}>
            <Icon name={index === 0 ? 'receipt' : 'lock'} size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="trust__panels">
        <ul className="trust__panel trust__rules" {...panel(0)}>
          {data.compliance.items.map((item) => (
            <li key={item.title}>
              <span className="trust__icon" aria-hidden="true">
                <Icon name={item.icon} size={18} />
              </span>
              <div>
                <p className="trust__rule-head">
                  <b>{item.title}</b>
                  <span className="trust__tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </p>
                <p className="trust__rule-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="trust__panel trust__security" {...panel(1)}>
          <dl className="trust__figures">
            {data.security.figures.map((figure) => (
              <div key={figure.label}>
                <dt>{figure.label}</dt>
                <dd className="num">{figure.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="trust__controls">
            {data.security.controls.map((control) => (
              <li key={control}>
                <Icon name="check" size={14} />
                {control}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

/** Both panels at once: compliance rules and security figures and controls, side by side. */
function TrustExpanded({ data }: { data: TrustData }) {
  return (
    <div className="trust trust--expanded">
      <section className="trust__col" aria-labelledby="trust-compliance">
        <h3 id="trust-compliance" className="trust__col-title">
          <Icon name="receipt" size={18} />
          {data.compliance.tab}
        </h3>
        <ul className="trust__rules">
          {data.compliance.items.map((item) => (
            <li key={item.title}>
              <span className="trust__icon" aria-hidden="true">
                <Icon name={item.icon} size={18} />
              </span>
              <div>
                <p className="trust__rule-head">
                  <b>{item.title}</b>
                  <span className="trust__tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </p>
                <p className="trust__rule-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="trust__col trust__security" aria-labelledby="trust-security">
        <h3 id="trust-security" className="trust__col-title">
          <Icon name="lock" size={18} />
          {data.security.tab}
        </h3>
        <dl className="trust__figures">
          {data.security.figures.map((figure) => (
            <div key={figure.label}>
              <dt>{figure.label}</dt>
              <dd className="num">{figure.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="trust__controls">
          {data.security.controls.map((control) => (
            <li key={control}>
              <Icon name="check" size={14} />
              {control}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
