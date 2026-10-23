import { Icon } from '../components/Icon';
import { implementation } from '../data/home';
import { vars } from '../motion/hooks';
import './implementation.css';

/*
 * Live in 25 to 30 days: the phased rollout as a one-month plan, then the four phases in detail, then who the
 * customer works with. The plan is drawn on a scale of 36 units: days 1 to 30, plus a band after day 30 for
 * ongoing support. It is decorative (the phase cards carry the same facts), so it is hidden from assistive tech.
 */
const SCALE = 36;
const at = (day: number) => ((day - 1) / SCALE) * 100;
/** Position as a fraction of the bar track, for elements placed across the whole chart. */
const frac = (day: number) => (day - 1) / SCALE;
const ticks = [1, 7, 14, 21, 30];

export function Implementation() {
  const { phases, milestones } = implementation;

  return (
    <section id="implementation" className="section impl" aria-labelledby="impl-title">
      <div className="page">
        <header className="head head--split" data-reveal>
          <h2 id="impl-title" className="h2">
            {implementation.title} <span className="grad-text">{implementation.titleSoft}</span>
          </h2>
          <p className="lead">{implementation.lead}</p>
        </header>

        <div className="impl__plan" data-reveal>
          <div className="impl__plan-head">
            <span className="impl__plan-label">
              <Icon name="calendar" size={18} />
              {implementation.timelineLabel}
            </span>
            <span className="impl__plan-span num">Day 1 → Day 30</span>
          </div>

          <div className="impl__chart" aria-hidden="true">
            <div className="impl__ruler">
              {ticks.map((day) => (
                <span key={day} className="impl__tick num" style={vars({ '--x': frac(day) })}>
                  Day {day}
                </span>
              ))}
              <span className="impl__tick impl__tick--after" style={vars({ '--x': frac(34) })}>
                After go-live
              </span>
            </div>

            <div className="impl__grid">
              {ticks.map((day) => (
                <span key={day} className="impl__gridline" style={vars({ '--x': frac(day) })} />
              ))}
              <span className="impl__after" style={vars({ '--x': frac(30.5) })} />

              {milestones.map((m, i) => (
                <span key={m.label} className="impl__milestone" style={vars({ '--x': frac(m.day), '--i': i })}>
                  <span className="impl__flag">{m.label}</span>
                </span>
              ))}

              {phases.map((phase, i) => {
                const from = at(phase.from);
                const to = phase.to === 'ongoing' ? 100 : at(phase.to + 1);
                return (
                  <div key={phase.title} className="impl__row" style={vars({ '--i': i })}>
                    <span className="impl__row-label">
                      <b>{phase.title}</b>
                      <span className="num">{phase.when}</span>
                    </span>
                    <span className="impl__track">
                      <span
                        className="impl__bar"
                        data-phase={i}
                        data-ongoing={phase.to === 'ongoing' || undefined}
                        style={vars({ '--from': `${from}%`, '--w': `${to - from}%` })}
                      >
                        <span className="num">
                          {phase.to === 'ongoing' ? 'Ongoing' : `Day ${phase.from}–${phase.to}`}
                        </span>
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <ol className="impl__phases">
            {phases.map((phase, i) => (
              <li key={phase.title} className="impl__phase" data-phase={i} style={vars({ '--i': i })}>
                <div className="impl__phase-top">
                  <span className="impl__phase-icon">
                    <Icon name={phase.icon} size={20} />
                  </span>
                  <p className="impl__when num">{phase.when}</p>
                  <span className="impl__phase-num num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="impl__phase-title">{phase.title}</h3>
                <ul className="impl__points">
                  {phase.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="impl__support" data-reveal>
          <div className="impl__support-head">
            <p className="impl__support-title">{implementation.supportTitle}</p>
            <p className="impl__support-note">{implementation.supportNote}</p>
          </div>
          <ul>
            {implementation.support.map((item) => (
              <li key={item.title}>
                <span className="impl__support-icon">
                  <Icon name={item.icon} size={20} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
