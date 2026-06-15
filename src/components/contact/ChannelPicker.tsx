"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
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
  contactPayload?: { tujuan?: string; pesan?: string };
  turnstileToken?: string;
};

function submitToSheets(
  source: "kontak" | "survey",
  client: ClientInfo,
  extra: {
    surveyResponses?: Record<number, { selected: string[]; custom?: string }>;
    surveyRecommendations?: RecommendedSolution[];
    contactPayload?: { tujuan?: string; pesan?: string };
    turnstileToken?: string;
  }
) {
  if (source === "survey" && extra.surveyResponses) {
    fetch("/api/submit-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientInfo: client,
        responses: extra.surveyResponses,
        recommendations:
          extra.surveyRecommendations?.map((r) => r.name) ?? [],
        turnstileToken: extra.turnstileToken,
      }),
    }).catch(console.error);
  } else if (source === "kontak") {
    fetch("/api/submit-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...client,
        tujuan: extra.contactPayload?.tujuan,
        pesan: extra.contactPayload?.pesan,
        turnstileToken: extra.turnstileToken,
      }),
    }).catch(console.error);
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
  const useCopyPanel = Boolean(emailDraft);
  const emailReady = canSendViaEmail(client);
  const isVerified = Boolean(turnstileToken);

  const whatsappHref = waLink(whatsappMessage);

  const handleWhatsAppClick = () => {
    trackEvent("contact_channel_whatsapp", { source });
    submitToSheets(source, client, {
      surveyResponses,
      surveyRecommendations,
      contactPayload,
      turnstileToken,
    });
  };

  const handleEmail = () => {
    if (useCopyPanel && emailDraft) {
      trackEvent("contact_channel_email", { source });
      submitToSheets(source, client, {
        surveyResponses,
        surveyRecommendations,
        contactPayload,
        turnstileToken,
      });
      setShowEmailPanel((v) => !v);
      return;
    }
    if (!emailReady || !mailtoLink) return;
    trackEvent("contact_channel_email", { source });
    submitToSheets(source, client, {
      surveyResponses,
      surveyRecommendations,
      contactPayload,
      turnstileToken,
    });
    window.location.href = mailtoLink;
  };

  return (
    <div className="relative z-10 space-y-3 rounded-xl border border-gold-antique/30 bg-cream/50 p-5">
      {!isVerified && (
        <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <p className="font-medium">⚠️ Verifikasi keamanan diperlukan</p>
          <p className="mt-1 text-xs">Silakan selesaikan verifikasi di atas untuk melanjutkan.</p>
        </div>
      )}
      <p className="text-sm font-medium text-maroon-deep">
        Pilih cara menghubungi kami:
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          asChild={isVerified}
          variant="whatsapp"
          size="lg"
          className="flex-1"
          disabled={!isVerified}
        >
          {isVerified ? (
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
              Kirim via WhatsApp
            </>
          )}
        </Button>
        <Button
          type="button"
          variant={showEmailPanel ? "primary" : "secondary"}
          size="lg"
          className="flex-1"
          disabled={!isVerified || (!useCopyPanel && !emailReady)}
          onClick={handleEmail}
        >
          <Mail className="h-4 w-4" />
          {useCopyPanel
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
