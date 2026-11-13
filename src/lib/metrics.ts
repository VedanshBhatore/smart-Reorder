// Pure, immutable metric tracking for one run of one flow during a usability test.
// Kept free of React/DOM so it is trivial to unit test and reuse in a reducer.

export type TapKind = "expected" | "mistap";

export interface FlowMetrics {
  startedAt: number | null;
  endedAt: number | null;
  taps: number;
  mistaps: number;
  completed: boolean;
  gaveUp: boolean;
}

export function createFlowMetrics(): FlowMetrics {
  return {
    startedAt: null,
    endedAt: null,
    taps: 0,
    mistaps: 0,
    completed: false,
    gaveUp: false,
  };
}

export function startTiming(metrics: FlowMetrics, now: number = Date.now()): FlowMetrics {
  if (metrics.startedAt !== null) return metrics;
  return { ...metrics, startedAt: now };
}

/** Every tap counts toward `taps`; mistaps additionally count toward `mistaps`. */
export function recordTap(metrics: FlowMetrics, kind: TapKind): FlowMetrics {
  if (metrics.completed || metrics.gaveUp) return metrics;
  return {
    ...metrics,
    taps: metrics.taps + 1,
    mistaps: metrics.mistaps + (kind === "mistap" ? 1 : 0),
  };
}

export function completeFlow(metrics: FlowMetrics, now: number = Date.now()): FlowMetrics {
  if (metrics.completed || metrics.gaveUp) return metrics;
  return { ...metrics, completed: true, endedAt: now };
}

export function giveUp(metrics: FlowMetrics, now: number = Date.now()): FlowMetrics {
  if (metrics.completed || metrics.gaveUp) return metrics;
  return { ...metrics, gaveUp: true, endedAt: now };
}

/** Milliseconds from start to end, or null if the flow hasn't finished (or never started). */
export function elapsedMs(metrics: FlowMetrics): number | null {
  if (metrics.startedAt === null || metrics.endedAt === null) return null;
  return metrics.endedAt - metrics.startedAt;
}

// --- Aggregate helpers used by the /results dashboard ---

export function median(values: number[]): number {
  if (values.length === 0) return NaN;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function mean(values: number[]): number {
  if (values.length === 0) return NaN;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** [min, max] — a simple, label-friendly measure of spread for a small sample. */
export function spread(values: number[]): [number, number] {
  if (values.length === 0) return [NaN, NaN];
  return [Math.min(...values), Math.max(...values)];
}
