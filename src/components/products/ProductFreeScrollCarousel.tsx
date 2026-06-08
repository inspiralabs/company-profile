"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProductDetailModal from "@/components/products/ProductDetailModal";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const DRAG_CLICK_THRESHOLD = 10;

type ProductFreeScrollCarouselProps = {
  products: Product[];
};

export default function ProductFreeScrollCarousel({
  products,
}: ProductFreeScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const suppressClickRef = useRef(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [selected, setSelected] = useState<Product | null>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      const overflow = track.scrollWidth - container.offsetWidth;
      setConstraints({ left: overflow > 0 ? -overflow : 0, right: 0 });
      if (overflow <= 0) x.set(0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products, x]);

  const handleProductActivate = (product: Product) => {
    if (suppressClickRef.current) return;
    setSelected(product);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative -mx-4 mt-8 overflow-hidden sm:-mx-6 sm:mt-10 lg:-mx-8"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.08}
          dragMomentum
          dragPropagation={false}
          style={{ x }}
          onDragStart={() => {
            suppressClickRef.current = false;
          }}
          onDrag={(_, info) => {
            if (
              Math.abs(info.offset.x) > DRAG_CLICK_THRESHOLD ||
              Math.abs(info.offset.y) > DRAG_CLICK_THRESHOLD
            ) {
              suppressClickRef.current = true;
            }
          }}
          onDragEnd={() => {
            window.setTimeout(() => {
              suppressClickRef.current = false;
            }, 120);
          }}
          className="flex cursor-grab gap-4 px-4 active:cursor-grabbing sm:gap-5 sm:px-6 lg:gap-6 lg:px-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              role="button"
              tabIndex={0}
              onClick={() => handleProductActivate(product)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleProductActivate(product);
                }
              }}
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-2xl bg-charcoal/5 text-left shadow-md ring-1 ring-[var(--color-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique",
                "h-[min(62vw,280px)] w-[min(72vw,300px)] sm:h-[300px] sm:w-[280px] lg:h-[320px] lg:w-[300px]",
                product.featured && "ring-2 ring-gold-antique/60"
              )}
              aria-label={`Lihat detail ${product.name}`}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={85}
                loading="lazy"
                className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 72vw, 300px"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent p-4 pt-16">
                <p className="line-clamp-2 font-display text-sm font-semibold leading-snug text-white sm:text-base">
                  {product.name}
                </p>
                <p className="mt-1 text-[11px] text-white/75 sm:text-xs">
                  Klik untuk detail
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
        Geser untuk melihat produk lainnya
      </p>

      <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
