"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Hero background: a faint static grid, plus a second copy of the same
 * grid — tinted signal-orange — revealed only in a soft spotlight that
 * follows the cursor. Pure CSS custom-property updates on mousemove, no
 * animation loop, no WebGL. Skipped for reduced-motion users.
 */
export default function HeroGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      root.style.setProperty("--mx", `${e.clientX - r.left}px`);
      root.style.setProperty("--my", `${e.clientY - r.top}px`);
      root.style.setProperty("--spot-opacity", "1");
    };
    const onLeave = () => root.style.setProperty("--spot-opacity", "0");

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const baseGrid =
    "linear-gradient(to right, var(--color-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)";
  const spotGrid =
    "linear-gradient(to right, var(--color-signal) 1px, transparent 1px), linear-gradient(to bottom, var(--color-signal) 1px, transparent 1px)";

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ "--spot-opacity": 0 } as CSSProperties}
      aria-hidden
    >
      {/* base grid, always faint */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: baseGrid,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      {/* cursor spotlight — signal-orange grid, revealed only near the pointer */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spot-opacity, 0)",
          backgroundImage: spotGrid,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
