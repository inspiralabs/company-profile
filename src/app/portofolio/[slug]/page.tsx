import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { portfolioCases } from "@/data/portfolio";
import { SITE } from "@/lib/site";
import PortfolioDetailClient from "@/components/portfolio/PortfolioDetailClient";

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
        : `Portofolio InspiraLabs - ${item.name}. ${item.subtitle ?? ""}`,
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

  const { icon: _icon, ...itemData } = item;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortfolioDetailClient item={itemData} />
    </>
  );
}
