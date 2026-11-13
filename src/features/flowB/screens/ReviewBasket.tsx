import { getProduct } from "../../../data/catalogue";
import { QuantityStepper } from "../../../components/QuantityStepper";
import { useTapTracker } from "../../../components/TapTracker";
import type { BasketLine } from "../types";

interface ReviewBasketProps {
  basket: BasketLine[];
  onToggle: (productId: string) => void;
  onSetQty: (productId: string, qty: number) => void;
  onSwap: (productId: string) => void;
  onCheckout: () => void;
  itemCount: number;
  total: number;
}

export function ReviewBasket({
  basket,
  onToggle,
  onSetQty,
  onSwap,
  onCheckout,
  itemCount,
  total,
}: ReviewBasketProps) {
  const { recordTap } = useTapTracker();

  return (
    <div className="flex flex-1 flex-col">
      <p className="px-4 pt-3 text-sm text-ink-500">
        Pre-selected from what you usually order. Uncheck anything you don't need this time.
      </p>
      <div className="mt-3 flex-1 divide-y divide-ink-300 px-4">
        {basket.map((line) => {
          const original = getProduct(line.productId);
          if (!original) return null;
          const effectiveProduct = line.swappedTo ? getProduct(line.swappedTo) : original;
          if (!effectiveProduct) return null;
          const outOfStock = !line.swappedTo && !original.inStock;

          return (
            <div key={line.productId} className="flex items-center gap-3 bg-white py-3 first:rounded-t-2xl last:rounded-b-2xl">
              <button
                type="button"
                aria-label={line.selected ? "Deselect item" : "Select item"}
                onClick={() => {
                  recordTap("expected");
                  onToggle(line.productId);
                }}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-sm font-bold ${
                  line.selected
                    ? "border-basket-600 bg-basket-600 text-white"
                    : "border-ink-300 text-transparent"
                }`}
              >
                ✓
              </button>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-xl">
                {effectiveProduct.emoji}
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-ink-900">
                  {effectiveProduct.name}
                  {line.swappedTo && (
                    <span className="ml-1.5 rounded-full bg-basket-100 px-1.5 py-0.5 text-[10px] font-semibold text-basket-700">
                      swapped
                    </span>
                  )}
                </div>
                <div className="text-xs text-ink-500">
                  {effectiveProduct.unit} · ₹{effectiveProduct.price}
                </div>
                {line.selected && outOfStock && (
                  <button
                    type="button"
                    onClick={() => {
                      recordTap("expected");
                      onSwap(line.productId);
                    }}
                    className="mt-1 rounded-full border border-dashed border-accent-500 bg-accent-500/10 px-2 py-1 text-[11px] font-semibold text-accent-600 active:bg-accent-500/20"
                  >
                    Out of stock — tap to swap for {getProduct(original.swapId ?? "")?.name}
                  </button>
                )}
              </div>

              {line.selected && !outOfStock && (
                <QuantityStepper
                  qty={line.qty}
                  onIncrement={() => {
                    recordTap("expected");
                    onSetQty(line.productId, line.qty + 1);
                  }}
                  onDecrement={() => {
                    recordTap("expected");
                    onSetQty(line.productId, line.qty - 1);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 border-t border-ink-300 bg-white p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-ink-500">{itemCount} items selected</span>
          <span className="font-semibold text-ink-900">₹{total}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            recordTap("expected");
            onCheckout();
          }}
          disabled={itemCount === 0}
          className="w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white disabled:opacity-40 active:bg-basket-700"
        >
          Checkout · ₹{total}
        </button>
      </div>
    </div>
  );
}
