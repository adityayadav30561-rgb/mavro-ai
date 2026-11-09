import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/manrope/index.css';
import './styles/tokens.css';
import './styles/base.css';
import { Layout } from './Layout';
import { loadContent } from './data/modules';
import { findRoute, loadPage } from './routes';

const root = document.getElementById('root')!;
const route = findRoute(window.location.pathname);

// Each page is its own chunk, and so is each module's content; the prerendered HTML preloads both, so neither waits on
// the network. The page renders only once the modules it reads (route.content) are loaded.
Promise.all([loadPage(route), loadContent(route.content)]).then(([{ Page }]) => {
  const app = (
    <StrictMode>
      <Layout route={route}>
        <Page />
      </Layout>
    </StrictMode>
  );

  // The production build is prerendered (scripts/prerender.mjs), so hydrate it. The dev server ships an empty root
  // and the homepage's head, so it renders and sets the page title itself.
  if (root.firstElementChild) hydrateRoot(root, app);
  else {
    document.title = route.title;
    createRoot(root).render(app);
  }
});
