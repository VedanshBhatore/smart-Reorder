import { SurveyImporter } from "../../../components/SurveyImporter";

const insights = [
  "[TODO: once real survey data is imported, write the first key insight here — e.g. what share of respondents said their last few orders were mostly the same items]",
  "[TODO: second key insight — e.g. how people say they reorder today, and whether that matches the Flow A baseline]",
  "[TODO: third key insight — e.g. the relationship between frustration rating and stated likelihood of using a one-tap reorder]",
];

export function Research() {
  return (
    <section id="research" className="scroll-mt-20 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">03 · Research</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Do people actually rebuy the same basket?
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-700">
        A 12-question survey (see <code>docs/survey.md</code>) sent to quick-commerce users, covering how
        often they order, how repetitive their baskets are, how they reorder today, and how they'd react to
        a one-tap "usual basket" card. The charts below are generated directly from the imported CSV — swap
        in your real export with the button below.
      </p>

      <div className="mt-6">
        <SurveyImporter />
      </div>

      <h3 className="mt-10 text-lg font-semibold text-ink-900">Three key insights</h3>
      <ol className="mt-3 space-y-2">
        {insights.map((text, i) => (
          <li key={i} className="rounded-xl border border-dashed border-accent-500 bg-accent-500/10 p-3 text-sm text-accent-600">
            <span className="font-semibold">{i + 1}.</span> {text}
          </li>
        ))}
      </ol>
    </section>
  );
}
