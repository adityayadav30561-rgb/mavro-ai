/*
 * Mid-page calls to action scroll to the demo form and tell it what the visitor was looking at, so the form can
 * tick the matching interest. A window event keeps the buttons and the form independent of each other.
 */
export const DEMO_EVENT = 'mavro:demo-prefill';

export interface DemoPrefill {
  interest: string | null;
}

export function prefillDemo(detail: DemoPrefill) {
  window.dispatchEvent(new CustomEvent<DemoPrefill>(DEMO_EVENT, { detail }));
}
