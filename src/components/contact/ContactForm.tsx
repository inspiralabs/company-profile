"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ChannelPicker from "@/components/contact/ChannelPicker";
import ClientInfoFields from "@/components/contact/ClientInfoFields";
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
  const channelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="mx-auto max-w-xl space-y-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-[var(--color-border)] bg-surface p-6 shadow-card"
      >
        <ClientInfoFields
          value={form}
          onChange={(client) => setForm({ ...form, ...client })}
          idPrefix="contact"
        />

        <div>
          <label htmlFor="tujuan" className="text-sm font-medium">
            Tujuan *
          </label>
          <select
            id="tujuan"
            required
            className={contactInputClass}
            value={form.tujuan}
            onChange={(e) => setForm({ ...form, tujuan: e.target.value })}
          >
            {tujuanOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
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

        {!showChannels && (
          <Button type="submit" className="w-full">
            Lanjutkan
          </Button>
        )}
      </form>

      {showChannels && (
        <div ref={channelRef}>
          <ChannelPicker
            client={form}
            whatsappMessage={waMessage}
            emailDraft={emailDraft}
            source="kontak"
          />
        </div>
      )}
    </div>
  );
}
