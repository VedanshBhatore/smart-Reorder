import { pastOrders } from "../../../data/catalogue";
import { useTapTracker } from "../../../components/TapTracker";

export function OrdersListA({ onOpenOrder }: { onOpenOrder: (orderId: string) => void }) {
  const { recordTap } = useTapTracker();
  return (
    <div className="divide-y divide-ink-300">
      {pastOrders.map((order) => (
        <button
          key={order.id}
          type="button"
          onClick={() => {
            recordTap("expected");
            onOpenOrder(order.id);
          }}
          className="flex w-full items-center justify-between bg-white p-4 text-left active:bg-ink-100"
        >
          <div>
            <div className="font-medium text-ink-900">{order.id}</div>
            <div className="text-sm text-ink-500">
              {new Date(order.placedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              · {order.items.length} items
            </div>
          </div>
          <span className="text-ink-500">›</span>
        </button>
      ))}
    </div>
  );
}
