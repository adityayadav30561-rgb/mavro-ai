import { Icon } from '../../components/Icon';
import type { MockScreen, PremiumVisual as Kind } from '../../data/modules';
import { vars } from '../../motion/hooks';

/*
 * Illustrative interfaces for the premium modules. Original design mockups with invented sample values
 * (trip, scheme and auction numbers, vendor codes), not screenshots of customer data. Decorative: the module's
 * text beside it carries the meaning, so the whole visual is hidden from assistive technology.
 */
export function SpecialVisual({ kind }: { kind: Kind }) {
  return (
    <div className="sv" aria-hidden="true">
      {kind === 'transport' && <Transport />}
      {kind === 'scheme' && <Scheme />}
      {kind === 'auction' && <Auction />}
      {typeof kind === 'object' && <Mock spec={kind} />}
    </div>
  );
}

function Bar({ kicker, title, chip, tone }: { kicker: string; title: string; chip: string; tone: 'live' | 'ok' | 'warn' }) {
  return (
    <div className="sv__bar">
      <div>
        <span className="sv__kicker">{kicker}</span>
        <b className="sv__title num">{title}</b>
      </div>
      <span className={`chip chip--${tone}`}>
        <span className="chip__dot" />
        {chip}
      </span>
    </div>
  );
}

const stops = [
  { name: 'Plant 1, Pune', note: 'Loaded', time: '08:40', state: 'done' },
  { name: 'Hub, Nashik', note: 'Departed', time: '13:15', state: 'done' },
  { name: 'Kestrel Pumps', note: 'Next stop', time: 'Planned', state: 'live' },
  { name: 'Proof of delivery', note: 'Pending', time: '', state: 'next' },
] as const;

function Transport() {
  return (
    <>
      <Bar kicker="Trip" title="TRP-0418 · Vehicle V-07" chip="In transit" tone="live" />
      <div className="sv__map">
        <svg viewBox="0 0 420 170" preserveAspectRatio="xMidYMid slice">
          <g className="sv__roads">
            <path d="M0 40 C 120 60, 200 10, 420 30" />
            <path d="M0 130 C 140 110, 260 160, 420 120" />
            <path d="M120 0 C 110 60, 150 120, 130 170" />
            <path d="M300 0 C 290 70, 330 110, 320 170" />
          </g>
          <path className="sv__route-bg" d="M40 132 C 110 132, 120 60, 200 64 S 320 120, 380 46" />
          <path className="sv__route" d="M40 132 C 110 132, 120 60, 200 64 S 320 120, 380 46" pathLength="100" />
          <circle className="sv__stop is-done" cx="40" cy="132" r="7" />
          <circle className="sv__stop is-done" cx="200" cy="64" r="7" />
          <circle className="sv__stop is-live" cx="380" cy="46" r="7" />
          <g className="sv__vehicle" style={{ offsetPath: "path('M40 132 C 110 132, 120 60, 200 64 S 320 120, 380 46')" }}>
            <circle r="11" />
            <circle r="5" className="sv__vehicle-core" />
          </g>
        </svg>
      </div>
      <ol className="sv__stops">
        {stops.map((stop) => (
          <li key={stop.name} data-state={stop.state}>
            <span className="sv__node">{stop.state === 'done' && <Icon name="check" size={10} />}</span>
            <b>{stop.name}</b>
            <span>{stop.note}</span>
            <span className="num">{stop.time}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

const slabs = [
  { at: 500, benefit: '1.5%' },
  { at: 1000, benefit: '2.5%' },
  { at: 2000, benefit: '4.0%' },
];
const SCALE = 2400;
const DONE = 1240;

function Scheme() {
  return (
    <>
      <Bar kicker="Scheme PS-Q3-07" title="Quarterly distributor volume scheme" chip="Active" tone="ok" />
      <dl className="sv__meta">
        <div>
          <dt>Applies to</dt>
          <dd>Distributors, West</dd>
        </div>
        <div>
          <dt>Valid</dt>
          <dd className="num">1 Jul – 30 Sep</dd>
        </div>
        <div>
          <dt>Budget used</dt>
          <dd className="num">62% of cap</dd>
        </div>
      </dl>
      <table className="sv__table">
        <thead>
          <tr>
            <th>Slab</th>
            <th>Volume</th>
            <th>Benefit</th>
          </tr>
        </thead>
        <tbody>
          {slabs.map((slab, i) => (
            <tr key={slab.at} data-on={DONE >= slab.at && (slabs[i + 1]?.at ?? Infinity) > DONE ? '' : undefined}>
              <td>{i + 1}</td>
              <td className="num">{slab.at.toLocaleString('en-IN')}+ cases</td>
              <td className="num">{slab.benefit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sv__progress">
        <div className="sv__progress-head">
          <b>Distributor D-1042</b>
          <span className="num">{DONE.toLocaleString('en-IN')} cases this quarter</span>
        </div>
        <div className="sv__track">
          <span className="sv__fill" style={vars({ '--v': DONE / SCALE })} />
          {slabs.map((slab) => (
            <span key={slab.at} className="sv__tick" style={vars({ '--v': slab.at / SCALE })} />
          ))}
        </div>
        <p className="sv__hint num">Slab 2 reached · 760 cases to slab 3</p>
      </div>
    </>
  );
}

const bids = [
  { rank: 'L1', vendor: 'Vendor V-118', bid: '₹208.40', state: 'lead' },
  { rank: 'L2', vendor: 'Vendor V-042', bid: '₹209.10', state: '' },
  { rank: 'L3', vendor: 'Vendor V-276', bid: '₹211.75', state: '' },
  { rank: 'L4', vendor: 'Vendor V-093', bid: '₹214.00', state: '' },
] as const;

function Auction() {
  return (
    <>
      <Bar kicker="Reverse auction AUC-0219" title="Aluminium castings · 400 kg" chip="Live" tone="live" />
      <dl className="sv__meta">
        <div>
          <dt>Ceiling price</dt>
          <dd className="num">₹224.00 / kg</dd>
        </div>
        <div>
          <dt>Qualified vendors</dt>
          <dd className="num">4 of 6</dd>
        </div>
        <div>
          <dt>Closes in</dt>
          <dd className="num">06:42</dd>
        </div>
      </dl>
      <table className="sv__table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Vendor</th>
            <th>Bid / kg</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.rank} data-on={bid.state === 'lead' ? '' : undefined}>
              <td className="num">{bid.rank}</td>
              <td>{bid.vendor}</td>
              <td className="num">{bid.bid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sv__ledger">
        <span className="sv__ledger-icon">
          <Icon name="auction" size={18} />
        </span>
        <div>
          <b>Award goes to committee approval</b>
          <span>Then converts to a purchase order in one step</span>
        </div>
      </div>
    </>
  );
}

/** The data-described interfaces: header, three figures, a table with one highlighted row, and a note. */
function Mock({ spec }: { spec: MockScreen }) {
  return (
    <>
      <Bar kicker={spec.kicker} title={spec.title} chip={spec.chip[0]} tone={spec.chip[1]} />
      <dl className="sv__meta">
        {spec.meta.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd className="num">{value}</dd>
          </div>
        ))}
      </dl>
      <table className="sv__table">
        <thead>
          <tr>
            {spec.cols.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spec.rows.map((row, i) => (
            <tr key={row.join('|')} data-on={i === spec.on ? '' : undefined}>
              {row.map((cell, c) => (
                <td key={c} className={c > 0 ? 'num' : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sv__ledger">
        <span className="sv__ledger-icon">
          <Icon name="check" size={16} />
        </span>
        <div>
          <b>{spec.note[0]}</b>
          <span>{spec.note[1]}</span>
        </div>
      </div>
    </>
  );
}
