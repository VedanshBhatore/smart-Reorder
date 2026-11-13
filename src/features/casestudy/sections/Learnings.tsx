const learnings = [
  "Counting taps forces precision. Writing the baseline flow screen-by-screen made the real cost of \"just open your past order\" obvious in a way that describing it in a sentence hadn't — eight items meant eight separate Add taps, full stop.",
  "The out-of-stock path is where flows actually break, not where they're slow. Flow A doesn't just take longer when an item is unavailable — it kicks the user out of the task entirely into an unrelated search screen. Flow B's inline swap targets that specific failure, not just raw speed.",
  "A one-tap default has to stay editable to be trustworthy. Every version of this concept that didn't let people deselect or adjust quantities before checkout felt closer to \"the app decided for me\" than \"the app saved me time\" — hence non-goal #1 and design decision #1 pulling in the same direction.",
];

const nextSteps = [
  "Send the survey (docs/survey.md) to real quick-commerce users — target 50+ responses — and import the export on the Research section.",
  "Run moderated usability sessions with 5–8 people through /test, counterbalanced automatically, then import that data on /results.",
  "Fill in the [TODO] placeholders in Research and Overview once real numbers exist — never backfill them with guesses.",
  "Add real annotated Instamart screenshots to public/screens/ for the Teardown section.",
  "Recreate the three core Smart Reorder screens (basket card, review basket, swap suggestion) in Figma, so the visual design has a source file beyond the coded prototype.",
];

export function Learnings() {
  return (
    <section id="learnings" className="scroll-mt-20 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">08 · Learnings</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Learnings and next steps
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-ink-900">What this project taught me</h3>
          <ul className="mt-3 space-y-3">
            {learnings.map((l) => (
              <li key={l} className="rounded-xl bg-white p-4 text-sm text-ink-700 shadow-sm">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ink-900">Next steps</h3>
          <ol className="mt-3 space-y-2">
            {nextSteps.map((s, i) => (
              <li key={s} className="flex gap-3 rounded-xl bg-basket-50 p-3 text-sm text-basket-900">
                <span className="font-semibold text-basket-600">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
