"use client";

import { FadeUp } from "@/components/ui";

const POINTS = [
  {
    title: "It breaks down into normal food stuff",
    body: "Aspartame is digested into aspartic acid, phenylalanine, and methanol — components already found in everyday foods like meat, dairy, fruit, and tomato juice. Your body treats them like food chemicals, not some leftover sweetener hanging around.",
  },
  {
    title: "It doesn't reach the lower gut intact",
    body: "Aspartame is broken down in digestion. It does not travel through as intact aspartame into the lower gut. What your body gets are those same common building blocks.",
  },
  {
    title: "It doesn't spike blood sugar or A1C",
    body: "Zero sugar. Zero calories. It won't raise blood glucose or A1C the way sugar does.",
  },
  {
    title: "It won't make you lose weight by itself",
    body: "Aspartame isn't a weight-loss drug. It just isn't sugar. So you get the sweet taste without the sugar load — that's it.",
  },
];

export function AspartameExplainer() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <FadeUp>
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Sweetener</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          About aspartame — straight up
        </h2>
        <p className="mt-4 text-lg text-muted">
          We use aspartame so Ember can be zero sugar and still taste like soda. Here&apos;s
          what that actually means.
        </p>
      </FadeUp>

      <div className="mt-10 space-y-0">
        {POINTS.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.04}>
            <div className="border-t border-line py-6">
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-pretty text-muted">{p.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.1}>
        <p className="ember-paper mt-8 p-5 text-sm text-muted">
          <span className="font-semibold text-fg">Note:</span> Phenylketonurics — aspartame
          contains phenylalanine. Full ingredient breakdowns are on every product page.
        </p>
      </FadeUp>
    </section>
  );
}
