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
  const half = Math.ceil(FAQ_ITEMS.length / 2);
  const col1 = FAQ_ITEMS.slice(0, half);
  const col2 = FAQ_ITEMS.slice(half);

  return (
    <SectionWrapper id="faq" variant="cream">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
          Pertanyaan yang Sering Diajukan
        </h2>
      </ScrollReveal>

      {/* Visible for crawlers + accordion UX */}
      <div className="sr-only">
        {FAQ_ITEMS.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Accordion type="single" collapsible className="w-full">
            {col1.map((faq, i) => (
              <AccordionItem key={faq.q} value={`c1-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            {col2.map((faq, i) => (
              <AccordionItem key={faq.q} value={`c2-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
