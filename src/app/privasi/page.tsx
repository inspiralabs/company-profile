import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { LEGAL_LAST_UPDATED, PRIVACY_SECTIONS } from "@/data/legal";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi PT Nawa Inspira Digital (InspiraLabs) — perlindungan data pribadi sesuai praktik UU PDP Indonesia.",
  path: "/privasi",
});

export default function PrivasiPage() {
  return (
    <LegalPageLayout
      title="Kebijakan Privasi"
      intro="Kebijakan ini menjelaskan bagaimana InspiraLabs mengumpulkan, menggunakan, dan melindungi data pribadi Anda ketika menggunakan website dan layanan kami."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={PRIVACY_SECTIONS}
    />
  );
}
