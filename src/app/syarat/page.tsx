import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { LEGAL_LAST_UPDATED, TERMS_SECTIONS } from "@/data/legal";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Syarat & Ketentuan",
  description:
    "Syarat penggunaan website dan layanan InspiraLabs - PT Nawa Inspira Digital, mitra digitalisasi software, IoT, desain, dan pelatihan.",
  path: "/syarat",
});

export default function SyaratPage() {
  return (
    <LegalPageLayout
      title="Syarat & Ketentuan"
      intro="Ketentuan ini mengatur penggunaan website InspiraLabs. Layanan proyek yang mengikat secara hukum diatur dalam kontrak terpisah antara Anda dan InspiraLabs."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={TERMS_SECTIONS}
    />
  );
}
