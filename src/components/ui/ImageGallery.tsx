"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const prevSlide = () => setSlide((i) => (i - 1 + images.length) % images.length);
  const nextSlide = () => setSlide((i) => (i + 1) % images.length);

  return (
    <>
      {/* ── Mobile: carousel (< sm) ── */}
      <div className="sm:hidden">
        <button
          className="relative w-full overflow-hidden rounded-xl bg-cream"
          onClick={() => setLightbox(slide)}
          aria-label={`Lihat gambar ${slide + 1} dari ${name}`}
        >
          <div className="aspect-video relative">
            <Image
              src={images[slide]}
              alt={`${name} screenshot ${slide + 1}`}
              fill
              className="object-contain p-2"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-maroon-deep/0 transition-colors hover:bg-maroon-deep/10">
            <ZoomIn className="h-6 w-6 text-white opacity-0 drop-shadow transition-opacity hover:opacity-100" />
          </div>
        </button>

        {images.length > 1 && (
          <>
            <div className="relative -mt-12 flex items-center justify-between px-3 pb-3">
              <button
                onClick={prevSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm text-maroon-deep"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Gambar ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === slide ? "w-4 bg-maroon-deep" : "w-1.5 bg-[var(--color-border)]"}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm text-maroon-deep"
                aria-label="Berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="mt-1 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setSlide(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${i === slide ? "border-maroon-deep" : "border-transparent"}`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Desktop: grid with lightbox (≥ sm) ── */}
      <div className="hidden sm:grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setLightbox(i)}
            className={`group relative overflow-hidden rounded-xl bg-cream ${i === 0 ? "sm:col-span-2" : ""}`}
            aria-label={`Lihat gambar ${i + 1} dari ${name}`}
          >
            <div className={`relative ${i === 0 ? "aspect-video" : "aspect-[4/3]"}`}>
              <Image
                src={src}
                alt={`${name} screenshot ${i + 1}`}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-maroon-deep/0 transition-colors group-hover:bg-maroon-deep/20">
              <ZoomIn className="h-7 w-7 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox (both mobile & desktop) ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-xs text-white">
              {lightbox + 1} / {images.length}
            </span>

            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative max-h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox]}
                alt={`${name} screenshot ${lightbox + 1}`}
                width={1400}
                height={900}
                className="max-h-[85vh] w-full object-contain"
                unoptimized
              />
            </motion.div>

            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                aria-label="Berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
