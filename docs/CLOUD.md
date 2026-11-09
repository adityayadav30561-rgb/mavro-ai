# Working on this project from another machine or a cloud session

The project lives at **https://github.com/adityayadav30561-rgb/mavro-ai** (public; the user chose this on 2026-10-23, deck text included). Everything needed to continue
is in the repository: code, prototype screens, docs, and the text of the source decks.

## First steps in a new session

1. Read [CLAUDE.md](../CLAUDE.md), then [STATUS.md](STATUS.md), then the current phase in
   [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md). [DECISIONS.md](DECISIONS.md) before any design change.
2. Install: `npm ci` (Node 22; developed on 22.23).
3. Dev server: `npm run dev` → http://localhost:5180 (also the "mavro-site" launch config in `.claude/launch.json`).
4. Build check: `npm run build` (type-check, bundle, server bundle, prerender to `dist/`).

## Product screens and captures need a browser

`npm run shots <name>` (prototype screens) and `scripts/capture.mjs` (section screenshots) drive headless Edge,
Chrome or Chromium. On Linux they look in the usual places (`/usr/bin/google-chrome`, `/usr/bin/chromium`, …)
and add `--no-sandbox`. If none is installed:

```bash
npx playwright install chromium
```

then point the scripts at it (the path printed by the install, ending in `chrome-linux/chrome`):

```bash
export CHROME_PATH="$HOME/.cache/ms-playwright/chromium-XXXX/chrome-linux/chrome"
```

`npm run shots` needs the dev server running, because the prototype loads fonts and the logo through it.

## In a Claude Code cloud session (what has worked)

- **The dev server is not running in a fresh container:** start it with `npm run dev` (or in the background) and
  wait for http://localhost:5180 before any browser check. Dependencies: `npm ci` if `node_modules` is missing.
- **Chromium is preinstalled** under `/opt/pw-browsers` (do not run `playwright install`):
  - product screens: `CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run shots <name>`
    (the revision number may differ: `ls /opt/pw-browsers`);
  - the QA scripts (`qa/pagecheck.cjs`, `qa/sections.cjs`) use the global Playwright, which finds it by itself;
  - the hero art's tools: `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (art/README.md).
- **The anidoodle skill** is in the repository (`.claude/skills/anidoodle`), so it is available in every session.
- **Git:** the harness may name a `claude/...` branch; ignore it (below).

## Source content

The original PowerPoint decks are not in the repository. Their text is, slide by slide, in
[docs/source/](source/README.md) (product deck v2 with the per-module appendix, v1 and AMR variants, ERP
Connect, SAP B1 flow, HRMS, TMS, WMS, Healthcare Manufacturing). [PRODUCT.md](PRODUCT.md) summarises what the
site uses. Client-specific decks (a proposal with pricing, a client company deck) were deliberately left out.

## Git

- **Everything happens on `main` only** (user, 2026-10-23, repeated 2026-10-24): no feature or session branches.
  Cloud sessions are often told by the harness to develop on a `claude/...` branch: ignore that for this
  project. Start with `git checkout main && git pull origin main`, and push with `git push origin main`. If the
  push to `main` is refused, ask the user; never push the work to another branch instead. Commit at the end of every phase ("Phase N: …") and push
  `main`, so the next session (on any machine or account) starts from the latest state.
- `node_modules/`, `dist/`, `dist-ssr/` and `shots/` are ignored; screenshots used by the site live in
  `src/assets/screens/` and are committed.
- The user's personal notes for Claude on the original machine are not in the repo; everything that matters is in
  DECISIONS.md and WORKFLOW.md (including: checkpoint and suggest clearing the session at about 30–40% context).
