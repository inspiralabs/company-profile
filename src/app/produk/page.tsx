import type { Metadata } from "next";
import Link from "next/link";
import { Cloud, KeyRound, Play, Settings2 } from "lucide-react";
import ProductFeaturedCard from "@/components/produk/ProductFeaturedCard";
import ProductListItem from "@/components/produk/ProductListItem";
import { buildPageMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = buildPageMetadata({
  title: "Produk Digital Siap Pakai",
  description:
    "Produk digital siap pakai dari InspiraLabs: SiJagaAir (EWS Banjir IoT), Amanah Platform, Teras Desa, LMS, Smart POS, dan Sistem Masjid. Beli lisensi atau kustomisasi sesuai kebutuhan.",
  path: "/produk",
});

const models = [
  { icon: KeyRound, label: "Beli lisensi", desc: "Kepemilikan penuh, sekali bayar" },
  { icon: Settings2, label: "Kustomisasi", desc: "Disesuaikan proses Anda" },
  { icon: Cloud, label: "Berlangganan SaaS", desc: "Mulai cepat, bayar bulanan" },
  { icon: Play, label: "Demo gratis", desc: "Coba sebelum beli" },
];

export default function ProdukPage() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const rest = PRODUCTS.filter((p) => !p.featured);

  return (
    <div className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">
        {/* Hero */}
        <header className="mb-8">
          <h1 className="font-display text-display-xl font-bold text-maroon-deep">
            Solusi digital siap pakai
          </h1>
          <p className="mt-4 max-w-6xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            Produk kami sudah terbukti dipakai di lapangan jadi bisa langsung diimplementasikan
            atau dikustomisasi sesuai kebutuhan spesifik Anda.
          </p>
        </header>

        {/* Cara kerja sama — full width, key section */}
        <section className="mb-8 rounded-2xl bg-cream px-6 py-7 sm:px-8">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-maroon-vibrant">
            Cara kerja sama
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {models.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-xl bg-surface p-3 shadow-card sm:p-5">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-maroon-deep/[0.07]">
                  <Icon className="size-5 text-maroon-vibrant" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="font-bold text-maroon-deep">{label}</p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {featured.length > 0 && (
          <section className="mb-8 border-t border-[var(--color-border)] pt-7">
            <div className="mb-5 max-w-2xl">
              <h2 className="font-display text-display-md font-bold text-maroon-deep">
                Produk unggulan
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Solusi yang paling sering diimplementasikan dari pemerintahan desa hingga institusi pendidikan.
              </p>
            </div>
            {/* Mobile/tablet: horizontal scroll */}
            <div className="lg:hidden -mx-4 overflow-x-auto sm:-mx-6">
              <div className="flex w-max gap-4 px-4 pb-3 sm:px-6">
                {featured.map((product) => (
                  <div key={product.id} className="w-[85vw] shrink-0 sm:w-[70vw]">
                    <ProductFeaturedCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop: stacked */}
            <div className="hidden lg:block space-y-4">
              {featured.map((product) => (
                <ProductFeaturedCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {rest.length > 0 && (
          <section className="border-t border-[var(--color-border)] pt-7">
            <div className="mb-5">
              <h2 className="font-display text-display-md font-bold text-maroon-deep">
                Katalog lengkap
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {rest.length} produk untuk UMKM, pendidikan, dan komunitas.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {rest.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 rounded-2xl bg-cream px-6 py-10 text-center sm:px-8 sm:py-12">
          <h2 className="font-display text-display-md font-bold text-maroon-deep">
            Tidak ada yang cocok? Kami bangun yang baru.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
            Semua produk bisa dikustomisasi, atau kami kembangkan sistem baru dari awal sesuai kebutuhan Anda.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/kontak"
              className="inline-flex min-h-11 items-center rounded-full bg-maroon-deep px-8 py-2.5 font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
            >
              Konsultasi gratis
            </Link>
            <Link
              href="/survey"
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-8 py-2.5 font-semibold text-maroon-deep transition-colors hover:bg-maroon-deep hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
            >
              Isi survey kebutuhan
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
