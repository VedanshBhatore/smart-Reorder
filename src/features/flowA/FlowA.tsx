import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BottomNav } from "../../components/BottomNav";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useTapTracker } from "../../components/TapTracker";
import { Checkout } from "../shared/Checkout";
import { OrderPlaced } from "../shared/OrderPlaced";
import { CategoriesTab } from "../shared/CategoriesTab";
import { useCart } from "../useCart";
import { HomeA } from "./screens/Home";
import { AccountA } from "./screens/Account";
import { OrdersListA } from "./screens/OrdersList";
import { OrderDetailA } from "./screens/OrderDetail";
import { SearchA } from "./screens/Search";
import { CartA } from "./screens/Cart";
import type { AccountScreen, Overlay, TabA } from "./types";

interface FlowAProps {
  /** Fires exactly once, the instant the "Order placed" screen renders — this is the task-completion instant for timing. */
  onReachedPlaced?: () => void;
  /** Fires when the participant taps "Done" on the confirmation screen. */
  onDone?: () => void;
}

export function FlowA({ onReachedPlaced, onDone }: FlowAProps) {
  const { recordTap } = useTapTracker();
  const [activeTab, setActiveTab] = useState<TabA>("home");
  const [accountStack, setAccountStack] = useState<AccountScreen[]>([{ name: "account" }]);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const cartApi = useCart();

  // A ref keeps the effect keyed only on `overlay` — a fresh inline callback
  // from the caller on every render must not re-fire task completion.
  const onReachedPlacedRef = useRef(onReachedPlaced);
  useEffect(() => {
    onReachedPlacedRef.current = onReachedPlaced;
  });
  useEffect(() => {
    if (overlay === "placed") onReachedPlacedRef.current?.();
  }, [overlay]);

  function selectTab(key: string, isTaskNav: boolean) {
    recordTap(isTaskNav ? "expected" : "mistap");
    setActiveTab(key as TabA);
  }

  function pushAccount(screen: AccountScreen) {
    setAccountStack((prev) => [...prev, screen]);
  }

  function popAccount() {
    setAccountStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  const accountScreen = accountStack[accountStack.length - 1];

  let body: ReactNode;
  let header: ReactNode = null;

  if (overlay === "checkout") {
    header = <ScreenHeader title="Checkout" onBack={() => setOverlay(null)} />;
    body = (
      <Checkout
        itemCount={cartApi.count}
        total={cartApi.total}
        onPlaceOrder={() => setOverlay("placed")}
      />
    );
  } else if (overlay === "placed") {
    body = (
      <OrderPlaced
        itemCount={cartApi.count}
        total={cartApi.total}
        onDone={() => onDone?.()}
      />
    );
  } else if (activeTab === "home") {
    body = <HomeA />;
  } else if (activeTab === "categories") {
    header = <ScreenHeader title="Categories" />;
    body = <CategoriesTab />;
  } else if (activeTab === "cart") {
    header = <ScreenHeader title="Cart" />;
    body = <CartA cartApi={cartApi} onCheckout={() => setOverlay("checkout")} />;
  } else {
    // account tab
    if (accountScreen.name === "account") {
      header = <ScreenHeader title="Account" />;
      body = <AccountA onOpenOrders={() => pushAccount({ name: "orders" })} />;
    } else if (accountScreen.name === "orders") {
      header = <ScreenHeader title="Your Orders" onBack={popAccount} />;
      body = (
        <OrdersListA
          onOpenOrder={(orderId) => pushAccount({ name: "orderDetail", orderId })}
        />
      );
    } else if (accountScreen.name === "orderDetail") {
      header = <ScreenHeader title={accountScreen.orderId} onBack={popAccount} />;
      body = (
        <OrderDetailA
          orderId={accountScreen.orderId}
          cart={cartApi.cart}
          onAdd={(productId) => cartApi.addItem(productId, 1)}
          onFindSubstitute={(orderId) => pushAccount({ name: "search", orderId })}
        />
      );
    } else {
      header = <ScreenHeader title="Find a substitute" onBack={popAccount} />;
      body = <SearchA orderId={accountScreen.orderId} onAdd={(productId) => cartApi.addItem(productId, 1)} />;
    }
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
            { key: "cart", label: "Cart", icon: "🛒", badge: cartApi.count },
            { key: "account", label: "Account", icon: "👤" },
          ]}
          active={activeTab}
          onSelect={selectTab}
          taskKeys={["home", "account", "cart"]}
        />
      )}
    </div>
  );
}
