type Props = { name: string; className?: string };

/** Simplified brand-colored marks for the stack pill row — not pixel-exact logos, just recognizable at a glance. */
export default function TechIcon({ name, className = "size-3.5" }: Props) {
  switch (name) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <g fill="none" stroke="#61DAFB" strokeWidth="1.4">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="10.5" fill="#000" stroke="#fff" strokeWidth="0.6" />
          <path d="M8.5 8v8M8.5 8l7 8V8" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="#3178C6" />
          <path
            d="M13.6 12.5H10v1.6h1.7v6.4h1.9v-6.4h1.7v-1.6zM17.9 12.3c-1.5 0-2.5.8-2.5 2 0 1.05.72 1.55 1.9 2 .95.35 1.2.55 1.2 1 0 .4-.35.65-.95.65-.7 0-1.25-.3-1.7-.75l-1 1.15c.6.7 1.55 1.1 2.65 1.1 1.65 0 2.7-.85 2.7-2.15 0-1.1-.65-1.6-1.9-2.1-.95-.35-1.2-.55-1.2-.9 0-.3.28-.55.8-.55.55 0 1 .2 1.4.6l1-1.1c-.55-.6-1.35-.95-2.4-.95z"
            fill="#fff"
          />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M12 1.85 21 7v10L12 22.15 3 17V7z"
            fill="none"
            stroke="#83CD29"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M9 12.2h6M9 15h4M9 9.4h6" stroke="#83CD29" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M12 2c2.5 3 4 6.6 4 10.2 0 3.4-1.6 6-4 8.3-2.4-2.3-4-4.9-4-8.3C8 8.6 9.5 5 12 2z"
            fill="#00ED64"
          />
          <path d="M12 13v8" stroke="#00684A" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M6 12.5c.7-2.8 2.4-4.2 5-4.2 3.9 0 4.4 2.9 6.1 3.3-1.15 0-2.1.5-2.85 1.6-.75 1.1-1.65 1.8-3.25 1.8-3.9 0-4.4-2.9-6.1-3.3 1.15 0 2.1-.5 2.85-1.6.75-1.1 1.65-1.8 3.25-1.8"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-1 1)"
          />
        </svg>
      );
    default:
      return null;
  }
}
