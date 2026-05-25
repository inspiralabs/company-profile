"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { SITE, WA_CTA, trackEvent } from "@/lib/site";

export default function CTASection() {
  return (
    <SectionWrapper variant="default">
      <ScrollReveal>
        <div className="rounded-[2rem] bg-black/[0.03] p-2 ring-1 ring-gold-antique/25">
          <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-gradient-to-br from-maroon-deep via-maroon-vibrant to-maroon-deep px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-bright/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gold-antique/15 blur-2xl"
              aria-hidden
            />

            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Setiap Ide Besar Dimulai dari Langkah Kecil.{" "}
                <span className="text-gold-bright">Mulai Milik Anda Bersama Kami Hari Ini.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                Anda tidak harus menjadi korporasi besar untuk memiliki teknologi canggih.
                Kami siap menjadi mitra kolaboratif bagi instansi, bisnis kecil, hingga
                perusahaan rintisan Anda.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group w-full bg-gold-bright text-maroon-deep hover:bg-gold-bright/90 sm:w-auto"
                >
                  <a
                    href={WA_CTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("cta_whatsapp_click", { location: "final_cta" })}
                  >
                    Mulai Diskusi via WhatsApp
                    <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-maroon-deep/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto"
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
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/80"
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
