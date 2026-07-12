"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Hero background: a faint static grid, plus a second copy of the same
 * grid — tinted signal-orange — revealed only in a spotlight that follows
 * the cursor and continuously breathes in size (a slow pulse, like it's
 * pulling the grid in and letting it go). CSS custom-property updates
 * driven by one rAF loop, no WebGL. Skipped for reduced-motion users.
 */
export default function HeroGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.setProperty("--radius", "220px");
      return;
    }

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      root.style.setProperty("--mx", `${e.clientX - r.left}px`);
      root.style.setProperty("--my", `${e.clientY - r.top}px`);
      root.style.setProperty("--spot-opacity", "1");
    };
    const onLeave = () => root.style.setProperty("--spot-opacity", "0");

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    // breathing radius: pulses between ~140px and ~260px on a slow cycle
    let raf = 0;
    const render = (t: number) => {
      raf = requestAnimationFrame(render);
      const radius = 200 + Math.sin(t * 0.0012) * 60;
      root.style.setProperty("--radius", `${radius.toFixed(1)}px`);
    };
    raf = requestAnimationFrame(render);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
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
      style={{ "--spot-opacity": 0, "--radius": "220px" } as CSSProperties}
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
      {/* cursor spotlight — signal-orange grid, breathing radius, revealed only near the pointer */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spot-opacity, 0)",
          backgroundImage: spotGrid,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(circle var(--radius, 220px) at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--radius, 220px) at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
