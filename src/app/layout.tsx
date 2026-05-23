import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import FloatingSurveyPrompt from "@/components/layout/FloatingSurveyPrompt";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
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
      <body>
        <StructuredData />
        <GoogleAnalytics />
        <MetaPixel />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingSurveyPrompt />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
