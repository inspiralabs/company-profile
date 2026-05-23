"use client";

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

const founders = [
  {
    name: "Unggul Sulaiman",
    role: "Founder & Lead Tech Engineer",
    bio: "Nahkoda arsitektur Full-Stack dan rekayasa AI. Pengalaman akademis sebagai Guru, Asisten Lab, dan Dosen Tamu — menerjemahkan komputasi kompleks menjadi hal yang mudah dipahami.",
    initials: "US",
  },
  {
    name: "Fahri Priandana",
    role: "Creative Designer",
    bio: "Konseptor estetika yang bertugas untuk membuat desain grafis dan visualisasi yang menarik.",
    initials: "FP",
  },
  {
    name: "Alif Ayatulloh Ar-Rizqy",
    role: "Software Engineer & IoT Engineer",
    bio: "Berpengalaman di bidang IoT dan Seorang Software Engineer yang bertugas untuk mengembangkan aplikasi dan sistem yang berhubungan dengan Internet of Things (IoT).",
    initials: "AA",
  },
];

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
            korporat besar. InspiraLabs lahir untuk mematahkan stigma tersebut — dimulai
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
        <ol className="mt-6 flex flex-col gap-6 lg:flex-row lg:gap-0">
          {WORKFLOW_STEPS.map((s, i) => (
            <li
              key={s.step}
              className={cn(
                "relative flex gap-4 px-0 lg:flex-1 lg:flex-col lg:px-3",
                s.step === 5 && "rounded-lg bg-gold-bright/15 p-4 ring-1 ring-gold-antique/40 lg:p-3"
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon-deep text-sm font-bold text-white">
                {s.step}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-maroon-deep">{s.title}</p>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{s.desc}</p>
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <span
                  className="absolute -bottom-3 left-4 h-6 w-0.5 bg-gold-antique/40 lg:hidden"
                  aria-hidden
                />
              )}
              {i < WORKFLOW_STEPS.length - 1 && (
                <span
                  className="absolute right-0 top-4 hidden h-0.5 bg-gold-antique/40 lg:block"
                  style={{ left: "50%", width: "100%" }}
                  aria-hidden
                />
              )}
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
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {founders.map((f) => (
            <Card key={f.name} className="overflow-hidden p-0">
              <div className="border-b-4 border-gold-antique bg-cream px-6 py-8 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-lg border-2 border-gold-antique bg-gradient-brand text-2xl font-bold text-white">
                  {f.initials}
                </div>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-display text-lg font-semibold text-maroon-deep">
                  {f.name}
                </h4>
                <p className="text-xs font-medium text-gold-antique">{f.role}</p>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{f.bio}</p>
              </div>
            </Card>
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
