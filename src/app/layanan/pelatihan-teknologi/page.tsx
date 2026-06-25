import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE, WA_SERVICE_PILLARS } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Pelatihan Teknologi: Workshop Coding, IoT, AI & Roblox",
  description:
    "In-house training dan workshop teknologi untuk sekolah, perusahaan, dan komunitas. Coding, IoT, Roblox, dan AI - datang ke lokasi Anda di seluruh Indonesia.",
  path: "/layanan/pelatihan-teknologi",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pelatihan Teknologi",
  provider: { "@id": `${SITE.url}/#organization` },
  description: "Workshop dan in-house training coding, IoT, Roblox, dan AI untuk sekolah, perusahaan, dan komunitas.",
  areaServed: "ID",
  serviceType: "Technology Training",
  url: `${SITE.url}/layanan/pelatihan-teknologi`,
};

const programs = [
  { icon: "💻", title: "Workshop Coding & Web Dev", audience: "Pelajar SMP/SMA, Mahasiswa, Guru", desc: "HTML, CSS, JavaScript, Python dasar. Dari nol hingga bisa buat website sendiri dalam 1–2 hari." },
  { icon: "🤖", title: "Workshop IoT & Hardware", audience: "Guru IT, Mahasiswa Teknik, Tim R&D", desc: "Rakit sensor, program mikrokontroler (ESP32/Arduino), dan buat prototipe IoT yang bisa didemonstrasikan." },
  { icon: "🎮", title: "Roblox Game Development", audience: "Siswa SD–SMA, Guru Informatika", desc: "Belajar logika pemrograman lewat game development di Roblox Studio. Seru dan mudah dipahami anak-anak." },
  { icon: "🧠", title: "AI untuk Bisnis & Sekolah", audience: "Profesional, Guru, Manajer", desc: "Cara praktis memanfaatkan AI (ChatGPT, Gemini, Copilot) untuk produktivitas kerja dan pembelajaran." },
  { icon: "🎨", title: "Workshop Desain Grafis", audience: "Guru Seni, Tim Marketing, UMKM", desc: "Figma dan Canva untuk membuat konten visual profesional. Dari poster hingga UI sederhana." },
  { icon: "📊", title: "Konsultasi Transformasi Digital", audience: "Manajemen, Kepala Sekolah, Kepala Desa", desc: "Roadmap digitalisasi yang realistis dan sesuai anggaran - bukan hype, tapi langkah konkret." },
];

export default function PelatihanTeknologiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">

          <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/layanan" className="hover:text-maroon-vibrant">Layanan</Link>
            <span>/</span>
            <span className="text-maroon-deep font-medium">Pelatihan Teknologi</span>
          </nav>

          <div className="mb-16 max-w-3xl">
            <span className="text-5xl">📚</span>
            <h1 className="mt-4 font-display text-4xl font-bold text-maroon-deep sm:text-5xl">
              Pelatihan Teknologi
            </h1>
            <p className="mt-2 text-lg font-medium text-[var(--color-text-muted)]">Coding · IoT · AI · Roblox · Desain</p>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Trainer kami adalah developer dan desainer aktif yang juga menjalankan proyek nyata.
              Materi selalu relevan dengan industri, dan bisa dikustomisasi sesuai level peserta.
              Format: in-house, online, atau kelas publik.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={WA_SERVICE_PILLARS.workshop}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-maroon-deep px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Konsultasi Program
              </a>
              <Link href="/portofolio/workshop-iot" className="rounded-full border border-[var(--color-border)] px-8 py-3 font-semibold text-maroon-deep hover:bg-cream transition-colors">
                Lihat Studi Kasus
              </Link>
            </div>
          </div>

          <section>
            <h2 className="font-display text-2xl font-bold text-maroon-deep mb-8">Program Tersedia</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => (
                <div key={p.title} className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
                  <span className="text-3xl">{p.icon}</span>
                  <h3 className="mt-3 font-display font-bold text-maroon-deep">{p.title}</h3>
                  <p className="mt-1 text-xs font-medium text-[var(--color-text-muted)]">Untuk: {p.audience}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
