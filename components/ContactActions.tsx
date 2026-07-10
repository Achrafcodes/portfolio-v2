"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";



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
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={site.gmailCompose}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-glow inline-flex items-center gap-3 bg-signal text-on-signal font-mono text-[12px] sm:text-[13px] uppercase px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold tracking-widest hover:shadow-[0_0_30px_rgba(255,159,28,0.3)] active:scale-95 transition-all"
        >
          Send an email
          <ArrowUpRight className="size-4" />
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card inline-flex items-center gap-3 text-ink font-mono text-[12px] sm:text-[13px] uppercase px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold tracking-widest hover:bg-white/10 active:scale-95 transition-all"
        >
          {/* WhatsApp glyph */}
          <svg viewBox="0 0 24 24" className="size-[18px] text-live" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3a3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.4z" />
          </svg>
          WhatsApp
        </a>
      </div>
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
    </div>
  );
}
