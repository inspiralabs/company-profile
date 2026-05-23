import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-display text-6xl font-bold text-maroon-deep">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon-deep">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 max-w-md text-[var(--color-text-secondary)]">
        Sepertinya halaman yang Anda cari sudah dipindahkan atau belum ada. Mari
        kembali ke beranda InspiraLabs.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/survey">Survey Kebutuhan</Link>
        </Button>
      </div>
    </div>
  );
}
