"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { usePortfolioHighlight } from "@/context/PortfolioHighlightContext";
import { cn } from "@/lib/utils";

const trustPartners = [
  { id: "desa-bojongkulur", name: "Desa Bojongkulur", caseId: "sijagaair" },
  { id: "labschool-cibubur", name: "Labschool Cibubur", caseId: "kelas-seni" },
  { id: "sdit-depok", name: "SDIT Depok", caseId: "workshop-iot" },
] as const;

import { cdn } from "@/lib/cdn";

/** Rasio asli `public/images/portfolio/sijagaair-1.png` (1627×778 px) */
const SIJAGAAIR_HIGHLIGHT_IMAGE = {
  src: cdn("/images/portfolio/sijagaair-1.png"),
  width: 1627,
  height: 778,
} as const;

export default function PartnershipSection() {
  const { highlightCaseId, scrollToPortfolio } = usePortfolioHighlight();
  const [activePartnerId, setActivePartnerId] = useState<string>("desa-bojongkulur");

  const handlePartnerClick = (partnerId: string, caseId: string) => {
    setActivePartnerId(partnerId);
    scrollToPortfolio(caseId);
  };

  return (
    <SectionWrapper id="kemitraan" variant="default">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
          Dipercaya Membangun Ekosistem Digital dari Komunitas Lokal hingga Enterprise
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
          Kami bangga memulai langkah dari tempat di mana dampak digitalisasi paling
          dibutuhkan. Meskipun kami terus berkembang, kualitas kerja dan kredibilitas
          InspiraLabs dirancang untuk memenuhi standar industri global teratas.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="relative mt-12 grid overflow-hidden rounded-2xl border border-[var(--color-border)] bg-cream lg:grid-cols-5 lg:items-stretch">
          <div className="relative aspect-[1627/778] w-full max-h-[min(52vw,260px)] bg-charcoal/[0.03] sm:max-h-[280px] lg:col-span-3 lg:aspect-auto lg:h-full lg:max-h-none lg:min-h-0">
            <Image
              src={SIJAGAAIR_HIGHLIGHT_IMAGE.src}
              alt="Dashboard SiJagaAir monitoring tinggi muka air banjir Desa Bojong Kulur"
              fill
              className="object-contain object-center p-4 sm:p-5"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="relative flex flex-col justify-center border-t border-[var(--color-border)] p-6 lg:col-span-2 lg:border-t-0 lg:border-l lg:p-8 xl:p-10">
            <span
              className="pointer-events-none absolute -left-2 top-4 font-display text-[7rem] leading-none text-gold-antique/25"
              aria-hidden
            >
              &ldquo;
            </span>
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-antique">
              Sorotan Kemitraan
            </span>
            <h3 className="font-display text-2xl font-bold text-maroon-deep">
              Pemerintah Desa Bojongkulur - SiJagaAir
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Menjembatani inovasi teknologi ke sektor publik melalui pengembangan
              Early Warning System (EWS) Banjir - sistem SiJagaAir.
            </p>
            <blockquote className="relative mt-6 border-l-4 border-gold-antique pl-4">
              <Quote className="mb-2 h-5 w-5 text-gold-antique" />
              <p className="text-sm italic text-charcoal">
                Notifikasi WA langsung masuk ke WhatsApp Channel desa Bojong Kulur
                saat muka air naik. Warga kini bisa bersiap jauh lebih cepat sebelum
                banjir tiba.
              </p>
              <footer className="mt-2 text-sm font-semibold text-maroon-deep">
                Firman Riansyah, S.E.
                <span className="block font-normal text-[var(--color-text-secondary)]">
                  Kepala Desa Bojong Kulur, Gunung Putri, Bogor
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
