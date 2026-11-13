import { ScreenshotSlot } from "../../../components/ScreenshotSlot";
import { JourneyMap } from "../JourneyMap";

const strengths = [
  {
    title: "Delivery-time promise is the whole brand",
    body: "The 10–15 minute estimate is shown before you've even opened a category, and it's usually accurate — it sets expectations once and doesn't need to be re-earned on every screen.",
  },
  {
    title: "Search and category browsing are fast",
    body: "Finding a specific or new item is quick: autocomplete, clear categories, and visible stock status up front. First-time and exploratory shopping is genuinely well solved.",
  },
  {
    title: "Checkout is short and trustworthy",
    body: "Saved addresses, a default payment method, and a visible delivery slot mean checkout itself is rarely the bottleneck — which is exactly why this case study doesn't touch it.",
  },
];

export function Teardown() {
  return (
    <section id="teardown" className="scroll-mt-20 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">02 · Teardown</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        What Instamart gets right — and where repeat orders lose time
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {strengths.map((s) => (
          <div key={s.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-ink-900">{s.title}</h3>
            <p className="mt-1.5 text-sm text-ink-700">{s.body}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-lg font-semibold text-ink-900">
        Journey map: reordering your usual basket today
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-ink-500">
        Modeled on how quick-commerce reorder flows commonly work (and on Flow A, the baseline prototype in
        the Solution section below). Scroll horizontally on smaller screens.
      </p>
      <div className="mt-4">
        <JourneyMap />
      </div>

      <h3 className="mt-10 text-lg font-semibold text-ink-900">Annotated screenshots</h3>
      <p className="mt-1 max-w-2xl text-sm text-ink-500">
        Replace these with your own screenshots of the real Instamart app — see{" "}
        <code>public/screens/README.md</code>.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScreenshotSlot
          src="/screens/01-account-tab.png"
          caption="Account tab"
          annotation="Where reordering actually starts — one level away from shopping."
        />
        <ScreenshotSlot
          src="/screens/02-order-detail.png"
          caption="Order detail"
          annotation="Adding items one at a time, each a separate tap."
        />
        <ScreenshotSlot
          src="/screens/03-out-of-stock.png"
          caption="Out of stock"
          annotation="No inline substitute — the flow breaks here."
        />
      </div>
    </section>
  );
}
