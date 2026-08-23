import type { Metadata } from "next";
import { Gowun_Batang, IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader, SiteFooter, JsonLd } from "@/components/site";
import { CLINIC } from "@/content/clinic";
import "./globals.css";

const gowun = Gowun_Batang({
  variable: "--font-gowun",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
const plexKr = IBM_Plex_Sans_KR({
  variable: "--font-plex-kr",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${CLINIC.name} — ${CLINIC.tagline}`,
    template: `%s | ${CLINIC.name}`,
  },
  description: `${CLINIC.name}. ${CLINIC.tagline}. ${CLINIC.badges.join(" · ")}.`,
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: CLINIC.name,
  telephone: CLINIC.phone,
  address: { "@type": "PostalAddress", streetAddress: CLINIC.address, addressCountry: "KR" },
  medicalSpecialty: "TraditionalChinese",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${gowun.variable} ${plexKr.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={clinicJsonLd} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
