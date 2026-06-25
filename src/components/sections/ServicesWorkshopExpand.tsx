"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WORKSHOP_SUBCATEGORIES } from "@/data/copy";
import { cn } from "@/lib/utils";

export default function ServicesWorkshopExpand() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="workshop-subcategories"
        className="flex min-h-11 w-full items-center justify-between rounded-lg border border-gold-antique/40 px-4 py-2.5 text-sm font-medium text-maroon-deep transition-colors hover:bg-gold-antique/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
      >
        Sub-kategori pelatihan
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
        />
      </button>
      {expanded && (
        <ul id="workshop-subcategories" className="mt-3 space-y-3">
          {WORKSHOP_SUBCATEGORIES.map((sub) => (
            <li key={sub.label} className="text-sm">
              <strong className="text-maroon-deep">{sub.label}</strong>
              <span className="block text-[var(--color-text-secondary)]">
                {sub.detail}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
