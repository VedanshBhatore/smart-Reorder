interface OrderPlacedProps {
  itemCount: number;
  total: number;
  onDone: () => void;
}

export function OrderPlaced({ itemCount, total, onDone }: OrderPlacedProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <span className="text-5xl">✅</span>
      <h2 className="mt-4 font-display text-xl font-semibold text-ink-900">Order placed!</h2>
      <p className="mt-1 text-sm text-ink-500">
        {itemCount} items · ₹{total + 25} · arriving in 14 minutes
      </p>
      <button
        type="button"
        onClick={onDone}
        className="mt-8 w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white active:bg-basket-700"
      >
        Done
      </button>
    </div>
  );
}
