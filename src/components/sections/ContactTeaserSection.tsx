import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { CONTACT_TEASER } from "@/data/copy";

export default function ContactTeaserSection() {
  return (
    <SectionWrapper id="kontak" className="scroll-mt-28" variant="cream">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
            {CONTACT_TEASER.headline}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">{CONTACT_TEASER.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/kontak">{CONTACT_TEASER.ctaForm}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/kontak">
                <MessageCircle className="h-4 w-4" />
                {CONTACT_TEASER.ctaWa}
              </Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
