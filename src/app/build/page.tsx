import type { Metadata } from "next";
import { BuildCaseClient } from "@/components/BuildCaseClient";

export const metadata: Metadata = {
  title: "Build your case",
  description:
    "Build a custom Ember case — 4, 6, 8, or 12 cans. Any mix of flavors.",
};

export default function BuildPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
      <header className="mb-10 max-w-xl">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">
          Build your case
        </h1>
        <p className="mt-3 text-lg text-muted">
          Pick a size. Add any amount of any flavor. Your mix, your rules.
        </p>
      </header>
      <BuildCaseClient />
    </div>
  );
}
