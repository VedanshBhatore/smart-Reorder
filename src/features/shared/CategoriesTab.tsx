import { categories } from "../../data/catalogue";
import { useTapTracker } from "../../components/TapTracker";

export function CategoriesTab() {
  const { recordTap } = useTapTracker();
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => recordTap("mistap")}
          className="rounded-2xl bg-white p-4 text-left text-sm font-medium text-ink-900 shadow-sm active:bg-ink-100"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
