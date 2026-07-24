"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cartSubtotal, lineLabel, lineTotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { ColorChip } from "./FlavorArt";
import { Btn } from "./ui";

export function CartDrawer() {
  const { lines, isOpen, close, setQty, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = mounted ? cartSubtotal(lines) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-ink/30"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-line bg-bg"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-lg font-bold">Cart</h2>
              <button onClick={close} aria-label="Close" className="text-muted hover:text-fg">
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-muted">Your cart is empty.</p>
                <Btn href="/shop" onClick={close}>
                  Shop flavors
                </Btn>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {lines.map((line) => (
                    <div key={line.key} className="flex gap-3 border-b border-line pb-3">
                      <ColorChip
                        accent={line.accent}
                        accent2={line.accent2}
                        className="h-12 w-12"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <Link
                              href={
                                line.pack === "custom"
                                  ? "/build"
                                  : `/product/${line.slug}`
                              }
                              onClick={close}
                              className="font-semibold hover:underline"
                            >
                              {line.name}
                            </Link>
                            <p className="text-xs text-muted">{lineLabel(line)}</p>
                          </div>
                          <button
                            onClick={() => remove(line.key)}
                            className="text-xs text-muted hover:text-fg"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQty(line.key, line.qty - 1)}
                              aria-label="Decrease"
                              className="text-muted hover:text-fg"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm">{line.qty}</span>
                            <button
                              onClick={() => setQty(line.key, line.qty + 1)}
                              aria-label="Increase"
                              className="text-muted hover:text-fg"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatPrice(lineTotal(line))}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-line px-6 py-5">
                  <div className="mb-4 flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-display text-lg font-bold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <Btn href="/checkout" onClick={close} className="w-full">
                    Checkout
                  </Btn>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
