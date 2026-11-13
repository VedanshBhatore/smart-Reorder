import { Link } from "react-router-dom";
import { PhoneFrame } from "../../../components/PhoneFrame";
import { PrototypeFooter } from "../../../components/PrototypeFooter";
import { ToastProvider } from "../../../components/Toast";
import { FlowB } from "../../flowB/FlowB";

const decisions = [
  {
    title: "Pre-select everything, deselect what you don't want",
    body: "Defaulting to \"all 9 items checked\" makes the one-tap path the default path. Unchecking an item is one tap; adding a forgotten item from scratch in the old flow was several.",
  },
  {
    title: "Handle the out-of-stock item inline, not by leaving the flow",
    body: "The swap suggestion sits directly under the affected item with a single tap to accept it, instead of forcing a trip to search.",
  },
  {
    title: "Keep quantity steppers and checkout identical to Flow A",
    body: "Everything downstream of \"basket is ready\" — checkout, address, payment, slot — is unchanged on purpose, so any measured difference is attributable to the basket-assembly step, not to an unrelated checkout redesign.",
  },
  {
    title: "Surface the basket on Home, not under Account",
    body: "The current flow treats reordering as account management. Smart Reorder treats it as the thing you're probably here to do, so it's the first card on the screen you land on.",
  },
];

const nonGoals = [
  "Auto-reordering or subscriptions — this is a faster manual path, not a scheduled one. Automatic charges without a review step raise trust and billing-dispute questions this case study doesn't attempt to solve.",
  "Predictive new-item recommendations (\"you might also like…\") — a different, upsell-shaped problem that would muddy the one-tap-reorder metric.",
  "Multi-user / household basket sharing — real and worth exploring later, but out of scope for a first version aimed at the single-user repeat-order loop.",
  "Dynamic substitute ranking by margin or inventory depth — the prototype uses one fixed suggested swap per out-of-stock item; a production version would need real inventory and pricing signals.",
];

export function Solution() {
  return (
    <section id="solution" className="scroll-mt-20 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">05 · Solution</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Smart Reorder
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-700">
        A "Your usual basket" card on Home opens straight into a review screen: items pre-selected with
        quantities, a one-tap swap for anything out of stock, and a single checkout button. Try it below —
        it's the same interactive prototype used in the usability test.
      </p>

      <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
        <PhoneFrame label="Flow B — Smart Reorder" fullscreenOnMobile={false}>
          <ToastProvider>
            <FlowB />
            <PrototypeFooter />
          </ToastProvider>
        </PhoneFrame>

        <div className="max-w-xl">
          <h3 className="text-lg font-semibold text-ink-900">Design decisions</h3>
          <div className="mt-3 space-y-3">
            {decisions.map((d) => (
              <div key={d.title} className="rounded-xl bg-white p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-ink-900">{d.title}</h4>
                <p className="mt-1 text-sm text-ink-700">{d.body}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-lg font-semibold text-ink-900">What we chose not to build</h3>
          <ul className="mt-3 space-y-2">
            {nonGoals.map((n) => (
              <li key={n} className="flex gap-2 text-sm text-ink-700">
                <span className="text-ink-300">—</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-ink-500">
            Want to compare it against the current-style flow directly?{" "}
            <Link to="/prototype/a" className="text-basket-600 underline">
              Try Flow A
            </Link>{" "}
            or{" "}
            <Link to="/prototype/b" className="text-basket-600 underline">
              open Flow B full-screen
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
