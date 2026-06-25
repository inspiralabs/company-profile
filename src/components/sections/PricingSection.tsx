import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Beli Putus (Direct Purchase)",
    recommended: false,
    points: [
      { label: "Kepemilikan", value: "Kepemilikan penuh sistem di awal" },
      { label: "Pembayaran", value: "Satu kali (atau termin terstruktur)" },
      {
        label: "Keuntungan utama",
        value:
          "Tidak ada beban sewa rutin. Cocok untuk sistem khusus berskala besar dengan infrastruktur server mandiri.",
      },
      {
        label: "Ideal untuk",
        value: "Instansi pemerintah, perusahaan menengah-besar, proyek kustom jangka panjang",
      },
      { label: "Dukungan", value: "Maintenance period included" },
    ],
  },
  {
    name: "Berlangganan (SaaS / Sewa)",
    recommended: true,
    points: [
      { label: "Kepemilikan", value: "Akses layanan berbasis cloud" },
      { label: "Pembayaran", value: "Bulanan/tahunan yang terjangkau" },
      {
        label: "Keuntungan utama",
        value:
          "Investasi awal rendah, langsung siap pakai, update otomatis, bebas pusing pemeliharaan server.",
      },
      {
        label: "Ideal untuk",
        value: "UMKM, sekolah, startup, produk etalase siap pakai",
      },
      { label: "Dukungan", value: "Support & update termasuk langganan" },
    ],
  },
];

export default function PricingSection() {
  return (
    <SectionWrapper id="harga" variant="default">
      <ScrollReveal>
        <h2 className="font-display text-display-lg font-bold text-maroon-deep">
          Berinvestasi pada Teknologi dengan Rasa Aman
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Fleksibilitas pembiayaan yang transparan, tanpa biaya tersembunyi - karena
          menunda inovasi berarti menunda pertumbuhan Anda.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {plans.map((plan, i) => (
          <ScrollReveal key={plan.name} delay={i * 0.1}>
            <Card
              className={cn(
                "relative h-full p-6 lg:p-8",
                plan.recommended &&
                  "border-2 border-gold-antique bg-gold-bright/5 shadow-[0_0_24px_rgba(250,214,74,0.2)]"
              )}
            >
              {plan.recommended && (
                <Badge
                  variant="bright"
                  className="absolute -top-3 right-6 shadow-md"
                >
                  Rekomendasi
                </Badge>
              )}
              <h3 className="font-display text-display-md font-bold text-maroon-deep">
                {plan.name}
              </h3>
              <ul className="mt-6 space-y-4">
                {plan.points.map((pt) => (
                  <li key={pt.label}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold-antique">
                      {pt.label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {pt.value}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.15}>
        <p className="mt-10 text-center text-sm text-[var(--color-text-secondary)]">
          Belum yakin model mana yang cocok untuk Anda?{" "}
          <Link
            href="/survey"
            className="font-semibold text-maroon-vibrant underline hover:text-maroon-deep"
          >
            Mulai Survey Kebutuhan
          </Link>
        </p>
      </ScrollReveal>
    </SectionWrapper>
  );
}
