import { cdn } from "@/lib/cdn";

export type ProductModelSection = {
  title: string;
  items: string[];
};

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
  /** Sembunyikan section opsi harga (beli putus / SaaS) */
  noPricing?: boolean;
  /** Model deploy atau format layanan — terpisah dari opsi harga */
  modelSection?: ProductModelSection;
};

export const DEFAULT_PRODUCT_MODEL_SECTION: ProductModelSection = {
  title: "Model implementasi",
  items: ["Siap pakai, deploy cepat", "Kustomisasi sesuai kebutuhan"],
};

export function getProductModelSection(product: Product): ProductModelSection {
  return product.modelSection ?? DEFAULT_PRODUCT_MODEL_SECTION;
}

export const PRODUCTS: Product[] = [
  {
    id: "sijagaair",
    name: "SiJagaAir: EWS Banjir Terintegrasi IoT",
    desc: "Monitor tinggi muka air real-time, notifikasi otomatis ke WhatsApp saat melewati batas aman.",
    description:
      "SiJagaAir adalah Early Warning System berbasis IoT untuk pemerintah desa dan komunitas rawan banjir. Sensor memantau ketinggian air secara real-time dan mengirim notifikasi otomatis ke WhatsApp Channel saat melewati batas aman, sehingga warga punya waktu lebih untuk bersiap.",
    badge: "Siap Pakai",
    extraBadge: "Studi Kasus Tersedia",
    tags: ["Hardware & IoT", "Khusus Pemerintahan"],
    featured: true,
    image: cdn("/images/products/sijagaair.webp"),
    link: "#portofolio",
    website: "https://sijagaair.inspiralabs.id/public",
  },
  {
    id: "erp-sekolah",
    name: "Amanah: Platform Manajemen Guru Digital",
    desc: "Platform manajemen guru dan sekolah terpadu untuk institusi pendidikan modern dan berasrama.",
    description:
      "AMANAH (Aplikasi Manajemen Anak & Sekolah) adalah platform ekosistem digital sekolah terpadu yang hadir sebagai solusi total untuk menjembatani komunikasi, transparansi, dan pemantauan perkembangan anak secara real-time. Dirancang khusus untuk institusi pendidikan modern dan berasrama.",
    badge: "Siap Pakai",
    tags: ["Khusus Pendidikan"],
    featured: true,
    image: cdn("/images/products/amanah.webp"),
    website: "https://amanah.inspiralabs.id",
  },
  {
    id: "desa",
    name: "Teras Desa: Tempat E-Layanan & Registrasi Administrasi Sipil",
    desc: "Platform tata kelola birokrasi - dari proses administrasi hingga informasi publik.",
    description:
      "Platform digital untuk mengelola administrasi desa secara terpadu: pelayanan surat, data warga, keuangan APBDes, dan transparansi informasi publik - dirancang mudah dipakai perangkat desa.",
    badge: "Siap Pakai",
    tags: ["Khusus Pemerintahan", "ROI Cepat"],
    featured: false,
    image: cdn("/images/products/teras-desa.webp"),
    website: "https://terasdesa.inspiralabs.id",
  },
  {
    id: "pos",
    name: "Inspira POS: Sistem Kasir Pintar untuk UMKM",
    desc: "Pencatatan transaksi real-time dengan analitik inventaris untuk UMKM.",
    description:
      "Inspira POS adalah sistem kasir pintar untuk UMKM: catat transaksi, pantau stok, dan lihat ringkasan penjualan harian dari satu dashboard yang mudah dipakai.",
    badge: "Siap Pakai",
    tags: ["Khusus UMKM", "ROI Cepat"],
    featured: false,
    image: cdn("/images/products/inspira-pos.webp"),
    website: "https://inspirapos.biz.id",
  },
  {
    id: "lms",
    name: "LMS (Learning Management System)",
    desc: "Platform e-learning untuk sekolah, bimbel, dan lembaga pelatihan.",
    description:
      "Learning Management System untuk mengelola materi, tugas, penilaian, dan portofolio siswa secara digital - cocok untuk sekolah, bimbel, dan lembaga kursus yang ingin naik kelas secara digital.",
    badge: "Siap Pakai",
    tags: ["Khusus Pendidikan"],
    featured: false,
    image: cdn("/images/products/lms.webp"),
    website: "https://allboom.inspiralabs.id",
  },
  {
    id: "erp-masjid",
    name: "IMAM: Informasi & Manajemen Aktivitas Masjid",
    desc: "Digitalisasi jamaah, keuangan, dan transparansi program ziswaf.",
    description:
      "IMAM dirancang untuk menjawab kebutuhan nyata DKM (Dewan Kemakmuran Masjid) di Indonesia yang selama ini mengelola masjid secara manual — pencatatan keuangan di buku tulis, pengumuman lewat pengeras suara, pendaftaran jamaah via grup WhatsApp.",
    badge: "Siap Pakai",
    tags: ["Khusus Komunitas"],
    featured: false,
    image: cdn("/images/products/imam-platform.webp"),
  },
  {
    id: "pelatihan",
    name: "Paket Pelatihan Tech & Design",
    desc: "Program upgrade skill - coding, Roblox, IoT hands-on.",
    description:
      "Paket pelatihan teknologi dan desain yang dapat disesuaikan: coding, Roblox, IoT hands-on, dan workshop kreatif untuk sekolah, perusahaan, dan komunitas.",
    badge: "Siap Pakai",
    tags: ["Workshop", "Khusus Pendidikan"],
    featured: false,
    noPricing: true,
    modelSection: {
      title: "Model pelatihan",
      items: ["On Site", "Hybrid", "Online", "Intensive Class", "One-Day Workshop"],
    },
    image: cdn("/images/products/pelatihan-hardware.webp"),
  },
];
