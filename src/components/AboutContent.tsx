"use client";

import { Btn, FadeUp } from "@/components/ui";

const BELIEFS = [
  {
    n: "01",
    title: "No sugar. Period.",
    body: "Sweetened with aspartame so it tastes like a real drink, not a diet compromise. Zero grams. Zero crash.",
  },
  {
    n: "02",
    title: "Caffeine is optional",
    body: "Most flavors have none. Cola Spark and Citrus Charge have 80mg and say so on the can. You choose — the aisle doesn't force it.",
  },
  {
    n: "03",
    title: "We built it because nothing else worked",
    body: "We wanted a soda that didn't force sugar or caffeine on us. Nobody made it. So we did.",
  },
];

export function AboutContent() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="mx-auto max-w-5xl px-5 sm:px-8">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Our story</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-6xl">
            We wanted a drink that didn&apos;t screw us over.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted">
            Zero sugar on every can. Caffeine only if you choose it. Still tastes good.
            That drink didn&apos;t exist — so we made Ember.
          </p>
        </FadeUp>
      </section>

      <section className="mx-auto mt-20 max-w-5xl space-y-8 px-5 sm:px-8">
        <FadeUp>
          <p className="font-display text-2xl font-bold leading-snug text-balance sm:text-3xl">
            You know the drill. Stand in the fridge aisle. Flip every can. Put them all
            back.
          </p>
        </FadeUp>
        <FadeUp delay={0.06}>
          <div className="space-y-4 text-pretty text-lg leading-relaxed text-muted">
            <p>
              One&apos;s loaded with sugar. One&apos;s got caffeine you didn&apos;t ask for.
              One claims to be healthy and tastes like grass water.
            </p>
            <p>
              If you can&apos;t have caffeine — or you just don&apos;t want it at night —
              you&apos;re stuck. Same if you&apos;re done with sugar. The options suck.
            </p>
            <p className="text-fg">
              Ember is our answer. Zero sugar on every can. Most flavors are caffeine-free.
              A few have caffeine and say so up front. Sour ones, sweet ones, and nothing
              trying to lecture you.
            </p>
          </div>
        </FadeUp>
      </section>

      <section className="mx-auto mt-20 max-w-5xl px-5 sm:px-8">
        {BELIEFS.map((b, i) => (
          <FadeUp key={b.n} delay={i * 0.05}>
            <div className="border-t border-line py-8">
              <p className="text-sm text-muted">{b.n}</p>
              <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{b.title}</h3>
              <p className="mt-2 text-muted">{b.body}</p>
            </div>
          </FadeUp>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-5xl px-5 pb-8 text-center sm:px-8">
        <FadeUp>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
            We get it. That&apos;s why Ember exists.
          </h2>
          <div className="mt-8">
            <Btn href="/shop">Shop flavors</Btn>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
