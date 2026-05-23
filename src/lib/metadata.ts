import type { Metadata } from "next";
import { SITE } from "@/lib/site";

const DEFAULT_OG_IMAGE = "/og-image.jpg";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetaInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = canonicalPath === "/" ? SITE.url : `${SITE.url}${canonicalPath}`;
  const fullTitle = `${title} | ${SITE.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: canonicalPath },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — Mitra Solusi Digital`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "InspiraLabs — Mitra Solusi Digital Anda",
    template: "%s | InspiraLabs",
  },
  description:
    "InspiraLabs: mitra digitalisasi untuk UMKM, sekolah, pemerintah desa & perusahaan. Software, IoT, desain visual & workshop teknologi. Konsultasi gratis.",
  keywords: [
    "InspiraLabs",
    "jasa pembuatan website",
    "pengembangan software Indonesia",
    "solusi IoT",
    "sistem informasi desa",
    "pelatihan coding",
    "UI UX design",
    "digitalisasi UMKM",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.name,
  publisher: SITE.legalName,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: "InspiraLabs — Mitra Solusi Digital Anda",
    description:
      "Software, IoT, Visual Design & Tech Workshops. Dari komunitas lokal hingga standar global.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "InspiraLabs — Mitra Solusi Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InspiraLabs — Mitra Solusi Digital Anda",
    description:
      "Software, IoT, Visual Design & Tech Workshops untuk UMKM, sekolah, dan institusi.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};
