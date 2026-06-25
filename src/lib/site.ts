import { trackConversion, type AnalyticsEvent } from "@/lib/analytics";

export const SITE = {
  name: "InspiraLabs",
  legalName: "Nawa Inspira Digital",
  tagline: "Mitra Solusi Digital Anda",
  url: "https://inspiralabs.id",
  email: "hello@inspiralabs.id",
  whatsapp: "6282124533265",
  whatsappDisplay: "+62 821-2453-3265",
    // Jam operasional
  hours: {
    weekday: { open: "09:00", close: "17:00" },
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  social: {
    instagram: "https://www.instagram.com/inspiralabs.id/",
    linkedin: "https://linkedin.com/company/inspiralabs",
    youtube: "https://youtube.com/@inspiralabs",
    github: "https://github.com/inspiralabs",
  },
  socialUrls: [
    "https://www.instagram.com/inspiralabs.id/",
    "https://linkedin.com/company/inspiralabs",
    "https://youtube.com/@inspiralabs",
    "https://github.com/inspiralabs",
  ],
  locale: "id_ID",
  language: "id",
  region: "ID",
  // Deskripsi - dipakai di semua metadata
  description:
    "InspiraLabs (Nawa Inspira Digital) adalah software house profesional yang menyediakan solusi website, aplikasi mobile, IoT, dan sistem informasi untuk bisnis dari skala kecil hingga enterprise.",

  // Deskripsi pendek untuk og:description
  shortDescription:
    "Software house & Agensi IT - website, aplikasi, IoT, dan sistem informasi. Konsultasi gratis.",

  // Keywords utama
  keywords: [
    "InspiraLabs",
    "inspira labs",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi",
    "pengembangan software Indonesia",
    "software house Indonesia",
    "solusi IoT Indonesia",
    "IoT",
    "sistem informasi desa",
    "early warning system banjir",
    "ews banjir",
    "pelatihan coding",
    "pelatihan robotika",
    "workshop IoT",
    "kursus programming",
    "implementasi AI bisnis",
    "jasa desain logo",
    "jasa branding UMKM",
    "UI UX design Indonesia",
    "digitalisasi UMKM",
    "konsultasi proyek mahasiswa",
    "mentoring coding",
    "bimbingan proyek akhir",
    "jasa pembuatan dashboard",
    "jasa pembuatan sistem informasi",
    "in-house training teknologi",
    "pelatihan Roblox",
    "smart village Indonesia",
    "tech training untuk guru",
    "robotik untuk sekolah",
    "pelatihan AI untuk bisnis"
  ],

  // Kontak & Lokasi
  location: {
    city: "Bogor",
    region: "Jawa Barat",
    country: "Indonesia",
    countryCode: "ID",
    postalCode: "1699",
    lat: -6.31833,
    lng: 106.96944,
  },

  // Assets
  ogImage: "/og-image.jpg",
  logo: "/logo.svg",
  favicon: "/icon.svg",

  // Untuk Google Search Console - isi setelah daftar GSC
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
} as const;

export function waLink(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const WA_SERVICE_PILLARS = {
  software: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang kebutuhan Software Development (web/mobile/dashboard)."
  ),
  iot: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang solusi Robotic & IoT untuk organisasi kami."
  ),
  design: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang Creative & Visual Branding / UI-UX."
  ),
  workshop: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang pelatihan Coding, Robotics & Design Workshop."
  ),
} as const;

export function trackEvent(
  name: AnalyticsEvent,
  params?: Record<string, string>
) {
  trackConversion(name, params);
}

// Layanan - dipakai di JSON-LD dan halaman /layanan
export const SERVICES = [
  {
    slug: "software-development",
    name: "Software Development",
    shortName: "Website & Aplikasi",
    description:
      "Pengembangan website profesional dan aplikasi mobile Android/iOS untuk kebutuhan bisnis Anda.",
    url: "/layanan/software-development",
    icon: "💻",
  },
  {
    slug: "iot-robotik",
    name: "IoT & Robotik",
    shortName: "IoT & Robotik",
    description:
      "Solusi Internet of Things untuk monitoring, otomasi, dan smart system berbasis sensor dan dashboard real-time.",
    url: "/layanan/iot-robotik",
    icon: "🤖",
  },
  {
    slug: "desain-branding",
    name: "Desain & Branding",
    shortName: "Desain & Branding",
    description:
      "Desain UI/UX, identitas brand, dan aset visual profesional untuk bisnis Anda.",
    url: "/layanan/desain-branding",
    icon: "🎨",
  },
  {
    slug: "pelatihan-teknologi",
    name: "Pelatihan Teknologi",
    shortName: "Pelatihan",
    description:
      "Pelatihan coding, IoT, dan transformasi digital untuk individu, komunitas, dan institusi pendidikan.",
    url: "/layanan/pelatihan-teknologi",
    icon: "📚",
  },
] as const;

// Produk - dipakai di JSON-LD dan halaman /produk
export const PRODUCTS = [
  {
    slug: "sijagaair",
    name: "SiJagaAir",
    description: "Sistem monitoring penggunaan air PDAM berbasis IoT dengan sistem prabayar.",
    url: "/produk/sijagaair",
  },
  {
    slug: "amanah-platform",
    name: "Amanah Platform",
    description: "Platform Manajemen Guru Digital.",
    url: "/produk/amanah-platform",
  },
  {
    slug: "teras-desa",
    name: "Teras Desa",
    description: "Sistem informasi dan manajemen administrasi desa digital.",
    url: "/produk/teras-desa",
  },
  {
    slug: "lms-inspiralabs",
    name: "LMS InspiraLabs",
    description: "Learning Management System untuk institusi pendidikan.",
    url: "/produk/lms-inspira",
  },
  {
    slug: "inspira-pos",
    name: "Inspira POS",
    description: "Point of Sale cerdas untuk UMKM dengan laporan real-time.",
    url: "/produk/inspira-pos",
  },
  {
    slug: "sistem-masjid",
    name: "Sistem Manajemen Masjid",
    description: "Sistem digital untuk manajemen keuangan dan kegiatan masjid.",
    url: "/produk/sistem-masjid",
  },
] as const;
