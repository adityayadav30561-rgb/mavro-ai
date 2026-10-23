import type { CSSProperties } from 'react';
import { Icon } from '../../components/Icon';
import { screens } from './screens';

const k = (n: number, extra?: Record<string, string | number>) => ({ '--k': n, ...extra }) as CSSProperties;

/**
 * A miniature module screen. Each element carries a build order `--k`; CSS combines it with the card's scroll
 * progress `--c` so the screen assembles piece by piece as the card slides into view. Decorative: the card's
 * title and text say what the module does.
 */
export function ModuleScreen({ id }: { id: string }) {
  const screen = screens[id];
  if (!screen) return null;
  let n = 1;

  return (
    <div className="ms" aria-hidden="true">
      <div className="ms__bar ms-k" style={k(0)}>
        <span className="ms__logo" />
        <b>{screen.title}</b>
        {screen.chip && <span className={`ms__chip ms__chip--${screen.chip[1] || 'plain'}`}>{screen.chip[0]}</span>}
      </div>

      {screen.steps && (
        <ol className="ms__steps ms-k" style={k(n++)}>
          {screen.steps.map(([label, state]) => (
            <li key={label} data-state={state}>
              <span className="ms__dot">{state === 'done' && <Icon name="check" size={8} />}</span>
              {label}
            </li>
          ))}
        </ol>
      )}

      {screen.kpis && (
        <div className="ms__kpis">
          {screen.kpis.map(([label, value]) => (
            <div key={label} className="ms-k" style={k(n++)}>
              <span>{label}</span>
              <b className="num">{value}</b>
            </div>
          ))}
        </div>
      )}

      {screen.rows && (
        <ul className="ms__rows">
          {screen.rows.map(([label, value, tone]) => (
            <li key={label} className="ms-k" style={k(n++)}>
              <span>{label}</span>
              <span className={tone ? `ms__val ms__val--${tone}` : 'ms__val'}>{value}</span>
            </li>
          ))}
        </ul>
      )}

      {screen.progress && (
        <ul className="ms__progress">
          {screen.progress.map(([label, value, text]) => (
            <li key={label} className="ms-k" style={k(n++, { '--v': value })}>
              <span>{label}</span>
              <span className="ms__track">
                <span />
              </span>
              <b className="num">{text}</b>
            </li>
          ))}
        </ul>
      )}

      {screen.bars && (
        <div className="ms__chart">
          {screen.bars.map((value, i) => (
            <span key={i} className="ms-k" style={k(n++, { '--v': value / 100 })} />
          ))}
        </div>
      )}
    </div>
  );
}
