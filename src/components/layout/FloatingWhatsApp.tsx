"use client";

import { MessageCircle } from "lucide-react";
import { WA_HERO, trackEvent } from "@/lib/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WA_HERO}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-whatsapp)] text-white shadow-lg transition-transform hover:scale-105 motion-safe:animate-pulse-soft"
      aria-label="Chat WhatsApp"
      onClick={() => trackEvent("cta_whatsapp_click", { location: "floating" })}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
