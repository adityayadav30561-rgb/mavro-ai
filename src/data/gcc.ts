/*
 * Gulf pages (D4): a page per country (/ae/erp-software, /sa/erp-software, /qa/erp-software) and per city
 * (/ae/erp-software/dubai …), one template (src/pages/GccPage.tsx). Decisions: DECISIONS.md, "D4 UAE and GCC pages".
 * Indexed pages, so every claim is either confirmed by the user or a public, checkable fact.
 *
 * What MAVRO supports in the Gulf (user, 2026-11-10; also in docs/PRODUCT.md): UAE VAT invoicing (VAT on sales and
 * purchases, TRN on documents, VAT return figures; not UAE corporate tax), Saudi ZATCA (Fatoora) e-invoicing with QR
 * code and Phase 2 integration, UAE WPS salary files and end-of-service gratuity under UAE labour law, Arabic support
 * and the local currencies. NOT claimed: UAE e-invoicing, any Saudi or Qatari payroll rule, an Arabic interface or
 * bilingual invoices specifically (the user's option said "or"; Open item), anything about Qatar VAT readiness.
 * Presence: none in the Gulf, served from India (user). Contact: the same as India (user).
 *
 * Country facts, checked 2026-11-10 (re-check Qatar before launch: STATUS Open items):
 * - UAE VAT: standard rate 5% since 1 January 2018; a 15-digit TRN on tax invoices.
 *   https://www.cleartax.com/ae/vat-invoicing-uae, https://www.cleartax.com/ae/trn-verification-uae
 * - Saudi VAT: 15% since 1 July 2020, administered by ZATCA; Phase 2 (integration) e-invoicing rolled out in waves.
 *   https://pwc.com/m1/en/tax/documents/2021/saudi-arabia-end-of-the-transitional-period-for-vat-rate-increase.pdf,
 *   https://taxnews.ey.com/news/2026-1705-saudi-arabia-announces-25th-wave-of-phase-2-e-invoicing-integration
 * - Qatar: no VAT in force (an e-invoicing law was approved in May 2026; no VAT law or date).
 *   https://www.vatupdate.com/2026/07/29/qatar-vat-confusion-e-invoicing-prep-no-vat-law-yet/
 */
import type { CapabilityTile } from '../blocks/CapabilityTiles';
import type { CityIndustry } from './cities';

export type CountryKey = 'ae' | 'sa' | 'qa';

export interface GccCity {
  slug: string;
  name: string;
  /** "known for" line: the country page's card and the hero headline's second half. */
  knownFor: string;
  lead: string;
  areas: string[];
  industries: [CityIndustry, CityIndustry, CityIndustry];
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
}

export interface GccCountry {
  key: CountryKey;
  name: string;
  /** In a sentence or a crumb: "the UAE". */
  inText: string;
  locale: { lang: string; og: string };
  /** The local currency (user: supported as a transaction currency). */
  currency: string;
  knownFor: string;
  lead: string;
  /** What MAVRO does there for tax, payroll and language: only what the user confirmed (header). */
  compliance: { title: string; lead: string; tiles: CapabilityTile[] };
  industries: [CityIndustry, CityIndustry, CityIndustry];
  faq: { q: string; a: string }[];
  cities: GccCity[];
  seo: { title: string; description: string };
}

export const gccTemplate = {
  demo: 'Request a demo',
  industries: { title: 'Built for the way', rest: 'businesses here work.' },
  delivery: {
    title: 'How MAVRO',
    rest: 'reaches you.',
    tiles: (place: string): CapabilityTile[] => [
      {
        icon: 'pin',
        title: 'Served from India',
        body: `SaiSatwik Technologies serves businesses in ${place} from India: discovery, configuration and training run remotely, with on-site visits when agreed.`,
      },
      {
        icon: 'rocket',
        title: 'Live in 25–30 days',
        body: 'Implementation is phased: discovery and setup, priority modules live in week three, everything live in week four, with one dedicated resource throughout.',
      },
      {
        icon: 'headset',
        title: 'Support after go-live',
        body: 'AMS support: a dedicated contact, fixes and enhancements, and a monthly review of usage, open issues and your roadmap.',
      },
    ],
  },
  cities: { title: 'Find', rest: 'your city.', more: 'ERP software in' },
  nearby: { title: 'Other cities in', label: 'ERP software in' },
  faq: { title: 'Questions from', lead: 'What businesses here ask before a demo.' },
  cta: { title: 'See MAVRO', rest: 'run your process.', body: 'A demo built around your own documents and approvals, and a 25–30 day plan to go live.' },
};

export const gccCountries: GccCountry[] = [
  {
    key: 'ae',
    name: 'United Arab Emirates',
    inText: 'the UAE',
    locale: { lang: 'en-AE', og: 'en_AE' },
    currency: 'AED',
    knownFor: 'trading, logistics, construction and industry.',
    lead: 'For the UAE’s trading and re-export houses, logistics companies, contractors and manufacturers, on the mainland and in the free zones: orders, stock, projects, payroll with WPS and gratuity, and UAE VAT on one system, in AED and the other currencies you trade in.',
    compliance: {
      title: 'UAE VAT and payroll,',
      lead: 'Handled in the modules that create the records.',
      tiles: [
        { icon: 'receipt', title: 'UAE VAT', body: 'VAT at 5% on sales and purchases, your TRN on every tax invoice, and the figures for your VAT return, from the transactions.' },
        { icon: 'people', title: 'WPS salary files', body: 'Salary files for the UAE Wage Protection System, produced by HRMS and Payroll from the month’s attendance and pay.' },
        { icon: 'calendar', title: 'End-of-service gratuity', body: 'End-of-service gratuity worked out under UAE labour law for every employee, in HRMS and Payroll.' },
        { icon: 'finance', title: 'Arabic and AED', body: 'Arabic support, and AED alongside the other currencies you buy and sell in, with a live multi-currency P&L.' },
      ],
    },
    industries: [
      { slug: 'distribution', note: 'Trading and re-export houses supplying the Gulf, Africa and South Asia, where stock, credit and many currencies meet in one order book.' },
      { slug: 'logistics', note: 'Freight, warehousing and transport companies around the ports and free zones, moving goods across the region.' },
      { slug: 'construction-real-estate', note: 'Contractors and developers, tracking projects, sites, subcontractors and leases.' },
    ],
    faq: [
      {
        q: 'Does MAVRO handle UAE VAT?',
        a: 'Yes. MAVRO applies UAE VAT on sales and purchases, prints your TRN on tax invoices and gives the figures for your VAT return from the posted transactions.',
      },
      {
        q: 'Can MAVRO produce WPS salary files?',
        a: 'Yes. HRMS and Payroll produces salary files for the UAE Wage Protection System from the month’s attendance and pay, and posts payroll to the ledger.',
      },
      {
        q: 'Does MAVRO calculate end-of-service gratuity?',
        a: 'Yes. HRMS and Payroll works out end-of-service gratuity under UAE labour law for each employee.',
      },
      {
        q: 'Does SaiSatwik have an office in the UAE?',
        a: 'No. SaiSatwik Technologies serves UAE businesses from India: discovery, configuration and training run remotely on the 25–30 day plan, with on-site visits when agreed.',
      },
    ],
    cities: [
      {
        slug: 'dubai',
        name: 'Dubai',
        knownFor: 're-export trading, logistics and real estate.',
        lead: 'For Dubai’s trading houses in Deira and the free zones, the logistics companies around Jebel Ali, and its contractors and developers: multi-currency orders, warehouses, projects, payroll with WPS and gratuity, and UAE VAT on one system.',
        areas: ['Jebel Ali Free Zone (JAFZA)', 'Jebel Ali Port', 'Deira and Al Ras', 'Dubai Investments Park', 'Al Quoz'],
        industries: [
          { slug: 'distribution', note: 'Re-export trading houses in Deira and JAFZA, buying in one currency and selling in several, with credit to customers across the region.' },
          { slug: 'logistics', note: 'Warehousing, freight and transport companies around Jebel Ali Port and the free zone, where loads, gates and proof of delivery run all day.' },
          { slug: 'construction-real-estate', note: 'Contractors and developers across the city, tracking project budgets, subcontractors and leases.' },
        ],
        faq: [
          {
            q: 'Can a JAFZA company and a mainland company run on one MAVRO?',
            a: 'Yes. MAVRO runs several entities on one platform, with books per entity and stock by location, so a free zone company and a mainland company share one set of records.',
          },
          {
            q: 'Can MAVRO trade in AED, USD and other currencies?',
            a: 'Yes. Orders, purchases and invoices run in AED and other currencies, and the P&L is live across currencies.',
          },
          {
            q: 'Can MAVRO run a Jebel Ali warehouse?',
            a: 'Yes. Warehouse Management runs bin-level putaway, RF picking and dispatch with barcodes, and Gate Entry records every vehicle in and out against its documents.',
          },
        ],
        seo: {
          title: 'ERP software in Dubai for trading and logistics | MAVRO',
          description: 'ERP for Dubai’s trading houses in Deira and JAFZA, Jebel Ali logistics firms and contractors: multi-currency orders, warehouses, WPS payroll and UAE VAT.',
        },
      },
    ],
    seo: {
      title: 'ERP software in the UAE with VAT and WPS | MAVRO',
      description: 'MAVRO ERP for UAE traders, logistics firms, contractors and manufacturers: UAE VAT, WPS salary files, gratuity, Arabic and AED, served from India.',
    },
  },
];

export const gccPath = (country: { key: CountryKey }, city?: { slug: string }) =>
  `/${country.key}/erp-software${city ? `/${city.slug}` : ''}`;

/** The country and (on a city page) the city a path names. */
export function gccPlace(path: string) {
  const [, key, , slug] = path.split('/');
  const country = gccCountries.find((item) => item.key === key);
  const city = slug ? country?.cities.find((item) => item.slug === slug) : undefined;
  return { country, city };
}
