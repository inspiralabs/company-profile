"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import {
  GOAL,
  MISSIONS,
  STRENGTHS,
  VISION,
  WORKFLOW_STEPS,
} from "@/data/copy";
import { cn } from "@/lib/utils";
import { cdn } from "@/lib/cdn";

const CARD_BG = cdn("/images/founders/card-bg.webp");

const founders = [
  {
    name: "Unggul Sulaiman",
    role: "CEO & Founder of InspiraLabs",
    subtitle: "Project Management & Business Strategy",
    bio: "Memimpin arah bisnis dan strategi InspiraLabs. Bertanggung jawab atas perencanaan proyek, hubungan klien, dan pengembangan perusahaan.",
    initials: "US",
    photo: cdn("/images/founders/unggul.webp"),
    accent: "border-l-gold-antique",
  },
  {
    name: "Alif Ayatulloh Ar-Rizqy",
    role: "CTO & Founder of InspiraLabs",
    subtitle: "Software Engineer & IoT Specialist",
    bio: "Memimpin keputusan teknis dan arsitektur sistem. Membangun aplikasi web, mobile, dan IoT yang menjadi produk utama InspiraLabs.",
    initials: "AA",
    photo: cdn("/images/founders/alif.webp"),
    accent: "border-l-maroon-vibrant",
  },
  {
    name: "M. H. Haikal",
    role: "COO of InspiraLabs",
    subtitle: "Operations & Administration",
    bio: "Mengelola operasional harian, dokumentasi, dan koordinasi tim. Memastikan setiap proyek berjalan teratur dari kickoff hingga delivery.",
    initials: "HK",
    photo: cdn("/images/founders/haikal.webp"),
    accent: "border-l-gold-bright",
  },
  {
    name: "Fahri Priandana",
    role: "CDO of InspiraLabs",
    subtitle: "Visual Design & Branding",
    bio: "Memimpin arah visual dan branding. Menangani desain logo, UI, dan konten kreatif yang konsisten di seluruh platform.",
    initials: "FP",
    photo: cdn("/images/founders/fahri.webp"),
    accent: "border-l-maroon-deep",
  },
];

function FounderCard({ founder: f }: { founder: (typeof founders)[number] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card className={cn("group overflow-hidden border-l-4 p-0", f.accent)}>
      <div className="relative h-64 overflow-hidden bg-[#f8f6f2] sm:h-72">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${CARD_BG})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {!imgError ? (
            <Image
              src={f.photo}
              alt={f.name}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 90vw, 300px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-gold-antique bg-gradient-brand text-3xl font-bold text-white transition-transform duration-500 group-hover:scale-110">
              {f.initials}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h4 className="font-display text-lg font-semibold text-maroon-deep">
            {f.name}
          </h4>
          <p className="text-xs font-medium text-gold-antique">{f.role}</p>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            {f.subtitle}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {f.bio}
        </p>
      </div>
    </Card>
  );
}

export default function AboutSection() {
  return (
    <SectionWrapper id="tentang" variant="cream">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
          Mewujudkan Visi Anda Melalui Kolaborasi Pemuda yang Inovatif
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
          InspiraLabs adalah kumpulan pemuda dan penggiat teknologi yang memiliki
          talenta, semangat, dan dedikasi. Kami membuktikan bahwa keahlian kelas
          global mampu diakses oleh semua lini masyarakat.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mt-10 rounded-xl border border-gold-antique/30 bg-surface p-6 lg:p-8">
          <h3 className="font-display text-xl font-bold text-maroon-deep">Kisah Kami</h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Kami menyadari bahwa digitalisasi sering dianggap kemewahan eksklusif untuk
            korporat besar.             InspiraLabs lahir untuk mematahkan stigma tersebut, dimulai
            dari masalah dasar masyarakat: digitalisasi administrasi desa dan sistem
            peringatan dini bencana. Kami percaya solusi paling berdampak adalah yang
            paling mudah diakses bagi kemaslahatan publik.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            DNA InspiraLabs sangat kental dengan dunia pendidikan. Tim kami tidak hanya
            bekerja di balik layar kode dan desain, melainkan juga berperan aktif sebagai
            fasilitator, akademisi, dan pengajar publik.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h3 className="mt-12 font-display text-xl font-bold text-maroon-deep">
          How We Work
        </h3>
        <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {WORKFLOW_STEPS.map((s, i) => (
            <li key={s.step} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon-deep text-sm font-bold text-white shadow-md">
                {s.step}
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <span
                  className="absolute left-5 top-10 h-full w-0.5 bg-gold-antique/40 sm:hidden"
                  aria-hidden
                />
              )}
              {i < WORKFLOW_STEPS.length - 1 && (
                <span
                  className="absolute left-[calc(50%+20px)] top-5 hidden h-0.5 w-[calc(100%-40px)] bg-gold-antique/40 lg:block"
                  aria-hidden
                />
              )}
              <div
                className={cn(
                  "min-w-0 lg:mt-4 lg:px-2",
                  s.step === 5 && "rounded-lg bg-gold-bright/15 px-3 pb-3 pt-2 ring-1 ring-gold-antique/40 lg:mt-2"
                )}
              >
                <p className="text-sm font-semibold text-maroon-deep">{s.title}</p>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <h3 className="mt-12 font-display text-xl font-bold text-maroon-deep">
          9 Keunggulan InspiraLabs
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STRENGTHS.map((s) => (
            <Card key={s.title} className="p-4">
              <h4 className="font-display text-base font-semibold text-maroon-deep">
                {s.title}
              </h4>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{s.desc}</p>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <h3 className="mt-12 font-display text-2xl font-bold text-maroon-deep">
          Siapa di Balik InspiraLabs?
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {founders.map((f) => (
            <FounderCard key={f.name} founder={f} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.18}>
        <div className="mt-12 space-y-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
            <h3 className="font-display text-lg font-bold text-maroon-deep">Visi</h3>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{VISION}</p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6 lg:p-8">
            <h3 className="font-display text-lg font-bold text-maroon-deep">
              9 Misi InspiraLabs
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Komitmen kami yang memandu setiap proyek dan kemitraan.
            </p>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {MISSIONS.map((m, i) => (
                <li
                  key={m}
                  className="flex gap-4 border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-4"
                >
                  <span
                    className="font-display text-2xl font-bold leading-none text-gold-antique/80"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {m}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border-l-4 border-gold-antique bg-cream p-6">
            <h3 className="font-display text-lg font-bold text-maroon-deep">Tujuan Akhir</h3>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{GOAL}</p>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
