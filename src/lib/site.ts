import { trackConversion, type AnalyticsEvent } from "@/lib/analytics";

export const SITE = {
  name: "InspiraLabs",
  legalName: "Nawa Inspira Digital",
  tagline:
    "Empowering Digital Transformation Through Software, IoT, Visual Design & Tech Workshops",
  url: "https://inspiralabs.com",
  email: "hello@inspiralabs.com",
  whatsapp: "6282124533265",
  whatsappDisplay: "+62 821-2453-3265",
  hours: "Senin – Jumat: 09.00 – 17.00 WIB",
  social: {
    instagram: "https://instagram.com/inspiralabs",
    linkedin: "https://linkedin.com/company/inspiralabs",
    youtube: "https://youtube.com/@inspiralabs",
    github: "https://github.com/inspiralabs",
  },
  socialUrls: [
    "https://instagram.com/inspiralabs",
    "https://linkedin.com/company/inspiralabs",
    "https://youtube.com/@inspiralabs",
    "https://github.com/inspiralabs",
  ],
} as const;

export function waLink(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const WA_HERO = waLink(
  "Halo Tim InspiraLabs, saya tertarik untuk berdiskusi mengenai layanan Anda. Mohon informasinya."
);

export const WA_CTA = waLink(
  "Halo Tim InspiraLabs, saya ingin konsultasi mengenai kebutuhan digital saya."
);

export const WA_SERVICES = waLink(
  "Halo Tim InspiraLabs, saya ingin mendiskusikan kebutuhan layanan digital kami."
);

export const WA_SERVICE_PILLARS = {
  software: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang kebutuhan Software Development (web/mobile/dashboard)."
  ),
  iot: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang solusi Robotic & IoT untuk organisasi kami."
  ),
  design: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang Creative & Visual Branding / UI-UX."
  ),
  workshop: waLink(
    "Halo Tim InspiraLabs, saya ingin konsultasi tentang pelatihan Coding, Robotics & Design Workshop."
  ),
} as const;

export function trackEvent(
  name: AnalyticsEvent,
  params?: Record<string, string>
) {
  trackConversion(name, params);
}
