"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PortfolioScalingCarouselProps = {
  images: string[];
  alt: string;
  activeIndex: number;
  onChange: (index: number) => void;
  onExpand?: () => void;
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export default function PortfolioScalingCarousel({
  images,
  alt,
  activeIndex,
  onChange,
  onExpand,
}: PortfolioScalingCarouselProps) {
  const [direction, setDirection] = useState(0);

  const go = (dir: -1 | 1) => {
    setDirection(dir);
    onChange(wrapIndex(activeIndex + dir, images.length));
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 48;
    if (info.offset.x < -threshold || info.velocity.x < -400) go(1);
    else if (info.offset.x > threshold || info.velocity.x > 400) go(-1);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div className="relative mx-auto h-[min(36vw,180px)] w-full max-w-sm overflow-hidden rounded-xl bg-charcoal/5 ring-1 ring-[var(--color-border)] sm:h-[200px] sm:max-w-md">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
            className="absolute inset-0 touch-pan-y"
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} — ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 90vw, 448px"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal/75 p-2 text-white hover:bg-maroon-deep sm:left-3"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal/75 p-2 text-white hover:bg-maroon-deep sm:right-3"
              aria-label="Gambar berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-full bg-charcoal/80 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-md transition-colors hover:bg-maroon-deep sm:bottom-2.5 sm:right-2.5 sm:px-3 sm:text-xs"
            aria-label="Perbesar gambar"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Perbesar
          </button>
        )}
      </div>

      {onExpand && (
        <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
          Ketuk <span className="font-medium text-maroon-vibrant">Perbesar</span> untuk melihat gambar lebih besar
        </p>
      )}

      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  onChange(i);
                }}
                animate={{
                  scale: isActive ? 1.35 : 1,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={cn(
                  "rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique",
                  isActive
                    ? "h-2.5 w-2.5 bg-maroon-vibrant"
                    : "h-2 w-2 bg-[var(--color-border)]"
                )}
                aria-label={`Gambar ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
              />
            );
          })}
        </div>
      )}

      {images.length > 1 && (
        <p className="mt-2 text-center text-xs text-[var(--color-text-muted)] sm:hidden">
          Geser gambar atau ketuk titik di bawah
        </p>
      )}
    </div>
  );
}
