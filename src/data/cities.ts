/*
 * City pages (D3): /erp-software (the index) and /erp-software/<city>, one template (src/pages/CityPage.tsx).
 * Decisions: DECISIONS.md, "D3 city pages". These pages are indexed, so every fact here is either MAVRO's (the
 * decks, docs/PRODUCT.md) or a public, checkable fact about the place. Never: city statistics, client names, PT slab
 * amounts, e-way bill thresholds, or an office where the user named none.
 *
 * Presence (user, 2026-11-09): "head office Greater Noida only, and other offices staff and partner in Noida,
 * Kolkata, Pune, Mumbai, Baddi, Lucknow, Delhi, Punjab, Bhopal, Bangalore, Chennai and other cities". The user did
 * not say which of those is an office, staff or a partner, so they are all worded the same neutral way
 * (`presence`), and only Greater Noida shows an address.
 *
 * State facts, checked 2026-11-09:
 * - GST state codes (first two digits of a GSTIN): Delhi 07, Uttar Pradesh 09, Haryana 06, Maharashtra 27,
 *   Gujarat 24, Tamil Nadu 33, Karnataka 29, Telangana 36, West Bengal 19, Punjab 03, Himachal Pradesh 02,
 *   Madhya Pradesh 23, Rajasthan 08. Sources: https://www.mastersindia.co/gst/list-of-state-code-under-gst/,
 *   https://razorpay.com/learn/gst-state-code-list-and-jurisdiction-under-gst/
 * - Professional tax levied in Maharashtra, Gujarat, Karnataka, Tamil Nadu, Telangana, West Bengal and Madhya
 *   Pradesh; not in Delhi, Uttar Pradesh, Haryana or Rajasthan; Punjab levies the Punjab State Development Tax
 *   (Rs 200 a month, deducted by the employer). Himachal Pradesh: sources conflict, so its page says nothing about
 *   it. Sources: https://housing.com/news/professional-tax-in-india-rates-exemption-and-applicability,
 *   https://www.kanakkupillai.com/learn/state-wise-professional-tax-due-dates-in-india/,
 *   https://taxguru.in/?p=646476 (Punjab State Development Tax Act, 2018)
 */
import type { IconName } from '../components/Icon';
import type { IndustrySlug } from './home';

export type StateKey =
  | 'delhi'
  | 'uttar-pradesh'
  | 'haryana'
  | 'maharashtra'
  | 'gujarat'
  | 'tamil-nadu'
  | 'karnataka'
  | 'telangana'
  | 'west-bengal'
  | 'punjab'
  | 'himachal-pradesh'
  | 'madhya-pradesh'
  | 'rajasthan';

export interface IndianState {
  name: string;
  /** schema.org: State, or the National Capital Territory for Delhi. */
  gstCode: string;
  /** What payroll deducts there beyond PF, ESI and TDS; null where sources disagree (say nothing). */
  pt: string | null;
}

export const states: Record<StateKey, IndianState> = {
  delhi: { name: 'Delhi', gstCode: '07', pt: 'Delhi does not levy professional tax, so payroll runs PF, ESI and TDS without it.' },
  'uttar-pradesh': { name: 'Uttar Pradesh', gstCode: '09', pt: 'Uttar Pradesh does not levy professional tax, so payroll runs PF, ESI and TDS without it.' },
  haryana: { name: 'Haryana', gstCode: '06', pt: 'Haryana does not levy professional tax, so payroll runs PF, ESI and TDS without it.' },
  maharashtra: { name: 'Maharashtra', gstCode: '27', pt: 'Maharashtra levies professional tax, deducted in payroll alongside PF, ESI and TDS.' },
  gujarat: { name: 'Gujarat', gstCode: '24', pt: 'Gujarat levies professional tax, deducted in payroll alongside PF, ESI and TDS.' },
  'tamil-nadu': { name: 'Tamil Nadu', gstCode: '33', pt: 'Tamil Nadu levies professional tax, deducted in payroll alongside PF, ESI and TDS.' },
  karnataka: { name: 'Karnataka', gstCode: '29', pt: 'Karnataka levies professional tax, deducted in payroll alongside PF, ESI and TDS.' },
  telangana: { name: 'Telangana', gstCode: '36', pt: 'Telangana levies professional tax, deducted in payroll alongside PF, ESI and TDS.' },
  'west-bengal': { name: 'West Bengal', gstCode: '19', pt: 'West Bengal levies professional tax, deducted in payroll alongside PF, ESI and TDS.' },
  punjab: { name: 'Punjab', gstCode: '03', pt: 'Punjab levies the Punjab State Development Tax, deducted by the employer in payroll alongside PF, ESI and TDS.' },
  'himachal-pradesh': { name: 'Himachal Pradesh', gstCode: '02', pt: null },
  'madhya-pradesh': { name: 'Madhya Pradesh', gstCode: '23', pt: 'Madhya Pradesh levies professional tax, deducted in payroll alongside PF, ESI and TDS.' },
  rajasthan: { name: 'Rajasthan', gstCode: '08', pt: 'Rajasthan does not levy professional tax, so payroll runs PF, ESI and TDS without it.' },
};

export type Region = 'north' | 'west' | 'south' | 'east' | 'central';

export const regions: Record<Region, string> = {
  north: 'Delhi NCR and North India',
  west: 'West India',
  south: 'South India',
  east: 'East India',
  central: 'Central India',
};

/**
 * - head-office: SaiSatwik's head office is in the city (Greater Noida, the deck's address).
 * - team: the user named the city among those with an office, staff or a partner.
 * - state-team: the user named the city's state (Punjab).
 * - remote: none named; served remotely, on site when agreed (the deck's implementation model).
 */
export type Presence = 'head-office' | 'team' | 'state-team' | 'remote';

export interface CityIndustry {
  slug: IndustrySlug;
  /** What that industry is in this city, in one or two lines: public, well-known facts only. */
  note: string;
}

export interface City {
  slug: string;
  name: string;
  /** Another name people search for (Bangalore, Gurgaon). */
  aka?: string;
  state: StateKey;
  region: Region;
  presence: Presence;
  /** "known for" line: the index card and the hero headline's second half. */
  knownFor: string;
  /** Hero lead: who in this city MAVRO is for. */
  lead: string;
  /** Well-known industrial areas, estates and corridors in and around the city. */
  areas: string[];
  /** Three industries strong in the city, each linked to its industry page. */
  industries: [CityIndustry, CityIndustry, CityIndustry];
  /** Questions people in this city ask: each about something true of this city, not the name swapped. */
  faq: { q: string; a: string }[];
  /** Two to four nearby city pages. */
  nearby: string[];
  seo: { title: string; description: string };
}

/** The template's fixed copy. */
export const cityTemplate = {
  indexPath: '/erp-software',
  crumb: 'ERP software in India',
  /** The hero headline before the city's name: "ERP software in Pune." */
  heroTitle: 'ERP software in',
  demo: 'Request a demo',
  icon: 'pin' as IconName,
  industries: { title: 'Built for the way', rest: 'businesses here work.' },
  compliance: { title: 'Compliance in', rest: 'built in.', lead: 'GST and statutory payroll handled in the modules that create the records.' },
  delivery: { title: 'How MAVRO', rest: 'reaches you.' },
  nearby: { title: 'Nearby', label: 'ERP software in' },
  faq: { title: 'Questions from', lead: 'What businesses here ask before a demo.' },
  cta: { title: 'See MAVRO', rest: 'run your process.', body: 'A demo built around your own documents and approvals, and a 25–30 day plan to go live.' },
  presence: {
    'head-office': (city: string) => `SaiSatwik Technologies, the company behind MAVRO, has its head office in ${city}.`,
    team: (city: string) => `SaiSatwik Technologies has a team or partner on the ground in ${city}.`,
    'state-team': (_city: string, state: string) => `SaiSatwik Technologies has a team or partner on the ground in ${state}.`,
    remote: (city: string) => `Businesses in ${city} are served remotely by SaiSatwik Technologies, with on-site work when agreed.`,
  } satisfies Record<Presence, (city: string, state: string) => string>,
  /** The deck's implementation model, the same everywhere. */
  rollout: 'Implementation is phased and takes 25–30 days: discovery and setup, priority modules live in week three, everything live in week four, with one dedicated resource throughout.',
  support: 'After go-live, AMS support: a dedicated contact, fixes and enhancements, and a monthly review of usage, open issues and your roadmap.',
};

export const cities: City[] = [
  {
    slug: 'greater-noida',
    name: 'Greater Noida',
    state: 'uttar-pradesh',
    region: 'north',
    presence: 'head-office',
    knownFor: 'electronics, engineering and logistics along the Yamuna Expressway.',
    lead: 'MAVRO is made in Greater Noida, by SaiSatwik Technologies. For the manufacturers, warehouses and exporters around its industrial sectors and the Yamuna Expressway: production, buying, stock, payroll and GST on one system, implemented by a team down the road.',
    areas: ['Ecotech industrial sectors', 'Kasna', 'Surajpur', 'Yamuna Expressway (YEIDA) sectors'],
    industries: [
      { slug: 'manufacturing', note: 'Electronics, consumer durables and engineering plants across the Ecotech sectors, where work orders, shift output and supplier deliveries need to meet on one record.' },
      { slug: 'logistics', note: 'Warehousing and logistics around the Dadri container depot and the Yamuna Expressway, where loads, gates and proof of delivery matter as much as the books.' },
      { slug: 'distribution', note: 'Distributors serving the NCR market from Greater Noida, with dealers and retailers ordering against one stock figure.' },
    ],
    faq: [
      {
        q: 'Where is the MAVRO team based?',
        a: 'SaiSatwik Technologies, which makes MAVRO, has its head office at 1415, 13th Floor, Galaxy Blue Sapphire, Greater Noida 201009. Businesses in Greater Noida can meet the team in person for discovery, training and go-live.',
      },
      {
        q: 'Do Greater Noida businesses pay professional tax on salaries?',
        a: 'No. Uttar Pradesh does not levy professional tax, so MAVRO’s HRMS and Payroll computes PF, ESI and TDS for Greater Noida employees without it, and posts payroll to the ledger.',
      },
      {
        q: 'Can MAVRO handle a plant in Greater Noida and a warehouse elsewhere?',
        a: 'Yes. MAVRO runs multiple plants, warehouses and entities on one platform, with stock by location and books per entity, so a Greater Noida plant and a depot in another state share one set of records.',
      },
    ],
    nearby: ['noida', 'ghaziabad', 'delhi', 'faridabad'],
    seo: {
      title: 'ERP software in Greater Noida, from a local team | MAVRO',
      description: 'MAVRO is made in Greater Noida: ERP for manufacturers, warehouses and distributors, with GST and payroll built in and a head-office team down the road.',
    },
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'maharashtra',
    region: 'west',
    presence: 'team',
    knownFor: 'auto components, engineering and IT services.',
    lead: 'For Pune’s auto component makers and engineering plants in Chakan, Talegaon, Bhosari and Ranjangaon, and its IT and services firms: production, the shop floor, buying, payroll with Maharashtra professional tax, and GST on one system.',
    areas: ['Chakan MIDC', 'Talegaon MIDC', 'Pimpri-Chinchwad and Bhosari', 'Ranjangaon MIDC', 'Hinjewadi'],
    industries: [
      { slug: 'manufacturing', note: 'Tier-1 and tier-2 auto component suppliers in Chakan, Talegaon and Bhosari, running OEM and aftermarket lines where OEE by shift and supplier schedules decide the month.' },
      { slug: 'it-services', note: 'IT and engineering services firms around Hinjewadi and Kharadi, tracking projects, time cards and payroll for growing teams.' },
      { slug: 'distribution', note: 'Distributors and dealers across western Maharashtra, with schemes and credit checked as orders come in.' },
    ],
    faq: [
      {
        q: 'Can MAVRO run an auto component plant in Chakan?',
        a: 'Yes. Production Management and Shop Floor Control cover work orders, BOM and routing for OEM and aftermarket lines, with OEE, WIP and output by shift, and the Vendor Portal and Procure to Pay handle the supplier base.',
      },
      {
        q: 'Does MAVRO deduct Maharashtra professional tax?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Maharashtra alongside PF, ESI and TDS, and posts payroll to the ledger.',
      },
      {
        q: 'Is there MAVRO support in Pune?',
        a: 'SaiSatwik Technologies has a team or partner on the ground in Pune, and implementation follows the same 25–30 day plan, with on-site work for discovery, training and go-live.',
      },
    ],
    nearby: ['mumbai', 'nashik'],
    seo: {
      title: 'ERP software in Pune for auto and engineering firms | MAVRO',
      description: 'ERP for Pune’s auto component makers in Chakan and Talegaon, engineering plants and IT firms: production, shop floor, payroll with professional tax and GST.',
    },
  },
  {
    slug: 'surat',
    name: 'Surat',
    state: 'gujarat',
    region: 'west',
    presence: 'remote',
    knownFor: 'textiles, diamonds and chemicals.',
    lead: 'For Surat’s textile weavers, processors and traders, its chemical units in Hazira and Sachin, and the businesses around them: lot-wise stock, job work, dispatch, payroll with Gujarat professional tax, and GST on one system.',
    areas: ['Sachin GIDC', 'Pandesara GIDC', 'Hazira', 'Udhna', 'Ring Road textile markets'],
    industries: [
      { slug: 'textiles-apparel', note: 'Weaving, processing and trading of man-made fabrics, where lots, shades and job work move between units and markets every day.' },
      { slug: 'chemicals', note: 'Chemical, dye and petrochemical units in Sachin and Hazira, where batches, materials and their documents must trace from supplier to customer.' },
      { slug: 'distribution', note: 'Wholesalers and traders around the Ring Road markets, selling to retailers across India on credit and schemes.' },
    ],
    faq: [
      {
        q: 'Can MAVRO track fabric by lot through job work?',
        a: 'Yes. Inventory Management tracks fabric and other materials by lot across stores and job workers, and material issued to a production order is booked against it, so a lot can be traced from grey fabric to dispatch.',
      },
      {
        q: 'Does MAVRO deduct Gujarat professional tax?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Gujarat alongside PF, ESI and TDS, and posts payroll to the ledger.',
      },
      {
        q: 'How is a Surat business implemented if the team is not local?',
        a: 'Discovery, configuration and training run remotely on the 25–30 day plan, with on-site work when agreed, and one dedicated resource stays with the project from kickoff to AMS support.',
      },
    ],
    nearby: ['ahmedabad', 'vadodara', 'mumbai'],
    seo: {
      title: 'ERP software in Surat for textile and chemical units | MAVRO',
      description: 'ERP for Surat’s textile weavers, processors and traders and chemical units in Sachin and Hazira: lot-wise stock, job work, payroll and GST.',
    },
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    state: 'delhi',
    region: 'north',
    presence: 'team',
    knownFor: 'wholesale trade, printing and professional services.',
    lead: 'For Delhi’s wholesalers and distributors in Sadar Bazaar, Chandni Chowk and Khari Baoli, the printing and packaging units of Okhla and Naraina, and the firms in its business districts: orders, credit, stock, jobs, projects and GST on one system.',
    areas: ['Okhla Industrial Area', 'Naraina Industrial Area', 'Wazirpur', 'Bawana', 'Sadar Bazaar and Chandni Chowk markets'],
    industries: [
      { slug: 'distribution', note: 'Wholesale markets that supply retailers across North India, where credit limits, schemes and dispatch decide whether an order is worth taking.' },
      { slug: 'printing-packaging', note: 'Printing presses and packaging converters in Okhla and Naraina, running many short jobs a day for publishers, brands and exporters.' },
      { slug: 'it-services', note: 'Consultancies, agencies and IT firms in the business districts, billing clients by project and paying teams on time.' },
    ],
    faq: [
      {
        q: 'Can MAVRO control credit for a Delhi wholesaler selling to hundreds of retailers?',
        a: 'Yes. Order to Cash checks each order against the customer’s credit limit and overdue balance as it is entered, holds it for approval if needed, and works collections from invoice ageing.',
      },
      {
        q: 'Do Delhi employers deduct professional tax?',
        a: 'No. Delhi does not levy professional tax, so MAVRO’s HRMS and Payroll runs PF, ESI and TDS for Delhi employees without it.',
      },
      {
        q: 'Can a Delhi print shop see the cost of each job?',
        a: 'Yes. Each job card in Production Management carries its BOM and routing, and material and press time booked against it give the job’s actual cost beside the estimate.',
      },
    ],
    nearby: ['noida', 'gurugram', 'faridabad', 'ghaziabad'],
    seo: {
      title: 'ERP software in Delhi for wholesalers and printers | MAVRO',
      description: 'ERP for Delhi’s wholesalers and distributors, printing and packaging units in Okhla and Naraina, and service firms: credit, stock, job costing, payroll and GST.',
    },
  },
  {
    slug: 'noida',
    name: 'Noida',
    state: 'uttar-pradesh',
    region: 'north',
    presence: 'team',
    knownFor: 'electronics manufacturing, IT and garment exports.',
    lead: 'For Noida’s electronics and mobile phone plants, its IT and IT-enabled services companies along the Noida–Greater Noida Expressway, and its garment exporters: serial-tracked stock, production, projects, payroll and GST on one system.',
    areas: ['Sectors 57, 58, 59, 63 and 64', 'Phase II', 'Noida Special Economic Zone', 'Sector 62 and the Expressway IT sectors'],
    industries: [
      { slug: 'manufacturing', note: 'Electronics and mobile phone assembly and their component suppliers, where every unit carries a serial number and lines run in shifts.' },
      { slug: 'it-services', note: 'IT and IT-enabled services companies in Sector 62 and along the Expressway, with large teams, client projects and shift rosters.' },
      { slug: 'textiles-apparel', note: 'Garment exporters in Phase II and the Special Economic Zone, cutting and stitching against buyer orders and job workers.' },
    ],
    faq: [
      {
        q: 'Can MAVRO track electronics stock by serial number?',
        a: 'Yes. Inventory Management tracks items by batch, lot and serial across warehouses, so each unit can be traced from receipt through production to dispatch.',
      },
      {
        q: 'Can a Noida IT company run shift rosters and payroll in MAVRO?',
        a: 'Yes. Roster Ledger builds shift rosters and tracks coverage, and HRMS and Payroll records attendance and pays employees with PF, ESI and TDS; Uttar Pradesh does not levy professional tax.',
      },
      {
        q: 'How does a garment exporter manage job workers in MAVRO?',
        a: 'Fabric issued to job workers stays on the books by lot in Inventory Management, and Production Management records what comes back against each production order.',
      },
    ],
    nearby: ['greater-noida', 'delhi', 'ghaziabad'],
    seo: {
      title: 'ERP software in Noida for electronics and IT firms | MAVRO',
      description: 'ERP for Noida’s electronics and mobile phone plants, IT and ITES companies and garment exporters: serial-tracked stock, rosters, payroll and GST on one system.',
    },
  },
  {
    slug: 'gurugram',
    name: 'Gurugram',
    aka: 'Gurgaon',
    state: 'haryana',
    region: 'north',
    presence: 'remote',
    knownFor: 'auto components, corporate offices and warehousing.',
    lead: 'For the auto component suppliers of Gurugram (Gurgaon) and IMT Manesar, the regional and India offices of companies run on SAP or Oracle, and the warehouses along NH-48: production, buying, payroll and GST, alongside the ERP you already have.',
    areas: ['IMT Manesar', 'Udyog Vihar', 'Cyber City', 'NH-48 warehousing belt'],
    industries: [
      { slug: 'manufacturing', note: 'Auto component suppliers in Manesar and Udyog Vihar, delivering to vehicle makers’ schedules where a missed shift shows up as a missed delivery.' },
      { slug: 'it-services', note: 'Corporate, consulting and technology offices in Cyber City and along Golf Course Road, with travel, expenses and projects across teams.' },
      { slug: 'logistics', note: 'Warehouses and transporters on the NH-48 corridor serving North India, where loads, vehicles and proof of delivery need one view.' },
    ],
    faq: [
      {
        q: 'Our Gurugram office runs on SAP at group level. Can we still use MAVRO?',
        a: 'Yes. ERP Connect runs MAVRO alongside SAP, Oracle or Tally, syncing two ways through the MAVRO Database, so teams get MAVRO’s screens and mobile app while SAP stays the system of record.',
      },
      {
        q: 'Can MAVRO plan production to an OEM’s delivery schedule?',
        a: 'Yes. PPDS schedules work orders on each line and shift against capacity and material, and Shop Floor Control shows output and downtime live, so a slip is seen before the delivery is due.',
      },
      {
        q: 'Do Haryana employers deduct professional tax in MAVRO?',
        a: 'Haryana does not levy professional tax, so HRMS and Payroll runs PF, ESI and TDS for Gurugram employees without it.',
      },
    ],
    nearby: ['delhi', 'faridabad', 'noida'],
    seo: {
      title: 'ERP software in Gurugram (Gurgaon) and Manesar | MAVRO',
      description: 'ERP for Gurugram and Manesar auto component suppliers, corporate offices on SAP or Oracle, and NH-48 warehouses: production, payroll, GST and ERP Connect.',
    },
  },
  {
    slug: 'faridabad',
    name: 'Faridabad',
    state: 'haryana',
    region: 'north',
    presence: 'remote',
    knownFor: 'engineering, auto parts and tractors.',
    lead: 'For Faridabad’s engineering works, auto part and tractor component makers and garment exporters across its industrial sectors and Ballabgarh: production, contract labour, buying, payroll and GST on one system.',
    areas: ['Sectors 24, 25 and 27', 'Ballabgarh', 'IMT Faridabad', 'Old Faridabad industrial area'],
    industries: [
      { slug: 'manufacturing', note: 'Forging, machining and fabrication units making auto parts, tractor components and electrical goods, often with a large contract workforce.' },
      { slug: 'textiles-apparel', note: 'Garment export houses stitching for international buyers, where orders, styles and job workers have to stay in step.' },
      { slug: 'distribution', note: 'Industrial distributors supplying bearings, tools and spares to plants across NCR, on credit.' },
    ],
    faq: [
      {
        q: 'Can MAVRO keep contractor compliance in order for a Faridabad plant?',
        a: 'Yes. Contract Labour Supply checks CLRA licences, PF, ESIC and wage evidence before a contractor’s bill is certified, and Contract Labour Purchase tracks requisitions, deployment and attendance-based billing.',
      },
      {
        q: 'Can MAVRO record weighbridge readings at the gate?',
        a: 'Yes. Gate Entry records every vehicle in and out against its PO or invoice, with weighbridge integration and a security audit trail.',
      },
      {
        q: 'Is professional tax deducted for Faridabad employees?',
        a: 'Haryana does not levy professional tax, so MAVRO’s payroll runs PF, ESI and TDS for Faridabad employees without it.',
      },
    ],
    nearby: ['delhi', 'gurugram', 'greater-noida'],
    seo: {
      title: 'ERP software in Faridabad for engineering units | MAVRO',
      description: 'ERP for Faridabad’s engineering works, auto part and tractor component makers and garment exporters: production, contract labour, gate, payroll and GST.',
    },
  },
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    state: 'uttar-pradesh',
    region: 'north',
    presence: 'remote',
    knownFor: 'steel, fabrication, engineering and food processing.',
    lead: 'For Ghaziabad’s steel, fabrication and engineering units in Sahibabad, Loni and along Meerut Road, and the warehouses on the Delhi–Meerut Expressway: order-wise job costing, gate and weighbridge, stock, payroll and GST on one system.',
    areas: ['Sahibabad Industrial Area', 'Loni', 'Meerut Road industrial area', 'Kavi Nagar', 'Delhi–Meerut Expressway'],
    industries: [
      { slug: 'manufacturing', note: 'Steel processing, structural fabrication and engineering units making to order, where every order needs its own cost and delivery date.' },
      { slug: 'logistics', note: 'Warehouses and transporters along the Delhi–Meerut Expressway, moving goods between NCR and western Uttar Pradesh.' },
      { slug: 'food-beverage', note: 'Food and beverage makers, long part of Ghaziabad’s industry around Mohan Nagar, where batches, shelf life and distributors move together.' },
    ],
    faq: [
      {
        q: 'Can a Ghaziabad fabrication unit cost each customer order?',
        a: 'Yes. Production Management runs a work order per customer order with its BOM and routing, and the material and hours booked against it give the order’s actual cost.',
      },
      {
        q: 'How does MAVRO handle steel coming in by weight?',
        a: 'Gate Entry records the vehicle and the weighbridge reading against the purchase order, and the goods receipt in Procure to Pay is matched to the PO and invoice before payment.',
      },
      {
        q: 'Does Uttar Pradesh need professional tax in payroll?',
        a: 'No. Uttar Pradesh does not levy professional tax, so HRMS and Payroll computes PF, ESI and TDS for Ghaziabad employees without it.',
      },
    ],
    nearby: ['noida', 'delhi', 'greater-noida'],
    seo: {
      title: 'ERP software in Ghaziabad for steel and engineering | MAVRO',
      description: 'ERP for Ghaziabad’s steel, fabrication and engineering units in Sahibabad and Loni, and Expressway warehouses: job costing, weighbridge, payroll and GST.',
    },
  },
  {
    slug: 'lucknow',
    name: 'Lucknow',
    state: 'uttar-pradesh',
    region: 'north',
    presence: 'team',
    knownFor: 'chikankari, trade and a growing services sector.',
    lead: 'For Lucknow’s chikankari and garment businesses working with artisans and job workers, the traders and distributors supplying central Uttar Pradesh, and its growing IT and services firms: job work, stock, credit, projects, payroll and GST on one system.',
    areas: ['Amausi Industrial Area', 'Chinhat', 'Talkatora', 'Aminabad and Chowk markets'],
    industries: [
      { slug: 'textiles-apparel', note: 'Chikankari embroidery and garment makers, where fabric goes out to artisans and job workers and comes back piece by piece.' },
      { slug: 'distribution', note: 'Traders and distributors supplying retailers across central Uttar Pradesh, with schemes and credit to manage.' },
      { slug: 'it-services', note: 'IT and services firms growing in the state capital, tracking projects, people and costs.' },
    ],
    faq: [
      {
        q: 'Can MAVRO track fabric sent out to artisans for embroidery?',
        a: 'Yes. Fabric issued for job work stays on the books by lot in Inventory Management, and what comes back is recorded against the production order, so pieces still out with each worker are visible.',
      },
      {
        q: 'Is there a MAVRO team in Lucknow?',
        a: 'SaiSatwik Technologies has a team or partner on the ground in Lucknow, and implementation follows the 25–30 day plan with on-site work for discovery, training and go-live.',
      },
      {
        q: 'Can distributors in Lucknow give their retailers an ordering app?',
        a: 'Yes. The Retailer Portal lets retailers order, see offers and loyalty points and raise returns from their phone, and the orders land in the distributor’s order book.',
      },
    ],
    nearby: ['kanpur', 'noida', 'delhi'],
    seo: {
      title: 'ERP software in Lucknow for traders and garments | MAVRO',
      description: 'ERP for Lucknow’s chikankari and garment makers, traders and distributors and services firms: job work, stock, credit, retailer app, payroll and GST.',
    },
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'maharashtra',
    region: 'west',
    presence: 'team',
    knownFor: 'pharma head offices, trading and port logistics.',
    lead: 'For the pharma and chemical companies run from Mumbai with plants in Taloja, Tarapur and beyond, the trading houses of its markets, and the warehouses of Bhiwandi and the port at Nhava Sheva: plants, batches, stock, payroll and GST on one system.',
    areas: ['Taloja MIDC', 'TTC MIDC (Thane–Belapur)', 'Tarapur MIDC', 'Bhiwandi warehousing', 'Jawaharlal Nehru Port, Nhava Sheva'],
    industries: [
      { slug: 'pharma', note: 'Pharma companies with head offices in Mumbai and plants in Maharashtra and other states, where batch records and QC release have to reach the head office the same day.' },
      { slug: 'logistics', note: 'Warehouses in Bhiwandi and transporters serving the port, moving imports and exports through North Konkan every day.' },
      { slug: 'chemicals', note: 'Speciality and bulk chemical units in the Thane–Belapur belt, Taloja and Tarapur, where batches and material documents must trace end to end.' },
    ],
    faq: [
      {
        q: 'Our head office is in Mumbai and our plants are in other states. Can MAVRO cover both?',
        a: 'Yes. MAVRO runs multiple entities and plants on one platform, so the Mumbai office sees batch records, QC release, stock and finance from every plant as they are posted.',
      },
      {
        q: 'Can MAVRO run a Bhiwandi warehouse?',
        a: 'Yes. Warehouse Management runs bin-level putaway, RF picking and dispatch with barcodes, and Gate Entry records every vehicle in and out against its documents.',
      },
      {
        q: 'We trade on Tally today. Can we add MAVRO without moving the books?',
        a: 'Yes. ERP Connect runs MAVRO alongside Tally, syncing two ways through the MAVRO Database, so the accounts stay in Tally while teams use MAVRO’s screens and mobile app.',
      },
    ],
    nearby: ['pune', 'nashik', 'surat'],
    seo: {
      title: 'ERP software in Mumbai for pharma and trading | MAVRO',
      description: 'ERP for Mumbai’s pharma and chemical companies with plants in Taloja and Tarapur, trading houses and Bhiwandi warehouses: batches, stock, payroll and GST.',
    },
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'gujarat',
    region: 'west',
    presence: 'remote',
    knownFor: 'pharma, chemicals and textiles.',
    lead: 'For Ahmedabad’s pharma makers around Changodar, its chemical and dye units in Vatva, Naroda and Odhav, and its textile mills and processors: batch production, QC release, lot traceability, payroll with Gujarat professional tax, and GST on one system.',
    areas: ['Vatva GIDC', 'Naroda GIDC', 'Odhav GIDC', 'Changodar', 'Sanand'],
    industries: [
      { slug: 'pharma', note: 'Formulation and API makers in and around Changodar, where batch records, QC release and expiry decide what can ship.' },
      { slug: 'chemicals', note: 'Dye, pigment and speciality chemical units in Vatva, Naroda and Odhav, running batches against recipes.' },
      { slug: 'textiles-apparel', note: 'Textile mills and processors in the city long known for cotton textiles, tracking lots from fabric to finished goods.' },
    ],
    faq: [
      {
        q: 'Can MAVRO hold a pharma batch until QC releases it?',
        a: 'Yes. In Production Management no batch reaches finished goods without QC release, and Inventory Management tracks every batch by expiry, so nothing ships before it is released.',
      },
      {
        q: 'Can a dye unit in Vatva trace a batch to its raw materials?',
        a: 'Yes. Every material is tracked by batch and lot, so a finished batch traces back to the lots it consumed and forward to the customers it reached.',
      },
      {
        q: 'Does MAVRO deduct Gujarat professional tax for Ahmedabad employees?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Gujarat alongside PF, ESI and TDS, and posts payroll to the ledger.',
      },
    ],
    nearby: ['vadodara', 'surat', 'rajkot'],
    seo: {
      title: 'ERP software in Ahmedabad for pharma and chemicals | MAVRO',
      description: 'ERP for Ahmedabad’s pharma makers, chemical and dye units in Vatva, Naroda and Odhav, and textile processors: batches, QC release, payroll and GST.',
    },
  },
  {
    slug: 'vadodara',
    name: 'Vadodara',
    state: 'gujarat',
    region: 'west',
    presence: 'remote',
    knownFor: 'chemicals, petrochemicals and engineering.',
    lead: 'For Vadodara’s chemical and petrochemical units in Nandesari and around the refinery belt, and its engineering and power equipment makers in Makarpura, Por and Savli: batches, vendor audits, controlled documents, projects, payroll and GST on one system.',
    areas: ['Nandesari GIDC', 'Makarpura GIDC', 'Por GIDC', 'Savli GIDC', 'Waghodia'],
    industries: [
      { slug: 'chemicals', note: 'Chemical and petrochemical units in Nandesari and nearby, where raw materials are audited and every batch has its documents.' },
      { slug: 'manufacturing', note: 'Engineering, electrical and power equipment makers in Makarpura, Por and Savli, building to order with long lead times.' },
      { slug: 'construction-real-estate', note: 'Contractors and project companies serving the plants of central Gujarat, tracking budgets, milestones and site labour.' },
    ],
    faq: [
      {
        q: 'Can MAVRO manage audits of our chemical suppliers?',
        a: 'Yes. mVLens Vendor Audit plans supplier audits, records findings, follows CAPA to closure and keeps quality agreements per supplier.',
      },
      {
        q: 'Can we keep specifications and data sheets under version control?',
        a: 'Yes. Document Management keeps documents versioned and approved, with every change on record and requests for documents tracked.',
      },
      {
        q: 'Can MAVRO track a long-lead engineering order as a project?',
        a: 'Yes. Project Management tracks each order against its budget and milestones with change requests, while Production Management runs the work orders behind it.',
      },
    ],
    nearby: ['ahmedabad', 'surat', 'indore'],
    seo: {
      title: 'ERP software in Vadodara for chemical units | MAVRO',
      description: 'ERP for Vadodara’s chemical units in Nandesari and engineering makers in Makarpura, Por and Savli: batches, vendor audits, documents, projects and GST.',
    },
  },
  {
    slug: 'rajkot',
    name: 'Rajkot',
    state: 'gujarat',
    region: 'west',
    presence: 'remote',
    knownFor: 'castings, pumps, engines and auto parts.',
    lead: 'For Rajkot’s foundries, pump and engine makers and auto part manufacturers in Aji, Shapar–Veraval and Metoda, and the edible oil mills of Saurashtra: production, rework, dealers, payroll with Gujarat professional tax, and GST on one system.',
    areas: ['Aji GIDC', 'Shapar–Veraval industrial area', 'Metoda GIDC', 'Lodhika GIDC'],
    industries: [
      { slug: 'manufacturing', note: 'Foundries, machine shops and makers of diesel engines, pumps and auto parts, where rework and rejection eat into every order.' },
      { slug: 'distribution', note: 'Pump and engine makers selling through dealers across India, with dealer stock, schemes and warranty claims to manage.' },
      { slug: 'food-beverage', note: 'Groundnut and cottonseed oil mills of Saurashtra, running batches against seasonal seed buying.' },
    ],
    faq: [
      {
        q: 'Can MAVRO show rework and rejection on a Rajkot shop floor?',
        a: 'Yes. Shop Floor Control records output, downtime and rework by job card and shift, so rejection is seen as it happens, not at month end.',
      },
      {
        q: 'Can our dealers see their stock and claims online?',
        a: 'Yes. The Dealer Portal shows dealers their offtake and stock cover, suggests replenishment, and handles their claims against the same orders and schemes.',
      },
      {
        q: 'Can an oil mill buy seed and track oil by lot in MAVRO?',
        a: 'Yes. Procure to Pay runs indents, RFQs and purchase orders matched to the goods receipt and invoice, and Inventory Management tracks seed and oil by lot from intake to dispatch.',
      },
    ],
    nearby: ['ahmedabad', 'vadodara', 'surat'],
    seo: {
      title: 'ERP software in Rajkot for foundries and pump makers | MAVRO',
      description: 'ERP for Rajkot’s foundries, pump, engine and auto part makers in Aji, Shapar–Veraval and Metoda, and Saurashtra oil mills: shop floor, dealers and GST.',
    },
  },
  {
    slug: 'nashik',
    name: 'Nashik',
    state: 'maharashtra',
    region: 'west',
    presence: 'remote',
    knownFor: 'auto and engineering, wine and farm produce.',
    lead: 'For Nashik’s auto and engineering suppliers in Satpur, Ambad and Sinnar, its wineries, and the grape and onion growers and exporters of the district: production, batches, produce traceability, payroll with Maharashtra professional tax, and GST on one system.',
    areas: ['Satpur MIDC', 'Ambad MIDC', 'Sinnar MIDC', 'Dindori and the vineyard belt', 'Lasalgaon onion market'],
    industries: [
      { slug: 'manufacturing', note: 'Auto component and engineering suppliers in Satpur, Ambad and Sinnar, delivering to vehicle and equipment makers’ schedules.' },
      { slug: 'food-beverage', note: 'Wineries of the Nashik vineyard belt, where harvest, fermentation batches, bottling and distributors follow each other.' },
      { slug: 'agriculture-plantation', note: 'Grape and onion growers, packhouses and exporters, where produce has to be traced from the farm to the buyer.' },
    ],
    faq: [
      {
        q: 'Can a Nashik winery track batches from harvest to bottle?',
        a: 'Yes. Production Management runs each batch with its yields and QC release, and Inventory Management tracks bottled stock by batch, so every bottle traces back to its batch.',
      },
      {
        q: 'Can MAVRO record which farm a lot of produce came from?',
        a: 'Yes. Plots are mapped and harvests logged in the FSC Portal, and each lot carries its plots and harvest record through packing and dispatch.',
      },
      {
        q: 'Does MAVRO handle Maharashtra professional tax for Nashik staff?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Maharashtra alongside PF, ESI and TDS.',
      },
    ],
    nearby: ['pune', 'mumbai'],
    seo: {
      title: 'ERP software in Nashik for auto, wine and agri | MAVRO',
      description: 'ERP for Nashik’s auto and engineering suppliers in Satpur, Ambad and Sinnar, its wineries, and grape and onion exporters: production, batches and traceability.',
    },
  },
  {
    slug: 'kanpur',
    name: 'Kanpur',
    state: 'uttar-pradesh',
    region: 'north',
    presence: 'remote',
    knownFor: 'leather, textiles and engineering.',
    lead: 'For Kanpur’s leather goods and saddlery makers around Jajmau, its hosiery and garment units, engineering works in Panki and Dada Nagar, and the wholesalers supplying central Uttar Pradesh: production, lots, contract labour, credit, payroll and GST on one system.',
    areas: ['Jajmau', 'Panki Industrial Area', 'Dada Nagar', 'Fazalganj', 'Rooma'],
    industries: [
      { slug: 'manufacturing', note: 'Leather goods, saddlery and footwear makers and engineering works, many of them exporting, where every order has its own materials and deadline.' },
      { slug: 'textiles-apparel', note: 'Hosiery and garment units in a city long known for its mills, cutting and stitching against orders and job workers.' },
      { slug: 'distribution', note: 'Wholesalers supplying retailers across central Uttar Pradesh, on credit and schemes.' },
    ],
    faq: [
      {
        q: 'Can a Kanpur leather goods exporter track materials by lot?',
        a: 'Yes. Inventory Management tracks leather and other materials by lot across stores, and material issued to each export order is booked against its production order.',
      },
      {
        q: 'Can MAVRO keep contract labour compliant for a Kanpur factory?',
        a: 'Yes. Contract Labour Supply checks CLRA, PF, ESIC and wage evidence before a contractor bill is certified, so the compliance proof is on record before payment.',
      },
      {
        q: 'Do Kanpur employers deduct professional tax?',
        a: 'No. Uttar Pradesh does not levy professional tax, so HRMS and Payroll runs PF, ESI and TDS for Kanpur employees without it.',
      },
    ],
    nearby: ['lucknow', 'delhi'],
    seo: {
      title: 'ERP software in Kanpur for leather and textiles | MAVRO',
      description: 'ERP for Kanpur’s leather goods and saddlery makers around Jajmau, hosiery and garment units and engineering works: lots, contract labour, payroll and GST.',
    },
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    state: 'tamil-nadu',
    region: 'south',
    presence: 'team',
    knownFor: 'automobiles, electronics and port trade.',
    lead: 'For the auto and electronics suppliers of Sriperumbudur, Oragadam and Ambattur, the importers and exporters moving goods through Chennai and Ennore ports, and the IT firms along the Old Mahabalipuram Road: plants, shipments, projects, payroll with Tamil Nadu professional tax, and GST on one system.',
    areas: ['Sriperumbudur', 'Oragadam', 'Ambattur Industrial Estate', 'Irungattukottai', 'Old Mahabalipuram Road (IT corridor)'],
    industries: [
      { slug: 'manufacturing', note: 'Auto component and electronics plants supplying the vehicle and device makers around Sriperumbudur and Oragadam, often across several plants.' },
      { slug: 'logistics', note: 'Importers, exporters and transporters working through Chennai and Ennore ports, where shipments and e-way bills never stop.' },
      { slug: 'it-services', note: 'IT and engineering services firms along the Old Mahabalipuram Road, with projects, time cards and growing teams.' },
    ],
    faq: [
      {
        q: 'Can MAVRO compare OEE across our plants in Oragadam and Ambattur?',
        a: 'Yes. Production Management and Shop Floor Control track output, downtime and OEE by line and shift in every plant, on one screen for the plant heads and the management.',
      },
      {
        q: 'Does MAVRO deduct Tamil Nadu professional tax?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Tamil Nadu alongside PF, ESI and TDS, and posts payroll to the ledger.',
      },
      {
        q: 'Is there a MAVRO team in Chennai?',
        a: 'SaiSatwik Technologies has a team or partner on the ground in Chennai, and implementation follows the 25–30 day plan with on-site discovery, training and go-live.',
      },
    ],
    nearby: ['bengaluru', 'coimbatore', 'hyderabad'],
    seo: {
      title: 'ERP software in Chennai for auto and electronics | MAVRO',
      description: 'ERP for Chennai’s auto and electronics suppliers in Sriperumbudur, Oragadam and Ambattur, port traders and IT firms: plants, shipments, payroll and GST.',
    },
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    aka: 'Bangalore',
    state: 'karnataka',
    region: 'south',
    presence: 'team',
    knownFor: 'IT, engineering and new consumer brands.',
    lead: 'For Bengaluru’s (Bangalore’s) IT and product companies, the machine shops and electronics and aerospace suppliers of Peenya and Bommasandra, and the consumer brands selling online: projects, people, production, marketplaces, payroll with Karnataka professional tax, and GST on one system.',
    areas: ['Peenya Industrial Area', 'Bommasandra', 'Electronic City', 'Whitefield', 'Outer Ring Road'],
    industries: [
      { slug: 'it-services', note: 'IT services and product companies across Whitefield, Electronic City and the Outer Ring Road, with large teams, projects and travel.' },
      { slug: 'manufacturing', note: 'Machine shops, precision engineering and electronics and aerospace suppliers in Peenya and Bommasandra, running job cards across machines.' },
      { slug: 'retail-ecommerce', note: 'Consumer brands selling through marketplaces and their own webstores, with stock in several warehouses.' },
    ],
    faq: [
      {
        q: 'Does MAVRO handle Karnataka professional tax for a Bengaluru IT team?',
        a: 'Yes. HRMS and Payroll deducts Karnataka professional tax alongside PF, ESI and TDS, and the daily time card feeds attendance, project costs and payroll as one record.',
      },
      {
        q: 'Can a Bangalore D2C brand pull orders from marketplaces into MAVRO?',
        a: 'Yes. Ecommerce Integration brings marketplace and webstore orders and returns into one order book and keeps listings, prices and stock in sync across channels.',
      },
      {
        q: 'Can a Peenya machine shop schedule jobs by machine?',
        a: 'Yes. Shop Floor Control’s scheduling board loads job cards onto each machine against capacity, and records output, downtime and rework as the shift runs.',
      },
    ],
    nearby: ['chennai', 'coimbatore', 'hyderabad'],
    seo: {
      title: 'ERP software in Bengaluru (Bangalore) | MAVRO',
      description: 'ERP for Bengaluru’s IT and product companies, Peenya and Bommasandra machine shops and electronics suppliers, and D2C brands: projects, production and GST.',
    },
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'telangana',
    region: 'south',
    presence: 'remote',
    knownFor: 'pharma and bulk drugs, IT and real estate.',
    lead: 'For Hyderabad’s pharma and bulk drug makers in Jeedimetla, Bollaram, Pashamylaram and Genome Valley, its IT companies in HITEC City and Gachibowli, and its developers: batches, QC release, vendor audits, projects, payroll with Telangana professional tax, and GST on one system.',
    areas: ['Genome Valley', 'Jeedimetla', 'Bollaram', 'Pashamylaram', 'HITEC City and Gachibowli'],
    industries: [
      { slug: 'pharma', note: 'Bulk drug and formulation makers in the industrial areas north and west of the city, where batch records and QC release decide every dispatch.' },
      { slug: 'it-services', note: 'IT services and product companies in HITEC City and Gachibowli, with large teams and client projects.' },
      { slug: 'construction-real-estate', note: 'Developers and contractors building across the growing west of the city, tracking projects, sites and leases.' },
    ],
    faq: [
      {
        q: 'Can MAVRO keep batch records for a bulk drug plant?',
        a: 'Yes. Production Management runs each batch against its master with stage-wise sign-off and yields, and no batch reaches finished goods without QC release.',
      },
      {
        q: 'Can a Hyderabad developer manage leases and rent in MAVRO?',
        a: 'Yes. Real Estate Management keeps each property with its leases, renewals and rent, and Project Management tracks construction against budget and milestones.',
      },
      {
        q: 'Does MAVRO deduct Telangana professional tax?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Telangana alongside PF, ESI and TDS.',
      },
    ],
    nearby: ['bengaluru', 'chennai'],
    seo: {
      title: 'ERP software in Hyderabad for pharma and bulk drugs | MAVRO',
      description: 'ERP for Hyderabad’s pharma and bulk drug makers in Jeedimetla, Bollaram and Genome Valley, IT firms and developers: batches, QC release, payroll and GST.',
    },
  },
  {
    slug: 'coimbatore',
    name: 'Coimbatore',
    state: 'tamil-nadu',
    region: 'south',
    presence: 'remote',
    knownFor: 'pumps, motors, foundries and textiles.',
    lead: 'For Coimbatore’s pump, motor and wet grinder makers and foundries, its spinning mills, and the knitwear exporters of nearby Tiruppur: production, dealers and warranty, shift rosters, payroll with Tamil Nadu professional tax, and GST on one system.',
    areas: ['SIDCO Kurichi', 'Ganapathy', 'Peelamedu', 'Malumichampatti', 'Tiruppur (knitwear, nearby)'],
    industries: [
      { slug: 'manufacturing', note: 'Pump, motor and wet grinder makers and foundries, building to stock for dealers across India and to order for OEMs.' },
      { slug: 'textiles-apparel', note: 'Spinning mills around the city and knitwear exporters in Tiruppur, running round the clock in shifts.' },
      { slug: 'distribution', note: 'Pump and motor makers selling through dealers and distributors, with warranty claims coming back from the field.' },
    ],
    faq: [
      {
        q: 'Can MAVRO handle warranty claims for pumps sold through dealers?',
        a: 'Yes. Customer Service logs warranty claims as tickets with SLAs against the product and its sale, and the Dealer Portal lets dealers raise claims against the same records.',
      },
      {
        q: 'Can a spinning mill roster three shifts in MAVRO?',
        a: 'Yes. Roster Ledger builds shift rosters against demand, tracks coverage, swaps and overtime, and feeds attendance to payroll.',
      },
      {
        q: 'Does MAVRO deduct Tamil Nadu professional tax for Coimbatore staff?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Tamil Nadu alongside PF, ESI and TDS.',
      },
    ],
    nearby: ['chennai', 'bengaluru'],
    seo: {
      title: 'ERP software in Coimbatore for pumps and textiles | MAVRO',
      description: 'ERP for Coimbatore’s pump, motor and wet grinder makers, foundries, spinning mills and Tiruppur knitwear exporters: production, warranty, rosters and GST.',
    },
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    state: 'west-bengal',
    region: 'east',
    presence: 'team',
    knownFor: 'tea, jute, engineering and East India distribution.',
    lead: 'For the tea companies run from Kolkata with gardens in North Bengal and Assam, the jute mills and engineering works of the Hooghly belt and Howrah, and the distributors serving East India: estates, mills, channel, payroll with West Bengal professional tax, and GST on one system.',
    areas: ['Howrah', 'Taratala', 'Kasba Industrial Estate', 'Dankuni', 'Kalyani'],
    industries: [
      { slug: 'agriculture-plantation', note: 'Tea companies with head offices in Kolkata and gardens in North Bengal and Assam, with large estate workforces and produce traced garden by garden.' },
      { slug: 'manufacturing', note: 'Jute mills along the Hooghly and engineering works in Howrah, running shifts, contract labour and order-wise production.' },
      { slug: 'distribution', note: 'Distributors and stockists serving East and North-East India from Kolkata, with schemes, credit and long delivery routes.' },
    ],
    faq: [
      {
        q: 'Can MAVRO run payroll and rosters for a tea estate workforce?',
        a: 'Yes. Roster Ledger builds rosters and tracks coverage for each garden, and HRMS and Payroll records attendance and pays workers with PF, ESI and other statutory deductions.',
      },
      {
        q: 'Does MAVRO deduct West Bengal professional tax?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in West Bengal alongside PF, ESI and TDS, and posts payroll to the ledger.',
      },
      {
        q: 'Is there a MAVRO team in Kolkata?',
        a: 'SaiSatwik Technologies has a team or partner on the ground in Kolkata, and implementation follows the 25–30 day plan with on-site discovery, training and go-live.',
      },
    ],
    nearby: ['delhi', 'lucknow'],
    seo: {
      title: 'ERP software in Kolkata for tea, jute and trade | MAVRO',
      description: 'ERP for Kolkata’s tea companies, jute mills and Howrah engineering works, and East India distributors: estates, mills, channel, payroll and GST.',
    },
  },
  {
    slug: 'ludhiana',
    name: 'Ludhiana',
    state: 'punjab',
    region: 'north',
    presence: 'state-team',
    knownFor: 'hosiery, bicycles and auto parts.',
    lead: 'For Ludhiana’s hosiery, knitwear and woollen makers, its bicycle and bicycle part manufacturers, and the auto part and hand tool makers of Focal Point: production by season, thousands of parts, dealers, payroll with the Punjab State Development Tax, and GST on one system.',
    areas: ['Focal Point', 'Industrial Area A and B', 'Dhandari Kalan', 'Gill Road'],
    industries: [
      { slug: 'textiles-apparel', note: 'Hosiery, knitwear and woollen makers, producing for the winter season against orders booked months ahead.' },
      { slug: 'manufacturing', note: 'Bicycle, bicycle part, auto part and hand tool makers, each with thousands of parts and many small suppliers.' },
      { slug: 'distribution', note: 'Makers selling through dealers and wholesalers across India, with schemes and credit for the season.' },
    ],
    faq: [
      {
        q: 'Can MAVRO plan knitwear production for the winter season?',
        a: 'Yes. Orders booked ahead flow into Production Management’s work orders and PPDS schedules them against capacity and material, so the season’s load is visible early.',
      },
      {
        q: 'Can a bicycle parts maker keep thousands of items accurate?',
        a: 'Yes. Inventory Management tracks every item by location, with cycle counts and adjustments recorded, so stock is checked continuously rather than once a year.',
      },
      {
        q: 'Does MAVRO handle the Punjab State Development Tax?',
        a: 'Yes. HRMS and Payroll deducts the Punjab State Development Tax for employees liable to it, alongside PF, ESI and TDS.',
      },
    ],
    nearby: ['delhi', 'baddi'],
    seo: {
      title: 'ERP software in Ludhiana for hosiery and bicycles | MAVRO',
      description: 'ERP for Ludhiana’s hosiery and knitwear makers, bicycle and bicycle part manufacturers and Focal Point auto part units: production, stock, dealers and GST.',
    },
  },
  {
    slug: 'indore',
    name: 'Indore',
    state: 'madhya-pradesh',
    region: 'central',
    presence: 'remote',
    knownFor: 'auto, pharma, soya and namkeen.',
    lead: 'For the auto component and pharma plants of Pithampur and Sanwer Road, Indore’s soya processors and namkeen makers, and the traders of central India: plants, batches, distributors, payroll with Madhya Pradesh professional tax, and GST on one system.',
    areas: ['Pithampur industrial area', 'Sanwer Road', 'Palda', 'Dewas (nearby)'],
    industries: [
      { slug: 'manufacturing', note: 'Vehicle and auto component plants in Pithampur, supplying assembly lines on tight schedules.' },
      { slug: 'pharma', note: 'Pharma formulation units in Pithampur, running batches with QC release and expiry on every line.' },
      { slug: 'food-beverage', note: 'Soya processors and the city’s namkeen makers, selling through distributors across India with shelf life to watch.' },
    ],
    faq: [
      {
        q: 'Can a namkeen maker track shelf life to the distributor?',
        a: 'Yes. Inventory Management tracks every batch by expiry and allocates order lines first-expiry-first-out, and the Distributor Portal lets distributors order and raise claims against the same stock.',
      },
      {
        q: 'Can MAVRO run a pharma unit in Pithampur?',
        a: 'Yes. Production Management keeps batch records with stage-wise sign-off, and no batch reaches finished goods without QC release.',
      },
      {
        q: 'Does MAVRO deduct Madhya Pradesh professional tax?',
        a: 'Yes. HRMS and Payroll deducts professional tax for employees in Madhya Pradesh alongside PF, ESI and TDS.',
      },
    ],
    nearby: ['bhopal', 'vadodara', 'ahmedabad'],
    seo: {
      title: 'ERP software in Indore and Pithampur | MAVRO',
      description: 'ERP for Pithampur’s auto and pharma plants, Indore’s soya processors and namkeen makers and central India traders: batches, distributors, payroll and GST.',
    },
  },
  {
    slug: 'bhopal',
    name: 'Bhopal',
    state: 'madhya-pradesh',
    region: 'central',
    presence: 'team',
    knownFor: 'heavy electrical engineering and Mandideep’s plants.',
    lead: 'For the heavy electrical and engineering suppliers of Govindpura, the pharma, food and textile plants of nearby Mandideep, and the traders of the state capital: order-wise production, batches, channel, payroll with Madhya Pradesh professional tax, and GST on one system.',
    areas: ['Govindpura Industrial Area', 'Mandideep', 'Bagroda', 'Bhopal BHEL township'],
    industries: [
      { slug: 'manufacturing', note: 'Fabricators and engineering suppliers in Govindpura serving heavy electrical equipment makers, building to drawings and orders.' },
      { slug: 'pharma', note: 'Pharma plants in Mandideep, south of the city, with batch records and QC release on every batch.' },
      { slug: 'distribution', note: 'Distributors and stockists supplying central Madhya Pradesh from the capital.' },
    ],
    faq: [
      {
        q: 'Can a Govindpura fabricator track each order against its drawing and cost?',
        a: 'Yes. Production Management runs a work order per customer order with its BOM and routing, and Document Management keeps the drawings versioned against it.',
      },
      {
        q: 'Is there a MAVRO team in Bhopal?',
        a: 'SaiSatwik Technologies has a team or partner on the ground in Bhopal, and implementation follows the 25–30 day plan with on-site discovery, training and go-live.',
      },
      {
        q: 'Can one MAVRO setup cover a Bhopal office and a Mandideep plant?',
        a: 'Yes. MAVRO runs offices, plants and warehouses on one platform, with stock by location and books per entity.',
      },
    ],
    nearby: ['indore', 'lucknow'],
    seo: {
      title: 'ERP software in Bhopal and Mandideep | MAVRO',
      description: 'ERP for Bhopal’s heavy electrical and engineering suppliers in Govindpura, Mandideep’s pharma and food plants and the capital’s traders: production and GST.',
    },
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'rajasthan',
    region: 'north',
    presence: 'remote',
    knownFor: 'gems and jewellery, textiles and handicrafts.',
    lead: 'For Jaipur’s gems and jewellery makers in Sitapura and Johari Bazaar, the block printers and garment exporters of Sanganer and Bagru, its engineering units, and the craft brands selling online: lots and job work, production, channels, payroll and GST on one system.',
    areas: ['Sitapura Industrial Area and SEZ', 'VKI Area', 'Sanganer', 'Bagru', 'Johari Bazaar'],
    industries: [
      { slug: 'textiles-apparel', note: 'Block printers and garment exporters of Sanganer and Bagru, where fabric moves between printers, dyers and stitching units.' },
      { slug: 'manufacturing', note: 'Gems and jewellery makers in Sitapura and engineering units in the VKI Area, where every piece or part is tracked through each stage.' },
      { slug: 'retail-ecommerce', note: 'Handicraft, home décor and ethnic wear brands selling through marketplaces, their own webstores and stores.' },
    ],
    faq: [
      {
        q: 'Can MAVRO track fabric between block printers and stitching units?',
        a: 'Yes. Fabric sent out for printing, dyeing or stitching stays on the books by lot in Inventory Management, and each return is recorded against the production order.',
      },
      {
        q: 'Can a Jaipur craft brand sell on marketplaces from one stock?',
        a: 'Yes. Ecommerce Integration brings marketplace and webstore orders and returns into one order book and keeps stock in sync, so a piece sold on one channel disappears from the others.',
      },
      {
        q: 'Does Rajasthan need professional tax in payroll?',
        a: 'No. Rajasthan does not levy professional tax, so HRMS and Payroll runs PF, ESI and TDS for Jaipur employees without it.',
      },
    ],
    nearby: ['delhi', 'gurugram', 'ahmedabad'],
    seo: {
      title: 'ERP software in Jaipur for jewellery and textiles | MAVRO',
      description: 'ERP for Jaipur’s gems and jewellery makers, Sanganer and Bagru block printers and garment exporters, and craft brands online: job work, channels and GST.',
    },
  },
  {
    slug: 'baddi',
    name: 'Baddi',
    state: 'himachal-pradesh',
    region: 'north',
    presence: 'team',
    knownFor: 'pharma, FMCG and their packaging.',
    lead: 'For the pharma plants of the Baddi–Barotiwala–Nalagarh belt, the FMCG and packaged food plants beside them, and the carton, label and foil makers that supply both: batch records, QC release, vendor audits, packaging jobs, payroll and GST on one system.',
    areas: ['Baddi', 'Barotiwala', 'Nalagarh', 'Jharmajri'],
    industries: [
      { slug: 'pharma', note: 'One of India’s largest pharma manufacturing clusters, where many plants make for brand owners and every batch needs its record and release.' },
      { slug: 'food-beverage', note: 'FMCG and packaged food plants, shipping to distributors across North India with shelf life on every batch.' },
      { slug: 'printing-packaging', note: 'Carton, label and foil makers supplying the cluster’s pharma and FMCG plants, job by job.' },
    ],
    faq: [
      {
        q: 'Can a Baddi plant that makes for several brand owners keep their batches apart?',
        a: 'Yes. Each batch runs against its own master with stage-wise sign-off and QC release, and Inventory Management tracks stock by batch, lot and expiry, so every customer’s batches are traced separately.',
      },
      {
        q: 'Can MAVRO manage audits of our packaging suppliers?',
        a: 'Yes. mVLens Vendor Audit plans supplier audits, records findings, follows CAPA to closure and keeps quality agreements per supplier.',
      },
      {
        q: 'Is there a MAVRO team near Baddi?',
        a: 'SaiSatwik Technologies has a team or partner on the ground in Baddi, and implementation follows the 25–30 day plan with on-site discovery, training and go-live.',
      },
    ],
    nearby: ['ludhiana', 'delhi'],
    seo: {
      title: 'ERP software in Baddi for pharma plants | MAVRO',
      description: 'ERP for the pharma plants of Baddi, Barotiwala and Nalagarh, FMCG plants and their packaging suppliers: batch records, QC release, vendor audits and GST.',
    },
  },
];

export const cityBySlug = (slug: string) => cities.find((city) => city.slug === slug);
export const cityPath = (city: { slug: string }) => `${cityTemplate.indexPath}/${city.slug}`;

/** The index page, /erp-software. */
export const citiesIndex = {
  seo: {
    title: 'ERP software across India, city by city | MAVRO',
    description: 'MAVRO, the Super ERP for Indian businesses, city by city: the industries each city runs on, its state’s GST and payroll rules, and how we reach it.',
  },
  hero: {
    title: 'ERP software',
    rest: 'across India.',
    lead: 'MAVRO is made in Greater Noida by SaiSatwik Technologies and runs businesses across India. Find your city: the industries it runs on, the state’s GST and payroll rules MAVRO handles, and how implementation reaches you.',
  },
  list: { title: 'Find', rest: 'your city.', lead: 'Each city has its own page.', more: 'ERP software in' },
  /** One section for the regions with only a few city pages. */
  otherRegions: 'South, East and Central India',
  /** The Gulf countries served from India (D4), after the Indian regions. */
  gulf: { title: 'Beyond India:', rest: 'the Gulf.', lead: 'Businesses in the UAE, Saudi Arabia and Qatar, served from India.' },
  faq: {
    title: 'Questions about',
    rest: 'MAVRO across India',
    items: [
      {
        q: 'Where is MAVRO available in India?',
        a: 'MAVRO is available to businesses anywhere in India. SaiSatwik Technologies has its head office in Greater Noida, people on the ground in several cities, and implements remotely elsewhere, with on-site work when agreed.',
      },
      {
        q: 'Does MAVRO handle state-specific payroll rules?',
        a: 'Yes. HRMS and Payroll computes PF, ESI and TDS everywhere, and professional tax in the states that levy it, with statutory rates updated centrally.',
      },
      {
        q: 'Can one MAVRO setup cover branches in several states?',
        a: 'Yes. MAVRO runs multiple entities, plants and branches on one platform, with stock by location and books per entity.',
      },
    ],
  },
};
