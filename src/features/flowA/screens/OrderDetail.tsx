import { getProduct, pastOrders } from "../../../data/catalogue";
import { useTapTracker } from "../../../components/TapTracker";
import { useToast } from "../../../components/Toast";
import type { CartLines } from "../../useCart";

interface OrderDetailAProps {
  orderId: string;
  cart: CartLines;
  onAdd: (productId: string) => void;
  onFindSubstitute: (orderId: string) => void;
}

export function OrderDetailA({ orderId, cart, onAdd, onFindSubstitute }: OrderDetailAProps) {
  const { recordTap } = useTapTracker();
  const { showToast } = useToast();
  const order = pastOrders.find((o) => o.id === orderId);
  if (!order) return null;

  return (
    <div className="p-4">
      <p className="mb-3 text-sm text-ink-500">
        Add items from this order to your cart one at a time.
      </p>
      <div className="divide-y divide-ink-300 rounded-2xl bg-white shadow-sm">
        {order.items.map(({ productId, qty }) => {
          const product = getProduct(productId);
          if (!product) return null;
          const inCart = cart[productId] ?? 0;
          return (
            <div key={productId} className="flex items-center gap-3 p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-xl">
                {product.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-ink-900">{product.name}</div>
                <div className="text-xs text-ink-500">
                  {product.unit} · ₹{product.price} · bought {qty}x last time
                </div>
                {!product.inStock && (
                  <div className="mt-1 text-xs font-medium text-accent-600">Currently out of stock</div>
                )}
              </div>
              {product.inStock ? (
                inCart > 0 ? (
                  <span className="rounded-full bg-basket-100 px-3 py-1.5 text-xs font-semibold text-basket-700">
                    Added · {inCart}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      recordTap("expected");
                      onAdd(productId);
                      showToast(`${product.name} added to cart`);
                    }}
                    className="shrink-0 rounded-full border border-basket-500 px-3 py-1.5 text-xs font-semibold text-basket-600 active:bg-basket-50"
                  >
                    Add
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    recordTap("mistap");
                    showToast("Out of stock right now");
                  }}
                  className="shrink-0 rounded-full border border-ink-300 px-3 py-1.5 text-xs font-semibold text-ink-500"
                >
                  Add
                </button>
              )}
            </div>
          );
        })}
      </div>

      {order.items.some(({ productId }) => !getProduct(productId)?.inStock) && (
        <button
          type="button"
          onClick={() => {
            recordTap("expected");
            onFindSubstitute(orderId);
          }}
          className="mt-3 w-full rounded-xl border border-dashed border-accent-500 bg-accent-500/10 p-3 text-sm font-medium text-accent-600 active:bg-accent-500/20"
        >
          🔎 Find a substitute for the out-of-stock item
        </button>
      )}
    </div>
  );
}
