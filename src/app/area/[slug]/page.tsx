import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AREAS, getArea } from "@/content/area";
import { getSymptom } from "@/content/symptoms";
import { CLINIC, SITE_URL } from "@/content/clinic";
import { PageHead, Section, Cta, Bezel, JsonLd, MapLinks, Arrow } from "@/components/site";
import { AreaChips } from "@/components/area";
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
          about: { "@type": "Place", name: `김포시 ${a.name}`, address: { "@type": "PostalAddress", addressLocality: "김포시", addressRegion: "경기도", addressCountry: "KR" } },
          significantLink: a.focusSlugs.map((f) => `${SITE_URL}/care/${f}`),
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: "동네별 안내", path: "/area" },
          { name: a.title, path: `/area/${a.slug}` },
        ])}
      />

      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <PageHead eyebrow={`김포시 ${a.name}`} title={a.title} titleSub={CLINIC.name} lede={a.lede} />

        {/* 이 페이지에 온 이유는 하나다 — 얼마나 걸리는지.
            그래서 다른 것보다 먼저, 크게 둔다 */}
        <Section title={`${a.name}에서 여기까지`} note="평시 기준이며, 시간대와 교통 상황에 따라 달라집니다.">
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
          <p className="kr mt-4 text-[15px] leading-7 text-muted">
            {CLINIC.address} · {CLINIC.landmark}
          </p>
          <div className="mt-5">
            <MapLinks />
          </div>
        </Section>

        {a.local.map((l) => (
          <Section key={l.title} title={l.title}>
            <p className="kr max-w-[58ch] text-[16px] leading-8 text-muted">{l.body}</p>
          </Section>
        ))}

        <Section title={`${a.name}에서 많이 찾는 진료`}>
          <div className="grid gap-2">
            {a.focusSlugs.map((fs) => {
              const s = getSymptom(fs);
              if (!s) return null;
              return (
                <Link key={fs} href={`/care/${fs}`} className="tile block bg-surface px-5 py-4">
                  <span className="kr font-semibold">{s.name}</span>
                  <span className="kr mt-1 block text-[15px] text-muted">{s.summary}</span>
                  <span className="tile-arrow mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                    보러 가기
                    <Arrow />
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>

        <Section title="다른 동네에서 오신다면" note="김포 안 어디에서 오셔도 걸리는 시간을 적어 두었습니다.">
          <AreaChips exclude={a.slug} />
        </Section>

        <Cta />
      </article>
    </>
  );
}
