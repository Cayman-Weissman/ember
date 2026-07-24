import { Btn } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-4 text-lg text-muted">This page doesn&apos;t exist. The shop does.</p>
      <div className="mt-8 flex gap-3">
        <Btn href="/shop">Shop</Btn>
        <Btn href="/" variant="line">
          Home
        </Btn>
      </div>
    </div>
  );
}
