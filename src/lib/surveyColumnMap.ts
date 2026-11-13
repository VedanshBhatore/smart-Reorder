// Maps Google Forms CSV export column headers (the exact question text) to the
// internal field keys the Research section's charts are written against.
// If you reword a question in the live Google Form, update only the
// `csvHeader` string below to match — nothing else needs to change.

export type SurveyFieldType = "single" | "likert" | "text";

export interface SurveyFieldConfig {
  key: string;
  csvHeader: string;
  shortLabel: string; // used as the chart title
  type: SurveyFieldType;
  /** Display order for chart categories. Omit for free text fields. */
  options?: string[];
}

export const surveyColumnMap: SurveyFieldConfig[] = [
  {
    key: "orderFrequency",
    csvHeader:
      "How often do you order groceries or everyday essentials through a quick-commerce app (Instamart, Blinkit, Zepto, etc.)?",
    shortLabel: "Ordering frequency",
    type: "single",
    options: ["Daily", "A few times a week", "About once a week", "A few times a month", "Rarely or never"],
  },
  {
    key: "repeatItemsFrequency",
    csvHeader:
      "When you do order, how often is it mostly the same items as your last few orders (e.g. milk, bread, eggs, vegetables)?",
    shortLabel: "How often it's the same basket",
    type: "single",
    options: [
      "Always the same items",
      "Mostly the same, with a few new things",
      "An even mix of repeat and new items",
      "Mostly new items",
      "Always different items",
    ],
  },
  {
    key: "currentReorderMethod",
    csvHeader: "Think about the last time you reordered something you buy regularly. How did you actually do it?",
    shortLabel: "How people reorder today",
    type: "single",
    options: [
      "Searched for each item again from scratch",
      "Reopened a past order and added items from it",
      "Used a \"reorder\" / \"buy again\" button",
      "Added items from memory to a new cart",
      "Something else",
    ],
  },
  {
    key: "tapsFeltLike",
    csvHeader: "Roughly how many taps or screens did that reordering take, from opening the app to checkout?",
    shortLabel: "Taps it felt like it took",
    type: "single",
    options: ["1–3", "4–6", "7–10", "More than 10", "Not sure / don't remember"],
  },
  {
    key: "frustrationRating",
    csvHeader:
      "How frustrating do you find reordering the same items you buy regularly, on a scale of 1 to 5?",
    shortLabel: "Reordering frustration (1–5)",
    type: "likert",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "mostAnnoyingPart",
    csvHeader: "What's the most annoying part of reordering for you, if anything?",
    shortLabel: "Most annoying part (open text)",
    type: "text",
  },
  {
    key: "oneTapLikelihood",
    csvHeader:
      "Imagine the app showed a \"Your usual basket\" card, pre-filled from your past orders, that you could review and check out in one tap. How likely would you be to use it?",
    shortLabel: "Likelihood of using one-tap reorder (1–5)",
    type: "likert",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "wantsControlBeforeCheckout",
    csvHeader:
      "Even with a pre-filled basket like that, would you still want the ability to change quantities or swap out items before checking out?",
    shortLabel: "Still wants control before checkout",
    type: "single",
    options: ["Yes", "No", "Not sure"],
  },
  {
    key: "substituteOrMissingFrequency",
    csvHeader:
      "Has a quick-commerce order of yours ever arrived with a substitute item or something missing, for something you buy regularly?",
    shortLabel: "Substituted or missing items",
    type: "single",
    options: ["Yes, often", "Yes, occasionally", "Rarely", "Never"],
  },
  {
    key: "appsUsed",
    csvHeader: "Which quick-commerce or instant-delivery apps do you use regularly?",
    shortLabel: "Apps used (open text)",
    type: "text",
  },
  {
    key: "ageBand",
    csvHeader: "Which age band are you in?",
    shortLabel: "Age band",
    type: "single",
    options: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55 or older"],
  },
  {
    key: "cityTier",
    csvHeader: "Which best describes where you live?",
    shortLabel: "City tier",
    type: "single",
    options: [
      "Tier 1 metro (e.g. Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune)",
      "Tier 2 city",
      "Tier 3 city or smaller town",
      "Outside India",
    ],
  },
];
