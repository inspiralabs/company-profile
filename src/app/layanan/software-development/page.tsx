import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE, WA_SERVICE_PILLARS } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Software Development — Website & Aplikasi Mobile",
  description:
    "Jasa pembuatan website profesional, web application, dan aplikasi mobile Android/iOS. InspiraLabs mengerjakan dari desain, development, hingga deployment. Mulai di bawah Rp 10 juta.",
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
  { label: "Website Company Profile & Landing Page", desc: "Desain elegan, mobile-responsive, SEO-ready — mulai dari UMKM hingga korporat." },
  { label: "Web Application", desc: "SaaS, sistem informasi, CRM, dan dashboard operasional berbasis browser." },
  { label: "Aplikasi Mobile Android & iOS", desc: "React Native — satu codebase, dua platform, siap deploy ke Play Store & App Store." },
  { label: "AI Chatbot & Integrasi API", desc: "Chatbot berbasis LLM, integrasi WhatsApp Business, payment gateway, dan API pihak ketiga." },
  { label: "Sistem Informasi Custom", desc: "ERP sederhana, sistem absensi, manajemen inventaris — disesuaikan proses bisnis Anda." },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/layanan" className="hover:text-maroon-vibrant">Layanan</Link>
            <span>/</span>
            <span className="text-maroon-deep font-medium">Software Development</span>
          </nav>

          <div className="mb-16 max-w-3xl">
            <span className="text-5xl">💻</span>
            <h1 className="mt-4 font-display text-4xl font-bold text-maroon-deep sm:text-5xl">
              Software Development
            </h1>
            <p className="mt-2 text-lg font-medium text-[var(--color-text-muted)]">Website · Web App · Mobile App</p>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Dari landing page UMKM hingga sistem enterprise — kami kerjakan dari desain UI/UX,
              development, testing, hingga deployment. Harga transparan, update rutin tiap pekan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={WA_SERVICE_PILLARS.software}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-maroon-deep px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Konsultasi Gratis
              </a>
              <Link href="/portofolio" className="rounded-full border border-[var(--color-border)] px-8 py-3 font-semibold text-maroon-deep hover:bg-cream transition-colors">
                Lihat Portofolio
              </Link>
            </div>
          </div>

          <section>
            <h2 className="font-display text-2xl font-bold text-maroon-deep mb-8">Yang Kami Kerjakan</h2>
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
