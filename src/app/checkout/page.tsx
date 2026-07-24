"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Btn } from "@/components/ui";
import { cartSubtotal, lineLabel, lineTotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-line bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-muted/60 focus:border-ember"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const { lines, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [placed, setPlaced] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? cartSubtotal(lines) : 0;
  const shipping = subtotal >= 25 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 pb-16 pt-40 text-center">
        <div className="flex h-14 w-14 items-center justify-center bg-ember text-paper">
          <Check className="h-7 w-7" strokeWidth={3} />
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold">Order placed</h1>
        <p className="mt-4 text-lg text-muted">
          You&apos;re all set. We&apos;ll email the details.
        </p>
        <div className="mt-8 flex gap-3">
          <Btn href="/shop">Shop more</Btn>
          <Btn href="/" variant="line">
            Home
          </Btn>
        </div>
      </div>
    );
  }

  if (mounted && lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 pb-16 pt-40 text-center">
        <h1 className="font-display text-4xl font-extrabold">Nothing to check out</h1>
        <div className="mt-8">
          <Btn href="/shop">Shop flavors</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Checkout</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlaced(true);
          clear();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-bold">Contact</legend>
            <Field label="Email" type="email" required placeholder="you@wherever.com" />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-bold">Shipping</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Address" required />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" required />
              <Field label="State" required />
              <Field label="ZIP" required />
            </div>
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-bold">Payment</legend>
            <Field label="Card number" required placeholder="4242 4242 4242 4242" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Expiry" required placeholder="MM / YY" />
              <Field label="CVC" required placeholder="123" />
            </div>
            <p className="text-xs text-muted">Demo only — no payment is processed.</p>
          </fieldset>
        </div>

        <div className="ember-paper h-fit p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Order</h2>
          <div className="mt-4 space-y-2 border-b border-line pb-4 text-sm">
            {mounted &&
              lines.map((line) => (
                <div key={line.key} className="flex justify-between gap-3">
                  <span className="text-muted">
                    {line.name}
                    {line.pack === "custom"
                      ? ` · ${line.caseSize}-case`
                      : ` · ${lineLabel(line)}`}{" "}
                    × {line.qty}
                  </span>
                  <span>{formatPrice(lineTotal(line))}</span>
                </div>
              ))}
          </div>
          <dl className="mt-4 space-y-2 text-sm">
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
              <dd className="font-display text-xl font-bold">{formatPrice(total)}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <Btn type="submit" className="w-full">
              Place order · {formatPrice(total)}
            </Btn>
          </div>
        </div>
      </form>
    </div>
  );
}
