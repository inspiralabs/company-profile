"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";

type ProductDetailModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label={`Detail ${product.name}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl ring-1 ring-gold-antique/25 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full shrink-0 bg-charcoal/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={90}
                loading="eager"
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/80 text-white shadow-md hover:bg-maroon-deep"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="bright">{product.badge}</Badge>
                {product.extraBadge && (
                  <Badge variant="maroon">{product.extraBadge}</Badge>
                )}
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-maroon-deep sm:text-2xl">
                {product.name}
              </h3>

              {product.website && (
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-maroon-vibrant hover:underline"
                >
                  Kunjungi website resmi
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {product.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
