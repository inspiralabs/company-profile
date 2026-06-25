import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { portfolioCases } from "@/data/portfolio";
import { SITE } from "@/lib/site";
import ImageGallery from "@/components/ui/ImageGallery";

export function generateStaticParams() {
  return portfolioCases.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioCases.find((p) => p.id === slug);
  if (!item) return {};
  return buildPageMetadata({
    title: item.name,
    description:
      item.problem
        ? `Studi kasus: ${item.problem} Solusi: ${item.solution ?? ""}`
        : `Portofolio InspiraLabs — ${item.name}. ${item.subtitle ?? ""}`,
    path: `/portofolio/${slug}`,
  });
}

export default async function PortofolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = portfolioCases.find((p) => p.id === slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.name,
    description: item.problem ?? item.subtitle,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    image: `${SITE.url}${item.images[0]}`,
    url: `${SITE.url}/portofolio/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/portofolio" className="hover:text-maroon-vibrant">Portofolio</Link>
            <span>/</span>
            <span className="text-maroon-deep font-medium">{item.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-maroon-deep">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">{item.name}</h1>
            {item.subtitle && (
              <p className="mt-2 text-lg text-[var(--color-text-muted)]">{item.subtitle}</p>
            )}
            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-maroon-vibrant hover:underline"
              >
                Lihat Live Demo →
              </a>
            )}
          </div>

          {/* Image Gallery */}
          {item.images.length > 0 && (
            <div className="mb-12">
              <ImageGallery images={item.images} name={item.name} />
            </div>
          )}

          {/* Case Study Content */}
          <div className="mb-12 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {item.problem && (
                <section>
                  <h2 className="font-display text-xl font-bold text-maroon-deep mb-3">Masalah yang Diselesaikan</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.problem}</p>
                </section>
              )}
              {item.solution && (
                <section>
                  <h2 className="font-display text-xl font-bold text-maroon-deep mb-3">Solusi yang Dibangun</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.solution}</p>
                </section>
              )}
              {item.results && item.results.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-maroon-deep mb-3">Hasil & Dampak</h2>
                  <ul className="space-y-2">
                    {item.results.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-maroon-vibrant" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {item.features && item.features.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-maroon-deep mb-3">Fitur Utama</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {item.features.map((f) => (
                      <div key={f.label} className="rounded-lg bg-cream p-4">
                        <h3 className="font-semibold text-maroon-deep text-sm">{f.label}</h3>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {item.descPoints && item.descPoints.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-maroon-deep mb-3">Aktivitas</h2>
                  <ul className="space-y-2">
                    {item.descPoints.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-maroon-vibrant" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar: Testimonial */}
            {item.review && (
              <aside>
                <div className="rounded-2xl bg-maroon-deep p-6 text-white sticky top-28">
                  <p className="text-4xl mb-4">"</p>
                  <p className="text-sm leading-relaxed text-white/90 italic">{item.review.text}</p>
                  <div className="mt-4 border-t border-white/20 pt-4">
                    <p className="font-semibold text-sm">{item.review.author}</p>
                    {item.review.role && (
                      <p className="text-xs text-white/60 mt-0.5">{item.review.role}</p>
                    )}
                    {item.review.company && (
                      <p className="text-xs text-white/60">{item.review.company}</p>
                    )}
                  </div>
                </div>
              </aside>
            )}
          </div>

          {/* Navigation & CTA */}
          <div className="border-t border-[var(--color-border)] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/portofolio" className="text-sm font-medium text-maroon-vibrant hover:underline">
              ← Kembali ke Semua Portofolio
            </Link>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/kontak"
                className="rounded-full bg-maroon-deep px-6 py-2.5 text-sm font-semibold text-white hover:scale-105 transition-transform"
              >
                Ada Proyek Serupa? Hubungi Kami
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
