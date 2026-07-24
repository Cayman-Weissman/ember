import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FadeUp } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Ember with questions, feedback, or wholesale requests.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
      <FadeUp>
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Contact</h1>
        <p className="mt-4 max-w-lg text-lg text-muted">
          Questions, feedback, weird flavor ideas, wholesale — send it. A real person
          reads this.
        </p>
      </FadeUp>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeUp className="space-y-6 text-sm">
          <div>
            <p className="text-muted">Email</p>
            <p className="mt-1 text-muted">hey@drinkember.co</p>
          </div>
          <div>
            <p className="text-muted">Instagram</p>
            <p className="mt-1">@drinkember</p>
          </div>
          <div>
            <p className="text-muted">Wholesale</p>
            <p className="mt-1">stock@drinkember.co</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.08}>
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  );
}
