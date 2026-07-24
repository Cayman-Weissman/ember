import type { Metadata } from "next";
import Link from "next/link";
import { ShopClient } from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Zero sugar drinks. Sour, sweet, or caffeinated. Most are caffeine-free.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
      <header className="mb-12 max-w-xl">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Shop</h1>
        <p className="mt-3 text-lg text-muted">
          All zero sugar. Most are caffeine-free. The caffeinated ones are labeled. Or{" "}
          <Link href="/build" className="text-fg underline underline-offset-2">
            build your own case
          </Link>
          .
        </p>
      </header>
      <ShopClient />
    </div>
  );
}
