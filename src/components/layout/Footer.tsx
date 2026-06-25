import Image from "next/image";
import Link from "next/link";
import { Clock, Instagram, Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

const layananLinks = [
  { href: "/layanan/software-development", label: "Software Development" },
  { href: "/layanan/iot-robotik", label: "IoT & Robotik" },
  { href: "/layanan/desain-branding", label: "Desain & Branding" },
  { href: "/layanan/pelatihan-teknologi", label: "Pelatihan Teknologi" },
];

const perusahaanLinks = [
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/produk", label: "Produk" },
  { href: "/survey", label: "Survey Kebutuhan" },
  { href: "/kontak", label: "Hubungi Kami" },
  { href: "/privasi", label: "Kebijakan Privasi" },
  { href: "/syarat", label: "Syarat & Ketentuan" },
];

export default function Footer() {
  return (
    <footer className="bg-maroon-deep text-white">
      <div className="mx-auto max-w-content px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt={SITE.name}
                width={160}
                height={48}
                className="h-10 w-auto max-w-[160px]"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Kolaborasi anak muda yang mendedikasikan teknologi, desain, dan edukasi bagi kemajuan masyarakat — dari komunitas lokal hingga enterprise.
            </p>
            <a
              href="https://www.instagram.com/inspiralabs.id/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram InspiraLabs"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/75 transition-colors hover:border-gold-bright/60 hover:text-gold-bright"
            >
              <Instagram className="h-4 w-4" />
              @inspiralabs.id
            </a>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gold-bright/70">
              Layanan
            </h3>
            <ul className="space-y-3">
              {layananLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gold-bright/70">
              Perusahaan
            </h3>
            <ul className="space-y-3">
              {perusahaanLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gold-bright/70">
              Kontak
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2.5 text-sm text-white/65 transition-colors hover:text-gold-bright"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="flex items-start gap-2.5 text-sm text-white/65 transition-colors hover:text-gold-bright"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  {SITE.whatsappDisplay}
                </Link>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {SITE.hours.weekday.open}–{SITE.hours.weekday.close} WIB
                  <span className="block text-xs text-white/40">Senin – Jumat</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/45">
            &copy; 2026 {SITE.name} &mdash; {SITE.legalName}
          </p>
          <p className="text-xs text-white/25">Dibuat dengan penuh semangat</p>
        </div>

      </div>
    </footer>
  );
}
