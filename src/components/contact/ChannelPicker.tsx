"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, MessageCircle, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailCopyPanel from "@/components/contact/EmailCopyPanel";
import { canSendViaEmail, type ClientInfo, type EmailDraft } from "@/lib/contact";
import { waLink, trackEvent } from "@/lib/site";
import type { RecommendedSolution } from "@/data/survey-questions";

type ChannelPickerProps = {
  client: ClientInfo;
  whatsappMessage: string;
  source: "kontak" | "survey";
  emailDraft?: EmailDraft;
  mailtoLink?: string;
  surveyResponses?: Record<number, { selected: string[]; custom?: string }>;
  surveyRecommendations?: RecommendedSolution[];
  contactPayload?: { tujuan?: string; pesan?: string; website?: string };
  turnstileToken?: string;
};

type SecurityStatus = "checking" | "allowed" | "blocked";

async function submitToSheets(
  source: "kontak" | "survey",
  client: ClientInfo,
  extra: {
    surveyResponses?: Record<number, { selected: string[]; custom?: string }>;
    surveyRecommendations?: RecommendedSolution[];
    contactPayload?: { tujuan?: string; pesan?: string; website?: string };
    turnstileToken?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    let response: Response;

    if (source === "survey" && extra.surveyResponses) {
      response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientInfo: client,
          responses: extra.surveyResponses,
          recommendations:
            extra.surveyRecommendations?.map((r) => r.name) ?? [],
          website: extra.contactPayload?.website,
          turnstileToken: extra.turnstileToken,
        }),
      });
    } else if (source === "kontak") {
      response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...client,
          tujuan: extra.contactPayload?.tujuan,
          pesan: extra.contactPayload?.pesan,
          website: extra.contactPayload?.website,
          turnstileToken: extra.turnstileToken,
        }),
      });
    } else {
      return { success: false, error: "Invalid source" };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `Error: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Submit error:", error);
    return {
      success: false,
      error: "Gagal mengirim data. Silakan coba lagi.",
    };
  }
}

export default function ChannelPicker({
  client,
  whatsappMessage,
  source,
  emailDraft,
  mailtoLink,
  surveyResponses,
  surveyRecommendations,
  contactPayload,
  turnstileToken,
}: ChannelPickerProps) {
  const [showEmailPanel, setShowEmailPanel] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);

  // --- Security pre-check state (mirip Turnstile pre-check) ---
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>("checking");
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [securityRetry, setSecurityRetry] = useState(0);
  const hasChecked = useRef(false);

  const useCopyPanel = Boolean(emailDraft);
  const emailReady = canSendViaEmail(client);
  const isVerified = Boolean(turnstileToken);

  const whatsappHref = waLink(whatsappMessage);

  // Pre-check keamanan: jalankan saat komponen pertama kali mount
  // Mirip Turnstile Cloudflare yang mengecek di background sebelum tombol aktif
  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    async function runPreCheck() {
      try {
        const res = await fetch("/api/check-limit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: source === "kontak" ? "contact" : "survey",
            website: contactPayload?.website ?? "",
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.allowed) {
          const seconds = data.retryAfter ?? 60;
          setSecurityError(data.error ?? "Terlalu banyak permintaan.");
          setSecurityRetry(seconds);
          setSecurityStatus("blocked");
        } else {
          setSecurityStatus("allowed");
        }
      } catch {
        // Jika pre-check gagal (network error), tetap izinkan agar UX tidak rusak
        setSecurityStatus("allowed");
      }
    }

    runPreCheck();
  }, [source, contactPayload?.website]);

  // Countdown timer untuk pre-check rate limit (blocked state)
  useEffect(() => {
    if (securityRetry <= 0 || securityStatus !== "blocked") return;
    const timer = setInterval(() => {
      setSecurityRetry((prev) => {
        if (prev <= 1) {
          setSecurityStatus("allowed");
          setSecurityError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [securityRetry, securityStatus]);

  // Countdown timer untuk post-submit rate limit
  useEffect(() => {
    if (retryAfter <= 0) return;
    const timer = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          setIsRateLimited(false);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [retryAfter]);

  const isSecurityBlocking =
    securityStatus === "checking" || securityStatus === "blocked";

  const handleWhatsAppClick = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    trackEvent("contact_channel_whatsapp", { source });

    const result = await submitToSheets(source, client, {
      surveyResponses,
      surveyRecommendations,
      contactPayload,
      turnstileToken,
    });

    setIsSubmitting(false);

    if (!result.success) {
      const match = result.error?.match(/(\d+)\s+detik/);
      if (match) {
        const seconds = parseInt(match[1], 10);
        setRetryAfter(seconds);
        setIsRateLimited(true);
      }
      setErrorMessage(result.error || "Gagal mengirim data");
      return;
    }
  };

  const handleEmail = async () => {
    setErrorMessage(null);

    if (useCopyPanel && emailDraft) {
      setIsSubmitting(true);
      trackEvent("contact_channel_email", { source });

      const result = await submitToSheets(source, client, {
        surveyResponses,
        surveyRecommendations,
        contactPayload,
        turnstileToken,
      });

      setIsSubmitting(false);

      if (!result.success) {
        const match = result.error?.match(/(\d+)\s+detik/);
        if (match) {
          const seconds = parseInt(match[1], 10);
          setRetryAfter(seconds);
          setIsRateLimited(true);
        }
        setErrorMessage(result.error || "Gagal mengirim data");
        return;
      }

      setShowEmailPanel((v) => !v);
      return;
    }

    if (!emailReady || !mailtoLink) return;

    setIsSubmitting(true);
    trackEvent("contact_channel_email", { source });

    const result = await submitToSheets(source, client, {
      surveyResponses,
      surveyRecommendations,
      contactPayload,
      turnstileToken,
    });

    setIsSubmitting(false);

    if (!result.success) {
      const match = result.error?.match(/(\d+)\s+detik/);
      if (match) {
        const seconds = parseInt(match[1], 10);
        setRetryAfter(seconds);
        setIsRateLimited(true);
      }
      setErrorMessage(result.error || "Gagal mengirim data");
      return;
    }

    window.location.href = mailtoLink;
  };

  return (
    <div className="relative z-10 space-y-3 rounded-xl border border-gold-antique/30 bg-cream/50 p-5">
      {/* Security pre-check status indicator — mirip Turnstile Cloudflare */}
      <div
        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-300"
        style={{
          borderColor:
            securityStatus === "checking"
              ? "var(--color-border)"
              : securityStatus === "allowed"
              ? "#86efac"
              : "#fca5a5",
          backgroundColor:
            securityStatus === "checking"
              ? "transparent"
              : securityStatus === "allowed"
              ? "#f0fdf4"
              : "#fef2f2",
        }}
      >
        {securityStatus === "checking" && (
          <>
            <svg
              className="h-4 w-4 animate-spin text-[var(--color-text-muted)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-[var(--color-text-muted)]">
              Memeriksa keamanan...
            </span>
          </>
        )}
        {securityStatus === "allowed" && (
          <>
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span className="text-green-700">Keamanan terverifikasi</span>
          </>
        )}
        {securityStatus === "blocked" && (
          <>
            <ShieldAlert className="h-4 w-4 text-red-500" />
            <span className="text-red-700">
              {securityError}
              {securityRetry > 0 && (
                <span className="ml-1 font-semibold">
                  (Coba lagi dalam {securityRetry} detik)
                </span>
              )}
            </span>
          </>
        )}
      </div>

      {!isVerified && (
        <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <p className="font-medium">⚠️ Verifikasi keamanan diperlukan</p>
          <p className="mt-1 text-xs">
            Silakan selesaikan verifikasi di atas untuk melanjutkan.
          </p>
        </div>
      )}
      {errorMessage && (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <p className="font-medium">❌ Gagal mengirim</p>
          <p className="mt-1 text-xs">
            {errorMessage}
            {isRateLimited && retryAfter > 0 && (
              <span className="ml-1 font-semibold">
                (Coba lagi dalam {retryAfter} detik)
              </span>
            )}
          </p>
        </div>
      )}
      <p className="text-sm font-medium text-maroon-deep">
        Pilih cara menghubungi kami:
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          asChild={
            isVerified &&
            !isSubmitting &&
            !isRateLimited &&
            !isSecurityBlocking
          }
          variant="whatsapp"
          size="lg"
          className="flex-1"
          disabled={
            !isVerified || isSubmitting || isRateLimited || isSecurityBlocking
          }
        >
          {isVerified &&
          !isSubmitting &&
          !isRateLimited &&
          !isSecurityBlocking ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4" />
              Kirim via WhatsApp
            </a>
          ) : (
            <>
              <MessageCircle className="h-4 w-4" />
              {isSubmitting
                ? "Mengirim..."
                : isRateLimited && retryAfter > 0
                ? `Tunggu ${retryAfter}s`
                : securityStatus === "checking"
                ? "Memeriksa..."
                : securityStatus === "blocked"
                ? `Tunggu ${securityRetry}s`
                : "Kirim via WhatsApp"}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant={showEmailPanel ? "primary" : "secondary"}
          size="lg"
          className="flex-1"
          disabled={
            !isVerified ||
            (!useCopyPanel && !emailReady) ||
            isSubmitting ||
            isRateLimited ||
            isSecurityBlocking
          }
          onClick={handleEmail}
        >
          <Mail className="h-4 w-4" />
          {isSubmitting
            ? "Mengirim..."
            : isRateLimited && retryAfter > 0
            ? `Tunggu ${retryAfter}s`
            : securityStatus === "checking"
            ? "Memeriksa..."
            : securityStatus === "blocked"
            ? `Tunggu ${securityRetry}s`
            : useCopyPanel
            ? showEmailPanel
              ? "Sembunyikan Email"
              : "Kirim via Email"
            : "Kirim via Email"}
        </Button>
      </div>
      {!useCopyPanel && !emailReady && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Isi email untuk mengaktifkan opsi kirim via Email.
        </p>
      )}
      {useCopyPanel && showEmailPanel && emailDraft && (
        <EmailCopyPanel draft={emailDraft} />
      )}
    </div>
  );
}
