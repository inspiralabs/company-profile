import {
  Eye,
  GitBranch,
  Globe2,
  Heart,
  Layers,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

const values: { icon: LucideIcon; title: string; desc: string; featured?: boolean }[] = [
  {
    icon: Eye,
    title: "Transparansi Progres 100%",
    desc: "Pantau milestone proyek secara real-time - tidak ada proses yang disembunyikan.",
    featured: true,
  },
  { icon: GitBranch, title: "Metodologi Adaptif", desc: "Kolaboratif dengan umpan balik berkelanjutan di setiap fase proyek." },
  { icon: Users, title: "Kolaborasi Real-Time", desc: "Workspace terpadu. Komunikasi Anda dan tim pengembang selalu sinkron." },
  { icon: Layers, title: "One-Stop Digital Solution", desc: "Software, IoT, desain visual, dan pelatihan. Semua di satu atap." },
  { icon: Sparkles, title: "Berorientasi Dampak", desc: "Setiap fitur punya alasan bisnis yang jelas, bukan sekadar teknologi." },
  { icon: MessageSquare, title: "Komunikasi Humanis", desc: "Kerumitan IT diterjemahkan ke bahasa yang mudah dipahami siapa saja." },
  { icon: Shield, title: "Keamanan Data Prioritas", desc: "Infrastruktur dengan standar keamanan dan privasi data terbaik." },
  { icon: Heart, title: "Dukungan Berkelanjutan", desc: "Kemitraan tidak berakhir saat serah terima, termasuk pelatihan tim." },
  { icon: Globe2, title: "Kualitas Skala Global", desc: "Sebesar apapun skala proyek Anda, kami selalu memberikan kualitas skala global." },
];

export default function ValuePropSection() {
  const featured = values.find((v) => v.featured)!;
  const rest = values.filter((v) => !v.featured);

  return (
    <SectionWrapper id="nilai" variant="cream">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
          Mengapa Anda Membutuhkan InspiraLabs?
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Kami tidak sekadar membangun aplikasi. Kami membangun kepercayaan melalui
          sistem kerja yang transparan, terukur, dan berdampak nyata. Mulai dari komunitas
          lokal hingga standar global.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ScrollReveal className="md:col-span-2 lg:col-span-2 lg:row-span-1">
          <Card className="h-full border-t-4 border-t-maroon-vibrant bg-cream p-6 lg:p-8">
            <featured.icon className="h-10 w-10 text-maroon-vibrant" />
            <h3 className="mt-4 font-display text-2xl font-bold text-maroon-deep">
              {featured.title}
            </h3>
            <p className="mt-3 text-[var(--color-text-secondary)]">{featured.desc}</p>
          </Card>
        </ScrollReveal>

        {rest.slice(0, 1).map((v, i) => (
          <ValueCard key={v.title} v={v} delay={i * 0.05} />
        ))}

        {rest.slice(1).map((v, i) => (
          <ValueCard key={v.title} v={v} delay={(i + 1) * 0.05} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ValueCard({
  v,
  delay,
}: {
  v: (typeof values)[0];
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <Card
        className={cn(
          "group h-full p-5 transition-all hover:border-t-4 hover:border-t-gold-antique hover:shadow-card-hover"
        )}
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-maroon-deep/5 group-hover:bg-gold-bright/20">
          <v.icon className="h-5 w-5 text-maroon-vibrant" />
        </div>
        <h3 className="font-display text-lg font-semibold text-maroon-deep">{v.title}</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{v.desc}</p>
      </Card>
    </ScrollReveal>
  );
}
