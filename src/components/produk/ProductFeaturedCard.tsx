import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductFeaturedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produk/${product.id}`}
      className="group grid overflow-hidden rounded-2xl border border-maroon-vibrant/25 bg-maroon-deep transition-shadow hover:shadow-card-hover lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <div className="relative h-52 sm:h-60 lg:h-auto lg:min-h-[17rem]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>

      <div className="flex flex-col p-6 text-white sm:p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-gold-antique px-3 py-1 text-xs font-bold text-maroon-deep">
            {product.badge}
          </span>
          {product.extraBadge && (
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
              {product.extraBadge}
            </span>
          )}
        </div>

        <h2 className="mt-4 font-display text-xl font-bold leading-snug transition-colors group-hover:text-gold-antique sm:text-2xl">
          {product.name}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
          {product.desc}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm font-semibold text-gold-antique group-hover:underline">
          Lihat detail produk
        </p>
      </div>
    </Link>
  );
}
