import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** MacBook-style hardware mockup with the screenshot as the screen. */
export default function LaptopFrame({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 70vw",
  className = "",
}: Props) {
  return (
    <div className={`select-none ${className}`}>
      {/* Screen */}
      <div className="relative mx-auto w-full rounded-t-xl bg-[#0a0c0e] border border-line border-b-0 p-[2.2%] pb-[1.6%] shadow-frame">
        {/* Camera dot */}
        <span className="absolute top-[1%] left-1/2 -translate-x-1/2 size-[0.6%] min-w-1 min-h-1 rounded-full bg-[#1f2937]" />
        <div className="relative aspect-video overflow-hidden rounded-sm bg-canvas">
          <Image
            src={src}
            alt={alt}
            fill
            quality={100}
            className="object-cover object-top"
            sizes={sizes}
            priority={priority}
          />
        </div>
      </div>
      {/* Deck */}
      <div className="relative mx-auto w-[106%] max-w-none -translate-x-[2.83%] h-3 md:h-4 rounded-b-xl bg-gradient-to-b from-[#232b31] to-[#141a1e] border border-line border-t-0">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 h-[38%] w-[14%] rounded-b-md bg-[#0d1114]" />
      </div>
      {/* Ambient glow */}
      <div className="mx-auto mt-[-2px] h-6 w-[70%] rounded-[100%] bg-live/10 blur-xl" />
    </div>
  );
}
