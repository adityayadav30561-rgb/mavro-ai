/*
 * Chrome for module screens (prototype/modules/<slug>/*.html). Loaded as a module:
 *
 *   <body data-module="order-to-cash" data-view="Collections" data-crumb="Sell / Order to Cash / Collections"
 *         data-who="Name|Role">
 *   <script type="module" src="../../module-shell.js"></script>
 *
 * The sidebar comes from the site's own catalogue (src/data/modules/catalogue.ts, served by the dev server), so it
 * always lists every module, grouped by business area: the active area is open, the active module shows all its
 * views (src/data/modules/views.ts, the module's full menu) and the active view is highlighted. Phone screens (data-device="phone", prototype/phone.css) get a status bar,
 * an app bar and a tab bar instead. Charts are drawn afterwards by shell.js, once the layout is final.
 *
 * Optional: data-org="NP|Northfield Precision|Plant 1 · Pune" (the tenant), data-live="Live · 8 Oct, 14:02".
 *
 * Portal screens seen by the partner (a distributor, a vendor) use data-chrome="partner": the sidebar shows the
 * partner's company (data-org) and only the portal's own menu, under data-host ("Northfield Precision · Distributor
 * portal"). The menu is the module's views (views.ts), or data-menu="Label:icon|Label:icon" when the partner sees a
 * different menu (a vendor applying through the Vendor Portal); data-view must be one of its labels.
 */
import { areaOrder, areas, catalogue } from '/src/data/modules/catalogue.ts';
import { moduleViews } from '/src/data/modules/views.ts';

const ICON = {
  home: '<rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/>',
  finance: '<circle cx="8" cy="8" r="5.6"/><path d="M6 6.2h4M6 8h4M9.6 11.4 6.4 8"/>',
  sales: '<path d="M2 3h1.8l1.4 7h6.6l1.2-5H4.6"/><circle cx="6" cy="12.6" r=".9"/><circle cx="11" cy="12.6" r=".9"/>',
  supply: '<path d="M1.8 4h7.4v6.5H1.8zM9.2 6.3h2.9l2.1 2.2v2H9.2"/><circle cx="4.6" cy="11.6" r="1.2"/><circle cx="11.4" cy="11.6" r="1.2"/>',
  make: '<circle cx="8" cy="8" r="2.2"/><path d="M8 2v1.6M8 12.4V14M2 8h1.6M12.4 8H14M3.8 3.8l1.1 1.1M11.1 11.1l1.1 1.1M3.8 12.2l1.1-1.1M11.1 4.9l1.1-1.1"/>',
  people: '<circle cx="6" cy="5.5" r="2.2"/><path d="M2.2 13c.4-2.3 1.9-3.6 3.8-3.6S9.4 10.7 9.8 13"/><circle cx="11.2" cy="6.3" r="1.7"/><path d="M10.6 9.5c1.6 0 2.8 1.1 3.2 3"/>',
  data: '<path d="M2.5 13.5h11M4 11V6.5M8 11V3M12 11V8"/>',
  portal: '<path d="M2.5 4.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7l-3 2.5V10.5a2 2 0 0 1-1.5-2z"/>',
  chev: '<path d="m6 4 4 4-4 4"/>',
  search: '<circle cx="7" cy="7" r="4.2"/><path d="M10.2 10.2 13.5 13.5"/>',
  back: '<path d="M10 3 5 8l5 5"/>',
  check: '<circle cx="8" cy="8" r="5.6"/><path d="M5.6 8.2l1.7 1.7 3.2-3.5"/>',
  cart: '<path d="M2 3h1.8l1.4 7h6.6l1.2-5H4.6"/><circle cx="6" cy="12.6" r=".9"/><circle cx="11" cy="12.6" r=".9"/>',
  coin: '<circle cx="8" cy="8" r="5.6"/><path d="M6 6.2h4M6 8h4M9.6 11.4 6.4 8"/>',
  more: '<circle cx="3.5" cy="8" r="1.1"/><circle cx="8" cy="8" r="1.1"/><circle cx="12.5" cy="8" r="1.1"/>',
  bell: '<path d="M4 11.5V7.5a4 4 0 0 1 8 0v4l1.2 1.3H2.8zM6.6 14h2.8"/>',
  plan: '<rect x="2.5" y="3" width="11" height="10.5" rx="1.5"/><path d="M2.5 6.2h11M5.5 1.8v2.4M10.5 1.8v2.4"/>',
  doc: '<path d="M4 1.8h5.5L12.5 5v9.2H4z"/><path d="M9.3 1.8V5h3.2M6 8h4.5M6 10.6h4.5"/>',
  gift: '<rect x="2.5" y="6" width="11" height="7.5" rx="1"/><path d="M1.8 6h12.4M8 6v7.5M8 6S6.8 2.5 5 3.2 6 6 8 6zm0 0s1.2-3.5 3-2.8S10 6 8 6z"/>',
  user: '<circle cx="8" cy="5.5" r="2.6"/><path d="M3 13.5c.5-2.7 2.5-4.2 5-4.2s4.5 1.5 5 4.2"/>',
};
// The business areas, short enough for the sidebar.
const SHORT = { finance: 'Finance', sales: 'Sales and channel', supply: 'Supply chain', make: 'Manufacturing', people: 'People', data: 'Data and projects' };
const svg = (name) => `<svg viewBox="0 0 16 16">${ICON[name]}</svg>`;
const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2);

const body = document.body;
const d = body.dataset;
const entry = catalogue.find((e) => e.slug === d.module);
if (!entry) throw new Error(`module-shell: unknown module "${d.module}" (see src/data/modules/slugs.ts)`);
const area = entry.area ?? 'portal';
// The module's full menu (src/data/modules/views.ts); the screen's own view must be one of them.
const views = moduleViews[entry.slug] ?? [];
if (d.view && d.device !== 'phone' && d.chrome !== 'partner' && !views.includes(d.view))
  throw new Error(`module-shell: view "${d.view}" is not in moduleViews['${entry.slug}'] (src/data/modules/views.ts)`);
const [orgMark, orgName, orgSub] = (d.org || 'NP|Northfield Precision|Plant 1 · Pune').split('|');
const [whoName, whoRole] = (d.who || 'Meera Rao|Operations head').split('|');
const live = d.live || 'Live · 8 Oct, 14:02';

if (d.device === 'phone') phone();
else if (d.chrome === 'partner') partner();
else desktop();

// Charts last: shell.js measures the finished layout. It skips its own chrome on module screens.
await import('./shell.js');

function desktop() {
  const groups = [...areaOrder.map((id) => [id, SHORT[id] ?? areas[id]]), ['portal', 'Portals']];
  const groupHtml = groups
    .map(([id, label]) => {
      const items = catalogue.filter((e) => (e.area ?? 'portal') === id);
      const open = id === area;
      const head = `<a class="grp${open ? ' open' : ''}">${svg(id)}<span>${label}</span><em>${items.length}</em>${svg('chev')}</a>`;
      if (!open) return head;
      const list = items
        .map((e) => {
          if (e.slug !== entry.slug) return `<a class="mod">${e.name}</a>`;
          const sub = views.map((v) => `<a class="view${v === d.view ? ' on' : ''}">${v}</a>`).join('');
          return `<a class="mod cur">${e.name}</a>${sub ? `<div class="views">${sub}</div>` : ''}`;
        })
        .join('');
      return `${head}<div class="mods">${list}</div>`;
    })
    .join('');

  const side = document.createElement('aside');
  side.className = 'side side--modules';
  side.innerHTML =
    `<div class="brand"><img src="/src/assets/brand/logo-480.webp" alt="MAVRO.AI" height="22" width="118"></div>` +
    `<div class="org"><i>${orgMark}</i><div><span>${orgName}</span><small>${orgSub}</small></div></div>` +
    `<nav class="nav"><a>${svg('home')}Home</a><h6>Modules</h6>${groupHtml}</nav>`;

  const crumb = (d.crumb || `${entry.name} / ${d.view || ''}`).split('/').map((s) => s.trim()).filter(Boolean);
  const top = document.createElement('header');
  top.className = 'top';
  top.innerHTML =
    `<div class="crumb">${crumb.map((c, i) => (i === crumb.length - 1 ? `<b>${c}</b>` : `<span>${c}</span><span>/</span>`)).join('')}</div>` +
    `<div class="search">${svg('search')}<span>Search orders, items, documents</span><kbd>Ctrl K</kbd></div>` +
    `<span class="live">${live}</span>` +
    `<div class="who"><i>${initials(whoName)}</i><span>${whoName}<small>${whoRole}</small></span></div>`;

  body.prepend(side, top);
}

function partner() {
  // The portal's menu: its own (data-menu) or the module's views, with an icon each.
  const menu = d.menu
    ? d.menu.split('|').map((m) => m.split(':'))
    : views.map((v, i) => [v, ['home', 'cart', 'supply', 'coin', 'gift', 'doc', 'user', 'data'][i] ?? 'doc']);
  if (d.view && !menu.some(([label]) => label === d.view))
    throw new Error(`module-shell: view "${d.view}" is not in the partner menu of ${entry.slug}`);
  const [hostName, hostSub] = (d.host || `Northfield Precision|${entry.name}`).split('|');
  const items = menu
    .map(([label, icon, count]) => `<a class="${label === d.view ? 'on' : ''}">${svg(icon)}${label}${count ? `<em>${count}</em>` : ''}</a>`)
    .join('');

  const side = document.createElement('aside');
  side.className = 'side side--partner';
  side.innerHTML =
    `<div class="brand"><img src="/src/assets/brand/logo-480.webp" alt="MAVRO.AI" height="22" width="118"></div>` +
    `<div class="org"><i>${orgMark}</i><div><span>${orgName}</span><small>${orgSub}</small></div></div>` +
    `<nav class="nav"><h6>${hostName} · ${hostSub}</h6>${items}</nav>` +
    `<div class="host">${svg('portal')}<span>Portal of <b>${hostName}</b><small>on MAVRO</small></span></div>`;

  const crumb = (d.crumb || `${hostSub} / ${d.view || ''}`).split('/').map((s) => s.trim()).filter(Boolean);
  const top = document.createElement('header');
  top.className = 'top';
  top.innerHTML =
    `<div class="crumb">${crumb.map((c, i) => (i === crumb.length - 1 ? `<b>${c}</b>` : `<span>${c}</span><span>/</span>`)).join('')}</div>` +
    `<div class="search">${svg('search')}<span>${d.search || 'Search orders, invoices, claims'}</span><kbd>Ctrl K</kbd></div>` +
    `<span class="live">${live}</span>` +
    `<div class="who"><i>${initials(whoName)}</i><span>${whoName}<small>${whoRole}</small></span></div>`;

  body.prepend(side, top);
}

function phone() {
  const status = document.createElement('div');
  status.className = 'ph-status';
  status.innerHTML =
    `<b>${d.time || '9:41'}</b><span class="ph-sys">` +
    `<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg>` +
    `<svg viewBox="0 0 16 12"><path d="M8 11.2 5.6 8.6a3.4 3.4 0 0 1 4.8 0zM3.4 6.4a6.5 6.5 0 0 1 9.2 0l-1.4 1.5a4.5 4.5 0 0 0-6.4 0zM1.2 4.1a9.6 9.6 0 0 1 13.6 0l-1.4 1.5a7.6 7.6 0 0 0-10.8 0z"/></svg>` +
    `<span class="ph-batt"><i></i></span></span>`;

  const bar = document.createElement('header');
  bar.className = 'ph-bar';
  bar.innerHTML =
    `<span class="ph-back">${svg('back')}</span>` +
    `<div class="ph-title"><b>${d.title || d.view || entry.name}</b><small>${d.subtitle || entry.name}</small></div>` +
    `<i class="ph-who">${initials(whoName)}</i>`;

  const tabs = (d.tabs || 'Home:home|Approvals:check|Orders:cart|Collections:coin|More:more').split('|').map((t) => {
    const [label, icon, count] = t.split(':');
    return `<a class="${label === d.tab ? 'on' : ''}">${svg(icon)}${count ? `<em>${count}</em>` : ''}<span>${label}</span></a>`;
  });
  const nav = document.createElement('nav');
  nav.className = 'ph-tabs';
  nav.innerHTML = tabs.join('') + '<span class="ph-home"></span>';

  body.prepend(status, bar);
  body.append(nav);
}
