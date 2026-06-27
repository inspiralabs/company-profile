"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioCases } from "@/data/portfolio";
import SectionWrapper from "@/components/shared/SectionWrapper";
import ScrollReveal from "@/components/shared/ScrollReveal";

const PREVIEW_COUNT = 6;
const items = portfolioCases.slice(0, PREVIEW_COUNT);

export default function PortfolioPreviewSection() {
  return (
    <SectionWrapper id="portofolio" variant="default" className="!py-10 sm:!py-12 lg:!py-14">
      <ScrollReveal>
        <h2 className="font-display text-display-lg font-bold text-maroon-deep">
          Karya yang Berbicara
        </h2>
        <p className="mt-3 max-w-xl text-[var(--color-text-secondary)]">
          Dari EWS banjir desa hingga platform manajemen sekolah - ini rekam jejak dampak nyata kami.
        </p>
      </ScrollReveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.06}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Link
                href={`/portofolio/${p.id}`}
                className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
              >
                <div className="relative h-44 overflow-hidden bg-cream">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {p.tags.slice(0, 1).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-maroon-deep">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-maroon-deep leading-snug group-hover:text-maroon-vibrant transition-colors">
                    {p.name}
                  </h3>
                  {p.subtitle && (
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{p.subtitle}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/portofolio"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm font-semibold text-maroon-deep transition-all hover:border-maroon-deep hover:bg-maroon-deep hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
        >
          Lihat Semua Portofolio →
        </Link>
      </div>
    </SectionWrapper>
  );
}
