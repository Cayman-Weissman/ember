import Link from "next/link";
import { Wordmark } from "./brand";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:justify-between">
        <div>
          <Wordmark />
          <p className="mt-2 max-w-xs text-sm text-muted">
          Zero sugar drinks. Build your own case. Caffeine only if you choose it.
          </p>
        </div>
        <div className="flex gap-10 text-sm text-muted">
          <div className="flex flex-col gap-2">
            <Link href="/shop" className="hover:text-fg">
              Shop
            </Link>
            <Link href="/build" className="hover:text-fg">
              Build a case
            </Link>
            <Link href="/ingredients" className="hover:text-fg">
              Ingredients
            </Link>
            <Link href="/about" className="hover:text-fg">
              Story
            </Link>
            <Link href="/faq" className="hover:text-fg">
              FAQ
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/contact" className="hover:text-fg">
              Contact
            </Link>
            <Link href="/cart" className="hover:text-fg">
              Cart
            </Link>
          </div>
        </div>
      </div>
      <p className="border-t border-line px-5 py-4 text-center text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} Ember · Sweetened with aspartame
      </p>
    </footer>
  );
}
