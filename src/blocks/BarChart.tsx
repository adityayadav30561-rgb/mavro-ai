import { vars } from '../motion/hooks';
import './bar-chart.css';

export interface BarChartProps {
  title: string;
  caption: string;
  categories: readonly string[];
  series: readonly { name: string; values: readonly number[] }[];
  format: 'inr' | 'number' | 'percent' | 'days';
  /** Stack the series in one bar (parts of a whole), or give each its own bar (values that do not add up). */
  layout?: 'stack' | 'group';
}

/** Series colours, in fixed order (validated with the dataviz skill's checker against the light surface). */
const colours = ['var(--blue)', 'var(--cyan-600)', 'var(--violet)'];

export const formatValue = (value: number, format: BarChartProps['format']) =>
  format === 'inr'
    ? `₹${value.toLocaleString('en-IN')}`
    : format === 'percent'
      ? `${value}%`
      : format === 'days'
        ? `${value} days`
        : value.toLocaleString('en-IN');

/**
 * Horizontal bars, one per category, series stacked inside (blog articles). Built in HTML, so labels stay at reading
 * size on every screen: one baseline, bars at most 1.5rem thick with a 4px rounded end and a 2px gap between segments,
 * a legend for two or more series, the total at each bar's end, a tooltip per segment on hover and keyboard focus, and
 * the numbers as a table behind "Show the numbers". Server-rendered and deterministic.
 */
export function BarChart({ title, caption, categories, series, format, layout = 'stack' }: BarChartProps) {
  const totals = categories.map((_, c) => series.reduce((sum, s) => sum + s.values[c], 0));
  const grouped = layout === 'group' && series.length > 1;
  const max = (grouped ? Math.max(...series.flatMap((s) => s.values)) : Math.max(...totals)) || 1;
  return (
    <figure className="bchart">
      <p className="bchart__title">{title}</p>
      {series.length > 1 && (
        <ul className="bchart__legend" aria-hidden="true">
          {series.map((s, i) => (
            <li key={s.name}>
              <span style={vars({ '--c': colours[i] })} />
              {s.name}
            </li>
          ))}
        </ul>
      )}
      <ul className="bchart__rows">
        {categories.map((category, c) => (
          <li key={category}>
            <span className="bchart__label">{category}</span>
            {grouped ? (
              <span className="bchart__group">
                {series.map((s, i) => (
                  <span key={s.name} className="bchart__track">
                    <span className="bchart__bar" style={vars({ '--w': `${(s.values[c] / max) * 100}%` })}>
                      <span
                        className="bchart__seg"
                        role="img"
                        tabIndex={0}
                        aria-label={`${category}, ${s.name}: ${formatValue(s.values[c], format)}`}
                        data-tip={`${s.name}: ${formatValue(s.values[c], format)}`}
                        style={vars({ '--c': colours[i], '--f': 1 })}
                      />
                    </span>
                    <b className="bchart__total num">{formatValue(s.values[c], format)}</b>
                  </span>
                ))}
              </span>
            ) : (
            <span className="bchart__track">
              <span className="bchart__bar" style={vars({ '--w': `${(totals[c] / max) * 100}%` })}>
                {series.map((s, i) =>
                  s.values[c] > 0 ? (
                    <span
                      key={s.name}
                      className="bchart__seg"
                      role="img"
                      tabIndex={0}
                      aria-label={`${category}, ${s.name}: ${formatValue(s.values[c], format)}`}
                      data-tip={`${s.name}: ${formatValue(s.values[c], format)}`}
                      style={vars({ '--c': colours[i], '--f': s.values[c] })}
                    />
                  ) : null,
                )}
              </span>
              <b className="bchart__total num">{formatValue(totals[c], format)}</b>
            </span>
            )}
          </li>
        ))}
      </ul>
      <figcaption>{caption}</figcaption>
      <details className="bchart__data">
        <summary>Show the numbers</summary>
        <table>
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr>
              <th scope="col">{''}</th>
              {series.map((s) => (
                <th key={s.name} scope="col">
                  {s.name}
                </th>
              ))}
              {series.length > 1 && !grouped && <th scope="col">Total</th>}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, c) => (
              <tr key={category}>
                <th scope="row">{category}</th>
                {series.map((s) => (
                  <td key={s.name} className="num">
                    {formatValue(s.values[c], format)}
                  </td>
                ))}
                {series.length > 1 && !grouped && <td className="num">{formatValue(totals[c], format)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
