import { SITE } from "@/lib/site";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "pengendali",
    title: "1. Identitas Pengendali Data",
    paragraphs: [
      `Pengendali data pribadi adalah ${SITE.legalName} (beroperasi dengan merek dagang "${SITE.name}"), dengan situs ${SITE.url}. Untuk pertanyaan privasi, hubungi ${SITE.email} atau WhatsApp ${SITE.whatsappDisplay}.`,
    ],
  },
  {
    id: "data-dikumpulkan",
    title: "2. Data yang Kami Kumpulkan",
    paragraphs: ["Kami dapat mengumpulkan data berikut ketika Anda berinteraksi dengan website atau layanan kami:"],
    list: [
      "Identitas dan kontak: nama, nomor WhatsApp, tipe organisasi, sub-klasifikasi tipe (jenis instansi, bidang usaha, jenjang pendidikan, dll. — jika diisi), institusi/perusahaan (jika diisi), jabatan/posisi (jika diisi), kota (jika diisi), email (jika diisi).",
      "Isian formulir kontak dan survey kebutuhan digital.",
      "Detail kebutuhan proyek yang Anda sampaikan secara sukarela.",
      "Data teknis: alamat IP, jenis perangkat, log akses, dan cookie (jika analytics diaktifkan).",
    ],
  },
  {
    id: "tujuan",
    title: "3. Tujuan Pemrosesan",
    paragraphs: ["Data digunakan untuk:"],
    list: [
      "Menanggapi permintaan konsultasi, penawaran, dan komunikasi bisnis.",
      "Menyediakan survey rekomendasi layanan dan tindak lanjut dari tim kami.",
      "Meningkatkan website, keamanan sistem, dan pengalaman pengguna.",
      "Memenuhi kewajiban hukum yang berlaku di Indonesia.",
    ],
  },
  {
    id: "dasar-hukum",
    title: "4. Dasar Hukum",
    paragraphs: [
      "Pemrosesan dilakukan berdasarkan persetujuan Anda, pelaksanaan langkah sebelum kontrak, kepentingan sah pengendali data, dan/atau kewajiban hukum sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP) serta peraturan turunannya.",
    ],
  },
  {
    id: "pihak-ketiga",
    title: "5. Berbagi Data ke Pihak Ketiga",
    paragraphs: [
      "Kami tidak menjual data pribadi Anda. Data dapat diproses oleh penyedia layanan pendukung (misalnya hosting, email, analytics, WhatsApp Business) hanya sejauh diperlukan untuk operasional layanan, dengan kewajiban kerahasiaan dan keamanan yang wajar.",
    ],
  },
  {
    id: "retensi",
    title: "6. Retensi Data",
    paragraphs: [
      "Data disimpan selama diperlukan untuk tujuan pemrosesan, penyelesaian proyek, atau pemenuhan kewajiban hukum. Data yang tidak lagi diperlukan akan dihapus atau dianonimkan secara wajar.",
    ],
  },
  {
    id: "hak-subjek",
    title: "7. Hak Anda sebagai Subjek Data",
    paragraphs: ["Sesuai peraturan yang berlaku, Anda berhak untuk:"],
    list: [
      "Mengakses dan memperoleh salinan data pribadi Anda.",
      "Memperbaiki data yang tidak akurat atau tidak lengkap.",
      "Menarik persetujuan (dengan konsekuensi terhadap layanan tertentu).",
      "Meminta penghapusan atau pembatasan pemrosesan dalam kondisi tertentu.",
      "Mengajukan keluhan kepada otoritas perlindungan data yang berwenang.",
    ],
  },
  {
    id: "keamanan",
    title: "8. Keamanan Data",
    paragraphs: [
      "Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah. Tidak ada sistem yang 100% aman; kami berkomitmen memperbarui praktik keamanan secara berkala.",
    ],
  },
  {
    id: "cookie",
    title: "9. Cookie dan Analytics",
    paragraphs: [
      "Website dapat menggunakan cookie esensial dan, jika diaktifkan, alat analitik untuk memahami penggunaan situs, antara lain Google Analytics 4 dan Meta Pixel (Facebook). Data yang dikumpulkan alat ini bersifat agregat atau pseudonim (misalnya halaman yang dikunjungi, perangkat, interaksi tombol WhatsApp atau formulir) dan digunakan untuk meningkatkan layanan serta mengukur efektivitas kampanye.",
      "Anda dapat mengatur preferensi cookie melalui peramban Anda atau menonaktifkan pelacaran personalisasi di pengaturan iklan Meta/Google. Tanpa persetujuan cookie non-esensial, beberapa fitur analitik mungkin tidak berjalan penuh.",
    ],
  },
  {
    id: "perubahan",
    title: "10. Perubahan Kebijakan",
    paragraphs: [
      "Kebijakan ini dapat diperbarui sewaktu-waktu. Versi terbaru akan dipublikasikan di halaman ini dengan tanggal berlaku yang diperbarui.",
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "penerimaan",
    title: "1. Penerimaan Ketentuan",
    paragraphs: [
      `Dengan mengakses dan menggunakan website ${SITE.url}, Anda menyetujui Syarat & Ketentuan ini. Jika tidak setuju, mohon tidak menggunakan website ini.`,
    ],
  },
  {
    id: "definisi",
    title: "2. Definisi",
    paragraphs: ["Dalam dokumen ini:"],
    list: [
      `"Kami" / "InspiraLabs" mengacu pada ${SITE.legalName}.`,
      `"Anda" / "Pengguna" adalah pengunjung website atau calon/klien layanan.`,
      `"Layanan" mencakup pengembangan software, IoT, desain visual, pelatihan, dan produk siap pakai.`,
      `"Kontrak Proyek" adalah perjanjian tertulis terpisah (proposal, SOW, PO, atau kontrak) yang mengikat secara hukum.`,
    ],
  },
  {
    id: "ruang-lingkup",
    title: "3. Ruang Lingkup Website vs Kontrak Proyek",
    paragraphs: [
      "Informasi di website bersifat umum dan promosi. Penawaran harga, timeline, cakupan fitur, garansi, dan hak kekayaan intelektual proyek diatur dalam Kontrak Proyek yang disepakati secara tertulis. Jika terjadi perbedaan, ketentuan Kontrak Proyek yang berlaku.",
    ],
  },
  {
    id: "penggunaan",
    title: "4. Penggunaan Website",
    paragraphs: ["Anda setuju untuk tidak:"],
    list: [
      "Menggunakan website untuk tujuan melanggar hukum atau merugikan pihak lain.",
      "Mencoba mengakses sistem, data, atau jaringan kami tanpa izin.",
      "Menyalin, mendistribusikan, atau memodifikasi konten website tanpa persetujuan tertulis.",
      "Mengirimkan konten berbahaya, spam, atau informasi menyesatkan melalui formulir kami.",
    ],
  },
  {
    id: "konsultasi",
    title: "5. Konsultasi dan Penawaran",
    paragraphs: [
      "Konsultasi awal melalui website, email, atau WhatsApp tidak mengikat secara hukum hingga proposal atau kontrak disetujui oleh kedua belah pihak. Estimasi biaya dan jadwal dapat berubah setelah analisis kebutuhan mendalam.",
    ],
  },
  {
    id: "ki",
    title: "6. Kekayaan Intelektual",
    paragraphs: [
      "Materi di website (teks, desain, logo, ilustrasi) adalah milik InspiraLabs atau pemberi lisensi dan dilindungi hukum. Hak atas deliverable proyek (kode, desain, dokumentasi) diatur dalam Kontrak Proyek, termasuk lisensi, kepemilikan, dan pembatasan penggunaan.",
    ],
  },
  {
    id: "pembayaran",
    title: "7. Pembayaran dan Refund",
    paragraphs: [
      "Skema pembayaran (termin, beli putus, langganan SaaS) dijelaskan dalam proposal atau halaman harga. Kebijakan refund, pembatalan, dan penaltas mengikuti ketentuan Kontrak Proyek masing-masing proyek.",
    ],
  },
  {
    id: "garansi",
    title: "8. Garansi dan Pemeliharaan",
    paragraphs: [
      "Layanan pengembangan perangkat lunak dapat disertai masa pemeliharaan (maintenance) pasca serah terima sebagaimana tercantum dalam kontrak. Cakupan bug, update, dan SLA ditentukan per proyek, bukan secara generik di website ini.",
    ],
  },
  {
    id: "kerahasiaan",
    title: "9. Kerahasiaan",
    paragraphs: [
      "Kami menghormati kerahasiaan informasi bisnis dan teknis yang Anda bagikan dalam proses konsultasi dan proyek, kecuali diwajibkan oleh hukum atau disetujui lain oleh Anda.",
    ],
  },
  {
    id: "batasan",
    title: "10. Batasan Tanggung Jawab",
    paragraphs: [
      "Website disediakan \"sebagaimana adanya\". Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian tidak langsung, kehilangan data, atau gangguan bisnis akibat penggunaan website. Tanggung jawab atas layanan proyek dibatasi sesuai Kontrak Proyek.",
    ],
  },
  {
    id: "force-majeure",
    title: "11. Keadaan Kahar",
    paragraphs: [
      "Kami tidak bertanggung jawab atas keterlambatan atau kegagalan yang disebabkan oleh keadaan di luar kendali wajar (bencana alam, gangguan infrastruktur, regulasi pemerintah, dll.).",
    ],
  },
  {
    id: "hukum",
    title: "12. Hukum yang Berlaku",
    paragraphs: [
      "Syarat ini tunduk pada hukum Republik Indonesia. Sengketa akan diselesaikan terlebih dahulu secara musyawarah; jika tidak tercapai, melalui pengadilan yang berwenang di Indonesia.",
    ],
  },
  {
    id: "kontak",
    title: "13. Kontak",
    paragraphs: [
      `Pertanyaan mengenai Syarat & Ketentuan: ${SITE.email} · WhatsApp ${SITE.whatsappDisplay}.`,
    ],
  },
];

export const LEGAL_LAST_UPDATED = "22 Mei 2026";
