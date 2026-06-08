import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  hint?: string;
  children: ReactNode;
};

export default function FormSection({ title, hint, children }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <div className="border-b border-[var(--color-border)] pb-2">
        <h3 className="font-display text-sm font-semibold text-maroon-deep">
          {title}
        </h3>
        {hint && (
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
      {children}
    </section>
  );
}
