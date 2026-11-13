import { useMemo, useState } from "react";
import { getProduct } from "../data/catalogue";

export type CartLines = Record<string, number>; // productId -> qty

export function useCart(initial: CartLines = {}) {
  const [cart, setCart] = useState<CartLines>(initial);

  function setQty(productId: string, qty: number) {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: qty };
    });
  }

  function addItem(productId: string, qty = 1) {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + qty }));
  }

  function removeItem(productId: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([productId, qty]) => ({ product: getProduct(productId), qty }))
        .filter((l): l is { product: NonNullable<typeof l.product>; qty: number } => !!l.product),
    [cart]
  );

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const total = useMemo(() => lines.reduce((sum, l) => sum + l.qty * l.product.price, 0), [lines]);

  return { cart, lines, count, total, setQty, addItem, removeItem };
}
