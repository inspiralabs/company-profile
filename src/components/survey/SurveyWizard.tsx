"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { surveyQuestions } from "@/data/survey-questions";
import {
  buildSurveyWA,
  getProfileTitle,
  getRecommendations,
  type SurveyResponses,
} from "@/lib/survey-engine";
import { cn } from "@/lib/utils";
import { waLink, trackEvent } from "@/lib/site";

export default function SurveyWizard() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<SurveyResponses>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [done, setDone] = useState(false);

  const question = surveyQuestions[step];
  const progress = ((step + 1) / surveyQuestions.length) * 100;

  const canProceed =
    selected.length > 0 || custom.trim().length > 0;

  const recommendations = useMemo(
    () => (done ? getRecommendations(responses) : []),
    [done, responses]
  );

  const profileTitle = useMemo(
    () => (done ? getProfileTitle(responses) : ""),
    [done, responses]
  );

  const customNotes = useMemo(() => {
    if (!done) return [];
    return surveyQuestions
      .map((q) => {
        const c = responses[q.id]?.custom?.trim();
        if (!c) return null;
        return { title: q.title, text: c };
      })
      .filter(Boolean) as { title: string; text: string }[];
  }, [done, responses]);

  const saveAndNext = () => {
    const nextResponses: SurveyResponses = {
      ...responses,
      [question.id]: {
        selected: question.multiSelect ? selected : selected.slice(0, 1),
        custom: custom.trim() || undefined,
      },
    };
    setResponses(nextResponses);

    if (step < surveyQuestions.length - 1) {
      const nextQ = surveyQuestions[step + 1];
      const prev = nextResponses[nextQ.id];
      setStep(step + 1);
      setSelected(prev?.selected ?? []);
      setCustom(prev?.custom ?? "");
    } else {
      setDone(true);
      trackEvent("survey_complete");
    }
  };

  const goBack = () => {
    if (step === 0) return;
    const prevQ = surveyQuestions[step - 1];
    const prev = responses[prevQ.id];
    setStep(step - 1);
    setSelected(prev?.selected ?? []);
    setCustom(prev?.custom ?? "");
  };

  const toggleOption = (id: string) => {
    if (question.multiSelect) {
      setSelected((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      );
    } else {
      setSelected([id]);
    }
  };

  const reset = () => {
    setStep(0);
    setResponses({});
    setSelected([]);
    setCustom("");
    setDone(false);
  };

  if (done) {
    const wa = buildSurveyWA(responses, recommendations);
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <span className="inline-block rounded-full bg-gold-bright px-4 py-1 text-sm font-semibold text-maroon-deep">
          Analisis Selesai
        </span>
        <h1 className="font-display text-3xl font-bold text-maroon-deep">
          {profileTitle}
        </h1>

        {customNotes.length > 0 && (
          <div className="rounded-xl border-l-4 border-gold-antique bg-cream p-5">
            <h2 className="font-display text-lg font-semibold text-maroon-deep">
              Catatan dari Anda
            </h2>
            <ul className="mt-3 space-y-3 text-sm text-[var(--color-text-secondary)]">
              {customNotes.map((n) => (
                <li key={n.title}>
                  <strong className="text-maroon-deep">{n.title}:</strong> {n.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {recommendations.map((sol) => (
            <Card key={sol.id} className="p-5">
              <span className="rounded-full bg-gold-bright/30 px-2 py-0.5 text-xs font-medium text-maroon-deep">
                {sol.tag}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-maroon-deep">
                {sol.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {sol.description}
              </p>
            </Card>
          ))}
        </div>

        <Button asChild variant="whatsapp" size="lg" className="w-full">
          <a href={waLink(wa)} target="_blank" rel="noopener noreferrer">
            Chat WhatsApp — Konsultasi Gratis
          </a>
        </Button>
        <button
          type="button"
          onClick={reset}
          className="w-full text-center text-sm text-maroon-vibrant underline"
        >
          Ulangi Survey
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="sticky top-16 z-40 -mx-4 bg-[var(--color-bg-primary)]/95 px-4 py-4 backdrop-blur sm:static sm:bg-transparent sm:px-0">
        <div className="mb-2 flex justify-between gap-1">
          {surveyQuestions.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors",
                i <= step ? "bg-gold-bright" : "bg-[var(--color-border)]"
              )}
            />
          ))}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-[var(--color-border)]">
          <motion.div
            className="h-full bg-gradient-gold"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
          className="mt-8"
        >
          <p className="text-sm text-[var(--color-text-muted)]">
            Pertanyaan {step + 1} dari {surveyQuestions.length}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-maroon-deep sm:text-3xl">
            {question.title}
          </h2>

          <div className="mt-8 grid gap-3">
            {question.options.map((opt) => {
              const active = selected.includes(opt.id);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleOption(opt.id)}
                  className={cn(
                    "flex items-start gap-4 rounded-xl border p-4 text-left transition-all",
                    active
                      ? "border-2 border-gold-bright bg-maroon-deep/5"
                      : "border-[var(--color-border)] bg-surface hover:border-gold-antique"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      active ? "bg-gold-bright text-maroon-deep" : "bg-maroon-deep/5 text-maroon-vibrant"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="font-semibold text-charcoal">{opt.label}</span>
                    <span className="mt-1 block text-sm text-[var(--color-text-secondary)]">
                      {opt.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <label className="mt-6 block text-sm font-medium text-charcoal">
            Jawaban lain / ceritakan situasi Anda (opsional)
          </label>
          <textarea
            rows={3}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-gold-antique focus:outline-none focus:ring-1 focus:ring-gold-antique"
          />

          <div className="mt-8 flex gap-4">
            {step > 0 && (
              <Button type="button" variant="secondary" onClick={goBack}>
                ← Kembali
              </Button>
            )}
            <Button
              type="button"
              disabled={!canProceed}
              onClick={saveAndNext}
              className="flex-1"
            >
              {step < surveyQuestions.length - 1 ? "Lanjut →" : "Lihat Rekomendasi"}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
