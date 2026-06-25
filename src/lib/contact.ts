import type { RecommendedSolution } from "@/data/survey-questions";
import { surveyQuestions } from "@/data/survey-questions";
import { SITE } from "@/lib/site";

export type TipeKlien =
  | "pemerintah"
  | "perusahaan"
  | "pendidikan"
  | "umkm"
  | "perorangan"
  | "komunitas"
  | "lainnya";

export type ClientInfo = {
  nama: string;
  tipeKlien: TipeKlien;
  detailTipe?: string;
  detailTipeLainnya?: string;
  namaInstansi?: string;
  jabatan?: string;
  kota?: string;
  whatsapp: string;
  email?: string;
};

export type ContactPayload = ClientInfo & {
  tujuan?: string;
  pesan?: string;
};

export type EmailDraft = {
  to: string;
  from: string;
  subject: string;
  body: string;
};

export type DetailOption = { value: string; label: string };

export const DETAIL_LAINNYA = "lainnya";

export const TIPE_KLIEN_OPTIONS: { value: TipeKlien; label: string }[] = [
  { value: "pemerintah", label: "Pemerintah / Instansi Publik" },
  { value: "perusahaan", label: "Perusahaan Swasta" },
  { value: "pendidikan", label: "Sekolah / Lembaga Pendidikan" },
  { value: "umkm", label: "UMKM / Usaha / Toko" },
  { value: "perorangan", label: "Perorangan" },
  { value: "komunitas", label: "Komunitas / Yayasan" },
  { value: "lainnya", label: "Lainnya" },
];

export const TIPE_KLIEN_DETAIL_OPTIONS: Record<TipeKlien, DetailOption[]> = {
  pemerintah: [
    { value: "desa", label: "Pemerintah Desa" },
    { value: "kecamatan", label: "Pemerintah Kecamatan" },
    { value: "kabkota", label: "Pemerintah Kabupaten/Kota" },
    { value: "provinsi", label: "Pemerintah Provinsi" },
    { value: "kementerian", label: "Kementerian / Lembaga Pusat" },
    { value: "bumn", label: "BUMN" },
    { value: "bumd", label: "BUMD" },
    { value: "tni-polri", label: "TNI / Polri" },
    { value: DETAIL_LAINNYA, label: "Lainnya" },
  ],
  perusahaan: [
    { value: "it", label: "Teknologi / IT" },
    { value: "akuntansi", label: "Akuntansi / Keuangan / Pajak" },
    { value: "agensi", label: "Agensi (Marketing / Creative / Digital)" },
    { value: "retail", label: "Retail / Distribusi / E-commerce" },
    { value: "manufaktur", label: "Manufaktur / Produksi" },
    { value: "logistik", label: "Logistik / Transportasi" },
    { value: "fnb", label: "F&B / Hospitality" },
    { value: "kesehatan", label: "Kesehatan / Medis / Farmasi" },
    { value: "pelatihan", label: "Pendidikan / Pelatihan Korporat" },
    { value: "properti", label: "Properti / Konstruksi / Real estate" },
    { value: "energi", label: "Energi / Pertambangan" },
    { value: "jasa-profesional", label: "Jasa Profesional" },
    { value: "media", label: "Media / Hiburan" },
    { value: DETAIL_LAINNYA, label: "Lainnya" },
  ],
  pendidikan: [
    { value: "paud", label: "PAUD / TK / RA" },
    { value: "sd", label: "SD / MI" },
    { value: "smp", label: "SMP / MTs" },
    { value: "sma", label: "SMA / MA" },
    { value: "smk", label: "SMK" },
    { value: "slb", label: "SLB / Pendidikan Khusus" },
    { value: "pt-d3s1", label: "Perguruan Tinggi (D3/D4/S1)" },
    { value: "pt-s2s3", label: "Perguruan Tinggi (S2/S3)" },
    { value: "pesantren", label: "Pesantren / Madrasah" },
    { value: "bimbel", label: "Bimbel / Lembaga Kursus" },
    { value: "blk", label: "Lembaga Pelatihan / BLK" },
    { value: "internasional", label: "Sekolah Internasional" },
    { value: DETAIL_LAINNYA, label: "Lainnya" },
  ],
  umkm: [
    { value: "fnb", label: "Kuliner / F&B" },
    { value: "retail", label: "Retail / Toko" },
    { value: "jasa", label: "Jasa (salon, bengkel, laundry, dll.)" },
    { value: "ecommerce", label: "Online shop / E-commerce" },
    { value: "manufaktur", label: "Manufaktur / Produksi skala kecil" },
    { value: "pertanian", label: "Pertanian / Perkebunan" },
    { value: "kerajinan", label: "Kerajinan / Fashion" },
    { value: "kreatif", label: "Agensi / Jasa kreatif kecil" },
    { value: DETAIL_LAINNYA, label: "Lainnya" },
  ],
  perorangan: [
    { value: "mhs-d3s1", label: "Mahasiswa (D3/D4/S1)" },
    { value: "mhs-s2s3", label: "Mahasiswa (S2/S3)" },
    { value: "pelajar", label: "Pelajar (SMP/SMA)" },
    { value: "freelancer", label: "Freelancer / Konsultan" },
    { value: "guru", label: "Guru / Tenaga pendidik" },
    { value: "profesional", label: "Karyawan / Profesional" },
    { value: "creator", label: "Content creator / Influencer" },
    { value: "wirausaha", label: "Wirausaha perorangan" },
    { value: DETAIL_LAINNYA, label: "Lainnya" },
  ],
  komunitas: [
    { value: "yayasan", label: "Yayasan sosial / nirlaba" },
    { value: "tech", label: "Komunitas teknologi / hobi" },
    { value: "kampus", label: "Komunitas mahasiswa / kampus" },
    { value: "agama", label: "Organisasi keagamaan" },
    { value: "ngo", label: "LSM / NGO" },
    { value: "asosiasi", label: "Asosiasi / Ikatan profesi" },
    { value: DETAIL_LAINNYA, label: "Lainnya" },
  ],
  lainnya: [],
};

export const EMPTY_CLIENT_INFO: ClientInfo = {
  nama: "",
  tipeKlien: "perorangan",
  detailTipe: "",
  detailTipeLainnya: "",
  namaInstansi: "",
  jabatan: "",
  kota: "",
  whatsapp: "",
  email: "",
};

const inputClass =
  "mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-gold-antique focus:outline-none focus:ring-1 focus:ring-gold-antique";

export { inputClass as contactInputClass };

export function getTipeKlienLabel(tipe: TipeKlien): string {
  return TIPE_KLIEN_OPTIONS.find((o) => o.value === tipe)?.label ?? tipe;
}

export function getDetailTipeFieldLabel(tipe: TipeKlien): string {
  switch (tipe) {
    case "pemerintah":
      return "Jenis instansi";
    case "perusahaan":
      return "Bidang usaha";
    case "pendidikan":
      return "Jenjang / jenis lembaga";
    case "umkm":
      return "Sektor usaha";
    case "perorangan":
      return "Profil Anda";
    case "komunitas":
      return "Jenis organisasi";
    case "lainnya":
      return "Jelaskan profil Anda";
    default:
      return "Detail";
  }
}

export function getDetailTipeLabel(
  tipe: TipeKlien,
  detailValue: string
): string {
  const opt = TIPE_KLIEN_DETAIL_OPTIONS[tipe].find((o) => o.value === detailValue);
  return opt?.label ?? detailValue;
}

export function usesDetailTextareaOnly(tipe: TipeKlien): boolean {
  return tipe === "lainnya";
}

export function getInstansiLabel(tipe: TipeKlien): string {
  switch (tipe) {
    case "pemerintah":
      return "Nama Instansi / Dinas";
    case "umkm":
      return "Nama Usaha / Toko";
    case "pendidikan":
      return "Nama Sekolah / Lembaga";
    case "perusahaan":
      return "Nama Perusahaan";
    case "komunitas":
      return "Nama Komunitas / Yayasan";
    case "lainnya":
      return "Nama Instansi / Organisasi";
    default:
      return "Nama Usaha / Brand";
  }
}

export function formatDetailTipeLine(info: ClientInfo): string | null {
  if (usesDetailTextareaOnly(info.tipeKlien)) {
    const text = info.detailTipeLainnya?.trim();
    return text ? `${getDetailTipeFieldLabel(info.tipeKlien)}: ${text}` : null;
  }

  const detail = info.detailTipe?.trim();
  if (!detail) return null;

  const label = getDetailTipeFieldLabel(info.tipeKlien);
  if (detail === DETAIL_LAINNYA) {
    const custom = info.detailTipeLainnya?.trim();
    return custom ? `${label}: ${custom}` : `${label}: Lainnya`;
  }

  return `${label}: ${getDetailTipeLabel(info.tipeKlien, detail)}`;
}

export function isClientInfoValid(info: ClientInfo): boolean {
  return (
    info.nama.trim().length > 0 &&
    info.tipeKlien.length > 0 &&
    info.whatsapp.trim().length > 0
  );
}

export function canSendViaEmail(info: ClientInfo): boolean {
  return (info.email?.trim().length ?? 0) > 0;
}

export function buildClientBlock(info: ClientInfo): string[] {
  const lines: string[] = [
    `Nama: ${info.nama.trim()}`,
    `Tipe: ${getTipeKlienLabel(info.tipeKlien)}`,
  ];

  const detailLine = formatDetailTipeLine(info);
  if (detailLine) {
    lines.push(detailLine);
  }

  if (info.namaInstansi?.trim()) {
    lines.push(`${getInstansiLabel(info.tipeKlien)}: ${info.namaInstansi.trim()}`);
  }
  if (info.jabatan?.trim()) {
    lines.push(`Jabatan: ${info.jabatan.trim()}`);
  }
  if (info.kota?.trim()) {
    lines.push(`Kota: ${info.kota.trim()}`);
  }

  lines.push(`WhatsApp: ${info.whatsapp.trim()}`);

  if (info.email?.trim()) {
    lines.push(`Email: ${info.email.trim()}`);
  }

  return lines;
}

export function buildContactWAMessage(payload: ContactPayload): string {
  const lines = [
    "Halo Tim InspiraLabs,",
    "",
    ...buildClientBlock(payload),
  ];

  if (payload.tujuan?.trim()) {
    lines.push("", `Tujuan: ${payload.tujuan.trim()}`);
  }
  if (payload.pesan?.trim()) {
    lines.push("", "Pesan:", payload.pesan.trim());
  }

  lines.push("", "Terima kasih.");
  return lines.join("\n");
}

export function buildContactEmailDraft(payload: ContactPayload): EmailDraft {
  return {
    to: SITE.email,
    from: payload.email?.trim() ?? "",
    subject: `Kontak InspiraLabs - ${payload.nama.trim()}`,
    body: buildContactWAMessage(payload),
  };
}

export function formatEmailDraftAll(draft: EmailDraft): string {
  const fromLine = draft.from
    ? `Dari: ${draft.from}`
    : "Dari: (isi email Anda di Gmail)";
  return [
    `Kepada: ${draft.to}`,
    fromLine,
    `Subjek: ${draft.subject}`,
    "",
    draft.body,
  ].join("\n");
}

export function buildSurveyWAMessage(
  client: ClientInfo,
  responses: Record<number, { selected: string[]; custom?: string }>,
  recommendations: RecommendedSolution[]
): string {
  const lines: string[] = [
    "Halo Tim InspiraLabs,",
    "",
    "Saya baru menyelesaikan Survey Kebutuhan.",
    "",
    ...buildClientBlock(client),
    "",
    "Berikut ringkasan jawaban saya:",
    "",
  ];

  for (const q of surveyQuestions) {
    const r = responses[q.id];
    if (!r) continue;
    const labels = r.selected
      .map((id) => q.options.find((o) => o.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    let line = `${q.title}: ${labels || "-"}`;
    if (r.custom?.trim()) {
      line += ` (Catatan: ${r.custom.trim()})`;
    }
    lines.push(line);
  }

  lines.push(
    "",
    `Rekomendasi: ${recommendations.map((r) => r.name).join(", ")}`,
    "",
    "Mohon informasi lebih lanjut. Terima kasih."
  );

  return lines.join("\n");
}

export function buildSurveyEmailDraft(
  client: ClientInfo,
  responses: Record<number, { selected: string[]; custom?: string }>,
  recommendations: RecommendedSolution[]
): EmailDraft {
  return {
    to: SITE.email,
    from: client.email?.trim() ?? "",
    subject: `Survey Kebutuhan - ${client.nama.trim()}`,
    body: buildSurveyWAMessage(client, responses, recommendations),
  };
}

