import {
  MessagesSquare,
  Code2,
  Cpu,
  GraduationCap,
  Palette,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import TrackLink from "@/components/shared/TrackLink";
import ServicesWorkshopExpand from "@/components/sections/ServicesWorkshopExpand";
import {
  SERVICE_CTA_LABEL,
  SERVICE_PORTFOLIO_LABEL,
} from "@/data/copy";

const portfolioLinkClass =
  "inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-text-secondary)] hover:text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm";

export default function ServicesSection() {
  return (
    <SectionWrapper id="layanan" variant="default" className="!py-10 sm:!py-12 lg:!py-14">
      <ScrollReveal>
        <h2 className="font-display text-display-lg font-bold text-maroon-vibrant">
          Ekosistem Solusi Digital yang Memahami Kebutuhan Anda
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Apapun tantangan teknis Anda (otomasi operasional, daya tarik visual,
          hingga peningkatan keahlian tim), kami merancang solusi yang presisi.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <div className="sm:col-span-2 md:col-span-2">
          <ScrollReveal>
            <Card
              id="layanan-software"
              className="h-full scroll-mt-28 border-0 bg-maroon-deep p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                  Layanan Utama
                </span>
              </div>
              <h3 className="mt-5 font-display text-display-md font-bold text-white">
                Software Development
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Pembuatan aplikasi berbasis web dan mobile dengan performa tinggi,
                dari sistem informasi korporat hingga platform kustom.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {["Custom Web App", "Mobile App", "Dashboard & Sistem", "AI Chatbot", "Otomatisasi & API", "CRM"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="h-3.5 w-3.5 shrink-0 text-gold-bright" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackLink
                  href="/kontak"
                  event="cta_whatsapp_click"
                  eventParams={{ location: "services", pillar: "layanan-software" }}
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-maroon-deep transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2"
                >
                  {SERVICE_CTA_LABEL}
                </TrackLink>
                <a
                  href="#portofolio"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white/75 transition-colors hover:border-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-deep"
                >
                  {SERVICE_PORTFOLIO_LABEL}
                </a>
              </div>
            </Card>
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal delay={0.08}>
            <Card id="layanan-iot" className="h-full scroll-mt-28 p-4 md:p-6">
              <div className="w-fit rounded-lg bg-cream p-3">
                <Cpu className="h-6 w-6 text-maroon-vibrant" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-maroon-deep">
                Robotic & IoT Solutions
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Menghubungkan dunia digital dan fisik: sensor pintar, EWS, smart
                office, embedded system.
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {["Prototipe IoT", "Robotik & Otomasi", "Smart System", "Embedded Custom"].map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-gold-bright/20 px-2.5 py-0.5 text-xs font-medium text-maroon-deep"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                <TrackLink
                  href="/kontak"
                  event="cta_whatsapp_click"
                  eventParams={{ location: "services", pillar: "layanan-iot" }}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm"
                >
                  {SERVICE_CTA_LABEL} →
                </TrackLink>
                <a href="#portofolio" className={portfolioLinkClass}>
                  {SERVICE_PORTFOLIO_LABEL}
                </a>
              </div>
            </Card>
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal delay={0.12}>
            <Card id="layanan-design" className="h-full scroll-mt-28 p-4 md:p-6">
              <div className="w-fit rounded-lg bg-cream p-3">
                <Palette className="h-6 w-6 text-maroon-vibrant" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-maroon-deep">
                Creative & Visual Branding
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                UI/UX intuitif, logo, aset sosmed, company profile. Identitas
                yang memukau.
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {["Branding & Identity", "UI/UX Design", "Digital Marketing Assets", "Company Profile"].map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-gold-bright/20 px-2.5 py-0.5 text-xs font-medium text-maroon-deep"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                <TrackLink
                  href="/kontak"
                  event="cta_whatsapp_click"
                  eventParams={{ location: "services", pillar: "layanan-design" }}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm"
                >
                  {SERVICE_CTA_LABEL} →
                </TrackLink>
                <a href="#portofolio" className={portfolioLinkClass}>
                  {SERVICE_PORTFOLIO_LABEL}
                </a>
              </div>
            </Card>
          </ScrollReveal>
        </div>

        <div className="sm:col-span-2 md:col-span-2">
          <ScrollReveal delay={0.16}>
            <Card
              id="layanan-workshop"
              className="h-full scroll-mt-28 bg-gold-bright/15 p-8 ring-1 ring-gold-antique/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-xl bg-gold-antique/20 p-3">
                  <GraduationCap className="h-7 w-7 text-maroon-deep" />
                </div>
                <span className="rounded-full bg-maroon-deep/10 px-3 py-1 text-xs font-semibold text-maroon-deep">
                  Unggulan
                </span>
              </div>
              <h3 className="mt-5 font-display text-display-md font-bold text-maroon-deep">
                Tech Training & Consulting
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Pelatihan hands-on: publik, bootcamp, in-house, coaching personal.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["Workshop Publik", "Bootcamp", "In-house Training", "Coaching Personal"].map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-maroon-deep/10 px-3 py-1 text-xs font-medium text-maroon-deep"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <ServicesWorkshopExpand />
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackLink
                  href="/kontak"
                  event="cta_whatsapp_click"
                  eventParams={{ location: "services", pillar: "layanan-workshop" }}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-maroon-vibrant hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm"
                >
                  {SERVICE_CTA_LABEL} →
                </TrackLink>
                <a href="#portofolio" className={portfolioLinkClass}>
                  {SERVICE_PORTFOLIO_LABEL}
                </a>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button asChild>
          <TrackLink
            href="/kontak"
            event="cta_whatsapp_click"
            eventParams={{ location: "services" }}
          >
            <MessagesSquare className="h-4 w-4" />
            Diskusikan Kebutuhan Anda
          </TrackLink>
        </Button>
      </div>
    </SectionWrapper>
  );
}
