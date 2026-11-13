import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { TapKind } from "../lib/metrics";

interface TapTrackerValue {
  recordTap: (kind: TapKind) => void;
}

const noopTracker: TapTrackerValue = { recordTap: () => {} };

const TapTrackerContext = createContext<TapTrackerValue>(noopTracker);

/**
 * Wraps a flow with real tap recording (used by the /test moderator harness).
 * Outside of test mode, components call the same hook but it's a no-op —
 * the standalone prototype pages don't need to carry tracker plumbing.
 */
export function TapTrackerProvider({
  value,
  children,
}: {
  value: TapTrackerValue;
  children: ReactNode;
}) {
  return <TapTrackerContext.Provider value={value}>{children}</TapTrackerContext.Provider>;
}

export function useTapTracker(): TapTrackerValue {
  return useContext(TapTrackerContext);
}
