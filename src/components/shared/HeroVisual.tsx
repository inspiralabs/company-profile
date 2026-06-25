"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Cpu, GraduationCap, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { cdn } from "@/lib/cdn";

const HERO_IMAGE = cdn("/images/hero/hero.jpeg");

const fallbackIcons = [
  { Icon: Code2, label: "Software" },
  { Icon: Cpu, label: "IoT" },
  { Icon: Palette, label: "Design" },
  { Icon: GraduationCap, label: "Workshop" },
];

type HeroVisualProps = {
  className?: string;
};

export default function HeroVisual({ className }: HeroVisualProps) {
  const [useFallback, setUseFallback] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative mx-auto w-full max-w-md", className)}
      animate={reduceMotion ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
    >
      <div className="rounded-[2rem] bg-black/[0.04] p-2 ring-1 ring-gold-antique/30">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(2rem-0.5rem)] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
          {!useFallback ? (
            <Image
              src={HERO_IMAGE}
              alt="Tim InspiraLabs berdiskusi solusi digital"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 420px"
              priority
              onError={() => setUseFallback(true)}
            />
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 p-8">
              <div className="grid grid-cols-2 gap-3">
                {fallbackIcons.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-border)] bg-surface px-4 py-3"
                  >
                    <Icon className="h-6 w-6 text-maroon-vibrant" />
                    <span className="text-xs font-medium text-maroon-deep">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
