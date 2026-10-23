# Workflow

How this project is run, so work can stop and resume cleanly across sessions and context can be cleared at
planned points rather than randomly.

## The three stages

### Stage A: finish the homepage (done)

Iterate on the homepage with the user until they say it is done. Exit checklist:

- [ ] The user has signed off every section (see the table in [STATUS.md](STATUS.md)).
- [ ] `npm run build` passes; no console errors on the dev server.
- [ ] `qa/measure.html` shows desktop sections at about 0.75–1.2 screen heights and no overflow at any size.
- [ ] Checked at 1366×768, 1440×900, 1920×1080, a tablet and a phone (docs/VERIFY.md).
- [ ] [STATUS.md](STATUS.md) and [DECISIONS.md](DECISIONS.md) are current.

### Stage B: plan the rest of the website

Together with the user, decide what else the site needs, then write it down in `docs/SITE-PLAN.md`:

- **Sitemap:** which pages (e.g. Platform overview, module pages or a module template, Portals, ERP Connect,
  Industries, Pricing?, Company, Contact/demo, Resources/blog, legal).
- **Page templates:** which pages share a layout (a module page template driven by `src/data/modules.ts` is the
  obvious one), and which homepage sections can be reused.
- **Routing approach:** the site is one prerendered page today. Multiple pages need a router and the
  prerender script extended to output one HTML file per route; decide this up front.
- **Content sources:** which deck slides feed which pages; what the user must supply (copy, photos, forms).
- **Shared changes:** header links to real pages, footer links (`href: null` items in `src/data/site.ts`),
  SEO per page, sitemap.xml.

### Stage C: phased implementation (current: see IMPLEMENTATION-PLAN.md)

Turn the site plan into `docs/IMPLEMENTATION-PLAN.md`: a numbered list of phases, each small enough to finish
within one session. Each phase lists:

- **Goal:** one sentence.
- **Scope:** files and pages it creates or changes.
- **Depends on:** earlier phases.
- **Done when:** concrete checks (pages render, build passes, verified at given sizes, docs updated).

Then implement one phase at a time. The likely first phases: routing and prerender for multiple pages, then
shared layout and navigation, then the module page template, then individual page groups.

## Session protocol (every stage)

**Start of a session**

1. Read [CLAUDE.md](../CLAUDE.md), then [STATUS.md](STATUS.md). In Stage C, also the current phase in
   `docs/IMPLEMENTATION-PLAN.md`.
2. Read [DECISIONS.md](DECISIONS.md) before changing design.
3. Start the dev server (`npm run dev`) and look at the page before editing.

**During**

- Work on one task or phase at a time. Keep content in data files.
- When the user states a preference ("don't…", "I liked…", "make it…"), add it to DECISIONS.md right away.

**Checkpoint: before context gets heavy (about 30–40% used) or at the end of a phase**

1. Finish or cleanly pause the current task (nothing half-edited).
2. `npx tsc --noEmit` and `npm run build`.
3. Update [STATUS.md](STATUS.md): what changed, what is next, open items. In Stage C, tick the phase in the
   implementation plan.
4. Tell the user it is a good point to clear the session. The next session resumes from the docs alone.

**Good places to clear context:** after a phase is done and documented; after a user review round has been
applied and recorded; never in the middle of a multi-file change.
