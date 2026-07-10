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
      // anything already in the viewport on load still animates in
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
