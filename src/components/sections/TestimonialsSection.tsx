"use client";

import PortfolioTicker from "@/components/portfolio/PortfolioTicker";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { portfolioCases } from "@/data/portfolio";

export default function TestimonialsSection() {
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

      <PortfolioTicker items={portfolioCases} />
    </SectionWrapper>
  );
}
