export function ProblemStatement() {
  return (
    <section id="problem" className="scroll-mt-20 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">04 · Problem</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Problem statement &amp; How Might We
      </h2>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">Problem statement</h3>
        <p className="mt-2 text-base leading-relaxed text-ink-900">
          Repeat customers who buy largely the same basket every few days — milk, bread, eggs, vegetables —
          still have to rebuild that basket by hand each time. Today's path means leaving the shopping
          context for account history, opening a past order, adding items one at a time, and handling any
          out-of-stock item by starting a fresh search. The cost scales with basket size and falls
          disproportionately on the app's most loyal, highest-frequency customers.
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-basket-50 p-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-basket-700">How might we…</h3>
        <p className="mt-2 font-display text-xl font-medium text-basket-900">
          …let someone go from opening the app to a checked-out basket of what they usually buy, in roughly
          one glance and one tap — while still letting them see and adjust exactly what's in it?
        </p>
      </div>
    </section>
  );
}
