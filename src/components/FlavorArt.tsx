import type { Product } from "@/lib/products";

/** Flat print-style flavor panel — shorter, half the old height. */
export function FlavorArt({
  product,
  className,
  large = false,
}: {
  product: Pick<Product, "name" | "accent" | "flavor" | "caffeineMg">;
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden p-4 sm:p-5 ${
        large ? "aspect-[3/4] p-5 sm:p-6" : "aspect-[3/2]"
      } ${className ?? ""}`}
      style={{ backgroundColor: product.accent }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-[16.5px] font-bold uppercase tracking-[0.22em] text-ink/70">
          Ember
        </span>
        <span className="font-display text-[16.5px] font-bold uppercase tracking-[0.18em] text-ink/70">
          {product.flavor}
        </span>
      </div>

      <div>
        <h3
          className={`font-display font-extrabold leading-[0.9] tracking-tight text-ink ${
            large ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {product.name}
        </h3>
        <p className={`font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/65 ${
          large ? "mt-4" : "mt-2"
        }`}>
          Zero sugar ·{" "}
          {product.caffeineMg > 0 ? `${product.caffeineMg}mg caffeine` : "Caffeine-free"}
        </p>
      </div>
    </div>
  );
}

export function ColorChip({
  accent,
  accent2,
  className,
}: {
  accent: string;
  accent2: string;
  className?: string;
}) {
  return (
    <div
      className={`h-14 w-14 shrink-0 ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, ${accent2} 0%, ${accent} 100%)`,
      }}
      aria-hidden
    />
  );
}
