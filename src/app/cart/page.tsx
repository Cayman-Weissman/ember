"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { ColorChip } from "@/components/FlavorArt";
import { Btn } from "@/components/ui";
import { cartSubtotal, lineLabel, lineTotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { lines, setQty, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? cartSubtotal(lines) : 0;
  const shipping = subtotal >= 25 || subtotal === 0 ? 0 : 4.99;

  if (mounted && lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 pb-16 pt-36 text-center">
        <h1 className="font-display text-4xl font-extrabold">Your cart is empty</h1>
        <p className="mt-3 text-muted">Add a flavor to get started.</p>
        <div className="mt-8">
          <Btn href="/shop">Shop flavors</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          {mounted &&
            lines.map((line) => (
              <div key={line.key} className="flex gap-4 border-b border-line pb-4">
                <ColorChip accent={line.accent} accent2={line.accent2} />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        href={line.pack === "custom" ? "/build" : `/product/${line.slug}`}
                        className="font-display text-lg font-bold hover:underline"
                      >
                        {line.name}
                      </Link>
                      <p className="text-sm text-muted">{lineLabel(line)}</p>
                    </div>
                    <button
                      onClick={() => remove(line.key)}
                      className="text-sm text-muted hover:text-fg"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQty(line.key, line.qty - 1)}
                        aria-label="Decrease"
                        className="text-muted hover:text-fg"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.key, line.qty + 1)}
                        aria-label="Increase"
                        className="text-muted hover:text-fg"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-semibold">{formatPrice(lineTotal(line))}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="ember-paper h-fit p-6 lg:sticky lg:top-20">
          <h2 className="font-display text-lg font-bold">Summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-xl font-bold">
                {formatPrice(subtotal + shipping)}
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            <Btn href="/checkout" className="w-full">
              Checkout
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
