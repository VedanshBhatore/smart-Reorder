import { describe, expect, it } from "vitest";
import { computeSUS, isValidSusAnswers, SUS_ITEMS } from "./sus";

describe("computeSUS", () => {
  it("scores all-3s as exactly 50 (the midpoint)", () => {
    const answers = Array(10).fill(3);
    expect(computeSUS(answers)).toBe(50);
  });

  it("scores the best possible answers (odd=5, even=1) as 100", () => {
    const answers = SUS_ITEMS.map((_, i) => (i % 2 === 0 ? 5 : 1));
    expect(computeSUS(answers)).toBe(100);
  });

  it("scores the worst possible answers (odd=1, even=5) as 0", () => {
    const answers = SUS_ITEMS.map((_, i) => (i % 2 === 0 ? 1 : 5));
    expect(computeSUS(answers)).toBe(0);
  });

  it("matches a hand-worked mixed example", () => {
    // Item:        1  2  3  4  5  6  7  8  9  10
    const answers = [4, 2, 5, 2, 4, 1, 4, 2, 5, 2];
    // odd contributions (score-1): 3,4,3,3,4 = 17
    // even contributions (5-score): 3,3,4,3,3 = 16
    // total = 33 -> *2.5 = 82.5
    expect(computeSUS(answers)).toBeCloseTo(82.5);
  });

  it("rejects answers that are the wrong length or out of range", () => {
    expect(isValidSusAnswers([3, 3, 3])).toBe(false);
    expect(isValidSusAnswers(Array(10).fill(0))).toBe(false);
    expect(isValidSusAnswers(Array(10).fill(6))).toBe(false);
    expect(isValidSusAnswers(Array(10).fill(3))).toBe(true);
  });

  it("throws on invalid input rather than returning a bogus score", () => {
    expect(() => computeSUS([1, 2, 3])).toThrow();
  });
});
