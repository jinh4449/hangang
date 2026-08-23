import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SiteHeader, SiteFooter, JsonLd } from "@/components/site";
import { CLINIC, SITE_URL } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${CLINIC.name} — ${CLINIC.tagline}`, template: `%s | ${CLINIC.name}` },
  description: `${CLINIC.name}. ${CLINIC.tagline}. ${CLINIC.badges.join(" · ")}. ${CLINIC.address}`,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: CLINIC.name,
    url: SITE_URL,
  },
  other: {
    "geo.region": "KR-41",
    "geo.placename": `${CLINIC.locality}, ${CLINIC.region}`,
    // AEO — AI 검색엔진이 읽어가는 요약. 사람이 읽는 문장으로 쓴다
    "ai-summary":
      `${CLINIC.name}은 ${CLINIC.address}에 있는 한의원입니다. ` +
      `${SYMPTOMS.map((s) => s.name).join(", ")}를 진료합니다. ` +
      `평일 09:30~20:00(점심시간 13:00~14:00), 토요일과 공휴일 09:30~15:00 진료하며 일요일은 휴진입니다. ` +
      `김포골드라인 장기역 3·4번 출구에서 도보 1분입니다. ` +
      `추나요법은 건강보험이 적용되어 연 20회까지 급여이며, 교통사고 치료는 자동차보험으로 본인부담금이 없습니다. ` +
      `전화 ${CLINIC.phone}.`,
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#clinic`,
  name: CLINIC.name,
  medicalSpecialty: "TraditionalChinese",
  url: SITE_URL,
  telephone: `+82-31-8049-7541`,
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.addressShort,
    addressLocality: CLINIC.locality,
    addressRegion: CLINIC.region,
    addressCountry: "KR",
  },
  areaServed: [
    { "@type": "City", name: "김포시" },
    { "@type": "City", name: "인천광역시 서구" },
  ],
  availableService: SYMPTOMS.map((s) => ({
    "@type": "MedicalProcedure",
    name: s.name,
    url: `${SITE_URL}/care/${s.slug}`,
    description: s.summary,
  })),
  openingHoursSpecification: [
    // 점심시간이 있으면 오전·오후를 나눠 써야 검색엔진이 정확히 읽는다
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "20:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:30", closes: "15:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "PublicHolidays", opens: "09:30", closes: "15:00" },
  ],
  currenciesAccepted: "KRW",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={clinicJsonLd} />
        <SiteHeader />
        <main className="flex-1 pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
