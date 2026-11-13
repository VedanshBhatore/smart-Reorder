import { getProduct, usualBasketIds } from "../../../data/catalogue";
import { useTapTracker } from "../../../components/TapTracker";

export function HomeB({ onOpenBasket }: { onOpenBasket: () => void }) {
  const { recordTap } = useTapTracker();
  const items = usualBasketIds.map((i) => getProduct(i.id)).filter(Boolean);

  return (
    <div className="p-4">
      <h2 className="font-display text-xl font-semibold text-ink-900">Hi there 👋</h2>
      <p className="text-sm text-ink-500">Delivery in 14 minutes to Home</p>

      <button
        type="button"
        onClick={() => {
          recordTap("expected");
          onOpenBasket();
        }}
        className="mt-4 block w-full rounded-2xl bg-basket-600 p-4 text-left text-white shadow-md active:opacity-90"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-basket-100">
          Based on your last few orders
        </span>
        <div className="mt-1 text-lg font-semibold">
          Your usual basket, {usualBasketIds.length} items
        </div>
        <div className="mt-2 flex -space-x-1.5">
          {items.slice(0, 7).map((p) => (
            <span
              key={p!.id}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-basket-600 bg-white text-base"
            >
              {p!.emoji}
            </span>
          ))}
        </div>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-basket-700">
          Review & reorder →
        </div>
      </button>

      <h3 className="mt-6 text-sm font-semibold text-ink-700">Shop by category</h3>
      <div className="mt-2 grid grid-cols-4 gap-3">
        {["Dairy", "Snacks", "Veggies", "Staples"].map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => recordTap("mistap")}
            className="flex flex-col items-center gap-1 rounded-xl bg-white p-2 text-center text-[11px] font-medium text-ink-700 shadow-sm active:bg-ink-100"
          >
            <span className="text-2xl">🛒</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
