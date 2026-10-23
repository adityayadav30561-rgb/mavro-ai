import { Icon } from '../../components/Icon';
import { why } from '../../data/home';
import { useTabs } from '../../motion/hooks';
import './trust.css';

const { trust } = why;

/**
 * The evidence beside the principles: India compliance and platform security in one card, switched by tabs.
 * Both panels share one grid cell so the card keeps its height when the tab changes; the hidden one is
 * visibility: hidden, which also takes it out of the tab order and the accessibility tree.
 */
export function TrustCard() {
  const { active, tabProps, panelProps } = useTabs(2, 'trust');

  const panel = (index: number) =>
    index === active ? { ...panelProps, 'data-active': '' } : { 'aria-hidden': true as const };

  return (
    <figure className="trust">
      <figcaption className="trust__head">
        <span className="trust__mark" aria-hidden="true">
          <Icon name="shield" size={20} />
        </span>
        <h3 className="trust__title">{trust.title}</h3>
      </figcaption>

      <div className="trust__tabs" role="tablist" aria-label={trust.title}>
        {[trust.compliance.tab, trust.security.tab].map((label, index) => (
          <button key={label} type="button" className="trust__tab" {...tabProps(index)}>
            <Icon name={index === 0 ? 'receipt' : 'lock'} size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="trust__panels">
        <ul className="trust__panel trust__rules" {...panel(0)}>
          {trust.compliance.items.map((item) => (
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
            {trust.security.figures.map((figure) => (
              <div key={figure.label}>
                <dt>{figure.label}</dt>
                <dd className="num">{figure.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="trust__controls">
            {trust.security.controls.map((control) => (
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
