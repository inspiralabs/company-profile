"use client";

import { PortfolioHighlightProvider } from "@/context/PortfolioHighlightContext";
import CTASection from "@/components/sections/CTASection";
import HeroSection from "@/components/sections/HeroSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import ProductsSection from "@/components/sections/ProductsSection";
import PortfolioPreviewSection from "@/components/sections/PortfolioPreviewSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";

export default function LandingPage() {
  return (
    <PortfolioHighlightProvider>
      <HeroSection />
      <ServicesSection />
      <PartnershipSection />
      <ProductsSection />
      <PortfolioPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </PortfolioHighlightProvider>
  );
}
