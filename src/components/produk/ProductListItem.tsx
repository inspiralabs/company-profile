import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <Link
      href={`/produk/${product.id}`}
      className="group grid gap-5 rounded-2xl border border-[var(--color-border)] bg-surface p-5 transition-all hover:border-maroon-vibrant/30 hover:shadow-card-hover sm:grid-cols-[9rem_1fr] sm:items-center"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream sm:aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="144px"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-maroon-deep/8 px-2.5 py-0.5 text-xs font-semibold text-maroon-deep">
            {product.badge}
          </span>
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mt-2 font-display text-lg font-bold leading-snug text-maroon-deep transition-colors group-hover:text-maroon-vibrant">
          {product.name}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {product.desc}
        </p>
        <p className="mt-3 text-sm font-medium text-maroon-vibrant group-hover:underline">
          Lihat detail
        </p>
      </div>
    </Link>
  );
}
