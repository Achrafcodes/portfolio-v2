"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/icons";

export default function ContactActions() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — fall back to mailto
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <a
        href={site.gmailCompose}
        target="_blank"
        rel="noopener noreferrer"
        className="premium-glow group bg-signal text-on-signal px-6 sm:px-10 py-4 sm:py-5 font-mono text-[12px] sm:text-[13px] rounded-full hover:shadow-[0_0_30px_rgba(255,159,28,0.3)] active:scale-95 transition-all flex items-center gap-3 font-bold tracking-widest uppercase"
      >
        Book a Free Scope Call
        <ArrowRight className="size-[18px] group-hover:translate-x-1 transition-transform" />
      </a>
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
          Prefer email or WhatsApp? →
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={copy}
            className="group font-mono text-label uppercase text-muted hover:text-ink transition-colors"
            aria-live="polite"
          >
            {copied ? (
              <span className="text-live">Copied to clipboard ✓</span>
            ) : (
              <>
                {site.email}{" "}
                <span className="text-faint group-hover:text-signal transition-colors">
                  — click to copy
                </span>
              </>
            )}
          </button>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-label uppercase text-muted hover:text-ink transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
