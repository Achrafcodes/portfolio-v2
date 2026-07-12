"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Hero background: a faint static grid, plus a second copy of the same
 * grid — tinted signal-orange — revealed only in a spotlight that follows
 * the cursor and continuously breathes in size (a slow pulse, like it's
 * pulling the grid in and letting it go).
 *
 * Perf: mousemove only records the latest pointer position into a ref —
 * it never touches the DOM. A single rAF loop reads that ref and writes
 * CSS custom properties (mask-image position + opacity) once per frame.
 * The loop is torn down (not just idle) whenever the hero scrolls out of
 * view or the tab is hidden, and never started at all for touch pointers
 * or prefers-reduced-motion.
 */
export default function HeroGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      // Fully static: base grid only, no spotlight, no rAF loop at all.
      root.style.setProperty("--radius", "220px");
      return;
    }

    // Touch devices have no cursor to track — drive a slow ambient drift
    // instead so the background is never dead/empty on mobile.
    const coarsePointer = window.matchMedia(
      "(pointer: coarse), (hover: none)"
    ).matches;

    // Latest pointer position, written by the raw handler, read by rAF.
    const pointer = { x: 0, y: 0, active: false };
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    if (!coarsePointer) {
      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
    }

    let raf = 0;
    let running = false;

    const render = (t: number) => {
      raf = requestAnimationFrame(render);

      const radius = 200 + Math.sin(t * 0.0012) * 60;
      root.style.setProperty("--radius", `${radius.toFixed(1)}px`);

      if (coarsePointer) {
        const driftX = 50 + Math.sin(t * 0.00018) * 22;
        const driftY = 40 + Math.cos(t * 0.00013) * 18;
        root.style.setProperty("--mx", `${driftX}%`);
        root.style.setProperty("--my", `${driftY}%`);
        root.style.setProperty("--spot-opacity", "0.5");
      } else {
        root.style.setProperty("--mx", `${pointer.x}px`);
        root.style.setProperty("--my", `${pointer.y}px`);
        root.style.setProperty("--spot-opacity", pointer.active ? "1" : "0");
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause entirely when the hero scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(section);

    // Pause entirely when the tab is backgrounded.
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (section.getBoundingClientRect().top < window.innerHeight) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      stop();
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
      {/* cursor spotlight — signal-orange grid, breathing radius, revealed only near the pointer.
          Three layers at increasing cell size, each masked to a smaller ring, so the grid
          appears to magnify/bulge larger the closer it is to the spotlight's center. */}
      {[
        { size: 56, stop: "100%" },
        { size: 84, stop: "62%" },
        { size: 120, stop: "32%" },
      ].map(({ size, stop }) => (
        <div
          key={size}
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: "var(--spot-opacity, 0)",
            backgroundImage: spotGrid,
            backgroundSize: `${size}px ${size}px`,
            maskImage: `radial-gradient(circle calc(var(--radius, 220px) * ${stop === "100%" ? 1 : parseInt(stop) / 100}) at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle calc(var(--radius, 220px) * ${stop === "100%" ? 1 : parseInt(stop) / 100}) at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)`,
          }}
        />
      ))}
      {/* Dims the spotlight under the headline/subtext/CTA column so the
          effect never fights text readability — ~35% canvas wash, masked
          to fade out toward the edges of that column. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--color-canvas)",
          opacity: 0.35,
          maskImage:
            "radial-gradient(ellipse 55% 60% at 50% 34%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 60% at 50% 34%, black 55%, transparent 100%)",
        }}
      />
    </div>
  );
}
