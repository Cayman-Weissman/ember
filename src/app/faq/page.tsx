import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { Btn, FadeUp } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Clear answers about sugar, aspartame, caffeine, price, and shipping.",
};

const FAQS: FaqItem[] = [
  {
    q: "Is there really no sugar?",
    a: "Yes. Every flavor is zero sugar and zero calories. We sweeten with aspartame so it still tastes like soda.",
  },
  {
    q: "Is aspartame unhealthy?",
    a: "Aspartame breaks down in digestion into aspartic acid, phenylalanine, and methanol — the same building blocks already found in everyday foods. It does not travel intact into the lower gut. It has zero calories, so it does not spike blood sugar or A1C. It also will not magically make you lose weight — it just isn't sugar. Full write-up is on the Ingredients page. Phenylketonurics: contains phenylalanine.",
  },
  {
    q: "What's in Ember?",
    a: "Sparkling water, citric acid, malic acid, aspartame, and flavoring. Caffeinated flavors also include caffeine (80mg). See the Ingredients page for the full breakdown.",
  },
  {
    q: "Does every flavor have caffeine?",
    a: "No. Most flavors have zero caffeine. Only Cola Spark and Citrus Charge have 80mg — labeled clearly. Everything else is caffeine-free.",
  },
  {
    q: "Can I mix flavors?",
    a: "Yes. Use Build a case — pick 4, 6, 8, or 12 cans and add any amount of any flavor until it's full. Bigger cases cost less per can.",
  },
  {
    q: "What should I buy first?",
    a: "Like sour? Sour Cherry or Green Apple. Like sweet? Vanilla Cream or Peach. Want caffeine? Cola Spark or Citrus Charge. Want a mix? Build a case.",
  },
  {
    q: "How much is it?",
    a: "Single $1.79 · 4-pack / 4-case $6.49 · 6-case $9.49 · 8-case $12.49 · 12-pack / 12-case $17.99. Bigger packs cost less per can.",
  },
  {
    q: "Shipping?",
    a: "$4.99, or free over $25. Orders usually ship in 2–4 days.",
  },
  {
    q: "Can I drink it at night?",
    a: "Yes — if you pick a caffeine-free flavor (most of them). Skip Cola Spark and Citrus Charge if you're winding down.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
      <FadeUp>
        <h1 className="font-display text-5xl font-extrabold tracking-tight">FAQ</h1>
        <p className="mt-3 text-lg text-muted">Quick answers. No fluff.</p>
      </FadeUp>
      <div className="mt-10">
        <FaqAccordion items={FAQS} />
      </div>
      <div className="mt-12 text-center">
        <p className="text-muted">
          Want the full ingredient breakdown?{" "}
          <Link href="/ingredients" className="text-fg underline underline-offset-2">
            Ingredients
          </Link>
        </p>
        <div className="mt-6">
          <Btn href="/contact" variant="line">
            Contact us
          </Btn>
        </div>
      </div>
    </div>
  );
}
