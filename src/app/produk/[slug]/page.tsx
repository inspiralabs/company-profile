import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = PRODUCTS.find((p) => p.id === slug);
  if (!item) return {};
  return buildPageMetadata({
    title: item.name,
    description: item.description,
    path: `/produk/${slug}`,
  });
}

export default async function ProdukDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = PRODUCTS.find((p) => p.id === slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: `${SITE.url}${item.image}`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": `${SITE.url}/#organization` },
    url: `${SITE.url}/produk/${slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IDR",
      url: `${SITE.url}/kontak`,
      description: "Hubungi kami untuk penawaran harga",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/produk" className="hover:text-maroon-vibrant">Produk</Link>
            <span>/</span>
            <span className="text-maroon-deep font-medium">{item.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-full bg-maroon-deep px-3 py-1 text-xs font-bold text-white">{item.badge}</span>
                {item.tags.map((t) => (
                  <span key={t} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-maroon-deep">{t}</span>
                ))}
              </div>
              <h1 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">{item.name}</h1>
              <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[var(--color-border)] px-8 py-3 font-semibold text-maroon-deep hover:bg-cream transition-colors"
                  >
                    Lihat Demo →
                  </a>
                )}
                <Link
                  href="/kontak"
                  className="rounded-full bg-maroon-deep px-8 py-3 font-semibold text-white hover:scale-105 transition-transform"
                >
                  Saya Tertarik - Hubungi Kami
                </Link>
              </div>
            </div>

            <div className="relative h-72 overflow-hidden rounded-2xl bg-cream lg:h-80">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
          </div>

          {/* Pricing model */}
          {!item.noPricing && <section className="mb-16 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-border)] bg-surface p-6">
              <h2 className="font-display font-bold text-maroon-deep mb-2">Beli Putus</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Kepemilikan penuh, pembayaran sekali. Cocok untuk yang ingin kontrol penuh atas sistem.
              </p>
            </div>
            <div className="rounded-2xl border border-maroon-vibrant/30 bg-maroon-deep/5 p-6">
              <h2 className="font-display font-bold text-maroon-deep mb-2">Berlangganan SaaS</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Investasi awal rendah, bayar bulanan atau tahunan.
                Termasuk update, support, dan hosting. Cocok untuk yang ingin mulai cepat.
              </p>
            </div>
          </section>}

          {/* CTA */}
          <section className="rounded-2xl bg-maroon-deep px-8 py-12 text-center text-white">
            <h2 className="font-display text-3xl font-bold">Tertarik dengan {item.name}?</h2>
            <p className="mt-3 text-white/80">
              Hubungi tim kami untuk demo gratis, penawaran harga, dan diskusi kustomisasi.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/kontak" className="rounded-full bg-white px-8 py-3 font-semibold text-maroon-deep hover:scale-105 transition-transform">
                Hubungi Kami
              </Link>
              <Link href="/produk" className="rounded-full border border-white/40 px-8 py-3 font-semibold text-white hover:bg-white/10">
                Lihat Produk Lain
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
