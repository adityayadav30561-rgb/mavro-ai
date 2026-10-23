/*
 * Shared chrome and charts for the prototype screens.
 * <body data-nav="Sales orders" data-crumb="Sell / Sales orders / SO-24817"> picks the active item and breadcrumb.
 * Charts are declared in markup with data-* attributes and drawn here as inline SVG.
 */
(function () {
  const ICON = {
    grid: '<rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/>',
    chat: '<path d="M2.5 4.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7l-3 2.5V10.5a2 2 0 0 1-1.5-2z"/>',
    doc: '<path d="M4 2.5h5.5L12.5 5.5v8H4z"/><path d="M9.5 2.5v3h3M6 8.5h4.5M6 11h3"/>',
    cart: '<path d="M2 3h1.8l1.4 7h6.6l1.2-5H4.6"/><circle cx="6" cy="12.6" r=".9"/><circle cx="11" cy="12.6" r=".9"/>',
    truck: '<path d="M1.8 4h7.4v6.5H1.8zM9.2 6.3h2.9l2.1 2.2v2H9.2"/><circle cx="4.6" cy="11.6" r="1.2"/><circle cx="11.4" cy="11.6" r="1.2"/>',
    plan: '<rect x="2.5" y="3" width="11" height="10.5" rx="1.5"/><path d="M2.5 6.2h11M5.5 1.8v2.4M10.5 1.8v2.4"/>',
    gear: '<circle cx="8" cy="8" r="2.2"/><path d="M8 2v1.6M8 12.4V14M2 8h1.6M12.4 8H14M3.8 3.8l1.1 1.1M11.1 11.1l1.1 1.1M3.8 12.2l1.1-1.1M11.1 4.9l1.1-1.1"/>',
    floor: '<path d="M2 13.5V7l4 2.5V7l4 2.5V4h3.5v9.5z"/>',
    check: '<circle cx="8" cy="8" r="5.6"/><path d="M5.6 8.2l1.7 1.7 3.2-3.5"/>',
    box: '<path d="M2.5 5 8 2.2 13.5 5v6L8 13.8 2.5 11zM2.5 5 8 7.8 13.5 5M8 7.8v6"/>',
    coin: '<circle cx="8" cy="8" r="5.6"/><path d="M6 6.2h4M6 8h4M9.6 11.4 6.4 8"/>',
    out: '<path d="M2.5 13.5h11M4 11V6.5M8 11V3M12 11V8"/>',
    lock: '<rect x="3.5" y="7" width="9" height="6.5" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/>',
    search: '<circle cx="7" cy="7" r="4.2"/><path d="M10.2 10.2 13.5 13.5"/>',
  };
  const svg = (name) => `<svg viewBox="0 0 16 16">${ICON[name]}</svg>`;

  const NAV = [
    ['', [['Overview', 'grid']]],
    ['Sell', [['Enquiries', 'chat', 38], ['Quotations', 'doc', 47], ['Sales orders', 'cart', 61], ['Dispatch', 'truck', 9]]],
    ['Make', [['Planning', 'plan'], ['Work orders', 'gear', 23], ['Shop floor', 'floor'], ['Quality', 'check', 2]]],
    ['Buy', [['Requisitions', 'doc', 6], ['Sourcing', 'chat', 4], ['Purchase orders', 'cart', 18]]],
    ['Stock', [['Inventory', 'box']]],
    ['Finance', [['Receivables', 'coin'], ['Payables', 'out']]],
    ['Admin', [['Roles and audit', 'lock']]],
  ];

  const active = document.body.dataset.nav;
  const crumb = (document.body.dataset.crumb || '').split('/').map((s) => s.trim());
  const who = (document.body.dataset.who || 'Meera Rao|Operations head').split('|');

  const side = document.createElement('aside');
  side.className = 'side';
  side.innerHTML =
    `<div class="brand"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 17V5l8 9 8-9v12" stroke="#0d1117" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="17" r="2.4" fill="#2b4eff"/></svg><b>MAVRO</b></div>` +
    `<div class="org"><i>NP</i><div><span>Northfield Precision</span><small>Plant 1 · Pune</small></div></div>` +
    `<nav class="nav">` +
    NAV.map(([group, items]) =>
      (group ? `<h6>${group}</h6>` : '') +
      items.map(([label, icon, count]) =>
        `<a class="${label === active ? 'on' : ''}">${svg(icon)}${label}${count ? `<em>${count}</em>` : ''}</a>`).join('')).join('') +
    `</nav>`;

  const top = document.createElement('header');
  top.className = 'top';
  top.innerHTML =
    `<div class="crumb">${crumb.map((c, i) => (i === crumb.length - 1 ? `<b>${c}</b>` : `<span>${c}</span><span>/</span>`)).join('')}</div>` +
    `<div class="search">${svg('search')}<span>Search orders, items, documents</span><kbd>Ctrl K</kbd></div>` +
    `<span class="live">Live · 8 Oct, 14:02</span>` +
    `<div class="who"><i>${who[0].split(' ').map((w) => w[0]).join('')}</i><span>${who[0]}<small>${who[1]}</small></span></div>`;

  document.body.prepend(side, top);

  /* ---------- Charts ---------- */
  const nums = (s) => s.split(',').map(Number);
  const NS = 'http://www.w3.org/2000/svg';
  const make = (el, w, h, inner) => {
    el.innerHTML = `<svg class="chart" xmlns="${NS}" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">${inner}</svg>`;
  };
  const line = (v, w, h, pad, lo, hi) => v.map((y, i) => `${(pad + (i * (w - 2 * pad)) / (v.length - 1)).toFixed(1)},${(h - pad - ((y - lo) / (hi - lo)) * (h - 2 * pad)).toFixed(1)}`);

  // Sparkline: data-spark="1,2,3" [data-color]
  document.querySelectorAll('[data-spark]').forEach((el) => {
    const v = nums(el.dataset.spark), c = el.dataset.color || '#2b4eff';
    const lo = Math.min(...v), hi = Math.max(...v), pts = line(v, 96, 30, 3, lo - (hi - lo) * 0.1, hi);
    el.style.cssText += ';display:block;width:84px;height:30px;flex:none';
    el.innerHTML = `<svg viewBox="0 0 96 30" width="84" height="30" preserveAspectRatio="none"><path d="M${pts.join('L')}L93,30L3,30Z" fill="${c}" opacity=".09"/><path d="M${pts.join('L')}" fill="none" stroke="${c}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${pts.at(-1).split(',')[0]}" cy="${pts.at(-1).split(',')[1]}" r="2.4" fill="${c}"/></svg>`;
  });

  // Area/line chart: data-area="a|b" (series), data-labels="W1,W2", data-max
  document.querySelectorAll('[data-area]').forEach((el) => {
    const series = el.dataset.area.split('|').map(nums), labels = el.dataset.labels.split(',');
    const W = el.clientWidth || 760, H = el.clientHeight || 250, L = 34, R = 14, T = 10, B = 24, max = Number(el.dataset.max);
    const x = (i) => L + (i * (W - L - R)) / (series[0].length - 1), y = (v) => T + (1 - v / max) * (H - T - B);
    let g = '';
    for (let k = 0; k <= 4; k++) {
      const yy = T + (k * (H - T - B)) / 4;
      g += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" stroke="#eceef2" vector-effect="non-scaling-stroke"/><text x="${L - 8}" y="${yy + 3.5}" text-anchor="end">${Math.round(max - (k * max) / 4)}</text>`;
    }
    labels.forEach((l, i) => { if (l) g += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle">${l}</text>`; });
    const colors = ['#2b4eff', '#9aa3b5'];
    series.forEach((s, n) => {
      const p = s.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
      if (n === 0) g = g + `<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b4eff" stop-opacity=".16"/><stop offset="1" stop-color="#2b4eff" stop-opacity="0"/></linearGradient></defs><path d="M${p.join('L')}L${x(s.length - 1)},${H - B}L${L},${H - B}Z" fill="url(#ga)"/>`;
      g += `<path d="M${p.join('L')}" fill="none" stroke="${colors[n]}" stroke-width="${n ? 1.6 : 2.2}" ${n ? 'stroke-dasharray="4 4"' : ''} stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
      if (n === 0) g += `<circle cx="${x(s.length - 1)}" cy="${y(s.at(-1))}" r="4" fill="#fff" stroke="#2b4eff" stroke-width="2.2"/>`;
    });
    el.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" height="100%">${g}</svg>`;
  });

  // Grouped bars: data-bars="a|b", data-labels, data-max, data-colors
  document.querySelectorAll('[data-bars]').forEach((el) => {
    const series = el.dataset.bars.split('|').map(nums), labels = el.dataset.labels.split(',');
    const colors = (el.dataset.colors || '#2b4eff,#c9cfdb').split(',');
    const W = el.clientWidth || 520, H = el.clientHeight || 210, L = 30, R = 6, T = 8, B = 24, max = Number(el.dataset.max);
    const n = series[0].length, slot = (W - L - R) / n, bw = Math.min(22, (slot - 10) / series.length);
    let g = '';
    for (let k = 0; k <= 3; k++) {
      const yy = T + (k * (H - T - B)) / 3;
      g += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" stroke="#eceef2"/><text x="${L - 7}" y="${yy + 3.5}" text-anchor="end">${Math.round(max - (k * max) / 3)}</text>`;
    }
    for (let i = 0; i < n; i++) {
      const cx = L + slot * i + slot / 2, total = bw * series.length + 3 * (series.length - 1);
      series.forEach((s, k) => {
        const h = (s[i] / max) * (H - T - B);
        g += `<rect x="${(cx - total / 2 + k * (bw + 3)).toFixed(1)}" y="${(H - B - h).toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="3" fill="${colors[k]}"/>`;
      });
      g += `<text x="${cx}" y="${H - 6}" text-anchor="middle">${labels[i]}</text>`;
    }
    el.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" height="100%">${g}</svg>`;
  });

  // Control chart: data-control="values", data-lo, data-hi, data-target
  document.querySelectorAll('[data-control]').forEach((el) => {
    const v = nums(el.dataset.control), lo = +el.dataset.lo, hi = +el.dataset.hi, t = +el.dataset.target;
    const W = el.clientWidth || 560, H = el.clientHeight || 170, L = 46, R = 10, span = (hi - lo) * 1.5, base = t - span / 2;
    const x = (i) => L + (i * (W - L - R)) / (v.length - 1), y = (val) => 10 + (1 - (val - base) / span) * (H - 30);
    let g = `<rect x="${L}" y="${y(hi)}" width="${W - L - R}" height="${y(lo) - y(hi)}" fill="#0c9b6a" opacity=".06"/>`;
    [[hi, 'USL', '#d43a2f'], [t, 'Target', '#8b93a3'], [lo, 'LSL', '#d43a2f']].forEach(([val, label, c]) => {
      g += `<line x1="${L}" x2="${W - R}" y1="${y(val)}" y2="${y(val)}" stroke="${c}" stroke-dasharray="${label === 'Target' ? '0' : '4 4'}" stroke-width="1" opacity=".7"/><text x="${L - 8}" y="${y(val) + 3.5}" text-anchor="end">${val.toFixed(2)}</text>`;
    });
    const p = v.map((val, i) => `${x(i).toFixed(1)},${y(val).toFixed(1)}`);
    g += `<path d="M${p.join('L')}" fill="none" stroke="#2b4eff" stroke-width="1.8" stroke-linejoin="round"/>`;
    v.forEach((val, i) => { g += `<circle cx="${x(i)}" cy="${y(val)}" r="2.6" fill="#fff" stroke="#2b4eff" stroke-width="1.6"/>`; });
    g += `<text x="${L}" y="${H - 4}">Piece 1</text><text x="${W - R}" y="${H - 4}" text-anchor="end">Piece ${v.length}</text>`;
    el.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" height="100%">${g}</svg>`;
  });

  // Donut: data-donut="40,30,20", data-colors
  document.querySelectorAll('[data-donut]').forEach((el) => {
    const v = nums(el.dataset.donut), colors = el.dataset.colors.split(','), sum = v.reduce((a, b) => a + b, 0), C = 2 * Math.PI * 42;
    let off = 0, g = '';
    v.forEach((val, i) => {
      const len = (val / sum) * C;
      g += `<circle cx="60" cy="60" r="42" fill="none" stroke="${colors[i]}" stroke-width="14" stroke-dasharray="${(len - 2).toFixed(2)} ${(C - len + 2).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 60 60)"/>`;
      off += len;
    });
    el.innerHTML = `<svg viewBox="0 0 120 120" width="100%" height="100%">${g}</svg>`;
  });
})();
