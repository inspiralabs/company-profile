"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { portfolioCases } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const testimonials = portfolioCases.map((p) => ({
  text: p.review.text,
  author: p.review.author,
  role: p.review.role ?? "",
  project: p.name.split("—")[0].split("–")[0].split(":")[0].trim(),
  category: p.category,
}));

const CATEGORY_LABELS: Record<string, string> = {
  iot: "IoT",
  software: "Software",
  design: "Desain",
  pelatihan: "Pelatihan",
};

function Initials({ name }: { name: string }) {
  const parts = name.replace(/,.*/, "").trim().split(" ");
  const letters = parts
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-maroon-deep font-display text-sm font-bold text-white"
    >
      {letters}
    </span>
  );
}

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIdx((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    []
  );

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => go(1), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, go]);

  const t = testimonials[idx];

  return (
    <SectionWrapper id="testimoni" variant="cream">
      <ScrollReveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
          Testimoni Klien
        </p>
        <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
          Bukan Janji. Ini Buktinya.
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Dari pemerintahan desa, sekolah, hingga komunitas perumahan - kepercayaan
          mereka adalah alasan kami terus bergerak.
        </p>
      </ScrollReveal>

      <div
        className="mt-12 mx-auto max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Quote card */}
        <div className="relative rounded-2xl border border-[var(--color-border)] bg-surface px-8 py-10 shadow-card">
          {/* Decorative quote mark */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-5 left-8 font-display text-[6rem] leading-none text-maroon-vibrant/15"
          >
            &ldquo;
          </span>

          <span className="mb-4 inline-block rounded-full bg-maroon-deep/8 px-3 py-1 text-xs font-semibold text-maroon-deep">
            {CATEGORY_LABELS[t.category] ?? t.category} · {t.project}
          </span>

          <blockquote className="text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          <div className="mt-6 flex items-center gap-3">
            <Initials name={t.author} />
            <div>
              <p className="font-semibold text-maroon-deep">{t.author}</p>
              {t.role && (
                <p className="text-sm text-[var(--color-text-muted)]">{t.role}</p>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Testimoni ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === idx ? "w-6 bg-maroon-deep" : "w-2 bg-[var(--color-border)]"
                )}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Sebelumnya"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-maroon-deep hover:text-maroon-deep"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Berikutnya"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-maroon-deep hover:text-maroon-deep"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
