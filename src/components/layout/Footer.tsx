import Image from "next/image";
import Link from "next/link";
import { SITE, WA_HERO } from "@/lib/site";

const quickLinks = [
  { href: "/#layanan", label: "Layanan" },
  { href: "/#portofolio", label: "Portofolio Klien" },
  { href: "/survey", label: "Survey Kebutuhan" },
  { href: "/kontak", label: "Hubungi Kami" },
  { href: "/privasi", label: "Kebijakan Privasi" },
  { href: "/syarat", label: "Syarat & Ketentuan" },
];

export default function Footer() {
  return (
    <footer className="bg-maroon-deep text-white">
      <div className="section-padding !pb-10 !pt-12 sm:!pb-12 sm:!pt-16">
        <div className="mx-auto w-full max-w-content">
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-3 lg:gap-x-14">
            <div className="md:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block">
                <span className="inline-flex rounded-xl bg-white/95 p-2.5 shadow-sm">
                  <Image
                    src="/logo.svg"
                    alt={SITE.name}
                    width={160}
                    height={48}
                    className="h-10 w-auto max-w-[160px]"
                  />
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80 lg:max-w-none">
                InspiraLabs adalah kolaborasi anak muda yang mendedikasikan teknologi,
                desain grafis, dan edukasi bagi kemajuan masyarakat — dari skala komunitas
                hingga korporat global.
              </p>
            </div>

            <div className="lg:pl-2">
              <h3 className="mb-4 font-display text-lg text-gold-bright">Kontak</h3>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <a href={`mailto:${SITE.email}`} className="hover:text-gold-bright">
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={WA_HERO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-bright"
                  >
                    WhatsApp: {SITE.whatsappDisplay}
                  </a>
                </li>
                <li>{SITE.hours}</li>
                <li className="text-white/60">Konsultasi online fleksibel via appointment</li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-1 lg:pl-2">
              <h3 className="mb-4 font-display text-lg text-gold-bright">Tautan Cepat</h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-1">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-gold-bright">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 w-full border-t border-white/20 pt-8 text-center text-xs text-white/60 sm:mt-12">
            © {new Date().getFullYear()} {SITE.name}. {SITE.legalName}. Seluruh Hak Cipta
            Dilindungi Undang-Undang.
          </p>
        </div>
      </div>
    </footer>
  );
}
