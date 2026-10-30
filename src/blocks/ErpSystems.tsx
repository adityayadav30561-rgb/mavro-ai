import { Icon, type IconName } from '../components/Icon';
import { vars } from '../motion/hooks';
import './erp-systems.css';

export interface ErpSystem {
  name: string;
  /** Editions, e.g. "S/4HANA · ECC". */
  detail: string;
  icon: IconName;
  /** Who it is for on that ERP, one line. */
  line: string;
}

/**
 * The ERPs MAVRO runs beside (ERP Connect, connectivity deck slide 2): a card per ERP (names as text, never their
 * logos), joined by a bracket into one MAVRO app for every user group below. Stacks two by two, then one.
 */
export function ErpSystems({ systems, users }: { systems: readonly ErpSystem[]; users: { label: string; groups: readonly string[] } }) {
  return (
    <div className="erps" data-reveal>
      <ul className="erps__list">
        {systems.map((system, index) => (
          <li key={system.name} className="erps__card" style={vars({ '--i': index })}>
            <span className="erps__icon">
              <Icon name={system.icon} size={22} />
            </span>
            <b className="erps__name">{system.name}</b>
            <span className="erps__detail">{system.detail}</span>
            <p>{system.line}</p>
          </li>
        ))}
      </ul>
      <div className="erps__join" aria-hidden="true" />
      <div className="erps__app">
        <span className="erps__app-icon">
          <Icon name="phone" size={20} />
        </span>
        <b>{users.label}</b>
        <ul>
          {users.groups.map((group) => (
            <li key={group}>{group}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
