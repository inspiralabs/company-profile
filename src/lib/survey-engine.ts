import {
  profileTitles,
  solutionCatalog,
  surveyQuestions,
  type RecommendedSolution,
  type SolutionId,
} from "@/data/survey-questions";

export type SurveyResponses = Record<
  number,
  { selected: string[]; custom?: string }
>;

export function getRecommendations(
  responses: SurveyResponses
): RecommendedSolution[] {
  const scores = new Map<SolutionId, number>();

  for (const [qIdStr, response] of Object.entries(responses)) {
    const qId = Number(qIdStr);
    const question = surveyQuestions.find((q) => q.id === qId);
    if (!question) continue;

    for (const optionId of response.selected) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;
      for (const boost of option.boosts) {
        const sid = boost as SolutionId;
        if (solutionCatalog[sid]) {
          scores.set(sid, (scores.get(sid) ?? 0) + 1);
        }
      }
    }
  }

  // Extra boost: education profile → elearning
  const q1 = responses[1]?.selected ?? [];
  if (q1.includes("pendidikan")) {
    scores.set("elearning", (scores.get("elearning") ?? 0) + 2);
    scores.set("workshop-iot", (scores.get("workshop-iot") ?? 0) + 1);
  }
  if (q1.includes("umkm")) {
    scores.set("pos", (scores.get("pos") ?? 0) + 1);
    scores.set("website", (scores.get("website") ?? 0) + 1);
  }
  if (q1.includes("komunitas") || q1.includes("perusahaan")) {
    scores.set("iot", (scores.get("iot") ?? 0) + 1);
  }

  const sorted = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => solutionCatalog[id])
    .filter(Boolean)
    .slice(0, 4);

  if (sorted.length === 0) {
    return [
      solutionCatalog.website,
      solutionCatalog.dashboard,
      solutionCatalog.chatbot,
      solutionCatalog.pelatihan,
    ];
  }

  while (sorted.length < 4) {
    const fallback: SolutionId[] = ["website", "dashboard", "pelatihan", "chatbot"];
    for (const fid of fallback) {
      if (sorted.length >= 4) break;
      if (!sorted.some((s) => s.id === fid)) {
        sorted.push(solutionCatalog[fid]);
      }
    }
    break;
  }

  return sorted.slice(0, 4);
}

export function getProfileTitle(responses: SurveyResponses): string {
  const q1 = responses[1]?.selected ?? [];
  for (const id of q1) {
    if (profileTitles[id]) return profileTitles[id];
  }
  return profileTitles.default;
}

export function buildSurveyWA(
  responses: SurveyResponses,
  recommendations: RecommendedSolution[]
): string {
  const lines: string[] = [
    "Halo Tim InspiraLabs,",
    "",
    "Saya baru menyelesaikan Survey Kebutuhan. Berikut ringkasan jawaban saya:",
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
