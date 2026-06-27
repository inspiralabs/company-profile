import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Product } from "@/data/products";
import { PRODUCTS, getProductModelSection } from "@/data/products";
import ProductListItem from "@/components/produk/ProductListItem";

function productWebsiteLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname === "/" ? "" : parsed.pathname;
    return `${parsed.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return url;
  }
}

const ctaPrimaryClass =
  "inline-flex min-h-11 items-center rounded-full bg-maroon-deep px-8 py-2.5 font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2";

const ctaSecondaryClass =
  "inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-8 py-2.5 font-semibold text-maroon-deep transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2";

type ProductDetailLayoutProps = {
  product: Product;
};

export default function ProductDetailLayout({ product }: ProductDetailLayoutProps) {
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const shortName = product.name.split(":")[0].trim();
  const modelSection = getProductModelSection(product);

  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)]"
        >
          <Link
            href="/produk"
            className="rounded-sm hover:text-maroon-vibrant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
          >
            Produk
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-maroon-deep">{shortName}</span>
        </nav>

        <header className="mb-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-maroon-deep px-3 py-1 text-xs font-bold text-white">
                  {product.badge}
                </span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-maroon-deep"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 font-display text-display-lg font-bold text-maroon-deep text-balance">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {product.description}
              </p>

              {product.website && (
                <p className="mt-3">
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-1.5 text-sm font-medium text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="break-all">{productWebsiteLabel(product.website)}</span>
                  </a>
                </p>
              )}

              {product.id === "sijagaair" && (
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                  <Link
                    href="/portofolio/sijagaair"
                    className="font-medium text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm"
                  >
                    Baca studi kasus implementasi di Desa Bojong Kulur
                  </Link>
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/kontak" className={ctaPrimaryClass}>
                  Saya tertarik, hubungi kami
                </Link>
                {product.website && (
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaSecondaryClass}
                  >
                    Lihat live demo
                    <ExternalLink className="ml-1.5 h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>

              <div className="mt-6 border-t border-[var(--color-border)] pt-5">
                <p className="text-sm font-semibold text-maroon-deep">
                  {modelSection.title}
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {modelSection.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-vibrant" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-cream ring-1 ring-[var(--color-border)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        {!product.noPricing && (
          <section className="border-t border-[var(--color-border)] pt-10">
            <h2 className="font-display text-2xl font-bold text-maroon-deep sm:text-3xl">
              Opsi harga
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
              Cara kepemilikan lisensi (terpisah dari cara deploy dan kustomisasi di atas).
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-[var(--color-border)] bg-surface p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-maroon-deep">
                  Beli putus
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Kepemilikan penuh, pembayaran sekali. Cocok untuk yang ingin kontrol penuh
                  atas sistem dan infrastruktur.
                </p>
              </article>
              <article className="rounded-2xl border border-maroon-vibrant/25 bg-maroon-deep/[0.04] p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-maroon-deep">
                  Berlangganan SaaS
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Investasi awal rendah, bayar bulanan atau tahunan. Termasuk update, support,
                  dan hosting, cocok untuk mulai cepat.
                </p>
              </article>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-[var(--color-border)] pt-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-maroon-deep sm:text-3xl">
                  Produk lainnya
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Jelajahi solusi digital lain dari katalog InspiraLabs.
                </p>
              </div>
              <Link
                href="/produk"
                className="shrink-0 text-sm font-semibold text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm"
              >
                Lihat semua produk
              </Link>
            </div>
            <div className="mt-6 space-y-3">
              {related.map((item) => (
                <ProductListItem key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-2xl bg-maroon-deep px-6 py-8 text-center text-white sm:px-8 sm:py-10">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Tertarik dengan {shortName}?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/80 sm:text-base">
            {product.noPricing
              ? "Hubungi tim kami untuk diskusi program, jadwal, dan penawaran paket pelatihan."
              : "Hubungi tim kami untuk demo gratis, penawaran harga, dan diskusi kustomisasi."}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/kontak"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-8 py-2.5 font-semibold text-maroon-deep transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
            >
              Hubungi kami
            </Link>
            {product.website && (
              <a
                href={product.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-8 py-2.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
              >
                Lihat live demo
                <ExternalLink className="ml-1.5 h-4 w-4" aria-hidden />
              </a>
            )}
            <Link
              href="/survey"
              className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-8 py-2.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
            >
              Isi survey kebutuhan
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
