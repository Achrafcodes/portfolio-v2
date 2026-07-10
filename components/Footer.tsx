import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { site } from "@/lib/site";

const display = { fontFamily: 'var(--font-syne), "Syne", sans-serif' };

export default function Footer() {
  return (
    <footer className="w-full border-t border-line bg-raised/50 mt-section">
      <div className="px-page max-w-container mx-auto py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2.5 text-ink">
              <LogoMark className="size-7" />
              <span
                className="text-[19px] font-extrabold tracking-tight"
                style={display}
              >
                Es-Soussy
              </span>
            </div>
            <p className="text-body text-muted opacity-70">
              Full-stack web developer. From idea to live product — design,
              build, launch, and stay.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-label uppercase text-signal hover:text-signal-bright transition-colors w-fit"
            >
              {site.email} →
            </a>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Site
              </span>
              <Link href="/#work" className="font-mono text-label uppercase text-muted hover:text-ink transition-colors">
                Work
              </Link>
              <Link href="/#process" className="font-mono text-label uppercase text-muted hover:text-ink transition-colors">
                Method
              </Link>
              <Link href="/#contact" className="font-mono text-label uppercase text-muted hover:text-ink transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Elsewhere
              </span>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-label uppercase text-muted hover:text-ink transition-colors"
              >
                GitHub
              </a>
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-label uppercase text-muted hover:text-ink transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-14 pt-8 border-t border-line">
          <span className="font-mono text-[11px] text-faint uppercase tracking-wider">
            © 2026 {site.name}. All rights reserved.
          </span>
          <span className="font-mono text-[11px] text-faint uppercase tracking-wider">
            {site.location} · UTC+1 · +212 706 389 418
          </span>
        </div>
      </div>
    </footer>
  );
}
