"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CASE_OPTIONS, caseOption, perCan, type CaseSize } from "@/lib/cases";
import { useCart } from "@/lib/cart";
import { formatPrice, shopProducts } from "@/lib/products";
import { Btn, FadeUp } from "@/components/ui";

export function BuildCaseClient() {
  const products = shopProducts();
  const addCustomCase = useCart((s) => s.addCustomCase);

  const [size, setSize] = useState<CaseSize>(12);
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(products.map((p) => [p.id, 0])),
  );

  const filled = useMemo(
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts],
  );
  const remaining = size - filled;
  const option = caseOption(size);
  const complete = filled === size;

  const setCount = (id: string, next: number) => {
    setCounts((prev) => {
      const current = prev[id] ?? 0;
      const others = filled - current;
      const maxForThis = size - others;
      const clamped = Math.max(0, Math.min(next, maxForThis));
      return { ...prev, [id]: clamped };
    });
  };

  const handleAdd = () => {
    if (!complete) return;
    addCustomCase({
      caseSize: size,
      price: option.price,
      mix: products
        .filter((p) => (counts[p.id] ?? 0) > 0)
        .map((p) => ({
          productId: p.id,
          name: p.name,
          count: counts[p.id],
          accent: p.accent,
        })),
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <FadeUp>
          <p className="mb-3 text-sm font-medium text-muted">Case size</p>
          <div className="flex flex-wrap gap-3">
            {CASE_OPTIONS.map((c) => {
              const active = size === c.size;
              return (
                <button
                  key={c.size}
                  onClick={() => {
                    setSize(c.size);
                    // trim if over new size
                    setCounts((prev) => {
                      let total = Object.values(prev).reduce((a, b) => a + b, 0);
                      if (total <= c.size) return prev;
                      const next = { ...prev };
                      for (const id of Object.keys(next).reverse()) {
                        if (total <= c.size) break;
                        const cut = Math.min(next[id], total - c.size);
                        next[id] -= cut;
                        total -= cut;
                      }
                      return next;
                    });
                  }}
                  className={`ember-chip px-4 py-3 text-left text-sm ${
                    active ? "is-active" : ""
                  }`}
                >
                  <span className="block text-sm font-semibold">{c.label}</span>
                  <span className="mt-0.5 block text-sm">{formatPrice(c.price)}</span>
                  {c.note && (
                    <span className="ember-chip-note mt-0.5 block text-xs">{c.note}</span>
                  )}
                </button>
              );
            })}
          </div>
        </FadeUp>

        <FadeUp delay={0.06} className="mt-10">
          <p className="mb-3 text-sm font-medium text-muted">
            Add any mix of flavors · {remaining} left
          </p>
          <div className="divide-y divide-line border-y border-line">
            {products.map((p) => {
              const n = counts[p.id] ?? 0;
              return (
                <div key={p.id} className="flex items-center gap-4 py-4">
                  <div
                    className="h-12 w-12 shrink-0"
                    style={{ backgroundColor: p.accent }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold">{p.name}</p>
                    <p className="text-sm text-muted">
                      {p.flavor}
                      {p.caffeineMg > 0 ? ` · ${p.caffeineMg}mg caffeine` : " · caffeine-free"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCount(p.id, n - 1)}
                      disabled={n === 0}
                      aria-label={`Remove ${p.name}`}
                      className="text-muted hover:text-fg disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center font-semibold">{n}</span>
                    <button
                      onClick={() => setCount(p.id, n + 1)}
                      disabled={remaining === 0}
                      aria-label={`Add ${p.name}`}
                      className="text-muted hover:text-fg disabled:opacity-30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>

      <div className="ember-paper h-fit p-6 lg:sticky lg:top-20">
        <h2 className="font-display text-xl font-bold">Your case</h2>
        <p className="mt-1 text-sm text-muted">
          {filled} / {size} cans · {formatPrice(perCan(size))}/can
        </p>

        <div className="mt-4 h-2 w-full bg-line">
          <div
            className="h-full bg-ink transition-all duration-300"
            style={{ width: `${Math.min(100, (filled / size) * 100)}%` }}
          />
        </div>

        <div className="mt-5 min-h-[6rem] space-y-2 text-sm">
          {filled === 0 ? (
            <p className="text-muted">Add flavors to fill the case.</p>
          ) : (
            products
              .filter((p) => (counts[p.id] ?? 0) > 0)
              .map((p) => (
                <div key={p.id} className="flex justify-between gap-3">
                  <span>
                    {counts[p.id]}× {p.name}
                  </span>
                </div>
              ))
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <span className="text-muted">Total</span>
          <span className="font-display text-2xl font-bold">
            {formatPrice(option.price)}
          </span>
        </div>

        <div className="mt-5">
          <Btn onClick={handleAdd} disabled={!complete} className="w-full">
            {complete
              ? `Add ${size}-case to cart`
              : `Pick ${remaining} more can${remaining === 1 ? "" : "s"}`}
          </Btn>
        </div>
        <p className="mt-3 text-xs text-muted">
          Mix whatever you want. Bigger cases cost less per can.
        </p>
      </div>
    </div>
  );
}
