import { describe, expect, it } from "vitest";
import {
  completeFlow,
  createFlowMetrics,
  elapsedMs,
  giveUp,
  mean,
  median,
  recordTap,
  spread,
  startTiming,
} from "./metrics";

describe("FlowMetrics lifecycle", () => {
  it("starts with zeroed, unstarted state", () => {
    const m = createFlowMetrics();
    expect(m).toEqual({
      startedAt: null,
      endedAt: null,
      taps: 0,
      mistaps: 0,
      completed: false,
      gaveUp: false,
    });
  });

  it("counts expected taps and mistaps separately, mistaps also bump total taps", () => {
    let m = createFlowMetrics();
    m = recordTap(m, "expected");
    m = recordTap(m, "mistap");
    m = recordTap(m, "expected");
    expect(m.taps).toBe(3);
    expect(m.mistaps).toBe(1);
  });

  it("computes elapsed time from start to completion", () => {
    let m = createFlowMetrics();
    m = startTiming(m, 1_000);
    m = completeFlow(m, 4_500);
    expect(elapsedMs(m)).toBe(3_500);
    expect(m.completed).toBe(true);
  });

  it("is null elapsed until both started and ended", () => {
    const notStarted = createFlowMetrics();
    expect(elapsedMs(notStarted)).toBeNull();

    const startedOnly = startTiming(createFlowMetrics(), 1000);
    expect(elapsedMs(startedOnly)).toBeNull();
  });

  it("does not record taps after completion or give-up", () => {
    let m = createFlowMetrics();
    m = completeFlow(m, 1000);
    const afterTap = recordTap(m, "expected");
    expect(afterTap.taps).toBe(0);

    let g = createFlowMetrics();
    g = giveUp(g, 1000);
    expect(recordTap(g, "expected").taps).toBe(0);
  });

  it("gaveUp and completed are mutually exclusive terminal states", () => {
    let m = createFlowMetrics();
    m = completeFlow(m, 1000);
    const afterGiveUp = giveUp(m, 2000);
    // already completed, giveUp should be a no-op
    expect(afterGiveUp.gaveUp).toBe(false);
    expect(afterGiveUp.completed).toBe(true);
  });

  it("startTiming is idempotent (first call wins)", () => {
    let m = createFlowMetrics();
    m = startTiming(m, 1000);
    m = startTiming(m, 9999);
    expect(m.startedAt).toBe(1000);
  });
});

describe("aggregate helpers", () => {
  it("median handles even and odd length arrays", () => {
    expect(median([1, 2, 3])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("mean averages correctly", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });

  it("spread returns [min, max]", () => {
    expect(spread([5, 1, 3, 9])).toEqual([1, 9]);
  });

  it("returns NaN-flavored results for empty input rather than throwing", () => {
    expect(median([])).toBeNaN();
    expect(mean([])).toBeNaN();
    expect(spread([])).toEqual([NaN, NaN]);
  });
});
