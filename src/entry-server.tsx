import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Layout } from './Layout';
import { loadPage, type Route } from './routes';

export { site } from './data/site';
export { renderHead } from './seo/head';
export { notFoundRoute, routes } from './routes';

/** Static HTML for one route, injected into its file by scripts/prerender.mjs. */
export async function render(route: Route) {
  const { Page } = await loadPage(route);
  return renderToString(
    <StrictMode>
      <Layout path={route.path}>
        <Page />
      </Layout>
    </StrictMode>,
  );
}
