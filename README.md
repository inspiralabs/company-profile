# InspiraLabs Company Profile

Website company profile PT Nawa Inspira Digital (InspiraLabs).

## Stack

- Next.js 15 (App Router)
- React 19, TypeScript, Tailwind CSS
- Framer Motion 12, Lucide React

## Development

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Routes

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing SPA — 11 section |
| `/survey` | Survey kebutuhan + rekomendasi + WA prefill |
| `/kontak` | Form kontak dedicated |
| `/privasi` | Kebijakan privasi |
| `/syarat` | Syarat & ketentuan |

## SEO & AI

- `public/llms.txt`, `public/pricing.md`
- JSON-LD: Organization, WebSite, FAQPage, Service×4, Article (case studies), Product
- `robots.ts` mengizinkan GPTBot, PerplexityBot, ClaudeBot, Google-Extended

## Analytics

Salin `.env.example` ke `.env.local` dan isi variabel analytics.

**Panduan lengkap** (dari mana dapat ID, cara set di Vercel): [docs/environment-variables.md](docs/environment-variables.md)

Event konversi terpusat di `src/lib/analytics.ts` via `trackEvent()` di `site.ts`.

## Aset

- Logo & favicon: `public/logo.svg`, `src/app/icon.svg` (sama dengan logo)
- Portfolio: `public/images/portfolio/` (20 file dari `portfolio-image/`)
- AI image prompts: [`docs/prompts/`](docs/prompts/) (hero visual, products etalase)

## Dokumentasi

Spesifikasi lengkap: `../plans/` (00–10)

## Deploy (Vercel)

Panduan lengkap: [docs/DEPLOY-VERCEL.md](docs/DEPLOY-VERCEL.md)

Ringkas:

1. Import repo; **Root Directory** = `company-profile` jika monorepo
2. Set env dari `.env.example` di dashboard Vercel
3. Hubungkan domain `inspiralabs.com`; samakan dengan `SITE.url` di `src/lib/site.ts`
4. `vercel.json` sudah menyertakan header keamanan dasar

Setelah live: submit sitemap di GSC, uji Pixel di Events Manager.
