"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { waLink, trackEvent } from "@/lib/site";

const tujuanOptions = [
  "Saya butuh pembuatan website / aplikasi",
  "Saya ingin mengundang pembicara / Pelatihan IT",
  "Kebutuhan design logo / visual brand",
  "Kebutuhan IoT / Hardware Solution",
  "Lainnya",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    email: "",
    tujuan: tujuanOptions[0],
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("contact_form_submit");
    const text = `Halo Tim InspiraLabs,

Nama: ${form.nama}
WhatsApp: ${form.whatsapp}
Email: ${form.email}
Tujuan: ${form.tujuan}

Pesan:
${form.pesan}

Terima kasih.`;
    window.open(waLink(text), "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-[var(--color-border)] bg-surface p-6 shadow-card"
    >
      <div>
        <label htmlFor="nama" className="text-sm font-medium">
          Nama Lengkap *
        </label>
        <input
          id="nama"
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-gold-antique focus:outline-none focus:ring-1 focus:ring-gold-antique"
          placeholder="Masukkan nama lengkap Anda"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="wa" className="text-sm font-medium">
          Nomor WhatsApp *
        </label>
        <input
          id="wa"
          required
          type="tel"
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-gold-antique focus:outline-none focus:ring-1 focus:ring-gold-antique"
          placeholder="08xx xxxx xxxx"
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email *
        </label>
        <input
          id="email"
          required
          type="email"
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-gold-antique focus:outline-none focus:ring-1 focus:ring-gold-antique"
          placeholder="nama@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="tujuan" className="text-sm font-medium">
          Tujuan *
        </label>
        <select
          id="tujuan"
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-gold-antique focus:outline-none"
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
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-gold-antique focus:outline-none focus:ring-1 focus:ring-gold-antique"
          placeholder="Jelaskan kebutuhan Anda secara singkat..."
          value={form.pesan}
          onChange={(e) => setForm({ ...form, pesan: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full">
        Kirim Pesan ke Kami
      </Button>
    </form>
  );
}
