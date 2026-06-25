"use client";

import { useState } from "react";
import {
  MessagesSquare,
  ChevronDown,
  Code2,
  Cpu,
  GraduationCap,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { WORKSHOP_SUBCATEGORIES } from "@/data/copy";
import { cn } from "@/lib/utils";
import { SERVICE_CTA_LABEL, SERVICE_PORTFOLIO_LABEL } from "@/data/copy";
import Link from "next/link";
import { trackEvent } from "@/lib/site";

const pillars: {
  id: string;
  portfolioFilter?: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
  featured?: boolean;
  expandable?: boolean;
}[] = [
  {
    id: "layanan-software",
    portfolioFilter: "software",
    icon: Code2,
    title: "Software Development",
    desc: "Pembuatan aplikasi berbasis web dan mobile dengan performa tinggi, dari sistem informasi korporat hingga platform kustom.",
    items: ["Custom Web App", "Mobile App", "Dashboard & Sistem", "AI Chatbot", "Otomatisasi & API", "CRM"],
  },
  {
    id: "layanan-iot",
    portfolioFilter: "iot",
    icon: Cpu,
    title: "Robotic & IoT Solutions",
    desc: "Menghubungkan dunia digital dan fisik: sensor pintar, EWS, smart office, embedded system.",
    items: ["Prototipe IoT", "Robotik & Otomasi", "Smart System", "Embedded Custom"],
  },
  {
    id: "layanan-design",
    portfolioFilter: "design",
    icon: Palette,
    title: "Creative & Visual Branding",
    desc: "UI/UX intuitif, logo, aset sosmed, company profile. Identitas yang memukau.",
    items: ["Branding & Identity", "UI/UX Design", "Digital Marketing Assets", "Company Profile"],
  },
  {
    id: "layanan-workshop",
    portfolioFilter: "pelatihan",
    icon: GraduationCap,
    title: "Tech Training & Consulting",
    desc: "Pelatihan hands-on: publik, bootcamp, in-house, coaching personal.",
    items: ["Workshop Publik", "Bootcamp", "In-house Training", "Coaching Personal"],
    featured: true,
    expandable: true,
  },
];

export default function ServicesSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionWrapper id="layanan" variant="default">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold text-maroon-vibrant sm:text-4xl">
          Ekosistem Solusi Digital yang Memahami Kebutuhan Anda
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Apapun tantangan teknis Anda - otomasi operasional, daya tarik visual,
          hingga peningkatan keahlian tim - kami merancang solusi yang presisi.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {pillars.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.08}>
            <Card
              id={p.id}
              className={cn(
                "h-full scroll-mt-28 border-l-0 p-6 transition-all",
                p.featured && "border-l-4 border-l-gold-antique bg-cream/50"
              )}
            >
              <div className="rounded-lg bg-cream p-3 w-fit">
                <p.icon className="h-8 w-8 text-maroon-vibrant" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-maroon-deep">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{p.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-gold-bright/20 px-3 py-1 text-xs font-medium text-maroon-deep"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {p.expandable && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="flex w-full items-center justify-between rounded-lg border border-gold-antique/40 px-4 py-2 text-sm font-medium text-maroon-deep hover:bg-gold-bright/10"
                  >
                    Sub-kategori pelatihan
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                    />
                  </button>
                  {expanded && (
                    <ul className="mt-3 space-y-2 border-l-2 border-gold-antique pl-4">
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
              )}

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                <Link
                  href="/kontak"
                  onClick={() =>
                    trackEvent("cta_whatsapp_click", {
                      location: "services",
                      pillar: p.id,
                    })
                  }
                  className="text-sm font-medium text-maroon-vibrant hover:underline"
                >
                  {SERVICE_CTA_LABEL} →
                </Link>
                {p.portfolioFilter && (
                  <a
                    href={`#portofolio`}
                    className="text-sm font-medium text-[var(--color-text-muted)] hover:text-maroon-vibrant hover:underline"
                  >
                    {SERVICE_PORTFOLIO_LABEL}
                  </a>
                )}
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild>
          <Link
            href="/kontak"
            onClick={() => trackEvent("cta_whatsapp_click", { location: "services" })}
          >
            <MessagesSquare className="h-4 w-4" />
            Diskusikan Kebutuhan Anda
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
