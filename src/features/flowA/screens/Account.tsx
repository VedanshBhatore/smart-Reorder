import { useTapTracker } from "../../../components/TapTracker";

const distractors = ["Saved addresses", "Payment methods", "Notifications", "Help & support"];

export function AccountA({ onOpenOrders }: { onOpenOrders: () => void }) {
  const { recordTap } = useTapTracker();
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-basket-100 text-xl">
          🙂
        </div>
        <div>
          <div className="font-semibold text-ink-900">Riya Sharma</div>
          <div className="text-sm text-ink-500">+91 98xxxxxx12</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          recordTap("expected");
          onOpenOrders();
        }}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left shadow-sm active:bg-ink-100"
      >
        <span className="flex items-center gap-3 font-medium text-ink-900">
          <span className="text-xl">📦</span> Your Orders
        </span>
        <span className="text-ink-500">›</span>
      </button>

      <div className="mt-4 divide-y divide-ink-300 rounded-2xl bg-white shadow-sm">
        {distractors.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => recordTap("mistap")}
            className="flex w-full items-center justify-between p-4 text-left text-ink-700 active:bg-ink-100"
          >
            {label}
            <span className="text-ink-500">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
