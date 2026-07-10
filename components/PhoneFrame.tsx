import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

/** iPhone-style hardware mockup — real mobile capture as the screen. */
export default function PhoneFrame({
  src,
  alt,
  sizes = "15vw",
  className = "",
}: Props) {
  return (
    <div className={`select-none ${className}`}>
      {/* Titanium rim */}
      <div className="relative rounded-[18%_/_8.5%] bg-gradient-to-b from-[#4a4f55] via-[#26292d] to-[#3a3f45] p-[1.5%] shadow-frame">
        {/* Side buttons */}
        <span className="absolute -left-[1px] top-[18%] h-[4.5%] w-[3px] rounded-l-sm bg-[#3a3f45]" />
        <span className="absolute -left-[1px] top-[26%] h-[8%] w-[3px] rounded-l-sm bg-[#3a3f45]" />
        <span className="absolute -left-[1px] top-[36%] h-[8%] w-[3px] rounded-l-sm bg-[#3a3f45]" />
        <span className="absolute -right-[1px] top-[28%] h-[12%] w-[3px] rounded-r-sm bg-[#3a3f45]" />
        {/* Black bezel */}
        <div className="rounded-[17%_/_8%] bg-black p-[3.5%]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[13%_/_6%] bg-canvas">
            {/* Dynamic Island */}
            <div className="absolute top-[1.8%] left-1/2 -translate-x-1/2 z-10 h-[3.2%] w-[26%] rounded-full bg-black flex items-center justify-end pr-[6%]">
              <span className="size-[35%] rounded-full bg-[#0f1216] ring-1 ring-[#1c2126]" />
            </div>
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              className="object-cover object-top"
              sizes={sizes}
            />
            {/* Home indicator */}
            <span className="absolute bottom-[1.2%] left-1/2 -translate-x-1/2 z-10 h-[0.6%] w-[36%] rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
