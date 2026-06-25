import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { portfolioCases } from "@/data/portfolio";
import { PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                               lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/tentang`,                  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/layanan`,                  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/layanan/software-development`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/layanan/iot-robotik`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/layanan/desain-branding`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/layanan/pelatihan-teknologi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/portofolio`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/produk`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kontak`,                   lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/survey`,                   lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/privasi`,                  lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${base}/syarat`,                   lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  const portfolioPages: MetadataRoute.Sitemap = portfolioCases.map((p) => ({
    url: `${base}/portofolio/${p.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: p.featured ? 0.7 : 0.6,
  }));

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${base}/produk/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioPages, ...productPages];
}
