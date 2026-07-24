export type PackId = "single" | "four" | "twelve";
export type Category = "sour" | "sweet" | "caffeinated";

export interface Pack {
  id: PackId;
  label: string;
  short: string;
  count: number;
  price: number;
  note?: string;
}

export const PACKS: Record<PackId, Pack> = {
  single: { id: "single", label: "Single can", short: "1 can", count: 1, price: 1.79 },
  four: {
    id: "four",
    label: "4-pack",
    short: "4 cans",
    count: 4,
    price: 6.49,
    note: "Better deal",
  },
  twelve: {
    id: "twelve",
    label: "12-pack",
    short: "12 cans",
    count: 12,
    price: 17.99,
    note: "Best deal",
  },
};

export interface Product {
  id: string;
  slug: string;
  name: string;
  flavor: string;
  category: Category;
  tagline: string;
  description: string[];
  taste: string[];
  caffeineMg: number;
  accent: string;
  accent2: string;
  packs: PackId[];
  blurb: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "sour-cherry",
    slug: "sour-cherry",
    name: "Sour Cherry",
    flavor: "Sour",
    category: "sour",
    tagline: "Dark cherry. Sour kick. No sugar.",
    blurb: "Sour cherry soda. Caffeine-free.",
    description: [
      "This is sour cherry soda. Dark cherry flavor with a sharp sour finish.",
      "No sugar. No caffeine. No weird aftertaste. Just a cold drink that hits hard and stays clean.",
      "If you like sour, start here.",
    ],
    taste: ["Dark cherry", "Sour", "Clean finish"],
    caffeineMg: 0,
    accent: "#e8a09a",
    accent2: "#d97a6e",
    packs: ["single", "four", "twelve"],
  },
  {
    id: "green-apple",
    slug: "green-apple",
    name: "Green Apple",
    flavor: "Sour",
    category: "sour",
    tagline: "Crisp green apple. Really sour.",
    blurb: "Green apple. Sour. Caffeine-free.",
    description: [
      "Tastes like biting into a green apple — bright, crisp, and properly sour.",
      "Zero sugar. Zero caffeine. Made for people who want sour without the sugar dump.",
      "Cold. Sharp. Done.",
    ],
    taste: ["Green apple", "Sour", "Crisp"],
    caffeineMg: 0,
    accent: "#b8c98a",
    accent2: "#8fa86a",
    packs: ["single", "four", "twelve"],
  },
  {
    id: "blood-orange",
    slug: "blood-orange",
    name: "Blood Orange",
    flavor: "Sour",
    category: "sour",
    tagline: "Blood orange with a sour edge.",
    blurb: "Citrus. Soft sour. Caffeine-free.",
    description: [
      "Blood orange soda with a light sour twist. Deep citrus, not syrupy.",
      "Zero sugar. Zero caffeine. Easy to drink and easy to want another.",
      "Good everyday flavor if sour-but-not-mean is your thing.",
    ],
    taste: ["Blood orange", "Soft sour", "Citrus"],
    caffeineMg: 0,
    accent: "#e8a078",
    accent2: "#d4784a",
    packs: ["single", "four", "twelve"],
  },
  {
    id: "vanilla-cream",
    slug: "vanilla-cream",
    name: "Vanilla Cream",
    flavor: "Sweet",
    category: "sweet",
    tagline: "Cream soda vibe. Zero sugar.",
    blurb: "Vanilla cream. Sweet. Caffeine-free.",
    description: [
      "Soft vanilla cream soda. Smooth, sweet, and cozy — without the sugar crash.",
      "Zero sugar. Zero caffeine. Tastes like a treat because it is one.",
      "The one you grab at night when everything else has caffeine.",
    ],
    taste: ["Vanilla", "Creamy", "Sweet"],
    caffeineMg: 0,
    accent: "#e8d4a0",
    accent2: "#d4b86a",
    packs: ["single", "four", "twelve"],
  },
  {
    id: "wild-berry",
    slug: "wild-berry",
    name: "Wild Berry",
    flavor: "Sweet",
    category: "sweet",
    tagline: "Mixed berry. Sweet and jammy.",
    blurb: "Berry soda. Sweet. Caffeine-free.",
    description: [
      "Mixed berry soda — sweet, a little jammy, with a touch of tart so it doesn't get boring.",
      "Zero sugar. Zero caffeine. Straightforward and fun.",
      "If you want sweet without sugar, this is an easy yes.",
    ],
    taste: ["Mixed berry", "Jammy", "Sweet"],
    caffeineMg: 0,
    accent: "#c4a8c8",
    accent2: "#a888b0",
    packs: ["single", "four", "twelve"],
  },
  {
    id: "peach",
    slug: "peach",
    name: "Peach",
    flavor: "Sweet",
    category: "sweet",
    tagline: "Ripe peach. Soft and sweet.",
    blurb: "Peach soda. Mild sweet. Caffeine-free.",
    description: [
      "Ripe peach flavor. Soft, sunny, and gently sweet — not sticky.",
      "Zero sugar. Zero caffeine. Calm drink for when you want something easy.",
      "No caffeine. No sugar. No drama.",
    ],
    taste: ["Peach", "Soft sweet", "Mellow"],
    caffeineMg: 0,
    accent: "#e8b898",
    accent2: "#d49a70",
    packs: ["single", "four", "twelve"],
  },
  {
    id: "cola-spark",
    slug: "cola-spark",
    name: "Cola Spark",
    flavor: "Caffeinated",
    category: "caffeinated",
    tagline: "Classic cola. 80mg caffeine.",
    blurb: "Cola. Zero sugar. 80mg caffeine.",
    description: [
      "Classic cola taste — deep, familiar, a little spicy-sweet.",
      "Zero sugar, plus 80mg of caffeine for days you actually want the lift. Most Ember flavors have no caffeine. This one does, on purpose.",
      "Don't want caffeine? Grab anything else in the lineup.",
    ],
    taste: ["Cola", "Spiced", "80mg caffeine"],
    caffeineMg: 80,
    accent: "#c9a078",
    accent2: "#a87848",
    packs: ["single", "four", "twelve"],
  },
  {
    id: "citrus-charge",
    slug: "citrus-charge",
    name: "Citrus Charge",
    flavor: "Caffeinated",
    category: "caffeinated",
    tagline: "Lemon-lime. 80mg caffeine.",
    blurb: "Citrus. Zero sugar. 80mg caffeine.",
    description: [
      "Bright lemon-lime soda with 80mg of caffeine.",
      "Zero sugar. Made for afternoons when you want flavor and a little energy — not a sugar crash.",
      "Need caffeine-free? Pick a sour or sweet flavor instead.",
    ],
    taste: ["Lemon-lime", "Bright", "80mg caffeine"],
    caffeineMg: 80,
    accent: "#e0d48a",
    accent2: "#b8c070",
    packs: ["single", "four", "twelve"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function shopProducts(): Product[] {
  return PRODUCTS;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function lowestPrice(product: Product): number {
  return Math.min(...product.packs.map((id) => PACKS[id].price));
}
