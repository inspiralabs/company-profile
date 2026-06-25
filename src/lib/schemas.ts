import { portfolioCases } from "@/data/portfolio";
import { FAQ_ITEMS } from "@/data/copy";
import { SITE } from "@/lib/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    email: SITE.email,
    telephone: `+${SITE.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressRegion: "Jawa Barat",
    },
    sameAs: SITE.socialUrls,
    description:
      "Mitra digitalisasi untuk UMKM, sekolah, pemerintah desa dan perusahaan. Software, IoT, desain visual dan workshop teknologi.",
  };
}

const services = [
  {
    serviceType: "Software Development",
    description:
      "Pembuatan aplikasi web dan mobile custom untuk UMKM, sekolah, dan instansi pemerintah.",
  },
  {
    serviceType: "Robotic & IoT Solutions",
    description:
      "Sensor pintar, mikrokontroler, EWS banjir, smart office, dan embedded system.",
  },
  {
    serviceType: "Creative & Visual Branding",
    description: "UI/UX, logo, brand guidelines, dan aset digital marketing.",
  },
  {
    serviceType: "Tech Training & Consulting",
    description:
      "Pelatihan hands-on web, Roblox, IoT, AI, dan desain untuk sekolah dan perusahaan.",
  },
];

export function serviceSchemas() {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.serviceType,
    provider: { "@type": "Organization", name: SITE.name },
    areaServed: "Indonesia",
    description: s.description,
  }));
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function articleSchemas() {
  return portfolioCases
    .filter((c) => c.problem && c.solution)
    .map((c) => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.name,
      description: c.subtitle ?? c.problem,
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@type": "Organization", name: SITE.name },
      image: c.images[0],
      datePublished: "2025-01-01",
    }));
}

export function productSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "SiJagaAir — EWS Banjir Terintegrasi IoT",
      description:
        "Solusi prediksi dan peringatan dini banjir berbasis sensor dengan notifikasi WhatsApp.",
      brand: { "@type": "Brand", name: SITE.name },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "IDR",
        url: `${SITE.url}/kontak`,
        description: "Hubungi kami untuk penawaran harga",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "LMS Learning Management System",
      description: "Platform e-learning untuk sekolah dan lembaga pelatihan.",
      brand: { "@type": "Brand", name: SITE.name },
    },
  ];
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}

export function allStructuredData() {
  return [
    organizationSchema(),
    webSiteSchema(),
    faqPageSchema(),
    ...serviceSchemas(),
    ...articleSchemas(),
    ...productSchemas(),
  ];
}
