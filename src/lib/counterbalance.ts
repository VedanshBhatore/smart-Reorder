export type FlowId = "A" | "B";

/**
 * Pulls a participant number out of a free-text ID like "P07" or "07" or "participant-7".
 * Falls back to `fallbackIndex` (1-indexed enrollment order) when the ID has no digits,
 * so counterbalancing still works for IDs like "amit" or "priya-mumbai".
 */
export function extractParticipantNumber(participantId: string, fallbackIndex: number): number {
  const digits = participantId.match(/\d+/);
  if (digits) {
    const n = parseInt(digits[0], 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return fallbackIndex;
}

/**
 * Odd participant numbers run A then B; even participants run B then A.
 */
export function getFlowOrder(participantNumber: number): [FlowId, FlowId] {
  if (!Number.isInteger(participantNumber) || participantNumber < 1) {
    throw new Error("participantNumber must be a positive integer");
  }
  return participantNumber % 2 === 1 ? ["A", "B"] : ["B", "A"];
}
