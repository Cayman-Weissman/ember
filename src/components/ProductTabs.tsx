"use client";

import { useState } from "react";
import { ingredientsFor } from "@/lib/ingredients";
import type { Product } from "@/lib/products";

type Tab = "about" | "ingredients";

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("about");
  const ingredients = ingredientsFor(product.caffeineMg);

  return (
    <div className="mt-8">
      <div className="flex gap-6 border-b border-line">
        {(
          [
            ["about", "About"],
            ["ingredients", "Ingredients"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
              tab === id
                ? "border-ink text-fg"
                : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "about" ? (
        <div className="mt-6 space-y-4">
          {product.description.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display text-xl font-semibold leading-snug sm:text-2xl"
                  : "text-lg leading-relaxed text-muted"
              }
            >
              {para}
            </p>
          ))}
          <ul className="flex flex-wrap gap-2 pt-2">
            {product.taste.map((t) => (
              <li key={t} className="px-3 py-1 text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-6 space-y-0">
          <p className="mb-6 text-sm text-muted">
            What&apos;s in this can, broken down. No mystery blend.
          </p>
          {ingredients.map((ing) => (
            <div key={ing.id} className="border-t border-line py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold">{ing.name}</h3>
                <p className="text-sm text-muted">{ing.short}</p>
              </div>
              <p className="mt-2 text-pretty text-muted">{ing.detail}</p>
            </div>
          ))}
          {product.caffeineMg === 0 && (
            <p className="border-t border-line pt-5 text-sm text-muted">
              This flavor has <span className="font-semibold text-fg">no caffeine</span>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
