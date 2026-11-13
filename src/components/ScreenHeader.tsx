import type { ReactNode } from "react";

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}

export function ScreenHeader({ title, onBack, right }: ScreenHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-ink-300 bg-white px-3 py-3">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-700 active:bg-ink-100"
        >
          ←
        </button>
      )}
      <h1 className="flex-1 truncate text-base font-semibold text-ink-900">{title}</h1>
      {right}
    </header>
  );
}
