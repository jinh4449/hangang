import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SiteHeader, SiteFooter, JsonLd } from "@/components/site";
import { webSite } from "@/content/schema";
import { RiseInit } from "@/components/rise";
import { CLINIC, SITE_URL } from "@/content/clinic";
import { withJosa } from "@/content/josa";
import { SYMPTOMS } from "@/content/symptoms";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${CLINIC.name} — ${CLINIC.tagline}`, template: `%s | ${CLINIC.name}` },
  description: `${CLINIC.name}. ${CLINIC.tagline}. ${CLINIC.badges.join(" · ")}. ${CLINIC.address}`,
  robots: { index: true, follow: true },
  alternates: {
    // 첫 화면 몫이다. 하위 페이지는 각자 적는다. 여기에만 적으면 물려받아
    // 모든 페이지가 첫 화면을 가리키고, 그러면 나머지가 색인에서 빠진다
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${CLINIC.name} 원장 칼럼` }] },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: CLINIC.name,
    url: SITE_URL,
  },
  // 값이 있을 때만 태그가 나간다. 빈 값으로 태그를 내보내면
  // 검색엔진이 소유확인 실패로 읽는다
  verification: {
    ...(CLINIC.verification.google ? { google: CLINIC.verification.google } : {}),
    ...(CLINIC.verification.naver
      ? { other: { "naver-site-verification": CLINIC.verification.naver } }
      : {}),
  },
  other: {
    "geo.region": "KR-41",
    "geo.placename": `${CLINIC.locality}, ${CLINIC.region}`,
    // AEO — AI 검색엔진이 읽어가는 요약. 사람이 읽는 문장으로 쓴다
    "ai-summary":
      `${withJosa(CLINIC.name, "은는")} ${CLINIC.address}에 있는 한의원입니다. ` +
      `${withJosa(SYMPTOMS.map((s) => s.name).join(", "), "을를")} 진료합니다. ` +
      `평일 09:30~20:00(점심시간 13:00~14:00), 토요일과 공휴일 09:30~15:00 진료하며 일요일은 휴진입니다. ` +
      `김포골드라인 장기역 3·4번 출구에서 도보 1분입니다. ` +
      `초음파로 통증 부위를 함께 보면서 상태를 설명하며, 남녀 원장 두 명이 진료합니다. ` +
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
  // 의료진을 Person 으로 노출하면 의료 콘텐츠의 신뢰도 평가에 유리하다
  employee: CLINIC.doctors.map((d) => ({
    "@type": "Person",
    "@id": `${SITE_URL}/#doctor-${d.key}`,
    name: d.name,
    jobTitle: d.role,
    worksFor: { "@id": `${SITE_URL}/#clinic` },
  })),
  numberOfEmployees: { "@type": "QuantitativeValue", value: CLINIC.doctors.length, unitText: "원장" },
  // 다른 곳에 있는 같은 병원. 흩어진 이름을 하나로 묶어 준다
  sameAs: CLINIC.sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={clinicJsonLd} />
        {/* 사이트 자체. 어느 페이지에서든 같은 @id 를 가리키므로 한 번만 둔다 */}
        <JsonLd data={webSite} />
        {/* 스크립트를 끈 채로 스크롤 연동도 모르는 브라우저라면 떠오를 방법이 없다.
            그 경우에만 처음부터 보이게 되돌린다 */}
        <noscript>
          <style>{`.rise,.seq{clip-path:none!important}.rise>.rise-in,.seq>.seq-in{transform:none!important}`}</style>
        </noscript>
        <RiseInit />
        <SiteHeader />
        <main className="flex-1 pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
