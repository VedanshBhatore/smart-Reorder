export type TabA = "home" | "account" | "cart" | "categories";

export type AccountScreen =
  | { name: "account" }
  | { name: "orders" }
  | { name: "orderDetail"; orderId: string }
  | { name: "search"; orderId: string };

export type Overlay = "checkout" | "placed" | null;
