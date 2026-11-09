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
