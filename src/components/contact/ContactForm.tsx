"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ChannelPicker from "@/components/contact/ChannelPicker";
import ClientInfoFields from "@/components/contact/ClientInfoFields";
import MotionSelect from "@/components/ui/motion-select";
import Turnstile from "@/components/ui/Turnstile";
import {
  buildContactEmailDraft,
  buildContactWAMessage,
  contactInputClass,
  EMPTY_CLIENT_INFO,
  type ContactPayload,
} from "@/lib/contact";
import { trackEvent } from "@/lib/site";

const tujuanOptions = [
  "Saya butuh pembuatan website / aplikasi",
  "Saya ingin mengundang pembicara / Pelatihan IT",
  "Kebutuhan design logo / visual brand",
  "Kebutuhan IoT / Hardware Solution",
  "Lainnya",
];

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>({
    ...EMPTY_CLIENT_INFO,
    tujuan: tujuanOptions[0],
    pesan: "",
  });
  const [showChannels, setShowChannels] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);
  const [honeypot, setHoneypot] = useState<string>(""); // Honeypot field
  const channelRef = useRef<HTMLDivElement>(null);

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
    setTurnstileVerified(true);
    setTurnstileError(false);
  };

  const handleTurnstileError = () => {
    setTurnstileToken("");
    setTurnstileVerified(false);
    setTurnstileError(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileVerified) {
      return;
    }
    
    trackEvent("contact_form_submit");
    setShowChannels(true);
  };

  useEffect(() => {
    if (!showChannels) return;
    channelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [showChannels]);

  const waMessage = buildContactWAMessage(form);
  const emailDraft = buildContactEmailDraft(form);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-[var(--color-border)] bg-surface p-6 shadow-card sm:p-8"
      >
        {/* Honeypot field - hidden from users, only bots will fill this */}
        <input
          type="text"
          name="website"
          id="website_url_field"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="new-password"
          aria-hidden="true"
        />
        <ClientInfoFields
          value={form}
          onChange={(client) => setForm({ ...form, ...client })}
          idPrefix="contact"
        />

        <div>
          <label htmlFor="tujuan" className="text-sm font-medium">
            Tujuan *
          </label>
          <MotionSelect
            id="tujuan"
            name="tujuan"
            required
            value={form.tujuan ?? tujuanOptions[0]}
            onChange={(tujuan) => setForm({ ...form, tujuan })}
            options={tujuanOptions.map((o) => ({ value: o, label: o }))}
            placeholder="Pilih tujuan"
          />
        </div>

        <div>
          <label htmlFor="pesan" className="text-sm font-medium">
            Pesan / Detail Kebutuhan *
          </label>
          <textarea
            id="pesan"
            required
            rows={4}
            className={contactInputClass}
            placeholder="Jelaskan kebutuhan Anda secara singkat..."
            value={form.pesan}
            onChange={(e) => setForm({ ...form, pesan: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ""}
              onSuccess={handleTurnstileSuccess}
              onError={handleTurnstileError}
              onExpire={handleTurnstileError}
            />
            {turnstileVerified && (
              <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verifikasi keamanan berhasil
              </div>
            )}
            {turnstileError && (
              <div className="mt-2 text-sm text-red-600">
                Verifikasi gagal. Silakan refresh halaman.
              </div>
            )}
            {!turnstileVerified && !turnstileError && (
              <div className="mt-2 text-sm text-[var(--color-text-muted)]">
                Memverifikasi keamanan...
              </div>
            )}
          </div>
          
          {!showChannels && (
            <Button 
              type="submit" 
              className="w-full"
              disabled={!turnstileVerified}
            >
              Lanjutkan
            </Button>
          )}
        </div>
      </form>

      {showChannels && turnstileVerified && (
        <div ref={channelRef}>
          <ChannelPicker
            client={form}
            whatsappMessage={waMessage}
            emailDraft={emailDraft}
            source="kontak"
            contactPayload={{ tujuan: form.tujuan, pesan: form.pesan, website: honeypot }}
            turnstileToken={turnstileToken}
          />
        </div>
      )}
    </div>
  );
}
