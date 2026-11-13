// Shared product catalogue used by both prototype flows.
// Fictional "Basket" app — generic product descriptors only, no real brand names,
// so the catalogue carries no third-party trademarks.

export type Category =
  | "Dairy & Eggs"
  | "Bakery"
  | "Fruits & Vegetables"
  | "Staples"
  | "Snacks"
  | "Beverages"
  | "Personal Care";

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number; // INR
  category: Category;
  inStock: boolean;
  /** If out of stock, the id of the suggested swap product. */
  swapId?: string;
  emoji: string; // stand-in for product photography, keeps the UI neutral
}

export const catalogue: Product[] = [
  { id: "p01", name: "Toned Milk", unit: "500 ml pouch", price: 29, category: "Dairy & Eggs", inStock: true, emoji: "🥛" },
  { id: "p02", name: "Full Cream Milk", unit: "500 ml pouch", price: 33, category: "Dairy & Eggs", inStock: true, emoji: "🥛" },
  { id: "p03", name: "Curd", unit: "400 g cup", price: 42, category: "Dairy & Eggs", inStock: true, emoji: "🥣" },
  { id: "p04", name: "Paneer", unit: "200 g pack", price: 89, category: "Dairy & Eggs", inStock: true, emoji: "🧈" },
  { id: "p05", name: "Butter", unit: "100 g pack", price: 56, category: "Dairy & Eggs", inStock: false, swapId: "p06", emoji: "🧈" },
  { id: "p06", name: "Table Butter (low salt)", unit: "100 g pack", price: 58, category: "Dairy & Eggs", inStock: true, emoji: "🧈" },
  { id: "p07", name: "Brown Eggs", unit: "pack of 6", price: 48, category: "Dairy & Eggs", inStock: true, emoji: "🥚" },
  { id: "p08", name: "White Eggs", unit: "pack of 12", price: 84, category: "Dairy & Eggs", inStock: true, emoji: "🥚" },
  { id: "p09", name: "White Bread", unit: "400 g loaf", price: 45, category: "Bakery", inStock: false, swapId: "p10", emoji: "🍞" },
  { id: "p10", name: "Multigrain Bread", unit: "400 g loaf", price: 55, category: "Bakery", inStock: true, emoji: "🍞" },
  { id: "p11", name: "Brown Bread", unit: "400 g loaf", price: 50, category: "Bakery", inStock: true, emoji: "🍞" },
  { id: "p12", name: "Pav", unit: "pack of 6", price: 30, category: "Bakery", inStock: true, emoji: "🥖" },
  { id: "p13", name: "Onion", unit: "1 kg", price: 38, category: "Fruits & Vegetables", inStock: true, emoji: "🧅" },
  { id: "p14", name: "Tomato", unit: "1 kg", price: 32, category: "Fruits & Vegetables", inStock: true, emoji: "🍅" },
  { id: "p15", name: "Potato", unit: "1 kg", price: 28, category: "Fruits & Vegetables", inStock: true, emoji: "🥔" },
  { id: "p16", name: "Coriander Leaves", unit: "1 bunch", price: 12, category: "Fruits & Vegetables", inStock: true, emoji: "🌿" },
  { id: "p17", name: "Banana", unit: "6 pcs", price: 36, category: "Fruits & Vegetables", inStock: true, emoji: "🍌" },
  { id: "p18", name: "Apple", unit: "4 pcs", price: 120, category: "Fruits & Vegetables", inStock: true, emoji: "🍎" },
  { id: "p19", name: "Cucumber", unit: "500 g", price: 22, category: "Fruits & Vegetables", inStock: true, emoji: "🥒" },
  { id: "p20", name: "Toor Dal", unit: "1 kg pack", price: 165, category: "Staples", inStock: true, emoji: "🫘" },
  { id: "p21", name: "Basmati Rice", unit: "1 kg pack", price: 110, category: "Staples", inStock: true, emoji: "🍚" },
  { id: "p22", name: "Wheat Flour (Atta)", unit: "1 kg pack", price: 58, category: "Staples", inStock: true, emoji: "🌾" },
  { id: "p23", name: "Refined Sunflower Oil", unit: "1 L pouch", price: 148, category: "Staples", inStock: true, emoji: "🛢️" },
  { id: "p24", name: "Sugar", unit: "1 kg pack", price: 52, category: "Staples", inStock: true, emoji: "🧂" },
  { id: "p25", name: "Salt", unit: "1 kg pack", price: 22, category: "Staples", inStock: true, emoji: "🧂" },
  { id: "p26", name: "Potato Chips", unit: "52 g pack", price: 20, category: "Snacks", inStock: true, emoji: "🍟" },
  { id: "p27", name: "Digestive Biscuits", unit: "250 g pack", price: 55, category: "Snacks", inStock: true, emoji: "🍪" },
  { id: "p28", name: "Masala Instant Noodles", unit: "pack of 4", price: 56, category: "Snacks", inStock: true, emoji: "🍜" },
  { id: "p29", name: "Filter Coffee Powder", unit: "200 g pack", price: 135, category: "Beverages", inStock: true, emoji: "☕" },
  { id: "p30", name: "Tea Bags", unit: "box of 25", price: 98, category: "Beverages", inStock: true, emoji: "🍵" },
  { id: "p31", name: "Toothpaste", unit: "150 g tube", price: 95, category: "Personal Care", inStock: true, emoji: "🪥" },
  { id: "p32", name: "Bathing Soap", unit: "pack of 3", price: 90, category: "Personal Care", inStock: true, emoji: "🧼" },
];

export const categories: Category[] = [
  "Dairy & Eggs",
  "Bakery",
  "Fruits & Vegetables",
  "Staples",
  "Snacks",
  "Beverages",
  "Personal Care",
];

export function getProduct(id: string): Product | undefined {
  return catalogue.find((p) => p.id === id);
}

/**
 * The repeat-purchase "usual basket" behind the Smart Reorder hypothesis:
 * milk, bread, eggs, vegetables plus a few staples the same household rebuys often.
 * One item (Butter, p05) is deliberately out of stock to exercise the swap-suggestion UI.
 */
export const usualBasketIds: { id: string; qty: number }[] = [
  { id: "p01", qty: 2 }, // Toned Milk
  { id: "p10", qty: 1 }, // Multigrain Bread
  { id: "p07", qty: 1 }, // Brown Eggs
  { id: "p13", qty: 1 }, // Onion
  { id: "p14", qty: 1 }, // Tomato
  { id: "p15", qty: 1 }, // Potato
  { id: "p05", qty: 1 }, // Butter — out of stock, triggers swap suggestion
  { id: "p03", qty: 1 }, // Curd
  { id: "p22", qty: 1 }, // Wheat Flour
];

/** Past orders shown in Flow A's order history, newest first. */
export interface PastOrder {
  id: string;
  placedAt: string; // ISO date
  items: { productId: string; qty: number }[];
}

export const pastOrders: PastOrder[] = [
  {
    id: "ORD-2041",
    placedAt: "2026-11-06",
    items: [
      { productId: "p01", qty: 2 },
      { productId: "p10", qty: 1 },
      { productId: "p07", qty: 1 },
      { productId: "p13", qty: 1 },
      { productId: "p14", qty: 1 },
      { productId: "p15", qty: 1 },
      { productId: "p05", qty: 1 },
      { productId: "p03", qty: 1 },
      { productId: "p22", qty: 1 },
    ],
  },
  {
    id: "ORD-2028",
    placedAt: "2026-10-30",
    items: [
      { productId: "p01", qty: 2 },
      { productId: "p11", qty: 1 },
      { productId: "p08", qty: 1 },
      { productId: "p26", qty: 2 },
      { productId: "p29", qty: 1 },
    ],
  },
  {
    id: "ORD-2015",
    placedAt: "2026-10-21",
    items: [
      { productId: "p21", qty: 1 },
      { productId: "p20", qty: 1 },
      { productId: "p23", qty: 1 },
      { productId: "p24", qty: 1 },
      { productId: "p25", qty: 1 },
    ],
  },
];
