"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { PortfolioCase } from "@/data/portfolio";

export default function PortfolioDetailClient({ item }: { item: Omit<PortfolioCase, "icon"> }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <div className="pb-24 pt-28">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/portofolio" className="hover:text-maroon-vibrant transition-colors">Portofolio</Link>
            <span aria-hidden>/</span>
            <span className="text-maroon-deep font-medium">{item.name}</span>
          </nav>

          {/* Two-column hero */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Left: metadata */}
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-maroon-deep ring-1 ring-[var(--color-border)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-display-lg font-bold text-maroon-deep leading-tight">
                {item.name}
              </h1>
              {item.subtitle && (
                <p className="mt-3 text-lg text-[var(--color-text-muted)]">{item.subtitle}</p>
              )}
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-maroon-vibrant px-4 py-1.5 text-sm font-medium text-maroon-vibrant transition-colors hover:bg-maroon-vibrant hover:text-white"
                >
                  Lihat Live Demo →
                </a>
              )}
            </div>

            {/* Right: hero image */}
            {item.images.length > 0 && (
              <button
                onClick={() => setLightbox(true)}
                aria-label={`Lihat gambar ${item.name}`}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream ring-1 ring-[var(--color-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon-vibrant"
              >
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-maroon-deep/0 transition-colors group-hover:bg-maroon-deep/20">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100" aria-hidden />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Case Study Body ──────────────────────────────────── */}
      <div className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          {/* Problem + Solution — side by side on desktop */}
          {(item.problem || item.solution) && (
            <div className="mb-16 grid gap-8 sm:grid-cols-2 sm:gap-12">
              {item.problem && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-maroon-vibrant">Tantangan</p>
                  <h2 className="mb-3 font-display text-xl font-bold text-maroon-deep">Masalah yang Diselesaikan</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.problem}</p>
                </div>
              )}
              {item.solution && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-maroon-vibrant">Pendekatan</p>
                  <h2 className="mb-3 font-display text-xl font-bold text-maroon-deep">Solusi yang Dibangun</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Results — visual callout */}
          {item.results && item.results.length > 0 && (
            <div className="mb-16">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-maroon-vibrant">Output</p>
              <h2 className="mb-6 font-display text-xl font-bold text-maroon-deep">Hasil & Dampak</h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {item.results.map((r) => (
                  <li key={r} className="flex items-start gap-3 rounded-xl bg-cream p-4 ring-1 ring-[var(--color-border)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-maroon-vibrant" aria-hidden />
                    <span className="text-sm text-[var(--color-text-secondary)] leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Features */}
          {item.features && item.features.length > 0 && (
            <div className="mb-16">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-maroon-vibrant">Kapabilitas</p>
              <h2 className="mb-6 font-display text-xl font-bold text-maroon-deep">Fitur Utama</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {item.features.map((f) => (
                  <div key={f.label} className="rounded-xl border border-[var(--color-border)] p-5">
                    <h3 className="font-semibold text-maroon-deep text-sm mb-1.5">{f.label}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workshop activities */}
          {item.descPoints && item.descPoints.length > 0 && (
            <div className="mb-16">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-maroon-vibrant">Kegiatan</p>
              <h2 className="mb-6 font-display text-xl font-bold text-maroon-deep">Aktivitas</h2>
              <ul className="space-y-3">
                {item.descPoints.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-maroon-vibrant" aria-hidden />
                    <span className="text-[var(--color-text-secondary)] leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── Testimonial — full width maroon block ────────────── */}
      {item.review && (
        <div className="bg-maroon-deep py-14 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-5xl leading-none text-gold-bright mb-6">&ldquo;</p>
            <blockquote className="text-lg leading-relaxed text-white/90 italic mb-8">
              {item.review.text}
            </blockquote>
            <div className="flex flex-col items-center gap-1">
              <p className="font-semibold text-white">{item.review.author}</p>
              {item.review.role && (
                <p className="text-sm text-white/60">{item.review.role}</p>
              )}
              {item.review.company && (
                <p className="text-sm text-white/60">{item.review.company}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">
          <div className="mt-16 flex flex-col items-center gap-6 text-center">
            <h2 className="font-display text-2xl font-bold text-maroon-deep">Ada Proyek Serupa?</h2>
            <p className="text-[var(--color-text-muted)] max-w-md">
              Ceritakan kebutuhan kamu — kami siap bantu dari konsultasi sampai delivery.
            </p>
            <Link
              href="/kontak"
              className="rounded-full bg-maroon-deep px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon-deep focus-visible:ring-offset-2"
            >
              Hubungi Kami
            </Link>
            <Link href="/portofolio" className="text-sm font-medium text-maroon-vibrant hover:underline">
              ← Kembali ke Semua Portofolio
            </Link>
          </div>
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && item.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Tutup lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative max-h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={item.images[0]}
                alt={item.name}
                width={1400}
                height={900}
                className="max-h-[85vh] w-full object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
