"use client";

import { PortfolioHighlightProvider } from "@/context/PortfolioHighlightContext";
import AboutSection from "@/components/sections/AboutSection";
import ContactTeaserSection from "@/components/sections/ContactTeaserSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import HeroSection from "@/components/sections/HeroSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import PricingSection from "@/components/sections/PricingSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SurveyPromoSection from "@/components/sections/SurveyPromoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ValuePropSection from "@/components/sections/ValuePropSection";

export default function LandingPage() {
  return (
    <PortfolioHighlightProvider>
      <HeroSection />
      <ValuePropSection />
      <PartnershipSection />
      <ServicesSection />
      <ProductsSection />
      <PricingSection />
      <AboutSection />
      <TestimonialsSection />
      <SurveyPromoSection />
      <FAQSection />
      <CTASection />
      <ContactTeaserSection />
    </PortfolioHighlightProvider>
  );
}
