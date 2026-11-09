# Adding a module page

Every module page (`/modules/<slug>`) renders from one content file through one template
(`src/pages/ModulePage.tsx`). The menus, footer, package pages, sitemap, `llms.txt` and structured data pick a new
module up by themselves. The full recipe (content, scenario, screens, page, links) is in IMPLEMENTATION-PLAN.md,
"Recipe for a module phase"; this is the checklist of files.

## 1. Register the module

| File | Add |
|---|---|
| `src/data/modules/slugs.ts` | the slug in `moduleSlugs`, in its package's group (a typo anywhere else is then a type error) |
| `src/data/modules/catalogue.ts` | its entry: `id`, `name`, `slug`, `summary`, `icon` (`src/components/Icon.tsx`), `pack`, `area` |
| `src/data/modules/sources.ts` | the deck slides it comes from (docs/source/ has the decks' text) |
| `src/data/modules/views.ts` | its menu views, as the screens' sidebar shows them |

## 2. Build its screens

- 3–4 HTML screens in `prototype/modules/<slug>/` (copy a neighbour's structure; `module-shell.js` draws the
  sidebar from the catalogue). The first file opens with an HTML comment holding the module's one scenario.
- Check each at 1440 × 960 (phone screens 390 × 844) with the checklist in VERIFY.md, "Product screens".
- Capture with the dev server running: `npm run shots <slug>` → `src/assets/screens/<slug>/`.

## 3. Write its content

- `src/data/modules/content/<slug>.ts` exporting `content: ModuleContent<'<slug>'>` (schema and comments in
  `src/data/modules/schema.ts`: tagline, four tiles, what and why, flow, industries, roles, screens with alt
  text, scenario, 3–5 FAQs, SEO title ≤ 60 characters and description ≤ 160).
- Register it in `src/data/modules/content/index.ts` (import and add to `moduleContent`).
- Facts only from the decks (docs/PRODUCT.md, CLAUDE.md "No invented claims"); screen figures are illustrative
  and say so in the alt text.

## 4. Check and ship

```bash
npx tsc --noEmit
npm run build                    # the route, sitemap entry and llms.txt line appear
node qa/seocheck.cjs             # title, description, JSON-LD, FAQ visible on the page
npm run linkcheck                # output must say dead []
npx vite preview --port 5181 &
node qa/sweep.cjs /modules/<slug>        # nine screen sizes
node qa/a11ycheck.cjs /modules/<slug>    # axe and keyboard focus
```

Then look at the page in the browser at 1440, 1366 and 390 wide, update docs/STATUS.md, commit and push to `main`.
