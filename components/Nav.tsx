"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "Method" },
  { href: "/#contact", label: "Contact" },
];

const display = { fontFamily: 'var(--font-syne), "Syne", sans-serif' };

export default function Nav() {
  const [open, setOpen] = useState(false);

  // lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-canvas/60 backdrop-blur-xl border-b border-line">
        <div className="flex justify-between items-center px-page py-4 max-w-container mx-auto">
          <Logo className="relative z-50" onClick={() => setOpen(false)} />
          <div className="hidden md:flex gap-8 items-center">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-label uppercase tracking-widest text-muted hover:text-ink transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-2 font-mono text-[11px] rounded-full hover:bg-signal hover:text-on-signal transition-all active:scale-95 font-bold uppercase tracking-widest"
            >
              Get a Quote
            </a>
          </div>
          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 flex flex-col justify-center items-center gap-[6px] size-11 rounded-full border border-line-strong bg-canvas/60 text-ink"
          >
            <span
              className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                open ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                open ? "-translate-y-[3.75px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-canvas flex flex-col transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* subtle glow */}
        <div className="absolute top-[-10%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-signal/10 blur-[100px] pointer-events-none" />
        <div className="flex-1 flex flex-col justify-center px-page gap-2">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-3 text-[40px] font-bold tracking-tight text-ink hover:text-signal transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ ...display, transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }}
            >
              {l.label}
              <span className="text-signal">.</span>
            </Link>
          ))}
          <a
            href={site.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={`mt-8 inline-flex w-fit items-center gap-3 bg-signal text-on-signal px-8 py-4 font-mono text-[12px] rounded-full font-bold tracking-widest uppercase transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: open ? "400ms" : "0ms" }}
          >
            Get a Quote
          </a>
        </div>
        <div
          className={`px-page pb-10 flex flex-col gap-2 transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: open ? "500ms" : "0ms" }}
        >
          <a
            href={site.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-label uppercase text-muted"
          >
            achrafcodes99@gmail.com
          </a>
          <span className="font-mono text-[11px] uppercase text-faint">
            Kenitra, Morocco · UTC+1
          </span>
        </div>
      </div>
    </>
  );
}
