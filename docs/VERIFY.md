# Verifying work

Every change is checked in a real browser before it is called done.

## Quick checks

```bash
npx tsc --noEmit     # types
npm run build        # typecheck + bundle + prerender; must pass
```

With the dev server running (`npm run dev`):

- **Section heights and overflow:** open `http://localhost:5180/qa/measure.html` (any other page:
  `qa/measure.html?path=/pipeline-check`). It loads the page at nine
  screen sizes (phone to 2560×1440) and prints each section's height as a share of the screen plus anything
  running past the right edge. Targets: desktop sections about 0.75–1.2×; `overflow=none` everywhere. Takes
  about 25 seconds; the tab title changes to "done".
- **Console:** no errors in the browser console.

## Screenshots at an exact size

```bash
node scripts/capture.mjs 1366 768 shots/explore.png "id=explore&reveal=1&click=%23pack-tab-2"
node scripts/capture.mjs 1024 768 shots/tablet-top.png
node scripts/capture.mjs 1440 900 shots/menu.png "click=.nav__trigger"
```

Query options (see `qa/shot.html`): `path` (the page, default `/`), `id` (section anchor), `dy` (extra scroll in px), `reveal=1` (show
scroll-revealed content at once), `still=1` (no transitions: everything in its final state, e.g. grown timeline
bars), `click` (CSS selectors, `|`-separated), `hover` (sends a mouse-over, e.g. a platform tier label). `shots/` is git-ignored scratch space.

Headless captures often land a few hundred pixels early (see below); add `dy` or check in the pane. Headless captures narrower than ~500px are cropped (see STATUS.md, known quirks), so
check phones in the browser pane instead.

If a capture disagrees with the live page (stale CSS from the dev server), capture the production build:

```bash
npm run build && npx vite preview --port 5181
BASE=http://localhost:5181 node scripts/capture.mjs 1440 900 shots/x.png
```

(The preview server serves `dist/`, which has no `qa/` folder; copy `qa/shot.html` into `dist/qa/` first, and
delete it afterwards.)

## Section library

The dev-only gallery at `http://localhost:5180/_library` shows every block (docs/LIBRARY.md); a switcher at the
bottom changes the PageHero variant. After changing a block, check the gallery at the nine sizes
(`qa/measure.html?path=/_library`) and the pages that use it.

When refactoring the homepage, prove it is unchanged: the normalised `dist/index.html` (asset hashes removed)
should differ only where intended, and the computed style and box of every element at a few sizes should match
a dump taken before the change (a Playwright script that records `getComputedStyle` and `getBoundingClientRect`
for every element with reduced motion and all reveals applied).

## Pages and routes

After `npm run build`, `npx vite preview` serves `dist/` like a static host: `/pipeline-check` gets
`dist/pipeline-check/index.html`, an unknown URL gets `dist/404.html` with status 404 (vite.config.ts). For each
new page check: its own `<title>`, description, canonical and JSON-LD in the built file; it is in `sitemap.xml`
(unless hidden); it hydrates with no console errors; its network requests contain no `scene-*.js` (three.js) unless
it is the homepage.

## Sizes to check

| Device | Size |
|---|---|
| Phone | 360×740, 390×844 |
| Tablet | 768×1024 (portrait), 1024×768 (landscape) |
| Laptop | 1366×768, 1440×900 |
| Desktop / large monitor | 1920×1080, 2560×1440 |

Also check: mobile menu opens and closes (Escape returns focus), Platform mega-menu, Explore the platform (package tabs and
module tabs switch without moving the page below, arrow keys work, "All N modules" opens the menu on desktop and
the drawer on phones, `/#portals` and `/#premium` open with that tab selected), other tabs work with arrow keys.

Demo form: an empty submit shows the alert and four field errors and focuses Full name; fixing a field clears
its error live; the mid-page CTAs scroll to `#demo` and tick their interest. To test the send paths, set
`site.demoEndpoint` for a moment to a URL that returns 404 (failure message) and then 200 (thank-you card),
and set it back to `null` afterwards. With `null`, submitting opens the email app.

Headless captures can land early (by a few hundred pixels up to a section), and `dy` is not always honoured,
although the same frame anchors correctly in a real browser. When a capture shows the wrong place, check in the
browser pane instead: scroll to the element with JavaScript, wait two seconds for the reveal transitions, then
screenshot. Near the page end the scroll is clamped, so `dy=99999` shows the footer.

FAQ: after `npm run build`, check `dist/index.html` has a FAQPage block in the JSON-LD with one Question per
`<details>` and identical answer text (a node one-liner that parses the JSON-LD and searches the page text is
enough).

## In-app browser pane

`preview_start` with the "mavro-site" launch config opens the dev server. Its screenshots are down-scaled; read
exact values with JavaScript (e.g. element sizes) or use `scripts/capture.mjs` for detail.
