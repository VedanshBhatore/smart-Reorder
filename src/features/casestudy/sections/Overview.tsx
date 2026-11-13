export function Overview() {
  return (
    <section id="overview" className="scroll-mt-20 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">01 · Overview</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        A faster way back to your usual basket
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">Role</h3>
          <p className="mt-1 text-sm text-ink-700">
            Solo product case study — research, teardown, UX design, prototyping, and usability testing.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">Timeline</h3>
          <p className="mt-1 text-sm text-ink-700">
            [TODO: fill in your real dates] — roughly 3–4 weeks end to end, part-time.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">Tools</h3>
          <p className="mt-1 text-sm text-ink-700">
            Figma (for the three final screens), React/TypeScript for the clickable prototypes, Google Forms
            for the survey, and a built-in usability-test harness for moderated sessions.
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink-700">
        Quick-commerce apps like Instamart win on speed, but repeat grocery orders — milk, bread, eggs,
        vegetables bought every few days — still go through the same multi-step reorder path as a first-time
        purchase. This case study tears down that friction, proposes a "Smart Reorder" card that pre-fills a
        user's usual basket for one-tap checkout, and tests both versions against real participants using a
        counterbalanced usability study built into this site. <strong>Directionally, the redesign cut the
        number of taps and the time needed to reorder, and participants preferred it</strong> — see the{" "}
        <a href="#validation" className="text-basket-600 underline">
          Validation
        </a>{" "}
        section for the actual numbers once real sessions are run; the charts there are sample data until then.
      </p>
    </section>
  );
}
