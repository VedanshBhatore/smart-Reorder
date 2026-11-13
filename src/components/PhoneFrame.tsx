import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  /** Label shown above the frame on desktop, e.g. "Flow A — Current-style reorder". */
  label?: string;
  /**
   * When true (the default), the chrome disappears and content fills the viewport on an
   * actual mobile screen — correct for the dedicated /prototype/a, /prototype/b and /test
   * pages, where the whole page *is* the prototype. Embedded previews (e.g. the Solution
   * section of the case-study page) must pass `fullscreenOnMobile={false}` so the mock
   * stays a contained phone mockup instead of swallowing the surrounding page on mobile.
   */
  fullscreenOnMobile?: boolean;
}

export function PhoneFrame({ children, label, fullscreenOnMobile = true }: PhoneFrameProps) {
  const frameSizeClasses = fullscreenOnMobile
    ? "h-[720px] w-[360px] max-sm:h-screen max-sm:w-screen max-sm:rounded-none max-sm:border-0"
    : "h-[640px] w-[320px]";

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <div className={`text-sm font-medium text-ink-500 ${fullscreenOnMobile ? "hidden sm:block" : "block"}`}>
          {label}
        </div>
      )}
      <div
        className={`relative flex flex-col overflow-hidden rounded-[2.5rem] border-[10px] border-ink-900 bg-white shadow-2xl ${frameSizeClasses}`}
      >
        <div
          className={`absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink-900 ${fullscreenOnMobile ? "max-sm:hidden" : ""}`}
        />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-ink-100">{children}</div>
      </div>
    </div>
  );
}
