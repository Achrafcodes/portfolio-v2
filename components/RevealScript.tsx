"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR =
  ".reveal-up, .reveal-fade, .reveal-scale, .reveal-blur, .reveal-left, .reveal-right";

export default function RevealScript() {
  const pathname = usePathname();

  useEffect(() => {
    // auto-stagger direct reveal children of .reveal-stagger containers
    document.querySelectorAll<HTMLElement>(".reveal-stagger").forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        if (child instanceof HTMLElement && child.matches(SELECTOR)) {
          child.style.setProperty("--reveal-delay", `${i * 110}ms`);
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(SELECTOR).forEach((el) => {
      observer.observe(el);
    });

    // Safety net: landing on a page already scrolled to an anchor (mobile
    // menu -> /#about, a direct link to a hash URL, etc.) races a native
    // browser scroll-to-fragment jump against this effect's setup. That
    // jump isn't a single predictable event -- it can happen before
    // hydration, after, or get re-applied once fonts/images finish
    // loading and shift the layout. A one-time delayed check can miss it
    // either way. Instead, re-run a plain geometry check on every scroll
    // (rAF-throttled) and once on window 'load', so it's impossible to
    // miss regardless of what triggered the scroll or when.
    let ticking = false;
    const sweep = () => {
      ticking = false;
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.classList.contains("active")) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("active");
          observer.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    };

    sweep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", sweep);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", sweep);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
