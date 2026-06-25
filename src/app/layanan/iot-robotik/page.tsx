import type { Metadata } from "next";
import Link from "next/link";
import { Cpu } from "lucide-react";
import ServiceDetailLayout from "@/components/layanan/ServiceDetailLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE, WA_SERVICE_PILLARS } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "IoT & Robotik: Smart System & Early Warning System",
  description:
    "Jasa IoT Indonesia: monitoring real-time, early warning system banjir, smart system, dan otomasi berbasis sensor. Notifikasi otomatis ke WhatsApp. InspiraLabs Bogor.",
  path: "/layanan/iot-robotik",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "IoT & Robotik",
  provider: { "@id": `${SITE.url}/#organization` },
  description:
    "Solusi Internet of Things: monitoring real-time, Early Warning System banjir, smart system, dan integrasi sensor dengan dashboard web dan notifikasi WhatsApp.",
  areaServed: "ID",
  serviceType: "IoT Solutions",
  url: `${SITE.url}/layanan/iot-robotik`,
};

const deliverables = [
  {
    label: "Early Warning System (EWS) Banjir",
    desc: "Sensor ketinggian air + dashboard real-time + notifikasi WhatsApp otomatis saat melewati batas aman.",
    featured: true,
  },
  {
    label: "Monitoring Lingkungan",
    desc: "Sensor suhu, kelembaban, kualitas udara, debit air — semua terhubung ke dashboard web.",
  },
  {
    label: "Smart Office & Smart Home",
    desc: "Otomasi lampu, AC, pintu — kontrol jarak jauh via aplikasi atau jadwal otomatis.",
  },
  {
    label: "Monitoring Energi",
    desc: "Pantau konsumsi listrik real-time, identifikasi pemborosan, dan hemat biaya operasional.",
  },
  {
    label: "Sistem Irigasi Cerdas",
    desc: "Otomasi penyiraman berbasis sensor kelembaban tanah untuk pertanian dan taman.",
  },
  {
    label: "Prototipe & Riset",
    desc: "Pengembangan prototipe IoT untuk riset akademik, startup, dan proof-of-concept.",
  },
];

const caseStudyHighlight = (
  <div className="rounded-xl border border-maroon-vibrant/20 bg-cream p-4 text-sm leading-relaxed">
    <strong className="text-maroon-deep">Studi kasus nyata:</strong>{" "}
    <span className="text-[var(--color-text-secondary)]">
      SiJagaAir — EWS banjir Desa Bojong Kulur, Bogor. Warga terima notifikasi WA otomatis sebelum banjir tiba.
    </span>{" "}
    <Link
      href="/portofolio/sijagaair"
      className="font-medium text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm"
    >
      Lihat studi kasus
    </Link>
  </div>
);

export default function IotRobotikPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailLayout
        breadcrumbLabel="IoT & Robotik"
        icon={Cpu}
        title="IoT & Robotik"
        subtitle="Smart System · Monitoring · Early Warning System"
        description="Sensor pintar yang terhubung ke dashboard web dan notifikasi WhatsApp. Dari EWS banjir desa hingga monitoring energi pabrik — kami bangun sistem yang benar-benar berfungsi di lapangan, bukan hanya di lab."
        highlight={caseStudyHighlight}
        primaryCta={{ href: WA_SERVICE_PILLARS.iot, label: "Konsultasi Gratis", external: true }}
        secondaryCta={{ href: "/portofolio/sijagaair", label: "Lihat Studi Kasus" }}
        deliverablesTitle="Yang Kami Bangun"
        deliverablesIntro="Hardware, firmware, dan dashboard — satu tim, satu tanggung jawab."
        deliverables={deliverables}
      />
    </>
  );
}
