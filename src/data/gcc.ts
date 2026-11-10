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
  /** Well-known industrial areas, ports and zones (a country with no city pages names its own). */
  areas?: string[];
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
          {
            q: 'Can our buyers in other countries place orders online?',
            a: 'Yes. The Distributor / B2B Portal gives each buyer an order builder that checks schemes, stock and credit before the order is submitted, and shows their orders, credit and outstanding, and claims.',
          },
        ],
        seo: {
          title: 'ERP software in Dubai for trading and logistics | MAVRO',
          description: 'ERP for Dubai’s trading houses in Deira and JAFZA, Jebel Ali logistics firms and contractors: multi-currency orders, warehouses, WPS payroll and UAE VAT.',
        },
      },
      {
        slug: 'abu-dhabi',
        name: 'Abu Dhabi',
        knownFor: 'energy services, industry and construction.',
        lead: 'For the energy services firms, manufacturers and contractors of Abu Dhabi, from Mussafah and ICAD to KIZAD beside Khalifa Port: equipment and maintenance, fleets, plants, sites, payroll with WPS and gratuity, and UAE VAT on one system.',
        areas: ['Mussafah', 'Industrial City of Abu Dhabi (ICAD)', 'Khalifa Industrial Zone (KIZAD)', 'Khalifa Port'],
        industries: [
          { slug: 'manufacturing', note: 'Metals, building materials and food plants in ICAD and KIZAD, where production, stock and suppliers meet one plan.' },
          { slug: 'construction-real-estate', note: 'Contractors and developers working across the emirate, with subcontractors, equipment and site labour on every project.' },
          { slug: 'logistics', note: 'Freight and transport companies around Khalifa Port and the industrial zones, running their own fleets.' },
        ],
        faq: [
          {
            q: 'Can an energy services company manage its equipment in MAVRO?',
            a: 'Yes. Asset Management keeps every asset on a tagged register with its maintenance plan, calibration, spares and depreciation, and shows uptime and breakdowns by site.',
          },
          {
            q: 'Can MAVRO run a contractor’s vehicle and equipment fleet?',
            a: 'Yes. Fleet Management keeps vehicles, trips, fuel, maintenance and documents on one register, with each vehicle’s running cost in view.',
          },
          {
            q: 'Can a Mussafah contractor track subcontracted labour?',
            a: 'Yes. Contract Labour Purchase handles requisitions, deployment and attendance-based billing for contract workers, and Project Management costs them to each project.',
          },
          {
            q: 'Can we run tenders for materials and services in MAVRO?',
            a: 'Yes. Auction and Bidding runs reverse auctions, sealed bids and RFQs with approved vendors only, shows savings against the ceiling, and records the award and its approvals.',
          },
        ],
        seo: {
          title: 'ERP software in Abu Dhabi for industry and projects | MAVRO',
          description: 'ERP for Abu Dhabi’s energy services firms, ICAD and KIZAD manufacturers and contractors: assets, fleets, plants, projects, WPS payroll and UAE VAT.',
        },
      },
      {
        slug: 'sharjah',
        name: 'Sharjah',
        knownFor: 'manufacturing, wholesale and printing.',
        lead: 'For Sharjah’s manufacturers in its industrial areas and the SAIF and Hamriyah free zones, the wholesalers supplying the Northern Emirates, and its printers and publishers: production, buying across currencies, jobs, payroll with WPS and gratuity, and UAE VAT on one system.',
        areas: ['Sharjah Industrial Areas', 'Sharjah Airport International Free Zone (SAIF Zone)', 'Hamriyah Free Zone', 'Sharjah Publishing City'],
        industries: [
          { slug: 'manufacturing', note: 'Plastics, metal, chemical and food plants in the industrial areas and free zones, making to stock and to order.' },
          { slug: 'distribution', note: 'Wholesalers and distributors supplying retailers across Sharjah and the Northern Emirates, on credit.' },
          { slug: 'printing-packaging', note: 'Printers, publishers and packaging makers, including those in Sharjah Publishing City, running many jobs at once.' },
        ],
        faq: [
          {
            q: 'Can MAVRO cost production in a Sharjah plant?',
            a: 'Yes. Production Management runs work orders with their BOM and routing, and the material and hours booked against each order give its actual cost.',
          },
          {
            q: 'Can we buy from suppliers in India and China in their currencies?',
            a: 'Yes. Procure to Pay raises RFQs and purchase orders in the supplier’s currency, matches them to the goods receipt and invoice, and the Vendor Portal lets suppliers work online.',
          },
          {
            q: 'Can a Sharjah printer schedule jobs on its presses?',
            a: 'Yes. PPDS schedules jobs on each machine and shift against capacity, and Shop Floor Control shows output and downtime as the shift runs.',
          },
          {
            q: 'Can the shops we supply order from their phones?',
            a: 'Yes. The Retailer Portal lets shops order, see offers and loyalty points and raise returns from the app, and every order lands in your order book.',
          },
        ],
        seo: {
          title: 'ERP software in Sharjah for manufacturers | MAVRO',
          description: 'ERP for Sharjah’s manufacturers in its industrial areas and the SAIF and Hamriyah free zones, wholesalers and printers: production, buying and UAE VAT.',
        },
      },
    ],
    seo: {
      title: 'ERP software in the UAE with VAT and WPS | MAVRO',
      description: 'MAVRO ERP for UAE traders, logistics firms, contractors and manufacturers: UAE VAT, WPS salary files, gratuity, Arabic and AED, served from India.',
    },
  },
  {
    key: 'sa',
    name: 'Saudi Arabia',
    inText: 'Saudi Arabia',
    locale: { lang: 'en-SA', og: 'en_SA' },
    currency: 'SAR',
    knownFor: 'distribution, construction and industry.',
    lead: 'For Saudi distributors and wholesalers, contractors and manufacturers across the Kingdom’s cities and industrial cities: orders, stock, projects and plants on one system, with ZATCA e-invoicing, SAR and Arabic built in.',
    compliance: {
      title: 'ZATCA e-invoicing,',
      lead: 'Handled in the modules that create the records.',
      tiles: [
        { icon: 'receipt', title: 'ZATCA e-invoicing', body: 'E-invoices to ZATCA’s Fatoora requirements, with the QR code, integrated with ZATCA’s platform under Phase 2.' },
        { icon: 'claims', title: 'VAT on every e-invoice', body: 'Saudi VAT at the standard 15% on each e-invoice, from the order or contract that created it.' },
        { icon: 'finance', title: 'Arabic and SAR', body: 'Arabic support, and SAR alongside the other currencies you buy and sell in, with a live multi-currency P&L.' },
      ],
    },
    industries: [
      { slug: 'distribution', note: 'Distributors and wholesalers serving retailers across the Kingdom, with schemes, credit and long delivery routes.' },
      { slug: 'construction-real-estate', note: 'Contractors and developers on projects across the Kingdom, with budgets, subcontractors and equipment to track.' },
      { slug: 'manufacturing', note: 'Plants in the industrial cities, making building materials, plastics, metals and food to order and to stock.' },
    ],
    faq: [
      {
        q: 'Is MAVRO compliant with ZATCA e-invoicing?',
        a: 'Yes. MAVRO issues e-invoices to ZATCA’s Fatoora requirements, with the QR code, and integrates with ZATCA’s platform under Phase 2.',
      },
      {
        q: 'Can MAVRO run alongside SAP in our Saudi entity?',
        a: 'Yes. ERP Connect runs MAVRO beside SAP, Oracle or a legacy ERP, syncing two ways through the MAVRO Database, so SAP stays the system of record.',
      },
      {
        q: 'Does SaiSatwik have an office in Saudi Arabia?',
        a: 'No. SaiSatwik Technologies serves Saudi businesses from India: discovery, configuration and training run remotely on the 25–30 day plan, with on-site visits when agreed.',
      },
    ],
    cities: [
      {
        slug: 'riyadh',
        name: 'Riyadh',
        knownFor: 'head offices, construction and distribution.',
        lead: 'For the companies run from Riyadh with branches across the Kingdom, the contractors building in and around the capital, and the distributors of the central region: entities and branches, projects, channel and ZATCA e-invoicing on one system.',
        areas: ['Riyadh Second Industrial City', 'Sudair Industrial City', 'King Abdullah Financial District', 'Olaya'],
        industries: [
          { slug: 'construction-real-estate', note: 'Contractors and developers on projects in and around the capital, tracking budgets, milestones, subcontractors and change requests.' },
          { slug: 'distribution', note: 'Distributors serving the central region and beyond from Riyadh, with field sales, schemes and credit.' },
          { slug: 'it-services', note: 'Head offices, consultancies and service firms in the business districts, with projects, people and travel across branches.' },
        ],
        faq: [
          {
            q: 'Can a Riyadh head office see every branch in one place?',
            a: 'Yes. MAVRO runs entities and branches on one platform, with books per entity and stock by location, and role dashboards across them.',
          },
          {
            q: 'Can a contractor track change requests and their cost?',
            a: 'Yes. Project Management tracks each project against its approved budget and schedule, and sends change requests with their cost and time impact for approval.',
          },
          {
            q: 'Can field sales teams book orders on their phones?',
            a: 'Yes. Sales Force Automation gives reps beat plans and mobile order booking, with schemes and credit checked as the order is taken.',
          },
        ],
        seo: {
          title: 'ERP software in Riyadh with ZATCA e-invoicing | MAVRO',
          description: 'ERP for Riyadh head offices with branches across the Kingdom, contractors and distributors: entities, projects, field sales and ZATCA e-invoicing.',
        },
      },
      {
        slug: 'jeddah',
        name: 'Jeddah',
        knownFor: 'port trade, food and retail.',
        lead: 'For Jeddah’s importers and logistics companies working through Jeddah Islamic Port, its food makers and distributors, and its retail chains and online sellers: shipments, batches and shelf life, stores and marketplaces, and ZATCA e-invoicing on one system.',
        areas: ['Jeddah Islamic Port', 'Jeddah Industrial Cities', 'Al Khumrah', 'Al Sulaimaniyah'],
        industries: [
          { slug: 'logistics', note: 'Importers, freight forwarders and transporters moving goods through Jeddah Islamic Port to the rest of the Kingdom.' },
          { slug: 'food-beverage', note: 'Food makers and importers selling through distributors and stores, with batches and expiry on every line.' },
          { slug: 'retail-ecommerce', note: 'Retail chains and online sellers with stores, marketplaces and warehouses on one stock.' },
        ],
        faq: [
          {
            q: 'Can MAVRO track imported shipments to delivery?',
            a: 'Yes. Transportation Management builds shipments into loads and lanes, tracks them in a control tower and closes them with an electronic proof of delivery.',
          },
          {
            q: 'Can a Jeddah food business pick stock by expiry?',
            a: 'Yes. Inventory Management tracks every batch by expiry and allocates order lines first-expiry-first-out, so older stock leaves first.',
          },
          {
            q: 'Can a retailer sell in stores and on marketplaces from one stock?',
            a: 'Yes. Ecommerce Integration brings marketplace and webstore orders and returns into one order book and keeps stock in sync across channels.',
          },
        ],
        seo: {
          title: 'ERP software in Jeddah for trade, food and retail | MAVRO',
          description: 'ERP for Jeddah’s importers and logistics firms at Jeddah Islamic Port, food makers and retail chains: shipments, expiry, stores and ZATCA e-invoicing.',
        },
      },
      {
        slug: 'dammam',
        name: 'Dammam',
        knownFor: 'oil and gas services, petrochemicals and fabrication.',
        lead: 'For the oil and gas service companies, fabricators and chemical suppliers of Dammam, Al Khobar and nearby Jubail, and the logistics firms at King Abdulaziz Port: assets and maintenance, vendor audits, documents, shipments and ZATCA e-invoicing on one system.',
        areas: ['Dammam Second and Third Industrial Cities', 'Jubail Industrial City', 'King Abdulaziz Port', 'Al Khobar'],
        industries: [
          { slug: 'chemicals', note: 'Chemical makers and suppliers serving the petrochemical plants of the Eastern Province, with batches and documents for every material.' },
          { slug: 'manufacturing', note: 'Fabrication and engineering shops building to order for the energy sector, with long lead times and inspections.' },
          { slug: 'logistics', note: 'Freight and transport companies around King Abdulaziz Port and the industrial cities.' },
        ],
        faq: [
          {
            q: 'Can an oil and gas service company maintain its equipment in MAVRO?',
            a: 'Yes. Asset Management keeps a tagged register with each asset’s preventive maintenance, calibration, critical spares and depreciation, and uptime by site.',
          },
          {
            q: 'Can MAVRO audit our suppliers and keep their documents?',
            a: 'Yes. mVLens Vendor Audit plans audits, records findings and follows CAPA to closure, and Document Management keeps certificates and specifications versioned.',
          },
          {
            q: 'Can a fabricator track an order as a project?',
            a: 'Yes. Project Management tracks each order against its budget and milestones, while Production Management runs the work orders behind it.',
          },
        ],
        seo: {
          title: 'ERP software in Dammam for energy services | MAVRO',
          description: 'ERP for Dammam, Al Khobar and Jubail oil and gas service firms, fabricators and chemical suppliers: assets, vendor audits, documents and ZATCA e-invoicing.',
        },
      },
    ],
    seo: {
      title: 'ERP software in Saudi Arabia with ZATCA e-invoicing | MAVRO',
      description: 'MAVRO ERP for Saudi distributors, contractors and manufacturers: ZATCA Phase 2 e-invoicing with QR code, VAT, Arabic and SAR, served from India.',
    },
  },
  {
    key: 'qa',
    name: 'Qatar',
    inText: 'Qatar',
    locale: { lang: 'en-QA', og: 'en_QA' },
    currency: 'QAR',
    knownFor: 'construction, trading and logistics.',
    lead: 'For Qatar’s contractors and developers, its trading and distribution companies, and the logistics firms around Hamad Port and the industrial cities: projects, stock, orders and shipments on one system, in QAR and the other currencies you trade in.',
    areas: ['Doha', 'Hamad Port', 'Doha Industrial Area', 'Mesaieed Industrial City', 'Ras Laffan Industrial City'],
    compliance: {
      title: 'QAR, Arabic and several companies,',
      lead: 'Your companies, your currencies and the ERP you already run, on one platform.',
      tiles: [
        { icon: 'finance', title: 'Arabic and QAR', body: 'Arabic support, and QAR alongside the other currencies you buy and sell in, with a live multi-currency P&L.' },
        { icon: 'layers', title: 'Several companies, one system', body: 'Entities and branches on one platform, with books per entity and stock by location.' },
        { icon: 'link', title: 'Alongside your ERP', body: 'ERP Connect runs MAVRO beside SAP, Oracle or a legacy ERP, syncing two ways through the MAVRO Database.' },
      ],
    },
    industries: [
      { slug: 'construction-real-estate', note: 'Contractors and developers on projects across Doha and beyond, with budgets, subcontractors, equipment and site labour.' },
      { slug: 'distribution', note: 'Trading and distribution companies importing for the Qatari market, with stock, credit and several currencies.' },
      { slug: 'logistics', note: 'Freight, warehousing and transport companies around Hamad Port and the industrial cities of Mesaieed and Ras Laffan.' },
    ],
    faq: [
      {
        q: 'Can a Qatar contractor track subcontractors and equipment?',
        a: 'Yes. Project Management tracks each project against budget and milestones, Contract Labour Purchase handles subcontracted labour, and Asset Management and Fleet Management keep equipment and vehicles.',
      },
      {
        q: 'Can MAVRO trade in QAR and other currencies?',
        a: 'Yes. Orders, purchases and invoices run in QAR and other currencies, and the P&L is live across currencies.',
      },
      {
        q: 'Can MAVRO run a warehouse near Hamad Port?',
        a: 'Yes. Warehouse Management runs bin-level putaway, RF picking and dispatch with barcodes, and Transportation Management tracks shipments to proof of delivery.',
      },
      {
        q: 'Does SaiSatwik have an office in Qatar?',
        a: 'No. SaiSatwik Technologies serves Qatari businesses from India: discovery, configuration and training run remotely on the 25–30 day plan, with on-site visits when agreed.',
      },
    ],
    cities: [],
    seo: {
      title: 'ERP software in Qatar for contractors and traders | MAVRO',
      description: 'MAVRO ERP for Qatar’s contractors, trading companies and logistics firms near Hamad Port: projects, stock, shipments, Arabic and QAR, served from India.',
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
