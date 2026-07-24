"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PACKS, type PackId } from "./products";
import type { CaseSize } from "./cases";

export interface CaseMixItem {
  productId: string;
  name: string;
  count: number;
  accent: string;
}

export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  pack: PackId | "custom";
  accent: string;
  accent2: string;
  qty: number;
  /** Fixed price override (custom cases). */
  unitPrice?: number;
  caseSize?: CaseSize;
  mix?: CaseMixItem[];
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  addCustomCase: (input: {
    caseSize: CaseSize;
    price: number;
    mix: CaseMixItem[];
  }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

function mixKey(mix: CaseMixItem[]): string {
  return mix
    .filter((m) => m.count > 0)
    .sort((a, b) => a.productId.localeCompare(b.productId))
    .map((m) => `${m.productId}:${m.count}`)
    .join("|");
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (line, qty = 1) =>
        set((state) => {
          const key = `${line.productId}:${line.pack}`;
          const existing = state.lines.find((l) => l.key === key);
          if (existing) {
            return {
              isOpen: true,
              lines: state.lines.map((l) =>
                l.key === key ? { ...l, qty: l.qty + qty } : l,
              ),
            };
          }
          return { isOpen: true, lines: [...state.lines, { ...line, key, qty }] };
        }),
      addCustomCase: ({ caseSize, price, mix }) =>
        set((state) => {
          const cleaned = mix.filter((m) => m.count > 0);
          const key = `case:${caseSize}:${mixKey(cleaned)}`;
          const existing = state.lines.find((l) => l.key === key);
          if (existing) {
            return {
              isOpen: true,
              lines: state.lines.map((l) =>
                l.key === key ? { ...l, qty: l.qty + 1 } : l,
              ),
            };
          }
          const accents = cleaned[0];
          const line: CartLine = {
            key,
            productId: "custom-case",
            slug: "build",
            name: `Custom ${caseSize}-case`,
            pack: "custom",
            accent: accents?.accent ?? "#dcb090",
            accent2: accents?.accent ?? "#c48860",
            qty: 1,
            unitPrice: price,
            caseSize,
            mix: cleaned,
          };
          return { isOpen: true, lines: [...state.lines, line] };
        }),
      remove: (key) =>
        set((state) => ({ lines: state.lines.filter((l) => l.key !== key) })),
      setQty: (key, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (l.key === key ? { ...l, qty: Math.max(0, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "ember-cart-v2" },
  ),
);

export function lineTotal(line: CartLine): number {
  const price =
    line.unitPrice ??
    (line.pack !== "custom" ? PACKS[line.pack].price : 0);
  return price * line.qty;
}

export function lineLabel(line: CartLine): string {
  if (line.pack === "custom" && line.mix) {
    return line.mix.map((m) => `${m.count}× ${m.name}`).join(", ");
  }
  if (line.pack !== "custom") return PACKS[line.pack].label;
  return `${line.caseSize}-case`;
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + lineTotal(l), 0);
}
