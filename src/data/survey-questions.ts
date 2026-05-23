import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Calendar,
  Cpu,
  Globe,
  GraduationCap,
  HeartHandshake,
  Layers,
  MessageCircle,
  Smartphone,
  Sparkles,
  Store,
  User,
  Wallet,
  Zap,
} from "lucide-react";

export type SurveyAnswer = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Solution IDs to boost */
  boosts: string[];
};

export type SurveyQuestion = {
  id: number;
  title: string;
  multiSelect: boolean;
  options: SurveyAnswer[];
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    title: "Siapa Anda atau organisasi Anda?",
    multiSelect: true,
    options: [
      {
        id: "umkm",
        label: "UMKM / Usaha / Toko",
        description: "Bisnis kecil menengah yang ingin naik kelas",
        icon: Store,
        boosts: ["website", "crm", "otomatisasi", "pos"],
      },
      {
        id: "pendidikan",
        label: "Sekolah / Lembaga Pendidikan",
        description: "SD, SMP, SMA, universitas, bimbel, kursus",
        icon: GraduationCap,
        boosts: ["elearning", "website", "workshop-iot", "workshop-robotik", "pelatihan"],
      },
      {
        id: "perusahaan",
        label: "Perusahaan / Instansi",
        description: "Korporat, BUMN, atau instansi pemerintah/swasta",
        icon: Building2,
        boosts: ["dashboard", "otomatisasi", "mobile", "iot", "pelatihan"],
      },
      {
        id: "perorangan",
        label: "Perorangan / Freelancer",
        description: "Instruktur, konsultan, atau proyek pribadi",
        icon: User,
        boosts: ["website", "workshop-custom", "coaching"],
      },
      {
        id: "komunitas",
        label: "Komunitas / Yayasan",
        description: "Organisasi non-profit atau komunitas lokal",
        icon: HeartHandshake,
        boosts: ["website", "crm", "iot", "workshop-iot"],
      },
    ],
  },
  {
    id: 2,
    title: "Apa kesulitan terbesar yang sedang dihadapi?",
    multiSelect: true,
    options: [
      {
        id: "manual",
        label: "Banyak proses manual",
        description: "Pekerjaan repetitif memakan waktu tim",
        icon: Layers,
        boosts: ["otomatisasi", "dashboard"],
      },
      {
        id: "jangkau",
        label: "Sulit menjangkau lebih banyak orang",
        description: "Audiens terbatas pada channel lama",
        icon: Globe,
        boosts: ["website", "chatbot"],
      },
      {
        id: "data",
        label: "Data tidak terorganisir",
        description: "Informasi tersebar di WA, Excel, catatan",
        icon: MessageCircle,
        boosts: ["dashboard", "crm", "ai-analytics"],
      },
      {
        id: "koordinasi",
        label: "Koordinasi tim tidak efisien",
        description: "Komunikasi dan tugas sulit dilacak",
        icon: Zap,
        boosts: ["dashboard", "mobile", "pelatihan"],
      },
    ],
  },
  {
    id: 3,
    title: "Bagaimana orang menemukan atau menghubungi Anda?",
    multiSelect: true,
    options: [
      {
        id: "sosmed",
        label: "Hanya lewat media sosial",
        description: "Belum punya kehadiran web profesional",
        icon: Smartphone,
        boosts: ["website"],
      },
      {
        id: "rekomendasi",
        label: "Rekomendasi / mulut ke mulut",
        description: "Belum ada sistem digital terpusat",
        icon: HeartHandshake,
        boosts: ["website", "crm"],
      },
      {
        id: "website-lama",
        label: "Sudah punya website",
        description: "Perlu upgrade atau optimasi",
        icon: Globe,
        boosts: ["website", "chatbot", "dashboard"],
      },
      {
        id: "offline",
        label: "Brosur / tatap muka",
        description: "Masih dominan offline",
        icon: Store,
        boosts: ["website", "mobile"],
      },
    ],
  },
  {
    id: 4,
    title: "Bagaimana data dan komunikasi dikelola?",
    multiSelect: true,
    options: [
      {
        id: "wa-excel",
        label: "Manual di WA / Excel",
        description: "Data kontak, anggota, atau peserta manual",
        icon: MessageCircle,
        boosts: ["crm", "dashboard"],
      },
      {
        id: "multi-app",
        label: "Beberapa aplikasi terpisah",
        description: "Tools tidak saling terhubung",
        icon: Layers,
        boosts: ["dashboard", "otomatisasi"],
      },
      {
        id: "sistem-lama",
        label: "Sudah ada sistem",
        description: "Ingin yang lebih canggih dan terintegrasi",
        icon: Cpu,
        boosts: ["dashboard", "ai-analytics", "mobile"],
      },
    ],
  },
  {
    id: 5,
    title: "Di mana waktu paling banyak tersita?",
    multiSelect: true,
    options: [
      {
        id: "laporan",
        label: "Laporan & rekap manual",
        description: "Dokumen dan data dibuat berulang",
        icon: Layers,
        boosts: ["otomatisasi", "ai-analytics"],
      },
      {
        id: "faq",
        label: "Pertanyaan berulang",
        description: "Menjawab hal yang sama berkali-kali",
        icon: MessageCircle,
        boosts: ["chatbot"],
      },
      {
        id: "jadwal",
        label: "Jadwal & inventori",
        description: "Absensi, stok, atau jadwal tanpa sistem",
        icon: Calendar,
        boosts: ["dashboard", "otomatisasi", "pos"],
      },
    ],
  },
  {
    id: 6,
    title: "Jika ada satu solusi siap pakai besok, apa itu?",
    multiSelect: true,
    options: [
      {
        id: "web",
        label: "Website / profil online profesional",
        description: "Bisa ditemukan dan dipercaya audiens",
        icon: Globe,
        boosts: ["website"],
      },
      {
        id: "internal",
        label: "Sistem internal terpusat",
        description: "Kelola data dan aktivitas harian",
        icon: Layers,
        boosts: ["dashboard", "crm"],
      },
      {
        id: "app",
        label: "Aplikasi mobile",
        description: "Akses mudah dari mana saja untuk tim/anggota",
        icon: Smartphone,
        boosts: ["mobile"],
      },
    ],
  },
  {
    id: 7,
    title: "Minat terhadap AI & otomatisasi?",
    multiSelect: true,
    options: [
      {
        id: "ai-yes",
        label: "Sangat tertarik, ingin implementasi",
        description: "Chatbot, laporan otomatis, analisis data",
        icon: Sparkles,
        boosts: ["chatbot", "ai-analytics", "otomatisasi"],
      },
      {
        id: "ai-learn",
        label: "Ingin tahu lebih dulu",
        description: "Eksplorasi sebelum investasi penuh",
        icon: Cpu,
        boosts: ["chatbot", "pelatihan"],
      },
      {
        id: "ai-no",
        label: "Fokus solusi dasar dulu",
        description: "Website dan sistem inti lebih prioritas",
        icon: Globe,
        boosts: ["website", "dashboard"],
      },
    ],
  },
  {
    id: 8,
    title: "Kisaran anggaran untuk proyek ini?",
    multiSelect: false,
    options: [
      {
        id: "budget-low",
        label: "Di bawah Rp 10 juta",
        description: "Produk etalase / solusi starter",
        icon: Wallet,
        boosts: ["website", "chatbot", "pos", "elearning"],
      },
      {
        id: "budget-mid",
        label: "Rp 10 juta – Rp 50 juta",
        description: "Sistem menengah dengan fitur kustom",
        icon: Wallet,
        boosts: ["dashboard", "mobile", "crm", "iot"],
      },
      {
        id: "budget-high",
        label: "Di atas Rp 50 juta",
        description: "Proyek kustom skala besar",
        icon: Wallet,
        boosts: ["dashboard", "iot", "smart-system", "otomatisasi"],
      },
    ],
  },
  {
    id: 9,
    title: "Kesiapan tim atau diri sendiri mengadopsi teknologi?",
    multiSelect: false,
    options: [
      {
        id: "ready-low",
        label: "Butuh pendampingan penuh",
        description: "Belum terbiasa dengan sistem digital",
        icon: GraduationCap,
        boosts: ["pelatihan", "workshop-custom", "coaching"],
      },
      {
        id: "ready-mid",
        label: "Cukup paham, butuh panduan",
        description: "Perlu pelatihan singkat saat go-live",
        icon: HeartHandshake,
        boosts: ["pelatihan", "dashboard"],
      },
      {
        id: "ready-high",
        label: "Sudah siap langsung pakai",
        description: "Tim terbiasa software",
        icon: Zap,
        boosts: ["dashboard", "mobile", "otomatisasi"],
      },
    ],
  },
  {
    id: 10,
    title: "Kapan ingin mulai?",
    multiSelect: false,
    options: [
      {
        id: "timeline-fast",
        label: "2–4 minggu ke depan",
        description: "Butuh solusi cepat",
        icon: Zap,
        boosts: ["website", "chatbot", "pos", "elearning"],
      },
      {
        id: "timeline-mid",
        label: "1–3 bulan",
        description: "Perencanaan terstruktur",
        icon: Calendar,
        boosts: ["dashboard", "mobile", "iot"],
      },
      {
        id: "timeline-research",
        label: "Masih riset",
        description: "Eksplorasi opsi terlebih dahulu",
        icon: Globe,
        boosts: ["website", "pelatihan"],
      },
    ],
  },
];

export type SolutionId =
  | "website"
  | "chatbot"
  | "dashboard"
  | "mobile"
  | "otomatisasi"
  | "crm"
  | "elearning"
  | "ai-analytics"
  | "iot"
  | "robotik"
  | "smart-system"
  | "embedded"
  | "workshop-iot"
  | "workshop-robotik"
  | "pelatihan"
  | "workshop-custom"
  | "coaching"
  | "pos";

export interface RecommendedSolution {
  id: SolutionId;
  name: string;
  description: string;
  tag: string;
}

export const solutionCatalog: Record<SolutionId, RecommendedSolution> = {
  website: {
    id: "website",
    name: "Website Profesional",
    description:
      "Profil online yang mudah ditemukan, membangun kredibilitas, dan menjadi pusat informasi organisasi Anda.",
    tag: "ROI cepat",
  },
  chatbot: {
    id: "chatbot",
    name: "AI Chatbot (WA / Website)",
    description:
      "Membalas pertanyaan berulang secara otomatis — menghemat waktu tim dan meningkatkan respons.",
    tag: "Powered by AI",
  },
  dashboard: {
    id: "dashboard",
    name: "Dashboard & Sistem Manajemen",
    description:
      "Sistem terpusat untuk data, laporan, dan aktivitas harian — menggantikan Excel dan WA yang berantakan.",
    tag: "ROI cepat",
  },
  mobile: {
    id: "mobile",
    name: "Aplikasi Mobile (Android/iOS)",
    description:
      "Akses mudah untuk anggota, peserta, atau tim dari mana saja.",
    tag: "ROI cepat",
  },
  otomatisasi: {
    id: "otomatisasi",
    name: "Otomatisasi Proses",
    description:
      "Mengurangi pekerjaan repetitif: laporan, notifikasi, absensi, dan alur kerja.",
    tag: "Powered by AI",
  },
  crm: {
    id: "crm",
    name: "CRM / Manajemen Kontak & Anggota",
    description:
      "Kelola kontak, anggota, siswa, atau peserta dalam satu sistem.",
    tag: "ROI cepat",
  },
  elearning: {
    id: "elearning",
    name: "Platform E-Learning & Akademik",
    description:
      "LMS untuk sekolah, bimbel, dan lembaga pelatihan — materi, tugas, dan penilaian digital.",
    tag: "Khusus Pendidikan",
  },
  "ai-analytics": {
    id: "ai-analytics",
    name: "AI Analytics & Business Intelligence",
    description:
      "Insight mendalam dari data untuk keputusan yang lebih tepat.",
    tag: "Powered by AI",
  },
  iot: {
    id: "iot",
    name: "Prototipe IoT & Sensor",
    description:
      "Monitoring real-time, smart device, dan data dari perangkat fisik.",
    tag: "Hardware & IoT",
  },
  robotik: {
    id: "robotik",
    name: "Robotik & Otomasi Fisik",
    description:
      "Robot edukasi/industri, otomasi line, dan proyek hands-on.",
    tag: "Hardware & IoT",
  },
  "smart-system": {
    id: "smart-system",
    name: "Instalasi Smart System",
    description: "Smart home, smart office, kontrol perangkat jarak jauh.",
    tag: "Hardware & IoT",
  },
  embedded: {
    id: "embedded",
    name: "Perangkat Custom / Embedded",
    description: "Solusi elektronik sesuai kebutuhan spesifik proyek Anda.",
    tag: "Hardware & IoT",
  },
  "workshop-iot": {
    id: "workshop-iot",
    name: "Workshop IoT & Elektronik",
    description:
      "Pelatihan hands-on Arduino, ESP32, dan sensor untuk pelajar, guru, atau tim teknis.",
    tag: "Workshop",
  },
  "workshop-robotik": {
    id: "workshop-robotik",
    name: "Workshop Robotik",
    description: "Dari dasar hingga lanjutan — cocok untuk sekolah dan komunitas.",
    tag: "Workshop",
  },
  pelatihan: {
    id: "pelatihan",
    name: "Pelatihan Teknologi untuk Tim",
    description:
      "Onboarding sistem baru, literasi digital, dan penggunaan tools.",
    tag: "Workshop",
  },
  "workshop-custom": {
    id: "workshop-custom",
    name: "Program Pelatihan Custom",
    description: "Kurikulum dirancang sesuai kebutuhan lembaga atau perusahaan.",
    tag: "Khusus Pendidikan",
  },
  coaching: {
    id: "coaching",
    name: "Coaching Personal",
    description: "Mentoring 1-on-1 untuk skill tech dan design.",
    tag: "Workshop",
  },
  pos: {
    id: "pos",
    name: "Smart POS / Sistem Kasir",
    description:
      "Pencatatan transaksi real-time dengan analitik inventaris untuk UMKM.",
    tag: "ROI cepat",
  },
};

export const profileTitles: Record<string, string> = {
  umkm: "Solusi Digital untuk Mengembangkan Usaha Anda",
  pendidikan: "Transformasi Digital untuk Lembaga Pendidikan Anda",
  perusahaan: "Solusi Enterprise untuk Instansi & Perusahaan Anda",
  perorangan: "Wujudkan Proyek Digital Anda dengan Mitra Terpercaya",
  komunitas: "Teknologi yang Memberdayakan Komunitas & Yayasan Anda",
  default: "Rekomendasi Solusi Digital untuk Anda",
};
