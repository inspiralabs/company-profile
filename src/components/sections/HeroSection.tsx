"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroVisual from "@/components/shared/HeroVisual";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import TypewriterText from "@/components/ui/TypewriterText";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionWrapper
      id="home"
      className="relative min-h-0 overflow-hidden !pb-8 !pt-[6.75rem] sm:!pb-10 sm:!pt-32 lg:!pt-36"
      variant="default"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--color-maroon-vibrant) 8%, transparent) 0%, transparent 60%)",
        }}
      />
      <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
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
            className="font-display text-display-xl font-bold text-maroon-deep"
          >
            <TypewriterText />
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.2 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:mt-6 sm:text-lg"
          >
            Kami merancang, membangun, dan mendampingi solusi digital — dari aplikasi dan IoT
            hingga branding dan pelatihan — agar investasi teknologi Anda memberi dampak nyata.
            Dipercaya UMKM, institusi pendidikan, pemerintah desa, hingga perusahaan di Bogor
            dan sekitarnya.
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
              <a href="/layanan">
                Jelajahi Solusi Kami
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

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
