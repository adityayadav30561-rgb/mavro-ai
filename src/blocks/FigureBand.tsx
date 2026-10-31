import { Icon } from '../components/Icon';
import { vars } from '../motion/hooks';
import './figure-band.css';

interface FigureBandProps {
  figures: readonly { value: string; label: string }[];
  controls: readonly string[];
}

/**
 * Headline figures with the controls behind them (Security page: data protection, the deck's own figures only).
 * Drawn for a dark band (section--night): the figures large in the brand sweep, the controls as a ticked row below.
 */
export function FigureBand({ figures, controls }: FigureBandProps) {
  return (
    <div className="fband" data-reveal>
      <dl className="fband__figures">
        {figures.map((figure, index) => (
          <div key={figure.label} style={vars({ '--i': index })}>
            <dd className="num">{figure.value}</dd>
            <dt>{figure.label}</dt>
          </div>
        ))}
      </dl>
      <ul className="fband__controls">
        {controls.map((control) => (
          <li key={control}>
            <Icon name="check" size={14} />
            {control}
          </li>
        ))}
      </ul>
    </div>
  );
}
