"use client";

import Link from "next/link";
import { FlavorArt } from "@/components/FlavorArt";
import { ProductCard } from "@/components/ProductCard";
import { Btn, FadeUp } from "@/components/ui";
import { getProduct, shopProducts } from "@/lib/products";

function Hero() {
  const product = getProduct("sour-cherry")!;

  return (
    <section className="flex min-h-[100svh] items-center pt-14">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-6xl">
            We get it.
            <br />
            You want clean, delicious, and customizable.
          </h1>
          <p className="mt-5 max-w-sm text-pretty text-lg text-muted">
            Zero sugar. Caffeine only if you choose it. Sour or sweet — your pick.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href="/shop">Shop flavors</Btn>
            <Btn href="/ingredients" variant="line">
              Ingredients
            </Btn>
          </div>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="mx-auto block w-full max-w-sm transition-opacity hover:opacity-90"
        >
          <FlavorArt product={product} large />
        </Link>
      </div>
    </section>
  );
}

function Line() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
      <FadeUp>
        <p className="font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
          You&apos;re not weird for wanting a drink without the junk.
        </p>
      </FadeUp>
      <FadeUp delay={0.08}>
        <p className="mt-6 text-pretty text-xl text-muted">
          The shelf just made you feel like you were. Sugar in almost everything.
          Caffeine forced into the rest. &ldquo;Healthy&rdquo; options that taste like
          punishment.
          <span className="text-fg"> We made the drink that was missing.</span>
        </p>
      </FadeUp>
    </section>
  );
}

function Flavors() {
  const products = shopProducts().slice(0, 6);
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <FadeUp className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Flavors</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pick what you like.
          </h2>
          <p className="mt-2 text-muted">
            Sour, sweet, or caffeinated. All zero sugar.
          </p>
        </div>
        <Link href="/shop" className="text-sm text-muted hover:text-fg">
          See all →
        </Link>
      </FadeUp>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function BuildPromo() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="ember-paper p-8 sm:p-12">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Custom</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Build your own case.
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            4, 6, 8, or 12 cans. Any mix of flavors. Add as many of each as you want until
            the case is full.
          </p>
          <div className="mt-8">
            <Btn href="/build">Build a case</Btn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28 text-center sm:px-8">
      <FadeUp>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Stop settling for bad options.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Order Ember. Drink something that finally matches what you actually want.
        </p>
        <div className="mt-8">
          <Btn href="/shop">Shop now</Btn>
        </div>
      </FadeUp>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Line />
      <Flavors />
      <BuildPromo />
      <Close />
    </>
  );
}
