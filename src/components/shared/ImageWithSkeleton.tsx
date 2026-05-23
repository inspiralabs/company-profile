"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ImageWithSkeleton({
  className,
  alt = "",
  imgClassName,
  ...props
}: ImageProps & { imgClassName?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-cream via-surface to-cream"
          aria-hidden
        />
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
      />
    </div>
  );
}
