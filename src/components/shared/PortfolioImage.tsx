"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PortfolioImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

export default function PortfolioImage({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 100vw, 33vw",
}: PortfolioImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cream via-surface to-gold-bright/10 p-4 text-center",
          className
        )}
      >
        <span className="font-display text-sm font-semibold text-maroon-deep/80">
          {alt}
        </span>
        <span className="mt-1 text-[10px] text-[var(--color-text-muted)]">
          Gambar proyek segera ditampilkan
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  );
}
