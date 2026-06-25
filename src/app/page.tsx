import type { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE.name} - ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return <LandingPage />;
}
