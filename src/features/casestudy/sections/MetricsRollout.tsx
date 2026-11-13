const metrics = [
  {
    kind: "Primary",
    name: "7-day repeat-order rate",
    detail: "Share of customers who placed a repeat order within 7 days of their previous one. This is the metric the whole redesign is aimed at moving.",
    color: "basket" as const,
  },
  {
    kind: "Secondary",
    name: "Time-to-checkout and taps-to-checkout, for repeat orders",
    detail: "The mechanism metrics — if Smart Reorder works, these should drop for the cohort that uses it, which is what the usability test measures directly.",
    color: "basket" as const,
  },
  {
    kind: "Guardrail",
    name: "Average order value",
    detail: "Must not drop. A pre-filled basket that quietly encourages removing items (to get to checkout faster) would be a false win.",
    color: "accent" as const,
  },
  {
    kind: "Guardrail",
    name: "Unwanted-item rate",
    detail: "Items removed after delivery or refunded. A swap-suggestion feature that pushes bad substitutes would show up here first.",
    color: "accent" as const,
  },
];

export function MetricsRollout() {
  return (
    <section id="metrics" className="scroll-mt-20 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">07 · Metrics &amp; rollout</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Success metrics and rollout plan
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((m) => (
          <div key={m.name} className="rounded-2xl bg-white p-4 shadow-sm">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                m.color === "basket" ? "bg-basket-100 text-basket-700" : "bg-accent-500/15 text-accent-600"
              }`}
            >
              {m.kind}
            </span>
            <h3 className="mt-2 text-sm font-semibold text-ink-900">{m.name}</h3>
            <p className="mt-1 text-sm text-ink-700">{m.detail}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-lg font-semibold text-ink-900">A/B test design</h3>
      <p className="mt-2 max-w-2xl text-sm text-ink-700">
        Randomize at the user level (not session level, so no one sees both experiences), holding everyone
        else on the current flow. Primary analysis: 7-day repeat-order rate, control vs. treatment, with the
        two secondary and two guardrail metrics reported alongside rather than used to call the test.
      </p>

      <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
        <h4 className="text-sm font-semibold text-ink-900">Sample-size estimate</h4>
        <p className="mt-2 text-sm text-ink-700">
          For a two-proportion comparison (repeat vs. not, control vs. treatment), the required sample size
          per arm is:
        </p>
        <p className="mt-3 rounded-xl bg-ink-100 p-3 text-center font-mono text-sm text-ink-900">
          n&nbsp;=&nbsp;(z<sub>α/2</sub>&nbsp;+&nbsp;z<sub>β</sub>)² · [p₁(1−p₁) + p₂(1−p₂)] / (p₁ − p₂)²
        </p>
        <ul className="mt-3 space-y-1 text-sm text-ink-700">
          <li>
            <strong>z<sub>α/2</sub></strong> — critical value for the significance level (1.96 for a two-sided
            test at α = 0.05)
          </li>
          <li>
            <strong>z<sub>β</sub></strong> — critical value for the desired power (0.84 for 80% power)
          </li>
          <li>
            <strong>p₁</strong> — baseline 7-day repeat-order rate; <strong>p₂</strong> — the target rate after
            the minimum detectable effect (MDE)
          </li>
        </ul>
        <p className="mt-3 text-sm text-ink-700">
          Worked example with illustrative assumptions —{" "}
          <span className="font-semibold text-accent-600">
            [TODO: replace p₁ with your app's real baseline repeat-order rate from analytics]
          </span>
          : baseline p₁ = 35%, MDE of +5 percentage points (p₂ = 40%), α = 0.05 two-sided, power = 80%.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="py-1.5 pr-3 text-ink-500">p₁(1−p₁) + p₂(1−p₂)</td>
                <td className="py-1.5 font-mono text-ink-900">0.35 × 0.65 + 0.40 × 0.60 = 0.4675</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="py-1.5 pr-3 text-ink-500">(z<sub>α/2</sub> + z<sub>β</sub>)²</td>
                <td className="py-1.5 font-mono text-ink-900">(1.96 + 0.84)² = 7.84</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="py-1.5 pr-3 text-ink-500">(p₁ − p₂)²</td>
                <td className="py-1.5 font-mono text-ink-900">(0.05)² = 0.0025</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 font-semibold text-ink-900">n per arm</td>
                <td className="py-1.5 font-mono font-semibold text-ink-900">
                  7.84 × 0.4675 / 0.0025 ≈ 1,466 → ~2,930 users total
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Smaller MDEs or lower baseline variance need larger samples; this is a planning estimate, not a
          promise — recompute with your real baseline and the smallest effect worth shipping for.
        </p>
      </div>

      <h3 className="mt-10 text-lg font-semibold text-ink-900">Phased rollout</h3>
      <ol className="mt-3 space-y-3">
        {[
          ["Internal dogfood", "Ship to the team first. Catch obvious breakage (wrong swap suggestions, basket staleness) before any real customer sees it."],
          ["5–10% holdout A/B", "Randomize a small slice of eligible repeat customers (people with ≥2 orders sharing ≥60% of items). Run until the sample-size target above is met."],
          ["Expand by city tier / catalogue depth", "Roll to cities where substitute coverage is good first — the swap feature is only as good as the substitute catalogue behind it."],
          ["Full rollout with guardrails live", "Ship to everyone, keep AOV and unwanted-item-rate dashboards on the same cadence as the primary metric indefinitely, not just for the test window."],
        ].map(([title, body], i) => (
          <li key={title} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-basket-600 text-xs font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h4 className="text-sm font-semibold text-ink-900">{title}</h4>
              <p className="mt-0.5 text-sm text-ink-700">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
