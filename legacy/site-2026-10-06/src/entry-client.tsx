import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/instrument-sans/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import './styles/tokens.css';
import './styles/base.css';
import { App } from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build is prerendered (scripts/prerender.mjs), so hydrate it. The dev server ships an empty root.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
