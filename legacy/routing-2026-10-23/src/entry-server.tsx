import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

export { site } from './data/site';
export { renderHead } from './seo/head';

/** Static HTML for the homepage, injected into dist/index.html by scripts/prerender.mjs. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
