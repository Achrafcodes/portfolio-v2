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

    // Fallback safety net: a same-page anchor navigation (e.g. the mobile
    // menu linking to /#about on a different route) triggers a hash-jump
    // scroll whose timing relative to this effect isn't guaranteed —
    // sometimes it lands before the IntersectionObserver's first check,
    // sometimes after, depending on how the route transition completes.
    // If the observer's first check happens to miss the post-jump scroll
    // position, those elements would otherwise stay opacity:0 forever
    // since nothing else changes to re-trigger it. This does one manual,
    // geometry-based pass shortly after mount and activates anything
    // already on screen, independent of the observer's own timing.
    const sweep = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.classList.contains("active")) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("active");
          observer.unobserve(el);
        }
      });
    };
    const sweepTimer = setTimeout(sweep, 350);

    return () => {
      clearTimeout(sweepTimer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
