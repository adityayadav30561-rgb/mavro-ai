/*
 * The company and resource pages (SITE-PLAN.md sections 3.8 and 3.10, IMPLEMENTATION-PLAN.md Phase 26).
 *
 * Live: /customers (the homepage's three verified stories in full, `proof` in home.ts, and the clientele wall,
 * `clients`) and /contact (the demo form, direct contact, head office).
 *
 * Waiting for the user's text: Company, Privacy policy, Terms of use, the blog and careers. Each has its slot here
 * and its template; its route exists only once the slot is filled (src/routes.ts), so menus and the footer keep
 * hiding the link (src/links.ts) and nothing links to an empty page. Never fill these with invented copy.
 */
import type { IconName } from '../components/Icon';

export const customersPage = {
  seo: {
    title: 'Customer stories: what clients changed with MAVRO | MAVRO',
    description:
      'Three recent MAVRO projects by SaiSatwik Technologies: EUDR due diligence in 2 hours instead of 4 weeks, 85% fewer freight billing disputes alongside SAP, and vendor onboarding in 48 hours instead of 5 weeks.',
  },
  hero: {
    title: 'What clients changed',
    rest: 'with MAVRO.',
    lead: 'Three recent projects delivered by SaiSatwik Technologies. Clients are anonymised; the results are verified.',
  },
  stories: { title: 'Three projects,', rest: 'in full.', lead: 'The challenge, what was built, what it delivered and the modules behind it.' },
  labels: { challenge: 'The challenge', built: 'What we built', delivered: 'Delivered', modules: 'Modules', result: 'Result' },
  logos: { title: 'The organisations', rest: 'we work with.', lead: 'From the clientele of SaiSatwik Technologies, across manufacturing, healthcare, logistics, retail, education and services.' },
  cta: { title: 'Your process,', rest: 'next.', body: 'Tell us how you sell, buy and make, and we will show you what MAVRO would change.' },
};

export const contactPage = {
  seo: {
    title: 'Contact SaiSatwik Technologies: request a MAVRO demo | MAVRO',
    description:
      'Request a MAVRO demo built around your process, or reach the team directly at contact@saisatwik.com or +91 92114 29011. Head office: Galaxy Blue Sapphire, Greater Noida.',
  },
  hero: {
    title: 'Talk to the team',
    rest: 'behind MAVRO.',
    lead: 'Request a demo built around your own process, or reach us directly. The same team that builds MAVRO implements it.',
  },
  reach: {
    title: 'Reach us directly',
    email: 'Email',
    phone: 'Phone',
    office: 'Head office',
  },
  next: {
    title: 'What happens',
    rest: 'after you ask.',
    lead: 'No generic tour: the demo follows your own documents, approvals and systems.',
    steps: [
      { icon: 'mail', title: 'Your request reaches the team', body: 'It comes to us with the interests you ticked and the system you run today.' },
      { icon: 'workflow', title: 'We set up your demo', body: 'Around how you sell, buy and make, and alongside SAP, Oracle or Tally if you run them.' },
      { icon: 'rocket', title: 'You see your way forward', body: 'Which modules you need and how a 25–30 day rollout would run for you.' },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },
};

/** A prose page (Company, Privacy, Terms) once the user supplies its text: a title, a lead and sections. */
export interface TextContent {
  seo: { title: string; description: string };
  title: string;
  lead?: string;
  /** "Last updated" for legal pages. */
  updated?: string;
  sections: { heading: string; paragraphs: string[] }[];
}

/** Waiting for the user's copy (STATUS.md, Open items). */
export const companyText: TextContent | null = null;
export const privacyText: TextContent | null = null;
export const termsText: TextContent | null = null;

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  paragraphs: string[];
}

/** The blog: no posts yet, so no /blog route. */
export const posts: Post[] = [];

export interface Opening {
  title: string;
  location: string;
  type: string;
  summary: string;
}

/** Careers: no openings supplied yet, so no /careers route. */
export const openings: Opening[] = [];

export const blogPage = {
  seo: { title: 'Blog: articles and product notes | MAVRO', description: 'Articles and product notes from the team behind MAVRO.' },
  title: 'Articles and',
  rest: 'product notes.',
};

export const careersPage = {
  seo: { title: 'Careers at SaiSatwik Technologies | MAVRO', description: 'Open roles at SaiSatwik Technologies, the team behind MAVRO.' },
  title: 'Build MAVRO',
  rest: 'with us.',
  apply: 'Apply by email',
};
