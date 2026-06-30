import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
      <div className="w-full max-w-sm">
        <Image
          src="/not-found-illustration.svg"
          alt="Ilustrasi halaman tidak ditemukan"
          width={400}
          height={300}
          className="mx-auto w-full"
          priority
        />
      </div>
      <h1 className="mt-8 font-display text-2xl font-bold text-maroon-deep">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 max-w-sm text-[var(--color-text-secondary)] leading-relaxed">
        Halaman yang kamu cari sudah dipindahkan, dihapus, atau belum tersedia.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/portofolio">Lihat Portofolio</Link>
        </Button>
      </div>
    </div>
  );
}
