"use client";

import Link from "next/link";
import { FlavorArt } from "./FlavorArt";
import { formatPrice, lowestPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { FadeUp } from "./ui";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const pack = product.packs.includes("twelve") ? "twelve" : product.packs[0];

  return (
    <FadeUp delay={index * 0.05}>
      <article>
        <Link href={`/product/${product.slug}`} className="block">
          <FlavorArt product={product} />
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-muted">{product.blurb}</p>
            </div>
            <p className="shrink-0 text-sm text-muted">
              from {formatPrice(lowestPrice(product))}
            </p>
          </div>
        </Link>
        <button
          onClick={() =>
            add({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              pack,
              accent: product.accent,
              accent2: product.accent2,
            })
          }
          className="mt-2 text-sm font-medium text-fg underline-offset-2 hover:underline"
        >
          Add {pack === "twelve" ? "12-pack" : "to cart"}
        </button>
      </article>
    </FadeUp>
  );
}
