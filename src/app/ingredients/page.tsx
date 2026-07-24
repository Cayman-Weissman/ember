import type { Metadata } from "next";
import { AspartameExplainer } from "@/components/AspartameExplainer";
import { FadeUp, Btn } from "@/components/ui";
import { INGREDIENTS, type IngredientId } from "@/lib/ingredients";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "What's in Ember: sparkling water, citric acid, malic acid, aspartame, flavoring — plus caffeine on labeled flavors only.",
};

const ORDER: IngredientId[] = [
  "sparkling-water",
  "citric-acid",
  "malic-acid",
  "aspartame",
  "flavoring",
  "caffeine",
];

export default function IngredientsPage() {
  return (
    <div className="pb-16 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">What&apos;s inside</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
            Ingredients
          </h1>
          <p className="mt-4 text-lg text-muted">
            Short list. Every can uses the same base. Caffeine only on the flavors that say
            so.
          </p>
        </FadeUp>

        <div className="mt-12">
          {ORDER.map((id, i) => {
            const ing = INGREDIENTS[id];
            return (
              <FadeUp key={id} delay={i * 0.04}>
                <div className="border-t border-line py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-xl font-bold">{ing.name}</h2>
                    <p className="text-sm text-muted">{ing.short}</p>
                  </div>
                  <p className="mt-2 text-pretty text-muted">{ing.detail}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>

      <AspartameExplainer />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Btn href="/shop">Shop flavors</Btn>
      </div>
    </div>
  );
}
