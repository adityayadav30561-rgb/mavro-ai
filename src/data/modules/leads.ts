import type { ScreenName } from '../../components/Screen';
import type { ModuleSlug } from './slugs';

/*
 * The lead screen of modules whose page is not built yet: the deck's screen 01 for that module, built in its
 * prototype folder so related-module cards can show the real module (user, 2026-10-23: "put 1 screen of that
 * module"). When the module gets its content file, its first screen takes over (it is the same screen).
 */
export const leadScreens: Partial<Record<ModuleSlug, { screen: ScreenName; alt: string }>> = {
  crm: {
    screen: 'crm/pipeline',
    alt: 'MAVRO CRM pipeline: 186 leads in 30 days, 92% answered within the first-response SLA, conversion by source from website, marketplaces, trade fairs, distributor referrals, field reps and existing customers, the funnel to 14 won and the leads waiting for a first response (illustrative data).',
  },
  'sales-force-automation': {
    screen: 'sales-force-automation/field-force',
    alt: 'MAVRO Sales Force Automation field force dashboard: 142 of 168 planned calls made today, 91% of A-class outlets covered, ₹18.6 L of secondary orders, calls against norm by territory, reps below the call norm and the approval queue (illustrative data).',
  },
  'customer-service': {
    screen: 'customer-service/ticket-load',
    alt: 'MAVRO Customer Service ticket load: 74 open tickets, 94% first response within SLA, tickets by channel with SLA health, a complaint cluster on lot L-0897 raised to QA, and tickets about to breach (illustrative data).',
  },
};
