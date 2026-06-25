"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioCases, portfolioFilters, type PortfolioCategory } from "@/data/portfolio";

const PAGE_SIZE = 6;

export default function PortfolioGrid() {
  const [active, setActive] = useState<PortfolioCategory>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered =
    active === "all" ? portfolioCases : portfolioCases.filter((p) => p.category === active);

  function handleFilter(id: PortfolioCategory) {
    setActive(id);
    setVisible(PAGE_SIZE);
  }

  const shown = filtered.slice(0, visible);

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {portfolioFilters.map((f) => {
          const count = f.id === "all" ? portfolioCases.length : portfolioCases.filter((p) => p.category === f.id).length;
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => handleFilter(f.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-maroon-deep text-white"
                  : "border border-[var(--color-border)] bg-surface text-[var(--color-text-secondary)] hover:border-maroon-deep hover:text-maroon-deep"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Link
            key={p.id}
            href={`/portofolio/${p.id}`}
            className="group rounded-2xl border border-[var(--color-border)] bg-surface overflow-hidden transition-all hover:shadow-card-hover hover:-translate-y-1"
          >
            <div className="relative h-48 bg-cream overflow-hidden">
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {p.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-maroon-deep">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h2 className="font-display font-bold text-maroon-deep leading-tight group-hover:text-maroon-vibrant transition-colors">
                {p.name}
              </h2>
              {p.subtitle && (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{p.subtitle}</p>
              )}
              {p.problem && (
                <p className="mt-3 text-sm text-[var(--color-text-secondary)] line-clamp-2">
                  {p.problem}
                </p>
              )}
              {p.review && (
                <div className="mt-4 rounded-lg bg-cream p-3">
                  <p className="text-xs italic text-[var(--color-text-secondary)] line-clamp-2">
                    "{p.review.text}"
                  </p>
                  <p className="mt-1 text-xs font-medium text-maroon-deep">— {p.review.author}</p>
                </div>
              )}
              <p className="mt-4 text-sm font-medium text-maroon-vibrant group-hover:underline">
                Lihat Detail →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-[var(--color-text-muted)]">
          Belum ada proyek di kategori ini.
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm font-semibold text-maroon-deep transition-all hover:border-maroon-deep hover:bg-maroon-deep hover:text-white"
          >
            Tampilkan Lebih ({filtered.length - visible} proyek lagi)
          </button>
        </div>
      )}
    </>
  );
}
