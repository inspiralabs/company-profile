import type { Metadata } from "next";
import { Code2 } from "lucide-react";
import ServiceDetailLayout from "@/components/layanan/ServiceDetailLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE, WA_SERVICE_PILLARS } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Software Development: Website & Aplikasi Mobile",
  description:
    "Jasa pembuatan website dan aplikasi mobile di Bogor. InspiraLabs mengerjakan website profesional, web application, dan aplikasi Android/iOS dari desain, development, hingga deployment. Mulai di bawah Rp 10 juta.",
  path: "/layanan/software-development",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Software Development",
  provider: { "@id": `${SITE.url}/#organization` },
  description:
    "Pengembangan website profesional, web application, dan aplikasi mobile Android/iOS untuk kebutuhan bisnis dari skala UMKM hingga enterprise.",
  areaServed: "ID",
  serviceType: "Software Development",
  url: `${SITE.url}/layanan/software-development`,
};

const deliverables = [
  {
    label: "Web Application",
    desc: "SaaS, sistem informasi, CRM, dan dashboard operasional berbasis browser.",
    featured: true,
  },
  {
    label: "Website Company Profile & Landing Page",
    desc: "Desain elegan, mobile-responsive, SEO-ready, mulai dari UMKM hingga korporat.",
  },
  {
    label: "Sistem Kasir & POS",
    desc: "Sistem kasir & POS untuk UMKM atau FnB dan bisnis retail yang efisien dan mudah dipakai.",
  },
  {
    label: "Sistem Booking & Reservasi",
    desc: "Sistem booking & reservasi untuk bisnis travel, hotel, restaurant, dan event space yang efisien dan mudah dipakai.",
  },
  {
    label: "Sistem Informasi Custom",
    desc: "ERP sederhana, sistem absensi, manajemen inventaris: disesuaikan proses bisnis Anda.",
  },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailLayout
        breadcrumbLabel="Software Development"
        icon={Code2}
        title="Software Development"
        subtitle="Website · Web App · Mobile App"
        description="Dari landing page UMKM hingga sistem enterprise: kami kerjakan dari desain UI/UX, development, testing, hingga deployment. Harga transparan, update rutin tiap pekan."
        primaryCta={{ href: WA_SERVICE_PILLARS.software, label: "Konsultasi Gratis", external: true }}
        secondaryCta={{ href: "/portofolio", label: "Lihat Portofolio" }}
        deliverablesTitle="Yang Kami Kerjakan"
        deliverablesIntro="Setiap proyek dimulai dari kebutuhan bisnis Anda, bukan dari template generik."
        deliverables={deliverables}
      />
    </>
  );
}
