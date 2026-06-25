"use client";

import ProductFreeScrollCarousel from "@/components/products/ProductFreeScrollCarousel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { PRODUCTS } from "@/data/products";

export default function ProductsSection() {
  return (
    <SectionWrapper id="etalase" variant="cream">
      <ScrollReveal>
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-bold text-maroon-vibrant sm:text-4xl">
            Inovasi Siap Pakai yang Telah Teruji
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            Beberapa produk unggulan kami yang siap diimplementasikan - tanpa menunggu
            development dari nol.
          </p>
        </div>
      </ScrollReveal>

      <ProductFreeScrollCarousel products={PRODUCTS} />
    </SectionWrapper>
  );
}
