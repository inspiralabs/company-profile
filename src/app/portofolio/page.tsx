import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = buildPageMetadata({
  title: "Portofolio",
  description:
    "Lihat hasil kerja InspiraLabs — website, aplikasi mobile, sistem IoT, dan produk digital yang telah dibangun untuk klien di seluruh Indonesia. Dari UMKM hingga pemerintahan desa.",
  path: "/portofolio",
});

export default function PortofolioPage() {
  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            Portofolio
          </p>
          <h1 className="font-display text-4xl font-bold text-maroon-deep sm:text-5xl">
            Karya yang Berbicara<br />untuk Diri Sendiri
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Dari EWS banjir desa hingga platform manajemen sekolah — setiap proyek adalah
            solusi nyata untuk masalah nyata.
          </p>
        </div>

        <PortfolioGrid />

        {/* CTA */}
        <section className="mt-20 rounded-2xl bg-maroon-deep px-8 py-12 text-center text-white">
          <h2 className="font-display text-3xl font-bold">Ada Proyek Serupa?</h2>
          <p className="mt-3 text-white/80">
            Ceritakan kebutuhan Anda — kami rekomendasikan solusi terbaik.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/kontak"
              className="rounded-full bg-white px-8 py-3 font-semibold text-maroon-deep hover:scale-105 transition-transform"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/survey"
              className="rounded-full border border-white/40 px-8 py-3 font-semibold text-white hover:bg-white/10"
            >
              Isi Survey
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
