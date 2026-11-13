export type TabB = "home" | "account" | "cart" | "categories";

export type Overlay = "reviewBasket" | "checkout" | "placed" | null;

export interface BasketLine {
  productId: string;
  qty: number;
  selected: boolean;
  /** Set once the participant accepts the suggested substitute for an out-of-stock item. */
  swappedTo?: string;
}
