import { describe, expect, it } from "vitest";
import { summarizeSurvey } from "./surveyCsv";

const header =
  'Timestamp,"How often do you order groceries or everyday essentials through a quick-commerce app (Instamart, Blinkit, Zepto, etc.)?","How frustrating do you find reordering the same items you buy regularly, on a scale of 1 to 5?","What\'s the most annoying part of reordering for you, if anything?"';

function row(ts: string, freq: string, frustration: string, annoying: string) {
  return `${ts},${freq},${frustration},"${annoying}"`;
}

describe("summarizeSurvey", () => {
  it("counts single-choice answers in configured option order and buckets unrecognized ones as Other", () => {
    const csv = [
      header,
      row("2026-01-01", "Daily", "4", "Searching every time"),
      row("2026-01-02", "Daily", "5", "Finding the substitute"),
      row("2026-01-03", "Rarely or never", "2", ""),
      row("2026-01-04", "Every single day somehow", "3", ""), // unrecognized value
    ].join("\n");

    const summary = summarizeSurvey(csv);
    const freqField = summary.fields.find((f) => f.key === "orderFrequency")!;

    expect(summary.totalResponses).toBe(4);
    expect(freqField.total).toBe(4);
    expect(freqField.counts.find((c) => c.label === "Daily")?.count).toBe(2);
    expect(freqField.counts.find((c) => c.label === "Rarely or never")?.count).toBe(1);
    expect(freqField.counts.find((c) => c.label === "Other / unrecognized")?.count).toBe(1);
  });

  it("computes the mean for likert fields from numeric responses only", () => {
    const csv = [
      header,
      row("1", "Daily", "4", ""),
      row("2", "Daily", "5", ""),
      row("3", "Daily", "2", ""),
    ].join("\n");

    const summary = summarizeSurvey(csv);
    const frustration = summary.fields.find((f) => f.key === "frustrationRating")!;
    expect(frustration.mean).toBeCloseTo((4 + 5 + 2) / 3);
  });

  it("treats text fields as open responses: no counts, just a sample and a total", () => {
    const csv = [
      header,
      row("1", "Daily", "4", "Hunting for substitutes"),
      row("2", "Daily", "5", "Too many taps"),
      row("3", "Daily", "2", ""), // blank/optional — excluded from total
    ].join("\n");

    const summary = summarizeSurvey(csv);
    const annoying = summary.fields.find((f) => f.key === "mostAnnoyingPart")!;
    expect(annoying.type).toBe("text");
    expect(annoying.total).toBe(2);
    expect(annoying.counts).toEqual([]);
    expect(annoying.sampleResponses).toContain("Too many taps");
  });

  it("flags configured questions whose header text isn't present in the uploaded CSV", () => {
    const csv = "Timestamp,Some unrelated column\n1,x";
    const summary = summarizeSurvey(csv);
    expect(summary.missingHeaders.length).toBeGreaterThan(0);
    expect(summary.missingHeaders).toContain(
      "How often do you order groceries or everyday essentials through a quick-commerce app (Instamart, Blinkit, Zepto, etc.)?"
    );
  });
});
