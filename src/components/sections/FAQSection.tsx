import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { FAQ_ITEMS } from "@/data/copy";

export default function FAQSection() {
  return (
    <SectionWrapper id="faq" variant="cream">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <ScrollReveal>
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-display-lg font-bold text-maroon-deep">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Belum menemukan jawaban yang Anda cari? Hubungi kami langsung via
              WhatsApp untuk konsultasi lebih lanjut.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="w-full"
          >
            {FAQ_ITEMS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
