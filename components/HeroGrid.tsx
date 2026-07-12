"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Hero background: the original faint flat grid, plus a scattered set of
 * real 3D cubes (CSS transforms + perspective, three visible faces each)
 * that continuously pop up and settle on staggered loops. Cubes near the
 * cursor pop higher and brighter. No canvas/WebGL/images.
 */

const CUBES: { x: number; y: number; size: number; color: "orange" | "teal"; delay: number }[] = [
  { x: 6, y: 20, size: 22, color: "orange", delay: 0 },
  { x: 15, y: 65, size: 16, color: "teal", delay: 0.6 },
  { x: 24, y: 35, size: 26, color: "orange", delay: 1.2 },
  { x: 10, y: 82, size: 18, color: "teal", delay: 1.8 },
  { x: 34, y: 12, size: 20, color: "orange", delay: 0.3 },
  { x: 44, y: 58, size: 24, color: "teal", delay: 0.9 },
  { x: 58, y: 24, size: 18, color: "orange", delay: 1.5 },
  { x: 68, y: 70, size: 22, color: "teal", delay: 2.1 },
  { x: 80, y: 40, size: 26, color: "orange", delay: 0.4 },
  { x: 90, y: 18, size: 16, color: "teal", delay: 1.0 },
  { x: 92, y: 75, size: 20, color: "orange", delay: 1.6 },
  { x: 52, y: 86, size: 18, color: "teal", delay: 2.2 },
  { x: 20, y: 46, size: 16, color: "orange", delay: 0.7 },
  { x: 74, y: 10, size: 22, color: "teal", delay: 1.3 },
];

function Cube({
  size,
  color,
  delay,
}: {
  size: number;
  color: "orange" | "teal";
  delay: number;
}) {
  const face = color === "orange" ? "var(--color-signal)" : "var(--color-live)";
  const dim = color === "orange" ? "var(--color-signal-dim)" : "var(--color-live-dim)";
  const half = size / 2;
  return (
    <div
      className="cube-bob absolute"
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="cube-pop absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "rotateX(-20deg) rotateY(25deg) translateZ(calc(var(--boost, 0) * 34px)) scale(calc(1 + var(--boost, 0) * 0.35))",
          transition: "transform 0.25s ease-out",
        }}
      >
        {/* top face */}
        <div
          className="absolute inset-0"
          style={{ background: face, opacity: 0.85, transform: `rotateX(90deg) translateZ(${half}px)` }}
        />
        {/* front face */}
        <div
          className="absolute inset-0"
          style={{ background: dim, opacity: 0.9, transform: `translateZ(${half}px)` }}
        />
        {/* side face */}
        <div
          className="absolute inset-0"
          style={{ background: dim, opacity: 0.6, transform: `rotateY(90deg) translateZ(${half}px)` }}
        />
      </div>
    </div>
  );
}

export default function HeroGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cubeEls = Array.from(root.querySelectorAll<HTMLElement>(".cube-pop"));

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      cubeEls.forEach((el) => {
        const cr = el.getBoundingClientRect();
        const cx = cr.left - r.left + cr.width / 2;
        const cy = cr.top - r.top + cr.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const boost = Math.max(0, 1 - dist / 220);
        el.style.setProperty("--boost", boost.toFixed(2));
      });
    };
    const onLeave = () => cubeEls.forEach((el) => el.style.setProperty("--boost", "0"));

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* faint flat grid, unchanged from before */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      {/* scattered 3D cubes, full opacity, popping */}
      <div className="absolute inset-0" style={{ perspective: "800px" }}>
        {CUBES.map((c, i) => (
          <div key={i} className="absolute" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
            <Cube size={c.size} color={c.color} delay={c.delay} />
          </div>
        ))}
      </div>
    </div>
  );
}
