/*
 * Calls to action send visitors to the demo form and tell it what they were looking at, so the form can tick the
 * matching interest. On the homepage a window event keeps the buttons and the form independent of each other;
 * from another page the link carries the interest in the URL (demoHref), which the form reads when it loads.
 */
export const DEMO_EVENT = 'mavro:demo-prefill';

export interface DemoPrefill {
  interest: string | null;
  /** A module page's module (its catalogue name): the form starts its message with it. */
  module?: string | null;
}

export function prefillDemo(detail: DemoPrefill) {
  window.dispatchEvent(new CustomEvent<DemoPrefill>(DEMO_EVENT, { detail }));
}

/** The URL parameters that carry an interest (and a module) from another page to the homepage form. */
export const DEMO_PARAM = 'interest';
export const DEMO_MODULE_PARAM = 'module';

/** Link to the homepage demo form from another page, with an interest to tick and, from a module page, the module. */
export function demoHref(interest: string | null, module?: string | null) {
  const params = new URLSearchParams();
  if (interest) params.set(DEMO_PARAM, interest);
  if (module) params.set(DEMO_MODULE_PARAM, module);
  const query = params.toString();
  return query ? `/?${query}#demo` : '/#demo';
}
