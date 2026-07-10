import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * macOS-style browser chrome around a screenshot. The URL bar shows the
 * project's real live URL — mockup and deployment proof in one.
 */
export default function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 80vw",
  className = "",
}: Props) {
  const displayUrl = url?.replace(/^https?:\/\//, "");
  return (
    <div
      className={`browser-frame overflow-hidden rounded-xl border border-line bg-raised shadow-frame ${className}`}
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-line bg-chrome">
        <div className="flex gap-1.5 shrink-0">
          <span className="size-3 rounded-full bg-[#F06A5D]" />
          <span className="size-3 rounded-full bg-[#F5BE4F]" />
          <span className="size-3 rounded-full bg-[#61C554]" />
        </div>
        {displayUrl && (
          <div className="flex-1 flex justify-center min-w-0">
            <span className="font-mono text-[11px] tracking-wide text-muted bg-canvas/60 border border-line rounded-md px-4 py-1 truncate max-w-full">
              {displayUrl}
            </span>
          </div>
        )}
        <div className="w-11 shrink-0 hidden sm:block" />
      </div>
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover object-top"
          sizes={sizes}
          priority={priority}
        />
      </div>
    </div>
  );
}
