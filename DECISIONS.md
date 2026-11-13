# Decisions Log

One line per decision: what was decided, and why. Chronological.

- Stack: Vite + React + TypeScript + Tailwind, as specified by the brief. No backend; `localStorage` + CSV/JSON export/import covers all persistence needs for a portfolio piece.
- Fictional brand "Basket", neutral teal/charcoal palette, no logos — avoids any Swiggy/Instamart brand-asset reuse while still being visually distinctive.
- Catalogue uses generic product descriptors ("Toned Milk 500 ml") rather than real FMCG brand names, to keep the whole project unambiguously free of third-party trademarks.
- Flow A and Flow B each get their own isolated cart/basket React context, reset per run, so the usability-test harness can run either flow twice in a session without state leaking between them.
- Tap tracking is explicit, not inferred: every interactive element that matters to the task calls `recordTap('expected' | 'mistap')` itself. Inferring "productive vs wasted" taps from DOM structure alone is unreliable; explicit tagging keeps the metric honest and testable.
- "Mis-tap" is defined per-screen at build time (e.g. tapping a disabled/out-of-stock Add button, tapping a bottom-nav item that isn't part of the task) rather than computed heuristically — keeps the definition inspectable in code and in the case study text.
- SUS, tap/time metrics, and counterbalancing are pure functions in `src/lib/` with no React/DOM dependency, specifically so they're trivially unit-testable with Vitest.
- All researcher-facing numbers (research charts, validation charts) are driven by imported CSV/JSON only. Shipped sample files are visibly labelled "Sample data, replace with your research" in the UI, never silently treated as real.
- Survey and usability column mappings live in config files (`src/lib/surveyColumnMap.ts`) so wording tweaks to the real Google Form don't require code changes, only config edits.
- Case-study "Research" insights are hard-coded `[TODO]` placeholders until real survey data is imported and reviewed by the user — the brief explicitly forbids inventing research results.
- Journey map (Teardown section) is a coded step diagram (React/Tailwind), not an image, so it can be edited as data (array of steps) rather than redrawn.
