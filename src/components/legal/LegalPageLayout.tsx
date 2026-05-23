import Link from "next/link";
import type { LegalSection } from "@/data/legal";

type LegalPageLayoutProps = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalPageLayout({
  title,
  intro,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:pt-28">
      <p className="text-sm text-[var(--color-text-muted)]">
        Terakhir diperbarui: {lastUpdated}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">{intro}</p>

      <nav
        className="mt-8 hidden rounded-xl border border-[var(--color-border)] bg-cream/50 p-4 lg:block"
        aria-label="Daftar isi"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-antique">
          Daftar isi
        </p>
        <ol className="mt-2 space-y-1 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-maroon-vibrant hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="prose-legal mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="font-display text-xl font-semibold text-maroon-deep">
              {section.title}
            </h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-secondary)]">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-text-muted)]">
        Dokumen ini bersifat informasi umum dan bukan nasihat hukum. Untuk kebutuhan
        spesifik, konsultasikan penasihat hukum Anda.
      </p>
      <p className="mt-4">
        <Link href="/" className="text-sm font-medium text-maroon-vibrant hover:underline">
          ← Kembali ke beranda
        </Link>
      </p>
    </article>
  );
}
