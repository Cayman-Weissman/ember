"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./brand";
import { cartCount, useCart } from "@/lib/cart";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/build", label: "Build a case" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/about", label: "Story" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = mounted ? cartCount(lines) : 0;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-line bg-bg/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark />
        <div className="flex flex-1 items-center justify-end gap-4 overflow-x-auto sm:gap-7 md:justify-center">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 text-sm ${
                pathname === l.href ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button
          onClick={openCart}
          className="shrink-0 text-sm text-muted hover:text-fg"
          aria-label="Open cart"
        >
          Cart{count > 0 ? ` (${count})` : ""}
        </button>
      </nav>
    </header>
  );
}
