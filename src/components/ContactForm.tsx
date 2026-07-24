"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Btn } from "./ui";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="ember-paper p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center bg-ember text-paper">
          <Check className="h-6 w-6" strokeWidth={3} />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold">Message sent</h3>
        <p className="mt-2 text-muted">We&apos;ll reply soon.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-muted hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="ember-paper space-y-4 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Name</span>
          <input
            required
            className="w-full rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-ember"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Email</span>
          <input
            required
            type="email"
            className="w-full rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-ember"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-muted">Message</span>
        <textarea
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-ember"
        />
      </label>
      <Btn type="submit">Send</Btn>
    </form>
  );
}
