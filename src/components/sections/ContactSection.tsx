import ContactForm from "@/components/contact/ContactForm";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function ContactSection() {
  return (
    <SectionWrapper id="kontak" variant="default" className="scroll-mt-28">
      <ScrollReveal>
        <h2 className="font-display text-display-lg font-bold text-maroon-deep">
          Hubungi Kami
        </h2>
        <p className="mt-4 text-[var(--color-text-secondary)]">
          Ceritakan kebutuhan Anda. Tim kami akan merespons dalam 1×24 jam kerja.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <ContactForm />
      </ScrollReveal>
    </SectionWrapper>
  );
}
