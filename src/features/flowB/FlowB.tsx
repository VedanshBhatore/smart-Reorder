import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { BottomNav } from "../../components/BottomNav";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useTapTracker } from "../../components/TapTracker";
import { getProduct, usualBasketIds } from "../../data/catalogue";
import { Checkout } from "../shared/Checkout";
import { OrderPlaced } from "../shared/OrderPlaced";
import { CategoriesTab } from "../shared/CategoriesTab";
import { HomeB } from "./screens/Home";
import { ReviewBasket } from "./screens/ReviewBasket";
import type { BasketLine, Overlay, TabB } from "./types";

interface FlowBProps {
  /** Fires exactly once, the instant the "Order placed" screen renders — this is the task-completion instant for timing. */
  onReachedPlaced?: () => void;
  /** Fires when the participant taps "Done" on the confirmation screen. */
  onDone?: () => void;
}

function initialBasket(): BasketLine[] {
  return usualBasketIds.map((i) => ({ productId: i.id, qty: i.qty, selected: true }));
}

export function FlowB({ onReachedPlaced, onDone }: FlowBProps) {
  const { recordTap } = useTapTracker();
  const [activeTab, setActiveTab] = useState<TabB>("home");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [basket, setBasket] = useState<BasketLine[]>(initialBasket);

  useEffect(() => {
    if (overlay === "placed") onReachedPlaced?.();
  }, [overlay, onReachedPlaced]);

  function toggle(productId: string) {
    setBasket((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, selected: !l.selected } : l))
    );
  }

  function setQty(productId: string, qty: number) {
    if (qty <= 0) {
      setBasket((prev) =>
        prev.map((l) => (l.productId === productId ? { ...l, selected: false } : l))
      );
      return;
    }
    setBasket((prev) => prev.map((l) => (l.productId === productId ? { ...l, qty } : l)));
  }

  function swap(productId: string) {
    const original = getProduct(productId);
    if (!original?.swapId) return;
    setBasket((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, swappedTo: original.swapId } : l))
    );
  }

  const { itemCount, total } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const line of basket) {
      if (!line.selected) continue;
      const original = getProduct(line.productId);
      if (!original) continue;
      const outOfStock = !line.swappedTo && !original.inStock;
      if (outOfStock) continue; // not purchasable until swapped
      const product = line.swappedTo ? getProduct(line.swappedTo) : original;
      if (!product) continue;
      count += line.qty;
      sum += line.qty * product.price;
    }
    return { itemCount: count, total: sum };
  }, [basket]);

  function selectTab(key: string, isTaskNav: boolean) {
    recordTap(isTaskNav ? "expected" : "mistap");
    setActiveTab(key as TabB);
  }

  let body: ReactNode;
  let header: ReactNode = null;

  if (overlay === "reviewBasket") {
    header = <ScreenHeader title="Your usual basket" onBack={() => setOverlay(null)} />;
    body = (
      <ReviewBasket
        basket={basket}
        onToggle={toggle}
        onSetQty={setQty}
        onSwap={swap}
        onCheckout={() => setOverlay("checkout")}
        itemCount={itemCount}
        total={total}
      />
    );
  } else if (overlay === "checkout") {
    header = <ScreenHeader title="Checkout" onBack={() => setOverlay("reviewBasket")} />;
    body = <Checkout itemCount={itemCount} total={total} onPlaceOrder={() => setOverlay("placed")} />;
  } else if (overlay === "placed") {
    body = <OrderPlaced itemCount={itemCount} total={total} onDone={() => onDone?.()} />;
  } else if (activeTab === "home") {
    body = <HomeB onOpenBasket={() => setOverlay("reviewBasket")} />;
  } else if (activeTab === "categories") {
    header = <ScreenHeader title="Categories" />;
    body = <CategoriesTab />;
  } else if (activeTab === "cart") {
    header = <ScreenHeader title="Cart" />;
    body = (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-ink-500">
        <span className="text-4xl">🛒</span>
        <p className="mt-2 text-sm">
          {itemCount > 0
            ? `${itemCount} items from your usual basket are ready. Open the basket card on Home to review and check out.`
            : "Your cart is empty."}
        </p>
      </div>
    );
  } else {
    header = <ScreenHeader title="Account" />;
    body = (
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-basket-100 text-xl">
          🙂
        </div>
        <div>
          <div className="font-semibold text-ink-900">Riya Sharma</div>
          <div className="text-sm text-ink-500">+91 98xxxxxx12</div>
        </div>
      </div>
    );
  }

  const showBottomNav = overlay === null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {header}
      <div className="phone-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">{body}</div>
      {showBottomNav && (
        <BottomNav
          items={[
            { key: "home", label: "Home", icon: "🏠" },
            { key: "categories", label: "Categories", icon: "📂" },
            { key: "cart", label: "Cart", icon: "🛒", badge: itemCount },
            { key: "account", label: "Account", icon: "👤" },
          ]}
          active={activeTab}
          onSelect={selectTab}
          taskKeys={["home"]}
        />
      )}
    </div>
  );
}
