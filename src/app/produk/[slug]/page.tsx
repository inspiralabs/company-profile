import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailLayout from "@/components/produk/ProductDetailLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PRODUCTS.find((p) => p.id === slug);
  if (!item) return {};
  return buildPageMetadata({
    title: item.name,
    description: item.description,
    path: `/produk/${slug}`,
  });
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailLayout product={item} />
    </>
  );
}
