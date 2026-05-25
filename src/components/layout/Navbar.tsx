"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { SITE, WA_HERO, trackEvent } from "@/lib/site";

const SECTION_IDS = [
  "home",
  "nilai",
  "kemitraan",
  "layanan",
  "layanan-software",
  "layanan-iot",
  "layanan-design",
  "layanan-workshop",
  "etalase",
  "harga",
  "tentang",
  "portofolio",
  "faq",
];

const layananDropdown = [
  { href: "/#layanan-software", label: "Software Development" },
  { href: "/#layanan-iot", label: "Robotic & IoT" },
  { href: "/#layanan-design", label: "Creative & Branding" },
  { href: "/#layanan-workshop", label: "Tech Training & Consulting" },
];

const navLinks = [
  { href: "/#home", label: "Home", sectionId: "home" },
  { href: "/#etalase", label: "Produk", sectionId: "etalase" },
  { href: "/#tentang", label: "Tentang", sectionId: "tentang" },
  { href: "/#portofolio", label: "Portofolio", sectionId: "portofolio" },
  { href: "/kontak", label: "Kontak", sectionId: "kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { activeId: scrollSpyId, forceActive } = useScrollSpy(SECTION_IDS);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (sectionId?: string) => {
    if (sectionId) forceActive(sectionId);
  };

  const isLinkActive = (sectionId?: string, href?: string) => {
    if (isHomePage) {
      return sectionId ? scrollSpyId === sectionId : false;
    }
    if (href && !href.startsWith("/#")) {
      return pathname === href;
    }
    return false;
  };

  const linkClass = (sectionId?: string, href?: string) =>
    cn(
      "text-sm font-medium transition-colors",
      isLinkActive(sectionId, href)
        ? "text-maroon-vibrant underline decoration-gold-antique decoration-2 underline-offset-8"
        : "text-charcoal/80 hover:text-maroon-vibrant"
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-surface/95 shadow-sm backdrop-blur-md"
          : "bg-surface/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/#home" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt={SITE.name}
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="font-display text-lg font-semibold text-maroon-deep">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.sectionId, link.href)}
              onClick={() => handleNavClick(link.sectionId)}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setLayananOpen(true)}
            onMouseLeave={() => {
              setTimeout(() => setLayananOpen(false), 150);
            }}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isHomePage &&
                  (scrollSpyId === "layanan" ||
                    ["layanan-software", "layanan-iot", "layanan-design", "layanan-workshop"].includes(
                      scrollSpyId
                    ))
                  ? "text-maroon-vibrant underline decoration-gold-antique decoration-2 underline-offset-8"
                  : "text-charcoal/80 hover:text-maroon-vibrant"
              )}
            >
              Layanan
              <ChevronDown className={cn("h-4 w-4 transition-transform", layananOpen && "rotate-180")} />
            </button>
            {layananOpen && (
              <div
                className="absolute left-0 top-full z-50 min-w-[280px] rounded-lg border border-[var(--color-border)] bg-surface py-2 shadow-card-hover"
                onMouseEnter={() => setLayananOpen(true)}
                onMouseLeave={() => setLayananOpen(false)}
              >
                <div className="absolute -top-2 left-0 h-2 w-full" />
                {layananDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-cream hover:text-maroon-vibrant"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.sectionId, link.href)}
              onClick={() => handleNavClick(link.sectionId)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_whatsapp_click", { location: "navbar" })}
            >
              Hubungi Kami
            </a>
          </Button>
        </nav>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-[var(--color-border)] bg-surface px-4 py-4 lg:hidden">
          <Link href="/#home" className="block py-2 text-sm font-medium" onClick={() => { handleNavClick("home"); setOpen(false); }}>
            Home
          </Link>
          <p className="py-2 text-xs font-semibold uppercase text-[var(--color-text-muted)]">Layanan</p>
          {layananDropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 pl-3 text-sm"
              onClick={() => { handleNavClick("layanan"); setOpen(false); }}
            >
              {item.label}
            </Link>
          ))}
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium"
              onClick={() => { handleNavClick(link.sectionId); setOpen(false); }}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-3 w-full">
            <a href={WA_HERO} target="_blank" rel="noopener noreferrer">
              Hubungi Kami
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
