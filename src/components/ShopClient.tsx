"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS, type Category } from "@/lib/products";

const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sour", label: "Sour" },
  { id: "sweet", label: "Sweet" },
  { id: "caffeinated", label: "Caffeinated" },
];

export function ShopClient() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const list =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`ember-chip px-4 py-2 text-sm ${
                active ? "is-active" : ""
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
