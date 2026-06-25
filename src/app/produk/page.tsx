import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = buildPageMetadata({
  title: "Produk Digital Siap Pakai",
  description:
    "Produk digital siap pakai dari InspiraLabs: SiJagaAir (EWS Banjir IoT), Amanah Platform, Teras Desa, LMS, Smart POS, dan Sistem Masjid. Beli lisensi atau kustomisasi sesuai kebutuhan.",
  path: "/produk",
});

export default function ProdukPage() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const rest = PRODUCTS.filter((p) => !p.featured);

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            Produk
          </p>
          <h1 className="font-display text-4xl font-bold text-maroon-deep sm:text-5xl">
            Solusi Digital<br />Siap Pakai
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Tidak perlu mulai dari nol. Produk-produk kami sudah terbukti dipakai di lapangan -
            bisa langsung diimplementasikan atau dikustomisasi sesuai kebutuhan spesifik Anda.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Beli Lisensi", "Kustomisasi", "Berlangganan SaaS", "Free Demo"].map((b) => (
              <span key={b} className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-maroon-deep">{b}</span>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-bold text-maroon-deep mb-6">Produk Unggulan</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={`/produk/${p.id}`}
                  className="group flex flex-col rounded-2xl border border-maroon-vibrant/20 bg-maroon-deep overflow-hidden hover:shadow-card-hover transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="rounded-full bg-gold-antique px-3 py-1 text-xs font-bold text-maroon-deep">{p.badge}</span>
                      {p.extraBadge && (
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">{p.extraBadge}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6 text-white">
                    <h3 className="font-display font-bold text-lg group-hover:text-gold-antique transition-colors">{p.name}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed flex-1">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{t}</span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-medium text-gold-antique group-hover:underline">Lihat Detail →</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other Products */}
        {rest.length > 0 && (
          <section className="mb-20">
            <h2 className="font-display text-xl font-bold text-maroon-deep mb-6">Produk Lainnya</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.id}
                  href={`/produk/${p.id}`}
                  className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-surface overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-40 overflow-hidden bg-cream">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-maroon-deep px-3 py-1 text-xs font-bold text-white">{p.badge}</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-display font-bold text-maroon-deep group-hover:text-maroon-vibrant transition-colors leading-tight">{p.name}</h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] flex-1">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-cream px-2.5 py-0.5 text-xs text-maroon-deep">{t}</span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm font-medium text-maroon-vibrant group-hover:underline">Lihat Detail →</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl bg-cream px-8 py-12 text-center">
          <h2 className="font-display text-2xl font-bold text-maroon-deep">
            Tidak ada yang cocok? Kami bangun yang baru.
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            Semua produk kami bisa dikustomisasi, atau kami kembangkan sistem baru dari awal sesuai kebutuhan Anda.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/kontak" className="rounded-full bg-maroon-deep px-8 py-3 font-semibold text-white hover:scale-105 transition-transform">
              Konsultasi Gratis
            </Link>
            <Link href="/survey" className="rounded-full border border-[var(--color-border)] px-8 py-3 font-semibold text-maroon-deep hover:bg-maroon-deep hover:text-white transition-colors">
              Isi Survey Kebutuhan
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
