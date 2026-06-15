import { NextResponse } from "next/server";
import {
  appendToSheet,
  ensureHeaders,
  CONTACT_HEADERS,
  CONTACT_SHEET,
} from "@/lib/google-sheets";
import type { ContactPayload } from "@/lib/contact";
import { getTipeKlienLabel, formatDetailTipeLine } from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

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