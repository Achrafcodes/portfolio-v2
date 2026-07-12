/**
 * Static hero background — replaces the WebGL smoke/aurora effect (FIX-08).
 * A faint fixed grid line motif at very low opacity. No animation, no
 * gradient-as-atmosphere, no cursor tracking — the typography carries
 * the hero, this just adds quiet texture.
 */
export default function HeroGrid() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
      }}
      aria-hidden
    />
  );
}
