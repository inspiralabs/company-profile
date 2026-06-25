import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ServiceDeliverable = {
  label: string;
  desc: string;
  featured?: boolean;
  meta?: string;
  icon?: LucideIcon;
};

type ServiceCta = {
  href: string;
  label: string;
  external?: boolean;
};

type DeliverablesLayout = "default" | "grid";

type ServiceDetailLayoutProps = {
  breadcrumbLabel: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  highlight?: ReactNode;
  primaryCta: ServiceCta;
  secondaryCta: ServiceCta;
  deliverablesTitle: string;
  deliverablesIntro?: string;
  deliverables: ServiceDeliverable[];
  /** `grid` — kartu seragam 2 kolom, cocok untuk program dengan ikon di setiap item */
  deliverablesLayout?: DeliverablesLayout;
};

const ctaPrimaryClass =
  "inline-flex min-h-11 items-center rounded-full bg-maroon-deep px-8 py-2.5 font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2";

const ctaSecondaryClass =
  "inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-8 py-2.5 font-semibold text-maroon-deep transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2";

export default function ServiceDetailLayout({
  breadcrumbLabel,
  icon: Icon,
  title,
  subtitle,
  description,
  highlight,
  primaryCta,
  secondaryCta,
  deliverablesTitle,
  deliverablesIntro,
  deliverables,
  deliverablesLayout = "default",
}: ServiceDetailLayoutProps) {
  const featured =
    deliverablesLayout === "grid"
      ? []
      : deliverables.filter((item) => item.featured);
  const standard =
    deliverablesLayout === "grid"
      ? deliverables
      : deliverables.filter((item) => !item.featured);

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)]"
        >
          <Link
            href="/layanan"
            className="rounded-sm hover:text-maroon-vibrant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
          >
            Layanan
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-maroon-deep">{breadcrumbLabel}</span>
        </nav>

        <header className="mb-16 lg:mb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex items-start gap-5">
                <div className="shrink-0 rounded-2xl bg-cream p-4 ring-1 ring-[var(--color-border)]">
                  <Icon className="h-9 w-9 text-maroon-vibrant" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 pt-1">
                  <h1 className="font-display text-display-xl font-bold text-maroon-deep">
                    {title}
                  </h1>
                  <p className="mt-2 text-base font-medium text-[var(--color-text-secondary)] sm:text-lg">
                    {subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {description}
              </p>

              {highlight && <div className="mt-6 max-w-2xl">{highlight}</div>}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta.external ? (
                  <a
                    href={primaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaPrimaryClass}
                  >
                    {primaryCta.label}
                  </a>
                ) : (
                  <Link href={primaryCta.href} className={ctaPrimaryClass}>
                    {primaryCta.label}
                  </Link>
                )}
                <Link href={secondaryCta.href} className={ctaSecondaryClass}>
                  {secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--color-border)] bg-cream/60 p-6 sm:p-8">
                <p className="font-display text-sm font-semibold text-maroon-deep">
                  Cocok untuk
                </p>
                <ul className="mt-4 space-y-3">
                  {deliverables.slice(0, 4).map((item) => (
                    <li
                      key={item.label}
                      className="flex gap-3 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-vibrant" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="border-t border-[var(--color-border)] pt-14 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-display-md font-bold text-maroon-deep">
                {deliverablesTitle}
              </h2>
              {deliverablesIntro && (
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {deliverablesIntro}
                </p>
              )}
            </div>

            <div className="lg:col-span-8">
              {deliverablesLayout === "grid" ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {deliverables.map((item) => (
                    <ProgramCard key={item.label} item={item} />
                  ))}
                </div>
              ) : (
                <>
                  {featured.length > 0 && (
                    <div className="mb-6 space-y-4">
                      {featured.map((item) => (
                        <DeliverableCard key={item.label} item={item} featured />
                      ))}
                    </div>
                  )}

                  <div className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-surface">
                    {standard.map((item) => (
                      <DeliverableRow key={item.label} item={item} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DeliverableCard({
  item,
  featured,
}: {
  item: ServiceDeliverable;
  featured?: boolean;
}) {
  const ItemIcon = item.icon;

  return (
    <article
      className={
        featured
          ? "rounded-2xl bg-maroon-deep p-6 text-white sm:p-8"
          : "rounded-2xl border border-[var(--color-border)] bg-surface p-6"
      }
    >
      <div className="flex items-start gap-4">
        {ItemIcon && (
          <div
            className={
              featured
                ? "rounded-xl bg-white/10 p-3"
                : "rounded-xl bg-cream p-3 ring-1 ring-[var(--color-border)]"
            }
          >
            <ItemIcon
              className={`h-6 w-6 ${featured ? "text-gold-bright" : "text-maroon-vibrant"}`}
              strokeWidth={1.75}
            />
          </div>
        )}
        <div className="min-w-0">
          <h3
            className={`font-display text-lg font-bold ${featured ? "text-white" : "text-maroon-deep"}`}
          >
            {item.label}
          </h3>
          {item.meta && (
            <p
              className={`mt-1 text-xs font-medium ${featured ? "text-white/70" : "text-[var(--color-text-muted)]"}`}
            >
              Untuk: {item.meta}
            </p>
          )}
          <p
            className={`mt-2 text-sm leading-relaxed ${featured ? "text-white/80" : "text-[var(--color-text-secondary)]"}`}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </article>
  );
}

function ProgramCard({ item }: { item: ServiceDeliverable }) {
  const ItemIcon = item.icon;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-surface p-6">
      {ItemIcon && (
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-maroon-deep/[0.06]">
          <ItemIcon className="size-5 text-maroon-vibrant" strokeWidth={1.75} aria-hidden />
        </div>
      )}
      <h3 className="mt-4 font-display text-base font-bold text-maroon-deep">{item.label}</h3>
      {item.meta && (
        <p className="mt-1 text-xs font-medium text-[var(--color-text-muted)]">
          Untuk: {item.meta}
        </p>
      )}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {item.desc}
      </p>
    </article>
  );
}

function DeliverableRow({ item }: { item: ServiceDeliverable }) {
  const ItemIcon = item.icon;

  return (
    <article className="flex items-start gap-4 p-5 sm:p-6">
      {ItemIcon ? (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-maroon-deep/[0.06]">
          <ItemIcon className="size-5 text-maroon-vibrant" strokeWidth={1.75} aria-hidden />
        </div>
      ) : (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-antique" />
      )}
      <div className="min-w-0">
        <h3 className="font-display font-semibold text-maroon-deep">{item.label}</h3>
        {item.meta && (
          <p className="mt-0.5 text-xs font-medium text-[var(--color-text-muted)]">
            Untuk: {item.meta}
          </p>
        )}
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {item.desc}
        </p>
      </div>
    </article>
  );
}
