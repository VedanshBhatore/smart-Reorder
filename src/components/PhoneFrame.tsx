import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  /** Label shown above the frame on desktop, e.g. "Flow A — Current-style reorder". */
  label?: string;
}

/**
 * Renders children inside a phone-shaped frame on larger screens; on small screens
 * (actual mobile viewports) the chrome disappears and the content fills the viewport,
 * per the brief ("phone frame on desktop, full screen on mobile").
 */
export function PhoneFrame({ children, label }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <div className="hidden text-sm font-medium text-ink-500 sm:block">{label}</div>
      )}
      <div
        className="relative flex h-[720px] w-[360px] flex-col overflow-hidden rounded-[2.5rem] border-[10px] border-ink-900 bg-white shadow-2xl sm:h-[720px] sm:w-[360px]
                   max-sm:h-screen max-sm:w-screen max-sm:rounded-none max-sm:border-0"
      >
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink-900 max-sm:hidden" />
        <div className="phone-scroll flex min-h-0 flex-1 flex-col overflow-y-auto bg-ink-100">
          {children}
        </div>
      </div>
    </div>
  );
}
