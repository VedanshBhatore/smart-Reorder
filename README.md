# Smart Reorder — a quick-commerce product teardown & redesign case study

A product-management portfolio piece: a teardown of how quick-commerce grocery
apps handle repeat orders, a redesign ("Smart Reorder"), two clickable
prototypes built to compare them, and a built-in moderated usability test that
produces the validation data for the case study itself. Fully static — no
backend, no database. Data lives in the browser's `localStorage` and can be
exported/imported as CSV or JSON.

The fictional brand "Basket" is used throughout the prototypes — no Swiggy or
Instamart logos, colours, or screens are reproduced. Every prototype screen
carries a footer: *"Concept prototype for a portfolio case study. Not
affiliated with Swiggy."* Instamart is discussed by name only in the
case-study text, as commentary on a real, publicly observable product.

## Routes

| Route | What it is |
|---|---|
| `/` | The case-study site — all 8 sections, one scrolling page |
| `/prototype/a` | Flow A, the current-style baseline reorder, full screen |
| `/prototype/b` | Flow B, the Smart Reorder redesign, full screen |
| `/test` | Moderator tool: run a counterbalanced A/B usability session |
| `/results` | A/B comparison dashboard, CSV/JSON export + import |

## Running it locally

Requires Node 18+.

```bash
npm install
npm run dev        # starts the dev server, usually http://localhost:5173
npm test           # runs the Vitest suite once
npm run test:watch # or watch mode
npm run build       # typechecks (tsc -b) and builds to dist/
npm run preview     # serves the production build locally, for a final check
npm run lint        # oxlint
```

## Deploying

This is a static single-page app (Vite + React Router, client-side routing).
Build with `npm run build`; the output is `dist/`.

**Vercel:** import the repo, framework preset "Vite," build command
`npm run build`, output directory `dist`. `vercel.json` in the repo root
already rewrites every path to `index.html` so deep links like `/test` or
`/prototype/a` work on a hard refresh, not just via in-app navigation.

**Netlify:** same build command/output directory. `public/_redirects`
(`/* /index.html 200`) is already in place for the same reason — it ships to
`dist/_redirects` on build.

Either way, double-check after deploying that `/test` and `/results` load
directly (not just by clicking from `/`) — that's exactly what the rewrite
rules above are for.

## Where the data lives

- Usability sessions: `localStorage["basket.usability.sessions.v1"]`, written
  by `/test`, read by `/results` and the case study's Validation section.
- Imported survey CSV: `localStorage["basket.survey.csv.v1"]`, written by the
  "Import survey CSV" button (Research section).
- Both are plain browser storage — clearing site data removes them. Export
  early and often from `/results` (CSV or JSON) once you have real sessions.

## Sample data — read this before you trust any number on the site

Every chart on `/results` and in the case study's Research/Validation
sections is wired to **imported data**, not hardcoded numbers. Until you
import something real, both sections fall back to a bundled, fabricated
sample dataset, and the UI marks it with a visible
**"⚠ Sample data — replace with your research"** badge:

- `src/data/sampleUsabilitySessions.ts` — fake usability sessions
- `src/data/sampleSurvey.csv` — fake survey responses

Neither is ever written to `localStorage` automatically — only a real `/test`
session or a real CSV/JSON import touches real storage. If you see the sample
badge, nothing on screen is real yet.

## Project structure

```
src/
  data/            catalogue, usual-basket, sample usability + survey data
  lib/             pure logic: SUS scoring, metrics, counterbalancing,
                   results aggregation, CSV import/export — all unit tested
  components/      shared UI (phone frame, toast, bottom nav, charts/)
  features/
    flowA/         baseline reorder flow (Home -> Account -> Orders ->
                   Order detail -> search-for-substitute -> Cart -> Checkout)
    flowB/         Smart Reorder flow (Home -> Review basket -> Checkout)
    shared/        Checkout/OrderPlaced/CategoriesTab shared by both flows
    testMode/      the /test moderator session state machine
    casestudy/     the 8 case-study sections + the journey-map diagram
  pages/           route-level components
docs/
  survey.md        the 12-question Google Forms survey, ready to copy in
public/
  screens/         drop your own annotated Instamart screenshots here
```

`DECISIONS.md` logs every non-obvious implementation decision made while
building this, one line each, with the reasoning.

## Your research to-do list

The scaffolding is done; the research isn't. In order:

1. **Send the survey.** Copy the 12 questions in `docs/survey.md` into a
   Google Form exactly as worded (or note what you changed). Target 50+
   responses. Download the response CSV and import it on the Research
   section of `/`.
2. **Run usability sessions.** Use `/test` with 5–8 real participants. The
   tool counterbalances flow order automatically (odd participant numbers
   run A then B, even run B then A) and captures time, taps, mis-taps,
   completion, and SUS for each flow, plus a head-to-head preference. Export
   from `/results` as you go so you never lose a session.
3. **Import both real datasets** and confirm the sample-data badges disappear
   from the Research and Validation sections.
4. **Fill in the `[TODO]` placeholders** — the three key insights in Research,
   the timeline in Overview, and the real baseline repeat-order rate in the
   Metrics section's sample-size calculation. Never guess a number to fill
   these in; leave the placeholder until you have the real one.
5. **Add your own annotated Instamart screenshots** to `public/screens/` (see
   `public/screens/README.md` for the exact filenames expected).
6. **Recreate the three core Smart Reorder screens in Figma** — the "usual
   basket" home card, the review-basket screen, and the out-of-stock swap
   state — so you have a genuine Figma source file to point to, not just the
   coded prototype.

## Resume bullets (fill in your real numbers)

- Tore down [Instamart/Swiggy]'s quick-commerce reorder flow, identified
  [X] taps of avoidable friction in repeat purchases, and designed &
  prototyped "Smart Reorder," a one-tap basket-reorder redesign, in
  React/TypeScript.
- Built and ran a counterbalanced A/B usability study (n=[X]) comparing the
  current-style flow against the redesign, measuring time-to-checkout, taps,
  and SUS; found the redesign cut median time-to-checkout by [X]% and taps by
  [X]%, with [X]% of participants preferring it.
- Ran a [X]-respondent survey on quick-commerce reorder behaviour, found that
  [X]% of users said their last few orders were largely the same basket, and
  used the finding to define the primary success metric (7-day repeat-order
  rate) and a phased A/B rollout plan with a worked sample-size estimate.
