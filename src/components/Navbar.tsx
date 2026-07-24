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

function useIsMobile(query = "(max-width: 767px)") {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return mobile;
}

export function Navbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const count = mounted ? cartCount(lines) : 0;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || menuOpen
          ? "border-b border-line bg-bg/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark />

        {!isMobile && (
          <div className="flex flex-1 items-center justify-center gap-8 lg:gap-10">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm tracking-wide ${
                  pathname === l.href ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="text-sm text-muted hover:text-fg"
            aria-label="Open cart"
          >
            Cart{count > 0 ? ` (${count})` : ""}
          </button>
          {isMobile && (
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-full bg-fg transition-transform ${
                    menuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] block h-0.5 w-full bg-fg transition-opacity ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] block h-0.5 w-full bg-fg transition-transform ${
                    menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div className="border-t border-line bg-bg">
          <div className="mx-auto flex max-w-5xl flex-col px-5 py-4 sm:px-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-line py-3.5 text-base ${
                  pathname === l.href ? "text-fg" : "text-muted"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
