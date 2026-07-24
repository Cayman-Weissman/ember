export type IngredientId =
  | "sparkling-water"
  | "citric-acid"
  | "malic-acid"
  | "aspartame"
  | "flavoring"
  | "caffeine";

export interface IngredientInfo {
  id: IngredientId;
  name: string;
  short: string;
  detail: string;
}

export const INGREDIENTS: Record<IngredientId, IngredientInfo> = {
  "sparkling-water": {
    id: "sparkling-water",
    name: "Sparkling water",
    short: "The base of every can.",
    detail:
      "Carbonated water. That's the bubble. No calories, no sugar, no caffeine — just water with fizz.",
  },
  "citric-acid": {
    id: "citric-acid",
    name: "Citric acid",
    short: "Bright, tart snap.",
    detail:
      "The same acid you get from citrus fruit. Adds sharpness and keeps the flavor clean and refreshing.",
  },
  "malic-acid": {
    id: "malic-acid",
    name: "Malic acid",
    short: "The sour that sticks around.",
    detail:
      "Naturally found in apples and other fruit. Gives a longer, juicier sour note — especially in our sour flavors.",
  },
  aspartame: {
    id: "aspartame",
    name: "Aspartame",
    short: "Zero-sugar sweet. Not a mystery chemical.",
    detail:
      "Aspartame breaks down in your digestive system into aspartic acid, phenylalanine, and methanol — the same building blocks already found in everyday food like meat, dairy, fruit, and tomato juice. It does not travel intact into the lower gut. It has zero calories, so it does not spike blood sugar or A1C. It also will not magically make you lose weight — it just isn't sugar. Phenylketonurics: contains phenylalanine.",
  },
  flavoring: {
    id: "flavoring",
    name: "Flavoring",
    short: "What makes it taste like the flavor on the can.",
    detail:
      "Natural and/or artificial flavors that create each Ember taste — cherry, peach, cola, and the rest — without adding sugar.",
  },
  caffeine: {
    id: "caffeine",
    name: "Caffeine",
    short: "80mg — only in labeled flavors.",
    detail:
      "Only in our caffeinated flavors (Cola Spark and Citrus Charge). Clearly marked. Every other Ember flavor has none.",
  },
};

/** Base recipe for every Ember can. */
export const BASE_INGREDIENTS: IngredientId[] = [
  "sparkling-water",
  "citric-acid",
  "malic-acid",
  "aspartame",
  "flavoring",
];

export function ingredientsFor(caffeineMg: number): IngredientInfo[] {
  const ids: IngredientId[] =
    caffeineMg > 0 ? [...BASE_INGREDIENTS, "caffeine"] : BASE_INGREDIENTS;
  return ids.map((id) => INGREDIENTS[id]);
}
