import Link from "next/link";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display text-[1.6875rem] font-bold tracking-tight lowercase leading-none ${className ?? ""}`}
      aria-label="Ember home"
    >
      ember
    </Link>
  );
}
