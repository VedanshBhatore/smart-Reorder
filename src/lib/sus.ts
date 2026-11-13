// Standard 10-item System Usability Scale (Brooke, 1986).
// Odd-numbered items are positively worded, even-numbered items negatively worded.

export const SUS_ITEMS: string[] = [
  "I think that I would like to use this app frequently.",
  "I found this app unnecessarily complex.",
  "I thought this app was easy to use.",
  "I think that I would need the support of a technical person to be able to use this app.",
  "I found the various functions in this app were well integrated.",
  "I thought there was too much inconsistency in this app.",
  "I would imagine that most people would learn to use this app very quickly.",
  "I found this app very cumbersome/awkward to use.",
  "I felt very confident using this app.",
  "I needed to learn a lot of things before I could get going with this app.",
];

export type SusAnswers = number[]; // 10 values, each 1–5

export function isValidSusAnswers(answers: SusAnswers): boolean {
  return (
    answers.length === SUS_ITEMS.length &&
    answers.every((a) => Number.isInteger(a) && a >= 1 && a <= 5)
  );
}

/**
 * Computes the SUS score (0–100) from 10 Likert answers (1–5).
 * Odd items (1-indexed: 1,3,5,7,9) contribute (score - 1).
 * Even items (1-indexed: 2,4,6,8,10) contribute (5 - score).
 * The sum of contributions (0–40) is multiplied by 2.5 to land on a 0–100 scale.
 */
export function computeSUS(answers: SusAnswers): number {
  if (!isValidSusAnswers(answers)) {
    throw new Error(`computeSUS expects ${SUS_ITEMS.length} integer answers in 1..5`);
  }
  const total = answers.reduce((sum, score, index) => {
    const position = index + 1; // 1-indexed item number
    const contribution = position % 2 === 1 ? score - 1 : 5 - score;
    return sum + contribution;
  }, 0);
  return total * 2.5;
}
