import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlavorArt } from "@/components/FlavorArt";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { FadeUp } from "@/components/ui";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-20 sm:pt-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Link href="/shop" className="text-sm text-muted hover:text-fg">
          ← Shop
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
          <FlavorArt product={product} />

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">{product.flavor}</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg text-muted">{product.tagline}</p>

            <dl className="mt-8 grid grid-cols-3 gap-2 text-center">
              {[
                ["Sugar", "0g"],
                ["Calories", "0"],
                ["Caffeine", product.caffeineMg > 0 ? `${product.caffeineMg}mg` : "None"],
              ].map(([label, value]) => (
                <div key={label} className="px-2 py-3">
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="mt-1 font-display text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>

            <ProductTabs product={product} />

            <div className="mt-10">
              <AddToCart product={product} />
            </div>
          </div>
        </div>

        <section className="mt-24">
          <FadeUp>
            <h2 className="font-display text-2xl font-extrabold">More flavors</h2>
          </FadeUp>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
