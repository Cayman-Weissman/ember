"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { PACKS, formatPrice, type PackId, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Btn } from "./ui";

export function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [pack, setPack] = useState<PackId>(
    product.packs.includes("twelve") ? "twelve" : product.packs[0],
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const price = PACKS[pack].price;

  const handleAdd = () => {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        pack,
        accent: product.accent,
        accent2: product.accent2,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {product.packs.map((id) => {
          const p = PACKS[id];
          const selected = pack === id;
          return (
            <button
              key={id}
              onClick={() => setPack(id)}
              className={`ember-chip px-4 py-3 text-left text-sm ${
                selected ? "is-active" : ""
              }`}
            >
              <span className="block text-sm font-semibold">{p.short}</span>
              <span className="mt-1 block text-sm">{formatPrice(p.price)}</span>
              {p.note && (
                <span className="ember-chip-note mt-1 block text-xs">{p.note}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease"
            className="text-muted hover:text-fg"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase"
            className="text-muted hover:text-fg"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Btn onClick={handleAdd} className="flex-1">
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>Add · {formatPrice(price * qty)}</>
          )}
        </Btn>
      </div>
    </div>
  );
}
