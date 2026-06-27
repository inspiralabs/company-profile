"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

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
  { href: "/layanan/software-development", label: "Software Development" },
  { href: "/layanan/iot-robotik", label: "IoT & Robotik" },
  { href: "/layanan/desain-branding", label: "Desain & Branding" },
  { href: "/layanan/pelatihan-teknologi", label: "Pelatihan Teknologi" },
];

const navLinks = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/produk", label: "Produk", sectionId: "produk" },
  { href: "/tentang", label: "Tentang", sectionId: "tentang" },
  { href: "/portofolio", label: "Portofolio", sectionId: "portofolio" },
  { href: "/kontak", label: "Kontak", sectionId: "kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const layananRef = useRef<HTMLDivElement>(null);
  const layananButtonRef = useRef<HTMLButtonElement>(null);
  const layananMenuItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const { activeId: scrollSpyId, forceActive } = useScrollSpy(SECTION_IDS);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!layananOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLayananOpen(false);
        layananButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!layananRef.current?.contains(event.target as Node)) {
        setLayananOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [layananOpen]);

  const closeLayananMenu = () => {
    setLayananOpen(false);
    layananButtonRef.current?.focus();
  };

  const openLayananMenu = () => {
    setLayananOpen(true);
    requestAnimationFrame(() => {
      layananMenuItemRefs.current[0]?.focus();
    });
  };

  const focusLayananMenuItem = (index: number) => {
    const items = layananMenuItemRefs.current.filter(
      (item): item is HTMLAnchorElement => item !== null
    );
    if (items.length === 0) return;
    const nextIndex =
      ((index % items.length) + items.length) % items.length;
    items[nextIndex]?.focus();
  };

  const handleLayananMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = layananMenuItemRefs.current.filter(
      (item): item is HTMLAnchorElement => item !== null
    );
    if (items.length === 0) return;

    const currentIndex = items.findIndex(
      (item) => item === document.activeElement
    );

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusLayananMenuItem(
          currentIndex === -1 ? 0 : currentIndex + 1
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        focusLayananMenuItem(
          currentIndex === -1 ? items.length - 1 : currentIndex - 1
        );
        break;
      case "Home":
        event.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Escape":
        event.preventDefault();
        closeLayananMenu();
        break;
      default:
        break;
    }
  };

  const mobileNavLinkClass =
    "flex min-h-11 items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 rounded-sm";

  const handleNavClick = (sectionId?: string) => {
    if (sectionId) forceActive(sectionId);
  };

  const isLinkActive = (sectionId?: string, href?: string) => {
    if (isHomePage && sectionId === "home") return scrollSpyId === "home";
    if (href && href !== "/") return pathname.startsWith(href);
    if (href === "/") return isHomePage;
    return false;
  };

  const linkClass = (sectionId?: string, href?: string) =>
    cn(
      "rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2",
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
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt={SITE.name}
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="font-body text-xl font-black text-maroon-deep">
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
            ref={layananRef}
            className="relative"
            onMouseEnter={() => setLayananOpen(true)}
            onMouseLeave={() => setLayananOpen(false)}
          >
            <button
              ref={layananButtonRef}
              type="button"
              aria-expanded={layananOpen}
              aria-haspopup="true"
              aria-controls="layanan-menu"
              onClick={() => (layananOpen ? closeLayananMenu() : openLayananMenu())}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" && !layananOpen) {
                  event.preventDefault();
                  openLayananMenu();
                }
              }}
              className={cn(
                "flex items-center gap-1 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2",
                pathname.startsWith("/layanan")
                  ? "text-maroon-vibrant underline decoration-gold-antique decoration-2 underline-offset-8"
                  : "text-charcoal/80 hover:text-maroon-vibrant"
              )}
            >
              Layanan
              <ChevronDown className={cn("h-4 w-4 transition-transform", layananOpen && "rotate-180")} />
            </button>
            {layananOpen && (
              <div
                id="layanan-menu"
                role="menu"
                onKeyDown={handleLayananMenuKeyDown}
                className="absolute left-0 top-full z-50 min-w-[280px] rounded-lg border border-[var(--color-border)] bg-surface py-2 shadow-card-hover"
              >
                {layananDropdown.map((item, index) => (
                  <Link
                    key={item.href}
                    ref={(element) => {
                      layananMenuItemRefs.current[index] = element;
                    }}
                    href={item.href}
                    role="menuitem"
                    tabIndex={index === 0 ? 0 : -1}
                    className="flex min-h-11 items-center px-4 text-sm text-charcoal hover:bg-cream hover:text-maroon-vibrant focus-visible:bg-cream focus-visible:text-maroon-vibrant focus-visible:outline-none"
                    onClick={closeLayananMenu}
                    onFocus={() => {
                      layananMenuItemRefs.current.forEach((menuItem, menuIndex) => {
                        if (menuItem) {
                          menuItem.tabIndex = menuIndex === index ? 0 : -1;
                        }
                      });
                    }}
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
        </nav>

        <Link
          href="/survey"
          className="hidden min-h-11 items-center rounded-full bg-maroon-deep px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-vibrant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 lg:inline-flex"
        >
          Mulai Survei
        </Link>

        <button
          type="button"
          className="rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-[var(--color-border)] bg-surface px-4 py-4 lg:hidden">
          <Link
            href="/"
            className={mobileNavLinkClass}
            onClick={() => { handleNavClick("home"); setOpen(false); }}
          >
            Home
          </Link>
          <p className="flex min-h-11 items-center text-xs font-semibold text-[var(--color-text-muted)]">
            Layanan
          </p>
          {layananDropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${mobileNavLinkClass} pl-3`}
              onClick={() => { handleNavClick("layanan"); setOpen(false); }}
            >
              {item.label}
            </Link>
          ))}
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={mobileNavLinkClass}
              onClick={() => { handleNavClick(link.sectionId); setOpen(false); }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-[var(--color-border)] pt-3">
            <Link
              href="/survey"
              className={`${mobileNavLinkClass} justify-center rounded-full bg-maroon-deep px-4 text-center font-semibold text-white hover:bg-maroon-vibrant`}
              onClick={() => setOpen(false)}
            >
              Mulai Survei
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
