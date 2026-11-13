import { describe, expect, it } from "vitest";
import sampleSurveyCsv from "./sampleSurvey.csv?raw";
import { summarizeSurvey } from "../lib/surveyCsv";

describe("bundled sampleSurvey.csv", () => {
  it("matches every configured column header — no missing/renamed questions", () => {
    const summary = summarizeSurvey(sampleSurveyCsv);
    expect(summary.missingHeaders).toEqual([]);
    expect(summary.totalResponses).toBeGreaterThanOrEqual(30);
  });

  it("produces a non-empty distribution for every single/likert field", () => {
    const summary = summarizeSurvey(sampleSurveyCsv);
    for (const field of summary.fields) {
      if (field.type === "text") continue;
      const sum = field.counts.reduce((a, c) => a + c.count, 0);
      expect(sum).toBe(field.total);
      expect(field.total).toBeGreaterThan(0);
    }
  });
});
