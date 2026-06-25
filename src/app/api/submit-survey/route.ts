import { NextResponse } from "next/server";
import {
  appendToSheet,
  ensureHeaders,
  SURVEY_HEADERS,
  SURVEY_SHEET,
} from "@/lib/google-sheets";
import { surveyQuestions } from "@/data/survey-questions";
import type { ClientInfo } from "@/lib/contact";
import { getTipeKlienLabel, formatDetailTipeLine } from "@/lib/contact";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

type SurveyPayload = {
  clientInfo: ClientInfo;
  responses: Record<number, { selected: string[]; custom?: string }>;
  recommendations: string[];
  turnstileToken?: string;
  website?: string; // Honeypot field
};

function resolveAnswerLabels(
  questionId: number,
  selectedIds: string[],
  custom?: string
): string {
  const q = surveyQuestions.find((q) => q.id === questionId);
  if (!q) return selectedIds.join(", ");
  const labels = selectedIds
    .map((id) => q.options.find((o) => o.id === id)?.label ?? id)
    .join(", ");
  if (custom?.trim()) return `${labels} (Catatan: ${custom.trim()})`;
  return labels;
}

export async function POST(request: Request) {
  try {
    const body: SurveyPayload = await request.json();
    const { clientInfo, responses, recommendations, turnstileToken, website } = body;

    // Tier 3: Honeypot check (must be empty)
    if (website) {
      console.warn("Honeypot triggered - bot detected");
      // Return fake success to not alert the bot
      return NextResponse.json({ success: true });
    }

    // Tier 2: Rate limiting (3 requests per minute per IP - survey takes longer)
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 3,
      windowMs: 60000, // 1 minute
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Terlalu banyak permintaan. Silakan coba lagi dalam ${rateLimitResult.retryAfter} detik.` 
        },
        { 
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter?.toString() || "60",
          },
        }
      );
    }

    // Tier 1: Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: "Token verifikasi tidak ditemukan" },
        { status: 400 }
      );
    }

    const isValidToken = await verifyTurnstileToken(turnstileToken);
    
    if (!isValidToken) {
      return NextResponse.json(
        { success: false, error: "Verifikasi keamanan gagal. Silakan coba lagi." },
        { status: 400 }
      );
    }

    console.info(`Survey submission from IP: ${clientIP}, remaining: ${rateLimitResult.remaining}`);

    await ensureHeaders(SURVEY_SHEET, SURVEY_HEADERS);

    const timestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    const detailLine = formatDetailTipeLine(clientInfo) ?? "";

    const row = [
      timestamp,
      clientInfo.nama,
      getTipeKlienLabel(clientInfo.tipeKlien),
      detailLine,
      clientInfo.namaInstansi ?? "",
      clientInfo.jabatan ?? "",
      clientInfo.kota ?? "",
      clientInfo.whatsapp,
      clientInfo.email ?? "",
      // 10 survey questions (ids 1-10)
      ...Array.from({ length: 10 }, (_, i) => {
        const r = responses[i + 1];
        if (!r) return "-";
        return resolveAnswerLabels(i + 1, r.selected, r.custom);
      }),
      recommendations.join(", "),
    ];

    await appendToSheet(SURVEY_SHEET, [row]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Survey submission error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data survey" },
      { status: 500 }
    );
  }
}