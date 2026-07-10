"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * Brand intro shown once per session on first load: logo + name + progress
 * sweep, ~1s, then fades out. Skipped for reduced-motion users and on
 * client-side navigations.
 */
export default function LoadingScreen() {
  const [phase, setPhase] = useState<"hidden" | "showing" | "leaving">("hidden");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("intro-seen")) return;
    sessionStorage.setItem("intro-seen", "1");
    setPhase("showing");
    const leave = setTimeout(() => setPhase("leaving"), 1100);
    const gone = setTimeout(() => setPhase("hidden"), 1700);
    return () => {
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] bg-canvas flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ${
        phase === "leaving" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-3 text-ink intro-pop">
        <LogoMark className="size-10" />
        <span
          className="text-[26px] font-extrabold tracking-tight"
          style={{ fontFamily: 'var(--font-syne), "Syne", sans-serif' }}
        >
          Es-Soussy
        </span>
      </div>
      <div className="w-40 h-px bg-line overflow-hidden rounded-full">
        <div className="h-full w-full bg-signal intro-sweep origin-left" />
      </div>
    </div>
  );
}
