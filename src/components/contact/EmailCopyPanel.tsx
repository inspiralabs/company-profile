"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatEmailDraftAll, type EmailDraft } from "@/lib/contact";
import { cn } from "@/lib/utils";

type EmailCopyPanelProps = {
  draft: EmailDraft;
};

type CopyField = "to" | "from" | "subject" | "body" | "all";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function CopyFieldRow({
  label,
  value,
  fieldKey,
  copiedField,
  onCopy,
  multiline,
}: {
  label: string;
  value: string;
  fieldKey: CopyField;
  copiedField: CopyField | null;
  onCopy: (field: CopyField, text: string) => void;
  multiline?: boolean;
}) {
  const displayValue = value || "(belum diisi)";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-maroon-deep">
          {label}
        </label>
        <button
          type="button"
          onClick={() => onCopy(fieldKey, value)}
          disabled={!value}
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            value
              ? "text-maroon-vibrant hover:bg-maroon-deep/5"
              : "cursor-not-allowed text-[var(--color-text-muted)]"
          )}
        >
          {copiedField === fieldKey ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Tersalin
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Salin
            </>
          )}
        </button>
      </div>
      {multiline ? (
        <textarea
          readOnly
          rows={8}
          value={displayValue}
          className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-charcoal focus:outline-none"
        />
      ) : (
        <input
          readOnly
          value={displayValue}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-charcoal focus:outline-none"
        />
      )}
    </div>
  );
}

export default function EmailCopyPanel({ draft }: EmailCopyPanelProps) {
  const [copiedField, setCopiedField] = useState<CopyField | null>(null);

  const handleCopy = async (field: CopyField, text: string) => {
    if (!text) return;
    const ok = await copyText(text);
    if (!ok) return;
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAll = async () => {
    const ok = await copyText(formatEmailDraftAll(draft));
    if (!ok) return;
    setCopiedField("all");
    window.setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-[var(--color-border)] bg-white p-4">
      <div>
        <p className="text-sm font-medium text-maroon-deep">
          Salin detail email ke Gmail Anda
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          Salin tiap bagian di bawah, lalu tempel saat membuat email baru di Gmail.
        </p>
      </div>

      <CopyFieldRow
        label="Kepada"
        value={draft.to}
        fieldKey="to"
        copiedField={copiedField}
        onCopy={handleCopy}
      />
      <CopyFieldRow
        label="Pengirim (Dari)"
        value={draft.from}
        fieldKey="from"
        copiedField={copiedField}
        onCopy={handleCopy}
      />
      <CopyFieldRow
        label="Subjek"
        value={draft.subject}
        fieldKey="subject"
        copiedField={copiedField}
        onCopy={handleCopy}
      />
      <CopyFieldRow
        label="Isi Pesan"
        value={draft.body}
        fieldKey="body"
        copiedField={copiedField}
        onCopy={handleCopy}
        multiline
      />

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleCopyAll}
      >
        {copiedField === "all" ? (
          <>
            <Check className="h-4 w-4" />
            Semua Tersalin
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Salin Semua
          </>
        )}
      </Button>

      <a
        href="https://mail.google.com/mail/u/0/#inbox?compose=new"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-xs text-maroon-vibrant underline"
      >
        Buka Gmail untuk menulis email baru →
      </a>
    </div>
  );
}
