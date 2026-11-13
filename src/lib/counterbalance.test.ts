import { describe, expect, it } from "vitest";
import { extractParticipantNumber, getFlowOrder } from "./counterbalance";

describe("getFlowOrder", () => {
  it("assigns A-then-B to odd participant numbers", () => {
    expect(getFlowOrder(1)).toEqual(["A", "B"]);
    expect(getFlowOrder(3)).toEqual(["A", "B"]);
    expect(getFlowOrder(7)).toEqual(["A", "B"]);
  });

  it("assigns B-then-A to even participant numbers", () => {
    expect(getFlowOrder(2)).toEqual(["B", "A"]);
    expect(getFlowOrder(4)).toEqual(["B", "A"]);
    expect(getFlowOrder(8)).toEqual(["B", "A"]);
  });

  it("rejects zero, negative and non-integer input", () => {
    expect(() => getFlowOrder(0)).toThrow();
    expect(() => getFlowOrder(-1)).toThrow();
    expect(() => getFlowOrder(1.5)).toThrow();
  });

  it("produces a balanced split across a run of consecutive participants", () => {
    const orders = Array.from({ length: 10 }, (_, i) => getFlowOrder(i + 1));
    const abCount = orders.filter(([first]) => first === "A").length;
    const baCount = orders.filter(([first]) => first === "B").length;
    expect(abCount).toBe(5);
    expect(baCount).toBe(5);
  });
});

describe("extractParticipantNumber", () => {
  it("reads digits out of a typical participant id", () => {
    expect(extractParticipantNumber("P07", 99)).toBe(7);
    expect(extractParticipantNumber("participant-12", 99)).toBe(12);
    expect(extractParticipantNumber("07", 99)).toBe(7);
  });

  it("falls back to the enrollment index when the id has no digits", () => {
    expect(extractParticipantNumber("priya", 3)).toBe(3);
    expect(extractParticipantNumber("", 5)).toBe(5);
  });
});
