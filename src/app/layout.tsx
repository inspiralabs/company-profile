import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import FloatingSurveyPrompt from "@/components/layout/FloatingSurveyPrompt";
import FloatingMenu from "@/components/ui/FloatingMenu";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import StructuredData from "@/components/shared/StructuredData";
import { dmSans } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={dmSans.variable}>
      <head>
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-skiplink)] focus:rounded-lg focus:bg-maroon-deep focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Lewati ke konten utama
        </a>
        <StructuredData />
        <GoogleAnalytics />
        <MetaPixel />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingSurveyPrompt />
        <FloatingMenu />
      </body>
    </html>
  );
}
