import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { SERVICES, SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Layanan",
  description:
    "InspiraLabs menyediakan 4 layanan digital: software development, IoT & robotik, desain & branding, dan pelatihan teknologi. Konsultasi gratis untuk UMKM, sekolah, dan enterprise.",
  path: "/layanan",
});

const jsonLdServices = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Layanan ${SITE.name}`,
  url: `${SITE.url}/layanan`,
  numberOfItems: SERVICES.length,
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${SITE.url}${s.url}`,
    description: s.description,
  })),
};

const serviceDetails = [
  {
    slug: "software-development",
    icon: "💻",
    name: "Software Development",
    tagline: "Website & Aplikasi Mobile Profesional",
    desc: "Dari landing page UMKM hingga sistem enterprise skala besar. Kami kerjakan dari desain, development, hingga deployment.",
    bullets: [
      "Website company profile & landing page",
      "Web application (SaaS, CRM, dashboard)",
      "Aplikasi mobile Android & iOS",
      "AI chatbot & integrasi API",
    ],
    price: "Mulai di bawah Rp 10 juta",
    href: "/layanan/software-development",
    highlight: true,
  },
  {
    slug: "iot-robotik",
    icon: "🤖",
    name: "IoT & Robotik",
    tagline: "Smart System & Monitoring Real-Time",
    desc: "Sensor pintar yang terhubung ke dashboard dan WhatsApp. Early warning banjir, monitoring suhu, otomasi industri.",
    bullets: [
      "Early Warning System (EWS) banjir",
      "Monitoring real-time (air, suhu, listrik)",
      "Otomasi dan smart system",
      "Integrasi notifikasi WhatsApp",
    ],
    price: "Mulai Rp 4.999.000",
    href: "/layanan/iot-robotik",
  },
  {
    slug: "desain-branding",
    icon: "🎨",
    name: "Desain & Branding",
    tagline: "Identitas Visual yang Berkesan",
    desc: "UI/UX design, logo, brand guidelines, dan aset visual untuk media sosial. Dari startup hingga rebrand enterprise.",
    bullets: [
      "UI/UX design aplikasi & website",
      "Logo dan identitas brand",
      "Brand guidelines & style guide",
      "Konten visual media sosial",
    ],
    price: "Sesuai scope",
    href: "/layanan/desain-branding",
  },
  {
    slug: "pelatihan-teknologi",
    icon: "📚",
    name: "Pelatihan Teknologi",
    tagline: "Upgrade Skill Tim Anda",
    desc: "Workshop hands-on coding, IoT, Roblox, dan AI untuk sekolah, perusahaan, dan komunitas. Datang ke lokasi Anda.",
    bullets: [
      "Workshop coding & web development",
      "Pelatihan IoT & hardware",
      "In-house training AI untuk bisnis",
      "Roblox game development untuk sekolah",
    ],
    price: "Sesuai program",
    href: "/layanan/pelatihan-teknologi",
  },
];

export default function LayananPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }}
      />

      <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Layanan
            </p>
            <h1 className="font-display text-display-xl font-bold text-maroon-deep">
              Satu Atap untuk Semua<br />Kebutuhan Digital Anda
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Software, IoT, desain, dan pelatihan - semua tersedia di InspiraLabs.
              Tidak perlu koordinasi ke vendor berbeda. Kami handle dari konsep hingga production.
            </p>
          </div>

          {/* Services Grid */}
          <div className="mb-20 grid gap-6 sm:grid-cols-2">
            {serviceDetails.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className={`group rounded-2xl border p-8 transition-all hover:shadow-card-hover hover:-translate-y-1 ${
                  s.highlight
                    ? "border-maroon-vibrant/30 bg-maroon-deep text-white"
                    : "border-[var(--color-border)] bg-surface"
                }`}
              >
                <span className="text-4xl">{s.icon}</span>
                <h2
                  className={`mt-4 font-display text-xl font-bold ${
                    s.highlight ? "text-white" : "text-maroon-deep"
                  }`}
                >
                  {s.name}
                </h2>
                <p
                  className={`mt-1 text-sm font-medium ${
                    s.highlight ? "text-white/70" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {s.tagline}
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    s.highlight ? "text-white/80" : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {s.desc}
                </p>
                <ul className="mt-4 space-y-1">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className={`flex items-center gap-2 text-sm ${
                        s.highlight ? "text-white/80" : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${s.highlight ? "bg-white/60" : "bg-maroon-vibrant"}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      s.highlight ? "text-gold-antique" : "text-maroon-deep"
                    }`}
                  >
                    {s.price}
                  </span>
                  <span
                    className={`text-sm font-medium group-hover:underline ${
                      s.highlight ? "text-white" : "text-maroon-vibrant"
                    }`}
                  >
                    Lihat Detail →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <section className="rounded-2xl bg-cream px-8 py-12 text-center">
            <h2 className="font-display text-display-md font-bold text-maroon-deep">
              Tidak yakin layanan mana yang tepat?
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Isi survey 2 menit - tim kami akan analisis kebutuhan Anda dan rekomendasikan solusi terbaik.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/survey"
                className="rounded-full bg-maroon-deep px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Mulai Survey Gratis
              </Link>
              <Link
                href="/kontak"
                className="rounded-full border border-[var(--color-border)] px-8 py-3 font-semibold text-maroon-deep transition-colors hover:bg-maroon-deep hover:text-white"
              >
                Langsung Konsultasi
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
