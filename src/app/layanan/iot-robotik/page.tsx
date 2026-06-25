import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE, WA_SERVICE_PILLARS } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "IoT & Robotik — Smart System & Early Warning System",
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
  { label: "Early Warning System (EWS) Banjir", desc: "Sensor ketinggian air + dashboard real-time + notifikasi WhatsApp otomatis saat melewati batas aman." },
  { label: "Monitoring Lingkungan", desc: "Sensor suhu, kelembaban, kualitas udara, debit air — semua terhubung ke dashboard web." },
  { label: "Smart Office & Smart Home", desc: "Otomasi lampu, AC, pintu — kontrol jarak jauh via aplikasi atau jadwal otomatis." },
  { label: "Monitoring Energi", desc: "Pantau konsumsi listrik real-time, identifikasi pemborosan, dan hemat biaya operasional." },
  { label: "Sistem Irigasi Cerdas", desc: "Otomasi penyiraman berbasis sensor kelembaban tanah untuk pertanian dan taman." },
  { label: "Prototipe & Riset", desc: "Pengembangan prototipe IoT untuk riset akademik, startup, dan proof-of-concept." },
];

export default function IotRobotikPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/layanan" className="hover:text-maroon-vibrant">Layanan</Link>
            <span>/</span>
            <span className="text-maroon-deep font-medium">IoT & Robotik</span>
          </nav>

          <div className="mb-16 max-w-3xl">
            <span className="text-5xl">🤖</span>
            <h1 className="mt-4 font-display text-4xl font-bold text-maroon-deep sm:text-5xl">
              IoT & Robotik
            </h1>
            <p className="mt-2 text-lg font-medium text-[var(--color-text-muted)]">Smart System · Monitoring · Early Warning System</p>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Sensor pintar yang terhubung ke dashboard web dan notifikasi WhatsApp.
              Dari EWS banjir desa hingga monitoring energi pabrik — kami bangun sistem yang
              benar-benar berfungsi di lapangan, bukan hanya di lab.
            </p>
            <div className="mt-6 rounded-xl border border-maroon-vibrant/20 bg-cream p-4 text-sm">
              <strong className="text-maroon-deep">Studi kasus nyata:</strong>
              <span className="ml-2 text-[var(--color-text-secondary)]">
                SiJagaAir — EWS banjir Desa Bojong Kulur, Bogor. Warga terima notifikasi WA otomatis sebelum banjir tiba.
              </span>
              <Link href="/portofolio/sijagaair" className="ml-2 font-medium text-maroon-vibrant hover:underline">Lihat →</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={WA_SERVICE_PILLARS.iot}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-maroon-deep px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Konsultasi Gratis
              </a>
              <Link href="/portofolio/sijagaair" className="rounded-full border border-[var(--color-border)] px-8 py-3 font-semibold text-maroon-deep hover:bg-cream transition-colors">
                Lihat Studi Kasus
              </Link>
            </div>
          </div>

          <section>
            <h2 className="font-display text-2xl font-bold text-maroon-deep mb-8">Yang Kami Bangun</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d) => (
                <div key={d.label} className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
                  <h3 className="font-semibold text-maroon-deep">{d.label}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{d.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
