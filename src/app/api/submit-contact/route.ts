import { NextResponse } from "next/server";
import {
  appendToSheet,
  ensureHeaders,
  CONTACT_HEADERS,
  CONTACT_SHEET,
} from "@/lib/google-sheets";
import type { ContactPayload } from "@/lib/contact";
import { getTipeKlienLabel, formatDetailTipeLine } from "@/lib/contact";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const body: ContactPayload & { 
      turnstileToken?: string;
      website?: string; // Honeypot field
    } = await request.json();

    // Tier 3: Honeypot check (must be empty)
    if (body.website) {
      console.log("Honeypot triggered - bot detected");
      // Return fake success to not alert the bot
      return NextResponse.json({ success: true });
    }

    // Tier 2: Rate limiting (3 requests per minute per IP)
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
    if (!body.turnstileToken) {
      return NextResponse.json(
        { success: false, error: "Token verifikasi tidak ditemukan" },
        { status: 400 }
      );
    }

    const isValidToken = await verifyTurnstileToken(body.turnstileToken);
    
    if (!isValidToken) {
      return NextResponse.json(
        { success: false, error: "Verifikasi keamanan gagal. Silakan coba lagi." },
        { status: 400 }
      );
    }

    console.log(`Contact submission from IP: ${clientIP}, remaining: ${rateLimitResult.remaining}`);

    await ensureHeaders(CONTACT_SHEET, CONTACT_HEADERS);

    const timestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    const detailLine = formatDetailTipeLine(body) ?? "";

    const row = [
      timestamp,
      body.nama,
      getTipeKlienLabel(body.tipeKlien),
      detailLine,
      body.namaInstansi ?? "",
      body.jabatan ?? "",
      body.kota ?? "",
      body.whatsapp,
      body.email ?? "",
      body.tujuan ?? "",
      body.pesan ?? "",
    ];

    await appendToSheet(CONTACT_SHEET, [row]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data kontak" },
      { status: 500 }
    );
  }
}