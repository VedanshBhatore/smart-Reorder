import { useTapTracker } from "../../components/TapTracker";

interface CheckoutProps {
  itemCount: number;
  total: number;
  onPlaceOrder: () => void;
}

const deliveryFee = 25;

export function Checkout({ itemCount, total, onPlaceOrder }: CheckoutProps) {
  const { recordTap } = useTapTracker();
  const grandTotal = total + deliveryFee;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
          Deliver to
        </div>
        <div className="mt-1 text-sm font-medium text-ink-900">Home — 2nd Cross, Indiranagar</div>
        <button
          type="button"
          onClick={() => recordTap("mistap")}
          className="mt-1 text-xs font-semibold text-basket-600"
        >
          Change address
        </button>
      </div>

      <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
          Delivery slot
        </div>
        <div className="mt-1 text-sm font-medium text-ink-900">Today, in 14 minutes</div>
      </div>

      <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
          Payment method
        </div>
        <div className="mt-1 text-sm font-medium text-ink-900">UPI — default</div>
      </div>

      <div className="mt-3 space-y-1.5 rounded-2xl bg-white p-4 text-sm shadow-sm">
        <div className="flex justify-between text-ink-700">
          <span>Items ({itemCount})</span>
          <span>₹{total}</span>
        </div>
        <div className="flex justify-between text-ink-700">
          <span>Delivery fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="flex justify-between border-t border-ink-300 pt-1.5 font-semibold text-ink-900">
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>

      <div className="flex-1" />

      <button
        type="button"
        onClick={() => {
          recordTap("expected");
          onPlaceOrder();
        }}
        className="mt-4 w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white active:bg-basket-700"
      >
        Place order · ₹{grandTotal}
      </button>
    </div>
  );
}
