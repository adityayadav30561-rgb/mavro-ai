/*
 * Calls to action send visitors to the demo form and tell it what they were looking at, so the form can tick the
 * matching interest. On the homepage a window event keeps the buttons and the form independent of each other;
 * from another page the link carries the interest in the URL (demoHref), which the form reads when it loads.
 */
export const DEMO_EVENT = 'mavro:demo-prefill';

export interface DemoPrefill {
  interest: string | null;
}

export function prefillDemo(detail: DemoPrefill) {
  window.dispatchEvent(new CustomEvent<DemoPrefill>(DEMO_EVENT, { detail }));
}

/** The URL parameter that carries an interest from another page to the homepage form. */
export const DEMO_PARAM = 'interest';

/** Link to the homepage demo form from another page, with an interest to tick. */
export const demoHref = (interest: string | null) =>
  interest ? `/?${DEMO_PARAM}=${encodeURIComponent(interest)}#demo` : '/#demo';
