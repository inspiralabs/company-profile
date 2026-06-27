import type { Metadata } from "next";
import {
  Code2,
  Cpu,
  Gamepad2,
  GraduationCap,
  LineChart,
  Palette,
  Sparkles,
} from "lucide-react";
import ServiceDetailLayout from "@/components/layanan/ServiceDetailLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE, WA_SERVICE_PILLARS } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Pelatihan Teknologi: Workshop Coding, IoT, AI & Roblox",
  description:
    "In-house training dan workshop teknologi untuk sekolah, perusahaan, dan komunitas. Coding, IoT, Roblox, dan AI. Datang ke lokasi Anda di seluruh Indonesia.",
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
  {
    icon: Code2,
    label: "Workshop Coding & Web Dev",
    meta: "Pelajar SMP/SMA, Mahasiswa, Guru",
    desc: "HTML, CSS, JavaScript, Python dasar. Dari nol hingga bisa buat website sendiri dalam 1–2 hari.",
  },
  {
    icon: Cpu,
    label: "Workshop IoT & Hardware",
    meta: "Guru IT, Mahasiswa Teknik, Tim R&D",
    desc: "Rakit sensor, program mikrokontroler (ESP32/Arduino), dan buat prototipe IoT yang bisa didemonstrasikan.",
  },
  {
    icon: Gamepad2,
    label: "Roblox Game Development",
    meta: "Siswa SD–SMA, Guru Informatika",
    desc: "Belajar logika pemrograman lewat game development di Roblox Studio. Seru dan mudah dipahami anak-anak.",
  },
  {
    icon: Sparkles,
    label: "AI untuk Bisnis & Sekolah",
    meta: "Profesional, Guru, Manajer",
    desc: "Cara praktis memanfaatkan AI (ChatGPT, Gemini, Copilot) untuk produktivitas kerja dan pembelajaran.",
  },
  {
    icon: Palette,
    label: "Workshop Desain Grafis",
    meta: "Guru Seni, Tim Marketing, UMKM",
    desc: "Figma dan Canva untuk membuat konten visual profesional. Dari poster hingga UI sederhana.",
  },
  {
    icon: LineChart,
    label: "Konsultasi Transformasi Digital",
    meta: "Manajemen, Kepala Sekolah, Kepala Desa",
    desc: "Roadmap digitalisasi yang realistis dan sesuai anggaran: bukan hype, tapi langkah konkret.",
  },
];

export default function PelatihanTeknologiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailLayout
        breadcrumbLabel="Pelatihan Teknologi"
        icon={GraduationCap}
        title="Pelatihan Teknologi"
        subtitle="Coding · IoT · AI · Roblox · Desain"
        description="Trainer kami adalah developer dan desainer aktif yang juga menjalankan proyek nyata. Materi selalu relevan dengan industri, dan bisa dikustomisasi sesuai level peserta. Format: in-house, online, atau kelas publik."
        primaryCta={{ href: WA_SERVICE_PILLARS.workshop, label: "Konsultasi Program", external: true }}
        secondaryCta={{ href: "/portofolio/workshop-iot", label: "Lihat Studi Kasus" }}
        deliverablesTitle="Program Tersedia"
        deliverablesIntro="Materi hands-on, bukan ceramah satu arah. Peserta pulang dengan hasil nyata."
        deliverables={programs}
        deliverablesLayout="grid"
      />
    </>
  );
}
