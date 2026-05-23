"use client";

import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { SURVEY_PROMO } from "@/data/copy";

export default function SurveyPromoSection() {
  return (
    <SectionWrapper id="survey-kebutuhan" variant="default" className="scroll-mt-28">
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

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-bright/40 bg-gold-bright/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
                  <Lightbulb className="h-3 w-3" />
                  {SURVEY_PROMO.eyebrow}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {SURVEY_PROMO.headline}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                  {SURVEY_PROMO.body}
                </p>
                <p className="mt-3 text-xs text-white/60">{SURVEY_PROMO.trust}</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-col items-stretch gap-4 sm:items-start lg:min-w-[240px]"
              >
                <Button
                  asChild
                  size="lg"
                  className="group w-full bg-gold-bright text-maroon-deep hover:bg-gold-bright/90 sm:w-auto"
                >
                  <Link href="/survey">
                    {SURVEY_PROMO.cta}
                    <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-maroon-deep/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
