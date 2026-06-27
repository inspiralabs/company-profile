import type { Metadata } from "next";
import { Palette } from "lucide-react";
import ServiceDetailLayout from "@/components/layanan/ServiceDetailLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE, WA_SERVICE_PILLARS } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Desain & Branding: UI/UX, Logo, Identitas Visual",
  description:
    "Jasa desain UI/UX, logo, brand guidelines, dan aset visual media sosial. InspiraLabs membantu UMKM dan startup membangun identitas brand yang profesional dan berkesan.",
  path: "/layanan/desain-branding",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Desain & Branding",
  provider: { "@id": `${SITE.url}/#organization` },
  description: "UI/UX design, identitas visual brand, logo, brand guidelines, dan konten media sosial.",
  areaServed: "ID",
  serviceType: "Graphic Design & Branding",
  url: `${SITE.url}/layanan/desain-branding`,
};

const deliverables = [
  {
    label: "Logo & Brand Identity",
    desc: "Logo profesional, panduan warna, tipografi, dan brand guidelines lengkap.",
    featured: true,
  },
  {
    label: "Revamp Visual Instagram",
    desc: "Konsep feed, template konten, dan panduan visual untuk identitas Instagram yang konsisten.",
  },
  {
    label: "Aset Digital Marketing",
    desc: "Banner iklan, thumbnail YouTube, infografis, dan materi promosi digital.",
  },
  {
    label: "Desain Presentasi",
    desc: "Pitch deck dan template presentasi berstandar profesional untuk investor atau klien.",
  },
  {
    label: "Undangan Digital",
    desc: "Undangan pernikahan, acara, dan event digital yang elegan dan mudah dibagikan.",
  },
];

export default function DesainBrandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailLayout
        breadcrumbLabel="Desain & Branding"
        icon={Palette}
        title="Desain & Branding"
        subtitle="UI/UX · Logo · Identitas Visual"
        description="Identitas visual yang kuat adalah investasi bisnis paling efisien. Kami desain dari logo hingga keseluruhan bahasa visual brand Anda, supaya audiens ingat Anda bahkan setelah scrolling."
        primaryCta={{ href: WA_SERVICE_PILLARS.design, label: "Konsultasi Gratis", external: true }}
        secondaryCta={{ href: "/portofolio", label: "Lihat Portofolio" }}
        deliverablesTitle="Yang Kami Desain"
        deliverablesIntro="Visual yang konsisten di semua titik kontak: dari aplikasi hingga feed Instagram."
        deliverables={deliverables}
      />
    </>
  );
}
