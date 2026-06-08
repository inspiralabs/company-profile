"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PortfolioScalingCarousel from "@/components/portfolio/PortfolioScalingCarousel";
import Lightbox from "@/components/shared/Lightbox";
import type { PortfolioCase } from "@/data/portfolio";
import {
  formatReviewAttribution,
  getPortfolioDescription,
} from "@/lib/portfolio-content";

type PortfolioDetailModalProps = {
  item: PortfolioCase | null;
  startImageIndex?: number;
  onClose: () => void;
};

export default function PortfolioDetailModal({
  item,
  startImageIndex = 0,
  onClose,
}: PortfolioDetailModalProps) {
  const [imageIndex, setImageIndex] = useState(startImageIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (item) {
      setImageIndex(startImageIndex);
      setLightboxOpen(false);
    }
  }, [item, startImageIndex]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose, lightboxOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 sm:items-center sm:p-4"
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label={`Detail ${item.name}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl ring-1 ring-gold-antique/25 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[var(--color-border)] px-4 py-3 sm:px-5">
              <div className="min-w-0 pr-3">
                <h3 className="font-display text-base font-bold text-maroon-deep sm:text-lg">
                  {item.name}
                </h3>
                {item.subtitle && (
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon-deep text-white hover:bg-maroon-vibrant"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-5 sm:px-6">
              <PortfolioScalingCarousel
                images={item.images}
                alt={item.name}
                activeIndex={imageIndex}
                onChange={setImageIndex}
                onExpand={() => setLightboxOpen(true)}
              />

              {lightboxOpen && (
                <Lightbox
                  images={item.images}
                  alt={item.name}
                  startIndex={imageIndex}
                  onClose={() => setLightboxOpen(false)}
                  onIndexChange={setImageIndex}
                />
              )}

              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-maroon-vibrant hover:underline"
                >
                  Kunjungi website resmi
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {getPortfolioDescription(item)}
              </p>

              <blockquote className="mt-6 rounded-xl border-l-4 border-gold-antique bg-cream/80 p-4">
                <p className="text-sm italic leading-relaxed text-charcoal">
                  &ldquo;{item.review.text}&rdquo;
                </p>
                <footer className="mt-3 text-xs font-semibold text-maroon-deep">
                  {formatReviewAttribution(item.review)}
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
