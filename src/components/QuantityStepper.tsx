interface QuantityStepperProps {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ qty, onIncrement, onDecrement, min = 0, max = 20 }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-basket-500 bg-basket-50 px-1 py-0.5">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={qty <= min}
        onClick={onDecrement}
        className="flex h-6 w-6 items-center justify-center rounded-full text-basket-700 disabled:opacity-30 active:bg-basket-200"
      >
        −
      </button>
      <span className="w-5 text-center text-sm font-semibold text-basket-800">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={qty >= max}
        onClick={onIncrement}
        className="flex h-6 w-6 items-center justify-center rounded-full text-basket-700 disabled:opacity-30 active:bg-basket-200"
      >
        +
      </button>
    </div>
  );
}
