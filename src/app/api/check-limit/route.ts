import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

/**
 * Pre-check endpoint untuk validasi rate limit & honeypot
 * tanpa benar-benar melakukan submission.
 *
 * Digunakan oleh frontend untuk validate sebelum tampilkan tombol submit.
 * Mirip dengan Turnstile pre-check / Cloudflare Bot Management.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, website } = body;

    // Validate source
    if (!source || (source !== "contact" && source !== "survey")) {
      return NextResponse.json(
        { allowed: false, reason: "invalid_source", error: "Source tidak valid" },
        { status: 400 }
      );
    }

    // Get client IP — getClientIP sekarang menerima Request atau Headers
    const clientIP = getClientIP(request);

    // Check honeypot — jika terisi, berarti bot
    // Return fake success agar bot tidak tahu terdeteksi
    if (website && typeof website === "string" && website.trim() !== "") {
      return NextResponse.json(
        { allowed: true, reason: "ok" },
        { status: 200 }
      );
    }

    // Check rate limit (peek only — tidak mengonsumsi slot)
    const rateLimitConfig =
      source === "survey"
        ? { maxRequests: 2, windowMs: 60000, peek: true }
        : { maxRequests: 2, windowMs: 60000, peek: true };

    const rateLimitResult = checkRateLimit(clientIP, rateLimitConfig);

    if (!rateLimitResult.allowed) {
      const retrySeconds = rateLimitResult.retryAfter ?? 60;
      return NextResponse.json(
        {
          allowed: false,
          reason: "rate_limited",
          error: `Terlalu banyak permintaan. Silakan coba lagi dalam ${retrySeconds} detik.`,
          retryAfter: retrySeconds,
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        allowed: true,
        reason: "ok",
        remaining: rateLimitResult.remaining,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Check limit error:", error);
    return NextResponse.json(
      { allowed: false, reason: "error", error: "Internal server error" },
      { status: 500 }
    );
  }
}