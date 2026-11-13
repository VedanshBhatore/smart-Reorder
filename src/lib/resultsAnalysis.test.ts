import { describe, expect, it } from "vitest";
import { summarizeFlow, summarizePreference } from "./resultsAnalysis";
import { createTestSession } from "./session";
import type { TestSession } from "./session";

function withFlowA(session: TestSession, overrides: Partial<TestSession["results"]["A"]>): TestSession {
  return { ...session, results: { ...session.results, A: { ...session.results.A, ...overrides } } };
}

describe("summarizeFlow", () => {
  it("computes median/spread time and taps only from completed, started runs", () => {
    let s1 = createTestSession("P01", 1, ["A", "B"]);
    s1 = withFlowA(s1, { startedAt: 0, endedAt: 10_000, taps: 12, completed: true });
    let s2 = createTestSession("P02", 2, ["B", "A"]);
    s2 = withFlowA(s2, { startedAt: 0, endedAt: 20_000, taps: 20, completed: true });
    let s3 = createTestSession("P03", 3, ["A", "B"]);
    s3 = withFlowA(s3, { startedAt: 0, gaveUp: true, endedAt: 5000 }); // not completed, excluded from times

    const summary = summarizeFlow([s1, s2, s3], "A");
    expect(summary.n).toBe(3); // all three started flow A
    expect(summary.timesMs).toEqual([10_000, 20_000]);
    expect(summary.medianTimeMs).toBe(15_000);
    expect(summary.spreadTimeMs).toEqual([10_000, 20_000]);
    expect(summary.medianTaps).toBe(12); // median of [12, 20, 0]
    expect(summary.completionRate).toBeCloseTo(2 / 3);
  });

  it("ignores sessions that never started this flow", () => {
    const untouched = createTestSession("P04", 4, ["A", "B"]); // flow B never started
    const summary = summarizeFlow([untouched], "B");
    expect(summary.n).toBe(0);
    expect(summary.completionRate).toBeNaN();
  });

  it("averages only the SUS scores that were actually submitted", () => {
    let s1 = createTestSession("P05", 5, ["A", "B"]);
    s1 = withFlowA(s1, { startedAt: 0, endedAt: 1000, completed: true, susScore: 80 });
    let s2 = createTestSession("P06", 6, ["B", "A"]);
    s2 = withFlowA(s2, { startedAt: 0, endedAt: 1000, completed: true, susScore: 60 });
    const summary = summarizeFlow([s1, s2], "A");
    expect(summary.meanSus).toBe(70);
  });
});

describe("summarizePreference", () => {
  it("splits preference choices and ignores sessions without one", () => {
    const a = { ...createTestSession("P1", 1, ["A", "B"]), preference: { choice: "A" as const, reason: "" } };
    const b = { ...createTestSession("P2", 2, ["B", "A"]), preference: { choice: "B" as const, reason: "" } };
    const none = { ...createTestSession("P3", 3, ["A", "B"]), preference: { choice: "no-preference" as const, reason: "" } };
    const incomplete = createTestSession("P4", 4, ["A", "B"]); // no preference submitted

    const split = summarizePreference([a, b, none, incomplete]);
    expect(split).toEqual({ A: 1, B: 1, noPreference: 1, total: 3 });
  });
});
