import type { LucideIcon } from "lucide-react";
import {
  Cpu,
  Droplets,
  Flower,
  Heart,
  Home,
  LayoutDashboard,
  Wallet,
} from "lucide-react";

export type PortfolioCategory =
  | "software"
  | "iot"
  | "design"
  | "pelatihan"
  | "all";

export type ContentType = "case-study" | "features" | "workshop";

export interface ClientReview {
  text: string;
  author: string;
  role?: string;
  company?: string;
}

export interface PortfolioFeature {
  label: string;
  desc: string;
}

export interface PortfolioCase {
  id: string;
  name: string;
  subtitle?: string;
  icon: LucideIcon;
  images: string[];
  category: PortfolioCategory;
  contentType: ContentType;
  featured?: boolean;
  problem?: string;
  solution?: string;
  results?: string[];
  features?: PortfolioFeature[];
  location?: string;
  descPoints?: string[];
  website?: string;
  tags: string[];
  review: ClientReview;
}

import { cdn } from "@/lib/cdn";
const img = (file: string) => cdn(`/images/portfolio/${file}`);

export const portfolioCases: PortfolioCase[] = [
  {
    id: "sijagaair",
    name: "SiJagaAir: EWS Banjir Terintegrasi IoT",
    subtitle: "Desa Bojongkulur, Bogor",
    icon: Droplets,
    images: [img("sijagaair.webp")],
    category: "iot",
    contentType: "case-study",
    featured: true,
    website: "https://sijagaair.inspiralabs.id/public",
    tags: ["IoT", "Pemerintahan", "Studi Kasus"],
    problem:
      "Desa membutuhkan peringatan dini banjir yang cepat dan mudah diakses warga.",
    solution:
      "Early Warning System berbasis Internet of Things (IoT) dengan notifikasi otomatis ke WhatsApp Channel desa.",
    results: [
      "Monitor tinggi muka air real-time",
      "Notifikasi WA saat melewati batas aman",
      "Warga bisa bersiap jauh lebih cepat",
    ],
    review: {
      text: "Notifikasi WA langsung masuk ke WhatsApp Channel desa Bojong Kulur saat muka air naik. Warga kini bisa bersiap jauh lebih cepat sebelum banjir tiba.",
      author: "Firman Riansyah, S.E.",
      role: "Kepala Desa Bojong Kulur, Gunung Putri, Bogor",
    },
  },
  {
    id: "amanah",
    name: "Amanah: Platform Manajemen Guru Digital",
    subtitle: "Sekolah Quran Asy Syahid, Ciangsana, Bogor",
    icon: Droplets,
    images: [img("amanah-platform.webp")],
    category: "software",
    contentType: "case-study",
    featured: true,
    website: "https://amanah.inspiralabs.id",
    tags: ["Software", "Pendidikan", "Studi Kasus"],
    problem:
      "Sekolah membutuhkan platform digital untuk Guru, Musyrif, dan orang tua. Tujuannya untuk memudahkan manajemen tugas, komunikasi, dan pemantauan perkembangan siswa secara real-time.",
    solution:
      "AMANAH (Aplikasi Manajemen Anak & Sekolah) adalah platform ekosistem digital sekolah terpadu yang hadir sebagai solusi total untuk menjembatani komunikasi, transparansi, dan pemantauan perkembangan anak secara real-time. Dirancang khusus untuk institusi pendidikan modern dan berasrama.",
    results: [
      "Platform manajemen guru dan sekolah terpadu",
      "Memudahkan komunikasi dan pemantauan perkembangan siswa",
    ],
    review: {
      text: "AMANAH memudahkan komunikasi antara guru, musyrif, dan orang tua. Kami bisa memantau perkembangan siswa secara real-time, sehingga bisa lebih cepat tanggap jika ada kebutuhan khusus.",
      author: "Chayyi Abdul Wahid, S.Sos.",
      role: "Guru PKN dan Sejarah | Musyrif Kepesantrenan",
    },
  },
  {
    id: "workshop-iot",
    name: "Instruktur Workshop Hardware dan IoT",
    subtitle: "SDIT Kota Depok",
    icon: Cpu,
    images: [img("pelatihan-hardware.webp")],
    category: "pelatihan",
    contentType: "workshop",
    tags: ["Pelatihan", "IoT", "Pendidikan"],
    location: "Salah satu sekolah SDIT di Kota Depok",
    descPoints: [
      "Mengajarkan pengenalan hardware dan IoT kepada guru dan siswa",
      "Implementasi hardware programming sebagai ajang karya siswa",
    ],
    review: {
      text: "Pelatihan untuk para guru ini sangat bermanfaat, mulai dari belajar merakit hingga implementasi. Karya siswa yang dihasilkan juga menarik dan menunjukkan kreativitas mereka.",
      author: "Erda Octarianti, S. Kom.",
      role: "Guru Informatika, SDIT Depok",
    },
  },
  {
    id: "kaswarga",
    name: "Kas Warga: Aplikasi Kas Warga",
    subtitle: "Perumahan Pesona Kahuripan 6",
    icon: Home,
    images: [img("kaswarga.webp")],
    category: "software",
    contentType: "case-study",
    tags: ["Software", "Komunitas", "Studi Kasus"],
    problem:
      "Setiap bulan warga membayar IPL (iuran pengelolaan lingkungan) lalu mengirim bukti transfer ke grup WhatsApp. Humas Gang harus merekap manual siapa yang sudah bayar, melaporkan ke Ketua RT, sekaligus mencatat uang masuk dan keluar kas gang - prosesnya lambat, rawan terlewat, dan tidak transparan bagi warga.",
    solution:
      "Aplikasi Kas Warga: warga lapor pembayaran IPL dari HP, Humas Gang sebagai admin merekap status bayar dan arus kas dalam satu dashboard, sementara seluruh warga bisa melihat saldo kas gang secara real-time.",
    results: [
      "Bukti bayar IPL terkumpul rapi tanpa chat berantakan di grup WA",
      "Humas Gang rekap bulanan dalam hitungan menit, bukan bermalam-malam",
      "Uang masuk, keluar, dan saldo kas gang transparan untuk warga",
    ],
    review: {
      text: "Dulu saya rekap IPL dari screenshot WA satu per satu. Sekarang cukup buka aplikasi - siapa sudah bayar langsung kelihatan, Ketua RT juga dapat laporannya lebih cepat.",
      author: "Humas Gang 6",
      role: "Perumahan PK6",
    },
  },
  {
    id: "kelas-seni",
    name: "Kelas Seni – Labschool Cibubur",
    subtitle: "Platform E-Portfolio Seni Digital",
    icon: Flower,
    images: [img("allboom.webp")],
    category: "software",
    contentType: "case-study",
    tags: ["Software", "Pendidikan", "Studi Kasus"],
    problem:
      "Penilaian karya seni siswa masih dilakukan secara manual - guru kewalahan rekap.",
    solution:
      "Platform E-Portfolio Seni untuk mengelola tugas, karya, dan penilaian seni digital.",
    results: [
      "Penilaian karya seni siswa menjadi lebih cepat dan efisien",
      "Halaman Portfolio Seni untuk menampilkan karya siswa",
    ],
    review: {
      text: "Sekarang guru bisa menilai karya siswa dari mana saja. Proses yang dulu makan waktu seharian, kini selesai dalam 2 jam.",
      author: "Osy Fatikawati",
      role: "Guru Seni, Labschool Cibubur",
    },
  },
  {
    id: "kasly",
    name: "Aplikasi Pencatatan Keuangan – Kasly",
    subtitle: "Mobile Finance App",
    icon: Wallet,
    images: [img("kasly.webp")],
    category: "software",
    contentType: "features",
    tags: ["Software", "FinTech"],
    features: [
      {
        label: "Payday Budgeting",
        desc: "Atur tanggal gajian sesuai kantor. Periode budget mengikuti siklus gajian.",
      },
      {
        label: "Insight",
        desc: "Pengingat berbasis analisa pola pengeluaran.",
      },
      {
        label: "Forecast Cerdas",
        desc: "Prediksi total pengeluaran hingga akhir periode.",
      },
    ],
    review: {
      text: "Fitur Payday Budgeting-nya game changer. Akhirnya budget saya ngikutin siklus gajian, bukan ngikutin kalender.",
      author: "Kiki",
      role: "Pengguna aktif Kasly",
    },
  },
  {
    id: "ecc",
    name: "Monitoring, SLA and Ticket Management",
    subtitle: "ECC Master Dash",
    icon: LayoutDashboard,
    images: [img("ecc-master-dash.webp")],
    category: "software",
    contentType: "features",
    tags: ["Software", "Enterprise", "Dashboard"],
    features: [
      { label: "Monitoring", desc: "Monitor kinerja sistem dan infrastruktur secara real-time." },
      { label: "SLA Management", desc: "Setel dan tracking SLA untuk setiap layanan." },
      { label: "Ticket Management", desc: "Kelola tiket insiden dan permintaan layanan terpusat." },
    ],
    review: {
      text: "Dashboard ini membuat tim IT kami punya visibilitas penuh. SLA tracking-nya sangat membantu komunikasi dengan klien.",
      author: "Tim IT ECC",
      role: "Enterprise Client",
    },
  },  
  {
    id: "wedding",
    name: "Undangan Digital Pernikahan",
    subtitle: "Creative & Visual Branding",
    icon: Heart,
    images: [img("wedding-invitation.webp")],
    category: "software",
    contentType: "case-study",
    tags: ["Software", "Studi Kasus"],
    problem: "Undangan fisik mahal dan sulit di-update untuk tamu jarak jauh.",
    solution:
      "Undangan digital interaktif dengan RSVP, peta lokasi, dan galeri foto.",
    results: [
      "Tamu bisa konfirmasi kehadiran online",
      "Desain elegan selaras identitas pasangan",
    ],
    review: {
      text: "Tamu dari luar kota sangat terbantu dengan undangan digitalnya. Desainnya elegan dan mudah dibagikan.",
      author: "Pasangan Pengantin",
      role: "Klien Wedding Invite",
    },
  },
];

export const portfolioFilters: { id: PortfolioCategory; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "software", label: "Software" },
  { id: "iot", label: "IoT" },
  { id: "design", label: "Design" },
  { id: "pelatihan", label: "Pelatihan" },
];
