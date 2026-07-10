import Link from "next/link";

/**
 * Brand mark: geometric "A" with signal-orange crossbar + terminal block
 * cursor — a statement mid-type, always shipping.
 */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 32" className={className} fill="none" aria-hidden>
      <path
        d="M3.5 28.5 L12.5 3.5 L21.5 28.5"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.6 18.6 H17.4"
        stroke="#FF9F1C"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <rect x="25.5" y="21" width="6" height="7.5" rx="1" fill="#FF9F1C" />
    </svg>
  );
}

const display = { fontFamily: 'var(--font-syne), "Syne", sans-serif' };

export default function Logo({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Achraf Es-Soussy — home"
      className={`flex items-center gap-2.5 text-ink ${className}`}
    >
      <LogoMark className="size-7 shrink-0" />
      <span
        className="text-[19px] font-extrabold tracking-tight leading-none"
        style={display}
      >
        Es-Soussy
      </span>
    </Link>
  );
}
