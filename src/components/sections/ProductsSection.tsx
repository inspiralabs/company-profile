"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductCardImage from "@/components/shared/ProductCardImage";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { PRODUCTS } from "@/data/copy";
import { cn } from "@/lib/utils";

const CARD_WIDTH = "w-[min(100%,300px)] sm:w-[300px] lg:w-[340px]";

export default function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <SectionWrapper id="etalase" variant="cream">
      <ScrollReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-3xl font-bold text-maroon-vibrant sm:text-4xl">
              Inovasi Siap Pakai yang Telah Teruji
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              Beberapa produk unggulan kami yang siap diimplementasikan — tanpa menunggu
              development dari nol.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "rounded-full border border-[var(--color-border)] p-2 transition-colors",
                canScrollLeft
                  ? "hover:border-gold-antique hover:bg-gold-bright/10"
                  : "cursor-not-allowed opacity-40"
              )}
              aria-label="Produk sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "rounded-full border border-[var(--color-border)] p-2 transition-colors",
                canScrollRight
                  ? "hover:border-gold-antique hover:bg-gold-bright/10"
                  : "cursor-not-allowed opacity-40"
              )}
              aria-label="Produk berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-[var(--color-text-muted)] md:hidden">
          Geser ke kanan untuk melihat produk lainnya →
        </p>
      </ScrollReveal>

      <div
        ref={scrollRef}
        className="mt-6 flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-thin sm:mt-10"
      >
        {PRODUCTS.map((p, i) => (
          <ScrollReveal
            key={p.id}
            delay={i * 0.05}
            className={cn("flex shrink-0 snap-start", CARD_WIDTH)}
          >
            <Card
              className={cn(
                "flex h-full w-full flex-col overflow-hidden",
                p.featured && "ring-2 ring-gold-antique/50"
              )}
            >
              <ProductCardImage productId={p.id} name={p.name} image={p.image} />
              <div className="flex min-h-[220px] flex-1 flex-col p-4 sm:min-h-[240px] sm:p-5">
                <div className="flex min-h-[1.75rem] flex-wrap items-start gap-2">
                  <Badge variant="bright">{p.badge}</Badge>
                  {p.extraBadge && <Badge variant="maroon">{p.extraBadge}</Badge>}
                </div>
                <h3 className="mt-3 line-clamp-2 font-display text-base font-semibold text-maroon-deep sm:text-lg">
                  {p.name}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {p.desc}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                {p.link ? (
                  <Link
                    href={p.link}
                    className="mt-3 text-sm font-medium text-maroon-vibrant hover:underline"
                  >
                    Lihat studi kasus →
                  </Link>
                ) : (
                  <span className="mt-3 block min-h-[1.25rem]" aria-hidden />
                )}
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
