import Link from "next/link";
import { ArrowRight } from "@/components/icons";

const display = { fontFamily: 'var(--font-hanken), "Hanken Grotesk", sans-serif' };

export default function NotFound() {
  return (
    <section className="px-page min-h-[60vh] flex flex-col items-center justify-center text-center max-w-container mx-auto">
      <p className="font-mono text-label uppercase tracking-[0.3em] text-signal mb-6">
        404 — Page not found
      </p>
      <h1
        className="text-title text-ink mb-6"
        style={{ ...display, fontWeight: 700 }}
      >
        This page isn&apos;t live.
        <br />
        <span className="text-muted font-light">Everything else is.</span>
      </h1>
      <Link
        href="/"
        className="inline-flex items-center gap-3 bg-signal text-on-signal px-8 py-4 font-mono text-[12px] rounded-full font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(255,159,28,0.3)] transition-all"
      >
        Back to the work
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
