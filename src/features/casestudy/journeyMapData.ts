export type FrictionLevel = "low" | "medium" | "high";

export interface JourneyStep {
  step: string;
  detail: string;
  friction: FrictionLevel;
  frictionNote: string;
}

export const currentJourney: JourneyStep[] = [
  {
    step: "Open app",
    detail: "Lands on the home feed — banners, categories, nothing about last week's order.",
    friction: "low",
    frictionNote: "Fine as a discovery surface, but offers no path back to a past order.",
  },
  {
    step: "Go to Account",
    detail: "Taps the bottom-nav Account tab, away from the shopping context entirely.",
    friction: "medium",
    frictionNote: "\"Reorder\" isn't a shopping action in this app's mental model — it's buried in account management.",
  },
  {
    step: "Open Your Orders",
    detail: "Scans a list of past orders by date, not by what's in them.",
    friction: "medium",
    frictionNote: "Has to remember roughly when they last bought the basket, not what was in it.",
  },
  {
    step: "Open one past order",
    detail: "Opens the order detail screen to see the item list.",
    friction: "low",
    frictionNote: "Straightforward once the right order is found.",
  },
  {
    step: "Add items one by one",
    detail: "Taps \"Add\" on each item individually — N items, N taps, minimum.",
    friction: "high",
    frictionNote: "The core cost of this flow: every repeat item costs a dedicated tap, every time.",
  },
  {
    step: "Hit an out-of-stock item",
    detail: "One item (e.g. butter) can't be added — no substitute is offered inline.",
    friction: "high",
    frictionNote: "Has to leave the order entirely, search from scratch, and remember what they were replacing.",
  },
  {
    step: "Check the cart",
    detail: "Switches to the Cart tab to confirm everything landed correctly.",
    friction: "low",
    frictionNote: "A reasonable trust-but-verify step, though it only exists because adding was piecemeal.",
  },
  {
    step: "Checkout",
    detail: "Confirms address, slot and payment, places the order.",
    friction: "low",
    frictionNote: "Same checkout either way — this step isn't where the redesign focuses.",
  },
];

export const frictionStyles: Record<FrictionLevel, { badge: string; bar: string }> = {
  low: { badge: "bg-basket-100 text-basket-700", bar: "bg-basket-400" },
  medium: { badge: "bg-accent-500/15 text-accent-600", bar: "bg-accent-400" },
  high: { badge: "bg-red-100 text-red-700", bar: "bg-red-400" },
};
