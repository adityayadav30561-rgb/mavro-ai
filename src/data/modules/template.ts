/*
 * The module page template's own words: section headings and leads shared by every module page, with `{name}` for
 * the module's name. Module-specific content lives in ./content/<slug>.ts. Treatments follow the page rhythm
 * (docs/LIBRARY.md): neighbouring sections never share one, and backgrounds alternate (see src/pages/ModulePage.tsx).
 */
export const moduleTemplate = {
  /** The hero's second button. */
  seeScreens: 'See the screens',
  demo: 'Request a demo',
  capabilities: {
    title: 'What {name}',
    rest: 'keeps in hand.',
    lead: 'Four capabilities at the core of the module. The figures come from the screens below and, like them, are illustrative.',
  },
  tour: {
    title: 'See {name},',
    rest: 'screen by screen.',
    lead: 'A few of the views your team works in, built for this module. Each one reads and writes the same records as the rest of MAVRO.',
    /** Over the module's other views, under the tour. */
    more: 'Also in {name}',
  },
  whatWhy: {
    title: 'What it does,',
    rest: 'and why it matters.',
    what: 'What it does',
    why: 'Why it matters',
  },
  flow: {
    title: 'Where {name}',
    rest: 'sits in the flow.',
    lead: 'What feeds it and what it feeds. Each link passes the same record on, never a re-keyed copy.',
    from: 'Feeds it',
    to: 'It feeds',
  },
  audience: {
    title: 'Who uses',
    rest: '{name}.',
    lead: 'The industries it is configured for, and the people who work in it every day.',
    industries: 'Industries',
    roles: 'The people who work in it',
    works: 'Works in',
    see: 'Explore {industry}',
  },
  platform: {
    title: 'Built on the',
    rest: 'MAVRO platform.',
    lead: 'What {name} inherits from the platform, the same in every module: audit, workflow, notifications, mobile, security and APIs.',
    /** Under the module's name on the plate; {name} here is the package. */
    module: 'One of the {name}',
  },
  related: {
    title: 'Related',
    rest: 'modules.',
    lead: 'Modules {name} works alongside every day, on the same customers, items and ledgers.',
    more: 'See the module',
  },
  faq: {
    title: '{name}:',
    rest: 'questions answered.',
    lead: 'What buyers ask about {name} before a demo.',
  },
  cta: {
    title: 'See {name}',
    rest: 'on your own data.',
    body: 'A walkthrough built around your documents, your approvals and the system you run today, with {name} set up for your process.',
  },
};

/** Fills `{name}` in a template string. */
export const fill = (text: string, name: string) => text.replaceAll('{name}', name);
