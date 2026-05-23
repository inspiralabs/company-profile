"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Lightbox from "@/components/shared/Lightbox";
import PortfolioImage from "@/components/shared/PortfolioImage";
import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { usePortfolioHighlight } from "@/context/PortfolioHighlightContext";
import {
  portfolioCases,
  portfolioFilters,
  type PortfolioCase,
  type PortfolioCategory,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

function getCardLayoutClass(item: PortfolioCase, items: PortfolioCase[]): string {
  if (item.featured) {
    return "sm:col-span-2 lg:col-span-2";
  }

  const regularItems = items.filter((c) => !c.featured);
  const regularIndex = regularItems.findIndex((c) => c.id === item.id);
  const regularCount = regularItems.length;

  if (regularCount % 3 === 1 && regularIndex === regularCount - 1) {
    return "lg:col-span-2 lg:col-start-2";
  }

  return "";
}

function CaseCard({
  item,
  imageIndex,
  onImageIndexChange,
  onOpenLightbox,
  highlighted,
}: {
  item: PortfolioCase;
  imageIndex: number;
  onImageIndexChange: (index: number) => void;
  onOpenLightbox: () => void;
  highlighted?: boolean;
}) {
  const Icon = item.icon;
  const isCaseStudy = item.contentType === "case-study";

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-shadow duration-500",
        highlighted && "ring-2 ring-gold-bright shadow-lg"
      )}
    >
      <div className="group relative h-36 shrink-0 bg-charcoal/5 sm:h-40">
        <PortfolioImage
          src={item.images[imageIndex]}
          alt={item.name}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <button
          type="button"
          onClick={onOpenLightbox}
          className="absolute inset-0 z-[1] cursor-zoom-in bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique"
          aria-label={`Buka gambar ${item.name}`}
        />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 z-[2] rounded bg-black/45 px-1.5 py-0.5 text-[9px] text-white">
          Perbesar
        </span>
        {item.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageIndexChange(
                  (imageIndex - 1 + item.images.length) % item.images.length
                );
              }}
              className="absolute left-1.5 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-charcoal/90 p-1.5 text-white shadow-md hover:bg-maroon-deep"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageIndexChange((imageIndex + 1) % item.images.length);
              }}
              className="absolute right-1.5 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-charcoal/90 p-1.5 text-white shadow-md hover:bg-maroon-deep"
              aria-label="Gambar berikutnya"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <div className="absolute bottom-1.5 left-1/2 z-20 flex -translate-x-1/2 gap-1">
              {item.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageIndexChange(i);
                  }}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    i === imageIndex ? "bg-gold-bright" : "bg-white/50"
                  )}
                  aria-label={`Gambar ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col p-3 sm:p-4">
        <div className="flex items-start gap-2">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-maroon-vibrant" />
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-maroon-deep">
              {item.name}
            </h3>
            {item.subtitle && (
              <p className="mt-0.5 line-clamp-1 text-[11px] text-[var(--color-text-muted)]">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        {isCaseStudy && item.problem && item.solution && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
            <span className="font-semibold text-maroon-deep">Masalah → Solusi:</span>{" "}
            {item.solution}
          </p>
        )}

        {!isCaseStudy && item.features && (
          <p className="mt-2 line-clamp-2 text-xs text-[var(--color-text-secondary)]">
            <span className="font-semibold text-maroon-deep">{item.features[0].label}:</span>{" "}
            {item.features[0].desc}
          </p>
        )}

        {!isCaseStudy && item.descPoints && (
          <p className="mt-2 line-clamp-2 text-xs text-[var(--color-text-secondary)]">
            {item.descPoints[0]}
          </p>
        )}

        <blockquote className="mt-2.5 border-l-2 border-gold-antique/80 pl-2.5">
          <p className="line-clamp-2 text-xs italic leading-snug text-charcoal">
            {item.review.text}
          </p>
          <footer className="mt-1 line-clamp-1 text-[10px] font-semibold text-maroon-deep">
            {item.review.author}
            {item.review.role && (
              <span className="font-normal text-[var(--color-text-muted)]">
                {" · "}
                {item.review.role}
              </span>
            )}
          </footer>
        </blockquote>
      </div>
    </Card>
  );
}

export default function TestimonialsSection() {
  const { highlightCaseId, setHighlightCaseId } = usePortfolioHighlight();
  const [filter, setFilter] = useState<PortfolioCategory>("all");
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<{
    item: PortfolioCase;
    idx: number;
  } | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? portfolioCases
        : portfolioCases.filter((c) => c.category === filter),
    [filter]
  );

  const getImageIndex = (caseId: string) => imageIndices[caseId] ?? 0;

  const setImageIndex = (caseId: string, index: number) => {
    setImageIndices((prev) => ({ ...prev, [caseId]: index }));
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!highlightCaseId) return;
    const item = portfolioCases.find((c) => c.id === highlightCaseId);
    if (item) setFilter(item.category);
    const t = window.setTimeout(() => setHighlightCaseId(null), 4000);
    return () => window.clearTimeout(t);
  }, [highlightCaseId, setHighlightCaseId]);

  return (
    <SectionWrapper id="portofolio" className="scroll-mt-28" variant="default">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
          Dampak Nyata dari Solusi Kami
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Bukti implementasi produk dan layanan InspiraLabs — dari komunitas perumahan
          dan UMKM hingga pemerintahan desa.
        </p>
      </ScrollReveal>

      <div className="mt-8 flex flex-wrap gap-2">
        {portfolioFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === f.id
                ? "bg-maroon-deep text-white"
                : "border border-[var(--color-border)] bg-surface text-charcoal hover:border-gold-antique"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {filtered.map((item) => (
          <ScrollReveal key={item.id} className={getCardLayoutClass(item, filtered)}>
            <CaseCard
              item={item}
              imageIndex={getImageIndex(item.id)}
              onImageIndexChange={(idx) => setImageIndex(item.id, idx)}
              onOpenLightbox={() =>
                setLightbox({ item, idx: getImageIndex(item.id) })
              }
              highlighted={highlightCaseId === item.id}
            />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
          Belum ada studi kasus untuk kategori ini.
        </p>
      )}

      {lightbox && (
        <Lightbox
          images={lightbox.item.images}
          alt={lightbox.item.name}
          startIndex={lightbox.idx}
          onClose={closeLightbox}
        />
      )}
    </SectionWrapper>
  );
}
