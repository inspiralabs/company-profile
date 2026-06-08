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
    image: "/images/products/sijagaair.jpeg",
    link: "#portofolio",
    website: "https://sijagaair.redcode.my.id/public",
  },
  {
    id: "desa",
    name: "SIGAP DESA — Sistem Informasi Desa Terpadu",
    desc: "Platform tata kelola birokrasi — dari surat keterangan hingga laporan keuangan desa.",
    description:
      "Platform digital untuk mengelola administrasi desa secara terpadu: pelayanan surat, data warga, keuangan APBDes, dan transparansi informasi publik — dirancang mudah dipakai perangkat desa.",
    badge: "Siap Pakai",
    tags: ["Khusus Pemerintahan", "ROI Cepat"],
    featured: false,
    image: "/images/products/Sistem_Informasi_Desa_Terpadu.jpeg",
    website: "https://sigap-desa-app.vercel.app/",
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
    image: "/images/products/LMS.jpeg",
    website: "https://allboom-app.netlify.app/",
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
    image: "/images/products/Sistem_Manajemen_Ekosistem_Masjid.jpeg",
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
    image: "/images/products/smart_POS.jpeg",
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
    image: "/images/products/workshop-hardware-1.jpg",
  },
];
