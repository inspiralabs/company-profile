import { cdn } from "@/lib/cdn";

export type Product = {
  id: string;
  name: string;
  desc: string;
  description: string;
  badge: string;
  extraBadge?: string;
  tags: string[];
  featured?: boolean;
  image: string;
  link?: string;
  website?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sijagaair",
    name: "SiJagaAir — EWS Banjir Terintegrasi IoT",
    desc: "Monitor tinggi muka air real-time, notifikasi otomatis ke WhatsApp saat melewati batas aman.",
    description:
      "SiJagaAir adalah Early Warning System berbasis IoT untuk pemerintah desa dan komunitas rawan banjir. Sensor memantau ketinggian air secara real-time dan mengirim notifikasi otomatis ke WhatsApp Channel saat melewati batas aman, sehingga warga punya waktu lebih untuk bersiap.",
    badge: "Siap Pakai",
    extraBadge: "Studi Kasus Tersedia",
    tags: ["Hardware & IoT", "Khusus Pemerintahan"],
    featured: true,
    image: cdn("/images/products/sijagaair.jpeg"),
    link: "#portofolio",
    website: "https://sijagaair.inspiralabs.id/public",
  },
  {
    id: "erp",
    name: "Amanah — Platform Manajemen Guru Digital",
    desc: "Platform manajemen guru dan sekolah terpadu untuk institusi pendidikan modern dan berasrama.",
    description:
      "AMANAH (Aplikasi Manajemen Anak & Sekolah) adalah platform ekosistem digital sekolah terpadu yang hadir sebagai solusi total untuk menjembatani komunikasi, transparansi, dan pemantauan perkembangan anak secara real-time. Dirancang khusus untuk institusi pendidikan modern dan berasrama.",
    badge: "Siap Pakai",
    tags: ["Khusus Pendidikan"],
    featured: true,
    image: cdn("/images/products/amanah.jpeg"),
    website: "https://amanah.inspiralabs.id",
  },
  {
    id: "desa",
    name: "Teras Desa — Sistem Informasi Desa Terpadu",
    desc: "Platform tata kelola birokrasi — dari proses administrasi hingga informasi publik.",
    description:
      "Platform digital untuk mengelola administrasi desa secara terpadu: pelayanan surat, data warga, keuangan APBDes, dan transparansi informasi publik — dirancang mudah dipakai perangkat desa.",
    badge: "Siap Pakai",
    tags: ["Khusus Pemerintahan", "ROI Cepat"],
    featured: false,
    image: cdn("/images/products/Sistem_Informasi_Desa_Terpadu.jpeg"),
    website: "https://terasdesa.inspiralabs.id",
  },
  {
    id: "lms",
    name: "LMS (Learning Management System)",
    desc: "Platform e-learning untuk sekolah, bimbel, dan lembaga pelatihan.",
    description:
      "Learning Management System untuk mengelola materi, tugas, penilaian, dan portofolio siswa secara digital — cocok untuk sekolah, bimbel, dan lembaga kursus yang ingin naik kelas secara digital.",
    badge: "Siap Pakai",
    tags: ["Khusus Pendidikan"],
    featured: false,
    image: cdn("/images/products/LMS.jpeg"),
    website: "https://allboom.inspiralabs.id",
  },
  {
    id: "masjid",
    name: "Sistem Manajemen Ekosistem Masjid",
    desc: "Digitalisasi jamaah, keuangan, dan transparansi program ziswaf.",
    description:
      "Solusi manajemen masjid terintegrasi: pencatatan jamaah, keuangan, program ziswaf, dan laporan transparansi untuk pengurus dan jamaah.",
    badge: "Siap Pakai",
    tags: ["Khusus Komunitas"],
    featured: false,
    image: cdn("/images/products/Sistem_Manajemen_Ekosistem_Masjid.jpeg"),
  },
  {
    id: "pos",
    name: "Smart POS / Sistem Kasir",
    desc: "Pencatatan transaksi real-time dengan analitik inventaris untuk UMKM.",
    description:
      "Sistem kasir pintar untuk UMKM: catat transaksi, pantau stok, dan lihat ringkasan penjualan harian dari satu dashboard yang mudah dipakai.",
    badge: "Siap Pakai",
    tags: ["Khusus UMKM", "ROI Cepat"],
    featured: false,
    image: cdn("/images/products/smart_POS.jpeg"),
  },
  {
    id: "pelatihan",
    name: "Paket Pelatihan Eksekutif Tech & Design",
    desc: "Program upgrade skill — coding, Roblox, IoT hands-on.",
    description:
      "Paket pelatihan teknologi dan desain yang dapat disesuaikan: coding, Roblox, IoT hands-on, dan workshop kreatif untuk sekolah, perusahaan, dan komunitas.",
    badge: "Siap Pakai",
    tags: ["Workshop", "Khusus Pendidikan"],
    featured: false,
    image: cdn("/images/products/workshop-hardware-1.jpg"),
  },
];
