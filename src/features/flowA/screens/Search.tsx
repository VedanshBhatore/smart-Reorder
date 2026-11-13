import { useMemo, useState } from "react";
import { catalogue, getProduct, pastOrders } from "../../../data/catalogue";
import { useTapTracker } from "../../../components/TapTracker";
import { useToast } from "../../../components/Toast";

interface SearchAProps {
  orderId: string;
  onAdd: (productId: string) => void;
}

export function SearchA({ orderId, onAdd }: SearchAProps) {
  const { recordTap } = useTapTracker();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");

  const order = pastOrders.find((o) => o.id === orderId);
  const outOfStock = order?.items
    .map((i) => getProduct(i.productId))
    .find((p) => p && !p.inStock);
  const suggested = outOfStock?.swapId ? getProduct(outOfStock.swapId) : undefined;

  const results = useMemo(() => {
    const inStock = catalogue.filter((p) => p.inStock);
    if (!query.trim()) return inStock;
    const q = query.trim().toLowerCase();
    return inStock.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="p-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an item"
        className="w-full rounded-full border border-ink-300 bg-white px-4 py-2.5 text-sm outline-basket-500"
      />

      {suggested && !query && (
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Suggested substitute for {outOfStock?.name}
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-basket-300 bg-basket-50 p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl">
              {suggested.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink-900">{suggested.name}</div>
              <div className="text-xs text-ink-500">{suggested.unit} · ₹{suggested.price}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                recordTap("expected");
                onAdd(suggested.id);
                showToast(`${suggested.name} added to cart`);
              }}
              className="shrink-0 rounded-full bg-basket-600 px-3 py-1.5 text-xs font-semibold text-white active:bg-basket-700"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 divide-y divide-ink-300 rounded-2xl bg-white shadow-sm">
        {results.map((product) => (
          <div key={product.id} className="flex items-center gap-3 p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-xl">
              {product.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink-900">{product.name}</div>
              <div className="text-xs text-ink-500">{product.unit} · ₹{product.price}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                recordTap(product.id === suggested?.id ? "expected" : "mistap");
                onAdd(product.id);
                showToast(`${product.name} added to cart`);
              }}
              className="shrink-0 rounded-full border border-basket-500 px-3 py-1.5 text-xs font-semibold text-basket-600 active:bg-basket-50"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
