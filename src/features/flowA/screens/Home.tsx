import { useTapTracker } from "../../../components/TapTracker";

export function HomeA() {
  const { recordTap } = useTapTracker();
  return (
    <div className="p-4">
      <h2 className="font-display text-xl font-semibold text-ink-900">Hi there 👋</h2>
      <p className="text-sm text-ink-500">Delivery in 14 minutes to Home</p>

      <button
        type="button"
        onClick={() => recordTap("mistap")}
        className="mt-4 block w-full rounded-2xl bg-basket-600 p-5 text-left text-white active:opacity-90"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-basket-100">
          Weekend offer
        </span>
        <div className="mt-1 text-lg font-semibold">Flat ₹50 off above ₹499</div>
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
