import Image from "next/image";
import Link from "next/link";
import SurveyWizard from "@/components/survey/SurveyWizard";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Survey Kebutuhan",
  description:
    "Temukan solusi digital yang tepat untuk organisasi Anda. Survey 10 pertanyaan dengan rekomendasi personalisasi.",
  path: "/survey",
});

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center gap-3">
          <Link href="/">
            <Image src="/logo.svg" alt="InspiraLabs" width={36} height={36} />
          </Link>
          <div>
            <Link href="/" className="text-xs text-maroon-vibrant hover:underline">
              ← Beranda
            </Link>
            <h1 className="font-display text-lg font-semibold text-maroon-deep">
              Survey Kebutuhan InspiraLabs
            </h1>
          </div>
        </header>
        <SurveyWizard />
      </div>
    </div>
  );
}
