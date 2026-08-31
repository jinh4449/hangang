import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AREAS, getArea } from "@/content/area";
import { CLINIC, SITE_URL } from "@/content/clinic";
import { PageHead, Section, Cta, Bezel, JsonLd, MapPanel } from "@/components/site";
import { breadcrumb } from "@/content/schema";

export const generateStaticParams = () => AREAS.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: PageProps<"/area/[slug]">): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return {
    // 레이아웃이 뒤에 「| 김포한강한의원」을 붙인다. 여기서 또 붙이면 두 번 나온다
    title: a.title,
    description: `${a.name}에서 ${CLINIC.name}까지 오는 방법과 걸리는 시간. ${a.lede}`,
    alternates: { canonical: `${SITE_URL}/area/${a.slug}` },
  };
}

/**
 * 동네별 안내.
 *
 * 이 페이지에 온 사람은 하나만 궁금하다 — 우리 동네에서 얼마나 걸리나.
 * 그래서 걸리는 시간, 지도, 예약 세 가지만 둔다. 그 밖의 이야기는
 * 답을 찾는 길을 늘릴 뿐이다.
 *
 * ⚠ 동네마다 다른 문단(local)과 많이 찾는 진료(focusSlugs)는 데이터에는
 *   남아 있지만 지금은 화면에 그리지 않는다. 다시 붙일 때를 위해 지우지 않았다.
 */
export default async function AreaPage({ params }: PageProps<"/area/[slug]">) {
  const a = getArea((await params).slug);
  if (!a) notFound();

  return (
    <>
      {/* 병원 엔티티는 레이아웃에 하나만 두고 여기서는 @id 로 참조한다.
          같은 페이지에 MedicalClinic 을 두 번 쓰면 병원이 둘인 것으로 읽힌다 */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: a.title,
          description: a.lede,
          url: `${SITE_URL}/area/${a.slug}`,
          inLanguage: "ko",
          provider: { "@id": `${SITE_URL}/#clinic` },
          about: {
            "@type": "Place",
            name: `김포시 ${a.name}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: "김포시",
              addressRegion: "경기도",
              addressCountry: "KR",
            },
          },
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: "동네별 안내", path: "/area" },
          { name: a.title, path: `/area/${a.slug}` },
        ])}
      />

      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <PageHead
          eyebrow={`김포시 ${a.name}`}
          title={a.title}
          titleSub={CLINIC.name}
          lede={a.lede}
        />

        <Section
          title={`${a.name}에서 여기까지`}
          note="평시 기준이며, 시간대와 교통 상황에 따라 달라집니다."
        >
          <Bezel>
            <dl className="divide-y divide-line p-2">
              {a.routes.map((r) => (
                <div key={r.by} className="grid gap-2 px-5 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-5">
                  <dt className="flex items-baseline gap-2.5 sm:block">
                    <span className="kr text-sm font-medium text-herb">{r.by}</span>
                    <span className="kr block text-xl font-bold leading-tight sm:mt-1">{r.time}</span>
                  </dt>
                  <dd className="kr self-center text-[16px] leading-7 text-muted">{r.detail}</dd>
                </div>
              ))}
            </dl>
          </Bezel>
        </Section>

        <Section title="지도와 길찾기" note="네이버 지도, 카카오맵, 구글 지도 중 쓰시는 앱으로 여실 수 있습니다.">
          <MapPanel />
        </Section>

        <Cta />
      </article>
    </>
  );
}
