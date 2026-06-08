"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type LightboxProps = {
  images: string[];
  alt: string;
  startIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  zIndexClass?: string;
};

const controlBtn =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon-deep text-white shadow-md transition-colors hover:bg-maroon-vibrant focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2";

export default function Lightbox({
  images,
  alt,
  startIndex,
  onClose,
  onIndexChange,
  zIndexClass = "z-[110]",
}: LightboxProps) {
  const [idx, setIdx] = useState(startIndex);

  const goPrev = useCallback(() => {
    setIdx((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setIdx((i) => (i + 1) % images.length);
  }, [images.length]);

  const goTo = useCallback((index: number) => {
    setIdx(index);
  }, []);

  useEffect(() => {
    setIdx(startIndex);
  }, [startIndex]);

  useEffect(() => {
    onIndexChange?.(idx);
  }, [idx, onIndexChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black/75 p-3 sm:p-6",
        zIndexClass
      )}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`Galeri ${alt}`}
    >
      <div
        className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-cream shadow-[0_24px_64px_rgba(0,0,0,0.35)] ring-1 ring-gold-antique/25"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — judul & tutup dalam satu panel */}
        <div className="flex items-start gap-3 border-b border-[var(--color-border)] bg-surface px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 font-display text-sm font-semibold text-maroon-deep sm:text-base">
              {alt}
            </p>
            {images.length > 1 && (
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Gambar {idx + 1} dari {images.length}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={cn(controlBtn, "h-9 w-9 shrink-0")}
            aria-label="Tutup galeri"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Area gambar + navigasi di dalam frame */}
        <div className="relative bg-[#e5e0d6] px-3 py-4 sm:px-5 sm:py-5">
          <div className="relative mx-auto aspect-[16/10] w-full max-h-[min(70vh,520px)] overflow-hidden rounded-xl bg-surface ring-1 ring-black/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${alt}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[idx]}
                  alt={`${alt} — gambar ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 896px) 90vw, 896px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/25 to-transparent sm:w-20"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/25 to-transparent sm:w-20"
                  aria-hidden
                />
                <button
                  type="button"
                  className={cn(
                    controlBtn,
                    "absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 sm:flex sm:h-10 sm:w-10"
                  )}
                  onClick={goPrev}
                  aria-label="Gambar sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  className={cn(
                    controlBtn,
                    "absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 sm:flex sm:h-10 sm:w-10"
                  )}
                  onClick={goNext}
                  aria-label="Gambar berikutnya"
                >
                  <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer — navigasi mobile + indikator */}
        {images.length > 1 && (
          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] bg-surface px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between gap-3 sm:hidden">
              <button type="button" className={controlBtn} onClick={goPrev} aria-label="Sebelumnya">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                Geser untuk melihat lainnya
              </span>
              <button type="button" className={controlBtn} onClick={goNext} aria-label="Berikutnya">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === idx
                      ? "w-6 bg-maroon-vibrant"
                      : "w-2 bg-[var(--color-border)] hover:bg-gold-antique"
                  )}
                  aria-label={`Ke gambar ${i + 1}`}
                  aria-current={i === idx ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        )}

        <p className="border-t border-[var(--color-border)] bg-cream px-4 py-2 text-center text-[10px] text-[var(--color-text-muted)] sm:text-xs">
          Klik di luar panel atau tekan Esc untuk menutup
        </p>
      </div>
    </div>,
    document.body
  );
}
