import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { listR2Images } from "@/lib/r2";
import {
  Eye,
  GitBranch,
  Globe2,
  Layers,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  CheckCircle2,
  Pencil,
  Code2,
  Rocket,
  GraduationCap,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { MISSIONS, VISION, STRENGTHS, WORKFLOW_STEPS } from "@/data/copy";
import { cdn } from "@/lib/cdn";
import ActivityTicker from "@/components/ui/ActivityTicker";

const COMPANY_PROFILE_URL = cdn("/documents/Company%20Profile%20-%20NID.pdf");

export const metadata: Metadata = buildPageMetadata({
  title: "Tentang Kami",
  description:
    "InspiraLabs (Nawa Inspira Digital) - software house lokal Bogor yang membangun solusi digital berkualitas global untuk UMKM, sekolah, desa, dan enterprise.",
  path: "/tentang",
});

const jsonLdAbout = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE.url}/tentang`,
  name: `Tentang ${SITE.name}`,
  url: `${SITE.url}/tentang`,
  description: "Kisah perusahaan, visi misi, Siapa di Balik InspiraLabs?, dan keunggulan InspiraLabs.",
  mainEntity: { "@id": `${SITE.url}/#organization` },
};

const founders = [
  {
    name: "Unggul Sulaiman",
    role: "CEO & Founder",
    subtitle: "Project Management & Business Strategy",
    bio: "Memimpin arah bisnis dan strategi - perencanaan proyek, hubungan klien, dan pengembangan perusahaan jangka panjang.",
    image: cdn("/images/founders/unggul.webp"),
  },
  {
    name: "Alif Ayatulloh Ar-Rizqy",
    role: "CTO & Founder",
    subtitle: "Software Engineer & IoT Specialist",
    bio: "Memimpin keputusan teknis dan arsitektur sistem - web, mobile, dan IoT yang menjadi produk utama InspiraLabs.",
    image: cdn("/images/founders/alif.webp"),
  },
  {
    name: "M. H. Haikal",
    role: "COO",
    subtitle: "Operations & Administration",
    bio: "Menjaga roda operasional tetap berputar - dari koordinasi tim hingga memastikan setiap proyek selesai tepat waktu.",
    image: cdn("/images/founders/haikal.webp"),
  },
  {
    name: "Fahri Priandana",
    role: "CDO",
    subtitle: "Visual Design & Branding",
    bio: "Memimpin arah visual - logo, UI, dan konten kreatif yang membuat brand klien tampil percaya diri di era digital.",
    image: cdn("/images/founders/fahri.webp"),
  },
];

const STEP_ICONS = [CheckCircle2, Pencil, Code2, Rocket, GraduationCap];

const STRENGTH_ICONS = [
  Eye,
  MessageSquare,
  Globe2,
  Layers,
  Sparkles,
  Users,
  Shield,
  GitBranch,
  CheckCircle2,
];

const ctaClass =
  "inline-flex min-h-11 items-center rounded-full bg-white px-8 py-2.5 font-semibold text-maroon-deep transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2";

const sectionClass = "mt-9 border-t border-[var(--color-border)] pt-8";

export const revalidate = 3600;

export default async function TentangPage() {
  const activityImages = await listR2Images("images/activity/");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />

      <div className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">
          {/* Hero + Visi — memakai lebar penuh, visi di kanan */}
          <header className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
            <div>
              <h1 className="mt-2 font-display text-display-xl font-bold text-maroon-deep text-balance">
                Mewujudkan Visi Anda Melalui Kolaborasi Pemuda yang Inovatif
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                InspiraLabs adalah kolaborasi anak muda yang mendedikasikan teknologi, desain grafis, dan edukasi bagi kemajuan masyarakat, dari skala komunitas hingga enterprise.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-cream/60 p-5 sm:p-6">
              <h2 className="font-display text-base font-bold text-maroon-deep">Visi</h2>
              <blockquote className="mt-2 text-sm italic leading-relaxed text-[var(--color-text-secondary)]">
                &ldquo;{VISION}&rdquo;
              </blockquote>
            </div>
          </header>

          {/* Kisah + Misi — dua kolom seimbang */}
          <section className={sectionClass}>
            <h2 className="font-display text-display-md font-bold text-maroon-deep">
              Kisah Kami
            </h2>
            <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                <p>
                  Berawal dari persahabatan di bangku SMK tahun 2014, kami tumbuh bersama
                  dan menyatukan keahlian: bisnis, teknologi, operasional, dan desain.
                  Nawa Inspira Digital resmi berdiri{" "}
                  <strong className="text-maroon-deep">9 Mei 2026</strong> sebagai komitmen
                  lebih besar: membawa transformasi digital ke semua kalangan, tanpa memandang skala.
                </p>
                <p>
                  Kami menyadari bahwa digitalisasi sering dianggap kemewahan eksklusif untuk korporat besar. 
                  InspiraLabs lahir untuk mematahkan stigma tersebut, dimulai dari masalah dasar masyarakat: digitalisasi administrasi desa dan sistem peringatan dini bencana. Kami percaya solusi paling berdampak adalah yang paling mudah diakses bagi kemaslahatan publik.
                </p>
                <p>
                  DNA InspiraLabs sangat kental dengan dunia pendidikan. Tim kami tidak hanya bekerja di balik layar kode dan desain, melainkan juga berperan aktif sebagai fasilitator, akademisi, dan pengajar publik.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-maroon-deep">Misi</h3>
                <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                  {MISSIONS.map((m, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon-deep text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="leading-snug">{m}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Siapa di Balik InspiraLabs? — layout horizontal tetap */}
          <section className={sectionClass}>
            <h2 className="font-display text-display-md font-bold text-maroon-deep mb-2">
              Siapa di Balik InspiraLabs?
            </h2>
            <p className="mb-6 max-w-3xl text-[var(--color-text-secondary)]">
              Berawal sebagai kelompok kecil yang bersemangat, dan kini berkembang pesat sebagai wirausahawan visioner yang berkomitmen untuk memberikan dampak positif bagi dunia usaha melalui penyediaan solusi digital yang inovatif dan berkelanjutan.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {founders.map((f) => (
                <div
                  key={f.name}
                  className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-cream">
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 via-maroon-deep/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-maroon-deep backdrop-blur-sm">
                      {f.role}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-base font-bold leading-tight text-white">
                        {f.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold text-maroon-vibrant">{f.subtitle}</p>
                    <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {f.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cara Kami Bekerja */}
          <section className={sectionClass}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-display-md font-bold text-maroon-deep">
                Cara Kami Bekerja
              </h2>
              <p className="max-w-md text-sm text-[var(--color-text-secondary)]">
                Proses yang jelas di setiap tahap
              </p>
            </div>

            <div className="relative mt-5 rounded-2xl border border-[var(--color-border)] bg-surface p-5 sm:p-6 lg:hidden">
              <div
                aria-hidden
                className="absolute left-[2.05rem] top-8 h-[calc(100%-3rem)] w-0.5 bg-[var(--color-border)]"
              />
              <div className="space-y-4">
                {WORKFLOW_STEPS.map((step, i) => {
                  const Icon = STEP_ICONS[i] ?? CheckCircle2;
                  return (
                    <div key={step.step} className="relative flex gap-4">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon-deep text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <span className="text-[10px] font-bold text-maroon-vibrant">
                          {`0${step.step}`}
                        </span>
                        <h3 className="font-display text-sm font-bold text-maroon-deep">
                          {step.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-5 hidden rounded-2xl border border-[var(--color-border)] bg-surface px-6 py-7 lg:block">
              <div
                aria-hidden
                className="absolute left-6 right-6 top-[2.35rem] h-0.5 bg-[var(--color-border)]"
              />
              <div className="grid grid-cols-5 gap-4">
                {WORKFLOW_STEPS.map((step, i) => {
                  const Icon = STEP_ICONS[i] ?? CheckCircle2;
                  return (
                    <div key={step.step} className="relative flex flex-col">
                      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-maroon-deep text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="mt-2.5">
                        <span className="text-xs font-semibold text-maroon-vibrant">
                          {`0${step.step}`}
                        </span>
                        <h3 className="mt-0.5 font-display text-sm font-bold leading-snug text-maroon-deep">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 9 Keunggulan — grid 3 kolom padat */}
          <section className={sectionClass}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-display-md font-bold text-maroon-deep">
                9 Keunggulan InspiraLabs
              </h2>
              <p className="max-w-md text-sm text-[var(--color-text-secondary)]">
                Bukan sekadar klaim - ini standar kerja yang kami jaga di setiap proyek.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {STRENGTHS.map((s, i) => {
                const Icon = STRENGTH_ICONS[i] ?? CheckCircle2;
                const featured = i === 0;
                return (
                  <article
                    key={s.title}
                    className={
                      featured
                        ? "flex gap-3 rounded-xl bg-maroon-deep p-4 text-white sm:col-span-2 lg:col-span-1"
                        : "flex gap-3 rounded-xl border border-[var(--color-border)] bg-surface p-4"
                    }
                  >
                    <div
                      className={
                        featured
                          ? "flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10"
                          : "flex size-9 shrink-0 items-center justify-center rounded-lg bg-maroon-deep/[0.06]"
                      }
                    >
                      <Icon
                        className={`size-4 ${featured ? "text-gold-bright" : "text-maroon-vibrant"}`}
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`font-display text-sm font-semibold ${featured ? "text-white" : "text-maroon-deep"}`}
                      >
                        {s.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs leading-relaxed ${featured ? "text-white/80" : "text-[var(--color-text-secondary)]"}`}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Kegiatan Kami */}
          {activityImages.length > 0 && (
            <section className={sectionClass}>
              <p className="text-sm font-semibold text-maroon-vibrant">
                Budaya & Aktivitas Tim
              </p>
              <h2 className="mt-1 font-display text-display-md font-bold text-maroon-deep">
                Energi Positif, Setiap Hari
              </h2>
              <p className="mt-2 mb-6 max-w-3xl text-sm text-[var(--color-text-secondary)] sm:text-base">
                Di InspiraLabs, kami percaya lingkungan kerja yang baik adalah bahan bakar kreativitas.
                Dari workshop lapangan, sesi diskusi, hingga kolaborasi malam hari -
                setiap momen membentuk tim yang kami banggakan.
              </p>
              <ActivityTicker images={activityImages} />
              <div className="mt-3">
                <ActivityTicker images={[...activityImages].reverse()} reverse />
              </div>
            </section>
          )}

          {/* Company Profile + CTA — jarak rapat */}
          <div className={`${sectionClass} space-y-5`}>
            <section className="rounded-2xl border border-[var(--color-border)] bg-cream p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon-deep text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-maroon-deep">
                      Company Profile InspiraLabs
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      Dapatkan gambaran lengkap layanan, portofolio, dan tim kami dalam satu dokumen -
                      siap dibagikan ke tim atau pemangku kepentingan Anda.
                    </p>
                  </div>
                </div>
                <a
                  href={COMPANY_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Company-Profile-InspiraLabs.pdf"
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-maroon-deep px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
                >
                  <Download className="h-4 w-4" />
                  Unduh Company Profile
                </a>
              </div>
            </section>

            <section className="rounded-2xl bg-maroon-deep px-6 py-7 text-center text-white sm:px-8">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Suka dengan apa yang kami lakukan?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 sm:text-base">
                Ide-ide Anda sangat berarti bagi kami. Bagikan apa yang ada di pikiran Anda, silakan diskusikan <span className="font-bold">gratis!</span> dan lihat apa yang bisa kami lakukan!
              </p>
              <Link href="/kontak" className={`mt-5 ${ctaClass}`}>
                Mari Diskusi
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
