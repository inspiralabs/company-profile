"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroVisual from "@/components/shared/HeroVisual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { SITE } from "@/lib/site";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionWrapper
      id="home"
      className="relative min-h-0 overflow-hidden !pb-12 !pt-[6.75rem] sm:!pb-16 sm:!pt-32 sm:min-h-[80vh] lg:!pt-36"
      variant="default"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(185,42,28,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge
              variant="default"
              className="mb-5 max-w-full text-left text-[11px] leading-snug sm:mb-6 sm:text-sm"
            >
              {SITE.tagline}
            </Badge>
          </motion.div>

          <motion.div
            className="mb-6 lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.08 }}
          >
            <HeroVisual />
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.1 }}
            className="font-display text-3xl font-bold leading-tight text-balance text-maroon-deep sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
          >
            Mitra Solusi{" "}
            <span className="text-gradient-gold">Digital</span> Anda
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.2 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:mt-6 sm:text-lg"
          >
            Mitra digitalisasi untuk UMKM yang ingin naik kelas, institusi pendidikan
            yang ingin berinovasi, dan perusahaan yang membutuhkan otomatisasi. Kami
            membantu Anda bertransformasi melalui rekayasa perangkat lunak, inovasi
            IoT, desain visual, dan pelatihan teknologi yang memberdayakan.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.3 }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full shadow-[0_0_24px_rgba(250,214,74,0.35)] sm:w-auto"
            >
              <a href="#layanan">
                Jelajahi Solusi Kami
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.4 }}
            className="mt-5 text-sm text-[var(--color-text-muted)] sm:mt-6"
          >
          </motion.p>
        </div>

        <motion.div
          className="hidden lg:col-span-5 lg:block"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.15 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
