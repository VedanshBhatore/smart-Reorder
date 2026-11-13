// Categorical chart colors for comparing Flow A vs Flow B.
// Slots 1 (blue) and 2 (green) from the validated 8-hue categorical order —
// this is the strongest adjacent pair in that palette (CVD ΔE 9.1 light,
// normal-vision ΔE 19.6 light), kept deliberately separate from the app's
// basket-green brand color so chart identity never gets confused with UI chrome.
export const flowColor = {
  A: "#2a78d6", // blue
  B: "#008300", // green
} as const;

export const noPreferenceColor = "#898781"; // muted ink — "no preference" carries no identity

export const chartInk = {
  primary: "#16181d",
  secondary: "#3a3f47",
  muted: "#6b7280",
  grid: "#e1e0d9",
};
