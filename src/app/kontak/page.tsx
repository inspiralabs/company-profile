import ContactForm from "@/components/contact/ContactForm";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Hubungi Kami",
  description:
    "Hubungi InspiraLabs untuk konsultasi software, IoT, desain, dan pelatihan teknologi. Respons dalam 1×24 jam kerja.",
  path: "/kontak",
});

export default function KontakPage() {
  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">
        <h1 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
          Hubungi Kami
        </h1>
        <p className="mt-4 max-w-xl text-[var(--color-text-secondary)]">
          Ceritakan kebutuhan Anda. Setelah mengisi form, pilih kirim via WhatsApp
          atau salin detail email untuk dikirim lewat Gmail. Tim kami akan merespons
          dalam 1×24 jam kerja.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
        <div className="mt-12 rounded-xl bg-cream p-6 text-sm text-[var(--color-text-secondary)]">
          <p>
            <strong className="text-maroon-deep">Email:</strong>{" "}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>
          </p>
          <p className="mt-2">
            <strong className="text-maroon-deep">WhatsApp:</strong> {SITE.whatsappDisplay}
          </p>
          <p className="mt-2">
            <strong className="text-maroon-deep">Jam operasional:</strong> {SITE.hours}
          </p>
        </div>
      </div>
    </div>
  );
}
