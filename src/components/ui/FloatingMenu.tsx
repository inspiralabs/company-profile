"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, MessageCircle, ClipboardList, X, Plus } from "lucide-react";
import { trackEvent } from "@/lib/site";

const ITEMS = [
  { label: "Kontak", href: "/kontak", icon: MessageCircle, color: "bg-maroon-deep" },
  { label: "Survey", href: "/survey", icon: ClipboardList, color: "bg-maroon-vibrant" },
  { label: "FAQ", href: "/#faq", icon: HelpCircle, color: "bg-[var(--color-text-muted)]" },
] as const;

export default function FloatingMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // hide on kontak page — user is already contacting
  if (pathname?.startsWith("/kontak")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 16, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.85 }}
              transition={{ delay: i * 0.05, duration: 0.18 }}
              className="flex items-center gap-2"
            >
              <span className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-maroon-deep shadow-md border border-[var(--color-border)]">
                {item.label}
              </span>
              <Link
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  trackEvent("cta_whatsapp_click", { location: `floating_${item.label.toLowerCase()}` });
                }}
                className={`${item.color} flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110`}
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-deep text-white shadow-xl transition-transform hover:scale-105"
        aria-label={open ? "Tutup menu" : "Buka menu cepat"}
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
