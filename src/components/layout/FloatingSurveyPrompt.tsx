"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SURVEY_PROMO } from "@/data/copy";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "inspiralabs-floating-survey-dismissed";

export default function FloatingSurveyPrompt() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (pathname?.startsWith("/survey")) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, [mounted, pathname]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private browsing */
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="floating-survey-title"
      aria-describedby="floating-survey-desc"
      className={cn(
        "fixed bottom-24 right-4 z-[60] w-[min(calc(100vw-2rem),22rem)]",
        "motion-safe:animate-[fadeUp_0.35s_ease-out]"
      )}
    >
      <div className="relative rounded-2xl border border-gold-antique/30 bg-surface p-5 shadow-[0_12px_40px_rgba(110,21,15,0.12)]">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 rounded-full p-1 text-[var(--color-text-muted)] transition-colors hover:bg-cream hover:text-maroon-deep"
          aria-label="Tutup penawaran survey"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-antique/40 bg-gold-bright/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-maroon-deep">
          <Lightbulb className="h-3 w-3 text-gold-antique" aria-hidden />
          {SURVEY_PROMO.eyebrow}
        </span>

        <h2
          id="floating-survey-title"
          className="mt-3 pr-6 font-display text-base font-bold leading-snug text-maroon-deep"
        >
          {SURVEY_PROMO.headline}
        </h2>
        <p
          id="floating-survey-desc"
          className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          {SURVEY_PROMO.body}
        </p>


        <div className="mt-4 flex flex-col gap-2">
          <Button asChild size="sm" className="w-full rounded-full">
            <Link href="/survey" onClick={dismiss}>
              {SURVEY_PROMO.cta}
            </Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full rounded-full"
            onClick={dismiss}
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
