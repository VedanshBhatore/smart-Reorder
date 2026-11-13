interface BottomNavItem {
  key: string;
  label: string;
  icon: string;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
  active: string;
  onSelect: (key: string, isTaskNav: boolean) => void;
  /** Keys that are part of the current task's expected path (vs. a distractor tap). */
  taskKeys: string[];
}

export function BottomNav({ items, active, onSelect, taskKeys }: BottomNavProps) {
  return (
    <nav className="grid shrink-0 grid-cols-4 border-t border-ink-300 bg-white">
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key, taskKeys.includes(item.key))}
            className={`relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition active:bg-ink-100 ${
              isActive ? "text-basket-600" : "text-ink-500"
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
            {!!item.badge && (
              <span className="absolute right-6 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
