"use client";

import GeometricPattern from "@/components/shared/GeometricPattern";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { SITE, WA_CTA, trackEvent } from "@/lib/site";

export default function CTASection() {
  return (
    <SectionWrapper variant="maroon" className="relative overflow-hidden">
      <GeometricPattern className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 opacity-80" />
      <GeometricPattern className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 opacity-60" />

      <ScrollReveal className="relative z-10">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Setiap Ide Besar Dimulai dari Langkah Kecil. Mulai Milik Anda Bersama Kami
          Hari Ini.
        </h2>
        <p className="mt-4 max-w-2xl text-white/85">
          Anda tidak harus menjadi korporasi besar untuk memiliki teknologi canggih.
          Kami siap menjadi mitra kolaboratif bagi instansi, bisnis kecil, hingga
          perusahaan rintisan Anda.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="shadow-[0_0_28px_rgba(250,214,74,0.45)]"
          >
            <a
              href={WA_CTA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_whatsapp_click", { location: "final_cta" })}
            >
              Konsultasi via WhatsApp (Gratis)
            </a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            <a href={`mailto:${SITE.email}?subject=Konsultasi%20Proyek%20InspiraLabs`}>
              Kirim Email Proyek Anda
            </a>
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {[
            "Kolaborasi segala ukuran proyek",
            "Konsultan & mentor teknologi",
            "Investasi hari ini, hemat operasional besok",
          ].map((text) => (
            <li
              key={text}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white/90"
            >
              {text}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </SectionWrapper>
  );
}
