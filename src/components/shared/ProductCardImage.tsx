"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  GraduationCap,
  Landmark,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconByProduct: Record<string, LucideIcon> = {
  sijagaair: Landmark,
  desa: Building2,
  lms: GraduationCap,
  masjid: Users,
  pos: ShoppingCart,
  pelatihan: GraduationCap,
};

type ProductCardImageProps = {
  productId: string;
  name: string;
  image?: string;
};

export default function ProductCardImage({
  productId,
  name,
  image,
}: ProductCardImageProps) {
  const [failed, setFailed] = useState(false);
  const Icon = iconByProduct[productId] ?? Building2;

  if (image && !failed) {
    return (
      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-charcoal/5 sm:h-44">
        <Image
          src={image}
          alt={name}
          fill
          quality={85}
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1024px) 85vw, 340px"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-40 w-full shrink-0 flex-col items-center justify-center gap-2 overflow-hidden sm:h-44",
        "bg-gradient-to-br from-maroon-deep/5 via-cream to-gold-bright/15"
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface/80 shadow-sm ring-1 ring-gold-antique/30">
        <Icon className="h-7 w-7 text-maroon-vibrant" strokeWidth={1.5} />
      </div>
      <span className="px-4 text-center text-[10px] font-medium uppercase tracking-wider text-gold-antique">
        Pratinjau produk
      </span>
    </div>
  );
}
