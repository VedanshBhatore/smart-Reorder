import { QuantityStepper } from "../../../components/QuantityStepper";
import { useTapTracker } from "../../../components/TapTracker";
import type { useCart } from "../../useCart";

interface CartAProps {
  cartApi: ReturnType<typeof useCart>;
  onCheckout: () => void;
}

export function CartA({ cartApi, onCheckout }: CartAProps) {
  const { recordTap } = useTapTracker();
  const { lines, total, setQty } = cartApi;

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-ink-500">
        <span className="text-4xl">🛒</span>
        <p className="mt-2 text-sm">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <div className="divide-y divide-ink-300 rounded-2xl bg-white shadow-sm">
        {lines.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center gap-3 p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-xl">
              {product.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink-900">{product.name}</div>
              <div className="text-xs text-ink-500">₹{product.price} · {product.unit}</div>
            </div>
            <QuantityStepper
              qty={qty}
              onIncrement={() => {
                recordTap("expected");
                setQty(product.id, qty + 1);
              }}
              onDecrement={() => {
                recordTap("expected");
                setQty(product.id, qty - 1);
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-4 text-sm shadow-sm">
        <span className="text-ink-500">Subtotal</span>
        <span className="font-semibold text-ink-900">₹{total}</span>
      </div>

      <button
        type="button"
        onClick={() => {
          recordTap("expected");
          onCheckout();
        }}
        className="mt-4 w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white active:bg-basket-700"
      >
        Checkout · ₹{total}
      </button>
    </div>
  );
}
