import { Icon } from '../components/Icon';
import { vars } from '../motion/hooks';
import './comparison.css';

interface BeforeAfterProps {
  before: string;
  after: string;
  rows: readonly { before: string; after: string }[];
}

/**
 * Today against after MAVRO, row by row (e.g. the connectivity deck's six native-ERP problems and what MAVRO
 * does about each). A real table for assistive tech; each row reads as a before → after pair.
 */
export function BeforeAfter({ before, after, rows }: BeforeAfterProps) {
  return (
    <table className="ba" data-reveal>
      <thead>
        <tr>
          <th scope="col">
            <span className="ba__mark" data-side="before" aria-hidden="true">
              <Icon name="cross" size={14} />
            </span>
            {before}
          </th>
          <td aria-hidden="true" />
          <th scope="col">
            <span className="ba__mark" data-side="after" aria-hidden="true">
              <Icon name="check" size={14} />
            </span>
            {after}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.before} style={vars({ '--i': index })}>
            <td className="ba__before">{row.before}</td>
            <td className="ba__arrow" aria-hidden="true">
              <Icon name="arrow" size={30} />
            </td>
            <td className="ba__after">{row.after}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export type Level = 'high' | 'medium' | 'low';

export interface TableColumn {
  key: string;
  label: string;
}

interface DataTableProps {
  /** What the table is, for assistive tech (visually hidden). */
  caption: string;
  columns: readonly TableColumn[];
  /** Cells by column key; a level cell shows as a coloured badge (risk impact). */
  rows: readonly Record<string, string | { level: Level; text: string }>[];
}

/**
 * A designed table (e.g. implementation risks and their mitigation): the first column reads as the row's title,
 * level cells as badges. On phones each row becomes a card with its labels.
 */
export function DataTable({ caption, columns, rows }: DataTableProps) {
  return (
    <div className="dt" data-reveal>
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column, c) => {
                const cell = row[column.key];
                const content =
                  typeof cell === 'string' ? (
                    cell
                  ) : (
                    <span className="dt__level" data-level={cell.level}>
                      <span className="chip__dot" />
                      {cell.text}
                    </span>
                  );
                return c === 0 ? (
                  <th key={column.key} scope="row" data-label={column.label}>
                    {content}
                  </th>
                ) : (
                  <td key={column.key} data-label={column.label}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
