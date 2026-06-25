import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import FloatingSurveyPrompt from "@/components/layout/FloatingSurveyPrompt";
import FloatingMenu from "@/components/ui/FloatingMenu";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import StructuredData from "@/components/shared/StructuredData";
import { fraunces, plusJakarta } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </head>
      <body>
        <StructuredData />
        <GoogleAnalytics />
        <MetaPixel />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingSurveyPrompt />
        <FloatingMenu />
      </body>
    </html>
  );
}
